#!/usr/bin/env python3
"""Sync validated nightly prospects into HighLevel Agent Targeting.

Safety constraints:
- Creates/links CRM contacts and opportunities only.
- Uses the Whiteford Schell IP Pipeline Agent Targeting stage only.
- Does not send, enroll workflows/sequences, publish, message, or perform LinkedIn actions.
- Does not add tags, because this task forbids workflow-triggering tags.
- Uses company-level placeholder contacts when staged personal contacts have validation warnings.
"""
from __future__ import annotations

import argparse
import json
import os
import sqlite3
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from datetime import datetime, timezone
from pathlib import Path
from typing import Any
from uuid import uuid4

BASE = "https://services.leadconnectorhq.com"
VERSION = "2021-07-28"
DB = Path("/Users/jeff/.openclaw/projects/mountain-west-growth-os/data/growth-os.sqlite")
RUN_DIR = Path("docs/nightly-lead-research/runs/2026-05-06")
CONFIG_ID = "ghl-whiteford-schell-ip"
PIPELINE_BLUEPRINT_ID = "ghl-pipeline-whiteford-schell-ip"
STAGE_NAME = "Agent Targeting"
LOCAL_STAGE = "agent-targeting"
DEFAULT_IDS = [
    "prospect_d249372d03e9b2df1dd67726",  # Rigetti Computing
    "prospect_c542c95f73995e2dbd2a15c3",  # Nexar
    "prospect_c6c776b4596056a65d055c7c",  # Kodiak Robotics
]


def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat().replace("+00:00", "Z")


def scrub(value: Any) -> Any:
    if isinstance(value, list):
        return [scrub(v) for v in value[:100]]
    if isinstance(value, dict):
        redacted_keys = {"authorization", "token", "access_token", "email", "phone"}
        out = {}
        for k, v in value.items():
            if str(k).lower() in redacted_keys:
                continue
            out[k] = scrub(v)
        return out
    if isinstance(value, str) and len(value) > 500:
        return value[:500] + "…"
    return value


class GhlClient:
    def __init__(self, token: str):
        self.token = token

    def request(self, method: str, path: str, body: dict[str, Any] | None = None) -> dict[str, Any]:
        data = None if body is None else json.dumps(body).encode("utf-8")
        headers = {
            "Authorization": f"Bearer {self.token}",
            "Version": VERSION,
            "Accept": "application/json",
            "User-Agent": "whiteford-highlevel-agent-targeting-sync/1.0",
        }
        if body is not None:
            headers["Content-Type"] = "application/json"
        req = urllib.request.Request(BASE + path, data=data, headers=headers, method=method)
        try:
            with urllib.request.urlopen(req, timeout=45) as resp:
                raw = resp.read().decode("utf-8", errors="replace")
                parsed = json.loads(raw) if raw else None
                return {"ok": 200 <= resp.status < 300, "status": resp.status, "body": parsed}
        except urllib.error.HTTPError as e:
            raw = e.read().decode("utf-8", errors="replace")
            try:
                parsed = json.loads(raw) if raw else None
            except Exception:
                parsed = raw
            return {"ok": False, "status": e.code, "body": parsed}


def rows(conn: sqlite3.Connection, sql: str, params: tuple[Any, ...] = ()) -> list[sqlite3.Row]:
    return list(conn.execute(sql, params))


def one(conn: sqlite3.Connection, sql: str, params: tuple[Any, ...] = ()) -> sqlite3.Row | None:
    return conn.execute(sql, params).fetchone()


def company_contact_payload(config: sqlite3.Row, prospect: sqlite3.Row) -> dict[str, Any]:
    company = prospect["company_name"]
    first = company.split()[0] if company else "Growth"
    website = prospect["website_url"] or (f"https://{prospect['domain']}" if prospect["domain"] else None)
    payload: dict[str, Any] = {
        "locationId": config["location_id"],
        "firstName": first,
        "lastName": "Agent Targeting",
        "name": f"{company} Agent Targeting",
        "companyName": company,
        "source": f"Growth OS nightly prospect research - Agent Targeting ({prospect['prospect_id']})",
        "dnd": True,
        "dndSettings": {
            "Call": {"status": "active", "message": "Internal agent targeting placeholder; no outreach until Jeff approval."},
            "Email": {"status": "active", "message": "Internal agent targeting placeholder; no outreach until Jeff approval."},
            "SMS": {"status": "active", "message": "Internal agent targeting placeholder; no outreach until Jeff approval."},
            "WhatsApp": {"status": "active", "message": "Internal agent targeting placeholder; no outreach until Jeff approval."},
        },
    }
    if website:
        payload["website"] = website
    return payload


