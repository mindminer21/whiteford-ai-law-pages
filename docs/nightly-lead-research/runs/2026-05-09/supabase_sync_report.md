# Supabase Sync Report — Nightly Lead Research 2026-05-09

Task: `t_03f9aebc`
Source DB: `/Users/jeff/.openclaw/projects/mountain-west-growth-os/data/growth-os.sqlite`
Target Supabase project: `https://yidxnmxvtohaldkbypcv.supabase.co`
Sync log ID: `sync-2026-05-09T08-46-59-032Z-b157d1f1`

## Result

Status: **partial / source-blocked no-op for the 2026-05-09 nightly packet**

Ran the internal SQLite → Supabase mirror helper from `/Users/jeff/.openclaw/projects/mountain-west-growth-os`:

```bash
node scripts/sync-sqlite-to-supabase.mjs
```

The mirror attempted 689 local Growth OS rows and synced 108 rows into the currently available Supabase core mirror tables. The run did not create any 2026-05-09 prospect, work-item, approval-item, contact, evidence, draft, CRM-sync, or outreach rows because the parent validation task was a local no-op: the nightly research packet was source-blocked before Gate 1 live-source extraction and had zero validated candidates.

## 2026-05-09 nightly rows

Local Growth OS rows created on 2026-05-09 and relevant to this nightly packet:

| Table | Rows |
| --- | ---: |
| `prospects` | 0 |
| `work_items` | 0 |
| `approval_items` | 0 |

Remote Supabase rows with `created_at >= 2026-05-09T00:00:00Z` and `< 2026-05-10T00:00:00Z`:

| Table | Rows |
| --- | ---: |
| `prospects` | 0 |
| `work_items` | 0 |
| `approval_items` | 0 |

Controlling source artifacts:

- `docs/nightly-lead-research/runs/2026-05-09/source_unavailable_report.md`
- `docs/nightly-lead-research/runs/2026-05-09/validation_report.md`
- `docs/nightly-lead-research/runs/2026-05-09/store_output.json`

## Remote verification

Remote core table counts after sync, verified through Supabase PostgREST using the local service-role secret without printing the secret:

| Table | Remote count | Local count |
| --- | ---: | ---: |
| `prospects` | 38 | 38 |
| `approval_items` | 58 | 52 |
| `agent_events` | 6 | 6 |
| `work_items` | 12 | 12 |
| `model_runs` | 0 | 0 |
| `qa_reviews` | 0 | 0 |

Note: the mirror helper upserts available core rows but does not delete remote rows that are absent locally; `approval_items` therefore remains 58 remote vs. 52 local from prior mirrored state.

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

This run was internal/staging mirror work only. No Supabase DDL was attempted. No outreach, email send, workflow activation, LinkedIn action, Clio write, ad launch, public publish, or client-facing change occurred.

Machine-readable artifact: `docs/nightly-lead-research/runs/2026-05-09/supabase_sync_report.json`
