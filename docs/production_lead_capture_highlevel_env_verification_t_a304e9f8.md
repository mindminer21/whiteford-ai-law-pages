# Production Lead Capture and HighLevel Environment Verification — t_a304e9f8

Generated: 2026-05-06
Workspace: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages`
Safety mode: read-only/dry-run verification, browser API preview tests, and read-only HighLevel tag/custom-field checks. No emails, SMS, social actions, workflow activation, contact enrollment, opportunity mutation, Clio writes, paid ads, or public outreach were performed.

## Verdict

BLOCKED FOR LIVE PRODUCTION LEAD CAPTURE, PASS FOR CONSENT-GATED PREVIEW BEHAVIOR.

The production Vercel project currently has no environment variables configured, so `/api/leads` returns `mode: "preview"` in production and does not upsert contacts into HighLevel. That prevents accidental live CRM mutation and keeps the consent-gated pilot safe, but it also means production public lead capture is not actually writing to HighLevel yet.

## Evidence and artifacts

- Production public app tested: `https://whiteford-ai-law-pages.vercel.app`
- Vercel project inspected: `jeffs-projects-455fed85/whiteford-ai-law-pages`
- Latest listed deployment: `https://whiteford-ai-law-pages-2cwbji5d1-jeffs-projects-455fed85.vercel.app` showed Vercel SSO protection when opened directly; the public alias was accessible.
- Local env file inspected without printing secrets: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/.env.local`
- Read-only HighLevel campaign verification output: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/highlevel_production_env_campaign_verify_t_a304e9f8.json`
- Read-only HighLevel ops verification output: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/highlevel_production_env_ops_verify_t_a304e9f8.json`
- Build verification: `npm run lint` PASS; `npm run build` PASS.

## Environment variable findings

### Local `.env.local`

Names inspected only; secret values were not printed.

| Variable | Status | Notes |
| --- | --- | --- |
| `GHL_PRIVATE_INTEGRATION_TOKEN` | PRESENT locally | Required for live HighLevel contact upsert. Value not printed. |
| `GHL_LOCATION_ID` | PRESENT locally | Matches expected Whiteford Schell IP location ID `tm68WWMrcAa3TqQbEAMa`. |
| `GHL_USER_ID` | NOT PRESENT locally | Not required by `/api/leads`; relevant only to draft email asset creation scripts. |
| `GHL_USER_EMAIL` | NOT PRESENT locally | Not required by `/api/leads`; previous campaign work uses `jeff@schellip.com` as the expected user email for asset creation. |

### Vercel production environment

`vercel env ls` returned: no environment variables found for `jeffs-projects-455fed85/whiteford-ai-law-pages`.

| Variable | Production status | Impact |
| --- | --- | --- |
| `GHL_PRIVATE_INTEGRATION_TOKEN` | MISSING | Production `/api/leads` cannot perform live HighLevel upsert. |
| `GHL_LOCATION_ID` | MISSING | Production `/api/leads` cannot perform live HighLevel upsert and returns preview mode. |
| `GHL_USER_ID` | MISSING | Not required for lead capture; relevant to future draft email asset creation only. |
| `GHL_USER_EMAIL` | MISSING | Not required for lead capture. |

## HighLevel ID confirmation

| Item | Expected | Verification | Status |
| --- | --- | --- | --- |
| HighLevel location | Whiteford Schell IP, `tm68WWMrcAa3TqQbEAMa` | Local env `GHL_LOCATION_ID` matches expected; source docs consistently reference the same ID; read-only HighLevel scripts successfully queried tags/custom fields under that location. | PASS |
| HighLevel pipeline | Whiteford Schell IP Pipeline, `Tbx4tA6wHv5lTwZPSHyZ` | Confirmed in source specs and existing HighLevel workflow packets. `/api/leads` does not currently create or mutate opportunities, so pipeline ID is not used by this endpoint. | PASS for reference / NOT APPLICABLE to endpoint |
| Campaign tags/custom fields | Four workflow trigger tags, campaign tags, consent fields, approval fields | Read-only verification found campaign setup: 15/15 tags existing, 19/19 campaign custom fields existing. Ops setup: 14/14 ops tags existing, 13/13 ops custom fields existing. | PASS |

## `/api/leads` code boundary inspection

File: `src/app/api/leads/route.ts`

Observed behavior:

1. Requires `contact.email`; otherwise returns HTTP 400.
2. Reads only two env vars for live CRM writes: `GHL_PRIVATE_INTEGRATION_TOKEN` and `GHL_LOCATION_ID`.
3. If either env var is missing, returns `mode: "preview"` with the constructed payload and does not call HighLevel.
4. If both env vars are present, calls `POST https://services.leadconnectorhq.com/contacts/upsert`.
5. Adds `campaign.triggerTag` only when `contact.subscribe === true`.
6. Adds `newsletter:ai` only when `contact.subscribe === true`.
7. Adds `newsletter:not-consented`, `consent_basis = no_email_opt_in`, `approval_status = no-auto-send`, `campaignRouting.triggerTag = null`, and `campaignRouting.emailSequence = []` when `contact.subscribe !== true`.
8. Sanitizes client-supplied `assessment.tags` by removing every tag whose trimmed lowercase value starts with `workflow:`.
9. Does not send email, SMS, DMs, social posts, or HighLevel workflow activation calls.
10. Does not create or update HighLevel opportunities or pipeline stages.

