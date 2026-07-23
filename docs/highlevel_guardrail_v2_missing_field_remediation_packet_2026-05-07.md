# HighLevel Guardrail v2 Missing-Field Remediation Packet

Task: `t_905eb5f5`
Date: 2026-05-07
Tenant: whiteford-mountain-west
HighLevel location: Whiteford Schell IP (`tm68WWMrcAa3TqQbEAMa`)
Pipeline context: Whiteford Schell IP Pipeline (`Tbx4tA6wHv5lTwZPSHyZ`)
Status: approval packet and local/read-only helper only. No HighLevel fields, contacts, opportunities, workflows, tags, campaigns, messages, env vars, public pages, social/LinkedIn posts, ads, Clio records, or external recipients were created, changed, activated, enrolled, sent, published, or scheduled.

## Executive decision

HighLevel is currently blocked for any realistic live-field smoke test or workflow activation because the guardrail v2 field layer is incomplete: the prior read-only HighLevel API probe verified only 6 of 37 required guardrail/mapped contact fields and found 31 missing fields.

Recommended next step: Jeff should approve manual creation of the exact 31 contact custom fields listed below in HighLevel UI, or approve a separate field-creation script scope for the exact same list only. Until the fields are created and re-verified, keep all four intake workflows Draft/Off and do not run live lead capture, automation enrollment, email/SMS/DM/social actions, public publishing, ads, Clio writes, or contact/opportunity mutations.

Business-development principle applied: the lead magnet should first fulfill the promised diagnostic value using safe, categorical, non-confidential data. Marketing nurture is optional and consent-gated; it is not the price of receiving basic educational value. High-fit users should be routed to bounded productized reviews such as Tech Company OGC Launchpad, AI Compliance Readiness Sprint, AI Patent Strategy Sprint, or Founder M&A Readiness Review only after guardrails, consent, and approvals are present.

## Source evidence

Primary project docs reviewed:

- `docs/highlevel_guardrail_v2_field_workflow_verification_2026-05-07.md`
- `docs/highlevel_guardrail_v2_api_probe_2026-05-07.json`
- `docs/lead_magnet_pilot_hardening_launch_gate_review_2026-05-07.md`
- `docs/controlled_pilot_approval_packet_tech_gc_default_2026-05-07.md`
- `src/app/api/leads/route.ts` lines 316-380 for current custom-field payload keys.

Retrieval grounding:

- Business-development corpus command run: `python3 /Users/jeff/.hermes/knowledge/business-development/search_business_dev.py "lead magnet fulfill promise consent trust professional services diagnostic nurture" -k 4`.
- Applied as synthesis only: lead magnets should solve a narrow problem and build trust before nurture; do not reproduce source text.
- QMD command attempted with Node v24 and failed due to the known `better-sqlite3` ABI mismatch; retried with Homebrew Node v25.9.0. Targeted guardrail/field searches returned no direct results, while a broader `HighLevel` query confirmed the Whiteford docs collection is searchable.

Read-only/dry-run helper produced:

- Script: `scripts/verify_highlevel_guardrail_v2_fields_readonly.py`
- Dry-run JSON evidence: `docs/highlevel_guardrail_v2_field_dry_run_result_2026-05-07.json`
- Dry-run Markdown evidence: `docs/highlevel_guardrail_v2_field_dry_run_result_2026-05-07.md`
- Dry-run result from saved probe: expected 37, present 6, missing 31, type mismatches 0, generated-key risks 0 in currently existing fields.

## Existing verified fields - do not recreate

These six fields already exist with the expected `contact.<api_key>` field keys and types. Do not duplicate them.

| API key | HighLevel field key | Display name | Type | Existing field ID |
| --- | --- | --- | --- | --- |
| `approval_status` | `contact.approval_status` | Approval Status | TEXT | `PZQ4DD5Dy4qJG9pTsNM3` |
| `consent_basis` | `contact.consent_basis` | Consent Basis | TEXT | `TvCAwsNbVg94JrEBM3e0` |
| `ai_patent_score` | `contact.ai_patent_score` | AI Patent Score | NUMERICAL | `L78KuFhyFafq5PSp5MjR` |
| `ai_patent_stage` | `contact.ai_patent_stage` | AI Patent Stage | TEXT | `7pf3mgT5ttvFjBjEpg5m` |
| `ai_patent_score_band` | `contact.ai_patent_score_band` | AI Patent Score Band | TEXT | `xh6AfuK3kI9YCbkL3Wko` |
| `ai_patent_checks` | `contact.ai_patent_checks` | AI Patent Checks | LARGE_TEXT | `0mv2zSrrPiwTw3Eufuwk` |

## Exact missing field list for Jeff approval

Create these as Contact custom fields only after Jeff approves this exact list. Use the display name exactly. If HighLevel provides a placeholder, key, or description input, enter the bare API key exactly.

