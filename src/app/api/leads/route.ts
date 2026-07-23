import { campaigns, getCampaign } from "@/lib/campaigns";
import {
  getMagnetHistoryEntry,
  getQuestionScoreMap,
  isMagnetSlug,
  magnetConfigs,
  outsideCounselPdfUrl,
  scoreAssessment,
  type AssessmentResult,
  type DownloadResult,
  type MagnetMode,
  type MagnetSlug,
} from "@/lib/magnets/finalization";

const approvedPrivacyGuardrailVersion = "lead-magnet-guardrail-v2";
const approvedPublicFormInputType = "categorical_non_confidential";
const interactiveLeadMagnetKeys = new Set(Object.keys(campaigns));
const shortTextMax = 160;
const longTextMax = 420;
const arrayMax = 12;
const scoreKeys = new Set(["score", "readinessScore", "riskScore"]);
const approvedPatentStages = new Set([
  "Idea / prototype",
  "MVP in market",
  "Fundraising or diligence",
  "Enterprise/customer rollout",
]);

const allowedObjectKeys = {
  contact: new Set(["name", "email", "company", "role", "roleCategory", "subscribe"]),
  assessment: new Set(["riskScore", "readinessScore", "band", "tags"]),
  assessmentBand: new Set(["label", "cta"]),
  aiComplianceGameplan: new Set([
    "maturityLevel",
    "categoryScores",
    "topGaps",
    "recommendedNextStep",
    "readinessHeatMap",
    "tenDayFixes",
    "roadmap306090",
    "selectedUseCases",
    "readinessChecks",
    "reportVersion",
  ]),
  patent: new Set(["score", "stage", "checks", "band", "reportVersion"]),
  maReadiness: new Set([
    "score",
    "band",
    "timing",
    "categoryScores",
    "buyerDiligenceRiskMap",
    "sixtyDayCleanupPlan",
    "answers",
    "reportVersion",
  ]),
  techLegalHealth: new Set([
    "score",
    "band",
    "companyMoment",
    "categoryScores",
    "lowestCategory",
    "topActions",
    "branchSignals",
    "answers",
    "reportVersion",
  ]),
};

type LeadPayload = {
  campaignKey?: string;
  sourcePage?: string;
  sourceChannel?: string;
  youtubeTopic?: string;
  contact?: {
    name?: string;
    email?: string;
    company?: string;
    role?: string;
    roleCategory?: string;
    subscribe?: boolean;
  };
  disclaimerAccepted?: boolean;
  reportRequested?: boolean;
  privacyGuardrailVersion?: string;
  publicFormInputType?: string;
  assessment?: {
    riskScore?: number;
    readinessScore?: number;
    band?: { label?: string; cta?: string };
    tags?: string[];
  };
  selectedUseCases?: string[];
  readinessChecks?: string[];
  aiComplianceGameplan?: {
    maturityLevel?: string;
    categoryScores?: unknown;
    topGaps?: unknown;
    recommendedNextStep?: string;
    readinessHeatMap?: unknown;
    tenDayFixes?: string[];
    roadmap306090?: string[];
    selectedUseCases?: string[];
    readinessChecks?: string[];
    reportVersion?: string;
  };
  patent?: {
    score?: number;
    stage?: string;
    checks?: string[];
    band?: string;
    reportVersion?: string;
  };
  aiPatentDocumentationGapMap?: unknown;
  aiPatentOwnershipGapMap?: string[];
  recommendedNextStep?: string;
  maReadiness?: {
    score?: number;
    band?: string;
    timing?: string;
    categoryScores?: unknown;
    buyerDiligenceRiskMap?: unknown;
    sixtyDayCleanupPlan?: string[];
    answers?: Record<string, number>;
    reportVersion?: string;
  };
  techLegalHealth?: {
    score?: number;
    band?: string;
    companyMoment?: string;
    categoryScores?: unknown;
    lowestCategory?: string;
    topActions?: string[];
    branchSignals?: string[];
    answers?: string[];
    reportVersion?: string;
  };
};

type FinalLeadPayload = {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  phone?: unknown;
  qualifying_status?: unknown;
  permission_acknowledged?: unknown;
  magnet_slug?: unknown;
  mode?: unknown;
  answers?: unknown;
};

