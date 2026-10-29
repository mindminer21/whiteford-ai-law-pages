#!/usr/bin/env node
// Tests for the protect/team/board Founder Library tools: IP ownership audit, Colorado non-compete
// checker, option pool sizer and advisor equity calculator.
import assert from "node:assert/strict";
import { loadFounders } from "./lib/load-founders.mjs";

const load = loadFounders();
const { initialValues, validateValues } = await load("fields.ts");
const { ipOwnershipAudit, scoreIp } = await load("tools/ip-ownership-audit.ts");
const { coloradoNoncompeteChecker, assessCovenant, THRESHOLD_2026, NONSOLICIT_2026 } = await load("tools/colorado-noncompete-checker.ts");
const { optionPoolSizer, solveTopUp } = await load("tools/option-pool-sizer.ts");
const { advisorEquityCalculator, advisorRange } = await load("tools/advisor-equity-calculator.ts");

function run(tool, overrides) {
  const values = { ...initialValues(tool.pages), ...overrides };
  const checked = validateValues(tool.pages, values);
  assert.ok(!("error" in checked), `validation failed for ${tool.slug}: ${checked.error}`);
  return { values: checked.values, report: tool.compute(checked.values) };
}

function checkSpec(tool) {
  assert.ok(tool.pages.length >= 2 && tool.pages.length <= 3, `${tool.slug}: 2-3 pages`);
  for (const page of tool.pages) assert.ok(page.fields.length <= 5, `${tool.slug}: <=5 fields on "${page.title}"`);
  assert.equal(tool.followUpAngles.length, 3);
  assert.ok(tool.sources.length > 0 && tool.sources.every((s) => s.url.startsWith("https://")));
  assert.ok(tool.explainer.paragraphs.length >= 2);
}

let passed = 0;
function test(name, fn) {
  fn();
  passed += 1;
  console.log(`ok - ${name}`);
}

// ---------------------------------------------------------------- IP audit
const cleanIp = {
  founderAssignment: "all",
  priorObligations: "none",
  sideProject: "no",
  accounts: "company",
  employees: "all",
  contractors: "assignment",
  offshore: "no",
  openSource: "tracked",
  aiTools: "policy",
  trademarks: "filed",
  patents: "filedfirst",
};

test("IP audit spec shape", () => checkSpec(ipOwnershipAudit));

test("IP audit: clean answers score 100 and tier Clean", () => {
  const { report } = run(ipOwnershipAudit, cleanIp);
  const scored = scoreIp(cleanIp);
  assert.equal(scored.score, 100);
  assert.equal(scored.tier, "Clean");
  assert.match(report.headline, /100\/100/);
  assert.ok(!report.signals.includes("ip:red-flags"));
});

test("IP audit: not-applicable answers drop out of the score", () => {
  const scored = scoreIp({ ...cleanIp, employees: "na", contractors: "na", trademarks: "na", patents: "na" });
  assert.equal(scored.score, 100);
  assert.equal(scored.areas.team, 1);
});

test("IP audit: contractor and founder gaps are red flags with fixes", () => {
  const answers = { ...cleanIp, founderAssignment: "none", contractors: "none" };
  const { report } = run(ipOwnershipAudit, answers);
  const scored = scoreIp(answers);
  assert.equal(scored.tier, "Diligence red flags");
  assert.ok(report.signals.includes("ip:red-flags"));
  assert.ok(report.signals.includes("ip:contractor-gap"));
  assert.ok(report.signals.includes("ip:founder-gap"));
  const flags = report.sections.find((s) => s.tone === "flag");
  assert.ok(flags.items.some((item) => /assignment/i.test(item)));
});

test("IP audit: a single critical gap caps the tier below Clean", () => {
  const scored = scoreIp({ ...cleanIp, contractors: "none" });
  assert.ok(scored.score >= 80);
  assert.equal(scored.tier, "Gaps to close");
});

