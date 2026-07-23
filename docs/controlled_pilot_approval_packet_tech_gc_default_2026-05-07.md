# Controlled-Pilot Approval Packet — Tech GC Default

Task: `t_f9013303`
Date: 2026-05-07
Tenant: whiteford-mountain-west
Workspace: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages`
HighLevel location: Whiteford Schell IP (`tm68WWMrcAa3TqQbEAMa`)
Status: approval packet only. This does not approve activation, external sends, workflow publication, contact enrollment, production env changes, public publishing, social/LinkedIn action, ads, Clio writes, or live client/prospect outreach.

## One-page executive version

### Recommendation

Recommend the first controlled-pilot lane as Tech GC / Tech Company Legal Health Checklist.

Reason: Tech GC is the broadest and lowest-risk first lane because it is an educational operating-readiness diagnostic for technology companies, uses non-confidential categorical inputs, naturally routes to a bounded Tech Company OGC Launchpad review, and can expose cross-lane routing signals without automatically enrolling the contact in AI Compliance, AI Patent, or Founder M&A workflows. The parent evidence confirms the server-side consent/disclaimer guardrails now cover Tech GC, the app participates in the shared lead-magnet guardrail v2 parity checks, and the Tech GC workflow exists in HighLevel as Draft/Off.

Approval posture: Jeff can approve this packet for internal controlled pilot QA only after the hardening tranche closes the remaining HighLevel field and UI guard evidence gaps. This packet is intentionally staged so Jeff can review it now, but the execution gate remains closed until the missing-field and Draft/Off guard evidence is complete.

### Alternative lane: AI Compliance

AI Compliance is the timely alternative because market urgency around AI governance is high, the AI Compliance app was repaired to shared `lead-magnet-guardrail-v2` parity, and prior smoke-test patterns exist for AI Compliance opt-in / non-opt-in behavior. Tradeoffs:

- Upside: stronger topical urgency and prior test evidence for AI Compliance routing.
- Downside: narrower lane, potentially more legal/current-law sensitivity, copy review burden is higher, and the final readiness report still flagged AI Compliance Create/Update Opportunity behavior for review before activation.
- Decision: keep AI Compliance as the backup first lane only if Jeff wants the timeliest AI governance pilot and attorney/privacy review is ready to treat the copy/current-law posture as the primary gate.

### Exact pilot mode requested

Approve only this mode:

- Internal controlled QA using Jeff-owned `TEST - Jeff-owned` records only.
- Local/preview-mode `/api/leads` tests first with HighLevel credentials absent or disabled.
- Optional later live HighLevel test-record write only after Jeff separately approves the exact test records and confirms production/staging env scope.
- HighLevel workflow remains Draft/Off for the entire packet unless Jeff separately signs an activation packet.
- No external recipients, no production audience, no prospects, no researched/imported contacts, no social/LinkedIn/ads/Clio.

### Selected Tech GC objects

- Public/source route for QA: `/colorado-tech-general-counsel#lead-magnet`.
- API campaign key: `tech-gc`.
- Lead magnet: Colorado Tech Company Legal Health Checklist.
- Recommended offer: Tech Company OGC Launchpad.
- Trigger tag only after affirmative Tech GC opt-in: `workflow:tech-gc-launchpad`.
- HighLevel workflow: `WF | Intake | Whiteford | Tech GC Launchpad | Draft`.
- Workflow ID: `dee4450a-1b7b-4597-9fa4-9c7b7423b848`.
- Read-only API status from parent evidence: `draft`.

### Approval checklist summary

Jeff should not approve any activation until all boxes below are checked:

1. Copy: final Tech GC app/report/email copy approved; no legal advice, no outcome promises, no confidential-info request.
2. Legal/ethics/privacy: attorney-advertising, no attorney-client relationship, conflicts caveat, privacy policy, data minimization, unsubscribe/preference, sender identity, and footer/address approved.
3. Suppression/conflicts: DND, unsubscribe, bounce, suppression, `outreach:do-not-send`, `ops:no-auto-send`, `newsletter:not-consented`, `Approval Status`, and conflicts/adverse-party hold checks verified before any message step.
4. Vercel env decision: production remains without live HighLevel credentials unless Jeff separately approves an exact test-record write scope. Do not add `GHL_PRIVATE_INTEGRATION_TOKEN` or `GHL_LOCATION_ID` to production as part of this packet.
5. HighLevel fields/workflow guards: missing required fields created/verified, selected workflow still Draft/Off, trigger limited to Tech GC source and tag, step-level guards captured with screenshot/DOM evidence.
6. Dashboard evidence: private `/pilot-readiness` evidence captured before/after QA, including route, workflow state, field verification, API matrix results, and no-send confirmation.

