import { num, rows, str } from "../fields";
import { addMonths, int, longDate, pct } from "../format";
import type { ReportSection, ReportTable, ToolReport, ToolSpec, Values } from "../types";

type Schedule = { months: number; cliff: number; label: string };

const schedules: Record<string, Schedule> = {
  "4y-cliff": { months: 48, cliff: 12, label: "four years, one-year cliff, monthly after" },
  "3y-cliff": { months: 36, cliff: 12, label: "three years, one-year cliff, monthly after" },
  "4y-none": { months: 48, cliff: 0, label: "four years, monthly, no cliff" },
  none: { months: 0, cliff: 0, label: "no vesting" },
};

const roleLabels: Record<string, string> = {
  ceo: "CEO / business lead",
  cto: "CTO / technical lead",
  product: "Product or design",
  operations: "Operations or sales",
  other: "Other",
};

/** Fraction vested `elapsed` months after the vesting start under a schedule. */
export function vestedFraction(schedule: Schedule, elapsed: number) {
  if (schedule.months === 0) return 1;
  if (elapsed < schedule.cliff) return 0;
  return Math.min(1, Math.floor(elapsed) / schedule.months);
}

export type Milestone = { label: string; date: string; fraction: number };

/** Key vesting dates: the cliff, each anniversary, and full vesting. */
export function milestones(schedule: Schedule, vestingStart: string): Milestone[] {
  if (schedule.months === 0) return [];
  const points = new Set<number>();
  if (schedule.cliff > 0) points.add(schedule.cliff);
  for (let month = 12; month <= schedule.months; month += 12) points.add(month);
  points.add(schedule.months);
  return [...points]
    .sort((a, b) => a - b)
    .map((month) => ({
      label: month === schedule.months ? "Fully vested" : month === schedule.cliff ? "Cliff" : `Year ${month / 12}`,
      date: addMonths(vestingStart, month),
      fraction: vestedFraction(schedule, month),
    }));
}

