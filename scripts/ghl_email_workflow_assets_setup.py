#!/usr/bin/env python3
"""Create/verify draft HighLevel email campaign assets for Whiteford offer lanes.

This script creates draft/off email campaign assets only. It does not send email,
add contacts to campaigns/workflows, activate workflows, message contacts, or
publish anything. Workflow automation creation is documented as a manual HighLevel
UI step because the public API supports listing/enrolling workflows, not safely
creating full draft workflow logic.
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
from dataclasses import dataclass
from pathlib import Path
from typing import Any

BASE = "https://services.leadconnectorhq.com"
EMAIL_VERSION = "2023-02-21"
LEGACY_VERSION = "2021-07-28"
TIMEZONE = "America/Denver"


@dataclass(frozen=True)
class EmailAsset:
    lane: str
    sequence: int
    campaign_name: str
    subject: str
    preview: str
    body: str
    lead_magnet: str
    route: str
    offer: str


def html_email(asset: EmailAsset) -> str:
    disclaimer = (
        "This message is educational information only, is not legal advice, "
        "and does not create an attorney-client relationship. Any legal "
        "engagement would require a separate written agreement."
    )
    safe_body = "".join(f"<p>{p}</p>" for p in asset.body.split("\n\n") if p.strip())
    return f"""<!doctype html>
<html>
  <body style="font-family: Arial, Helvetica, sans-serif; color:#121827; line-height:1.55; max-width:680px; margin:0 auto; padding:24px;">
    <p style="font-size:13px; color:#5d6678;">Whiteford / Schell IP • {asset.lead_magnet}</p>
    <h1 style="font-size:22px; color:#121827;">{asset.subject}</h1>
    <p style="font-size:14px; color:#5d6678;"><em>{asset.preview}</em></p>
    {safe_body}
    <p><strong>Useful next step:</strong> review or complete the free {asset.lead_magnet}. If the answers indicate a strong fit, Jeff can decide whether a bounded {asset.offer} conversation is appropriate.</p>
    <p>Lead magnet route for review: <code>{asset.route}</code></p>
    <hr style="border:none; border-top:1px solid #d8d0c3; margin:24px 0;" />
    <p style="font-size:12px; color:#5d6678;">{disclaimer}</p>
    <p style="font-size:12px; color:#5d6678;">Draft/off asset. Do not send until sender, footer, unsubscribe/preference handling, suppression checks, and attorney approval are complete.</p>
  </body>
