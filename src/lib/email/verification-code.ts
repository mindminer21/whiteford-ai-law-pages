import type { OutboundEmail } from "./agentmail";

const NAVY = "#032048";
const VIOLET = "#632DDD";
const GRANITE = "#55647A";
const RULE = "#D8DDE5";
const SNOW = "#F5F6F8";

function esc(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function siteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? "https://learn.schellip.com").replace(/\/$/, "");
}

export function buildVerificationEmail({
  email,
  name,
  code,
  toolTitle,
}: {
  email: string;
  name: string;
  code: string;
  toolTitle: string;
}): OutboundEmail {
  const first = name.trim().split(/\s+/)[0] || "there";
  const site = siteUrl();
  const spaced = `${code.slice(0, 3)} ${code.slice(3)}`;

  const text = [
    `Hi ${first},`,
    "",
    `Your verification code for the ${toolTitle} is: ${code}`,
    "",
    "Enter it on the page to start the audit. The code expires in 15 minutes.",
    "",
    "If you didn't request this, you can ignore this email.",
    "",
    "Jeff Schell",
    "Whiteford, Taylor & Preston LLP",
  ].join("\n");

  const html = `<!doctype html>
<html><body style="margin:0;padding:0;background:${SNOW};font-family:Helvetica,Arial,sans-serif;color:${NAVY}">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${SNOW}"><tr><td align="center" style="padding:28px 12px">
<table role="presentation" width="520" cellpadding="0" cellspacing="0" style="max-width:520px;width:100%;background:#FFFFFF;border:1px solid ${RULE}">
  <tr><td style="background:${NAVY};padding:20px 28px">
    <img src="${site}/logos/whiteford-white-on-navy.png" alt="Whiteford" height="28" style="height:28px;vertical-align:middle;border:0">
    <span style="display:inline-block;width:1px;height:20px;background:rgba(255,255,255,.3);margin:0 12px;vertical-align:middle"></span>
    <img src="${site}/logos/schellip-white.png" alt="Schell IP" height="11" style="height:11px;vertical-align:middle;border:0">
  </td></tr>
  <tr><td style="padding:30px 28px 8px">
    <div style="font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:${VIOLET};font-weight:600">${esc(toolTitle)}</div>
    <p style="font-size:16px;line-height:1.55;margin:16px 0 0">Hi ${esc(first)}, here is your verification code:</p>
  </td></tr>
  <tr><td style="padding:12px 28px">
    <div style="font-family:'Courier New',monospace;font-size:38px;letter-spacing:.18em;font-weight:700;color:${NAVY};background:${SNOW};border:1px solid ${RULE};text-align:center;padding:18px 0">${spaced}</div>
  </td></tr>
  <tr><td style="padding:8px 28px 28px">
    <p style="font-size:15px;line-height:1.55;margin:0;color:${NAVY}">Enter it on the page to start the audit. The code expires in 15 minutes.</p>
    <p style="font-size:13px;line-height:1.55;margin:14px 0 0;color:${GRANITE}">If you didn't request this at ${esc(site.replace(/^https?:\/\//, ""))}, you can ignore this email. It was sent to ${esc(email)}.</p>
  </td></tr>
</table>
</td></tr></table>
</body></html>`;

  return {
    to: email,
    subject: `Your verification code: ${code}`,
    text,
    html,
    labels: ["lead-magnet-verification"],
  };
}
