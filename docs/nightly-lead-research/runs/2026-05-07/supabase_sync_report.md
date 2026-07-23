# Supabase Sync Report — Nightly Lead Research 2026-05-07

Task: `t_539e8920`
Source DB: `/Users/jeff/.openclaw/projects/mountain-west-growth-os/data/growth-os.sqlite`
Target Supabase project: `https://yidxnmxvtohaldkbypcv.supabase.co`
Sync log ID: `sync-2026-05-07T09-42-57-789Z-daa9d3f2`

## Result

Status: **partial**

I ran the internal SQLite → Supabase mirror helper:

```bash
cd /Users/jeff/.openclaw/projects/mountain-west-growth-os
node scripts/sync-sqlite-to-supabase.mjs
```

The run attempted 640 local Growth OS rows and synced 99 rows into Supabase. This updated the currently available remote/core mirror tables, including the 2026-05-07 nightly prospects, approval items, and queued work items. It did not execute outreach, activate workflows, write to Clio, perform LinkedIn actions, launch ads, or make public/client-facing changes.

## Remote verification

Remote core table counts after sync, verified through Supabase PostgREST using the local service-role secret without printing the secret:

| Table | Remote count |
| --- | ---: |
| `prospects` | 35 |
| `approval_items` | 55 |
| `agent_events` | 6 |
| `work_items` | 9 |
| `model_runs` | 0 |
| `qa_reviews` | 0 |

Nightly prospect rows verified present in remote `prospects`:

| Prospect ID | Company |
| --- | --- |
| `prospect_bd2e46b6a31bc423d3064218` | PickNik Robotics |
| `prospect_bba8ec0dec6e73619770860d` | Electra |
| `prospect_bea9dbd287cb8fcf077720d0` | Flatfile (also rebranded company name: Obvious) |

Nightly work items verified present in remote `work_items`:

| Work item ID | Type | External action allowed |
| --- | --- | --- |
| `work_nightly_agent_targeting_6c492c2ae5ff71c32f3e` | `agent_targeting_packet` | `false` |
| `work_nightly_agent_targeting_92ca00eb4e75f5e07b1d` | `agent_targeting_packet` | `false` |
| `work_nightly_agent_targeting_9e331922b7ef2980d8f1` | `agent_targeting_packet` | `false` |

Nightly approval items verified present in remote `approval_items`:

| Approval item ID | Related draft ID | Status | Title |
| --- | --- | --- | --- |
| `approval_2934f896e869b53f601fcc7b` | `draft_94c6ee56a40e38dc6cafc029` | pending | Review outreach draft: PickNik Robotics - Attorney-review LinkedIn awareness draft: PickNik Robotics |
| `approval_0d80d9cead2d95c4236cd859` | `draft_5390e813d3512e5b744d36a5` | pending | Review outreach draft: Electra - Attorney-review LinkedIn awareness draft: Electra |
| `approval_1b30f906a673bf469f3953c0` | `draft_23bf6537385d43536d4d325c` | pending | Review outreach draft: Flatfile (also rebranded company name: Obvious) - Attorney-review LinkedIn awareness draft: Flatfile (also rebranded company name: Obvious) |

## Remaining blocker

The dashboard cannot show the full nightly run/evidence/CRM-sync surface yet because the expanded Supabase schema is still not installed. The sync helper skipped these missing remote tables with `PGRST205` schema-cache/table-not-found responses:

- `source_evidence`
- `suppression_checks`
- `compliance_reviews`
- `outreach_drafts`
- `draft_audit_trail`
- `outreach_channels`
- `send_authorization_rules`
- `execution_authorizations`
- `ghl_sync_links`
- `crm_integration_config`
- `crm_field_mappings`
- `crm_sync_batches`
- `crm_sync_records`
- `crm_audit_log`
- `ghl_pipeline_blueprints`
- `ghl_pipeline_stage_mappings`
- `ghl_stage_action_rules`
- `content_lanes`
- `content_topics`
- `content_sources`
- `content_assets`
- `kpi_snapshots`
- `cohort_tracking`
- `offer_performance`
- `agent_productivity_metrics`
- `weekly_growth_reports`
- `hardening_checks`
- `duplicate_candidates`
- `source_freshness_checks`
- `backup_exports`

Prepared schema artifact already exists:

`/Users/jeff/.openclaw/projects/mountain-west-growth-os/supabase/phase6-11-combined-growth-os-schema.sql`

Prior blocker report with exact unblock options:

`/Users/jeff/.openclaw/projects/mountain-west-growth-os/reports/2026-05-06-supabase-expanded-schema-blocker.md`

## Exact unblock options

Any one of these unblocks a full mirror:

1. Manually run `/Users/jeff/.openclaw/projects/mountain-west-growth-os/supabase/phase6-11-combined-growth-os-schema.sql` in the Supabase SQL Editor for project `yidxnmxvtohaldkbypcv`, then rerun `node scripts/sync-sqlite-to-supabase.mjs`.
2. Add a direct Postgres connection string/password for project `yidxnmxvtohaldkbypcv` to the local secret context, for example `SUPABASE_DB_URL` or `DATABASE_URL`, so the migration can be applied with `psql`.
3. Add Supabase management/DDL-capable access for this project, then rerun the schema task.
4. Log the browser/session into Supabase for project `yidxnmxvtohaldkbypcv`, then rerun the schema task so the SQL can be pasted/executed in SQL Editor.

## Safety confirmation

This run was internal/staging mirror work only. No outreach, email send, workflow activation, LinkedIn action, Clio write, ad launch, public publish, or client-facing change occurred.

Machine-readable artifact: `docs/nightly-lead-research/runs/2026-05-07/supabase_sync_report.json`
