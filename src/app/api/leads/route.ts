import { campaigns, getCampaign } from "@/lib/campaigns";
import {
  buildInvestorConfirmationUrl,
  readInvestorConfirmationToken,
  type InvestorConfirmationContact,
} from "@/lib/investor-outreach/confirmation-token";
import { sendInvestorOutreachConfirmationEmail } from "@/lib/email/investor-outreach-confirmation";
import { isSearchMagnetRoute, searchMagnetConfigs } from "@/lib/search-magnets/configs";
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
import { generateAssessmentReportPdf } from "@/lib/magnets/report-pdf";

const approvedPrivacyGuardrailVersion = "lead-magnet-guardrail-v2";
const approvedPublicFormInputType = "categorical_non_confidential";
const interactiveLeadMagnetKeys = new Set(Object.keys(campaigns));
const investorOutreachCampaignKey = "investor-outreach";
const investorOutreachConfirmedTag = "investor-outreach:confirmed";
const searchMagnetEvents = new Set(["lead_captured", "completed"]);
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
    "aiUseRegisterSnapshot",
    "reportVersion",
  ]),
  investorOutreach: new Set([
    "phase",
    "confirmationToken",
    "emailConfirmed",
    "targetRound",
    "investorCategories",
    "investorRegions",
    "currentStage",
    "introSources",
    "dataRoomStatus",
    "portfolioResearchQueue",
    "portfolioMatches",
    "portfolioEnrichmentVersion",
    "kanbanStageCounts",
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
    aiUseRegisterSnapshot?: {
      inventory?: string;
      ownerMap?: string;
      exposureCategory?: string;
      vendorTerms?: string;
      humanReview?: string;
      score?: number;
      nextStep?: string;
      reportVersion?: string;
    };
    reportVersion?: string;
  };
  investorOutreach?: {
    phase?: "contact" | "confirm" | "plan";
    confirmationToken?: string;
    emailConfirmed?: boolean;
    targetRound?: string;
    investorCategories?: string[];
    investorRegions?: string[];
    currentStage?: string;
    introSources?: string[];
    dataRoomStatus?: string;
    portfolioResearchQueue?: unknown[];
    portfolioMatches?: unknown[];
    portfolioEnrichmentVersion?: string;
    kanbanStageCounts?: Record<string, number>;
    reportVersion?: string;
  };
  searchMagnet?: {
    slug?: string;
    magnetId?: string;
    event?: "lead_captured" | "completed";
    tags?: string[];
    score?: number;
    scoreMax?: number;
    scorePercent?: number;
    tier?: string;
    dimensions?: Record<string, unknown>;
    prioritizedActions?: string[];
    answers?: Record<string, unknown>;
    resultVersion?: string;
  };
};

type FinalLeadPayload = {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  contact_title?: unknown;
  qualifying_status?: unknown;
  permission_acknowledged?: unknown;
  subscribe?: unknown;
  magnet_slug?: unknown;
  mode?: unknown;
  answers?: unknown;
};

type HighLevelPayload = {
  locationId: string | undefined;
  firstName: string;
  lastName: string;
  email: string;
  companyName: string | undefined;
  tags: string[];
  customFields: { key: string; field_value: unknown }[];
};

const finalMagnetTags: Record<MagnetSlug, string> = {
  "ai-risk-triage": "magnet-ai-risk-triage",
  "patent-moat-scorecard": "magnet-patent-moat-scorecard",
  "governance-plan": "magnet-governance-plan",
  "outside-counsel-playbook": "magnet-outside-counsel-playbook",
};

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