### Still forbidden until separate Jeff approval

The following remain forbidden after this packet unless Jeff separately approves a specific activation packet: production environment credential addition, HighLevel workflow activation/publication, contact enrollment, external email/SMS/DM sends, social/LinkedIn actions, ad launch, Clio writes, public publishing, and client/prospect-facing changes.

## Evidence basis

Parent outputs reviewed:

- `t_b510cddc`: `/api/leads` now enforces server-side disclaimer/version/schema gates for known lead-magnet report requests, strips client-supplied tags, and keeps non-opted contacts at `Approval Status = no-auto-send` with no workflow tag and no email sequence.
- `t_7b55f4e0`: AI Compliance is repaired to shared `lead-magnet-guardrail-v2` parity; static and API tests cover all four interactive lead magnets including Tech GC.
- `t_316491ce`: read-only HighLevel API confirms all four Whiteford intake workflows are `draft`, including Tech GC ID `dee4450a-1b7b-4597-9fa4-9c7b7423b848`; however, only 6 of 37 required guardrail/mapped fields exist, leaving missing-field creation and UI-level step guard evidence as blockers before realistic live-field smoke testing or activation.

Primary source documents:

- `docs/final_pilot_readiness_report_t_8640b54c.md`
- `docs/highlevel_guardrail_v2_field_workflow_verification_2026-05-07.md`
- `docs/api_leads_server_guardrail_hardening_2026-05-07.md`
- `docs/ai_compliance_guardrail_test_parity_2026-05-07.md`
- `docs/tech_company_legal_health_checklist_app_spec.md`
- `docs/tech_gc_legal_health_checklist_fulfillment_nurture_copy_2026-05-07.md`

## Lane decision record

| Decision | Recommendation | Rationale | Tradeoff / blocker |
| --- | --- | --- | --- |
| First lane | Tech GC | Broad, lower-risk educational operating-readiness diagnostic; not tied to current-law AI compliance conclusions; useful across contracts, IP, employment/contractor, privacy/security, AI/data, corporate, and diligence readiness. | Requires missing Tech GC fields and UI guard evidence before live HighLevel field smoke test. |
| Backup lane | AI Compliance | Timely market demand and repaired v2 parity. | More legal/current-law sensitivity; AI Compliance opportunity behavior still needs review before activation. |
| Pilot environment | Local/preview first; no production HighLevel credential addition in this packet | Parent evidence treats absent production HighLevel credentials as a safety-positive blocker. | If Jeff wants live test-record writes, approve a separate environment/test-record scope. |
| HighLevel workflow state | Draft/Off only | Parent API evidence confirms draft; activation is outside this packet. | Cannot test live automation execution; only routing/readiness/no-send evidence. |
| Records | Jeff-owned TEST records only | Contains risk and avoids real prospects/client-facing action. | Actual test-record write requires Jeff approval of emails and owner labels. |

## Exact internal test scope

### Scope boundary

Allowed in this packet after Jeff approval:

- Local/preview `/api/leads` matrix tests for Tech GC using no-token preview mode.
- Browser/local review of `/colorado-tech-general-counsel#lead-magnet` and private dashboard `/pilot-readiness`.
- Read-only HighLevel checks and screenshots/DOM evidence of Draft/Off state and guard conditions.
- Optional Jeff-approved HighLevel test-record creation/update only if the exact records below are approved and production/staging env scope is separately confirmed.

Not allowed in this packet:

- No activation or publish of HighLevel workflows.
- No email/SMS/DM/social/LinkedIn/ad sends.
- No enrollment of contacts into workflow automation.
- No real prospects, imported leads, researched leads, client records, or third-party contacts.
- No production env var addition.
- No Clio writes.
- No public publishing or client-facing changes.

### Test records

Use exactly these record definitions unless Jeff substitutes different Jeff-owned addresses in writing. Do not use third-party, prospect, client, imported, or researched contacts.

