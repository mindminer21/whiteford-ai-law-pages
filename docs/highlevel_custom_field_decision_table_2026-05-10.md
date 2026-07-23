# HighLevel custom-field decision table for six unmapped emitted fields — 2026-05-10

Task: `t_1ec7e0dc`
Tenant: `whiteford-mountain-west`
Location: Whiteford Schell IP (`tm68WWMrcAa3TqQbEAMa`)
Pipeline context: Whiteford Schell IP Pipeline (`Tbx4tA6wHv5lTwZPSHyZ`)
Status: no-mutation decision table for Jeff/Whiteford review only. No HighLevel API call, browser/UI session, contact/opportunity/tag/workflow mutation, field creation, enrollment, email/SMS/social send, public page change, Supabase/Clio write, or external/client/prospect-facing action was performed or authorized.

## Executive recommendation

The six currently emitted but unmapped `/api/leads` fields should stay out of any immediate HighLevel adapter payload until Jeff approves a field-list expansion. Default recommendation: create all six as Contact custom fields later, in a separate exact-scope HighLevel field approval packet, because each preserves useful lead-magnet diagnostic context without forcing marketing follow-up.

Do not add these fields to the current 31-field guardrail-v2 creation packet retroactively. Treat them as a small follow-on batch after the existing 37-field verification gate is clean, or as a future engineering removal/remap decision if Jeff decides the extra diagnostic detail is not worth the field surface area.

Business-development principle applied: keep the lead magnet useful and narrow, preserve problem-awareness evidence, and do not convert diagnostic data into sales automation unless the user affirmatively opted in and Jeff/Whiteford have approved the exact legal/ethics, privacy, sender, suppression, and workflow gates. These fields are for internal diagnostic fulfillment and reporting only unless a later attorney-reviewed workflow/copy packet says otherwise.

## Source evidence reviewed

- `docs/controlled-pilot/lead_api_highlevel_field_payload_static_audit_2026-05-10.md` identifies the six code-emitted fields not found in the original 18-field verified setup or the 37-field guardrail-v2 expected manifest.
- `docs/reviews/2026-05-10_0430_lead_magnet_highlevel_readiness_review.md` passes the tranche for internal decision prep only and calls for this no-mutation decision table.
- `src/app/api/leads/route.ts`, lines 354-364, emits these six fields in the preview/HighLevel customFields array.
- `docs/highlevel_guardrail_v2_missing_field_remediation_packet_2026-05-07.md` and `docs/highlevel_guardrail_v2_no_mutation_field_manifest_2026-05-08.md` define the existing 31 missing-field packet, generated-key expectations, read-only verifier posture, and rollback/no-activation boundaries.
- Business-development RAG query run: `lead magnet narrow diagnostic promise consent opt in legal professional services follow up`. Results reinforced the narrow diagnostic / fulfill value before follow-up principle; no copyrighted text is reproduced.
- QMD search run: `unmapped field HighLevel custom field opt-in-only workflow tag` over `whiteford-ai-law-pages`. It retrieved the 04:30 lead-magnet/HighLevel readiness review and deliverable index, confirming this task’s immediate decision context.

## Decision table

Recommended status options are intentionally limited to: create field later, reuse existing field later, remove from emitted payload, or hold for attorney/operator decision. Each row below recommends exactly one status.

