# Funnel Map Consent Alignment Note — 2026-05-22

Task: `t_0a7330ea`
Status: internal/private documentation alignment only.

## No-live-action verification

This work stayed inside the local repository at `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages`.

No HighLevel live edit, contact/opportunity mutation, tag application, workflow activation/enrollment, email/SMS/DM/newsletter send, social/LinkedIn/ad action, Supabase/Clio write, public deployment, or client/prospect-facing action was performed.

## Sources checked

- `highlevel_ai_authority_funnel_map.md` — controlling HighLevel funnel map being aligned.
- `docs/KANBAN_DELIVERABLE_INDEX.md` rows for:
  - `t_a69dbfc6 — Fix final-magnet consent routing QA gap - 2026-05-19`
  - `t_9aaae83d — Review final-magnet consent routing QA/fix - 2026-05-19`
  - `t_b6f9ca78 — Refresh QMD for final-magnet consent routing handoffs - 2026-05-19`
- `docs/lead-magnets/2026-05-19_final_magnet_consent_routing_fix_report.md`
- `docs/reviews/2026-05-19_final_magnet_consent_routing_review.md`
- `docs/reports/2026-05-19-final-magnet-consent-routing-qmd-refresh.md`
- `src/app/api/leads/route.ts`
- `src/lib/campaigns.ts`
- `tests/verify_lead_magnet_api_consent.mjs`
- `tests/verify_lead_magnet_static_guardrails.mjs`
- Local business-development corpus search for lead-magnet trust/fulfillment principles. Synthesis used only: a lead magnet should solve a narrow problem, fulfill the promised value, and build trust before a consultation or stronger follow-up ask.

## Changes made

Updated `highlevel_ai_authority_funnel_map.md` to remove stale newsletter/static-tag drift and align the map with the May 19 consent-routing fix/review:

1. Added current source files and test files to the audited-source list.
2. Added implementation-state language explaining that newsletter tags, workflow trigger tags, and email-sequence routing are literal-checkbox-gated.
3. Replaced the stale duplicate-tag section that said `newsletter:ai` was included in static campaign tags and could leak non-consented records into newsletter segments.
4. Documented the current regular-campaign behavior:
   - opted-in only: campaign workflow trigger tag, `newsletter:ai`, `consent_basis=lead_magnet_email_opt_in:{campaign-key}`, `approval_status=pending`;
   - false/missing opt-in: `newsletter:not-consented`, `consent_basis=no_email_opt_in`, `approval_status=no-auto-send`, no `workflow:*`, empty email sequence.
5. Removed `newsletter:ai` from the listed static campaign tags for all four campaigns and moved it into consent-gated routing notes.
6. Added explicit HOLD posture for false or missing opt-in under each campaign.
7. Added a new final-magnet consent-routing section stating that final magnets require literal `subscribe === true` for `newsletter:ai`, never add workflow trigger tags or email-sequence routing from the API branch, and keep non-consented submissions out of newsletter/workflow/send paths.
8. Updated workflow-structure and setup-checklist guidance so HighLevel workflows are draft/approval-gated and never enroll `newsletter:not-consented` records.
9. Updated visible checkbox descriptions to current default-false / optional-opt-in posture and noted the current Tech GC and Founder M&A component paths.
10. Replaced the stale code follow-up to “fix newsletter consent conflict” with a preservation note: keep `newsletter:ai` out of static campaign tags and maintain literal-checkbox-gated tests.

## Verification

Commands run locally:

```bash
npm run test:leads
```

Result: PASS.

Output summary: `API guardrail behavior passed in no-token preview mode: regular and final-magnet consent routing, final magnet scoring, final tags/custom fields, download payload validation, and opt-in-only workflow/newsletter posture.`

Node emitted the existing non-blocking module-type warning for `src/lib/campaigns.ts`; no test failure.

```bash
node tests/verify_lead_magnet_static_guardrails.mjs
```

Result: PASS.

Output summary: `Static lead-magnet guardrail parity passed: four apps have disclaimer gates, unchecked optional marketing consent, report request without opt-in, shared guardrail metadata, compact payload tokens, and no frontend workflow trigger tags.`

## Remaining gates

This documentation update is safe for internal architecture/reference use only. It does not approve live HighLevel configuration, workflow activation, contact mutation, email/SMS/newsletter send, social/ad/public action, Supabase/Clio writes, deployment, or client/prospect-facing use.

Attorney/privacy review remains required before public/live funnel use, especially for checkbox copy, educational-communications consent scope, unsubscribe/preference-center handling, sender/footer requirements, suppression/DND/prior-touch/conflicts checks, and any workflow/email activation.
