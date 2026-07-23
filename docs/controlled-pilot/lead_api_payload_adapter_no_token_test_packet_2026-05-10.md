# Local no-token `/api/leads` payload-shape adapter test packet

Date: 2026-05-10
Task: `t_1ca7d420`
Scope: internal/local QA preparation only. No HighLevel token, no live lead submission, no contact upsert, no workflow activation/enrollment, no email/SMS/social action, no CRM/Supabase/Clio mutation, and no client/prospect-facing use.

## 1. Purpose

This packet translates the static HighLevel custom-field payload findings into safe synthetic QA steps Jeff/Whiteford can review before any engineering adapter change or credentialed HighLevel QA.

The narrow diagnostic question is:

> Can `/api/leads` expose a local/no-token preview payload whose custom-field adapter shape is explicit and testable while preserving opt-in-only workflow tags, empty non-opted email sequences, malicious-tag stripping, and no-contact/no-upsert behavior?

This remains useful internal value before any larger next step: it shows exactly what is safe to test locally, what should be blocked, and what Jeff must approve before live HighLevel work.

## 2. Inputs reviewed

- `src/app/api/leads/route.ts`
- `tests/verify_lead_magnet_api_consent.mjs`
- `docs/controlled-pilot/lead_api_highlevel_field_payload_static_audit_2026-05-10.md`
- `docs/reviews/2026-05-10_0430_lead_magnet_highlevel_readiness_review.md`

Observed local verification during packet preparation:

```bash
GHL_PRIVATE_INTEGRATION_TOKEN= GHL_LOCATION_ID= npm run test:leads
```

Observed result: pass in no-token preview mode. The test confirms disclaimer/version gates, schema rejection, malicious tag stripping, campaign fallback, opt-in-only workflows, and non-opt-in routing. It does not currently assert the HighLevel custom-field adapter shape.

## 3. Current payload-shape issue

`src/app/api/leads/route.ts` currently builds `previewPayload.customFields` using entries like:

```ts
{ key: "campaign_key", field_value: campaignKey }
```

The saved HighLevel evidence and field inventory use generated HighLevel field keys like:

```ts
contact.campaign_key
```

and, for some earlier fields, stable HighLevel field ids.

Risk: the current app payload may be internally consistent for app-domain keys but may not match the LeadConnector `contacts/upsert` contract if the endpoint requires `fieldKey: "contact.<api_key>"`, `key: "contact.<api_key>"`, or id-backed field references.

Current no-token route behavior is safe for local preview because the route returns before calling HighLevel when either `GHL_PRIVATE_INTEGRATION_TOKEN` or `GHL_LOCATION_ID` is absent.

## 4. Proposed adapter boundary

Recommended boundary for a future engineering change, after Jeff approves the exact scope:

1. Keep browser/form payloads unchanged. Browsers should continue to send app-domain JSON such as `campaignKey`, `contact`, `assessment`, `techLegalHealth`, `patent`, `maReadiness`, and `aiComplianceGameplan`.
2. Keep validation and consent logic before HighLevel payload construction.
3. Add a local route-level adapter between validated app payload data and `previewPayload.customFields`.
4. Test the adapter only in no-token preview mode first.
5. Do not change the live HighLevel upsert path, production env, or contact-writing behavior during this packet.

Adapter candidates to test in order:

| Candidate | Shape | Status |
| --- | --- | --- |
| A | `{ fieldKey: "contact.campaign_key", field_value: value }` | Preferred local test candidate if LeadConnector docs confirm `fieldKey`. |
| B | `{ key: "contact.campaign_key", field_value: value }` | Fallback if docs require `key` but expect the generated `contact.*` field key. |
| C | `{ id: "Qz7tTt2gHbiIKEuOKf9Q", field_value: value }` | Use only for fields with read-only verified ids; do not use for missing/unverified fields. |
| Current | `{ key: "campaign_key", field_value: value }` | Existing behavior; preserve as baseline until adapter is approved. |

Do not include the six unmapped emitted fields in any contact-writing adapter unless Jeff/Whiteford approves and verifies matching HighLevel Contact custom fields or approves removing/remapping those app fields.

Six unmapped emitted fields from the static audit:

- `ai_patent_gap_map`
- `ai_patent_ownership_gap_map`
- `ma_readiness_timing`
- `ma_readiness_category_scores`
- `ma_readiness_risk_map`
- `ma_readiness_60_day_plan`

## 5. Synthetic `.invalid` fixture payloads

These are safe synthetic fixtures only. They use `.invalid` emails, generic fictional company data, categorical/non-confidential values, and no real prospect/client information.

### Fixture A — opted-in Tech GC preview

Expected lane: Tech GC Launchpad.
Expected trigger tag if current code is unchanged: `workflow:tech-gc-launchpad`.
Expected email sequence: present because `contact.subscribe` is true.
Expected consent basis: `lead_magnet_email_opt_in:tech-gc`.

```json
{
  "campaignKey": "tech-gc",
  "sourcePage": "/colorado-tech-general-counsel?qa=adapter-shape",
  "sourceChannel": "local-no-token-adapter-test",
  "disclaimerAccepted": true,
  "reportRequested": true,
  "privacyGuardrailVersion": "lead-magnet-guardrail-v2",
  "publicFormInputType": "categorical_non_confidential",
  "contact": {
    "name": "Adapter Optin",
    "email": "adapter-optin-tech-gc@test.invalid",
    "company": "Example Adapter Co",
    "role": "Founder",
    "roleCategory": "founder",
    "subscribe": true
  },
  "assessment": {
    "readinessScore": 64,
    "band": {
      "label": "Operational legal drag",
      "cta": "Review the legal operating system before the next enterprise or financing push."
    }
  },
  "techLegalHealth": {
    "score": 64,
    "band": "Operational legal drag",
    "companyMoment": "enterprise_sales_motion",
    "lowestCategory": "Contracts",
    "categoryScores": { "contracts": 2, "ip": 1, "privacy": 1 },
    "topActions": ["Standardize sales paper", "Confirm IP assignment records"],
    "branchSignals": ["enterprise-readiness", "ip-cleanup"],
    "answers": ["contracts-basic", "ip-needs-review"],
    "reportVersion": "adapter-local-fixture-v1"
  }
}
```

### Fixture B — non-opted Tech GC preview

Expected lane: Tech GC Launchpad, but no workflow trigger tag.
Expected email sequence: empty.
Expected tags: `newsletter:not-consented`; no `newsletter:ai`; no `workflow:*` tags.
Expected consent basis: `no_email_opt_in`.
Expected approval status: `no-auto-send`.

```json
{
  "campaignKey": "tech-gc",
  "sourcePage": "/colorado-tech-general-counsel?qa=adapter-shape",
  "sourceChannel": "local-no-token-adapter-test",
  "disclaimerAccepted": true,
  "reportRequested": true,
  "privacyGuardrailVersion": "lead-magnet-guardrail-v2",
  "publicFormInputType": "categorical_non_confidential",
  "contact": {
    "name": "Adapter Nonopted",
    "email": "adapter-nonopted-tech-gc@test.invalid",
    "company": "Example Adapter Co",
    "role": "Operator",
    "roleCategory": "operations",
    "subscribe": false
  },
  "assessment": {
    "readinessScore": 51,
    "band": {
      "label": "Useful foundation with cleanup work",
      "cta": "Use the browser-only result as an issue-spotting checklist."
    }
  },
  "techLegalHealth": {
    "score": 51,
    "band": "Useful foundation with cleanup work",
    "companyMoment": "fundraising_or_diligence",
    "lowestCategory": "IP ownership",
    "categoryScores": { "contracts": 1, "ip": 2, "privacy": 1 },
    "topActions": ["Check assignment coverage", "Map customer contract exceptions"],
    "branchSignals": ["diligence-readiness"],
    "answers": ["ip-review", "contract-exceptions"],
    "reportVersion": "adapter-local-fixture-v1"
  }
}
```

### Fixture C — malicious-tag / no-consent Tech GC preview

Expected lane: Tech GC Launchpad, but no workflow trigger tag because `contact.subscribe` is false.
Expected client-supplied tags: ignored/stripped; they should not appear in `payload.tags`.
Expected email sequence: empty.
Expected consent basis: `no_email_opt_in`.
Expected approval status: `no-auto-send`.

