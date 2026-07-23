# Tech GC Local / No-Token QA Harness Plan — 2026-05-09

Task: `t_662684b0`
Tenant: `whiteford-mountain-west`
Status: INTERNAL QA HARNESS PLAN ONLY. This document does not approve live HighLevel, CRM, Supabase, Clio, workflow, send, public publish, social, ad, or external action.

## 1. Purpose and controlling boundary

This plan gives Jeff a local/no-token QA harness and evidence-capture checklist for the Tech Company Legal Health Checklist before any live-system test is considered.

Controlling posture:

- The checklist must deliver narrow browser/on-page educational diagnostic value before any follow-up ask.
- Report or nurture follow-up requires affirmative opt-in; the checkbox must remain unchecked by default.
- Non-opted users get browser-only fulfillment: no report email, no nurture, no workflow tag, no outbound follow-up.
- Legal-services copy must remain educational, non-hypey, no-legal-advice, no-attorney-client-relationship, non-confidential, and attorney-review-gated.
- HighLevel credentials must be absent or deliberately disabled for this harness.
- Do not run production credentials, mutate live CRM, activate/test workflows, enroll contacts, send messages, publish pages/social posts, launch ads, run Supabase DDL/sync, or write to Clio.

## 2. Inputs reviewed

- `docs/controlled-pilot/tech_gc_saturday_morning_decision_brief_2026-05-09.md`
- `docs/controlled-pilot/tech_gc_attorney_review_microcopy_variants_2026-05-09.md`
- `docs/tech_gc_local_no_token_qa_evidence_2026-05-08.md`
- `src/app/colorado-tech-general-counsel/page.tsx`
- `src/components/tech-gc-legal-health-checklist.tsx`
- `src/app/api/leads/route.ts`
- `tests/verify_lead_magnet_api_consent.mjs`
- `tests/verify_lead_magnet_static_guardrails.mjs`
- `package.json`

Business-development retrieval used for synthesis:

- Local business-development RAG query: `lead magnet diagnostic value before opt in educational follow up consent professional services funnel`
- Retrieved source patterns included lead magnets as narrow complete-value assets and lead-funnel structures where follow-up happens after value/consent. This plan applies those principles without reproducing book text.
- QMD collection search was attempted against `whiteford-ai-law-pages`; no relevant results were returned for the Tech GC local/no-token search terms, so project files above were used directly.

## 3. No-token environment requirements

Run all commands from:

```bash
cd /Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages
```

Required local posture before QA:

```bash
unset GHL_PRIVATE_INTEGRATION_TOKEN
unset GHL_LOCATION_ID
unset HIGHLEVEL_API_KEY
unset HIGHLEVEL_PRIVATE_INTEGRATION_TOKEN
unset CLIO_CLIENT_ID
unset CLIO_CLIENT_SECRET
unset SUPABASE_SERVICE_ROLE_KEY
unset SUPABASE_ACCESS_TOKEN
```

Use command-local env removal even if the shell has tokens loaded:

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

Optional static checks only, still no-token:

```bash
env -u GHL_PRIVATE_INTEGRATION_TOKEN \
    -u GHL_LOCATION_ID \
    -u HIGHLEVEL_API_KEY \
    -u HIGHLEVEL_PRIVATE_INTEGRATION_TOKEN \
    -u CLIO_CLIENT_ID \
    -u CLIO_CLIENT_SECRET \
    -u SUPABASE_SERVICE_ROLE_KEY \
    -u SUPABASE_ACCESS_TOKEN \
    npm run lint
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
    npm run build
```

Expected no-token proof from `npm run test:leads`:

- the test script itself deletes `GHL_PRIVATE_INTEGRATION_TOKEN` and `GHL_LOCATION_ID` before importing `/api/leads`;
- valid cases return `mode: "preview"`;
- returned payload has `locationId` undefined;
- no HighLevel upsert endpoint is called because `/api/leads` returns before the live `fetch("https://services.leadconnectorhq.com/contacts/upsert", ...)` branch when token/location are absent.

## 4. Evidence folder plan

Create this folder only after Jeff approves the local/no-token QA run:

