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
  return source.slice(start, start + 1200);
}

const pages = [
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
    isPatentMoatBookTool: true,
  },
  {
    name: "The Chain-of-Title Audit",
    source: read("src/lib/learn/chain-of-title-audit.ts"),
    brandMarker: '<div class="brand-lockup">',
    footerMarker: '<div class="footer-lockup">',
    needsReportSlot: true,
    isPatentMoatBookTool: true,
  },
  {
    name: "The Routing Matrix",
    source: read("src/lib/learn/routing-matrix.ts"),
    brandMarker: '<div class="brand-lockup">',
    footerMarker: '<div class="footer-lockup">',
    needsReportSlot: true,
    isPatentMoatBookTool: true,
  },
  {
    name: "The IP Data Room Checklist",
    source: read("src/lib/learn/ip-data-room-checklist.ts"),
    brandMarker: '<div class="brand-lockup">',
    footerMarker: '<div class="footer-lockup">',
    needsReportSlot: true,
    isPatentMoatBookTool: true,
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
const legacyPage = read("src/app/legacy/page.tsx");
const learnHtmlPage = read("src/components/learn-html-page.tsx");
const learnHtmlWithFlow = read("src/components/learn-html-with-flow.tsx");
const leadMagnetFlow = read("src/components/lead-magnet-flow.tsx");
const magnetConfig = read("src/lib/magnets/finalization.ts");
const leadRoute = read("src/app/api/leads/route.ts");
const outsideCounselRoute = read("src/app/outside-counsel-playbook/page.tsx");
const finalComplianceText = "This tool is for general informational purposes only and is not legal advice. Use of this tool does not create an attorney-client relationship between you, your company, and Whiteford Taylor & Preston LLP or Schell IP. Do not submit confidential, privileged, or trade-secret information through this tool. Any engagement is subject to a conflicts check and a written engagement letter. Attorney advertising. Prior results do not guarantee a similar outcome.";

assert.ok(layout.includes("<Script id=\"cal-embed\""), "Cal.com loader must live in root layout");
assert.ok(layout.includes("Cal(\"init\", \"meeting-with-jeff-schell\""), "Cal.com namespace must initialize once in root layout");
assert.match(globals, /--ink:\s*#003756/i, "Learn design system must expose Whiteford navy token");
assert.match(globals, /--accent:\s*#632ddd/i, "Learn design system must expose Schell IP purple token");
assert.match(globals, /--font-sans:\s*"DM Sans"/, "Tailwind font-sans should use DM Sans");
assert.match(globals, /--font-mono:\s*"IBM Plex Mono"/, "Tailwind font-mono should use IBM Plex Mono");
assert.ok(rootPage.includes('href: "/governance-plan"'), "Directory must link to /governance-plan");
assert.ok(rootPage.includes('href: "/outside-counsel-playbook"'), "Directory must link to /outside-counsel-playbook");
assert.ok(rootPage.includes('href: "/disclosure-self-audit"'), "Directory must link to /disclosure-self-audit");
assert.ok(rootPage.includes('href: "/chain-of-title-audit"'), "Directory must link to /chain-of-title-audit");
assert.ok(rootPage.includes('href: "/routing-matrix"'), "Directory must link to /routing-matrix");
assert.ok(rootPage.includes('href: "/ip-data-room-checklist"'), "Directory must link to /ip-data-room-checklist");
assert.ok(rootPage.includes("PDF · 5 pages"), "Directory must show the outside counsel PDF meta line");
assert.ok(rootPage.includes('href="/legacy"'), "Directory root must link to the moved legacy campaign hub");
assert.doesNotMatch(rootPage, /governance-matrix/, "Directory must not use old governance-matrix slug");
assert.ok(exists("src/app/legacy/page.tsx"), "Legacy route must exist at /legacy");
assert.ok(legacyPage.includes("AI law pages built to convert executive interest into a legal gameplan."), "Legacy route must preserve the old root campaign hub headline");
assert.ok(legacyPage.includes("Open current directory"), "Legacy route must link back to the root directory page");

for (const page of pages) {
  const source = page.source;
  const normalizedSource = `${source} ${magnetConfig}`.replace(/\s+/g, " ");

  assert.ok(normalizedSource.includes("not legal advice"), `${page.name} missing legal-advice disclaimer`);
  assert.ok(normalizedSource.includes("does not create an attorney-client relationship"), `${page.name} missing attorney-client disclaimer`);
  assert.ok(normalizedSource.includes("conflicts check"), `${page.name} missing conflicts-check disclaimer`);
  assert.ok(source.includes("Attorney advertising"), `${page.name} missing attorney advertising notation`);
  assert.doesNotMatch(source, /workflow:[a-z0-9-]+/i, `${page.name} must not hard-code workflow trigger tags`);
  assert.doesNotMatch(source, /<textarea/i, `${page.name} must not request confidential free text`);
  if (!page.hasEmailPdfForm) {
    assert.doesNotMatch(source, /<form|<input/i, `${page.name} must not request user-entered confidential information`);
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

  if (page.isPatentMoatBookTool) {
    assert.ok(
      source.includes("From &quot;The Patent Moat: How Startup Founders Turn Ideas Into Defensible, Fundable Companies&quot; by Jeff Schell"),
      `${page.name} missing Patent Moat book attribution`,
    );
    assert.ok(
      source.includes('href="https://www.schellip.com"'),
      `${page.name} missing schellip.com consultation CTA`,
    );
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
assert.ok(magnetConfig.includes("Score my moat"), "Patent route must use a scorecard-specific button");
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
  assert.ok(`${outsideCounselRoute} ${magnetConfig} ${leadMagnetFlow}`.includes(token), `Outside counsel flow missing token: ${token}`);
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
  "last_magnet_slug",
  "last_magnet_score",
  "last_magnet_score_max",
  "last_magnet_tier",
  "last_magnet_completed_at",
  "magnet_history",
  "outsideCounselPdfUrl",
]) {
  assert.ok(`${leadRoute} ${magnetConfig}`.includes(token), `Final /api/leads route missing token: ${token}`);
}
assert.ok(magnetConfig.includes(finalComplianceText), "Shared final compliance block must be verbatim");
for (const token of [
  "label=\"Phone*\"",
  "type=\"tel\"",
  "inputMode=\"tel\"",
  "config.requirePhone",
]) {
  assert.ok(leadMagnetFlow.includes(token), `Final lead magnet flow missing phone token: ${token}`);
}
assert.ok(leadRoute.includes("approvedPhonePattern"), "API route must validate the approved phone pattern for book magnets");

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

for (const source of pages.map((page) => page.source)) {
  assert.match(source, /whiteford-navy-on-light\.png[^>]*(width=\{?886\}?|width="886")/i, "Whiteford header image needs intrinsic width");
  assert.match(source, /schellip-color\.png[^>]*(width=\{?982\}?|width="982")/i, "Schell IP header image needs intrinsic width");
  assert.match(source, /whiteford-white-on-navy\.png[^>]*(width=\{?900\}?|width="900")/i, "Whiteford footer image needs intrinsic width");
  assert.match(source, /schellip-white\.png[^>]*(width=\{?982\}?|width="982")/i, "Schell IP footer image needs intrinsic width");
}

console.log("learn.schellip static guardrails passed: routes, brand order, compliance copy, Cal.com placement, logo assets, and no confidential form capture.");
