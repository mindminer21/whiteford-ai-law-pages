import { sendViaAgentMail } from "@/lib/email/agentmail";
import { upsertContact } from "@/lib/founders/crm";
import { buildToolReportEmail } from "@/lib/founders/emails";
import { validateValues } from "@/lib/founders/fields";
import { FOUNDERS_VERIFY_SCOPE, getTool } from "@/lib/founders/registry";
import { enrollFollowUps, recordToolRun } from "@/lib/founders/store";
import { normalizeEmail, verifyToken } from "@/lib/verify/email-code";

export const maxDuration = 30;

type Payload = {
  tool?: unknown;
  values?: unknown;
  name?: unknown;
  email?: unknown;
  company?: unknown;
  website?: unknown;
  consent?: unknown;
  verification_token?: unknown;
};

function compact(value: unknown, max = 160) {
  return typeof value === "string" && value.trim().length > 0 && value.length <= max && !/[\r\n<>]/.test(value)
    ? value.trim()
    : null;
}

function normalizeWebsite(value: unknown) {
  const site = compact(value, 120);
  if (!site) return null;
  if (!/^(https?:\/\/)?[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{2,}(\/[^\s<>"]*)?$/i.test(site)) return undefined;
  return /^https?:\/\//i.test(site) ? site : `https://${site}`;
}

export async function POST(request: Request) {
  let payload: Payload;
  try {
    payload = (await request.json()) as Payload;
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const tool = getTool(payload.tool);
  if (!tool) return Response.json({ error: "Unknown tool." }, { status: 400 });

  const name = compact(payload.name);
  const rawEmail = compact(payload.email, 254);
  const company = compact(payload.company);
  const website = normalizeWebsite(payload.website);
  if (!name || !rawEmail || !company) return Response.json({ error: "Name, email and company are required." }, { status: 400 });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(rawEmail)) return Response.json({ error: "Enter a valid email." }, { status: 400 });
  if (website === undefined) return Response.json({ error: "Website must be a valid web address." }, { status: 400 });
  if (payload.consent !== true) return Response.json({ error: "Consent is required." }, { status: 400 });

  const email = normalizeEmail(rawEmail);
  if (!verifyToken(payload.verification_token, email, FOUNDERS_VERIFY_SCOPE)) {
    return Response.json({ error: "Please verify your email again.", code: "token" }, { status: 401 });
  }

  const checked = validateValues(tool.pages, payload.values);
  if ("error" in checked) return Response.json({ error: checked.error }, { status: 400 });

  let report;
  try {
    report = tool.compute(checked.values);
  } catch (error) {
    console.error("Founder tool compute failed", { tool: tool.slug, detail: error instanceof Error ? error.message : error });
    return Response.json({ error: "We couldn't calculate that. Check the numbers and try again." }, { status: 400 });
  }

  const delivery = await sendViaAgentMail(buildToolReportEmail({ tool, report, name, company, email }));
  const threadId = delivery.mode === "sent" ? delivery.threadId ?? null : null;
  const completedAt = new Date().toISOString();

  const [crm, followUps, run] = await Promise.all([
    upsertContact({
      email,
      name,
      company,
      website,
      tags: [
        "whiteford-mountain-west",
        "founder-library",
        `founder-tool:${tool.slug}`,
        `founder-stage:${tool.stage}`,
        "followup:founder-sequence",
        ...report.signals,
      ],
      customFields: [
        { key: "last_magnet_slug", field_value: tool.slug },
        { key: "last_magnet_completed_at", field_value: completedAt },
        { key: "last_magnet_headline", field_value: report.headline.slice(0, 250) },
        { key: "company_website", field_value: website },
        { key: "last_magnet_email_status", field_value: `agentmail:${delivery.mode}` },
      ],
    }),
    enrollFollowUps({
      email,
      name,
      company,
      website,
      toolSlug: tool.slug,
      toolTitle: tool.title,
      headline: report.headline,
      signals: report.signals,
      threadId,
    }),
    recordToolRun({
      email,
      company,
      toolSlug: tool.slug,
      headline: report.headline,
      signals: report.signals,
      metrics: report.metrics.map(({ label, value }) => ({ label, value })),
    }),
  ]);

  return Response.json({
    ok: true,
    report,
    email_delivery: delivery.mode,
    crm: crm.mode,
    follow_ups: followUps.mode,
    tool_run: run.mode,
    ...(delivery.mode === "preview" ? { email_preview: { to: delivery.message.to, subject: delivery.message.subject } } : {}),
  });
}