| # | Lane | API key expected by `/api/leads` | Display name to create | Type | Why it matters |
| ---: | --- | --- | --- | --- | --- |
| 1 | Shared guardrail | `privacy_guardrail_version` | Privacy Guardrail Version | TEXT | Confirms the user accepted the approved lead-magnet guardrail version. |
| 2 | Shared guardrail | `public_form_input_type` | Public Form Input Type | TEXT | Confirms categorical non-confidential input posture. |
| 3 | Shared guardrail | `disclaimer_acknowledged` | Disclaimer Acknowledged | TEXT | Records the prerequisite no-legal-advice/no-attorney-client disclaimer acknowledgment. |
| 4 | Shared fulfillment | `report_requested` | Report Requested | TEXT | Separates educational report request from optional marketing opt-in. |
| 5 | AI Compliance | `ai_compliance_maturity_level` | AI Compliance Maturity Level | TEXT | Stores maturity band for diagnostic report fulfillment and internal triage. |
| 6 | AI Compliance | `ai_compliance_category_scores` | AI Compliance Category Scores | LARGE_TEXT | Stores compact category score JSON/list. |
| 7 | AI Compliance | `ai_compliance_top_gaps` | AI Compliance Top Gaps | LARGE_TEXT | Stores compact top-gap output for promised diagnostic value. |
| 8 | AI Compliance | `ai_compliance_recommended_next_step` | AI Compliance Recommended Next Step | TEXT | Routes high-fit users to a bounded AI Compliance Readiness Sprint rather than vague consult language. |
| 9 | AI Compliance | `ai_compliance_heat_map` | AI Compliance Heat Map | LARGE_TEXT | Stores readiness heat-map output. |
| 10 | AI Compliance | `ai_compliance_10_day_fixes` | AI Compliance 10 Day Fixes | LARGE_TEXT | Stores practical first-step educational fixes. |
| 11 | AI Compliance | `ai_compliance_roadmap_30_60_90` | AI Compliance Roadmap 30 60 90 | LARGE_TEXT | Stores roadmap output for fulfillment. |
| 12 | AI Compliance | `ai_compliance_report_version` | AI Compliance Report Version | TEXT | Version-controls approved report/copy posture. |
| 13 | AI Patent | `ai_patent_privacy_guardrail_version` | AI Patent Privacy Guardrail Version | TEXT | Records lane-specific guardrail version for AI Patent. |
| 14 | AI Patent | `ai_patent_report_version` | AI Patent Report Version | TEXT | Version-controls AI Patent report/copy posture. |
| 15 | AI Patent | `ai_patent_recommended_next_step` | AI Patent Recommended Next Step | TEXT | Routes high-fit users to AI Patent Strategy Sprint language. |
| 16 | Founder M&A | `ma_readiness_privacy_guardrail_version` | M&A Readiness Privacy Guardrail Version | TEXT | Records lane-specific guardrail version for M&A readiness. |
| 17 | Founder M&A | `ma_readiness_input_type` | M&A Readiness Input Type | TEXT | Confirms categorical non-confidential input posture. |
| 18 | Founder M&A | `ma_readiness_report_version` | M&A Readiness Report Version | TEXT | Version-controls M&A readiness report/copy posture. |
| 19 | Founder M&A | `ma_readiness_score` | M&A Readiness Score | NUMERICAL | Stores readiness score. |
| 20 | Founder M&A | `ma_readiness_band` | M&A Readiness Band | TEXT | Stores readiness band. |
| 21 | Founder M&A | `ma_readiness_answers_json` | M&A Readiness Answers JSON | LARGE_TEXT | Stores compact categorical answer JSON. |
| 22 | Tech GC | `tech_legal_health_privacy_guardrail_version` | Tech Legal Health Privacy Guardrail Version | TEXT | Records lane-specific guardrail version for Tech GC. |
| 23 | Tech GC | `tech_legal_health_report_version` | Tech Legal Health Report Version | TEXT | Version-controls Tech GC report/copy posture. |
| 24 | Tech GC | `tech_legal_health_score` | Tech Legal Health Score | NUMERICAL | Stores legal health score. |
| 25 | Tech GC | `tech_legal_health_band` | Tech Legal Health Band | TEXT | Stores legal health band. |
| 26 | Tech GC | `tech_legal_health_company_moment` | Tech Legal Health Company Moment | TEXT | Stores company-stage signal for internal routing. |
| 27 | Tech GC | `tech_legal_health_lowest_category` | Tech Legal Health Lowest Category | TEXT | Stores the lowest-readiness category. |
| 28 | Tech GC | `tech_legal_health_category_scores` | Tech Legal Health Category Scores | LARGE_TEXT | Stores compact category score JSON/list. |
| 29 | Tech GC | `tech_legal_health_top_actions` | Tech Legal Health Top Actions | LARGE_TEXT | Stores practical next-action output. |
| 30 | Tech GC | `tech_legal_health_branch_signals` | Tech Legal Health Branch Signals | LARGE_TEXT | Stores non-trigger branch signals for human review. |
| 31 | Tech GC | `tech_legal_health_answers_json` | Tech Legal Health Answers JSON | LARGE_TEXT | Stores compact categorical answer JSON. |

