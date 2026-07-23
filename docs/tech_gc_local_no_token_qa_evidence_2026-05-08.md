# Tech GC Local / No-Token QA Evidence Matrix

Task: `t_1f54e9b7`
Date: 2026-05-08
Tenant: `whiteford-mountain-west`
Lane: Tech Company Legal Health Checklist / `workflow:tech-gc-launchpad`
Deliverable status: internal QA evidence only; no production activation or external action.

## Safety boundary

This QA pass used local source inspection and npm test/build commands only. It did not use live HighLevel credentials, did not call the HighLevel API, did not create or update CRM records, did not activate workflows, did not enroll contacts, did not send email/SMS/DM/social messages, did not post to LinkedIn, did not write to Supabase/Clio, and did not change production environment settings.

The executable API consent test deletes `GHL_PRIVATE_INTEGRATION_TOKEN` and `GHL_LOCATION_ID` before importing `/api/leads`, so the API route is exercised in no-token preview mode.

## Sources inspected

- `docs/tech_gc_controlled_pilot_morning_decision_checklist_2026-05-07.md`
- `docs/lead_magnet_pilot_hardening_launch_gate_review_2026-05-07.md`
- `src/app/api/leads/route.ts`
- `src/components/tech-gc-legal-health-checklist.tsx`
- `tests/verify_lead_magnet_static_guardrails.mjs`
- `tests/verify_lead_magnet_api_consent.mjs`
- `tests/test_lead_magnet_apps_static.py`
- `package.json`

## Executive verdict

PASS for local/no-token Tech GC QA evidence. The Tech GC lane has source-level disclaimer gating, compact non-confidential input posture, optional unchecked marketing consent, opt-in-only workflow trigger behavior, non-opt-in no-auto-send behavior, and no-token preview behavior verified through the current lead-magnet tests.

Still NOT approved for public production, live HighLevel activation, live HighLevel contact/opportunity writes, workflow enrollment, external sends, public/social publishing, production credential changes, or client/prospect-facing use. Parent launch-gate blockers remain: HighLevel missing custom fields, incomplete executable workflow guard evidence, unresolved non-subscriber fulfillment policy, and Jeff/Whiteford legal/ethics/privacy/copy approvals.

## Tech GC source behavior observed

From `src/components/tech-gc-legal-health-checklist.tsx`:

- Campaign key submitted by the component: `tech-gc`.
- Route submitted to: `/api/leads`.
- Source metadata: `${sourcePage}#lead-magnet` and `website`.
- Disclaimer gate: `submit()` returns before POST unless `disclaimerAccepted` is true.
- UI disabling: company-moment selector, question buttons, and submit button are disabled before disclaimer acceptance.
- Non-confidential language: checklist warns against customer names, employee issues, disputes, contract language, financial details, trade secrets, source code, private diligence requests, and other confidential facts.
- Optional marketing consent: `contact.subscribe` defaults to `false` and the copy states it is optional and unchecked.
- Non-opt-in messaging: when `contact.subscribe` is false, the UI states marketing updates are off and that the checklist request can still be submitted with only transactional handling.
- Compact payload object: `techLegalHealth` sends score, band, company moment, category scores, lowest category, top actions, branch signals, answer tokens, and `tech-legal-health-privacy-guardrail-v2` report version.

From `src/app/api/leads/route.ts`:

- Approved privacy guardrail version: `lead-magnet-guardrail-v2`.
- Approved public form input type: `categorical_non_confidential`.
- Known interactive lead-magnet report requests require `disclaimerAccepted === true`.
- Known interactive lead-magnet report requests require the approved guardrail version.
- If present, `publicFormInputType` must match the categorical non-confidential schema.
- Compact schema validation applies to `contact`, `assessment`, and `techLegalHealth` keys.
- Client-supplied `assessment.tags` are not copied into HighLevel tags.
- Workflow trigger tag is added only when `contact.subscribe === true`.
- Non-opt-in leads receive `newsletter:not-consented`, no workflow trigger tag, consent basis `no_email_opt_in`, approval status `no-auto-send`, and an empty `emailSequence`.
- If no HighLevel token/location is present, route returns `mode: "preview"` and the constructed payload instead of performing a HighLevel upsert.