```bash
mkdir -p docs/controlled-pilot/evidence/2026-05-09-tech-gc-local-no-token/{api,ui,screenshots,logs,certification}
```

Recommended evidence files for a later approved run:

```text
docs/controlled-pilot/evidence/2026-05-09-tech-gc-local-no-token/
  README.md
  logs/test-lead-static.txt
  logs/test-leads.txt
  logs/lint.txt
  logs/build.txt
  api/opted-in-preview-response.json
  api/non-opted-preview-response.json
  api/subscribe-omitted-preview-response.json
  api/malicious-tags-preview-response.json
  api/negative-disclaimer-response.json
  api/negative-guardrail-version-response.json
  api/negative-public-input-type-response.json
  api/negative-tech-payload-schema-response.json
  ui/browser-result-before-opt-in.png
  ui/non-opted-confirmation-state.png
  ui/opted-in-preview-confirmation-state.png
  ui/disclaimer-gate-blocked-state.png
  screenshots/local-route-console-network.png
  certification/no-token-no-external-action-certification.md
```

Evidence README header to use:

```md
# Tech GC local/no-token QA evidence — 2026-05-09

This evidence was captured locally with HighLevel, Supabase, Clio, CRM, send, social, and production credentials absent/disabled. No live contact, opportunity, workflow, email, SMS, DM, LinkedIn, social, ad, Supabase, Clio, or public action was performed.
```

## 5. Exact local commands for the later approved QA run

### 5.1 Baseline source diff and file list

```bash
git status --short
```

```bash
git diff -- src/app/api/leads/route.ts src/components/tech-gc-legal-health-checklist.tsx tests/verify_lead_magnet_api_consent.mjs tests/verify_lead_magnet_static_guardrails.mjs package.json
```

Expected outcome:

- OK if there are known local documentation edits.
- STOP if unexpected source changes modify `/api/leads`, Tech GC component routing/consent behavior, tests, or package scripts without review.

### 5.2 Static lead-magnet guardrail parity

```bash
env -u GHL_PRIVATE_INTEGRATION_TOKEN -u GHL_LOCATION_ID -u HIGHLEVEL_API_KEY -u HIGHLEVEL_PRIVATE_INTEGRATION_TOKEN -u CLIO_CLIENT_ID -u CLIO_CLIENT_SECRET -u SUPABASE_SERVICE_ROLE_KEY -u SUPABASE_ACCESS_TOKEN npm run test:lead-static | tee docs/controlled-pilot/evidence/2026-05-09-tech-gc-local-no-token/logs/test-lead-static.txt
```

Expected PASS output includes:

```text
Static lead-magnet guardrail parity passed: four apps have disclaimer gates, unchecked optional marketing consent, report request without opt-in, shared guardrail metadata, compact payload tokens, and no frontend workflow trigger tags.
```

### 5.3 API consent/no-token harness

```bash
env -u GHL_PRIVATE_INTEGRATION_TOKEN -u GHL_LOCATION_ID -u HIGHLEVEL_API_KEY -u HIGHLEVEL_PRIVATE_INTEGRATION_TOKEN -u CLIO_CLIENT_ID -u CLIO_CLIENT_SECRET -u SUPABASE_SERVICE_ROLE_KEY -u SUPABASE_ACCESS_TOKEN npm run test:leads | tee docs/controlled-pilot/evidence/2026-05-09-tech-gc-local-no-token/logs/test-leads.txt
```

Expected PASS output includes:

```text
API guardrail behavior passed in no-token preview mode: disclaimer/version gates, payload schema rejection, malicious tag stripping, campaign fallback, opt-in-only workflows, and non-opt-in routing.
```

Acceptable existing warning:

- Node may print `MODULE_TYPELESS_PACKAGE_JSON`; treat it as non-blocking only if the test exits 0 and all assertions pass.

### 5.4 Optional lint/build evidence

```bash
env -u GHL_PRIVATE_INTEGRATION_TOKEN -u GHL_LOCATION_ID -u HIGHLEVEL_API_KEY -u HIGHLEVEL_PRIVATE_INTEGRATION_TOKEN -u CLIO_CLIENT_ID -u CLIO_CLIENT_SECRET -u SUPABASE_SERVICE_ROLE_KEY -u SUPABASE_ACCESS_TOKEN npm run lint | tee docs/controlled-pilot/evidence/2026-05-09-tech-gc-local-no-token/logs/lint.txt
```

