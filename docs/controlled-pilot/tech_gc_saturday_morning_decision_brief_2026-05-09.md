# Tech GC Saturday Morning Decision Brief — 2026-05-09

Task: `t_5414673b`
Tenant: `whiteford-mountain-west`
Status: internal Jeff/Whiteford decision brief only. This brief does not approve external sends, public publishing, live HighLevel/CRM mutation, workflow activation, contact enrollment, Supabase DDL/sync, Clio writes, LinkedIn/social action, ads, or production credential changes.

## Executive readout

Recommended Saturday decision: approve only Tech GC local/no-token internal QA, keep HighLevel remediation and Supabase DDL/sync on separate human approval tracks, and keep the public/external pilot as a no-go.

The reviewed tranche passed for internal controlled QA planning because the Tech GC packet, HighLevel consent-gate packet, and dashboard status all preserve the same safety boundary: the lead magnet must deliver narrow educational diagnostic value first; report or nurture follow-up requires affirmative consent; all legal-services copy remains educational, non-hypey, and attorney-review-gated.

## Decision box 1 — Tech GC local/no-token QA

Recommended: APPROVE local/no-token QA only.

Copy/paste one:

```text
APPROVED: Tech GC / Tech Company Legal Health Checklist may proceed as the first internal controlled-pilot lane for local/no-token QA only.

Scope approved:
- Use only synthetic Jeff-owned TEST payload definitions for local/preview evidence.
- Keep HighLevel credentials absent or disabled.
- Keep all HighLevel workflows Draft/Off.
- Capture evidence under docs/controlled-pilot/evidence/2026-05-09-tech-gc-local-no-token/ or a dated equivalent.
- Default non-subscriber handling remains browser/on-page educational value only: no outbound email, no live CRM write, and no workflow tag.

Not approved:
- No live HighLevel contact/opportunity creation or update.
- No workflow activation, publication, manual start, contact enrollment, email, SMS, DM, LinkedIn, social, ad, Clio, Supabase, production env, public publish, or external outreach action.
- No real prospects, clients, imported contacts, researched leads, or third-party contacts.

Stop if any preview produces a non-approved workflow tag, send/enrollment indication, live-write indication, cross-lane trigger, or guardrail failure.
```

```text
HOLD: Do not run Tech GC local/no-token QA yet.

Reason for hold:
- [ ] Need attorney/privacy/brand review first.
- [ ] Need exact non-subscriber policy first.
- [ ] Need confirmed Jeff-owned TEST payload/inbox labels first.
- [ ] Need HighLevel field/guard evidence first.
- [ ] Other: ____________________________

All no-external-action boundaries remain in place.
```

```text
REQUEST REVISIONS: Revise the Tech GC local/no-token QA packet before approval.

Required revisions:
- [ ] Change TEST payload labels or evidence folder.
- [ ] Change non-subscriber browser-only treatment.
- [ ] Add/remove API test cases.
- [ ] Tighten legal/privacy/copy caveats.
- [ ] Other: ____________________________

This request does not approve any QA run or live-system action.
```

## Decision box 2 — HighLevel sandbox / Tech-GC-only / hold remediation

Recommended: HOLD HighLevel edits unless Jeff wants sandbox-only UI semantics evidence first. If Jeff wants the safest next HighLevel step, approve SANDBOX ONLY, not real workflow edits.

Copy/paste one:

```text
APPROVED: HighLevel SANDBOX ONLY consent-gate semantics check.

Scope approved:
- Create or edit one temporary Draft/Off sandbox workflow in Whiteford Schell IP named `SANDBOX - consent gate condition semantics - do not activate`.
- No triggers, sends, enrollments, contacts, opportunities, tasks, notes, webhooks, public changes, Clio, Supabase, or external actions.
- Use the sandbox only to prove one `Tags Does not include <single tag>` row per absent tag is saved as all-AND and preserves visible row text after save.

Not approved:
- No edits to real intake workflows.
- No Publish/Activate, Test Workflow, manual start, enrollment, send, CRM mutation, or contact/opportunity mutation.
- If UI semantics are ambiguous or unsafe, cancel/discard and document evidence.
```

