#!/usr/bin/env node
// Tests for the Founder Library raise/sell tools: term sheet decoder, securities filing checklist
// and diligence list builder. Run: node tests/founders_raise_tools.test.mjs

import assert from "node:assert/strict";
import { loadFounders } from "./lib/load-founders.mjs";

const load = loadFounders();
const { initialValues, validateValues, todayIso } = await load("fields.ts");
const { termSheetDecoder, preferredPayout } = await load("tools/term-sheet-decoder.ts");
const { exemptOfferingChecklist, formDDeadline, computeExemptOffering } = await load("tools/exempt-offering-checklist.ts");
const { diligenceListBuilder } = await load("tools/diligence-list-builder.ts");

function run(tool, overrides) {
  const values = { ...initialValues(tool.pages), ...overrides };
  const checked = validateValues(tool.pages, values);
  assert.ok(!("error" in checked), `validation failed: ${checked.error}`);
  return { values: checked.values, report: tool.compute(checked.values) };
}

let passed = 0;
function test(name, fn) {
  fn();
  passed += 1;
  console.log(`ok - ${name}`);
}

// Spec shape
for (const tool of [termSheetDecoder, exemptOfferingChecklist, diligenceListBuilder]) {
  test(`${tool.slug}: pages have at most 5 fields and 3 follow-up angles`, () => {
    assert.ok(tool.pages.length >= 2 && tool.pages.length <= 4);
    for (const page of tool.pages) assert.ok(page.fields.length <= 5, `${page.title} has ${page.fields.length} fields`);
    assert.equal(tool.followUpAngles.length, 3);
  });
}

// Term sheet payout math
test("1x non-participating takes the greater of preference or conversion", () => {
  const base = { investment: 2_000_000, ownership: 0.2, multiple: 1, participation: "none" };
  assert.equal(preferredPayout({ ...base, exit: 5_000_000 }), 2_000_000); // preference beats 1M as converted
  assert.equal(preferredPayout({ ...base, exit: 10_000_000 }), 2_000_000); // tie
  assert.equal(preferredPayout({ ...base, exit: 50_000_000 }), 10_000_000); // converts
  assert.equal(preferredPayout({ ...base, exit: 1_000_000 }), 1_000_000); // can't exceed exit
});

test("full participation double dips", () => {
  const base = { investment: 2_000_000, ownership: 0.2, multiple: 1, participation: "full" };
  assert.equal(preferredPayout({ ...base, exit: 10_000_000 }), 3_600_000); // 2M + 20% of 8M
  assert.equal(preferredPayout({ ...base, exit: 5_000_000 }), 2_600_000); // 2M + 20% of 3M
});

test("capped participation stops at 3x unless conversion pays more", () => {
  const base = { investment: 2_000_000, ownership: 0.2, multiple: 1, participation: "capped" };
  assert.equal(preferredPayout({ ...base, exit: 10_000_000 }), 3_600_000);
  assert.equal(preferredPayout({ ...base, exit: 25_000_000 }), 6_000_000); // 2M + 4.6M capped at 6M
  assert.equal(preferredPayout({ ...base, exit: 100_000_000 }), 20_000_000); // converts
});

test("term sheet decoder: all-market terms score 100 and show payouts", () => {
  const { report } = run(termSheetDecoder, { status: "inhand", pool: "post", preMoney: 8_000_000, investment: 2_000_000, exitValue: 10_000_000 });
  assert.match(report.summary, /100 out of 100/);
  assert.ok(report.signals.includes("raising:term-sheet-in-hand"));
  assert.ok(!report.signals.includes("terms:off-market"));
  const payout = report.tables.find((table) => table.title === "Who gets what at exit");
  assert.ok(payout);
  assert.deepEqual(payout.rows[1].slice(0, 3), ["$10M", "$2M", "$8M"]);
});

test("term sheet decoder: off-market terms are flagged", () => {
  const { report } = run(termSheetDecoder, { status: "negotiating", roundType: "seed", multiple: "2x", participation: "full", antiDilution: "ratchet", redemption: "yes" });
  assert.ok(report.signals.includes("terms:off-market"));
  assert.match(report.headline, /4 of these 13 terms are off-market for a seed round/);
});

test("term sheet decoder: optional amounts can be left blank", () => {
  const { report } = run(termSheetDecoder, { status: "preparing", preMoney: "", investment: "", exitValue: "" });
  assert.equal(report.tables.length, 1);
});

// Form D deadline
test("Form D deadline is first sale + 15 days", () => {
  assert.equal(formDDeadline("2026-03-02"), "2026-03-17"); // Tuesday
});

test("Form D deadline rolls past a weekend", () => {
  assert.equal(formDDeadline("2026-03-06"), "2026-03-23"); // +15 = Sat Mar 21 -> Mon Mar 23
  assert.equal(formDDeadline("2026-03-07"), "2026-03-23"); // +15 = Sun Mar 22 -> Mon Mar 23
});

test("Form D deadline rolls past federal holidays", () => {
  assert.equal(formDDeadline("2026-08-23"), "2026-09-08"); // +15 = Mon Sep 7 (Labor Day) -> Tue Sep 8
  assert.equal(formDDeadline("2026-12-10"), "2026-12-28"); // +15 = Fri Dec 25 -> Mon Dec 28
  assert.equal(formDDeadline("2026-06-19"), "2026-07-06"); // +15 = Sat Jul 4; Fri Jul 3 observed; -> Mon Jul 6
});

