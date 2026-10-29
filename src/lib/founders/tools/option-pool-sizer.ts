import { num, rows, str } from "../fields";
import { int, pct, usd } from "../format";
import type { ReportSection, ToolReport, ToolSpec, Values } from "../types";

const levelLabels: Record<string, string> = {
  executive: "Executive (C-level)",
  vp: "VP or director",
  senior: "Senior individual contributor",
  mid: "Mid-level",
  junior: "Junior",
};

/**
 * Solves for the pool top-up X (new shares added to the unissued pool) so the unissued pool equals
 * `target` of the fully diluted total. With a round, the top-up sits inside the pre-money, so
 * post-money shares are (shares + X) * (1 + newMoney / preMoney).
 */
export function solveTopUp(input: { shares: number; unissued: number; target: number; preMoney?: number; newMoney?: number }) {
  const k = input.preMoney && input.newMoney ? 1 + input.newMoney / input.preMoney : 1;
  const tk = input.target * k;
  if (tk >= 1) return { topUp: NaN, postShares: NaN, k };
  const topUp = Math.max(0, (tk * input.shares - input.unissued) / (1 - tk));
  return { topUp, postShares: (input.shares + topUp) * k, k };
}

function compute(values: Values): ToolReport {
  const shares = num(values, "fdShares");
  const unissued = num(values, "unissuedPool");
  const buffer = num(values, "refreshBuffer") / 100;
  const hires = rows(values, "hires").map((row) => ({
    level: str(row, "level"),
    count: Math.round(num(row, "count")),
    equity: num(row, "equity"),
  }));
  const hireCount = hires.reduce((sum, hire) => sum + hire.count, 0);
  const grantsPct = hires.reduce((sum, hire) => sum + (hire.count * hire.equity) / 100, 0);
  const target = grantsPct * (1 + buffer);
  const modelRound = str(values, "modelRound") === "yes";
  const preMoney = modelRound ? num(values, "preMoney") : undefined;
  const newMoney = modelRound ? num(values, "newMoney") : undefined;
  const last409a = str(values, "last409a");
  const price409a = num(values, "price409a", 0);

  const solved = solveTopUp({ shares, unissued, target, preMoney, newMoney });
  const flags: string[] = [];
  const info: string[] = [];
  const metrics = [
    { label: "Planned hires", value: int(hireCount) },
    { label: "Pool needed", value: pct(target), note: `${pct(grantsPct)} in grants plus a ${pct(buffer, 0)} buffer for refreshes` },
  ];

  if (!Number.isFinite(solved.topUp)) {
    return {
      headline: "That hiring plan needs more equity than the company has to give.",
      summary: "The grants you entered, plus the buffer, add up to more of the company than a pool can hold. Revisit the plan or the per-hire percentages.",
      metrics,
      tables: [],
      sections: [],
      nextSteps: ["Lower the per-hire percentages or the number of hires and run it again."],
      signals: ["hiring:planned"],
    };
  }

  const postShares = solved.postShares;
  const pricePerShare = modelRound && preMoney ? preMoney / (shares + solved.topUp) : 0;
  const poolAfter = unissued + solved.topUp;
  const sharesNeeded = target * postShares;

  metrics.push(
    { label: "Shares needed for the plan", value: int(sharesNeeded) },
    { label: "Top-up to the pool", value: int(solved.topUp), note: solved.topUp > 0 ? "new shares added to the unissued pool" : "your current pool already covers the plan" },
  );
  if (modelRound) {
    metrics.push({
      label: "Cost of the top-up to today's holders",
      value: usd(solved.topUp * pricePerShare, { compact: true }),
      note: "The top-up sits inside the pre-money, so it dilutes existing holders, not the new investors",
    });
  }
  metrics.push({ label: "Unissued pool afterward", value: pct(poolAfter / postShares), note: modelRound ? "of post-money fully diluted shares" : "of fully diluted shares" });

  const planRows = hires.map((hire) => {
    const each = (hire.equity / 100) * postShares;
    return [levelLabels[hire.level] ?? hire.level, int(hire.count), `${hire.equity}%`, int(each), int(each * hire.count)];
  });
  planRows.push(["Total", int(hireCount), pct(grantsPct, 2), "", int(grantsPct * postShares)]);

  if (target > 0.2) flags.push(`A ${pct(target)} pool is large. Investors will push on it; build it from a named hiring plan and consider topping up again at the next round instead.`);
  if (unissued / shares > target && !modelRound) info.push("Your current unissued pool already exceeds what this plan needs.");
  if (last409a === "older" || last409a === "never") {
    flags.push("Option grants need an exercise price at least equal to fair market value. Get a current 409A valuation before the next grant; most companies refresh it at least every 12 months and after a financing.");
  }
  if (price409a > 0) {
    info.push(`At today's 409A price of ${usd(price409a, { cents: true })}, the planned grants have an aggregate exercise price of about ${usd(grantsPct * postShares * price409a, { compact: true })}.`);
  }
  info.push("Incentive stock options (ISOs) get favorable tax treatment only up to $100,000 of stock, valued at grant, first exercisable by one person in a calendar year; anything above that is treated as a non-qualified option.");
  info.push("The per-hire percentages here are illustrative defaults, not market data. Compensation surveys for your stage, sector and city are the better guide.");

  const sections: ReportSection[] = [];
  if (flags.length) sections.push({ title: "What to watch", items: flags, tone: "flag" });
  sections.push({ title: "Good to know", items: info, tone: "info" });

  return {
    headline:
      solved.topUp > 0
        ? `Your hiring plan needs a ${pct(target)} pool, a top-up of ${int(solved.topUp)} shares.`
        : `Your current pool already covers a plan that needs ${pct(target)}.`,
    summary: modelRound
      ? `Modeled with a ${usd(preMoney as number, { compact: true })} pre-money and ${usd(newMoney as number, { compact: true })} of new money, with the top-up inside the pre-money as lead investors usually ask.`
      : "Modeled on today's fully diluted shares, without a new round.",
    metrics,
    tables: [
      {
        title: "Your hiring plan",
        columns: ["Level", "Hires", "Equity each", "Shares each", "Total shares"],
        rows: planRows,
        note: "Equity percentages are of fully diluted shares after the top-up (and the round, if modeled).",
      },
    ],
    sections,
    nextSteps: [
      "Bring this hiring plan to the term sheet negotiation: a pool sized to named hires is easier to defend than a round percentage.",
      "Have the board approve the pool increase and each grant, with a current 409A in place.",
      "Use a standard equity plan and grant documents so every grant is consistent.",
    ],
    signals: ["hiring:planned", ...(solved.topUp > 0 ? ["pool:topup-needed"] : [])],
  };
}

