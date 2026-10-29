import { num, str } from "../fields";
import { int, pct, usd } from "../format";
import type { ReportSection, ToolReport, ToolSpec, Values } from "../types";

/** Illustrative ranges (percent of fully diluted shares) for a 24-month, hands-on advisor. Rough, not market data. */
const stageRanges: Record<string, [number, number]> = {
  idea: [0.25, 1.0],
  preseed: [0.2, 0.8],
  seed: [0.1, 0.5],
  seriesA: [0.05, 0.25],
};

const stageLabels: Record<string, string> = {
  idea: "Idea stage",
  preseed: "Pre-seed",
  seed: "Seed",
  seriesA: "Series A or later",
};

const engagementFactor: Record<string, number> = {
  standard: 0.5,
  strategic: 1,
  intensive: 1.5,
};

export function advisorRange(stage: string, engagement: string, termMonths: number): [number, number] {
  const [low, high] = stageRanges[stage] ?? stageRanges.seed;
  const factor = (engagementFactor[engagement] ?? 1) * Math.min(1.5, Math.max(0.5, termMonths / 24));
  const round = (value: number) => Math.round(value * 100) / 100;
  return [round(Math.max(0.01, low * factor)), round(Math.min(2, high * factor))];
}

function compute(values: Values): ToolReport {
  const stage = str(values, "stage");
  const engagement = str(values, "engagement");
  const term = num(values, "termMonths", 24);
  const shares = num(values, "fdShares");
  const price = num(values, "price409a", 0);
  const vesting = str(values, "vesting");
  const acceleration = str(values, "acceleration");
  const board = str(values, "boardOverlap") === "yes";
  const [low, high] = advisorRange(stage, engagement, term);
  const lowShares = (low / 100) * shares;
  const highShares = (high / 100) * shares;

  const flags: string[] = [];
  const terms: string[] = [
    "Grant the equity as non-qualified stock options or restricted stock; advisors who aren't employees can't receive incentive stock options.",
    "Sign an advisor agreement that sets the role and time commitment and includes confidentiality and an assignment of IP the advisor creates for the company.",
    "Have the board approve the grant, at an exercise or purchase price no lower than the current 409A value.",
    `Vest over the ${term}-month term, tied to continued service, so equity tracks the help you actually get.`,
  ];

  if (acceleration === "single") {
    flags.push("Single-trigger acceleration vests everything on a sale even if the advisor isn't needed afterward. Buyers dislike it; double-trigger or none is more common for advisors.");
  }
  if (vesting === "cliff12") {
    flags.push("A one-year cliff is common for employees but long for an advisor whose value may come early. A short cliff (around three months) is a common middle ground.");
  }
  if (high > 1) {
    flags.push("Grants above about 1% are unusual for an advisor. If the role is closer to a part-time executive, consider a consulting or employment arrangement instead.");
  }
  if (board) {
    flags.push("Board members are directors, not advisors. Director compensation has its own approval and disclosure considerations, and conflicts should be handled by the disinterested directors.");
  }
  if (!price) {
    flags.push("Without a current 409A value, you can't set a defensible exercise price. Get one before granting.");
  }

  const metrics = [
    { label: "Suggested range", value: `${low}%–${high}%`, note: "Illustrative only; rough common practice" },
    { label: "Shares", value: `${int(lowShares)}–${int(highShares)}` },
    ...(price ? [{ label: "Value at the 409A price", value: `${usd(lowShares * price, { compact: true })}–${usd(highShares * price, { compact: true })}` }] : []),
    { label: "Vesting", value: `${term} months`, note: vesting === "monthly" ? "monthly, no cliff" : vesting === "cliff3" ? "monthly after a 3-month cliff" : "monthly after a 1-year cliff" },
  ];

  const sections: ReportSection[] = [];
  if (flags.length) sections.push({ title: "What to watch", items: flags, tone: "flag" });
  sections.push({ title: "Recommended terms", items: terms, tone: "info" });
  sections.push({
    title: "How we got the range",
    tone: "info",
    items: [
      `As a rough starting point, this tool uses ${stageRanges[stage]?.[0] ?? 0.1}% to ${stageRanges[stage]?.[1] ?? 0.5}% for a hands-on, two-year advisor at the ${(stageLabels[stage] ?? "Seed").toLowerCase()} stage, scaled for the involvement and term you chose. These are illustrative figures, not survey or market data, and the right grant depends on what the advisor actually brings.`,
    ],
  });

  return {
    headline: `A rough starting range for a ${engagement === "standard" ? "light-touch" : engagement === "intensive" ? "high-involvement" : "hands-on"} advisor at your stage: ${low}% to ${high}% over ${term} months.`,
    summary: `That is about ${int(lowShares)} to ${int(highShares)} shares of your ${int(shares)} fully diluted. ${price ? `At today's 409A price that's roughly ${usd(lowShares * price, { compact: true })} to ${usd(highShares * price, { compact: true })} of value.` : ""}`.trim(),
    metrics,
    tables: [
      {
        title: "How the range scales by stage",
        columns: ["Stage", "Light-touch", "Hands-on", "High-involvement"],
        rows: Object.keys(stageRanges).map((key) => [
          stageLabels[key],
          ...["standard", "strategic", "intensive"].map((level) => {
            const [a, b] = advisorRange(key, level, term);
            return `${a}%–${b}%`;
          }),
        ]),
        note: `Illustrative ranges for a ${term}-month term, as a percent of fully diluted shares. Your selection: ${pct(low / 100, 2)} to ${pct(high / 100, 2)}.`,
      },
    ],
    sections,
    nextSteps: [
      "Write down what you need from the advisor and how much time it takes before you agree on a number.",
      "Use a written advisor agreement with confidentiality and IP assignment, and have the board approve the grant.",
      "Revisit after 6 to 12 months: vesting tied to service makes it easy to wind down if the fit isn't there.",
    ],
    signals: ["advisors:adding"],
  };
}

