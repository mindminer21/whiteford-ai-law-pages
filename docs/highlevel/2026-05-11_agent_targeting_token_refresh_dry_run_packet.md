# 2026-05-11 HighLevel Agent Targeting Token Refresh + Dry-Run Packet

Task: `t_550eb27f`
Related blocker: `t_7884ab57`
Location: Whiteford Schell IP / `tm68WWMrcAa3TqQbEAMa`
Pipeline: Whiteford Schell IP Pipeline / `Tbx4tA6wHv5lTwZPSHyZ`
Stage: Agent Targeting / `fd569cf4-979b-43b8-bd0f-78e807e80ff1`
Prospect scope for this packet: Kore.ai only / `prospect_ae4ea495016fb286698d44da`
Status: INTERNAL TOKEN-REFRESH AND DRY-RUN VERIFICATION PACKET ONLY

No email, SMS, DM, LinkedIn/social action, public publishing, ad launch, prospecting, enrichment, workflow activation, workflow test, workflow enrollment, trigger tag, contact/opportunity mutation, HighLevel live sync, Supabase/SQLite/Clio mutation, or client/prospect-facing action is authorized by this packet.

## 1. Narrow decision this packet solves

This packet solves one operational question only:

Can a refreshed HighLevel Private Integration token access the Whiteford Schell IP location and allow the existing Kore.ai Agent Targeting sync script to complete a clean dry run without creating/linking contacts or opportunities?

It does not decide whether Kore.ai should be synced live. It does not authorize live contact or opportunity creation. It does not authorize outreach or workflow activity. It keeps the next step opt-in-only, non-confidential, non-hypey, and attorney/Jeff-review-gated.

## 2. Evidence read

- Blocked Kanban task `t_7884ab57`: prior live attempt blocked; later watchdog recheck still credential/location blocked.
- Blocker report: `docs/nightly-lead-research/runs/2026-05-11/highlevel_agent_targeting_sync_blocker_report.md`.
- Dry-run report: `docs/nightly-lead-research/runs/2026-05-11/highlevel_agent_targeting_sync_dryrun.json`.
- Live attempt report: `docs/nightly-lead-research/runs/2026-05-11/highlevel_agent_targeting_sync.json`.
- Redacted 401 response: `docs/nightly-lead-research/runs/2026-05-11/highlevel_agent_targeting_payloads/ghl-agent-targeting-sync-live-2026-05-11T10-55-15-476493Z-786f3d36-prospect_ae4ea495016fb286698d44da-contact-response.json`.
- 22:30 blocker addendum: `docs/digests/2026-05-11_2230_watchdog_blocker_decision_addendum.md`.
- 22:30 blocker review: `docs/reviews/2026-05-11_2230_watchdog_blocker_decision_review.md`.
- Script inspected: `scripts/ghl_agent_targeting_validated_sync.py`.
- QMD internal memory check retrieved the 22:30 addendum and HighLevel location/pipeline context; QMD remains internal memory only, not public-source proof or legal approval.
- Business-development RAG synthesis used only the principle that a decision asset should solve one narrow, concrete problem before asking for a broader action.

## 3. Current blocker summary

The 2026-05-11 sync for Kore.ai is blocked by HighLevel credential/location access.

Observed states:

- Initial live attempt: contact create returned HTTP 401 with `Invalid Private Integration token`.
- 20:56 recheck: both configured secret and app `.env.local` token returned HTTP 401 on read-only `/workflows` probe.
- 22:38 watchdog recheck: configured Growth OS secret returned HTTP 403 `The token does not have access to this location` for `tm68WWMrcAa3TqQbEAMa`; app `.env.local` token was not a usable unblock path.

Decision interpretation: treat 401 invalid-token and 403 location-access failures as the same manual token/location/scope blocker. Refresh the token for the correct HighLevel location, verify read-only access, then run dry-run only.

## 4. Safe read-only probes versus dry run versus live mutation

### Safe now after token refresh: read-only token/location probes

Purpose: confirm whether the token can read from the Whiteford Schell IP location before any dry-run or live action.