function compute(values: Values): ToolReport {
  const founders = rows(values, "founders").map((row, index) => ({
    label: str(row, "label") || `Founder ${index + 1}`,
    percent: num(row, "percent"),
    role: str(row, "role"),
    fullTime: str(row, "fullTime") === "yes",
    priorIp: str(row, "priorIp") === "yes",
  }));
  const totalShares = num(values, "totalShares");
  const schedule = schedules[str(values, "schedule")] ?? schedules["4y-cliff"];
  const credit = schedule.months ? Math.min(num(values, "creditMonths"), schedule.months) : 0;
  const acceleration = str(values, "acceleration");
  const startDate = str(values, "startDate");
  const vestingStart = addMonths(startDate, -credit);

  const totalPercent = founders.reduce((sum, founder) => sum + founder.percent, 0);
  const balanced = Math.abs(totalPercent - 100) < 0.01;
  const shares = founders.map((founder) => Math.round((totalShares * founder.percent) / 100));
  const vestedAtIssuance = vestedFraction(schedule, credit);

  const splitTable: ReportTable = {
    title: "Founder share split",
    columns: ["Founder", "Role", "Ownership", "Shares"],
    rows: [
      ...founders.map((founder, index) => [founder.label, roleLabels[founder.role] ?? "Other", pct(founder.percent / 100, 2), int(shares[index])]),
      ["Total", "", pct(totalPercent / 100, 2), int(shares.reduce((sum, value) => sum + value, 0))],
    ],
    note: balanced ? undefined : `These percentages add up to ${pct(totalPercent / 100, 2)}, not 100%. Fix the split before any stock is issued.`,
  };

  const tables: ReportTable[] = [splitTable];
  const points = milestones(schedule, vestingStart);
  if (points.length) {
    tables.push({
      title: "Vesting milestones",
      columns: ["Milestone", "Date", "Vested", ...founders.map((founder) => founder.label)],
      rows: points.map((point) => [
        point.label,
        longDate(point.date),
        pct(point.fraction, 0),
        ...shares.map((count) => int(Math.floor(count * point.fraction))),
      ]),
      note: `Vesting runs ${schedule.label}, measured from ${longDate(vestingStart)}${credit ? ` (${credit} months of credit before ${longDate(startDate)})` : ""}.`,
    });
  }

  const flags: string[] = [];
  const good: string[] = [];
  const info: string[] = [];

  if (!balanced) flags.push(`Ownership adds up to ${pct(totalPercent / 100, 2)} instead of 100%.`);
  if (schedule.months === 0) {
    flags.push("No vesting means a founder who leaves early keeps all their shares. Investors almost always ask founders to put shares on a vesting schedule before or at the first priced round, so it's usually better to set it up now on your own terms.");
  } else {
    good.push(`Every founder vests over ${schedule.months / 12} years, which is what investors expect to see.`);
  }
  if (credit >= 12 && schedule.months) {
    info.push(`With ${credit} months of credit, ${pct(vestedAtIssuance, 0)} of each founder's shares are vested when issued. Credit for real prior work is common, but investors may push back if it's large.`);
  }
  const partTime = founders.filter((founder) => !founder.fullTime);
  if (partTime.length) {
    flags.push(
      `${partTime.map((founder) => founder.label).join(" and ")} ${partTime.length === 1 ? "isn't" : "aren't"} full time. Investors look closely at part-time founders' equity; consider tying vesting, or a larger share of it, to going full time.`,
    );
  }
  const equalSplit = founders.length > 1 && founders.every((founder) => Math.abs(founder.percent - founders[0].percent) < 0.01);
  if (equalSplit && partTime.length && partTime.length < founders.length) {
    flags.push("You've split equity equally even though not every founder is full time. An equal split is fine when contributions are truly equal; if they aren't, it's easier to address now than later.");
  }
  if (acceleration === "single") {
    flags.push("Single-trigger acceleration vests shares on a sale alone. Buyers and investors generally resist it because founders could leave right after closing; double trigger is the more common market approach.");
  } else if (acceleration === "double") {
    good.push("Double-trigger acceleration protects founders who are let go after a sale without scaring off buyers.");
  }
  const withIp = founders.filter((founder) => founder.priorIp);
  if (withIp.length) {
    flags.push(
      `${withIp.map((founder) => founder.label).join(" and ")} built technology or IP before the company existed. Have each one assign it to the company as part of buying their founder stock, so the company clearly owns what it's built on.`,
    );
  }

  const sections: ReportSection[] = [];
  if (flags.length) sections.push({ title: "What to watch", items: flags, tone: "flag" });
  if (good.length) sections.push({ title: "What's working", items: good, tone: "ok" });
  if (info.length) sections.push({ title: "Good to know", items: info, tone: "info" });

  const cliffPoint = points.find((point) => point.label === "Cliff") ?? points[0];
  const headline = !balanced
    ? `Your founder split adds up to ${pct(totalPercent / 100, 2)}, so it needs fixing before stock is issued.`
    : schedule.months === 0
      ? `${int(totalShares)} founder shares split ${founders.length} ways, with no vesting.`
      : `${int(totalShares)} founder shares split ${founders.length} ways, fully vested on ${longDate(points[points.length - 1].date)}.`;
  const summary =
    schedule.months === 0
      ? "Shares would be owned outright from day one. Most investors will ask to change that."
      : `Vesting starts ${longDate(vestingStart)}${cliffPoint && schedule.cliff ? `, with the cliff on ${longDate(cliffPoint.date)}` : ""}.`;

  const signals = [
    "equity:founder-setup",
    ...(schedule.months === 0 ? ["equity:no-vesting"] : []),
    ...(withIp.length ? ["ip:founder-assignment-needed"] : []),
    ...(acceleration === "single" ? ["equity:single-trigger"] : []),
  ];

  return {
    headline,
    summary,
    metrics: [
      { label: "Founder shares", value: int(totalShares) },
      { label: "Founders", value: String(founders.length) },
      { label: "Vested at issuance", value: pct(vestedAtIssuance, 0), note: credit ? `${credit} months of credit` : "No credit for prior time" },
      { label: "Acceleration", value: acceleration === "single" ? "Single trigger" : acceleration === "double" ? "Double trigger" : "None" },
    ],
    tables,
    sections,
    nextSteps: [
      "Have the board approve the founder stock issuances, the price per share and the vesting terms.",
      "Sign a stock purchase agreement with each founder that includes vesting, the company's repurchase right for unvested shares and an assignment of prior technology.",
      "Each founder files an 83(b) election within 30 days after the shares are transferred. Use the 83(b) Election Prep Sheet to get the date.",
    ],
    signals,
  };
}

