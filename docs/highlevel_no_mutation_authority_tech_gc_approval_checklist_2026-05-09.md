# HighLevel No-Mutation Authority + Tech GC Approval Checklist — 2026-05-09

Task: `t_22ec6ee9`
Tenant: `whiteford-mountain-west`
HighLevel location: Whiteford Schell IP (`tm68WWMrcAa3TqQbEAMa`)
Pipeline context: Whiteford Schell IP Pipeline (`Tbx4tA6wHv5lTwZPSHyZ`)
Status: INTERNAL APPROVAL CHECKLIST ONLY / NO-MUTATION / NOT APPROVED FOR HIGHLEVEL EDITING, TESTING, SENDING, WORKFLOW ACTIVATION, CONTACT ENROLLMENT, CRM MUTATION, OR EXTERNAL USE.

No email, SMS, DM, LinkedIn message, LinkedIn post, social post, newsletter, ad, HighLevel API write, HighLevel UI edit, campaign/template/newsletter creation, test send, workflow publish/activation/test/manual-start, contact enrollment, tag creation/application, contact/opportunity/task/note/field mutation, Supabase write, Clio action, public-page publish/deploy, or client/prospect-facing action is approved by this checklist.

## 1. Purpose

This checklist unifies the current consent-gated HighLevel decisions before any later manual HighLevel work for:

- the four evergreen authority lanes, including sender/footer/unsubscribe/privacy decisions; and
- the Tech Company Legal Health Checklist / Tech GC controlled-pilot lane.

It converts the source packets into one operator-facing approval gate. Use it to decide whether a future authorized HighLevel browser operator may proceed with manual draft/off configuration, read-only verification, or continued hold. This checklist itself authorizes documentation review only.

## 2. Source packet control set

- `docs/highlevel_authority_email_sender_footer_unsubscribe_decision_packet_2026-05-09.md`
- `docs/highlevel_guardrail_v2_no_mutation_field_manifest_2026-05-08.md`
- `docs/highlevel_guardrail_v2_post_approval_verification_packet_2026-05-08.md`
- `docs/highlevel_second_consent_gate_ui_pass_t_437a51c1.md`
- `docs/controlled-pilot/tech_gc_opt_in_only_nurture_copy_packet_2026-05-09.md`

If any later artifact conflicts with this checklist, stop and use the stricter/no-mutation interpretation until Jeff resolves the conflict in writing.

## 3. Explicit approval scopes Jeff may choose

Approval of one scope does not imply approval of another.

### Scope A — Documentation-only approval

```text
I approve docs/highlevel_no_mutation_authority_tech_gc_approval_checklist_2026-05-09.md as internal documentation-only decision prep. This does not authorize HighLevel UI/API edits, field creation, workflow edits, workflow testing, test sends, activation, contact enrollment, contact/opportunity/tag/task/note mutation, CRM/Supabase/Clio changes, email/SMS/DM/social/LinkedIn/ad activity, public publishing, or client/prospect-facing use.
```

### Scope B — Read-only verification only

```text
I approve a future authorized operator to perform read-only verification only in the Whiteford Schell IP HighLevel location (tm68WWMrcAa3TqQbEAMa), using the exact checklist and commands in docs/highlevel_no_mutation_authority_tech_gc_approval_checklist_2026-05-09.md. No HighLevel field/workflow/contact/opportunity/tag/task/note/campaign/message/social/ad mutation, test send, workflow test, manual start, activation, enrollment, or external action is authorized.
```

### Scope C — Manual Contact-field creation only, then read-only verifier

```text
I approve manual HighLevel UI creation, in Whiteford Schell IP (tm68WWMrcAa3TqQbEAMa) only, of the 31 Contact custom fields listed in docs/highlevel_guardrail_v2_post_approval_verification_packet_2026-05-08.md and summarized in docs/highlevel_no_mutation_authority_tech_gc_approval_checklist_2026-05-09.md, using the exact labels, types, expected generated keys, and six-batch order. This approval does not authorize workflow save/publish/activation/manual-start/test, contact enrollment, contact/opportunity/tag/task/note mutation, email/SMS/DM/LinkedIn/social/ad/campaign activity, public publishing, Clio/Supabase/env changes, creation of any field outside the list, or script/API field creation. After manual creation, run only the read-only verifier and stop unless expectedCount=37, presentCount=37, missingCount=0, typeMismatchCount=0, fieldKeyRiskCount=0, pass=true.
```

