# Supabase expanded schema exact-unblock operator packet — 2026-05-14

Task: `t_a27382e5`
Primary blocker task: `t_fa6eb9c1` — Apply expanded Supabase Growth OS mirror schema
Tenant: `whiteford-mountain-west`
Supabase project ref: `yidxnmxvtohaldkbypcv`
Status: NO-MUTATION OPERATOR PREP ONLY

This packet does not authorize or perform Supabase DDL, Supabase row sync, mirror backfill, HighLevel/CRM/Clio mutation, workflow activation, contact enrollment, email/SMS/LinkedIn/social actions, public publishing, ads, or prospect/client-facing changes. It is a human/admin runbook and evidence checklist for the persistent expanded-schema blocker.

## 1. Executive bottom line

The persistent blocker is a DDL-access blocker, not an agent retry blocker.

Available agent credentials have repeatedly been API/PostgREST/service-role style credentials. They can verify table visibility and sync rows after tables exist, but they cannot safely execute `CREATE TABLE` DDL. Repeated watchdog checks also found no configured `supabase` CLI, no `psql`, no DDL-capable database URL/password, and no Supabase management token in the checked local project/app env paths.

Exact human/admin unblock path:

1. Jeff or an explicitly authorized Supabase admin opens project `yidxnmxvtohaldkbypcv`.
2. The operator reviews and, only after exact approval, runs this prepared SQL file:
   `/Users/jeff/.openclaw/projects/mountain-west-growth-os/supabase/phase6-11-combined-growth-os-schema.sql`
3. The operator captures non-secret evidence before/during/after the DDL.
4. The operator verifies all 33 expanded Growth OS mirror tables exist.
5. Only after verification should `t_fa6eb9c1` be completed/unblocked.
6. Downstream mirror/backfill tasks must then promote through the normal Kanban dependency graph. Do not unlink, force-start, or manually bypass them.

## 2. Exact approval language required before any DDL or sync

Use this exact language before schema DDL:

```text
I, Jeff or an explicitly authorized Supabase admin/operator, approve applying the prepared Growth OS phase 6-11 expanded schema SQL to Supabase project yidxnmxvtohaldkbypcv using this exact file:
/Users/jeff/.openclaw/projects/mountain-west-growth-os/supabase/phase6-11-combined-growth-os-schema.sql
I understand this approval is for schema DDL only. It does not authorize Supabase data sync/backfill, HighLevel/CRM/Clio mutation, workflow activation, contact enrollment, sends, LinkedIn/social actions, public publishing, ads, or client/prospect-facing changes.
```

Use this exact language before any later mirror/backfill sync:

```text
I, Jeff or an explicitly authorized operator, approve the internal Growth OS Supabase mirror/backfill after successful verification that all 33 expanded phase 6-11 tables exist in project yidxnmxvtohaldkbypcv. This approval is for internal Supabase mirror/backfill only. It does not authorize HighLevel/CRM/Clio mutation, workflow activation, contact enrollment, sends, LinkedIn/social actions, public publishing, ads, or client/prospect-facing changes.
```

If the approval language is absent, ambiguous, or broader than intended, stop. Do not run DDL or sync.

## 3. Source anchors for this packet