```bash
env -u GHL_PRIVATE_INTEGRATION_TOKEN -u GHL_LOCATION_ID -u HIGHLEVEL_API_KEY -u HIGHLEVEL_PRIVATE_INTEGRATION_TOKEN -u CLIO_CLIENT_ID -u CLIO_CLIENT_SECRET -u SUPABASE_SERVICE_ROLE_KEY -u SUPABASE_ACCESS_TOKEN npm run build | tee docs/controlled-pilot/evidence/2026-05-09-tech-gc-local-no-token/logs/build.txt
```

Expected outcome:

- `npm run lint` exits 0.
- `npm run build` exits 0.
- If `.env.local` is detected by Next.js build output, do not treat the build as live-system evidence. Confirm no commands used live tokens and no request was sent to `/api/leads` under live credentials.

### 5.5 Optional local UI preview, no external mutation

Only after tests pass and Jeff approves local UI evidence capture:

```bash
env -u GHL_PRIVATE_INTEGRATION_TOKEN -u GHL_LOCATION_ID -u HIGHLEVEL_API_KEY -u HIGHLEVEL_PRIVATE_INTEGRATION_TOKEN -u CLIO_CLIENT_ID -u CLIO_CLIENT_SECRET -u SUPABASE_SERVICE_ROLE_KEY -u SUPABASE_ACCESS_TOKEN npm run dev -- --hostname 127.0.0.1 --port 3011
```

Open locally:

```text
http://127.0.0.1:3011/colorado-tech-general-counsel#lead-magnet
```

Capture screenshots only. Do not submit real company/client/prospect information. Use only synthetic `.invalid` emails and generic company names from section 6.

## 6. Fixture payloads and expected outcomes

Use only synthetic payloads with `.invalid` emails and generic values. Do not use real prospects, clients, researched leads, contact imports, or third-party data.

### TGC-01 opted-in valid preview payload

```json
{
  "campaignKey": "tech-gc",
  "sourcePage": "test-tech-gc#lead-magnet",
  "sourceChannel": "local-no-token-harness",
  "disclaimerAccepted": true,
  "reportRequested": true,
  "privacyGuardrailVersion": "lead-magnet-guardrail-v2",
  "publicFormInputType": "categorical_non_confidential",
  "contact": {
    "name": "Ada Lovelace",
    "email": "test-tech-gc-optin@test.invalid",
    "company": "Example Test Co",
    "role": "Founder",
    "subscribe": true
  },
  "assessment": {
    "readinessScore": 42,
    "band": { "label": "Good foundation with visible gaps", "cta": "Tech Company OGC Launchpad" },
    "tags": ["workflow:malicious-client-tag", "test:kept"]
  },
  "techLegalHealth": {
    "score": 42,
    "band": "Good foundation with visible gaps",
    "companyMoment": "Enterprise sales motion",
    "categoryScores": { "contracts": 1, "ip": 2, "workforce": 1, "dataAi": 1, "deals": 2 },
    "lowestCategory": "Contract Stack",
    "topActions": ["Refresh contract stack", "Assign contract approval owner"],
    "branchSignals": ["signal:ai-compliance"],
    "answers": ["contract-templates:1", "contract-ownership:0"],
    "reportVersion": "tech-legal-health-privacy-guardrail-v2"
  }
}
```

Expected outcome:

- HTTP 200 in preview mode.
- `mode = "preview"`.
- `payload.locationId` is undefined.
- Tags include `whiteford-mountain-west`, Tech GC lane tags from `src/lib/campaigns.ts`, `workflow:tech-gc-launchpad`, and `newsletter:ai`.
- `campaignRouting.triggerTag = "workflow:tech-gc-launchpad"`.
- `campaignRouting.emailSequence` contains the Tech GC preview email-sequence metadata only.
- Custom field `consent_basis = "lead_magnet_email_opt_in:tech-gc"`.
- Custom field `approval_status = "pending"`.
- Client-supplied tags such as `workflow:malicious-client-tag` and `test:kept` are absent from server-derived `payload.tags`.
- This does not approve any real send or workflow activation.

