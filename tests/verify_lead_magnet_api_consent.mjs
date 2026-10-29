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
const agentmailPath = path.join(root, "src/lib/email/agentmail.ts");
const reportEmailPath = path.join(root, "src/lib/email/assessment-report.ts");
const emailCodePath = path.join(root, "src/lib/verify/email-code.ts");
const verificationEmailPath = path.join(root, "src/lib/email/verification-code.ts");
const verifyRoutePath = path.join(root, "src/app/api/verify-email/route.ts");
process.env.LEAD_VERIFY_SECRET = "test-secret-for-guardrail-tests";

// The report-email module imports finalization via the "@/" alias; point it at the real file.
const tempReportEmailPath = path.join(os.tmpdir(), `whiteford-report-email-${process.pid}.ts`);
fs.writeFileSync(
  tempReportEmailPath,
  fs
    .readFileSync(reportEmailPath, "utf8")
    .replace('from "@/lib/magnets/finalization";', `from ${JSON.stringify(pathToFileURL(magnetsPath).href)};`),
);

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
  .replace('from "@/lib/email/agentmail";', `from ${JSON.stringify(pathToFileURL(agentmailPath).href)};`)
  .replace('from "@/lib/email/assessment-report";', `from ${JSON.stringify(pathToFileURL(tempReportEmailPath).href)};`)
  .replace('from "@/lib/founders/store";', `from ${JSON.stringify(pathToFileURL(path.join(root, "src/lib/founders/store.ts")).href)};`)
  .replace('from "@/lib/verify/email-code";', `from ${JSON.stringify(pathToFileURL(emailCodePath).href)};`);

const tempVerifyRoutePath = path.join(os.tmpdir(), `whiteford-verify-route-${process.pid}.ts`);
fs.writeFileSync(
  tempVerifyRoutePath,
  fs
    .readFileSync(verifyRoutePath, "utf8")
    .replace('from "@/lib/email/agentmail";', `from ${JSON.stringify(pathToFileURL(agentmailPath).href)};`)
    .replace('from "@/lib/email/verification-code";', `from ${JSON.stringify(pathToFileURL(verificationEmailPath).href)};`)
    .replace('from "@/lib/magnets/finalization";', `from ${JSON.stringify(pathToFileURL(magnetsPath).href)};`)
    .replace('from "@/lib/verify/email-code";', `from ${JSON.stringify(pathToFileURL(emailCodePath).href)};`),
);

const tempRoutePath = path.join(os.tmpdir(), `whiteford-leads-route-${process.pid}.ts`);
fs.writeFileSync(tempRoutePath, routeSource);

delete process.env.GHL_PRIVATE_INTEGRATION_TOKEN;
delete process.env.GHL_LOCATION_ID;
delete process.env.AGENTMAIL_API_KEY;
delete process.env.RESOURCE_AGENTMAIL_API_KEY;
delete process.env.AGENTMAIL_INBOX_ID;

const { POST } = await import(pathToFileURL(tempRoutePath).href);
const { POST: VERIFY_POST } = await import(pathToFileURL(tempVerifyRoutePath).href);
const { createChallenge, checkCode } = await import(pathToFileURL(emailCodePath).href);

fs.unlinkSync(tempRoutePath);
fs.unlinkSync(tempReportEmailPath);
fs.unlinkSync(tempVerifyRoutePath);

async function verify(body) {
  const response = await VERIFY_POST(new Request("http://localhost/api/verify-email", { method: "POST", body: JSON.stringify(body) }));
  return { status: response.status, data: await response.json() };
}

function tokenFor(email, slug = "sale-readiness-audit") {
  const { code, challenge } = createChallenge(email, slug);
  const result = checkCode(challenge, code);
  assert.equal(result.ok, true);
  return result.token;
}

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
  assert.equal(customField(data, "ai_recommended_offer"), undefined);
}