| Emitted bare key | Lane | Label to use if later created | Recommended status | Purpose | Data type | Consent/privacy sensitivity | Downstream dashboard/reporting use | Generated-key expectation if later created | Risk if mishandled |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `ai_patent_gap_map` | AI Patent Strategy Scorecard | AI Patent Gap Map | create field later | Preserve the non-confidential documentation/readiness gap map promised by the AI Patent diagnostic so Jeff can review what issue area the user saw before any follow-up. | LARGE_TEXT | Medium. It should contain categorical/diagnostic issue-spotting only, not invention disclosures, claim details, confidential roadmap facts, or legal advice. Require no-confidential-input and no-ACR guardrail evidence before relying on it. | Supports internal review of which AI patent hygiene gaps are common, scorecard quality checks, and aggregate content planning. Do not use for automated patent-specific advice or personalized outreach absent opt-in and attorney-approved copy. | `contact.ai_patent_gap_map` | If absent, HighLevel may ignore/reject the value and dashboards will undercount Patent gap-map engagement. If created with the wrong key/type, workflows or reports may read blank/mismatched data. If used externally, it could imply legal advice or reliance on confidential invention facts. |
| `ai_patent_ownership_gap_map` | AI Patent Strategy Scorecard | AI Patent Ownership Gap Map | create field later | Preserve the non-confidential ownership/inventorship/process gap map separate from the broader documentation gap map. | LARGE_TEXT | Medium-high. Ownership/inventorship context can become sensitive quickly; store only categorical outputs and block any confidential invention, contractor, employee, or assignment facts from public forms. | Useful for internal signal review: how often founders need chain-of-title, contractor assignment, employee invention, or AI-tool ownership education. Do not trigger individualized legal conclusions from this field. | `contact.ai_patent_ownership_gap_map` | If mishandled, it may create sensitive ownership records in the CRM, generate unapproved patent/legal conclusions, or cause a future operator to over-personalize patent outreach. Wrong generated keys could silently break reporting. |
| `ma_readiness_timing` | Founder M&A Readiness Checklist | M&A Readiness Timing | create field later | Capture the user’s non-confidential timing band for readiness triage, e.g., early planning versus near-term diligence preparation. | TEXT | Medium. Timing can reveal transaction planning sensitivity. Keep categorical and avoid buyer names, deal terms, valuation, financing, employee/customer details, or confidential process status. | Enables aggregate readiness segmentation and internal queue prioritization if Jeff later approves dashboard use. Should not automatically move opportunities, assign stages, or send urgency-based messages. | `contact.ma_readiness_timing` | If reused into a generic field, timing meaning may be lost. If used in automation, it could create pressure/urgency messaging or imply deal advice. Wrong key generation around `M&A` labels is a known risk; verify exact key before reliance. |
| `ma_readiness_category_scores` | Founder M&A Readiness Checklist | M&A Readiness Category Scores | create field later | Store compact categorical score evidence by readiness category so the lead magnet’s result can be audited and improved. | LARGE_TEXT | Medium-high. Category scores can imply diligence weaknesses; store only compact category names/scores and avoid raw confidential answers. | Supports aggregate readiness trend reporting, QA of scoring logic, and internal content planning. Do not use category-level weaknesses for outbound personalization without opt-in and attorney review. | `contact.ma_readiness_category_scores` | If absent, dashboards cannot explain the aggregate M&A score. If overused, follow-up could sound like individualized diligence/legal advice. If key generation changes `M&A` or drops `_scores`, reports/workflows may fail silently. |
| `ma_readiness_risk_map` | Founder M&A Readiness Checklist | M&A Readiness Risk Map | create field later | Preserve the buyer-diligence risk map output that frames the user’s readiness gaps at a high educational level. | LARGE_TEXT | High. Risk maps can be sensitive for founders considering financing, sale, or diligence; prohibit confidential facts and treat all values as attorney-review/internal-only unless explicitly approved. | Useful for aggregate risk-theme reporting and internal education planning. It can help Jeff see whether the tool is surfacing IP, contracts, data, employment, or cap-table readiness issues, but should not drive automated legal conclusions. | `contact.ma_readiness_risk_map` | Highest mishandling risk among the six. It could record transaction-sensitive concerns, create discoverability/confidentiality issues, or trigger unapproved legal-risk messaging. Wrong type/key can also corrupt long JSON/list payloads. |
| `ma_readiness_60_day_plan` | Founder M&A Readiness Checklist | M&A Readiness 60 Day Plan | create field later | Store the educational, non-legal-advice cleanup-plan output so the lead magnet can fulfill useful value and Jeff can assess whether recommendations remain bounded. | LARGE_TEXT | High. A 60-day plan can look like specific legal advice if not carefully bounded. Must remain generic educational output tied to disclaimers, no-ACR, no guarantees, no confidential input, and opt-in-only follow-up. | Supports QA of the generated plan, aggregate content planning, and internal review of whether the checklist is giving useful next steps. Do not send or personalize from it externally without exact copy approval. | `contact.ma_readiness_60_day_plan` | If used externally, it may imply legal advice, transaction strategy, or outcome guarantees. If absent, the CRM loses fulfillment context. If created incorrectly, long-form plan data may be truncated or mapped to the wrong field. |

## Why not reuse existing fields now?

No existing verified or proposed field cleanly preserves these six meanings without semantic loss:

- `ai_patent_checks` is already an existing field for checklist checks; it should not absorb gap maps.
- `ai_patent_recommended_next_step` is a concise next-step field, not evidence storage.
- `ma_readiness_answers_json` is planned for compact raw/categorical answer evidence, not derived category scores, risk maps, timing, or cleanup plans.
- `ma_readiness_band` and `ma_readiness_score` are summary outputs, not detailed diagnostics.

Defaulting to creation later keeps the diagnostic data model understandable and avoids silent overloading of existing fields. If Jeff later wants a leaner CRM, the alternative is a code task to remove or consolidate these emissions before any live HighLevel reliance.

## Future read-only verification checklist

Run only after Jeff approves exact future field creation and an authorized operator has completed the approved manual UI steps. This task does not approve or run the checklist.

