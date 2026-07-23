# HighLevel 31-Field Dry-Run-First Approval Packet — 2026-05-08

Task: `t_06261195`
Tenant: `whiteford-mountain-west`
Location: Whiteford Schell IP (`tm68WWMrcAa3TqQbEAMa`)
Pipeline context: Whiteford Schell IP Pipeline (`Tbx4tA6wHv5lTwZPSHyZ`)
Prepared: 2026-05-08T05:35:15Z
Status: internal approval packet only; no HighLevel fields, contacts, opportunities, workflows, campaigns, messages, tags, social posts, LinkedIn actions, ads, Clio records, Supabase rows, credentials, public pages, or external recipients were created, changed, activated, enrolled, sent, published, or scheduled.

## Executive decision requested

HighLevel remains blocked for Tech GC controlled-pilot live-field reliance because read-only evidence shows only 6 of the 37 expected Contact custom fields are present and 31 required guardrail/mapped fields are missing.

Recommended Jeff decision: approve the manual HighLevel UI path below for the 31 missing Contact custom fields only, then require a separate read-only verification result showing 37/37 fields present, 0 type mismatches, and 0 generated-key risks before any future live-field smoke test or Draft/Off workflow guard inspection relies on these fields.

This packet is dry-run-first and approval-only. It does not approve field creation by script, workflow activation, workflow testing, contact/opportunity mutation, email/SMS/DM/social/LinkedIn outreach, public publishing, production env changes, or any external action.

Business-development principle applied: the Tech GC checklist should fulfill a narrow diagnostic promise and build trust before nurture. Basic educational value should not be held hostage to marketing opt-in; any follow-up nurture requires affirmative consent plus attorney/ethics/privacy/deliverability approval.

## Source evidence used

- Morning review: `docs/whiteford_growth_os_morning_review_2026-05-08.md`
- Prior remediation packet: `docs/highlevel_guardrail_v2_missing_field_remediation_packet_2026-05-07.md`
- Dry-run result: `docs/highlevel_guardrail_v2_field_dry_run_result_2026-05-07.md` and `.json`
- Tech GC no-token QA evidence: `docs/tech_gc_local_no_token_qa_evidence_2026-05-08.md`
- Read-only verifier script: `scripts/verify_highlevel_guardrail_v2_fields_readonly.py`
- Business-development corpus query run locally for lead-magnet trust/consent principles; applied as synthesis only.
- QMD keyword search over `whiteford-ai-law-pages` for the exact HighLevel guardrail field query returned no direct matches; a broader `HighLevel` query confirmed the collection is searchable.

## Current dry-run field status

Saved read-only/dry-run verification result from 2026-05-07:

| Metric | Result |
| --- | ---: |
| Expected Contact custom fields | 37 |
| Present fields | 6 |
| Missing fields | 31 |
| Type mismatches in present fields | 0 |
| Generated-key risks in present fields | 0 |
| Pass | False |

Existing verified fields to preserve and not duplicate:

| API key | Expected generated field key | Display name | Type | Existing field ID |
| --- | --- | --- | --- | --- |
| `approval_status` | `contact.approval_status` | Approval Status | TEXT | `PZQ4DD5Dy4qJG9pTsNM3` |
| `consent_basis` | `contact.consent_basis` | Consent Basis | TEXT | `TvCAwsNbVg94JrEBM3e0` |
| `ai_patent_score` | `contact.ai_patent_score` | AI Patent Score | NUMERICAL | `L78KuFhyFafq5PSp5MjR` |
| `ai_patent_stage` | `contact.ai_patent_stage` | AI Patent Stage | TEXT | `7pf3mgT5ttvFjBjEpg5m` |
| `ai_patent_score_band` | `contact.ai_patent_score_band` | AI Patent Score Band | TEXT | `xh6AfuK3kI9YCbkL3Wko` |
| `ai_patent_checks` | `contact.ai_patent_checks` | AI Patent Checks | LARGE_TEXT | `0mv2zSrrPiwTw3Eufuwk` |

## Exact 31 missing Contact custom fields for Jeff approval

