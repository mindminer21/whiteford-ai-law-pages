#!/usr/bin/env python3
"""Read-only HighLevel guardrail v2 custom-field verifier.

Default mode reads the saved API probe JSON. Optional --live-read-only mode makes
one GET request to /locations/{locationId}/customFields and never uses POST, PUT,
PATCH, DELETE, enrollment, workflow, contact, opportunity, or message endpoints.
"""

from __future__ import annotations

import argparse
import json
import os
import sys
import urllib.error
import urllib.request
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

LOCATION_ID = "tm68WWMrcAa3TqQbEAMa"
API_VERSION = "2021-07-28"
API_BASE = "https://services.leadconnectorhq.com"

EXPECTED_FIELDS: list[dict[str, str]] = [
    {"key": "approval_status", "name": "Approval Status", "type": "TEXT"},
    {"key": "consent_basis", "name": "Consent Basis", "type": "TEXT"},
    {"key": "privacy_guardrail_version", "name": "Privacy Guardrail Version", "type": "TEXT"},
    {"key": "public_form_input_type", "name": "Public Form Input Type", "type": "TEXT"},
    {"key": "disclaimer_acknowledged", "name": "Disclaimer Acknowledged", "type": "TEXT"},
    {"key": "report_requested", "name": "Report Requested", "type": "TEXT"},
    {"key": "ai_compliance_maturity_level", "name": "AI Compliance Maturity Level", "type": "TEXT"},
    {"key": "ai_compliance_category_scores", "name": "AI Compliance Category Scores", "type": "LARGE_TEXT"},
    {"key": "ai_compliance_top_gaps", "name": "AI Compliance Top Gaps", "type": "LARGE_TEXT"},
    {"key": "ai_compliance_recommended_next_step", "name": "AI Compliance Recommended Next Step", "type": "TEXT"},
    {"key": "ai_compliance_heat_map", "name": "AI Compliance Heat Map", "type": "LARGE_TEXT"},
    {"key": "ai_compliance_10_day_fixes", "name": "AI Compliance 10 Day Fixes", "type": "LARGE_TEXT"},
    {"key": "ai_compliance_roadmap_30_60_90", "name": "AI Compliance Roadmap 30 60 90", "type": "LARGE_TEXT"},
    {"key": "ai_compliance_report_version", "name": "AI Compliance Report Version", "type": "TEXT"},
    {"key": "ai_patent_score", "name": "AI Patent Score", "type": "NUMERICAL"},
    {"key": "ai_patent_stage", "name": "AI Patent Stage", "type": "TEXT"},
    {"key": "ai_patent_score_band", "name": "AI Patent Score Band", "type": "TEXT"},
    {"key": "ai_patent_checks", "name": "AI Patent Checks", "type": "LARGE_TEXT"},
    {"key": "ai_patent_privacy_guardrail_version", "name": "AI Patent Privacy Guardrail Version", "type": "TEXT"},
    {"key": "ai_patent_report_version", "name": "AI Patent Report Version", "type": "TEXT"},
    {"key": "ai_patent_recommended_next_step", "name": "AI Patent Recommended Next Step", "type": "TEXT"},
    {"key": "ma_readiness_privacy_guardrail_version", "name": "M&A Readiness Privacy Guardrail Version", "type": "TEXT"},
    {"key": "ma_readiness_input_type", "name": "M&A Readiness Input Type", "type": "TEXT"},
    {"key": "ma_readiness_report_version", "name": "M&A Readiness Report Version", "type": "TEXT"},
    {"key": "ma_readiness_score", "name": "M&A Readiness Score", "type": "NUMERICAL"},
    {"key": "ma_readiness_band", "name": "M&A Readiness Band", "type": "TEXT"},
    {"key": "ma_readiness_answers_json", "name": "M&A Readiness Answers JSON", "type": "LARGE_TEXT"},
    {"key": "tech_legal_health_privacy_guardrail_version", "name": "Tech Legal Health Privacy Guardrail Version", "type": "TEXT"},
    {"key": "tech_legal_health_report_version", "name": "Tech Legal Health Report Version", "type": "TEXT"},
    {"key": "tech_legal_health_score", "name": "Tech Legal Health Score", "type": "NUMERICAL"},
    {"key": "tech_legal_health_band", "name": "Tech Legal Health Band", "type": "TEXT"},
    {"key": "tech_legal_health_company_moment", "name": "Tech Legal Health Company Moment", "type": "TEXT"},
    {"key": "tech_legal_health_lowest_category", "name": "Tech Legal Health Lowest Category", "type": "TEXT"},
    {"key": "tech_legal_health_category_scores", "name": "Tech Legal Health Category Scores", "type": "LARGE_TEXT"},
    {"key": "tech_legal_health_top_actions", "name": "Tech Legal Health Top Actions", "type": "LARGE_TEXT"},
    {"key": "tech_legal_health_branch_signals", "name": "Tech Legal Health Branch Signals", "type": "LARGE_TEXT"},
    {"key": "tech_legal_health_answers_json", "name": "Tech Legal Health Answers JSON", "type": "LARGE_TEXT"},
]


