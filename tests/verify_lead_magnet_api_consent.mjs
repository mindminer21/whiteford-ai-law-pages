#!/usr/bin/env node

import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const routePath = path.join(root, "src/app/api/leads/route.ts");
const campaignsPath = path.join(root, "src/lib/campaigns.ts");
const magnetsPath = path.join(root, "src/lib/magnets/finalization.ts");
const reportPdfPath = path.join(root, "src/lib/magnets/report-pdf.ts");
const confirmationTokenPath = path.join(root, "src/lib/investor-outreach/confirmation-token.ts");
const investorEmailPath = path.join(root, "src/lib/email/investor-outreach-confirmation.ts");
const searchMagnetConfigPath = path.join(root, "src/lib/search-magnets/configs.ts");

const reportPdfSource = fs
  .readFileSync(reportPdfPath, "utf8")
  .replace(
    'from "./finalization";',
    `from ${JSON.stringify(pathToFileURL(magnetsPath).href)};`,
  )
  .replace(
    'from "@/lib/magnets/finalization";',
    `from ${JSON.stringify(pathToFileURL(magnetsPath).href)};`,
  );
const tempReportPdfPath = path.join(os.tmpdir(), `whiteford-report-pdf-${process.pid}.ts`);
fs.writeFileSync(tempReportPdfPath, reportPdfSource);

const routeSource = fs
  .readFileSync(routePath, "utf8")
  .replace(
    'import { campaigns, getCampaign } from "@/lib/campaigns";',
    `import { campaigns, getCampaign } from ${JSON.stringify(pathToFileURL(campaignsPath).href)};`,
  )
  .replace(
    'from "@/lib/magnets/finalization";',
    `from ${JSON.stringify(pathToFileURL(magnetsPath).href)};`,
  )
  .replace(
    'import { generateAssessmentReportPdf } from "@/lib/magnets/report-pdf";',
    `import { generateAssessmentReportPdf } from ${JSON.stringify(pathToFileURL(tempReportPdfPath).href)};`,
  )
  .replace(
    'from "@/lib/investor-outreach/confirmation-token";',
    `from ${JSON.stringify(pathToFileURL(confirmationTokenPath).href)};`,
  )
  .replace(
    'from "@/lib/email/investor-outreach-confirmation";',
    `from ${JSON.stringify(pathToFileURL(investorEmailPath).href)};`,
  )
  .replace(
    'import { isSearchMagnetRoute, searchMagnetConfigs } from "@/lib/search-magnets/configs";',
    `import { isSearchMagnetRoute, searchMagnetConfigs } from ${JSON.stringify(pathToFileURL(searchMagnetConfigPath).href)};`,
  );

const tempRoutePath = path.join(os.tmpdir(), `whiteford-leads-route-${process.pid}.ts`);
fs.writeFileSync(tempRoutePath, routeSource);

delete process.env.GHL_PRIVATE_INTEGRATION_TOKEN;
delete process.env.GHL_LOCATION_ID;
delete process.env.RESEND_API_KEY;

const { POST } = await import(pathToFileURL(tempRoutePath).href);

fs.unlinkSync(tempRoutePath);
fs.unlinkSync(tempReportPdfPath);

const APPROVED_GUARDRAIL_VERSION = "lead-magnet-guardrail-v2";