export const founderEquityPlanner: ToolSpec = {
  slug: "founder-equity-planner",
  title: "Founder Equity & Vesting Planner",
  titleParts: ["Founder Equity &", "Vesting Planner"],
  stage: "start",
  meta: "Planner · emailed vesting schedule",
  description:
    "Split founder shares, set a vesting schedule and see every founder's cliff and vesting dates, with flags investors will raise.",
  explainer: {
    heading: "Why founder stock vests",
    paragraphs: [
      "Founder stock is usually issued at formation at a very low price, then earned over time. If a co-founder leaves after six months, vesting lets the company buy back the shares they haven't earned, so the people who stay aren't building value for someone who left.",
      "The market standard is four years with a one-year cliff, sometimes with credit for work done before the company was formed. Investors look at vesting, acceleration and IP assignments in every round, so it's easier to get them right at the start.",
    ],
  },
  outputs: [
    "Shares for each founder from your split",
    "Cliff and vesting dates for every founder",
    "Flags investors are likely to raise",
    "The paperwork that makes it stick",
  ],
  pages: [
    {
      title: "The founders",
      intro: "Use labels like \"Founder A\"; no names needed.",
      fields: [
        {
          kind: "rows",
          id: "founders",
          label: "Founders",
          min: 1,
          max: 6,
          addLabel: "Add a founder",
          itemLabel: "Founder",
          defaultRows: [
            { label: "Founder A", percent: 50, role: "ceo", fullTime: "yes", priorIp: "no" },
            { label: "Founder B", percent: 50, role: "cto", fullTime: "yes", priorIp: "yes" },
          ],
          fields: [
            { kind: "text", id: "label", label: "Label", maxLength: 40, placeholder: "e.g. Founder A" },
            { kind: "number", id: "percent", label: "Ownership", unit: "percent", min: 0.01, max: 100, step: 0.01 },
            {
              kind: "choice",
              id: "role",
              label: "Role",
              display: "select",
              options: [
                { value: "ceo", label: "CEO / business lead" },
                { value: "cto", label: "CTO / technical lead" },
                { value: "product", label: "Product or design" },
                { value: "operations", label: "Operations or sales" },
                { value: "other", label: "Other" },
              ],
            },
            {
              kind: "choice",
              id: "fullTime",
              label: "Full time?",
              display: "select",
              options: [
                { value: "yes", label: "Yes" },
                { value: "no", label: "Not yet" },
              ],
            },
            {
              kind: "choice",
              id: "priorIp",
              label: "Built tech or IP before the company existed?",
              display: "select",
              options: [
                { value: "no", label: "No" },
                { value: "yes", label: "Yes" },
              ],
            },
          ],
        },
        { kind: "number", id: "totalShares", label: "Total shares for founders", unit: "shares", min: 1_000, max: 10_000_000_000, step: 1, default: 10_000_000 },
      ],
    },
    {
      title: "Vesting",
      fields: [
        {
          kind: "choice",
          id: "schedule",
          label: "Vesting schedule",
          default: "4y-cliff",
          options: [
            { value: "4y-cliff", label: "Four years, one-year cliff", hint: "The market standard" },
            { value: "3y-cliff", label: "Three years, one-year cliff" },
            { value: "4y-none", label: "Four years, no cliff" },
            { value: "none", label: "No vesting" },
          ],
        },
        { kind: "date", id: "startDate", label: "Vesting start date", help: "Usually the date the founder stock is issued.", default: "today" },
        {
          kind: "number",
          id: "creditMonths",
          label: "Credit for time already worked",
          help: "Months of prior full-time work to count toward vesting. Enter 0 for none.",
          unit: "months",
          min: 0,
          max: 36,
          step: 1,
          default: 0,
          showIf: { field: "schedule", in: ["4y-cliff", "3y-cliff", "4y-none"] },
        },
        {
          kind: "choice",
          id: "acceleration",
          label: "Acceleration on a sale",
          default: "double",
          options: [
            { value: "none", label: "None" },
            { value: "double", label: "Double trigger", hint: "Sale plus termination without cause" },
            { value: "single", label: "Single trigger", hint: "Sale alone" },
          ],
        },
      ],
    },
  ],
  compute,
  followUpTopic: "your founder equity",
  followUpAngles: [
    "The split is only half of founder equity. What makes it hold up is the paperwork: board approval, a stock purchase agreement with a repurchase right, an IP assignment and an 83(b) for each founder. Those are the documents investors ask for first.",
    "One question worth asking now rather than later: if a co-founder left in six months, what would happen to their shares and to the code or IP they wrote? Vesting and assignments answer that cleanly; a handshake doesn't.",
    "If your first raise is getting closer, expect the lead to look at founder vesting, acceleration and IP assignments. Setting those on your own terms before a term sheet usually goes better than negotiating them inside one.",
  ],
  related: ["83b-election", "ip-ownership-audit", "option-pool-sizer"],
  sources: [{ label: "IRS Form 15620, Section 83(b) Election", url: "https://www.irs.gov/pub/irs-pdf/f15620.pdf" }],
};