AI Compliance note: the app currently maps AI Compliance to the shared `privacy_guardrail_version` plus `ai_compliance_report_version`; it does not map a dedicated `ai_compliance_privacy_guardrail_version`. Do not add a dedicated AI Compliance lane-specific guardrail field unless a separate engineering task updates `/api/leads` mapping and tests.

## Generated-key risk and how to handle it

HighLevel field creation can generate a field key from the display name. The application expects exact custom field keys by API key. For each new field, the post-creation API must return the exact key `contact.<api_key>`.

Risk examples:

- Expected: `contact.ma_readiness_answers_json`; risky generated variants could include `contact.m_a_readiness_answers_json`, `contact.ma_readiness_answers`, or `contact.m_and_a_readiness_answers_json`.
- Expected: `contact.ai_compliance_roadmap_30_60_90`; risky generated variants could drop numbers or change separators.
- Expected: `contact.tech_legal_health_answers_json`; risky generated variants could omit `_json`.

If any generated key differs from expected:

1. Do not launch or activate anything.
2. Do not update workflow message steps to rely on the mismatched field.
3. Prefer immediate correction before real data exists: delete/recreate only the just-created empty field if HighLevel permits safe deletion and Jeff approved that cleanup scope.
4. If deletion/recreation is not safe or not approved, create an engineering task to update `/api/leads` mapping and tests to the actual HighLevel key before any live write.
5. Rerun the read-only verifier and attach fresh evidence.

## Manual HighLevel UI steps requested for approval

Approval wording Jeff can use:

`I approve manual HighLevel UI creation, in the Whiteford Schell IP location only, of the 31 Contact custom fields listed in docs/highlevel_guardrail_v2_missing_field_remediation_packet_2026-05-07.md, using the exact display names, types, and bare API-key placeholders shown there. This approval does not authorize workflow activation, contact/opportunity writes, contact enrollment, external sends, public publishing, social/LinkedIn/ad actions, Clio writes, production env changes, or creation of any field not listed in that packet. After creation, run read-only verification and stop if any generated field key differs from contact.<api_key>.`

Manual steps for an approved operator:

1. Switch HighLevel to location `Whiteford Schell IP`.
2. Go to Settings -> Custom Fields.
3. Confirm the object/module is Contact, not Opportunity, Company, or a custom object.
4. Confirm the six existing fields in this packet are already present; do not recreate them.
5. For each of the 31 missing fields:
   - Click Add Field.
   - Select the listed type: TEXT, LARGE_TEXT, or NUMERICAL.
   - Enter the exact display name from the table.
   - If HighLevel exposes placeholder/key/description/help text, enter the bare API key from the table.
   - Save.
6. Do not add options, validation, automation triggers, workflow triggers, message steps, tags, opportunities, contacts, tasks, social actions, or campaigns while creating fields.
7. After all fields are created, run read-only verification before any other work.
8. If any field key differs from expected, stop and raise a blocker.

## Separately approved safe script scope

If Jeff prefers script-based creation later, this packet does not itself approve that mutation. The safe future script approval must be separate and should use this wording:

`I approve a one-time HighLevel field-creation script for location tm68WWMrcAa3TqQbEAMa only, limited to creating only the missing Contact custom fields listed in docs/highlevel_guardrail_v2_missing_field_remediation_packet_2026-05-07.md, and only if the script first performs a read-only GET verification, skips any existing fields, prints a dry-run plan, and requires an explicit confirmation flag. The script may not create contacts, opportunities, tags, workflows, campaigns, messages, tasks, social posts, ads, Clio records, env vars, or any field outside the approved list. After creation it must run read-only verification and report any generated-key mismatch as a launch blocker.`

Minimum script safeguards required before any future creation script is acceptable:

- Default mode must be dry-run/no-write.
- Creation mode must require an explicit flag such as `--create-approved-fields` plus a dated approval note or approval artifact path.
- The script must use only a HighLevel custom-field creation endpoint and only for Contact custom fields in `tm68WWMrcAa3TqQbEAMa`.
- It must never call contact, opportunity, workflow, campaign, message, enrollment, social, ad, Clio, or env endpoints.
- It must skip existing fields by key/name and print what it skipped.
- It must save redacted evidence of every API call path/method and every created field id/key.
- It must stop on first unexpected response shape, duplicate, type mismatch, generated-key mismatch, or non-2xx response.