const CAMPAIGNS = {
  "ai-compliance": {
    trigger: "workflow:ai-compliance-readiness",
    emailCount: 4,
    extra: {
      aiComplianceGameplan: {
        maturityLevel: "Developing controls",
        readinessHeatMap: [{ workstream: "Owner", status: "Needs review" }],
        tenDayFixes: ["Assign owner"],
        roadmap306090: ["30 days", "60 days", "90 days"],
        reportVersion: "test",
      },
    },
  },
  "ai-patent": {
    trigger: "workflow:ai-patent-strategy",
    emailCount: 4,
    extra: {
      patent: {
        score: 58,
        stage: "MVP in market",
        checks: ["human contribution documented"],
        band: "Strategy needs tightening",
      },
      aiPatentDocumentationGapMap: [
        { area: "Ownership", nextStep: "Review assignments." },
      ],
      aiPatentOwnershipGapMap: ["Ownership"],
      recommendedNextStep: "Tighten documentation.",
    },
  },
  "tech-gc": {
    trigger: "workflow:tech-gc-launchpad",
    emailCount: 4,
    extra: {
      readinessChecks: ["ip ownership", "contract stack"],
    },
  },
  "ma-readiness": {
    trigger: "workflow:ma-readiness",
    emailCount: 4,
    extra: {
      maReadiness: {
        score: 57,
        band: "Useful foundation with diligence gaps",
        timing: "90 days",
        buyerDiligenceRiskMap: [{ category: "IP", cleanup: "Audit assignments" }],
        sixtyDayCleanupPlan: ["Days 1-20: Audit assignments"],
        answers: { ip: 2 },
        reportVersion: "test",
      },
    },
  },
};

