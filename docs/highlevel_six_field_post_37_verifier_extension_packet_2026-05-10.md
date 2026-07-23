# HighLevel six-field post-37 verifier extension packet — 2026-05-10

Task: `t_437f301e`
Tenant: `whiteford-mountain-west`
Location: Whiteford Schell IP (`tm68WWMrcAa3TqQbEAMa`)
Pipeline context: Whiteford Schell IP Pipeline (`Tbx4tA6wHv5lTwZPSHyZ`)
Status: dormant, no-mutation verifier-extension planning packet only.

## Critical no-action boundary

This packet does not authorize HighLevel login, API calls, field creation, field editing, saved-view creation, workflow save/publish/test/manual-start/enrollment, contact/opportunity/tag/task/note mutation, campaign/template/newsletter work, email/SMS/DM/LinkedIn/social/ad action, Clio write, Supabase write, env/credential change, public-page deployment, local QA execution, live adapter reliance, or any client/prospect-facing action.

Use this only as a future read-only verifier-extension plan after both conditions are true:

1. The existing 37-field guardrail-v2 gate has passed cleanly: `expectedCount=37`, `presentCount=37`, `missingCount=0`, `typeMismatchCount=0`, `fieldKeyRiskCount=0`, `pass=true`.
2. Jeff separately approves exact manual creation of the six Contact custom fields below, in the Whiteford Schell IP location only, with attorney/privacy review for sensitive AI Patent and Founder M&A diagnostic storage.

Until those conditions are met, this packet is dormant. No worker should add these six fields to the live `/api/leads` adapter, use them in workflows/reports/dashboards, run a live HighLevel verifier, or ask for credentials.

## Source context reviewed

- `docs/highlevel_custom_field_decision_table_2026-05-10.md` — names the six emitted-but-unmapped `/api/leads` fields, recommends `create field later`, and sets Contact scope, labels, types, generated-key expectations, and risks.
- `docs/highlevel_guardrail_v2_no_mutation_field_manifest_2026-05-08.md` — defines the current 31 missing Contact custom fields, six UI batches, and 37/37 read-only verifier posture.
- `docs/highlevel_guardrail_v2_post_approval_verification_packet_2026-05-08.md` — defines the post-approval 37/37 operator packet, read-only command, evidence capture, stop conditions, and rollback/no-activation language.
- `scripts/verify_highlevel_guardrail_v2_fields_readonly.py` — existing read-only verifier. It currently defines `EXPECTED_FIELDS` inline with 37 expected Contact custom fields and supports saved-probe dry-run mode or one live read-only `GET /locations/{locationId}/customFields` call.
- `docs/reviews/2026-05-10_0530_lead_magnet_followup_prep_review.md` — PASS for internal decision prep only; all local QA, code, HighLevel, CRM, Supabase, Clio, workflow, email, social, public, prospect, and client-facing actions remain held pending exact approvals.
- `docs/digests/2026-05-10_0630_lead_magnet_highlevel_decision_digest.md` — carries forward the six-field default: hold now, create later only after exact approval and read-only verification; no immediate live adapter payload inclusion.
- Parent dashboard refresh `t_2316438f` — confirms the 05:30 PASS/internal-only review and 06:30 digest are surfaced in the private Approval Command Center without deploy, publish, HighLevel mutation, or external action.
- Business-development RAG query run for this packet: `lead magnet narrow diagnostic opt in educational legal follow up no legal advice`. Results reinforced that a lead magnet should solve a narrow diagnostic problem and deliver useful value before a next-step ask; no copyrighted book text is reproduced.
- QMD searches run over `whiteford-ai-law-pages`: `highlevel custom field decision table` and `lead magnet narrow diagnostic opt-in-only`. Results retrieved the current six-field decision table, static payload audit, QMD refresh, and prior lead-magnet/no-ACR guardrail context. An initial exact `six unmapped HighLevel fields verifier extension 43/43` search returned no results, so direct file-system review is controlling.

## Business-development and legal-marketing posture

The six fields exist to preserve diagnostic fulfillment context, not to trigger sales automation. A strong legal-services lead magnet should solve one narrow diagnostic problem, build problem awareness, and deliver useful value before asking for a larger next step. For Whiteford/Schell IP, any follow-up must remain opt-in-only, educational, non-hypey, non-confidential, no-attorney-client-relationship, no-legal-advice, no-guarantee, and attorney-review-gated.

