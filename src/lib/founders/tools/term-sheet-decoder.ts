import { num, str } from "../fields";
import { pct, usd } from "../format";
import type { ReportSection, ReportTable, ToolReport, ToolSpec, Values } from "../types";

type Rating = "Market" | "Watch" | "Off-market";

type TermResult = { term: string; choice: string; rating: Rating; why: string };

type Participation = "none" | "capped" | "full";

/** Participation cap used for "capped participating", as a multiple of the investment. */
export const PARTICIPATION_CAP_MULTIPLE = 3;

/**
 * Payout to a single class of preferred stock at a given exit value.
 *
 * - Non-participating: the investor takes the greater of its preference or converting to common.
 * - Full participating: preference first, then a pro rata share of what's left.
 * - Capped participating: as participating, but total proceeds stop at the cap unless converting
 *   to common pays more.
 */
export function preferredPayout(input: {
  exit: number;
  investment: number;
  ownership: number;
  multiple: number;
  participation: Participation;
}) {
  const { exit, investment, ownership, multiple, participation } = input;
  const preference = Math.min(multiple * investment, exit);
  const asConverted = ownership * exit;
  if (participation === "none") return Math.max(preference, asConverted);
  const participating = preference + ownership * Math.max(exit - preference, 0);
  if (participation === "full") return Math.min(participating, exit);
  const cap = PARTICIPATION_CAP_MULTIPLE * investment;
  return Math.min(Math.max(Math.min(participating, cap), asConverted), exit);
}

const multipleValue: Record<string, number> = { "1x": 1, "1.5x": 1.5, "2x": 2 };

const labels: Record<string, Record<string, string>> = {
  roundType: { seed: "Seed", seriesA: "Series A", later: "Series B or later" },
  multiple: { "1x": "1x", "1.5x": "1.5x", "2x": "2x or more" },
  participation: { none: "Non-participating", capped: "Participating, capped", full: "Fully participating" },
  dividends: { none: "None", noncumulative: "Non-cumulative, when declared", cumulative: "Cumulative" },
  antiDilution: { broad: "Broad-based weighted average", narrow: "Narrow-based weighted average", ratchet: "Full ratchet", none: "None" },
  pool: { pre: "Increase in the pre-money", post: "Increase in the post-money", none: "No increase" },
  board: { founder: "Founders control", balanced: "Balanced, with an independent", investor: "Investors control" },
  protective: { standard: "Standard list", expanded: "Expanded operational vetoes" },
  redemption: { none: "None", yes: "Investors can force redemption" },
  payToPlay: { none: "None", yes: "Pay-to-play" },
  drag: { standard: "Standard, with founder protections", broad: "Broad, few protections" },
  vesting: { none: "No re-vesting", partial: "Partial re-vest", full: "Full re-vest" },
  noShop: { short: "45 days or less", mid: "46 to 60 days", long: "More than 60 days" },
  proRata: { standard: "Standard pro rata", super: "Super pro rata" },
};