export const advisorEquityCalculator: ToolSpec = {
  slug: "advisor-equity-calculator",
  title: "Advisor Equity Calculator",
  titleParts: ["Advisor Equity", "Calculator"],
  stage: "board",
  meta: "Calculator · 2 minutes",
  description:
    "Get a rough, defensible equity range for an advisor based on your stage, their involvement and the term, plus the terms that should come with it.",
  explainer: {
    heading: "Pay advisors for help you'll actually get",
    paragraphs: [
      "Advisor grants are small, but they add up, and an advisor who stops helping after a few months still owns whatever vested. The fix is structural: a written agreement, vesting tied to continued service and a grant sized to real involvement.",
      "Earlier-stage companies tend to grant more because the equity is worth less and the help matters more. A light-touch advisor on a monthly call usually gets a fraction of what a hands-on operator does.",
      "This calculator gives you a rough starting range and the terms that keep the grant clean in diligence.",
    ],
  },
  outputs: ["A rough equity range and share count", "Its value at your 409A price", "Recommended grant terms", "Flags on vesting and acceleration"],
  pages: [
    {
      title: "The advisor",
      fields: [
        {
          kind: "choice",
          id: "stage",
          label: "What stage is the company?",
          options: Object.entries(stageLabels).map(([value, label]) => ({ value, label })),
        },
        {
          kind: "choice",
          id: "engagement",
          label: "How involved will the advisor be?",
          options: [
            { value: "standard", label: "Light-touch", hint: "A monthly call and occasional introductions" },
            { value: "strategic", label: "Hands-on", hint: "Regular working sessions and active help" },
            { value: "intensive", label: "High-involvement", hint: "Several hours a week on a core area" },
          ],
        },
        { kind: "number", id: "termMonths", label: "Advisory term", unit: "months", min: 12, max: 48, step: 1, default: 24 },
        {
          kind: "choice",
          id: "boardOverlap",
          label: "Is the advisor also on (or joining) your board?",
          options: [
            { value: "no", label: "No" },
            { value: "yes", label: "Yes" },
          ],
        },
      ],
    },
    {
      title: "The grant",
      fields: [
        { kind: "number", id: "fdShares", label: "Fully diluted shares", unit: "shares", min: 1, max: 10_000_000_000, step: 1, default: 10_000_000 },
        { kind: "number", id: "price409a", label: "Current 409A price per share (optional)", unit: "usd", min: 0, max: 10_000, step: 0.0001, optional: true },
        {
          kind: "choice",
          id: "vesting",
          label: "Vesting",
          options: [
            { value: "monthly", label: "Monthly, no cliff" },
            { value: "cliff3", label: "Monthly after a 3-month cliff" },
            { value: "cliff12", label: "Monthly after a 1-year cliff" },
          ],
        },
        {
          kind: "choice",
          id: "acceleration",
          label: "Acceleration if the company is sold",
          options: [
            { value: "none", label: "None" },
            { value: "double", label: "Double trigger (sale plus termination)" },
            { value: "single", label: "Single trigger (sale alone)" },
          ],
        },
      ],
    },
  ],
  compute,
  followUpTopic: "your advisor grants",
  followUpAngles: [
    "The advisor grants that cause trouble later are the handshake ones: equity promised in an email, no agreement, no IP assignment. If any of yours look like that, it's a quick fix now.",
    "One check worth doing across all your advisors: is each grant board-approved, priced at a current 409A, and vesting on continued service? Those three cover most of what diligence asks.",
    "If an advisor is turning into a part-time executive or a board member, the paperwork should change with the role. Happy to talk through how to structure it.",
  ],
  related: ["option-pool-sizer", "founder-equity-planner", "ip-ownership-audit"],
  sources: [
    { label: "IRS: Topic 427, stock options", url: "https://www.irs.gov/taxtopics/tc427" },
  ],
};
