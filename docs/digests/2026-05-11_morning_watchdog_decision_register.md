# 2026-05-11 Morning Watchdog Decision Register

Task: `t_73520ad9`
Tenant: `whiteford-mountain-west`
Status: INTERNAL JEFF/WHITEFORD DECISION PREP ONLY / NO EXTERNAL OR LIVE-SYSTEM ACTION AUTHORIZED

This addendum consolidates the latest passed internal-only handoffs and live board state after the QMD morning refresh. It is safe to read, mark up, and use as an internal decision surface. It does not approve local QA, code changes, browser probes, HighLevel UI/API work, saved views, field creation, workflow testing/activation/enrollment, email/SMS/newsletter/social/LinkedIn/YouTube/ads, Supabase DDL/backfill/sync, Clio writes, source-access restoration, prospect discovery, deployment, publishing, or client/prospect-facing action.

Business-development principle to apply: a strong legal-services lead magnet should solve one narrow diagnostic problem, build problem awareness, deliver useful value before asking for consultation, and keep follow-up opt-in-only, educational, non-hypey, non-confidential, no-ACR/no-legal-advice/no-guarantee, and attorney-review-gated. Local corpus retrieval on 2026-05-11 again supported the narrow-diagnostic / problem-awareness / value-before-ask pattern; no book text is reproduced here.

## Executive register

| Decision | Safe internal review now | Exact approval still required | Default |
| --- | --- | --- | --- |
| 1. HOLD all | Jeff can confirm the no-external-action wall remains the governing default. | Any narrowed execution lane must name operator, system, evidence path, stop rules, rollback, and attorney/privacy/source-current gates. | HOLD. |
| 2. Local/no-token `/api/leads` QA | Review the prepared synthetic `.invalid` QA packets and decide whether a future worker may run local/no-token checks only. | Exact Jeff approval before tests, adapter probes, browser checks, route execution, or evidence capture. | HOLD unless approving one narrow local evidence run. |
| 3. Future `/api/leads` adapter work | Review static finding that current preview uses bare custom-field keys and may later need `contact.*`, `fieldKey`, or id-backed shape. | Separate engineering approval before editing `src/app/api/leads/route.ts`, tests, or adapter behavior; no live-token reliance. | HOLD. |
| 4. Six HighLevel fields | Review field list, privacy/reporting risks, generated-key expectations, and post-37 verifier plan. | Attorney/privacy review, exact manual field-creation approval, and read-only verification before any adapter/workflow/report reliance. | Hold now; create later only if approved. |
| 5. Saved views / smart lists | Review no-mutation saved-view packet and evidence template. | Exact HighLevel operator/view/filter/exclusion approval before opening HighLevel or creating views. Saved views are not send audiences. | HOLD. |
| 6. Tech GC copy | Review attorney-only Tech GC copy redline for route `/colorado-tech-general-counsel`. | Attorney/privacy/brand/source-current approval before app insertion, HighLevel entry, email/newsletter/social use, or publication. | Internal copy direction only. |
| 7. Supabase DDL/backfill | Review live blocker lineage and manual unblock steps. | Authorized Supabase admin must satisfy `t_fa6eb9c1` before `t_53d470c6` or `t_7d361e6b` can run/rely on expanded tables. | BLOCKED / human-only. |
| 8. Source access | Review source-access packets and source-blocked zero-candidate posture. | Firecrawl/replacement/manual-source workflow approval and neutral smoke tests before prospect reruns or named-company claims. | HOLD. |
| 9. Authority/content review | Review source-independent authority backlog and approved route mapping only as attorney-review prep. | Exact copy, source-current, CTA/UTM, conflicts/suppression, channel/operator, and no-ACR approval before publishing or sending. | Internal review only. |

## Route and asset map for decisions

- `/ai-patent-strategy-scorecard`: approved internal route reference for AI Patent lead magnet and authority CTAs; public/social/email/ads still require final copy/source-current/CTA approval.
- `/ai-compliance-gameplan`: approved internal route reference for AI Compliance diagnostic value; no workflow/send/public relaunch approval implied.
- `/colorado-ai-compliance-lawyer`: authority/service route for internal route mapping only; no public copy change or campaign use approved here.
- `/colorado-tech-general-counsel`: Tech GC lead-magnet and controlled-pilot route; safest optional progress lane remains a future exact-approved local/no-token synthetic QA run.
- `/colorado-startup-ma-lawyer`: Founder/M&A route mapping for internal authority/lead-magnet review; M&A fields remain privacy/attorney-review gated.
- `/ai-law-youtube`: authority hub reference for evergreen source-independent content review; no upload, publish, social planner, or YouTube action approved.

## Copy/paste decision boxes

```text
DECISION 1 — CONFIRM HOLD ALL
I confirm that no external/live-system action is approved from this register.
Safe now: internal reading, local docs, approval-packet edits, and attorney/Jeff discussion only.
Not approved: local QA/tests, code changes, HighLevel/CRM/Supabase/Clio mutation, source-access restoration, prospecting, publishing, social/LinkedIn/YouTube/ads, email/SMS/newsletter, workflow action, or client/prospect-facing use.
Approver:
Date:
Notes:
```