```json
{
  "campaignKey": "tech-gc",
  "sourcePage": "/colorado-tech-general-counsel?qa=adapter-shape",
  "sourceChannel": "local-no-token-adapter-test",
  "disclaimerAccepted": true,
  "reportRequested": true,
  "privacyGuardrailVersion": "lead-magnet-guardrail-v2",
  "publicFormInputType": "categorical_non_confidential",
  "contact": {
    "name": "Adapter Malicious Tag",
    "email": "adapter-malicious-tag-tech-gc@test.invalid",
    "company": "Example Adapter Co",
    "role": "Founder",
    "roleCategory": "founder",
    "subscribe": false
  },
  "assessment": {
    "readinessScore": 49,
    "tags": ["workflow:evil-client-tag", "newsletter:ai", "leadmagnet:forged", "client:arbitrary"],
    "band": {
      "label": "Useful foundation with cleanup work",
      "cta": "Do not treat client-supplied tags as CRM instructions."
    }
  },
  "techLegalHealth": {
    "score": 49,
    "band": "Useful foundation with cleanup work",
    "companyMoment": "customer_contract_cleanup",
    "lowestCategory": "Contracts",
    "categoryScores": { "contracts": 2, "ip": 1, "privacy": 1 },
    "topActions": ["Review contracting workflow"],
    "branchSignals": ["contract-stack"],
    "answers": ["contract-review"],
    "reportVersion": "adapter-local-fixture-v1"
  }
}
```

## 6. Exact no-token commands and expected outcomes

### Command 1 — confirm existing no-token consent harness still passes

Run from repo root:

```bash
env -u GHL_PRIVATE_INTEGRATION_TOKEN -u GHL_LOCATION_ID npm run test:leads
```

Expected output includes:

```text
API guardrail behavior passed in no-token preview mode: disclaimer/version gates, payload schema rejection, malicious tag stripping, campaign fallback, opt-in-only workflows, and non-opt-in routing.
```

Expected safety outcome:

- `mode` is `preview`.
- No HighLevel token is required.
- No HighLevel contact is created or updated.
- No workflow is enrolled or activated.
- No email sequence is sent.

### Command 2 — local adapter-shape preview probe, current baseline

Run from repo root. This command imports the route through a temporary local copy the same way the existing harness does, deletes HighLevel env vars, and makes `fetch` throw if anything tries to contact HighLevel.