### Scope D — Draft/off consent-gate workflow remediation packet preparation only

```text
I approve preparation of a separate draft/off HighLevel workflow remediation operator packet for the authority and Tech GC consent gates. This approval authorizes packet drafting only, not HighLevel editing. The packet must keep workflows Draft/Off, use one absent-tag condition per segment, require verified consent-basis/custom-field/DND/unsubscribe/bounce/suppression operator mappings, include screenshots/evidence steps, and forbid Publish, Test Workflow, manual start, enrollment, sends, CRM mutation, and external actions.
```

### Scope E — Hold

```text
Hold all HighLevel field, workflow, sender/footer/unsubscribe, campaign/template/newsletter, test-send, activation, enrollment, CRM, Supabase, Clio, public, email/SMS/DM/social/LinkedIn/ad, and external/client/prospect-facing actions until Jeff/Whiteford resolves the sender, footer, unsubscribe, privacy/terms/disclaimer, consent, suppression, legal/ethics, brand, route, and workflow decisions.
```

## 4. Sender, reply-to, footer, unsubscribe, and policy decisions required before any HighLevel email asset

No future email template, campaign, newsletter, workflow email step, test send, or send may be loaded or used until every item below is approved in exact copy.

| Decision | Required approval | Stop condition |
| --- | --- | --- |
| Sender identity | Exact display name, sender email/domain, Whiteford/Schell IP brand posture, domain approval, deliverability approval. | Placeholder, guessed, unapproved, or brand-policy uncertainty. |
| Reply-to | Exact reply-to address, monitor/owner, inbound handling for legal inquiries, confidential replies, conflicts-sensitive replies, unsubscribe replies, complaints, and bounces. | Replies might invite confidential facts or no owner/escalation path exists. |
| Footer/postal address | Exact legal/firm entity name, physical mailing address, co-brand hierarchy, phone/site links if any, attorney-responsibility/jurisdiction language if required. | Any guessed address, missing physical address, or unresolved CAN-SPAM/firm policy issue. |
| Unsubscribe/preferences | Approved HighLevel unsubscribe or preference mechanism, category scope, DND/suppression handling, manual unsubscribe-by-reply owner, resubscribe standard. | No functioning unsubscribe/preference path or uncertainty about DND/suppression enforcement. |
| Privacy/terms/disclaimer/attorney advertising | Exact URLs and required body/footer caveats for no legal advice, no attorney-client relationship, no confidential information, no guarantees, conflicts/scope/written engagement. | Missing URLs, placeholder URLs, unresolved attorney-advertising treatment, or copy lacks caveats. |
| Consent source | Exact opt-in language, optional unchecked checkbox, route/source/timestamp/consent-version requirements, field/tag names, non-subscriber policy. | Consent is inferred, imported, researched, ambiguous, or not specific to the proposed category. |

## 5. Authority lane map — internal labels only, not configuration authority

| Lane | Route / CTA | Default workflow label | Email posture |
| --- | --- | --- | --- |
| AI Patent Strategy Scorecard | `/ai-patent-strategy-scorecard` | `workflow:ai-patent-strategy` | Opt-in-only educational issue-spotting. No patentability, filing, inventorship, ownership, enforcement, or outcome conclusion. |
| AI Compliance Gameplan Builder | `/ai-compliance-gameplan` | `workflow:ai-compliance-readiness` | Opt-in-only educational inventory/governance planning. No compliance opinion, audit, acceptance claim, or risk-elimination promise. |
| Tech Company Legal Health Checklist | `/colorado-tech-general-counsel` | `workflow:tech-gc-launchpad` | Opt-in-only educational workstream prioritization tied to a business milestone. No legal-health opinion, outside-GC relationship implication, or legal-readiness conclusion. |
| Founder M&A Readiness Checklist | Route decision pending; proposed app CTA `/founder-ma-readiness-checklist`, broader service/SEO context `/colorado-startup-ma-lawyer` pending Jeff decision. | `workflow:ma-readiness` | Opt-in-only educational diligence category map. No valuation, buyer-confidence, transaction-readiness, financing, speed, or deal-success claim. |