def opportunity_payload(config: sqlite3.Row, stage: sqlite3.Row, prospect: sqlite3.Row, contact_id: str) -> dict[str, Any]:
    return {
        "locationId": config["location_id"],
        "pipelineId": config["pipeline_id"],
        "pipelineStageId": stage["external_stage_id"],
        "contactId": contact_id,
        "name": f"{prospect['company_name']} — Agent Targeting",
        "status": "open",
        "monetaryValue": 0,
        "source": f"Growth OS nightly prospect research - Agent Targeting ({prospect['prospect_id']})",
    }


def extract_contact_id(resp: dict[str, Any]) -> str | None:
    body = resp.get("body") or {}
    if isinstance(body, dict):
        return ((body.get("contact") or {}).get("id") if isinstance(body.get("contact"), dict) else None) or body.get("id") or body.get("contactId")
    return None


def extract_opportunity_id(resp: dict[str, Any]) -> str | None:
    body = resp.get("body") or {}
    if isinstance(body, dict):
        return ((body.get("opportunity") or {}).get("id") if isinstance(body.get("opportunity"), dict) else None) or body.get("id") or body.get("opportunityId")
    return None


def existing_link(conn: sqlite3.Connection, prospect_id: str, object_type: str) -> str | None:
    r = one(
        conn,
        """select ghl_object_id from ghl_sync_links
           where local_table='prospects' and local_id=? and ghl_object_type=? and sync_status='synced'
           order by updated_at desc limit 1""",
        (prospect_id, object_type),
    )
    return r["ghl_object_id"] if r else None


def find_existing_contact(client: GhlClient, loc: str, company: str) -> str | None:
    path = "/contacts/?" + urllib.parse.urlencode({"locationId": loc, "limit": 20, "query": company})
    resp = client.request("GET", path)
    if not resp["ok"]:
        return None
    contacts = (resp.get("body") or {}).get("contacts") or []
    company_l = company.lower()
    for c in contacts:
        vals = [c.get("companyName"), c.get("companyNameLowerCase"), c.get("name")]
        if any(isinstance(v, str) and company_l in v.lower() for v in vals):
            return c.get("id")
    return None