type HighLevelPayload = {
  locationId: string | undefined;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  companyName: string | undefined;
  tags: string[];
  customFields: { key: string; field_value: unknown }[];
};

const finalMagnetTags: Record<MagnetSlug, string> = {
  "ai-risk-triage": "magnet-ai-risk-triage",
  "patent-moat-scorecard": "magnet-patent-moat-scorecard",
  "governance-plan": "magnet-governance-plan",
  "outside-counsel-playbook": "magnet-outside-counsel-playbook",
  "disclosure-self-audit": "magnet-disclosure-self-audit",
  "chain-of-title-audit": "magnet-chain-of-title-audit",
  "routing-matrix": "magnet-routing-matrix",
  "ip-data-room-checklist": "magnet-ip-data-room-checklist",
};

const patentMoatBookSlugs = new Set<MagnetSlug>([
  "disclosure-self-audit",
  "chain-of-title-audit",
  "routing-matrix",
  "ip-data-room-checklist",
]);

const approvedPhonePattern = /^[\d\s()+.\-]{7,25}$/;

const subScoreFieldKeys: Record<Exclude<MagnetSlug, "outside-counsel-playbook">, Record<string, string>> = {
  "ai-risk-triage": {
    data_rights: "risk_triage_data_rights_score",
    output_ownership: "risk_triage_output_ownership_score",
    contracts: "risk_triage_contracts_score",
    governance: "risk_triage_governance_score",
  },
  "patent-moat-scorecard": {
    invention_capture: "moat_invention_capture",
    allocation: "moat_allocation",
    fto: "moat_fto",
    claim_alignment: "moat_claim_alignment",
    exit_fit: "moat_exit_fit",
  },
  "governance-plan": {},
  "disclosure-self-audit": {
    public_disclosure: "disclosure_public_disclosure_score",
    on_sale: "disclosure_on_sale_score",
    filing: "disclosure_filing_score",
    process: "disclosure_process_score",
  },
  "chain-of-title-audit": {
    founders: "title_founders_score",
    contributors: "title_contributors_score",
    institutions: "title_institutions_score",
    records: "title_records_score",
  },
  "routing-matrix": {
    core: "routing_core_score",
    secrecy: "routing_secrecy_score",
    discipline: "routing_discipline_score",
  },
  "ip-data-room-checklist": {
    title: "dataroom_title_score",
    scope: "dataroom_scope_score",
    fto: "dataroom_fto_score",
    hygiene: "dataroom_hygiene_score",
    encumbrances: "dataroom_encumbrances_score",
  },
};

function splitName(name = "") {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  return {
    firstName: parts[0] ?? "",
    lastName: parts.slice(1).join(" "),
  };
}

