#!/usr/bin/env python3
"""Store nightly prospect research candidates in local Growth OS staging tables.

Phase 1 only: this script writes local SQLite staging records and pending sync
records. It never calls HighLevel, Supabase, Apollo, email, LinkedIn, or any
external outreach system.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import sqlite3
import sys
import uuid
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

DEFAULT_DB = Path("/Users/jeff/.openclaw/projects/mountain-west-growth-os/data/growth-os.sqlite")
VALID_LANES = {"ai-patent", "ai-compliance", "tech-gc", "ma-readiness"}


def now() -> str:
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


def stable_id(prefix: str, *parts: Any) -> str:
    raw = "|".join(str(p or "").strip().lower() for p in parts)
    digest = hashlib.sha256(raw.encode("utf-8")).hexdigest()[:24]
    return f"{prefix}_{digest}"


def load_payload(path: Path) -> dict[str, Any]:
    with path.open("r", encoding="utf-8") as f:
        data = json.load(f)
    if isinstance(data, list):
        data = {"candidates": data}
    if not isinstance(data, dict) or not isinstance(data.get("candidates"), list):
        raise ValueError("payload must be an object with a candidates list, or a list of candidates")
    return data


def norm_domain(domain: str | None, website_url: str | None = None) -> str | None:
    value = (domain or website_url or "").strip().lower()
    if not value:
        return None
    value = value.replace("https://", "").replace("http://", "").split("/")[0]
    if value.startswith("www."):
        value = value[4:]
    return value or None


def require(value: Any, msg: str) -> Any:
    if value is None or value == "":
        raise ValueError(msg)
    return value


def validate_candidate(candidate: dict[str, Any], index: int) -> None:
    company = candidate.get("company") or {}
    require(company.get("name"), f"candidate {index}: company.name is required")
    lane = company.get("primary_offer_lane") or company.get("segment")
    if lane and lane not in VALID_LANES:
        raise ValueError(f"candidate {index}: invalid lane {lane!r}")
    for e_i, evidence in enumerate(candidate.get("evidence") or []):
        require(evidence.get("source_url"), f"candidate {index} evidence {e_i}: source_url required")
        require(evidence.get("supported_fact"), f"candidate {index} evidence {e_i}: supported_fact required")


def table_columns(conn: sqlite3.Connection, table: str) -> set[str]:
    return {row[1] for row in conn.execute(f"pragma table_info({table})")}


def insert_or_replace(conn: sqlite3.Connection, table: str, values: dict[str, Any]) -> None:
    cols = table_columns(conn, table)
    filtered = {k: v for k, v in values.items() if k in cols}
    keys = list(filtered)
    placeholders = ", ".join("?" for _ in keys)
    sql = f"insert or replace into {table} ({', '.join(keys)}) values ({placeholders})"
    conn.execute(sql, [filtered[k] for k in keys])


def insert_if_absent(conn: sqlite3.Connection, table: str, pk_col: str, values: dict[str, Any]) -> bool:
    if conn.execute(f"select 1 from {table} where {pk_col}=?", (values[pk_col],)).fetchone():
        return False
    insert_or_replace(conn, table, values)
    return True


def append_notes(*parts: Any) -> str:
    return "\n".join(str(p).strip() for p in parts if p not in (None, "", [], {}))


def store_candidate(conn: sqlite3.Connection, candidate: dict[str, Any]) -> dict[str, int]:
    counts = {"prospects": 0, "contacts": 0, "opportunities": 0, "source_evidence": 0, "outreach_drafts": 0, "approval_items": 0, "crm_sync_records": 0, "suppression_checks": 0}
    ts = now()
    company = candidate["company"]
    domain = norm_domain(company.get("domain"), company.get("website_url"))
    prospect_id = company.get("prospect_id") or stable_id("prospect", domain or company.get("name"))
    scores = company.get("scores") or {}
    lane = company.get("primary_offer_lane") or company.get("segment")
    notes = append_notes(
        company.get("notes"),
        f"Primary offer lane: {lane}" if lane else None,
        f"Lead magnet: {company.get('lead_magnet')}" if company.get("lead_magnet") else None,
        f"Recommended offer: {company.get('recommended_offer')}" if company.get("recommended_offer") else None,
        f"Value potential score: {scores.get('value_potential_score')}" if scores.get("value_potential_score") is not None else None,
        f"Combined priority score: {scores.get('combined_priority_score')}" if scores.get("combined_priority_score") is not None else None,
    )
    existing = conn.execute("select prospect_id from prospects where domain=? and domain is not null", (domain,)).fetchone() if domain else None
    if existing:
        prospect_id = existing[0]
    existed = conn.execute("select 1 from prospects where prospect_id=?", (prospect_id,)).fetchone()
    insert_or_replace(conn, "prospects", {
        "prospect_id": prospect_id,
        "company_name": company["name"],
        "domain": domain,
        "website_url": company.get("website_url"),
        "location": company.get("location"),
        "state_region": company.get("state_region"),
        "industry": company.get("industry"),
        "segment": lane,
        "source_type": company.get("source_type") or "nightly_public_source_research",
        "source_url": company.get("source_url"),
        "source_note": company.get("source_note"),
        "pipeline_stage": company.get("pipeline_stage") or "research_staged",
        "fit_score": scores.get("fit_score"),
        "urgency_score": scores.get("urgency_score"),
        "risk_level": company.get("risk_level") or "unknown",
        "suppression_status": company.get("suppression_status") or "not_checked",
        "conflicts_status": company.get("conflicts_status") or "required_before_send",
        "owner": company.get("owner") or "qwen-local",
        "created_at": company.get("created_at") or ts,
        "updated_at": ts,
        "notes": notes,
    })
    counts["prospects"] += 0 if existed else 1

    contact_ids: list[str] = []
    for contact in candidate.get("contacts") or []:
        contact_id = contact.get("contact_id") or stable_id("contact", prospect_id, contact.get("email") or contact.get("linkedin_url") or contact.get("name"), contact.get("title"))
        if insert_if_absent(conn, "contacts", "contact_id", {
            "contact_id": contact_id,
            "prospect_id": prospect_id,
            "name": contact.get("name"),
            "title": contact.get("title"),
            "role_category": contact.get("role_category"),
            "email": contact.get("email"),
            "linkedin_url": contact.get("linkedin_url"),
            "phone": contact.get("phone"),
            "source_type": contact.get("source_type") or "public_source_or_client_input",
            "source_url": contact.get("source_url"),
            "confidence": contact.get("confidence"),
            "permission_basis": contact.get("permission_basis") or "public-source research; attorney review required before outreach",
            "suppression_status": contact.get("suppression_status") or "not_checked",
            "created_at": ts,
            "updated_at": ts,
        }):
            counts["contacts"] += 1
        contact_ids.append(contact_id)

    opp_id = stable_id("opp", prospect_id, lane or "general")
    if insert_if_absent(conn, "opportunities", "opportunity_id", {
        "opportunity_id": opp_id,
        "prospect_id": prospect_id,
        "contact_id": contact_ids[0] if contact_ids else None,
        "campaign_id": None,
        "offer_id": lane,
        "stage": company.get("opportunity_stage") or "research_staged",
        "estimated_value": company.get("estimated_value"),
        "probability": company.get("probability"),
        "expected_close_date": company.get("expected_close_date"),
        "owner": "qwen-local",
        "source": "nightly_prospect_research",
        "created_at": ts,
        "updated_at": ts,
    }):
        counts["opportunities"] += 1

    evidence_ids: list[str] = []
    for evidence in candidate.get("evidence") or []:
        evidence_id = evidence.get("evidence_id") or stable_id("evidence", prospect_id, evidence.get("source_url"), evidence.get("supported_fact"))
        if insert_if_absent(conn, "source_evidence", "evidence_id", {
            "evidence_id": evidence_id,
            "prospect_id": prospect_id,
            "source_url": evidence.get("source_url"),
            "accessed_at": evidence.get("accessed_at") or ts,
            "source_type": evidence.get("source_type") or "public_web",
            "fact_classification": evidence.get("fact_classification") or "public",
            "evidence_snippet": evidence.get("evidence_snippet") or evidence.get("supported_fact"),
            "supported_fact": evidence.get("supported_fact"),
            "confidence": evidence.get("confidence") or "medium",
            "corroboration": evidence.get("corroboration") or "single public source",
            "safe_for_outreach": evidence.get("safe_for_outreach") or "conditional",
            "safe_fact_for_copy": evidence.get("safe_fact_for_copy"),
            "created_at": ts,
        }):
            counts["source_evidence"] += 1
        evidence_ids.append(evidence_id)

    for draft in candidate.get("outreach_drafts") or []:
        draft_id = draft.get("draft_id") or stable_id("draft", prospect_id, draft.get("channel"), draft.get("subject") or draft.get("title"))
        approval_id = stable_id("approval", draft_id)
        if insert_if_absent(conn, "approval_items", "approval_item_id", {
            "approval_item_id": approval_id,
            "item_type": "outreach_draft",
            "related_id": draft_id,
            "title": f"Review outreach draft: {company['name']} - {draft.get('title') or lane}",
            "content_path": None,
            "content_excerpt": (draft.get("body") or "")[:500],
            "channel": draft.get("channel") or "manual_review",
            "recipient_or_class": company["name"],
            "risk_level": draft.get("risk_level") or "attorney_review_required",
            "approval_status": "pending",
            "checklist_path": None,
            "reviewer": "Jeff Schell",
            "decision_at": None,
            "approval_language": None,
            "revision_notes": None,
            "created_at": ts,
            "updated_at": ts,
        }):
            counts["approval_items"] += 1
        if insert_if_absent(conn, "outreach_drafts", "draft_id", {
            "draft_id": draft_id,
            "prospect_id": prospect_id,
            "segment": lane,
            "draft_type": draft.get("draft_type") or "email",
            "title": draft.get("title") or f"{company['name']} outreach vector",
            "channel": draft.get("channel") or "manual_review",
            "subject": draft.get("subject"),
            "body": draft.get("body"),
            "source_facts": json.dumps(draft.get("source_facts") or [], ensure_ascii=False),
            "source_urls": json.dumps(draft.get("source_urls") or [], ensure_ascii=False),
            "prompt_version": draft.get("prompt_version") or "nightly_qwen_prospect_research_v1",
            "draft_version": draft.get("draft_version") or "v1",
            "status": "drafted",
            "risk_level": draft.get("risk_level") or "attorney_review_required",
            "compliance_status": "needs_review",
            "approval_item_id": approval_id,
            "external_action_allowed": 0,
            "created_at": ts,
            "updated_at": ts,
            "external_body_candidate": None,
            "internal_review_notes": draft.get("internal_review_notes") or "Not approved for sending. Educational draft for attorney review only.",
            "source_evidence_ids": json.dumps(evidence_ids, ensure_ascii=False),
            "final_copy_hash": None,
            "solicitation_classification": "attorney_review_only",
            "brand_block_id": "APPROVED_WHITEFORD_SCHELL_IP_BRAND_BLOCK_REQUIRED",
        }):
            counts["outreach_drafts"] += 1
        check_id = stable_id("suppress", prospect_id, draft_id)
        if insert_if_absent(conn, "suppression_checks", "check_id", {
            "check_id": check_id,
            "prospect_id": prospect_id,
            "draft_id": draft_id,
            "local_suppression_status": "not_checked",
            "local_clio_precheck_status": "not_checked",
            "whiteford_conflicts_status": "required_before_send",
            "opt_out_status": "not_checked",
            "duplicate_prior_touch_status": "not_checked",
            "evidence_path": None,
            "checked_at": ts,
            "checked_by": "qwen-local",
            "final_clearance": "not_cleared",
            "notes": "Created automatically for attorney review gate. No outreach authorized.",
        }):
            counts["suppression_checks"] += 1

    sync_id = stable_id("sync", "prospects", prospect_id, "ghl_supabase_staging")
    if insert_if_absent(conn, "crm_sync_records", "sync_record_id", {
        "sync_record_id": sync_id,
        "batch_id": None,
        "local_table": "prospects",
        "local_id": prospect_id,
        "crm_object": "ghl_or_supabase_lead_staging",
        "crm_object_id": None,
        "action": "upsert_staging",
        "eligibility_status": "not_checked",
        "sync_status": "pending",
        "block_reason": "Live GHL/Supabase writes require Jeff approval; staged locally only.",
        "payload_path": None,
        "response_path": None,
        "created_at": ts,
        "updated_at": ts,
    }):
        counts["crm_sync_records"] += 1
    return counts


def merge_counts(total: dict[str, int], add: dict[str, int]) -> dict[str, int]:
    for k, v in add.items():
        total[k] = total.get(k, 0) + v
    return total


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("payload", type=Path, help="JSON candidate payload from nightly research")
    parser.add_argument("--db", type=Path, default=DEFAULT_DB, help=f"Growth OS SQLite DB (default: {DEFAULT_DB})")
    parser.add_argument("--dry-run", action="store_true", help="Validate and summarize without writing")
    args = parser.parse_args(argv)

    try:
        payload = load_payload(args.payload)
        candidates = payload["candidates"]
        for i, candidate in enumerate(candidates):
            validate_candidate(candidate, i)
        if args.dry_run:
            summary = {"status": "dry_run", "candidates": len(candidates), "db": str(args.db)}
            print(json.dumps(summary, indent=2))
            return 0
        conn = sqlite3.connect(args.db)
        total: dict[str, int] = {}
        with conn:
            for candidate in candidates:
                merge_counts(total, store_candidate(conn, candidate))
        print(json.dumps({"status": "applied", "counts": total, "db": str(args.db)}, indent=2))
        return 0
    except Exception as exc:
        print(f"prospect_research_store error: {exc}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