def find_existing_opportunity(client: GhlClient, loc: str, pipeline_id: str, stage_id: str, company: str) -> str | None:
    path = "/opportunities/search?" + urllib.parse.urlencode({"location_id": loc, "pipeline_id": pipeline_id, "limit": 100})
    resp = client.request("GET", path)
    if not resp["ok"]:
        return None
    opps = (resp.get("body") or {}).get("opportunities") or []
    company_l = company.lower()
    for o in opps:
        if o.get("pipelineStageId") == stage_id and company_l in str(o.get("name") or "").lower():
            return o.get("id")
    return None


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--live", action="store_true", help="Perform live HighLevel contact/opportunity writes.")
    ap.add_argument("--out", default=str(RUN_DIR / "highlevel_agent_targeting_sync.json"))
    ap.add_argument("--prospect-id", action="append", default=[])
    args = ap.parse_args()

    prospect_ids = args.prospect_id or DEFAULT_IDS
    out_path = Path(args.out)
    payload_dir = out_path.parent / "highlevel_agent_targeting_payloads"
    payload_dir.mkdir(parents=True, exist_ok=True)

    conn = sqlite3.connect(DB)
    conn.row_factory = sqlite3.Row
    config = one(conn, "select * from crm_integration_config where config_id=?", (CONFIG_ID,))
    if not config:
        raise SystemExit("Missing GHL config")
    if config["mode"] != "live_approved" or int(config["sync_enabled"]) != 1:
        raise SystemExit("GHL sync is not live-approved/enabled")
    if int(config["outbound_sequences_enabled"]) != 0 or int(config["autonomous_automations_enabled"]) != 0:
        raise SystemExit("Unsafe config: outbound sequences or autonomous automations enabled")
    stage = one(
        conn,
        "select * from ghl_pipeline_stage_mappings where blueprint_id=? and ghl_stage_name=? and automation_allowed=0",
        (PIPELINE_BLUEPRINT_ID, STAGE_NAME),
    )
    if not stage or not stage["external_stage_id"]:
        raise SystemExit("Missing safe Agent Targeting stage mapping")

    prospect_rows = rows(
        conn,
        f"select * from prospects where prospect_id in ({','.join('?' for _ in prospect_ids)}) order by company_name",
        tuple(prospect_ids),
    )
    token = json.loads(Path(config["secret_ref"]).read_text())["token"]
    client = GhlClient(token)
    batch_time = now_iso()
    batch_id = f"ghl-agent-targeting-sync-{'live' if args.live else 'dryrun'}-{batch_time.replace(':','-').replace('.','-')}-{uuid4().hex[:8]}"
    report: dict[str, Any] = {
        "batchId": batch_id,
        "created_at": batch_time,
        "live": bool(args.live),
        "status": "running",
        "locationId": config["location_id"],
        "pipelineId": config["pipeline_id"],
        "stageName": STAGE_NAME,
        "stageId": stage["external_stage_id"],
        "safety": {
            "no_sends": True,
            "no_workflow_enrollment": True,
            "no_tags_added": True,
            "no_linkedin_actions": True,
            "company_level_contacts_used": True,
            "dnd_enabled_on_created_contacts": True,
        },
        "selected": len(prospect_rows),
        "contactsCreated": 0,
        "contactsLinked": 0,
        "opportunitiesCreated": 0,
        "opportunitiesLinked": 0,
        "blocked": 0,
        "records": [],
    }

    for prospect in prospect_rows:
        prospect_id = prospect["prospect_id"]
        company = prospect["company_name"]
        record: dict[str, Any] = {"prospect_id": prospect_id, "company_name": company, "status": "started"}
        contact_id = existing_link(conn, prospect_id, "contact")
        opportunity_id = existing_link(conn, prospect_id, "opportunity")

        if not contact_id:
            contact_id = find_existing_contact(client, config["location_id"], company)
            if contact_id:
                report["contactsLinked"] += 1
                record["contactLinkSource"] = "ghl_search_company_match"

        if not opportunity_id:
            opportunity_id = find_existing_opportunity(client, config["location_id"], config["pipeline_id"], stage["external_stage_id"], company)
            if opportunity_id:
                report["opportunitiesLinked"] += 1
                record["opportunityLinkSource"] = "ghl_search_agent_targeting_company_match"

        contact_payload = company_contact_payload(config, prospect)
        contact_payload_path = payload_dir / f"{batch_id}-{prospect_id}-contact-payload.json"
        contact_payload_path.write_text(json.dumps(contact_payload, indent=2, sort_keys=True) + "\n")
        record["contactPayloadPath"] = str(contact_payload_path.resolve())

        if not contact_id:
            if not args.live:
                record["status"] = "dry_run_ready"
                report["records"].append(record)
                continue
            resp = client.request("POST", "/contacts/", contact_payload)
            response_path = payload_dir / f"{batch_id}-{prospect_id}-contact-response.json"
            response_path.write_text(json.dumps(scrub(resp), indent=2, sort_keys=True) + "\n")
            record["contactResponsePath"] = str(response_path.resolve())
            contact_id = extract_contact_id(resp)
            if not resp["ok"] or not contact_id:
                report["blocked"] += 1
                record["status"] = "blocked_contact_create"
                record["reason"] = f"contact_create_{resp['status']}"
                report["records"].append(record)
                continue
            report["contactsCreated"] += 1
            time.sleep(0.2)

        if not opportunity_id:
            opp_payload = opportunity_payload(config, stage, prospect, contact_id)
            opp_payload_path = payload_dir / f"{batch_id}-{prospect_id}-opportunity-payload.json"
            opp_payload_path.write_text(json.dumps(opp_payload, indent=2, sort_keys=True) + "\n")
            record["opportunityPayloadPath"] = str(opp_payload_path.resolve())
            if not args.live:
                record["status"] = "dry_run_ready"
                record["contactId"] = contact_id or "DRY_RUN_CONTACT_ID"
                report["records"].append(record)
                continue
            resp = client.request("POST", "/opportunities/", opp_payload)
            response_path = payload_dir / f"{batch_id}-{prospect_id}-opportunity-response.json"
            response_path.write_text(json.dumps(scrub(resp), indent=2, sort_keys=True) + "\n")
            record["opportunityResponsePath"] = str(response_path.resolve())
            opportunity_id = extract_opportunity_id(resp)
            if not resp["ok"] or not opportunity_id:
                report["blocked"] += 1
                record["status"] = "partial_or_blocked_opportunity_create"
                record["contactId"] = contact_id
                record["reason"] = f"opportunity_create_{resp['status']}"
                report["records"].append(record)
                continue
            report["opportunitiesCreated"] += 1
            time.sleep(0.2)

        if args.live:
            conn.execute(
                """insert or replace into ghl_sync_links(sync_link_id,local_table,local_id,ghl_object_type,ghl_object_id,ghl_location_id,ghl_pipeline_id,ghl_stage_id,sync_direction,sync_status,last_sync_at,last_error,created_at,updated_at)
                   values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)""",
                (f"ghl-link-agent-targeting-contact-{prospect_id}", "prospects", prospect_id, "contact", contact_id, config["location_id"], config["pipeline_id"], stage["external_stage_id"], "local_to_ghl_agent_targeting_sync", "synced", batch_time, None, batch_time, batch_time),
            )
            conn.execute(
                """insert or replace into ghl_sync_links(sync_link_id,local_table,local_id,ghl_object_type,ghl_object_id,ghl_location_id,ghl_pipeline_id,ghl_stage_id,sync_direction,sync_status,last_sync_at,last_error,created_at,updated_at)
                   values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)""",
                (f"ghl-link-agent-targeting-opportunity-{prospect_id}", "prospects", prospect_id, "opportunity", opportunity_id, config["location_id"], config["pipeline_id"], stage["external_stage_id"], "local_to_ghl_agent_targeting_sync", "synced", batch_time, None, batch_time, batch_time),
            )
            conn.execute("update prospects set pipeline_stage=?, updated_at=? where prospect_id=?", (LOCAL_STAGE, batch_time, prospect_id))
            conn.execute(
                """insert or replace into opportunities(opportunity_id,prospect_id,contact_id,campaign_id,offer_id,stage,estimated_value,probability,expected_close_date,owner,source,created_at,updated_at)
                   values(?,?,?,?,?,?,?,?,?,?,?,?,?)""",
                (f"ghl-agent-targeting-{prospect_id}", prospect_id, None, None, prospect["segment"], LOCAL_STAGE, 0, None, None, "GHL", "gohighlevel", batch_time, batch_time),
            )
            conn.execute(
                """update crm_sync_records set eligibility_status='eligible', sync_status='synced', block_reason=NULL, crm_object_id=?, payload_path=?, response_path=?, updated_at=?
                   where local_table='prospects' and local_id=? and crm_object='ghl_or_supabase_lead_staging'""",
                (opportunity_id, record.get("opportunityPayloadPath") or record.get("contactPayloadPath"), record.get("opportunityResponsePath"), batch_time, prospect_id),
            )
            conn.execute(
                """insert or replace into activities(activity_id,prospect_id,contact_id,opportunity_id,activity_type,direction,channel,summary,source_path,created_by,created_at)
                   values(?,?,?,?,?,?,?,?,?,?,?)""",
                (f"activity-ghl-agent-targeting-sync-{prospect_id}", prospect_id, None, f"ghl-agent-targeting-{prospect_id}", "ghl_agent_targeting_sync", "outbound_crm_write", "gohighlevel", f"Synced validated prospect into HighLevel Whiteford Schell IP Pipeline at Agent Targeting. Created/linked company-level DND contact and opportunity only; no sends, workflow enrollment, tags, or LinkedIn actions.", record.get("opportunityPayloadPath") or record.get("contactPayloadPath"), "ghl_agent_targeting_validated_sync", batch_time),
            )
            conn.commit()

        record.update({"status": "synced" if args.live else "dry_run_ready", "contactId": contact_id, "opportunityId": opportunity_id, "stageName": STAGE_NAME})
        report["records"].append(record)

    synced_records = sum(1 for r in report["records"] if r.get("status") == "synced")
    report["status"] = "ok" if args.live and report["blocked"] == 0 else ("partial" if args.live else "dry_run_ok")
    report["syncedRecords"] = synced_records
    report["completed_at"] = now_iso()
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(json.dumps(report, indent=2, sort_keys=True) + "\n")

    if args.live:
        conn.execute(
            """insert or replace into crm_sync_batches(batch_id,crm_provider,mode,batch_scope,records_selected,records_eligible,records_synced,records_blocked,status,started_at,completed_at,report_path,blocker,created_at)
               values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)""",
            (batch_id, "gohighlevel", "live", "nightly_validated_agent_targeting", report["selected"], report["selected"] - report["blocked"], synced_records, report["blocked"], report["status"], batch_time, report["completed_at"], str(out_path.resolve()), "" if report["blocked"] == 0 else "One or more GHL Agent Targeting records failed; see report.", batch_time),
        )
        conn.execute(
            """insert or replace into crm_audit_log(audit_id,crm_provider,event_type,related_table,related_id,summary,artifact_path,created_at)
               values(?,?,?,?,?,?,?,?)""",
            (f"audit-{batch_id}", "gohighlevel", "agent_targeting_sync_live", "prospects", "nightly_validated_agent_targeting", f"HighLevel Agent Targeting sync {report['status']}: {report['selected']} selected, {report['contactsCreated']} contacts created, {report['contactsLinked']} contacts linked, {report['opportunitiesCreated']} opportunities created, {report['opportunitiesLinked']} opportunities linked, {report['blocked']} blocked. No sends/workflows/tags/LinkedIn.", str(out_path.resolve()), batch_time),
        )
        conn.commit()

    print(json.dumps({
        "out": str(out_path.resolve()),
        "status": report["status"],
        "selected": report["selected"],
        "contactsCreated": report["contactsCreated"],
        "contactsLinked": report["contactsLinked"],
        "opportunitiesCreated": report["opportunitiesCreated"],
        "opportunitiesLinked": report["opportunitiesLinked"],
        "blocked": report["blocked"],
    }, indent=2))
    return 0 if report["status"] in {"ok", "dry_run_ok"} else 1


if __name__ == "__main__":
    raise SystemExit(main())