function stringifyField(value: unknown) {
  if (value === undefined || value === null || value === "") return undefined;
  if (Array.isArray(value)) return value.join(" | ");
  if (typeof value === "object") return JSON.stringify(value);
  return value;
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function hasOnlyKeys(value: unknown, allowed: Set<string>) {
  if (!isPlainObject(value)) return false;
  return Object.keys(value).every((key) => allowed.has(key));
}

function isCompactString(value: unknown, maxLength = shortTextMax) {
  return typeof value === "string" && value.length <= maxLength && !/[\r\n<>]/.test(value);
}

function isScore(value: unknown) {
  return typeof value === "number" && Number.isInteger(value) && value >= 0 && value <= 100;
}

function isCompactStringArray(value: unknown, maxItems = arrayMax, maxLength = shortTextMax) {
  return (
    Array.isArray(value) &&
    value.length <= maxItems &&
    value.every((item) => isCompactString(item, maxLength))
  );
}

function isScoreRecord(value: unknown) {
  if (!isPlainObject(value)) return false;
  const entries = Object.entries(value);
  return entries.length <= arrayMax && entries.every(([key, score]) => isCompactString(key, 48) && isScore(score));
}

function validateCompactObject(value: unknown, allowedKeys: Set<string>, depth = 0): boolean {
  if (!isPlainObject(value) || !hasOnlyKeys(value, allowedKeys)) return false;
  return Object.entries(value).every(([key, item]) => validateCompactValue(item, key, depth + 1));
}

function validateCompactValue(value: unknown, key = "value", depth = 0): boolean {
  if (value === undefined || value === null) return true;
  if (typeof value === "number") return scoreKeys.has(key) ? isScore(value) : Number.isFinite(value) && value >= 0 && value <= 2;
  if (typeof value === "boolean") return true;
  if (typeof value === "string") return isCompactString(value, longTextMax);
  if (Array.isArray(value)) {
    return value.length <= arrayMax && value.every((item) => validateCompactValue(item, key, depth + 1));
  }
  if (isPlainObject(value)) {
    if (depth > 2 || Object.keys(value).length > arrayMax) return false;
    return Object.entries(value).every(([nestedKey, nestedValue]) =>
      isCompactString(nestedKey, 48) && validateCompactValue(nestedValue, nestedKey, depth + 1),
    );
  }
  return false;
}

function validateLeadPayload(payload: LeadPayload, campaignKey: string) {
  if (!payload.contact || !hasOnlyKeys(payload.contact, allowedObjectKeys.contact)) {
    return "Payload failed validation: contact fields must use the approved compact schema.";
  }

  for (const value of [
    payload.sourcePage,
    payload.sourceChannel,
    payload.youtubeTopic,
    payload.publicFormInputType,
    payload.privacyGuardrailVersion,
    payload.recommendedNextStep,
    payload.contact.name,
    payload.contact.email,
    payload.contact.company,
    payload.contact.role,
    payload.contact.roleCategory,
  ]) {
    if (value !== undefined && !isCompactString(value, longTextMax)) {
      return "Payload failed validation: string fields must be compact and non-HTML.";
    }
  }

  if (payload.reportRequested === true && interactiveLeadMagnetKeys.has(campaignKey)) {
    if (payload.disclaimerAccepted !== true) {
      return "Disclaimer acceptance is required before requesting an interactive lead-magnet report.";
    }
    if (payload.privacyGuardrailVersion !== approvedPrivacyGuardrailVersion) {
      return "The approved privacy guardrail version is required before requesting an interactive lead-magnet report.";
    }
    if (payload.publicFormInputType !== undefined && payload.publicFormInputType !== approvedPublicFormInputType) {
      return "Payload failed validation: public form input type must match the approved categorical schema.";
    }
  }

  if (payload.assessment !== undefined) {
    if (!isPlainObject(payload.assessment) || !hasOnlyKeys(payload.assessment, allowedObjectKeys.assessment)) {
      return "Payload failed validation: assessment must use the approved compact schema.";
    }
    if (payload.assessment.riskScore !== undefined && !isScore(payload.assessment.riskScore)) {
      return "Payload failed validation: assessment risk score must be a 0-100 integer.";
    }
    if (payload.assessment.readinessScore !== undefined && !isScore(payload.assessment.readinessScore)) {
      return "Payload failed validation: assessment readiness score must be a 0-100 integer.";
    }
    if (payload.assessment.band !== undefined && !validateCompactObject(payload.assessment.band, allowedObjectKeys.assessmentBand)) {
      return "Payload failed validation: assessment band must use approved keys.";
    }
  }

  if (payload.selectedUseCases !== undefined && !isCompactStringArray(payload.selectedUseCases)) return "Payload failed validation: selected use cases exceed approved caps.";
  if (payload.readinessChecks !== undefined && !isCompactStringArray(payload.readinessChecks)) return "Payload failed validation: readiness checks exceed approved caps.";
  if (payload.aiPatentOwnershipGapMap !== undefined && !isCompactStringArray(payload.aiPatentOwnershipGapMap)) return "Payload failed validation: ownership gap map exceeds approved caps.";

  if (payload.aiComplianceGameplan !== undefined && !validateCompactObject(payload.aiComplianceGameplan, allowedObjectKeys.aiComplianceGameplan)) {
    return "Payload failed validation: AI compliance gameplan must use the approved compact schema.";
  }
  if (payload.patent !== undefined && !validateCompactObject(payload.patent, allowedObjectKeys.patent)) {
    return "Payload failed validation: AI patent payload must use the approved compact schema.";
  }
  if (payload.patent?.stage !== undefined && !approvedPatentStages.has(payload.patent.stage)) {
    return "Payload failed validation: AI patent stage must use an approved categorical value.";
  }
  if (payload.maReadiness !== undefined && !validateCompactObject(payload.maReadiness, allowedObjectKeys.maReadiness)) {
    return "Payload failed validation: M&A readiness payload must use the approved compact schema.";
  }
  if (payload.techLegalHealth !== undefined && !validateCompactObject(payload.techLegalHealth, allowedObjectKeys.techLegalHealth)) {
    return "Payload failed validation: tech legal health payload must use the approved compact schema.";
  }

  if (payload.maReadiness?.answers !== undefined && !isScoreRecord(payload.maReadiness.answers)) {
    return "Payload failed validation: M&A answers must be compact numeric categories.";
  }
  if (payload.maReadiness?.sixtyDayCleanupPlan !== undefined && !isCompactStringArray(payload.maReadiness.sixtyDayCleanupPlan, arrayMax, 220)) {
    return "Payload failed validation: M&A cleanup plan must be compact categorical text.";
  }

  return null;
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254;
}

function isAnswerRecord(value: unknown): value is Record<string, number> {
  return (
    isPlainObject(value) &&
    Object.entries(value).every(
      ([key, score]) => /^q\d+$/.test(key) && typeof score === "number" && Number.isInteger(score) && score >= 0 && score <= 3,
    )
  );
}

function validateFinalPayload(payload: FinalLeadPayload) {
  const magnetSlug = payload.magnet_slug;

  if (!isMagnetSlug(magnetSlug)) {
    return { error: "A valid magnet_slug is required." };
  }

  const config = magnetConfigs[magnetSlug];
  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  const email = typeof payload.email === "string" ? payload.email.trim().toLowerCase() : "";
  const company = typeof payload.company === "string" ? payload.company.trim() : "";
  const qualifyingStatus =
    typeof payload.qualifying_status === "string" ? payload.qualifying_status.trim() : "";

  for (const value of [name, email, company, qualifyingStatus]) {
    if (!isCompactString(value, longTextMax)) {
      return { error: "Submission fields must be compact, non-HTML strings." };
    }
  }

  if (!name || !email || !company || !qualifyingStatus) {
    return { error: "Name, email, company, and qualifying_status are required." };
  }

  if (!isEmail(email)) {
    return { error: "A valid email is required." };
  }

  if (!config.statusOptions.includes(qualifyingStatus)) {
    return { error: "The qualifying_status value is not approved for this magnet." };
  }

  if (payload.permission_acknowledged !== true) {
    return { error: "Permission acknowledgment is required." };
  }

  let phone: string | undefined;
  if ("requirePhone" in config && config.requirePhone) {
    const phoneValue = typeof payload.phone === "string" ? payload.phone.trim() : "";
    if (!phoneValue || !approvedPhonePattern.test(phoneValue)) {
      return { error: "A valid phone number is required for this tool." };
    }
    phone = phoneValue;
  }

  if (config.kind === "download") {
    if (payload.answers !== undefined || payload.mode !== undefined) {
      return { error: "The outside counsel playbook does not accept assessment answers." };
    }
    return { config, name, email, company, qualifyingStatus };
  }

  if (!isAnswerRecord(payload.answers)) {
    return { error: "Assessment answers are required and must be categorical numeric values." };
  }

  const expectedQuestionIds = new Set<string>(config.questions.map((question) => question.id));
  const answerKeys = Object.keys(payload.answers);
  if (
    answerKeys.length !== expectedQuestionIds.size ||
    answerKeys.some((key) => !expectedQuestionIds.has(key))
  ) {
    return { error: "Assessment answers must include exactly the approved question set." };
  }

  const mode: MagnetMode | undefined =
    config.slug === "patent-moat-scorecard"
      ? payload.mode === "investor"
        ? "investor"
        : "founder"
      : undefined;

  return { config, name, email, company, phone, qualifyingStatus, answers: payload.answers, mode };
}

function finalCustomFields({
  result,
  completedAt,
  qualifyingStatus,
  answers,
}: {
  result: AssessmentResult | DownloadResult;
  completedAt: string;
  qualifyingStatus: string;
  answers?: Record<string, number>;
}) {
  const assessment = result.magnet_slug === "outside-counsel-playbook" ? null : result;
  const fields: { key: string; field_value: unknown }[] = [
    { key: "last_magnet_slug", field_value: result.magnet_slug },
    { key: "last_magnet_score", field_value: assessment?.score ?? null },
    { key: "last_magnet_score_max", field_value: assessment?.score_max ?? null },
    { key: "last_magnet_tier", field_value: assessment?.tier.label ?? null },
    { key: "last_magnet_completed_at", field_value: completedAt },
    { key: "magnet_history", field_value: getMagnetHistoryEntry(result) },
    { key: "qualifying_status", field_value: qualifyingStatus },
  ];

  if (result.magnet_slug === "outside-counsel-playbook") {
    fields.push(
      { key: "last_magnet_pdf_url", field_value: outsideCounselPdfUrl },
      { key: "outside_counsel_playbook_pdf_url", field_value: outsideCounselPdfUrl },
    );
    return fields;
  }

  const subScoreFields = subScoreFieldKeys[result.magnet_slug];
  for (const [subScoreKey, fieldKey] of Object.entries(subScoreFields)) {
    fields.push({ key: fieldKey, field_value: result.sub_scores[subScoreKey] });
  }

  if (answers) {
    const questionScores = getQuestionScoreMap(result.magnet_slug, answers);
    for (const [fieldKey, score] of Object.entries(questionScores)) {
      if (fieldKey.startsWith("gov_")) {
        fields.push({ key: fieldKey, field_value: score });
      }
    }
  }

  fields.push(
    { key: "last_magnet_actions", field_value: result.actions.join(" | ") },
    { key: "last_magnet_mode", field_value: result.mode ?? null },
  );

  return fields;
}

async function upsertHighLevel(payload: HighLevelPayload) {
  const token = process.env.GHL_PRIVATE_INTEGRATION_TOKEN;
  const locationId = process.env.GHL_LOCATION_ID;
  const previewPayload = { ...payload, locationId };

  if (!token || !locationId) {
    return {
      mode: "preview" as const,
      payload: previewPayload,
    };
  }

  try {
    const response = await fetch("https://services.leadconnectorhq.com/contacts/upsert", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Version: "2021-07-28",
      },
      body: JSON.stringify(previewPayload),
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error("HighLevel upsert failed", {
        status: response.status,
        detail,
        email: payload.email,
      });
      return { mode: "failed" as const, detail };
    }

    return { mode: "live" as const, result: await response.json() };
  } catch (error) {
    const detail = error instanceof Error ? error.message : "Unknown HighLevel error";
    console.error("HighLevel upsert failed", { detail, email: payload.email });
    return { mode: "failed" as const, detail };
  }
}