test("506(b) with public marketing and non-accredited investors is flagged", () => {
  const { report } = run(exemptOfferingChecklist, { instrument: "safe", sourcing: "public", investorMix: "some", nonAccreditedCount: 3, stage: "notstarted", badActor: "yes" });
  assert.match(report.headline, /doesn't fit a Rule 506 exemption/);
  assert.ok(report.signals.includes("securities:exemption-issue"));
  assert.ok(report.sections.some((section) => section.items.some((item) => /Regulation Crowdfunding/.test(item))));
});

test("public marketing with all accredited points to 506(c) and checks the no-action minimums", () => {
  const low = run(exemptOfferingChecklist, { instrument: "safe", sourcing: "public", investorMix: "all", stage: "notstarted", badActor: "yes", minIndividual: 25_000, minEntity: 100_000 });
  assert.match(low.report.headline, /506\(c\)/);
  assert.ok(low.report.sections.some((section) => section.tone === "flag" && section.items.some((item) => /below the levels/.test(item))));
  const high = run(exemptOfferingChecklist, { instrument: "safe", sourcing: "public", investorMix: "all", stage: "notstarted", badActor: "yes", minIndividual: 200_000, minEntity: 1_000_000 });
  assert.ok(high.report.sections.some((section) => section.tone === "ok" && section.items.some((item) => /meet the levels/.test(item))));
});

test("more than 35 non-accredited investors is a problem", () => {
  const { report } = run(exemptOfferingChecklist, { instrument: "equity", sourcing: "network", investorMix: "some", nonAccreditedCount: 40, stage: "notstarted", badActor: "yes" });
  assert.match(report.headline, /doesn't fit/);
});

test("late Form D is flagged with a signal and Colorado filing is listed", () => {
  const tool = exemptOfferingChecklist;
  const values = { ...initialValues(tool.pages), instrument: "safe", sourcing: "network", investorMix: "all", stage: "closed", badActor: "no", states: ["co", "ca"], firstSale: "2026-03-02", formDFiled: "no" };
  const checked = validateValues(tool.pages, values);
  assert.ok(!("error" in checked), checked.error);
  const report = computeExemptOffering(checked.values, "2026-04-01");
  assert.ok(report.signals.includes("securities:filing-late"));
  assert.ok(report.signals.includes("raising:now"));
  assert.match(report.headline, /late/);
  const rows = report.tables[0].rows.map((row) => row[0]);
  assert.ok(rows.some((row) => /Colorado notice filing/.test(row) && /\$50/.test(row)));
  assert.ok(rows.some((row) => /California/.test(row)));
  const onTime = computeExemptOffering(checked.values, "2026-03-10");
  assert.ok(!onTime.signals.includes("securities:filing-late"));
  assert.match(onTime.headline, /due March 17, 2026/);
});

test("hidden first-sale fields are dropped when the raise hasn't started", () => {
  const { values } = run(exemptOfferingChecklist, { instrument: "note", sourcing: "network", investorMix: "all", stage: "notstarted", badActor: "yes" });
  assert.equal(values.firstSale, undefined);
  assert.ok(typeof todayIso() === "string");
});

// Diligence list
function allRequests(report) {
  return report.tables.flatMap((table) => table.rows.map((row) => row[0]));
}

test("patent items appear only when the company has patents", () => {
  const base = { txType: "sale", dataRoom: "partial", openSource: "no", personalData: "none", offshore: "no", international: "no", government: "no", changeOfControl: "no", disputes: "no" };
  const withPatents = run(diligenceListBuilder, { ...base, patents: "yes" }).report;
  const without = run(diligenceListBuilder, { ...base, patents: "no" }).report;
  assert.ok(allRequests(withPatents).some((item) => /patent/i.test(item)));
  assert.ok(!allRequests(without).some((item) => /patent/i.test(item)));
  assert.ok(withPatents.signals.includes("sale:diligence-prep"));
});

test("diligence list has ten sections, flags long-lead items and tailors to inputs", () => {
  const { report } = run(diligenceListBuilder, {
    txType: "financing",
    businessTypes: ["software", "life"],
    dataRoom: "notstarted",
    patents: "yes",
    openSource: "yes",
    personalData: "health",
    offshore: "yes",
    international: "yes",
    government: "yes",
    changeOfControl: "unsure",
    disputes: "yes",
  });
  assert.equal(report.tables.length, 10);
  assert.ok(report.signals.includes("raising:diligence-prep"));
  const items = allRequests(report);
  assert.ok(items.some((item) => /Open-source component inventory/.test(item)));
  assert.ok(items.some((item) => /HIPAA/.test(item)));
  assert.ok(items.some((item) => /Offshore contractor/.test(item)));
  assert.ok(items.some((item) => /FDA/.test(item)));
  const flags = report.sections.find((section) => section.tone === "flag");
  assert.ok(flags.items.some((item) => /open-source/i.test(item)));
  assert.ok(report.tables.every((table) => table.rows.every((row) => row[1] === "High" || row[1] === "Medium")));
});

console.log(`\n${passed} tests passed`);
