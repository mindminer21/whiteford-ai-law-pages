#!/usr/bin/env python3
"""Local/internal May 23 Growth OS SQLite reconciliation for Kanban task t_d9b5c7ee.

Guardrail: local SQLite data hygiene only. This script does not call Supabase,
HighLevel, Clio, LinkedIn/social, email, SMS, ads, public publishing, or any
external/client-facing system.
"""

from __future__ import annotations

import json
import sqlite3
import uuid
from datetime import datetime, timezone
from pathlib import Path

DB_PATH = Path("/Users/jeff/.openclaw/projects/mountain-west-growth-os/data/growth-os.sqlite")
OUT_DIR = Path("/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/growth-os/data-hygiene")
TASK_ID = "t_d9b5c7ee"
RUN_DATE = "2026-05-23"
PATCH_TASK = "t_ae1d6444"
REVIEW_TASK = "t_417dd89d"
NOW = datetime.now(timezone.utc).replace(microsecond=0).isoformat()
BEFORE_JSON = OUT_DIR / f"2026-05-23_may23_local_db_reconciliation_{TASK_ID}_before.json"
AFTER_JSON = OUT_DIR / f"2026-05-23_may23_local_db_reconciliation_{TASK_ID}_after.json"

IDS = {
    "josh": "prospect_c6b77ec2cbafac9396d2dae4",
    "akasa": "prospect_2b8b3cc887bb4779073633a5",
    "deepwatch": "prospect_902418419fe01ca4f3c36f4b",
    "tim": "contact_62d789f30018de7f07b7d5dd",
    "alex": "contact_dd51f9f9f5df7823b38d55af",
    "malinka": "contact_4763ac216dcfe46330d2a670",
    "benjamin": "contact_2efa4e2a8e75466f5b7923ff",
    "john": "contact_6431d7f146c2ed5b522e8e73",
    "draft_josh": "draft_cd2d1eb2de5f9859fc56ac61",
    "draft_akasa": "draft_96f0224f27bf5f069260d8de",
    "draft_deepwatch": "draft_9088c261517a8e77b4fc53df",
    "approval_josh": "approval_25a279c56752923b4ced4abe",
    "approval_akasa": "approval_6a628d4131f9dddc49ee7258",
    "approval_deepwatch": "approval_3533066c36ce6cb66e9d1a3f",
    "sync_josh": "sync_d02ccd0d70cd65ef5a138a3e",
    "sync_akasa": "sync_587852260c5279c5958bb782",
    "sync_deepwatch": "sync_ee7287276abfb914ae76fd83",
    "work_josh": "work_nightly_agent_targeting_20260523_25dde26a6ede343ae57579c8",
    "work_akasa": "work_nightly_agent_targeting_20260523_33e3c8f239583f68482dd34e",
    "work_deepwatch": "work_nightly_agent_targeting_20260523_52f646589f4647261c4e909b",
}

PROSPECT_IDS = [IDS["josh"], IDS["akasa"], IDS["deepwatch"]]
CONTACT_IDS = [IDS["tim"], IDS["alex"], IDS["malinka"], IDS["benjamin"], IDS["john"]]
DRAFT_IDS = [IDS["draft_josh"], IDS["draft_akasa"], IDS["draft_deepwatch"]]
APPROVAL_IDS = [IDS["approval_josh"], IDS["approval_akasa"], IDS["approval_deepwatch"]]
SYNC_IDS = [IDS["sync_josh"], IDS["sync_akasa"], IDS["sync_deepwatch"]]
WORK_IDS = [IDS["work_josh"], IDS["work_akasa"], IDS["work_deepwatch"]]


def rows(conn: sqlite3.Connection, sql: str, params: tuple = ()) -> list[dict]:
    return [dict(r) for r in conn.execute(sql, params).fetchall()]


def placeholders(values: list[str]) -> str:
    return ",".join("?" for _ in values)


