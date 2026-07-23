# Whiteford / Schell IP Morning Action Brief — 2026-05-13 06:30 MDT

Task: `t_875a422c`
Tenant: `whiteford-mountain-west`
Status: INTERNAL JEFF/WHITEFORD DECISION PREP ONLY / NO LIVE-SYSTEM OR EXTERNAL ACTION AUTHORIZED

This brief does not authorize or perform email, SMS, DM, LinkedIn/social/YouTube posting, ad launch, public publish/deploy, prospecting/source tests, HighLevel/CRM contact or opportunity mutation, workflow activation/test/enrollment, trigger tags, Supabase DDL, Supabase sync/backfill, SQLite mutation, Clio write, credential guessing, or client/prospect-facing action. It is a morning decision aid assembled from live Kanban blockers, recent handoffs, the prior 2026-05-12 morning brief, the deliverable index, and QMD-retrieved internal docs.

## 1. One-screen executive summary

Recommended 06:30 posture: keep HOLD as the default; approve at most one narrow internal/manual lane today.

What is blocked:
1. Supabase expanded schema remains the controlling infrastructure blocker. `t_fa6eb9c1` is still blocked on human/admin DDL access for project `yidxnmxvtohaldkbypcv`; read-only checks still show expanded phase 6-11 tables missing. Prepared SQL exists, but agents must not run DDL, sync, or backfill.
2. HighLevel Agent Targeting remains human/API-access blocked. `t_7884ab57` is still failing token/location/API access for location `tm68WWMrcAa3TqQbEAMa` with 401/403/location/Cloudflare denial variants. No contact/opportunity mutation is safe.
3. Supabase mirror/backfill tasks remain correctly gated. `t_7d361e6b`, `t_cf8c4471`, `t_77403651`, and `t_53d470c6` are todo/dependency-gated behind `t_fa6eb9c1`; do not unlink or force-start.
4. Source/prospecting and data hygiene remain HOLD. QMD is refreshed and useful for finding internal artifacts, but QMD/internal memory is not public-source proof, consent, conflicts clearance, CRM state, or approval authority.

What is safe to do next:
1. Review internal/private packets, decks, dashboard specs, and QMD docs.
2. Use `/approval-command-center#exact-unblock-visibility` and the data-hygiene dashboard specs only as read-only/private decision support.
3. If Jeff wants progress without touching live systems, approve one local/no-token QA or attorney-review-only copy lane with synthetic/non-confidential inputs and a local evidence path.

What Jeff must decide:
1. Supabase: continue HOLD, or name an authorized Supabase admin/operator to review/run the exact prepared SQL and capture verification evidence.
2. HighLevel: continue HOLD, or refresh the correct location-bound Private Integration token and approve read-only probe + dry-run only.
3. Day lane: choose one safe internal lane below, or hold all lanes until source/credential gates are resolved.

Business-development principle applied: a lead magnet or decision asset should solve one narrow diagnostic problem first, build value before asking for consultation, and keep follow-up opt-in-only. In this legal-services context, every next step remains attorney-review-gated, non-confidential, non-hypey, no-send/no-enrollment, and no public/client-facing action until explicitly approved.

## 2. Exact manual unblock box — Supabase DDL

```text
DECISION: Supabase expanded Growth OS mirror schema

Current state:
- Task: t_fa6eb9c1
- Status: BLOCKED on human/admin DDL access.
- Project: yidxnmxvtohaldkbypcv
- Prepared SQL: /Users/jeff/.openclaw/projects/mountain-west-growth-os/supabase/phase6-11-combined-growth-os-schema.sql
- Prior packet: docs/ops/2026-05-11_supabase_schema_human_unblock_operator_packet.md
- Gated downstream tasks: t_7d361e6b, t_cf8c4471, t_77403651, t_53d470c6

Choose one:
[ ] HOLD Supabase DDL, sync, and backfill.
[ ] APPROVE authorized human/admin DDL review/install only.

If APPROVE:
Authorized operator: ____________________________
Evidence path: _________________________________
Maintenance/rollback owner, if any: _____________

Approved scope:
- Review the exact prepared SQL file above.
- Run it only in Supabase project yidxnmxvtohaldkbypcv using SQL Editor or another approved DDL-capable path.
- Capture non-secret evidence showing project ref, successful SQL execution, and all expected expanded phase 6-11 mirror tables present.
- After verified success, complete/unblock t_fa6eb9c1 and let Kanban dependencies promote normally.

Not approved:
- No agent credential guessing or service-role DDL attempt.
- No unrelated schema/table changes.
- No Supabase mirror sync/backfill until schema verification is complete and the relevant gated task promotes.
- No HighLevel/CRM/Clio/workflow/email/social/public/client/prospect-facing action.

Hard stop:
- Wrong project, SQL mismatch, DDL error, missing table verification, non-DDL-capable credential, exposed secret, or pressure to force-start downstream tasks.
```

