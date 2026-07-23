#!/usr/bin/env python3
"""Safe HighLevel operations setup for Whiteford/Schell IP.

Creates/verifies operational tags and contact custom fields for approval gates,
public-source enrichment, social draft status, and campaign hygiene.

This script does not send messages, publish content, activate workflows, create
contacts, enroll contacts, or mutate opportunities.
"""
from __future__ import annotations

import argparse
import json
import os
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path
from typing import Any

BASE = "https://services.leadconnectorhq.com"
VERSION = "2021-07-28"

OPS_TAGS = [
    "ops:approval-required",
    "ops:approval-approved",
    "ops:approval-revise",
    "ops:no-auto-send",
    "brand:whiteford-schellip",
    "workflow:draft-only",
    "workflow:manual-start",
    "enrichment:needs-research",
    "enrichment:public-source",
    "outreach:personalized-draft-ready",
    "outreach:do-not-send",
    "social:linkedin-draft",
    "social:attorney-review-required",
    "newsletter:daily-ai-authority",
]

OPS_CUSTOM_FIELDS = [
    ("Decision Maker Role", "decision_maker_role", "TEXT"),
    ("Decision Maker Priority", "decision_maker_priority", "TEXT"),
    ("LinkedIn Profile URL", "linkedin_profile_url", "TEXT"),
    ("Enrichment Source URL", "enrichment_source_url", "TEXT"),
    ("Enrichment Confidence", "enrichment_confidence", "NUMERICAL"),
    ("Consent Basis", "consent_basis", "TEXT"),
    ("Approval Status", "approval_status", "TEXT"),
    ("Last Human Review At", "last_human_review_at", "TEXT"),
    ("Outreach Hypothesis", "outreach_hypothesis", "LARGE_TEXT"),
    ("Personalized Content Angle", "personalized_content_angle", "LARGE_TEXT"),
    ("LinkedIn Draft Status", "linkedin_draft_status", "TEXT"),
    ("Suggested Offer Lane", "suggested_offer_lane", "TEXT"),
    ("Pipeline Next Action", "pipeline_next_action", "TEXT"),
]


def load_env() -> None:
    for candidate in [Path(".env.local"), Path(os.path.expanduser("~/.hermes/profiles/highlevel-ops/.env"))]:
        if not candidate.exists():
            continue
        for line in candidate.read_text().splitlines():
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            key, value = line.split("=", 1)
            os.environ.setdefault(key, value)


def req(method: str, path: str, token: str, body: dict[str, Any] | None = None, qs: dict[str, Any] | None = None) -> Any:
    url = BASE + path
    if qs:
        url += "?" + urllib.parse.urlencode({k: v for k, v in qs.items() if v is not None})
    data = None if body is None else json.dumps(body).encode()
    headers = {
        "Authorization": f"Bearer {token}",
        "Version": VERSION,
        "Accept": "application/json",
        "User-Agent": "whiteford-highlevel-ops-setup/1.0",
    }
    if body is not None:
        headers["Content-Type"] = "application/json"
    request = urllib.request.Request(url, data=data, headers=headers, method=method)
    try:
        with urllib.request.urlopen(request, timeout=30) as response:
            raw = response.read().decode()
            return json.loads(raw) if raw else {}
    except urllib.error.HTTPError as exc:
        detail = exc.read().decode(errors="replace")
        raise RuntimeError(f"{method} {path} failed HTTP {exc.code}: {detail}") from exc


def get_tags(token: str, location_id: str) -> list[dict[str, Any]]:
    out = req("GET", f"/locations/{location_id}/tags", token)
    return out.get("tags") or out.get("data") or []


def create_tag(token: str, location_id: str, name: str) -> dict[str, Any]:
    return req("POST", f"/locations/{location_id}/tags", token, {"name": name})


def get_fields(token: str, location_id: str) -> list[dict[str, Any]]:
    out = req("GET", f"/locations/{location_id}/customFields", token)
    return out.get("customFields") or out.get("fields") or []


def create_field(token: str, location_id: str, name: str, key: str, data_type: str) -> dict[str, Any]:
    return req("POST", f"/locations/{location_id}/customFields", token, {
        "name": name,
        "dataType": data_type,
        "placeholder": key,
    })


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--apply", action="store_true", help="Create missing operational tags/custom fields.")
    parser.add_argument("--out", default="docs/highlevel_ops_setup_results.json")
    args = parser.parse_args()

    load_env()
    token = os.environ.get("GHL_PRIVATE_INTEGRATION_TOKEN")
    location_id = os.environ.get("GHL_LOCATION_ID")
    if not token or not location_id:
        print("Missing GHL_PRIVATE_INTEGRATION_TOKEN or GHL_LOCATION_ID", file=sys.stderr)
        return 2

    result: dict[str, Any] = {
        "locationId": location_id,
        "apply": args.apply,
        "safeScope": "tags and contact custom fields only",
        "tags": {},
        "customFields": {},
    }

    existing_tags = {
        str(tag.get("name") or tag.get("tag") or "").strip(): tag
        for tag in get_tags(token, location_id)
    }
    for name in OPS_TAGS:
        if name in existing_tags:
            result["tags"][name] = {"status": "existing", "id": existing_tags[name].get("id")}
        elif args.apply:
            created = create_tag(token, location_id, name)
            result["tags"][name] = {"status": "created", "response": created}
            time.sleep(0.15)
        else:
            result["tags"][name] = {"status": "missing"}

    fields = get_fields(token, location_id)
    field_lookup: dict[str, dict[str, Any]] = {}
    for field in fields:
        for value in [field.get("name"), field.get("fieldKey"), field.get("key"), field.get("placeholder")]:
            if value:
                field_lookup[str(value).strip().lower()] = field

    for name, key, data_type in OPS_CUSTOM_FIELDS:
        match = field_lookup.get(name.lower()) or field_lookup.get(key.lower()) or field_lookup.get(f"contact.{key}".lower())
        if match:
            result["customFields"][key] = {
                "status": "existing",
                "id": match.get("id"),
                "name": match.get("name"),
                "fieldKey": match.get("fieldKey"),
                "dataType": match.get("dataType"),
            }
        elif args.apply:
            created = create_field(token, location_id, name, key, data_type)
            result["customFields"][key] = {"status": "created", "response": created}
            time.sleep(0.15)
        else:
            result["customFields"][key] = {"status": "missing", "name": name, "dataType": data_type}

    out_path = Path(args.out)
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(json.dumps(result, indent=2, sort_keys=True) + "\n")

    print(json.dumps({
        "out": str(out_path.resolve()),
        "tags_created": sum(1 for item in result["tags"].values() if item["status"] == "created"),
        "tags_existing": sum(1 for item in result["tags"].values() if item["status"] == "existing"),
        "tags_missing": sum(1 for item in result["tags"].values() if item["status"] == "missing"),
        "fields_created": sum(1 for item in result["customFields"].values() if item["status"] == "created"),
        "fields_existing": sum(1 for item in result["customFields"].values() if item["status"] == "existing"),
        "fields_missing": sum(1 for item in result["customFields"].values() if item["status"] == "missing"),
    }, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