## Read-only/dry-run verification helper

A safe helper was added at:

`scripts/verify_highlevel_guardrail_v2_fields_readonly.py`

Dry-run from saved evidence:

```bash
python3 scripts/verify_highlevel_guardrail_v2_fields_readonly.py \
  --input docs/highlevel_guardrail_v2_api_probe_2026-05-07.json \
  --output-json docs/highlevel_guardrail_v2_field_dry_run_result_2026-05-07.json \
  --output-md docs/highlevel_guardrail_v2_field_dry_run_result_2026-05-07.md
```

Expected current result before remediation: exit code 2, because the field check intentionally fails while fields are missing. The task run handled that expected failure and saved the output artifacts.

Optional live read-only verification after Jeff-approved field creation:

```bash
GHL_PRIVATE_INTEGRATION_TOKEN=<token> \
python3 scripts/verify_highlevel_guardrail_v2_fields_readonly.py \
  --live-read-only \
  --location-id tm68WWMrcAa3TqQbEAMa \
  --output-json docs/highlevel_guardrail_v2_field_post_creation_readonly_result_YYYY-MM-DD.json \
  --output-md docs/highlevel_guardrail_v2_field_post_creation_readonly_result_YYYY-MM-DD.md
```

Live read-only mode makes only one `GET /locations/{locationId}/customFields` request. It does not send POST/PUT/PATCH/DELETE and does not touch contacts, opportunities, workflows, campaigns, messages, enrollments, social, ads, Clio, or env vars.

Pass criteria:

- Expected fields: 37.
- Present fields: 37.
- Missing fields: 0.
- Type mismatches: 0.
- Generated-key risks: 0.
- Every returned expected field key equals `contact.<api_key>`.

## Post-creation verification checklist

Complete this checklist before any controlled pilot, live-field smoke test, or workflow UI guard verification that depends on fields.

- [ ] Read-only verifier shows 37/37 expected fields present.
- [ ] No type mismatches.
- [ ] No generated-key risks.
- [ ] Six pre-existing fields are still present and were not duplicated.
- [ ] All 31 new fields are Contact custom fields, not Opportunity or Company fields.
- [ ] No workflow status changed; all four intake workflows remain Draft/Off.
- [ ] No contacts, opportunities, tags, notes, tasks, campaigns, messages, enrollments, or social/ad/Clio records were created or changed as part of field creation.
- [ ] Evidence JSON/Markdown is saved in `docs/` and linked from `docs/KANBAN_DELIVERABLE_INDEX.md`.
- [ ] If Tech GC is still the first controlled-pilot lane, the Tech GC workflow UI evidence task remains limited to Draft/Off inspection and suppression/consent/guardrail guard screenshots.
- [ ] Non-subscriber fulfillment policy remains unresolved unless Jeff separately approves exact transactional/on-page/no-send handling.

## Rollback and no-activation boundaries

This remediation packet is not an activation packet.

Always forbidden unless Jeff gives a separate, explicit, current approval:

- Activating, publishing, enabling, manually starting, or enrolling anyone into a HighLevel workflow.
- Sending email, SMS, DM, voicemail, LinkedIn message, social post, or ad.
- Creating or changing live CRM contacts/opportunities, except a separately approved Jeff-owned TEST-record scope.
- Adding production HighLevel credentials or changing Vercel/env configuration.
- Publishing public/client-facing pages, forms, reports, newsletters, campaigns, social posts, or ads.
- Writing to Clio.
- Adding fields outside the approved list.

Rollback if a field mistake is discovered immediately after approved manual creation:

1. Keep workflows Draft/Off and do not run live tests.
2. Preserve screenshots/API evidence of the erroneous field name/key/type.
3. If no live data has been written to the new field and Jeff approved field cleanup, delete/recreate only the mistaken empty field.
4. If deletion is unavailable or data may exist, do not delete; create an engineering mapping remediation task and mark the launch gate blocked.
5. Rerun read-only verification after correction.
6. Update the launch-gate review before any further pilot step.

## Jeff approval decision block

Jeff should approve one of these exact options:

- [ ] Approve manual UI creation of the 31 listed Contact custom fields only, with no activation and no CRM/contact/opportunity/message/social/ad/Clio side effects.
- [ ] Hold manual creation and request edits to the field list/types/names.
- [ ] Request a separate dry-run-first creation script approval packet using the exact scope language above.
- [ ] Hold all HighLevel remediation until non-subscriber fulfillment policy or first-lane pilot strategy is decided.

Default recommendation: approve manual UI creation of the 31 exact fields, then run the read-only verifier and keep all workflows Draft/Off while the browser operator captures UI-level suppression/consent/disclaimer/version guard evidence.