## 6. Tech GC lane decisions required before manual HighLevel work

Default Tech GC posture: browser/on-page educational value first; email report/nurture only after affirmative Tech GC email opt-in and suppression review.

Required opted-in conditions before any future Tech GC email or workflow step:

1. User affirmatively requested the Tech Company Legal Health Checklist report and related educational emails.
2. Opt-in checkbox was unchecked by default and checked by the user.
3. `consent_basis` starts with `lead_magnet_email_opt_in:tech-gc`.
4. `newsletter:ai` is present.
5. `newsletter:not-consented` is absent.
6. `workflow:tech-gc-launchpad` is present only because approved Tech GC opt-in conditions passed.
7. `leadmagnet:tech-gc-checklist`, `interest:tech-ogc`, and `whiteford-mountain-west` are present only as source/segmentation tags.
8. `approval_status` is an approved eligible state or at minimum not `no-auto-send`, `suppressed`, `revise`, `rejected`, blank, unknown, or equivalent hold.
9. DND, channel DND, unsubscribe, bounce, complaint, suppression, invalid email, internal hold, conflicts hold, privacy hold, prior-touch hold, and deliverability hold are all absent.
10. Sender, footer/postal address, unsubscribe/preference mechanism, privacy/terms/disclaimer URLs, CTA route, and copy are approved.
11. Workflow remains Draft/Off unless Jeff gives separate exact activation/test scope.
12. No SMS, voicemail, DM, LinkedIn, social, ad, Clio, Supabase, cross-lane workflow, or public/client-facing action is attached.

Required non-opted behavior:

- Fulfill the narrow diagnostic in the browser/on-page result only.
- Do not send report email or nurture.
- Do not add `workflow:tech-gc-launchpad`.
- Do not add `newsletter:ai`.
- Add or preserve `newsletter:not-consented` only if the approved app/CRM process generates tags.
- Set or preserve `consent_basis = no_email_opt_in` and `approval_status = no-auto-send` only if the approved app/CRM process writes those fields.
- Keep `campaignRouting.triggerTag = null` and `campaignRouting.emailSequence = []`.
- Do not create an automatic attorney-review task, outbound follow-up, newsletter sequence, SMS, social/LinkedIn action, or adjacent-lane nurture.

## 7. Contact custom-field manual UI tasks — only if Scope C is approved

Manual UI field creation remains blocked unless Jeff approves Scope C above. If approved, the authorized operator must create only Contact custom fields, in these six batches, in HighLevel Settings -> Custom Fields -> Contact. Create one batch, pause, visually verify object/label/type/key, and do not touch workflows or contacts.

Existing verified fields to preserve and not duplicate:

| Display name | Expected key | Type |
| --- | --- | --- |
| Approval Status | `contact.approval_status` | TEXT |
| Consent Basis | `contact.consent_basis` | TEXT |
| AI Patent Score | `contact.ai_patent_score` | NUMERICAL |
| AI Patent Stage | `contact.ai_patent_stage` | TEXT |
| AI Patent Score Band | `contact.ai_patent_score_band` | TEXT |
| AI Patent Checks | `contact.ai_patent_checks` | LARGE_TEXT |

31 missing Contact fields, exact labels/types/expected keys:

| Batch | Field label | Type | Expected generated key |
| ---: | --- | --- | --- |
| 1 | Privacy Guardrail Version | TEXT | `contact.privacy_guardrail_version` |
| 1 | Public Form Input Type | TEXT | `contact.public_form_input_type` |
| 1 | Disclaimer Acknowledged | TEXT | `contact.disclaimer_acknowledged` |
| 1 | Report Requested | TEXT | `contact.report_requested` |
| 2 | AI Compliance Maturity Level | TEXT | `contact.ai_compliance_maturity_level` |
| 2 | AI Compliance Category Scores | LARGE_TEXT | `contact.ai_compliance_category_scores` |
| 2 | AI Compliance Top Gaps | LARGE_TEXT | `contact.ai_compliance_top_gaps` |
| 2 | AI Compliance Recommended Next Step | TEXT | `contact.ai_compliance_recommended_next_step` |
| 2 | AI Compliance Heat Map | LARGE_TEXT | `contact.ai_compliance_heat_map` |
| 2 | AI Compliance 10 Day Fixes | LARGE_TEXT | `contact.ai_compliance_10_day_fixes` |
| 2 | AI Compliance Roadmap 30 60 90 | LARGE_TEXT | `contact.ai_compliance_roadmap_30_60_90` |
| 2 | AI Compliance Report Version | TEXT | `contact.ai_compliance_report_version` |
| 3 | AI Patent Privacy Guardrail Version | TEXT | `contact.ai_patent_privacy_guardrail_version` |
| 3 | AI Patent Report Version | TEXT | `contact.ai_patent_report_version` |
| 3 | AI Patent Recommended Next Step | TEXT | `contact.ai_patent_recommended_next_step` |
| 4 | M&A Readiness Privacy Guardrail Version | TEXT | `contact.ma_readiness_privacy_guardrail_version` |
| 4 | M&A Readiness Input Type | TEXT | `contact.ma_readiness_input_type` |
| 4 | M&A Readiness Report Version | TEXT | `contact.ma_readiness_report_version` |
| 4 | M&A Readiness Score | NUMERICAL | `contact.ma_readiness_score` |
| 4 | M&A Readiness Band | TEXT | `contact.ma_readiness_band` |
| 4 | M&A Readiness Answers JSON | LARGE_TEXT | `contact.ma_readiness_answers_json` |
| 5 | Tech Legal Health Privacy Guardrail Version | TEXT | `contact.tech_legal_health_privacy_guardrail_version` |
| 5 | Tech Legal Health Report Version | TEXT | `contact.tech_legal_health_report_version` |
| 5 | Tech Legal Health Score | NUMERICAL | `contact.tech_legal_health_score` |
| 5 | Tech Legal Health Band | TEXT | `contact.tech_legal_health_band` |
| 5 | Tech Legal Health Company Moment | TEXT | `contact.tech_legal_health_company_moment` |
| 5 | Tech Legal Health Lowest Category | TEXT | `contact.tech_legal_health_lowest_category` |
| 6 | Tech Legal Health Category Scores | LARGE_TEXT | `contact.tech_legal_health_category_scores` |
| 6 | Tech Legal Health Top Actions | LARGE_TEXT | `contact.tech_legal_health_top_actions` |
| 6 | Tech Legal Health Branch Signals | LARGE_TEXT | `contact.tech_legal_health_branch_signals` |
| 6 | Tech Legal Health Answers JSON | LARGE_TEXT | `contact.tech_legal_health_answers_json` |

Field creation stop rules:

- Stop if the object/module is not clearly Contact.
- Stop if a label, punctuation, number order, `M&A`, or `JSON` suffix differs.
- Stop if a type differs from TEXT, LARGE_TEXT, or NUMERICAL as listed.
- Stop if HighLevel generates a key that differs from the expected `contact.<api_key>`.
- Stop if a duplicate or confusingly similar field already exists.
- Stop if the UI requires options, validation, workflow trigger, backfill, contact selection, or any setting not listed.
- Stop if the operator is asked to use an API/script to create fields.

## 8. Read-only verification steps — only after approval or for local saved probes

### Saved-probe dry run, no credentials

This is documentation/local verification only and may be used to confirm the known baseline without touching HighLevel live state.

```bash
python3 scripts/verify_highlevel_guardrail_v2_fields_readonly.py \
  --input docs/highlevel_guardrail_v2_api_probe_2026-05-07.json \
  --output-json docs/highlevel_guardrail_v2_field_dry_run_result_2026-05-07.json \
  --output-md docs/highlevel_guardrail_v2_field_dry_run_result_2026-05-07.md
```

Expected saved-probe baseline: exit code `2`; `expectedCount=37`, `presentCount=6`, `missingCount=31`, `typeMismatchCount=0`, `fieldKeyRiskCount=0`, `pass=false`.

### Live read-only post-creation verifier, authorized operator only

Run only after Jeff-approved manual UI creation of all 31 fields, with an authorized HighLevel token. This verifier may make only a read-only `GET /locations/{locationId}/customFields` call.

