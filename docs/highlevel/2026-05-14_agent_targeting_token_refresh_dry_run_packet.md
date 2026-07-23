# 2026-05-14 HighLevel Agent Targeting Token Refresh + Dry-Run-Only Operator Packet

Task: `t_0dbe0cc9`
Related blocker: `t_7884ab57`
Original blocker packet: `docs/highlevel/2026-05-11_agent_targeting_token_refresh_dry_run_packet.md`
Location: Whiteford Schell IP / `tm68WWMrcAa3TqQbEAMa`
Pipeline: Whiteford Schell IP Pipeline / `Tbx4tA6wHv5lTwZPSHyZ`
Stage: Agent Targeting / `fd569cf4-979b-43b8-bd0f-78e807e80ff1`
Prospect scope for this packet: Kore.ai only / `prospect_ae4ea495016fb286698d44da`
Prepared: 2026-05-14 04:41 MDT
Status: INTERNAL TOKEN-REFRESH, READ-ONLY PROBE, AND LOCAL DRY-RUN-ONLY PACKET

This packet does not authorize email, SMS, DM, LinkedIn/social action, public publishing, ad launch, prospecting, enrichment, workflow activation, workflow test, workflow enrollment, sequence enrollment, trigger tag, contact/opportunity mutation, HighLevel live sync, Supabase/SQLite/Clio mutation, or any client/prospect-facing action.

## 1. Narrow purpose

This packet converts the blocked 2026-05-11 HighLevel Agent Targeting sync into a no-mutation operator checklist:

1. Refresh or verify the HighLevel Private Integration token for the Whiteford Schell IP location.
2. Run only a read-only API probe to confirm token/location access.
3. Run only the local dry-run command to confirm the Kore.ai payload is still clean.
4. Stop before any live contact/opportunity mutation unless Jeff gives separate exact current approval with the full live gate in Section 9.

The packet intentionally replaces the earlier live retry wording from the blocker report with a future, non-authorizing, separately gated step.

## 2. Evidence and local verification read

Inputs reviewed:

- Blocker task `t_7884ab57` and its comment thread through 2026-05-14 04:37 MDT.
- Blocker report: `docs/nightly-lead-research/runs/2026-05-11/highlevel_agent_targeting_sync_blocker_report.md`.
- Dry-run report: `docs/nightly-lead-research/runs/2026-05-11/highlevel_agent_targeting_sync_dryrun.json`.
- Live attempt report: `docs/nightly-lead-research/runs/2026-05-11/highlevel_agent_targeting_sync.json`.
- Dry-run contact payload: `docs/nightly-lead-research/runs/2026-05-11/highlevel_agent_targeting_payloads/ghl-agent-targeting-sync-dryrun-2026-05-11T10-55-10-677387Z-5027b894-prospect_ae4ea495016fb286698d44da-contact-payload.json`.
- Redacted live contact response: `docs/nightly-lead-research/runs/2026-05-11/highlevel_agent_targeting_payloads/ghl-agent-targeting-sync-live-2026-05-11T10-55-15-476493Z-786f3d36-prospect_ae4ea495016fb286698d44da-contact-response.json`.
- Prior packet: `docs/highlevel/2026-05-11_agent_targeting_token_refresh_dry_run_packet.md`.

Local no-mutation JSON verification run at 2026-05-14 04:41 MDT passed all checked conditions:

- Dry-run report has `live: false` and `status: dry_run_ok`.
- Location is exactly `tm68WWMrcAa3TqQbEAMa`.
- Pipeline is exactly `Tbx4tA6wHv5lTwZPSHyZ`.
- Stage is exactly `Agent Targeting` / `fd569cf4-979b-43b8-bd0f-78e807e80ff1`.
- Dry run selected exactly 1 record, Kore.ai / `prospect_ae4ea495016fb286698d44da`.
- Dry run shows zero contacts created/linked, zero opportunities created/linked, and zero synced records.
- Safety flags show no sends, no workflow enrollment, no tags added, and no LinkedIn actions.
- Contact payload is company-level, `name: Kore.ai Agent Targeting`, `companyName: Kore.ai`, `dnd: true`, no `tags` array, and active DND settings for Call, Email, SMS, and WhatsApp.
- Historical live attempt remains blocked: `status: partial`, `blocked: 1`, `syncedRecords: 0`, with redacted HighLevel response `status: 401` / `Invalid Private Integration token`.

## 3. Current blocker state

The HighLevel Agent Targeting sync remains blocked by token/location/API-access failures, not by payload readiness.

Observed blocker sequence:

- 2026-05-11 initial live attempt: HighLevel contact create returned HTTP 401 `Invalid Private Integration token`.
- 2026-05-11 20:56 recheck: configured secret and app `.env.local` token both returned HTTP 401 on read-only `/workflows` probe.
- 2026-05-11 22:38 recheck and later watchdog rechecks: failures shifted between HTTP 403 `The token does not have access to this location` and Cloudflare/LeadConnector Error 1010 access denial / `browser_signature_banned`.
- 2026-05-14 04:37 recheck: secret exists and contains a token, but safe read-only `/workflows` probe still returned HTTP 403 `The token does not have access to this location` for location `tm68WWMrcAa3TqQbEAMa`.

Operating interpretation: treat 401 invalid-token, 403 wrong-location/location-access, and Cloudflare/LeadConnector Error 1010 access denial as manual HighLevel token/location/API-access blockers. They are not approval to retry live mutation.

## 4. Token refresh instructions

Jeff or an authorized operator should complete these steps outside Kanban comments and without exposing token values:

1. In HighLevel / LeadConnector, select the Whiteford Schell IP location, not another agency or location.
2. Generate or locate a current Private Integration token bound to location `tm68WWMrcAa3TqQbEAMa`.
3. Confirm access/scopes before saving locally:
   - Location binding: Whiteford Schell IP / `tm68WWMrcAa3TqQbEAMa`.
   - Contacts: read/write available for the eventual separately approved sync.
   - Opportunities: read/write available for the eventual separately approved sync.
   - Pipeline access: Whiteford Schell IP Pipeline / `Tbx4tA6wHv5lTwZPSHyZ`.
4. Update only the local Growth OS secret file unless Jeff separately approves another environment change:
   - `/Users/jeff/.openclaw/secrets/ghl-whiteford-schell-ip.json`
5. Do not paste the token into Kanban, docs, chat, screenshots, terminal summaries, issue descriptions, commits, or deliverable index rows.
6. If `.env.local` also needs a refreshed HighLevel token for separate app testing, treat that as a separate environment change; this packet does not require `.env.local` for the dry-run script.
7. After saving the secret, run the read-only probe first. Stop on any 401, 403, Error 1010, unexpected location, or unexpected response body.

## 5. Read-only verification command

Run from any shell on Jeff's machine after the local secret has been refreshed. This command performs a GET request only.

```bash
python3 - <<'PY'
import json, urllib.parse, urllib.request, urllib.error
from pathlib import Path

secret = Path('/Users/jeff/.openclaw/secrets/ghl-whiteford-schell-ip.json')
location_id = 'tm68WWMrcAa3TqQbEAMa'
token = json.loads(secret.read_text())['token']
url = 'https://services.leadconnectorhq.com/workflows/?' + urllib.parse.urlencode({'locationId': location_id})
req = urllib.request.Request(url, headers={
    'Authorization': f'Bearer {token}',
    'Version': '2021-07-28',
    'Accept': 'application/json',
    'User-Agent': 'whiteford-highlevel-readonly-token-probe/1.0',
})
try:
    with urllib.request.urlopen(req, timeout=30) as resp:
        print({'ok': 200 <= resp.status < 300, 'status': resp.status, 'probe': 'workflows_readonly', 'locationId': location_id})
except urllib.error.HTTPError as e:
    body = e.read().decode('utf-8', errors='replace')[:700]
    print({'ok': False, 'status': e.code, 'probe': 'workflows_readonly', 'locationId': location_id, 'body': body})
PY
```

Why this is allowed after token refresh: it is read-only and does not create/update contacts, opportunities, notes, tags, tasks, workflows, enrollments, sends, or social actions.

Expected clean output shape:

```text
{'ok': True, 'status': 200, 'probe': 'workflows_readonly', 'locationId': 'tm68WWMrcAa3TqQbEAMa'}
```

Expected still-blocked outputs:

```text
{'ok': False, 'status': 401, 'probe': 'workflows_readonly', 'locationId': 'tm68WWMrcAa3TqQbEAMa', 'body': '...Invalid Private Integration token...'}
```

```text
{'ok': False, 'status': 403, 'probe': 'workflows_readonly', 'locationId': 'tm68WWMrcAa3TqQbEAMa', 'body': '...The token does not have access to this location...'}
```

```text
{'ok': False, 'status': 403, 'probe': 'workflows_readonly', 'locationId': 'tm68WWMrcAa3TqQbEAMa', 'body': '...Error 1010...Access denied...'}
```

Operator response to any still-blocked output: stop, do not run live, do not expose token values, and record only the status class in Kanban.

## 6. Local dry-run-only verification command

Run from repository root only after the read-only probe returns a clean 2xx response.

```bash
cd /Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages
python3 scripts/ghl_agent_targeting_validated_sync.py \
  --out docs/nightly-lead-research/runs/2026-05-11/highlevel_agent_targeting_sync_dryrun.json \
  --prospect-id prospect_ae4ea495016fb286698d44da
```