- Blocker report: `/Users/jeff/.openclaw/projects/mountain-west-growth-os/reports/2026-05-06-supabase-expanded-schema-blocker.md`
- Prepared SQL: `/Users/jeff/.openclaw/projects/mountain-west-growth-os/supabase/phase6-11-combined-growth-os-schema.sql`
- Prior no-mutation packet: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/ops/2026-05-11_supabase_schema_human_unblock_operator_packet.md`
- Current blocker task: `t_fa6eb9c1`
- Current exact-unblock packet task: `t_a27382e5`
- Gated downstream mirror/backfill tasks: `t_7d361e6b`, `t_cf8c4471`, `t_77403651`, `t_4a921ae0`, `t_53d470c6`

Prepared SQL local verification on 2026-05-14:

```text
path: /Users/jeff/.openclaw/projects/mountain-west-growth-os/supabase/phase6-11-combined-growth-os-schema.sql
sha256: 8bf45ee3533b540fa16def0afc759148627bf23ea387510eba4da9ce0e23f0bb
bytes: 23330
lines from wc -l: 620
tables declared by CREATE TABLE search: 33
sync script present: /Users/jeff/.openclaw/projects/mountain-west-growth-os/scripts/sync-sqlite-to-supabase.mjs
local DDL tools in this shell: supabase CLI absent; psql absent
```

The blocker report lists the prepared SQL as the combined execution-order artifact assembled from:

1. `/Users/jeff/.openclaw/projects/mountain-west-growth-os/supabase/phase6-draft-factory-schema.sql`
2. `/Users/jeff/.openclaw/projects/mountain-west-growth-os/supabase/phase7-outreach-execution-schema.sql`
3. `/Users/jeff/.openclaw/projects/mountain-west-growth-os/supabase/phase8-crm-highlevel-integration-schema.sql`
4. `/Users/jeff/.openclaw/projects/mountain-west-growth-os/supabase/phase9-11-growth-engine-schema.sql`

## 4. Expected expanded tables after DDL

The prepared SQL declares these 33 expanded Growth OS mirror tables:

```text
source_evidence
suppression_checks
outreach_drafts
compliance_reviews
draft_audit_trail
outreach_channels
send_authorization_rules
execution_authorizations
ghl_sync_links
outreach_events
crm_integration_config
crm_field_mappings
crm_sync_batches
crm_sync_records
crm_audit_log
ghl_pipeline_blueprints
ghl_pipeline_stage_mappings
ghl_stage_action_rules
ghl_opportunity_stage_events
content_lanes
content_topics
content_sources
content_assets
content_performance
kpi_snapshots
cohort_tracking
offer_performance
agent_productivity_metrics
weekly_growth_reports
hardening_checks
duplicate_candidates
source_freshness_checks
backup_exports
```

Pass condition after DDL: all 33 are present in `public` and visible through the chosen verification path.

## 5. Preflight checklist before running SQL

```text
SUPABASE SCHEMA PREFLIGHT — DO NOT RUN UNTIL EVERY ITEM IS TRUE
[ ] I am Jeff or an explicitly authorized Supabase admin/operator.
[ ] I have the exact DDL approval language recorded outside this packet.
[ ] I am in Supabase project yidxnmxvtohaldkbypcv, not another project.
[ ] The Supabase dashboard/header/settings visibly confirm project ref yidxnmxvtohaldkbypcv.
[ ] I have DDL-capable access through SQL Editor, direct Postgres connection, or an approved migration path.
[ ] I have opened this exact local SQL file:
    /Users/jeff/.openclaw/projects/mountain-west-growth-os/supabase/phase6-11-combined-growth-os-schema.sql
[ ] I verified, if feasible, that the SQL sha256 is:
    8bf45ee3533b540fa16def0afc759148627bf23ea387510eba4da9ce0e23f0bb
[ ] I have reviewed the SQL enough to understand it creates phase 6-11 expanded mirror schema objects.
[ ] I understand this packet does not itself authorize DDL or sync.
[ ] I understand DDL approval does not authorize mirror/backfill sync or any external/client-facing action.
[ ] I know the current Supabase backup/restore owner and posture, or Jeff has accepted the restore caveat.
[ ] I am ready to capture screenshots/logs without exposing secrets.
```

Local hash command for the operator:

```bash
shasum -a 256 /Users/jeff/.openclaw/projects/mountain-west-growth-os/supabase/phase6-11-combined-growth-os-schema.sql
```

Expected first field:

```text
8bf45ee3533b540fa16def0afc759148627bf23ea387510eba4da9ce0e23f0bb
```

## 6. SQL Editor runbook for the human/admin operator

Use only after exact DDL approval.

```text
SUPABASE SQL EDITOR RUNBOOK
1. Open Supabase dashboard.
2. Select project yidxnmxvtohaldkbypcv.
3. Open SQL Editor.
4. Create a new query with a clear title, e.g.:
   2026-05-14 Growth OS phase 6-11 expanded schema
