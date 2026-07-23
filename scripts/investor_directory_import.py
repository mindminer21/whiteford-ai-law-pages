#!/usr/bin/env python3
"""Import investor-directory JSONL into Supabase.

Default mode is dry-run validation. Use --apply only after source/license review
and with SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY set in the environment.

Input record shape is intentionally nested and source-provenance-first:
{
  "source_key": "signal_nfx",
  "source_url": "https://signal.nfx.com/investors/...",
  "investor": {...},
  "firm": {...},
  "stages": ["Seed"],
  "sectors": [{"sector": "SaaS", "stage": "Seed", "source_url": "..."}],
  "geographies": [{"geography": "San Francisco Bay Area", "kind": "source_list", "source_url": "..."}],
  "investments": [{"company": {...}, "company_people": [...], ...}],
  "evidence_excerpt": "short public-source excerpt"
}
"""
from __future__ import annotations

import argparse
import datetime as dt
import hashlib
import json
import os
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path
from typing import Any

VALID_STAGES = {"Pre-Seed", "Seed", "Series A", "Series B", "Series C+", "Growth", "Unknown"}
VALID_INVESTOR_KINDS = {
    "vc",
    "angel",
    "scout",
    "solo_capitalist",
    "corporate_vc",
    "accelerator",
    "family_office",
    "unknown",
}
VALID_GEO_KINDS = {"investor_location", "relationship_market", "investment_interest", "source_list"}
VALID_PERSON_KINDS = {"ceo", "founder", "cofounder", "president", "executive", "unknown"}
VALID_INVESTOR_ROLES = {"lead", "co-investor", "participant", "unknown"}


def slugify(value: str) -> str:
    slug = re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-")
    return slug or "unknown"


def compact_usd(value: Any) -> int | None:
    if value in (None, ""):
        return None
    if isinstance(value, int):
        return value
    if isinstance(value, float):
        return int(value)
    text = str(value).strip().replace(",", "").replace("$", "")
    multiplier = 1
    if text.lower().endswith("k"):
        multiplier = 1_000
        text = text[:-1]
    elif text.lower().endswith("m"):
        multiplier = 1_000_000
        text = text[:-1]
    elif text.lower().endswith("b"):
        multiplier = 1_000_000_000
        text = text[:-1]
    return int(float(text) * multiplier)


def parse_round_date(value: Any) -> str | None:
    if not value:
        return None
    text = str(value).strip()
    for fmt in ("%b %Y", "%B %Y", "%Y-%m-%d", "%Y-%m"):
        try:
            parsed = dt.datetime.strptime(text, fmt)
            return parsed.date().isoformat()
        except ValueError:
            continue
    return None


def evidence_hash(record: dict[str, Any]) -> str:
    material = json.dumps(record, sort_keys=True, ensure_ascii=False)
    return hashlib.sha256(material.encode("utf-8")).hexdigest()


def validate_url(value: Any, errors: list[str], field: str, required: bool = False) -> str | None:
    if value in (None, ""):
        if required:
            errors.append(f"{field} is required")
        return None
    text = str(value).strip()
    parsed = urllib.parse.urlparse(text)
    if parsed.scheme not in {"http", "https"} or not parsed.netloc:
        errors.append(f"{field} must be an http(s) URL: {text}")
    return text