```bash
GHL_PRIVATE_INTEGRATION_TOKEN=<token> \
python3 scripts/verify_highlevel_guardrail_v2_fields_readonly.py \
  --live-read-only \
  --location-id tm68WWMrcAa3TqQbEAMa \
  --output-json docs/highlevel_guardrail_v2_field_post_creation_readonly_result_2026-05-08.json \
  --output-md docs/highlevel_guardrail_v2_field_post_creation_readonly_result_2026-05-08.md
```

Expected pass: exit code `0`; `expectedCount=37`, `presentCount=37`, `missingCount=0`, `typeMismatchCount=0`, `fieldKeyRiskCount=0`, `pass=true`.

Verifier stop rules:

- Missing field, type mismatch, generated-key risk, duplicate ambiguity, token error, response-shape error, or inability to save evidence means STOP.
- Do not create additional fields outside the approved list.
- Do not delete/recreate unless the field is new, empty, HighLevel supports safe deletion, and Jeff separately approves exact cleanup.
- Do not proceed to workflow QA, smoke tests, workflow reliance, contact writes, or email use after verification without separate approval.

## 9. Workflow consent-gate manual tasks — preparation only unless Jeff approves a separate operator packet

The second UI pass found workflows Draft/Off and verified existing `newsletter:ai` consent-gate foundations for the standard-builder workflows. It did not safely save the remaining conditions because the HighLevel condition editor produced ambiguous blank segment states and DND/suppression/custom-field mappings were unverified.

Future standard-builder workflow operator tasks, after a separate approval packet only:

1. Open each standard-builder workflow while keeping it Draft/Off:
   - AI Compliance Gameplan.
   - Founder M&A Readiness.
   - Tech GC Launchpad.
2. Open the existing action `Consent Gate — lead magnet email opt-in required before nurture`.
3. Confirm the first eligible branch remains `Tags Includes newsletter:ai`.
4. Add one AND segment per absent tag, not one multi-tag absent segment:
   - `Tags` -> `Does not include` -> `newsletter:not-consented`.
   - `Tags` -> `Does not include` -> `outreach:do-not-send`.
   - `Tags` -> `Does not include` -> `ops:no-auto-send`.
5. Add consent-basis only after the exact custom-field label and prefix operator are visible and stable:
   - `Consent Basis` / `contact.consent_basis` -> `starts with` or equivalent prefix operator -> the lane-specific prefix such as `lead_magnet_email_opt_in:tech-gc`.
6. Add email-safety checks only after HighLevel's exact field labels and false/not-present operators are confirmed:
   - Email DND false/not present.
   - Email unsubscribe false/not present.
   - Email suppression false/not present.
   - Email bounce false/not present.
7. Add Approval Status as a positive allow-list if possible, rather than a brittle negative list.
8. Confirm overall logic is all-AND; do not use OR groups for safety exclusions.
9. Save only if every segment displays the intended field/operator/value before saving.
10. Do not click `Publish`, `Test Workflow`, manual start, enrollment, send, or test-send.

Future AI Patent advanced-builder operator tasks, after a separate approval packet only:

1. Keep the AI Patent Strategy Scorecard workflow in Advanced Builder and Draft/Off.
2. Review existing internal nodes:
   - `Add Internal Note - DND Suppression Guard`.
   - `Add Internal Note - Newsletter Consent Guard`.
   - `Add Internal Note - Future External-Send Approval Needed`.
3. If Jeff wants true branch enforcement, approve a dedicated advanced-canvas edit session with rollback and evidence steps before structural changes.
4. Do not force a standard-builder If/Else insertion into the advanced canvas unless HighLevel exposes a stable, safe insertion path.

Workflow stop rules:

- Stop if the workflow is not Draft/Off or Draft/Off status cannot be verified.
- Stop if a condition segment displays blank, wrong, ambiguous, OR-grouped, or unsupported logic.
- Stop if a tag absent condition can only be expressed as a multi-tag absent segment with unclear semantics.
- Stop if custom-field, DND, unsubscribe, suppression, or bounce operators cannot be confirmed.
- Stop if Publish, Test Workflow, manual start, enrollment, send, or test-send is requested.

## 10. Copy and email asset gate before any Tech GC or authority HighLevel asset entry