- [ ] Confirm the current 37-field guardrail-v2 verifier has passed or that Jeff intentionally approved adding these six as a separate follow-on batch.
- [ ] Use read-only HighLevel verification only: `GET /locations/{locationId}/customFields` or the existing verifier extended to include the six new expected fields.
- [ ] Expected future totals if appended to the 37-field set: expected fields 43, present fields 43, missing fields 0, type mismatches 0, generated-key risks 0, pass true.
- [ ] Verify every new field is a Contact custom field in Whiteford Schell IP (`tm68WWMrcAa3TqQbEAMa`), not Opportunity, Company, or custom-object scope.
- [ ] Verify exact generated field keys: `contact.ai_patent_gap_map`, `contact.ai_patent_ownership_gap_map`, `contact.ma_readiness_timing`, `contact.ma_readiness_category_scores`, `contact.ma_readiness_risk_map`, and `contact.ma_readiness_60_day_plan`.
- [ ] Verify type selection: `ma_readiness_timing` = TEXT; the other five fields = LARGE_TEXT.
- [ ] Verify no duplicate fields exist by display name, bare key, or `contact.*` key.
- [ ] Verify no workflows changed status; all intake workflows remain Draft/Off unless a separate activation packet is approved.
- [ ] Verify no contacts, opportunities, tags, notes, tasks, campaigns, messages, enrollments, social/ad/Clio/Supabase records, env vars, public pages, or external communications were created or changed during field creation/verification.
- [ ] Save redacted JSON/Markdown evidence under `docs/` and add it to `docs/KANBAN_DELIVERABLE_INDEX.md`.

## Manual UI approval steps for a future operator

These steps are instructions for a future, separately approved HighLevel operator only. They are not approved by this document alone.

1. Confirm Jeff approved the exact six-field list, labels, types, object scope, location, operator, timing, verification evidence path, and stop/rollback rules.
2. Switch HighLevel to location `Whiteford Schell IP` (`tm68WWMrcAa3TqQbEAMa`).
3. Navigate to Settings -> Custom Fields and confirm the object/module is Contact.
4. Confirm the existing 37-field guardrail-v2 set has not been duplicated or altered.
5. Create only the six rows listed in this table, preferably in two small batches:
   - Batch A, AI Patent: AI Patent Gap Map; AI Patent Ownership Gap Map.
   - Batch B, Founder M&A: M&A Readiness Timing; M&A Readiness Category Scores; M&A Readiness Risk Map; M&A Readiness 60 Day Plan.
6. For each field, select the exact type, enter the exact label, and if HighLevel exposes placeholder/key/description/help text, enter the bare API key exactly.
7. Do not add options, validation, automation triggers, workflow conditions, messages, tags, opportunities, contacts, tasks, campaigns, or social actions.
8. After field creation, stop and run/read the approved read-only verifier. Do not proceed to workflow QA, live lead tests, or adapter reliance until verification passes.

## Jeff approval boxes

Jeff should choose one path before any future operator acts:

- [ ] Approve a future manual HighLevel UI packet to create the six Contact custom fields listed in this decision table only, in Whiteford Schell IP (`tm68WWMrcAa3TqQbEAMa`), with no workflow/contact/opportunity/tag/message/social/ad/Clio/Supabase/public-page mutation and with post-creation read-only verification required before reliance.
- [ ] Hold these six fields until the current 31-field/37-field guardrail-v2 remediation is fully verified and reviewed.
- [ ] Request an engineering review to remove these six emitted fields from `/api/leads` before any live HighLevel adapter change.
- [ ] Request a lean-CRM remap proposal that consolidates some or all six into existing fields, with explicit semantic tradeoffs and no live-system mutation.
- [ ] Request attorney/privacy review before deciding whether these M&A and AI Patent diagnostic details should be stored in HighLevel at all.

Default recommendation: approve the “hold until 37-field gate passes, then create six later as Contact fields” path. That preserves lead-magnet diagnostic value while avoiding immediate scope creep in the current HighLevel field remediation packet.

## Stop and rollback conditions

A future operator must stop immediately if any of the following occurs:

- The approval does not name the exact six fields, types, location, operator, timing, and no-mutation/no-send boundaries.
- HighLevel is not in the Whiteford Schell IP location or the Custom Field object is not Contact.
- HighLevel proposes a generated key other than the expected `contact.<bare_key>` value.
- Any duplicate or near-duplicate field already exists.
- The UI prompts for workflow automation, campaign/message/template use, bulk action, import/export, contact update, opportunity update, enrollment, send, schedule, public publish, or social/ad action.
- The operator cannot preserve evidence of labels, keys, object scope, and types.
- Any field is created with the wrong label, type, object, or generated key.
- The read-only verifier shows missing fields, type mismatches, generated-key risks, duplicates, or unexpected response shape.
- Any real lead/prospect/client/contact data would be used to test the field.

Rollback posture if an approved field is created incorrectly:

1. Keep workflows Draft/Off and do not run live tests.
2. Preserve screenshots/API evidence of the erroneous field name, key, type, object, and timestamp.
3. If no live data has been written to the new field and Jeff separately approves cleanup, delete/recreate only the mistaken empty field if HighLevel safely supports deletion.
4. If deletion is unavailable, unsafe, or not approved, leave the field untouched and create an engineering mapping-remediation task before any live write or workflow reliance.
5. Rerun read-only verification and update the launch-gate/field packet before any further pilot step.

## No-action boundary

This table is not a HighLevel implementation packet, field creation approval, workflow activation approval, live-token QA approval, public launch approval, or external communications approval. It is a local/internal decision aid only.