function rate(values: Values): TermResult[] {
  const round = str(values, "roundType");
  const early = round !== "later";
  const pick = (id: string) => str(values, id);
  const label = (id: string) => labels[id]?.[pick(id)] ?? pick(id);
  const results: TermResult[] = [];
  const add = (term: string, id: string, rating: Rating, why: string) => results.push({ term, choice: label(id), rating, why });

  const multiple = pick("multiple");
  add(
    "Liquidation preference",
    "multiple",
    multiple === "1x" ? "Market" : early ? "Off-market" : "Watch",
    multiple === "1x"
      ? "A 1x preference returns the investors' money first, the long-standing early-stage norm."
      : "A preference above 1x takes more of a modest exit before common sees anything; it is unusual outside of difficult later rounds.",
  );

  const participation = pick("participation");
  add(
    "Participation",
    "participation",
    participation === "none" ? "Market" : participation === "capped" ? "Watch" : "Off-market",
    participation === "none"
      ? "Non-participating preferred takes its preference or converts to common, not both."
      : participation === "capped"
        ? "Capped participation lets investors take their preference and share in the rest up to a cap; check the cap level."
        : "Full participation lets investors take their preference and then share in everything else, a double dip that reduces common's share at most exit values.",
  );

  const dividends = pick("dividends");
  add(
    "Dividends",
    "dividends",
    dividends === "cumulative" ? (early ? "Off-market" : "Watch") : "Market",
    dividends === "cumulative"
      ? "Cumulative dividends accrue every year and are usually paid ahead of common on an exit, growing the preference over time."
      : "Non-cumulative dividends paid only if the board declares them rarely cost founders anything in practice.",
  );

  const anti = pick("antiDilution");
  add(
    "Anti-dilution",
    "antiDilution",
    anti === "broad" || anti === "none" ? "Market" : anti === "narrow" ? "Watch" : "Off-market",
    anti === "broad"
      ? "Broad-based weighted average adjusts the conversion price modestly if a later round is priced lower; it is the market standard."
      : anti === "none"
        ? "No anti-dilution protection is founder-friendly; some investors will ask for broad-based weighted average."
        : anti === "narrow"
          ? "Narrow-based weighted average counts fewer shares in the formula, so a down round shifts more ownership to the investors."
          : "Full ratchet resets the investors' price to any lower future price regardless of how few shares are sold there, which can be very costly to founders in a down round.",
  );

  const pool = pick("pool");
  add(
    "Option pool",
    "pool",
    pool === "post" || pool === "none" ? "Market" : "Watch",
    pool === "pre"
      ? "A pool increase in the pre-money is common, but it lowers the effective price founders receive. Size it from a real hiring plan."
      : pool === "post"
        ? "A pool increase in the post-money shares the dilution with the new investors."
        : "No pool increase; confirm the existing pool covers your hiring plan until the next round.",
  );

  const board = pick("board");
  add(
    "Board",
    "board",
    board === "founder" ? "Market" : board === "balanced" ? (early ? "Watch" : "Market") : early ? "Off-market" : "Watch",
    board === "founder"
      ? "Founders keep control of the board, which is typical at seed and common at Series A."
      : board === "balanced"
        ? "A balanced board with an independent director is a common post-Series A structure; the independent's selection process matters."
        : "Investor control of the board this early means the investors decide on hiring, firing, financings and a sale.",
  );

  const protective = pick("protective");
  add(
    "Protective provisions",
    "protective",
    protective === "standard" ? "Market" : "Off-market",
    protective === "standard"
      ? "A standard list of investor vetoes (selling the company, new senior stock, charter changes) is normal."
      : "Vetoes over budgets, hiring or ordinary contracts give investors control of operations, not just of the capital structure.",
  );

  const redemption = pick("redemption");
  add(
    "Redemption rights",
    "redemption",
    redemption === "none" ? "Market" : "Off-market",
    redemption === "none"
      ? "No mandatory redemption is the early-stage norm."
      : "A right to force the company to buy back the preferred after a set period can create a cash claim the company can't meet.",
  );

  const payToPlay = pick("payToPlay");
  add(
    "Pay-to-play",
    "payToPlay",
    payToPlay === "none" ? "Market" : "Watch",
    payToPlay === "none"
      ? "No pay-to-play provision."
      : "Pay-to-play penalizes investors who don't join future rounds. It can help founders, but it complicates later financings.",
  );

  const drag = pick("drag");
  add(
    "Drag-along",
    "drag",
    drag === "standard" ? "Market" : "Watch",
    drag === "standard"
      ? "A drag-along with customary protections (same consideration, limited liability, no non-competes) is standard."
      : "A broad drag-along without founder protections can force founders into a sale on terms they didn't approve.",
  );

  const vesting = pick("vesting");
  add(
    "Founder vesting",
    "vesting",
    vesting === "none" ? "Market" : vesting === "partial" ? "Watch" : "Off-market",
    vesting === "none"
      ? "Existing founder vesting carries over without a reset."
      : vesting === "partial"
        ? "Some investors ask founders to re-vest part of their shares; credit for time served is negotiable."
        : "A full re-vest asks founders to earn back shares they have already vested.",
  );

  const noShop = pick("noShop");
  add(
    "No-shop period",
    "noShop",
    noShop === "short" ? "Market" : noShop === "mid" ? "Watch" : "Off-market",
    noShop === "short"
      ? "A short exclusivity period keeps pressure on closing."
      : noShop === "mid"
        ? "60 days of exclusivity is on the long side; ask for a shorter period or an early release if the investor stops negotiating."
        : "More than 60 days of exclusivity takes you off the market for a long time if the deal stalls.",
  );

  const proRata = pick("proRata");
  add(
    "Pro rata rights",
    "proRata",
    proRata === "standard" ? "Market" : "Watch",
    proRata === "standard"
      ? "Standard pro rata rights, usually limited to major investors, are normal."
      : "Super pro rata lets an investor buy more than its share of future rounds, which can crowd out new leads.",
  );

  return results;
}