## Synthetic non-confidential test payload matrix

All payloads below are synthetic and use `.invalid` emails and generic company values. They are intended for local/no-token preview testing only.

| Case | Synthetic payload characteristics | Expected result | Evidence source |
| --- | --- | --- | --- |
| TGC-01: opted-in valid request | `campaignKey: "tech-gc"`, `disclaimerAccepted: true`, `reportRequested: true`, `privacyGuardrailVersion: "lead-magnet-guardrail-v2"`, `publicFormInputType: "categorical_non_confidential"`, `contact.subscribe: true`, email like `test-tech-gc-true@test.invalid`, categorical readiness checks only. | HTTP 200 preview response. Tags include Whiteford/lane tags, `workflow:tech-gc-launchpad`, and `newsletter:ai`. `campaignRouting.triggerTag` is `workflow:tech-gc-launchpad`. `consent_basis` is `lead_magnet_email_opt_in:tech-gc`. `approval_status` is `pending`. Email sequence is present for preview metadata only. | `tests/verify_lead_magnet_api_consent.mjs`, lines 64-70, 111-205. |
| TGC-02: non-opted valid request | Same as TGC-01 except `contact.subscribe: false`. | HTTP 200 preview response. No `workflow:*` tag is present. `campaignRouting.triggerTag` is `null`. Tags include `newsletter:not-consented` and do not include `newsletter:ai`. `consent_basis` is `no_email_opt_in`. `approval_status` is `no-auto-send`. `emailSequence` is empty. | `tests/verify_lead_magnet_api_consent.mjs`, lines 181-199 and 202-207. |
| TGC-03: subscribe omitted | Same as TGC-01 except `contact.subscribe` is omitted. | Treated as non-opt-in. HTTP 200 preview response; no workflow tag; `newsletter:not-consented`; `approval_status = no-auto-send`; empty email sequence. | `tests/verify_lead_magnet_api_consent.mjs`, lines 137-139 and 202-207. |
| TGC-04: disclaimer not accepted | Valid Tech GC request with `disclaimerAccepted: false`. | HTTP 400. Error includes `Disclaimer acceptance is required before requesting an interactive lead-magnet report.` No preview/live HighLevel payload proceeds. | `src/app/api/leads/route.ts`, lines 218-221; `tests/verify_lead_magnet_api_consent.mjs`, lines 225-229. |
| TGC-05: missing guardrail version | Valid Tech GC request with `privacyGuardrailVersion` omitted. | HTTP 400. Error includes approved privacy guardrail version requirement. | `src/app/api/leads/route.ts`, lines 222-224; `tests/verify_lead_magnet_api_consent.mjs`, lines 230-233. |
| TGC-06: wrong guardrail version | Valid Tech GC request with `privacyGuardrailVersion: "client-bypass-v0"`. | HTTP 400. Error includes approved privacy guardrail version requirement. | `src/app/api/leads/route.ts`, lines 222-224; `tests/verify_lead_magnet_api_consent.mjs`, lines 234-237. |
| TGC-07: malicious client tags | Tech GC non-opt-in request with `assessment.tags` containing `workflow:evil`, `client:arbitrary`, `newsletter:ai`, and `leadmagnet:forged`; valid compact `techLegalHealth` object. | HTTP 200 preview response. Forged tags are absent from `payload.tags`; `newsletter:not-consented` is present; no unrelated recommended-offer field is injected. | `tests/verify_lead_magnet_api_consent.mjs`, lines 270-292. |
| TGC-08: wrong public input type | Valid request but `publicFormInputType` is not `categorical_non_confidential`. | HTTP 400. Error includes approved categorical schema requirement. | `src/app/api/leads/route.ts`, lines 225-227. Current shared API test covers this guard at source level but does not have a dedicated Tech GC negative case. |
| TGC-09: overbroad/non-compact Tech GC payload | `techLegalHealth` contains unexpected keys, HTML/newline text, too many array/object fields, non-integer scores, or scores outside 0-100. | HTTP 400. Error: `Payload failed validation: tech legal health payload must use the approved compact schema.` | `src/app/api/leads/route.ts`, lines 173-193 and 261-263. |
| TGC-10: no-token preview | Any valid Tech GC payload while `GHL_PRIVATE_INTEGRATION_TOKEN` or `GHL_LOCATION_ID` is absent. | HTTP 200 `mode: "preview"`; message says to set HighLevel token/location to enable upsert; returns `campaignRouting` and constructed `payload`; no HighLevel upsert is attempted. | `src/app/api/leads/route.ts`, lines 394-401; API test deletes env vars at lines 24-25. |