Practical effect for this verifier extension:

- These six fields are internal diagnostic evidence fields only.
- Blank or absent values must not create urgency messaging, workflow enrollment, contact routing, opportunity stage movement, or personalized legal conclusions.
- AI Patent ownership and Founder M&A risk/plan values are sensitive enough to require attorney/privacy review before storage or use.
- A read-only 43/43 verifier pass would only prove field presence/type/key hygiene; it would not approve public launch, workflow activation, live adapter writes, or external communications.

## Exact six future Contact custom fields

Every row below is expected to be a Contact custom field in Whiteford Schell IP (`tm68WWMrcAa3TqQbEAMa`). The verifier should expect HighLevel to return the generated field key exactly as `contact.<bare_api_key>`.

| # | Lane | Exact label | Type | Bare API key | Expected generated field key | Object scope | Safe use / no-data posture |
| ---: | --- | --- | --- | --- | --- | --- | --- |
| 38 | AI Patent Strategy Scorecard | AI Patent Gap Map | LARGE_TEXT | `ai_patent_gap_map` | `contact.ai_patent_gap_map` | Contact | Preserve non-confidential categorical documentation/readiness gap-map context for internal review only. Blank means no gap-map evidence; do not personalize follow-up. |
| 39 | AI Patent Strategy Scorecard | AI Patent Ownership Gap Map | LARGE_TEXT | `ai_patent_ownership_gap_map` | `contact.ai_patent_ownership_gap_map` | Contact | Preserve non-confidential ownership/inventorship/process gap-map context only. Blank means no ownership-gap evidence; do not infer legal conclusions. |
| 40 | Founder M&A Readiness Checklist | M&A Readiness Timing | TEXT | `ma_readiness_timing` | `contact.ma_readiness_timing` | Contact | Capture a non-confidential timing band only. Blank means no timing signal; do not move pipeline stages or send urgency-based messages. |
| 41 | Founder M&A Readiness Checklist | M&A Readiness Category Scores | LARGE_TEXT | `ma_readiness_category_scores` | `contact.ma_readiness_category_scores` | Contact | Store compact categorical score evidence for audit and aggregate QA only. Blank means no category-score evidence; do not personalize by weakness. |
| 42 | Founder M&A Readiness Checklist | M&A Readiness Risk Map | LARGE_TEXT | `ma_readiness_risk_map` | `contact.ma_readiness_risk_map` | Contact | Preserve high-level buyer-diligence risk-map output for internal review only. Blank means no risk-map evidence; do not generate legal-risk messaging. |
| 43 | Founder M&A Readiness Checklist | M&A Readiness 60 Day Plan | LARGE_TEXT | `ma_readiness_60_day_plan` | `contact.ma_readiness_60_day_plan` | Contact | Store educational, non-legal-advice cleanup-plan output for fulfillment QA only. Blank means no plan evidence; do not imply legal advice or guarantees. |

Expected future combined verifier result after the 37-field gate is clean and these six fields are separately created and approved:

```text
expectedCount=43
presentCount=43
missingCount=0
typeMismatchCount=0
fieldKeyRiskCount=0
pass=true
```

A 43/43 pass is still read-only field-hygiene evidence only. It is not approval for workflow changes, live `/api/leads` writes, saved views, reporting reliance, launch, or outreach.

## Dormant verifier-extension plan

Recommended approach: extend the existing verifier in a reviewable, low-risk way only after Jeff approves the six-field creation and the 37/37 verifier has already passed.

### Option A — simple inline extension

If the verifier remains a small single-file script, append the six rows to `EXPECTED_FIELDS` after the current 37 rows.

Pseudocode/diff notes only — do not apply without approval:

```diff
 EXPECTED_FIELDS: list[dict[str, str]] = [
     ...existing 37 rows...
+    {"key": "ai_patent_gap_map", "name": "AI Patent Gap Map", "type": "LARGE_TEXT"},
+    {"key": "ai_patent_ownership_gap_map", "name": "AI Patent Ownership Gap Map", "type": "LARGE_TEXT"},
+    {"key": "ma_readiness_timing", "name": "M&A Readiness Timing", "type": "TEXT"},
+    {"key": "ma_readiness_category_scores", "name": "M&A Readiness Category Scores", "type": "LARGE_TEXT"},
+    {"key": "ma_readiness_risk_map", "name": "M&A Readiness Risk Map", "type": "LARGE_TEXT"},
+    {"key": "ma_readiness_60_day_plan", "name": "M&A Readiness 60 Day Plan", "type": "LARGE_TEXT"},
 ]
```