Create these only after Jeff approves this exact list. All are Contact custom fields. Do not create Opportunity, Company, workflow, campaign, message, tag, or automation assets while performing the approved field step.

Safe default means the value that should be assumed by application/workflow logic when the field is blank or absent on a contact. HighLevel UI field creation should not populate real contacts and should not backfill values.

| # | Lane | Exact label | Type | Expected generated field key | Purpose | Safe default / no-data posture | Why required for no-send, consent, or approval guardrails |
| ---: | --- | --- | --- | --- | --- | --- | --- |
| 1 | Shared guardrail | Privacy Guardrail Version | TEXT | `contact.privacy_guardrail_version` | Records the shared approved lead-magnet privacy guardrail version accepted with the request. | Blank means unverified guardrail version; treat as blocked/no-send. | Prevents follow-up if the submission cannot be tied to approved no-confidential-input and privacy language. |
| 2 | Shared guardrail | Public Form Input Type | TEXT | `contact.public_form_input_type` | Records whether the public form used categorical non-confidential input. | Blank or non-`categorical_non_confidential` means blocked/no-send. | Prevents nurture or human reliance on submissions that may contain confidential or unapproved free-text material. |
| 3 | Shared guardrail | Disclaimer Acknowledged | TEXT | `contact.disclaimer_acknowledged` | Records disclaimer/no-legal-advice/no-attorney-client acknowledgment. | Blank/not acknowledged means blocked/no-send. | Ensures any downstream review sees whether the minimum disclaimer gate was met before report request handling. |
| 4 | Shared fulfillment | Report Requested | TEXT | `contact.report_requested` | Separates educational report/checklist request from optional marketing opt-in. | Blank/false means no assumed report delivery or nurture. | Keeps basic fulfillment and marketing consent distinct so opt-in is not inferred from a diagnostic request. |
| 5 | AI Compliance | AI Compliance Maturity Level | TEXT | `contact.ai_compliance_maturity_level` | Stores the categorical maturity band for AI Compliance report fulfillment and internal triage. | Blank means no AI Compliance band available; do not personalize follow-up. | Avoids unsupported nurture claims and preserves human-review context before any compliance-oriented follow-up. |
| 6 | AI Compliance | AI Compliance Category Scores | LARGE_TEXT | `contact.ai_compliance_category_scores` | Stores compact category score JSON/list for the diagnostic output. | Blank means no category score evidence; do not rely on category-specific messaging. | Keeps diagnostic evidence available for review without requiring confidential facts or marketing opt-in. |
| 7 | AI Compliance | AI Compliance Top Gaps | LARGE_TEXT | `contact.ai_compliance_top_gaps` | Stores compact top-gap output. | Blank means no top-gap evidence; do not send gap-specific nurture. | Prevents unreviewed gap claims and supports source/audit review if Jeff later approves follow-up. |
| 8 | AI Compliance | AI Compliance Recommended Next Step | TEXT | `contact.ai_compliance_recommended_next_step` | Stores bounded next-step language such as AI Compliance Readiness Sprint. | Blank means no recommended next step; do not infer a sales CTA. | Avoids vague or unsupported consult routing without approved diagnostic basis and consent. |
| 9 | AI Compliance | AI Compliance Heat Map | LARGE_TEXT | `contact.ai_compliance_heat_map` | Stores readiness heat-map output. | Blank means no heat-map evidence; do not use heat-map personalization. | Allows review of educational value while keeping downstream marketing optional and consent-gated. |
| 10 | AI Compliance | AI Compliance 10 Day Fixes | LARGE_TEXT | `contact.ai_compliance_10_day_fixes` | Stores practical first-step educational fixes. | Blank means no fixes available; do not claim fixes were generated. | Supports fulfillment of narrow educational promise without implying attorney-client advice or forced nurture. |
| 11 | AI Compliance | AI Compliance Roadmap 30 60 90 | LARGE_TEXT | `contact.ai_compliance_roadmap_30_60_90` | Stores compact roadmap output. | Blank means no roadmap available; do not use roadmap-specific follow-up. | Prevents unsupported sequence personalization and preserves attorney/privacy review before external use. |
| 12 | AI Compliance | AI Compliance Report Version | TEXT | `contact.ai_compliance_report_version` | Version-controls approved AI Compliance report/copy posture. | Blank means unknown report version; block external reliance. | Ensures any follow-up can be audited against the exact copy/guardrail version reviewed. |
| 13 | AI Patent | AI Patent Privacy Guardrail Version | TEXT | `contact.ai_patent_privacy_guardrail_version` | Records AI Patent lane-specific guardrail version. | Blank means unknown lane guardrail; block/no-send. | Prevents AI Patent nurture unless lane-specific no-confidential-input and disclaimer posture is verified. |
| 14 | AI Patent | AI Patent Report Version | TEXT | `contact.ai_patent_report_version` | Version-controls AI Patent report/copy posture. | Blank means unknown report version; block external reliance. | Avoids using unapproved patent-strategy copy or current-law language in downstream follow-up. |
| 15 | AI Patent | AI Patent Recommended Next Step | TEXT | `contact.ai_patent_recommended_next_step` | Stores bounded AI Patent Strategy Sprint next-step language. | Blank means no recommended next step; do not infer a sales CTA. | Prevents unapproved patentability/inventorship/filing-strategy implications in outreach. |
| 16 | Founder M&A | M&A Readiness Privacy Guardrail Version | TEXT | `contact.ma_readiness_privacy_guardrail_version` | Records M&A lane-specific guardrail version. | Blank means unknown lane guardrail; block/no-send. | Ensures diligence-readiness follow-up is not based on unapproved or potentially confidential input. |
| 17 | Founder M&A | M&A Readiness Input Type | TEXT | `contact.ma_readiness_input_type` | Confirms categorical non-confidential M&A readiness input posture. | Blank or non-approved value means blocked/no-send. | Prevents using sensitive diligence, financing, employee, customer, or transaction facts in automation. |
| 18 | Founder M&A | M&A Readiness Report Version | TEXT | `contact.ma_readiness_report_version` | Version-controls M&A readiness report/copy posture. | Blank means unknown report version; block external reliance. | Keeps buyer-readiness claims tied to reviewed copy and current approval. |
| 19 | Founder M&A | M&A Readiness Score | NUMERICAL | `contact.ma_readiness_score` | Stores readiness score. | Blank means no score; do not segment or personalize by score. | Prevents unreviewed stage movement or nurture based on missing/invalid score data. |
| 20 | Founder M&A | M&A Readiness Band | TEXT | `contact.ma_readiness_band` | Stores readiness band. | Blank means no band; do not use band-specific messaging. | Supports controlled internal review while blocking unsupported external personalization. |
| 21 | Founder M&A | M&A Readiness Answers JSON | LARGE_TEXT | `contact.ma_readiness_answers_json` | Stores compact categorical answer JSON. | Blank means no answer evidence; do not rely on answers. | Preserves auditability of categorical inputs without treating request data as marketing consent. |
| 22 | Tech GC | Tech Legal Health Privacy Guardrail Version | TEXT | `contact.tech_legal_health_privacy_guardrail_version` | Records Tech GC lane-specific guardrail version. | Blank means unknown Tech GC guardrail; block/no-send. | Required before the controlled pilot can show that Tech GC inputs met no-confidential/disclaimer guardrails. |
| 23 | Tech GC | Tech Legal Health Report Version | TEXT | `contact.tech_legal_health_report_version` | Version-controls Tech GC report/copy posture. | Blank means unknown report version; block external reliance. | Ensures Tech GC results and any future follow-up match reviewed legal/ethics/privacy copy. |
| 24 | Tech GC | Tech Legal Health Score | NUMERICAL | `contact.tech_legal_health_score` | Stores legal health score. | Blank means no score; do not segment, route, or personalize by score. | Prevents live workflow logic from acting on missing/invalid score data. |
| 25 | Tech GC | Tech Legal Health Band | TEXT | `contact.tech_legal_health_band` | Stores legal health band. | Blank means no band; do not use band-specific messaging. | Supports human review of educational result while blocking unsupported nurture. |
| 26 | Tech GC | Tech Legal Health Company Moment | TEXT | `contact.tech_legal_health_company_moment` | Stores company-stage/moment signal for internal routing. | Blank means no company moment; do not infer stage. | Prevents automation from assuming a funding, enterprise-sales, diligence, or scaling posture without evidence. |
| 27 | Tech GC | Tech Legal Health Lowest Category | TEXT | `contact.tech_legal_health_lowest_category` | Stores the lowest-readiness category. | Blank means no lowest category; do not send category-specific follow-up. | Avoids unreviewed or over-specific legal gap messaging without consent and approval. |
| 28 | Tech GC | Tech Legal Health Category Scores | LARGE_TEXT | `contact.tech_legal_health_category_scores` | Stores compact category score JSON/list. | Blank means no category-score evidence; do not rely on it. | Gives reviewers evidence for the diagnostic while keeping automation gated. |
| 29 | Tech GC | Tech Legal Health Top Actions | LARGE_TEXT | `contact.tech_legal_health_top_actions` | Stores practical next-action output. | Blank means no top actions; do not claim top actions were generated. | Supports on-page educational fulfillment without automatically triggering outbound advice-like messaging. |
| 30 | Tech GC | Tech Legal Health Branch Signals | LARGE_TEXT | `contact.tech_legal_health_branch_signals` | Stores non-trigger branch signals for human review. | Blank means no branch signals; do not branch automation. | Prevents workflow steps from treating diagnostic signals as authorization to send or escalate. |
| 31 | Tech GC | Tech Legal Health Answers JSON | LARGE_TEXT | `contact.tech_legal_health_answers_json` | Stores compact categorical Tech GC answer JSON. | Blank means no answer evidence; do not rely on answers. | Preserves the no-confidential-input audit trail for the Tech GC controlled pilot and downstream review. |

