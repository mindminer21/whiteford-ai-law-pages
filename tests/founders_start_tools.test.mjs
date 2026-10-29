#!/usr/bin/env node
// Tests the Start-stage Founder Library tools: entity chooser, 83(b) prep sheet, founder equity planner.
import assert from "node:assert/strict";
import { loadFounders } from "./lib/load-founders.mjs";

const load = loadFounders();
const { initialValues, validateValues, todayIso } = await load("fields.ts");
const { addDays, addMonths, daysBetween } = await load("format.ts");
const { entityChooser } = await load("tools/entity-chooser.ts");
const { eightyThreeBElection, electionDeadline } = await load("tools/83b-election.ts");
const { founderEquityPlanner, milestones, vestedFraction } = await load("tools/founder-equity-planner.ts");

function run(tool, overrides) {
  const values = { ...initialValues(tool.pages), ...overrides };
  const checked = validateValues(tool.pages, values);
  assert.ok(!("error" in checked), `validation failed: ${checked.error}`);
  return tool.compute(checked.values);
}

const findSection = (report, title) => report.sections.find((section) => section.title === title);
const allText = (report) => JSON.stringify(report);

let passed = 0;
function test(name, fn) {
  fn();
  passed += 1;
  console.log(`ok - ${name}`);
}

for (const tool of [entityChooser, eightyThreeBElection, founderEquityPlanner]) {
  test(`${tool.slug}: spec shape`, () => {
    assert.equal(tool.stage, "start");
    assert.ok(tool.pages.length >= 2 && tool.pages.length <= 3);
    for (const page of tool.pages) assert.ok(page.fields.length <= 5, `${page.title} has too many fields`);
    assert.equal(tool.followUpAngles.length, 3);
    assert.ok(tool.sources.length >= 1);
  });
}

// Entity chooser
test("entity: venture founders get a Delaware C corporation", () => {
  const report = run(entityChooser, {
    funding: "venture", equity: "soon", exit: "sale", owners: "us-individuals", passThrough: "no", mission: "no", location: "colorado", formed: "none",
  });
  assert.equal(report.metrics[0].value, "Delaware C corporation");
  assert.ok(report.signals.includes("entity:c-corp"));
  assert.ok(report.signals.includes("funding:venture"));
  assert.match(allText(report), /Colorado Secretary of State/);
  assert.match(allText(report), /\$15 million/);
});

test("entity: mission-driven venture company gets a PBC", () => {
  const report = run(entityChooser, {
    funding: "venture", equity: "soon", exit: "sale", owners: "us-individuals", passThrough: "no", mission: "yes", location: "elsewhere", formed: "none",
  });
  assert.equal(report.metrics[0].value, "Delaware public benefit corporation");
  assert.ok(report.signals.includes("entity:pbc"));
});

test("entity: bootstrapped distribution business gets a Colorado LLC", () => {
  const report = run(entityChooser, {
    funding: "bootstrapped", equity: "no", exit: "distributions", owners: "us-individuals", passThrough: "yes", mission: "no", location: "colorado", formed: "none",
  });
  assert.equal(report.metrics[0].value, "Colorado LLC");
  assert.ok(report.signals.includes("entity:llc"));
});

test("entity: an existing LLC raising venture must convert", () => {
  const report = run(entityChooser, {
    funding: "venture", equity: "soon", exit: "sale", owners: "us-individuals", passThrough: "no", mission: "no", location: "colorado", formed: "llc",
  });
  assert.ok(report.signals.includes("entity:convert-needed"));
  assert.match(report.headline, /convert before you raise/);
});

test("entity: an S corporation raising venture is flagged", () => {
  const report = run(entityChooser, {
    funding: "venture", equity: "soon", exit: "sale", owners: "us-individuals", passThrough: "no", mission: "no", location: "colorado", formed: "s-corp",
  });
  assert.match(findSection(report, "What to watch").items.join(" "), /one class of stock/);
});

// 83(b)
test("83(b): deadline is transfer date plus 30 days", () => {
  assert.equal(electionDeadline("2026-01-15"), "2026-02-14");
  assert.equal(electionDeadline("2026-12-10"), "2027-01-09");
  assert.equal(electionDeadline("2028-02-10"), "2028-03-11"); // leap year
});

test("83(b): income is shares x (FMV - paid)", () => {
  const transferDate = addDays(todayIso(), -3);
  const report = run(eightyThreeBElection, { shares: 1_000_000, transferDate, pricePaid: 0.0001, fmv: 0.01, vesting: "standard" });
  const income = report.metrics.find((metric) => metric.label === "Income reported now").value;
  assert.equal(income, "$9,900");
  assert.equal(report.metrics.find((metric) => metric.label === "Days left").value, "27");
  assert.ok(report.signals.includes("83b:reports-income"));
  const table = report.tables[0];
  assert.equal(table.rows.find((row) => row[0] === "Amount included in income")[1], "$9,900");
});

test("83(b): paying FMV reports no income", () => {
  const report = run(eightyThreeBElection, { shares: 4_000_000, transferDate: todayIso(), pricePaid: 0.0001, fmv: 0.0001, vesting: "standard" });
  assert.equal(report.metrics.find((metric) => metric.label === "Income reported now").value, "$0");
  assert.equal(report.metrics.find((metric) => metric.label === "Days left").value, "30");
});