export const optionPoolSizer: ToolSpec = {
  slug: "option-pool-sizer",
  title: "Option Pool Sizer",
  titleParts: ["Option Pool", "Sizer"],
  stage: "team",
  meta: "Calculator · hiring-plan based",
  description:
    "Size your option pool from an actual hiring plan, and see what topping it up inside the pre-money costs today's holders.",
  explainer: {
    heading: "Size the pool from the plan, not a percentage",
    paragraphs: [
      "Lead investors usually ask for an unissued option pool of a set size after their round, and for the increase to come out of the pre-money valuation. That means the founders and earlier investors bear the dilution, not the new money.",
      "The best defense is a hiring plan. If you can show the specific hires you'll make before the next round and what each will receive, the pool can be sized to that plan instead of a round number.",
      "Enter your plan and this calculator works out the pool you need, the top-up and, if you model a round, what that top-up costs today's holders.",
    ],
  },
  outputs: ["The pool your hiring plan needs", "The top-up in shares", "What the top-up costs existing holders", "A hire-by-hire grant table"],
  pages: [
    {
      title: "Your cap table today",
      fields: [
        { kind: "number", id: "fdShares", label: "Fully diluted shares today", help: "All common, preferred, options and the unissued pool.", unit: "shares", min: 1, max: 10_000_000_000, step: 1, default: 10_000_000 },
        { kind: "number", id: "unissuedPool", label: "Unissued option pool today", unit: "shares", min: 0, max: 10_000_000_000, step: 1, default: 200_000 },
        {
          kind: "choice",
          id: "last409a",
          label: "When was your last 409A valuation?",
          options: [
            { value: "recent", label: "Within the last 12 months" },
            { value: "older", label: "More than 12 months ago" },
            { value: "never", label: "We haven't had one" },
          ],
        },
        { kind: "number", id: "price409a", label: "Current 409A price per share (optional)", unit: "usd", min: 0, max: 10_000, step: 0.0001, optional: true },
      ],
    },
    {
      title: "Hires before your next round",
      intro: "Add hires by level for the next 18 to 24 months. The percentages are illustrative starting points; change them to fit your plan.",
      fields: [
        {
          kind: "rows",
          id: "hires",
          label: "Planned hires",
          min: 1,
          max: 12,
          addLabel: "Add a level",
          itemLabel: "Level",
          defaultRows: [
            { level: "vp", count: 2, equity: 0.75 },
            { level: "senior", count: 4, equity: 0.3 },
            { level: "mid", count: 6, equity: 0.1 },
          ],
          fields: [
            {
              kind: "choice",
              id: "level",
              label: "Level",
              display: "select",
              options: Object.entries(levelLabels).map(([value, label]) => ({ value, label })),
            },
            { kind: "number", id: "count", label: "Hires", unit: "people", min: 1, max: 500, step: 1 },
            { kind: "number", id: "equity", label: "Equity per hire", unit: "percent", min: 0.01, max: 10, step: 0.01 },
          ],
        },
        { kind: "number", id: "refreshBuffer", label: "Buffer for refresh grants and surprises", unit: "percent", min: 0, max: 100, step: 1, default: 15 },
      ],
    },
    {
      title: "Your next round",
      fields: [
        {
          kind: "choice",
          id: "modelRound",
          label: "Model the top-up inside a new round?",
          default: "yes",
          options: [
            { value: "yes", label: "Yes" },
            { value: "no", label: "No, size it on today's shares" },
          ],
        },
        { kind: "number", id: "preMoney", label: "Pre-money valuation", unit: "usd", min: 500_000, max: 100_000_000_000, step: 100_000, default: 20_000_000, showIf: { field: "modelRound", in: ["yes"] } },
        { kind: "number", id: "newMoney", label: "New money in the round", unit: "usd", min: 100_000, max: 10_000_000_000, step: 100_000, default: 5_000_000, showIf: { field: "modelRound", in: ["yes"] } },
      ],
    },
  ],
  compute,
  followUpTopic: "your option pool",
  followUpAngles: [
    "The pool size in a term sheet is one of the few economic terms founders can move with evidence. A named hiring plan, like the one you just built, is the evidence.",
    "Before the next grant goes out, check that the 409A is current and the board has approved the pool. Grants made without both are among the most common diligence cleanup items I see.",
    "If a round is coming, the question to ask the lead is whether their pre-money includes the pool top-up. It's often the biggest gap between the headline valuation and what founders actually get.",
  ],
  related: ["safe-calculator", "term-sheet-decoder", "colorado-noncompete-checker"],
  sources: [
    { label: "IRS: Topic 427, stock options", url: "https://www.irs.gov/taxtopics/tc427" },
  ],
};