## 3. Exact manual unblock box — HighLevel token/location access

```text
DECISION: HighLevel Agent Targeting token/location access

Current state:
- Task: t_7884ab57
- Status: BLOCKED on token/location/API access.
- Location: Whiteford Schell IP / tm68WWMrcAa3TqQbEAMa
- Pipeline: Tbx4tA6wHv5lTwZPSHyZ
- Stage: Agent Targeting / fd569cf4-979b-43b8-bd0f-78e807e80ff1
- Secret path to refresh: /Users/jeff/.openclaw/secrets/ghl-whiteford-schell-ip.json
- Prior dry-run packet: docs/highlevel/2026-05-11_agent_targeting_token_refresh_dry_run_packet.md

Choose one:
[ ] HOLD HighLevel Agent Targeting token/probe/dry-run/live work.
[ ] APPROVE token refresh + read-only probe + dry-run only.

If APPROVE:
Authorized operator: ____________________________
Dry-run evidence path: __________________________

Approved scope:
- Refresh the Private Integration token for the correct Whiteford Schell IP location without exposing token values in docs, Kanban, chat, screenshots, commits, or logs.
- Run only the read-only `/workflows` probe first.
- If read-only probe returns a clean 200 for the expected location/scope, run only the documented dry-run.
- Confirm dry-run reports `live=false`, zero contacts/opportunities created or linked, no tags, no sends, no workflow enrollment, and expected location/pipeline/stage values.

Not approved:
- No `--live` run.
- No contact, opportunity, tag, task, note, custom-field, pipeline, or workflow mutation.
- No workflow publish/activate/test/manual start/contact enrollment.
- No email/SMS/DM/LinkedIn/social/outreach/public publishing/ads/Clio/Supabase/client/prospect-facing action.

Hard stop:
- 401, 403, Cloudflare 1010, wrong location, missing scope, ambiguous location binding, token exposure, or dry-run output implying mutation.
```

## 4. Ranked safe internal next lanes for today

### 1. `/colorado-tech-general-counsel` — Tech Company Legal Health Checklist local/no-token QA

Why first: it is the most concrete controlled-pilot lane and best matches the business-development principle: solve one narrow diagnostic problem before asking for consultation. Prior controlled-pilot packets route the Tech Company Legal Health Checklist to `/colorado-tech-general-counsel#lead-magnet` and keep it internal/local or preview QA unless later activation is separately approved.

Safe scope today:
- Create or task a local/no-token QA packet only.
- Use synthetic TEST company names, `.invalid` emails, non-confidential inputs, no production credentials, and local evidence capture.
- Verify on-page value delivery, optional opt-in separation, no-confidential-information warnings, no-attorney-client disclaimers, and no live-system writes.

Not safe today:
- No public route change, production deploy, real lead submission, HighLevel token use, workflow action, CRM/Supabase/Clio write, send, social, ad, or client/prospect-facing use.

### 2. `/ai-compliance-gameplan` — attorney-review-only AI governance diagnostic outline

Why second: it is a useful adjacent narrow diagnostic when AI/data governance is the dominant issue, but publication/source-current and legal-review gates are tighter. The controlled-pilot packet treats it as an adjacent route, not the primary lane.

Safe scope today:
- Draft or refine an internal attorney-review-only checklist/outline focused on one non-confidential AI governance map: use case, data, model/vendor, human review, customer commitments, records, and escalation owner.
- Keep it internal; use QMD/business-development corpus only as strategy memory, not source-current legal proof.

Not safe today:
- No current-law claims without source refresh, no compliance conclusions, no live form/workflow/CRM wiring, no email/social/public use, no opt-in or enrollment action.

