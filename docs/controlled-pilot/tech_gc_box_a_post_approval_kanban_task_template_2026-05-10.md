# Tech GC Box A post-approval Kanban task template — 2026-05-10

Task: `t_707840ee`
Tenant: `whiteford-mountain-west`
Status: DORMANT TEMPLATE ONLY / DO NOT RUN QA FROM THIS DOCUMENT / NO LIVE-SYSTEM AUTHORIZATION

This document is an internal planning template for a future Kanban execution task. It is dormant until Jeff pastes exact Box A approval into a new future task. This document does not approve, create, or run the QA task. It does not authorize HighLevel/CRM/Supabase/Clio credentials, workflow action, sends, social posts, ads, public deploy, prospect/client action, or any external/live-system mutation.

## 1. Use rule

Use this template only if all of the following are true:

1. Jeff has explicitly approved Box A Tech GC local/no-token QA in a new task or comment.
2. The approval text preserves the local/no-token/synthetic-only scope below.
3. The future task includes the exact approval text, approver, date, evidence root, and stop conditions.
4. The future task is assigned to the proper QA/operator profile, not executed by a PM/planning worker.

If any item is missing, do not run QA. Block the future task and ask Jeff for exact approval.

## 2. Recommended future Kanban task fields

```text
Title: Execute approved Box A Tech GC local/no-token QA evidence capture
Assignee/profile: qa or web-qa/browser-qa profile; use a local frontend QA operator. Do not assign to highlevel-campaign unless Jeff separately approves HighLevel work, which Box A does not.
Workspace kind: dir
Workspace path: /Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages
Tenant: whiteford-mountain-west
Priority: after Jeff approval only
Parents/dependencies: the future approval task/comment that contains Jeff's exact Box A approval text
Skills: kanban-worker; if browser QA is needed, use the appropriate browser/QA skill/profile conventions for that worker
```

Recommended idempotency key for the future task if created by an orchestrator after approval:

```text
whiteford-tech-gc-box-a-local-no-token-qa-approved-<approval-date>
```

Do not create the execution task from this template until Jeff approves Box A exactly.

## 3. Approval text that must be pasted into the future task

The future task must include Jeff's exact approval, substantially matching this scope:

```text
APPROVED: Tech GC / Tech Company Legal Health Checklist may proceed as Box A for LOCAL / NO-TOKEN QA ONLY.

Scope approved:
- Route under test: /colorado-tech-general-counsel, with any #lead-magnet anchor treated as internal QA only unless later approved.
- Evidence root: docs/controlled-pilot/evidence/2026-05-10-tech-gc-box-a-local-no-token/ or this approved replacement: ____________________________.
- Use only synthetic `.invalid` emails, generic TEST company names, and non-confidential categorical QA inputs.
- Keep HighLevel, CRM, Supabase, Clio, send, social, ad, and production credentials absent/disabled.
- Run only local/static/no-token API and browser evidence checks.
- Preserve non-subscriber handling as browser/on-page educational value only: no report email, no nurture, no workflow tag, no live CRM write, and no outbound follow-up.
- Stop on any live mode, production credential use, live upsert attempt, location ID, workflow tag for non-opted user, non-empty non-opted sequence, forged tag survival, confidential-input invitation, schema bypass, send/enrollment indication, or guardrail/copy failure.

Not approved:
- No live HighLevel contact/opportunity creation or update.
- No workflow activation, publication, Test Workflow, manual start, contact enrollment, email, SMS, DM, LinkedIn, social, ad, Clio, Supabase, production env, public publish, or external outreach action.
- No real prospects, clients, imported contacts, researched leads, or third-party contacts.
- No treating a local/no-token PASS as public launch, live-system, or external-action approval.

Approver:
Date:
Notes:
```

If the future approval omits the no-token/synthetic-only boundaries, evidence root, or stop conditions, the operator should block instead of inferring approval.

## 4. Future task body template

Copy this into the future Kanban task only after Jeff approval exists:

```markdown
Context: Jeff approved Box A Tech GC / Tech Company Legal Health Checklist LOCAL / NO-TOKEN QA ONLY. This is an evidence-capture run, not a launch, not a live CRM/Supabase/Clio/HighLevel action, and not public/client/prospect-facing work.

Exact approval pasted from Jeff:
[PASTE FULL APPROVAL TEXT, APPROVER, DATE, NOTES]

Objective:
Run local/static/no-token API and browser QA for `/colorado-tech-general-counsel` using only synthetic `.invalid` fixture data, capture dated local evidence, and stop on any credential/live-system/mutation/copy-safety failure.

Workspace:
`/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages`

Evidence root:
`docs/controlled-pilot/evidence/2026-05-10-tech-gc-box-a-local-no-token/`
Or Jeff-approved replacement:
`[PASTE REPLACEMENT IF ANY]`

Fixture and source documents:
- `docs/controlled-pilot/tech_gc_box_a_local_no_token_qa_execution_packet_2026-05-10.md`
- `docs/controlled-pilot/tech_gc_synthetic_no_token_qa_fixture_bundle_2026-05-10.md`
- `docs/controlled-pilot/evidence/2026-05-10-fixtures/tech_gc_synthetic_no_token_payloads_2026-05-10.json`
- `docs/controlled-pilot/tech_gc_local_no_token_qa_harness_plan_2026-05-09.md`
- `docs/digests/2026-05-10_sunday_morning_decision_packet.md`
- `docs/digests/2026-05-10_overnight_followup_decision_register.md`

Allowed scope:
- Local/static no-token checks only.
- Local browser evidence for `/colorado-tech-general-counsel` only.
- Synthetic `.invalid` emails and generic TEST names/companies only.
- Non-confidential categorical QA inputs only.
- Evidence capture only in the approved local evidence folder.

Forbidden scope:
- No HighLevel, CRM, Supabase, Clio, send, social, ad, or production credentials.
- No real contacts, prospects, clients, imported contacts, researched leads, third-party contacts, confidential facts, privileged facts, invention disclosures, transaction facts, employee/customer/vendor-specific facts, security incidents, source code, regulated data, or real company/person targeting.
- No HighLevel contact/opportunity/tag/task/note/field/campaign/template/newsletter mutation.
- No workflow Publish/Activate, Test Workflow, manual start, enrollment, import, pipeline movement, email, SMS, DM, LinkedIn/social action, ads, Clio writes, Supabase DDL/sync/row mutation, public deploy/publish, or external outreach.
- No treating local/no-token PASS as launch approval, public-use approval, live-system approval, attorney approval, or source-current approval.

Required no-token preflight before tests:
1. Confirm current directory is the repo.
2. Create the evidence folder and `logs/`, `api/`, `ui/`, `screenshots/`, and `certification/` subfolders.
3. Run the environment verification commands in no-token mode and save output to evidence.
4. Stop if any forbidden token/credential variable is set or if any command prompts for credentials/login.

Commands to run only after approval:

```bash
cd /Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages

EVIDENCE_ROOT="docs/controlled-pilot/evidence/2026-05-10-tech-gc-box-a-local-no-token"
mkdir -p "$EVIDENCE_ROOT"/{logs,api,ui,screenshots,certification}

# Fail if forbidden credential/token variables are present in the operator environment.
node - <<'NODE' | tee "$EVIDENCE_ROOT/logs/no-token-env-preflight.txt"
const forbidden = [
  'GHL_PRIVATE_INTEGRATION_TOKEN',
  'GHL_LOCATION_ID',
  'HIGHLEVEL_API_KEY',
  'HIGHLEVEL_PRIVATE_INTEGRATION_TOKEN',
  'CLIO_CLIENT_ID',
  'CLIO_CLIENT_SECRET',
  'SUPABASE_SERVICE_ROLE_KEY',
  'SUPABASE_ACCESS_TOKEN',
  'SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_URL',
  'VERCEL_TOKEN'
];
const present = forbidden.filter((key) => process.env[key]);
console.log(`Checked forbidden credential vars: ${forbidden.join(', ')}`);
if (present.length) {
  console.error(`STOP: forbidden credential/token vars are set: ${present.join(', ')}`);
  process.exit(1);
}
console.log('PASS: no forbidden HighLevel/CRM/Supabase/Clio/send/social/ad/production credential vars detected.');
NODE

# Static guardrail check.
env -u GHL_PRIVATE_INTEGRATION_TOKEN \
    -u GHL_LOCATION_ID \
    -u HIGHLEVEL_API_KEY \
    -u HIGHLEVEL_PRIVATE_INTEGRATION_TOKEN \
    -u CLIO_CLIENT_ID \
    -u CLIO_CLIENT_SECRET \
    -u SUPABASE_SERVICE_ROLE_KEY \
    -u SUPABASE_ACCESS_TOKEN \
    npm run test:lead-static | tee "$EVIDENCE_ROOT/logs/test-lead-static.txt"

# No-token API/lead routing check.
env -u GHL_PRIVATE_INTEGRATION_TOKEN \
    -u GHL_LOCATION_ID \
    -u HIGHLEVEL_API_KEY \
    -u HIGHLEVEL_PRIVATE_INTEGRATION_TOKEN \
    -u CLIO_CLIENT_ID \
    -u CLIO_CLIENT_SECRET \
    -u SUPABASE_SERVICE_ROLE_KEY \
    -u SUPABASE_ACCESS_TOKEN \
    npm run test:leads | tee "$EVIDENCE_ROOT/logs/test-leads.txt"