function buildFinalPayload(magnet_slug, answers = null, extra = {}) {
  return {
    name: "Ada Lovelace",
    email: `final-${magnet_slug}@test.invalid`,
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
  assert.equal(fieldValue(data, "risk_triage_governance_score"), 0);
  assert.equal(data.actions.length, 3);
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
}

{
  const data = await postLead(buildFinalPayload("governance-plan", governanceAnswers));
  assert.equal(data.ok, true);
  assert.equal(data.magnet_slug, "governance-plan");
  assert.equal(data.tier.tag, "gov-tier-prefoundation");
  assert.equal(fieldValue(data, "gov_q1_use_policy"), 0);
  assert.equal(fieldValue(data, "gov_q9_outside_counsel"), 0);
}

{
  const data = await postLead(buildFinalPayload("outside-counsel-playbook"));
  assert.equal(data.ok, true);
  assert.equal(data.magnet_slug, "outside-counsel-playbook");
  assert.equal(data.payload.tags.includes("magnet-outside-counsel-playbook"), true);
  assert.equal(fieldValue(data, "last_magnet_score"), null);
  assert.equal(fieldValue(data, "last_magnet_pdf_url"), "https://learn.schellip.com/pdfs/outside-counsel-playbook.pdf");
}

const saleAnswers = {
  q1: 1, q2: 3, q3: 2, q4: 2, q5: 2, q6: 1, q7: 1, q8: 2, q9: 2, q10: 2, q11: 3, q12: 1, q13: 2, q14: 3, q15: 1,
};
const saleProfile = {
  role: "Founder / CEO",
  industry: "Software / SaaS",
  revenue: "$5M to $20M",
  employees: "11 to 50",
  hq: "Colorado",
  phone: "303-555-0100",
  website: "example.test",
};

{
  const data = await postLead({
    ...buildFinalPayload("sale-readiness-audit", saleAnswers),
    qualifying_status: "Exploring a sale in the next 12 months.",
    profile: saleProfile,
    follow_up_requested: true,
    verification_token: tokenFor("final-sale-readiness-audit@test.invalid"),
  });
  assert.equal(data.ok, true);
  assert.equal(data.magnet_slug, "sale-readiness-audit");
  assert.equal(data.score, 28);
  assert.equal(data.score_max, 45);
  assert.equal(data.tier.tag, "sale-tier-fixable-gaps");
  assert.equal(data.email_delivery, "preview");
  assert.equal(data.email_preview.to, "final-sale-readiness-audit@test.invalid");
  assert.match(data.email_preview.subject, /28\/45/);
  assert.equal(data.sale_opportunity, "preview");
  assert.equal(data.payload.phone, "303-555-0100");
  assert.equal(data.payload.website, "https://example.test");
  for (const tag of [
    "magnet-sale-readiness-audit",
    "sale-tier-fixable-gaps",
    "interest:ma-readiness",
    "sale-interest:sale-0-12-months",
    "follow-up-requested",
    "newsletter:colorado-deal-report",
  ]) {
    assert.equal(data.payload.tags.includes(tag), true, `missing tag ${tag}`);
  }
  assert.equal(data.payload.tags.includes("newsletter:ai"), false);
  assert.equal(fieldValue(data, "sale_interest_code"), "sale-0-12-months");
  assert.equal(fieldValue(data, "company_revenue_band"), "$5M to $20M");
  assert.equal(fieldValue(data, "company_hq_region"), "Colorado");
  assert.equal(fieldValue(data, "sale_ready_ip_ownership"), 6);
  assert.equal(fieldValue(data, "last_magnet_email_status"), "agentmail:preview");
}

{
  const data = await postLead({
    ...buildFinalPayload("sale-readiness-audit", saleAnswers),
    qualifying_status: "No sale planned; I want to know where we stand.",
    profile: { ...saleProfile, phone: "" },
    verification_token: tokenFor("final-sale-readiness-audit@test.invalid"),
  });
  assert.equal(data.sale_opportunity, undefined);
  assert.equal(data.payload.tags.includes("sale-interest:no-sale-planned"), true);
  assert.equal(data.payload.tags.includes("follow-up-requested"), false);
}

await rejectLead(
  {
    ...buildFinalPayload("sale-readiness-audit", saleAnswers),
    qualifying_status: "Exploring a sale in the next 12 months.",
    profile: saleProfile,
  },
  /verify your email/,
);

await rejectLead(
  {
    ...buildFinalPayload("sale-readiness-audit", saleAnswers),
    qualifying_status: "Exploring a sale in the next 12 months.",
    profile: saleProfile,
    verification_token: tokenFor("someone-else@test.invalid"),
  },
  /verify your email/,
);

await rejectLead(
  {
    ...buildFinalPayload("sale-readiness-audit", saleAnswers),
    qualifying_status: "Exploring a sale in the next 12 months.",
    profile: { ...saleProfile, website: "" },
    verification_token: tokenFor("final-sale-readiness-audit@test.invalid"),
  },
  /Company website is required/,
);

await rejectLead(
  {
    ...buildFinalPayload("sale-readiness-audit", saleAnswers),
    qualifying_status: "Exploring a sale in the next 12 months.",
    verification_token: tokenFor("final-sale-readiness-audit@test.invalid"),
  },
  /Company profile must use the approved fields/,
);

// Email verification round trip through /api/verify-email (preview mode: no AgentMail key).
{
  const start = await verify({ action: "start", magnet_slug: "sale-readiness-audit", email: "Gate@Test.invalid", name: "Ada" });
  assert.equal(start.status, 200);
  assert.equal(start.data.delivery, "preview");
  assert.match(start.data.dev_code, /^\d{6}$/);

  const again = await verify({ action: "start", magnet_slug: "sale-readiness-audit", email: "gate@test.invalid", name: "Ada" });
  assert.equal(again.status, 429, "a second code within 30 seconds is refused");

  const wrong = await verify({ action: "check", magnet_slug: "sale-readiness-audit", challenge: start.data.challenge, code: start.data.dev_code === "000000" ? "111111" : "000000" });
  assert.equal(wrong.status, 400);

  const right = await verify({ action: "check", magnet_slug: "sale-readiness-audit", challenge: start.data.challenge, code: start.data.dev_code });
  assert.equal(right.status, 200);
  assert.equal(right.data.email, "gate@test.invalid");

  const data = await postLead({
    ...buildFinalPayload("sale-readiness-audit", saleAnswers),
    email: "gate@test.invalid",
    qualifying_status: "Raising capital or preparing for investor diligence.",
    profile: saleProfile,
    verification_token: right.data.token,
  });
  assert.equal(data.ok, true);

  const tampered = await verify({ action: "check", magnet_slug: "sale-readiness-audit", challenge: start.data.challenge.replace(/^./, "x"), code: start.data.dev_code });
  assert.equal(tampered.status, 400);

  const notGated = await verify({ action: "start", magnet_slug: "ai-risk-triage", email: "a@test.invalid", name: "Ada" });
  assert.equal(notGated.status, 400);
}

// Five wrong codes lock the challenge.
{
  const { challenge, code } = createChallenge("lock@test.invalid", "sale-readiness-audit");
  const bad = code === "000000" ? "111111" : "000000";
  for (let i = 0; i < 5; i += 1) assert.equal(checkCode(challenge, bad).ok, false);
  const locked = checkCode(challenge, code);
  assert.equal(locked.ok, false);
  assert.match(locked.error, /Too many attempts/);
}

await rejectLead(
  {
    ...buildFinalPayload("sale-readiness-audit", saleAnswers),
    qualifying_status: "Exploring a sale in the next 12 months.",
    profile: { ...saleProfile, revenue: "$3 billion" },
    verification_token: tokenFor("final-sale-readiness-audit@test.invalid"),
  },
  /approved option/,
);

await rejectLead(
  { ...buildFinalPayload("ai-risk-triage", riskAnswers), profile: saleProfile },
  /does not accept a company profile/,
);

await rejectLead(
  buildFinalPayload("outside-counsel-playbook", { q1: 1 }),
  /does not accept assessment answers/,
);

await rejectLead(
  { ...buildFinalPayload("ai-risk-triage", riskAnswers), permission_acknowledged: false },
  /Permission acknowledgment is required/,
);

console.log(
  "API guardrail behavior passed in no-token preview mode: legacy consent routing, final magnet scoring, final tags/custom fields, download payload validation, and opt-in-only legacy workflows.",
);