| Record | Purpose | Contact name | Email | Company | Owner/label | Allowed source channel | Required labels/tags |
| --- | --- | --- | --- | --- | --- | --- | --- |
| TG-OPTIN-001 | Opted-in Tech GC path | `TEST - Jeff-owned Tech GC Opt-In` | `jeff+whiteford-tech-gc-optin-test@schellip.com` | `TEST - Jeff Growth OS Pilot` | Jeff-owned internal QA only | `jeff-controlled-pilot-tech-gc` | `internal-test`, `controlled-pilot`, `tech-gc-pilot`, `production-smoke-test` only if Jeff separately approves production smoke test |
| TG-NOOPT-001 | Non-opted/no-send path | `TEST - Jeff-owned Tech GC No Opt-In` | `jeff+whiteford-tech-gc-nooptin-test@schellip.com` | `TEST - Jeff Growth OS Pilot` | Jeff-owned internal QA only | `jeff-controlled-pilot-tech-gc` | `internal-test`, `controlled-pilot`, `tech-gc-pilot`, `newsletter:not-consented` expected from server |
| TG-MALICIOUS-001 | Client-tag injection negative path; preview/local only unless Jeff approves live write | `TEST - Jeff-owned Tech GC Malicious Tag Strip` | `jeff+whiteford-tech-gc-malicious-test@schellip.com` | `TEST - Jeff Growth OS Pilot` | Jeff-owned internal QA only | `jeff-controlled-pilot-tech-gc-negative` | Client-submitted `workflow:ai-compliance-readiness`, `workflow:ma-readiness`, or `workflow:malicious-client-tag` must be stripped; do not persist live unless separately approved |
| TG-SUPPRESS-001 | Suppression/no-send guard review; HighLevel manual/UI only | `TEST - Jeff-owned Tech GC Suppression Guard` | `jeff+whiteford-tech-gc-suppressed-test@schellip.com` | `TEST - Jeff Growth OS Pilot` | Jeff-owned internal QA only | `jeff-controlled-pilot-tech-gc-suppression` | `outreach:do-not-send` or `ops:no-auto-send` if Jeff approves manual test tagging; must not send |

Production note: if `jeff+...@schellip.com` aliases are not confirmed usable, Jeff must provide alternate owned test inboxes before any live CRM write. Local/preview tests can use these as synthetic payload values without sending.

### Source route and payload

Selected route:

- Browser route: `/colorado-tech-general-counsel#lead-magnet`.
- API route: `POST /api/leads`.
- Campaign key: `tech-gc`.
- Source page field: `/colorado-tech-general-counsel#lead-magnet` or `colorado-tech-general-counsel#lead-magnet` exactly as emitted by the app.
- Source channel for pilot: `jeff-controlled-pilot-tech-gc`.
- Guardrail metadata required for report request:
  - `disclaimerAccepted = true`
  - `privacyGuardrailVersion = lead-magnet-guardrail-v2`
  - `publicFormInputType = categorical_non_confidential`
  - `reportRequested = true`

### Expected tags

Opted-in record (`TG-OPTIN-001`):

- Must include:
  - `whiteford-mountain-west`
  - `leadmagnet:tech-gc-checklist`
  - `interest:tech-ogc`
  - `newsletter:ai`
  - `workflow:tech-gc-launchpad`
  - `internal-test`
  - `controlled-pilot`
  - `tech-gc-pilot`
- Must not include:
  - `newsletter:not-consented`
  - `workflow:ai-compliance-readiness`
  - `workflow:ai-patent-strategy`
  - `workflow:ma-readiness`
  - `workflow:malicious-client-tag`
  - any LinkedIn/social/ad/SMS/Clio tag

Non-opted record (`TG-NOOPT-001`):

- Must include:
  - `whiteford-mountain-west`
  - `leadmagnet:tech-gc-checklist`
  - `interest:tech-ogc`
  - `newsletter:not-consented`
  - `internal-test`
  - `controlled-pilot`
  - `tech-gc-pilot`
- Must not include:
  - `newsletter:ai`
  - `workflow:tech-gc-launchpad`
  - any other `workflow:*` trigger tag

### Expected custom fields

Shared fields expected where HighLevel fields exist:

