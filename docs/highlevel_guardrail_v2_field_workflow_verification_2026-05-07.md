# HighLevel Guardrail v2 Field + Draft/Off Workflow Verification

Task: `t_316491ce`
Generated: 2026-05-07 05:44 MDT
Location: Whiteford Schell IP (`tm68WWMrcAa3TqQbEAMa`)
Pipeline: Whiteford Schell IP Pipeline (`Tbx4tA6wHv5lTwZPSHyZ`)
Status: approval/manual-work packet only. No external send, workflow activation, contact enrollment, live CRM mutation, field creation, workflow edit, production env write, public publish, social/LinkedIn action, ad action, or Clio write was performed.

## Executive verdict

HighLevel is safe from an activation-status perspective but not field-complete for the lead-magnet guardrail v2 launch gate.

Read-only API evidence confirms the four Whiteford intake workflows exist and all remain `draft`:

| Lane | Workflow ID | API status |
| --- | --- | --- |
| AI Compliance Gameplan | `682ada5f-fa1e-4411-97d6-a1e019139614` | `draft` |
| AI Patent Strategy Scorecard | `8dbff7fd-caa0-49b3-ba16-bd46b4a1f1d7` | `draft` |
| Founder M&A Readiness | `4be5ea96-b497-4149-be72-f38aa136da35` | `draft` |
| Tech GC Launchpad | `dee4450a-1b7b-4597-9fa4-9c7b7423b848` | `draft` |

Read-only API evidence also confirms only 6 of 37 guardrail/mapped fields are currently present. The missing fields should be created manually in HighLevel only after Jeff approves the exact field list below, or via a separately approved safe setup script. Do not activate workflows or enable message steps until the field gaps and UI-level guard checks are closed.

## Evidence sources

Local/project sources reviewed:

- `docs/lead_magnet_privacy_guardrail_parity_patch_2026-05-07.md`
- `docs/lead_magnet_privacy_guardrail_parity_review_2026-05-07.md`
- `docs/api_leads_server_guardrail_hardening_2026-05-07.md`
- `docs/highlevel_campaign_implementation_plan.md`
- `docs/highlevel_draft_off_workflow_implementation_packets.md`
- `docs/highlevel_workflow_wiring_status.md`
- `src/app/api/leads/route.ts`

Read-only HighLevel API evidence:

- `docs/highlevel_guardrail_v2_api_probe_2026-05-07.json`
- Credential source used by the probe: Growth OS `crm_integration_config.secret_ref`, redacted in all output.
- API calls made: `GET /locations/{locationId}`, `GET /locations/{locationId}/customFields`, `GET /workflows/?locationId=...`, `GET /emails/campaigns/workflows?locationId=...`.
- No POST, PUT, PATCH, DELETE, enrollment, contact/opportunity write, send, workflow edit, campaign edit, or env write was made.

Business-development/RAG grounding:

- Business-development corpus query run: `python3 /Users/jeff/.hermes/knowledge/business-development/search_business_dev.py "lead magnet fulfill promise consent trust legal professional services email follow up" -k 4`.
- Applied only as synthesized principle: fulfill the lead-magnet promise and build trust before nurture; do not force marketing consent as the price of basic educational value.
- QMD retrieval: Node v24/default qmd failed with a `better-sqlite3` ABI mismatch; retried with Homebrew Node v25.9.0. The first targeted suppression query returned no results; a broader `highlevel workflow draft off` search returned Whiteford docs about HighLevel workflow API limits and draft/off workflow use.

## Read-only API probe summary

| Probe | Result |
| --- | --- |
| Location API | OK |
| Contact custom fields API | OK |
| Workflows list API | OK |
| Workflow campaigns API | OK |
| Total contact fields returned | 33 |
| Guardrail/mapped fields expected | 37 |
| Guardrail/mapped fields present | 6 |
| Guardrail/mapped fields missing | 31 |
| Workflow count returned | 4 |
| Unsafe workflow status signals | 0 |

Important limitation: the public/read-only workflow list confirms names and `draft` status, but it does not expose full step-level condition logic. Suppression/DND/unsubscribe/consent/disclaimer/version guards before message steps still require manual HighLevel UI verification and screenshot/DOM evidence.

## Existing required fields verified

| API key | HighLevel field key | Name | Type | ID |
| --- | --- | --- | --- | --- |
| `approval_status` | `contact.approval_status` | Approval Status | TEXT | `PZQ4DD5Dy4qJG9pTsNM3` |
| `consent_basis` | `contact.consent_basis` | Consent Basis | TEXT | `TvCAwsNbVg94JrEBM3e0` |
| `ai_patent_score` | `contact.ai_patent_score` | AI Patent Score | NUMERICAL | `L78KuFhyFafq5PSp5MjR` |
| `ai_patent_stage` | `contact.ai_patent_stage` | AI Patent Stage | TEXT | `7pf3mgT5ttvFjBjEpg5m` |
| `ai_patent_score_band` | `contact.ai_patent_score_band` | AI Patent Score Band | TEXT | `xh6AfuK3kI9YCbkL3Wko` |
| `ai_patent_checks` | `contact.ai_patent_checks` | AI Patent Checks | LARGE_TEXT | `0mv2zSrrPiwTw3Eufuwk` |