5. Paste the full contents of:
   /Users/jeff/.openclaw/projects/mountain-west-growth-os/supabase/phase6-11-combined-growth-os-schema.sql
6. Confirm the pasted SQL is the full prepared file, not a partial excerpt.
7. Confirm again that this is project yidxnmxvtohaldkbypcv.
8. Run once.
9. Capture result summary, notices, and any errors.
10. If successful, proceed to post-DDL verification.
11. If any error occurs, stop and capture the exact error. Do not edit around errors without a new reviewed plan.
```

## 7. Direct Postgres / migration path if Jeff provides DDL-capable credentials

Use only if Jeff/admin provides a DDL-capable database URL/password or approved migration path through a secure secret channel. Do not paste passwords, tokens, service-role keys, or connection strings into Kanban, docs, chat, screenshots, or committed files.

Reference command, with secrets supplied only by the secure environment:

```bash
cd /Users/jeff/.openclaw/projects/mountain-west-growth-os
psql "$SUPABASE_DB_URL" \
  --set ON_ERROR_STOP=on \
  --file supabase/phase6-11-combined-growth-os-schema.sql
```

Evidence to capture from CLI/migration path:

```text
[ ] Command used, with secrets redacted.
[ ] Exit code.
[ ] Full stdout/stderr saved to a private local evidence file.
[ ] Confirmation that no secret appeared in docs, Kanban, committed files, screenshots, or shell history capture.
```

## 8. Evidence-capture checklist

Suggested local evidence folder:

```text
/Users/jeff/.openclaw/projects/mountain-west-growth-os/reports/evidence/2026-05-14-supabase-schema-exact-unblock/
```

Minimum non-secret evidence:

```text
BEFORE RUN
[ ] Screenshot showing Supabase project ref yidxnmxvtohaldkbypcv.
[ ] Screenshot or terminal output showing exact SQL file path and sha256.
[ ] Screenshot of SQL Editor query title or approved migration path before execution.
[ ] Copy of exact approval language used, without secrets.

DURING/AFTER RUN
[ ] Screenshot/log of SQL Editor or CLI result panel.
[ ] Any warnings/notices/errors captured exactly, with secrets redacted.
[ ] If failed, line/context of the first error captured.

POST-VERIFY
[ ] SQL or PostgREST verification output showing 33/33 tables present.
[ ] Kanban comment on t_fa6eb9c1 with evidence path, outcome, and next step.
[ ] If successful, explicit note that downstream tasks should promote normally, not be force-started.
```

Do not save raw tokens, passwords, connection strings, service-role keys, client/prospect PII, or confidential CRM payloads in the evidence folder.

## 9. Post-DDL verification commands

Run these only after the human/admin DDL succeeds. The first option is SQL Editor verification; the second option is a read-only local PostgREST visibility smoke check.

### Option A — SQL Editor verification query

```sql
select table_name
from information_schema.tables
where table_schema = 'public'
  and table_name in (
    'source_evidence',
    'suppression_checks',
    'outreach_drafts',
    'compliance_reviews',
    'draft_audit_trail',
    'outreach_channels',
    'send_authorization_rules',
    'execution_authorizations',
    'ghl_sync_links',
    'outreach_events',
    'crm_integration_config',
    'crm_field_mappings',
    'crm_sync_batches',
    'crm_sync_records',
    'crm_audit_log',
    'ghl_pipeline_blueprints',
    'ghl_pipeline_stage_mappings',
    'ghl_stage_action_rules',
    'ghl_opportunity_stage_events',
    'content_lanes',
    'content_topics',
    'content_sources',
    'content_assets',
    'content_performance',
    'kpi_snapshots',
    'cohort_tracking',
    'offer_performance',
    'agent_productivity_metrics',
    'weekly_growth_reports',
    'hardening_checks',
    'duplicate_candidates',
    'source_freshness_checks',
    'backup_exports'
  )
