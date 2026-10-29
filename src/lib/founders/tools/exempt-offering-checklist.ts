import { list, num, str, todayIso } from "../fields";
import { addDays, daysBetween, longDate, usd, weekday } from "../format";
import type { ReportMetric, ReportSection, ToolReport, ToolSpec, Values } from "../types";

function isoOf(year: number, monthIndex: number, day: number) {
  return new Date(Date.UTC(year, monthIndex, day, 12)).toISOString().slice(0, 10);
}

/** The nth weekday (0 = Sunday) of a month; n = -1 means the last one. */
function nthWeekday(year: number, monthIndex: number, dow: number, n: number) {
  if (n > 0) {
    const first = new Date(Date.UTC(year, monthIndex, 1, 12)).getUTCDay();
    return isoOf(year, monthIndex, 1 + ((dow - first + 7) % 7) + (n - 1) * 7);
  }
  const lastDate = new Date(Date.UTC(year, monthIndex + 1, 0, 12));
  const back = (lastDate.getUTCDay() - dow + 7) % 7;
  return isoOf(year, monthIndex, lastDate.getUTCDate() - back);
}

function observed(year: number, monthIndex: number, day: number) {
  const date = new Date(Date.UTC(year, monthIndex, day, 12));
  const dow = date.getUTCDay();
  if (dow === 6) date.setUTCDate(day - 1);
  if (dow === 0) date.setUTCDate(day + 1);
  return date.toISOString().slice(0, 10);
}

/** U.S. federal holidays (observed dates) for a year. */
export function federalHolidays(year: number) {
  return new Set([
    observed(year, 0, 1),
    nthWeekday(year, 0, 1, 3), // Martin Luther King Jr. Day
    nthWeekday(year, 1, 1, 3), // Washington's Birthday
    nthWeekday(year, 4, 1, -1), // Memorial Day
    observed(year, 5, 19),
    observed(year, 6, 4),
    nthWeekday(year, 8, 1, 1), // Labor Day
    nthWeekday(year, 9, 1, 2), // Columbus Day
    observed(year, 10, 11),
    nthWeekday(year, 10, 4, 4), // Thanksgiving
    observed(year, 11, 25),
    observed(year + 1, 0, 1), // a Saturday Jan 1 is observed on Dec 31
  ]);
}

/** Form D is due 15 days after the first sale, moving to the next business day after a weekend or federal holiday. */
export function formDDeadline(firstSaleIso: string) {
  let due = addDays(firstSaleIso, 15);
  for (let i = 0; i < 10; i += 1) {
    const day = new Date(`${due}T12:00:00Z`).getUTCDay();
    const holidays = federalHolidays(Number(due.slice(0, 4)));
    if (day !== 0 && day !== 6 && !holidays.has(due)) break;
    due = addDays(due, 1);
  }
  return due;
}

const stateNames: Record<string, string> = { co: "Colorado", ca: "California", ny: "New York", tx: "Texas", other: "other states" };

