# Tech GC Synthetic No-Token QA Fixture Bundle — 2026-05-10

Task: `t_cd533490`
Tenant: `whiteford-mountain-west`
Status: INTERNAL LOCAL FIXTURE BUNDLE ONLY. Prepared but not executed. This document does not approve live HighLevel, CRM, Supabase, Clio, workflow, send, public publish, social, ad, or external action.

## 1. Purpose and boundary

This bundle turns the Tech Company Legal Health Checklist local/no-token QA harness into a stable set of synthetic `.invalid` payloads and expected outcomes for a later Box A QA execution, if and only if Jeff approves that run.

Controlling boundary:

- Use local/no-token execution only.
- Use only synthetic `.invalid` emails and generic company/person names.
- Do not use real prospects, clients, researched leads, contact imports, LinkedIn data, CRM records, or third-party personal data.
- Do not set or use HighLevel, Supabase, Clio, CRM, send, social, ad, or production credentials.
- Do not mutate HighLevel/CRM/Supabase/Clio, activate/test/start workflows, enroll contacts, send emails/SMS/DMs, post or tag/comment/message on social, launch ads, publish pages, or run Supabase DDL/sync.
- This packet prepares checks and fixture data only; it does not run the QA harness or authorize any live-system test.

## 2. Source anchors reviewed

- `src/app/colorado-tech-general-counsel/page.tsx`
  - Confirms the public route renders the shared offer landing page for `colorado-tech-general-counsel`.
- `src/components/tech-gc-legal-health-checklist.tsx`
  - Confirms the Tech GC checklist uses non-confidential categorical questions, an explicit disclaimer gate, default-unchecked optional email opt-in, browser-visible value, no-email/no-nurture copy for non-opted users, `campaignKey: "tech-gc"`, `privacyGuardrailVersion`, `publicFormInputType`, and compact `techLegalHealth` payload fields.
- `src/app/api/leads/route.ts`
  - Confirms server-side validation for disclaimer acceptance, approved guardrail version, categorical input type, compact object schemas, stripped client-supplied tags, no-token preview mode, opt-in-only workflow trigger tag, and non-opted `no-auto-send` approval status.
- `src/lib/campaigns.ts`
  - Confirms Tech GC campaign routing metadata: `workflow:tech-gc-launchpad`, `leadmagnet:tech-gc-checklist`, `interest:tech-ogc`, recommended offer `Tech Company OGC Launchpad`, and four preview email-sequence metadata objects when opted in.
- `tests/verify_lead_magnet_api_consent.mjs`
  - Confirms the existing no-token API test deletes `GHL_PRIVATE_INTEGRATION_TOKEN` and `GHL_LOCATION_ID`, asserts preview mode, opt-in-only workflow tags, non-opted routing, malicious tag stripping, and negative guardrail cases.
- `tests/verify_lead_magnet_static_guardrails.mjs`
  - Confirms static parity checks for disclaimer gate, unchecked marketing consent, compact payload metadata, no frontend workflow trigger tags, and Tech GC browser-only/no-outbound copy tokens.
- `docs/controlled-pilot/tech_gc_local_no_token_qa_harness_plan_2026-05-09.md`
  - Provides the controlling no-token harness plan, stop conditions, evidence folder map, pass/fail matrix, and approval language.

## 3. Local fixture artifacts prepared

Primary machine-readable fixture file:

```text
docs/controlled-pilot/evidence/2026-05-10-fixtures/tech_gc_synthetic_no_token_payloads_2026-05-10.json
```

This JSON is intentionally local documentation/fixture data, not an execution script. It contains:

- shared run posture: prepared-not-executed, local/no-token/synthetic-only;
- approved guardrail constants: `lead-magnet-guardrail-v2` and `categorical_non_confidential`;
- Tech GC campaign key and local fixture source metadata;
- full payloads for TGC-01 and TGC-02;
- mutation-based fixture specifications for TGC-03 through TGC-08D;
- expected status codes, mode, tags, routing, custom fields, and error-message fragments.

## 4. Fixture inventory

