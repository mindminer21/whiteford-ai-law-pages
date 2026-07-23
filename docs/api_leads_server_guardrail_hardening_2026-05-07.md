# /api/leads Server Guardrail Hardening

Task: `t_b510cddc`
Date: 2026-05-07 05:41 MDT
Status: internal/staging code and QA only. No deploy, HighLevel activation, external send, social action, CRM mutation, Clio write, production env write, or enrollment was performed.

## Summary

Hardened `src/app/api/leads/route.ts` so interactive lead-magnet report requests now require the approved server-side privacy/disclaimer gate before any preview payload or HighLevel upsert path is built. The endpoint now validates compact categorical payload shapes, rejects oversized or unexpected nested objects, and stops accepting client-supplied tags for routing.

## Changed files

- `src/app/api/leads/route.ts`
  - Added approved guardrail constants: `lead-magnet-guardrail-v2` and `categorical_non_confidential`.
  - Added server-side validation before preview/live payload construction.
  - Rejects `reportRequested === true` for known campaigns unless `disclaimerAccepted === true` and `privacyGuardrailVersion` matches the approved version.
  - Enforces compact string limits, score/range checks, array caps, approved object keys, and compact nested values for assessment, AI Compliance, AI Patent, M&A Readiness, and Tech Legal Health payload sections.
  - Adds approved categorical check for AI Patent company stage.
  - Preserves the existing HighLevel preview/live branch behavior while ensuring failed validation returns 400 before the HighLevel upsert branch.
  - Removes client-supplied `assessment.tags` from the contact tag set; only server-derived Whiteford/location, campaign lead-magnet/interest, optional workflow trigger, and newsletter consent tags are used.
- `tests/verify_lead_magnet_api_consent.mjs`
  - Updated positive fixtures to include disclaimer/version/report metadata.
  - Added negative coverage for false disclaimer, missing/wrong guardrail version, oversized/free-text/confidential-looking payload examples, malicious client tags, and non-opt-in routing.
  - Updated tag assertions so arbitrary client tags are discarded, not merely workflow-sanitized.

## Acceptance criteria coverage

1. Disclaimer/version enforcement: covered. Known campaign report requests return 400 unless disclaimer is accepted and the approved guardrail version is present.
2. Per-campaign payload allowlists/schema checks: covered for server-side nested payload sections, compact strings, numeric ranges, arrays, allowed keys, AI Patent stage category, and M&A cleanup-plan caps.
3. Client-supplied tag prevention: covered. The endpoint no longer imports `assessment.tags`; campaign lane/interest tags and opt-in-only workflow tags remain server-derived.
4. Negative tests: covered in `npm run test:leads` for disclaimer, version, payload schema, malicious tags, and non-opt-in workflow behavior.
5. Verification commands: all required commands passed.

## Verification

Run from `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages`:

1. `npm run lint`
   - Result: passed.
2. `npm run test:leads`
   - Result: passed in no-token preview mode.
   - Coverage message: disclaimer/version gates, payload schema rejection, malicious tag stripping, campaign fallback, opt-in-only workflows, and non-opt-in routing.
   - Existing warning remains: Node module type warning for TypeScript route import in the test harness.
3. `npm run build`
   - Result: passed. Next.js 16.2.4 compiled and generated the expected static routes plus dynamic `/api/leads`.

## Safety notes

- No external/public action was performed.
- No HighLevel API call was made by this worker; tests run with `GHL_PRIVATE_INTEGRATION_TOKEN` and `GHL_LOCATION_ID` deleted for preview mode.
- No live CRM contact/opportunity was created or mutated.
- No workflow, campaign, email, SMS, DM, social post, ad, enrollment, or Clio action was activated or sent.
- Production/public pilot remains blocked pending Jeff/Whiteford approval of exact copy, live HighLevel field/workflow evidence, non-subscriber transactional handling, and any production env enablement.

## Remaining launch-gate considerations

- AI Compliance frontend/test parity was not expanded in this task beyond API acceptance fixtures. The endpoint now protects the API path, but Jeff/Whiteford still need approval before any public pilot or live HighLevel mutation path.
- HighLevel custom fields and workflow suppression/DND/unsubscribe gates still require live UI verification before activation.
- Non-subscriber report delivery policy remains unresolved; the API continues to mark non-opted report requests as `Approval Status = no-auto-send` with `newsletter:not-consented` and no workflow trigger tag.
