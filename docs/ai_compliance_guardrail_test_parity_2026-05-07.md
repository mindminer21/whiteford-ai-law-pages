# AI Compliance Guardrail / Test Parity Repair

Task: `t_7b55f4e0`
Completed at: 2026-05-07 05:48 MDT
Status: internal/local code and QA only. No external/public action, email/SMS/DM/social send, workflow activation, contact enrollment, CRM mutation, production env write, Clio write, or public/client-facing publication was performed.

## Decision

AI Compliance adopts the shared `lead-magnet-guardrail-v2` metadata and compact payload convention rather than downgrading the benchmark to the older intentional payload.

Rationale:
- The server-hardening parent now enforces `lead-magnet-guardrail-v2` and compact categorical payloads before interactive report requests.
- AI Patent, Tech GC, and Founder M&A already submit shared `privacyGuardrailVersion`, `publicFormInputType`, `disclaimerAccepted`, and `reportRequested` fields.
- Keeping AI Compliance on the older `ai-compliance-gameplan-privacy-guardrail-v1` payload would preserve drift in the benchmark app and weaken static QA coverage.

## Code/test changes

- `src/components/gameplan-builder.tsx`
  - Imports shared guardrail metadata/constants from `src/components/lead-magnet-guardrails.tsx`.
  - Submits `disclaimerAccepted`, `reportRequested: true`, `privacyGuardrailVersion`, and `publicFormInputType` with AI Compliance report requests.
  - Updates `aiComplianceGameplan.reportVersion` to `ai-compliance-gameplan-privacy-guardrail-v2`.
  - Adds compact AI Compliance payload fields: `categoryScores`, `topGaps`, `recommendedNextStep`, `readinessHeatMap`, `tenDayFixes`, and `roadmap306090`.

- `tests/verify_lead_magnet_static_guardrails.mjs`
  - New npm-accessible static harness for all four interactive lead magnets.
  - Covers disclaimer gate tokens, submit/report request without marketing opt-in, optional marketing consent defaulting unchecked, shared guardrail version/input-type metadata, compact payload tokens, and absence of frontend hard-coded workflow trigger tags.

- `package.json`
  - Adds `npm run test:lead-static` for the static harness.

- `tests/test_lead_magnet_apps_static.py`
  - Updates the legacy Python static assertions so direct execution matches the adopted AI Compliance v2 payload and current Founder M&A source-page hash.
  - This remains usable by direct Python execution; the new npm script is the documented runnable path that does not depend on missing `pytest`.

## Regression coverage matrix

| App | Disclaimer gate | Optional marketing unchecked | Report request allowed without marketing opt-in | Guardrail version/input type | Compact payload shape | Opt-in-only workflow tags |
| --- | --- | --- | --- | --- | --- | --- |
| AI Compliance Gameplan | Static harness + component gate | Static harness checks `subscribe: false` | Static harness checks `!contact.subscribe`; API preview test covers non-opt-in routing | `lead-magnet-guardrail-v2` + `categorical_non_confidential` | `readinessHeatMap`, `tenDayFixes`, `roadmap306090`, top gaps, category scores | API test confirms trigger tag only when `subscribe === true`; static harness confirms no frontend workflow tag literals |
| AI Patent Strategy Scorecard | Static harness + component gate | Static harness checks `subscribe: false` | Static harness checks `!contact.subscribe`; API preview test covers non-opt-in routing | Shared v2 metadata | patent payload, documentation gap map, ownership gap map, recommended next step | API opt-in-only routing + no frontend workflow tag literals |
| Tech Company Legal Health Checklist | Static harness + component gate | Static harness checks `subscribe: false` | Static harness checks `!contact.subscribe`; API preview test covers non-opt-in routing | Shared v2 metadata | `techLegalHealth` category scores, branch signals, answers | API opt-in-only routing + no frontend workflow tag literals |
| Founder M&A Readiness Checklist | Static harness + component gate | Static harness checks `subscribe: false` | Static harness checks `!contact.subscribe`; API preview test covers non-opt-in routing | Shared v2 metadata | M&A risk map, 60-day cleanup plan, answers | API opt-in-only routing + no frontend workflow tag literals |

## Verification run

Run from `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages`:

1. `npm run test:lead-static`
   - Result: passed.
   - Evidence: four-app static parity harness passed for disclaimer gates, unchecked optional consent, report request without opt-in, shared metadata, compact payload tokens, and no frontend workflow tags.

2. Direct legacy Python static assertions:
   - Command: `python3 - <<'PY' ... import tests.test_lead_magnet_apps_static ... PY`
   - Result: passed.
   - Purpose: proves the legacy parity assertions are no longer drifted even without `pytest`.

3. `npm run test:leads`
   - Result: passed in no-token preview mode.
   - Note: existing Node `MODULE_TYPELESS_PACKAGE_JSON` warning remains; it does not fail the test.

4. `npm run lint`
   - Result: passed.

5. `npm run build`
   - Result: passed. Next.js compiled and generated expected routes, including `/ai-compliance-gameplan`, `/api/leads`, `/ai-patent-strategy-scorecard`, `/founder-ma-readiness-checklist`, and `/colorado-tech-general-counsel`.

## Remaining launch gates

This task repairs AI Compliance/test parity only. Public pilot or production activation still requires Jeff/Whiteford approval of exact public copy, HighLevel custom-field/workflow evidence, non-subscriber transactional-delivery policy, suppression/DND/unsubscribe handling, and any live CRM mutation path.
