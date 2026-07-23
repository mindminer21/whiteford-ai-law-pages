# Lead Magnet Privacy / Consent Guardrail Parity Patch

Task: `t_d36fd046`
Date: 2026-05-07
Status: internal/staging code patch only. No deploy, HighLevel workflow activation, email/SMS/DM/social send, enrollment, live contact/opportunity mutation, LinkedIn action, or Clio write was performed.

## Summary

Implemented frontend and API hardening so AI Patent Strategy Scorecard, Founder M&A Readiness Checklist, and Tech Company Legal Health Checklist match the AI Compliance Gameplan guardrail posture where appropriate.

The patch keeps lead magnets useful before marketing opt-in, separates report requests from optional educational-email consent, adds explicit no-confidential-information gates, and preserves `/api/leads` workflow-tag stripping unless `contact.subscribe === true`.

## Changed files

- `src/components/lead-magnet-guardrails.tsx`
  - Added shared guardrail constants/components: `privacyGuardrailVersion`, `publicFormInputType`, role-category options, source-current notice, conflicts/written-engagement caveat, and reusable `GuardrailNotice`.
- `src/components/patent-scorecard.tsx`
  - Added pre-question no-confidential-information notice, required disclaimer checkbox, disabled intake controls until the gate is accepted, role-category enum, source-current and conflicts caveats, unchecked optional marketing consent, transactional report-request copy, print/save path, report/version payload metadata, and submit enablement without requiring marketing opt-in.
- `src/components/founder-ma-readiness-checklist.tsx`
  - Added no-confidential-transaction-information guardrails, required disclaimer checkbox, disabled intake controls until accepted, safer timing enum, “diligence friction map” language, source-current and conflicts caveats, role-category enum, unchecked optional marketing consent, report/version payload metadata, and submit enablement without requiring marketing opt-in.
- `src/components/tech-gc-legal-health-checklist.tsx`
  - Added no-confidential/sensitive-facts guardrails, required disclaimer checkbox, disabled intake controls until accepted, source-current and conflicts caveats, role-category enum, unchecked optional marketing consent, safer success copy, branch-signal note that no other workflow enrollment occurs, and a minimized `techLegalHealth` payload.
- `src/components/quick-lead-form.tsx`
  - Updated fallback consent/success/disclaimer copy to identify Whiteford/Schell IP, unsubscribe availability, no-confidential-information, no legal advice, no attorney-client relationship, and conflicts/written-engagement caveat.
  - Added a required educational/no-confidential/no-attorney-client acknowledgment and allowed fallback lead-magnet requests without requiring optional marketing opt-in.
- `src/components/landing.tsx`
  - Replaced generic M&A QuickLeadForm capture on `/colorado-startup-ma-lawyer` with links to the guarded `/founder-ma-readiness-checklist#checklist` flow.
  - Updated fallback HighLevel copy to emphasize consent-gated tags rather than automatic nurture triggering.
- `src/app/api/leads/route.ts`
  - Added shared custom-field mapping for `privacy_guardrail_version`, `public_form_input_type`, `disclaimer_acknowledged`, and `report_requested`.
  - Added app-specific version/guardrail fields for AI Patent and M&A.
  - Added dedicated `tech_legal_health_*` custom fields so Tech GC no longer needs to overload AI use-case/readiness fields.
  - Preserved workflow-tag sanitizer and opt-in-only workflow tag/email-sequence gating.

## Acceptance criteria coverage

- No-confidential-information warnings: added before intake, near results/report request, and in final-submit copy for AI Patent, Founder M&A, Tech GC, plus stronger QuickLeadForm fallback copy.
- Educational / non-advice / no attorney-client relationship language: added or strengthened across all three lead magnets and fallback form.
- Source-current / conflicts caveats: added shared source-current notice and conflicts/written-engagement caveat to all three patched interactive lead magnets.
- Unchecked optional marketing consent separated from transactional report request: all three patched lead magnets keep `subscribe: false` by default and allow request submission with email + disclaimer gate even when marketing updates remain unchecked.
- Minimized frontend payload: patched apps send compact scores, bands, enum/category values, answer keys, top gaps/actions, report version, and guardrail metadata instead of open-text legal facts.
- No default opt-in: all patched contact state objects initialize `subscribe: false`; QuickLeadForm also remains unchecked by default.
- `/api/leads` still strips workflow tags unless `subscribe === true`: verified by `npm run test:leads` in no-token preview mode.

## Verification

Commands run from `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages`:

1. `npm run lint`
   - Result: passed.
2. `npm run test:leads`
   - Result: passed.
   - Coverage: 4 campaigns x opted-in/non-opted/missing subscribe, malicious workflow tags, invalid campaign fallback, expected email sequence lengths, and no workflow tags without opt-in.
   - Note: Node emitted an existing module-type warning for TypeScript route import in the test harness; test passed.
3. `npm run build`
   - Result: passed.
   - Next.js 16.2.4 compiled, TypeScript passed, and static routes generated.

## Safety / external side effects

- No HighLevel API call was made by this worker.
- No live CRM record was created or changed.
- No workflow, campaign, sequence, newsletter, social post, ad, LinkedIn action, email, SMS, DM, or enrollment was activated or sent.
- No Clio write was performed.
- Changes are local/staging code and documentation only.

## Jeff approval notes

Before public deployment or HighLevel activation, Jeff/Whiteford should review:

1. Exact public-facing disclaimer and conflicts copy.
2. Whether transactional report delivery should send an email when `subscribe === false`, or remain only as an on-page/preview report request until separate transactional-email rules are approved.
3. HighLevel custom-field existence/mapping for the new `privacy_guardrail_version`, `public_form_input_type`, `disclaimer_acknowledged`, `report_requested`, `ai_patent_*_guardrail_version`, `ma_readiness_*_guardrail_version`, and `tech_legal_health_*` fields.
4. Whether `/api/leads` should hard-reject interactive report requests missing `disclaimerAccepted === true` in a later server-hardening task; this patch records the field and gates the current frontend.