| ID | Fixture | Payload posture | Expected outcome |
| --- | --- | --- | --- |
| TGC-01 | Opted-in valid preview payload | `subscribe: true`, disclaimer accepted, approved guardrail/version/input metadata, compact Tech GC payload, synthetic `.invalid` email | HTTP 200, `mode: "preview"`, no `locationId`, server-derived Tech GC tags, `workflow:tech-gc-launchpad`, `newsletter:ai`, four email-sequence metadata entries, `consent_basis = lead_magnet_email_opt_in:tech-gc`, `approval_status = pending`, forged client tags stripped |
| TGC-02 | Non-opted valid preview payload | `subscribe: false`, browser-only/no-send posture, forged client tags included for sanitizer check | HTTP 200, `mode: "preview"`, no workflow tag, `campaignRouting.triggerTag = null`, empty email sequence, `newsletter:not-consented`, no `newsletter:ai`, `consent_basis = no_email_opt_in`, `approval_status = no-auto-send`, forged client tags stripped |
| TGC-03 | Subscribe omitted | Same as TGC-02 but `contact.subscribe` absent | Treated as non-opted: HTTP 200 preview, no workflow tag, empty email sequence, `newsletter:not-consented`, no `newsletter:ai`, no-auto-send custom fields |
| TGC-04 | Disclaimer not accepted | Same as TGC-02 but `disclaimerAccepted: false` | HTTP 400 with disclaimer-required error; payload must not proceed to preview/live routing |
| TGC-05A | Missing guardrail version | Same as TGC-02 but `privacyGuardrailVersion` absent | HTTP 400 with approved privacy guardrail version error |
| TGC-05B | Wrong guardrail version | Same as TGC-02 but `privacyGuardrailVersion: "client-bypass-v0"` | HTTP 400 with approved privacy guardrail version error |
| TGC-06 | Wrong public input type | Same as TGC-02 but `publicFormInputType: "free_text_confidential"` | HTTP 400 with approved categorical schema error |
| TGC-07 | Malicious client tags | Same as TGC-02 but `assessment.tags` includes forged workflow/newsletter/leadmagnet/client tags | HTTP 200 preview; forged tags absent; `newsletter:not-consented` present; no workflow trigger or email sequence |
| TGC-08A | Unexpected Tech GC payload key | Same as TGC-02 but add `techLegalHealth.confidentialNarrative` | HTTP 400 with compact Tech GC schema error |
| TGC-08B | HTML Tech GC payload | Same as TGC-02 but set `techLegalHealth.lowestCategory` to an HTML/script-like string | HTTP 400 with compact Tech GC schema error |
| TGC-08C | Out-of-range score | Same as TGC-02 but set `techLegalHealth.score = 101` | HTTP 400 with compact Tech GC schema error |
| TGC-08D | Oversized array | Same as TGC-02 but set `techLegalHealth.topActions` to 13 compact strings | HTTP 400 with compact Tech GC schema error |

## 5. Prepared pass/fail checks, not executed

The later Box A QA run can use this fixture bundle to evaluate the following checks. They are prepared only; this task did not execute them.

| Check | Prepared evidence target | Pass condition |
| --- | --- | --- |
| P-01 No-token posture | `logs/test-leads.txt`, API response captures | Token env removed; all valid API cases return `mode: "preview"`; `payload.locationId` is undefined; no live upsert branch is reached |
| P-02 Static frontend guardrail parity | `logs/test-lead-static.txt` | Static test confirms disclaimer gates, unchecked optional consent, compact payload metadata, no frontend workflow tags, and no-email/no-nurture copy |
| P-03 Opted-in routing preview | `api/opted-in-preview-response.json` | TGC-01 returns preview with Tech GC workflow tag and newsletter opt-in tag only because `subscribe: true` |
| P-04 Non-opted routing | `api/non-opted-preview-response.json` | TGC-02 returns preview with no workflow tag, empty email sequence, `newsletter:not-consented`, and no-auto-send fields |
| P-05 Subscribe omitted | `api/subscribe-omitted-preview-response.json` | TGC-03 is treated as non-opted; absence of consent is not inferred as opt-in |
| P-06 Disclaimer enforcement | `api/negative-disclaimer-response.json` | TGC-04 returns HTTP 400 and does not proceed to preview/live payload construction |
| P-07 Guardrail version enforcement | `api/negative-guardrail-version-response.json` | TGC-05A/TGC-05B return HTTP 400 for absent or forged guardrail version |
| P-08 Public input type enforcement | `api/negative-public-input-type-response.json` | TGC-06 returns HTTP 400 for a confidential/free-text input type marker |
| P-09 Malicious tag stripping | `api/malicious-tags-preview-response.json` | TGC-07 strips client-forged `workflow:*`, `client:*`, `newsletter:ai`, and `leadmagnet:*` tags from server-derived tags |
| P-10 Compact schema enforcement | negative API response captures | TGC-08A through TGC-08D return HTTP 400 for unexpected keys, HTML/newline-like text, out-of-range scores, or over-cap arrays |
| P-11 Browser-only fulfillment | UI screenshots | Non-opted users can view readiness band, category scores, top gaps, cleanup workstream, 10-day action, optional resources, and print/save path without opt-in |
| P-12 Copy/legal safety | UI screenshots and reviewer notes | Visible copy remains educational, non-confidential, no legal advice, no attorney-client relationship, no guarantees, no compliance/patentability/transaction-readiness determination, no automatic attorney review |