function stringifyJsonField(value: unknown) {
  if (value === undefined || value === null || value === "") return undefined;
  return JSON.stringify(value);
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

function isCompactNumberRecord(value: unknown, maxItems = 24, maxValue = 24) {
  if (!isPlainObject(value)) return false;
  const entries = Object.entries(value);
  return (
    entries.length <= maxItems &&
    entries.every(
      ([key, item]) =>
        isCompactString(key, 48) &&
        typeof item === "number" &&
        Number.isInteger(item) &&
        item >= 0 &&
        item <= maxValue,
    )
  );
}

function isSearchMagnetDimensionPayload(value: unknown) {
  if (!isPlainObject(value)) return false;
  const entries = Object.entries(value);
  return (
    entries.length <= 8 &&
    entries.every(([key, item]) => {
      if (!isCompactString(key, 48) || !isPlainObject(item)) return false;
      const label = item.label;
      const raw = item.raw;
      const max = item.max;
      const pct = item.pct;
      return (
        (label === undefined || isCompactString(label, shortTextMax)) &&
        typeof raw === "number" &&
        Number.isFinite(raw) &&
        raw >= 0 &&
        typeof max === "number" &&
        Number.isFinite(max) &&
        max >= 0 &&
        typeof pct === "number" &&
        Number.isInteger(pct) &&
        pct >= 0 &&
        pct <= 100
      );
    })
  );
}

function validateSearchMagnetPayload(payload: LeadPayload) {
  if (!payload.searchMagnet) return null;
  const magnet = payload.searchMagnet;

  if (!magnet.slug || !isSearchMagnetRoute(magnet.slug)) {
    return "Payload failed validation: search magnet route is not approved.";
  }
  if (!magnet.event || !searchMagnetEvents.has(magnet.event)) {
    return "Payload failed validation: search magnet event is not approved.";
  }
  if (!payload.contact || !hasOnlyKeys(payload.contact, allowedObjectKeys.contact)) {
    return "Payload failed validation: contact fields must use the approved compact schema.";
  }
  if (!payload.contact.name || !payload.contact.email || !payload.contact.company || !payload.contact.role) {
    return "Name, email, company, and title are required for search magnet capture.";
  }
  if (!isEmail(payload.contact.email)) {
    return "A valid email is required for search magnet capture.";
  }
  if (payload.contact.subscribe !== true) {
    return "Consent is required before search magnet lead capture.";
  }

  for (const value of [
    payload.sourcePage,
    payload.sourceChannel,
    payload.contact.name,
    payload.contact.email,
    payload.contact.company,
    payload.contact.role,
    magnet.magnetId,
    magnet.tier,
    magnet.resultVersion,
  ]) {
    if (value !== undefined && !isCompactString(value, longTextMax)) {
      return "Payload failed validation: search magnet string fields must be compact and non-HTML.";
    }
  }

  if (magnet.tags !== undefined && !isCompactStringArray(magnet.tags, 12, 80)) {
    return "Payload failed validation: search magnet tags must be compact strings.";
  }

  if (magnet.event === "completed") {
    if (
      typeof magnet.score !== "number" ||
      typeof magnet.scoreMax !== "number" ||
      typeof magnet.scorePercent !== "number" ||
      !Number.isFinite(magnet.score) ||
      !Number.isFinite(magnet.scoreMax) ||
      !Number.isInteger(magnet.scorePercent) ||
      magnet.score < 0 ||
      magnet.scoreMax < 0 ||
      magnet.scorePercent < 0 ||
      magnet.scorePercent > 100 ||
      !magnet.tier
    ) {
      return "Payload failed validation: completed search magnet payloads require score, scoreMax, scorePercent, and tier.";
    }
    if (!isSearchMagnetDimensionPayload(magnet.dimensions)) {
      return "Payload failed validation: search magnet dimension scores must use the approved compact schema.";
    }
    if (!isCompactStringArray(magnet.prioritizedActions, 3, 420)) {
      return "Payload failed validation: search magnet actions must be compact strings.";
    }
    if (magnet.answers !== undefined && !isCompactNumberRecord(magnet.answers)) {
      return "Payload failed validation: search magnet answers must be compact numeric categories.";
    }
  }

  return null;
}

function validateCompactObject(value: unknown, allowedKeys: Set<string>, depth = 0): boolean {
  if (!isPlainObject(value) || !hasOnlyKeys(value, allowedKeys)) return false;
  return Object.entries(value).every(([key, item]) => validateCompactValue(item, key, depth + 1));
}

function validateCompactValue(value: unknown, key = "value", depth = 0): boolean {
  if (value === undefined || value === null) return true;
  if (key === "kanbanStageCounts") return isScoreRecord(value);
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

function isInvestorOutreachContactPhase(payload: LeadPayload, campaignKey: string) {
  return campaignKey === investorOutreachCampaignKey && payload.investorOutreach?.phase === "contact";
}

function isInvestorOutreachConfirmPhase(payload: LeadPayload, campaignKey: string) {
  return campaignKey === investorOutreachCampaignKey && payload.investorOutreach?.phase === "confirm";
}

function isInvestorOutreachPlanPhase(payload: LeadPayload, campaignKey: string) {
  return campaignKey === investorOutreachCampaignKey && payload.investorOutreach?.phase === "plan";
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

  if (isInvestorOutreachContactPhase(payload, campaignKey)) {
    if (!payload.contact.name || !payload.contact.email || !payload.contact.company || !payload.contact.role) {
      return "Name, email, company, and title are required for investor outreach confirmation.";
    }
    if (!isEmail(payload.contact.email)) {
      return "A valid email is required for investor outreach confirmation.";
    }
  }

  if (isInvestorOutreachPlanPhase(payload, campaignKey) && !isEmail(payload.contact.email ?? "")) {
    return "A valid confirmed email is required before building the investor outreach plan.";
  }

  if (payload.reportRequested === true && interactiveLeadMagnetKeys.has(campaignKey)) {
    if (isInvestorOutreachPlanPhase(payload, campaignKey)) {
      if (payload.investorOutreach?.emailConfirmed !== true) {
        return "Email confirmation is required before requesting the investor outreach board.";
      }
      if (payload.privacyGuardrailVersion !== approvedPrivacyGuardrailVersion) {
        return "The approved privacy guardrail version is required before requesting an interactive lead-magnet report.";
      }
      if (payload.publicFormInputType !== undefined && payload.publicFormInputType !== approvedPublicFormInputType) {
        return "Payload failed validation: public form input type must match the approved categorical schema.";
      }
    } else {
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
  if (payload.investorOutreach !== undefined && !validateCompactObject(payload.investorOutreach, allowedObjectKeys.investorOutreach)) {
    return "Payload failed validation: investor outreach payload must use the approved compact schema.";
  }

  if (payload.maReadiness?.answers !== undefined && !isScoreRecord(payload.maReadiness.answers)) {
    return "Payload failed validation: M&A answers must be compact numeric categories.";
  }
  if (payload.maReadiness?.sixtyDayCleanupPlan !== undefined && !isCompactStringArray(payload.maReadiness.sixtyDayCleanupPlan, arrayMax, 220)) {
    return "Payload failed validation: M&A cleanup plan must be compact categorical text.";
  }

  return null;
}

function validateInvestorConfirmationPayload(payload: LeadPayload, campaignKey: string) {
  if (!isInvestorOutreachConfirmPhase(payload, campaignKey)) return null;
  if (!payload.investorOutreach || !hasOnlyKeys(payload.investorOutreach, allowedObjectKeys.investorOutreach)) {
    return "Payload failed validation: investor outreach confirmation must use the approved compact schema.";
  }
  if (!payload.investorOutreach.confirmationToken || !isCompactString(payload.investorOutreach.confirmationToken, 4096)) {
    return "A valid confirmation token is required before pushing investor outreach contact details to HighLevel.";
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
  const contactTitle = typeof payload.contact_title === "string" ? payload.contact_title.trim() : "";
  const qualifyingStatus =
    typeof payload.qualifying_status === "string" ? payload.qualifying_status.trim() : "";

  for (const value of [name, email, company, contactTitle, qualifyingStatus]) {
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

  if (config.kind === "assessment" && !contactTitle) {
    return { error: "Contact title is required for interactive assessment reports." };
  }

  if (payload.permission_acknowledged !== true) {
    return { error: "Permission acknowledgment is required." };
  }

  if (config.kind === "download") {
    if (payload.answers !== undefined || payload.mode !== undefined) {
      return { error: "The outside counsel playbook does not accept assessment answers." };
    }
    return { config, name, email, company, contactTitle, qualifyingStatus };
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

  return { config, name, email, company, contactTitle, qualifyingStatus, answers: payload.answers, mode };
}

function finalCustomFields({
  result,
  completedAt,
  qualifyingStatus,
  contactTitle,
  answers,
  hasEmailOptIn,
}: {
  result: AssessmentResult | DownloadResult;
  completedAt: string;
  qualifyingStatus: string;
  contactTitle?: string;
  answers?: Record<string, number>;
  hasEmailOptIn: boolean;
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
    { key: "contact_title", field_value: contactTitle },
    {
      key: "consent_basis",
      field_value: hasEmailOptIn ? `lead_magnet_email_opt_in:${result.magnet_slug}` : "no_email_opt_in",
    },
    { key: "approval_status", field_value: hasEmailOptIn ? "pending" : "no-auto-send" },
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
  const { config, name, email, company, contactTitle, qualifyingStatus } = validation;
  const { firstName, lastName } = splitName(name);
  const answers = "answers" in validation ? validation.answers : undefined;
  const hasEmailOptIn = payload.subscribe === true;
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
    ...(result.magnet_slug === "outside-counsel-playbook" ? [] : [result.tier.tag]),
    ...(result.magnet_slug === "patent-moat-scorecard" ? [`moat-mode-${result.mode ?? "founder"}`] : []),
    hasEmailOptIn ? "newsletter:ai" : "newsletter:not-consented",
  ];
  const highLevelPayload: HighLevelPayload = {
    locationId: process.env.GHL_LOCATION_ID,
    firstName,
    lastName,
    email,
    companyName: company,
    tags,
    customFields: finalCustomFields({
      result,
      completedAt,
      qualifyingStatus,
      contactTitle,
      answers,
      hasEmailOptIn,
    }).filter((field) => field.field_value !== undefined && field.field_value !== ""),
  };
  const highLevel = await upsertHighLevel(highLevelPayload);
  const report =
    config.kind === "assessment" && result.magnet_slug !== "outside-counsel-playbook"
      ? generateAssessmentReportPdf({
          config,
          result,
          contact: {
            name,
            email,
            title: contactTitle,
            company,
          },
          completedAt,
        })
      : undefined;

  return Response.json({
    ...result,
    ...(report ? { report } : {}),
    crm_mode: highLevel.mode,
    highlevel: highLevel.mode,
    campaignRouting: {
      triggerTag: null,
      optInRequired: true,
      consentBasis: hasEmailOptIn ? `lead_magnet_email_opt_in:${result.magnet_slug}` : "no_email_opt_in",
      workflowPattern:
        "Final-magnet submissions do not add workflow trigger tags or email-sequence routing. Add newsletter:ai only after explicit final-magnet email opt-in; otherwise use newsletter:not-consented and Approval Status = no-auto-send.",
      emailSequence: [],
    },
    ...(highLevel.mode === "preview" ? { payload: highLevel.payload } : {}),
  });
}

function cleanCustomFields(fields: HighLevelPayload["customFields"]) {
  return fields.filter((field) => field.field_value !== undefined && field.field_value !== "");
}

async function handleSearchMagnetSubmission(payload: LeadPayload) {
  const validationError = validateSearchMagnetPayload(payload);
  if (validationError) {
    return Response.json({ error: validationError }, { status: 400 });
  }

  const slug = payload.searchMagnet?.slug;
  if (!slug || !isSearchMagnetRoute(slug)) {
    return Response.json({ error: "Payload failed validation: search magnet route is not approved." }, { status: 400 });
  }

  const config = searchMagnetConfigs[slug];
  const email = payload.contact?.email?.trim().toLowerCase() ?? "";
  const { firstName, lastName } = splitName(payload.contact?.name);
  const event = payload.searchMagnet?.event;
  const highLevelPayload: HighLevelPayload = {
    locationId: process.env.GHL_LOCATION_ID,
    firstName,
    lastName,
    email,
    companyName: payload.contact?.company,
    tags: Array.from(
      new Set([
        "whiteford-mountain-west",
        ...config.tags,
        `search-magnet:${slug}`,
        event ? `search-magnet-event:${event}` : undefined,
      ].filter((tag): tag is string => Boolean(tag))),
    ),
    customFields: cleanCustomFields([
      { key: "lead_magnet", field_value: config.preview.title },
      { key: "search_magnet_slug", field_value: slug },
      { key: "search_magnet_id", field_value: config.id },
      { key: "search_magnet_event", field_value: event },
      { key: "source_page", field_value: payload.sourcePage },
      { key: "source_channel", field_value: payload.sourceChannel },
      { key: "role", field_value: payload.contact?.role },
      { key: "contact_title", field_value: payload.contact?.role },
      { key: "consent_basis", field_value: `search_magnet_consent:${slug}` },
      { key: "approval_status", field_value: "pending" },
      { key: "search_magnet_tags", field_value: config.tags.join(",") },
      { key: "search_magnet_score", field_value: payload.searchMagnet?.score },
      { key: "search_magnet_score_max", field_value: payload.searchMagnet?.scoreMax },
      { key: "search_magnet_score_percent", field_value: payload.searchMagnet?.scorePercent },
      { key: "search_magnet_tier", field_value: payload.searchMagnet?.tier },
      { key: "search_magnet_dimensions", field_value: stringifyJsonField(payload.searchMagnet?.dimensions) },
      { key: "search_magnet_prioritized_actions", field_value: stringifyField(payload.searchMagnet?.prioritizedActions) },
      { key: "search_magnet_answers", field_value: stringifyJsonField(payload.searchMagnet?.answers) },
      { key: "search_magnet_result_version", field_value: payload.searchMagnet?.resultVersion },
    ]),
  };
  const highLevel = await upsertHighLevel(highLevelPayload);

  if (highLevel.mode === "failed") {
    return Response.json({ error: "HighLevel upsert failed", detail: highLevel.detail }, { status: 502 });
  }

  return Response.json({
    mode: highLevel.mode,
    highlevel: highLevel.mode,
    event,
    message:
      event === "completed"
        ? "Search magnet completion captured."
        : "Search magnet lead captured.",
    campaignRouting: {
      triggerTag: null,
      configTags: config.tags,
      workflowPattern:
        "Search-demand lead magnets upsert contacts through the shared HighLevel integration and apply config tags from the source MAGNET_CONFIG.",
      emailSequence: [],
    },
    ...(highLevel.mode === "preview" ? { payload: highLevel.payload } : { result: highLevel.result }),
  });
}

export async function POST(request: Request) {
  const payload = (await request.json()) as LeadPayload & FinalLeadPayload;

  if (payload.magnet_slug !== undefined) {
    return handleFinalMagnetSubmission(payload);
  }

  if (payload.searchMagnet !== undefined) {
    return handleSearchMagnetSubmission(payload);
  }

  const token = process.env.GHL_PRIVATE_INTEGRATION_TOKEN;
  const locationId = process.env.GHL_LOCATION_ID;
  const campaignKey =
    payload.campaignKey && payload.campaignKey in campaigns
      ? payload.campaignKey
      : "ai-compliance";
  const confirmationValidationError = validateInvestorConfirmationPayload(payload, campaignKey);

  if (confirmationValidationError) {
    return Response.json({ error: confirmationValidationError }, { status: 400 });
  }

  let confirmedContact: InvestorConfirmationContact | null = null;
  if (isInvestorOutreachConfirmPhase(payload, campaignKey)) {
    try {
      confirmedContact = readInvestorConfirmationToken(payload.investorOutreach?.confirmationToken ?? "");
    } catch (error) {
      return Response.json({ error: error instanceof Error ? error.message : "The confirmation link is invalid." }, { status: 400 });
    }
  }

  const email = (confirmedContact?.email ?? payload.contact?.email)?.trim();

  if (!email) {
    return Response.json({ error: "Email is required" }, { status: 400 });
  }

  const validationError = confirmedContact ? null : validateLeadPayload(payload, campaignKey);

  if (validationError) {
    return Response.json({ error: validationError }, { status: 400 });
  }

  const campaign = getCampaign(campaignKey);
  const effectiveContact = confirmedContact ?? payload.contact;
  const { firstName, lastName } = splitName(effectiveContact?.name);
  const hasEmailOptIn = payload.contact?.subscribe === true;

  if (isInvestorOutreachContactPhase(payload, campaignKey)) {
    const normalizedEmail = email.toLowerCase();
    const confirmationUrl = buildInvestorConfirmationUrl({
      name: payload.contact?.name ?? "",
      email: normalizedEmail,
      company: payload.contact?.company ?? "",
      role: payload.contact?.role ?? "",
      sourcePage: payload.sourcePage,
      sourceChannel: payload.sourceChannel,
    });
    const emailDelivery = await sendInvestorOutreachConfirmationEmail({
      to: normalizedEmail,
      name: payload.contact?.name ?? "",
      confirmationUrl,
    });

    if (emailDelivery.mode === "failed" || (emailDelivery.mode === "preview" && process.env.NODE_ENV === "production")) {
      return Response.json(
        {
          error: "Investor outreach confirmation email sender is not configured.",
          detail: emailDelivery.mode === "failed" ? emailDelivery.detail : "Set RESEND_API_KEY and INVESTOR_CONFIRMATION_FROM_EMAIL in Vercel.",
        },
        { status: 503 },
      );
    }

    return Response.json({
      mode: emailDelivery.mode,
      highlevel: "not_called",
      message:
        emailDelivery.mode === "preview"
          ? "Investor outreach confirmation email preview generated. Configure RESEND_API_KEY to send live email."
          : "Investor outreach confirmation email sent.",
      emailDelivery,
      campaignRouting: {
        triggerTag: null,
        optInRequired: false,
        confirmationUrl,
        highLevelContactUpsert: "after_email_confirmation",
        workflowPattern:
          "Investor outreach contact capture sends a transactional confirmation email through the app email provider. HighLevel is not called until the user confirms.",
        emailSequence: [],
      },
    });
  }

  if (confirmedContact && isInvestorOutreachConfirmPhase(payload, campaignKey)) {
    const normalizedEmail = email.toLowerCase();
    const highLevelPayload: HighLevelPayload = {
      locationId,
      firstName,
      lastName,
      email: normalizedEmail,
      companyName: confirmedContact.company,
      tags: Array.from(
        new Set([
          "whiteford-mountain-west",
          ...campaign.tags,
          investorOutreachConfirmedTag,
        ]),
      ),
      customFields: cleanCustomFields([
        { key: "campaign_key", field_value: campaignKey },
        { key: "campaign_label", field_value: campaign.label },
        { key: "authority_pillar", field_value: campaign.authorityPillar },
        { key: "source_page", field_value: confirmedContact.sourcePage ?? payload.sourcePage },
        { key: "source_channel", field_value: confirmedContact.sourceChannel ?? payload.sourceChannel },
        { key: "lead_magnet", field_value: campaign.leadMagnet },
        { key: "role", field_value: confirmedContact.role },
        { key: "contact_title", field_value: confirmedContact.role },
        { key: "investor_outreach_phase", field_value: "confirmed_contact" },
        { key: "investor_outreach_confirmation_status", field_value: "confirmed" },
        { key: "investor_outreach_email_confirmed", field_value: "true" },
        { key: "investor_outreach_confirmation_sender", field_value: "app_resend" },
      ]),
    };
    const highLevel = await upsertHighLevel(highLevelPayload);

    if (highLevel.mode === "failed") {
      return Response.json({ error: "HighLevel upsert failed", detail: highLevel.detail }, { status: 502 });
    }

    return Response.json({
      mode: highLevel.mode,
      highlevel: highLevel.mode,
      contact: {
        name: confirmedContact.name,
        email: normalizedEmail,
        company: confirmedContact.company,
        role: confirmedContact.role,
        subscribe: false,
      },
      message:
        highLevel.mode === "preview"
          ? "Email confirmed and HighLevel contact payload previewed."
          : "Email confirmed and contact pushed to HighLevel.",
      campaignRouting: {
        triggerTag: null,
        optInRequired: false,
        confirmationRequired: true,
        highLevelContactUpsert: "after_email_confirmation",
        workflowPattern:
          "Confirmed contact payloads push contact details into HighLevel without using HighLevel to send the confirmation email.",
        emailSequence: [],
      },
      ...(highLevel.mode === "preview" ? { payload: highLevel.payload } : { result: highLevel.result }),
    });
  }

  if (isInvestorOutreachPlanPhase(payload, campaignKey)) {
    const normalizedEmail = email.toLowerCase();
    const highLevelPayload: HighLevelPayload = {
      locationId,
      firstName,
      lastName,
      email: normalizedEmail,
      companyName: payload.contact?.company,
      tags: Array.from(
        new Set([
          "whiteford-mountain-west",
          ...campaign.tags,
          investorOutreachConfirmedTag,
        ]),
      ),
      customFields: cleanCustomFields([
        { key: "campaign_key", field_value: campaignKey },
        { key: "campaign_label", field_value: campaign.label },
        { key: "authority_pillar", field_value: campaign.authorityPillar },
        { key: "source_page", field_value: payload.sourcePage },
        { key: "source_channel", field_value: payload.sourceChannel },
        { key: "lead_magnet", field_value: campaign.leadMagnet },
        { key: "role", field_value: payload.contact?.role },
        { key: "contact_title", field_value: payload.contact?.role },
        { key: "investor_outreach_phase", field_value: "plan" },
        { key: "investor_outreach_confirmation_status", field_value: "confirmed" },
        { key: "investor_outreach_email_confirmed", field_value: "true" },
        { key: "privacy_guardrail_version", field_value: payload.privacyGuardrailVersion },
        { key: "public_form_input_type", field_value: payload.publicFormInputType },
        { key: "report_requested", field_value: payload.reportRequested === true ? "true" : undefined },
        { key: "investor_outreach_target_round", field_value: payload.investorOutreach?.targetRound },
        { key: "investor_outreach_categories", field_value: stringifyField(payload.investorOutreach?.investorCategories) },
        { key: "investor_outreach_regions", field_value: stringifyField(payload.investorOutreach?.investorRegions) },
        { key: "investor_outreach_current_stage", field_value: payload.investorOutreach?.currentStage },
        { key: "investor_outreach_intro_sources", field_value: stringifyField(payload.investorOutreach?.introSources) },
        { key: "investor_outreach_data_room_status", field_value: payload.investorOutreach?.dataRoomStatus },
        { key: "investor_outreach_portfolio_research_queue", field_value: stringifyJsonField(payload.investorOutreach?.portfolioResearchQueue) },
        { key: "investor_outreach_portfolio_matches", field_value: stringifyJsonField(payload.investorOutreach?.portfolioMatches) },
        {
          key: "investor_outreach_portfolio_match_count",
          field_value: Array.isArray(payload.investorOutreach?.portfolioMatches)
            ? payload.investorOutreach.portfolioMatches.length
            : undefined,
        },
        { key: "investor_outreach_portfolio_enrichment_version", field_value: payload.investorOutreach?.portfolioEnrichmentVersion },
        { key: "investor_outreach_kanban_stage_counts", field_value: stringifyField(payload.investorOutreach?.kanbanStageCounts) },
        { key: "investor_outreach_report_version", field_value: payload.investorOutreach?.reportVersion },
      ]),
    };
    const highLevel = await upsertHighLevel(highLevelPayload);

    if (highLevel.mode === "failed") {
      return Response.json({ error: "HighLevel upsert failed", detail: highLevel.detail }, { status: 502 });
    }

    return Response.json({
      mode: highLevel.mode,
      highlevel: highLevel.mode,
      message:
        highLevel.mode === "preview"
          ? "Investor outreach plan captured in preview mode without nurture or newsletter routing."
          : "Investor outreach plan captured without nurture or newsletter routing.",
      campaignRouting: {
        triggerTag: null,
        optInRequired: false,
        confirmationRequired: true,
        consentBasis: "confirmed_board_request_no_nurture",
        workflowPattern:
          "Confirmed investor outreach plan payloads do not add workflow trigger tags, newsletter tags, nurture routing, SMS, DM, social message, or other outbound follow-up.",
        emailSequence: [],
      },
      ...(highLevel.mode === "preview" ? { payload: highLevel.payload } : { result: highLevel.result }),
    });
  }

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
      { key: "tech_legal_health_ai_use_register_snapshot", field_value: stringifyField(payload.techLegalHealth?.aiUseRegisterSnapshot) },
      { key: "tech_legal_health_report_version", field_value: payload.techLegalHealth?.reportVersion },
      { key: "tech_legal_health_privacy_guardrail_version", field_value: payload.privacyGuardrailVersion },
      { key: "investor_outreach_target_round", field_value: payload.investorOutreach?.targetRound },
      { key: "investor_outreach_categories", field_value: stringifyField(payload.investorOutreach?.investorCategories) },
      { key: "investor_outreach_regions", field_value: stringifyField(payload.investorOutreach?.investorRegions) },
      { key: "investor_outreach_current_stage", field_value: payload.investorOutreach?.currentStage },
      { key: "investor_outreach_intro_sources", field_value: stringifyField(payload.investorOutreach?.introSources) },
      { key: "investor_outreach_data_room_status", field_value: payload.investorOutreach?.dataRoomStatus },
      { key: "investor_outreach_portfolio_research_queue", field_value: stringifyJsonField(payload.investorOutreach?.portfolioResearchQueue) },
      { key: "investor_outreach_portfolio_matches", field_value: stringifyJsonField(payload.investorOutreach?.portfolioMatches) },
      {
        key: "investor_outreach_portfolio_match_count",
        field_value: Array.isArray(payload.investorOutreach?.portfolioMatches)
          ? payload.investorOutreach.portfolioMatches.length
          : undefined,
      },
      { key: "investor_outreach_portfolio_enrichment_version", field_value: payload.investorOutreach?.portfolioEnrichmentVersion },
      { key: "investor_outreach_kanban_stage_counts", field_value: stringifyField(payload.investorOutreach?.kanbanStageCounts) },
      { key: "investor_outreach_report_version", field_value: payload.investorOutreach?.reportVersion },
      { key: "investor_outreach_privacy_guardrail_version", field_value: payload.privacyGuardrailVersion },
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
