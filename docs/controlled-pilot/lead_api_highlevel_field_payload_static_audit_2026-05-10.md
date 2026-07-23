# Static audit: `/api/leads` HighLevel custom-field payload shape

Date: 2026-05-10
Task: `t_f1ec4089`
Scope: local/static audit only. No HighLevel API calls, no lead submissions, no contact/opportunity/tag/workflow mutations, no sends, and no public/client-facing action.

## Executive finding

`src/app/api/leads/route.ts` currently constructs HighLevel `contacts/upsert` payloads with `customFields` entries shaped as `{ key: "<bare_api_key>", field_value: ... }`.

The verified/proposed HighLevel Contact custom-field inventory uses generated HighLevel field keys shaped as `contact.<api_key>` and, for fields already present, stable HighLevel field ids. Therefore the app is using a bare-key shape, not `contact.*` field keys or ids. It is internally consistent with its own app API-key names, but it remains a compatibility risk if LeadConnector's `contacts/upsert` endpoint requires `fieldKey: "contact.<api_key>"`, `key: "contact.<api_key>"`, or `id: "<field_id>"` rather than `key: "<bare_api_key>"`.

Recommended next engineering step before any Jeff-approved live/contact QA: add a local-only adapter that maps app bare keys to `fieldKey: contact.<api_key>` (or ids where known) behind tests/no-token preview assertions, then run the existing no-token consent harness. Do not submit live test leads or use HighLevel credentials until Jeff approves the exact QA run.

## Evidence reviewed

- `src/app/api/leads/route.ts`, lines 309-381: builds `previewPayload.customFields` using `{ key: "...", field_value: ... }` bare keys and then sends the same payload to `https://services.leadconnectorhq.com/contacts/upsert` if credentials are present.
- `docs/highlevel_campaign_implementation_plan.md`, lines 35-58 and 204-208: original 18 custom-field table shows app/API keys, HighLevel `contact.*` field keys, ids for early fields, and flags the bare-key risk.
- `docs/highlevel_campaign_setup_verify.json`: confirms early custom fields exist with `fieldKey: contact.<api_key>` and ids.
- `docs/highlevel_guardrail_v2_field_manifest_readonly_check_2026-05-08.json`: later read-only evidence shows 6 of 37 guardrail-v2 fields present, all with `actualFieldKey: contact.<api_key>`, and 31 still missing as of that saved check.
- `docs/highlevel_guardrail_v2_missing_field_remediation_packet_2026-05-07.md`, lines 45-92: lists existing and missing expected fields, with the generated-key risk guidance.
- App callers reviewed: `QuickLeadForm`, `GameplanBuilder`, `PatentScorecard`, `TechGcLegalHealthChecklist`, and `FounderMaReadinessChecklist`. These callers send app-domain payload keys; they do not control HighLevel custom-field shape directly.

## Payload-shape verdict

| Layer | Current shape | Notes |
| --- | --- | --- |
| Browser/form callers | App JSON keys such as `campaignKey`, `contact`, `assessment`, `aiComplianceGameplan`, `patent`, `maReadiness`, `techLegalHealth` | Normal internal API shape; no HighLevel `customFields` array is sent by browsers. |
| `/api/leads` validation | Whitelisted compact schemas by app object | Good privacy/data-minimization posture; unrelated to HighLevel field-key shape. |
| `/api/leads` HighLevel payload | `customFields: [{ key: "campaign_key", field_value: ... }, ...]` | Bare app/API keys. |
| Verified HighLevel fields | `fieldKey: "contact.campaign_key"`, ids such as `Qz7tTt2gHbiIKEuOKf9Q` | Existing fields use `contact.*` field keys. |
| Current overall shape | Bare keys in code; `contact.*` in HighLevel inventory; ids available for only some fields | Mixed across system documentation/inventory, but code sends bare keys only. |

## Shared fields sent by every lane

These fields are added by `/api/leads` for every campaign when values are present. The code sends the bare key in the `key` property.