def validate_record(record: dict[str, Any], line_no: int) -> tuple[dict[str, Any], list[str]]:
    errors: list[str] = []
    if not isinstance(record, dict):
        return {}, [f"line {line_no}: record must be an object"]

    source_key = str(record.get("source_key") or "").strip()
    if not source_key:
        errors.append("source_key is required")
    source_url = validate_url(record.get("source_url"), errors, "source_url", required=True)

    investor = record.get("investor")
    if not isinstance(investor, dict):
        errors.append("investor object is required")
        investor = {}
    name = str(investor.get("canonical_name") or "").strip()
    if not name:
        errors.append("investor.canonical_name is required")
    investor_slug = str(investor.get("slug") or slugify(name)).strip()
    kind = str(investor.get("investor_kind") or "unknown")
    if kind not in VALID_INVESTOR_KINDS:
        errors.append(f"investor.investor_kind must be one of {sorted(VALID_INVESTOR_KINDS)}")
    profile_url = validate_url(investor.get("profile_url") or source_url, errors, "investor.profile_url", required=True)

    firm = record.get("firm") or {}
    if firm and not isinstance(firm, dict):
        errors.append("firm must be an object when provided")
        firm = {}

    normalized = {
        "source_key": source_key,
        "source_url": source_url,
        "investor": {
            "canonical_name": name,
            "slug": investor_slug,
            "investor_kind": kind,
            "title": investor.get("title"),
            "primary_firm_name": investor.get("primary_firm_name") or firm.get("canonical_name"),
            "profile_url": profile_url,
            "signal_url": investor.get("signal_url") or (profile_url if source_key == "signal_nfx" else None),
            "pitchbook_url": investor.get("pitchbook_url"),
            "crunchbase_url": investor.get("crunchbase_url"),
            "linkedin_url": investor.get("linkedin_url"),
            "twitter_url": investor.get("twitter_url"),
            "personal_website_url": investor.get("personal_website_url"),
            "location_city": investor.get("location_city"),
            "location_region": investor.get("location_region"),
            "location_country": investor.get("location_country"),
            "investment_min_usd": compact_usd(investor.get("investment_min_usd")),
            "investment_max_usd": compact_usd(investor.get("investment_max_usd")),
            "investment_sweet_spot_usd": compact_usd(investor.get("investment_sweet_spot_usd")),
            "current_fund_size_usd": compact_usd(investor.get("current_fund_size_usd")),
            "investments_on_record": investor.get("investments_on_record"),
            "summary": investor.get("summary"),
            "source_confidence": investor.get("source_confidence", 0.6),
        },
        "firm": None,
        "stages": [],
        "sectors": [],
        "geographies": [],
        "investments": [],
        "evidence_excerpt": record.get("evidence_excerpt"),
        "structured_payload": record.get("structured_payload") or {},
    }

    if firm.get("canonical_name"):
        normalized["firm"] = {
            "canonical_name": firm.get("canonical_name"),
            "slug": firm.get("slug") or slugify(str(firm.get("canonical_name"))),
            "website_url": firm.get("website_url"),
            "signal_url": firm.get("signal_url"),
            "pitchbook_url": firm.get("pitchbook_url"),
            "crunchbase_url": firm.get("crunchbase_url"),
            "linkedin_url": firm.get("linkedin_url"),
            "headquarters": firm.get("headquarters"),
            "source_confidence": firm.get("source_confidence", 0.6),
        }

    for stage in record.get("stages") or []:
        if stage not in VALID_STAGES:
            errors.append(f"invalid stage: {stage}")
        normalized["stages"].append(stage)

    for item in record.get("sectors") or []:
        if not isinstance(item, dict):
            errors.append("sector entries must be objects")
            continue
        stage = item.get("stage") or "Unknown"
        if stage not in VALID_STAGES:
            errors.append(f"invalid sector stage: {stage}")
        normalized["sectors"].append({
            "sector": str(item.get("sector") or "").strip(),
            "stage": stage,
            "source_url": item.get("source_url") or source_url,
            "ranking_label": item.get("ranking_label"),
            "confidence": item.get("confidence", 0.7),
        })

    for item in record.get("geographies") or []:
        if not isinstance(item, dict):
            errors.append("geography entries must be objects")
            continue
        kind = item.get("kind") or item.get("geography_kind") or "source_list"
        if kind not in VALID_GEO_KINDS:
            errors.append(f"invalid geography kind: {kind}")
        normalized["geographies"].append({
            "geography": str(item.get("geography") or "").strip(),
            "geography_kind": kind,
            "source_url": item.get("source_url") or source_url,
            "confidence": item.get("confidence", 0.6),
        })

    for item in record.get("investments") or []:
        if not isinstance(item, dict):
            errors.append("investment entries must be objects")
            continue
        company = item.get("company") or {}
        if not isinstance(company, dict) or not company.get("canonical_name"):
            errors.append("investment.company.canonical_name is required")
            continue
        investor_role = item.get("investor_role") or "unknown"
        if investor_role not in VALID_INVESTOR_ROLES:
            errors.append(f"invalid investor_role: {investor_role}")
        people = []
        for person in item.get("company_people") or []:
            role_kind = person.get("role_kind") or "unknown"
            if role_kind not in VALID_PERSON_KINDS:
                errors.append(f"invalid company_people.role_kind: {role_kind}")
            people.append({
                "person_name": person.get("person_name"),
                "role_title": person.get("role_title") or role_kind.upper(),
                "role_kind": role_kind,
                "linkedin_url": person.get("linkedin_url"),
                "source_url": person.get("source_url") or item.get("source_url") or source_url,
                "source_confidence": person.get("source_confidence", 0.5),
            })
        normalized["investments"].append({
            "company": {
                "canonical_name": company.get("canonical_name"),
                "slug": company.get("slug") or slugify(str(company.get("canonical_name"))),
                "website_url": company.get("website_url"),
                "signal_url": company.get("signal_url"),
                "pitchbook_url": company.get("pitchbook_url"),
                "crunchbase_url": company.get("crunchbase_url"),
                "linkedin_url": company.get("linkedin_url"),
                "headquarters": company.get("headquarters"),
                "sector": company.get("sector"),
                "summary": company.get("summary"),
                "source_confidence": company.get("source_confidence", 0.5),
            },
            "company_people": people,
            "round_stage": item.get("round_stage"),
            "round_date": parse_round_date(item.get("round_date")),
            "round_month": item.get("round_month") or item.get("round_date"),
            "round_size_usd": compact_usd(item.get("round_size_usd")),
            "total_raised_usd": compact_usd(item.get("total_raised_usd")),
            "investor_role": investor_role,
            "source_url": item.get("source_url") or source_url,
            "source_confidence": item.get("source_confidence", 0.6),
            "notes": item.get("notes"),
            "co_investors": item.get("co_investors") or [],
        })

    for url_field in ("signal_url", "pitchbook_url", "crunchbase_url", "linkedin_url", "twitter_url", "personal_website_url"):
        validate_url(normalized["investor"].get(url_field), errors, f"investor.{url_field}")

    return normalized, [f"line {line_no}: {error}" for error in errors]


