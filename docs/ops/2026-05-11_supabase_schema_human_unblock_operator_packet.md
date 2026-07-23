# Supabase expanded Growth OS schema human-unblock operator packet

Task: `t_bc046fc5`
Primary blocker task: `t_fa6eb9c1` — Apply expanded Supabase Growth OS mirror schema
Tenant: `whiteford-mountain-west`
Status: NO-MUTATION OPERATOR PACKET ONLY

This packet does not authorize Supabase DDL, row mutation, mirror sync/backfill, dashboard reliance, HighLevel/CRM/Clio mutation, workflow activation, sends, posts, source prospecting, or any client/prospect-facing action. It prepares the exact human/admin path and evidence checklist for Jeff or an authorized Supabase operator.

## 1. Bottom line

The persistent blocker is not a script or agent retry problem. Agents have service-role/PostgREST access that can read/write rows after tables exist, but they do not have a DDL-capable Supabase SQL Editor session, direct Postgres connection string/password, Supabase CLI config, `psql`, or management token.

Human/admin unblock path:

1. Open the correct Supabase project: `yidxnmxvtohaldkbypcv`.
2. Review and, only if Jeff/authorized admin approves, run this exact SQL file in a DDL-capable path:
   `/Users/jeff/.openclaw/projects/mountain-west-growth-os/supabase/phase6-11-combined-growth-os-schema.sql`
3. Capture evidence listed below.
4. Verify the 33 expanded mirror tables exist.
5. Complete/unblock `t_fa6eb9c1` only after the schema install is verified.
6. Let the existing dependency graph promote downstream mirror/backfill tasks. Do not force-start them.

## 2. Source anchors read for this packet

- Blocker report: `/Users/jeff/.openclaw/projects/mountain-west-growth-os/reports/2026-05-06-supabase-expanded-schema-blocker.md`
- Prepared combined SQL: `/Users/jeff/.openclaw/projects/mountain-west-growth-os/supabase/phase6-11-combined-growth-os-schema.sql`
- Source SQL files, in combined execution order:
  1. `/Users/jeff/.openclaw/projects/mountain-west-growth-os/supabase/phase6-draft-factory-schema.sql`
  2. `/Users/jeff/.openclaw/projects/mountain-west-growth-os/supabase/phase7-outreach-execution-schema.sql`
  3. `/Users/jeff/.openclaw/projects/mountain-west-growth-os/supabase/phase8-crm-highlevel-integration-schema.sql`
  4. `/Users/jeff/.openclaw/projects/mountain-west-growth-os/supabase/phase9-11-growth-engine-schema.sql`
- 22:30 decision addendum: `docs/digests/2026-05-11_2230_watchdog_blocker_decision_addendum.md`
- 22:30 review: `docs/reviews/2026-05-11_2230_watchdog_blocker_decision_review.md`
- 22:30 QMD refresh report: `docs/ops/qmd_2026-05-11_2230_watchdog_refresh.md`

Prepared SQL local verification from this packet run:

```text
path: /Users/jeff/.openclaw/projects/mountain-west-growth-os/supabase/phase6-11-combined-growth-os-schema.sql
bytes: 23330
lines: 621
sha256: 8bf45ee3533b540fa16def0afc759148627bf23ea387510eba4da9ce0e23f0bb
tables declared: 33
indexes declared: 25
RLS enable statements: 19
```

## 3. Tables expected after DDL

The combined schema should create these 33 expanded Growth OS mirror tables:

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

## 4. Preflight checklist before any SQL is run

Copy/paste checklist for Jeff/operator:

```text
SUPABASE SCHEMA PREFLIGHT — DO NOT RUN UNTIL EVERY ITEM IS TRUE
[ ] I am Jeff or an explicitly authorized Supabase admin/operator.
[ ] I am in Supabase project yidxnmxvtohaldkbypcv, not another project.
[ ] The browser/dashboard header or project settings visibly show project ref yidxnmxvtohaldkbypcv.
[ ] I have DDL-capable access: Supabase SQL Editor, direct Postgres connection, or approved migration path.
[ ] I have opened the exact SQL file:
    /Users/jeff/.openclaw/projects/mountain-west-growth-os/supabase/phase6-11-combined-growth-os-schema.sql
[ ] I verified the SQL file hash if feasible:
    8bf45ee3533b540fa16def0afc759148627bf23ea387510eba4da9ce0e23f0bb
[ ] I understand this packet itself does not authorize DDL; Jeff/admin approval is still required.
[ ] I understand this SQL creates schema only. It does not authorize mirror sync/backfill, HighLevel, CRM, Clio, workflow, send, social, or public action.
[ ] I have a current Supabase backup/restore point or have accepted the restore caveat below.
[ ] I am ready to capture screenshots/logs before and after execution.
```