def snapshot(conn: sqlite3.Connection) -> dict:
    p = placeholders(PROSPECT_IDS)
    c = placeholders(CONTACT_IDS)
    d = placeholders(DRAFT_IDS)
    a = placeholders(APPROVAL_IDS)
    s = placeholders(SYNC_IDS)
    w = placeholders(WORK_IDS)
    return {
        "captured_at": NOW,
        "prospects": rows(conn, f"SELECT * FROM prospects WHERE prospect_id IN ({p}) ORDER BY company_name", tuple(PROSPECT_IDS)),
        "contacts": rows(conn, f"SELECT * FROM contacts WHERE contact_id IN ({c}) ORDER BY name", tuple(CONTACT_IDS)),
        "source_evidence": rows(conn, f"SELECT * FROM source_evidence WHERE prospect_id IN ({p}) ORDER BY prospect_id, source_url", tuple(PROSPECT_IDS)),
        "outreach_drafts": rows(conn, f"SELECT * FROM outreach_drafts WHERE draft_id IN ({d}) ORDER BY title", tuple(DRAFT_IDS)),
        "approval_items": rows(conn, f"SELECT * FROM approval_items WHERE approval_item_id IN ({a}) ORDER BY title", tuple(APPROVAL_IDS)),
        "crm_sync_records": rows(conn, f"SELECT * FROM crm_sync_records WHERE sync_record_id IN ({s}) ORDER BY local_id", tuple(SYNC_IDS)),
        "suppression_checks": rows(conn, f"SELECT * FROM suppression_checks WHERE prospect_id IN ({p}) ORDER BY prospect_id", tuple(PROSPECT_IDS)),
        "work_items": rows(conn, f"SELECT * FROM work_items WHERE work_item_id IN ({w}) ORDER BY title", tuple(WORK_IDS)),
    }


def evidence_id(prospect_key: str, source_url: str) -> str:
    return "evidence_reconcile_" + uuid.uuid5(uuid.NAMESPACE_URL, prospect_key + "|" + source_url).hex[:24]


def upsert_evidence(conn: sqlite3.Connection, prospect_id: str, source_url: str, source_type: str, supported_fact: str, *, confidence: str = "medium", fact_classification: str = "public", safe_for_outreach: str = "conditional") -> None:
    eid = evidence_id(prospect_id, source_url)
    existing = conn.execute(
        "SELECT evidence_id FROM source_evidence WHERE prospect_id=? AND source_url=?",
        (prospect_id, source_url),
    ).fetchone()
    if existing:
        eid = existing["evidence_id"]
    conn.execute(
        """
        INSERT INTO source_evidence (
            evidence_id, prospect_id, source_url, accessed_at, source_type,
            fact_classification, evidence_snippet, supported_fact, confidence,
            corroboration, safe_for_outreach, safe_fact_for_copy, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(evidence_id) DO UPDATE SET
            accessed_at=excluded.accessed_at,
            source_type=excluded.source_type,
            fact_classification=excluded.fact_classification,
            evidence_snippet=excluded.evidence_snippet,
            supported_fact=excluded.supported_fact,
            confidence=excluded.confidence,
            corroboration=excluded.corroboration,
            safe_for_outreach=excluded.safe_for_outreach,
            safe_fact_for_copy=excluded.safe_fact_for_copy
        """,
        (
            eid,
            prospect_id,
            source_url,
            "2026-05-23T00:00:00+00:00",
            source_type,
            fact_classification,
            supported_fact,
            supported_fact,
            confidence,
            f"patched local DB reconciliation {TASK_ID} from {PATCH_TASK}/{REVIEW_TASK}",
            safe_for_outreach,
            "Attorney-review-only factual support; do not use externally without approval.",
            NOW,
        ),
    )


def update_draft(conn: sqlite3.Connection, draft_id: str, body: str, source_facts: list[str], source_urls: list[str], status: str, notes: str) -> None:
    conn.execute(
        """
        UPDATE outreach_drafts
        SET body=?, source_facts=?, source_urls=?, status=?, compliance_status='needs_review',
            risk_level='attorney_review_required', external_action_allowed=0,
            internal_review_notes=?, updated_at=?
        WHERE draft_id=?
        """,
        (body, json.dumps(source_facts), json.dumps(source_urls), status, notes, NOW, draft_id),
    )


