# HighLevel Overnight Autonomous Work Prompt

You are continuing Jeff Schell's Whiteford/Schell IP HighLevel campaign/workflow configuration work. Work for up to 6 hours, autonomously, using the logged-in Chrome CDP browser session at `http://127.0.0.1:9222` and the project repo at `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages`.

## Objective

Maximize HighLevel configuration for Whiteford/Schell IP growth campaigns while keeping all outreach safe, draft/off, and attorney-review-ready.

Create/configure all foreseeably useful draft/off workflows, email/SMS content, pipeline/opportunity interactions, and documentation for these offer lanes:

1. AI Patent Strategy Scorecard
   - tag: `workflow:ai-patent-strategy`
   - route: `/ai-patent-strategy-scorecard`
   - offer: AI Patent Strategy Sprint
2. AI Compliance / AI Law Gameplan
   - tag: `workflow:ai-compliance-readiness`
   - routes: `/ai-compliance-gameplan`, `/colorado-ai-compliance-lawyer`
   - offer: AI Compliance Readiness Sprint
3. Tech Outside General Counsel / Fractional GC
   - tag: `workflow:tech-gc-launchpad`
   - route: `/colorado-tech-general-counsel`
   - offer: Tech GC Launchpad
4. Founder M&A Readiness
   - tag: `workflow:ma-readiness`
   - route: `/colorado-startup-ma-lawyer`
   - offer: Founder M&A Readiness Review

Also configure supporting workflows if feasible:
- Appointment confirmation + reminders
- No-show / rebook
- Long-term authority nurture
- Stale lead re-engagement
- Manual attorney-review queue / internal task workflow
- Pipeline hygiene / opportunity stage updates

## Required safety limits

Do NOT:
- send any email
- send any SMS
- publish/activate workflows
- enroll contacts
- create or message live prospects
- launch paid ads/social/LinkedIn
- delete existing assets
- expose secrets from `.env.local`

Do:
- create/edit draft/off workflows and assets only
- use attorney-review gates before any external message steps
- keep workflows in draft status
- create compelling but compliant draft email/SMS copy
- document every created/modified object ID/name/status
- verify no contacts are enrolled and no messages were sent

## Best-practice requirements

Before/while configuring, synthesize from:
- `business-development-rag` skill and private corpus via `python3 ~/.hermes/knowledge/business-development/search_business_dev.py ...`
- project docs under `docs/highlevel_*`, `docs/plans/*`, and `docs/KANBAN_DELIVERABLE_INDEX.md`
- legal/attorney advertising principles: no misleading claims, no guarantees, no legal advice, no attorney-client relationship implication, clear educational framing, unsubscribe/consent sensitivity, attorney review before use
- HighLevel workflow practice: trigger by explicit tags/first-party form capture, segment by offer lane, avoid duplicate enrollment, use DND/consent checks where available, create/update opportunity pipeline stages, use internal tasks/manual actions for attorney review, wait steps between emails, record lead source and route

## Current state

Known HighLevel location: `tm68WWMrcAa3TqQbEAMa`.
Known supplied user id/email: `jeff@schellip.com`.
A visible Chrome session is logged into HighLevel and Hermes config has `browser.cdp_url` pointing to `http://127.0.0.1:9222`.
16 draft email campaign assets were already created via `scripts/ghl_email_workflow_assets_setup.py --apply`; manifest:
`docs/highlevel_email_campaign_asset_apply_manifest.md`.

A draft workflow may already exist from browser work:
- id: `424fd134-b34b-494f-a337-2aba0dec3060`
- observed API name: `AI Patent Strategy Campaign`
- status: draft
Verify and rename/adjust if safe through UI/API.

## Work strategy

1. Inventory existing HighLevel objects:
   - workflows
   - pipelines and stages
   - opportunity endpoints/objects available
   - tags/custom fields if available
   - created draft email assets
2. Research and write a concise best-practices standard to:
   `docs/highlevel_workflow_email_best_practices_synthesis.md`
3. Create/update draft email/SMS content packets with compliant copy for all lanes:
   `docs/highlevel_overnight_email_sms_content_packets.md`
4. Use browser UI where possible to create draft workflows. Prefer UI automation over private endpoints. If UI is too brittle, use private/internal endpoints only after documenting risk and only for draft/off creation/editing. Do not use private endpoints to send/publish/enroll/delete.
5. Link workflows to the relevant opportunity pipeline/stages. If no suitable pipeline exists or creation is unsafe, document exact required pipeline/stage mapping and create only draft/off internal tasks/actions where feasible.
6. Verify via public API/listing and browser snapshots that workflows are draft/off and have zero active/total enrollment.
7. Update status report:
   `docs/highlevel_overnight_work_status.md`

## Deliverables

At minimum, by the end write:
- `docs/highlevel_workflow_email_best_practices_synthesis.md`
- `docs/highlevel_overnight_email_sms_content_packets.md`
- `docs/highlevel_overnight_work_status.md`
- any JSON manifests under `docs/highlevel_overnight_*.json`

Final response must summarize:
- what was created/modified
- HighLevel object IDs/names/statuses
- what remains draft/off
- what could not be completed and why
- exact next manual review steps for Jeff