async function handleFinalMagnetSubmission(payload: FinalLeadPayload) {
  const validation = validateFinalPayload(payload);

  if ("error" in validation) {
    return Response.json({ error: validation.error }, { status: 400 });
  }

  const completedAt = new Date().toISOString();
  const { config, name, email, company, qualifyingStatus } = validation;
  const { firstName, lastName } = splitName(name);
  const answers = "answers" in validation ? validation.answers : undefined;
  const phone = "phone" in validation ? validation.phone : undefined;
  let result: AssessmentResult | DownloadResult;
  try {
    result =
      config.kind === "download" || !answers
        ? ({ ok: true, magnet_slug: "outside-counsel-playbook" } satisfies DownloadResult)
        : scoreAssessment(config.slug, answers, validation.mode);
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Assessment scoring failed." },
      { status: 400 },
    );
  }
  const tags = [
    "whiteford-mountain-west",
    finalMagnetTags[config.slug],
    ...(patentMoatBookSlugs.has(config.slug) ? ["patent-moat-book"] : []),
    ...(result.magnet_slug === "outside-counsel-playbook" ? [] : [result.tier.tag]),
    ...(result.magnet_slug === "patent-moat-scorecard" ? [`moat-mode-${result.mode ?? "founder"}`] : []),
    "newsletter:ai",
  ];
  const highLevelPayload: HighLevelPayload = {
    locationId: process.env.GHL_LOCATION_ID,
    firstName,
    lastName,
    email,
    ...(phone ? { phone } : {}),
    companyName: company,
    tags,
    customFields: finalCustomFields({
      result,
      completedAt,
      qualifyingStatus,
      answers,
    }).filter((field) => field.field_value !== undefined && field.field_value !== ""),
  };
  const highLevel = await upsertHighLevel(highLevelPayload);

  return Response.json({
    ...result,
    crm_mode: highLevel.mode,
    highlevel: highLevel.mode,
    ...(highLevel.mode === "preview" ? { payload: highLevel.payload } : {}),
  });
}