| App/API bare key in code | Current code shape | Expected HighLevel field key | Known HighLevel id/status from saved evidence | Source/purpose |
| --- | --- | --- | --- | --- |
| `campaign_key` | `{ key: "campaign_key" }` | `contact.campaign_key` | `Qz7tTt2gHbiIKEuOKf9Q` present in original verify | Campaign routing key. |
| `campaign_label` | `{ key: "campaign_label" }` | `contact.campaign_label` | `ktyUD9eDp9A3v5WVNzvu` present in original verify | Human-readable nurture label. |
| `authority_pillar` | `{ key: "authority_pillar" }` | `contact.authority_pillar` | `UQ78yAPlH4UAIZ8juHR0` present in original verify | Offer/authority segmentation. |
| `source_page` | `{ key: "source_page" }` | `contact.source_page` | `INEppd3YGJBDLfHerE9a` present in original verify | Route/source page. |
| `source_channel` | `{ key: "source_channel" }` | `contact.source_channel` | `qBbuCGIureBlrA5sHmRf` present in original verify | Usually `website`. |
| `youtube_topic` | `{ key: "youtube_topic" }` | `contact.youtube_topic` | `ZrgezIZJxwAryrX5vWcy` present in original verify | Optional YouTube attribution. |
| `lead_magnet` | `{ key: "lead_magnet" }` | `contact.lead_magnet` | `e3SJHNsUNdW67ouLWFYQ` present in original verify | Lead magnet name. |
| `consent_basis` | `{ key: "consent_basis" }` | `contact.consent_basis` | `TvCAwsNbVg94JrEBM3e0` present in guardrail-v2 evidence | Opt-in basis or `no_email_opt_in`. |
| `approval_status` | `{ key: "approval_status" }` | `contact.approval_status` | `PZQ4DD5Dy4qJG9pTsNM3` present in guardrail-v2 evidence | `pending` or `no-auto-send`. |
| `privacy_guardrail_version` | `{ key: "privacy_guardrail_version" }` | `contact.privacy_guardrail_version` | Missing in 2026-05-08 read-only check | Shared guardrail version. |
| `public_form_input_type` | `{ key: "public_form_input_type" }` | `contact.public_form_input_type` | Missing in 2026-05-08 read-only check | Categorical/non-confidential input marker. |
| `disclaimer_acknowledged` | `{ key: "disclaimer_acknowledged" }` | `contact.disclaimer_acknowledged` | Missing in 2026-05-08 read-only check | Disclaimer acceptance marker. |
| `report_requested` | `{ key: "report_requested" }` | `contact.report_requested` | Missing in 2026-05-08 read-only check | Separates report request from marketing opt-in. |
| `recommended_offer` | `{ key: "recommended_offer" }` | `contact.recommended_offer` | `edel6dKsWHAFFUlB2mBM` present in original verify | Default campaign offer. |
| `role` | `{ key: "role" }` | `contact.role` | `bDDyFlZKHlwIULA2OqgJ` present in original verify | Contact role/role category. |

## Lane mapping

### 1. AI Compliance Gameplan Builder

Caller: `src/components/gameplan-builder.tsx`, lines 267-295.
Campaign key: `ai-compliance`.
Default workflow trigger tag if opted in: `workflow:ai-compliance-readiness`.