### TGC-02 non-opted valid preview payload

```json
{
  "campaignKey": "tech-gc",
  "sourcePage": "test-tech-gc#lead-magnet",
  "sourceChannel": "local-no-token-harness",
  "disclaimerAccepted": true,
  "reportRequested": true,
  "privacyGuardrailVersion": "lead-magnet-guardrail-v2",
  "publicFormInputType": "categorical_non_confidential",
  "contact": {
    "name": "Ada Lovelace",
    "email": "test-tech-gc-noopt@test.invalid",
    "company": "Example Test Co",
    "role": "Founder",
    "subscribe": false
  },
  "assessment": {
    "readinessScore": 66,
    "band": { "label": "Operational legal drag", "cta": "Tech Company OGC Launchpad" },
    "tags": ["workflow:evil", "newsletter:ai", "leadmagnet:forged"]
  },
  "techLegalHealth": {
    "score": 66,
    "band": "Operational legal drag",
    "companyMoment": "Enterprise sales motion",
    "categoryScores": { "contracts": 2 },
    "lowestCategory": "Contracts",
    "topActions": ["Standardize sales paper"],
    "branchSignals": ["enterprise-readiness"],
    "answers": ["contracts-basic"],
    "reportVersion": "test"
  }
}
```

Expected outcome:

- HTTP 200 in preview mode.
- No `workflow:*` tag is present.
- `campaignRouting.triggerTag = null`.
- `campaignRouting.emailSequence = []`.
- Tags include `newsletter:not-consented`.
- Tags do not include `newsletter:ai`.
- Custom field `consent_basis = "no_email_opt_in"`.
- Custom field `approval_status = "no-auto-send"`.
- Forged client tags are stripped.
- UI/evidence should confirm browser-only value remains visible and no copy implies report delivery or nurture.

### TGC-03 subscribe omitted

Same as TGC-02, but omit `contact.subscribe` entirely.

Expected outcome:

- Treated as non-opted.
- HTTP 200 in preview mode.
- No workflow trigger tag.
- `newsletter:not-consented` present.
- `newsletter:ai` absent.
- `campaignRouting.triggerTag = null`.
- `campaignRouting.emailSequence = []`.
- `consent_basis = "no_email_opt_in"`.
- `approval_status = "no-auto-send"`.

### TGC-04 disclaimer not accepted

