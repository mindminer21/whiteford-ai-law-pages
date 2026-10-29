import { createHash, createHmac, randomBytes, timingSafeEqual } from "node:crypto";

/**
 * Signing key for unsubscribe links and other founder-library tokens: LEAD_VERIFY_SECRET when set,
 * otherwise derived from the AgentMail key (as the email-verification code does), otherwise a
 * per-process random key for local development.
 */
const devKey = randomBytes(32).toString("hex");

function key() {
  const explicit = process.env.LEAD_VERIFY_SECRET?.trim();
  if (explicit) return `founders:${explicit}`;
  const base = process.env.AGENTMAIL_API_KEY || process.env.RESOURCE_AGENTMAIL_API_KEY;
  if (base) return createHash("sha256").update(`founders-sign:${base}`).digest("hex");
  return devKey;
}

export function sign(purpose: string, value: string) {
  return createHmac("sha256", key()).update(`${purpose}|${value}`).digest("base64url").slice(0, 32);
}

export function checkSignature(purpose: string, value: string, signature: unknown) {
  if (typeof signature !== "string") return false;
  const expected = Buffer.from(sign(purpose, value));
  const given = Buffer.from(signature);
  return expected.length === given.length && timingSafeEqual(expected, given);
}

export function siteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? "https://learn.schellip.com").replace(/\/$/, "");
}

export function unsubscribeUrl(email: string) {
  const normalized = email.trim().toLowerCase();
  const params = new URLSearchParams({ e: normalized, s: sign("unsubscribe", normalized) });
  return `${siteUrl()}/api/founders/unsubscribe?${params.toString()}`;
}
