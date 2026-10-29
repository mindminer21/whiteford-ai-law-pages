import type { OutboundEmail } from "../email/agentmail";
import { BOOKING_URL, getTool } from "./registry";
import { siteUrl, unsubscribeUrl } from "./signing";
import type { ToolReport, ToolSpec } from "./types";

const NAVY = "#032048";
const VIOLET = "#632DDD";
const GRANITE = "#55647A";
const RULE = "#D8DDE5";
const SNOW = "#F5F6F8";
const FLAG = "#B14B3D";
const OK = "#2E7D4F";

export const FIRM_ADDRESS = "Whiteford, Taylor & Preston LLP · 2128 W. 32nd Ave., Suite 200 · Denver, CO 80211";

export const founderComplianceText =
  "This tool is for general informational purposes only and is not legal, tax or financial advice. Using it does not create an attorney-client relationship with Whiteford, Taylor & Preston LLP or Schell IP. Results are estimates based on the information you entered and general rules that change; confirm them with counsel before acting. Do not submit confidential, privileged or trade-secret information. Any engagement is subject to a conflicts check and a written engagement letter. Attorney advertising.";

export function esc(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function firstName(name: string) {
  return name.trim().split(/\s+/)[0] || "there";
}

function header(site: string) {
  return `<tr><td style="background:${NAVY};padding:22px 32px">
    <img src="${site}/logos/whiteford-white-on-navy.png" alt="Whiteford" height="28" style="height:28px;vertical-align:middle;border:0">
    <span style="display:inline-block;width:1px;height:22px;background:rgba(255,255,255,.3);margin:0 14px;vertical-align:middle"></span>
    <img src="${site}/logos/schellip-white.png" alt="Schell IP" height="11" style="height:11px;vertical-align:middle;border:0">
  </td></tr>`;
}

function signature(site: string) {
  return `<table role="presentation" cellpadding="0" cellspacing="0"><tr>
      <td style="padding-right:14px;vertical-align:middle"><img src="${site}/logos/jeff-schell.jpg" alt="Jeff Schell" width="56" height="56" style="width:56px;height:56px;border-radius:50%;object-fit:cover;border:0"></td>
      <td style="vertical-align:middle;font-size:14px;line-height:1.5;color:${NAVY}"><strong>Jeff Schell</strong><br><span style="color:${GRANITE}">Managing Partner, Mountain West<br>Whiteford, Taylor &amp; Preston LLP</span></td>
    </tr></table>`;
}

function footer(email: string, reason: string) {
  const unsub = unsubscribeUrl(email);
  return `<tr><td style="background:${SNOW};padding:18px 32px;border-top:1px solid ${RULE}">
    <p style="font-size:12px;line-height:1.55;color:${GRANITE};margin:0">${esc(founderComplianceText)}</p>
    <p style="font-size:12px;line-height:1.55;color:${GRANITE};margin:10px 0 0">${reason} Sent to ${esc(email)}. <a href="${unsub}" style="color:${VIOLET}">Stop follow-up emails</a>.</p>
    <p style="font-size:12px;line-height:1.55;color:${GRANITE};margin:10px 0 0">${esc(FIRM_ADDRESS)}</p>
  </td></tr>`;
}

function textFooter(email: string, reason: string) {
  return ["", "—", founderComplianceText, "", `${reason} Sent to ${email}.`, `Stop follow-up emails: ${unsubscribeUrl(email)}`, FIRM_ADDRESS];
}

function wrap(inner: string) {
  return `<!doctype html>
<html><body style="margin:0;padding:0;background:${SNOW};font-family:Helvetica,Arial,sans-serif;color:${NAVY}">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${SNOW}"><tr><td align="center" style="padding:28px 12px">
<table role="presentation" width="640" cellpadding="0" cellspacing="0" style="max-width:640px;width:100%;background:#FFFFFF;border:1px solid ${RULE}">
${inner}
</table>
</td></tr></table>
</body></html>`;
}

/** The report email sent the moment someone finishes a tool. */
export function buildToolReportEmail({
  tool,
  report,
  name,
  company,
  email,
}: {
  tool: ToolSpec;
  report: ToolReport;
  name: string;
  company: string;
  email: string;
}): OutboundEmail {
  const site = siteUrl();
  const toolUrl = `${site}/founders/${tool.slug}`;
  const first = firstName(name);
  const reason = `You received this because you used the ${tool.title} at learn.schellip.com.`;

  const text = [
    `Hi ${first},`,
    "",
    `Here is your ${tool.title} report for ${company}.`,
    "",
    report.headline,
    report.summary,
    "",
    ...report.metrics.map((metric) => `${metric.label}: ${metric.value}${metric.note ? ` (${metric.note})` : ""}`),
    ...report.tables.flatMap((table) => [
      "",
      `${table.title}`,
      `${table.columns.join(" | ")}`,
      ...table.rows.map((row) => row.join(" | ")),
      ...(table.note ? [table.note] : []),
    ]),
    ...report.sections.flatMap((section) => ["", section.title, ...section.items.map((item) => `- ${item}`)]),
    "",
    "Next steps",
    ...report.nextSteps.map((step, index) => `${index + 1}. ${step}`),
    "",
    `Questions about the result? Reply to this email or book a free consultation: ${BOOKING_URL}`,
    "",
    "Jeff Schell",
    "Managing Partner, Mountain West",
    "Whiteford, Taylor & Preston LLP",
    "",
    `Run it again: ${toolUrl}`,
    ...textFooter(email, reason),
  ].join("\n");

  const metricCells = report.metrics
    .map(
      (metric) => `<td style="padding:12px 14px 12px 0;vertical-align:top;width:50%">
        <div style="font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:${GRANITE}">${esc(metric.label)}</div>
        <div style="font-family:Georgia,serif;font-size:26px;line-height:1.2;color:${NAVY};margin-top:4px">${esc(metric.value)}</div>
        ${metric.note ? `<div style="font-size:12px;line-height:1.4;color:${GRANITE};margin-top:3px">${esc(metric.note)}</div>` : ""}
      </td>`,
    );
  const metricRows: string[] = [];
  for (let i = 0; i < metricCells.length; i += 2) metricRows.push(`<tr>${metricCells[i]}${metricCells[i + 1] ?? "<td></td>"}</tr>`);

  const tables = report.tables
    .map(
      (table) => `<tr><td style="padding:20px 32px 0">
      <div style="font-family:Georgia,serif;font-size:20px;margin-bottom:8px">${esc(table.title)}</div>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:13px">
        <tr>${table.columns.map((column, index) => `<th style="text-align:${index === 0 ? "left" : "right"};padding:7px 6px;border-bottom:2px solid ${NAVY};font-weight:600;color:${NAVY}">${esc(column)}</th>`).join("")}</tr>
        ${table.rows
          .map(
            (row, rowIndex) =>
              `<tr>${row
                .map(
                  (cell, index) =>
                    `<td style="text-align:${index === 0 ? "left" : "right"};padding:7px 6px;border-bottom:1px solid ${RULE};color:${NAVY};${rowIndex === table.rows.length - 1 && /total/i.test(row[0]) ? "font-weight:600;" : ""}">${esc(cell)}</td>`,
                )
                .join("")}</tr>`,
          )
          .join("")}
      </table>
      ${table.note ? `<p style="font-size:12px;line-height:1.5;color:${GRANITE};margin:8px 0 0">${esc(table.note)}</p>` : ""}
    </td></tr>`,
    )
    .join("");

  const sections = report.sections
    .map((section) => {
      const color = section.tone === "flag" ? FLAG : section.tone === "ok" ? OK : VIOLET;
      return `<tr><td style="padding:20px 32px 0">
      <div style="border-left:3px solid ${color};padding-left:14px">
        <div style="font-family:Georgia,serif;font-size:19px;margin-bottom:6px">${esc(section.title)}</div>
        ${section.items.map((item) => `<p style="font-size:14px;line-height:1.55;margin:6px 0;color:${NAVY}">${esc(item)}</p>`).join("")}
      </div>
    </td></tr>`;
    })
    .join("");

  const steps = report.nextSteps
    .map(
      (step, index) => `<tr>
        <td style="vertical-align:top;padding:8px 12px 8px 0;font-family:Georgia,serif;font-size:20px;color:${VIOLET};line-height:1">${index + 1}</td>
        <td style="padding:8px 0;font-size:15px;line-height:1.55;color:${NAVY}">${esc(step)}</td>
      </tr>`,
    )
    .join("");

  const html = wrap(`${header(site)}
  <tr><td style="padding:30px 32px 6px">
    <div style="font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:${VIOLET};font-weight:600">${esc(tool.title)}</div>
    <p style="font-size:16px;line-height:1.55;margin:16px 0 0">Hi ${esc(first)}, here is your report for <strong>${esc(company)}</strong>.</p>
    <div style="font-family:Georgia,serif;font-size:24px;line-height:1.3;margin:18px 0 0;padding-top:16px;border-top:3px solid ${NAVY}">${esc(report.headline)}</div>
    <p style="font-size:15px;line-height:1.6;color:${NAVY};margin:12px 0 0">${esc(report.summary)}</p>
  </td></tr>
  ${report.metrics.length ? `<tr><td style="padding:6px 32px 0"><table role="presentation" width="100%" cellpadding="0" cellspacing="0">${metricRows.join("")}</table></td></tr>` : ""}
  ${tables}
  ${sections}
  <tr><td style="padding:22px 32px 0">
    <div style="font-family:Georgia,serif;font-size:20px;margin-bottom:4px">Next steps</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${steps}</table>
  </td></tr>
  <tr><td style="padding:22px 32px 8px">
    <p style="font-size:15px;line-height:1.55;margin:0">Questions about the result? Reply to this email, or book a free consultation.</p>
    <p style="margin:18px 0 0"><a href="${BOOKING_URL}" style="display:inline-block;background:${VIOLET};color:#FFFFFF;text-decoration:none;font-weight:600;font-size:15px;padding:13px 22px">Book a Free Consultation</a></p>
  </td></tr>
  <tr><td style="padding:22px 32px 26px">${signature(site)}
    <p style="font-size:13px;margin:16px 0 0"><a href="${toolUrl}" style="color:${VIOLET}">Run the ${esc(tool.title)} again</a> · <a href="${site}/founders" style="color:${VIOLET}">Founder Library</a></p>
  </td></tr>
  ${footer(email, reason)}`);

  return {
    to: email,
    subject: `Your ${tool.title}: ${report.headline.length > 90 ? `${report.headline.slice(0, 87)}...` : report.headline}`,
    text,
    html,
    labels: ["founder-library", "founder-report", `tool:${tool.slug}`],
  };
}

/** Days to wait after the previous follow-up (or after enrollment) before each step. */
export const FOLLOW_UP_GAPS_DAYS = [2, 7, 21, 90, 90, 90, 90, 90, 90] as const;
export const FOLLOW_UP_STEPS = FOLLOW_UP_GAPS_DAYS.length;

export type FollowUpContact = {
  email: string;
  name: string;
  company: string;
  lastToolSlug: string;
  lastToolTitle: string;
  lastHeadline: string | null;
  toolsUsed: string[];
};

type QuarterlyNote = { subject: (company: string) => string; body: string; suggest?: string };

const quarterlyNotes: QuarterlyNote[] = [
  {
    subject: (company) => `${company}: anything on the horizon this quarter?`,
    body: "I check in with founders who have used the Founder Library every few months. Is anything coming up this quarter, such as a raise, a key hire, a new product launch or an acquisition conversation? Those are the moments when an hour of planning saves the most.",
  },
  {
    subject: (company) => `${company}: the diligence item that delays the most deals`,
    body: "In the deals I see, the item that most often slows a financing or sale is IP ownership: a founder's pre-incorporation work, a contractor without an assignment, or code from a prior employer. It's cheap to fix early and expensive to fix under a deadline.",
    suggest: "ip-ownership-audit",
  },
  {
    subject: (company) => `${company}: is your equity paperwork current?`,
    body: "A quick equity check: option grants need a current 409A valuation (usually refreshed every 12 months or after a financing), board approval and signed grant paperwork. Gaps here are among the most common cleanup items in diligence.",
    suggest: "option-pool-sizer",
  },
  {
    subject: (company) => `${company}: a short annual legal checkup`,
    body: "A short annual checklist many companies skip: state annual reports and franchise taxes, board approval of the year's equity grants, updated contractor and employee IP agreements, and a look at whether your entity and state of incorporation still fit your plans.",
  },
  {
    subject: (company) => `${company}: thinking about an exit, even a distant one?`,
    body: "Even if a sale is years away, the companies that sell well tend to have done the cleanup early. The Sale & Investor Readiness Audit scores the five areas buyers look at first and gives you a 60-day cleanup plan.",
    suggest: "/sale-readiness-audit",
  },
  {
    subject: (company) => `${company}: my last scheduled check-in`,
    body: "This is my last scheduled check-in, so I'll stop sending these after today. If a financing, a sale, an IP question or a Colorado employment issue comes up, reply to this email any time and it comes straight to me.",
  },
];

function toolLink(slugOrPath: string | undefined, site: string): { href: string; title: string } | null {
  if (!slugOrPath) return null;
  if (slugOrPath.startsWith("/")) return { href: `${site}${slugOrPath}`, title: "Sale & Investor Readiness Audit" };
  const tool = getTool(slugOrPath);
  return tool ? { href: `${site}/founders/${tool.slug}`, title: tool.title } : null;
}

/** Follow-up copy for tools outside the Founder Library that enroll in the same sequence. */
const externalFollowUps: Record<string, { title: string; topic: string; angles: [string, string, string]; related: string[] }> = {
  "sale-readiness-audit": {
    title: "Sale & Investor Readiness Audit",
    topic: "your exit planning",
    angles: [
      "The audit's lowest-scoring area is usually where a buyer's counsel will spend the most time, and it tends to become a price or escrow conversation rather than a deal-breaker if it's found late. Fixing it early is almost always cheaper.",
      "One practical step: start a simple data room now, even a shared folder, and file your formation documents, cap table, IP assignments and key customer contracts as you go. When a buyer or lead investor shows up, you'll be weeks ahead.",
      "Many founders I talk with aren't selling soon but want to know what their company would look like to a buyer today. If that's you, a short conversation about structure, timing and the IP story can shape the next year of decisions.",
    ],
    related: ["diligence-list-builder", "ip-ownership-audit", "safe-calculator"],
  },
};

/**
 * Builds follow-up number `step` (1-based) for a contact. Steps 1 to 3 build on the last tool's
 * result; steps 4 and later are quarterly check-ins.
 */
export function buildFollowUpEmail(contact: FollowUpContact, step: number): OutboundEmail {
  const site = siteUrl();
  const first = firstName(contact.name);
  const tool = getTool(contact.lastToolSlug);
  const toolTitle = tool?.title ?? externalFollowUps[contact.lastToolSlug]?.title ?? contact.lastToolTitle;
  const reason = "You're receiving occasional follow-ups because you used a tool in the Founder Library at learn.schellip.com and agreed to follow-up emails.";

  let subject: string;
  const paragraphs: string[] = [];
  let suggestion: { href: string; title: string } | null = null;

  const external = externalFollowUps[contact.lastToolSlug];
  const sequence = tool
    ? { title: tool.title, topic: tool.followUpTopic, angles: tool.followUpAngles, related: tool.related }
    : external
      ? { title: external.title, topic: external.topic, angles: external.angles, related: external.related }
      : null;

  if (step <= 3 && sequence) {
    const angle = sequence.angles[step - 1];
    if (step === 1) {
      subject = `Following up on ${sequence.title}`;
      paragraphs.push(
        `Jeff Schell here. You ran the ${toolTitle} for ${contact.company} a couple of days ago${contact.lastHeadline ? `, and the headline was: "${contact.lastHeadline}"` : ""}.`,
        angle,
        "If it would help to talk through what the numbers mean for you, reply to this email or grab time on my calendar.",
      );
    } else if (step === 2) {
      subject = `${contact.company}: one thing worth checking`;
      paragraphs.push(angle);
      const next = sequence.related.map((slug) => getTool(slug)).find((candidate) => candidate && !contact.toolsUsed.includes(candidate.slug));
      if (next) suggestion = { href: `${site}/founders/${next.slug}`, title: next.title };
      paragraphs.push("Happy to answer questions by email if that's easier.");
    } else {
      subject = `Checking in on ${contact.company}`;
      paragraphs.push(angle, `Where do things stand with ${sequence.topic}? A one-line reply is plenty.`);
    }
  } else {
    const note = quarterlyNotes[Math.min(Math.max(step - 4, 0), quarterlyNotes.length - 1)];
    subject = note.subject(contact.company);
    paragraphs.push(note.body);
    suggestion = toolLink(note.suggest, site);
    if (suggestion && !suggestion.href.includes("sale-readiness") && contact.toolsUsed.some((slug) => suggestion?.href.endsWith(`/${slug}`))) {
      suggestion = null;
    }
  }

  const text = [
    `Hi ${first},`,
    "",
    ...paragraphs.flatMap((paragraph) => [paragraph, ""]),
    ...(suggestion ? [`${suggestion.title}: ${suggestion.href}`, ""] : []),
    `Book a free consultation: ${BOOKING_URL}`,
    "",
    "Jeff",
    "",
    "Jeff Schell",
    "Managing Partner, Mountain West",
    "Whiteford, Taylor & Preston LLP",
    ...textFooter(contact.email, reason),
  ].join("\n");

  const html = wrap(`<tr><td style="padding:28px 32px 8px;font-size:15px;line-height:1.6;color:${NAVY}">
    <p style="margin:0 0 14px">Hi ${esc(first)},</p>
    ${paragraphs.map((paragraph) => `<p style="margin:0 0 14px">${esc(paragraph)}</p>`).join("")}
    ${suggestion ? `<p style="margin:0 0 14px"><a href="${suggestion.href}" style="color:${VIOLET};font-weight:600">${esc(suggestion.title)} &rarr;</a></p>` : ""}
    <p style="margin:0 0 14px"><a href="${BOOKING_URL}" style="color:${VIOLET};font-weight:600">Book a free consultation</a></p>
    <p style="margin:0 0 18px">Jeff</p>
    ${signature(site)}
  </td></tr>
  ${footer(contact.email, reason)}`);

  return {
    to: contact.email,
    subject,
    text,
    html,
    labels: ["founder-library", "founder-follow-up", `follow-up-step:${step}`, `tool:${contact.lastToolSlug}`],
  };
}