def normalize_type(value: Any) -> str:
    return str(value or "").strip().upper().replace(" ", "_").replace("-", "_")


def normalize_key(value: Any) -> str:
    key = str(value or "").strip()
    if key.startswith("contact."):
        key = key.split(".", 1)[1]
    return key


def load_fields_from_probe(path: Path) -> list[dict[str, Any]]:
    data = json.loads(path.read_text())
    if "customFields" in data and isinstance(data["customFields"], list):
        return data["customFields"]
    verification = data.get("fieldVerification", {})
    fields: list[dict[str, Any]] = []
    for key, value in verification.get("existing", {}).items():
        item = dict(value)
        item.setdefault("key", key)
        fields.append(item)
    for key, value in verification.get("missing", {}).items():
        item = dict(value)
        item.setdefault("key", key)
        item.setdefault("missingFromSavedProbe", True)
        fields.append(item)
    return fields


def fetch_fields_read_only(location_id: str, token: str) -> list[dict[str, Any]]:
    url = f"{API_BASE}/locations/{location_id}/customFields"
    request = urllib.request.Request(
        url,
        method="GET",
        headers={
            "Authorization": f"Bearer {token}",
            "Accept": "application/json",
            "Version": API_VERSION,
        },
    )
    with urllib.request.urlopen(request, timeout=30) as response:
        body = response.read().decode("utf-8")
    data = json.loads(body)
    fields = data.get("customFields") or data.get("fields") or data.get("data")
    if not isinstance(fields, list):
        raise RuntimeError(f"Unexpected custom fields response shape: {sorted(data.keys())}")
    return fields


def index_actual_fields(fields: list[dict[str, Any]]) -> dict[str, dict[str, Any]]:
    actual: dict[str, dict[str, Any]] = {}
    for field in fields:
        if field.get("missingFromSavedProbe"):
            continue
        candidates = [
            field.get("key"),
            field.get("fieldKey"),
            field.get("placeholder"),
            field.get("nameKey"),
        ]
        for candidate in candidates:
            key = normalize_key(candidate)
            if key:
                actual.setdefault(key, field)
    return actual