```bash
env -u GHL_PRIVATE_INTEGRATION_TOKEN -u GHL_LOCATION_ID node --experimental-strip-types - <<'NODE'
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const routePath = path.join(root, "src/app/api/leads/route.ts");
const campaignsPath = path.join(root, "src/lib/campaigns.ts");
const source = fs.readFileSync(routePath, "utf8").replace(
  'import { campaigns, getCampaign } from "@/lib/campaigns";',
  `import { campaigns, getCampaign } from ${JSON.stringify(pathToFileURL(campaignsPath).href)};`,
);
const tempRoutePath = path.join(os.tmpdir(), `whiteford-leads-adapter-shape-${process.pid}.ts`);
fs.writeFileSync(tempRoutePath, source);

delete process.env.GHL_PRIVATE_INTEGRATION_TOKEN;
delete process.env.GHL_LOCATION_ID;
globalThis.fetch = async () => {
  throw new Error("Unexpected HighLevel fetch in no-token adapter-shape probe");
};

const { POST } = await import(pathToFileURL(tempRoutePath).href);
fs.unlinkSync(tempRoutePath);

const base = {
  campaignKey: "tech-gc",
  sourcePage: "/colorado-tech-general-counsel?qa=adapter-shape",
  sourceChannel: "local-no-token-adapter-test",
  disclaimerAccepted: true,
  reportRequested: true,
  privacyGuardrailVersion: "lead-magnet-guardrail-v2",
  publicFormInputType: "categorical_non_confidential",
  assessment: {
    readinessScore: 51,
    band: { label: "Useful foundation with cleanup work", cta: "Use browser-only result." },
  },
  techLegalHealth: {
    score: 51,
    band: "Useful foundation with cleanup work",
    companyMoment: "fundraising_or_diligence",
    lowestCategory: "IP ownership",
    categoryScores: { contracts: 1, ip: 2, privacy: 1 },
    topActions: ["Check assignment coverage"],
    branchSignals: ["diligence-readiness"],
    answers: ["ip-review"],
    reportVersion: "adapter-local-fixture-v1",
  },
};

const fixtures = [
  {
    name: "opted-in",
    payload: {
      ...base,
      contact: {
        name: "Adapter Optin",
        email: "adapter-optin-tech-gc@test.invalid",
        company: "Example Adapter Co",
        role: "Founder",
        roleCategory: "founder",
        subscribe: true,
      },
    },
    optedIn: true,
  },
  {
    name: "non-opted",
    payload: {
      ...base,
      contact: {
        name: "Adapter Nonopted",
        email: "adapter-nonopted-tech-gc@test.invalid",
        company: "Example Adapter Co",
        role: "Operator",
        roleCategory: "operations",
        subscribe: false,
      },
    },
    optedIn: false,
  },
  {
    name: "malicious-tags-no-consent",
    payload: {
      ...base,
      assessment: {
        ...base.assessment,
        tags: ["workflow:evil-client-tag", "newsletter:ai", "leadmagnet:forged", "client:arbitrary"],
      },
      contact: {
        name: "Adapter Malicious Tag",
        email: "adapter-malicious-tag-tech-gc@test.invalid",
        company: "Example Adapter Co",
        role: "Founder",
        roleCategory: "founder",
        subscribe: false,
      },
    },
    optedIn: false,
  },
];

function req(payload) {
  return new Request("http://local.test/api/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

function field(data, key) {
  const item = data.payload.customFields.find((candidate) => candidate.key === key || candidate.fieldKey === `contact.${key}`);
  assert.ok(item, `missing custom field ${key}`);
  return item;
}

for (const fixture of fixtures) {
  const response = await POST(req(fixture.payload));
  const data = await response.json();
  assert.equal(response.status, 200, `${fixture.name} failed: ${JSON.stringify(data)}`);
  assert.equal(data.mode, "preview");
  assert.equal(data.payload.locationId, undefined);

  // Current baseline: bare key shape. If an adapter is later approved and implemented,
  // replace these two assertions with fieldKey/contact.* assertions.
  const campaignField = field(data, "campaign_key");
  assert.equal(campaignField.key, "campaign_key");
  assert.equal(campaignField.fieldKey, undefined);

  if (fixture.optedIn) {
    assert.equal(data.campaignRouting.triggerTag, "workflow:tech-gc-launchpad");
    assert.equal(data.payload.tags.includes("workflow:tech-gc-launchpad"), true);
    assert.equal(data.payload.tags.includes("newsletter:ai"), true);
    assert.equal(field(data, "consent_basis").field_value, "lead_magnet_email_opt_in:tech-gc");
    assert.equal(field(data, "approval_status").field_value, "pending");
    assert.ok(data.campaignRouting.emailSequence.length > 0);
  } else {
    assert.equal(data.campaignRouting.triggerTag, null);
    assert.equal(data.payload.tags.some((tag) => tag.startsWith("workflow:")), false);
    assert.equal(data.payload.tags.includes("newsletter:not-consented"), true);
    assert.equal(data.payload.tags.includes("newsletter:ai"), false);
    assert.equal(field(data, "consent_basis").field_value, "no_email_opt_in");
    assert.equal(field(data, "approval_status").field_value, "no-auto-send");
    assert.deepEqual(data.campaignRouting.emailSequence, []);
  }

  for (const forbidden of ["workflow:evil-client-tag", "newsletter:ai", "leadmagnet:forged", "client:arbitrary"]) {
    if (!fixture.optedIn || forbidden !== "newsletter:ai") {
      assert.equal(data.payload.tags.includes(forbidden), false, `${fixture.name} leaked ${forbidden}`);
    }
  }
}

console.log("Adapter-shape no-token baseline probe passed: current customFields use bare key shape, consent invariants hold, and no HighLevel fetch occurred.");
NODE
```

Expected current-baseline output:

```text
Adapter-shape no-token baseline probe passed: current customFields use bare key shape, consent invariants hold, and no HighLevel fetch occurred.
```

Expected current-baseline custom-field shape:

```json
{ "key": "campaign_key", "field_value": "tech-gc" }
```

Expected post-adapter custom-field shape, if Jeff later approves a `fieldKey` adapter:

```json
{ "fieldKey": "contact.campaign_key", "field_value": "tech-gc" }
```

At that future point, update the two baseline assertions in Command 2 to require `fieldKey: "contact.campaign_key"` and no bare `key`.

## 7. Pass/fail matrix

| Invariant | Fixture A opted-in | Fixture B non-opted | Fixture C malicious/no-consent |
| --- | --- | --- | --- |
| No token required | Pass if `mode: "preview"` | Pass if `mode: "preview"` | Pass if `mode: "preview"` |
| No contact/no upsert | Pass if no fetch occurs and `payload.locationId` is undefined | Same | Same |
| CustomFields current baseline | Bare `key` entries visible in preview payload | Same | Same |
| CustomFields future adapter | `fieldKey: contact.*` or approved alternative only after Jeff-approved code change | Same | Same |
| Trigger tag | `workflow:tech-gc-launchpad` only | `null`; no `workflow:*` tags | `null`; no `workflow:*` tags |
| Newsletter tag | `newsletter:ai` | `newsletter:not-consented` | `newsletter:not-consented`; client `newsletter:ai` stripped |
| Consent basis | `lead_magnet_email_opt_in:tech-gc` | `no_email_opt_in` | `no_email_opt_in` |
| Approval status | `pending` | `no-auto-send` | `no-auto-send` |
| Email sequence | Present in preview only; no send | Empty array | Empty array |
| Malicious/client tags | Not applicable beyond normal server-generated tags | Not accepted | `workflow:evil-client-tag`, `leadmagnet:forged`, `client:arbitrary`, and client-forged `newsletter:ai` absent |

## 8. Evidence capture suggestion

If Jeff approves running the local probe, save terminal output only under a local evidence folder such as:

```text
docs/controlled-pilot/evidence/2026-05-10-lead-api-payload-adapter-no-token/
```

Suggested files:

- `commands.txt` — exact commands run.
- `test_leads_output.txt` — output from `npm run test:leads`.
- `adapter_shape_probe_output.txt` — output from Command 2.
- `adapter_shape_expected_findings.md` — short note saying whether current bare-key baseline or approved adapter shape was observed.

Do not save real leads, real emails, tokens, HighLevel response bodies, or contact ids in this evidence folder.

## 9. Stop conditions

Stop immediately and ask Jeff/Whiteford for a decision if any of the following occurs:

1. `src/app/api/leads/route.ts` is missing or no longer contains a no-token preview return before the HighLevel `fetch` call.
2. `tests/verify_lead_magnet_api_consent.mjs` is missing, cannot import the route locally, or requires credentials.
3. `GHL_PRIVATE_INTEGRATION_TOKEN` or `GHL_LOCATION_ID` is required for the proposed test.
4. Any command attempts to call `https://services.leadconnectorhq.com/contacts/upsert` during no-token QA.
5. Any test fixture uses a real email, real company/prospect/client data, confidential facts, or attorney-client-sensitive content.
6. The field mapping remains unclear between `fieldKey: contact.*`, `key: contact.*`, and id-backed custom fields.
7. A proposed adapter includes the six unmapped emitted fields without an approved/verified HighLevel field manifest.
8. A local command asks to write to HighLevel, Supabase, Clio, production env, or CRM records.
9. A workflow, campaign, email sequence, SMS, newsletter, social post, ad, import/export, or enrollment prompt appears.
10. The output would be used externally, publicly, or client/prospect-facing before attorney/Jeff approval.

## 10. Jeff decision needed before implementation

Recommended next decision:

- Approve local/no-token engineering work to add an adapter test only, using the route preview boundary and `.invalid` fixtures above.
- Hold any live HighLevel token test until a separate approval packet names the exact test record, channel/timing, suppression/conflicts status, rollback, and operator.

No external or live-system action is approved by this packet.