| API/custom field | Opted-in expected value | Non-opted expected value | Status from parent evidence |
| --- | --- | --- | --- |
| `campaign_key` | `tech-gc` | `tech-gc` | Existing shared mapping from implementation docs; verify in payload/HL evidence. |
| `campaign_label` | `Tech GC Launchpad Nurture` | `Tech GC Launchpad Nurture` | Existing shared mapping from implementation docs; verify. |
| `authority_pillar` | `Tech Outside General Counsel` | `Tech Outside General Counsel` | Existing shared mapping from implementation docs; verify. |
| `source_page` | `/colorado-tech-general-counsel#lead-magnet` | `/colorado-tech-general-counsel#lead-magnet` | Existing shared mapping from implementation docs; verify. |
| `source_channel` | `jeff-controlled-pilot-tech-gc` | `jeff-controlled-pilot-tech-gc` | Existing shared mapping from implementation docs; verify. |
| `lead_magnet` | `Colorado Tech Company Legal Health Checklist` | `Colorado Tech Company Legal Health Checklist` | Existing shared mapping from implementation docs; verify. |
| `recommended_offer` | `Tech Company OGC Launchpad` | `Tech Company OGC Launchpad` | Existing shared mapping from implementation docs; verify. |
| `role` | submitted role, e.g. `Founder/CEO` | submitted role, e.g. `Founder/CEO` | Existing shared mapping from implementation docs; verify. |
| `consent_basis` | `lead_magnet_email_opt_in:tech-gc` | `no_email_opt_in` | Parent API confirms field exists. |
| `approval_status` | `pending` | `no-auto-send` | Parent API confirms field exists. |
| `privacy_guardrail_version` | `lead-magnet-guardrail-v2` | `lead-magnet-guardrail-v2` if report requested | Missing in HighLevel parent evidence; must be created/verified before live field smoke test. |
| `public_form_input_type` | `categorical_non_confidential` | `categorical_non_confidential` if report requested | Missing; must be created/verified. |
| `disclaimer_acknowledged` | `true` | `true` if report requested | Missing; must be created/verified. |
| `report_requested` | `true` | `true` if report requested | Missing; must be created/verified. |
| `tech_legal_health_privacy_guardrail_version` | `lead-magnet-guardrail-v2` | `lead-magnet-guardrail-v2` if mapped | Missing; must be created/verified. |
| `tech_legal_health_report_version` | approved Tech GC report version | approved Tech GC report version if submitted | Missing; must be created/verified. |
| `tech_legal_health_score` | score 0-100 | score 0-100 if submitted | Missing; must be created/verified. |
| `tech_legal_health_band` | one approved score-band label | one approved score-band label if submitted | Missing; must be created/verified. |
| `tech_legal_health_company_moment` | selected milestone | selected milestone if submitted | Missing; must be created/verified. |
| `tech_legal_health_lowest_category` | lowest category key/label | lowest category key/label if submitted | Missing; must be created/verified. |
| `tech_legal_health_category_scores` | compact JSON/long text | compact JSON/long text if submitted | Missing; must be created/verified. |
| `tech_legal_health_top_actions` | compact list/JSON | compact list/JSON if submitted | Missing; must be created/verified. |
| `tech_legal_health_branch_signals` | compact JSON; non-trigger only | compact JSON; non-trigger only | Missing; must be created/verified. |
| `tech_legal_health_answers_json` | compact categorical JSON | compact categorical JSON if submitted | Missing; must be created/verified. |

Field gate: parent `t_316491ce` confirms only 6 of 37 required fields are present. Do not run a live HighLevel field smoke test for Tech GC until the missing-field list is approved, created, and re-verified.

### Workflow IDs/names and Draft/Off state

| Lane | Workflow name | Workflow ID | Parent API status | Controlled-pilot use |
| --- | --- | --- | --- | --- |
| Tech GC | `WF | Intake | Whiteford | Tech GC Launchpad | Draft` | `dee4450a-1b7b-4597-9fa4-9c7b7423b848` | `draft` | Selected first lane; inspect only, do not activate. |
| AI Compliance | `WF | Intake | Whiteford | AI Compliance Gameplan | Draft` | `682ada5f-fa1e-4411-97d6-a1e019139614` | `draft` | Backup lane only; no activation from this packet. |
| AI Patent | `WF | Intake | Whiteford | AI Patent Strategy Scorecard | Draft` | `8dbff7fd-caa0-49b3-ba16-bd46b4a1f1d7` | `draft` | Not first lane; advanced-builder/manual guard concerns remain. |
| Founder M&A | `WF | Intake | Whiteford | Founder M&A Readiness | Draft` | `4be5ea96-b497-4149-be72-f38aa136da35` | `draft` | Not first lane. |

