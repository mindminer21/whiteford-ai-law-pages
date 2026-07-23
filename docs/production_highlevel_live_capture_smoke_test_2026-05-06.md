# Production HighLevel Live-Capture Smoke Test — 2026-05-06

Generated: 2026-05-06
Workspace: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages`
HighLevel location: `tm68WWMrcAa3TqQbEAMa`
Production URL: `https://whiteford-ai-law-pages.vercel.app`

## Safety Scope

Jeff approved completing the post-Vercel-token lead-capture steps.

Actions performed:

- Verified Vercel has `GHL_PRIVATE_INTEGRATION_TOKEN` and `GHL_LOCATION_ID` for Preview and Production, without printing secret values.
- Ran local lint, build, and `/api/leads` consent tests.
- Deployed a protected Vercel Preview.
- Submitted two clearly marked Jeff-owned Preview test records.
- Redeployed Production.
- Submitted two clearly marked Jeff-owned Production smoke-test records.

Actions not performed:

- No workflow was activated or published.
- No contact was manually enrolled in a workflow.
- No email, SMS, DM, LinkedIn/social post, Clio write, paid ad, or public outreach was sent.
- No HighLevel workflow graph was edited through private/internal endpoints.

## Verification Commands

```bash
npm run lint
npm run test:leads
npm run build
vercel --yes
vercel --prod --yes
```

Preview protected deployment:

```text
https://whiteford-ai-law-pages-q512klq26-jeffs-projects-455fed85.vercel.app
```

Production deployment:

```text
https://whiteford-ai-law-pages-fggi9cga5-jeffs-projects-455fed85.vercel.app
```

Production alias:

```text
https://whiteford-ai-law-pages.vercel.app
```

## Test Evidence Artifacts

Preview test artifacts:

```text
docs/live-test-20260506154357/
```

Production smoke-test artifacts:

```text
docs/live-production-test-20260506154904/
```

## Preview Test Result

Opted-in test contact:

- Email: `jeff+whiteford-ai-compliance-test@schellip.com`
- HighLevel contact id: `3VDrktyxjwki4VifVTHT`
- Response mode: `live`
- Trigger tag: `workflow:ai-compliance-readiness`
- Consent basis: `lead_magnet_email_opt_in:ai-compliance`
- Email sequence preview count: `4`
- Tags included:
  - `whiteford-mountain-west`
  - `leadmagnet:ai-compliance-gameplan`
  - `interest:ai-compliance`
  - `internal-test`
  - `workflow:ai-compliance-readiness`
  - `newsletter:ai`

Non-opted test contact:

- Email: `jeff+whiteford-no-optin-test@schellip.com`
- HighLevel contact id: `n83hlteWx41ww2v13Qcg`
- Response mode: `live`
- Trigger tag: `null`
- Consent basis: `no_email_opt_in`
- Email sequence preview count: `0`
- Malicious client-supplied `workflow:malicious-client-tag` was stripped.
- Tags included:
  - `whiteford-mountain-west`
  - `leadmagnet:ai-compliance-gameplan`
  - `interest:ai-compliance`
  - `internal-test`
  - `newsletter:not-consented`

## Production Smoke-Test Result

Opted-in test contact:

- Email: `jeff+whiteford-prod-ai-compliance-test@schellip.com`
- HighLevel contact id: `rrG5LcVMGGDFwURXkpaK`
- Response mode: `live`
- Trigger tag: `workflow:ai-compliance-readiness`
- Consent basis: `lead_magnet_email_opt_in:ai-compliance`
- Approval status field value: `pending`
- Source page field value: `/ai-compliance-gameplan`
- Source channel field value: `jeff-production-smoke-test`
- Email sequence preview count: `4`
- Tags included:
  - `whiteford-mountain-west`
  - `leadmagnet:ai-compliance-gameplan`
  - `interest:ai-compliance`
  - `internal-test`
  - `production-smoke-test`
  - `workflow:ai-compliance-readiness`
  - `newsletter:ai`

Non-opted test contact:

- Email: `jeff+whiteford-prod-no-optin-test@schellip.com`
- HighLevel contact id: `jyorHAwr9OIpHdl1lSl0`
- Response mode: `live`
- Trigger tag: `null`
- Consent basis: `no_email_opt_in`
- Approval status field value: `no-auto-send`
- Source page field value: `/ai-compliance-gameplan`
- Source channel field value: `jeff-production-smoke-test`
- Email sequence preview count: `0`
- Malicious client-supplied `workflow:malicious-client-tag` was stripped.
- Tags included:
  - `whiteford-mountain-west`
  - `leadmagnet:ai-compliance-gameplan`
  - `interest:ai-compliance`
  - `internal-test`
  - `production-smoke-test`
  - `newsletter:not-consented`

## Notes

The HighLevel contact upsert response included the persisted contact objects and custom-field IDs/values. Direct contact-read API calls using the local private integration token returned `403 Forbidden`, so the smoke-test verification relies on the successful live upsert responses plus the visible HighLevel response payloads captured in the artifact folders.

## Current Readiness Impact

The `Test lead verified` readiness item is now complete.

The system is still not approved for live campaign activation because:

- Remaining HighLevel manual guard fields still need review before workflow activation.
- AI Patent remains in Advanced Builder and should not be the first live pilot lane.
- External activation, sends, enrollments, LinkedIn/social actions, Clio writes, and paid ads still require exact current approval.

