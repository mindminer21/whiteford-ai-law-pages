import { num, rows, str } from "../fields";
import { int, pct, usd } from "../format";
import type { ReportSection, ReportTable, ToolReport, ToolSpec, Values } from "../types";

type SafeType = "cap" | "discount" | "cap_discount" | "mfn";

type SafeInput = { label: string; amount: number; type: SafeType; cap: number; discount: number };

type SafeOutcome = SafeInput & { shares: number; price: number; basis: "cap" | "discount" | "round" };

export type RoundModel = {
  roundPrice: number;
  preMoneyShares: number;
  postMoneyShares: number;
  newInvestorShares: number;
  poolTopUp: number;
  companyCapitalization: number;
  safes: SafeOutcome[];
  converged: boolean;
};

/**
 * Models a priced round with post-money SAFEs converting into it.
 *
 * Mechanics (as in Y Combinator's post-money SAFE):
 * - A capped SAFE converts at cap / Company Capitalization, where Company Capitalization counts all
 *   shares, options, the existing unissued pool and every SAFE's conversion shares, but not a pool
 *   increase made for the new round. So each capped SAFE owns amount / cap of the company just
 *   before the new money and pool top-up.
 * - A discount SAFE converts at the round price times (1 - discount).
 * - A SAFE with both takes whichever price gives more shares.
 * - An uncapped, no-discount ("MFN") SAFE converts at the round price.
 * - The new investors' pre-money valuation is assumed to include the SAFE conversions and the pool
 *   top-up needed to reach the target post-money unissued pool (the common "pool shuffle").
 */
export function modelRound(input: {
  existingShares: number;
  unissuedPool: number;
  safes: SafeInput[];
  preMoney: number;
  newMoney: number;
  poolTargetPct: number;
}): RoundModel {
  const { existingShares, unissuedPool, safes, preMoney, newMoney } = input;
  const target = input.poolTargetPct / 100;

  let safeShares = safes.map(() => 0);
  let poolTopUp = 0;
  let roundPrice = preMoney / Math.max(existingShares, 1);
  let converged = false;

  for (let i = 0; i < 500; i += 1) {
    const totalSafe = safeShares.reduce((sum, value) => sum + value, 0);
    const capitalization = existingShares + totalSafe; // excludes the round's pool increase
    const preMoneyShares = capitalization + poolTopUp;
    const price = preMoney / preMoneyShares;
    const newShares = newMoney / price;
    const post = preMoneyShares + newShares;
    const nextTopUp = Math.max(0, target * post - unissuedPool);

    const nextSafeShares = safes.map((safe) => {
      const capPrice = safe.type === "cap" || safe.type === "cap_discount" ? safe.cap / capitalization : Infinity;
      const discountPrice =
        safe.type === "discount" || safe.type === "cap_discount" ? price * (1 - safe.discount / 100) : Infinity;
      const best = Math.min(capPrice, discountPrice, safe.type === "mfn" ? price : Infinity);
      return safe.amount / best;
    });

    const delta =
      Math.abs(price - roundPrice) / price +
      Math.abs(nextTopUp - poolTopUp) / Math.max(post, 1) +
      nextSafeShares.reduce((sum, value, index) => sum + Math.abs(value - safeShares[index]), 0) / Math.max(post, 1);

    // Damped update keeps the fixed-point iteration stable when SAFEs are large.
    safeShares = nextSafeShares.map((value, index) => 0.5 * value + 0.5 * safeShares[index]);
    poolTopUp = 0.5 * nextTopUp + 0.5 * poolTopUp;
    roundPrice = price;
    if (i > 5 && delta < 1e-12) {
      converged = true;
      break;
    }
  }

  const totalSafe = safeShares.reduce((sum, value) => sum + value, 0);
  const capitalization = existingShares + totalSafe;
  const preMoneyShares = capitalization + poolTopUp;
  const price = preMoney / preMoneyShares;
  const newInvestorShares = newMoney / price;

  return {
    roundPrice: price,
    preMoneyShares,
    postMoneyShares: preMoneyShares + newInvestorShares,
    newInvestorShares,
    poolTopUp,
    companyCapitalization: capitalization,
    converged,
    safes: safes.map((safe, index) => {
      const capPrice = safe.type === "cap" || safe.type === "cap_discount" ? safe.cap / capitalization : Infinity;
      const discountPrice =
        safe.type === "discount" || safe.type === "cap_discount" ? price * (1 - safe.discount / 100) : Infinity;
      const basis: SafeOutcome["basis"] =
        safe.type === "mfn" ? "round" : capPrice <= discountPrice ? "cap" : "discount";
      return { ...safe, shares: safeShares[index], price: safe.amount / safeShares[index], basis };
    }),
  };
}

