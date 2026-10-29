import { num, str, todayIso } from "../fields";
import { addDays, daysBetween, int, longDate, usd, weekday } from "../format";
import type { ReportSection, ToolReport, ToolSpec, Values } from "../types";

const classLabels: Record<string, string> = {
  common: "common stock",
  preferred: "preferred stock",
  other: "stock",
};

const vestingLabels: Record<string, string> = {
  standard: "Subject to vesting over four years with a one-year cliff; unvested shares may be repurchased by the company if service ends.",
  other: "Subject to vesting; unvested shares may be repurchased by the company if service ends.",
  vested: "Fully vested; no substantial risk of forfeiture.",
};

function price(value: number) {
  return usd(value, { cents: true });
}

export function electionDeadline(transferDate: string) {
  return addDays(transferDate, 30);
}

function compute(values: Values): ToolReport {
  const shares = num(values, "shares");
  const stockClass = str(values, "stockClass") || "common";
  const transferDate = str(values, "transferDate");
  const paid = num(values, "pricePaid");
  const fmv = num(values, "fmv");
  const vesting = str(values, "vesting") || "standard";

  const today = todayIso();
  const deadline = electionDeadline(transferDate);
  const daysLeft = daysBetween(today, deadline);
  const notYetTransferred = daysBetween(today, transferDate) > 0;
  const income = Math.max(0, shares * (fmv - paid));
  const taxYear = transferDate.slice(0, 4);
  const property = `${int(shares)} shares of ${classLabels[stockClass] ?? "stock"} of your company`;

  const flags: string[] = [];
  const good: string[] = [];
  const info: string[] = [];

  if (daysLeft < 0) {
    flags.push(
      `The 30-day window closed on ${longDate(deadline)}. Late 83(b) elections are not accepted. Talk to a tax advisor about what this means as your shares vest, and whether any restructuring is worth considering.`,
    );
  } else if (daysLeft <= 7 && !notYetTransferred) {
    flags.push(`Only ${daysLeft} day${daysLeft === 1 ? "" : "s"} left. File now; there is no extension.`);
  } else if (!notYetTransferred) {
    good.push(`You have ${daysLeft} days left. File well before the deadline rather than near it.`);
  }
  if (notYetTransferred) {
    info.push("The transfer date is in the future. The 30 days run from the date the shares are actually transferred to you, so confirm that date when the stock is issued.");
  }
  if (vesting === "vested") {
    flags.push("Fully vested stock generally doesn't need an 83(b) election, because there's no vesting restriction to elect around. Confirm with your tax advisor before filing.");
  }
  if (paid > fmv) {
    info.push("You paid more than the fair market value you entered, so the election reports no income. Double-check both numbers against the stock purchase agreement and board approval.");
  } else if (income > 0) {
    flags.push(
      `You paid less than fair market value, so the election means reporting ${usd(income)} of ordinary income for ${taxYear}. That's usually still far less than the income you'd recognize later as the shares vest at a higher value, but confirm the tax effect with an advisor.`,
    );
  } else {
    good.push("You paid full fair market value, so the election reports no income now, and future appreciation is generally treated as capital gain when you sell.");
  }

  info.push(
    "The IRS accepts Form 15620 online through its website (you sign in with an ID.me account) or by mail. Use one method only, not both.",
    "Give the company a copy of the filed election, and keep a copy with proof of filing for your own records.",
  );

  const sections: ReportSection[] = [];
  if (flags.length) sections.push({ title: "What to watch", items: flags, tone: "flag" });
  if (good.length) sections.push({ title: "Where you stand", items: good, tone: "ok" });
  sections.push({ title: "How filing works", items: info, tone: "info" });

  const headline =
    daysLeft < 0
      ? `The 83(b) deadline for these shares passed on ${longDate(deadline)}.`
      : `File your 83(b) election by ${weekday(deadline)}, ${longDate(deadline)}.`;
  const summary =
    daysLeft < 0
      ? "An 83(b) election must be made within 30 days after the shares are transferred, and the IRS does not accept late elections."
      : `That's 30 days after the shares were transferred on ${longDate(transferDate)}. Treat the 30th day as a hard deadline and file well before it.`;

  const signals = [
    "83b:prepared",
    ...(daysLeft < 0 ? ["deadline:83b-missed"] : daysLeft <= 7 && !notYetTransferred ? ["deadline:83b-urgent"] : []),
    ...(income > 0 ? ["83b:reports-income"] : []),
  ];

  return {
    headline,
    summary,
    metrics: [
      { label: "Filing deadline", value: longDate(deadline), note: weekday(deadline) },
      {
        label: "Days left",
        value: daysLeft < 0 ? "Passed" : notYetTransferred ? "Not started" : String(daysLeft),
        note: notYetTransferred ? "The clock starts at transfer" : `as of ${longDate(today)}`,
      },
      { label: "Income reported now", value: usd(income), note: `${price(fmv)} value less ${price(paid)} paid, per share` },
      { label: "Tax year", value: taxYear },
    ],
    tables: [
      {
        title: "What you'll need for Form 15620",
        columns: ["Item", "Your entry"],
        rows: [
          ["Property", property],
          ["Date transferred", longDate(transferDate)],
          ["Tax year", taxYear],
          ["Restrictions", vestingLabels[vesting] ?? vestingLabels.other],
          ["Fair market value at transfer", `${price(fmv)} per share; ${usd(shares * fmv)} total`],
          ["Amount paid", `${price(paid)} per share; ${usd(shares * paid)} total`],
          ["Amount included in income", usd(income)],
        ],
        note: "The form also asks for your name, address and taxpayer ID number, which you enter on the form itself. This tool never asks for them. Match the restriction wording to your stock purchase agreement.",
      },
    ],
    sections,
    nextSteps: [
      daysLeft < 0
        ? "Ask a tax advisor how vesting will be taxed without the election, and gather the stock purchase agreement and board approval."
        : "File Form 15620 online through the IRS website or by mail (certified mail with a return receipt is a sensible way to keep proof), well before the deadline.",
      "Give the company a copy of the filed election for its records.",
      "Keep your copy and proof of filing with the stock purchase agreement; investors and buyers ask for both in diligence.",
    ],
    signals,
  };
}