```text
APPROVED: HighLevel TECH GC ONLY draft/off consent-gate remediation.

Scope approved:
- Workflow: Tech GC Launchpad only (`dee4450a-1b7b-4597-9fa4-9c7b7423b848`) in Whiteford Schell IP (`tm68WWMrcAa3TqQbEAMa`).
- Add only one absent-tag condition per row for `newsletter:not-consented`, `outreach:do-not-send`, and `ops:no-auto-send`.
- Add `Consent Basis Starts with lead_magnet_email_opt_in:` only if field/operator/value semantics are unambiguous.
- Add DND/unsubscribe/suppression/bounce and `Approval Status` rows only if exact field/operator/value semantics are unambiguous and evidence is captured.
- Keep workflow Draft/Off and capture before/after screenshot or DOM evidence.

Not approved:
- No edits to AI Compliance, Founder M&A, or AI Patent workflows.
- No Publish/Activate, Test Workflow, manual start, enrollment, send, CRM mutation, contact/opportunity/tag/task/note mutation, public change, Clio, Supabase, ad, social, or external action.
- Stop and discard without saving if any UI condition becomes ambiguous, unsafe, OR logic, multi-select negative semantics, or `Tags Is empty`.
```

```text
HOLD: Do not perform HighLevel sandbox or workflow remediation.

Keep current Draft/Off workflows unchanged. Use docs/highlevel_safe_consent_gate_remediation_packet_2026-05-09.md for review only until Jeff names the exact operator, workflow scope, evidence path, save/rollback rules, and permitted condition rows.
```

```text
REQUEST REVISIONS: Revise the HighLevel consent-gate remediation packet before any HighLevel action.

Required revisions:
- [ ] Change allowed HighLevel workflow scope.
- [ ] Change condition rows/operators/values.
- [ ] Clarify DND, unsubscribe, suppression, bounce, Consent Basis, or Approval Status semantics.
- [ ] Add rollback/evidence requirements.
- [ ] Other: ____________________________

This request does not approve sandbox creation, workflow edits, saves, publishing, testing, enrollment, sends, or CRM mutation.
```

## Decision box 3 — Supabase DDL/sync human unblock

Recommended: HOLD until Jeff or an authorized Supabase admin explicitly performs the DDL/sync path. This worker should not run it.

Copy/paste one:

```text
APPROVED FOR AUTHORIZED HUMAN ONLY: Supabase expanded-schema unblock may be performed by Jeff or a named authorized Supabase admin.

Scope approved:
- Project: `yidxnmxvtohaldkbypcv`.
- Run prepared SQL: `/Users/jeff/.openclaw/projects/mountain-west-growth-os/supabase/phase6-11-combined-growth-os-schema.sql` in Supabase SQL Editor or an approved DDL-capable channel.
- Then rerun from `/Users/jeff/.openclaw/projects/mountain-west-growth-os`: `node scripts/sync-sqlite-to-supabase.mjs`.
- Capture post-sync verification and refresh the private dashboard status.

Not approved:
- No agent guessing credentials, using production secrets, mutating unrelated tables, changing HighLevel/Clio/CRM, sending messages, or treating dashboard copy as proof that expanded tables are live.
```

```text
HOLD: Do not run Supabase DDL or mirror sync.

Reason for hold:
- [ ] Need authorized Supabase admin.
- [ ] Need credential/session access.
- [ ] Need SQL review before execution.
- [ ] Need maintenance window / rollback owner.
- [ ] Other: ____________________________

Private dashboard remains static/status-only; expanded phase 6-11 evidence stays blocked.
```

```text
REQUEST REVISIONS: Revise the Supabase unblock plan before any DDL/sync action.

Required revisions:
- [ ] Add preflight/backup/rollback instructions.
- [ ] Add exact verification queries.
- [ ] Clarify dashboard refresh owner.
- [ ] Confirm project ref and SQL path.
- [ ] Other: ____________________________

This request does not approve SQL execution, sync rerun, or credential use.
```

