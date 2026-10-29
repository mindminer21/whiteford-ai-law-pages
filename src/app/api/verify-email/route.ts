import { sendViaAgentMail } from "@/lib/email/agentmail";
import { buildVerificationEmail } from "@/lib/email/verification-code";
import { isMagnetSlug, magnetConfigs } from "@/lib/magnets/finalization";
import { checkCode, createChallenge, normalizeEmail } from "@/lib/verify/email-code";

type Payload = {
  action?: unknown;
  email?: unknown;
  name?: unknown;
  magnet_slug?: unknown;
  challenge?: unknown;
  code?: unknown;
};

/** Scope shared by every Founder Library tool (matches FOUNDERS_VERIFY_SCOPE in lib/founders/registry). */
const FOUNDERS_VERIFY_SCOPE = "founders";

const RESEND_WAIT_MS = 30 * 1000;
const lastSentAt = new Map<string, number>(); // best effort, per server instance

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254;
}

function compact(value: unknown, max = 160) {
  return typeof value === "string" && value.trim().length > 0 && value.length <= max && !/[\r\n<>]/.test(value)
    ? value.trim()
    : null;
}

export async function POST(request: Request) {
  let payload: Payload;
  try {
    payload = (await request.json()) as Payload;
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const slug = payload.magnet_slug;
  let scope: string;
  let toolTitle: string;
  if (slug === FOUNDERS_VERIFY_SCOPE) {
    // One verification unlocks every tool in the Founder Library.
    scope = FOUNDERS_VERIFY_SCOPE;
    toolTitle = "Founder Library";
  } else {
    if (!isMagnetSlug(slug)) return Response.json({ error: "Unknown tool." }, { status: 400 });
    const config = magnetConfigs[slug];
    if (!("emailVerification" in config) || !config.emailVerification) {
      return Response.json({ error: "This tool does not use email verification." }, { status: 400 });
    }
    scope = slug;
    toolTitle = config.title;
  }

  if (payload.action === "start") {
    const email = compact(payload.email, 254);
    const name = compact(payload.name);
    if (!email || !isEmail(email)) return Response.json({ error: "Enter a valid work email." }, { status: 400 });
    if (!name) return Response.json({ error: "Enter your name." }, { status: 400 });

    const normalized = normalizeEmail(email);
    const last = lastSentAt.get(normalized) ?? 0;
    if (Date.now() - last < RESEND_WAIT_MS) {
      return Response.json({ error: "A code was just sent. Wait a few seconds before requesting another." }, { status: 429 });
    }

    const { code, challenge, expiresAt } = createChallenge(normalized, scope);
    const delivery = await sendViaAgentMail(
      buildVerificationEmail({ email: normalized, name, code, toolTitle }),
    );

    if (delivery.mode === "failed") {
      return Response.json(
        { error: "We couldn't send the code right now. Please try again in a minute." },
        { status: 502 },
      );
    }
    lastSentAt.set(normalized, Date.now());

    return Response.json({
      ok: true,
      challenge,
      expires_at: expiresAt,
      delivery: delivery.mode,
      // Only when email isn't configured (local or preview without AgentMail): show the code so the flow can be tested.
      ...(delivery.mode === "preview" ? { dev_code: code } : {}),
    });
  }

  if (payload.action === "check") {
    const challenge = typeof payload.challenge === "string" ? payload.challenge : "";
    const code = typeof payload.code === "string" ? payload.code : "";
    const result = checkCode(challenge, code);
    if (!result.ok) return Response.json({ error: result.error }, { status: 400 });
    return Response.json({ ok: true, token: result.token, email: result.email });
  }

  return Response.json({ error: "Unknown action." }, { status: 400 });
}
