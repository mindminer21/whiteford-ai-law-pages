# Approval Command Center Exact-Unblock Visibility Spec — 2026-05-11 22:30

Task: `t_b814f528`
Tenant: `whiteford-mountain-west`
Surface: private/local Growth OS dashboard route `/approval-command-center`
Status: IMPLEMENTATION-READY SPEC ONLY — NO CODE PATCH, NO LIVE ACTION, NO EXTERNAL ACTION

This document specifies a private/local dashboard card or section only. It does not authorize email, SMS, DMs, LinkedIn/social activity, ads, public publishing, source prospecting, HighLevel/CRM/Supabase/Clio mutation, workflow save/test/activation/manual-start/enrollment, contact/opportunity mutation, Supabase DDL, sync/backfill, dashboard reliance on expanded Supabase tables, or any client/prospect-facing action.

## Purpose

Add a narrow, fail-closed "Exact Unblock Visibility" section to the existing private Approval Command Center so Jeff can see the latest blocker state and the exact manual unblock packets without reading every Kanban thread.

Business-development principle applied: solve one concrete diagnostic decision problem first. This section should answer only: "What is blocked, what local evidence supports that status, and what exact narrow Jeff/admin decision would unblock only the next safe step?" It must not become an execution console, approval capture tool, lead magnet, sales CTA, or live-system control surface.

## Current source status

| Area | Latest state to surface | Controlling local evidence |
| --- | --- | --- |
| Supabase DDL gate | `t_fa6eb9c1` remains a human/admin DDL blocker. `supabase` CLI and `psql` are absent in the watchdog environment; no DDL-capable DB/management credential was found; prepared SQL exists but SQL existence is not schema installation. | Kanban `t_fa6eb9c1`; `/Users/jeff/.openclaw/projects/mountain-west-growth-os/supabase/phase6-11-combined-growth-os-schema.sql`; `/Users/jeff/.openclaw/projects/mountain-west-growth-os/reports/2026-05-06-supabase-expanded-schema-blocker.md`; 22:30 addendum Box C. |
| HighLevel token/location gate | `t_7884ab57` remains credential/location blocked. Latest read-only probes returned HTTP 403 `The token does not have access to this location` for location `tm68WWMrcAa3TqQbEAMa`; treat prior 401 and current 403 as the same manual token/location/scope blocker. | Kanban `t_7884ab57`; `docs/nightly-lead-research/runs/2026-05-11/highlevel_agent_targeting_sync_blocker_report.md`; 22:30 addendum Box B. |
| Source-access hold | Source-current work remains held. Firecrawl/source-access repair or replacement-source smoke testing may be separately approved, but no prospect rerun, named-company outreach, enrichment, scraping, or public claim is authorized by this section. | 22:30 addendum Box D; `docs/nightly-lead-research/runs/2026-05-10/source_unavailable_report.md`; private blocker refresh docs. |
| QMD refreshed status | QMD was stale in the addendum, then refreshed by `t_52088fee`. Current report says QMD now retrieves the 22:30 addendum/review/blocker task IDs and remains internal memory only, not public-source proof or legal approval. | `docs/ops/qmd_2026-05-11_2230_watchdog_refresh.md`; QMD smoke search for `2026-05-11 22:30 Watchdog Blocker Decision Addendum t_fa6eb9c1 t_7884ab57` returned the QMD refresh report, addendum, and deliverable index. |
| Gated mirror/backfill tasks | `t_7d361e6b`, `t_cf8c4471`, and `t_53d470c6` are correctly gated behind `t_fa6eb9c1`. Do not unlink, force-start, or run them before schema install is complete, verified, and separately approved for sync/backfill. | Kanban `t_7d361e6b`, `t_cf8c4471`, `t_53d470c6`; 22:30 addendum lines 18/29 and sequencing rules. |
| Local deck/review/unblock packets | The addendum, deck, review, and QMD refresh are internal decision-prep artifacts only. | `docs/digests/2026-05-11_2230_watchdog_blocker_decision_addendum.md`; `docs/digests/2026-05-11_2230_watchdog_blocker_decision_deck.html`; `docs/reviews/2026-05-11_2230_watchdog_blocker_decision_review.md`; `docs/ops/qmd_2026-05-11_2230_watchdog_refresh.md`. |