function buildRequest(payload) {
  return new Request("http://local.test/api/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

async function postLead(payload) {
  const response = await POST(buildRequest(payload));
  const data = await response.json();
  assert.equal(response.status, 200, JSON.stringify(data, null, 2));
  return data;
}

async function rejectLead(payload, expectedMessagePart) {
  const response = await POST(buildRequest(payload));
  const data = await response.json();
  assert.equal(response.status, 400, JSON.stringify(data, null, 2));
  assert.match(data.error, expectedMessagePart);
  return data;
}

function buildPayload(campaignKey, subscribeMarker) {
  const payload = {
    campaignKey,
    sourcePage: `test-${campaignKey}`,
    sourceChannel: "api-consent-test",
    disclaimerAccepted: true,
    reportRequested: true,
    privacyGuardrailVersion: APPROVED_GUARDRAIL_VERSION,
    publicFormInputType: "categorical_non_confidential",
    contact: {
      name: "Ada Lovelace",
      email: `test-${campaignKey}-${String(subscribeMarker)}@test.invalid`,
      company: "Example Test Co",
      role: "Founder",
    },
    assessment: {
      readinessScore: 42,
      tags: [
        "workflow:malicious-client-tag",
        " WORKFLOW:trimmed-client-tag ",
        "test:kept",
        123,
      ],
    },
  };

  if (subscribeMarker !== "missing") {
    payload.contact.subscribe = subscribeMarker;
  }

  return {
    ...payload,
    ...CAMPAIGNS[campaignKey].extra,
  };
}

function fieldValue(data, key) {
  const field = data.payload.customFields.find((item) => item.key === key);
  assert.ok(field, `Missing custom field ${key}`);
  return field.field_value;
}

function customField(data, key) {
  return data.payload.customFields.find((item) => item.key === key);
}

function assertPreview(data) {
  assert.equal(data.mode, "preview");
  assert.equal(data.payload.locationId, undefined);
}

function assertNoClientWorkflowTags(tags, allowedTrigger = null) {
  const unexpected = tags.filter(
    (tag) => tag.startsWith("workflow:") && tag !== allowedTrigger,
  );
  assert.deepEqual(unexpected, []);
}

function assertCase(data, campaignKey, subscribeMarker) {
  const expected = CAMPAIGNS[campaignKey];
  const hasOptIn = subscribeMarker === true;
  const tags = data.payload.tags;
  const routing = data.campaignRouting;

  assertPreview(data);
  assert.equal(tags.includes("workflow:malicious-client-tag"), false);
  assert.equal(tags.includes("WORKFLOW:trimmed-client-tag"), false);
  assert.equal(tags.includes("test:kept"), false);
  assert.equal(fieldValue(data, "campaign_key"), campaignKey);

  if (hasOptIn) {
    assert.equal(tags.includes(expected.trigger), true);
    assert.equal(routing.triggerTag, expected.trigger);
    assert.equal(tags.includes("newsletter:ai"), true);
    assert.equal(fieldValue(data, "consent_basis"), `lead_magnet_email_opt_in:${campaignKey}`);
    assert.equal(fieldValue(data, "approval_status"), "pending");
    assert.equal(routing.emailSequence.length, expected.emailCount);
    assertNoClientWorkflowTags(tags, expected.trigger);
    return;
  }

  assert.equal(tags.some((tag) => tag.startsWith("workflow:")), false);
  assert.equal(routing.triggerTag, null);
  assert.equal(tags.includes("newsletter:not-consented"), true);
  assert.equal(tags.includes("newsletter:ai"), false);
  assert.equal(fieldValue(data, "consent_basis"), "no_email_opt_in");
  assert.equal(fieldValue(data, "approval_status"), "no-auto-send");
  assert.deepEqual(routing.emailSequence, []);
  assertNoClientWorkflowTags(tags);
}

function assertFinalConsentCase(data, subscribeMarker) {
  const hasOptIn = subscribeMarker === true;
  const tags = data.payload.tags;
  const routing = data.campaignRouting;

  assert.equal(data.highlevel, "preview");
  assert.equal(data.crm_mode, "preview");
  assert.equal(data.payload.locationId, undefined);
  assert.equal(tags.some((tag) => tag.startsWith("workflow:")), false);
  assert.equal(routing.triggerTag, null);
  assert.deepEqual(routing.emailSequence, []);

  if (hasOptIn) {
    assert.equal(tags.includes("newsletter:ai"), true);
    assert.equal(tags.includes("newsletter:not-consented"), false);
    assert.equal(fieldValue(data, "consent_basis"), `lead_magnet_email_opt_in:${data.magnet_slug}`);
    assert.equal(fieldValue(data, "approval_status"), "pending");
    assert.equal(routing.consentBasis, `lead_magnet_email_opt_in:${data.magnet_slug}`);
    return;
  }

  assert.equal(tags.includes("newsletter:ai"), false);
  assert.equal(tags.includes("newsletter:not-consented"), true);
  assert.equal(fieldValue(data, "consent_basis"), "no_email_opt_in");
  assert.equal(fieldValue(data, "approval_status"), "no-auto-send");
  assert.equal(routing.consentBasis, "no_email_opt_in");
}

function buildInvestorContactPayload(extra = {}) {
  return {
    campaignKey: "investor-outreach",
    sourcePage: "investor-outreach-kanban/start",
    sourceChannel: "api-consent-test",
    contact: {
      name: "Ada Lovelace",
      email: "ada.investor@test.invalid",
      company: "Analytical Engines Inc",
      role: "Founder / CEO",
      subscribe: false,
    },
    investorOutreach: {
      phase: "contact",
    },
    ...extra,
  };
}

function buildInvestorPlanPayload(extra = {}) {
  return {
    campaignKey: "investor-outreach",
    sourcePage: "investor-outreach-kanban/data-room",
    sourceChannel: "api-consent-test",
    reportRequested: true,
    privacyGuardrailVersion: APPROVED_GUARDRAIL_VERSION,
    publicFormInputType: "categorical_non_confidential",
    contact: {
      name: "Ada Lovelace",
      email: "ada.investor@test.invalid",
      company: "Analytical Engines Inc",
      role: "Founder / CEO",
      subscribe: false,
    },
    investorOutreach: {
      phase: "plan",
      emailConfirmed: true,
      targetRound: "Seed",
      investorCategories: ["AI", "SaaS"],
      investorRegions: ["Colorado / Utah"],
      currentStage: "Find investors",
      introSources: ["Founder peers", "Lawyers / accountants", "Angels / scouts"],
      dataRoomStatus: "Skeleton folders only",
      portfolioResearchQueue: [
        {
          investorSegment: "AI - Seed",
          targetCompany: "Analytical Engines Inc",
          targetRound: "Seed",
          category: "AI",
          region: "Colorado / Utah",
          signalListUrl: "https://signal.nfx.com/investor-lists/top-ai-seed-investors",
          researchBrief: "Identify relevant portfolio companies and verify CEO/founder public business contact details before outreach.",
          requiredFields: ["Investor name", "Portfolio company", "CEO/founder name", "CEO public business contact", "Source URL"],
        },
      ],
      portfolioMatches: [
        {
          investorName: "Example Ventures",
          investorFirm: "Example Ventures",
          portfolioCompany: "Example AI Robotics",
          relevanceToUserCompany: "AI workflow category fit",
          relevanceTags: ["AI", "SaaS"],
          ceoName: "Ada Founder",
          ceoTitle: "CEO",
          ceoEmail: "ada@example-ai.test",
          ceoLinkedIn: "https://www.linkedin.com/in/ada-founder",
          sourceUrl: "https://example-ai.test/team",
          verificationStatus: "verified_public",
        },
      ],
      portfolioEnrichmentVersion: "investor-portfolio-company-ceo-enrichment-v1",
      kanbanStageCounts: { find_investors: 3, identify_introduction_sources: 2 },
      reportVersion: "test",
    },
    ...extra,
  };
}

function assertNoInvestorNurtureRouting(data) {
  const tags = data.payload?.tags ?? [];

  assert.equal(tags.includes("workflow:investor-outreach-kanban"), false);
  assert.equal(tags.includes("newsletter:ai"), false);
  assert.equal(tags.includes("newsletter:not-consented"), false);
  assert.deepEqual(data.campaignRouting.emailSequence, []);
}

{
  const data = await postLead(buildInvestorContactPayload());

  assert.equal(data.mode, "preview");
  assert.equal(data.highlevel, "not_called");
  assert.equal(data.emailDelivery.mode, "preview");
  assert.match(data.emailDelivery.confirmationUrl, /\/investor-outreach-kanban\/confirm\?token=/);
  assert.equal(data.campaignRouting.triggerTag, null);
  assert.equal(data.campaignRouting.highLevelContactUpsert, "after_email_confirmation");
  assert.match(data.campaignRouting.workflowPattern, /HighLevel is not called until the user confirms/);
  assertNoInvestorNurtureRouting(data);

  const confirmationToken = new URL(data.emailDelivery.confirmationUrl).searchParams.get("token");
  const confirmed = await postLead({
    campaignKey: "investor-outreach",
    sourcePage: "investor-outreach-kanban/confirm",
    sourceChannel: "api-consent-test",
    contact: {
      subscribe: false,
    },
    investorOutreach: {
      phase: "confirm",
      confirmationToken,
    },
  });

  assertPreview(confirmed);
  assert.equal(confirmed.payload.firstName, "Ada");
  assert.equal(confirmed.payload.lastName, "Lovelace");
  assert.equal(confirmed.payload.email, "ada.investor@test.invalid");
  assert.equal(confirmed.payload.companyName, "Analytical Engines Inc");
  assert.equal(confirmed.contact.company, "Analytical Engines Inc");
  assert.equal(fieldValue(confirmed, "role"), "Founder / CEO");
  assert.equal(fieldValue(confirmed, "contact_title"), "Founder / CEO");
  assert.equal(fieldValue(confirmed, "investor_outreach_phase"), "confirmed_contact");
  assert.equal(fieldValue(confirmed, "investor_outreach_confirmation_status"), "confirmed");
  assert.equal(fieldValue(confirmed, "investor_outreach_email_confirmed"), "true");
  assert.equal(fieldValue(confirmed, "investor_outreach_confirmation_sender"), "app_resend");
}

{
  const data = await postLead(buildInvestorPlanPayload());
  const tags = data.payload.tags;

  assertPreview(data);
  assert.equal(data.payload.firstName, "Ada");
  assert.equal(data.payload.lastName, "Lovelace");
  assert.equal(data.payload.email, "ada.investor@test.invalid");
  assert.equal(data.payload.companyName, "Analytical Engines Inc");
  assert.equal(tags.some((tag) => tag.startsWith("workflow:")), false);
  assert.equal(data.campaignRouting.triggerTag, null);
  assertNoInvestorNurtureRouting(data);
  assert.equal(fieldValue(data, "role"), "Founder / CEO");
  assert.equal(fieldValue(data, "contact_title"), "Founder / CEO");
  assert.equal(fieldValue(data, "investor_outreach_phase"), "plan");
  assert.equal(fieldValue(data, "investor_outreach_email_confirmed"), "true");
  assert.equal(fieldValue(data, "investor_outreach_target_round"), "Seed");
  assert.match(fieldValue(data, "investor_outreach_categories"), /AI \| SaaS/);
  assert.match(fieldValue(data, "investor_outreach_regions"), /Colorado \/ Utah/);
  assert.match(fieldValue(data, "investor_outreach_intro_sources"), /Founder peers/);
  assert.equal(fieldValue(data, "investor_outreach_data_room_status"), "Skeleton folders only");
  assert.match(fieldValue(data, "investor_outreach_portfolio_research_queue"), /CEO public business contact/);
  assert.match(fieldValue(data, "investor_outreach_portfolio_matches"), /Example AI Robotics/);
  assert.match(fieldValue(data, "investor_outreach_portfolio_matches"), /Ada Founder/);
  assert.equal(fieldValue(data, "investor_outreach_portfolio_match_count"), 1);
  assert.equal(fieldValue(data, "investor_outreach_portfolio_enrichment_version"), "investor-portfolio-company-ceo-enrichment-v1");
}

await rejectLead(
  buildInvestorPlanPayload({
    investorOutreach: {
      ...buildInvestorPlanPayload().investorOutreach,
      emailConfirmed: false,
    },
  }),
  /Email confirmation is required/,
);

await rejectLead(
  buildInvestorContactPayload({
    contact: {
      name: "Ada Lovelace",
      email: "ada.investor@test.invalid",
      company: "Analytical Engines Inc",
      role: "",
      subscribe: false,
    },
  }),
  /Name, email, company, and title are required/,
);

function buildSearchMagnetPayload(event = "lead_captured", extra = {}) {
  const completed = event === "completed";
  return {
    sourcePage: "colorado-non-compete-checker",
    sourceChannel: "api-consent-test",
    contact: {
      name: "Ada Lovelace",
      email: "ada.search@test.invalid",
      company: "Analytical Engines Inc",
      role: "Founder / CEO",
      subscribe: true,
    },
    searchMagnet: {
      slug: "colorado-non-compete-checker",
      magnetId: "colorado-non-compete-checker",
      event,
      tags: ["client-forged-tag"],
      score: completed ? 12 : undefined,
      scoreMax: completed ? 24 : undefined,
      scorePercent: completed ? 50 : undefined,
      tier: completed ? "Material gaps" : undefined,
      dimensions: completed
        ? {
            enforceability: { label: "Enforceability", raw: 6, max: 8, pct: 75 },
            procedure: { label: "Notice & process", raw: 2, max: 4, pct: 50 },
          }
        : undefined,
      prioritizedActions: completed
        ? [
            "Have your non-compete and non-solicitation templates reviewed against the 2026 threshold ($130,014) and the narrowed 2025 exceptions — restrictions below the threshold are generally void.",
            "Move restrictive-covenant notice to a separate, standalone document delivered before offer acceptance (or 14 days before it takes effect for current workers) — a notice defect alone can void the covenant.",
          ]
        : undefined,
      answers: completed ? { 0: 1, 1: 2 } : undefined,
      resultVersion: "search-magnet-config-v1",
    },
    ...extra,
  };
}

{
  const data = await postLead(buildSearchMagnetPayload("lead_captured"));
  const tags = data.payload.tags;

  assertPreview(data);
  assert.equal(data.event, "lead_captured");
  assert.equal(data.payload.firstName, "Ada");
  assert.equal(data.payload.lastName, "Lovelace");
  assert.equal(data.payload.email, "ada.search@test.invalid");
  assert.equal(data.payload.companyName, "Analytical Engines Inc");
  assert.equal(tags.includes("lead-magnet"), true);
  assert.equal(tags.includes("non-compete-checker"), true);
  assert.equal(tags.includes("client-forged-tag"), false);
  assert.equal(fieldValue(data, "role"), "Founder / CEO");
  assert.equal(fieldValue(data, "contact_title"), "Founder / CEO");
  assert.equal(fieldValue(data, "search_magnet_slug"), "colorado-non-compete-checker");
  assert.equal(fieldValue(data, "search_magnet_event"), "lead_captured");
  assert.equal(fieldValue(data, "consent_basis"), "search_magnet_consent:colorado-non-compete-checker");
  assert.equal(data.campaignRouting.triggerTag, null);
  assert.deepEqual(data.campaignRouting.emailSequence, []);
}

{
  const data = await postLead(buildSearchMagnetPayload("completed"));
  assertPreview(data);
  assert.equal(data.event, "completed");
  assert.equal(fieldValue(data, "search_magnet_event"), "completed");
  assert.equal(fieldValue(data, "search_magnet_score"), 12);
  assert.equal(fieldValue(data, "search_magnet_score_max"), 24);
  assert.equal(fieldValue(data, "search_magnet_score_percent"), 50);
  assert.equal(fieldValue(data, "search_magnet_tier"), "Material gaps");
  assert.match(fieldValue(data, "search_magnet_dimensions"), /Enforceability/);
  assert.match(fieldValue(data, "search_magnet_prioritized_actions"), /2026 threshold/);
  assert.match(fieldValue(data, "search_magnet_answers"), /"0":1/);
}

await rejectLead(
  buildSearchMagnetPayload("lead_captured", {
    contact: {
      name: "Ada Lovelace",
      email: "ada.search@test.invalid",
      company: "Analytical Engines Inc",
      role: "Founder / CEO",
      subscribe: false,
    },
  }),
  /Consent is required/,
);

await rejectLead(
  buildSearchMagnetPayload("completed", {
    searchMagnet: {
      ...buildSearchMagnetPayload("completed").searchMagnet,
      slug: "client-invented-magnet",
    },
  }),
  /search magnet route is not approved/,
);

await rejectLead(
  buildSearchMagnetPayload("completed", {
    searchMagnet: {
      ...buildSearchMagnetPayload("completed").searchMagnet,
      dimensions: undefined,
    },
  }),
  /dimension scores/,
);

for (const campaignKey of Object.keys(CAMPAIGNS)) {
  for (const subscribeMarker of [true, false, "missing"]) {
    const data = await postLead(buildPayload(campaignKey, subscribeMarker));
    assertCase(data, campaignKey, subscribeMarker);
  }
}

{
  const payload = buildPayload("ai-patent", true);
  payload.campaignKey = "client-supplied-invalid-key";
  const data = await postLead(payload);
  const tags = data.payload.tags;
  const routing = data.campaignRouting;

  assertPreview(data);
  assert.equal(fieldValue(data, "campaign_key"), "ai-compliance");
  assert.equal(routing.triggerTag, CAMPAIGNS["ai-compliance"].trigger);
  assert.equal(tags.includes(CAMPAIGNS["ai-compliance"].trigger), true);
  assert.equal(tags.includes(CAMPAIGNS["ai-patent"].trigger), false);
  assert.equal(routing.emailSequence.length, CAMPAIGNS["ai-compliance"].emailCount);
  assertNoClientWorkflowTags(tags, CAMPAIGNS["ai-compliance"].trigger);
}

for (const campaignKey of Object.keys(CAMPAIGNS)) {
  await rejectLead(
    { ...buildPayload(campaignKey, false), disclaimerAccepted: false },
    /Disclaimer acceptance is required/,
  );
  await rejectLead(
    { ...buildPayload(campaignKey, false), privacyGuardrailVersion: undefined },
    /approved privacy guardrail version/,
  );
  await rejectLead(
    { ...buildPayload(campaignKey, false), privacyGuardrailVersion: "client-bypass-v0" },
    /approved privacy guardrail version/,
  );
}

await rejectLead(
  {
    ...buildPayload("ai-patent", false),
    patent: {
      score: 99,
      stage: "Filed a provisional about customer Acme's unreleased model architecture and trade secrets",
      checks: ["human contribution documented"],
      band: "Strategy needs tightening",
    },
  },
  /Payload failed validation/,
);

await rejectLead(
  {
    ...buildPayload("ma-readiness", false),
    maReadiness: {
      score: 57,
      band: "Useful foundation with diligence gaps",
      timing: "90 days",
      categoryScores: { ip: 2, undisclosedLawsuitFacts: "confidential dispute with named buyer" },
      buyerDiligenceRiskMap: [{ category: "IP", cleanup: "Audit assignments", extra: "unexpected key" }],
      sixtyDayCleanupPlan: ["x".repeat(401)],
      answers: { ip: 2 },
      reportVersion: "test",
    },
  },
  /Payload failed validation/,
);

{
  const payload = buildPayload("tech-gc", false);
  payload.assessment.tags = ["workflow:evil", "client:arbitrary", "newsletter:ai", "leadmagnet:forged"];
  payload.techLegalHealth = {
    score: 66,
    band: "Operational legal drag",
    companyMoment: "enterprise sales motion",
    categoryScores: { contracts: 2 },
    lowestCategory: "Contracts",
    topActions: ["Standardize sales paper"],
    branchSignals: ["enterprise-readiness"],
    answers: ["contracts-basic"],
    reportVersion: "test",
  };

  const data = await postLead(payload);
  assert.equal(data.payload.tags.includes("workflow:evil"), false);
  assert.equal(data.payload.tags.includes("client:arbitrary"), false);
  assert.equal(data.payload.tags.includes("newsletter:ai"), false);
  assert.equal(data.payload.tags.includes("leadmagnet:forged"), false);
  assert.equal(data.payload.tags.includes("newsletter:not-consented"), true);
  assert.equal(customField(data, "tech_legal_health_ai_use_register_snapshot"), undefined);
  assert.equal(customField(data, "ai_recommended_offer"), undefined);
}

{
  const payload = buildPayload("tech-gc", false);
  payload.techLegalHealth = {
    score: 66,
    band: "Operational legal drag",
    companyMoment: "enterprise sales motion",
    categoryScores: { contracts: 2 },
    lowestCategory: "Data + AI",
    topActions: ["Create an AI use register"],
    branchSignals: ["signal:ai-compliance"],
    answers: ["ai-controls:1"],
    aiUseRegisterSnapshot: {
      inventory: "Scattered use, no register",
      ownerMap: "Informal owner",
      exposureCategory: "Customer data or customer-facing output",
      vendorTerms: "Some terms reviewed",
      humanReview: "Ad hoc review",
      score: 40,
      nextStep: "Create a non-confidential AI use register before vendor renewal, product launch, financing, or diligence.",
      reportVersion: "ai-use-register-snapshot-v1",
    },
    reportVersion: "test",
  };

  const data = await postLead(payload);
  assert.match(fieldValue(data, "tech_legal_health_ai_use_register_snapshot"), /ai-use-register-snapshot-v1/);
}

function buildFinalPayload(magnet_slug, answers = null, extra = {}) {
  return {
    name: "Ada Lovelace",
    email: `final-${magnet_slug}@test.invalid`,
    contact_title: "General Counsel",
    company: "Example Test Co",
    qualifying_status:
      magnet_slug === "patent-moat-scorecard"
        ? "We are preparing for fundraising, customer diligence, or an exit."
        : magnet_slug === "outside-counsel-playbook"
          ? "I want the playbook for planning."
          : "I need help with my company's AI compliance immediately.",
    permission_acknowledged: true,
    magnet_slug,
    ...(answers ? { answers } : {}),
    ...extra,
  };
}

const riskAnswers = {
  q1: 0,
  q2: 1,
  q3: 0,
  q4: 0,
  q5: 0,
  q6: 1,
  q7: 1,
  q8: 0,
  q9: 0,
  q10: 0,
  q11: 0,
  q12: 0,
};
const moatAnswers = {
  q1: 0,
  q2: 0,
  q3: 0,
  q4: 1,
  q5: 0,
  q6: 0,
  q7: 0,
  q8: 0,
  q9: 0,
  q10: 0,
  q11: 0,
  q12: 0,
  q13: 0,
  q14: 0,
  q15: 0,
};
const governanceAnswers = {
  q1: 0,
  q2: 1,
  q3: 0,
  q4: 0,
  q5: 0,
  q6: 0,
  q7: 0,
  q8: 0,
  q9: 0,
};

{
  const data = await postLead(buildFinalPayload("ai-risk-triage", riskAnswers));
  assert.equal(data.ok, true);
  assert.equal(data.magnet_slug, "ai-risk-triage");
  assert.equal(data.score, 3);
  assert.equal(data.score_max, 36);
  assert.equal(data.tier.tag, "risk-tier-foundational");
  assert.equal(data.payload.tags.includes("magnet-ai-risk-triage"), true);
  assert.equal(data.payload.tags.includes("risk-tier-foundational"), true);
  assert.equal(fieldValue(data, "last_magnet_slug"), "ai-risk-triage");
  assert.equal(fieldValue(data, "last_magnet_score"), 3);
  assert.equal(fieldValue(data, "contact_title"), "General Counsel");
  assert.equal(fieldValue(data, "risk_triage_governance_score"), 0);
  assert.equal(data.actions.length, 3);
  assert.equal(data.report.content_type, "application/pdf");
  assert.match(data.report.filename, /example-test-co-ai-risk-triage-report\.pdf/);
  assert.ok(Buffer.from(data.report.base64, "base64").toString("utf8").startsWith("%PDF-1.4"));
  assertFinalConsentCase(data, "missing");
}

{
  const data = await postLead(buildFinalPayload("patent-moat-scorecard", moatAnswers, { mode: "investor" }));
  assert.equal(data.ok, true);
  assert.equal(data.magnet_slug, "patent-moat-scorecard");
  assert.equal(data.score_max, 45);
  assert.equal(data.mode, "investor");
  assert.equal(data.payload.tags.includes("magnet-patent-moat-scorecard"), true);
  assert.equal(data.payload.tags.includes("moat-mode-investor"), true);
  assert.equal(fieldValue(data, "moat_exit_fit"), 0);
  assert.equal(data.report.content_type, "application/pdf");
  assertFinalConsentCase(data, "missing");
}

{
  const data = await postLead(buildFinalPayload("governance-plan", governanceAnswers));
  assert.equal(data.ok, true);
  assert.equal(data.magnet_slug, "governance-plan");
  assert.equal(data.tier.tag, "gov-tier-prefoundation");
  assert.equal(fieldValue(data, "gov_q1_use_policy"), 0);
  assert.equal(fieldValue(data, "gov_q9_outside_counsel"), 0);
  assert.equal(data.report.content_type, "application/pdf");
  assertFinalConsentCase(data, "missing");
}

{
  const data = await postLead(buildFinalPayload("outside-counsel-playbook"));
  assert.equal(data.ok, true);
  assert.equal(data.magnet_slug, "outside-counsel-playbook");
  assert.equal(data.payload.tags.includes("magnet-outside-counsel-playbook"), true);
  assert.equal(fieldValue(data, "last_magnet_score"), null);
  assert.equal(fieldValue(data, "last_magnet_pdf_url"), "https://learn.schellip.com/pdfs/outside-counsel-playbook.pdf");
  assertFinalConsentCase(data, "missing");
}

for (const [magnetSlug, answers, extra] of [
  ["ai-risk-triage", riskAnswers, {}],
  ["patent-moat-scorecard", moatAnswers, { mode: "founder" }],
  ["governance-plan", governanceAnswers, {}],
  ["outside-counsel-playbook", null, {}],
]) {
  for (const subscribeMarker of [true, false, "missing"]) {
    const data = await postLead(
      buildFinalPayload(magnetSlug, answers, {
        ...extra,
        ...(subscribeMarker === "missing" ? {} : { subscribe: subscribeMarker }),
      }),
    );
    assertFinalConsentCase(data, subscribeMarker);
  }
}

await rejectLead(
  buildFinalPayload("outside-counsel-playbook", { q1: 1 }),
  /does not accept assessment answers/,
);

await rejectLead(
  { ...buildFinalPayload("ai-risk-triage", riskAnswers), permission_acknowledged: false },
  /Permission acknowledgment is required/,
);

await rejectLead(
  { ...buildFinalPayload("ai-risk-triage", riskAnswers), contact_title: "" },
  /Contact title is required/,
);

console.log(
  "API guardrail behavior passed in no-token preview mode: regular and final-magnet consent routing, final magnet scoring, final tags/custom fields, download payload validation, and opt-in-only workflow/newsletter posture.",
);