```text
DECISION 2 — LOCAL/NO-TOKEN /api/leads QA
[ ] APPROVE future local/no-token synthetic QA only.
[ ] HOLD.
If approved, scope is limited to prepared synthetic `.invalid` fixture checks, no HighLevel token/location, preview mode, no contact/upsert/workflow/send, local evidence folder only, and immediate stop on credential/live/real-data/external-use prompts.
Operator:
Evidence folder:
Approver:
Date:
```

```text
DECISION 3 — FUTURE /api/leads ADAPTER WORK
[ ] APPROVE future local engineering test/change plan only.
[ ] HOLD.
If approved, candidate adapter shape must be named (`fieldKey contact.*`, `key contact.*`, id-backed verified fields, or other), files/tests must be named, and no live-token QA, deploy, public UX/copy change, unmapped six-field reliance, or external action is approved.
Candidate shape:
Files/tests:
Approver:
Date:
```

```text
DECISION 4 — SIX HIGHLEVEL FIELDS
[ ] Hold now; later create six Contact fields only after exact approval and read-only verification.
[ ] Do not create; request removal/remap proposal.
Six fields: ai_patent_gap_map, ai_patent_ownership_gap_map, ma_readiness_timing, ma_readiness_category_scores, ma_readiness_risk_map, ma_readiness_60_day_plan.
No field creation, live payload use, workflow/report reliance, or storage of sensitive diagnostic values is approved by this register.
Approver:
Date:
```

```text
DECISION 5 — SAVED VIEWS / SMART LISTS
[ ] APPROVE future saved-view-only evidence capture.
[ ] HOLD.
If approved, provide exact operator, Whiteford Schell IP location, saved-view names, filters, suppression/consent exclusions, and evidence folder. Saved views are internal review aids, not send audiences.
Operator:
Saved-view names:
Evidence folder:
Approver:
Date:
```

```text
DECISION 6 — TECH GC COPY
[ ] Approve internal copy direction for a later implementation packet.
[ ] Hold/request revisions.
Route: /colorado-tech-general-counsel.
No app insertion, public page change, HighLevel entry, email/newsletter/social/YouTube/ad use, workflow action, or client/prospect-facing publication is approved.
Required edits:
Approver:
Date:
```

```text
DECISION 7 — SUPABASE DDL / BACKFILL
[ ] Authorized human/admin may satisfy expanded-schema DDL blocker t_fa6eb9c1.
[ ] Continue hold.
Blocker lineage preserved: t_fa6eb9c1 -> t_53d470c6 and t_7d361e6b.
Manual path: run /Users/jeff/.openclaw/projects/mountain-west-growth-os/supabase/phase6-11-combined-growth-os-schema.sql in Supabase project yidxnmxvtohaldkbypcv, capture schema verification, then only after separate exact approval run the gated sync/backfill.
No agent DDL, credential guessing, backfill before DDL verification, or dashboard reliance on expanded tables is approved.
Authorized admin:
Approver:
Date:
```

```text
DECISION 8 — SOURCE ACCESS
[ ] Restore/fund Firecrawl for internal research only.
[ ] Approve replacement/manual source workflow for internal research only.
[ ] Continue hold.
Any approved source path must pass neutral smoke tests before prospect scoring. No source-blocked 2026-05-10 output may be used for prospect inference, named-company claims, CRM movement, outreach, social, or public action.
Backend/workflow:
Owner/operator:
Approver:
Date:
```

```text
DECISION 9 — AUTHORITY / CONTENT REVIEW
[ ] Approve internal attorney/content review of source-independent authority assets only.
[ ] Hold.
Routes for internal mapping: /ai-patent-strategy-scorecard, /ai-compliance-gameplan, /colorado-ai-compliance-lawyer, /colorado-tech-general-counsel, /colorado-startup-ma-lawyer, /ai-law-youtube.
No recording upload, YouTube publish, LinkedIn/social post, newsletter/email, HighLevel campaign, ad, public copy change, or client/prospect-facing action is approved without exact final copy/source-current/CTA/UTM/conflicts/suppression/channel approval.
Approver:
Date:
```

## Live board blocker snapshot

- `t_fa6eb9c1` is still blocked on human/DDL-capable Supabase access for project `yidxnmxvtohaldkbypcv`. Latest watchdog recheck confirmed prepared SQL/report exist, no local safe DDL path is available, and no unsafe DDL retry was attempted.
- `t_53d470c6` remains todo and intentionally gated by `t_fa6eb9c1`; it should backfill expanded Supabase mirror tables only after schema installation and exact approval.
- `t_7d361e6b` remains todo and depends on validation plus `t_fa6eb9c1`; it must not mirror/rely on expanded tables until schema exists.

## Bottom line

Use this as the 2026-05-11 morning addendum to the 06:30 digest and reviewer PASS. The only potentially safe progress lane is still a future, exact-approved local/no-token synthetic `/api/leads` QA run. Everything else is either internal review, human-only approval, or HOLD.