class SupabaseClient:
    def __init__(self, url: str, key: str):
        self.base = url.rstrip("/") + "/rest/v1"
        self.headers = {
            "apikey": key,
            "Authorization": f"Bearer {key}",
            "Content-Type": "application/json",
            "Prefer": "resolution=merge-duplicates,return=representation",
        }

    def request(self, method: str, table: str, payload: Any | None = None, query: str = "") -> Any:
        url = f"{self.base}/{table}{query}"
        data = None if payload is None else json.dumps(payload).encode("utf-8")
        req = urllib.request.Request(url, data=data, headers=self.headers, method=method)
        try:
            with urllib.request.urlopen(req, timeout=30) as response:
                body = response.read().decode("utf-8")
                return json.loads(body) if body else None
        except urllib.error.HTTPError as exc:
            body = exc.read().decode("utf-8", errors="replace")
            raise RuntimeError(f"Supabase {method} {table} failed: {exc.code} {body}") from exc

    def upsert(self, table: str, rows: list[dict[str, Any]], conflict: str) -> list[dict[str, Any]]:
        if not rows:
            return []
        query = "?on_conflict=" + urllib.parse.quote(conflict)
        return self.request("POST", table, rows, query=query) or []

    def select_one(self, table: str, column: str, value: str) -> dict[str, Any] | None:
        query = f"?select=*&{urllib.parse.quote(column)}=eq.{urllib.parse.quote(value)}&limit=1"
        result = self.request("GET", table, None, query=query)
        return result[0] if result else None


def source_id(client: SupabaseClient, source_key: str) -> str:
    row = client.select_one("investor_sources", "source_key", source_key)
    if not row:
        raise RuntimeError(f"source_key not found in investor_sources: {source_key}; run migration first")
    return row["id"]


def apply_record(client: SupabaseClient, record: dict[str, Any], batch_id: str | None = None) -> None:
    sid = source_id(client, record["source_key"])

    firm_id = None
    firm = record.get("firm")
    if firm:
        firm_row = client.upsert("firms", [strip_none(firm)], "slug")[0]
        firm_id = firm_row["id"]

    investor = strip_none(record["investor"] | {"primary_firm_id": firm_id})
    investor_row = client.upsert("investors", [investor], "slug")[0]
    investor_id = investor_row["id"]

    if firm:
        client.upsert(
            "investor_firm_roles",
            [strip_none({
                "investor_id": investor_id,
                "firm_id": firm_id,
                "firm_name": firm["canonical_name"],
                "role_title": investor.get("title"),
                "is_current": True,
                "source_id": sid,
                "source_url": record["source_url"],
            })],
            "investor_id,firm_name,role_title,is_current",
        )

    client.upsert(
        "investor_stages",
        [strip_none({"investor_id": investor_id, "stage": stage, "source_id": sid, "source_url": record["source_url"]}) for stage in set(record["stages"])],
        "investor_id,stage,source_url",
    )
    client.upsert(
        "investor_sectors",
        [strip_none(item | {"investor_id": investor_id, "source_id": sid}) for item in record["sectors"] if item.get("sector")],
        "investor_id,sector,stage,source_hash",
    )
    client.upsert(
        "investor_geographies",
        [strip_none(item | {"investor_id": investor_id, "source_id": sid}) for item in record["geographies"] if item.get("geography")],
        "investor_id,geography,geography_kind,source_url",
    )

    for investment in record["investments"]:
        company_row = client.upsert("companies", [strip_none(investment["company"])], "slug")[0]
        company_id = company_row["id"]
        for person in investment["company_people"]:
            if person.get("person_name"):
                client.upsert(
                    "company_people",
                    [strip_none(person | {"company_id": company_id, "source_id": sid})],
                    "company_id,person_name,role_kind,source_url",
                )
        investment_payload = strip_none({
            "investor_id": investor_id,
            "company_id": company_id,
            "round_stage": investment.get("round_stage"),
            "round_date": investment.get("round_date"),
            "round_month": investment.get("round_month"),
            "round_size_usd": investment.get("round_size_usd"),
            "total_raised_usd": investment.get("total_raised_usd"),
            "investor_role": investment.get("investor_role"),
            "source_id": sid,
            "source_url": investment.get("source_url"),
            "source_confidence": investment.get("source_confidence"),
            "notes": investment.get("notes"),
        })
        inv_row = client.upsert("investments", [investment_payload], "investor_id,company_id,round_stage,round_month,source_hash")[0]
        co_rows = []
        for co in investment.get("co_investors") or []:
            if isinstance(co, str):
                co_rows.append({"investment_id": inv_row["id"], "co_investor_name": co, "source_url": investment.get("source_url")})
            elif isinstance(co, dict) and co.get("co_investor_name"):
                co_rows.append(strip_none(co | {"investment_id": inv_row["id"], "source_url": co.get("source_url") or investment.get("source_url")}))
        client.upsert("investment_co_investors", co_rows, "investment_id,co_investor_name")

    client.upsert(
        "source_observations",
        [strip_none({
            "source_id": sid,
            "batch_id": batch_id,
            "entity_type": "investor",
            "entity_slug": record["investor"]["slug"],
            "source_url": record["source_url"],
            "evidence_hash": evidence_hash(record),
            "evidence_excerpt": record.get("evidence_excerpt"),
            "structured_payload": record.get("structured_payload") or {},
            "confidence": record["investor"].get("source_confidence", 0.6),
        })],
        "evidence_hash",
    )