AI Compliance note: the current `/api/leads` mapping uses the shared `privacy_guardrail_version` plus `ai_compliance_report_version`; it does not expect a dedicated `ai_compliance_privacy_guardrail_version`. Do not create a dedicated AI Compliance lane-specific privacy field unless a separate engineering task updates and tests the API mapping.

## Manual HighLevel UI creation path for approval

Approval wording Jeff may use:

`I approve manual HighLevel UI creation, in the Whiteford Schell IP location (tm68WWMrcAa3TqQbEAMa) only, of the 31 Contact custom fields listed in docs/highlevel_31_field_dry_run_approval_packet_2026-05-08.md, using the exact labels, types, and expected bare API-key placeholders shown there. This approval does not authorize workflow activation, workflow tests, contact/opportunity writes, contact enrollment, email/SMS/DM/social/LinkedIn/ad action, public publishing, Clio writes, production env changes, creation of any field outside the list, or creation by script. After manual creation, run read-only verification and stop if any generated field key differs from contact.<api_key>.`

Approved operator steps, after Jeff approval only:

1. Log in to HighLevel and switch to location `Whiteford Schell IP` (`tm68WWMrcAa3TqQbEAMa`).
2. Navigate to Settings -> Custom Fields.
3. Confirm the object/module is Contact. Do not create Opportunity, Company, or custom-object fields.
4. Confirm the six existing verified fields above are present. Do not recreate or rename them.
5. For each of the 31 missing fields:
   - Click Add Field.
   - Select the listed type exactly: TEXT, LARGE_TEXT, or NUMERICAL.
   - Enter the exact label from the table.
   - If HighLevel exposes placeholder/key/description/help text, enter the bare API key from the expected generated field key, without the `contact.` prefix.
   - Save only the field.