## Decision box 4 — Public/external pilot no-go

Recommended: NO-GO. No public/external/client/prospect-facing action should occur Saturday.

Copy/paste one:

```text
NO-GO: Public/external Tech GC pilot is not approved.

Required before any future public/external pilot:
- Final app/report/email copy approved by attorney/legal/ethics/privacy/current-law/brand reviewers.
- Sender identity, firm footer/address, unsubscribe/preference handling, privacy/terms/disclaimer URLs or route text approved.
- Route/domain/CTA/UTM verified.
- HighLevel 37/37 field verification and workflow UI guard evidence complete.
- Supabase expanded schema/evidence blocker resolved or expressly scoped out.
- Suppression, DND, unsubscribe, bounce, conflicts, adverse-party, Clio/prior-touch clearance complete.
- Exact recipients/test records, channel, timing, activation owner, monitoring window, and rollback plan approved.

Until then: no sends, posts, ads, public publish, contact enrollment, workflow activation, live CRM mutation, Clio write, or external outreach.
```

```text
REQUEST REVISIONS: Prepare a future public/external pilot launch packet, but do not launch.

The future packet must include final copy, legal/ethics/privacy/current-law review, route/domain/CTA/UTM proof, HighLevel/Supabase readiness evidence, suppression/conflicts checks, sender/footer/unsubscribe/preference handling, exact recipients/channel/timing, activation owner, monitoring window, and rollback plan.

This request does not approve any public or external action.
```

## Explicit next safe internal action

If Jeff approves Decision box 1, create the next execution task for a specialist to run only the Tech GC local/no-token QA evidence matrix and write the dated evidence packet. The task should forbid production credentials and live-system mutation, require synthetic Jeff-owned TEST payloads only, and stop on any workflow tag, send/enrollment, live-write, cross-lane, or guardrail failure.

If Jeff does not approve Decision box 1, no execution task should run; the safe action is to hold and revise the packet or approval language.

## Human approvals still needed

1. Jeff approval for Tech GC as the first local/no-token internal QA lane.
2. Jeff approval of synthetic Jeff-owned TEST payload definitions and evidence folder path.
3. Jeff/Whiteford confirmation that non-subscriber handling remains browser/on-page value only for this QA pass.
4. Jeff decision on HighLevel remediation: HOLD, SANDBOX ONLY, TECH GC ONLY, THREE STANDARD BUILDER WORKFLOWS, or REQUEST REVISIONS.
5. Named authorized HighLevel operator, exact workflow scope, evidence path, and rollback/stop owner before any HighLevel UI work.
6. Jeff or authorized Supabase admin approval to run the prepared SQL and mirror sync, plus post-sync verification owner.
7. Attorney/legal/ethics/privacy/current-law/brand review before any public, external, live email/SMS, social, ad, or prospect/client-facing use.
8. Final sender/footer/unsubscribe/preference/privacy/terms/disclaimer approval before any email or report delivery beyond local preview.
9. Conflicts, suppression, DND, unsubscribe, bounce, adverse-party, Clio/prior-touch, recipient/channel/timing, monitoring, activation-owner, and rollback approvals before any live/public/external pilot.

## Source basis

Primary source: `docs/controlled-pilot/internal_pilot_tranche_review_2026-05-09.md`.
Supporting packets: `docs/controlled-pilot/tech_gc_internal_controlled_pilot_packet_2026-05-09.md`, `docs/highlevel_safe_consent_gate_remediation_packet_2026-05-09.md`, and `/Users/jeff/.openclaw/projects/mountain-west-growth-os/dashboards/growth-os-dashboard/docs/dashboard_supabase_blocker_pilot_status_refresh_2026-05-08_t_f57c9bfe.md`.
Business-development retrieval applied: a lead magnet should solve a narrow diagnostic problem and fulfill promised educational value before follow-up; nurture/report follow-up requires consent; Whiteford legal-services copy must remain educational, non-hypey, and attorney-review-gated. No book text is reproduced.
