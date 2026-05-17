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

const routeSource = fs
  .readFileSync(routePath, "utf8")
  .replace(
    'import { campaigns, getCampaign } from "@/lib/campaigns";',
    `import { campaigns, getCampaign } from ${JSON.stringify(pathToFileURL(campaignsPath).href)};`,
  )
  .replace(
    'from "@/lib/magnets/finalization";',
    `from ${JSON.stringify(pathToFileURL(magnetsPath).href)};`,
  );

const tempRoutePath = path.join(os.tmpdir(), `whiteford-leads-route-${process.pid}.ts`);
fs.writeFileSync(tempRoutePath, routeSource);

delete process.env.GHL_PRIVATE_INTEGRATION_TOKEN;
delete process.env.GHL_LOCATION_ID;

const { POST } = await import(pathToFileURL(tempRoutePath).href);

fs.unlinkSync(tempRoutePath);

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