test("IP audit: missing answer fails validation", () => {
  const values = { ...initialValues(ipOwnershipAudit.pages), ...cleanIp, patents: "" };
  assert.ok("error" in validateValues(ipOwnershipAudit.pages, values));
});

// ---------------------------------------------------------------- Non-compete
const nc = {
  covenantType: "noncompete",
  signedDate: "2026-03-01",
  workerType: "employee",
  workers: 1,
  annualPay: 130_014,
  coloradoWorker: "yes",
  purpose: "trade_secrets",
  healthcare: "no",
  saleOfBusiness: "no",
  notice: "separate_signed",
};

test("Non-compete spec shape", () => checkSpec(coloradoNoncompeteChecker));

test("Non-compete thresholds: $130,014 and 60% = $78,008.40", () => {
  assert.equal(THRESHOLD_2026, 130_014);
  assert.equal(NONSOLICIT_2026, 78_008.4);
});

test("Non-compete: exactly at the 2026 threshold passes", () => {
  assert.equal(assessCovenant(nc).verdict, "likely-enforceable");
  const { report } = run(coloradoNoncompeteChecker, nc);
  assert.match(report.summary, /not a legal opinion/);
});

test("Non-compete: $129,999 in 2026 is likely void", () => {
  const result = assessCovenant({ ...nc, annualPay: 129_999 });
  assert.equal(result.verdict, "likely-void");
});

test("Non-compete: general competition purpose is likely void even when highly paid", () => {
  assert.equal(assessCovenant({ ...nc, annualPay: 400_000, purpose: "general_competition" }).verdict, "likely-void");
});

test("Customer non-solicit: 60% threshold applies", () => {
  assert.equal(assessCovenant({ ...nc, covenantType: "customer_nonsolicit", annualPay: 78_008.4 }).verdict, "likely-enforceable");
  assert.equal(assessCovenant({ ...nc, covenantType: "customer_nonsolicit", annualPay: 78_000 }).verdict, "likely-void");
});

test("Non-compete: missing notice makes it likely void and counts penalties per worker", () => {
  const result = assessCovenant({ ...nc, notice: "in_agreement", workers: 12 });
  assert.equal(result.verdict, "likely-void");
  assert.equal(result.penaltyExposure, 60_000);
  const { report } = run(coloradoNoncompeteChecker, { ...nc, notice: "none", workers: 12 });
  assert.ok(report.metrics.some((m) => m.value === "$60,000"));
  assert.ok(report.signals.includes("covenant:template"));
});

test("Non-compete: signed before 2026 below the 2026 figure needs review, not void", () => {
  assert.equal(assessCovenant({ ...nc, signedDate: "2024-05-01", annualPay: 125_000 }).verdict, "needs-review");
});

test("Non-compete: physicians after Aug 6, 2025 can't use the pay exception", () => {
  assert.equal(assessCovenant({ ...nc, healthcare: "yes", annualPay: 500_000 }).verdict, "likely-void");
  assert.notEqual(assessCovenant({ ...nc, healthcare: "yes", signedDate: "2025-08-05", annualPay: 500_000 }).verdict, "likely-void");
});

test("Non-compete: employee non-solicit and non-Colorado workers need review", () => {
  assert.equal(assessCovenant({ ...nc, covenantType: "employee_nonsolicit" }).verdict, "needs-review");
  assert.equal(assessCovenant({ ...nc, coloradoWorker: "no" }).verdict, "needs-review");
  assert.equal(assessCovenant({ ...nc, covenantType: "confidentiality", annualPay: 40_000, notice: "none" }).verdict, "likely-enforceable");
});

test("Non-compete: sale-of-business needs review and mentions the SB25-083 formula for minority owners", () => {
  const result = assessCovenant({ ...nc, annualPay: 50_000, saleOfBusiness: "minority_comp_equity", notice: "none" });
  assert.equal(result.verdict, "needs-review");
  assert.ok(result.reasons.some((r) => /SB25-083/.test(r)));
});

