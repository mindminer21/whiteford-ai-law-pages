# Final-Magnet Consent Routing Fix Report — 2026-05-19

Task: `t_a69dbfc6`
Status: local/private no-mutation QA and source/test fix packet only.

## No-live-action verification

This work stayed inside the local repository at `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages`.

No email, SMS, DM, newsletter, LinkedIn/social post, ad, workflow activation, workflow enrollment, HighLevel/CRM/Supabase/Clio mutation, prospect contact, public deployment, or production credential use was performed.

The deterministic API test explicitly deletes `GHL_PRIVATE_INTEGRATION_TOKEN` and `GHL_LOCATION_ID`, so `/api/leads` runs in no-token preview mode during the consent assertions.

## Files inspected

- `docs/decision-packets/2026-05-19_morning_action_brief.md` — Decision box 6 identified the final-magnet branch as appending `newsletter:ai` unconditionally.
- `docs/reviews/2026-05-19_morning_action_command_deck_review.md` — Finding 5 confirmed final-magnet consent handling should remain a QA/fix lane before HighLevel/nurture use.
- `docs/lead_magnet_opt_in_and_app_strategy.md` — Controlling opt-in rule: workflow/newsletter routing only after affirmative opt-in; non-opted records require `newsletter:not-consented`, `Consent Basis = no_email_opt_in`, and `Approval Status = no-auto-send`.
- `docs/lead_api_opt_in_gating_audit_t_f4abf859.md` — Baseline regular `/api/leads` behavior and test cases for opt-in-only workflow routing.
- `src/app/api/leads/route.ts` — Regular and final-magnet API branches.
- `src/components/lead-magnet-flow.tsx` — Final-magnet browser submission payloads.
- `tests/verify_lead_magnet_api_consent.mjs` — No-token preview-mode consent and static API assertions.
- `docs/KANBAN_DELIVERABLE_INDEX.md` — Human-facing deliverable index updated for this report.

## Files changed

- `src/app/api/leads/route.ts`
  - Added `subscribe?: unknown` to the final-magnet payload type.
  - Set `hasEmailOptIn` only when `payload.subscribe === true`.
  - Changed final-magnet tags from unconditional `newsletter:ai` to:
    - `newsletter:ai` only when `subscribe === true`.
    - `newsletter:not-consented` otherwise.
  - Added final-magnet `consent_basis` custom field:
    - `lead_magnet_email_opt_in:<magnet_slug>` when opted in.
    - `no_email_opt_in` otherwise.
  - Added final-magnet `approval_status` custom field:
    - `pending` when opted in.
    - `no-auto-send` otherwise.
  - Added final-magnet `campaignRouting` preview metadata confirming no workflow trigger tag and no email sequence routing.
- `src/components/lead-magnet-flow.tsx`
  - Added `subscribe: contact.permissionAcknowledged` to assessment and download final-magnet browser submission payloads so existing explicit permission-checkbox submissions remain opted in.
- `tests/verify_lead_magnet_api_consent.mjs`
  - Added final-magnet consent assertions for opted-in, false, and missing `subscribe` states across all four final magnets.
  - Verified final-magnet non-opted preview payloads exclude `newsletter:ai`, all `workflow:*` tags, and email-sequence routing.
  - Verified final-magnet opted-in preview payloads include `newsletter:ai` and the correct `lead_magnet_email_opt_in:<magnet_slug>` consent basis, while still excluding workflow trigger tags and email-sequence routing.
- `docs/lead-magnets/2026-05-19_final_magnet_consent_routing_fix_report.md`
  - This report.
- `docs/KANBAN_DELIVERABLE_INDEX.md`
  - Added the `t_a69dbfc6` deliverable entry.

## Test matrix

