import { upsertContact } from "@/lib/founders/crm";
import { checkSignature } from "@/lib/founders/signing";
import { unsubscribe } from "@/lib/founders/store";

export const dynamic = "force-dynamic";

function page(title: string, body: string, status = 200) {
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex"><title>${title}</title></head>
<body style="margin:0;background:#F5F6F8;font-family:Helvetica,Arial,sans-serif;color:#032048">
<main style="max-width:520px;margin:64px auto;padding:32px;background:#fff;border:1px solid #D8DDE5">
<img src="/logos/whiteford-navy-on-light.png" alt="Whiteford" height="28" style="height:28px">
<h1 style="font-family:Georgia,serif;font-weight:400;font-size:28px;margin:24px 0 12px">${title}</h1>
<p style="font-size:16px;line-height:1.6;margin:0">${body}</p>
<p style="font-size:14px;line-height:1.6;margin:20px 0 0"><a href="/founders" style="color:#632DDD">Back to the Founder Library</a></p>
</main></body></html>`;
  return new Response(html, { status, headers: { "Content-Type": "text/html; charset=utf-8" } });
}

async function handle(request: Request) {
  const url = new URL(request.url);
  const email = (url.searchParams.get("e") ?? "").trim().toLowerCase();
  const signature = url.searchParams.get("s");
  if (!email || !checkSignature("unsubscribe", email, signature)) {
    return page("That link didn't work", "The unsubscribe link is incomplete. Reply to any of our emails with \"unsubscribe\" and we'll take care of it.", 400);
  }
  const result = await unsubscribe(email);
  if (result.mode === "failed") {
    return page("Something went wrong", "We couldn't update your preferences just now. Please try the link again, or reply to the email with \"unsubscribe\".", 502);
  }
  await upsertContact({ email, name: "", company: "", tags: ["followup:unsubscribed"] }).catch(() => undefined);
  return page("You're unsubscribed", "You won't receive any more follow-up emails from the Founder Library. If you ever want to talk, reply to any earlier email and it will still reach Jeff.");
}

export async function GET(request: Request) {
  return handle(request);
}

/** One-click unsubscribe (RFC 8058) posts to the same URL. */
export async function POST(request: Request) {
  return handle(request);
}
