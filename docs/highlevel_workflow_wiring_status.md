# HighLevel Workflow Wiring Status — Whiteford/Schell IP

Generated: 2026-05-06T00:55:02
Location: `tm68WWMrcAa3TqQbEAMa`

## Result

I attempted to wire the HighLevel workflow/email-campaign layer through the available LeadConnector API. The existing location is reachable and contains draft workflows, but the API path available from the current private integration token is not sufficient to complete automated workflow/email-campaign creation end-to-end.

## What is reachable now

Read-only checks confirmed:

- `GET /locations/{locationId}` works.
- `GET /workflows/?locationId=...` works.
- `GET /emails/campaigns/workflows?locationId=...` works.
- Existing HighLevel workflows are visible.

Existing workflows visible in HighLevel:

1. `1. New Lead Nurture (Fast 5) - Claim Offer` — draft
2. `2. Appointment Confirmation + Reminders` — draft
3. `3. Appt No Show` — draft
4. `4. New Sale - Send Review Request` — draft
5. `5. Long-Term Nurture` — draft
6. `6. Stale Leads` — draft

Existing workflow campaigns visible:

1. `1. New Lead Nurture (Fast 5) - Claim Offer` — draft
2. `2. Appointment Confirmation + Reminders` — draft
3. `3. Appt No Show` — draft
4. `5. Long-Term Nurture` — draft

## Blocker

The public HighLevel API currently exposes workflow listing and contact enrollment, but not safe creation/update of workflow automations. Public sources also indicate that workflow POST/PUT creation/update has been an API feature request, not a generally available endpoint.

For email campaign assets, the API endpoint `POST /emails/public/v2/locations/:locationId/campaigns/email-campaign` requires a `userId`. The current private integration token returns zero users from `GET /users/?locationId=...`, and a no-user smoke test returned:

`422 userId must be a string / userId should not be empty`

Therefore I did not create partial or broken email campaigns.

## Assets prepared locally

Script prepared:

`/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/scripts/ghl_email_workflow_assets_setup.py`

The script contains 16 draft email-campaign assets across the four lanes:

- AI Patent Strategy Scorecard — 4 emails
- AI Compliance Gameplan — 4 emails
- Tech GC Launchpad — 4 emails
- Founder M&A Readiness — 4 emails

Dry-run/verification output:

`/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/highlevel_email_workflow_assets_setup_verify.json`

Existing workflow packet:

`/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/highlevel_draft_off_workflow_implementation_packets.md`

## Best-practice workflow structure to build in HighLevel UI

Create four disabled/draft intake workflows:

1. `WF | Intake | Whiteford | AI Patent Strategy Scorecard | Draft`
   - Trigger: tag added `workflow:ai-patent-strategy` and/or scorecard form submitted.
   - Internal actions only until approved: apply safety tags, set suggested offer lane, create review task, route to Jeff review.
   - Email assets: AI Patent 01-04 from the prepared script.

2. `WF | Intake | Whiteford | AI Compliance Gameplan | Draft`
   - Trigger: tag added `workflow:ai-compliance-readiness` and/or gameplan form submitted.
   - Internal actions only until approved: apply safety tags, set suggested offer lane, create review task, route high-risk/high-fit leads to Jeff review.
   - Email assets: AI Compliance 01-04 from the prepared script.

3. `WF | Intake | Whiteford | Tech GC Launchpad | Draft`
   - Trigger: tag added `workflow:tech-gc-launchpad` and/or checklist form submitted.
   - Internal actions only until approved: apply safety tags, set suggested offer lane, create legal operating review task.
   - Email assets: Tech GC 01-04 from the prepared script.

4. `WF | Intake | Whiteford | Founder M&A Readiness | Draft`
   - Trigger: tag added `workflow:ma-readiness` and/or checklist form submitted.
   - Internal actions only until approved: apply safety tags, set suggested offer lane, create M&A readiness review task.
   - Email assets: M&A 01-04 from the prepared script.

Global safety tags on every workflow:

- `brand:whiteford-schellip`
- `workflow:draft-only`
- `workflow:manual-start`
- `ops:approval-required`
- `ops:no-auto-send`
- `outreach:do-not-send` for any imported/researched prospect until cleared

Every workflow should remain off/draft until Jeff approves:

- final sender/from address
- footer/unsubscribe/preference handling
- legal disclaimer language
- workflow activation
- any external email send/enrollment
- any GHL live contact/opportunity mutation

## What is needed to finish actual HighLevel wiring

One of these is needed:

1. A HighLevel `userId` for Jeff/the correct sending user in location `tm68WWMrcAa3TqQbEAMa`, then run:

```bash
GHL_USER_ID=<user_id> python3 scripts/ghl_email_workflow_assets_setup.py --apply
```

2. Add/enable the `users.readonly` scope on the HighLevel private integration so `GET /users/?locationId=...` returns the user list.

3. Manual HighLevel UI build using `docs/highlevel_draft_off_workflow_implementation_packets.md`, then use the API only to verify workflows and draft workflow campaigns.

## Safety status

No emails were sent. No contacts were enrolled. No workflows were activated. No HighLevel contacts or opportunities were created or changed by this step.