function compute(values: Values, today = todayIso()): ToolReport {
  const instrument = str(values, "instrument");
  const publicMarketing = str(values, "sourcing") === "public";
  const someNonAccredited = str(values, "investorMix") === "some";
  const nonAccredited = someNonAccredited ? num(values, "nonAccreditedCount") : 0;
  const stage = str(values, "stage");
  const minIndividual = num(values, "minIndividual");
  const minEntity = num(values, "minEntity");
  const states = list(values, "states");
  const badActor = str(values, "badActor");
  const formDFiled = str(values, "formDFiled");
  const firstSale = stage === "notstarted" ? "" : str(values, "firstSale");

  const instrumentLabel = instrument === "safe" ? "SAFEs" : instrument === "note" ? "convertible notes" : "preferred or common stock";
  const flags: string[] = [];
  const ok: string[] = [];
  let exemption: "506(b)" | "506(c)" | "problem";
  let exemptionNote: string;

  if (publicMarketing && someNonAccredited) {
    exemption = "problem";
    exemptionNote =
      "Public marketing plus non-accredited investors doesn't fit either Rule 506 exemption: 506(b) bars general solicitation, and 506(c) allows only accredited purchasers.";
    flags.push(exemptionNote, "Regulation Crowdfunding (up to $5 million in 12 months, only through an SEC-registered funding portal or broker-dealer) is the route designed for raising from the public, including non-accredited investors. Talk to counsel before accepting more money.");
  } else if (publicMarketing) {
    exemption = "506(c)";
    exemptionNote = "Because investors were found through public posts, demo days or online marketing, Rule 506(c) is the likely fit. Every purchaser must be accredited and you must take reasonable steps to verify it.";
    if (minIndividual >= 200_000 && minEntity >= 1_000_000) {
      ok.push(
        "Your minimum checks meet the levels in the SEC staff's March 2025 no-action letter ($200,000 for individuals, $1,000,000 for entities accredited by total assets). With written representations that each purchaser is accredited and isn't financing the minimum through a third party, and no knowledge to the contrary, that can count as reasonable verification.",
      );
    } else {
      flags.push(
        "Your minimum checks are below the levels in the SEC staff's March 2025 no-action letter ($200,000 for individuals, $1,000,000 for entities), so plan to verify accreditation another way, such as reviewing financial documents or getting written confirmation from a CPA, attorney or registered adviser.",
      );
    }
  } else if (someNonAccredited && nonAccredited > 35) {
    exemption = "problem";
    exemptionNote = `Rule 506(b) allows no more than 35 non-accredited purchasers; you entered ${nonAccredited}.`;
    flags.push(exemptionNote);
  } else {
    exemption = "506(b)";
    exemptionNote = "With no general solicitation, Rule 506(b) is the likely fit: unlimited accredited investors and up to 35 sophisticated non-accredited purchasers.";
    if (someNonAccredited) {
      flags.push(
        `With ${nonAccredited} non-accredited purchaser${nonAccredited === 1 ? "" : "s"}, 506(b) requires extensive disclosure to them (including financial statement information), and each must be sophisticated alone or with a purchaser representative. Many startups avoid this by selling only to accredited investors.`,
      );
    } else {
      ok.push("Selling only to accredited investors without general solicitation is the simplest path under Rule 506(b).");
    }
  }

  const metrics: ReportMetric[] = [
    { label: "Likely exemption", value: exemption === "problem" ? "Needs counsel" : `Rule ${exemption}` },
  ];

  let deadline = "";
  let daysLeft = 0;
  let late = false;
  if (firstSale) {
    deadline = formDDeadline(firstSale);
    daysLeft = daysBetween(today, deadline);
    late = daysLeft < 0 && formDFiled !== "yes";
    metrics.push({
      label: "Form D due",
      value: longDate(deadline),
      note:
        formDFiled === "yes"
          ? "Filed, per your answer"
          : daysLeft < 0
            ? `${Math.abs(daysLeft)} days ago`
            : daysLeft === 0
              ? "Today"
              : `${daysLeft} days from today (${weekday(deadline)})`,
    });
    if (late) flags.push(`Form D appears to be ${Math.abs(daysLeft)} days late. Late filings are common and usually fixable, but file promptly and check the state notice filings at the same time.`);
    if (formDFiled === "unsure") flags.push("Check EDGAR to see whether a Form D was filed for this offering.");
  }

  const checklist: string[][] = [
    ["Confirm each investor's accredited status in writing", someNonAccredited ? "Required, plus disclosure for non-accredited" : "Required"],
    ["Rule 506(d) bad-actor questionnaires from directors, officers and 20% holders", badActor === "yes" ? "Done" : "To do"],
    ["SEC Form D in EDGAR (Form ID and Login.gov access needed; no SEC fee)", formDFiled === "yes" ? "Filed" : deadline ? `Due ${longDate(deadline)}` : "Due 15 days after the first sale"],
  ];
  if (states.includes("co")) {
    checklist.push(["Colorado notice filing through NASAA's Electronic Filing Depository ($50 fee)", deadline ? `Due ${longDate(deadline)}, with the SEC filing` : "Due with the SEC filing"]);
  }
  const otherStates = states.filter((state) => state !== "co");
  if (otherStates.length) {
    checklist.push([`Notice filings in ${otherStates.map((state) => stateNames[state]).join(", ")}`, "Check each state's rule and fee with counsel"]);
  }
  checklist.push(
    [`Signed ${instrumentLabel} and any side letters, kept together`, "Ongoing"],
    ["Cap table updated for each closing", "Ongoing"],
    ["Form D amendment if the offering changes materially or continues past a year", "As needed"],
  );

  if (badActor !== "yes") flags.push("Collect bad-actor questionnaires. A disqualifying event involving a covered person can take away the Rule 506 exemption.");
  if (instrument !== "equity") ok.push(`${instrument === "safe" ? "SAFEs" : "Convertible notes"} are securities, so the same exemption and filing rules apply as for stock.`);

  const sections: ReportSection[] = [{ title: "Which exemption fits", tone: exemption === "problem" ? "flag" : "info", items: [exemptionNote] }];
  if (flags.length) sections.push({ title: "What to fix", tone: "flag", items: flags.filter((item) => item !== exemptionNote) });
  if (ok.length) sections.push({ title: "What's in good shape", tone: "ok", items: ok });
  sections.push({
    title: "Who counts as accredited",
    tone: "info",
    items: [
      "Individuals with net worth over $1 million, excluding their primary residence (alone or with a spouse or partner).",
      "Individuals with income over $200,000 (or $300,000 with a spouse or partner) in each of the past two years and a reasonable expectation of the same this year.",
      "Holders in good standing of the Series 7, 65 or 82 license, and directors, executive officers or general partners of the company selling the securities.",
      "Most entities with over $5 million in assets or investments, and entities whose equity owners are all accredited.",
    ],
  });

  const headline =
    exemption === "problem"
      ? "This raise doesn't fit a Rule 506 exemption as described. Talk to counsel before taking more money."
      : late
        ? `Rule ${exemption} looks like the fit, but your Form D appears to be late.`
        : deadline && formDFiled !== "yes"
          ? `Rule ${exemption} looks like the fit. Your Form D is due ${longDate(deadline)}.`
          : `Rule ${exemption} looks like the fit for this raise.`;

  return {
    headline,
    summary: `You're selling ${instrumentLabel}${states.length ? ` to investors in ${states.map((state) => stateNames[state]).join(", ")}` : ""}.${minIndividual ? ` Minimum individual check: ${usd(minIndividual, { compact: true })}.` : ""}`,
    metrics,
    tables: [{ title: "Your filing checklist", columns: ["Item", "Status"], rows: checklist }],
    sections,
    nextSteps: [
      exemption === "problem" ? "Pause new commitments until counsel confirms how to structure the offering." : "Put the checklist dates on your calendar and assign an owner for each filing.",
      "Keep a file with each investor's accreditation confirmation, signed documents and filing receipts; investors' counsel will ask for it in the next round.",
      "Before any public announcement of the raise, confirm it won't count as general solicitation under the exemption you're using.",
    ],
    signals: [
      stage === "notstarted" ? "raising:preparing" : "raising:now",
      ...(late ? ["securities:filing-late"] : []),
      ...(exemption === "problem" ? ["securities:exemption-issue"] : []),
    ],
  };
}