| Path | Scenario | Expected consent/routing posture | Result |
| --- | --- | --- | --- |
| Regular `/api/leads` | `campaignKey=ai-compliance`, `contact.subscribe=true` | `newsletter:ai`, `workflow:ai-compliance-readiness`, `consent_basis=lead_magnet_email_opt_in:ai-compliance`, `approval_status=pending`, 4-email preview sequence | PASS |
| Regular `/api/leads` | `campaignKey=ai-compliance`, `contact.subscribe=false` or missing | `newsletter:not-consented`, no `newsletter:ai`, no `workflow:*`, `consent_basis=no_email_opt_in`, `approval_status=no-auto-send`, empty email sequence | PASS |
| Regular `/api/leads` | `campaignKey=ai-patent`, `contact.subscribe=true` | `newsletter:ai`, `workflow:ai-patent-strategy`, `consent_basis=lead_magnet_email_opt_in:ai-patent`, `approval_status=pending`, 4-email preview sequence | PASS |
| Regular `/api/leads` | `campaignKey=ai-patent`, `contact.subscribe=false` or missing | `newsletter:not-consented`, no `newsletter:ai`, no `workflow:*`, `consent_basis=no_email_opt_in`, `approval_status=no-auto-send`, empty email sequence | PASS |
| Regular `/api/leads` | `campaignKey=tech-gc`, `contact.subscribe=true` | `newsletter:ai`, `workflow:tech-gc-launchpad`, `consent_basis=lead_magnet_email_opt_in:tech-gc`, `approval_status=pending`, 4-email preview sequence | PASS |
| Regular `/api/leads` | `campaignKey=tech-gc`, `contact.subscribe=false` or missing | `newsletter:not-consented`, no `newsletter:ai`, no `workflow:*`, `consent_basis=no_email_opt_in`, `approval_status=no-auto-send`, empty email sequence | PASS |
| Regular `/api/leads` | `campaignKey=ma-readiness`, `contact.subscribe=true` | `newsletter:ai`, `workflow:ma-readiness`, `consent_basis=lead_magnet_email_opt_in:ma-readiness`, `approval_status=pending`, 4-email preview sequence | PASS |
| Regular `/api/leads` | `campaignKey=ma-readiness`, `contact.subscribe=false` or missing | `newsletter:not-consented`, no `newsletter:ai`, no `workflow:*`, `consent_basis=no_email_opt_in`, `approval_status=no-auto-send`, empty email sequence | PASS |
| Final magnet | `magnet_slug=ai-risk-triage`, `subscribe=true` | `newsletter:ai`, `consent_basis=lead_magnet_email_opt_in:ai-risk-triage`, `approval_status=pending`, no `workflow:*`, no email sequence | PASS |
| Final magnet | `magnet_slug=ai-risk-triage`, `subscribe=false` or missing | `newsletter:not-consented`, `consent_basis=no_email_opt_in`, `approval_status=no-auto-send`, no `newsletter:ai`, no `workflow:*`, no email sequence | PASS |
| Final magnet | `magnet_slug=patent-moat-scorecard`, `subscribe=true` | `newsletter:ai`, `consent_basis=lead_magnet_email_opt_in:patent-moat-scorecard`, `approval_status=pending`, no `workflow:*`, no email sequence | PASS |
| Final magnet | `magnet_slug=patent-moat-scorecard`, `subscribe=false` or missing | `newsletter:not-consented`, `consent_basis=no_email_opt_in`, `approval_status=no-auto-send`, no `newsletter:ai`, no `workflow:*`, no email sequence | PASS |
| Final magnet | `magnet_slug=governance-plan`, `subscribe=true` | `newsletter:ai`, `consent_basis=lead_magnet_email_opt_in:governance-plan`, `approval_status=pending`, no `workflow:*`, no email sequence | PASS |
| Final magnet | `magnet_slug=governance-plan`, `subscribe=false` or missing | `newsletter:not-consented`, `consent_basis=no_email_opt_in`, `approval_status=no-auto-send`, no `newsletter:ai`, no `workflow:*`, no email sequence | PASS |
| Final magnet | `magnet_slug=outside-counsel-playbook`, `subscribe=true` | `newsletter:ai`, `consent_basis=lead_magnet_email_opt_in:outside-counsel-playbook`, `approval_status=pending`, no `workflow:*`, no email sequence | PASS |
| Final magnet | `magnet_slug=outside-counsel-playbook`, `subscribe=false` or missing | `newsletter:not-consented`, `consent_basis=no_email_opt_in`, `approval_status=no-auto-send`, no `newsletter:ai`, no `workflow:*`, no email sequence | PASS |

## Local checks executed

- `npm run test:leads` — PASS.
  - Output: `API guardrail behavior passed in no-token preview mode: regular and final-magnet consent routing, final magnet scoring, final tags/custom fields, download payload validation, and opt-in-only workflow/newsletter posture.`
  - Node emitted a non-blocking module-type warning already unrelated to the consent fix.
- `npm run lint` — PASS with 15 pre-existing `@next/next/no-img-element` warnings and 0 errors.

## Remaining attorney/privacy review items

- The final-magnet checkbox copy currently combines delivery permission and related educational communications: `I agree that Whiteford/Schell IP may send me the requested report or playbook and related educational communications.` Attorney/privacy review should confirm this is sufficient for the intended email follow-up posture before any public/live funnel use.
- Final-magnet routes now support non-opted direct API submissions safely, but the browser UI still requires the permission checkbox before submission. If Jeff wants non-opted browser users to receive on-page/PDF value without email consent while being captured as `newsletter:not-consented`, that is a separate product/privacy decision.
- Final-magnet opted-in records still do not receive `workflow:*` trigger tags or email-sequence routing from this API branch. Any future final-magnet automation should be implemented only after exact workflow, unsubscribe/preference, footer/sender, suppression/DND, conflicts/prior-touch, and attorney-review gates are approved.

## Conclusion

The reported final-magnet QA gap is fixed locally: non-opted final-magnet submissions no longer receive `newsletter:ai`, workflow trigger tags, email sequence routing, or auto-send status, and opted-in final-magnet submissions receive the lane magnet tags plus `newsletter:ai` and explicit opt-in consent basis only after `subscribe === true`.
