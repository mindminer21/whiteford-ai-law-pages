#!/usr/bin/env node
// Unit tests for the Founder Library engine: field validation, SAFE math, report and follow-up emails.
import assert from "node:assert/strict";
import { loadFounders } from "./lib/load-founders.mjs";

process.env.LEAD_VERIFY_SECRET = "test-secret";
const load = loadFounders();
const fields = await load("fields.ts");
const { safeCalculator, modelRound } = await load("tools/safe-calculator.ts");
const emails = await load("emails.ts");
const registry = await load("registry.ts");
const signing = await load("signing.ts");

let passed = 0;
const test = async (name, fn) => {
  await fn();
  passed += 1;
  console.log(`ok - ${name}`);
};

await test("defaults validate and compute for every registered tool", () => {
  for (const tool of registry.tools) {
    const values = fields.initialValues(tool.pages);
    // Fill required choices that have no default with the first option.
    for (const page of tool.pages) {
      for (const field of page.fields) {
        if (field.kind === "choice" && !values[field.id]) values[field.id] = field.options[0].value;
      }
    }
    const checked = fields.validateValues(tool.pages, values);
    assert.ok(!("error" in checked), `${tool.slug}: ${checked.error}`);
    const report = tool.compute(checked.values);
    assert.ok(report.headline.length > 10, `${tool.slug} headline`);
    assert.ok(report.nextSteps.length >= 1, `${tool.slug} next steps`);
    assert.equal(tool.followUpAngles.length, 3, `${tool.slug} follow-up angles`);
    if (!process.env.FOUNDERS_PARTIAL) for (const slug of tool.related) assert.ok(registry.getTool(slug), `${tool.slug} related ${slug}`);
  }
});

await test("validation rejects unknown fields, out-of-range numbers and bad choices", () => {
  const pages = safeCalculator.pages;
  const values = fields.initialValues(pages);
  values.raisingStatus = "now";
  assert.ok("error" in fields.validateValues(pages, { ...values, sneaky: 1 }));
  assert.ok("error" in fields.validateValues(pages, { ...values, founderShares: -5 }));
  assert.ok("error" in fields.validateValues(pages, { ...values, raisingStatus: "tomorrow" }));
  assert.ok("error" in fields.validateValues(pages, { ...values, safes: [] }));
  assert.ok("error" in fields.validateValues(pages, { ...values, safes: [{ label: "<b>x</b>", amount: 1000, type: "cap", cap: 1e6 }] }));
  assert.ok(!("error" in fields.validateValues(pages, values)));
});

await test("hidden fields are dropped server-side", () => {
  const values = fields.initialValues(safeCalculator.pages);
  values.raisingStatus = "none";
  values.modelRound = "no";
  const checked = fields.validateValues(safeCalculator.pages, values);
  assert.ok(!("error" in checked));
  assert.equal(checked.values.preMoney, undefined);
});

await test("post-money SAFE math matches hand calculation", () => {
  const m = modelRound({
    existingShares: 10_000_000,
    unissuedPool: 1_500_000,
    preMoney: 20_000_000,
    newMoney: 5_000_000,
    poolTargetPct: 10,
    safes: [
      { label: "A", amount: 750_000, type: "cap", cap: 10_000_000, discount: 0 },
      { label: "B", amount: 1_000_000, type: "cap", cap: 14_000_000, discount: 0 },
    ],
  });
  assert.ok(m.converged);
  const expectedC = 10_000_000 / (1 - 0.075 - 1 / 14);
  assert.ok(Math.abs(m.companyCapitalization - expectedC) < 1);
  assert.ok(Math.abs(m.safes[0].shares / m.companyCapitalization - 0.075) < 1e-9);
  assert.ok(Math.abs(m.newInvestorShares / m.postMoneyShares - 0.2) < 1e-9);
  assert.equal(Math.round(m.poolTopUp), 0);
});