## Production API preview tests

Executed from the accessible production alias in a browser context against `/api/leads`. Because Vercel production lacks `GHL_PRIVATE_INTEGRATION_TOKEN` and `GHL_LOCATION_ID`, every test returned `mode: "preview"`; no live HighLevel write occurred.

### All-lane opt-in / non-opt-in matrix

| Campaign key | Subscribe | HTTP | Mode | Trigger tag | Workflow tags in payload | Newsletter tags | Email sequence |
| --- | ---: | ---: | --- | --- | --- | --- | ---: |
| `ai-compliance` | false | 200 | preview | null | none | `newsletter:not-consented` | 0 |
| `ai-compliance` | true | 200 | preview | `workflow:ai-compliance-readiness` | `workflow:ai-compliance-readiness` only | `newsletter:ai` | 4 |
| `ai-patent` | false | 200 | preview | null | none | `newsletter:not-consented` | 0 |
| `ai-patent` | true | 200 | preview | `workflow:ai-patent-strategy` | `workflow:ai-patent-strategy` only | `newsletter:ai` | 4 |
| `tech-gc` | false | 200 | preview | null | none | `newsletter:not-consented` | 0 |
| `tech-gc` | true | 200 | preview | `workflow:tech-gc-launchpad` | `workflow:tech-gc-launchpad` only | `newsletter:ai` | 4 |
| `ma-readiness` | false | 200 | preview | null | none | `newsletter:not-consented` | 0 |
| `ma-readiness` | true | 200 | preview | `workflow:ma-readiness` | `workflow:ma-readiness` only | `newsletter:ai` | 4 |

### Malicious workflow-tag injection test

Request included `contact.subscribe: false` and `assessment.tags: ["workflow:ai-patent-strategy", "ai-use:vendor"]`.

Result:

- HTTP 200.
- Mode: preview.
- `campaignRouting.triggerTag = null`.
- `workflowTags = []`.
- `newsletter:not-consented` present.
- `newsletter:ai` absent.
- Non-workflow assessment tag `ai-use:vendor` preserved.

Status: PASS. The endpoint strips client-supplied workflow trigger tags while preserving non-trigger assessment tags.

## Live behavior boundary

The endpoint has a simple live/preview switch:

- Preview/no-write mode: if `GHL_PRIVATE_INTEGRATION_TOKEN` or `GHL_LOCATION_ID` is missing.
- Live HighLevel contact upsert mode: if both `GHL_PRIVATE_INTEGRATION_TOKEN` and `GHL_LOCATION_ID` are present.

Current production is preview/no-write because both required Vercel env vars are missing.