const typeLabels: Record<SafeType, string> = {
  cap: "Valuation cap, no discount",
  discount: "Discount, no cap",
  cap_discount: "Cap and discount",
  mfn: "Uncapped MFN",
};

function readSafes(values: Values): SafeInput[] {
  return rows(values, "safes").map((row, index) => ({
    label: str(row, "label") || `SAFE ${index + 1}`,
    amount: num(row, "amount"),
    type: (str(row, "type") || "cap") as SafeType,
    cap: num(row, "cap"),
    discount: num(row, "discount"),
  }));
}

function compute(values: Values): ToolReport {
  const founderShares = num(values, "founderShares");
  const grantedOptions = num(values, "grantedOptions");
  const unissuedPool = num(values, "unissuedPool");
  const existingShares = founderShares + grantedOptions + unissuedPool;
  const safes = readSafes(values);
  const totalRaised = safes.reduce((sum, safe) => sum + safe.amount, 0);
  const modelPricedRound = str(values, "modelRound") === "yes";
  const raising = str(values, "raisingStatus");

  const capped = safes.filter((safe) => safe.type === "cap" || safe.type === "cap_discount");
  const cappedOwnership = capped.reduce((sum, safe) => sum + safe.amount / safe.cap, 0);
  const uncapped = safes.filter((safe) => safe.type === "discount" || safe.type === "mfn");
  const lowestCap = capped.length ? Math.min(...capped.map((safe) => safe.cap)) : 0;
  const distinctCaps = new Set(capped.map((safe) => safe.cap)).size;

  const metrics = [
    { label: "SAFE money raised", value: usd(totalRaised, { compact: true }) },
    {
      label: "Ownership sold through capped SAFEs",
      value: pct(cappedOwnership),
      note: "Measured just before the next round's new money and pool top-up",
    },
  ];
  const tables: ReportTable[] = [];
  const flags: string[] = [];
  const good: string[] = [];

  const stackRows = safes.map((safe) => [
    safe.label,
    typeLabels[safe.type],
    usd(safe.amount, { compact: true }),
    safe.type === "cap" || safe.type === "cap_discount" ? usd(safe.cap, { compact: true }) : "—",
    safe.type === "discount" || safe.type === "cap_discount" ? `${safe.discount}%` : "—",
    safe.type === "cap" || safe.type === "cap_discount" ? pct(safe.amount / safe.cap) : "Set by next round",
  ]);
  tables.push({
    title: "Your SAFE stack",
    columns: ["SAFE", "Type", "Amount", "Cap", "Discount", "Ownership at cap"],
    rows: stackRows,
    note: "A post-money SAFE's ownership at its cap is the amount divided by the cap, before the next round's new money and any pool increase.",
  });

  let headline = `Your capped SAFEs add up to ${pct(cappedOwnership)} of the company before your next round.`;
  let summary = `You have raised ${usd(totalRaised)} on ${safes.length} SAFE${safes.length === 1 ? "" : "s"}.`;

  if (modelPricedRound) {
    const preMoney = num(values, "preMoney");
    const newMoney = num(values, "newMoney");
    const poolTarget = num(values, "poolTarget");
    const model = modelRound({ existingShares, unissuedPool, safes, preMoney, newMoney, poolTargetPct: poolTarget });
    const post = model.postMoneyShares;
    const safeTotalShares = model.safes.reduce((sum, safe) => sum + safe.shares, 0);
    const founderPost = founderShares / post;

    metrics.push(
      { label: "Founders after the round", value: pct(founderPost), note: `from ${pct(founderShares / existingShares)} today` },
      { label: "Round price per share", value: usd(model.roundPrice, { cents: true }) },
      { label: "All SAFEs after the round", value: pct(safeTotalShares / post) },
      {
        label: "Pool top-up inside the pre-money",
        value: int(model.poolTopUp),
        note: model.poolTopUp > 0 ? `worth ${usd(model.poolTopUp * model.roundPrice, { compact: true })} of your pre-money` : "existing pool already meets the target",
      },
    );

    const ownershipRows: string[][] = [
      ["Founders and common", int(founderShares), pct(founderShares / post)],
      ["Granted options", int(grantedOptions), pct(grantedOptions / post)],
      ["Unissued pool (after top-up)", int(unissuedPool + model.poolTopUp), pct((unissuedPool + model.poolTopUp) / post)],
      ...model.safes.map((safe) => [`${safe.label} (SAFE)`, int(safe.shares), pct(safe.shares / post)]),
      ["New investors", int(model.newInvestorShares), pct(model.newInvestorShares / post)],
      ["Total", int(post), "100.0%"],
    ];
    tables.push({
      title: "Ownership after the priced round",
      columns: ["Holder", "Shares", "Fully diluted"],
      rows: ownershipRows,
      note: `Assumes a ${usd(preMoney, { compact: true })} pre-money that includes the SAFE conversions and the pool top-up, and ${usd(newMoney, { compact: true })} of new money.`,
    });
    tables.push({
      title: "How each SAFE converts",
      columns: ["SAFE", "Converts at", "Price per share", "Shares"],
      rows: model.safes.map((safe) => [
        safe.label,
        safe.basis === "cap" ? "Valuation cap" : safe.basis === "discount" ? "Discount to round price" : "Round price",
        usd(safe.price, { cents: true }),
        int(safe.shares),
      ]),
    });

    headline = `After a ${usd(preMoney, { compact: true })} pre-money round, founders would hold ${pct(founderPost)} and your SAFEs ${pct(safeTotalShares / post)}.`;
    summary = `The ${usd(newMoney, { compact: true })} round prices at ${usd(model.roundPrice, { cents: true })} per share. ${
      model.poolTopUp > 0
        ? `Reaching a ${poolTarget}% post-money pool adds ${int(model.poolTopUp)} shares inside the pre-money, which comes out of the founders' and SAFE holders' side, not the new investors'.`
        : "Your existing unissued pool already meets the target, so no top-up is needed."
    }`;

    // What today's holders' shares (founders, options, existing pool) are worth at the round price.
    const effectivePre = existingShares * model.roundPrice;
    metrics.push({
      label: "Effective pre-money for today's holders",
      value: usd(effectivePre, { compact: true }),
      note: `Your current shares at the round price; the rest of the ${usd(preMoney, { compact: true })} goes to SAFE conversions${model.poolTopUp > 0 ? " and the pool top-up" : ""}`,
    });

    if (capped.some((safe) => safe.cap > preMoney + newMoney)) {
      good.push("At least one SAFE's cap is above the round's post-money, so it converts at the discount or round price instead of its cap.");
    }
    if (model.poolTopUp * model.roundPrice > preMoney * 0.1) {
      flags.push("The pool top-up eats more than 10% of the headline pre-money. Negotiate the pool size from a real hiring plan rather than a round percentage.");
    }
    if (!model.converged) flags.push("These inputs are extreme enough that the model did not fully settle. Treat the numbers as rough.");
  } else if (uncapped.length) {
    summary += " SAFEs without a cap convert based on your next round's price, so their ownership is set then.";
  }

  if (cappedOwnership > 0.25) {
    flags.push(`Capped SAFEs already account for ${pct(cappedOwnership)} of the company. Above roughly 20% to 25% before a priced round, new lead investors often push back or ask founders to absorb more dilution.`);
  } else if (cappedOwnership > 0) {
    good.push(`At ${pct(cappedOwnership)}, the SAFE stack is in a range most seed leads accept.`);
  }
  if (distinctCaps > 1) {
    flags.push(`You have ${distinctCaps} different caps. Check whether any earlier SAFE has a most-favored-nation clause that lets it adopt a later, better cap.`);
  }
  if (uncapped.some((safe) => safe.type === "mfn")) {
    flags.push("An uncapped MFN SAFE can adopt the terms of any later SAFE you issue with better terms. Track every later SAFE against it.");
  }
  if (lowestCap && totalRaised > lowestCap * 0.2) {
    flags.push("Your SAFE money is large relative to your lowest cap, which magnifies dilution at conversion.");
  }

  const sections: ReportSection[] = [];
  if (flags.length) sections.push({ title: "What to watch", items: flags, tone: "flag" });
  if (good.length) sections.push({ title: "What's working", items: good, tone: "ok" });
  sections.push({
    title: "Housekeeping that trips founders up",
    tone: "info",
    items: [
      "Keep the signed SAFEs and any side letters (pro rata, MFN, information rights) together; a lead investor's counsel will ask for all of them.",
      "SAFE sales are securities sales. Check whether a Form D and state notice filings were due for each closing.",
      "Record each SAFE on your cap table as it is signed, not when it converts.",
    ],
  });

  const signals = [
    raising === "now" ? "raising:now" : raising === "6mo" ? "raising:6-months" : raising === "12mo" ? "raising:12-months" : "raising:no-plan",
    ...(cappedOwnership > 0.25 ? ["safe-stack:heavy"] : []),
    ...(modelPricedRound ? ["priced-round:modeled"] : []),
  ];

  return {
    headline,
    summary,
    metrics,
    tables,
    sections,
    nextSteps: [
      "Reconcile this model against your actual cap table and every signed SAFE before you share numbers with a lead.",
      "Before signing a term sheet, ask the lead to confirm whether their pre-money includes SAFE conversion and the pool top-up.",
      "If any SAFE has side letters or non-standard edits, have counsel review conversion before the round's documents are drafted.",
    ],
    signals,
  };
}

export const safeCalculator: ToolSpec = {
  slug: "safe-calculator",
  title: "SAFE Stack & Dilution Calculator",
  titleParts: ["SAFE Stack &", "Dilution Calculator"],
  stage: "raise",
  meta: "Calculator · emailed cap table",
  description:
    "Model every post-money SAFE you've signed, then see exactly how they convert, and what founders keep, when the priced round arrives.",
  explainer: {
    heading: "How post-money SAFEs actually dilute you",
    paragraphs: [
      "A SAFE (simple agreement for future equity) is a right to shares later, usually when you raise a priced round. Y Combinator's post-money SAFE, the most widely used form, fixes each investor's ownership at the valuation cap: a $500,000 SAFE at a $10 million post-money cap buys 5% of the company as it stands just before the priced round.",
      "Because each SAFE's percentage is fixed, every SAFE you add dilutes the founders and the option pool, not the other SAFE holders. The priced round then dilutes everyone, and if the new investors require a bigger option pool in the pre-money, that top-up comes out of the existing holders' side too.",
      "This calculator models those mechanics so you can see the stack's real cost before you sign the next SAFE or term sheet.",
    ],
  },
  outputs: [
    "Ownership each SAFE has bought at its cap",
    "A pro forma cap table after your next priced round",
    "Conversion price for every SAFE, including discounts",
    "The pool top-up hidden inside the pre-money",
  ],
  pages: [
    {
      title: "Your cap table today",
      intro: "Use fully diluted share counts from your cap table. Round numbers are fine for planning.",
      fields: [
        { kind: "number", id: "founderShares", label: "Founder and other common shares", unit: "shares", min: 1, max: 10_000_000_000, step: 1, default: 8_000_000 },
        { kind: "number", id: "grantedOptions", label: "Options and RSUs already granted", unit: "shares", min: 0, max: 10_000_000_000, step: 1, default: 500_000 },
        { kind: "number", id: "unissuedPool", label: "Unissued option pool", unit: "shares", min: 0, max: 10_000_000_000, step: 1, default: 1_500_000 },
      ],
    },
    {
      title: "Your SAFEs",
      intro: "Add each SAFE or group of SAFEs on the same terms. Use labels like \"Angels\" or \"Seed fund\"; no names needed.",
      fields: [
        {
          kind: "rows",
          id: "safes",
          label: "SAFEs",
          min: 1,
          max: 12,
          addLabel: "Add another SAFE",
          itemLabel: "SAFE",
          defaultRows: [
            { label: "Angels", amount: 750_000, type: "cap", cap: 10_000_000, discount: 20 },
            { label: "Pre-seed fund", amount: 1_000_000, type: "cap", cap: 14_000_000, discount: 20 },
          ],
          fields: [
            { kind: "text", id: "label", label: "Label", maxLength: 40, placeholder: "e.g. Angels" },
            { kind: "number", id: "amount", label: "Amount", unit: "usd", min: 1_000, max: 1_000_000_000, step: 1_000 },
            {
              kind: "choice",
              id: "type",
              label: "Type",
              display: "select",
              options: [
                { value: "cap", label: "Valuation cap, no discount" },
                { value: "discount", label: "Discount, no cap" },
                { value: "cap_discount", label: "Cap and discount" },
                { value: "mfn", label: "Uncapped MFN" },
              ],
            },
            { kind: "number", id: "cap", label: "Post-money cap", unit: "usd", min: 100_000, max: 100_000_000_000, step: 100_000, showIf: { field: "type", in: ["cap", "cap_discount"] } },
            { kind: "number", id: "discount", label: "Discount", unit: "percent", min: 1, max: 50, step: 1, showIf: { field: "type", in: ["discount", "cap_discount"] } },
          ],
        },
      ],
    },
    {
      title: "Your next priced round",
      fields: [
        {
          kind: "choice",
          id: "raisingStatus",
          label: "When do you expect to raise a priced round?",
          options: [
            { value: "now", label: "We're raising now" },
            { value: "6mo", label: "Within 6 months" },
            { value: "12mo", label: "Within 12 months" },
            { value: "none", label: "No plans yet" },
          ],
        },
        {
          kind: "choice",
          id: "modelRound",
          label: "Model a priced round?",
          default: "yes",
          options: [
            { value: "yes", label: "Yes, show me the pro forma" },
            { value: "no", label: "No, just the SAFE stack" },
          ],
        },
        { kind: "number", id: "preMoney", label: "Pre-money valuation", unit: "usd", min: 500_000, max: 100_000_000_000, step: 100_000, default: 20_000_000, showIf: { field: "modelRound", in: ["yes"] } },
        { kind: "number", id: "newMoney", label: "New money in the round", unit: "usd", min: 100_000, max: 10_000_000_000, step: 100_000, default: 5_000_000, showIf: { field: "modelRound", in: ["yes"] } },
        {
          kind: "number",
          id: "poolTarget",
          label: "Unissued pool the lead wants after the round",
          help: "Leads often ask for 10% to 15%. Enter 0 if no top-up is required.",
          unit: "percent",
          min: 0,
          max: 30,
          step: 0.5,
          default: 10,
          showIf: { field: "modelRound", in: ["yes"] },
        },
      ],
    },
  ],
  compute,
  followUpTopic: "your SAFE round",
  followUpAngles: [
    "The number I see founders get wrong most often is the effective pre-money: once SAFE conversions and the pool top-up sit inside the headline valuation, existing holders are effectively selling at a lower price than the term sheet says.",
    "Before a lead's counsel sends round documents, it's worth collecting every signed SAFE and side letter and confirming the conversion math. Side letters with pro rata or MFN rights are the usual surprise.",
    "If the priced round is getting closer, the term sheet is where the economics are set. The pool size, the pre-money definition and any participation rights are much easier to change before signing than after.",
  ],
  related: ["term-sheet-decoder", "option-pool-sizer", "exempt-offering-checklist"],
  sources: [
    { label: "Y Combinator: SAFE financing documents and user guide", url: "https://www.ycombinator.com/safe/" },
    { label: "SEC: Filing a Form D notice", url: "https://www.sec.gov/resources-small-businesses/exempt-offerings/filing-form-d-notice" },
  ],
};