def update_approval(conn: sqlite3.Connection, approval_id: str, excerpt: str, status: str, notes: str) -> None:
    conn.execute(
        """
        UPDATE approval_items
        SET content_excerpt=?, approval_status=?, risk_level='attorney_review_required',
            revision_notes=?, updated_at=?
        WHERE approval_item_id=?
        """,
        (excerpt[:500], status, notes, NOW, approval_id),
    )


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    before = snapshot(conn)
    BEFORE_JSON.write_text(json.dumps(before, indent=2, ensure_ascii=False) + "\n")

    changes: list[str] = []
    with conn:
        # Prospects: align stale location/notes with patched controlling artifacts and preserve no-send posture.
        conn.execute(
            """
            UPDATE prospects
            SET source_note=?, updated_at=?
            WHERE prospect_id IN (?, ?, ?)
            """,
            (
                f"Nightly Qwen public-source research run {RUN_DATE}, patched by {PATCH_TASK} and re-reviewed by {REVIEW_TASK}; local/internal staging only; no external action authorized.",
                NOW,
                IDS["josh"], IDS["akasa"], IDS["deepwatch"],
            ),
        )
        changes.append("prospects.source_note patched for all three May 23 rows")

        conn.execute(
            """
            UPDATE prospects
            SET notes=?, pipeline_stage='research_staged', risk_level='attorney_review_required',
                suppression_status='consent_gap_no_auto_send', conflicts_status='required_before_send', updated_at=?
            WHERE prospect_id=?
            """,
            (
                "Description: AI-powered smart home control platform with voice, touch, and contextual automation. Sells exclusively through certified tech integrators. IoT Breakthrough Award 2026. Expanding residential into healthcare, hotels, commercial, MDUs.\n"
                "Company size: Approximately 50-100 employees\nFounded: 2015\nFunding: 11M USD listed (Seedtable 2026); multiple rounds\nAI usage: Core product: voice AI, contextual awareness, generative AI (JoshGPT), local processing NLP\n"
                "Patent activity: Public patent page lists numerous provisional patent applications plus listed utility/design patents; source-current review required before external use.\n"
                "Outreach readiness: draft_ready_attorney_review_only\nLead magnet fit tier: high\nGeo relevance: verified - Denver CO HQ via first-party Josh.ai source; still attorney/source-current review required before external use\nResearch confidence: high\nPrimary offer lane: ai-patent\nValue potential score: 80\nCombined priority score: 80",
                NOW,
                IDS["josh"],
            ),
        )
        changes.append("Josh.ai prospect notes corrected to source-exact patent wording and attorney-review-only readiness")

        conn.execute(
            """
            UPDATE prospects
            SET location=?, notes=?, pipeline_stage='research_hold', risk_level='attorney_review_required',
                suppression_status='consent_gap_no_auto_send', conflicts_status='required_before_send', updated_at=?
            WHERE prospect_id=?
            """,
            (
                "South San Francisco, CA (HQ); Denver/Colorado hub/coworking presence only",
                "Description: AI solutions for healthcare revenue cycle management. Co-founded by ex-a16z partner Malinka Walaliyadde. Current source checks support South San Francisco HQ and Denver as a hub/coworking presence, not Denver HQ.\n"
                "Company size: Approximately 110 employees\nFounded: 2019 per Built In profile; first-party confirmation still recommended\nFunding: 110M (Seedtable 2026)\nAI usage: Core: AI/ML for healthcare revenue cycle - billing, adjudication, denials. Generative AI in workflows.\n"
                "Outreach readiness: hold_geography_needs_corroboration\nLead magnet fit tier: hold_until_geo_review\nGeo relevance: partial - South San Francisco HQ; Denver/Colorado hub or coworking presence only; not Denver HQ\nResearch confidence: medium after geography correction\nPrimary offer lane: ai-compliance\nValue potential score: 75\nCombined priority score: 74",
                NOW,
                IDS["akasa"],
            ),
        )
        changes.append("AKASA prospect location/notes changed from Denver HQ to South San Francisco HQ with Denver hub-only HOLD")

        conn.execute(
            """
            UPDATE prospects
            SET location=?, notes=?, pipeline_stage='research_hold', fit_score=74, urgency_score=70,
                risk_level='attorney_review_required', suppression_status='consent_gap_no_auto_send',
                conflicts_status='required_before_send', updated_at=?
            WHERE prospect_id=?
            """,
            (
                "Tampa, FL per Crunchbase 2023; no current Denver/Mountain West nexus verified",
                "Description: Managed detection and response cybersecurity company. HOLD/removed for Mountain West targeting because checked sources do not support Denver geography; Crunchbase News describes Tampa, Florida and first-party 2024 source names John DiLullo CEO based in Silicon Valley.\n"
                "Company size: ~100-250 employees estimated\nFounded: 2019 per Crunchbase News\nFunding: $256M total raised per Crunchbase News; $180M 2023 financing included equity investments and strategic financing with no debt/equity breakdown\n"
                "AI usage: Deepwatch first-party 2024 release mentions AI/automation in its managed security platform.\nOutreach readiness: hold_geography_current_source_correction_required\nLead magnet fit tier: hold_not_mountain_west_queue\nGeo relevance: not verified for Denver/Mountain West; remove from Denver queue unless new current source supports nexus\nResearch confidence: low for Mountain West targeting\nPrimary offer lane: tech-gc\nValue potential score: 68\nCombined priority score: 0",
                NOW,
                IDS["deepwatch"],
            ),
        )
        changes.append("Deepwatch prospect location/notes changed from Denver queue to Tampa/no-current-Mountain-West HOLD")

        # Contact hygiene: remove person-level LinkedIn leakage and LinkedIn-only person evidence.
        conn.execute("UPDATE contacts SET linkedin_url='', updated_at=? WHERE contact_id=?", (NOW, IDS["tim"]))
        conn.execute(
            """
            UPDATE contacts
            SET linkedin_url='', source_url='', confidence=65,
                permission_basis='Public-source research only; LinkedIn-only person evidence requires manual/human verification; attorney review, conflicts, suppression, and exact approval required before outreach',
                updated_at=?
            WHERE contact_id=?
            """,
            (NOW, IDS["benjamin"]),
        )
        conn.execute(
            """
            UPDATE contacts
            SET source_url='https://www.deepwatch.com/deepwatch-names-john-dilullo-as-chief-executive-officer/',
                permission_basis='Public-source research only; first-party CEO source is not geography clearance; attorney review, conflicts, suppression, and exact approval required before outreach',
                updated_at=?
            WHERE contact_id=?
            """,
            (NOW, IDS["john"]),
        )
        changes.append("Tim Gill company LinkedIn leakage removed; Benjamin LinkedIn-only URL/source quarantined; John DiLullo source moved to first-party CEO announcement")

        # Source evidence: source-exact corrected facts; use conditional safe_for_outreach per DB enum.
        for args in [
            (IDS["josh"], "https://josh.ai/about/", "first_party", "Josh.ai first-party about page supports Denver, CO HQ/founding/product positioning; patent activity is separately supported by the patents page."),
            (IDS["josh"], "https://josh.ai/team", "first_party", "Tim Gill (CTO, Denver) built J++. Alex Capecelatro (CEO). Lutron co-op. Growing team."),
            (IDS["josh"], "https://www.linkedin.com/company/joshai", "external_directory", "Josh.ai company LinkedIn page only; company-level directory evidence, not a person-level URL or primary contact evidence."),
            (IDS["josh"], "https://josh.ai/patents/", "first_party", "Josh.ai public patent page lists numerous provisional patent applications plus listed utility/design patents; use source-exact wording and attorney review before external copy."),
            (IDS["akasa"], "https://akasa.com/press/top-ai-revenue-cycle-leader-black-book", "first_party", "Top AI revenue cycle leader recognition and CEO quote from Malinka Walaliyadde; source does not support Denver HQ."),
            (IDS["akasa"], "https://datainnovation.org/2025/02/5-qs-for-malinka-walaliyadde-co-founder-of-akasa/", "third_party", "Co-founder ex-a16z interview on AI governance in healthcare. Leadership AI awareness confirmed."),
            (IDS["akasa"], "https://www.healthevolution.com/insider/innovator-ceo-profile-akasas-malinka-walaliyadde/", "third_party", "Innovator CEO profile. Former a16z. Co-founded to address healthcare financial complexity."),
            (IDS["akasa"], "https://akasa.com/careers/", "first_party", "AKASA careers page describes a remote-friendly hybrid organization with hubs in the Bay Area, NYC, and Denver; supports Denver hub presence, not Denver HQ."),
            (IDS["akasa"], "https://www.builtinsf.com/company/akasa/offices", "external_directory", "Built In profile lists AKASA headquarters as South San Francisco, CA, with Denver, CO as a coworking hub/office; use only as current directory corroboration."),
            (IDS["deepwatch"], "https://news.crunchbase.com/cybersecurity/startup-venture-funding-deepwatch/", "third_party", "Crunchbase News describes Deepwatch as Tampa, Florida-based, founded in 2019, with $180M financing and $256M total raised; CEO in that 2023 article was Charlie Thomas."),
            (IDS["deepwatch"], "https://www.deepwatch.com/deepwatch-names-john-dilullo-as-chief-executive-officer/", "first_party", "Deepwatch first-party 2024 announcement names John DiLullo CEO effective July 2, 2024 and says he will be based in Silicon Valley."),
            (IDS["deepwatch"], "https://www.deepwatch.com/cybersecurity-startup-deepwatch-just-nabbed-a-goldman-sachs-led-53-million-funding-round/", "first_party_historical", "Historical Deepwatch/Goldman $53M funding item; stale for current geography and not support for Denver queue without additional current corroboration."),
        ]:
            upsert_evidence(conn, *args)
        changes.append("source_evidence updated/inserted for corrected Josh.ai, AKASA, and Deepwatch source facts")

        # Draft hygiene: corrected copy and block hold rows from send-ready interpretation.
        josh_body = (
            "Internal attorney-review targeting vector only. Not approved for sending.\n\n"
            "Prospect: Josh.ai\nLane: ai-patent\nLead magnet/resource: AI Patent Strategy Scorecard /ai-patent-strategy-scorecard\n\n"
            "Vector: Josh.ai public patent page lists numerous provisional patent applications plus listed utility/design patents, alongside proprietary J++ language and voice AI. Patent Strategy Sprint could map public portfolio signals against smart home and healthcare AI competitive threats as they expand beyond residential.\n\n"
            "Value note: Value-first. No implication of deficiency. Connects public patent page to portfolio strategy opportunity.\n\n"
            "Guardrail: no outreach, LinkedIn action, workflow enrollment, CRM/Supabase live sync, Clio write, public/client-facing use, or external use without Jeff exact approval, attorney review, suppression/conflicts clearance, and source-current verification."
        )
        akasa_body = (
            "Internal attorney-review targeting vector only. Not approved for sending.\n\n"
            "Prospect: AKASA\nLane: ai-compliance\nLead magnet/resource: AI Compliance Gameplan Builder /ai-compliance-gameplan\n\n"
            "Vector: HOLD for Mountain-West-specific outreach until geography is reviewed: AKASA deploys AI in healthcare revenue cycle, but current checks support South San Francisco HQ with Denver hub/coworking presence only. Any AI Compliance Gameplan angle must remain attorney-review-only and not imply Denver HQ.\n\n"
            "Value note: Value-first internal note only. Geography/current-source review required before any named queue or external use.\n\n"
            "Guardrail: no outreach, LinkedIn action, workflow enrollment, CRM/Supabase live sync, Clio write, public/client-facing use, or external use without Jeff exact approval, attorney review, suppression/conflicts clearance, and source-current verification."
        )
        deep_body = (
            "Internal attorney-review targeting vector only. Not approved for sending.\n\n"
            "Prospect: Deepwatch\nLane: tech-gc\nLead magnet/resource: Tech Company Legal Health Checklist /colorado-tech-general-counsel\n\n"
            "Vector: HOLD — remove from Denver/Mountain West queue unless a current reliable source supports a Colorado nexus. If later revived, use corrected facts: Tampa, FL in Crunchbase News; founded 2019; $256M total raised per Crunchbase; John DiLullo CEO per first-party 2024 announcement based in Silicon Valley.\n\n"
            "Value note: Do not use for Agent Targeting or outreach prep until geography/current-source review clears; attorney-review-only internal note.\n\n"
            "Guardrail: no outreach, LinkedIn action, workflow enrollment, CRM/Supabase live sync, Clio write, public/client-facing use, or external use without Jeff exact approval, attorney review, suppression/conflicts clearance, and source-current verification."
        )
        update_draft(conn, IDS["draft_josh"], josh_body, [
            "Josh.ai first-party about page supports Denver, CO HQ/founding/product positioning; patent activity is separately supported by the patents page.",
            "Tim Gill (CTO, Denver) built J++. Alex Capecelatro (CEO). Lutron co-op. Growing team.",
            "Josh.ai company LinkedIn page only; company-level directory evidence, not a person-level URL or primary contact evidence.",
            "Josh.ai public patent page lists numerous provisional patent applications plus listed utility/design patents; use source-exact wording and attorney review before external copy.",
        ], ["https://josh.ai/about/", "https://josh.ai/team", "https://www.linkedin.com/company/joshai", "https://josh.ai/patents/"], "drafted", f"Patched by local DB reconciliation {TASK_ID}; attorney-review only; no external action authorized; no tags/manual/no-post for social copy.")
        update_draft(conn, IDS["draft_akasa"], akasa_body, [
            "Top AI revenue cycle leader recognition and CEO quote from Malinka Walaliyadde; source does not support Denver HQ.",
            "Co-founder ex-a16z interview on AI governance in healthcare. Leadership AI awareness confirmed.",
            "Innovator CEO profile. Former a16z. Co-founded to address healthcare financial complexity.",
            "AKASA careers page describes a remote-friendly hybrid organization with hubs in the Bay Area, NYC, and Denver; supports Denver hub presence, not Denver HQ.",
            "Built In profile lists AKASA headquarters as South San Francisco, CA, with Denver, CO as a coworking hub/office; use only as current directory corroboration.",
        ], ["https://akasa.com/press/top-ai-revenue-cycle-leader-black-book", "https://datainnovation.org/2025/02/5-qs-for-malinka-walaliyadde-co-founder-of-akasa/", "https://www.healthevolution.com/insider/innovator-ceo-profile-akasas-malinka-walaliyadde/", "https://akasa.com/careers/", "https://www.builtinsf.com/company/akasa/offices"], "blocked_not_send_ready", f"HOLD after local DB reconciliation {TASK_ID}: geography/current-source review required; not Mountain-West send-ready.")
        update_draft(conn, IDS["draft_deepwatch"], deep_body, [
            "Crunchbase News describes Deepwatch as Tampa, Florida-based, founded in 2019, with $180M financing and $256M total raised; CEO in that 2023 article was Charlie Thomas.",
            "Deepwatch first-party 2024 announcement names John DiLullo CEO effective July 2, 2024 and says he will be based in Silicon Valley.",
            "Historical Deepwatch/Goldman $53M funding item; stale for current geography and not support for Denver queue without additional current corroboration.",
        ], ["https://news.crunchbase.com/cybersecurity/startup-venture-funding-deepwatch/", "https://www.deepwatch.com/deepwatch-names-john-dilullo-as-chief-executive-officer/", "https://www.deepwatch.com/cybersecurity-startup-deepwatch-just-nabbed-a-goldman-sachs-led-53-million-funding-round/"], "blocked_not_send_ready", f"HOLD/removed after local DB reconciliation {TASK_ID}: no current Denver/Mountain-West nexus verified; not send-ready.")
        changes.append("outreach_drafts corrected; AKASA and Deepwatch marked blocked_not_send_ready while Josh.ai remains attorney-review-only drafted")

        update_approval(conn, IDS["approval_josh"], josh_body, "pending", f"Patched by {TASK_ID}; attorney-review-only; external action remains blocked.")
        update_approval(conn, IDS["approval_akasa"], akasa_body, "blocked_not_send_ready", f"HOLD after {TASK_ID}; geography/current-source review required before any queue or approval.")
        update_approval(conn, IDS["approval_deepwatch"], deep_body, "blocked_not_send_ready", f"HOLD/removed after {TASK_ID}; no current Denver/Mountain-West nexus verified.")
        changes.append("approval_items excerpts/statuses aligned with corrected drafts and HOLD rows")

        # Sync and work-item quarantine: prevent pending HOLD rows from being interpreted as cleared.
        sync_blockers = {
            IDS["sync_josh"]: "Blocked by local DB reconciliation t_d9b5c7ee: Josh.ai remains attorney-review-only; no CRM/Supabase/HighLevel sync without exact Jeff approval, suppression/conflicts/source-current clearance, and final approved copy.",
            IDS["sync_akasa"]: "Blocked by local DB reconciliation t_d9b5c7ee: AKASA is HOLD for Mountain-West queue; South San Francisco HQ with Denver hub/coworking presence only; no CRM/Supabase/HighLevel sync until geography review clears.",
            IDS["sync_deepwatch"]: "Blocked by local DB reconciliation t_d9b5c7ee: Deepwatch removed from Denver/Mountain-West queue; no current Colorado nexus verified; no CRM/Supabase/HighLevel sync unless a later current reliable source clears geography.",
        }
        for sync_id, reason in sync_blockers.items():
            conn.execute(
                "UPDATE crm_sync_records SET eligibility_status='blocked', sync_status='blocked', block_reason=?, updated_at=? WHERE sync_record_id=?",
                (reason, NOW, sync_id),
            )
        changes.append("crm_sync_records moved from pending/not_checked to blocked/blocked with explicit no-sync reasons")

        work_updates = {
            IDS["work_josh"]: ("queued", 80, "External actions blocked: no outreach, email/SMS, workflow activation/enrollment, trigger tags, LinkedIn/social action, Clio writes, public/client-facing changes, or live CRM/Supabase sync without Jeff exact approval; attorney review, conflicts, suppression, and source-current verification required before external use. Patched by local DB reconciliation t_d9b5c7ee."),
            IDS["work_akasa"]: ("blocked", 0, "HOLD after local DB reconciliation t_d9b5c7ee: AKASA is South San Francisco HQ with Denver/Colorado hub/coworking presence only; no Mountain-West-specific Agent Targeting or external/sync action until geography/current-source review clears."),
            IDS["work_deepwatch"]: ("blocked", 0, "HOLD/removed after local DB reconciliation t_d9b5c7ee: Deepwatch has no current verified Denver/Mountain-West nexus; do not prepare Agent Targeting or external/sync action unless later current reliable source clears geography."),
        }
        for work_id, (stage, priority, blocker) in work_updates.items():
            conn.execute("UPDATE work_items SET stage=?, priority=?, blocker=?, external_action_allowed=0, approval_required=1, risk_level='attorney_review_required', updated_at=? WHERE work_item_id=?", (stage, priority, blocker, NOW, work_id))
        changes.append("Agent Targeting work_items quarantined for AKASA/Deepwatch; Josh.ai remains queued but guarded")

        # Keep suppression rows explicitly not cleared and add stronger notes.
        suppression_notes = {
            IDS["josh"]: "Attorney-review gate remains not cleared; no outreach authorized; local DB reconciliation t_d9b5c7ee preserved no-send posture.",
            IDS["akasa"]: "Not cleared; AKASA geography is HOLD (South San Francisco HQ; Denver hub/coworking only) and no Mountain-West targeting/sync is authorized.",
            IDS["deepwatch"]: "Not cleared; Deepwatch removed from Denver/Mountain-West queue and no targeting/sync is authorized without current geography clearance.",
        }
        for prospect_id, note in suppression_notes.items():
            conn.execute("UPDATE suppression_checks SET final_clearance='not_cleared', whiteford_conflicts_status='required_before_send', opt_out_status='not_checked', duplicate_prior_touch_status='not_checked', notes=?, checked_at=? WHERE prospect_id=?", (note, NOW, prospect_id))
        changes.append("suppression_checks verified/preserved as not_cleared and conflicts required")

        # Internal audit log only.
        conn.execute(
            """
            INSERT INTO crm_audit_log (audit_id, crm_provider, event_type, related_table, related_id, summary, artifact_path, created_at)
            VALUES (?, 'local_sqlite', 'data_hygiene_reconciliation', 'prospects', ?, ?, ?, ?)
            """,
            (
                "audit_" + uuid.uuid4().hex[:24],
                ",".join(PROSPECT_IDS),
                "Local/internal May 23 DB reconciliation for AKASA geography HOLD, Deepwatch Mountain-West removal, Tim Gill/Josh.ai LinkedIn hygiene, and blocked sync posture. No external action performed.",
                str(OUT_DIR / f"2026-05-23_may23_local_db_reconciliation_{TASK_ID}.md"),
                NOW,
            ),
        )
        changes.append("crm_audit_log internal local_sqlite audit row inserted")

    after = snapshot(conn)
    AFTER_JSON.write_text(json.dumps(after, indent=2, ensure_ascii=False) + "\n")
    integrity = conn.execute("PRAGMA integrity_check").fetchone()[0]
    conn.close()
    print(json.dumps({"updated_at": NOW, "changes": changes, "before_json": str(BEFORE_JSON), "after_json": str(AFTER_JSON), "integrity_check": integrity}, indent=2))


if __name__ == "__main__":
    main()
