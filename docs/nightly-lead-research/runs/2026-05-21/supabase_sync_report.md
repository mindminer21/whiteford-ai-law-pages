# Supabase Sync Report — Nightly Lead Research 2026-05-21

Task: `t_20b815f4`
Source DB: `/Users/jeff/.openclaw/projects/mountain-west-growth-os/data/growth-os.sqlite`
Target Supabase project: `https://yidxnmxvtohaldkbypcv.supabase.co`
Sync log ID: `sync-2026-05-21T07-41-42-819Z-34748d2f`

## Result

Status: **partial / source-blocked no-op for the 2026-05-21 nightly packet**

Ran the internal SQLite → Supabase mirror helper from `/Users/jeff/.openclaw/projects/mountain-west-growth-os`:

```bash
node scripts/sync-sqlite-to-supabase.mjs
```

The mirror attempted 724 local Growth OS rows and synced 111 rows into the currently available Supabase core mirror tables. The parent validation task confirmed the 2026-05-21 nightly packet was a zero-candidate no-op, so no 2026-05-21 prospect, work-item, approval-item, evidence, outreach-draft, or CRM-sync rows were created for this nightly packet.

## 2026-05-21 nightly rows

Local/remote rows created on 2026-05-21 and relevant to this nightly packet in the core available mirror tables:

| table | local_count | remote_count | local_2026_05_21_count | remote_2026_05_21_count |
| --- | ---: | ---: | ---: | ---: |
| prospects | 39 | 39 | 0 | 0 |
| approval_items | 52 | 58 | 0 | 0 |
| agent_events | 6 | 6 | 0 | 0 |
| work_items | 14 | 14 | 0 | 0 |
| model_runs | 0 | 0 | 0 | 0 |
| qa_reviews | 0 | 0 | 0 | 0 |

Note: the mirror helper upserts available core rows but does not delete remote rows absent locally; any remote/local count mismatch can reflect prior mirrored state rather than this run.

## Remaining blocker

The dashboard still cannot show the full nightly run/evidence/CRM-sync surface from Supabase alone because the expanded Supabase schema is not installed. The sync helper skipped these missing remote tables with `PGRST205` schema-cache/table-not-found responses:

| missing_remote_table | local_rows_skipped | remote_status |
| --- | ---: | --- |
| source_evidence | 44 | HTTP 404 |
| suppression_checks | 20 | HTTP 404 |
| compliance_reviews | 20 | HTTP 404 |
| outreach_drafts | 20 | HTTP 404 |
| draft_audit_trail | 20 | HTTP 404 |
| outreach_channels | 4 | HTTP 404 |
| send_authorization_rules | 4 | HTTP 404 |
| execution_authorizations | 8 | HTTP 404 |
| ghl_sync_links | 80 | HTTP 404 |
| crm_integration_config | 1 | HTTP 404 |
| crm_field_mappings | 27 | HTTP 404 |
| crm_sync_batches | 18 | HTTP 404 |
| crm_sync_records | 32 | HTTP 404 |
| crm_audit_log | 41 | HTTP 404 |
| ghl_pipeline_blueprints | 5 | HTTP 404 |
| ghl_pipeline_stage_mappings | 58 | HTTP 404 |
| ghl_stage_action_rules | 14 | HTTP 404 |
| ghl_opportunity_stage_events | 1 | HTTP 404 |
| content_lanes | 5 | HTTP 404 |
| content_topics | 20 | HTTP 404 |
| content_sources | 20 | HTTP 404 |
| content_assets | 80 | HTTP 404 |
| kpi_snapshots | 1 | HTTP 404 |
| cohort_tracking | 5 | HTTP 404 |
| offer_performance | 5 | HTTP 404 |
| agent_productivity_metrics | 3 | HTTP 404 |
| weekly_growth_reports | 1 | HTTP 404 |
| hardening_checks | 11 | HTTP 404 |
| duplicate_candidates | 3 | HTTP 404 |
| source_freshness_checks | 20 | HTTP 404 |
| backup_exports | 22 | HTTP 404 |

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

Machine-readable artifact: `docs/nightly-lead-research/runs/2026-05-21/supabase_sync_report.json`