| App input path | `/api/leads` custom-field bare key | Current code shape | Expected HighLevel field key | Known id/status |
| --- | --- | --- | --- | --- |
| `assessment.riskScore` | `ai_risk_score` | `{ key: "ai_risk_score" }` | `contact.ai_risk_score` | `9gjvKtASWn49eo5mLeuB` present in original verify |
| `assessment.readinessScore` | `ai_readiness_score` | `{ key: "ai_readiness_score" }` | `contact.ai_readiness_score` | `meQ6hnsgWOYZzBcMmm2E` present in original verify |
| `assessment.band.label` | `ai_score_band` | `{ key: "ai_score_band" }` | `contact.ai_score_band` | `kWP4zmf9VwL5andDQfEk` present in original verify |
| `assessment.band.cta` | `ai_recommended_offer` | `{ key: "ai_recommended_offer" }` | `contact.ai_recommended_offer` | `n356Iz93Y6U0ByWFFpGn` present in original verify |
| `selectedUseCases` | `ai_use_cases` | `{ key: "ai_use_cases" }` | `contact.ai_use_cases` | `UlFRPwpAbUzvKQZeN0HA` present in original verify; current GameplanBuilder does not send top-level `selectedUseCases` |
| `readinessChecks` | `ai_readiness_checks` | `{ key: "ai_readiness_checks" }` | `contact.ai_readiness_checks` | `TVTNLJnRkTMoWJiXIa6Q` present in original verify; current GameplanBuilder does not send top-level `readinessChecks` |
| `aiComplianceGameplan.maturityLevel` | `ai_compliance_maturity_level` | `{ key: "ai_compliance_maturity_level" }` | `contact.ai_compliance_maturity_level` | Missing in 2026-05-08 read-only check |
| `aiComplianceGameplan.categoryScores` | `ai_compliance_category_scores` | `{ key: "ai_compliance_category_scores" }` | `contact.ai_compliance_category_scores` | Missing in 2026-05-08 read-only check |
| `aiComplianceGameplan.topGaps` | `ai_compliance_top_gaps` | `{ key: "ai_compliance_top_gaps" }` | `contact.ai_compliance_top_gaps` | Missing in 2026-05-08 read-only check |
| `aiComplianceGameplan.recommendedNextStep ?? recommendedNextStep` | `ai_compliance_recommended_next_step` | `{ key: "ai_compliance_recommended_next_step" }` | `contact.ai_compliance_recommended_next_step` | Missing in 2026-05-08 read-only check |
| `aiComplianceGameplan.readinessHeatMap` | `ai_compliance_heat_map` | `{ key: "ai_compliance_heat_map" }` | `contact.ai_compliance_heat_map` | Missing in 2026-05-08 read-only check |
| `aiComplianceGameplan.tenDayFixes` | `ai_compliance_10_day_fixes` | `{ key: "ai_compliance_10_day_fixes" }` | `contact.ai_compliance_10_day_fixes` | Missing in 2026-05-08 read-only check |
| `aiComplianceGameplan.roadmap306090` | `ai_compliance_roadmap_30_60_90` | `{ key: "ai_compliance_roadmap_30_60_90" }` | `contact.ai_compliance_roadmap_30_60_90` | Missing in 2026-05-08 read-only check |
| `aiComplianceGameplan.reportVersion` | `ai_compliance_report_version` | `{ key: "ai_compliance_report_version" }` | `contact.ai_compliance_report_version` | Missing in 2026-05-08 read-only check |

AI Compliance note: there is no dedicated `ai_compliance_privacy_guardrail_version` field in the current code or approval packets. The app maps this lane to the shared `privacy_guardrail_version` plus `ai_compliance_report_version`.

### 2. AI Patent Strategy Scorecard

Caller: `src/components/patent-scorecard.tsx`, lines 80-96.
Campaign key: `ai-patent`.
Default workflow trigger tag if opted in: `workflow:ai-patent-strategy`.