export const eightyThreeBElection: ToolSpec = {
  slug: "83b-election",
  title: "83(b) Election Prep Sheet",
  titleParts: ["83(b) Election", "Prep Sheet"],
  stage: "start",
  meta: "2 minutes · emailed prep sheet",
  description:
    "Get your exact 83(b) deadline, the income the election reports and a filled-in checklist of what Form 15620 asks for, without entering any personal identifiers.",
  explainer: {
    heading: "What an 83(b) election does",
    paragraphs: [
      "When you receive stock that vests over time, the tax rules generally treat you as earning it as it vests, at whatever it's worth then. If the company grows, that can mean a large tax bill on shares you can't sell.",
      "An 83(b) election flips the timing: you pay tax now on the stock's value when you receive it, which for founder stock bought at fair market value is often zero. Later growth is generally taxed only when you sell.",
      "The catch is the deadline. The election must be made within 30 days after the shares are transferred to you, and the IRS doesn't accept late elections. This tool tells you the date and what to file.",
    ],
  },
  outputs: [
    "Your exact filing deadline and days remaining",
    "The income the election reports, if any",
    "A filled-in list of what Form 15620 asks for",
    "Filing and recordkeeping steps",
  ],
  pages: [
    {
      title: "The shares you received",
      intro: "Use the numbers from your stock purchase agreement. No names, addresses or tax ID numbers are needed.",
      fields: [
        { kind: "number", id: "shares", label: "Number of shares", unit: "shares", min: 1, max: 10_000_000_000, step: 1, default: 4_000_000 },
        {
          kind: "choice",
          id: "stockClass",
          label: "Type of stock",
          default: "common",
          options: [
            { value: "common", label: "Common stock" },
            { value: "preferred", label: "Preferred stock" },
            { value: "other", label: "Other or not sure" },
          ],
        },
        {
          kind: "date",
          id: "transferDate",
          label: "Date the shares were transferred to you",
          help: "Usually the date you signed the stock purchase agreement and paid for the shares.",
          default: "today",
        },
      ],
    },
    {
      title: "Price, value and vesting",
      fields: [
        {
          kind: "number",
          id: "pricePaid",
          label: "Price you paid per share",
          help: "Founder stock is often priced at a fraction of a cent, such as 0.0001.",
          unit: "usd",
          min: 0,
          max: 1_000_000,
          step: 0.00001,
          default: 0.0001,
        },
        {
          kind: "number",
          id: "fmv",
          label: "Fair market value per share when transferred",
          help: "Usually the price the board approved. If you paid fair market value, enter the same number.",
          unit: "usd",
          min: 0,
          max: 1_000_000,
          step: 0.00001,
          default: 0.0001,
        },
        {
          kind: "choice",
          id: "vesting",
          label: "How do the shares vest?",
          options: [
            { value: "standard", label: "Four years with a one-year cliff" },
            { value: "other", label: "Another vesting schedule" },
            { value: "vested", label: "Fully vested now" },
          ],
        },
      ],
    },
  ],
  compute,
  followUpTopic: "your 83(b) filing",
  followUpAngles: [
    "A quick check on the 83(b): once it's filed, make sure the company has a copy and you've kept proof of filing. In diligence, investors' counsel asks every founder for it, and a missing one turns into a real problem.",
    "If anyone else at the company received restricted stock recently, such as a co-founder, an early employee or an advisor, they have the same 30-day clock. It's worth checking that everyone filed.",
    "Founder stock done right has four pieces: board approval, a stock purchase agreement with vesting, an assignment of the IP each founder brought in, and an 83(b). If any of those are missing, they're much easier to fix now than in the middle of a round.",
  ],
  related: ["founder-equity-planner", "entity-chooser", "ip-ownership-audit"],
  sources: [
    { label: "IRS Form 15620, Section 83(b) Election", url: "https://www.irs.gov/pub/irs-pdf/f15620.pdf" },
    {
      label: "Mintz: New electronic filing option for Section 83(b) elections",
      url: "https://www.mintz.com/insights-center/viewpoints/2906/2025-07-29-new-electronic-filing-option-section-83b-elections",
    },
  ],
};