await test("pool top-up and discount conversion", () => {
  const m = modelRound({
    existingShares: 10_000_000,
    unissuedPool: 0,
    preMoney: 20_000_000,
    newMoney: 5_000_000,
    poolTargetPct: 10,
    safes: [{ label: "D", amount: 1_000_000, type: "discount", cap: 0, discount: 20 }],
  });
  assert.ok(m.converged);
  assert.ok(Math.abs(m.poolTopUp / m.postMoneyShares - 0.1) < 1e-9, "pool reaches 10% post");
  assert.ok(Math.abs(m.safes[0].price / m.roundPrice - 0.8) < 1e-9, "discount price is 80% of round");
  assert.ok(Math.abs(m.newInvestorShares / m.postMoneyShares - 0.2) < 1e-9);
});

await test("cap and discount SAFE takes the better price", () => {
  const m = modelRound({
    existingShares: 10_000_000,
    unissuedPool: 0,
    preMoney: 8_000_000,
    newMoney: 2_000_000,
    poolTargetPct: 0,
    safes: [{ label: "CD", amount: 500_000, type: "cap_discount", cap: 20_000_000, discount: 20 }],
  });
  assert.equal(m.safes[0].basis, "discount");
});

await test("report email has unsubscribe link, firm address and escaped content", () => {
  const values = fields.initialValues(safeCalculator.pages);
  values.raisingStatus = "now";
  const report = safeCalculator.compute(fields.validateValues(safeCalculator.pages, values).values);
  const mail = emails.buildToolReportEmail({ tool: safeCalculator, report, name: "Ana <script>", company: "Acme & Co", email: "ana@example.com" });
  assert.ok(mail.html.includes("/api/founders/unsubscribe?e=ana%40example.com&amp;s=") || mail.html.includes("/api/founders/unsubscribe?e=ana%40example.com&s="));
  assert.ok(mail.html.includes("2128 W. 32nd Ave."));
  assert.ok(!mail.html.includes("<script>"));
  assert.ok(mail.html.includes("Acme &amp; Co"));
  assert.ok(mail.text.includes("Stop follow-up emails:"));
  assert.ok(mail.labels.includes("tool:safe-calculator"));
});

await test("follow-up sequence: 9 steps, tool angles first, quarterly after, last says it's the last", () => {
  assert.equal(emails.FOLLOW_UP_STEPS, 9);
  const contact = {
    email: "ana@example.com",
    name: "Ana Lopez",
    company: "Acme",
    lastToolSlug: "safe-calculator",
    lastToolTitle: "SAFE Stack & Dilution Calculator",
    lastHeadline: "Founders keep 54.6%.",
    toolsUsed: ["safe-calculator"],
  };
  const subjects = [];
  for (let step = 1; step <= 9; step += 1) {
    const mail = emails.buildFollowUpEmail(contact, step);
    subjects.push(mail.subject);
    assert.ok(mail.text.startsWith("Hi Ana,"));
    assert.ok(mail.text.includes("Stop follow-up emails:"));
    assert.ok(mail.labels.includes(`follow-up-step:${step}`));
  }
  assert.ok(emails.buildFollowUpEmail(contact, 1).text.includes(safeCalculator.followUpAngles[0]));
  assert.ok(emails.buildFollowUpEmail(contact, 1).text.includes("Founders keep 54.6%."));
  assert.ok(/last scheduled check-in/.test(subjects[8]));
  assert.equal(new Set(subjects).size, subjects.length, "subjects are distinct");
});

await test("unsubscribe signatures verify and reject tampering", () => {
  const url = new URL(signing.unsubscribeUrl("Ana@Example.com"));
  const email = url.searchParams.get("e");
  const sig = url.searchParams.get("s");
  assert.equal(email, "ana@example.com");
  assert.ok(signing.checkSignature("unsubscribe", email, sig));
  assert.ok(!signing.checkSignature("unsubscribe", "bob@example.com", sig));
  assert.ok(!signing.checkSignature("unsubscribe", email, `${sig.slice(0, -1)}x`));
  assert.ok(!signing.checkSignature("unsubscribe", email, undefined));
});

await test("date helpers clamp month ends and add days", async () => {
  const format = await load("format.ts");
  assert.equal(format.addDays("2026-01-31", 30), "2026-03-02");
  assert.equal(format.addMonths("2026-01-31", 1), "2026-02-28");
  assert.equal(format.addMonths("2024-01-31", 1), "2024-02-29");
  assert.equal(format.longDate("2026-11-28"), "November 28, 2026");
});

console.log(`\n${passed} founder framework tests passed`);