# Optional local code quality checks if Jeff's approval/task asks for them.
env -u GHL_PRIVATE_INTEGRATION_TOKEN \
    -u GHL_LOCATION_ID \
    -u HIGHLEVEL_API_KEY \
    -u HIGHLEVEL_PRIVATE_INTEGRATION_TOKEN \
    -u CLIO_CLIENT_ID \
    -u CLIO_CLIENT_SECRET \
    -u SUPABASE_SERVICE_ROLE_KEY \
    -u SUPABASE_ACCESS_TOKEN \
    npm run lint | tee "$EVIDENCE_ROOT/logs/lint.txt"

env -u GHL_PRIVATE_INTEGRATION_TOKEN \
    -u GHL_LOCATION_ID \
    -u HIGHLEVEL_API_KEY \
    -u HIGHLEVEL_PRIVATE_INTEGRATION_TOKEN \
    -u CLIO_CLIENT_ID \
    -u CLIO_CLIENT_SECRET \
    -u SUPABASE_SERVICE_ROLE_KEY \
    -u SUPABASE_ACCESS_TOKEN \
    npm run build | tee "$EVIDENCE_ROOT/logs/build.txt"
```

Browser/UI evidence, if included in the exact future approval:
- Start only a local development server with forbidden token vars unset.
- Visit only local `/colorado-tech-general-counsel`.
- Use only fixture bundle `.invalid` values and TEST company/person names.
- Capture screenshots showing disclaimer gate, non-opted browser-only result, opted-in preview confirmation, and no implied report email/nurture/workflow for non-opted users.
- Do not log into HighLevel, Supabase, Clio, CRM, or any third-party service.

Stop conditions:
- Any command would use or requests HighLevel, CRM, Supabase, Clio, send, social, ad, production, Vercel, or live credential/token access.
- Any API response returns `mode: "live"`, a real `locationId`, or a live HighLevel `contacts/upsert` attempt.
- A non-opted or subscribe-omitted case receives `workflow:*`, `newsletter:ai`, a non-empty email sequence, or an outbound-follow-up implication.
- A client-forged workflow/newsletter/leadmagnet/client tag survives into server-derived tags.
- Disclaimer, guardrail-version, public-input-type, or compact Tech GC schema negative cases bypass validation.
- Browser UI asks for or accepts confidential/free-text sensitive input, source code, regulated data, invention disclosures, contract facts, customer/vendor/employee facts, disputes, security incidents, or real company/person data.
- Any workflow, send, enrollment, CRM, Supabase, Clio, public, social, ad, or external action appears queued, triggered, saved, completed, or likely.
- Visible copy stops being educational/non-hypey or implies legal advice, attorney-client relationship, guarantees, source-current conclusions, compliance/patentability/transaction-readiness determinations, or automatic attorney review.

Required evidence files/checklist:
- `README.md`
- `logs/no-token-env-preflight.txt`
- `logs/test-lead-static.txt`
- `logs/test-leads.txt`
- `logs/lint.txt` if run
- `logs/build.txt` if run
- `api/opted-in-preview-response.json` if captured
- `api/non-opted-preview-response.json` if captured
- `api/subscribe-omitted-preview-response.json` if captured
- `api/malicious-tags-preview-response.json` if captured
- `api/negative-disclaimer-response.json` if captured
- `api/negative-guardrail-version-response.json` if captured
- `api/negative-public-input-type-response.json` if captured
- `api/negative-tech-payload-schema-response.json` if captured
- `ui/browser-result-before-opt-in.png`
- `ui/non-opted-confirmation-state.png`
- `ui/opted-in-preview-confirmation-state.png`
- `ui/disclaimer-gate-blocked-state.png`
- `screenshots/local-route-console-network.png`
- `certification/no-token-no-external-action-certification.md`

README/certification header:

```md
# Tech GC Box A local/no-token QA evidence — 2026-05-10