6. Do not add options, validations, workflow triggers, tags, campaigns, emails, SMS, tasks, notes, opportunities, contacts, social posts, ads, or Clio records.
7. Do not activate, publish, test, manually start, or enroll anyone in any workflow.
8. After all approved fields are created, run the read-only verification plan below before any other HighLevel work.
9. If any field key, type, object/module, duplicate, or response shape is wrong, stop and create a blocker; do not proceed to smoke tests or workflow reliance.

## Dry-run / read-only verification plan

Pre-approval dry-run from saved evidence remains local/read-only and may be rerun without credentials:

```bash
python3 scripts/verify_highlevel_guardrail_v2_fields_readonly.py \
  --input docs/highlevel_guardrail_v2_api_probe_2026-05-07.json \
  --output-json docs/highlevel_guardrail_v2_field_dry_run_result_2026-05-07.json \
  --output-md docs/highlevel_guardrail_v2_field_dry_run_result_2026-05-07.md
```

Expected pre-creation result: exit code 2 because the field set intentionally fails while 31 fields are missing. This is a safe dry-run failure and does not mutate HighLevel.

Post-approval/post-manual-creation read-only verification, to be run only by an authorized operator with a HighLevel token:

```bash
GHL_PRIVATE_INTEGRATION_TOKEN=<token> \
python3 scripts/verify_highlevel_guardrail_v2_fields_readonly.py \
  --live-read-only \
  --location-id tm68WWMrcAa3TqQbEAMa \
  --output-json docs/highlevel_guardrail_v2_field_post_creation_readonly_result_2026-05-08.json \
  --output-md docs/highlevel_guardrail_v2_field_post_creation_readonly_result_2026-05-08.md
```