Local hash command if the operator wants to verify the file before copying:

```bash
shasum -a 256 /Users/jeff/.openclaw/projects/mountain-west-growth-os/supabase/phase6-11-combined-growth-os-schema.sql
```

Expected output starts with:

```text
8bf45ee3533b540fa16def0afc759148627bf23ea387510eba4da9ce0e23f0bb
```

## 5. Human/admin SQL Editor path

Use this only after exact human/admin authorization.

```text
SUPABASE SQL EDITOR RUNBOOK
1. Go to Supabase dashboard.
2. Select project yidxnmxvtohaldkbypcv.
3. Open SQL Editor.
4. Create a new query named, for example:
   2026-05-11 Growth OS phase 6-11 expanded schema
5. Paste the full contents of:
   /Users/jeff/.openclaw/projects/mountain-west-growth-os/supabase/phase6-11-combined-growth-os-schema.sql
6. Before running, confirm the first meaningful lines show:
   BEGIN supabase/phase6-draft-factory-schema.sql
   Run in Supabase SQL Editor for project yidxnmxvtohaldkbypcv.
7. Run once.
8. Do not edit around errors unless the cause is fully understood and documented.
9. Capture the result summary, any notices, and any errors.
10. If successful, proceed to post-DDL verification. If not successful, stop and record the exact error.
```

## 6. Direct Postgres/DDL-capable CLI path, if Jeff provides credentials

Use this only if Jeff/admin provides a DDL-capable database URL/password through an approved secret path. Do not paste database passwords into Kanban, docs, or chat.

```bash
cd /Users/jeff/.openclaw/projects/mountain-west-growth-os
psql "$SUPABASE_DB_URL" \
  --set ON_ERROR_STOP=on \
  --file supabase/phase6-11-combined-growth-os-schema.sql
```

Evidence to capture from this path:

```text
[ ] Command used, with secrets redacted.
[ ] Exit code.
[ ] Full stdout/stderr saved to a local private evidence file.
[ ] Confirmation that no password/token was committed to docs, Kanban, logs, or shell history screenshots.
```

## 7. Evidence screenshots/logs to capture

Minimum evidence packet:

```text
BEFORE RUN
[ ] Screenshot of Supabase project showing project ref yidxnmxvtohaldkbypcv.
[ ] Screenshot or local terminal output showing exact SQL file path and SHA-256 hash.
[ ] Screenshot of SQL Editor query title or migration path before execution.

DURING/AFTER RUN
[ ] Screenshot of SQL Editor result panel or CLI exit showing success or exact error.
[ ] If successful, screenshot/list of newly visible tables or SQL verification output.
[ ] If failed, screenshot/log of full error text and the line/context if Supabase provides it.

POST-VERIFY
[ ] Read-only table-existence verification result for all 33 tables.
[ ] Kanban update/comment on t_fa6eb9c1 with the evidence path, outcome, and whether it is safe to complete/unblock the schema task.
```

Suggested local evidence folder, if screenshots/logs are saved on Jeff's machine:

```text
/Users/jeff/.openclaw/projects/mountain-west-growth-os/reports/evidence/2026-05-11-supabase-schema-unblock/
```

Do not store raw tokens, passwords, service-role keys, connection strings, or client/prospect PII in the evidence folder.

## 8. Post-DDL verification commands

Run these only after the human/admin DDL succeeds. These are read-only verification commands.

### Option A — SQL Editor verification query

Paste into Supabase SQL Editor for project `yidxnmxvtohaldkbypcv`:

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

Pass condition: 33 rows returned, one for each expected table.

### Option B — PostgREST read-only smoke check from local secrets

This checks table visibility through PostgREST after schema cache refresh. It should not print secrets.