## Placement recommendation

Add one new top-level card/section near the top of `/approval-command-center`, immediately after the existing "What this view is for" safety card and before the metric grid.

Recommended title:

`22:30 Exact-Unblock Visibility — decision prep only`

Recommended subtitle:

`Shows the latest Supabase, HighLevel, source-access, QMD, and gated mirror/backfill blockers with local evidence links and copy/paste decision boxes. It is not an approval record, not an execute surface, and not a live-system controller.`

Prominent warning copy, displayed in a rose/amber callout at the top of the section:

`Approval Queue and Approval Command Center rows are decision-prep only. They do not authorize execute, mutate, send, publish, enroll, workflow, DDL, sync, backfill, CRM, Supabase, HighLevel, Clio, social, LinkedIn, ads, source-prospecting, or client/prospect-facing buttons. Any live or external step requires a separate exact Jeff/Whiteford approval packet naming operator, system, channel, audience/recipient, timing, copy/payload, suppression/conflicts status, stop rules, and rollback/no-action rules.`

## Proposed UI structure

### 1. Status chips row

Show five compact chips:

| Chip label | Value | Tone | Tooltip / detail |
| --- | --- | --- | --- |
| Supabase DDL | Human/admin gate | rose | `t_fa6eb9c1` blocked; prepared SQL exists; no local DDL path. |
| HighLevel API | Token/location blocked | rose | `t_7884ab57` blocked; latest probe is 403 for `tm68WWMrcAa3TqQbEAMa`; dry-run only after token refresh. |
| Source access | Hold | amber/rose | Repair/smoke-test capacity only; no prospect rerun or named-company action. |
| QMD | Refreshed internal memory | emerald with caution | `t_52088fee` completed; QMD is searchable but not proof/approval. |
| Mirror/backfill | Gated todo | amber | `t_7d361e6b`, `t_cf8c4471`, `t_53d470c6` wait on Supabase schema install and later exact approval. |

### 2. Blocker cards

Render one card per blocker. Each card should include:

- Blocker name.
- Current state.
- Evidence links.
- Exact next allowed decision.
- Explicit not-approved actions.
- Kanban task IDs.
- Last checked timestamp from local report/Kanban comment, if available.
- Empty/error state copy if local evidence is missing.

#### Supabase DDL gate card

Title: `Supabase expanded-schema DDL gate`

Current state:

`Blocked on human/admin DDL access. Agents have no safe DDL path from the current environment. Prepared SQL exists, but expanded Growth OS tables must not be represented as installed until verified after authorized admin application.`

Next allowed decision:

`Jeff or an authorized Supabase admin may choose whether to review/apply /Users/jeff/.openclaw/projects/mountain-west-growth-os/supabase/phase6-11-combined-growth-os-schema.sql in project yidxnmxvtohaldkbypcv. After install, require a separate sync/backfill/verification approval packet.`

Not approved:

- Agent DDL.
- Credential guessing or broad env-secret hunting.
- Supabase row mutation.
- Mirror sync/backfill.
- Dashboard reliance on expanded evidence/suppression/content/KPI tables.
- Force-starting downstream tasks.

#### HighLevel token/location gate card

Title: `HighLevel Agent Targeting token/location gate`

Current state:

`Blocked. The configured token is not a usable location-bound Private Integration token for Whiteford Schell IP. Latest watchdog evidence reports HTTP 403: The token does not have access to this location.`

Next allowed decision:

`Refresh /Users/jeff/.openclaw/secrets/ghl-whiteford-schell-ip.json with a current Private Integration token for location tm68WWMrcAa3TqQbEAMa with contact/opportunity read-write scope, then authorize dry-run-only verification for the existing Kore.ai Agent Targeting payload.`

Not approved:

- Live HighLevel retry.
- Contact/opportunity mutation.
- Tags, tasks, notes, custom fields, pipeline movement.
- Workflow action, test, activation, enrollment, or manual start.
- Email/SMS/DM/LinkedIn/social/outreach.

#### Source-access hold card

Title: `Source-access hold`

Current state:

`Held. Source access must be restored or replaced and pass neutral smoke tests before any source-current prospect review or named-company work resumes.`

Next allowed decision:

`Approve Firecrawl/source restoration or a replacement manual-source smoke-test lane only.`

Not approved:

- New prospecting.
- Scraping or platform-rule bypass.
- Named-company outreach copy.
- Enrichment/contact use.
- Public claims or social/LinkedIn use.
- Treating QMD/business-development RAG as public-source evidence.

#### QMD refreshed status card

Title: `QMD refreshed status`

Current state:

`Refreshed for internal searchability by t_52088fee. QMD now retrieves the 22:30 addendum/review/blocker task IDs and HighLevel 403 wording when searched by exact blocker phrases. QMD remains internal memory only.`

Next allowed decision:

`Use QMD only to find local internal docs; rely on current Kanban/live-system verification for blocker status and separate public-source evidence for source-current claims.`

Not approved:

- Treating QMD as legal approval, conflicts clearance, consent, source-current proof, public-source evidence, CRM/Supabase/HighLevel state, or permission to contact.

#### Gated mirror/backfill card

Title: `Gated Supabase mirror/backfill tasks`

Current state:

`Todo/gated tasks t_7d361e6b, t_cf8c4471, and t_53d470c6 are correctly waiting behind t_fa6eb9c1. They should remain unstarted until schema installation is complete and verified.`

Next allowed decision:

`After authorized schema install and verification, prepare or approve a separate sync/backfill packet specifying task order, command, operator, evidence path, stop conditions, and no-external-action posture.`

Not approved:

- Unlinking dependencies.
- Force-starting todo tasks.
- Running sync/backfill from the dashboard.
- Treating partial/core mirror status as complete expanded Growth OS data.

### 3. Packet links panel

Add a small "Open exact packets" panel with these local links:

| Label | Path | Purpose |
| --- | --- | --- |
| 22:30 blocker addendum | `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/digests/2026-05-11_2230_watchdog_blocker_decision_addendum.md` | Copy/paste HOLD, HighLevel dry-run-only, Supabase admin DDL, source-access, and QMD-refresh boxes. |
| 22:30 private blocker deck | `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/digests/2026-05-11_2230_watchdog_blocker_decision_deck.html` | Local presentation view; decision prep only. |
| Addendum/deck review | `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/reviews/2026-05-11_2230_watchdog_blocker_decision_review.md` | Reviewer PASS for internal decision prep only and live-system limitations. |
| QMD refresh report | `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/ops/qmd_2026-05-11_2230_watchdog_refresh.md` | QMD before/after status and smoke-search evidence. |
| HighLevel blocker report | `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-11/highlevel_agent_targeting_sync_blocker_report.md` | Evidence of dry-run payload and blocked live sync; not live retry approval. |
| Supabase prepared SQL | `/Users/jeff/.openclaw/projects/mountain-west-growth-os/supabase/phase6-11-combined-growth-os-schema.sql` | Human/admin review input only; not proof of install. |

## Field/data requirements

Implementation should be static/local first and should not call live APIs. If represented in `src/data/approvalCommandCenter.ts`, use an additive local-only data object such as `approvalCommandExactUnblockVisibility` with these fields:

```ts
type ExactUnblockStatus = 'blocked' | 'held' | 'gated' | 'refreshed_internal' | 'unknown';

type ExactUnblockItem = {
  key: string;
  title: string;
  status: ExactUnblockStatus;
  tone: 'rose' | 'amber' | 'emerald' | 'slate';
  taskIds: string[];
  currentState: string;
  nextAllowedDecision: string;
  notApproved: string[];
  evidenceLinks: { label: string; path: string; purpose: string }[];
  lastCheckedLabel?: string;
  emptyState: string;
  errorState: string;
};
```

Required data rows:

1. `supabase-ddl-gate` with `taskIds: ['t_fa6eb9c1']`.
2. `highlevel-token-location-gate` with `taskIds: ['t_7884ab57']`.
3. `source-access-hold` with no live source probe and no prospecting authority.
4. `qmd-refreshed-internal-memory` with `taskIds: ['t_52088fee']`.
5. `gated-mirror-backfill` with `taskIds: ['t_7d361e6b', 't_cf8c4471', 't_53d470c6']`.

