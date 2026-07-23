#!/usr/bin/env python3
"""Safe HighLevel setup/verification for Whiteford campaign lanes.

Reads GHL_PRIVATE_INTEGRATION_TOKEN and GHL_LOCATION_ID from environment or .env.local.
Creates missing contact tags and custom fields only. Does not send emails, message contacts,
or activate workflows.
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

CAMPAIGNS = {
    "ai-compliance": {
        "label": "AI Compliance Readiness Nurture",
        "leadMagnet": "AI Compliance Gameplan Builder",
        "triggerTag": "workflow:ai-compliance-readiness",
        "tags": ["leadmagnet:ai-compliance-gameplan", "interest:ai-compliance", "newsletter:ai"],
        "offer": "AI Compliance Readiness Sprint",
    },
    "ai-patent": {
        "label": "AI Patent Strategy Nurture",
        "leadMagnet": "AI Patent Strategy Scorecard",
        "triggerTag": "workflow:ai-patent-strategy",
        "tags": ["leadmagnet:ai-patent-scorecard", "interest:ai-patent-law", "newsletter:ai"],
        "offer": "AI Patent Strategy Sprint",
    },
    "tech-gc": {
        "label": "Tech GC Launchpad Nurture",
        "leadMagnet": "Colorado Tech Company Legal Health Checklist",
        "triggerTag": "workflow:tech-gc-launchpad",
        "tags": ["leadmagnet:tech-gc-checklist", "interest:tech-ogc", "newsletter:ai"],
        "offer": "Tech Company OGC Launchpad",
    },
    "ma-readiness": {
        "label": "M&A Readiness Nurture",
        "leadMagnet": "Founder M&A Readiness Checklist",
        "triggerTag": "workflow:ma-readiness",
        "tags": ["leadmagnet:ma-readiness-checklist", "interest:ma-readiness", "newsletter:ai"],
        "offer": "Founder M&A Readiness Review",
    },
}

CUSTOM_FIELDS = [
    ("Campaign Key", "campaign_key", "TEXT"),
    ("Campaign Label", "campaign_label", "TEXT"),
    ("Authority Pillar", "authority_pillar", "TEXT"),
    ("Source Page", "source_page", "TEXT"),
    ("Source Channel", "source_channel", "TEXT"),
    ("YouTube Topic", "youtube_topic", "TEXT"),
    ("Lead Magnet", "lead_magnet", "TEXT"),
    ("Recommended Offer", "recommended_offer", "TEXT"),
    ("AI Risk Score", "ai_risk_score", "NUMERICAL"),
    ("AI Readiness Score", "ai_readiness_score", "NUMERICAL"),
    ("AI Score Band", "ai_score_band", "TEXT"),
    ("AI Recommended Offer", "ai_recommended_offer", "TEXT"),
    ("AI Use Cases", "ai_use_cases", "LARGE_TEXT"),
    ("AI Readiness Checks", "ai_readiness_checks", "LARGE_TEXT"),
    ("AI Patent Score", "ai_patent_score", "NUMERICAL"),
    ("AI Patent Stage", "ai_patent_stage", "TEXT"),
    ("AI Patent Score Band", "ai_patent_score_band", "TEXT"),
    ("AI Patent Checks", "ai_patent_checks", "LARGE_TEXT"),
    ("Role", "role", "TEXT"),
]


def load_env() -> None:
    env = Path(".env.local")
    if not env.exists():
        return
    for line in env.read_text().splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        k, v = line.split("=", 1)
        os.environ.setdefault(k, v)


def req(method: str, path: str, token: str, body: dict[str, Any] | None = None, qs: dict[str, Any] | None = None) -> Any:
    url = BASE + path
    if qs:
        url += "?" + urllib.parse.urlencode({k: v for k, v in qs.items() if v is not None})
    data = None if body is None else json.dumps(body).encode()
    headers = {
        "Authorization": f"Bearer {token}",
        "Version": VERSION,
        "Accept": "application/json",
        # urllib's default Python-urllib user agent is blocked by LeadConnector/Cloudflare.
        "User-Agent": "whiteford-highlevel-campaign-setup/1.0",
    }
    if body is not None:
        headers["Content-Type"] = "application/json"
    request = urllib.request.Request(url, data=data, headers=headers, method=method)
    try:
        with urllib.request.urlopen(request, timeout=30) as r:
            raw = r.read().decode()
            return json.loads(raw) if raw else {}
    except urllib.error.HTTPError as e:
        detail = e.read().decode(errors="replace")
        raise RuntimeError(f"{method} {path} failed HTTP {e.code}: {detail}") from e


def get_tags(token: str, loc: str) -> list[dict[str, Any]]:
    out = req("GET", f"/locations/{loc}/tags", token)
    return out.get("tags") or out.get("data") or []


def create_tag(token: str, loc: str, name: str) -> dict[str, Any]:
    return req("POST", f"/locations/{loc}/tags", token, {"name": name})


def get_fields(token: str, loc: str) -> list[dict[str, Any]]:
    out = req("GET", f"/locations/{loc}/customFields", token)
    return out.get("customFields") or out.get("fields") or []


def create_field(token: str, loc: str, name: str, key: str, data_type: str) -> dict[str, Any]:
    # HighLevel generates the field key from name; the application sends by key.
    # Include placeholder for operator clarity.
    body = {"name": name, "dataType": data_type, "placeholder": key}
    return req("POST", f"/locations/{loc}/customFields", token, body)


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--apply", action="store_true", help="Create missing tags/custom fields. Without this, only verifies.")
    ap.add_argument("--out", default="docs/highlevel_campaign_setup_results.json")
    args = ap.parse_args()

    load_env()
    token = os.environ.get("GHL_PRIVATE_INTEGRATION_TOKEN")
    loc = os.environ.get("GHL_LOCATION_ID")
    if not token or not loc:
        print("Missing GHL_PRIVATE_INTEGRATION_TOKEN or GHL_LOCATION_ID", file=sys.stderr)
        return 2

    needed_tags = sorted({"whiteford-mountain-west", "newsletter:not-consented", *(t for c in CAMPAIGNS.values() for t in [c["triggerTag"], *c["tags"]])})
    result: dict[str, Any] = {"locationId": loc, "apply": args.apply, "tags": {}, "customFields": {}, "warnings": []}

    tags = get_tags(token, loc)
    existing_tag_names = {str(t.get("name") or t.get("tag") or "").strip(): t for t in tags}
    for name in needed_tags:
        if name in existing_tag_names:
            result["tags"][name] = {"status": "existing", "id": existing_tag_names[name].get("id")}
        elif args.apply:
            made = create_tag(token, loc, name)
            result["tags"][name] = {"status": "created", "response": made}
            time.sleep(0.15)
        else:
            result["tags"][name] = {"status": "missing"}

    fields = get_fields(token, loc)
    # Match by lowercased name, placeholder, or common key-ish variants returned by HighLevel.
    by_name_or_key: dict[str, dict[str, Any]] = {}
    for f in fields:
        for val in [f.get("name"), f.get("fieldKey"), f.get("key"), f.get("placeholder")]:
            if val:
                by_name_or_key[str(val).strip().lower()] = f

    for name, key, dtype in CUSTOM_FIELDS:
        match = by_name_or_key.get(name.lower()) or by_name_or_key.get(key.lower()) or by_name_or_key.get(f"contact.{key}".lower())
        if match:
            result["customFields"][key] = {"status": "existing", "id": match.get("id"), "name": match.get("name"), "fieldKey": match.get("fieldKey"), "dataType": match.get("dataType")}
        elif args.apply:
            made = create_field(token, loc, name, key, dtype)
            result["customFields"][key] = {"status": "created", "response": made}
            time.sleep(0.15)
        else:
            result["customFields"][key] = {"status": "missing", "name": name, "dataType": dtype}

    Path(args.out).parent.mkdir(parents=True, exist_ok=True)
    Path(args.out).write_text(json.dumps(result, indent=2, sort_keys=True) + "\n")
    print(json.dumps({
        "out": str(Path(args.out).resolve()),
        "tags_created": sum(1 for v in result["tags"].values() if v["status"] == "created"),
        "tags_existing": sum(1 for v in result["tags"].values() if v["status"] == "existing"),
        "tags_missing": sum(1 for v in result["tags"].values() if v["status"] == "missing"),
        "fields_created": sum(1 for v in result["customFields"].values() if v["status"] == "created"),
        "fields_existing": sum(1 for v in result["customFields"].values() if v["status"] == "existing"),
        "fields_missing": sum(1 for v in result["customFields"].values() if v["status"] == "missing"),
    }, indent=2))
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