## Minimal synthetic Tech GC payload examples

### Opted-in valid preview payload

```json
{
  "campaignKey": "tech-gc",
  "sourcePage": "test-tech-gc",
  "sourceChannel": "api-consent-test",
  "disclaimerAccepted": true,
  "reportRequested": true,
  "privacyGuardrailVersion": "lead-magnet-guardrail-v2",
  "publicFormInputType": "categorical_non_confidential",
  "contact": {
    "name": "Ada Lovelace",
    "email": "test-tech-gc-true@test.invalid",
    "company": "Example Test Co",
    "role": "Founder",
    "subscribe": true
  },
  "assessment": {
    "readinessScore": 42,
    "tags": ["workflow:malicious-client-tag", "test:kept"]
  },
  "readinessChecks": ["ip ownership", "contract stack"]
}
```

Expected safe preview behavior: `workflow:tech-gc-launchpad` and `newsletter:ai` are present only because `subscribe` is true; client-supplied workflow/test tags are not copied; `approval_status` remains `pending` and still requires downstream approval before any real external action.

### Non-opted valid preview payload with Tech GC report fields

```json
{
  "campaignKey": "tech-gc",
  "sourcePage": "test-tech-gc",
  "sourceChannel": "api-consent-test",
  "disclaimerAccepted": true,
  "reportRequested": true,
  "privacyGuardrailVersion": "lead-magnet-guardrail-v2",
  "publicFormInputType": "categorical_non_confidential",
  "contact": {
    "name": "Ada Lovelace",
    "email": "test-tech-gc-false@test.invalid",
    "company": "Example Test Co",
    "role": "Founder",
    "subscribe": false
  },
  "assessment": {
    "readinessScore": 66,
    "band": {
      "label": "Operational legal drag",
      "cta": "Tech Company OGC Launchpad"
    },
    "tags": ["workflow:evil", "newsletter:ai", "leadmagnet:forged"]
  },
  "techLegalHealth": {
    "score": 66,
    "band": "Operational legal drag",
    "companyMoment": "enterprise sales motion",
    "categoryScores": { "contracts": 2 },
    "lowestCategory": "Contracts",
    "topActions": ["Standardize sales paper"],
    "branchSignals": ["enterprise-readiness"],
    "answers": ["contracts-basic"],
    "reportVersion": "test"
  }
}
```

Expected safe preview behavior: no workflow tags; no `newsletter:ai`; `newsletter:not-consented` is present; `consent_basis` is `no_email_opt_in`; `approval_status` is `no-auto-send`; `emailSequence` is `[]`.

### Invalid disclaimer payload

```json
{
  "campaignKey": "tech-gc",
  "sourcePage": "test-tech-gc",
  "sourceChannel": "api-consent-test",
  "disclaimerAccepted": false,
  "reportRequested": true,
  "privacyGuardrailVersion": "lead-magnet-guardrail-v2",
  "publicFormInputType": "categorical_non_confidential",
  "contact": {
    "email": "test-tech-gc-disclaimer@test.invalid",
    "subscribe": false
  }
}
```

Expected safe behavior: HTTP 400 and no preview/live HighLevel payload construction past validation.

## Commands executed

All commands were run from `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages`.