order by table_name;
```

Pass condition: 33 rows returned.

### Option B — local read-only PostgREST smoke check

```bash
python3 - <<'PY'
import json
import sys
import urllib.error
import urllib.request
from pathlib import Path

secret_path = Path('/Users/jeff/.openclaw/secrets/growth-os-supabase.json')
secrets = json.loads(secret_path.read_text())
url = secrets.get('SUPABASE_URL') or secrets.get('NEXT_PUBLIC_SUPABASE_URL') or secrets.get('url')
key = secrets.get('SUPABASE_SERVICE_ROLE_KEY') or secrets.get('service_role_key')
if not url or not key:
    raise SystemExit('Missing SUPABASE_URL or service role key in local secret file')

tables = [
    'source_evidence', 'suppression_checks', 'outreach_drafts', 'compliance_reviews',
    'draft_audit_trail', 'outreach_channels', 'send_authorization_rules',
    'execution_authorizations', 'ghl_sync_links', 'outreach_events',
    'crm_integration_config', 'crm_field_mappings', 'crm_sync_batches', 'crm_sync_records',
    'crm_audit_log', 'ghl_pipeline_blueprints', 'ghl_pipeline_stage_mappings',
    'ghl_stage_action_rules', 'ghl_opportunity_stage_events', 'content_lanes',
    'content_topics', 'content_sources', 'content_assets', 'content_performance',
    'kpi_snapshots', 'cohort_tracking', 'offer_performance', 'agent_productivity_metrics',
    'weekly_growth_reports', 'hardening_checks', 'duplicate_candidates',
    'source_freshness_checks', 'backup_exports'
]

missing = []
errors = {}
for table in tables:
    req = urllib.request.Request(
        f"{url.rstrip('/')}/rest/v1/{table}?select=*&limit=0",
        headers={
            'apikey': key,
            'Authorization': f'Bearer {key}',
            'Accept': 'application/json',
        },
        method='GET',
    )
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            status = resp.status
    except urllib.error.HTTPError as e:
        status = e.code
        body = e.read().decode('utf-8', errors='replace')[:500]
        if status == 404:
            missing.append(table)
        else:
            errors[table] = {'status': status, 'body': body}
    except Exception as e:
        errors[table] = {'error': repr(e)}

print(f'checked={len(tables)} missing={len(missing)} errors={len(errors)}')
if missing:
    print('missing=' + ','.join(missing))
if errors:
    print('errors=' + json.dumps(errors, indent=2))
if missing or errors:
    sys.exit(1)