function compute(values: Values): ToolReport {
  const results = rate(values);
  const points = results.reduce((sum, item) => sum + (item.rating === "Market" ? 2 : item.rating === "Watch" ? 1 : 0), 0);
  const score = points / (results.length * 2);
  const off = results.filter((item) => item.rating === "Off-market");
  const watch = results.filter((item) => item.rating === "Watch");
  const status = str(values, "status");

  const preMoney = num(values, "preMoney");
  const investment = num(values, "investment");
  const exit = num(values, "exitValue");
  const tables: ReportTable[] = [
    {
      title: "Term by term",
      columns: ["Term", "As proposed", "Rating"],
      rows: results.map((item) => [item.term, item.choice, item.rating]),
      note: "Ratings compare each term with common early-stage practice; the right answer for your round depends on its leverage and context.",
    },
  ];
  const metrics = [
    { label: "Founder-friendliness", value: `${Math.round(score * 100)} / 100`, note: "Market terms score highest" },
    { label: "Terms to push back on", value: String(off.length), note: off.length ? off.map((item) => item.term).join(", ") : "None flagged as off-market" },
  ];

  let payoutSummary = "";
  if (preMoney > 0 && investment > 0 && exit > 0) {
    const ownership = investment / (preMoney + investment);
    const multiple = multipleValue[str(values, "multiple")] ?? 1;
    const participation = (str(values, "participation") || "none") as Participation;
    const scenarios = [0.5, 1, 2].map((factor) => exit * factor);
    const rows = scenarios.map((value) => {
      const preferred = preferredPayout({ exit: value, investment, ownership, multiple, participation });
      const common = value - preferred;
      return [usd(value, { compact: true }), usd(preferred, { compact: true }), usd(common, { compact: true }), pct(common / value), pct(1 - ownership)];
    });
    tables.push({
      title: "Who gets what at exit",
      columns: ["Exit value", "Investors", "Everyone else", "Everyone else's share", "Share if simply pro rata"],
      rows,
      note: `Assumes a single class of preferred owning ${pct(ownership)} (the investment divided by the ${usd(preMoney + investment, { compact: true })} post-money), no other preferred, debt or transaction costs${participation === "capped" ? `, and a participation cap of ${PARTICIPATION_CAP_MULTIPLE}x the investment` : ""}.`,
    });
    const atExit = preferredPayout({ exit, investment, ownership, multiple, participation });
    metrics.push(
      { label: "Investors' stake", value: pct(ownership), note: `${usd(investment, { compact: true })} on a ${usd(preMoney, { compact: true })} pre-money` },
      { label: `Everyone else at a ${usd(exit, { compact: true })} exit`, value: usd(exit - atExit, { compact: true }), note: `${pct((exit - atExit) / exit)} of the proceeds` },
    );
    payoutSummary = ` At a ${usd(exit, { compact: true })} exit, the investors would take ${usd(atExit, { compact: true })} and founders, employees and other common holders ${usd(exit - atExit, { compact: true })}.`;
  }

  const sections: ReportSection[] = [];
  if (off.length) sections.push({ title: "Push back on these", tone: "flag", items: off.map((item) => `${item.term}: ${item.why}`) });
  if (watch.length) sections.push({ title: "Understand these before you sign", tone: "info", items: watch.map((item) => `${item.term}: ${item.why}`) });
  const market = results.filter((item) => item.rating === "Market");
  if (market.length) sections.push({ title: "In line with the market", tone: "ok", items: market.map((item) => `${item.term}: ${item.choice}.`) });

  const headline = off.length
    ? `${off.length} of these ${results.length} terms are off-market for a ${labels.roundType[str(values, "roundType")]?.toLowerCase() ?? "venture"} round.`
    : watch.length
      ? `These terms are broadly market, with ${watch.length} worth a closer look.`
      : "These terms are in line with common early-stage practice.";

  return {
    headline,
    summary: `Founder-friendliness score: ${Math.round(score * 100)} out of 100.${payoutSummary}`,
    metrics,
    tables,
    sections,
    nextSteps: [
      "Raise the off-market terms now; a term sheet is far easier to change than the definitive documents drafted from it.",
      "Model the preference stack at a modest exit, not just at a home-run exit; that is where preference terms decide outcomes.",
      "Have counsel compare the definitive documents against the signed term sheet before closing.",
    ],
    signals: [
      status === "inhand" ? "raising:term-sheet-in-hand" : status === "negotiating" ? "raising:negotiating" : "raising:preparing",
      ...(off.length ? ["terms:off-market"] : []),
    ],
  };
}