Then the unchanged `compare()` behavior should produce `expectedCount=43` because it uses `len(EXPECTED_FIELDS)`.

### Option B — safer profile flag

If Jeff wants to preserve the 37-field verifier as the default launch gate, add an explicit opt-in flag so 43-field verification cannot run accidentally.

Pseudocode/diff notes only:

```diff
 BASE_EXPECTED_FIELDS = [
     ...existing 37 rows...
 ]
+
+POST_37_SIX_FIELD_EXTENSION = [
+    {"key": "ai_patent_gap_map", "name": "AI Patent Gap Map", "type": "LARGE_TEXT"},
+    {"key": "ai_patent_ownership_gap_map", "name": "AI Patent Ownership Gap Map", "type": "LARGE_TEXT"},
+    {"key": "ma_readiness_timing", "name": "M&A Readiness Timing", "type": "TEXT"},
+    {"key": "ma_readiness_category_scores", "name": "M&A Readiness Category Scores", "type": "LARGE_TEXT"},
+    {"key": "ma_readiness_risk_map", "name": "M&A Readiness Risk Map", "type": "LARGE_TEXT"},
+    {"key": "ma_readiness_60_day_plan", "name": "M&A Readiness 60 Day Plan", "type": "LARGE_TEXT"},
+]
+
+def expected_fields(include_post_37_extension: bool = False) -> list[dict[str, str]]:
+    fields = list(BASE_EXPECTED_FIELDS)
+    if include_post_37_extension:
+        fields.extend(POST_37_SIX_FIELD_EXTENSION)
+    return fields
```

```diff
 parser.add_argument("--include-post-37-six-field-extension", action="store_true", help="Dormant: include the six Jeff-approved post-37 Contact fields; use only after 37/37 gate passes and the six fields are approved/created.")
```

```diff
- result = compare(fields)
+ result = compare(fields, expected_fields(args.include_post_37_six_field_extension))
```

This option is preferred because it keeps the current 37/37 launch gate stable until the six-field batch is explicitly in scope.

### Post-approval read-only command shape

Command shape for a future authorized operator only, after Jeff approval, after six-field creation, and with credentials already available to that operator. Do not run from this task.

```bash
GHL_PRIVATE_INTEGRATION_TOKEN=<token> \
python3 scripts/verify_highlevel_guardrail_v2_fields_readonly.py \
  --live-read-only \
  --include-post-37-six-field-extension \
  --location-id tm68WWMrcAa3TqQbEAMa \
  --output-json docs/highlevel_guardrail_v2_field_post_43_readonly_result_2026-05-10.json \
  --output-md docs/highlevel_guardrail_v2_field_post_43_readonly_result_2026-05-10.md
```

Expected pass: exit code `0`; `expectedCount=43`, `presentCount=43`, `missingCount=0`, `typeMismatchCount=0`, `fieldKeyRiskCount=0`, `pass=true`.

Expected stop/fail outcomes:

- Missing field: exit code `2`; `missingCount>0`; stop and preserve evidence.
- Type mismatch: exit code `2`; `typeMismatchCount>0`; stop and preserve evidence.
- Generated-key risk: exit code `2`; `fieldKeyRiskCount>0`; stop and preserve evidence.
- Token/response-shape/network error: exit code `1`; stop and resolve credential/response issue without mutation endpoints.

## Future operator checklist — dormant until approval