def strip_none(obj: dict[str, Any]) -> dict[str, Any]:
    return {k: v for k, v in obj.items() if v is not None}


def iter_jsonl(path: Path):
    with path.open("r", encoding="utf-8") as handle:
        for line_no, line in enumerate(handle, 1):
            line = line.strip()
            if not line or line.startswith("#"):
                continue
            try:
                yield line_no, json.loads(line)
            except json.JSONDecodeError as exc:
                yield line_no, {"__json_error__": str(exc)}


def main() -> int:
    parser = argparse.ArgumentParser(description="Validate/import investor directory JSONL into Supabase")
    parser.add_argument("input", type=Path, help="JSONL input file")
    parser.add_argument("--apply", action="store_true", help="Write to Supabase instead of dry-run validation")
    parser.add_argument("--rate-limit-seconds", type=float, default=0.0, help="Delay between Supabase writes")
    args = parser.parse_args()

    all_errors: list[str] = []
    normalized_records: list[dict[str, Any]] = []
    for line_no, raw in iter_jsonl(args.input):
        if "__json_error__" in raw:
            all_errors.append(f"line {line_no}: invalid JSON: {raw['__json_error__']}")
            continue
        normalized, errors = validate_record(raw, line_no)
        all_errors.extend(errors)
        if not errors:
            normalized_records.append(normalized)

    if all_errors:
        print("Validation failed:", file=sys.stderr)
        for error in all_errors:
            print(f"- {error}", file=sys.stderr)
        return 2

    print(f"Validated {len(normalized_records)} investor records from {args.input}")

    if not args.apply:
        by_source: dict[str, int] = {}
        investments = 0
        companies = set()
        for record in normalized_records:
            by_source[record["source_key"]] = by_source.get(record["source_key"], 0) + 1
            investments += len(record["investments"])
            companies.update(inv["company"]["slug"] for inv in record["investments"])
        print(json.dumps({"mode": "dry_run", "sources": by_source, "investments": investments, "companies": len(companies)}, indent=2))
        return 0

    supabase_url = os.environ.get("SUPABASE_URL")
    service_key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")
    if not supabase_url or not service_key:
        print("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required for --apply", file=sys.stderr)
        return 2

    client = SupabaseClient(supabase_url, service_key)
    batch_key = f"investor-directory-{dt.datetime.now(dt.UTC).strftime('%Y%m%d%H%M%S')}"
    first_source = normalized_records[0]["source_key"] if normalized_records else "manual_public_research"
    sid = source_id(client, first_source)
    batch = client.upsert(
        "investor_import_batches",
        [{
            "source_id": sid,
            "batch_key": batch_key,
            "import_mode": "production",
            "input_file": str(args.input),
            "record_count": len(normalized_records),
            "notes": "Imported by investor_directory_import.py after source/license review.",
        }],
        "batch_key",
    )[0]
    for idx, record in enumerate(normalized_records, 1):
        apply_record(client, record, batch_id=batch["id"])
        print(f"{idx}/{len(normalized_records)} imported {record['investor']['canonical_name']}")
        if args.rate_limit_seconds:
            time.sleep(args.rate_limit_seconds)
    client.upsert("investor_import_batches", [{"batch_key": batch_key, "completed_at": dt.datetime.now(dt.UTC).isoformat()}], "batch_key")
    print(f"Completed batch {batch_key}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