Read-only verification boundaries:

- Uses one GET request to `/locations/{locationId}/customFields`.
- Does not call POST, PUT, PATCH, DELETE, contact, opportunity, workflow, campaign, message, enrollment, social, ad, Clio, Supabase, env, or public-deploy endpoints.
- Does not create, update, delete, enroll, send, publish, schedule, tag, or move any record.
- Must save redacted JSON and Markdown evidence in `docs/` and link the evidence from `docs/KANBAN_DELIVERABLE_INDEX.md`.

Pass criteria:

- Expected fields: 37.
- Present fields: 37.
- Missing fields: 0.
- Type mismatches: 0.
- Generated-key risks: 0.
- Every expected field key equals `contact.<api_key>`.
- The six existing fields are still present and were not duplicated.
- All 31 newly created fields are Contact custom fields.
- All four intake workflows remain Draft/Off.
- No contacts, opportunities, tags, tasks, notes, campaigns, messages, enrollments, social/ad/Clio records, env vars, or public pages changed as part of field remediation.

## 37/37 read-only verification checklist

Use this after Jeff-approved manual creation. Every row must pass before any live-field smoke test, workflow guard inspection that depends on these fields, or controlled-pilot step can proceed.

| # | Field | Expected type | Expected field key | Verification checkbox |
| ---: | --- | --- | --- | --- |
| 1 | Approval Status | TEXT | `contact.approval_status` | [ ] Present / exact type / exact key / no duplicate |
| 2 | Consent Basis | TEXT | `contact.consent_basis` | [ ] Present / exact type / exact key / no duplicate |
| 3 | Privacy Guardrail Version | TEXT | `contact.privacy_guardrail_version` | [ ] Present / exact type / exact key / no duplicate |
| 4 | Public Form Input Type | TEXT | `contact.public_form_input_type` | [ ] Present / exact type / exact key / no duplicate |
| 5 | Disclaimer Acknowledged | TEXT | `contact.disclaimer_acknowledged` | [ ] Present / exact type / exact key / no duplicate |
| 6 | Report Requested | TEXT | `contact.report_requested` | [ ] Present / exact type / exact key / no duplicate |
| 7 | AI Compliance Maturity Level | TEXT | `contact.ai_compliance_maturity_level` | [ ] Present / exact type / exact key / no duplicate |
| 8 | AI Compliance Category Scores | LARGE_TEXT | `contact.ai_compliance_category_scores` | [ ] Present / exact type / exact key / no duplicate |
| 9 | AI Compliance Top Gaps | LARGE_TEXT | `contact.ai_compliance_top_gaps` | [ ] Present / exact type / exact key / no duplicate |
| 10 | AI Compliance Recommended Next Step | TEXT | `contact.ai_compliance_recommended_next_step` | [ ] Present / exact type / exact key / no duplicate |
| 11 | AI Compliance Heat Map | LARGE_TEXT | `contact.ai_compliance_heat_map` | [ ] Present / exact type / exact key / no duplicate |
| 12 | AI Compliance 10 Day Fixes | LARGE_TEXT | `contact.ai_compliance_10_day_fixes` | [ ] Present / exact type / exact key / no duplicate |
| 13 | AI Compliance Roadmap 30 60 90 | LARGE_TEXT | `contact.ai_compliance_roadmap_30_60_90` | [ ] Present / exact type / exact key / no duplicate |
| 14 | AI Compliance Report Version | TEXT | `contact.ai_compliance_report_version` | [ ] Present / exact type / exact key / no duplicate |
| 15 | AI Patent Score | NUMERICAL | `contact.ai_patent_score` | [ ] Present / exact type / exact key / no duplicate |
| 16 | AI Patent Stage | TEXT | `contact.ai_patent_stage` | [ ] Present / exact type / exact key / no duplicate |
| 17 | AI Patent Score Band | TEXT | `contact.ai_patent_score_band` | [ ] Present / exact type / exact key / no duplicate |
| 18 | AI Patent Checks | LARGE_TEXT | `contact.ai_patent_checks` | [ ] Present / exact type / exact key / no duplicate |
| 19 | AI Patent Privacy Guardrail Version | TEXT | `contact.ai_patent_privacy_guardrail_version` | [ ] Present / exact type / exact key / no duplicate |
| 20 | AI Patent Report Version | TEXT | `contact.ai_patent_report_version` | [ ] Present / exact type / exact key / no duplicate |
| 21 | AI Patent Recommended Next Step | TEXT | `contact.ai_patent_recommended_next_step` | [ ] Present / exact type / exact key / no duplicate |
| 22 | M&A Readiness Privacy Guardrail Version | TEXT | `contact.ma_readiness_privacy_guardrail_version` | [ ] Present / exact type / exact key / no duplicate |
| 23 | M&A Readiness Input Type | TEXT | `contact.ma_readiness_input_type` | [ ] Present / exact type / exact key / no duplicate |
| 24 | M&A Readiness Report Version | TEXT | `contact.ma_readiness_report_version` | [ ] Present / exact type / exact key / no duplicate |
| 25 | M&A Readiness Score | NUMERICAL | `contact.ma_readiness_score` | [ ] Present / exact type / exact key / no duplicate |
| 26 | M&A Readiness Band | TEXT | `contact.ma_readiness_band` | [ ] Present / exact type / exact key / no duplicate |
| 27 | M&A Readiness Answers JSON | LARGE_TEXT | `contact.ma_readiness_answers_json` | [ ] Present / exact type / exact key / no duplicate |
| 28 | Tech Legal Health Privacy Guardrail Version | TEXT | `contact.tech_legal_health_privacy_guardrail_version` | [ ] Present / exact type / exact key / no duplicate |
| 29 | Tech Legal Health Report Version | TEXT | `contact.tech_legal_health_report_version` | [ ] Present / exact type / exact key / no duplicate |
| 30 | Tech Legal Health Score | NUMERICAL | `contact.tech_legal_health_score` | [ ] Present / exact type / exact key / no duplicate |
| 31 | Tech Legal Health Band | TEXT | `contact.tech_legal_health_band` | [ ] Present / exact type / exact key / no duplicate |
| 32 | Tech Legal Health Company Moment | TEXT | `contact.tech_legal_health_company_moment` | [ ] Present / exact type / exact key / no duplicate |
| 33 | Tech Legal Health Lowest Category | TEXT | `contact.tech_legal_health_lowest_category` | [ ] Present / exact type / exact key / no duplicate |
| 34 | Tech Legal Health Category Scores | LARGE_TEXT | `contact.tech_legal_health_category_scores` | [ ] Present / exact type / exact key / no duplicate |
| 35 | Tech Legal Health Top Actions | LARGE_TEXT | `contact.tech_legal_health_top_actions` | [ ] Present / exact type / exact key / no duplicate |
| 36 | Tech Legal Health Branch Signals | LARGE_TEXT | `contact.tech_legal_health_branch_signals` | [ ] Present / exact type / exact key / no duplicate |
| 37 | Tech Legal Health Answers JSON | LARGE_TEXT | `contact.tech_legal_health_answers_json` | [ ] Present / exact type / exact key / no duplicate |