| Command | Result | Evidence |
| --- | --- | --- |
| `npm run test:lead-static` | PASS | Output: `Static lead-magnet guardrail parity passed: four apps have disclaimer gates, unchecked optional marketing consent, report request without opt-in, shared guardrail metadata, compact payload tokens, and no frontend workflow trigger tags.` |
| `npm run test:leads` | PASS in no-token preview mode | Output: `API guardrail behavior passed in no-token preview mode: disclaimer/version gates, payload schema rejection, malicious tag stripping, campaign fallback, opt-in-only workflows, and non-opt-in routing.` Existing non-failing Node `MODULE_TYPELESS_PACKAGE_JSON` warning remains. |
| `npm run lint` | PASS | ESLint completed with no reported errors. |
| `npm run build` | PASS | Next.js 16.2.4 compiled successfully. Routes included `/colorado-tech-general-counsel` and dynamic `/api/leads`. Build output noted `.env.local` exists, but no CRM writes or external sends are performed by the build. |

## Guardrail outcome matrix

| Guardrail | Expected local/no-token outcome | Current evidence verdict |
| --- | --- | --- |
| Disclaimer acceptance | Interactive lead-magnet report request is rejected unless disclaimer is accepted. | PASS: frontend blocks submit; API rejects report requests without disclaimer. |
| Approved guardrail version | Interactive lead-magnet report request is rejected unless `lead-magnet-guardrail-v2` is present. | PASS: API negative cases pass. |
| Public form input type | If supplied, must be `categorical_non_confidential`. | PASS by source inspection; add a dedicated API negative case later if this guard changes. |
| Compact schema/data minimization | Contact, assessment, and Tech GC payloads are limited to approved keys and compact values. | PASS by source inspection and shared API tests for schema rejection/malicious tags. |
| Optional marketing consent default | Marketing consent is unchecked by default. | PASS by static test and Tech GC component inspection. |
| Report value without marketing opt-in | Non-opt-in report/checklist request can still be submitted locally; marketing nurture is not required as the price of basic value. | PASS in preview tests for false and missing `subscribe`. |
| Opt-in routing | Workflow trigger tag and email sequence metadata appear only when `subscribe === true`. | PASS: `workflow:tech-gc-launchpad` appears only in opted-in preview metadata. |
| Non-opt-in routing | No workflow tag; `newsletter:not-consented`; `no_email_opt_in`; `approval_status = no-auto-send`; empty sequence. | PASS: API consent test covers false/missing subscribe. |
| Client tag stripping | Client-supplied workflow/newsletter/leadmagnet tags are not trusted. | PASS: malicious Tech GC case strips forged tags. |
| No-token preview behavior | Missing token/location returns preview payload and does not call HighLevel upsert. | PASS: API test deletes env vars and asserts `mode: preview` with undefined `locationId`. |
| HighLevel live writes | Must not occur in this QA pass. | PASS: no live credentials used and no HighLevel API call made. |

## Remaining blockers before anything live or external

- HighLevel custom-field readiness remains blocked until the 31 missing guardrail/mapped Contact custom fields are created through an approved path and read-only verification confirms exact field keys.
- Tech GC workflow guard execution remains unproven beyond partial Draft/Off UI evidence; executable DND, unsubscribe, suppression, approval status, consent-basis, disclaimer/version/input-type, conflicts/adverse-party, and no-send exits must be verified or manually gated before any message step.
- Non-subscriber fulfillment policy remains unresolved. Safe default remains no outbound delivery / no-auto-send unless Jeff approves exact transactional channel, copy, sender/footer, suppression checks, timing, and implementation.
- Legal/ethics/privacy/copy/deliverability review remains required before public-facing copy, email/newsletter assets, or production use.
- Supabase expanded-schema blockers remain out of scope for this local/no-token QA pass.
- A future live Jeff-owned TEST-record smoke test would require a separate approval packet with exact record, environment, time window, rollback, no-send evidence, and suppression/conflicts checks.

## Recommended next action

Jeff can use this matrix to approve or revise the next local-only Tech GC QA scope. The next practical launch-gate decision remains HighLevel field remediation and read-only re-verification; do not proceed to live HighLevel writes, workflow activation, external sends, public publishing, or social/LinkedIn action from this document.