No type mismatches were found for the verified required fields.

## Missing field creation packet

Manual creation should be done in HighLevel UI as contact custom fields. Recommended naming convention: create the field with the exact display name below and put the bare API key in the placeholder/description if HighLevel offers that field. After creation, verify that the generated field key is `contact.<api_key>`. If HighLevel generates a different key, either rename/recreate before use or update `/api/leads` mapping in a separate engineering task.

| API key expected by `/api/leads` | Display name to create | Type |
| --- | --- | --- |
| `privacy_guardrail_version` | Privacy Guardrail Version | TEXT |
| `public_form_input_type` | Public Form Input Type | TEXT |
| `disclaimer_acknowledged` | Disclaimer Acknowledged | TEXT |
| `report_requested` | Report Requested | TEXT |
| `ai_compliance_maturity_level` | AI Compliance Maturity Level | TEXT |
| `ai_compliance_category_scores` | AI Compliance Category Scores | LARGE_TEXT |
| `ai_compliance_top_gaps` | AI Compliance Top Gaps | LARGE_TEXT |
| `ai_compliance_recommended_next_step` | AI Compliance Recommended Next Step | TEXT |
| `ai_compliance_heat_map` | AI Compliance Heat Map | LARGE_TEXT |
| `ai_compliance_10_day_fixes` | AI Compliance 10 Day Fixes | LARGE_TEXT |
| `ai_compliance_roadmap_30_60_90` | AI Compliance Roadmap 30 60 90 | LARGE_TEXT |
| `ai_compliance_report_version` | AI Compliance Report Version | TEXT |
| `ai_patent_privacy_guardrail_version` | AI Patent Privacy Guardrail Version | TEXT |
| `ai_patent_report_version` | AI Patent Report Version | TEXT |
| `ai_patent_recommended_next_step` | AI Patent Recommended Next Step | TEXT |
| `ma_readiness_privacy_guardrail_version` | M&A Readiness Privacy Guardrail Version | TEXT |
| `ma_readiness_input_type` | M&A Readiness Input Type | TEXT |
| `ma_readiness_report_version` | M&A Readiness Report Version | TEXT |
| `ma_readiness_score` | M&A Readiness Score | NUMERICAL |
| `ma_readiness_band` | M&A Readiness Band | TEXT |
| `ma_readiness_answers_json` | M&A Readiness Answers JSON | LARGE_TEXT |
| `tech_legal_health_privacy_guardrail_version` | Tech Legal Health Privacy Guardrail Version | TEXT |
| `tech_legal_health_report_version` | Tech Legal Health Report Version | TEXT |
| `tech_legal_health_score` | Tech Legal Health Score | NUMERICAL |
| `tech_legal_health_band` | Tech Legal Health Band | TEXT |
| `tech_legal_health_company_moment` | Tech Legal Health Company Moment | TEXT |
| `tech_legal_health_lowest_category` | Tech Legal Health Lowest Category | TEXT |
| `tech_legal_health_category_scores` | Tech Legal Health Category Scores | LARGE_TEXT |
| `tech_legal_health_top_actions` | Tech Legal Health Top Actions | LARGE_TEXT |
| `tech_legal_health_branch_signals` | Tech Legal Health Branch Signals | LARGE_TEXT |
| `tech_legal_health_answers_json` | Tech Legal Health Answers JSON | LARGE_TEXT |

AI Compliance note: the current API mapping includes `ai_compliance_report_version` and the shared `privacy_guardrail_version` / `public_form_input_type` / `disclaimer_acknowledged` / `report_requested` fields. It does not currently map a dedicated `ai_compliance_privacy_guardrail_version` field. If Jeff wants app-specific guardrail-version fields for all four lanes, add `ai_compliance_privacy_guardrail_version` in a separate code/field mapping task before public use.

## Exact manual UI steps for missing fields

Do not perform these steps until Jeff approves the field list above.

1. Open HighLevel and switch to location `Whiteford Schell IP`.
2. Go to Settings -> Custom Fields.
3. Select Contact as the object/module if HighLevel asks.
4. For each missing field above:
   - Click Add Field.
   - Choose the listed Type: TEXT, LARGE_TEXT, or NUMERICAL.
   - Enter the listed Display Name exactly.
   - If a placeholder/default/description field is available, enter the bare API key, for example `privacy_guardrail_version`.
   - Save the field.
5. After all fields are created, rerun a read-only custom-field verification.
6. Confirm every field key returned by the API is `contact.<api_key>`.
7. If any generated key differs, do not launch; either recreate the field with a corrected name or update the app mapping in a separate code task and rerun tests.
8. Keep workflows draft/off while field verification is incomplete.

## Workflow Draft/Off verification

Read-only API confirms all four current Whiteford intake workflows are draft. This satisfies the activation-state portion of the launch gate, but not the full guardrail/step-level QA gate.

Manual UI verification still required for each workflow:

1. Open Automation -> Workflows in HighLevel for location `Whiteford Schell IP`.
2. Open the workflow by name and ID:
   - `WF | Intake | Whiteford | AI Compliance Gameplan | Draft` / `682ada5f-fa1e-4411-97d6-a1e019139614`
   - `WF | Intake | Whiteford | AI Patent Strategy Scorecard | Draft` / `8dbff7fd-caa0-49b3-ba16-bd46b4a1f1d7`
   - `WF | Intake | Whiteford | Founder M&A Readiness | Draft` / `4be5ea96-b497-4149-be72-f38aa136da35`
   - `WF | Intake | Whiteford | Tech GC Launchpad | Draft` / `dee4450a-1b7b-4597-9fa4-9c7b7423b848`
3. Confirm the workflow status remains Draft/Off and is not Published/Active.
4. Confirm any trigger is limited to the correct lane tag and/or final approved form/survey source:
   - AI Patent: `workflow:ai-patent-strategy`
   - AI Compliance: `workflow:ai-compliance-readiness`
   - Tech GC: `workflow:tech-gc-launchpad`
   - Founder M&A: `workflow:ma-readiness`
5. Confirm no contact can enter via generic lead tags, stale imported prospects, Agent Targeting records, or manual social-planner actions.
6. Confirm any existing email/SMS/message steps are disabled placeholders or draft-only until Jeff approves exact copy, sender, footer, timing, and activation.
7. Capture screenshots or DOM evidence for status and gate conditions before any controlled-pilot approval.

## Mandatory guard checklist before any message step

Every workflow must check all of the following before any external email/SMS/DM/voicemail/social action is enabled. If any check fails, the workflow should exit, skip the message step, or create an internal review task only.

### Suppression and DND

- Contact DND is false / no DND block applies.
- HighLevel unsubscribe/suppression state does not block the channel.
- Contact does not have `outreach:do-not-send`.
- Contact does not have `ops:no-auto-send` for the intended external action.
- Contact does not have `newsletter:not-consented` for marketing nurture.
- No conflicts/intake hold, attorney-review hold, or firm approval hold is present.

### Consent and newsletter basis

- Contact has `newsletter:ai` for marketing nurture.
- Contact does not have `newsletter:not-consented`.
- `contact.consent_basis` exists and starts with an approved lead-magnet opt-in basis, such as `lead_magnet_email_opt_in:`.
- Consent basis matches the lane/source route and was captured after the final approved public copy.
- Non-subscribed report requests remain `Approval Status = no-auto-send` and must not enter a nurture sequence.

### Approval and copy status

- `contact.approval_status` is `pending` for internal review or `approved` only after Jeff/Whiteford approval; it must not be `no-auto-send`, `suppressed`, `revise`, blank, or unknown before a message step.
- The exact email/report copy version has been approved by Jeff/Whiteford.
- Sender identity, firm footer, unsubscribe/preference handling, legal disclaimer, no-legal-advice language, no-attorney-client language, and conflicts/written-engagement caveat have been approved.
- Message timing and business-hours rules are approved.

### Disclaimer and version guard

- `contact.disclaimer_acknowledged` equals `true`.
- `contact.privacy_guardrail_version` equals `lead-magnet-guardrail-v2`.
- `contact.public_form_input_type` equals `categorical_non_confidential`.
- `contact.report_requested` is consistent with the planned fulfillment path.
- The lane-specific report/version field is present where applicable:
  - AI Compliance: `contact.ai_compliance_report_version`
  - AI Patent: `contact.ai_patent_report_version` and `contact.ai_patent_privacy_guardrail_version`
  - Founder M&A: `contact.ma_readiness_report_version`, `contact.ma_readiness_privacy_guardrail_version`, and `contact.ma_readiness_input_type`
  - Tech GC: `contact.tech_legal_health_report_version` and `contact.tech_legal_health_privacy_guardrail_version`

## Controlled-pilot implications

Until the missing fields are created and workflow UI guards are verified, the lead-magnet system remains blocked for public production, live workflow activation, and external outreach. The API hardening parent closed the server-side disclaimer/version/schema blocker for staging/internal review, and this task confirms the workflows are draft, but the HighLevel field layer is not yet complete enough for even a realistic live-field smoke test without manual remediation.

Recommended next order:

1. Jeff approves or edits the missing custom-field list.
2. HighLevel browser operator creates the approved missing fields only, or Jeff authorizes a safe field-creation script for those exact fields.
3. Rerun read-only field verification and attach updated JSON evidence.
4. Browser operator captures workflow UI evidence for suppression/DND/unsubscribe/consent/approval/disclaimer/version guards.
5. Reviewer updates the launch-gate verdict.
6. If still desired, run a Jeff-owned TEST-record controlled pilot only after the field and UI evidence gates are closed.

## Safety statement

This task performed documentation, local file writes, read-only HighLevel API GET calls, and local retrieval only. It did not send email/SMS/DM, publish or schedule social posts, enroll contacts, activate workflows, create/update fields, create/update contacts or opportunities, add production environment variables, write to Clio, or make public/client-facing changes.