| App input path | `/api/leads` custom-field bare key | Current code shape | Expected HighLevel field key | Known id/status |
| --- | --- | --- | --- | --- |
| `assessment.readinessScore` | `ai_readiness_score` | `{ key: "ai_readiness_score" }` | `contact.ai_readiness_score` | `meQ6hnsgWOYZzBcMmm2E` present in original verify |
| `assessment.band.label` | `ai_score_band` | `{ key: "ai_score_band" }` | `contact.ai_score_band` | `kWP4zmf9VwL5andDQfEk` present in original verify |
| `assessment.band.cta` | `ai_recommended_offer` | `{ key: "ai_recommended_offer" }` | `contact.ai_recommended_offer` | `n356Iz93Y6U0ByWFFpGn` present in original verify |
| `patent.score` | `ai_patent_score` | `{ key: "ai_patent_score" }` | `contact.ai_patent_score` | `L78KuFhyFafq5PSp5MjR` present in original and guardrail-v2 evidence |
| `patent.stage` | `ai_patent_stage` | `{ key: "ai_patent_stage" }` | `contact.ai_patent_stage` | `7pf3mgT5ttvFjBjEpg5m` present in original and guardrail-v2 evidence |
| `patent.band` | `ai_patent_score_band` | `{ key: "ai_patent_score_band" }` | `contact.ai_patent_score_band` | `xh6AfuK3kI9YCbkL3Wko` present in original and guardrail-v2 evidence |
| `patent.checks` | `ai_patent_checks` | `{ key: "ai_patent_checks" }` | `contact.ai_patent_checks` | `0mv2zSrrPiwTw3Eufuwk` present in original and guardrail-v2 evidence |
| `aiPatentDocumentationGapMap` | `ai_patent_gap_map` | `{ key: "ai_patent_gap_map" }` | Not in original 18-field setup table and not in 37-field guardrail-v2 expected list | Code sends this field, but no verified/proposed HighLevel field was found in reviewed evidence. Treat as an unmapped app field. |
| `aiPatentOwnershipGapMap` | `ai_patent_ownership_gap_map` | `{ key: "ai_patent_ownership_gap_map" }` | Not in original 18-field setup table and not in 37-field guardrail-v2 expected list | Code sends this field, but no verified/proposed HighLevel field was found in reviewed evidence. Treat as an unmapped app field. |
| `recommendedNextStep` | `ai_patent_recommended_next_step` | `{ key: "ai_patent_recommended_next_step" }` | `contact.ai_patent_recommended_next_step` | Missing in 2026-05-08 read-only check |
| `patent.reportVersion` | `ai_patent_report_version` | `{ key: "ai_patent_report_version" }` | `contact.ai_patent_report_version` | Missing in 2026-05-08 read-only check |
| `privacyGuardrailVersion` | `ai_patent_privacy_guardrail_version` | `{ key: "ai_patent_privacy_guardrail_version" }` | `contact.ai_patent_privacy_guardrail_version` | Missing in 2026-05-08 read-only check |

AI Patent gap: `ai_patent_gap_map` and `ai_patent_ownership_gap_map` are emitted by the app but are not in the reviewed HighLevel field manifests. Either create/verify these fields in a future approval packet or remove/remap them before relying on them in HighLevel.

### 3. Tech Company Legal Health Checklist

Caller: `src/components/tech-gc-legal-health-checklist.tsx`, lines 161-193.
Campaign key: `tech-gc`.
Default workflow trigger tag if opted in: `workflow:tech-gc-launchpad`.

| App input path | `/api/leads` custom-field bare key | Current code shape | Expected HighLevel field key | Known id/status |
| --- | --- | --- | --- | --- |
| `assessment.readinessScore` | `ai_readiness_score` | `{ key: "ai_readiness_score" }` | `contact.ai_readiness_score` | `meQ6hnsgWOYZzBcMmm2E` present in original verify |
| `assessment.band.label` | `ai_score_band` | `{ key: "ai_score_band" }` | `contact.ai_score_band` | `kWP4zmf9VwL5andDQfEk` present in original verify |
| `assessment.band.cta` | `ai_recommended_offer` | `{ key: "ai_recommended_offer" }` | `contact.ai_recommended_offer` | `n356Iz93Y6U0ByWFFpGn` present in original verify |
| `techLegalHealth.score` | `tech_legal_health_score` | `{ key: "tech_legal_health_score" }` | `contact.tech_legal_health_score` | Missing in 2026-05-08 read-only check |
| `techLegalHealth.band` | `tech_legal_health_band` | `{ key: "tech_legal_health_band" }` | `contact.tech_legal_health_band` | Missing in 2026-05-08 read-only check |
| `techLegalHealth.companyMoment` | `tech_legal_health_company_moment` | `{ key: "tech_legal_health_company_moment" }` | `contact.tech_legal_health_company_moment` | Missing in 2026-05-08 read-only check |
| `techLegalHealth.lowestCategory` | `tech_legal_health_lowest_category` | `{ key: "tech_legal_health_lowest_category" }` | `contact.tech_legal_health_lowest_category` | Missing in 2026-05-08 read-only check |
| `techLegalHealth.categoryScores` | `tech_legal_health_category_scores` | `{ key: "tech_legal_health_category_scores" }` | `contact.tech_legal_health_category_scores` | Missing in 2026-05-08 read-only check |
| `techLegalHealth.topActions` | `tech_legal_health_top_actions` | `{ key: "tech_legal_health_top_actions" }` | `contact.tech_legal_health_top_actions` | Missing in 2026-05-08 read-only check |
| `techLegalHealth.branchSignals` | `tech_legal_health_branch_signals` | `{ key: "tech_legal_health_branch_signals" }` | `contact.tech_legal_health_branch_signals` | Missing in 2026-05-08 read-only check |
| `techLegalHealth.answers` | `tech_legal_health_answers_json` | `{ key: "tech_legal_health_answers_json" }` | `contact.tech_legal_health_answers_json` | Missing in 2026-05-08 read-only check |
| `techLegalHealth.reportVersion` | `tech_legal_health_report_version` | `{ key: "tech_legal_health_report_version" }` | `contact.tech_legal_health_report_version` | Missing in 2026-05-08 read-only check |
| `privacyGuardrailVersion` | `tech_legal_health_privacy_guardrail_version` | `{ key: "tech_legal_health_privacy_guardrail_version" }` | `contact.tech_legal_health_privacy_guardrail_version` | Missing in 2026-05-08 read-only check |

