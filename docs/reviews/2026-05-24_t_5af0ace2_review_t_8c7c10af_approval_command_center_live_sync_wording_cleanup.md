# Review: Approval Command Center live-sync wording cleanup — task t_5af0ace2

Reviewed implementation task: `t_8c7c10af`
Follow-up patch task created: `t_a1648b1c`
Tenant: `whiteford-mountain-west`
Review completed at: `2026-05-24T05:49:18Z`
Verdict: CHANGES REQUESTED before treating `/` as reviewed fail-closed dashboard copy.

## Scope reviewed

- Implementation note: `/Users/jeff/.openclaw/projects/mountain-west-growth-os/dashboards/growth-os-dashboard/docs/2026-05-24_t_8c7c10af_approval_command_center_live_sync_wording_cleanup.md`
- Dashboard source: `/Users/jeff/.openclaw/projects/mountain-west-growth-os/dashboards/growth-os-dashboard/src/components/Chrome.tsx`
- Dashboard source: `/Users/jeff/.openclaw/projects/mountain-west-growth-os/dashboards/growth-os-dashboard/src/components/Dashboard.tsx`
- Supporting rendered route evidence after `npm run build`: `/Users/jeff/.openclaw/projects/mountain-west-growth-os/dashboards/growth-os-dashboard/.next/server/app/index.html`
- Supporting rendered route evidence after `npm run build`: `/Users/jeff/.openclaw/projects/mountain-west-growth-os/dashboards/growth-os-dashboard/.next/server/app/approval-command-center.html`
- Dashboard deliverable index: `/Users/jeff/.openclaw/projects/mountain-west-growth-os/dashboards/growth-os-dashboard/docs/KANBAN_DELIVERABLE_INDEX.md`
- Whiteford deliverable index: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/KANBAN_DELIVERABLE_INDEX.md`

## Review result

The direct `Chrome.tsx` and `Dashboard.tsx` wording patches mostly satisfy the narrow source-file cleanup request, and `/approval-command-center` rendered clean for the searched forbidden phrases. However, the rendered homepage `/` still includes stale auto-approved/internal-sync language through imported data displayed by `Dashboard.tsx`. Because the task required checking dashboard routes, this is not ready for downstream reliance.

## Acceptance criteria check

1. `Chrome.tsx` no longer says `Internal sync auto-approved` or that internal HighLevel/Hermes/Supabase/dashboard sync is auto-approved.
   - PASS.
   - Evidence: `src/components/Chrome.tsx` lines 57-62 now show `Supabase core mirror live · expanded schema blocked`, `Internal status only`, and private/local no-action language requiring separate exact human approval.

2. `Dashboard.tsx` no longer says internal HighLevel/Supabase sync is allowed, `Phase 8 CRM Sync`, `HighLevel live sync`, `auto-approved`, or that records should be seamlessly synced in the reviewed overview areas.
   - PARTIAL / FAIL at rendered-route level.
   - Direct `src/components/Dashboard.tsx` no longer contains the original `Phase 8 CRM Sync`, `HighLevel live sync`, `auto-approved`, or `seamlessly synced` wording in the patched overview/CRM section. It now shows `Phase 8 CRM Gate Review`, `Live sync blocked`, `exact approval required`, and local/read-only reconciliation wording at lines 306-310 and 423-426.
   - But the rendered homepage still includes stale imported data shown by `Dashboard.tsx`:
     - `src/data/whitefordGrowthEngine.ts` line ~284: `Auto-approved internal HighLevel sync, tags, fields, draft workflows, pipeline hygiene, contact enrichment prep, targeted LinkedIn awareness post drafts, Social Planner drafts, and QA`.
     - `src/data/mock.ts` line ~97: `Internal HighLevel, Supabase, Hermes, and dashboard sync is allowed for draft/off records.`
     - Build artifact evidence: `.next/server/app/index.html` contains both `Auto-approved internal HighLevel sync...` and `Internal HighLevel, Supabase, Hermes, and dashboard sync is allowed for draft/off records.`

3. Replacement wording is fail-closed/local/private/status-only/read-only reconciliation and clearly states HighLevel, Supabase, CRM, workflow, send, publish, social, Clio, paid-ad, public, and external actions require separate exact approval and remain blocked where gates are unresolved.
   - PARTIAL.
   - PASS in `Chrome.tsx` line 62 and `Dashboard.tsx` sidebar/CRM/next-decision lines 112-115, 306-310, and 423-426.
   - FAIL for rendered homepage completeness because the stale imported copy above still implies auto-approved internal HighLevel sync and allowed internal HighLevel/Supabase/Hermes/dashboard sync.

4. May 23 facts remain preserved.
   - PASS.
   - Evidence in `src/data/approvalCommandCenter.ts` includes AKASA South San Francisco HQ / Denver hub-only HOLD, Deepwatch removed/HOLD pending current nexus, Tim Gill URL hygiene, May 23 sync/work rows blocked, Supabase `t_fa6eb9c1`, HighLevel `t_7884ab57`, and HTTP 403 Cloudflare Error 1010 gate references. The rendered `/approval-command-center` build artifact includes the May 23/Supabase/HighLevel blocker content.

5. Verify recorded test results: `npm run lint` exit 0 and `npm run build` exit 0.
   - PASS.
   - Reviewer reran both checks from `/Users/jeff/.openclaw/projects/mountain-west-growth-os/dashboards/growth-os-dashboard`:
     - `npm run lint` exit code `0`.
     - `npm run build` exit code `0`; Next.js 16.2.3 / Turbopack compiled successfully and generated static pages including `/` and `/approval-command-center`.

## Additional stale wording risk outside the immediate `/` and `/approval-command-center` review

The following source files also still contain unsafe sync-approval wording and should be patched by the follow-up task to prevent reintroductions elsewhere:

- `/Users/jeff/.openclaw/projects/mountain-west-growth-os/dashboards/growth-os-dashboard/src/data/whitefordGrowthEngine.ts` line ~209: `Live internal CRM sync is auto-approved for HighLevel, Hermes, Supabase, and dashboard records...`
- `/Users/jeff/.openclaw/projects/mountain-west-growth-os/dashboards/growth-os-dashboard/src/app/crm/page.tsx` line ~47: `Internal CRM/contact/opportunity sync is auto-approved...`
- `/Users/jeff/.openclaw/projects/mountain-west-growth-os/dashboards/growth-os-dashboard/src/app/crm/page.tsx` lines ~60 and ~111: `internal sync auto-approved`.
- `/Users/jeff/.openclaw/projects/mountain-west-growth-os/dashboards/growth-os-dashboard/src/components/AiEngineSteeringForm.tsx` line ~21: `internal work auto-approved`.

These were not all part of the original t_8c7c10af artifact list, but they are close enough to the same safety issue that the next frontend patch should clean them up.

## No-action guardrail confirmation

This review performed no public deploy/publish, Supabase DDL/sync/backfill/row mutation, HighLevel/CRM/Clio mutation, workflow activation/enrollment, sends, LinkedIn/social/ad action, or external/client/prospect-facing action.

## Required next action

Frontend should complete `t_a1648b1c`: patch remaining rendered homepage and adjacent stale auto-approved/internal-sync language to fail-closed private/local/status-only/read-only reconciliation copy, rerun lint/build, and re-check the built `/` and `/approval-command-center` artifacts for forbidden phrases. Until that passes review, use the dashboard only as internal/private decision prep and do not rely on it as a fully cleaned fail-closed approval surface.
