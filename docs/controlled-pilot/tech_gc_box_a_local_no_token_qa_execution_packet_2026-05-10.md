# Box A Tech GC Local / No-Token QA Execution Packet — 2026-05-10

Task: `t_41abea7c`
Tenant: `whiteford-mountain-west`
Status: OPERATOR-READY APPROVAL PACKET ONLY / NO QA RUN / NO LIVE-SYSTEM AUTHORIZATION

This packet turns Sunday Decision Packet Box A into a one-page execution scope Jeff can approve, hold, or revise later. It does not itself run QA, approve QA, authorize live systems, approve public launch, mutate HighLevel/CRM/Supabase/Clio, activate workflows, enroll contacts, send messages, publish pages, launch ads, or permit client/prospect-facing action.

## 1. Exact scope if Jeff later approves Box A

Approved lane only: Tech GC / Tech Company Legal Health Checklist local, static, no-token QA.

Route under test:
- `/colorado-tech-general-counsel`
- Any `#lead-magnet` anchor is internal QA only and is not approved for public/external use.

Allowed work after explicit Jeff approval:
- Local/static/no-token API guardrail checks.
- Local/no-token browser evidence capture.
- Synthetic `.invalid` payload validation for opted-in, non-opted, subscribe-omitted, malicious-tag, disclaimer, guardrail-version, public-input-type, and compact-schema cases.
- Evidence capture only under the dated local folder below.

Not allowed under Box A:
- No live HighLevel contact/opportunity/tag/task/note/field mutation.
- No workflow Publish/Activate, Test Workflow, manual start, contact enrollment, send, import, pipeline move, or workflow remediation.
- No email, SMS, DM, LinkedIn, social, ad, newsletter, Clio, Supabase, public publish/deploy, production credential, or external outreach action.
- No real prospects, clients, imported contacts, researched leads, third-party contacts, confidential facts, privileged facts, invention disclosures, transaction facts, employee/customer/vendor-specific facts, security incidents, source code, or regulated data.

## 2. Prerequisites before any operator runs QA

Jeff must first paste or sign an explicit Box A approval using the approval text in section 8, with approver, date, and notes.

Operator must confirm before running anything:
1. Working directory is the local repo: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages`.
2. HighLevel, CRM, Supabase, Clio, send, social, ad, and production credentials are absent/disabled for every command.
3. Evidence folder name is approved.
4. Payloads are synthetic-only and use `.invalid` emails.
5. Non-subscriber policy remains browser/on-page educational value only.
6. No public/external/live-system action is needed to complete the QA evidence pass.
7. Any credential prompt, browser login, live token, live mode, or mutation path stops the run.

Recommended command-local no-token posture:

```bash
env -u GHL_PRIVATE_INTEGRATION_TOKEN \
    -u GHL_LOCATION_ID \
    -u HIGHLEVEL_API_KEY \
    -u HIGHLEVEL_PRIVATE_INTEGRATION_TOKEN \
    -u CLIO_CLIENT_ID \
    -u CLIO_CLIENT_SECRET \
    -u SUPABASE_SERVICE_ROLE_KEY \
    -u SUPABASE_ACCESS_TOKEN \
    <approved-local-command>
```

## 3. Synthetic-only payload rules

Use only:
- `.invalid` emails such as `test-tech-gc-optin@test.invalid` and `test-tech-gc-noopt@test.invalid`.
- Generic TEST names and companies, e.g. `Ada Lovelace`, `Example Test Co`, `TEST Company`, `Example QA Co`.
- Categorical, non-confidential answers from the approved harness fixtures.
- Existing harness cases from `tech_gc_local_no_token_qa_harness_plan_2026-05-09.md`.

Never use:
- Real client, prospect, imported contact, researched lead, or third-party data.
- Confidential facts, legal issues, contracts, source code, invention details, customer/vendor names, employee facts, disputes, regulated data, or security incidents.
- Any live HighLevel/Supabase/Clio/CRM identifier, real location ID, production token, or real contact record.

## 4. Evidence folder naming

Create and populate the evidence folder only after Jeff approves the Box A run.

Default evidence root for this Sunday packet:

```text
docs/controlled-pilot/evidence/2026-05-10-tech-gc-box-a-local-no-token/
```

Recommended subfolders/files:

```text
docs/controlled-pilot/evidence/2026-05-10-tech-gc-box-a-local-no-token/
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

README/certification header to use:

```md
# Tech GC Box A local/no-token QA evidence — 2026-05-10

Captured locally with HighLevel, CRM, Supabase, Clio, send, social, ad, and production credentials absent/disabled. No live contact, opportunity, workflow, email, SMS, DM, LinkedIn, social, ad, Supabase, Clio, public, client/prospect-facing, or external action was performed.
```