### 4. Founder M&A Readiness Checklist

Caller: `src/components/founder-ma-readiness-checklist.tsx`, lines 89-116.
Campaign key: `ma-readiness`.
Default workflow trigger tag if opted in: `workflow:ma-readiness`.

| App input path | `/api/leads` custom-field bare key | Current code shape | Expected HighLevel field key | Known id/status |
| --- | --- | --- | --- | --- |
| `assessment.readinessScore` | `ai_readiness_score` | `{ key: "ai_readiness_score" }` | `contact.ai_readiness_score` | `meQ6hnsgWOYZzBcMmm2E` present in original verify |
| `assessment.band.label` | `ai_score_band` | `{ key: "ai_score_band" }` | `contact.ai_score_band` | `kWP4zmf9VwL5andDQfEk` present in original verify |
| `assessment.band.cta` | `ai_recommended_offer` | `{ key: "ai_recommended_offer" }` | `contact.ai_recommended_offer` | `n356Iz93Y6U0ByWFFpGn` present in original verify |
| `maReadiness.score` | `ma_readiness_score` | `{ key: "ma_readiness_score" }` | `contact.ma_readiness_score` | Missing in 2026-05-08 read-only check |
| `maReadiness.band` | `ma_readiness_band` | `{ key: "ma_readiness_band" }` | `contact.ma_readiness_band` | Missing in 2026-05-08 read-only check |
| `maReadiness.timing` | `ma_readiness_timing` | `{ key: "ma_readiness_timing" }` | Not in original 18-field setup table and not in 37-field guardrail-v2 expected list | Code sends this field, but no verified/proposed HighLevel field was found in reviewed evidence. Treat as an unmapped app field. |
| `maReadiness.categoryScores` | `ma_readiness_category_scores` | `{ key: "ma_readiness_category_scores" }` | Not in original 18-field setup table and not in 37-field guardrail-v2 expected list | Code sends this field, but no verified/proposed HighLevel field was found in reviewed evidence. Treat as an unmapped app field. |
| `maReadiness.buyerDiligenceRiskMap` | `ma_readiness_risk_map` | `{ key: "ma_readiness_risk_map" }` | Not in original 18-field setup table and not in 37-field guardrail-v2 expected list | Code sends this field, but no verified/proposed HighLevel field was found in reviewed evidence. Treat as an unmapped app field. |
| `maReadiness.sixtyDayCleanupPlan` | `ma_readiness_60_day_plan` | `{ key: "ma_readiness_60_day_plan" }` | Not in original 18-field setup table and not in 37-field guardrail-v2 expected list | Code sends this field, but no verified/proposed HighLevel field was found in reviewed evidence. Treat as an unmapped app field. |
| `maReadiness.answers` | `ma_readiness_answers_json` | `{ key: "ma_readiness_answers_json" }` | `contact.ma_readiness_answers_json` | Missing in 2026-05-08 read-only check |
| `maReadiness.reportVersion` | `ma_readiness_report_version` | `{ key: "ma_readiness_report_version" }` | `contact.ma_readiness_report_version` | Missing in 2026-05-08 read-only check |
| `privacyGuardrailVersion` | `ma_readiness_privacy_guardrail_version` | `{ key: "ma_readiness_privacy_guardrail_version" }` | `contact.ma_readiness_privacy_guardrail_version` | Missing in 2026-05-08 read-only check |
| `publicFormInputType` | `ma_readiness_input_type` | `{ key: "ma_readiness_input_type" }` | `contact.ma_readiness_input_type` | Missing in 2026-05-08 read-only check |

