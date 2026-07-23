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
const legacyPage = read("src/app/legacy/page.tsx");
const learnHtmlPage = read("src/components/learn-html-page.tsx");
const leadMagnetStartPage = read("src/components/lead-magnet-start-page.tsx");
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

for (const source of pages.map((page) => page.source)) {
  assert.match(source, /whiteford-navy-on-light\.png[^>]*(width=\{?886\}?|width="886")/i, "Whiteford header image needs intrinsic width");
  assert.match(source, /schellip-color\.png[^>]*(width=\{?982\}?|width="982")/i, "Schell IP header image needs intrinsic width");
  assert.match(source, /whiteford-white-on-navy\.png[^>]*(width=\{?900\}?|width="900")/i, "Whiteford footer image needs intrinsic width");
  assert.match(source, /schellip-white\.png[^>]*(width=\{?982\}?|width="982")/i, "Schell IP footer image needs intrinsic width");
}

console.log("learn.schellip static guardrails passed: routes, brand order, compliance copy, Cal.com placement, logo assets, and no confidential form capture.");