print('PASS: all expanded Growth OS tables visible through PostgREST')
PY
```

Pass condition:

```text
checked=33 missing=0 errors=0
PASS: all expanded Growth OS tables visible through PostgREST
```

If SQL Editor succeeds but PostgREST still reports missing tables, wait briefly or refresh the Supabase schema cache if available, then retry verification. Do not start mirror/backfill until verification passes.

## 10. Stop conditions

Stop immediately and do not improvise if any item is true:

```text
[ ] Project ref is not exactly yidxnmxvtohaldkbypcv.
[ ] Operator is not Jeff or an explicitly authorized Supabase admin/operator.
[ ] Exact DDL approval language is missing or ambiguous.
[ ] Operator lacks SQL Editor / DDL-capable access.
[ ] Credentials, ownership, or admin authority are unclear.
[ ] SQL file path differs from /Users/jeff/.openclaw/projects/mountain-west-growth-os/supabase/phase6-11-combined-growth-os-schema.sql.
[ ] SQL sha256 differs from 8bf45ee3533b540fa16def0afc759148627bf23ea387510eba4da9ce0e23f0bb and the diff has not been reviewed.
[ ] SQL Editor/CLI returns any error.
[ ] Supabase prompts for a destructive/irreversible confirmation not covered by the approval.
[ ] Backup/restore responsibility is unclear and the operator is uncomfortable proceeding.
[ ] Post-DDL verification returns fewer than 33 expected tables.
[ ] PostgREST smoke check returns unexpected non-404 errors.
[ ] Anyone requests force-starting or unlinking gated mirror/backfill tasks.
[ ] Anyone requests HighLevel/CRM/Clio mutation, workflow activation, sends, LinkedIn/social actions, public publishing, ads, or client/prospect-facing action as part of this packet.
[ ] A secret appears in logs/screenshots/docs/Kanban and needs redaction before sharing.
```

If stopped, leave a Kanban comment on `t_fa6eb9c1` in this shape:

```text
Outcome: stopped
Where: <SQL Editor / CLI / verification step>
Exact error or uncertainty: <redacted, no secrets>
Evidence path: <local path if available>
Needed decision/access: <one sentence>
No downstream mirror/backfill task was force-started.
```

## 11. Post-DDL mirror/backfill handoff

Do not force-start, unlink, or manually bypass downstream tasks. The dependency graph is the control surface.

After successful DDL and 33/33 verification:

1. Comment on `t_fa6eb9c1` with evidence path, SQL file path, hash, and 33/33 verification result.
2. Complete/unblock `t_fa6eb9c1` only after verification is captured.
3. Let the following tasks promote normally:
   - `t_7d361e6b` — Mirror nightly research to Supabase - 2026-05-10
   - `t_cf8c4471` — Mirror nightly research to Supabase - 2026-05-11
   - `t_77403651` — Mirror nightly research to Supabase - 2026-05-12
   - `t_4a921ae0` — Mirror nightly research to Supabase - 2026-05-13
   - `t_53d470c6` — Backfill expanded Supabase mirror after schema install, including earlier partials and the 2026-05-14 partial/core sync scope noted in its comments
4. Each downstream task should run under its own instructions, approvals, and guardrails.
5. The reference mirror command for the appropriate downstream task, only after separate sync approval, is:

```bash
cd /Users/jeff/.openclaw/projects/mountain-west-growth-os
node scripts/sync-sqlite-to-supabase.mjs
```

This command is included for handoff clarity only. It is not authorized by this packet.

## 12. Copy/paste Kanban comments

Successful DDL comment for `t_fa6eb9c1`:

```text
Supabase expanded schema human/admin DDL completed for project yidxnmxvtohaldkbypcv.
SQL file: /Users/jeff/.openclaw/projects/mountain-west-growth-os/supabase/phase6-11-combined-growth-os-schema.sql
SQL sha256: 8bf45ee3533b540fa16def0afc759148627bf23ea387510eba4da9ce0e23f0bb
Verification: 33/33 expanded Growth OS tables visible after DDL.
Evidence: <local evidence path or screenshot/log references, no secrets>
Next: complete/unblock t_fa6eb9c1 and allow dependent mirror/backfill tasks t_7d361e6b, t_cf8c4471, t_77403651, t_4a921ae0, and t_53d470c6 to promote normally. Do not force-start or unlink them.
```

Hold/stopped comment for `t_fa6eb9c1`:

```text
Supabase expanded schema remains human/admin blocked.
Project: yidxnmxvtohaldkbypcv
Required SQL file: /Users/jeff/.openclaw/projects/mountain-west-growth-os/supabase/phase6-11-combined-growth-os-schema.sql
Required SQL sha256: 8bf45ee3533b540fa16def0afc759148627bf23ea387510eba4da9ce0e23f0bb
Reason not run or not verified: <wrong project / no SQL Editor access / unclear credentials / SQL error / restore question / other>
Evidence: <local evidence path if available, no secrets>
Next needed: exact Jeff/admin DDL decision or DDL-capable access. Do not force-start t_7d361e6b, t_cf8c4471, t_77403651, t_4a921ae0, or t_53d470c6.
```

## 13. Non-authorization reminder

This packet is complete as operator prep when saved and indexed. It intentionally leaves the live schema task blocked until Jeff/admin performs or explicitly authorizes the DDL through a DDL-capable path.

No Supabase DDL, Supabase sync/backfill, HighLevel/CRM/Clio mutation, workflow activation, contact enrollment, email/SMS/LinkedIn/social action, public publishing, ad launch, or prospect/client-facing action was performed while creating this packet.
