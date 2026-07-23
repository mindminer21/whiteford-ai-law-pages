# Supabase Sync Report — Nightly Lead Research 2026-05-08

Task: `t_0c197c43`
Source DB: `/Users/jeff/.openclaw/projects/mountain-west-growth-os/data/growth-os.sqlite`
Target Supabase project: `https://yidxnmxvtohaldkbypcv.supabase.co`
Sync log ID: `sync-2026-05-08T08-39-31-305Z-085408fc`

## Result

Status: **partial**

Ran the internal SQLite → Supabase mirror helper from `/Users/jeff/.openclaw/projects/mountain-west-growth-os`:

```bash
node scripts/sync-sqlite-to-supabase.mjs
```

The run attempted 686 local Growth OS rows and synced 108 rows into currently available Supabase mirror tables. This includes the 2026-05-08 nightly prospects, approval items, and queued work items that are visible through the existing dashboard/core mirror surface.

## Remote verification

Remote core table counts after sync, verified through Supabase PostgREST using the local service-role secret without printing the secret:

| Table | Remote count |
| --- | ---: |
| `prospects` | 38 |
| `approval_items` | 58 |
| `agent_events` | 6 |
| `work_items` | 12 |
| `model_runs` | 0 |
| `qa_reviews` | 0 |

Nightly prospect rows verified present in remote `prospects`:

| prospect_id | company_name | domain | pipeline_stage |
| --- | --- | --- | --- |
| prospect_2180fd85f6085ebc2a595f72 | RADICL (Radicl Defense LLC) | radicl.com | agent-targeting |
| prospect_647f303b12467f9d88c68da4 | Manifest OS | manifestos.com | agent-targeting |
| prospect_ef30df45ad62c93981758ca3 | Sereact | sereact.de | agent-targeting |

Nightly work items verified present in remote `work_items`:

| work_item_id | work_type | external_action_allowed | stage | title |
| --- | --- | --- | --- | --- |
| work_nightly_agent_targeting_e30b8b574f81691c76de | agent_targeting_packet | False | queued | Prepare attorney-review Agent Targeting packet: RADICL (Radicl Defense LLC) |
| work_nightly_agent_targeting_ddc5be7cafbe9eedb055 | agent_targeting_packet | False | queued | Prepare attorney-review Agent Targeting packet: Manifest OS |
| work_nightly_agent_targeting_024634d5cebed23366c1 | agent_targeting_packet | False | queued | Prepare attorney-review Agent Targeting packet: Sereact |

Nightly approval items verified present in remote `approval_items`:

| approval_item_id | item_type | related_id | approval_status | title |
| --- | --- | --- | --- | --- |
| approval_3ec08f7d50412151aba0327b | outreach_draft | draft_47111872b6e5bf3e2b7c4693 | pending | Review outreach draft: RADICL (Radicl Defense LLC) - Attorney-review LinkedIn awareness draft: RADICL (Radicl Defense LLC) |
| approval_6cc068e0487d1b4538daf066 | outreach_draft | draft_49cc7ee2a69ebdef3e0fbb15 | pending | Review outreach draft: Manifest OS - Attorney-review LinkedIn awareness draft: Manifest OS |
| approval_6db0cd9880c934d168c383e5 | outreach_draft | draft_6c7ea9b4b76cc04ba5ff7819 | pending | Review outreach draft: Sereact - Attorney-review watchlist note: Sereact |

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

Machine-readable artifact: `docs/nightly-lead-research/runs/2026-05-08/supabase_sync_report.json`
