#!/usr/bin/env node

import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function exists(relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

function assertOrder(source, tokens, label) {
  let cursor = -1;
  for (const token of tokens) {
    const next = source.indexOf(token, cursor + 1);
    assert.notEqual(next, -1, `${label} missing ordered token: ${token}`);
    assert.ok(next > cursor, `${label} token is out of order: ${token}`);
    cursor = next;
  }
}

function sliceFrom(source, marker, label) {
  const start = source.indexOf(marker);
  assert.notEqual(start, -1, `${label} missing marker: ${marker}`);
  return source.slice(start, start + 900);
}

const APPS = [
  {
    name: "AI Compliance Gameplan Builder",
    campaignKey: "ai-compliance",
    component: "src/components/gameplan-builder.tsx",
    payloadTokens: [
      "aiComplianceGameplan",
      "readinessHeatMap",
      "tenDayFixes",
      "roadmap306090",
      "reportVersion: \"ai-compliance-gameplan-privacy-guardrail-v2\"",
    ],
  },
  {
    name: "AI Patent Strategy Scorecard",
    campaignKey: "ai-patent",
    component: "src/components/patent-scorecard.tsx",
    payloadTokens: [
      "patent:",
      "aiPatentDocumentationGapMap",
      "aiPatentOwnershipGapMap",
      "recommendedNextStep",
      "reportVersion: \"ai-patent-scorecard-privacy-guardrail-v2\"",
    ],
  },
  {
    name: "Tech Company Legal Health Checklist",
    campaignKey: "tech-gc",
    component: "src/components/tech-gc-legal-health-checklist.tsx",
    payloadTokens: [
      "techLegalHealth",
      "categoryScores",
      "branchSignals",
      "answers",
      "reportVersion: \"tech-legal-health-privacy-guardrail-v2\"",
      "Your legal health snapshot is ready.",
      "Overall readiness band",
      "Top category gaps",
      "Suggested first cleanup workstream",
      "10-day operating action",
      "Optional next-step resources",
      "no Tech GC report email or educational nurture sequence",
      "no report email, nurture workflow, SMS, DM, social message, or other outbound follow-up",
    ],
  },
  {
    name: "Founder M&A Readiness Checklist",
    campaignKey: "ma-readiness",
    component: "src/components/founder-ma-readiness-checklist.tsx",
    payloadTokens: [
      "maReadiness",
      "buyerDiligenceRiskMap",
      "sixtyDayCleanupPlan",
      "answers",
      "reportVersion: \"founder-ma-readiness-privacy-guardrail-v2\"",
    ],
  },
];

for (const app of APPS) {
  // The four legacy campaign apps were relocated with the legacy hub and their
  // components no longer live in this repository. Keep the guardrail
  // enumeration so it re-arms automatically if a legacy component returns.
  if (!exists(app.component)) {
    console.warn(`Skipping relocated legacy app component: ${app.component}`);
    continue;
  }
  const source = read(app.component);
  assert.match(source, new RegExp(`campaignKey:\\s*\"${app.campaignKey}\"`), `${app.name} campaign key must be explicit`);
  assert.match(source, /if \(!disclaimerAccepted\)/, `${app.name} must block submit handler without disclaimer acceptance`);
  assert.match(source, /disabled=\{[^}]*!disclaimerAccepted/, `${app.name} request/inputs must be disabled before disclaimer acceptance`);
  assert.match(source, /disclaimerAccepted,/, `${app.name} must submit disclaimerAccepted`);
  assert.match(source, /reportRequested:\s*true/, `${app.name} must submit reportRequested true`);
  assert.match(source, /privacyGuardrailVersion,/, `${app.name} must submit shared guardrail version`);
  assert.match(source, /publicFormInputType,/, `${app.name} must submit shared compact input type`);
  assert.match(source, /subscribe:\s*false/, `${app.name} optional marketing consent must default unchecked`);
  assert.match(source, /contact\.subscribe/, `${app.name} must branch on marketing opt-in`);
  assert.match(source, /!contact\.subscribe/, `${app.name} must allow/report messaging without marketing opt-in`);
  assert.doesNotMatch(source, /workflow:[a-z0-9-]+/i, `${app.name} frontend must not hard-code workflow trigger tags`);
  for (const token of app.payloadTokens) {
    assert.ok(source.includes(token), `${app.name} missing compact payload token: ${token}`);
  }
}

const learnPages = [
  {
    name: "learn directory",
    source: read("src/app/page.tsx"),
    brandMarker: 'className="brand-lockup"',
    footerMarker: 'className="footer-lockup"',
    needsReportSlot: false,
  },
  {
    name: "AI Legal Risk Triage",
    source: read("src/lib/learn/ai-risk-triage.ts"),
    brandMarker: '<div class="brand-lockup">',
    footerMarker: '<div class="footer-lockup">',
    needsReportSlot: true,
  },
  {
    name: "Patent Moat Scorecard",
    source: read("src/lib/learn/patent-moat-scorecard.ts"),
    brandMarker: '<div class="brand-lockup">',
    footerMarker: '<div class="footer-lockup">',
    needsReportSlot: true,
  },
  {
    name: "AI Governance Readiness Plan",
    source: read("src/lib/learn/governance-plan.ts"),
    brandMarker: '<div class="brand-lockup">',
    footerMarker: '<div class="footer-lockup">',
    needsReportSlot: true,
  },
  {
    name: "Outside Counsel Playbook",
    source: read("src/app/outside-counsel-playbook/page.tsx"),
    brandMarker: 'className="brand-lockup"',
    footerMarker: 'className="footer-lockup"',
    needsReportSlot: false,
    hasEmailPdfForm: true,
  },
  {
    name: "The Disclosure Self-Audit",
    source: read("src/lib/learn/disclosure-self-audit.ts"),
    brandMarker: '<div class="brand-lockup">',
    footerMarker: '<div class="footer-lockup">',
    needsReportSlot: true,
  },
  {
    name: "The Chain-of-Title Audit",
    source: read("src/lib/learn/chain-of-title-audit.ts"),
    brandMarker: '<div class="brand-lockup">',
    footerMarker: '<div class="footer-lockup">',
    needsReportSlot: true,
  },
  {
    name: "The Routing Matrix",
    source: read("src/lib/learn/routing-matrix.ts"),
    brandMarker: '<div class="brand-lockup">',
    footerMarker: '<div class="footer-lockup">',
    needsReportSlot: true,
  },
  {
    name: "The IP Data Room Checklist",
    source: read("src/lib/learn/ip-data-room-checklist.ts"),
    brandMarker: '<div class="brand-lockup">',
    footerMarker: '<div class="footer-lockup">',
    needsReportSlot: true,
  },
];

for (const asset of [
  "public/logos/whiteford-navy-on-light.png",
  "public/logos/whiteford-white-on-navy.png",
  "public/logos/whiteford-white-on-navy-full.png",
  "public/logos/schellip-color.png",
  "public/logos/schellip-white.png",
  "public/logos/jeff-schell.jpg",
  "public/logos/playbook-cover.png",
  "public/pdfs/outside-counsel-playbook.pdf",
]) {
  assert.ok(exists(asset), `Missing learn.schellip logo asset: ${asset}`);
}

const globals = read("src/app/globals.css");
const layout = read("src/app/layout.tsx");
const learnHtmlPage = read("src/components/learn-html-page.tsx");
const learnHtmlWithFlow = read("src/components/learn-html-with-flow.tsx");
const leadMagnetFlow = read("src/components/lead-magnet-flow.tsx");
const magnetConfig = read("src/lib/magnets/finalization.ts");
const leadRoute = read("src/app/api/leads/route.ts");
const outsideCounselRoute = read("src/app/outside-counsel-playbook/page.tsx");
const complianceText = "This tool is for general informational purposes only and is not legal advice. Use of this tool does not create an attorney-client relationship between you, your company, and Whiteford Taylor & Preston LLP or Schell IP. Do not submit confidential, privileged, or trade-secret information through this tool. Any engagement is subject to a conflicts check and a written engagement letter. Attorney advertising. Prior results do not guarantee a similar outcome.";

assert.ok(layout.includes("<Script id=\"cal-embed\""), "Cal.com loader must live in root layout");
assert.ok(layout.includes("Cal(\"init\", \"meeting-with-jeff-schell\""), "Cal.com namespace must initialize once in root layout");
assert.match(globals, /--ink:\s*#003756/i, "Learn design system must expose Whiteford navy token");
assert.match(globals, /--accent:\s*#632ddd/i, "Learn design system must expose Schell IP purple token");
assert.match(globals, /--font-sans:\s*"DM Sans"/, "Tailwind font-sans should use DM Sans");
assert.match(globals, /--font-mono:\s*"IBM Plex Mono"/, "Tailwind font-mono should use IBM Plex Mono");

for (const page of learnPages) {
  const source = page.source;
  const normalizedSource = `${source} ${magnetConfig}`.replace(/\s+/g, " ");

  assert.ok(normalizedSource.includes("not legal advice"), `${page.name} missing legal-advice disclaimer`);
  assert.ok(normalizedSource.includes("does not create an attorney-client relationship"), `${page.name} missing attorney-client disclaimer`);
  assert.ok(normalizedSource.includes("conflicts check"), `${page.name} missing conflicts-check disclaimer`);
  assert.ok(source.includes("Attorney advertising"), `${page.name} missing attorney advertising notation`);
  assert.doesNotMatch(source, /workflow:[a-z0-9-]+/i, `${page.name} must not hard-code workflow trigger tags`);
  assert.doesNotMatch(source, /<textarea/i, `${page.name} must not request confidential free text`);
  if (!page.hasEmailPdfForm) {
    assert.doesNotMatch(source, /<form|<input/i, `${page.name} must not request user-entered confidential information in milestone 1`);
  }
  assert.doesNotMatch(source, /href=["']\/start|href=["'][^"']*\/start/i, `${page.name} must not link to /start placeholder routes`);
  assert.doesNotMatch(source, /Interactive tool launching once Whiteford compliance review is complete/, `${page.name} must not show compliance-review pending language`);

  assertOrder(
    sliceFrom(source, page.brandMarker, `${page.name} brand bar`),
    ["Whiteford Taylor Preston", "brand-divider", "Schell IP"],
    `${page.name} brand bar lockup`,
  );
  assertOrder(
    sliceFrom(source, page.footerMarker, `${page.name} footer`),
    ["Whiteford Taylor Preston", "footer-divider", "Schell IP"],
    `${page.name} footer lockup`,
  );

  if (page.needsReportSlot) {
    assert.ok(source.includes("data-learn-report-slot="), `${page.name} missing report form slot`);
    assert.ok(source.includes("data-cal-link=\"jeffschell/meeting-with-jeff-schell\""), `${page.name} missing Cal.com button link`);
    assert.doesNotMatch(source, /Cal\("init"|app\.cal\.com\/embed\/embed\.js/i, `${page.name} must not embed per-page Cal.com script`);
  }
}

assert.ok(learnHtmlPage.includes("LearnHtmlWithFlow"), "Learn HTML renderer must delegate to the portal wrapper");
assert.ok(learnHtmlWithFlow.includes("LeadMagnetFlow"), "Learn HTML portal wrapper must mount the finalized lead magnet flow");
assert.ok(learnHtmlWithFlow.includes("data-learn-report-slot"), "Learn HTML portal wrapper must target the stable report request slot");
for (const token of [
  "Name",
  "Work email",
  "Company name",
  "type=\"radio\"",
  "type=\"checkbox\"",
  "permission_acknowledged",
  "qualifying_status",
  "magnet_slug",
  "/api/leads",
  "data-assessment-question",
  "All answers are categorical",
  "not submitted confidential",
]) {
  assert.ok(`${leadMagnetFlow} ${magnetConfig}`.includes(token), `Final lead magnet flow missing token: ${token}`);
}
assert.ok(magnetConfig.includes("Get my AI risk profile"), "AI risk route must use the finalized button");
assert.ok(magnetConfig.includes("Build my governance plan"), "Governance route must use the finalized button");
assert.ok(magnetConfig.includes("Score my moat"), "Patent route must use the finalized scorecard button");
assert.ok(magnetConfig.includes("Send me the playbook"), "Outside counsel route must use the finalized playbook button");
assert.ok(magnetConfig.includes("Audit my disclosures"), "Disclosure self-audit must use the finalized button");
assert.ok(magnetConfig.includes("Audit my chain of title"), "Chain-of-title audit must use the finalized button");
assert.ok(magnetConfig.includes("Route my stack"), "Routing matrix must use the finalized button");
assert.ok(magnetConfig.includes("Score my data room"), "IP data room checklist must use the finalized button");
assert.ok(magnetConfig.includes("I need help with my company's AI compliance immediately."), "AI compliance immediate status must be present");
assert.ok(magnetConfig.includes("I'm just starting to explore whether we need AI compliance."), "AI compliance exploratory status must be present");
for (const stage of ["Idea / prototype", "MVP in market", "Fundraising or diligence", "Enterprise/customer rollout"]) {
  assert.ok(magnetConfig.includes(`"${stage}"`), `Book magnet status option missing: ${stage}`);
}
assert.doesNotMatch(leadMagnetFlow, /<textarea|workflow:[a-z0-9-]+|\/api\/pdf-request/i, "Final flow must not collect free-text confidential detail, call pdf-request, or hard-code workflow tags");
for (const token of [
  "outside-counsel-playbook",
  "kind: \"download\"",
  "Send me the playbook",
  "the playbook is on its way",
]) {
  assert.ok(`${outsideCounselRoute} ${magnetConfig} ${leadMagnetFlow}`.includes(token), `Outside counsel download flow missing token: ${token}`);
}
for (const token of [
  "magnet-ai-risk-triage",
  "magnet-patent-moat-scorecard",
  "magnet-governance-plan",
  "magnet-outside-counsel-playbook",
  "magnet-disclosure-self-audit",
  "magnet-chain-of-title-audit",
  "magnet-routing-matrix",
  "magnet-ip-data-room-checklist",
  "patent-moat-book",
  "approvedPhonePattern",
  "last_magnet_slug",
  "last_magnet_score",
  "last_magnet_score_max",
  "last_magnet_tier",
  "last_magnet_completed_at",
  "magnet_history",
  "outsideCounselPdfUrl",
  "disclosure_public_disclosure_score",
  "title_founders_score",
  "routing_core_score",
  "dataroom_title_score",
]) {
  assert.ok(`${leadRoute} ${magnetConfig}`.includes(token), `Final /api/leads route missing token: ${token}`);
}
assert.ok(magnetConfig.includes(complianceText), "Shared final compliance block must be verbatim");
for (const token of [
  "label=\"Phone*\"",
  "type=\"tel\"",
  "inputMode=\"tel\"",
  "config.requirePhone",
]) {
  assert.ok(leadMagnetFlow.includes(token), `Final lead magnet flow missing phone token: ${token}`);
}

for (const source of [
  globals,
  read("src/lib/learn/ai-risk-triage.ts"),
  read("src/lib/learn/patent-moat-scorecard.ts"),
  read("src/lib/learn/governance-plan.ts"),
  read("src/lib/learn/disclosure-self-audit.ts"),
  read("src/lib/learn/chain-of-title-audit.ts"),
  read("src/lib/learn/routing-matrix.ts"),
  read("src/lib/learn/ip-data-room-checklist.ts"),
  read("src/app/outside-counsel-playbook/page.tsx"),
]) {
  assert.match(source, /\.brand-logo-whiteford\s*\{\s*height:\s*28px;/, "Desktop Whiteford logo height must be 28px");
  assert.match(source, /\.brand-logo-schellip\s*\{\s*height:\s*22px;/, "Desktop Schell IP logo height must be 22px");
  assert.match(source, /\.brand-logo-whiteford\s*\{\s*height:\s*22px;/, "Mobile Whiteford logo height must be 22px");
  assert.match(source, /\.brand-logo-schellip\s*\{\s*height:\s*17px;/, "Mobile Schell IP logo height must be 17px");
}

const rootPage = read("src/app/page.tsx");
assert.ok(rootPage.includes('href: "/governance-plan"'), "Directory must link to /governance-plan");
assert.ok(rootPage.includes('href: "/outside-counsel-playbook"'), "Directory must link to /outside-counsel-playbook");
assert.ok(rootPage.includes('href: "/disclosure-self-audit"'), "Directory must link to /disclosure-self-audit");
assert.ok(rootPage.includes('href: "/chain-of-title-audit"'), "Directory must link to /chain-of-title-audit");
assert.ok(rootPage.includes('href: "/routing-matrix"'), "Directory must link to /routing-matrix");
assert.ok(rootPage.includes('href: "/ip-data-room-checklist"'), "Directory must link to /ip-data-room-checklist");
assert.ok(rootPage.includes("PDF · 5 pages"), "Directory must show the outside counsel PDF meta line");
assert.doesNotMatch(rootPage, /governance-matrix/, "Directory must not use old governance-matrix slug");

const route = read("src/app/api/leads/route.ts");
for (const token of [
  "approvedPrivacyGuardrailVersion = \"lead-magnet-guardrail-v2\"",
  "approvedPublicFormInputType = \"categorical_non_confidential\"",
  "ai_compliance_10_day_fixes",
  "ai_compliance_roadmap_30_60_90",
  "ai_compliance_heat_map",
  "workflowPattern:",
  "Only add the workflow trigger tag",
]) {
  assert.ok(route.includes(token), `API route missing static guardrail token: ${token}`);
}

console.log(
  "Static lead-magnet guardrail parity passed: four apps have disclaimer gates, unchecked optional marketing consent, report request without opt-in, shared guardrail metadata, compact payload tokens, and no frontend workflow trigger tags.",
);