test("83(b): urgent and missed deadlines are flagged", () => {
  const urgent = run(eightyThreeBElection, { shares: 100, transferDate: addDays(todayIso(), -26), pricePaid: 0.001, fmv: 0.001, vesting: "standard" });
  assert.ok(urgent.signals.includes("deadline:83b-urgent"));
  const missed = run(eightyThreeBElection, { shares: 100, transferDate: addDays(todayIso(), -31), pricePaid: 0.001, fmv: 0.001, vesting: "standard" });
  assert.ok(missed.signals.includes("deadline:83b-missed"));
  assert.match(missed.headline, /passed/);
  assert.equal(daysBetween(todayIso(), electionDeadline(addDays(todayIso(), -31))), -1);
});

test("83(b): fully vested stock is flagged and no personal identifiers are requested", () => {
  const report = run(eightyThreeBElection, { shares: 100, transferDate: todayIso(), pricePaid: 1, fmv: 1, vesting: "vested" });
  assert.match(findSection(report, "What to watch").items.join(" "), /Fully vested stock generally doesn't need/);
  const ids = eightyThreeBElection.pages.flatMap((page) => page.fields.map((field) => field.id.toLowerCase()));
  for (const forbidden of ["ssn", "tin", "taxid", "address", "name", "fullname", "dob"]) assert.ok(!ids.includes(forbidden), `asks for ${forbidden}`);
  assert.ok(!ids.some((id) => /ssn|social|address|taxpayer/.test(id)), "asks for a personal identifier");
  assert.doesNotMatch(allText(report), /weekend|holiday/i);
});

// Founder equity planner
test("equity: share split and four-year milestones", () => {
  const report = run(founderEquityPlanner, {
    founders: [
      { label: "Founder A", percent: 60, role: "ceo", fullTime: "yes", priorIp: "no" },
      { label: "Founder B", percent: 40, role: "cto", fullTime: "yes", priorIp: "yes" },
    ],
    totalShares: 10_000_000,
    schedule: "4y-cliff",
    startDate: "2026-01-31",
    creditMonths: 0,
    acceleration: "double",
  });
  const split = report.tables[0];
  assert.deepEqual(split.rows[0].slice(2), ["60.00%", "6,000,000"]);
  assert.deepEqual(split.rows[1].slice(2), ["40.00%", "4,000,000"]);
  const vesting = report.tables[1];
  assert.deepEqual(vesting.rows.map((row) => row[0]), ["Cliff", "Year 2", "Year 3", "Fully vested"]);
  assert.equal(vesting.rows[0][1], "January 31, 2027");
  assert.equal(vesting.rows[0][2], "25%");
  assert.equal(vesting.rows[0][3], "1,500,000");
  assert.equal(vesting.rows[3][1], "January 31, 2030");
  assert.ok(report.signals.includes("ip:founder-assignment-needed"));
});

test("equity: month-end dates clamp correctly", () => {
  assert.equal(addMonths("2026-01-31", 1), "2026-02-28");
  assert.equal(addMonths("2027-08-31", 6), "2028-02-29");
  assert.equal(addMonths("2026-03-31", -1), "2026-02-28");
  const points = milestones({ months: 36, cliff: 12, label: "" }, "2025-08-31");
  assert.deepEqual(points.map((point) => point.date), ["2026-08-31", "2027-08-31", "2028-08-31"]);
  assert.equal(vestedFraction({ months: 48, cliff: 12, label: "" }, 11), 0);
  assert.equal(vestedFraction({ months: 48, cliff: 12, label: "" }, 13), 13 / 48);
});

test("equity: credit for prior time moves vesting start back", () => {
  const report = run(founderEquityPlanner, {
    founders: [{ label: "Solo", percent: 100, role: "ceo", fullTime: "yes", priorIp: "no" }],
    totalShares: 8_000_000,
    schedule: "4y-cliff",
    startDate: "2026-06-15",
    creditMonths: 12,
    acceleration: "none",
  });
  assert.equal(report.metrics.find((metric) => metric.label === "Vested at issuance").value, "25%");
  assert.equal(report.tables[1].rows[0][1], "June 15, 2026");
});

test("equity: ownership that doesn't total 100% is flagged", () => {
  const report = run(founderEquityPlanner, {
    founders: [
      { label: "A", percent: 50, role: "ceo", fullTime: "yes", priorIp: "no" },
      { label: "B", percent: 45, role: "cto", fullTime: "no", priorIp: "no" },
    ],
  });
  assert.match(report.headline, /95\.00%/);
  assert.match(findSection(report, "What to watch").items.join(" "), /instead of 100%/);
  assert.match(findSection(report, "What to watch").items.join(" "), /B isn't full time/);
});

test("equity: no vesting and single trigger are flagged", () => {
  const report = run(founderEquityPlanner, { schedule: "none", acceleration: "single" });
  const watch = findSection(report, "What to watch").items.join(" ");
  assert.match(watch, /No vesting/);
  assert.match(watch, /Single-trigger/);
  assert.ok(report.signals.includes("equity:no-vesting"));
  assert.equal(report.tables.length, 1);
});

test("equity: rejects bad row input", () => {
  const values = { ...initialValues(founderEquityPlanner.pages), founders: [{ label: "<b>", percent: 50, role: "ceo", fullTime: "yes", priorIp: "no" }] };
  assert.ok("error" in validateValues(founderEquityPlanner.pages, values));
});

console.log(`\n${passed} tests passed`);