def compare(fields: list[dict[str, Any]]) -> dict[str, Any]:
    actual = index_actual_fields(fields)
    present: list[dict[str, Any]] = []
    missing: list[dict[str, str]] = []
    type_mismatches: list[dict[str, str]] = []
    key_risks: list[dict[str, str]] = []

    for expected in EXPECTED_FIELDS:
        field = actual.get(expected["key"])
        if not field:
            missing.append(expected)
            continue
        actual_type = normalize_type(field.get("dataType") or field.get("type") or field.get("fieldType"))
        actual_key = str(field.get("fieldKey") or field.get("key") or "")
        present.append({**expected, "actualFieldKey": actual_key, "actualType": actual_type, "id": str(field.get("id") or "")})
        if actual_type and actual_type != expected["type"]:
            type_mismatches.append({"key": expected["key"], "expectedType": expected["type"], "actualType": actual_type})
        if actual_key and actual_key != f"contact.{expected['key']}":
            key_risks.append({"key": expected["key"], "expectedFieldKey": f"contact.{expected['key']}", "actualFieldKey": actual_key})

    return {
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "locationId": LOCATION_ID,
        "scope": "read-only/dry-run field comparison only; no HighLevel mutation endpoints used",
        "expectedCount": len(EXPECTED_FIELDS),
        "presentCount": len(present),
        "missingCount": len(missing),
        "typeMismatchCount": len(type_mismatches),
        "fieldKeyRiskCount": len(key_risks),
        "present": present,
        "missing": missing,
        "typeMismatches": type_mismatches,
        "fieldKeyRisks": key_risks,
        "pass": not missing and not type_mismatches and not key_risks,
    }


def render_markdown(result: dict[str, Any]) -> str:
    lines = [
        "# HighLevel Guardrail v2 Field Verification Result",
        "",
        f"Generated: {result['generatedAt']}",
        f"Location: Whiteford Schell IP (`{result['locationId']}`)",
        f"Scope: {result['scope']}",
        "",
        "## Summary",
        "",
        f"- Expected fields: {result['expectedCount']}",
        f"- Present fields: {result['presentCount']}",
        f"- Missing fields: {result['missingCount']}",
        f"- Type mismatches: {result['typeMismatchCount']}",
        f"- Generated-key risks: {result['fieldKeyRiskCount']}",
        f"- Pass: {result['pass']}",
        "",
        "## Missing fields",
        "",
        "| API key | Display name | Type |",
        "| --- | --- | --- |",
    ]
    for field in result["missing"]:
        lines.append(f"| `{field['key']}` | {field['name']} | {field['type']} |")
    lines.extend(["", "## Type mismatches", "", "| API key | Expected | Actual |", "| --- | --- | --- |"])
    for item in result["typeMismatches"]:
        lines.append(f"| `{item['key']}` | {item['expectedType']} | {item['actualType']} |")
    lines.extend(["", "## Generated-key risks", "", "| API key | Expected field key | Actual field key |", "| --- | --- | --- |"])
    for item in result["fieldKeyRisks"]:
        lines.append(f"| `{item['key']}` | `{item['expectedFieldKey']}` | `{item['actualFieldKey']}` |")
    lines.append("")
    return "\n".join(lines)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Compare expected guardrail v2 fields to HighLevel read-only custom-field output.")
    parser.add_argument("--input", default="docs/highlevel_guardrail_v2_api_probe_2026-05-07.json", help="Saved JSON probe or customFields JSON file to inspect in dry-run mode.")
    parser.add_argument("--live-read-only", action="store_true", help="Make one read-only GET /locations/{locationId}/customFields call using env token.")
    parser.add_argument("--token-env", default="GHL_PRIVATE_INTEGRATION_TOKEN", help="Environment variable containing the HighLevel token for --live-read-only.")
    parser.add_argument("--location-id", default=LOCATION_ID, help="HighLevel location ID for --live-read-only.")
    parser.add_argument("--output-json", help="Optional path for JSON result.")
    parser.add_argument("--output-md", help="Optional path for Markdown result.")
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    try:
        if args.live_read_only:
            token = os.environ.get(args.token_env)
            if not token:
                raise RuntimeError(f"--live-read-only requires token in ${args.token_env}")
            fields = fetch_fields_read_only(args.location_id, token)
        else:
            fields = load_fields_from_probe(Path(args.input))
        result = compare(fields)
        text = json.dumps(result, indent=2, sort_keys=True)
        print(text)
        if args.output_json:
            Path(args.output_json).write_text(text + "\n")
        if args.output_md:
            Path(args.output_md).write_text(render_markdown(result))
        return 0 if result["pass"] else 2
    except (OSError, urllib.error.URLError, json.JSONDecodeError, RuntimeError) as exc:
        print(f"ERROR: {exc}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