const ratingOptions = (options: [string, string][]) => options.map(([value, label]) => ({ value, label }));

export const termSheetDecoder: ToolSpec = {
  slug: "term-sheet-decoder",
  title: "Term Sheet Decoder",
  titleParts: ["Term Sheet", "Decoder"],
  stage: "raise",
  meta: "13 terms · market check",
  description:
    "Pick the terms on the table and see which are market, which deserve a closer look, and what the preference stack pays at exit.",
  explainer: {
    heading: "What actually matters in a term sheet",
    paragraphs: [
      "Valuation gets the headlines, but the other terms decide how proceeds are split in a modest exit and who controls the company along the way. Liquidation preference, participation and anti-dilution set the economics; the board, protective provisions and drag-along set control.",
      "Most early-stage rounds settle on a familiar set of terms: a 1x non-participating preference, non-cumulative dividends, broad-based weighted-average anti-dilution and a short list of investor vetoes. Terms that drift from those norms aren't always wrong, but they should be deliberate.",
      "This decoder compares the terms you select with common early-stage practice. You choose from lists, so there's no need to share the term sheet itself.",
    ],
  },
  outputs: [
    "A market, watch or off-market rating for 13 key terms",
    "A founder-friendliness score",
    "What investors and common holders take at three exit values",
    "The points to raise before you sign",
  ],
  pages: [
    {
      title: "The round",
      intro: "Dollar amounts are optional; add them to see the payout at exit.",
      fields: [
        {
          kind: "choice",
          id: "status",
          label: "Where are you in the process?",
          options: ratingOptions([
            ["inhand", "We have a term sheet"],
            ["negotiating", "We're negotiating terms"],
            ["preparing", "We're preparing for a round"],
          ]),
        },
        { kind: "choice", id: "roundType", label: "Round", display: "select", default: "seriesA", options: ratingOptions([["seed", "Seed"], ["seriesA", "Series A"], ["later", "Series B or later"]]) },
        { kind: "number", id: "preMoney", label: "Pre-money valuation", unit: "usd", min: 100_000, max: 100_000_000_000, step: 100_000, optional: true, default: 20_000_000 },
        { kind: "number", id: "investment", label: "Investment in this round", unit: "usd", min: 10_000, max: 10_000_000_000, step: 10_000, optional: true, default: 5_000_000 },
        { kind: "number", id: "exitValue", label: "Exit value to test", help: "We also show half and double this value.", unit: "usd", min: 100_000, max: 1_000_000_000_000, step: 100_000, optional: true, default: 30_000_000 },
      ],
    },
    {
      title: "Economics",
      fields: [
        { kind: "choice", id: "multiple", label: "Liquidation preference", display: "select", default: "1x", options: ratingOptions([["1x", "1x"], ["1.5x", "1.5x"], ["2x", "2x or more"]]) },
        { kind: "choice", id: "participation", label: "Participation", display: "select", default: "none", options: ratingOptions([["none", "Non-participating"], ["capped", "Participating, capped"], ["full", "Fully participating"]]) },
        { kind: "choice", id: "dividends", label: "Dividends", display: "select", default: "noncumulative", options: ratingOptions([["none", "None"], ["noncumulative", "Non-cumulative, when declared"], ["cumulative", "Cumulative"]]) },
        { kind: "choice", id: "antiDilution", label: "Anti-dilution", display: "select", default: "broad", options: ratingOptions([["broad", "Broad-based weighted average"], ["narrow", "Narrow-based weighted average"], ["ratchet", "Full ratchet"], ["none", "None"]]) },
        { kind: "choice", id: "pool", label: "Option pool increase", display: "select", default: "pre", options: ratingOptions([["pre", "Increase in the pre-money"], ["post", "Increase in the post-money"], ["none", "No increase"]]) },
      ],
    },
    {
      title: "Control",
      fields: [
        { kind: "choice", id: "board", label: "Board after the round", display: "select", default: "founder", options: ratingOptions([["founder", "Founders control"], ["balanced", "Balanced, with an independent"], ["investor", "Investors control"]]) },
        { kind: "choice", id: "protective", label: "Investor vetoes (protective provisions)", display: "select", default: "standard", options: ratingOptions([["standard", "Standard list"], ["expanded", "Expanded operational vetoes"]]) },
        { kind: "choice", id: "redemption", label: "Redemption rights", display: "select", default: "none", options: ratingOptions([["none", "None"], ["yes", "Investors can force redemption"]]) },
        { kind: "choice", id: "payToPlay", label: "Pay-to-play", display: "select", default: "none", options: ratingOptions([["none", "None"], ["yes", "Pay-to-play"]]) },
        { kind: "choice", id: "drag", label: "Drag-along", display: "select", default: "standard", options: ratingOptions([["standard", "Standard, with founder protections"], ["broad", "Broad, few protections"]]) },
      ],
    },
    {
      title: "Founders and process",
      fields: [
        { kind: "choice", id: "vesting", label: "Founder vesting", display: "select", default: "none", options: ratingOptions([["none", "No re-vesting"], ["partial", "Partial re-vest"], ["full", "Full re-vest"]]) },
        { kind: "choice", id: "noShop", label: "No-shop (exclusivity) period", display: "select", default: "short", options: ratingOptions([["short", "45 days or less"], ["mid", "46 to 60 days"], ["long", "More than 60 days"]]) },
        { kind: "choice", id: "proRata", label: "Pro rata rights", display: "select", default: "standard", options: ratingOptions([["standard", "Standard pro rata"], ["super", "Super pro rata"]]) },
      ],
    },
  ],
  compute,
  followUpTopic: "your term sheet",
  followUpAngles: [
    "The terms that cost founders most are rarely the valuation. A participation right or a preference above 1x can move millions at a mid-sized exit, and those are much easier to negotiate before you sign than after.",
    "Once a term sheet is signed, the definitive documents are drafted from it, and small drafting choices in the charter and voting agreement matter. It's worth having someone check the documents line by line against what you agreed.",
    "If the round is still coming together, the board and protective provisions deserve as much attention as the economics. They decide who makes the big calls for the next several years.",
  ],
  related: ["safe-calculator", "option-pool-sizer", "exempt-offering-checklist"],
  sources: [{ label: "NVCA: Model legal documents", url: "https://nvca.org/model-legal-documents/" }],
};