## 6. Command posture for later approved use

Do not run these commands unless Jeff explicitly approves the local/no-token QA execution. If approved, run from:

```bash
cd /Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages
```

No-token wrapper:

```bash
env -u GHL_PRIVATE_INTEGRATION_TOKEN \
    -u GHL_LOCATION_ID \
    -u HIGHLEVEL_API_KEY \
    -u HIGHLEVEL_PRIVATE_INTEGRATION_TOKEN \
    -u CLIO_CLIENT_ID \
    -u CLIO_CLIENT_SECRET \
    -u SUPABASE_SERVICE_ROLE_KEY \
    -u SUPABASE_ACCESS_TOKEN \
    npm run test:lead-static
```

```bash
env -u GHL_PRIVATE_INTEGRATION_TOKEN \
    -u GHL_LOCATION_ID \
    -u HIGHLEVEL_API_KEY \
    -u HIGHLEVEL_PRIVATE_INTEGRATION_TOKEN \
    -u CLIO_CLIENT_ID \
    -u CLIO_CLIENT_SECRET \
    -u SUPABASE_SERVICE_ROLE_KEY \
    -u SUPABASE_ACCESS_TOKEN \
    npm run test:leads
```

Optional local UI evidence capture remains separately approval-gated. If approved, use only synthetic `.invalid` form values from the fixture bundle and capture screenshots; do not submit real prospect/client/company data.

## 7. Stop conditions for the later approved run

Stop immediately if any of these occur:

- Any command would use live HighLevel, Supabase, Clio, CRM, send, social, ad, or production credentials.
- Any API response returns `mode: "live"`.
- Any request attempts a live HighLevel `contacts/upsert` call.
- A non-opted or subscribe-omitted case receives a `workflow:*` tag, `newsletter:ai`, or non-empty `campaignRouting.emailSequence`.
- A non-opted or subscribe-omitted UI state implies report email delivery, nurture, workflow enrollment, attorney review, or outbound follow-up.
- Client-forged tags survive into server-derived `payload.tags`.
- Disclaimer, guardrail version, public input type, or compact schema negative cases do not return HTTP 400.
- Browser UI accepts confidential facts, contract text, source code, customer/employee/dispute details, invention disclosures, security incidents, regulated data, or other sensitive facts.
- Any workflow, send, SMS, DM, LinkedIn, social, ad, CRM, Supabase, Clio, or public action is queued, triggered, completed, or appears likely.

If any stop condition is hit, preserve local logs/screenshots only, do not retry with live credentials, and route the issue to Jeff/human review.

## 8. Approval language for Jeff before execution

```text
APPROVED: Tech GC synthetic fixture bundle may be used for a local/no-token Box A QA run.

Scope approved:
- Use only the synthetic `.invalid` fixture payloads in docs/controlled-pilot/evidence/2026-05-10-fixtures/tech_gc_synthetic_no_token_payloads_2026-05-10.json.
- Keep HighLevel, Supabase, Clio, CRM, send, social, ad, and production credentials absent/disabled.
- Capture evidence under a local docs/controlled-pilot/evidence/2026-05-10-tech-gc-local-no-token/ folder or a Jeff-approved replacement folder.
- Run only local/static/no-token checks and local screenshot capture.
- Stop on any live-mode, credential, workflow-tag, no-send, guardrail, compact-schema, or copy-safety failure.

Not approved:
- No live HighLevel contact/opportunity creation or update.
- No workflow activation, test workflow, manual start, enrollment, email, SMS, DM, LinkedIn, social, ad, Clio, Supabase, production env, public publish, or external outreach action.
- No real prospects, clients, imported contacts, researched leads, or third-party contacts.
```

```text
HOLD: Do not run the Tech GC synthetic fixture bundle yet.

Reason:
- [ ] Need attorney/privacy/brand review first.
- [ ] Need different synthetic payload labels or evidence folder.
- [ ] Need tighter non-subscriber/browser-only policy first.
- [ ] Need additional negative cases first.
- [ ] Other: ____________________________

All no-external-action boundaries remain in place.
```

```text
REQUEST REVISIONS: Revise the Tech GC synthetic fixture bundle before approval.

Required revisions:
- [ ] Change payload fixtures.
- [ ] Change expected outcomes.
- [ ] Change stop conditions.
- [ ] Change evidence folder/checklist.
- [ ] Change approval language.
- [ ] Other: ____________________________

This request does not approve any QA run or live-system action.
```

## 9. Recommended next action

Jeff should review this fixture bundle and choose APPROVED, HOLD, or REQUEST REVISIONS. If approved, a later execution task should run only the local/no-token evidence matrix with these synthetic fixtures, write dated local evidence, and avoid all live HighLevel/CRM/Supabase/Clio/workflow/send/social/public actions.