Required Tech GC workflow guard evidence before any activation packet:

- Workflow status screenshot/DOM evidence shows Draft/Off, not Published/Active.
- Trigger is limited to `workflow:tech-gc-launchpad` from approved Tech GC source route.
- `newsletter:ai` present before any email/nurture step.
- `Consent Basis` starts with `lead_magnet_email_opt_in:tech-gc`.
- `newsletter:not-consented` absent.
- `outreach:do-not-send` absent.
- `ops:no-auto-send` absent for any external action path.
- Contact DND/unsubscribe/bounce/suppression is false/not present.
- `Approval Status` is not `no-auto-send`, `suppressed`, `revise`, `rejected`, blank, or unknown before any message step.
- `disclaimer_acknowledged = true`.
- `privacy_guardrail_version = lead-magnet-guardrail-v2`.
- `public_form_input_type = categorical_non_confidential`.
- No SMS, voicemail, webhook-to-send, social, LinkedIn, ad, Clio, opportunity mutation, or public side effect is enabled.

### Expected no-send behavior

For every QA case in this packet:

- HighLevel workflow remains Draft/Off.
- No workflow is manually enrolled or started for a real contact.
- No email/SMS/DM/social/LinkedIn/ad/Clio action executes.
- API response may preview an email sequence for opted-in Tech GC, but preview count is not a send authorization.
- Non-opted Tech GC response must have `campaignRouting.triggerTag = null`, `campaignRouting.emailSequence = []`, `approval_status = no-auto-send`, and no `newsletter:ai`.
- Malicious or client-supplied workflow tags must be absent from server-derived tags.
- Any evidence folder must state: no external send, no activation, no enrollment, no public publish.

### Rollback plan

If an internal test creates/updates a Jeff-owned TEST HighLevel record after separate approval:

1. Immediately capture the response payload and HighLevel visible record evidence.
2. Confirm workflow status is still Draft/Off.
3. Remove or mark test-only tags if Jeff requests cleanup; do not alter non-test records.
4. If any unexpected workflow tag appears, remove the unexpected tag from the TEST record and document it as a blocker.
5. If any email/SMS/social/DM/ad/Clio action appears queued, pause/stop the workflow if possible, preserve screenshots, and block the next step for human review.
6. If production env credentials were temporarily enabled under a separate approval, remove/disable them after the test window and capture Vercel env state evidence.
7. Record final no-send/no-enrollment/no-public-action evidence in a dated QA artifact and the private `/pilot-readiness` dashboard evidence log.

## Detailed QA matrix