Additional post-verification checks:

- [ ] Verifier result shows `pass: true`.
- [ ] Evidence JSON and Markdown are saved in `docs/`.
- [ ] All workflows remain Draft/Off.
- [ ] No workflow message step was edited, tested, manually started, activated, or published.
- [ ] No contact/opportunity/tag/task/note/campaign/message/enrollment/social/ad/Clio/env/public-page mutation occurred.
- [ ] Non-subscriber policy remains on-page-only/no-outbound unless Jeff separately approves exact transactional copy/channel/timing/suppression handling.
- [ ] Legal/ethics/privacy/copy/deliverability review remains pending before any public or client/prospect-facing use.

## Generated-key risk handling

HighLevel may generate a field key from the label. The application and verifier expect exact keys in the form `contact.<api_key>`. Examples of unacceptable generated-key drift include:

- `contact.m_a_readiness_answers_json` instead of `contact.ma_readiness_answers_json`.
- `contact.ai_compliance_roadmap` or `contact.ai_compliance_roadmap_30_60` instead of `contact.ai_compliance_roadmap_30_60_90`.
- `contact.tech_legal_health_answers` instead of `contact.tech_legal_health_answers_json`.

If any generated key differs from the expected key:

1. Do not activate, publish, test, or enroll any workflow.
2. Do not update `/api/leads` mapping or workflow steps ad hoc.
3. Preserve screenshots and read-only verifier evidence showing the mismatch.
4. If the field is newly created, empty, and Jeff separately approved cleanup, delete/recreate only that mistaken empty field if HighLevel safely permits it.
5. If deletion is unavailable, not approved, or any data may exist, leave the field in place and create an engineering mapping-remediation task before any live write.
6. Rerun read-only verification after correction.

