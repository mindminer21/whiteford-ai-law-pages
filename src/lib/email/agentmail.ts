/**
 * Minimal AgentMail sender (https://agentmail.to), used instead of a bulk email service.
 *
 * Env:
 *   AGENTMAIL_API_KEY   API key for the AgentMail organization (required to send). Falls back to the
 *                       project's existing RESOURCE_AGENTMAIL_API_KEY when not set.
 *   AGENTMAIL_INBOX_ID  Sending inbox address: jeff@mail.schellip.com (required to send)
 *   AGENTMAIL_REPLY_TO  Optional reply-to address (defaults to the sending inbox, so replies reach Jeff)
 *   AGENTMAIL_BCC       Optional internal copy of every report, comma-separated
 *
 * Without the key and inbox the sender runs in preview mode and returns the message it would have sent.
 */

const AGENTMAIL_API = "https://api.agentmail.to/v0";

export type OutboundEmail = {
  to: string;
  subject: string;
  text: string;
  html: string;
  labels?: string[];
};

export type EmailDelivery =
  | { mode: "sent"; messageId?: string; threadId?: string }
  | { mode: "preview"; message: OutboundEmail & { from: string | null } }
  | { mode: "failed"; detail: string };

function splitList(value: string | undefined) {
  return (value ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export async function sendViaAgentMail(email: OutboundEmail): Promise<EmailDelivery> {
  const apiKey = process.env.AGENTMAIL_API_KEY || process.env.RESOURCE_AGENTMAIL_API_KEY;
  const inboxId = process.env.AGENTMAIL_INBOX_ID;

  if (!apiKey || !inboxId) {
    return { mode: "preview", message: { ...email, from: inboxId ?? null } };
  }

  const replyTo = process.env.AGENTMAIL_REPLY_TO?.trim();
  const bcc = splitList(process.env.AGENTMAIL_BCC);

  try {
    const response = await fetch(`${AGENTMAIL_API}/inboxes/${encodeURIComponent(inboxId)}/messages/send`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: [email.to],
        subject: email.subject,
        text: email.text,
        html: email.html,
        ...(replyTo ? { reply_to: [replyTo] } : {}),
        ...(bcc.length ? { bcc } : {}),
        ...(email.labels?.length ? { labels: email.labels } : {}),
      }),
    });

    if (!response.ok) {
      const detail = (await response.text()).slice(0, 500);
      console.error("AgentMail send failed", { status: response.status, detail });
      return { mode: "failed", detail: `AgentMail ${response.status}` };
    }

    const data = (await response.json().catch(() => ({}))) as { message_id?: string; thread_id?: string };
    return { mode: "sent", messageId: data.message_id, threadId: data.thread_id };
  } catch (error) {
    const detail = error instanceof Error ? error.message : "Unknown AgentMail error";
    console.error("AgentMail send failed", { detail });
    return { mode: "failed", detail };
  }
}

/**
 * True when anyone other than the sending inbox has written in the thread (i.e. the recipient
 * replied). Returns null when the thread can't be read, so callers can skip rather than guess.
 */
export async function threadHasReplyFrom(threadId: string, address: string): Promise<boolean | null> {
  const apiKey = process.env.AGENTMAIL_API_KEY || process.env.RESOURCE_AGENTMAIL_API_KEY;
  const inboxId = process.env.AGENTMAIL_INBOX_ID;
  if (!apiKey || !inboxId) return null;
  try {
    const response = await fetch(
      `${AGENTMAIL_API}/inboxes/${encodeURIComponent(inboxId)}/threads/${encodeURIComponent(threadId)}`,
      { headers: { Authorization: `Bearer ${apiKey}` }, cache: "no-store" },
    );
    if (!response.ok) return null;
    const thread = (await response.json()) as { messages?: { from?: string }[] };
    const target = address.trim().toLowerCase();
    return (thread.messages ?? []).some((message) => (message.from ?? "").toLowerCase().includes(target));
  } catch {
    return null;
  }
}
