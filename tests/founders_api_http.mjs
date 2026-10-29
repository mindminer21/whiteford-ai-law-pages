#!/usr/bin/env node
// HTTP tests for the Founder Library routes against a running server (preview mode: no AgentMail,
// HighLevel or Supabase keys). Start the server with LEAD_VERIFY_SECRET=test-secret, then run:
//   BASE=http://localhost:3311 node tests/founders_api_http.mjs
import assert from "node:assert/strict";
import { loadFounders } from "./lib/load-founders.mjs";

process.env.LEAD_VERIFY_SECRET = "test-secret";
const BASE = process.env.BASE ?? "http://localhost:3311";
const load = loadFounders();
const signing = await load("signing.ts");
const fields = await load("fields.ts");
const { safeCalculator } = await load("tools/safe-calculator.ts");

const post = (path, body) =>
  fetch(`${BASE}${path}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });

let passed = 0;
const test = async (name, fn) => {
  await fn();
  passed += 1;
  console.log(`ok - ${name}`);
};

const email = `founder-${Date.now()}@example.com`;
let token = "";

await test("verify: founders scope sends a code and issues a token", async () => {
  const start = await post("/api/verify-email", { action: "start", magnet_slug: "founders", email, name: "Ana Lopez" });
  const started = await start.json();
  assert.equal(start.status, 200, JSON.stringify(started));
  assert.match(started.dev_code, /^\d{6}$/);
  const check = await post("/api/verify-email", { action: "check", magnet_slug: "founders", challenge: started.challenge, code: started.dev_code });
  const checked = await check.json();
  assert.equal(check.status, 200);
  token = checked.token;
  assert.ok(token);
});

const values = fields.initialValues(safeCalculator.pages);
values.raisingStatus = "6mo";
const base = { tool: "safe-calculator", values, name: "Ana Lopez", email, company: "Acme Robotics", website: "acme.test", consent: true };

await test("submit: rejects a missing or wrong token", async () => {
  const response = await post("/api/founders/submit", { ...base, verification_token: "nope.nope" });
  assert.equal(response.status, 401);
  assert.equal((await response.json()).code, "token");
});

await test("submit: rejects a token for a different email", async () => {
  const response = await post("/api/founders/submit", { ...base, email: "other@example.com", verification_token: token });
  assert.equal(response.status, 401);
});

await test("submit: requires consent", async () => {
  const response = await post("/api/founders/submit", { ...base, consent: false, verification_token: token });
  assert.equal(response.status, 400);
});

await test("submit: rejects unknown tools and tampered values", async () => {
  assert.equal((await post("/api/founders/submit", { ...base, tool: "nope", verification_token: token })).status, 400);
  assert.equal((await post("/api/founders/submit", { ...base, values: { ...values, extra: 1 }, verification_token: token })).status, 400);
  assert.equal((await post("/api/founders/submit", { ...base, values: { ...values, founderShares: "lots" }, verification_token: token })).status, 400);
});

await test("submit: computes the report server-side in preview mode", async () => {
  const response = await post("/api/founders/submit", { ...base, verification_token: token });
  const data = await response.json();
  assert.equal(response.status, 200, JSON.stringify(data));
  assert.match(data.report.headline, /founders would hold/);
  assert.equal(data.email_delivery, "preview");
  assert.equal(data.crm, "preview");
  assert.equal(data.follow_ups, "preview");
  assert.match(data.email_preview.subject, /SAFE Stack/);
});

await test("follow-up job refuses to run without CRON_SECRET", async () => {
  const response = await fetch(`${BASE}/api/founders/followups`);
  assert.ok([401, 503].includes(response.status));
  const authed = await fetch(`${BASE}/api/founders/followups`, { headers: { Authorization: "Bearer guess" } });
  assert.ok([401, 503].includes(authed.status));
});

await test("unsubscribe: bad signature is refused, good signature succeeds", async () => {
  const bad = await fetch(`${BASE}/api/founders/unsubscribe?e=${encodeURIComponent(email)}&s=wrong`);
  assert.equal(bad.status, 400);
  const good = await fetch(signing.unsubscribeUrl(email).replace(/^https?:\/\/[^/]+/, BASE));
  assert.equal(good.status, 200);
  assert.match(await good.text(), /unsubscribed/);
});

await test("pages render", async () => {
  for (const path of ["/founders", "/founders/safe-calculator", "/founders/glossary", "/founders/financing-documents"]) {
    const response = await fetch(`${BASE}${path}`);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    assert.ok(html.includes("Book a"), `${path} has the consultation button`);
  }
  assert.equal((await fetch(`${BASE}/founders/not-a-tool`)).status, 404);
});

console.log(`\n${passed} founder API tests passed`);