| Gate | Test | Method | Expected result | Evidence to capture | Owner | Status before Jeff approval |
| --- | --- | --- | --- | --- | --- | --- |
| Lane selection | Confirm first lane | Review this packet and parent evidence | Tech GC selected; AI Compliance documented as backup | Jeff approval note / Kanban comment | Jeff | Pending |
| Route review | Open Tech GC source route | Local/preview browser: `/colorado-tech-general-counsel#lead-magnet` | App shows non-confidential questions, partial value, disclaimer, unchecked optional opt-in | Screenshot of form, disclaimer, opt-in default | PM/browser QA | Pending |
| Dashboard review | Open private dashboard | `/pilot-readiness` | Dashboard reflects internal-only readiness, blockers, workflow status, evidence pointers | Screenshot/export | PM/browser QA | Pending |
| Server guardrail | Missing disclaimer negative | Local/preview `POST /api/leads` with `reportRequested=true`, missing/false `disclaimerAccepted` | 400 before HighLevel branch | API response artifact | Engineering QA | Parent covered generally; Tech GC case pending |
| Server guardrail | Wrong guardrail version negative | Local/preview with wrong `privacyGuardrailVersion` | 400 before HighLevel branch | API response artifact | Engineering QA | Parent covered generally; Tech GC case pending |
| Payload minimization | Oversized/free-text negative | Local/preview with oversized or non-allowlisted Tech GC payload fields | 400 / rejected; no HighLevel branch | API response artifact | Engineering QA | Parent covered generally; Tech GC case pending |
| Opt-in route | TG-OPTIN-001 preview | No-token preview `POST /api/leads`, `contact.subscribe=true` | Tags include `newsletter:ai` and only `workflow:tech-gc-launchpad`; `consent_basis=lead_magnet_email_opt_in:tech-gc`; `approval_status=pending`; sequence preview allowed | JSON response | Engineering QA | Pending |
| Non-opt route | TG-NOOPT-001 preview | No-token preview `POST /api/leads`, `contact.subscribe=false` | No `workflow:*`; no `newsletter:ai`; includes `newsletter:not-consented`; `consent_basis=no_email_opt_in`; `approval_status=no-auto-send`; sequence `[]` | JSON response | Engineering QA | Pending |
| Malicious tag | TG-MALICIOUS-001 preview | Submit client tags including other lane workflows and malicious workflow tag | Server strips client tags; only server-derived Tech GC tags remain; no other lane trigger | JSON response | Engineering QA | Parent covered generally; Tech GC case pending |
| Field presence | HighLevel custom-field verification | Read-only custom fields API after missing-field remediation | All Tech GC/shared guardrail fields exist with expected `contact.<api_key>` keys | Redacted API JSON | HighLevel operator/reviewer | Blocked until missing fields approved/created |
| Workflow status | Draft/Off evidence | Read-only API plus UI screenshot | `dee4450a-1b7b-4597-9fa4-9c7b7423b848` remains draft/off | API JSON + screenshot/DOM | HighLevel operator | API parent passed; UI evidence pending |
| Trigger guard | Correct trigger | HighLevel UI inspection only | Trigger is limited to `workflow:tech-gc-launchpad` and approved source route; no generic tags/prospects/manual social route | Screenshot/DOM | HighLevel operator | Pending |
| Consent guards | Consent conditions before message steps | HighLevel UI inspection only | `newsletter:ai`, consent-basis prefix, guardrail version, disclaimer, input type, and source route checked before any external action | Screenshot/DOM | HighLevel operator | Pending |
| Suppression guards | DND/unsubscribe/no-send checks | HighLevel UI inspection only | DND, unsubscribe/bounce/suppression, `newsletter:not-consented`, `outreach:do-not-send`, `ops:no-auto-send`, and bad approval statuses exit/skip | Screenshot/DOM | HighLevel operator | Pending |
| Copy approval | App/report/email copy review | Review `docs/tech_gc_legal_health_checklist_fulfillment_nurture_copy_2026-05-07.md` plus live app copy | Educational only, no legal advice, no confidential-info request, no guarantees, no representation implication | Approval checklist | Jeff/attorney/privacy reviewer | Pending |
| Footer/unsubscribe | Deliverability/legal footer | Review email drafts and HighLevel sender/footer settings | Sender identity, firm address/footer, unsubscribe/preference handling, and no-attorney-client/conflicts caveat approved | Screenshot/export | Jeff/HighLevel operator | Pending |
| Vercel env | Production credential decision | Vercel env read-only check or deployment settings review | Do not add production `GHL_PRIVATE_INTEGRATION_TOKEN` or `GHL_LOCATION_ID` in this packet; if absent, keep absent | Redacted env evidence | DevOps/Jeff | Pending |
| Live TEST write | Optional TG-OPTIN-001 live write | Only after separate Jeff approval of exact env + record | Jeff-owned TEST record created/updated; no send; workflow still draft/off | Response payload + HighLevel screenshot | Jeff/approved operator | Not approved in this packet |
| Live no-opt write | Optional TG-NOOPT-001 live write | Only after separate Jeff approval of exact env + record | Jeff-owned TEST record has `newsletter:not-consented`, no workflow tag, no sequence | Response payload + HighLevel screenshot | Jeff/approved operator | Not approved in this packet |
| Rollback | TEST cleanup | Manual cleanup only for approved TEST records | Unexpected tags removed; env disabled if separately enabled; evidence preserved | Cleanup log | Jeff/approved operator | Pending if live test occurs |
| Final review | No-send certification | Review all artifacts | No external send, activation, enrollment, public publish, social/LinkedIn/ad/Clio action occurred | Final QA note | Reviewer | Pending |

## Jeff approval checklist

Jeff should approve or reject each item explicitly before any controlled pilot moves beyond local/preview QA.

### Copy and UX

