import { timingSafeEqual } from "node:crypto";
import { sendViaAgentMail, threadHasReplyFrom } from "@/lib/email/agentmail";
import { upsertContact } from "@/lib/founders/crm";
import { buildFollowUpEmail, FOLLOW_UP_GAPS_DAYS, FOLLOW_UP_STEPS } from "@/lib/founders/emails";
import { dueFollowUps, storeConfigured, updateFollowUp, type FollowUpRow } from "@/lib/founders/store";

/**
 * Daily follow-up job, run by Vercel Cron (see vercel.json). Vercel sends
 * "Authorization: Bearer <CRON_SECRET>"; the job refuses to run without that secret configured.
 *
 * For each contact whose next follow-up is due:
 *  1. If they have replied in any watched AgentMail thread, stop the sequence (status "replied")
 *     and tag them in HighLevel so Jeff follows up personally.
 *  2. Otherwise send the next email from jeff@mail.schellip.com and schedule the one after.
 *
 * Add ?dry=1 to see what would be sent without sending.
 */

export const maxDuration = 60;
export const dynamic = "force-dynamic";

const BATCH = 40;

function authorized(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  const given = request.headers.get("authorization") ?? "";
  const expected = `Bearer ${secret}`;
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

async function hasReplied(row: FollowUpRow) {
  for (const threadId of row.thread_ids.slice(-5)) {
    const replied = await threadHasReplyFrom(threadId, row.email);
    if (replied) return true;
  }
  return false;
}

export async function GET(request: Request) {
  if (!process.env.CRON_SECRET) {
    return Response.json({ error: "CRON_SECRET is not configured." }, { status: 503 });
  }
  if (!authorized(request)) return Response.json({ error: "Unauthorized." }, { status: 401 });
  if (!storeConfigured()) return Response.json({ error: "Follow-up storage is not configured." }, { status: 503 });

  const dryRun = new URL(request.url).searchParams.get("dry") === "1";
  const due = await dueFollowUps(BATCH);
  if (!due.ok) return Response.json({ error: "Could not load due follow-ups." }, { status: 502 });

  const results: { email: string; outcome: string; step?: number }[] = [];

  for (const row of due.data) {
    if (await hasReplied(row)) {
      if (!dryRun) {
        await updateFollowUp(row.email, { status: "replied", next_send_at: null });
        await upsertContact({ email: row.email, name: row.name, company: row.company, tags: ["followup:replied"] });
      }
      results.push({ email: row.email, outcome: "replied" });
      continue;
    }

    const step = row.step + 1;
    if (step > FOLLOW_UP_STEPS) {
      if (!dryRun) await updateFollowUp(row.email, { status: "completed", next_send_at: null });
      results.push({ email: row.email, outcome: "completed" });
      continue;
    }

    const message = buildFollowUpEmail(
      {
        email: row.email,
        name: row.name,
        company: row.company,
        lastToolSlug: row.last_tool_slug,
        lastToolTitle: row.last_tool_title,
        lastHeadline: row.last_headline,
        toolsUsed: row.tools_used,
      },
      step,
    );

    if (dryRun) {
      results.push({ email: row.email, outcome: `would send: ${message.subject}`, step });
      continue;
    }

    const delivery = await sendViaAgentMail(message);
    if (delivery.mode !== "sent") {
      // Try again tomorrow; preview mode means email isn't configured in this environment.
      const retry = new Date(Date.now() + 86_400_000).toISOString();
      await updateFollowUp(row.email, { next_send_at: retry });
      results.push({ email: row.email, outcome: `not sent (${delivery.mode})`, step });
      continue;
    }

    const now = new Date();
    const gap = FOLLOW_UP_GAPS_DAYS[step];
    const threads = delivery.threadId ? [...row.thread_ids, delivery.threadId].slice(-10) : row.thread_ids;
    await updateFollowUp(row.email, {
      step,
      last_sent_at: now.toISOString(),
      sends_count: row.sends_count + 1,
      thread_ids: threads,
      ...(gap === undefined
        ? { status: "completed", next_send_at: null }
        : { next_send_at: new Date(now.getTime() + gap * 86_400_000).toISOString() }),
    });
    results.push({ email: row.email, outcome: "sent", step });
  }

  console.info("Founder follow-ups run", {
    due: due.data.length,
    sent: results.filter((result) => result.outcome === "sent").length,
    replied: results.filter((result) => result.outcome === "replied").length,
    dryRun,
  });

  return Response.json({ ok: true, dry_run: dryRun, processed: results.length, results });
}