Why this is allowed: without `--live`, the script writes local dry-run report/payload artifacts only. It does not POST contacts or opportunities and does not update HighLevel, Supabase, Clio, public pages, social platforms, email systems, or client/prospect-facing channels.

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

If the dry-run output diverges from this shape, stop and prepare an updated blocker note instead of attempting a live retry.

## 7. Dry-run verification checklist

Before requesting any future live approval, confirm every item:

- [ ] Report `live` is `false`.
- [ ] Report `status` is `dry_run_ok`.
- [ ] Report `locationId` is exactly `tm68WWMrcAa3TqQbEAMa`.
- [ ] Report `pipelineId` is exactly `Tbx4tA6wHv5lTwZPSHyZ`.
- [ ] Report `stageName` is exactly `Agent Targeting`.
- [ ] Report `stageId` is exactly `fd569cf4-979b-43b8-bd0f-78e807e80ff1`.
- [ ] Report selects exactly 1 record: Kore.ai / `prospect_ae4ea495016fb286698d44da`.
- [ ] Report `blocked` is `0`.
- [ ] Report `syncedRecords` is `0` in dry-run mode.
- [ ] Report shows `contactsCreated`, `contactsLinked`, `opportunitiesCreated`, and `opportunitiesLinked` are all `0`.
- [ ] Safety flags show `no_sends: true`, `no_workflow_enrollment: true`, `no_tags_added: true`, and `no_linkedin_actions: true`.
- [ ] Contact payload uses company-level placeholder values: `companyName: Kore.ai`, `name: Kore.ai Agent Targeting`.
- [ ] Contact payload includes `dnd: true`.
- [ ] Contact payload has active DND settings for Call, Email, SMS, and WhatsApp.
- [ ] Contact payload contains no `tags` array.
- [ ] No HighLevel UI workflow activation/test/enrollment was performed.
- [ ] No Growth OS SQLite/Supabase/Clio mutation was performed by the dry-run step.
- [ ] No public/social/email/client/prospect-facing action was performed.

## 8. Local JSON re-check command

This optional command verifies the current dry-run/live JSON artifacts without calling HighLevel or mutating any system.

```bash
cd /Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages
python3 - <<'PY'
import json
from pathlib import Path
root = Path.cwd()
dry = json.loads((root/'docs/nightly-lead-research/runs/2026-05-11/highlevel_agent_targeting_sync_dryrun.json').read_text())
live = json.loads((root/'docs/nightly-lead-research/runs/2026-05-11/highlevel_agent_targeting_sync.json').read_text())
payload = json.loads((root/'docs/nightly-lead-research/runs/2026-05-11/highlevel_agent_targeting_payloads/ghl-agent-targeting-sync-dryrun-2026-05-11T10-55-10-677387Z-5027b894-prospect_ae4ea495016fb286698d44da-contact-payload.json').read_text())
assert dry['live'] is False
assert dry['status'] == 'dry_run_ok'
assert dry['locationId'] == 'tm68WWMrcAa3TqQbEAMa'
assert dry['pipelineId'] == 'Tbx4tA6wHv5lTwZPSHyZ'
assert dry['stageName'] == 'Agent Targeting'
assert dry['stageId'] == 'fd569cf4-979b-43b8-bd0f-78e807e80ff1'
assert dry['selected'] == 1 and dry['blocked'] == 0
assert all(dry[k] == 0 for k in ['syncedRecords','contactsCreated','contactsLinked','opportunitiesCreated','opportunitiesLinked'])
assert all(dry['safety'][k] is True for k in ['no_sends','no_workflow_enrollment','no_tags_added','no_linkedin_actions'])
assert payload['companyName'] == 'Kore.ai'
assert payload['name'] == 'Kore.ai Agent Targeting'
assert payload['dnd'] is True and 'tags' not in payload
assert all(payload['dndSettings'][ch]['status'] == 'active' for ch in ['Call','Email','SMS','WhatsApp'])
assert live['live'] is True and live['status'] == 'partial' and live['syncedRecords'] == 0
print('local_json_checks_passed_no_mutation')
PY
```

## 9. Separately gated future-live-command section

The historical live command from the blocker report is not authorized by this packet:

```bash
cd /Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages
python3 scripts/ghl_agent_targeting_validated_sync.py \
  --live \
  --out docs/nightly-lead-research/runs/2026-05-11/highlevel_agent_targeting_sync.json \
  --prospect-id prospect_ae4ea495016fb286698d44da
```

This command is a live mutation path. It may create/link a HighLevel contact, create/link an opportunity, write local Growth OS sync/audit state, and alter how downstream review treats Kore.ai. It must remain dormant unless Jeff gives exact current approval after a clean read-only probe and clean dry run.

Minimum future-live approval contents required from Jeff:

- Destination:
  - HighLevel location `tm68WWMrcAa3TqQbEAMa` / Whiteford Schell IP.
  - Pipeline `Tbx4tA6wHv5lTwZPSHyZ` / Whiteford Schell IP Pipeline.
  - Stage `Agent Targeting` / `fd569cf4-979b-43b8-bd0f-78e807e80ff1`.
- Prospect scope:
  - Kore.ai only / `prospect_ae4ea495016fb286698d44da`, unless Jeff explicitly lists additional prospect IDs.
- Operator:
  - Named human or agent profile authorized for the live attempt.
- Timing:
  - Exact current date/time window for the live attempt.
- No-send/no-enrollment/no-trigger-tag posture:
  - Company-level DND placeholder only.
  - No email, SMS, DM, LinkedIn/social action, public publishing, ads, workflow activation/test/enrollment, sequence enrollment, trigger tag, or outreach.
  - No tags added.
- Suppression/conflicts/rollback posture:
  - Confirm no suppression, conflict, prior-touch, client, ethics, or attorney-review blocker has emerged immediately before live run.
  - Preserve scrubbed request/response artifacts.
  - If any created object is wrong, stop and prepare a manual rollback/hygiene packet before cleanup.
- Stop rules:
  - Stop on 401, 403, Error 1010, non-2xx response, unexpected location/pipeline/stage, selected record count other than 1, missing DND/no-tag/no-workflow evidence, unexpected contact/opportunity match, or any indication a send/workflow/tag/automation may fire.
  - Stop after the first live error; do not retry repeatedly.
  - Stop if HighLevel UI/API indicates any workflow, tag, sequence, or send automation may trigger.
- Post-run review:
  - Downstream review may treat Kore.ai as linked only if the report shows `status: ok`, `syncedRecords: 1`, `blocked: 0`, and zero sends/workflows/tags/LinkedIn/social actions.

Copy/paste future approval template:

```text
DECISION: Authorize one HighLevel Agent Targeting live sync retry only after clean read-only probe and clean dry-run evidence.
Destination: Whiteford Schell IP location tm68WWMrcAa3TqQbEAMa; Whiteford Schell IP Pipeline Tbx4tA6wHv5lTwZPSHyZ; Agent Targeting stage fd569cf4-979b-43b8-bd0f-78e807e80ff1.
Prospect scope: Kore.ai only / prospect_ae4ea495016fb286698d44da.
Operator: <name/profile>.
Timing: <exact current date/time window>.
Posture: company-level DND placeholder only; no email, SMS, DMs, LinkedIn/social, public publishing, ads, workflow activation/test/enrollment, sequences, trigger tags, tags, outreach, or client/prospect-facing action.
Suppression/conflicts/rollback: confirm no suppression/conflicts/prior-touch/client/ethics/attorney-review blocker immediately before live run; preserve scrubbed artifacts; stop and prepare manual rollback/hygiene packet if anything is unexpected.
Stop rules: stop on 401, 403, Error 1010, non-2xx response, unexpected location/pipeline/stage, selected != 1, missing DND/no-tag/no-workflow evidence, unexpected contact/opportunity match, or any indication automation/send/tag may fire. Stop after first live error.
Post-run review: downstream review may treat Kore.ai as linked only if report shows status ok, syncedRecords 1, blocked 0, and zero sends/workflows/tags/LinkedIn/social actions.
```

Without approval containing those elements, the live command remains blocked.

## 10. Safe Kanban update examples

If read-only probe remains blocked:

```text
HighLevel Agent Targeting token refresh remains blocked: read-only `/workflows` probe returned <401/403/Error 1010> for location tm68WWMrcAa3TqQbEAMa. No dry-run/live mutation performed. Token value not recorded. Live retry remains blocked pending refreshed location-bound token and exact Jeff approval.
```

If read-only probe is clean and dry-run is clean:

```text
HighLevel Agent Targeting token refresh dry-run passed: read-only probe returned 2xx and local dry-run report is `dry_run_ok` for Kore.ai, selected 1, location tm68WWMrcAa3TqQbEAMa, pipeline Tbx4tA6wHv5lTwZPSHyZ, Agent Targeting stage fd569cf4-979b-43b8-bd0f-78e807e80ff1, no tags/no sends/no workflow enrollment/no LinkedIn actions. Live retry remains blocked pending Jeff's separate exact current approval.
```

Never include token strings, bearer headers, raw secret JSON, email/phone values, unredacted HighLevel responses, or client/prospect-facing assertions in Kanban comments.

## 11. Final operator posture

Recommended next action: Jeff or an authorized operator should refresh/verify the Whiteford Schell IP HighLevel Private Integration token, run the read-only probe, then run only the local dry-run command. If both pass, pause and request Jeff's separate exact live-run approval using Section 9. If any probe or dry-run check fails, keep `t_7884ab57` blocked and record only the failure class without token values.