### 3. `/ai-law-youtube` with route references to `/ai-patent-strategy-scorecard` or `/colorado-startup-ma-lawyer` — internal recording prep only

Why third: content preparation can advance authority without touching CRM/HighLevel/Supabase if kept as recording notes and attorney-review-only. It should not outrank Tech GC QA because public/source-current review is needed before publication.

Safe scope today:
- Prepare one internal script packet or recording outline, preferably tied to a narrow diagnostic: AI patent human-contribution records (`/ai-patent-strategy-scorecard`) or diligence readiness for AI/data/IP assets (`/colorado-startup-ma-lawyer`).
- Include disclaimer, no-confidential-information, opt-in-only CTA, and attorney/source-current review checklist.

Not safe today:
- No upload, schedule, publish, Shorts/social post, newsletter/email, HighLevel tag/workflow, public CTA launch, named-company claim, or client/prospect-facing use.

## 5. Dashboard / QMD / data-hygiene visibility notes

- Approval Command Center exact-unblock visibility spec: safe as private/local read-only dashboard guidance only. It should show blocker cards, evidence links, fail-closed empty/error states, and no execute/mutate/send/publish controls.
- Private dashboard data-hygiene spec: safe as visibility only. It should surface missing offer/contact IDs, stale rows, duplicates, uncleared suppression/conflicts/prior-touch, pending approvals, and forbidden actions; it must not create CRM/HighLevel/Supabase/SQLite/Clio mutations or export/approval buttons.
- QMD 2026-05-13 refresh: PASS for internal search support. QMD now retrieves the pre-wake brief/deck/review and related task IDs by normalized/title searches, while exact underscore filename searches may still miss. QMD remains internal memory only.

## 6. Current blocker/dependency map

| Lane | Current state | Safe next decision |
| --- | --- | --- |
| Supabase schema `t_fa6eb9c1` | BLOCKED on human/admin DDL; expanded tables still missing. | HOLD or authorized human/admin exact-SQL install with evidence. |
| HighLevel Agent Targeting `t_7884ab57` | BLOCKED on token/location/API access. | HOLD or token refresh + read-only probe + dry-run only. |
| 2026-05-10 mirror `t_7d361e6b` | TODO, gated behind schema. | Do not force-start; wait for verified DDL completion. |
| 2026-05-11 mirror `t_cf8c4471` | TODO, gated behind schema. | Do not force-start; wait for verified DDL completion. |
| 2026-05-12 mirror `t_77403651` | TODO, gated behind schema; upstream validation was a source-blocked local no-op with zero prospects. | Do not force-start; wait for verified DDL completion. |
| Consolidated backfill `t_53d470c6` | TODO, gated behind schema for partial 2026-05-06 through 2026-05-09 mirror reports. | Start only after schema install and separate sync/backfill approval/verification. |
| Source/prospecting | HOLD; Firecrawl/source gate unresolved. | HOLD or separate neutral smoke-test/source-restore approval only. |
| Public/campaign/client-facing | HOLD. | Exact Jeff + attorney/legal/ethics/privacy/source-current/brand/consent approval required. |

## 7. Recommended read order

1. This brief.
2. Supabase operator packet: `docs/ops/2026-05-11_supabase_schema_human_unblock_operator_packet.md`.
3. HighLevel token dry-run packet: `docs/highlevel/2026-05-11_agent_targeting_token_refresh_dry_run_packet.md`.
4. Approval Command Center exact-unblock spec: `docs/dashboard/2026-05-11_approval_command_center_exact_unblock_visibility_spec.md`.
5. Data-hygiene dashboard spec: `docs/growth-os/data-hygiene/2026-05-11_private_dashboard_data_hygiene_visibility_spec.md`.
6. Controlled-pilot authority packet: `docs/growth-os/authority-followups/2026-05-08-controlled-pilot-authority-followup-packet.md`.
7. QMD refresh report: `docs/ops/qmd_2026-05-13_prewake_action_brief_deck_refresh.md`.

## 8. Bottom line

The system is not launch-ready; it is decision-ready. The highest-value manual unblocks are Supabase schema install and HighLevel token/location repair, but both require named human/operator approval and evidence capture. If Jeff wants safe internal progress today without credentials or live-system risk, choose the Tech GC local/no-token QA lane first and keep all external, public, CRM, HighLevel, Supabase, workflow, source/prospecting, and client-facing actions on HOLD.