Founder M&A gap: `ma_readiness_timing`, `ma_readiness_category_scores`, `ma_readiness_risk_map`, and `ma_readiness_60_day_plan` are emitted by the app but are not in the reviewed HighLevel field manifests. Either add them to the HighLevel remediation manifest or remap them to approved fields before relying on them in HighLevel.

## Unmapped code-emitted fields found

The following fields are emitted by `src/app/api/leads/route.ts` but were not found in the original 18-field verified setup or the 37-field guardrail-v2 expected manifest:

| Bare key emitted by code | Lane | Current value source | Risk |
| --- | --- | --- | --- |
| `ai_patent_gap_map` | AI Patent | `aiPatentDocumentationGapMap` | Values may be ignored/rejected by HighLevel if field is absent. |
| `ai_patent_ownership_gap_map` | AI Patent | `aiPatentOwnershipGapMap` | Values may be ignored/rejected by HighLevel if field is absent. |
| `ma_readiness_timing` | Founder M&A | `maReadiness.timing` | Values may be ignored/rejected by HighLevel if field is absent. |
| `ma_readiness_category_scores` | Founder M&A | `maReadiness.categoryScores` | Values may be ignored/rejected by HighLevel if field is absent. |
| `ma_readiness_risk_map` | Founder M&A | `maReadiness.buyerDiligenceRiskMap` | Values may be ignored/rejected by HighLevel if field is absent. |
| `ma_readiness_60_day_plan` | Founder M&A | `maReadiness.sixtyDayCleanupPlan` | Values may be ignored/rejected by HighLevel if field is absent. |

## Proposed exact local-only patch pattern

Do not apply this patch in a live/contact-writing run. Apply only in a local engineering task with tests/no-token preview assertions, then get Jeff approval before any credentialed HighLevel QA.

Preferred shape if LeadConnector accepts `fieldKey`:

```ts
const highLevelFieldKeys: Record<string, string> = {
  campaign_key: "contact.campaign_key",
  campaign_label: "contact.campaign_label",
  authority_pillar: "contact.authority_pillar",
  source_page: "contact.source_page",
  source_channel: "contact.source_channel",
  youtube_topic: "contact.youtube_topic",
  lead_magnet: "contact.lead_magnet",
  consent_basis: "contact.consent_basis",
  approval_status: "contact.approval_status",
  privacy_guardrail_version: "contact.privacy_guardrail_version",
  public_form_input_type: "contact.public_form_input_type",
  disclaimer_acknowledged: "contact.disclaimer_acknowledged",
  report_requested: "contact.report_requested",
  recommended_offer: "contact.recommended_offer",
  ai_risk_score: "contact.ai_risk_score",
  ai_readiness_score: "contact.ai_readiness_score",
  ai_score_band: "contact.ai_score_band",
  ai_recommended_offer: "contact.ai_recommended_offer",
  ai_use_cases: "contact.ai_use_cases",
  ai_readiness_checks: "contact.ai_readiness_checks",
  ai_compliance_maturity_level: "contact.ai_compliance_maturity_level",
  ai_compliance_category_scores: "contact.ai_compliance_category_scores",
  ai_compliance_top_gaps: "contact.ai_compliance_top_gaps",
  ai_compliance_recommended_next_step: "contact.ai_compliance_recommended_next_step",
  ai_compliance_heat_map: "contact.ai_compliance_heat_map",
  ai_compliance_10_day_fixes: "contact.ai_compliance_10_day_fixes",
  ai_compliance_roadmap_30_60_90: "contact.ai_compliance_roadmap_30_60_90",
  ai_compliance_report_version: "contact.ai_compliance_report_version",
  ai_patent_score: "contact.ai_patent_score",
  ai_patent_stage: "contact.ai_patent_stage",
  ai_patent_score_band: "contact.ai_patent_score_band",
  ai_patent_checks: "contact.ai_patent_checks",
  ai_patent_recommended_next_step: "contact.ai_patent_recommended_next_step",
  ai_patent_report_version: "contact.ai_patent_report_version",
  ai_patent_privacy_guardrail_version: "contact.ai_patent_privacy_guardrail_version",
  ma_readiness_score: "contact.ma_readiness_score",
  ma_readiness_band: "contact.ma_readiness_band",
  ma_readiness_answers_json: "contact.ma_readiness_answers_json",
  ma_readiness_report_version: "contact.ma_readiness_report_version",
  ma_readiness_privacy_guardrail_version: "contact.ma_readiness_privacy_guardrail_version",
  ma_readiness_input_type: "contact.ma_readiness_input_type",
  tech_legal_health_score: "contact.tech_legal_health_score",
  tech_legal_health_band: "contact.tech_legal_health_band",
  tech_legal_health_company_moment: "contact.tech_legal_health_company_moment",
  tech_legal_health_lowest_category: "contact.tech_legal_health_lowest_category",
  tech_legal_health_category_scores: "contact.tech_legal_health_category_scores",
  tech_legal_health_top_actions: "contact.tech_legal_health_top_actions",
  tech_legal_health_branch_signals: "contact.tech_legal_health_branch_signals",
  tech_legal_health_answers_json: "contact.tech_legal_health_answers_json",
  tech_legal_health_report_version: "contact.tech_legal_health_report_version",
  tech_legal_health_privacy_guardrail_version: "contact.tech_legal_health_privacy_guardrail_version",
  role: "contact.role",
};

function ghlField(key: keyof typeof highLevelFieldKeys, field_value: unknown) {
  return { fieldKey: highLevelFieldKeys[key], field_value };
}
```