```json
{
  "campaignKey": "tech-gc",
  "sourcePage": "test-tech-gc#lead-magnet",
  "sourceChannel": "local-no-token-harness",
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

Expected outcome:

- HTTP 400.
- Error includes `Disclaimer acceptance is required before requesting an interactive lead-magnet report.`
- No preview/live payload proceeds past validation.

### TGC-05 missing or wrong guardrail version

Use TGC-02 but set one of:

```json
"privacyGuardrailVersion": null
```

or

```json
"privacyGuardrailVersion": "client-bypass-v0"
```

Expected outcome:

- HTTP 400.
- Error includes approved privacy guardrail version requirement.
- No preview/live payload proceeds past validation.

### TGC-06 wrong public input type

Use TGC-02 but set:

```json
"publicFormInputType": "free_text_confidential"
```

Expected outcome:

- HTTP 400.
- Error includes approved categorical schema requirement.
- No preview/live payload proceeds past validation.

### TGC-07 malicious client tags

Use TGC-02 with:

```json
"assessment": {
  "readinessScore": 66,
  "tags": ["workflow:evil", "client:arbitrary", "newsletter:ai", "leadmagnet:forged"]
}
```

Expected outcome:

- HTTP 200 preview response.
- Forged tags are absent from `payload.tags`.
- `newsletter:not-consented` is present.
- `newsletter:ai` is absent because `subscribe` is false.
- No unrelated recommended-offer or workflow field is injected from the client.

### TGC-08 overbroad/non-compact Tech GC payload

Use TGC-02 but add unexpected keys, HTML, newline text, too many array items, non-integer scores, or scores outside 0-100 in `techLegalHealth`.

Expected outcome:

- HTTP 400.
- Error includes `Payload failed validation: tech legal health payload must use the approved compact schema.`

## 7. Browser UI evidence checklist

Capture screenshots only after Jeff approves a local UI evidence pass.

| UI state | Steps | Expected evidence |
| --- | --- | --- |
| Disclaimer gate blocked | Load local route; leave disclaimer unchecked. | Company-moment selector, question buttons, and submit path remain disabled/blocked; no network submit occurs. |
| Browser value before opt-in | Accept disclaimer; change categorical answers; do not check email opt-in. | Readiness band, category scores, top gaps, first cleanup workstream, 10-day action, and optional resources render in browser. |
| Non-opted no-send state | Enter synthetic `.invalid` email; keep opt-in unchecked; submit locally/no-token. | Message states no report email, nurture workflow, SMS, DM, social message, or outbound follow-up is triggered; response is preview/no-token. |
| Opted-in preview state | Enter synthetic `.invalid` email; check opt-in; submit locally/no-token. | Message states preview-only or conditional opt-in routing; delivery remains subject to approved workflow, suppression, privacy, deliverability, and no-send guardrails. |
| Print/save path | Click `Print / save PDF`. | Browser print dialog or screenshot confirms non-opted users can preserve browser result without email. |
| Copy safety | Review visible copy. | No guarantee, no legal advice, no attorney-client relationship, no compliance/fundability/transaction-readiness conclusion, no automatic attorney review, no confidential-submission invitation. |

## 8. Stop conditions

Stop immediately and preserve evidence if any of the following occurs:

- Any command would use `GHL_PRIVATE_INTEGRATION_TOKEN`, `GHL_LOCATION_ID`, HighLevel, Supabase, Clio, CRM, send, social, ad, or production credentials.
- Any response returns `mode: "live"` during this local/no-token harness.
- Any local submit attempts a live HighLevel `contacts/upsert` call.
- A non-opted or subscribe-omitted case receives any `workflow:*` tag.
- A non-opted or subscribe-omitted case receives `newsletter:ai`.
- A non-opted or subscribe-omitted case has a non-empty `campaignRouting.emailSequence`.
- A non-opted or subscribe-omitted case has any copy implying report email delivery, nurture, workflow enrollment, attorney review, or outbound follow-up.
- Malicious client-supplied tags survive into server-derived `payload.tags`.
- Disclaimer, guardrail version, public input type, or compact schema negative cases do not return HTTP 400.
- Browser UI asks for or accepts confidential facts, contract text, source code, employee/customer facts, dispute facts, security incidents, invention disclosures, or regulated data.
- Any workflow, send, SMS, DM, LinkedIn, social, ad, CRM, Supabase, or Clio side effect appears queued, triggered, or completed.

If a stop condition occurs:

1. Stop the run.
2. Save console output, response JSON, and screenshots under the evidence folder.
3. Do not retry with live credentials.
4. Create or request a remediation task for the appropriate specialist.
5. Mark the QA execution blocked pending Jeff/human review.

## 9. Pass/fail matrix

| Test ID | Area | Pass condition | Fail condition | Evidence file |
| --- | --- | --- | --- | --- |
| P-01 | No-token posture | Token env removed; API test returns preview mode with undefined `locationId`. | Any live mode, location ID, live upsert attempt, or credential dependency. | `logs/test-leads.txt`, API JSON captures |
| P-02 | Static frontend guardrails | Static test passes for disclaimer gates, unchecked consent, compact payloads, no frontend workflow tags. | Static test failure or frontend hard-coded workflow tag. | `logs/test-lead-static.txt` |
| P-03 | Opted-in routing preview | TGC-01 returns preview; `workflow:tech-gc-launchpad` and `newsletter:ai` present; consent basis starts `lead_magnet_email_opt_in:tech-gc`; approval pending. | Missing opted-in routing metadata, wrong workflow tag, no consent basis, or live send/action. | `api/opted-in-preview-response.json` |
| P-04 | Non-opted routing | TGC-02 returns preview; no workflow tag; triggerTag null; emailSequence empty; `newsletter:not-consented`; `approval_status = no-auto-send`. | Any workflow tag, `newsletter:ai`, non-empty sequence, or delivery implication. | `api/non-opted-preview-response.json` |
| P-05 | Subscribe omitted | TGC-03 is treated as non-opted with no-send/no-auto-send routing. | Omitted subscribe treated as opt-in or ambiguous consent. | `api/subscribe-omitted-preview-response.json` |
| P-06 | Disclaimer enforcement | TGC-04 returns HTTP 400 with disclaimer-required error. | Report request proceeds without disclaimer acceptance. | `api/negative-disclaimer-response.json` |
| P-07 | Guardrail version enforcement | TGC-05 returns HTTP 400 for missing/wrong guardrail version. | Payload proceeds with missing or forged guardrail version. | `api/negative-guardrail-version-response.json` |
| P-08 | Public input type enforcement | TGC-06 returns HTTP 400 for non-categorical input type. | Payload proceeds with confidential/free-text input type marker. | `api/negative-public-input-type-response.json` |
| P-09 | Malicious tag stripping | TGC-07 strips forged workflow/newsletter/leadmagnet/client tags. | Any client-forged tag survives into server-derived tags. | `api/malicious-tags-preview-response.json` |
| P-10 | Compact schema | TGC-08 returns HTTP 400 for unexpected keys/HTML/newlines/out-of-range scores. | Overbroad or confidential-like payload proceeds. | `api/negative-tech-payload-schema-response.json` |
| P-11 | Browser-only fulfillment | Non-opted browser UI shows readiness band, category map, top gaps, cleanup workstream, 10-day action, and save/print path. | Browser value is hidden behind opt-in or copy says email/report is coming without opt-in. | `ui/non-opted-confirmation-state.png` |
| P-12 | Copy/legal safety | Visible copy preserves non-confidential, educational-only, no-advice, no-ACR, source-current/review gating. | Copy implies legal conclusion, guarantee, attorney review, or confidential submission. | `ui/browser-result-before-opt-in.png`, reviewer notes |

Overall local/no-token PASS requires P-01 through P-12 pass and no stop condition. Any single fail keeps the lane in hold/remediation; it does not authorize a live test.

## 10. Approval packet for Jeff before execution

Jeff can approve, hold, or revise this harness with one of the following decisions.

```text
APPROVED: Tech GC local/no-token QA harness may be executed.