## Rollback / no-activation boundary

This packet is not an activation packet and not a script-creation packet.

Always forbidden unless Jeff gives a separate explicit current approval naming the exact scope:

- Workflow activation, publishing, manual start, test execution, or contact enrollment.
- Email, SMS, DM, voicemail, LinkedIn message, LinkedIn post, company-page post, comment, tag, newsletter, campaign, sequence, ad, or other external outreach.
- Live contact, opportunity, tag, note, task, campaign, workflow, message, enrollment, social, ad, Clio, Supabase, or env mutation.
- Public/client-facing publishing, report delivery, landing-page deployment, or use of real prospects/clients/adverse parties in a pilot.
- Creation of any field outside the 31-field list.
- Script-based field creation without a separate dry-run-first creation-script approval packet.

Rollback posture if a mistake is discovered immediately after approved manual creation:

1. Keep all workflows Draft/Off.
2. Stop all further HighLevel work except read-only evidence capture.
3. Preserve evidence of the erroneous field label/key/type/object.
4. Delete/recreate only if the field is empty, newly created, HighLevel supports safe deletion, and Jeff approved that cleanup scope.
5. Otherwise leave the field untouched and route to engineering mapping remediation.
6. Require fresh 37/37 read-only verification before any future pilot step.

## Jeff decision box

Jeff should choose one option:

- [ ] Approve manual UI path: create only the 31 Contact custom fields listed in this packet in Whiteford Schell IP, then run the read-only 37/37 verifier; no activation, testing, contact/opportunity writes, messages, social/LinkedIn, ads, Clio, Supabase, env, or public-page changes.
- [ ] Request edits: hold field creation and specify changes to labels, types, purpose, safe defaults, generated-key expectations, or guardrail rationale.
- [ ] Request separate creation-script approval packet: hold manual creation and ask for a dry-run-first script packet with exact endpoint, no-write default, explicit confirmation flag, redacted evidence, and hard prohibition on contacts/opportunities/workflows/messages/social/ads/Clio/env/public-page actions.
- [ ] Hold all HighLevel remediation until non-subscriber fulfillment policy, legal/ethics/privacy/copy review, or first-lane pilot strategy is decided.

Default recommendation: approve the manual UI path, because it is the narrowest mutation scope and best preserves the current safety posture. After creation, require read-only verifier evidence showing 37/37 before any live-field smoke test or Draft/Off workflow guard reliance.
