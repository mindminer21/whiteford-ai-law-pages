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
      "aiUseRegisterSnapshot",
      "AI Use Register Snapshot",
      "Use case + owner",
      "Data + decision exposure",
      "Vendor/IP/contract terms",
      "Human review + evidence trail",
      "ai-use-register-snapshot-v1",
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
  {
    name: "Investor Outreach Kanban",
    campaignKey: "investor-outreach",
    component: "src/components/investor-outreach-kanban.tsx",
    confirmationFlow: true,
    payloadTokens: [
      "investorOutreach",
      "phase: \"contact\"",
      "phase: \"confirm\"",
      "phase: \"plan\"",
      "confirmationToken",
      "emailConfirmed: true",
      "targetRound",
      "investorCategories",
      "investorRegions",
      "introSources",
      "portfolioResearchQueue",
      "portfolioMatches",
      "portfolioEnrichmentVersion",
      "CEO portfolio research",
      "Verified matches",
      "kanbanStageCounts",
      "reportVersion",
      "investor-outreach-kanban-privacy-guardrail-v1",
      "Start building my customized investor outreach plan.",
      "Check your email.",
      "Customizing and populating your investor list.",
      "suggestedIntroSources",
      "Is your IP appropriately positioned to reach out to investors?",
      "https://cal.com/jeffschell/talktoapatentlawyer?overlayCalendar=true",
    ],
  },
];