Do not include secrets, tokens, raw PII, live contact IDs, live opportunity IDs, or hidden credential values. If a token path is shown, show only the file path and required scope, never token contents.

## Empty states

Use fail-closed empty states:

| Missing item | Empty state copy | Tone |
| --- | --- | --- |
| Missing Kanban task state | `Kanban task state is unavailable locally. Keep this lane on HOLD and open the source task before approving any action.` | rose |
| Missing evidence file | `Expected local evidence file is missing. Do not rely on this dashboard row; inspect Kanban and regenerate a local report before any approval.` | rose |
| Missing deck link | `Deck not found. Use the addendum/review Markdown files as controlling internal decision evidence.` | amber |
| Missing QMD status | `QMD status unavailable. Treat QMD as degraded internal memory and use direct file/Kanban evidence.` | amber |
| Missing HighLevel blocker report | `HighLevel blocker report unavailable. Do not refresh token, dry-run, or live retry from this row until the blocker report is restored or recreated.` | rose |
| Missing Supabase SQL file | `Prepared SQL file unavailable. Do not approve schema install until the SQL is regenerated, reviewed, and path-confirmed.` | rose |

## Error states

Use explicit error states and no-action defaults:

| Error | Error state copy | Required behavior |
| --- | --- | --- |
| Conflicting HighLevel statuses, e.g. old 401 vs current 403 | `HighLevel token evidence conflicts or changed. Treat all token/location/scope failures as still blocked until a fresh read-only probe and dry-run-only packet pass.` | Do not live retry. |
| Supabase task status not blocked but no verification report | `Supabase task no longer shows blocked, but schema verification evidence is missing. Do not start mirror/backfill until verified install evidence and separate approval packet exist.` | Hold downstream tasks. |
| QMD says refreshed but search misses exact addendum/review | `QMD refresh may be incomplete. Use direct file links as controlling evidence and mark QMD degraded.` | Do not use QMD as current blocker memory. |
| Gated task appears ready before schema verification | `Downstream mirror/backfill task appears ready before schema verification. Do not run; escalate dependency mismatch for review.` | Block/hold, do not force-start. |
| Any live/external action button appears in this section | `Unsafe UI affordance detected. This section must be read-only decision prep; remove/disable execute/mutate/send/publish controls before use.` | Fail QA. |

## QA checklist for future implementation

Before marking any code patch complete, verify locally only:

1. `/approval-command-center` renders the new section without live API calls.
2. The safety warning is visible above status cards.
3. Every row states decision-prep-only / not execution authority.
4. Evidence links are local file links or internal dashboard routes only.
5. No form, button, submit action, mutation handler, API write, Supabase client write, HighLevel client write, send action, workflow action, or publish action is added.
6. Empty states render when evidence arrays are empty or paths are unavailable.
7. Error states are documented and fail closed.
8. Existing hard-forbidden-action wall remains visible.
9. Run `npm run lint` and `npm run build` from `/Users/jeff/.openclaw/projects/mountain-west-growth-os/dashboards/growth-os-dashboard` if code changes are made.
10. Do not deploy, publish, run Supabase DDL/sync/backfill, call HighLevel, refresh tokens, or start gated tasks as part of the dashboard patch.

## Implementation note

No code was changed for this task. A small future local-only patch would be safe if it only adds static data and read-only rendering to the existing `/approval-command-center` page, preserves the no-execution wall, and passes local lint/build. Any patch that introduces live API calls, write-capable handlers, approval capture, or execute/mutate buttons is out of scope and should be rejected.

## Jeff next decision

Default: keep all blockers on HOLD and use this spec as implementation guidance for a private/local visibility refresh. If Jeff wants progress, choose exactly one narrow manual unblock lane from the 22:30 addendum: HighLevel token refresh + dry-run-only verification, Supabase human/admin DDL review/install, source-access repair/smoke test, or QMD/internal-memory maintenance. None of those choices authorizes live sync, sends, workflow activation, CRM/Supabase/Clio mutation by agents, public publishing, social/LinkedIn action, prospecting, or client/prospect-facing action.
