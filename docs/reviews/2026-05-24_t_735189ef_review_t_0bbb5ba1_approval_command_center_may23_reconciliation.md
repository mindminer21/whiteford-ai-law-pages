# Review — Approval Command Center May 23 reconciliation dashboard refresh

Task: `t_735189ef`
Reviewed parent task: `t_0bbb5ba1`
Reviewed at: 2026-05-24T05:41:38Z
Tenant: `whiteford-mountain-west`
Verdict: CHANGES REQUESTED before downstream QMD/indexing or internal decision-prep reliance

This review does not authorize public deploy, HighLevel/Supabase/CRM/Clio mutation, workflow activation/enrollment, email/SMS/DM, LinkedIn/social/ad action, prospect/client contact, or any external/live-system action. The reviewed dashboard remains private/local code only, and the findings below must be cleaned up before it is treated as safe internal decision prep.

## Reviewed inputs

- Parent task comments/result: `t_0bbb5ba1`
- Parent implementation note: `/Users/jeff/.openclaw/projects/mountain-west-growth-os/dashboards/growth-os-dashboard/docs/2026-05-24_t_0bbb5ba1_approval_command_center_may23_reconciliation_refresh.md`
- Controlling reconciliation review: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/reviews/2026-05-24_t_b61f76ab_review_t_d9b5c7ee_may23_local_db_reconciliation.md`
- Deliverable index top rows: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/KANBAN_DELIVERABLE_INDEX.md`
- Dashboard files reviewed:
  - `/Users/jeff/.openclaw/projects/mountain-west-growth-os/dashboards/growth-os-dashboard/src/data/approvalCommandCenter.ts`
  - `/Users/jeff/.openclaw/projects/mountain-west-growth-os/dashboards/growth-os-dashboard/src/app/approval-command-center/page.tsx`
  - `/Users/jeff/.openclaw/projects/mountain-west-growth-os/dashboards/growth-os-dashboard/src/components/Dashboard.tsx`
  - `/Users/jeff/.openclaw/projects/mountain-west-growth-os/dashboards/growth-os-dashboard/src/components/Chrome.tsx`

## Verification performed

1. Read the parent Kanban result/comment and implementation note.
2. Read the controlling May 23 local DB reconciliation review.
3. Reviewed the static command-center data, approval-command-center route, dashboard overview component, and shared `DetailShell` chrome used by the route.
4. Scanned local dashboard source for language implying live/sync/action readiness, including `auto-approved`, `HighLevel live sync`, and related phrases.
5. Reran automated checks from `/Users/jeff/.openclaw/projects/mountain-west-growth-os/dashboards/growth-os-dashboard`:
   - `npm run lint`: exit 0
   - `npm run build`: exit 0

## Findings

### 1. May 23 reviewed facts are mostly preserved in the new command-center content

PASS for the newly added `approvalCommandCenter.ts` and route-header content.

The refreshed command-center data accurately surfaces the controlling facts:

- AKASA is South San Francisco HQ with Denver/Colorado hub/coworking-only HOLD posture.
- Deepwatch is removed/HOLD from Mountain-West queueing pending current nexus support.
- Tim Gill no longer carries the Josh.ai company LinkedIn URL as a person-level LinkedIn URL.
- May 23 sync/work-item rows are blocked from live interpretation.
- The reconciliation is framed as internal/local data hygiene, not public-source proof, attorney approval, suppression/conflicts clearance, send permission, or sync clearance.

### 2. Supabase and HighLevel blockers are explicit in the new command-center data

PASS for the new command-center row/chip/decision language.

The new command-center content keeps Supabase `t_fa6eb9c1` as a human/admin DDL gate and HighLevel `t_7884ab57` / HTTP 403 Cloudflare Error 1010 as an access gate. The new row and hard-forbidden actions state that no DDL, sync, backfill, CRM mutation, workflow activation/enrollment, sends, social action, public action, or external/prospect-facing use is authorized.

### 3. Blocking issue: shared chrome and dashboard overview still imply live/internal sync readiness

CHANGES REQUESTED.

The acceptance criteria require that no code imply DDL/sync/backfill/CRM/live action readiness. The approval-command-center route uses `DetailShell`, and `DetailShell` still renders language that contradicts the May 23 fail-closed posture:

- `/Users/jeff/.openclaw/projects/mountain-west-growth-os/dashboards/growth-os-dashboard/src/components/Chrome.tsx:58`
  - Current: `Internal sync auto-approved`
  - Problem: the approval-command-center route shows this badge even while its own subtitle says Supabase/HighLevel remain gated. It can be read as approving HighLevel/Supabase/dashboard sync.