for (const app of APPS) {
  const source = read(app.component);
  assert.match(source, new RegExp(`campaignKey:\\s*\"${app.campaignKey}\"`), `${app.name} campaign key must be explicit`);
  if (app.confirmationFlow) {
    assert.doesNotMatch(source, /if \(!disclaimerAccepted\)|disabled=\{[^}]*!disclaimerAccepted|disclaimerAccepted,/, `${app.name} must not use the initial legal checkbox gate`);
    assert.doesNotMatch(source, /Introduction sources you can activate/, `${app.name} must not collect introduction-source inputs`);
    assert.doesNotMatch(source, /No opt-in selected/, `${app.name} must not present the old no-opt-in board-only copy`);
    assert.doesNotMatch(source, /HighLevel will send/, `${app.name} must not identify HighLevel as the confirmation email sender`);
    assert.match(source, /reportRequested:\s*true/, `${app.name} plan phase must submit reportRequested true`);
    assert.match(source, /privacyGuardrailVersion,/, `${app.name} plan phase must submit shared guardrail version`);
    assert.match(source, /publicFormInputType,/, `${app.name} plan phase must submit shared compact input type`);
    assert.match(source, /subscribe:\s*false/, `${app.name} must explicitly avoid marketing consent in contact and plan payloads`);
  } else {
    assert.match(source, /if \(!disclaimerAccepted\)/, `${app.name} must block submit handler without disclaimer acceptance`);
    assert.match(source, /disabled=\{[^}]*!disclaimerAccepted/, `${app.name} request/inputs must be disabled before disclaimer acceptance`);
    assert.match(source, /disclaimerAccepted,/, `${app.name} must submit disclaimerAccepted`);
    assert.match(source, /reportRequested:\s*true/, `${app.name} must submit reportRequested true`);
    assert.match(source, /privacyGuardrailVersion,/, `${app.name} must submit shared guardrail version`);
    assert.match(source, /publicFormInputType,/, `${app.name} must submit shared compact input type`);
    assert.match(source, /subscribe:\s*false/, `${app.name} optional marketing consent must default unchecked`);
    assert.match(source, /contact\.subscribe/, `${app.name} must branch on marketing opt-in`);
    assert.match(source, /!contact\.subscribe/, `${app.name} must allow/report messaging without marketing opt-in`);
  }
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
  },
  {
    name: "AI Legal Risk Triage",
    source: read("src/lib/learn/ai-risk-triage.ts"),
    brandMarker: '<div class="brand-lockup">',
    footerMarker: '<div class="footer-lockup">',
    startHref: "/ai-risk-triage/start",
  },
  {
    name: "Patent Moat Scorecard",
    source: read("src/lib/learn/patent-moat-scorecard.ts"),
    brandMarker: '<div class="brand-lockup">',
    footerMarker: '<div class="footer-lockup">',
    startHref: "/patent-moat-scorecard/start",
  },
  {
    name: "AI Governance Readiness Plan",
    source: read("src/lib/learn/governance-plan.ts"),
    brandMarker: '<div class="brand-lockup">',
    footerMarker: '<div class="footer-lockup">',
    startHref: "/governance-plan/start",
  },
  {
    name: "Outside Counsel Playbook",
    source: read("src/app/outside-counsel-playbook/page.tsx"),
    brandMarker: 'className="brand-lockup"',
    footerMarker: 'className="footer-lockup"',
    startHref: "/outside-counsel-playbook/start",
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
const rootPage = read("src/app/page.tsx");
const learnHtmlPage = read("src/components/learn-html-page.tsx");
const leadMagnetStartPage = read("src/components/lead-magnet-start-page.tsx");
const leadMagnetFlow = read("src/components/lead-magnet-flow.tsx");
const searchMagnetFlow = read("src/components/search-magnet-flow.tsx");
const searchMagnetConfig = read("src/lib/search-magnets/configs.ts");
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
  assert.doesNotMatch(source, /<form|<input/i, `${page.name} landing page must not request user-entered confidential information`);
  assert.doesNotMatch(source, /data-learn-report-slot=/, `${page.name} landing page must not embed the lead magnet form`);
  assert.doesNotMatch(source, /href=["']#start/i, `${page.name} CTA must not scroll to an embedded form`);
  if (page.startHref) {
    assert.ok(source.includes(`href="${page.startHref}"`) || source.includes(`href={\"${page.startHref}\"}`), `${page.name} must link CTA to ${page.startHref}`);
  }
  assert.doesNotMatch(source, /href=["']\/start["']/i, `${page.name} must not link to the old generic /start placeholder route`);
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
  assert.doesNotMatch(source, /Cal\("init"|app\.cal\.com\/embed\/embed\.js/i, `${page.name} must not embed per-page Cal.com script`);
}

assert.ok(learnHtmlPage.includes("content.markup"), "Learn HTML renderer must keep the Claude markup server-rendered");
assert.doesNotMatch(learnHtmlPage, /LeadMagnetFlow|LearnFlowPortal|data-learn-report-slot/, "Learn landing renderer must not mount forms into landing pages");
assert.ok(leadMagnetStartPage.includes("LeadMagnetFlow"), "Standalone start page shell must mount the finalized lead magnet flow");
assert.ok(leadMagnetStartPage.includes("learn-start-page"), "Standalone start page shell must use the start-page visual system");
for (const route of [
  ["src/app/ai-risk-triage/start/page.tsx", "ai-risk-triage", "/ai-risk-triage"],
  ["src/app/patent-moat-scorecard/start/page.tsx", "patent-moat-scorecard", "/patent-moat-scorecard"],
  ["src/app/governance-plan/start/page.tsx", "governance-plan", "/governance-plan"],
  ["src/app/outside-counsel-playbook/start/page.tsx", "outside-counsel-playbook", "/outside-counsel-playbook"],
]) {
  const [file, slug, backHref] = route;
  assert.ok(exists(file), `Standalone start route missing: ${file}`);
  const source = read(file);
  assert.ok(source.includes("LeadMagnetStartPage"), `${file} must render the standalone start-page shell`);
  assert.ok(source.includes(`magnetConfigs["${slug}"]`), `${file} must use the correct magnet config`);
  assert.ok(source.includes(`backHref="${backHref}"`), `${file} must link back to its landing page`);
  assert.ok(source.includes("robots: { index: false, follow: false }"), `${file} must noindex the form-only page`);
}
for (const route of [
  "src/app/investor-outreach-kanban/start/page.tsx",
  "src/app/investor-outreach-kanban/check-email/page.tsx",
  "src/app/investor-outreach-kanban/confirm/page.tsx",
  "src/app/investor-outreach-kanban/round/page.tsx",
  "src/app/investor-outreach-kanban/categories/page.tsx",
  "src/app/investor-outreach-kanban/markets/page.tsx",
  "src/app/investor-outreach-kanban/stage/page.tsx",
  "src/app/investor-outreach-kanban/data-room/page.tsx",
  "src/app/investor-outreach-kanban/customizing/page.tsx",
  "src/app/investor-outreach-kanban/board/page.tsx",
]) {
  assert.ok(exists(route), `Investor outreach sequential route missing: ${route}`);
  assert.ok(read(route).includes("InvestorOutreachKanban"), `${route} must render the investor outreach flow component`);
  assert.ok(read(route).includes("robots: { index: false, follow: false }"), `${route} must noindex the sequential flow page`);
}

for (const route of [
  "colorado-non-compete-checker",
  "trademark-brand-precheck",
  "patent-readiness",
  "sale-readiness-audit",
]) {
  const pagePath = `src/app/${route}/page.tsx`;
  assert.ok(exists(pagePath), `Search-demand magnet route missing: ${pagePath}`);
  const source = read(pagePath);
  assert.ok(source.includes("SearchMagnetFlow"), `${pagePath} must render the shared search magnet flow`);
  assert.ok(source.includes(`const slug = "${route}"`), `${pagePath} must use the correct route slug`);
  assert.ok(searchMagnetConfig.includes(`"${route}"`), `${route} must exist in the source-of-truth config port`);
  assert.ok(rootPage.includes(`href: "/${route}"`), `Directory must link to /${route}`);
}

for (const token of [
  "MAGNET_CONFIG",
  "colorado-non-compete-checker",
  "trademark-brand-precheck",
  "patent-readiness",
  "sale-readiness-audit",
  "lead-magnet",
  "non-compete-checker",
  "trademark-precheck",
  "patent-readiness",
  "sale-readiness",
  "This tool is for general informational purposes only and is not legal advice",
  "not a trademark clearance opinion",
  "not a patentability opinion",
  "Attorney advertising",
]) {
  assert.ok(searchMagnetConfig.includes(token), `Search magnet config missing source token: ${token}`);
}

for (const token of [
  "view === \"capture\"",
  "lead_captured",
  "completed",
  "config.consentText",
  "validEmail",
  "scoreSearchMagnet",
  "dimensionBarTone",
  "config.resultDisclaimer",
  "https://cal.com/jeffschell/talktoapatentlawyer",
  "A copy of this summary is queued",
]) {
  assert.ok(searchMagnetFlow.includes(token), `Search magnet flow missing token: ${token}`);
}

for (const token of [
  "Name",
  "Work email",
  "Title",
  "Company name",
  "type=\"radio\"",
  "type=\"checkbox\"",
  "permission_acknowledged",
  "contact_title",
  "qualifying_status",
  "magnet_slug",
  "/api/leads",
  "data-assessment-question",
  "All answers are categorical",
  "not submitted confidential",
  "Start questionnaire",
  "Next question",
  "Download customized PDF report",
]) {
  assert.ok(`${leadMagnetFlow} ${magnetConfig}`.includes(token), `Final lead magnet flow missing token: ${token}`);
}
assert.ok(magnetConfig.includes("Get my AI risk profile"), "AI risk route must use the finalized button");
assert.ok(magnetConfig.includes("Build my governance plan"), "Governance route must use the finalized button");
assert.ok(magnetConfig.includes("Score my moat"), "Patent route must use the finalized scorecard button");
assert.ok(magnetConfig.includes("Send me the playbook"), "Outside counsel route must use the finalized playbook button");
assert.ok(magnetConfig.includes("I need help with my company's AI compliance immediately."), "AI compliance immediate status must be present");
assert.ok(magnetConfig.includes("I'm just starting to explore whether we need AI compliance."), "AI compliance exploratory status must be present");
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
  "last_magnet_slug",
  "last_magnet_score",
  "last_magnet_score_max",
  "last_magnet_tier",
  "last_magnet_completed_at",
  "magnet_history",
  "outsideCounselPdfUrl",
  "generateAssessmentReportPdf",
  "contact_title",
]) {
  assert.ok(`${leadRoute} ${magnetConfig}`.includes(token), `Final /api/leads route missing token: ${token}`);
}
assert.ok(magnetConfig.includes(complianceText), "Shared final compliance block must be verbatim");

for (const source of [
  globals,
  read("src/lib/learn/ai-risk-triage.ts"),
  read("src/lib/learn/patent-moat-scorecard.ts"),
  read("src/lib/learn/governance-plan.ts"),
  read("src/app/outside-counsel-playbook/page.tsx"),
]) {
  assert.match(source, /\.brand-logo-whiteford\s*\{\s*height:\s*28px;/, "Desktop Whiteford logo height must be 28px");
  assert.match(source, /\.brand-logo-schellip\s*\{\s*height:\s*22px;/, "Desktop Schell IP logo height must be 22px");
  assert.match(source, /\.brand-logo-whiteford\s*\{\s*height:\s*22px;/, "Mobile Whiteford logo height must be 22px");
  assert.match(source, /\.brand-logo-schellip\s*\{\s*height:\s*17px;/, "Mobile Schell IP logo height must be 17px");
}

assert.ok(rootPage.includes('href: "/governance-plan"'), "Directory must link to /governance-plan");
assert.ok(rootPage.includes('href: "/outside-counsel-playbook"'), "Directory must link to /outside-counsel-playbook");
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
  "sendInvestorOutreachConfirmationEmail",
  "RESEND_API_KEY",
  "highLevelContactUpsert",
  "contact_title",
  "investor_outreach_confirmation_sender",
  "app_resend",
  "investor_outreach_portfolio_research_queue",
  "investor_outreach_portfolio_matches",
  "investor_outreach_portfolio_match_count",
  "investor_outreach_portfolio_enrichment_version",
  "Email confirmation is required before requesting the investor outreach board.",
  "handleSearchMagnetSubmission",
  "validateSearchMagnetPayload",
  "search_magnet_event",
  "search_magnet_score",
  "search_magnet_dimensions",
  "search_magnet_prioritized_actions",
  "search_magnet_consent",
]) {
  assert.ok(route.includes(token), `API route missing static guardrail token: ${token}`);
}

console.log(
  "Static lead-magnet guardrail parity passed: interactive apps have disclaimer gates, unchecked optional marketing consent, report request without opt-in, shared guardrail metadata, compact payload tokens, and no frontend workflow trigger tags.",
);