## 5. Pass/fail stop conditions

Overall PASS requires all of these:
- Token env removed for every command.
- `npm run test:lead-static` exits 0 and confirms static lead-magnet guardrails.
- `npm run test:leads` exits 0 in no-token preview mode.
- Valid cases return `mode: "preview"` and no `locationId`.
- Opted-in preview metadata appears only for affirmative opt-in.
- Non-opted and subscribe-omitted cases have no `workflow:*` tag, `campaignRouting.triggerTag = null`, `campaignRouting.emailSequence = []`, `newsletter:not-consented`, `consent_basis = "no_email_opt_in"`, and `approval_status = "no-auto-send"`.
- Client-forged tags do not survive into server-derived payload tags.
- Disclaimer, approved guardrail version, public categorical input type, and compact Tech GC payload schema are enforced.
- Browser UI gives non-opted users on-page educational value without implying report email, nurture, workflow enrollment, attorney review, or outbound follow-up.
- Visible copy remains educational, no legal advice, no attorney-client relationship, non-confidential, no guarantees, and attorney/privacy/brand/source-current review-gated.

Stop immediately and preserve evidence if any of these occur:
- Any command would use HighLevel, CRM, Supabase, Clio, send, social, ad, or production credentials.
- Any response returns `mode: "live"`, a live `locationId`, or a live HighLevel `contacts/upsert` attempt.
- Any non-opted or subscribe-omitted case receives a workflow tag, `newsletter:ai`, or non-empty email sequence.
- Any forged client tag survives.
- Any negative guard bypasses validation.
- UI asks for or accepts confidential/free-text sensitive input.
- Any workflow, send, enrollment, CRM, Supabase, Clio, public, social, ad, or external side effect appears queued, triggered, saved, or completed.

If stopped: save logs/screenshots/JSON, do not retry with live credentials, and route remediation to the correct specialist before any rerun.

## 6. Human-only / held dependencies

These remain outside Box A and must not be combined with the QA run:
- Supabase expanded-schema DDL blocker: `t_fa6eb9c1`.
- Supabase gated backfill/sync blocker: `t_53d470c6`.
- Source-access recovery / prospecting.
- HighLevel read-only, sandbox, workflow, field, or live remediation.
- Public route, CTA, UTM, email/newsletter, LinkedIn/social, YouTube, ads, Clio, conflicts, suppression, DND, unsubscribe, bounce, prior-touch, legal/ethics/privacy/current-law/brand approvals.

## 7. Operator handoff after approved QA run

The later QA operator should produce:
- Evidence folder populated under the approved dated path.
- A short evidence README and no-token/no-external-action certification.
- A pass/fail matrix against the harness conditions.
- A blocked/remediation note if any stop condition fires.

The later QA operator should not treat a PASS as launch approval. A PASS only means local/no-token QA evidence is ready for Jeff/Whiteford review.

## 8. Copy/paste Jeff approval or hold text

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

```text
HOLD: Do not run Tech GC Box A local/no-token QA yet.

Reason:
- [ ] Need attorney/privacy/brand/source-current review first.
- [ ] Need different synthetic TEST payload labels or evidence folder.
- [ ] Need tighter non-subscriber/browser-only policy first.
- [ ] Need additional negative cases or stop conditions first.
- [ ] Need HighLevel field/workflow guard path first.
- [ ] Need operator/evidence capture assignment first.
- [ ] Other: ____________________________

All public/external/live-system boundaries remain in place.

Approver:
Date:
Notes:
```

```text
REQUEST REVISIONS: Revise the Tech GC Box A local/no-token QA execution packet before approval.

Required revisions:
- [ ] Change scope.
- [ ] Change prerequisites.
- [ ] Change synthetic payload rules.
- [ ] Change evidence folder naming.
- [ ] Change pass/fail or stop conditions.
- [ ] Change approval/hold text.
- [ ] Other: ____________________________

This request does not approve any QA run, live-system action, public change, CRM mutation, workflow action, or send.

Approver:
Date:
Notes:
```

## 9. Source anchors

- `docs/digests/2026-05-10_sunday_morning_decision_packet.md`
- `docs/digests/2026-05-10_sunday_decision_packet_review_deck.html`
- `docs/controlled-pilot/tech_gc_local_no_token_qa_harness_plan_2026-05-09.md`
- `docs/controlled-pilot/tech_gc_controlled_pilot_morning_approval_checklist_2026-05-09.md`