- [ ] Tech GC route and app copy approved for internal QA.
- [ ] Full-report and email copy approved as draft-only.
- [ ] No legal advice, legal conclusion, guarantee, specialization/outcome claim, or confidential-info request.
- [ ] Opt-in checkbox is unchecked by default and language is specific to the Tech Company Legal Health Checklist report and related educational emails.
- [ ] Partial value is available before opt-in.

### Legal, ethics, privacy, footer, unsubscribe

- [ ] Attorney/ethics review approves educational-only framing, no attorney-client relationship language, conflicts/written-engagement caveat, and no misleading claim posture.
- [ ] Privacy review approves categorical non-confidential inputs, data minimization, retention/report access approach, privacy-policy link, and no sensitive free-text collection.
- [ ] Sender identity, firm footer/physical address, unsubscribe/preference handling, and deliverability requirements are approved before any future send.
- [ ] SMS/DM/social/LinkedIn/ad channels remain excluded.

### Suppression and conflicts

- [ ] DND/unsubscribe/bounce/suppression status checks are verified.
- [ ] `outreach:do-not-send`, `ops:no-auto-send`, `newsletter:not-consented`, and disqualifying `Approval Status` values exit/skip any external action.
- [ ] Conflict/adverse-party/firm-review holds are represented as blockers before any human follow-up.
- [ ] Real prospects, researched lists, imported contacts, current clients, and third-party records are excluded from the controlled pilot.

### Vercel environment decision

- [ ] Production remains preview/no-CRM unless Jeff separately approves adding live HighLevel credentials for exact TEST records.
- [ ] No production env vars are added as part of this packet.
- [ ] If a later live test is approved, env scope, duration, rollback, and evidence capture are written before credentials are added.

### HighLevel fields and workflow guards

- [ ] Missing required fields are approved, created, and re-verified by read-only evidence.
- [ ] Tech GC workflow ID `dee4450a-1b7b-4597-9fa4-9c7b7423b848` remains Draft/Off.
- [ ] Trigger source is limited to `workflow:tech-gc-launchpad` and approved Tech GC route/source.
- [ ] Message-step guards include consent, suppression, approval status, disclaimer, guardrail version, input type, source route, no DND/unsubscribe, and no non-consented status.
- [ ] No message/social/Clio/ad/webhook side effects are enabled.

### Dashboard evidence capture

- [ ] `/pilot-readiness` dashboard evidence captured before QA.
- [ ] API matrix JSON evidence saved.
- [ ] HighLevel field/workflow screenshots or DOM evidence saved.
- [ ] Final no-send/no-enrollment/no-public-action certification saved.
- [ ] Dashboard or follow-up Kanban deliverable links to the evidence artifacts.

## Forbidden until separate activation approval

This packet does not authorize any of the following:

- Adding production `GHL_PRIVATE_INTEGRATION_TOKEN` or `GHL_LOCATION_ID`.
- Activating, publishing, enabling, or manually starting a HighLevel workflow.
- Enrolling contacts in automation.
- Sending email, SMS, DM, voicemail, LinkedIn messages, social posts, or ads.
- Publishing public/client-facing pages, forms, posts, campaigns, or ads.
- Adding real prospects, researched/imported contacts, existing clients, or third-party contacts to the pilot.
- Creating or changing non-test HighLevel contacts/opportunities.
- Writing to Clio.
- Connecting social/LinkedIn/ad/Clio actions to the Tech GC pilot.

## Recommended next action

Jeff should review this packet after the HighLevel hardening tranche completes the missing-field creation/verification and UI-level Draft/Off guard evidence. If Jeff agrees with Tech GC as the first lane, the next worker should prepare a dated internal QA evidence folder and run the local/preview Tech GC matrix only, with no live HighLevel write unless Jeff separately approves the exact TEST records and environment scope.

## Approval decision block

Decision requested from Jeff:

- [ ] Approve Tech GC as first internal controlled-pilot lane for local/preview QA only.
- [ ] Approve AI Compliance instead as first lane; state why.
- [ ] Hold both lanes until HighLevel field/workflow guard evidence is complete.
- [ ] Approve a separate live Jeff-owned TEST-record write scope; attach exact env, records, time window, rollback, and owner.

Default recommendation: approve Tech GC for local/preview internal QA after hardening evidence is complete; do not approve live HighLevel writes or activation in this packet.
