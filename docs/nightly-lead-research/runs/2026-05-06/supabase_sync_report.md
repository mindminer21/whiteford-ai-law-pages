# Supabase Sync Report — Nightly Lead Research 2026-05-06

Task: `t_61df202d`
Source DB: `/Users/jeff/.openclaw/projects/mountain-west-growth-os/data/growth-os.sqlite`
Target Supabase project: `https://yidxnmxvtohaldkbypcv.supabase.co`
Sync log ID: `sync-2026-05-07T04-54-22-393Z-121625b3`

## Result

Status: **partial**

I ran the internal SQLite → Supabase mirror helper:

```bash
cd /Users/jeff/.openclaw/projects/mountain-west-growth-os
node scripts/sync-sqlite-to-supabase.mjs
```

The run attempted 600 local Growth OS rows and synced 90 rows into Supabase. This updated the currently available remote/core mirror tables, including the nightly prospects and queued work items. It did not execute outreach, activate workflows, write to Clio, perform LinkedIn actions, launch ads, or make public/client-facing changes.

## Remote verification

Remote core table counts after sync, verified through Supabase PostgREST using the local service-role secret without printing the secret:

| Table | Remote count |
| --- | ---: |
| `prospects` | 32 |
| `approval_items` | 52 |
| `agent_events` | 6 |
| `work_items` | 6 |
| `model_runs` | 0 |
| `qa_reviews` | 0 |

Nightly prospect rows verified present in remote `prospects`:

| Prospect ID | Company |
| --- | --- |
| `prospect_d249372d03e9b2df1dd67726` | Rigetti Computing |
| `prospect_c542c95f73995e2dbd2a15c3` | Nexar |
| `prospect_c6c776b4596056a65d055c7c` | Kodiak Robotics |

Nightly work items verified present in remote `work_items`:

| Work item ID | Type | External action allowed |
| --- | --- | --- |
| `work_nightly_agent_targeting_a2124de0cc59fed06b53` | `agent_targeting_packet` | `false` |
| `work_nightly_agent_targeting_cfc6d7ea6fc45a6e2ffd` | `agent_targeting_packet` | `false` |
| `work_nightly_agent_targeting_342cdb2db5260e24bc78` | `agent_targeting_packet` | `false` |

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

Machine-readable artifact: `docs/nightly-lead-research/runs/2026-05-06/supabase_sync_report.json`