If Jeff adds those two env vars to Vercel production, public submissions will start creating/updating HighLevel contacts. For opted-in submissions, the payload will include the lane-specific `workflow:*` trigger tag and `newsletter:ai`. For non-opted submissions, the payload will not include any workflow trigger tag and will set no-auto-send consent metadata.

## Jeff-owned test record safety

Safe now in production: yes, but only because production is currently preview/no-write. The tested public production alias did not create any HighLevel contacts.

Safe after Vercel env vars are added: conditionally yes, only for clearly marked Jeff-owned/internal test records and only if the purpose is to verify contact upsert/tag/custom-field behavior. Recommended constraints:

1. Use only Jeff-controlled test emails, e.g. `jeff+whiteford-test-<lane>-<date>@schellip.com` or another Jeff-owned alias.
2. Include obvious test metadata: name `Hermes Whiteford Test`, company `Whiteford Test`, role `internal-test`, source channel `hermes-kanban-test`.
3. Test one lane at a time.
4. Keep HighLevel workflows Draft/Off during testing.
5. Verify the contact has `Approval Status = pending` only for opted-in tests and `Approval Status = no-auto-send` for non-opted tests.
6. Delete or mark test records after verification if Jeff wants a clean CRM.
7. Do not test with real prospects, researched/imported contacts, or non-Jeff-owned addresses until Jeff approves the exact external action.

## Pass/fail checklist

| Check | Status | Notes |
| --- | --- | --- |
| Local env inspected without printing secrets | PASS | Names/status only. |
| Local `GHL_LOCATION_ID` matches Whiteford Schell IP | PASS | `tm68WWMrcAa3TqQbEAMa`. |
| Vercel production env inspected | PASS | No env vars found. |
| Production live HighLevel capture enabled | FAIL/BLOCKED | Missing `GHL_PRIVATE_INTEGRATION_TOKEN` and `GHL_LOCATION_ID` in Vercel production. |
| Production preview/no-write behavior | PASS | `/api/leads` returns preview mode. |
| Non-opt-in submissions avoid workflow tags | PASS | All four lane tests returned no workflow tags with `subscribe: false`. |
| Opt-in submissions route only to matching lane tag | PASS | All four lane tests returned exactly one matching workflow tag with `subscribe: true`. |
| Client-supplied workflow tags sanitized | PASS | Malicious non-opt-in test returned no workflow tags. |
| HighLevel required campaign tags/custom fields exist | PASS | Read-only script found all campaign and ops tags/fields. |
| Endpoint sends email/SMS/social | PASS/NOT PRESENT | No send code found in `/api/leads`. |
| Endpoint creates opportunities/pipeline stages | PASS/NOT PRESENT | No opportunity mutation code found in `/api/leads`. |
| Build health | PASS | `npm run lint` and `npm run build` passed. |

## Blockers

1. Production Vercel has no `GHL_PRIVATE_INTEGRATION_TOKEN` or `GHL_LOCATION_ID`, so production lead capture is preview-only and does not write to HighLevel.
2. Direct latest deployment URL was Vercel SSO-protected in the browser; the public alias `https://whiteford-ai-law-pages.vercel.app` was accessible and used for API tests.
3. The endpoint will become live immediately after the two required env vars are added. That is intended, but it should be treated as a controlled pilot activation step because opted-in submissions will include workflow trigger tags.

## Safe next steps

1. If Jeff wants production lead capture live, add the following Vercel production env vars only:
   - `GHL_PRIVATE_INTEGRATION_TOKEN`
   - `GHL_LOCATION_ID=tm68WWMrcAa3TqQbEAMa`
2. Redeploy the Vercel project after adding env vars.
3. Keep all four HighLevel workflows Draft/Off for the first CRM-write smoke test.
4. Run one Jeff-owned opted-in test record per lane and one non-opted test for one lane.
5. Confirm in HighLevel that opted-in tests receive only their matching lane workflow tag and that non-opted tests receive no `workflow:*` tag.
6. Do not activate workflows or sends until Jeff approves a separate activation packet covering final recipient/channel/copy/timing, suppression/conflicts status, legal/ethics review, email asset QA, unsubscribe/preference handling, and rollback plan.