// ---------------------------------------------------------------- Option pool
test("Option pool spec shape", () => checkSpec(optionPoolSizer));

test("Option pool: top-up math without a round", () => {
  // 10% target, 10M shares, 500K unissued: X = (0.1*10M - 0.5M)/0.9 = 555,556
  const { topUp, postShares } = solveTopUp({ shares: 10_000_000, unissued: 500_000, target: 0.1 });
  assert.ok(Math.abs(topUp - 555_555.56) < 1);
  assert.ok(Math.abs((500_000 + topUp) / postShares - 0.1) < 1e-9);
});

test("Option pool: top-up math inside a round", () => {
  const { topUp, postShares } = solveTopUp({ shares: 10_000_000, unissued: 500_000, target: 0.12, preMoney: 20_000_000, newMoney: 5_000_000 });
  assert.ok(Math.abs((500_000 + topUp) / postShares - 0.12) < 1e-9);
  // New investors still own new money / post-money = 20%.
  const newShares = postShares - (10_000_000 + topUp);
  assert.ok(Math.abs(newShares / postShares - 0.2) < 1e-9);
});

test("Option pool: report from defaults", () => {
  const { report } = run(optionPoolSizer, { last409a: "older", price409a: 0.42 });
  // Defaults: 2×0.75 + 4×0.3 + 6×0.1 = 3.3% grants, ×1.15 buffer = 3.795%.
  assert.ok(report.metrics.some((m) => m.label === "Pool needed" && m.value === "3.8%"));
  assert.ok(report.signals.includes("hiring:planned"));
  assert.ok(report.signals.includes("pool:topup-needed"));
  assert.ok(report.sections.some((s) => s.items.some((i) => /409A/.test(i))));
  assert.ok(report.sections.some((s) => s.items.some((i) => /\$100,000/.test(i))));
  assert.equal(report.tables[0].rows.at(-1)[0], "Total");
});

test("Option pool: an existing pool that covers the plan needs no top-up", () => {
  const { report } = run(optionPoolSizer, { last409a: "recent", unissuedPool: 3_000_000, modelRound: "no" });
  assert.ok(!report.signals.includes("pool:topup-needed"));
});

test("Option pool: impossible plan is handled", () => {
  const { report } = run(optionPoolSizer, { last409a: "recent", refreshBuffer: 100, hires: [{ level: "executive", count: 100, equity: 10 }] });
  assert.match(report.headline, /more equity/);
});

// ---------------------------------------------------------------- Advisor equity
test("Advisor spec shape", () => checkSpec(advisorEquityCalculator));

test("Advisor: range scales with stage, involvement and term", () => {
  assert.deepEqual(advisorRange("seed", "strategic", 24), [0.1, 0.5]);
  assert.deepEqual(advisorRange("seed", "standard", 24), [0.05, 0.25]);
  const [, longHigh] = advisorRange("seed", "strategic", 48);
  assert.ok(longHigh > 0.5);
  const [aLow] = advisorRange("seriesA", "strategic", 24);
  assert.ok(aLow < 0.1);
});

test("Advisor: report with flags", () => {
  const { report } = run(advisorEquityCalculator, {
    stage: "seed",
    engagement: "strategic",
    boardOverlap: "yes",
    vesting: "cliff12",
    acceleration: "single",
    price409a: 0.5,
  });
  assert.ok(report.metrics.some((m) => m.label === "Suggested range" && m.value === "0.1%–0.5%"));
  assert.ok(report.metrics.some((m) => m.label === "Shares" && m.value === "10,000–50,000"));
  const flags = report.sections.find((s) => s.tone === "flag").items.join(" ");
  assert.match(flags, /Single-trigger/);
  assert.match(flags, /Board members/);
  assert.match(flags, /one-year cliff/);
  assert.deepEqual(report.signals, ["advisors:adding"]);
});

console.log(`\n${passed} tests passed`);