Scope approved:
- Use only synthetic `.invalid` payloads and generic company names in this packet.
- Keep HighLevel, Supabase, Clio, CRM, send, social, ad, and production credentials absent/disabled.
- Capture evidence under `docs/controlled-pilot/evidence/2026-05-09-tech-gc-local-no-token/`.
- Run only local/static/no-token commands and local screenshot capture.
- Stop on any workflow tag/no-send/credential/live-mode/guardrail/copy failure.

Not approved:
- No live HighLevel contact/opportunity creation or update.
- No workflow activation, publication, test workflow, manual start, enrollment, email, SMS, DM, LinkedIn, social, ad, Clio, Supabase, production env, public publish, or external outreach action.
- No real prospects, clients, imported contacts, researched leads, or third-party contacts.
```

```text
HOLD: Do not run Tech GC local/no-token QA yet.

Reason:
- [ ] Need attorney/privacy/brand review first.
- [ ] Need different synthetic payload labels or evidence folder.
- [ ] Need tighter non-subscriber/browser-only policy first.
- [ ] Need additional negative cases first.
- [ ] Other: ____________________________

All no-external-action boundaries remain in place.
```

```text
REQUEST REVISIONS: Revise the Tech GC local/no-token QA harness before approval.

Required revisions:
- [ ] Change commands.
- [ ] Change payload fixtures.
- [ ] Change expected outcomes.
- [ ] Change stop conditions.
- [ ] Change evidence folder/checklist.
- [ ] Other: ____________________________

This request does not approve any QA run or live-system action.
```

## 11. Recommended next action

Jeff should review this harness plan and choose APPROVED, HOLD, or REQUEST REVISIONS. If Jeff approves, the next execution task should run only this local/no-token evidence matrix and write the dated evidence packet; it should not use production credentials, mutate HighLevel/CRM/Supabase/Clio, activate workflows, enroll contacts, send messages, publish, or perform any external action.