- [ ] Confirm Jeff approved the exact six-field creation packet, not just this verifier-extension packet.
- [ ] Confirm the existing 37-field verifier passed cleanly before the six-field extension is used.
- [ ] Confirm attorney/privacy review approved storage of AI Patent ownership and Founder M&A timing/risk/plan diagnostic values in HighLevel.
- [ ] Confirm every new field is Contact scope in Whiteford Schell IP (`tm68WWMrcAa3TqQbEAMa`), not Opportunity, Company, or custom-object scope.
- [ ] Confirm exact labels, types, bare API keys, and generated `contact.*` keys match the table above.
- [ ] Confirm no duplicates or near-duplicates exist by label, bare key, or generated field key.
- [ ] Run only the read-only verifier command approved for the operator; do not call POST/PUT/PATCH/DELETE endpoints.
- [ ] Save redacted JSON/Markdown evidence in `docs/` and link it from `docs/KANBAN_DELIVERABLE_INDEX.md`.
- [ ] Stop after 43/43 evidence and request the next Jeff/attorney decision before any adapter, workflow, saved-view, report, dashboard, or live-use reliance.

## Stop and rollback conditions

Stop immediately if any condition occurs:

- The 37/37 gate has not passed cleanly, or Jeff has not approved the exact six-field creation/verification scope.
- The operator is asked for credentials/MFA/browser login by a task that is only supposed to be documentation or no-mutation prep.
- HighLevel is not clearly in Whiteford Schell IP (`tm68WWMrcAa3TqQbEAMa`).
- The UI/API indicates the object/module is not Contact.
- A duplicate or near-duplicate field appears by label, bare key, generated key, or confusingly similar M&A/AI Patent wording.
- HighLevel generates a key other than the expected `contact.<bare_api_key>` value, including `contact.m_a_readiness_*`, missing `_scores`, missing `_map`, missing `_plan`, or any key that changes `60_day`.
- A field type differs from TEXT for `ma_readiness_timing` or LARGE_TEXT for the other five fields.
- Any workflow prompt, campaign/message/template prompt, saved-view/list audience prompt, import/export prompt, bulk action, contact selection, contact/opportunity/tag/task/note mutation, enrollment, send, schedule, publish, social/ad action, Clio/Supabase/env/public-page request, or live-test request appears.
- Real lead/prospect/client/contact data would be used to test the fields.
- Evidence cannot be captured without exposing tokens, secrets, client data, or confidential diagnostic content.

Rollback posture if a future approved operator discovers or creates an error:

1. Keep all workflows Draft/Off and do not run live tests or contact writes.
2. Preserve screenshots/API/terminal evidence of the erroneous label, key, type, object, duplicate, or response shape.
3. Do not delete/recreate unless the field is newly created, empty, HighLevel safely permits deletion, and Jeff separately approves that exact cleanup.
4. If deletion is unavailable, unsafe, or not separately approved, leave the field untouched and create an engineering mapping-remediation task before any live write or workflow reliance.
5. Rerun only approved read-only verification after any separately approved cleanup.

## Jeff decision box

```text
HOLD / DORMANT DEFAULT: Do not extend or run the six-field verifier yet.
Reason: the existing 37-field gate must pass first, then Jeff must separately approve exact six-field Contact custom-field creation and attorney/privacy review.
```

```text
APPROVE FUTURE VERIFIER EXTENSION PREP ONLY:
I approve preparing a local code change proposal or patch to let the read-only verifier optionally include the six post-37 Contact custom fields listed in docs/highlevel_six_field_post_37_verifier_extension_packet_2026-05-10.md. This approval does not authorize running the live verifier, opening HighLevel, creating/editing fields, using credentials, changing workflows, mutating contacts/opportunities/tags/tasks/notes, changing `/api/leads`, deploying, publishing, sending, scheduling, or using the fields in reports/dashboards/workflows. The extension must remain dormant unless the 37/37 gate passes, the six fields are separately approved and created, and Jeff approves the exact read-only verification run.
```

```text
APPROVE FUTURE POST-CREATION READ-ONLY 43/43 VERIFICATION:
I confirm the existing 37-field gate has passed, the six fields were manually created under a separately approved HighLevel UI packet, attorney/privacy review approved storing these diagnostic values, and an authorized operator may run only the read-only verifier command for the expected 43/43 result in Whiteford Schell IP (`tm68WWMrcAa3TqQbEAMa`). No workflow, contact, opportunity, tag, message, campaign, social, Clio, Supabase, env, public-page, adapter, or external action is approved.
```

## Final status

This packet is ready for Jeff/internal review as a no-mutation, post-37 verifier-extension planning artifact. The current recommended next action is HOLD until the 37-field gate passes and Jeff decides whether the six-field storage path should proceed at all.