export async function POST(request: Request) {
  const payload = (await request.json()) as LeadPayload & FinalLeadPayload;

  if (payload.magnet_slug !== undefined) {
    return handleFinalMagnetSubmission(payload);
  }

  const email = payload.contact?.email?.trim();

  if (!email) {
    return Response.json({ error: "Email is required" }, { status: 400 });
  }

  const token = process.env.GHL_PRIVATE_INTEGRATION_TOKEN;
  const locationId = process.env.GHL_LOCATION_ID;
  const campaignKey =
    payload.campaignKey && payload.campaignKey in campaigns
      ? payload.campaignKey
      : "ai-compliance";
  const validationError = validateLeadPayload(payload, campaignKey);

  if (validationError) {
    return Response.json({ error: validationError }, { status: 400 });
  }

  const campaign = getCampaign(campaignKey);
  const { firstName, lastName } = splitName(payload.contact?.name);
  const hasEmailOptIn = payload.contact?.subscribe === true;
  const tags = Array.from(
    new Set(
      [
        "whiteford-mountain-west",
        ...campaign.tags,
        hasEmailOptIn ? campaign.triggerTag : undefined,
        hasEmailOptIn ? "newsletter:ai" : "newsletter:not-consented",
      ].filter(Boolean),
    ),
  );

  const previewPayload = {
    locationId,
    firstName,
    lastName,
    email,
    companyName: payload.contact?.company,
    tags,
    customFields: [
      { key: "campaign_key", field_value: campaignKey },
      { key: "campaign_label", field_value: campaign.label },
      { key: "authority_pillar", field_value: campaign.authorityPillar },
      { key: "source_page", field_value: payload.sourcePage },
      { key: "source_channel", field_value: payload.sourceChannel },
      { key: "youtube_topic", field_value: payload.youtubeTopic },
      { key: "lead_magnet", field_value: campaign.leadMagnet },
      {
        key: "consent_basis",
        field_value: hasEmailOptIn
          ? `lead_magnet_email_opt_in:${campaignKey}`
          : "no_email_opt_in",
      },
      { key: "approval_status", field_value: hasEmailOptIn ? "pending" : "no-auto-send" },
      { key: "privacy_guardrail_version", field_value: payload.privacyGuardrailVersion },
      { key: "public_form_input_type", field_value: payload.publicFormInputType },
      { key: "disclaimer_acknowledged", field_value: payload.disclaimerAccepted === true ? "true" : undefined },
      { key: "report_requested", field_value: payload.reportRequested === true ? "true" : undefined },
      { key: "recommended_offer", field_value: campaign.recommendedOffer },
      { key: "ai_risk_score", field_value: payload.assessment?.riskScore },
      { key: "ai_readiness_score", field_value: payload.assessment?.readinessScore },
      { key: "ai_score_band", field_value: payload.assessment?.band?.label },
      { key: "ai_recommended_offer", field_value: payload.assessment?.band?.cta },
      { key: "ai_use_cases", field_value: payload.selectedUseCases?.join(",") },
      { key: "ai_readiness_checks", field_value: payload.readinessChecks?.join(",") },
      { key: "ai_compliance_maturity_level", field_value: payload.aiComplianceGameplan?.maturityLevel },
      { key: "ai_compliance_category_scores", field_value: stringifyField(payload.aiComplianceGameplan?.categoryScores) },
      { key: "ai_compliance_top_gaps", field_value: stringifyField(payload.aiComplianceGameplan?.topGaps) },
      { key: "ai_compliance_recommended_next_step", field_value: payload.aiComplianceGameplan?.recommendedNextStep ?? payload.recommendedNextStep },
      { key: "ai_compliance_heat_map", field_value: stringifyField(payload.aiComplianceGameplan?.readinessHeatMap) },
      { key: "ai_compliance_10_day_fixes", field_value: stringifyField(payload.aiComplianceGameplan?.tenDayFixes) },
      { key: "ai_compliance_roadmap_30_60_90", field_value: stringifyField(payload.aiComplianceGameplan?.roadmap306090) },
      { key: "ai_compliance_report_version", field_value: payload.aiComplianceGameplan?.reportVersion },
      { key: "ai_patent_score", field_value: payload.patent?.score },
      { key: "ai_patent_stage", field_value: payload.patent?.stage },
      { key: "ai_patent_score_band", field_value: payload.patent?.band },
      { key: "ai_patent_checks", field_value: payload.patent?.checks?.join(",") },
      { key: "ai_patent_gap_map", field_value: stringifyField(payload.aiPatentDocumentationGapMap) },
      { key: "ai_patent_ownership_gap_map", field_value: stringifyField(payload.aiPatentOwnershipGapMap) },
      { key: "ai_patent_recommended_next_step", field_value: payload.recommendedNextStep },
      { key: "ai_patent_report_version", field_value: payload.patent?.reportVersion },
      { key: "ai_patent_privacy_guardrail_version", field_value: payload.privacyGuardrailVersion },
      { key: "ma_readiness_score", field_value: payload.maReadiness?.score },
      { key: "ma_readiness_band", field_value: payload.maReadiness?.band },
      { key: "ma_readiness_timing", field_value: payload.maReadiness?.timing },
      { key: "ma_readiness_category_scores", field_value: stringifyField(payload.maReadiness?.categoryScores) },
      { key: "ma_readiness_risk_map", field_value: stringifyField(payload.maReadiness?.buyerDiligenceRiskMap) },
      { key: "ma_readiness_60_day_plan", field_value: stringifyField(payload.maReadiness?.sixtyDayCleanupPlan) },
      { key: "ma_readiness_answers_json", field_value: stringifyField(payload.maReadiness?.answers) },
      { key: "ma_readiness_report_version", field_value: payload.maReadiness?.reportVersion },
      { key: "ma_readiness_privacy_guardrail_version", field_value: payload.privacyGuardrailVersion },
      { key: "ma_readiness_input_type", field_value: payload.publicFormInputType },
      { key: "tech_legal_health_score", field_value: payload.techLegalHealth?.score },
      { key: "tech_legal_health_band", field_value: payload.techLegalHealth?.band },
      { key: "tech_legal_health_company_moment", field_value: payload.techLegalHealth?.companyMoment },
      { key: "tech_legal_health_lowest_category", field_value: payload.techLegalHealth?.lowestCategory },
      { key: "tech_legal_health_category_scores", field_value: stringifyField(payload.techLegalHealth?.categoryScores) },
      { key: "tech_legal_health_top_actions", field_value: stringifyField(payload.techLegalHealth?.topActions) },
      { key: "tech_legal_health_branch_signals", field_value: stringifyField(payload.techLegalHealth?.branchSignals) },
      { key: "tech_legal_health_answers_json", field_value: stringifyField(payload.techLegalHealth?.answers) },
      { key: "tech_legal_health_report_version", field_value: payload.techLegalHealth?.reportVersion },
      { key: "tech_legal_health_privacy_guardrail_version", field_value: payload.privacyGuardrailVersion },
      { key: "role", field_value: payload.contact?.role },
    ].filter((field) => field.field_value !== undefined && field.field_value !== ""),
  };

  const campaignRouting = {
    triggerTag: hasEmailOptIn ? campaign.triggerTag : null,
    optInRequired: true,
    consentBasis: hasEmailOptIn
      ? `lead_magnet_email_opt_in:${campaignKey}`
      : "no_email_opt_in",
    workflowPattern:
      "Only add the workflow trigger tag when the contact affirmatively opts into the lead-magnet email path. Non-consented leads get lead-magnet and interest tags only, plus newsletter:not-consented and Approval Status = no-auto-send.",
    emailSequence: hasEmailOptIn ? campaign.emails : [],
  };

  if (!token || !locationId) {
    return Response.json({
      mode: "preview",
      message:
        "Lead captured in preview mode. Set GHL_PRIVATE_INTEGRATION_TOKEN and GHL_LOCATION_ID to enable HighLevel upsert.",
      campaignRouting,
      payload: previewPayload,
    });
  }

  const response = await fetch("https://services.leadconnectorhq.com/contacts/upsert", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Version: "2021-07-28",
    },
    body: JSON.stringify(previewPayload),
  });

  if (!response.ok) {
    const detail = await response.text();
    return Response.json(
      { error: "HighLevel upsert failed", detail },
      { status: 502 },
    );
  }

  return Response.json({
    mode: "live",
    campaignRouting,
    result: await response.json(),
  });
}