Allowed only after the local secret is refreshed by Jeff/operator. Do not paste token values into Kanban, docs, chat, screenshots, or terminal transcripts.

Example read-only probe pattern:

```bash
python3 - <<'PY'
import json, urllib.parse, urllib.request, urllib.error
from pathlib import Path
secret = Path('/Users/jeff/.openclaw/secrets/ghl-whiteford-schell-ip.json')
token = json.loads(secret.read_text())['token']
location_id = 'tm68WWMrcAa3TqQbEAMa'
url = 'https://services.leadconnectorhq.com/workflows/?' + urllib.parse.urlencode({'locationId': location_id})
req = urllib.request.Request(url, headers={
    'Authorization': f'Bearer {token}',
    'Version': '2021-07-28',
    'Accept': 'application/json',
    'User-Agent': 'whiteford-highlevel-readonly-token-probe/1.0',
})
try:
    with urllib.request.urlopen(req, timeout=30) as resp:
        print({'ok': 200 <= resp.status < 300, 'status': resp.status, 'probe': 'workflows_readonly'})
except urllib.error.HTTPError as e:
    body = e.read().decode('utf-8', errors='replace')[:500]
    print({'ok': False, 'status': e.code, 'probe': 'workflows_readonly', 'body': body})
PY
```

Why this is safe: it is a GET/read-only probe and does not create/update contacts, opportunities, notes, tags, tasks, workflows, or enrollments.

### Safe now after token refresh: dry-run command

Purpose: regenerate the local no-mutation payload/report for Kore.ai and confirm the script still selects exactly the intended Agent Targeting record.

Run from repository root:

```bash
python3 scripts/ghl_agent_targeting_validated_sync.py \
  --out docs/nightly-lead-research/runs/2026-05-11/highlevel_agent_targeting_sync_dryrun.json \
  --prospect-id prospect_ae4ea495016fb286698d44da
```

Why this is safe: without `--live`, the script writes local report/payload artifacts only. It does not POST contacts or opportunities and does not update Growth OS SQLite sync links, opportunities, activities, CRM audit rows, or prospect stage.

### Not safe without separate exact approval: live retry

The blocker report includes this historical live retry command:

```bash
python3 scripts/ghl_agent_targeting_validated_sync.py \
  --live \
  --out docs/nightly-lead-research/runs/2026-05-11/highlevel_agent_targeting_sync.json \
  --prospect-id prospect_ae4ea495016fb286698d44da
```

This command is a live mutation path. It may create/link a HighLevel contact, create/link an opportunity, write Growth OS SQLite sync/audit records, and move local lifecycle state. It must not be run from this packet.

## 5. Token refresh instructions

1. In HighLevel / LeadConnector, use the Whiteford Schell IP location, not a different agency/location.
2. Generate or locate a current Private Integration token for location `tm68WWMrcAa3TqQbEAMa`.
3. Confirm the token has access appropriate to the eventual Agent Targeting sync lane:
   - Contacts: read/write.
   - Opportunities: read/write.
   - Whiteford Schell IP Pipeline: `Tbx4tA6wHv5lTwZPSHyZ`.
   - Location binding: Whiteford Schell IP / `tm68WWMrcAa3TqQbEAMa`.
4. Update only the local secret file referenced by Growth OS config:
   - `/Users/jeff/.openclaw/secrets/ghl-whiteford-schell-ip.json`
5. Do not paste or quote the token value in Kanban comments, docs, chat, terminal summaries, screenshots, issue descriptions, or commit messages.
6. If `.env.local` also needs a refreshed HighLevel token for app testing, update it separately only if Jeff explicitly approves that environment change. This packet does not require `.env.local` for the dry-run script.
7. After updating the secret, run the read-only probe first, then the dry-run command. Stop on any 401/403 or unexpected location/pipeline/stage value.

## 6. Expected outputs

### A. Invalid token / expired token failure

Expected probe shape:

```text
{'ok': False, 'status': 401, 'probe': 'workflows_readonly', 'body': '...Invalid Private Integration token...'}
```

Expected script/live-attempt failure shape from the historical blocked report:

```json
{
  "ok": false,
  "status": 401,
  "body": {
    "message": "Invalid Private Integration token",
    "statusCode": 401
  }
}
```

Operator response:

- Stop.
- Do not run live.
- Re-check that the token was copied from the correct Private Integration and has not expired/revoked.
- Leave any Kanban update without token values.

### B. Location-access / wrong-location failure

Expected probe shape:

```text
{'ok': False, 'status': 403, 'probe': 'workflows_readonly', 'body': '...The token does not have access to this location...'}
```

Operator response:

- Stop.
- Do not run live.
- Confirm the token is generated/bound for Whiteford Schell IP location `tm68WWMrcAa3TqQbEAMa`, not another location.
- Confirm the token has the needed contact/opportunity scopes and location access.
- Treat this as equivalent to the 401 blocker for decision purposes.

### C. Clean read-only probe

Expected shape:

```text
{'ok': True, 'status': 200, 'probe': 'workflows_readonly'}
```

Operator response:

- Proceed only to dry run.
- Do not run live from this packet.

### D. Clean dry-run result

Expected dry-run report shape:

```json
{
  "live": false,
  "status": "dry_run_ok",
  "locationId": "tm68WWMrcAa3TqQbEAMa",
  "pipelineId": "Tbx4tA6wHv5lTwZPSHyZ",
  "stageName": "Agent Targeting",
  "stageId": "fd569cf4-979b-43b8-bd0f-78e807e80ff1",
  "selected": 1,
  "blocked": 0,
  "syncedRecords": 0,
  "contactsCreated": 0,
  "contactsLinked": 0,
  "opportunitiesCreated": 0,
  "opportunitiesLinked": 0,
  "safety": {
    "company_level_contacts_used": true,
    "dnd_enabled_on_created_contacts": true,
    "no_sends": true,
    "no_workflow_enrollment": true,
    "no_tags_added": true,
    "no_linkedin_actions": true
  },
  "records": [
    {
      "prospect_id": "prospect_ae4ea495016fb286698d44da",
      "company_name": "Kore.ai",
      "status": "dry_run_ready"
    }
  ]
}
```

Operator response:

- Record the report path and summarize the result.
- Do not run live unless Jeff gives a separate exact current approval satisfying Section 8.

## 7. Dry-run verification checklist

Before treating the dry run as clean, confirm every item:

- [ ] Report `live` is `false`.
- [ ] Report `status` is `dry_run_ok`.
- [ ] Report `locationId` is exactly `tm68WWMrcAa3TqQbEAMa`.
- [ ] Report `pipelineId` is exactly `Tbx4tA6wHv5lTwZPSHyZ`.
- [ ] Report `stageName` is exactly `Agent Targeting`.
- [ ] Report `stageId` is `fd569cf4-979b-43b8-bd0f-78e807e80ff1`.
- [ ] Report selects exactly 1 record: Kore.ai / `prospect_ae4ea495016fb286698d44da`.
- [ ] Contact payload uses a company-level placeholder, not an individual prospect contact.
- [ ] Contact payload includes `companyName: Kore.ai` and `name: Kore.ai Agent Targeting`.
- [ ] Contact payload includes `dnd: true`.
- [ ] Contact payload has DND settings active for Call, Email, SMS, and WhatsApp, with internal/no-outreach message.
- [ ] Contact payload contains no `tags` array and the report says `no_tags_added: true`.
- [ ] Report says `no_workflow_enrollment: true`.
- [ ] Report says `no_sends: true`.
- [ ] Report says `no_linkedin_actions: true`.
- [ ] Report shows zero contacts created/linked and zero opportunities created/linked in dry-run mode.
- [ ] No HighLevel UI workflow activation/test/enrollment was performed.
- [ ] No Growth OS SQLite/Supabase/Clio mutation was performed by the dry-run step.

## 8. Separate live-run approval gate

A live retry requires Jeff's exact current approval after a clean read-only probe and clean dry run. The approval must state all of the following before the live command may be considered:

- Destination:
  - HighLevel location `tm68WWMrcAa3TqQbEAMa` / Whiteford Schell IP.
  - Pipeline `Tbx4tA6wHv5lTwZPSHyZ` / Whiteford Schell IP Pipeline.
  - Stage `Agent Targeting` / `fd569cf4-979b-43b8-bd0f-78e807e80ff1`.
- Prospect scope:
  - Kore.ai only / `prospect_ae4ea495016fb286698d44da`, unless Jeff explicitly lists any other prospect IDs.
- Operator:
  - Named human/agent authorized to run the live command.
- Timing:
  - Exact date/time window for the live attempt.
- No-send/no-enrollment/no-trigger-tag posture:
  - No email, SMS, DM, LinkedIn/social action, workflow enrollment, workflow activation/test, sequence enrollment, trigger tag, task/note that triggers automation, or outreach.
  - Company-level DND placeholder only.
  - No tags added.
- Rollback/suppression posture:
  - If any created object is wrong, stop and prepare a manual rollback/hygiene packet before cleanup.
  - Confirm no known suppression/conflicts/prior-touch blocker has emerged before live run.
  - Preserve all response artifacts with tokens/emails/phones scrubbed.
- Stop rules:
  - Stop on any 401, 403, non-2xx response, unexpected location/pipeline/stage, more than one selected record, missing DND/no-tag/no-workflow evidence, or unexpected contact/opportunity match.
  - Stop after first live error; do not retry repeatedly.
  - Stop if HighLevel UI/API indicates any workflow, tag, or send automation may fire.
- Post-run review:
  - Report must show `status: ok`, `syncedRecords: 1`, `blocked: 0`, and zero sends/workflows/tags/LinkedIn actions before downstream review treats Kore.ai as linked in HighLevel.

Copy/paste live approval template:

```text
DECISION: Authorize a single HighLevel Agent Targeting live sync retry after clean read-only probe and clean dry-run evidence.
Destination: Whiteford Schell IP location tm68WWMrcAa3TqQbEAMa; Whiteford Schell IP Pipeline Tbx4tA6wHv5lTwZPSHyZ; Agent Targeting stage fd569cf4-979b-43b8-bd0f-78e807e80ff1.
Prospect scope: Kore.ai only / prospect_ae4ea495016fb286698d44da.
Operator: <name/profile>.
Timing: <exact date/time window>.
Posture: company-level DND placeholder only; no sends, no SMS, no DMs, no LinkedIn/social, no workflow activation/test/enrollment, no sequences, no trigger tags, no outreach, no public action.
Suppression/conflicts/rollback: confirm no suppression/conflicts/prior-touch blocker immediately before live run; preserve scrubbed artifacts; stop and prepare manual rollback/hygiene packet if anything is unexpected.
Stop rules: stop on 401, 403, non-2xx response, unexpected location/pipeline/stage, selected != 1, missing DND/no-tag/no-workflow evidence, or any indication an automation/send/tag may fire.
Post-run review: downstream review may treat Kore.ai as linked only if report shows status ok, syncedRecords 1, blocked 0, and zero sends/workflows/tags/LinkedIn actions.
```

Without an approval containing those elements, the historical live command remains blocked.

## 9. Kanban update guidance without exposing secrets

Safe Kanban update examples:

```text
HighLevel token refresh dry-run result: read-only probe returned 200 and dry-run report is dry_run_ok for Kore.ai, selected 1, location tm68WWMrcAa3TqQbEAMa, pipeline Tbx4tA6wHv5lTwZPSHyZ, no tags/no sends/no workflow enrollment. Live retry remains blocked pending exact Jeff approval.
```

```text
HighLevel token refresh remains blocked: read-only probe returned 403 location access for tm68WWMrcAa3TqQbEAMa. No dry-run/live mutation performed. Token value not recorded.
```

Do not include token strings, bearer headers, raw secret JSON, email/phone values, or unredacted HighLevel responses in Kanban comments.

## 10. Final operator posture

Recommended next action: Jeff/operator may refresh the HighLevel Private Integration token and run the read-only probe plus dry run only. If the dry run is clean, pause and request Jeff's separate exact live-run approval using Section 8. If any probe or dry-run check fails, keep `t_7884ab57` blocked and record the failure class without token values.
