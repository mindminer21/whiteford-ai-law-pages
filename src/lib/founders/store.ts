/**
 * Follow-up storage in Supabase (project supabase-charcoal-harbor), reached over its REST API with
 * the service-role key, which only the server holds. Tables: founder_followups (one row per email)
 * and founder_tool_runs (one row per completed tool). See supabase/migrations.
 *
 * Without SUPABASE_URL and a service key (local or preview) every call runs in preview mode and
 * reports what it would have stored.
 */

export type FollowUpRow = {
  email: string;
  name: string;
  company: string;
  website: string | null;
  status: "active" | "replied" | "unsubscribed" | "completed" | "paused";
  step: number;
  next_send_at: string | null;
  last_sent_at: string | null;
  last_tool_slug: string;
  last_tool_title: string;
  last_headline: string | null;
  last_signals: string[];
  tools_used: string[];
  thread_ids: string[];
  sends_count: number;
};

type StoreConfig = { url: string; headers: Record<string, string> } | null;

function config(): StoreConfig {
  const url = (process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "").replace(/\/$/, "");
  const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const secret = process.env.SUPABASE_SECRET_KEY;
  if (!url || (!serviceRole && !secret)) return null;
  const headers: Record<string, string> = serviceRole
    ? { apikey: serviceRole, Authorization: `Bearer ${serviceRole}` }
    : { apikey: secret as string };
  return { url: `${url}/rest/v1`, headers: { ...headers, "Content-Type": "application/json" } };
}

export function storeConfigured() {
  return config() !== null;
}

async function call<T>(path: string, init: RequestInit & { prefer?: string } = {}): Promise<{ ok: true; data: T } | { ok: false; detail: string }> {
  const cfg = config();
  if (!cfg) return { ok: false, detail: "not-configured" };
  try {
    const response = await fetch(`${cfg.url}${path}`, {
      ...init,
      headers: { ...cfg.headers, ...(init.prefer ? { Prefer: init.prefer } : {}), ...(init.headers ?? {}) },
      cache: "no-store",
    });
    const body = await response.text();
    if (!response.ok) {
      console.error("Founder store request failed", { path: path.split("?")[0], status: response.status, detail: body.slice(0, 300) });
      return { ok: false, detail: `supabase ${response.status}` };
    }
    return { ok: true, data: (body ? JSON.parse(body) : null) as T };
  } catch (error) {
    const detail = error instanceof Error ? error.message : "unknown";
    console.error("Founder store request failed", { path: path.split("?")[0], detail });
    return { ok: false, detail };
  }
}

export type EnrollInput = {
  email: string;
  name: string;
  company: string;
  website: string | null;
  toolSlug: string;
  toolTitle: string;
  headline: string;
  signals: string[];
  threadId: string | null;
};

export async function enrollFollowUps(input: EnrollInput) {
  if (!storeConfigured()) return { mode: "preview" as const };
  const result = await call<FollowUpRow>("/rpc/founder_followup_enroll", {
    method: "POST",
    body: JSON.stringify({
      p_email: input.email,
      p_name: input.name,
      p_company: input.company,
      p_website: input.website,
      p_tool_slug: input.toolSlug,
      p_tool_title: input.toolTitle,
      p_headline: input.headline,
      p_signals: input.signals,
      p_thread_id: input.threadId,
    }),
  });
  return result.ok ? { mode: "live" as const, row: result.data } : { mode: "failed" as const, detail: result.detail };
}

export async function recordToolRun(run: {
  email: string;
  company: string;
  toolSlug: string;
  headline: string;
  signals: string[];
  metrics: { label: string; value: string }[];
}) {
  if (!storeConfigured()) return { mode: "preview" as const };
  const result = await call<null>("/founder_tool_runs", {
    method: "POST",
    prefer: "return=minimal",
    body: JSON.stringify({
      email: run.email,
      company: run.company,
      tool_slug: run.toolSlug,
      headline: run.headline,
      signals: run.signals,
      metrics: run.metrics,
    }),
  });
  return result.ok ? { mode: "live" as const } : { mode: "failed" as const };
}

export async function dueFollowUps(limit: number, now = new Date()) {
  const params = new URLSearchParams({
    status: "eq.active",
    next_send_at: `lte.${now.toISOString()}`,
    order: "next_send_at.asc",
    limit: String(limit),
    select: "*",
  });
  return call<FollowUpRow[]>(`/founder_followups?${params.toString()}`);
}

export async function updateFollowUp(email: string, patch: Partial<FollowUpRow>) {
  const params = new URLSearchParams({ email: `eq.${email}` });
  return call<null>(`/founder_followups?${params.toString()}`, {
    method: "PATCH",
    prefer: "return=minimal",
    body: JSON.stringify({ ...patch, updated_at: new Date().toISOString() }),
  });
}

/** Marks a contact unsubscribed. Returns true when a row was updated or nothing needed storing. */
export async function unsubscribe(email: string) {
  if (!storeConfigured()) return { mode: "preview" as const };
  const params = new URLSearchParams({ email: `eq.${email}` });
  const result = await call<FollowUpRow[]>(`/founder_followups?${params.toString()}`, {
    method: "PATCH",
    prefer: "return=representation",
    body: JSON.stringify({ status: "unsubscribed", next_send_at: null, updated_at: new Date().toISOString() }),
  });
  return result.ok ? { mode: "live" as const, found: result.data.length > 0 } : { mode: "failed" as const };
}
