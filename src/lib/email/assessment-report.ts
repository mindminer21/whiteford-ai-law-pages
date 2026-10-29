import {
  complianceText,
  type AssessmentMagnetConfig,
  type AssessmentResult,
} from "@/lib/magnets/finalization";
import type { OutboundEmail } from "./agentmail";

const NAVY = "#032048";
const VIOLET = "#632DDD";
const GRANITE = "#55647A";
const RULE = "#D8DDE5";
const SNOW = "#F5F6F8";
const BOOKING_URL = "https://cal.com/jeffschell/meeting-with-jeff-schell";

function esc(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function siteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? "https://learn.schellip.com").replace(/\/$/, "");
}

function areaStatus(score: number, max: number) {
  const ratio = max ? score / max : 0;
  if (ratio >= 0.78) return { label: "Ready", color: "#2E7D4F" };
  if (ratio >= 0.45) return { label: "Gaps to close", color: "#B07A1E" };
  return { label: "Buyer red flag", color: "#B14B3D" };
}

export function buildAssessmentReportEmail({
  config,
  result,
  name,
  company,
  email,
}: {
  config: AssessmentMagnetConfig;
  result: AssessmentResult;
  name: string;
  company: string;
  email: string;
}): OutboundEmail {
  const first = name.trim().split(/\s+/)[0] || "there";
  const site = siteUrl();
  const toolUrl = `${site}/${config.slug}`;
  const rows = config.areas.map((area) => {
    const score = result.sub_scores[area.key] ?? 0;
    return { label: area.label, score, max: area.maxScore, status: areaStatus(score, area.maxScore) };
  });

  const subject = `Your ${config.title}: ${result.score}/${result.score_max}, ${result.tier.label}`;

  const text = [
    `Hi ${first},`,
    "",
    `Here is the ${config.title} result for ${company}.`,
    "",
    `Score: ${result.score} / ${result.score_max}`,
    `Tier: ${result.tier.label}`,
    result.tier.headline,
    "",
    "Buyer-diligence risk map:",
    ...rows.map((row) => `- ${row.label}: ${row.score}/${row.max} (${row.status.label})`),
    "",
    "Your three priorities for the next 60 days:",
    ...result.actions.map((action, index) => `${index + 1}. ${action}`),
    "",
    `If you'd like to talk through the result and your timeline, book a time with me: ${BOOKING_URL}`,
    "",
    "Jeff Schell",
    "Managing Partner, Mountain West",
    "Whiteford, Taylor & Preston LLP",
    "",
    `Retake the audit any time: ${toolUrl}`,
    "",
    complianceText,
  ].join("\n");

  const areaRows = rows
    .map(
      (row) => `
        <tr>
          <td style="padding:10px 0;border-top:1px solid ${RULE};font-size:15px;color:${NAVY};width:42%">${esc(row.label)}</td>
          <td style="padding:10px 12px;border-top:1px solid ${RULE};width:38%">
            <div style="background:${RULE};height:8px;width:100%">
              <div style="background:${VIOLET};height:8px;width:${Math.round((row.score / row.max) * 100)}%"></div>
            </div>
          </td>
          <td style="padding:10px 0;border-top:1px solid ${RULE};font-size:13px;color:${row.status.color};font-weight:600;text-align:right;white-space:nowrap">${row.score}/${row.max} · ${row.status.label}</td>
        </tr>`,
    )
    .join("");

  const actionItems = result.actions
    .map(
      (action, index) => `
        <tr>
          <td style="vertical-align:top;padding:10px 12px 10px 0;font-family:Georgia,serif;font-size:22px;color:${VIOLET};line-height:1">${index + 1}</td>
          <td style="padding:10px 0;font-size:15px;line-height:1.55;color:${NAVY}">${esc(action)}</td>
        </tr>`,
    )
    .join("");

  const html = `<!doctype html>
<html><body style="margin:0;padding:0;background:${SNOW};font-family:Helvetica,Arial,sans-serif;color:${NAVY}">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${SNOW}"><tr><td align="center" style="padding:28px 12px">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#FFFFFF;border:1px solid ${RULE}">
  <tr><td style="background:${NAVY};padding:22px 32px">
    <img src="${site}/logos/whiteford-white-on-navy.png" alt="Whiteford" height="24" style="height:24px;vertical-align:middle;border:0">
    <span style="display:inline-block;width:1px;height:22px;background:rgba(255,255,255,.3);margin:0 14px;vertical-align:middle"></span>
    <img src="${site}/logos/schellip-white.png" alt="Schell IP" height="16" style="height:16px;vertical-align:middle;border:0">
  </td></tr>
  <tr><td style="padding:32px 32px 8px">
    <div style="font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:${VIOLET};font-weight:600">${esc(config.title)}</div>
    <p style="font-size:16px;line-height:1.55;margin:16px 0 0">Hi ${esc(first)},</p>
    <p style="font-size:16px;line-height:1.55;margin:10px 0 0">Here is the result for <strong>${esc(company)}</strong>.</p>
  </td></tr>
  <tr><td style="padding:16px 32px">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:3px solid ${NAVY}"><tr>
      <td style="padding:18px 0 4px;vertical-align:bottom">
        <span style="font-family:Georgia,serif;font-size:56px;line-height:1;color:${NAVY}">${result.score}</span>
        <span style="font-family:Georgia,serif;font-size:22px;color:${GRANITE}"> / ${result.score_max}</span>
      </td>
      <td style="padding:18px 0 8px;text-align:right;vertical-align:bottom">
        <span style="display:inline-block;background:${VIOLET};color:#FFFFFF;font-size:13px;font-weight:600;padding:6px 12px">${esc(result.tier.label)}</span>
      </td>
    </tr></table>
    <p style="font-size:16px;line-height:1.55;color:${NAVY};margin:10px 0 0">${esc(result.tier.headline)}</p>
  </td></tr>
  <tr><td style="padding:16px 32px 0">
    <div style="font-family:Georgia,serif;font-size:21px;margin-bottom:6px">Buyer-diligence risk map</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${areaRows}</table>
  </td></tr>
  <tr><td style="padding:24px 32px 0">
    <div style="font-family:Georgia,serif;font-size:21px;margin-bottom:4px">Your three priorities for the next 60 days</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${actionItems}</table>
  </td></tr>
  <tr><td style="padding:24px 32px 8px">
    <p style="font-size:15px;line-height:1.55;margin:0">Buyers price what they can verify. If you'd like to talk through this result and your timeline, I'm glad to.</p>
    <p style="margin:18px 0 0"><a href="${BOOKING_URL}" style="display:inline-block;background:${NAVY};color:#FFFFFF;text-decoration:none;font-weight:600;font-size:15px;padding:13px 22px">Book a time with Jeff</a></p>
  </td></tr>
  <tr><td style="padding:22px 32px 26px">
    <table role="presentation" cellpadding="0" cellspacing="0"><tr>
      <td style="padding-right:14px;vertical-align:middle"><img src="${site}/logos/jeff-schell.jpg" alt="Jeff Schell" width="56" height="56" style="width:56px;height:56px;border-radius:50%;object-fit:cover;border:0"></td>
      <td style="vertical-align:middle;font-size:14px;line-height:1.5;color:${NAVY}"><strong>Jeff Schell</strong><br><span style="color:${GRANITE}">Managing Partner, Mountain West<br>Whiteford, Taylor &amp; Preston LLP</span></td>
    </tr></table>
  </td></tr>
  <tr><td style="background:${SNOW};padding:18px 32px;border-top:1px solid ${RULE}">
    <p style="font-size:12px;line-height:1.55;color:${GRANITE};margin:0">${esc(complianceText)}</p>
    <p style="font-size:12px;line-height:1.55;color:${GRANITE};margin:10px 0 0">You received this because you requested it at <a href="${toolUrl}" style="color:${VIOLET}">${esc(toolUrl.replace(/^https?:\/\//, ""))}</a> as ${esc(email)}.</p>
  </td></tr>
</table>
</td></tr></table>
</body></html>`;

  return { to: email, subject, text, html, labels: ["lead-magnet-report", `magnet:${config.slug}`, `tier:${result.tier.key}`] };
}
