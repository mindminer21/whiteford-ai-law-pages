# Supabase Sync Report — Nightly Lead Research 2026-05-14

Task: `t_98b125c5`
Source DB: `/Users/jeff/.openclaw/projects/mountain-west-growth-os/data/growth-os.sqlite`
Target Supabase project: `https://yidxnmxvtohaldkbypcv.supabase.co`
Sync log ID: `sync-2026-05-14T08-10-12-487Z-b39e4572`

## Result

Status: **partial / source-blocked no-op for the 2026-05-14 nightly packet**

Ran the internal SQLite → Supabase mirror helper from `/Users/jeff/.openclaw/projects/mountain-west-growth-os`:

```bash
node scripts/sync-sqlite-to-supabase.mjs
```

The mirror attempted 714 local Growth OS rows and synced 111 rows into the currently available Supabase core mirror tables. The parent validation task confirmed the 2026-05-14 nightly packet was a zero-candidate no-op, so no 2026-05-14 prospect, work-item, approval-item, evidence, outreach-draft, or CRM-sync rows were created for this nightly packet.

## 2026-05-14 nightly rows

Local Growth OS rows created on 2026-05-14 and relevant to this nightly packet:

| table | local_2026_05_14_count |
| --- | ---: |
| prospects | 0 |
| work_items | 0 |
| approval_items | 0 |
| source_evidence | 0 |
| outreach_drafts | 0 |
| crm_sync_records | 0 |

## Remote verification

Remote core table counts after sync, verified through Supabase PostgREST using the local service-role secret without printing the secret:

| table | remote_count | local_count | remote_2026_05_14_count | local_2026_05_14_count |
| --- | ---: | ---: | ---: | ---: |
| prospects | 39 | 39 | 0 | 0 |
| approval_items | 58 | 52 | 0 | 0 |
| agent_events | 6 | 6 | 0 | 0 |
| work_items | 14 | 14 | 0 | 0 |
| model_runs | 0 | 0 |  |  |
| qa_reviews | 0 | 0 | 0 | 0 |

Note: the mirror helper upserts available core rows but does not delete remote rows absent locally; `approval_items` remains higher remote (58) than local (52) from prior mirrored state.

## Remaining blocker

The dashboard still cannot show the full nightly run/evidence/CRM-sync surface from Supabase alone because the expanded Supabase schema is not installed. The sync helper skipped these missing remote tables with `PGRST205` schema-cache/table-not-found responses:

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
- `ghl_opportunity_stage_events`
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

1. Manually run `/Users/jeff/.openclaw/projects/mountain-west-growth-os/supabase/phase6-11-combined-growth-os-schema.sql` in the Supabase SQL Editor for project `yidxnmxvtohaldkbypcv`, then rerun `node scripts/sync-sqlite-to-supabase.mjs`.
2. Add a direct Postgres connection string/password for project `yidxnmxvtohaldkbypcv` to the local secret context, for example `SUPABASE_DB_URL` or `DATABASE_URL`, so the migration can be applied with `psql`.
3. Add Supabase management/DDL-capable access for this project, then rerun the schema task.
4. Log the browser/session into Supabase for project `yidxnmxvtohaldkbypcv`, then rerun the schema task so the SQL can be pasted/executed in SQL Editor.

## Safety confirmation

This run was internal/staging mirror work only. No Supabase DDL was attempted. No outreach, email send, workflow activation, LinkedIn action, Clio write, ad launch, public publish, HighLevel write, or client-facing change occurred.

Machine-readable artifact: `docs/nightly-lead-research/runs/2026-05-14/supabase_sync_report.json`
