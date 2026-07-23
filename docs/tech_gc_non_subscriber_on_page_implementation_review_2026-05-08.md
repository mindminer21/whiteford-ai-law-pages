# Tech GC Non-Subscriber On-Page Implementation Review

Task: `t_5a14c43d`
Parent implementation: `t_b211cad5`
Date: 2026-05-08
Tenant: `whiteford-mountain-west`
Scope: internal/local QA review only. No deployment, HighLevel/Supabase/CRM/Clio mutation, workflow activation, contact enrollment, send, social/LinkedIn action, or public-use authorization was performed.

## Verdict

PASS for internal/local QA only.

HOLD for public launch, live HighLevel operation, workflow activation, CRM production use, external delivery, and any attorney-client/privacy-relevant public representation until the approvals listed below are complete.

## Acceptance-criteria review

| Criterion | Result | Evidence |
| --- | --- | --- |
| Implementation deliverable exists | PASS | `docs/tech_gc_non_subscriber_on_page_implementation_2026-05-08.md` exists and documents local/staging-only status, changed files, opt-in separation, verification, and next action. |
| `docs/KANBAN_DELIVERABLE_INDEX.md` updated | PASS | Index includes row `t_b211cad5` for `docs/tech_gc_non_subscriber_on_page_implementation_2026-05-08.md`. |
| Opt-in separation inspected | PASS for internal/local QA | `src/components/tech-gc-legal-health-checklist.tsx` defaults `contact.subscribe` to `false`, uses affirmative checkbox copy, branches success copy by `contact.subscribe`, and leaves the browser result visible without requiring marketing opt-in. `/api/leads` derives `hasEmailOptIn` only from `payload.contact?.subscribe === true`. |
| No-confidential-info/legal caveats inspected | PASS for internal/local QA | The component includes no-confidential-information warnings before intake, per-question categorical-answer warnings, disclaimer acceptance, report-page warning, conflicts/engagement caveat, final-submit warning, and educational/not-legal-advice/no-attorney-client copy. |
| No workflow tag leakage on no-opt-in path | PASS based on static/API checks | Frontend static test asserts no hard-coded `workflow:*` trigger tags. API route only adds `campaign.triggerTag` when `hasEmailOptIn` is true, sets `campaignRouting.triggerTag` to `null` when false, returns `emailSequence: []` when false, and the API test reports malicious/client tags are stripped. |
| Local checks confirmed | PASS with one non-blocking warning | `npm run test:lead-static && npm run test:leads && npm run lint && npm run build` passed locally. The API test emitted the known Node module-type warning for `src/lib/campaigns.ts`; it did not fail. |

## Code-review notes

1. Browser-only value is present before nurture.
   - The right-side result card now gives an overall readiness band, category scores, top category gaps, suggested first cleanup workstream, 10-day operating action, optional next-step resources, recommended service path, and print/save PDF path.
   - The page tells non-opted users they can use the browser result without joining an email sequence.

2. Optional email path remains consent-gated in the UI.
   - `contact.subscribe` defaults to `false`.
   - Checkbox text is affirmative: “Yes, send me the Tech Company Legal Health Checklist report and related educational emails.”
   - The submit button changes from `Save no-email result state` to `Send the full report by email` only when the checkbox is checked.

3. Server-side workflow gating still protects workflow tags.
   - Non-opt-in path receives `newsletter:not-consented`, `consent_basis = no_email_opt_in`, `approval_status = no-auto-send`, `campaignRouting.triggerTag = null`, and `emailSequence = []`.
   - The route builds the workflow trigger tag from server campaign config only, never from client-supplied `assessment.tags`.

4. Review caution for Jeff/legal/privacy before production.
   - The component copy says the non-opted result remains “on this page only” and no outbound follow-up is triggered. That is accurate for email/workflow/outbound messaging, but if production credentials are configured and a non-opted user enters email and clicks `Save no-email result state`, `/api/leads` can still upsert a non-consented HighLevel contact with lead-magnet/interest tags and no-auto-send fields. This is not workflow tag leakage, but Jeff/legal/privacy should decide whether the public non-subscriber path should allow this CRM record creation or should keep non-opted browser-only users entirely out of HighLevel unless they affirmatively opt in.

## Local checks run by reviewer

Command run from `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages`:

```bash
npm run test:lead-static && npm run test:leads && npm run lint && npm run build
```

Result: PASS.

Relevant output:

```text
Static lead-magnet guardrail parity passed: four apps have disclaimer gates, unchecked optional marketing consent, report request without opt-in, shared guardrail metadata, compact payload tokens, and no frontend workflow trigger tags.
API guardrail behavior passed in no-token preview mode: disclaimer/version gates, payload schema rejection, malicious tag stripping, campaign fallback, opt-in-only workflows, and non-opt-in routing.
✓ Compiled successfully
✓ Generating static pages using 13 workers (12/12)
○ /colorado-tech-general-counsel
ƒ /api/leads
```

Non-blocking warning:

```text
[MODULE_TYPELESS_PACKAGE_JSON] Warning: Module type of file .../src/lib/campaigns.ts is not specified and it doesn't parse as CommonJS.
```

## Unresolved approvals and launch blockers

These remain unresolved and are required before any public/live/external use:

1. Jeff approval of the exact Tech GC non-subscriber UI copy and behavior.
2. Legal/ethics approval of educational-only, no-legal-advice, no-attorney-client, conflicts/engagement, source-current, and no-confidential-information language.
3. Privacy approval of the non-opted browser-only path, especially whether a non-opted user who enters an email may be upserted to HighLevel as `newsletter:not-consented` / `no-auto-send`, or whether non-opted users should stay entirely local/browser-only.
4. HighLevel approval and verification that Tech GC workflow remains Draft/Off until activation is expressly approved.
5. HighLevel custom-field remediation/verification for the guardrail v2 fields before relying on live CRM metadata.
6. Public-launch approval for the page route, production environment variables, and final URL/CTA destinations.
7. Controlled-pilot approval defining exact Jeff-owned test records, channel, timing, suppression/conflicts status, rollback, and evidence capture.
8. External-action approval before any email, SMS, DM, LinkedIn/social post, workflow enrollment, campaign activation, CRM stage movement, Supabase/Clio action, or other outbound follow-up.

## Reviewer conclusion

The parent implementation satisfies the internal/local QA goal: non-opted Tech GC users receive useful on-page educational value, the optional email path is visibly separated, legal/privacy caveats are present, and local static/API/lint/build checks pass with no workflow tag leakage on the no-opt-in path. Keep the work in internal/local QA until Jeff/legal/privacy/HighLevel/public-launch approvals explicitly resolve the live CRM and external-use gates above.
