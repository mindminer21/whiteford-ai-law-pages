import { createHash, createHmac, randomBytes, randomInt, timingSafeEqual } from "node:crypto";

/**
 * Stateless email verification for lead magnets.
 *
 * start:  a 6-digit code is emailed; the browser receives a signed "challenge" that binds the email,
 *         an expiry and a nonce to the code, without revealing the code.
 * check:  the browser sends the challenge and the typed code; a match returns a signed
 *         "verification token" for that email.
 * submit: /api/leads accepts a gated magnet's submission only with a valid token for the same email.
 *
 * Signing key: LEAD_VERIFY_SECRET, or a key derived from the AgentMail API key when that is unset,
 * so no extra secret has to be configured. Nothing is stored server-side.
 */

const CODE_TTL_MS = 15 * 60 * 1000; // a code is good for 15 minutes
const TOKEN_TTL_MS = 3 * 60 * 60 * 1000; // a verified session is good for 3 hours
const MAX_ATTEMPTS = 5; // wrong codes allowed per challenge (best effort, per server instance)

function signingKey() {
  const explicit = process.env.LEAD_VERIFY_SECRET?.trim();
  if (explicit) return explicit;
  const base = process.env.AGENTMAIL_API_KEY || process.env.RESOURCE_AGENTMAIL_API_KEY;
  if (base) return createHash("sha256").update(`lead-verify:${base}`).digest("hex");
  return null;
}

/** True when codes can be signed and emailed for real; false means local/preview mode. */
export function verificationConfigured() {
  return signingKey() !== null;
}

function key() {
  // Without any configured secret (local development), fall back to a per-process random key.
  return signingKey() ?? devKey;
}
const devKey = randomBytes(32).toString("hex");

const b64 = (value: string) => Buffer.from(value, "utf8").toString("base64url");
const unb64 = (value: string) => Buffer.from(value, "base64url").toString("utf8");
const sign = (value: string) => createHmac("sha256", key()).update(value).digest("base64url");

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

type ChallengePayload = { e: string; x: number; n: string; m: string };
type TokenPayload = { e: string; x: number; m: string; v: 1 };

/** Creates a 6-digit code and the signed challenge the browser holds while the user checks email. */
export function createChallenge(email: string, magnetSlug: string) {
  const code = String(randomInt(0, 1_000_000)).padStart(6, "0");
  const payload: ChallengePayload = {
    e: normalizeEmail(email),
    x: Date.now() + CODE_TTL_MS,
    n: randomBytes(9).toString("base64url"),
    m: magnetSlug,
  };
  const body = b64(JSON.stringify(payload));
  return { code, challenge: `${body}.${sign(`code|${body}|${code}`)}`, expiresAt: payload.x };
}

const attempts = new Map<string, number>();

export type CheckResult =
  | { ok: true; token: string; email: string }
  | { ok: false; error: string };

/** Checks a typed code against its challenge and, when it matches, issues a verification token. */
export function checkCode(challenge: string, code: string): CheckResult {
  const [body, mac] = challenge.split(".");
  if (!body || !mac) return { ok: false, error: "That verification request is not valid. Request a new code." };

  let payload: ChallengePayload;
  try {
    payload = JSON.parse(unb64(body)) as ChallengePayload;
  } catch {
    return { ok: false, error: "That verification request is not valid. Request a new code." };
  }
  if (!payload.e || !payload.n || typeof payload.x !== "number") {
    return { ok: false, error: "That verification request is not valid. Request a new code." };
  }
  if (Date.now() > payload.x) return { ok: false, error: "That code has expired. Request a new one." };

  const used = attempts.get(payload.n) ?? 0;
  if (used >= MAX_ATTEMPTS) return { ok: false, error: "Too many attempts. Request a new code." };

  const typed = code.replace(/\D/g, "");
  if (typed.length !== 6 || !safeEqual(sign(`code|${body}|${typed}`), mac)) {
    attempts.set(payload.n, used + 1);
    return { ok: false, error: "That code doesn't match. Check the email and try again." };
  }

  attempts.delete(payload.n);
  const tokenPayload: TokenPayload = { e: payload.e, x: Date.now() + TOKEN_TTL_MS, m: payload.m, v: 1 };
  const tokenBody = b64(JSON.stringify(tokenPayload));
  return { ok: true, email: payload.e, token: `${tokenBody}.${sign(`verified|${tokenBody}`)}` };
}

/** True when the token was issued for this email and magnet and has not expired. */
export function verifyToken(token: unknown, email: string, magnetSlug: string) {
  if (typeof token !== "string") return false;
  const [body, mac] = token.split(".");
  if (!body || !mac || !safeEqual(sign(`verified|${body}`), mac)) return false;
  try {
    const payload = JSON.parse(unb64(body)) as TokenPayload;
    return payload.v === 1 && payload.e === normalizeEmail(email) && payload.m === magnetSlug && Date.now() <= payload.x;
  } catch {
    return false;
  }
}