No future operator should enter copy into HighLevel until all of these are approved:

- Exact final copy for each email/template/newsletter.
- Exact sequence length and timing; Tech GC draft currently proposes up to four emails, with first pilot default favoring Email 1 through Email 3 only unless Jeff approves Email 4.
- Exact CTA route; Tech GC default is `/colorado-tech-general-counsel` unless Jeff approves a scheduling URL or UTM route.
- Exact report token/summary placeholder; do not use `{{custom.report_link_or_summary}}` or any Tech GC score/band/action placeholder until field availability and merge-tag syntax are verified.
- Attorney/legal ethics review.
- Privacy/CRM review.
- Brand review.
- Source-current review for any current-law, AI/data, privacy/security, Colorado, USPTO, market, or named-company claim.
- Deliverability review for sender, footer, unsubscribe, and suppression logic.

Copy stop rules:

- Stop if copy implies legal advice, attorney-client relationship, immediate representation, a legal conclusion, compliance/readiness/patentability/valuation/deal outcome, guaranteed result, guaranteed timing, or guaranteed risk reduction.
- Stop if copy invites confidential facts by reply or public form.
- Stop if copy lacks the approved no-advice/no-ACR/no-confidential/no-guarantee/conflicts/scope/written-engagement caveats.
- Stop if non-opted users would receive email, workflow tags, report delivery implication, attorney-review task, social/LinkedIn action, or follow-up.

## 11. Evidence capture checklist for any future approved operator work

- [ ] Save Jeff's exact approval language and scope before opening HighLevel.
- [ ] Confirm location `tm68WWMrcAa3TqQbEAMa` before any review.
- [ ] Capture before/after evidence for every approved read-only or manual UI step.
- [ ] Redact tokens/secrets from terminal logs, screenshots, comments, filenames, and deliverables.
- [ ] Record whether the action was read-only verification, manual field creation, workflow review, or packet preparation.
- [ ] Confirm no unapproved HighLevel write, workflow publish/test/start/enrollment, contact/opportunity/tag/task/note mutation, send, social/ad action, Clio/Supabase/env/public change, or external action occurred.
- [ ] Link evidence artifacts from `docs/KANBAN_DELIVERABLE_INDEX.md` after completion.

## 12. Universal stop / rollback rules

Stop and preserve evidence if any condition is true:

1. Credentials, browser login, attorney/legal review, public-source credits, Jeff approval, or authorized operator scope is missing.
2. The requested action exceeds the exact approval scope.
3. Sender, reply-to, footer/postal address, unsubscribe/preference mechanism, privacy/terms/disclaimer URLs, attorney-advertising treatment, consent language, or sender domain is missing, placeholder-only, or unapproved.
4. Consent is inferred from research, LinkedIn activity, CRM import, prior contact, meeting, Agent Targeting, public-page visit, or downloaded material rather than affirmative opt-in.
5. DND, unsubscribe, suppression, bounce, complaint, invalid email, no-auto-send, not-consented, conflicts hold, prior-touch hold, privacy hold, internal hold, or manual hold is present or uncertain.
6. HighLevel workflow state is not Draft/Off or cannot be verified.
7. A field/workflow/tag/key/operator differs from the approved packet.
8. The UI shows ambiguous blank segment state or unsupported operator behavior.
9. Any contact/company-specific use lacks conflicts/Clio/prior-touch review.
10. Any external action lacks exact recipient, final copy, channel, timing, suppression/conflicts status, and Jeff approval.

Rollback posture:

- Do not improvise a fix in live HighLevel.
- Keep all workflows Draft/Off.
- Stop all mutation except separately approved cleanup.
- Preserve screenshots, DOM/API evidence, terminal outputs, and exact stop reason.
- Ask Jeff for a new cleanup, engineering mapping, legal/ethics, or operator-scope decision.

## 13. Recommended next decision

Recommended default: Jeff/Whiteford should approve this checklist only as Scope A documentation-only decision prep, then decide separately whether to authorize Scope B read-only verification, Scope C manual Contact-field creation plus verifier, or Scope D preparation of a dedicated draft/off workflow remediation operator packet. No live HighLevel, workflow, CRM, send, public, Clio, Supabase, or external action should occur from this checklist alone.