const opts = (options: [string, string][]) => options.map(([value, label]) => ({ value, label }));

export const exemptOfferingChecklist: ToolSpec = {
  slug: "exempt-offering-checklist",
  title: "Securities Filing Checklist",
  titleParts: ["Securities Filing", "Checklist"],
  stage: "raise",
  meta: "Checklist · Form D deadline",
  description:
    "Find the securities exemption that fits your raise, calculate your Form D deadline and build the federal and Colorado filing checklist.",
  explainer: {
    heading: "Every startup raise is a securities offering",
    paragraphs: [
      "SAFEs, convertible notes and shares are all securities, so a company selling them needs either to register the offering or to fit an exemption. Most startups rely on Regulation D's Rule 506, which comes in two versions: 506(b), which forbids general solicitation, and 506(c), which allows public marketing but only to verified accredited investors.",
      "Rule 506 offerings come with a short federal notice, Form D, due 15 days after the first investor commits, plus notice filings in the states where investors live. Colorado's is filed through NASAA's Electronic Filing Depository.",
      "This checklist sorts out which exemption likely fits how you found your investors, when your filings are due, and what to collect along the way.",
    ],
  },
  outputs: [
    "The Rule 506 exemption that likely fits, or a warning if none does",
    "Your Form D due date, adjusted for weekends and federal holidays",
    "Colorado and other state notice filings to check",
    "A checklist of investor documents to collect",
  ],
  pages: [
    {
      title: "The raise",
      fields: [
        { kind: "choice", id: "instrument", label: "What are you selling?", options: opts([["safe", "SAFEs"], ["note", "Convertible notes"], ["equity", "Preferred or common stock"]]) },
        {
          kind: "choice",
          id: "sourcing",
          label: "How did you find investors?",
          options: [
            { value: "network", label: "Only people we already knew or were introduced to" },
            { value: "public", label: "Public posts, demo days, online platforms or other marketing", hint: "Public outreach about the raise can be general solicitation." },
          ],
        },
        { kind: "choice", id: "investorMix", label: "Are all investors accredited?", options: opts([["all", "Yes, all accredited"], ["some", "Some are not accredited"]]) },
        { kind: "number", id: "nonAccreditedCount", label: "How many non-accredited investors?", unit: "people", min: 1, max: 1000, step: 1, default: 1, showIf: { field: "investorMix", in: ["some"] } },
        { kind: "choice", id: "stage", label: "Where is the raise?", options: opts([["notstarted", "No one has committed yet"], ["inprogress", "Some investors have committed"], ["closed", "The round has closed"]]) },
      ],
    },
    {
      title: "Investors and checks",
      fields: [
        { kind: "number", id: "minIndividual", label: "Smallest check from an individual", unit: "usd", min: 0, max: 1_000_000_000, step: 1_000, optional: true, default: 25_000 },
        { kind: "number", id: "minEntity", label: "Smallest check from an entity", unit: "usd", min: 0, max: 1_000_000_000, step: 1_000, optional: true, default: 100_000 },
        {
          kind: "multi",
          id: "states",
          label: "Where do your investors live or have their principal office?",
          options: opts([["co", "Colorado"], ["ca", "California"], ["ny", "New York"], ["tx", "Texas"], ["other", "Other states"]]),
          default: ["co"],
        },
        { kind: "choice", id: "badActor", label: "Have you collected bad-actor questionnaires from directors, officers and 20% holders?", options: opts([["yes", "Yes"], ["no", "No"], ["unsure", "Not sure"]]) },
      ],
    },
    {
      title: "Timing and filings",
      intro: "The first sale is the date the first investor became irrevocably committed, usually when they signed.",
      fields: [
        { kind: "date", id: "firstSale", label: "Date the first investor committed", default: "today", showIf: { field: "stage", in: ["inprogress", "closed"] } },
        { kind: "choice", id: "formDFiled", label: "Have you filed a Form D for this raise?", options: opts([["yes", "Yes"], ["no", "No"], ["unsure", "Not sure"]]), showIf: { field: "stage", in: ["inprogress", "closed"] } },
      ],
    },
  ],
  compute: (values) => compute(values),
  followUpTopic: "your raise's securities filings",
  followUpAngles: [
    "Form D and the state notice filings are short, but they're the filings founders most often miss, and a lead investor's counsel will check for them in the next round. If the deadline is close, it's worth getting the EDGAR access set up now; that step takes the longest.",
    "The question I'd look at next is how the round was marketed. A public post or a demo-day pitch can count as general solicitation, which decides whether you're under 506(b) or 506(c) and what you need to verify about each investor.",
    "Once the round closes, put the accreditation confirmations, signed documents and filing receipts in one folder. Investors' counsel will ask for that folder in your next financing or in a sale.",
  ],
  related: ["safe-calculator", "term-sheet-decoder", "diligence-list-builder"],
  sources: [
    { label: "SEC: Filing a Form D notice", url: "https://www.sec.gov/resources-small-businesses/exempt-offerings/filing-form-d-notice" },
    { label: "SEC: Accredited investors", url: "https://www.sec.gov/accredited-investor" },
    { label: "SEC: Regulation Crowdfunding", url: "https://www.sec.gov/smallbusiness/RegCrowdfunding" },
    { label: "Colorado Division of Securities: Forms and fees", url: "https://securities.colorado.gov/division-of-securities-forms-and-fees" },
    { label: "Ropes & Gray: SEC no-action letter on Rule 506(c) verification (March 2025)", url: "https://www.ropesgray.com/en/insights/alerts/2025/03/sec-issues-no-action-letter-clarifying-rule-506c-accredited-investor-verification" },
  ],
};

export { compute as computeExemptOffering };