</html>"""


ASSETS: list[EmailAsset] = [
    EmailAsset("ai-patent", 1, "WF | Email | AI Patent Strategy Scorecard | 01 Deliver Scorecard | Draft", "Your AI patent strategy scorecard", "What to document before AI-assisted R&D becomes a patent problem.", "The scorecard is designed to help founders and technical leaders identify where human contribution, invention records, ownership, claim strategy, and product roadmap need to be tightened before deciding whether a patent filing or broader IP strategy should be explored.\n\nThe goal is not to tell you whether something is patentable from a form. The useful first step is to organize the facts that make a strategy discussion productive.", "AI Patent Strategy Scorecard", "/ai-patent-strategy-scorecard", "AI Patent Strategy Sprint"),
    EmailAsset("ai-patent", 2, "WF | Email | AI Patent Strategy Scorecard | 02 AI Invention Records | Draft", "The mistake founders make with AI-assisted invention", "The AI tool is not the inventor. The human contribution still matters.", "For AI-assisted inventions, the practical question is not simply whether AI was used. The business question is whether the human contribution, technical problem, system architecture, and product decisions are documented well enough to support a later IP strategy discussion.\n\nThis is especially important before public demos, investor materials, customer pilots, or contractor work make the history harder to reconstruct.", "AI Patent Strategy Scorecard", "/ai-patent-strategy-scorecard", "AI Patent Strategy Sprint"),
    EmailAsset("ai-patent", 3, "WF | Email | AI Patent Strategy Scorecard | 03 Legal Moat | Draft", "Build the legal moat before the demo gets copied", "Patents, trade secrets, contracts, and roadmap decisions work together.", "The strongest AI IP strategies rarely depend on one filing alone. They align patent claims, trade-secret controls, contractor assignments, data rights, customer terms, and the product roadmap.\n\nThe scorecard is a starting point for sorting which pieces deserve attention first.", "AI Patent Strategy Scorecard", "/ai-patent-strategy-scorecard", "AI Patent Strategy Sprint"),
    EmailAsset("ai-patent", 4, "WF | Email | AI Patent Strategy Scorecard | 04 Sprint CTA | Draft", "When an AI patent strategy sprint is useful", "A bounded review can help decide what to protect, document, or defer.", "A short, bounded strategy sprint can be useful when the company has a technical system, near-term disclosure, unclear ownership history, or a product roadmap that may affect what should be protected.\n\nThe next step is not a generic call. It is a focused review of invention capture, ownership, disclosure timing, patent/trade-secret tradeoffs, and practical next actions.", "AI Patent Strategy Scorecard", "/ai-patent-strategy-scorecard", "AI Patent Strategy Sprint"),

    EmailAsset("ai-compliance", 1, "WF | Email | AI Compliance Gameplan | 01 Deliver Gameplan | Draft", "Your AI compliance gameplan", "A practical next-step map for AI governance and legal readiness.", "Your gameplan is a starting point, not a legal conclusion. The useful next step is to turn the risk areas into an AI use-case inventory, owner map, vendor review process, and 30/60/90-day implementation plan.\n\nGood AI governance usually starts with knowing who is using what, where data flows, and which decisions or workflows may create legal or operational risk.", "AI Compliance Gameplan Builder", "/ai-compliance-gameplan", "AI Compliance Readiness Sprint"),
    EmailAsset("ai-compliance", 2, "WF | Email | AI Compliance Gameplan | 02 Vendor Risk | Draft", "Vendor risk is often the first AI legal risk", "AI legal readiness often starts with the contract stack.", "Before a policy solves anything, a company needs to know which AI vendors touch data, what rights the vendor has, and where confidentiality, IP ownership, indemnity, audit, security, and privacy terms live.\n\nA vendor map often gives leadership a faster path to practical controls than a broad abstract policy.", "AI Compliance Gameplan Builder", "/ai-compliance-gameplan", "AI Compliance Readiness Sprint"),
    EmailAsset("ai-compliance", 3, "WF | Email | AI Compliance Gameplan | 03 Colorado AI Readiness | Draft", "Colorado AI readiness without overreacting", "Treat unsettled law as a readiness workstream.", "Colorado AI and automated decision-making rules are moving. That does not mean companies should freeze. It means readiness should focus on use-case inventory, consequential decision exposure, human review, notices, records, vendor contracts, and governance ownership.\n\nThe goal is a defensible operating process, not panic.", "AI Compliance Gameplan Builder", "/ai-compliance-gameplan", "AI Compliance Readiness Sprint"),
    EmailAsset("ai-compliance", 4, "WF | Email | AI Compliance Gameplan | 04 Sprint CTA | Draft", "Turn AI use into a legal operating system", "The goal is repeatable governance, not one-off panic.", "A durable AI legal system includes intake, approval, vendor review, documentation, escalation, training, and leadership-ready reporting.\n\nAn AI Compliance Readiness Sprint can turn scattered AI use into a practical governance roadmap without treating every tool or use case the same way.", "AI Compliance Gameplan Builder", "/ai-compliance-gameplan", "AI Compliance Readiness Sprint"),

    EmailAsset("tech-gc", 1, "WF | Email | Tech GC Launchpad | 01 Deliver Checklist | Draft", "Your technology-company legal health checklist", "A practical way to see where the company is carrying legal drag.", "The checklist is designed to sort legal work by operational risk: contracts, hiring, IP ownership, privacy, financing readiness, AI governance, and commercial terms.\n\nThe objective is to help leadership see which legal issues are creating drag on the next business milestone.", "Tech Company Legal Health Checklist", "/colorado-tech-general-counsel", "Tech Company OGC Launchpad"),
    EmailAsset("tech-gc", 2, "WF | Email | Tech GC Launchpad | 02 Legal Infrastructure | Draft", "From patent strategy to company legal infrastructure", "What changes when a technology company starts to scale.", "Patent protection is only one part of the legal system a scaling technology company needs. Contracts, employment, data, financing, governance, customer terms, AI usage, and commercial risk become part of the same operating layer.\n\nA fractional/outside GC structure can help sequence those issues without turning everything into a fire drill.", "Tech Company Legal Health Checklist", "/colorado-tech-general-counsel", "Tech Company OGC Launchpad"),
    EmailAsset("tech-gc", 3, "WF | Email | Tech GC Launchpad | 03 Milestone Readiness | Draft", "What to fix before hiring, fundraising, or selling", "Legal readiness should match the next business event.", "The right legal priorities depend on the next milestone: hiring, enterprise customers, financing, acquisition talks, or product launch.\n\nA legal operating review turns that into a sequence: what to fix now, what to monitor, what to defer, and what belongs with specialist counsel.", "Tech Company Legal Health Checklist", "/colorado-tech-general-counsel", "Tech Company OGC Launchpad"),
    EmailAsset("tech-gc", 4, "WF | Email | Tech GC Launchpad | 04 Launchpad CTA | Draft", "When an outside GC launchpad is useful", "A bounded legal operating review can create the roadmap.", "A Tech Company OGC Launchpad is most useful when legal issues are touching multiple operating areas but the company is not ready for a full-time general counsel.\n\nThe next step is a practical map of legal workstreams, owners, timing, and which issues need Whiteford bench support.", "Tech Company Legal Health Checklist", "/colorado-tech-general-counsel", "Tech Company OGC Launchpad"),

    EmailAsset("ma-readiness", 1, "WF | Email | Founder M&A Readiness | 01 Deliver Checklist | Draft", "Your founder M&A readiness checklist", "Start cleaning up the issues a buyer will ask about later.", "The checklist focuses on non-financial diligence issues that can slow technology deals: IP ownership, invention assignments, customer contracts, vendor terms, employee matters, AI/data/privacy risk, and corporate records.\n\nIt is designed to help founders identify cleanup work before a buyer or investor is driving the timetable.", "Founder M&A Readiness Checklist", "/colorado-startup-ma-lawyer", "Founder M&A Readiness Review"),
    EmailAsset("ma-readiness", 2, "WF | Email | Founder M&A Readiness | 02 Deal Friction | Draft", "Three non-financial risks that slow tech deals", "The diligence problems that show up before price becomes the issue.", "Technology deals often slow down around IP ownership, customer/vendor contracts, and data or AI product risk. The earlier those are mapped, the better a founder can control the process.\n\nThe goal is not to predict a deal. It is to reduce preventable friction before diligence starts.", "Founder M&A Readiness Checklist", "/colorado-startup-ma-lawyer", "Founder M&A Readiness Review"),
    EmailAsset("ma-readiness", 3, "WF | Email | Founder M&A Readiness | 03 Buyer Questions | Draft", "What a buyer will ask before you are ready", "A little cleanup before diligence can change the conversation.", "A buyer will ask for cap table support, invention assignments, key contracts, employee documents, product risk, disputes, and compliance posture.\n\nA readiness review identifies what needs attention before the request list arrives.", "Founder M&A Readiness Checklist", "/colorado-startup-ma-lawyer", "Founder M&A Readiness Review"),
    EmailAsset("ma-readiness", 4, "WF | Email | Founder M&A Readiness | 04 Review CTA | Draft", "When a founder M&A readiness review is useful", "Map diligence cleanup before the process controls you.", "A Founder M&A Readiness Review can be useful when a founder is not actively selling but knows a financing, strategic partnership, acquisition conversation, or board-level decision may be coming.\n\nThe output should be a cleanup roadmap, not a generic checklist.", "Founder M&A Readiness Checklist", "/colorado-startup-ma-lawyer", "Founder M&A Readiness Review"),
]


def load_env() -> None:
    for env in [Path(".env.local"), Path(".env")]:
        if not env.exists():
            continue
        for line in env.read_text().splitlines():
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            k, v = line.split("=", 1)
            os.environ.setdefault(k, v)


def req(method: str, path: str, token: str, body: dict[str, Any] | None = None, qs: dict[str, Any] | None = None, version: str = EMAIL_VERSION) -> Any:
    url = BASE + path
    if qs:
        url += "?" + urllib.parse.urlencode({k: v for k, v in qs.items() if v is not None})
    data = None if body is None else json.dumps(body).encode()
    headers = {
        "Authorization": f"Bearer {token}",
        "Version": version,
        "Accept": "application/json",
        "User-Agent": "whiteford-highlevel-email-workflow-assets/1.0",
    }
    if body is not None:
        headers["Content-Type"] = "application/json"
    request = urllib.request.Request(url, data=data, headers=headers, method=method)
    try:
        with urllib.request.urlopen(request, timeout=45) as r:
            raw = r.read().decode()
            return json.loads(raw) if raw else {}
    except urllib.error.HTTPError as e:
        detail = e.read().decode(errors="replace")
        raise RuntimeError(f"{method} {path} failed HTTP {e.code}: {detail}") from e


def get_users(token: str, location_id: str) -> list[dict[str, Any]]:
    out = req("GET", "/users/", token, qs={"locationId": location_id}, version=EMAIL_VERSION)
    return out.get("users") or []


def choose_user(users: list[dict[str, Any]]) -> dict[str, Any] | None:
    if not users:
        return None
    active = [u for u in users if not u.get("deleted")]
    return active[0] if active else users[0]


def get_campaigns(token: str, location_id: str, search: str | None = None) -> list[dict[str, Any]]:
    all_items: list[dict[str, Any]] = []
    for offset in range(0, 200, 20):
        out = req("GET", f"/emails/public/v2/locations/{location_id}/campaigns/emails", token, qs={"limit": 20, "offset": offset, "search": search}, version=EMAIL_VERSION)
        items = out.get("campaigns") or out.get("data") or out.get("items") or []
        if not items:
            break
        all_items.extend(items)
        if len(items) < 20:
            break
    return all_items


def create_campaign(token: str, location_id: str, user: dict[str, Any], asset: EmailAsset) -> dict[str, Any]:
    body = {
        "name": asset.campaign_name,
        "editorType": "html",
        "editorContent": html_email(asset),
        "timeZone": TIMEZONE,
        "userId": user["id"],
        "userName": user.get("name") or "Jeff Schell",
    }
    return req("POST", f"/emails/public/v2/locations/{location_id}/campaigns/email-campaign", token, body=body, version=EMAIL_VERSION)


def get_workflow_campaigns(token: str, location_id: str) -> list[dict[str, Any]]:
    all_items: list[dict[str, Any]] = []
    for offset in range(0, 100, 20):
        out = req("GET", "/emails/campaigns/workflows", token, qs={"locationId": location_id, "limit": 20, "offset": offset, "status": "draft"}, version=EMAIL_VERSION)
        items = out.get("campaigns") or []
        if not items:
            break
        all_items.extend(items)
        if len(items) < 20:
            break
    return all_items


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--apply", action="store_true", help="Create missing draft email campaign assets. Without this, only verifies/plans.")
    ap.add_argument("--out", default="docs/highlevel_email_workflow_assets_setup_results.json")
    args = ap.parse_args()

    load_env()
    token = os.environ.get("GHL_PRIVATE_INTEGRATION_TOKEN")
    location_id = os.environ.get("GHL_LOCATION_ID")
    if not token or not location_id:
        print("Missing GHL_PRIVATE_INTEGRATION_TOKEN or GHL_LOCATION_ID", file=sys.stderr)
        return 2

    result: dict[str, Any] = {
        "locationId": location_id,
        "apply": args.apply,
        "safety": {
            "createdDraftEmailCampaignAssetsOnly": True,
            "sentEmails": False,
            "activatedWorkflows": False,
            "enrolledContacts": False,
            "createdContacts": False,
            "workflowAutomationCreation": "manual_ui_required_or_unavailable_via_safe_public_api",
        },
        "users": [],
        "selectedUser": None,
        "assets": {},
        "workflowCampaignsDraftList": [],
        "errors": [],
    }

    user = None
    env_user_id = os.environ.get("GHL_USER_ID")
    try:
        users = get_users(token, location_id)
        result["users"] = [{"id": u.get("id"), "name": u.get("name"), "email": u.get("email"), "deleted": u.get("deleted")} for u in users]
        user = choose_user(users)
    except Exception as e:
        result["errors"].append(f"list users failed: {e}")
    if env_user_id:
        user = {"id": env_user_id, "name": os.environ.get("GHL_USER_NAME") or "Jeff Schell", "email": os.environ.get("GHL_USER_EMAIL")}
        result["selectedUserSource"] = "GHL_USER_ID environment override"
    if user:
        result["selectedUser"] = {"id": user.get("id"), "name": user.get("name"), "email": user.get("email")}
    elif args.apply:
        msg = "No HighLevel user found for location and GHL_USER_ID is not set; cannot create email campaigns because userId is required."
        result["errors"].append(msg)
        Path(args.out).parent.mkdir(parents=True, exist_ok=True)
        Path(args.out).write_text(json.dumps(result, indent=2, sort_keys=True) + "\n")
        print(json.dumps({"out": str(Path(args.out).resolve()), "error": msg}, indent=2))
        return 1

    existing: dict[str, dict[str, Any]] = {}
    try:
        for c in get_campaigns(token, location_id, search="WF | Email"):
            name = c.get("name") or c.get("title")
            if name:
                existing[str(name)] = c
    except Exception as e:
        # Non-fatal; create endpoint may still work. Record and continue.
        result["errors"].append(f"list email campaigns failed: {e}")

    for asset in ASSETS:
        entry: dict[str, Any] = {
            "lane": asset.lane,
            "sequence": asset.sequence,
            "name": asset.campaign_name,
            "subject": asset.subject,
            "preview": asset.preview,
            "leadMagnet": asset.lead_magnet,
            "route": asset.route,
            "offer": asset.offer,
            "status": "planned",
        }
        if asset.campaign_name in existing:
            entry.update({"status": "existing", "id": existing[asset.campaign_name].get("id") or existing[asset.campaign_name].get("_id")})
        elif args.apply:
            try:
                made = create_campaign(token, location_id, user, asset)
                entry.update({"status": "created", "response": made})
                time.sleep(0.25)
            except Exception as e:
                entry.update({"status": "error", "error": str(e)})
                result["errors"].append(f"{asset.campaign_name}: {e}")
        result["assets"][asset.campaign_name] = entry

    try:
        result["workflowCampaignsDraftList"] = get_workflow_campaigns(token, location_id)
    except Exception as e:
        result["errors"].append(f"list workflow campaigns failed: {e}")

    Path(args.out).parent.mkdir(parents=True, exist_ok=True)
    Path(args.out).write_text(json.dumps(result, indent=2, sort_keys=True) + "\n")
    summary = {
        "out": str(Path(args.out).resolve()),
        "apply": args.apply,
        "created": sum(1 for a in result["assets"].values() if a["status"] == "created"),
        "existing": sum(1 for a in result["assets"].values() if a["status"] == "existing"),
        "planned": sum(1 for a in result["assets"].values() if a["status"] == "planned"),
        "errors": len(result["errors"]),
    }
    print(json.dumps(summary, indent=2))
    return 0 if not result["errors"] else 1


if __name__ == "__main__":
    raise SystemExit(main())