- `/Users/jeff/.openclaw/projects/mountain-west-growth-os/dashboards/growth-os-dashboard/src/components/Chrome.tsx:62`
  - Current: `Internal HighLevel, Hermes, Supabase, and dashboard sync is auto-approved. Approval is required before sends, publishing, LinkedIn actions, Clio writes, paid ads, or public use.`
  - Problem: this expressly states HighLevel and Supabase sync is auto-approved, which conflicts with the required human-only Supabase DDL gate, HighLevel token/location/browser-access gate, and no-sync/no-mutation posture.

The main dashboard overview also retains language that implies live CRM readiness:

- `/Users/jeff/.openclaw/projects/mountain-west-growth-os/dashboards/growth-os-dashboard/src/components/Dashboard.tsx:114`
  - Current: `Internal HighLevel, Supabase, Hermes, and dashboard sync is allowed.`
  - Problem: this is too broad while Supabase expanded schema, HighLevel token/location access, and May 23 sync/work rows remain blocked.
- `/Users/jeff/.openclaw/projects/mountain-west-growth-os/dashboards/growth-os-dashboard/src/components/Dashboard.tsx:306-310`
  - Current section title/subtitle and card copy include `Phase 8 CRM Sync`, `HighLevel, Hermes agents, Supabase, and the dashboard now sync as one internal operating layer`, `HighLevel live sync`, and `auto-approved`.
  - Problem: this directly implies CRM/HighLevel live-sync readiness, contrary to the task guardrails and the controlling May 23 reconciliation review.
- `/Users/jeff/.openclaw/projects/mountain-west-growth-os/dashboards/growth-os-dashboard/src/components/Dashboard.tsx:423-426`
  - Current next decisions include `Keep HighLevel, Hermes agents, Supabase, and dashboard records seamlessly synced.`
  - Problem: this should be revised to a fail-closed/read-only/status wording until separate exact approval clears human-only gates.

These issues appear to be pre-existing or adjacent text, but the review objective is dashboard safety before downstream reliance. Because the patched route still displays `DetailShell` and the overview is part of the parent changed scope, the cleanup is deterministic and should be completed before PASS.

### 4. Privacy/data minimization

PASS with the above wording caveat.

I found no secrets, tokens, client-confidential data, forms, execute controls, approval-record behavior, trigger tags being applied, or live prospect/contact detail surfaces in the reviewed command-center changes. The newly added May 23 content stays at public-company posture level (AKASA, Deepwatch, Josh.ai/Tim Gill hygiene) and links to local evidence files.

### 5. Legal-marketing posture

PASS with the above wording caveat.

The new May 23 command-center content is sparse, no-hype, attorney-review/private-local framed, and avoids legal conclusions. The required cleanup is not hype-related; it is the contradictory live/sync-readiness language in shared/overview dashboard text.

### 6. Automated checks

PASS.

`npm run lint` and `npm run build` both passed locally during this review. Build output showed Next.js 16.2.3 with `/approval-command-center` generated as static content.

## Required deterministic cleanup

Before this dashboard patch can receive PASS, revise the following wording to fail-closed equivalents:

1. `src/components/Chrome.tsx`
   - Replace `Internal sync auto-approved` with language such as `Internal status only` or `No live sync approval`.
   - Replace `Internal HighLevel, Hermes, Supabase, and dashboard sync is auto-approved...` with language such as: `This is a private/local status surface. HighLevel, Supabase, CRM, workflow, send, publish, social, and external actions require separate exact approval and currently remain blocked where gates are unresolved.`
2. `src/components/Dashboard.tsx`
   - Replace the broad sidebar statement that internal HighLevel/Supabase sync is allowed with local/private/status-only wording.
   - Rename/reframe the `Phase 8 CRM Sync` overview copy so it does not say `HighLevel live sync` or `auto-approved`; use `CRM sync blocked/gated` or `CRM sync status review` language instead.
   - Replace the `seamlessly synced` next decision with `keep records reconciled locally/read-only; do not sync live systems without exact approval` language.
3. Rerun `npm run lint` and `npm run build` after cleanup.

## Verdict

CHANGES REQUESTED.

The May 23 reconciliation-specific content is accurate and appropriately guarded, but the route/overview still exposes contradictory `Internal sync auto-approved`, `HighLevel live sync`, and `auto-approved` language. That wording fails the explicit review criterion that no code imply DDL/sync/backfill/CRM/live action readiness. No external/live action is authorized.

## Next action

Patch the deterministic wording above, rerun lint/build, and return for re-review. Until then, downstream QMD/indexing should not treat the dashboard patch as safe internal decision prep, except to record this review and the changes-requested status.