```bash
python3 - <<'PY'
import json
import sys
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

If PostgREST still reports missing tables immediately after successful DDL, wait briefly or refresh the Supabase schema cache if available, then retry. Do not start sync/backfill until the verification passes.

## 9. Stop conditions

Stop immediately and do not improvise if any of these occur:

```text
[ ] The project ref is not exactly yidxnmxvtohaldkbypcv.
[ ] The operator is not signed in or lacks SQL Editor / DDL-capable access.
[ ] Credentials, project ownership, or admin authority are unclear.
[ ] The SQL file path is different from the exact path in this packet.
[ ] The SQL hash differs from 8bf45ee3533b540fa16def0afc759148627bf23ea387510eba4da9ce0e23f0bb and no one has reviewed the diff.
[ ] SQL Editor/CLI returns any error.
[ ] A table name in Supabase differs from the expected 33-table list.
[ ] Post-DDL verification returns fewer than 33 tables.
[ ] PostgREST/read-only smoke checks return unexpected non-404 errors.
[ ] A rollback/restore question arises and no Supabase backup/restore owner is present.
[ ] Anyone asks the agent to guess credentials, hunt beyond documented secret paths, paste secrets into docs/Kanban/chat, or force-start dependent tasks.
```

If stopped, update `t_fa6eb9c1` with:

```text
Outcome: stopped
Where: <SQL Editor / CLI / verification step>
Exact error or uncertainty: <redacted, no secrets>
Evidence path: <local path if screenshots/logs exist>
Needed decision/access: <one sentence>
```

## 10. Rollback / restore caveat

This packet is not a rollback plan and does not authorize DDL. It only prepares a human/admin route and an evidence checklist.

The SQL uses `create table if not exists`, `create index if not exists`, and RLS enable statements for new expanded mirror tables. Even so, DDL changes should be treated as persistent production-project changes. Before running, the authorized operator should know the current Supabase backup/restore posture and who owns any restore decision.

Do not attempt ad hoc rollback from this packet. If a restore or reversal is needed, stop and route to Jeff/admin with the captured SQL result and verification evidence.

## 11. Post-DDL mirror/backfill handoff

Do not force-start or manually unlink downstream Kanban tasks.

Required sequence:

1. Human/admin applies schema in project `yidxnmxvtohaldkbypcv`.
2. Operator verifies all 33 tables exist.
3. Operator updates and completes/unblocks `t_fa6eb9c1` with evidence.
4. Only after `t_fa6eb9c1` is completed should dependent tasks promote through the board dependency graph:
   - `t_7d361e6b`
   - `t_cf8c4471`
   - `t_53d470c6`
5. Those downstream tasks should rerun/verify mirror/backfill under their own task instructions and exact approvals. Do not treat this packet as permission to run sync/backfill.

Reference post-schema sync command that may be used by the appropriate downstream task after approval:

```bash
cd /Users/jeff/.openclaw/projects/mountain-west-growth-os
node scripts/sync-sqlite-to-supabase.mjs
```

This command is intentionally listed as a downstream reference, not as current authorization.

## 12. Copy/paste Kanban comment for `t_fa6eb9c1` after successful human/admin DDL

```text
Supabase expanded schema human/admin DDL completed for project yidxnmxvtohaldkbypcv.
SQL file: /Users/jeff/.openclaw/projects/mountain-west-growth-os/supabase/phase6-11-combined-growth-os-schema.sql
SQL sha256: 8bf45ee3533b540fa16def0afc759148627bf23ea387510eba4da9ce0e23f0bb
Verification: 33/33 expanded Growth OS tables visible after DDL.
Evidence: <local evidence path or screenshots/log references, no secrets>
Next: complete/unblock t_fa6eb9c1 and allow dependent mirror/backfill tasks t_7d361e6b, t_cf8c4471, and t_53d470c6 to promote normally. Do not force-start them.
```

## 13. Copy/paste HOLD comment if DDL is not run

```text
Supabase expanded schema remains human/admin blocked.
Project: yidxnmxvtohaldkbypcv
Required SQL file: /Users/jeff/.openclaw/projects/mountain-west-growth-os/supabase/phase6-11-combined-growth-os-schema.sql
Reason not run: <wrong project / no SQL Editor access / unclear credentials / SQL error / restore question / other>
Evidence: <local evidence path if any, no secrets>
Next needed: authorized Supabase admin DDL path or exact Jeff decision. Do not force-start t_7d361e6b, t_cf8c4471, or t_53d470c6.
```
