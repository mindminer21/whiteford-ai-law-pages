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
    needsCalButton: false,
  },
  {
    name: "AI Legal Risk Triage",
    source: read("src/lib/learn/ai-risk-triage.ts"),
    brandMarker: '<div class="brand-lockup">',
    footerMarker: '<div class="footer-lockup">',
    needsCalButton: true,
  },
  {
    name: "Patent Moat Scorecard",
    source: read("src/lib/learn/patent-moat-scorecard.ts"),
    brandMarker: '<div class="brand-lockup">',
    footerMarker: '<div class="footer-lockup">',
    needsCalButton: true,
  },
  {
    name: "AI Governance Readiness Plan",
    source: read("src/lib/learn/governance-plan.ts"),
    brandMarker: '<div class="brand-lockup">',
    footerMarker: '<div class="footer-lockup">',
    needsCalButton: true,
  },
];

for (const asset of [
  "public/logos/whiteford-navy-on-light.png",
  "public/logos/whiteford-white-on-navy.png",
  "public/logos/whiteford-white-on-navy-full.png",
  "public/logos/schellip-color.png",
  "public/logos/schellip-white.png",
  "public/logos/jeff-schell.jpg",
]) {
  assert.ok(exists(asset), `Missing learn.schellip logo asset: ${asset}`);
}

const globals = read("src/app/globals.css");
const layout = read("src/app/layout.tsx");
const rootPage = read("src/app/page.tsx");

assert.ok(layout.includes("<Script id=\"cal-embed\""), "Cal.com loader must live in root layout");
assert.ok(layout.includes("Cal(\"init\", \"meeting-with-jeff-schell\""), "Cal.com namespace must initialize once in root layout");
assert.match(globals, /--ink:\s*#003756/i, "Learn design system must expose Whiteford navy token");
assert.match(globals, /--accent:\s*#632ddd/i, "Learn design system must expose Schell IP purple token");
assert.match(globals, /--font-sans:\s*"DM Sans"/, "Tailwind font-sans should use DM Sans");
assert.match(globals, /--font-mono:\s*"IBM Plex Mono"/, "Tailwind font-mono should use IBM Plex Mono");
assert.ok(rootPage.includes('href: "/governance-plan"'), "Directory must link to /governance-plan");
assert.doesNotMatch(rootPage, /governance-matrix/, "Directory must not use old governance-matrix slug");

for (const page of pages) {
  const source = page.source;

  assert.ok(source.includes("not legal advice"), `${page.name} missing legal-advice disclaimer`);
  assert.ok(source.includes("does not create an attorney-client relationship"), `${page.name} missing attorney-client disclaimer`);
  assert.ok(source.includes("conflicts check"), `${page.name} missing conflicts-check disclaimer`);
  assert.ok(source.includes("Attorney advertising"), `${page.name} missing attorney advertising notation`);
  assert.doesNotMatch(source, /workflow:[a-z0-9-]+/i, `${page.name} must not hard-code workflow trigger tags`);
  assert.doesNotMatch(source, /<form|<input|<textarea/i, `${page.name} must not request user-entered confidential information`);
  assert.doesNotMatch(source, /href=["']\/start|href=["'][^"']*\/start/i, `${page.name} must not link to /start placeholder routes`);

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

  if (page.needsCalButton) {
    assert.ok(source.includes("data-cal-link=\"jeffschell/meeting-with-jeff-schell\""), `${page.name} missing Cal.com button link`);
    assert.ok(source.includes("Interactive tool launching once Whiteford compliance review is complete"), `${page.name} missing launch-soon CTA copy`);
    assert.doesNotMatch(source, /Cal\("init"|app\.cal\.com\/embed\/embed\.js/i, `${page.name} must not embed per-page Cal.com script`);
  }
}

for (const source of [
  globals,
  read("src/lib/learn/ai-risk-triage.ts"),
  read("src/lib/learn/patent-moat-scorecard.ts"),
  read("src/lib/learn/governance-plan.ts"),
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