Captured locally with HighLevel, CRM, Supabase, Clio, send, social, ad, and production credentials absent/disabled. No live contact, opportunity, workflow, email, SMS, DM, LinkedIn, social, ad, Supabase, Clio, public, client/prospect-facing, or external action was performed.
```

Pass/fail matrix to complete:

| Check | PASS/FAIL/STOP | Evidence path | Notes |
| --- | --- | --- | --- |
| P-01 No-token posture |  | `logs/no-token-env-preflight.txt`, `logs/test-leads.txt` | Token env absent; valid cases preview-only; no locationId/live upsert. |
| P-02 Static frontend guardrails |  | `logs/test-lead-static.txt` | Disclaimer, unchecked optional consent, compact payload, no frontend workflow tags, browser-only/no-outbound copy. |
| P-03 Opted-in routing preview |  | `api/opted-in-preview-response.json` | Opt-in only may show Tech GC workflow/newsletter preview metadata. |
| P-04 Non-opted routing |  | `api/non-opted-preview-response.json` | No workflow tag, empty sequence, `newsletter:not-consented`, no-auto-send. |
| P-05 Subscribe omitted |  | `api/subscribe-omitted-preview-response.json` | Absence of consent is treated as non-opted. |
| P-06 Disclaimer enforcement |  | `api/negative-disclaimer-response.json` | Missing disclaimer returns HTTP 400; does not proceed. |
| P-07 Guardrail version enforcement |  | `api/negative-guardrail-version-response.json` | Missing/wrong version returns HTTP 400. |
| P-08 Public input type enforcement |  | `api/negative-public-input-type-response.json` | Confidential/free-text marker returns HTTP 400. |
| P-09 Malicious tag stripping |  | `api/malicious-tags-preview-response.json` | Forged workflow/newsletter/leadmagnet/client tags stripped. |
| P-10 Compact schema enforcement |  | `api/negative-tech-payload-schema-response.json` | Unexpected key, HTML, out-of-range score, oversized arrays fail. |
| P-11 Browser-only fulfillment |  | `ui/` screenshots | Non-opted users get on-page educational value without email/nurture/workflow implication. |
| P-12 Copy/legal safety |  | screenshots and notes | Educational, non-confidential, no legal advice, no ACR, no guarantees, review-gated. |

Result/comment format:

```text
Deliverable: /Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/controlled-pilot/evidence/2026-05-10-tech-gc-box-a-local-no-token/
Summary: Local/no-token Box A Tech GC QA evidence [PASS/FAIL/STOP] using only synthetic `.invalid` fixtures; no live/external action performed.
Next action: Jeff/Whiteford should review the evidence folder and decide whether to route remediation, request attorney/privacy/brand review, or keep all public/live actions held.
```

Completion metadata should include:

```json
{
  "evidence_root": "/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/controlled-pilot/evidence/2026-05-10-tech-gc-box-a-local-no-token/",
  "qa_status": "pass|fail|stopped",
  "commands_run": [],
  "external_actions_performed": [],
  "live_actions_performed": [],
  "credentials_used": [],
  "fixture_scope": "synthetic .invalid only",
  "stop_conditions_hit": []
}
```
```

## 5. Evidence-folder checklist for Jeff/operator review

Before execution:

- [ ] Future task contains exact Jeff approval text.
- [ ] Future task names local repo workspace path.
- [ ] Future task names evidence root.
- [ ] Operator confirms this is local/no-token/synthetic-only.
- [ ] Operator confirms no live-system credentials are set.
- [ ] Operator confirms no real contact/prospect/client/company/confidential data will be used.
- [ ] Operator confirms no HighLevel/CRM/Supabase/Clio/workflow/send/social/ad/public action is in scope.

During execution:

- [ ] `logs/no-token-env-preflight.txt` captured.
- [ ] `logs/test-lead-static.txt` captured.
- [ ] `logs/test-leads.txt` captured.
- [ ] Optional `logs/lint.txt` captured only if approved.
- [ ] Optional `logs/build.txt` captured only if approved.
- [ ] API response captures use only `.invalid` fixture values.
- [ ] UI screenshots use only TEST/generic values.
- [ ] Browser console/network screenshot shows local route only and no external/live CRM/Supabase/Clio action.
- [ ] Stop evidence is preserved if any stop condition fires.

After execution:

- [ ] Evidence `README.md` states no-token/no-external-action posture.
- [ ] `certification/no-token-no-external-action-certification.md` states no HighLevel/CRM/Supabase/Clio/workflow/send/social/ad/public/client/prospect action occurred.
- [ ] Pass/fail matrix is complete.
- [ ] Kanban deliverable comment points to the absolute evidence folder.
- [ ] Any failure/remediation is routed to the correct specialist; do not rerun with credentials.
- [ ] Local/no-token PASS is labeled as evidence ready for review only, not launch approval.

## 6. Source anchors

- `docs/digests/2026-05-10_sunday_morning_decision_packet.md`
- `docs/digests/2026-05-10_overnight_followup_decision_register.md`
- `docs/controlled-pilot/tech_gc_box_a_local_no_token_qa_execution_packet_2026-05-10.md`
- `docs/controlled-pilot/tech_gc_synthetic_no_token_qa_fixture_bundle_2026-05-10.md`
- `docs/controlled-pilot/evidence/2026-05-10-fixtures/tech_gc_synthetic_no_token_payloads_2026-05-10.json`
- `docs/controlled-pilot/tech_gc_local_no_token_qa_harness_plan_2026-05-09.md`

## 7. Bottom line

This template is a dormant routing artifact. It should make the future approved QA task safe, narrow, reviewable, and easy to stop. It does not authorize the QA run by itself, does not create a future task, and does not move any public/live/CRM/HighLevel/Supabase/Clio/social/ad/email action forward.