Then replace each `{ key: "...", field_value: value }` entry with `ghlField("...", value)` and keep the existing `.filter((field) => field.field_value !== undefined && field.field_value !== "")`.

If LeadConnector's upsert endpoint is confirmed to require `key` rather than `fieldKey`, use `key: highLevelFieldKeys[key]` instead of `fieldKey`. If it requires ids, add ids only for fields confirmed by read-only verification and do not send id-backed fields for missing/unverified fields.

Do not include the six unmapped emitted fields in the adapter until HighLevel fields are approved/verified or code is changed to stop emitting them.

## No-token/no-contact future QA plan

This plan is safe to run only after Jeff approves the local QA scope. It does not require HighLevel credentials and must not submit contacts.

1. Ensure `GHL_PRIVATE_INTEGRATION_TOKEN` and `GHL_LOCATION_ID` are unset in the local shell.
2. Run the existing app/test harness in preview mode only. Do not point to production and do not add credentials.
3. Submit synthetic `.invalid` or in-memory fixtures for all four lanes through route handlers or tests, not through live HighLevel:
   - AI Compliance opted-in and non-opted.
   - AI Patent opted-in and non-opted.
   - Tech GC opted-in and non-opted.
   - Founder M&A opted-in and non-opted.
4. Assert every preview response returns `mode: "preview"` and never attempts a HighLevel fetch.
5. Assert opted-in payloads include only the lane `workflow:*` trigger tag and `newsletter:ai`; non-opted payloads include no `workflow:*`, include `newsletter:not-consented`, set `approval_status = no-auto-send`, and return empty `emailSequence`.
6. Assert `customFields` shape is the selected internal shape (`fieldKey: contact.*` if patched, bare `key` if intentionally retained) for every mapped field.
7. Assert no `customFields` entry is emitted for unverified fields unless the corresponding HighLevel field is added to the manifest and read-only evidence.
8. Save evidence JSON/Markdown locally under `docs/controlled-pilot/evidence/YYYY-MM-DD-lead-api-field-shape/`.
9. Stop before any credentialed live test. Credentialed live QA requires a separate Jeff approval naming exact recipient/test record, channel, timing, suppression/conflicts status, and rollback.

## Open decisions for Jeff / next worker

1. Decide whether the engineering adapter should use `fieldKey: contact.*`, `key: contact.*`, or id-based fields after checking LeadConnector upsert docs or a sandbox-only semantics test.
2. Decide whether to add the six unmapped code-emitted fields to a future HighLevel field approval packet or remove/remap them from `/api/leads`.
3. Run only no-token preview QA first; do not perform live HighLevel upserts until Jeff approves the exact live QA scope.
