import { str } from "../fields";
import type { ReportSection, ReportTable, ToolReport, ToolSpec, Values } from "../types";

type Recommendation = "c-corp" | "pbc" | "llc";

function compute(values: Values): ToolReport {
  const funding = str(values, "funding");
  const equity = str(values, "equity");
  const exit = str(values, "exit");
  const owners = str(values, "owners");
  const passThrough = str(values, "passThrough");
  const mission = str(values, "mission");
  const location = str(values, "location");
  const formed = str(values, "formed");

  let corp = 0;
  let llc = 0;
  const corpReasons: string[] = [];
  const llcReasons: string[] = [];

  if (funding === "venture") {
    corp += 3;
    corpReasons.push("Venture funds generally invest only in C corporations, usually Delaware ones. Many fund investors can't hold the pass-through income an LLC produces.");
  } else if (funding === "angels") {
    corp += 2;
    corpReasons.push("Angels and SAFE investors usually expect a C corporation, and the standard SAFE forms are written for corporations.");
  } else if (funding === "bootstrapped") {
    llc += 2;
    llcReasons.push("Without outside investors, an LLC's flexibility and single level of tax are often worth more than a corporation's investor-friendly structure.");
  } else {
    corp += 1;
    llc += 1;
  }

  if (equity === "soon") {
    corp += 2;
    corpReasons.push("Stock options under an equity plan are the familiar way to share equity with employees; LLC profits interests work but are harder to explain and administer.");
  } else if (equity === "later") {
    corp += 1;
  } else {
    llc += 1;
  }

  if (exit === "sale") {
    corp += 2;
    corpReasons.push("If you hope to sell, C corporation stock can qualify as QSBS, which can exclude much or all of the founders' federal gain.");
  } else if (exit === "distributions") {
    llc += 2;
    llcReasons.push("If the plan is to pay profits out to the owners, an LLC generally avoids the second layer of tax a C corporation's dividends carry.");
  }

  if (passThrough === "yes") {
    llc += 2;
    llcReasons.push("You want profits and early losses on your personal returns, which is how an LLC is generally taxed by default.");
  } else if (passThrough === "no") {
    corp += 1;
  }

  if (owners === "foreign-or-entity") {
    corp += 1;
    corpReasons.push("With foreign or entity owners, a C corporation keeps the tax picture simpler; an S corporation isn't available to them at all.");
  }

  const corpWins = corp >= llc;
  const recommendation: Recommendation = corpWins ? (mission === "yes" ? "pbc" : "c-corp") : "llc";
  const llcState = location === "colorado" ? "Colorado" : "Delaware or your home state";
  const recLabel =
    recommendation === "pbc"
      ? "Delaware public benefit corporation"
      : recommendation === "c-corp"
        ? "Delaware C corporation"
        : `${llcState} LLC`;

  const flags: string[] = [];
  const good: string[] = [];
  const info: string[] = [];
  let convertNeeded = false;

  if (corpWins && (formed === "llc" || formed === "s-corp")) {
    convertNeeded = true;
    flags.push(
      formed === "llc"
        ? "You already have an LLC. Converting to a C corporation before you raise from institutional investors is usually far cleaner than converting during the round. Any QSBS holding period generally starts at conversion, not at the LLC's formation."
        : "You already have an S corporation. An S corporation can have only one class of stock and limited kinds of owners, so it can't issue the preferred stock venture investors buy. Plan the conversion with a tax advisor before the round.",
    );
  }
  if (!corpWins && formed === "c-corp") {
    flags.push("You already have a C corporation. Converting a corporation to an LLC is generally a taxable event, so most companies in your position keep the corporation. Talk to a tax advisor before changing it.");
  }
  if (formed === "c-corp" && corpWins) good.push("You already have a C corporation, which fits your plans.");
  if (formed === "llc" && !corpWins) good.push("Your existing LLC fits your plans.");
  if (owners === "foreign-or-entity" && !corpWins) {
    flags.push("Foreign or entity owners in an LLC can trigger tax withholding and filing obligations. Have a tax advisor review the ownership before you form.");
  }
  if (mission === "maybe" && corpWins) {
    info.push("A public benefit corporation is an option if the mission is central. Directors must balance the stated public benefit with stockholders' interests, and some investors prefer a standard C corporation, so decide before you raise.");
  }
  if (mission === "yes" && !corpWins) {
    info.push("A public benefit corporation needs a corporation. If you stay an LLC, you can still write the mission into the operating agreement.");
  }
  if (location === "colorado" && corpWins) {
    info.push("A Delaware corporation operating in Colorado must also register with the Colorado Secretary of State as a foreign entity and keep that registration current.");
  }

  const qsbsNote =
    "Only C corporations can issue QSBS. For QSBS issued after July 4, 2025, holders may exclude 50% of the gain after three years, 75% after four and 100% after five, up to a per-company cap of $15 million (indexed for inflation from 2027), and the company's gross assets must be $75 million or less when the stock is issued. Stock issued before July 5, 2025 keeps the older $10 million cap and five-year rule. Many other requirements apply, including the type of business.";

  const comparison: ReportTable = {
    title: "How the main choices compare",
    columns: ["", "Delaware C corporation", "LLC"],
    rows: [
      ["Fit for venture investors", "The standard", "Usually must convert first"],
      ["Employee equity", "Stock options under a plan", "Profits interests; more complex"],
      ["Federal income tax", "Company taxed; dividends taxed again", "Generally passes through to owners"],
      ["QSBS gain exclusion", "Available if requirements are met", "Not available until converted"],
      ["Upkeep", "Board, stockholder records, annual filings", "Usually lighter; set by the operating agreement"],
    ],
    note: "General comparison only. State, tax and industry facts can change the answer.",
  };

  const sections: ReportSection[] = [];
  if (flags.length) sections.push({ title: "What to watch", items: flags, tone: "flag" });
  const reasons = corpWins ? corpReasons : llcReasons;
  if (good.length || reasons.length) sections.push({ title: "Why this fits", items: [...reasons, ...good], tone: "ok" });
  sections.push({ title: "QSBS in brief", items: [qsbsNote], tone: "info" });
  if (info.length) sections.push({ title: "Also consider", items: info, tone: "info" });

  const headline = convertNeeded
    ? `Your plans point to a ${recLabel}, so plan to convert before you raise.`
    : `Your answers point to a ${recLabel}.`;
  const summary = corpWins
    ? "Outside investment, employee equity and a possible sale all favor a corporation, and Delaware's corporate law is what most investors and their counsel know best."
    : "Your plans favor flexibility and pass-through taxation over an investor-ready structure. If you later raise venture money, you can convert, ideally well before the round.";

  const signals = [
    recommendation === "llc" ? "entity:llc" : recommendation === "pbc" ? "entity:pbc" : "entity:c-corp",
    ...(convertNeeded ? ["entity:convert-needed"] : []),
    ...(funding === "venture" ? ["funding:venture"] : []),
    ...(formed === "none" ? ["entity:not-formed"] : []),
  ];

  return {
    headline,
    summary,
    metrics: [
      { label: "Suggested structure", value: recLabel },
      { label: "Fit score", value: `${Math.max(corp, llc)} to ${Math.min(corp, llc)}`, note: corpWins ? "Corporation over LLC" : "LLC over corporation" },
      { label: "QSBS possible", value: recommendation === "llc" ? "Not as an LLC" : "Yes, if requirements are met" },
    ],
    tables: [comparison],
    sections,
    nextSteps: convertNeeded
      ? [
          "Map the conversion with counsel and a tax advisor: the method, the tax effects and the new capitalization.",
          "Issue founder stock with vesting and IP assignments as part of the conversion, not after.",
          "Finish the conversion before you sign a term sheet or issue SAFEs.",
        ]
      : formed === "none"
        ? [
            "Confirm the structure with counsel before you file anything; it's cheaper to form once than to convert later.",
            "Plan founder stock, vesting and IP assignments at formation, and calendar each founder's 83(b) deadline.",
            location === "colorado"
              ? "If you form outside Colorado, register the company in Colorado before doing business here."
              : "Register in each state where the company does business.",
          ]
        : [
            "Have counsel confirm the entity, charter and ownership records are in order.",
            "Check that founder stock, vesting and IP assignments were documented when the company was formed.",
            "Revisit the structure before any financing or sale.",
          ],
    signals,
  };
}

const yesNoUnsure = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
  { value: "unsure", label: "Not sure" },
];

export const entityChooser: ToolSpec = {
  slug: "entity-chooser",
  title: "Entity Chooser",
  titleParts: ["Which entity", "fits your company?"],
  stage: "start",
  meta: "8 questions · emailed recommendation",
  description:
    "Answer eight questions about funding, equity and exit plans to see whether a Delaware C corporation, a public benefit corporation or an LLC fits your company, and what that means for QSBS.",
  explainer: {
    heading: "Why the entity decision matters early",
    paragraphs: [
      "The entity you form decides how the company is taxed, what kind of equity it can offer employees and investors, and whether founders can qualify for the QSBS gain exclusion when they sell.",
      "Companies planning to raise venture money usually form a Delaware C corporation because that's what funds and their counsel expect. Bootstrapped and services businesses often prefer an LLC for its flexibility and single level of tax.",
      "Switching later is possible, but it costs time and money and can have tax consequences. A few minutes now can save a conversion in the middle of a financing.",
    ],
  },
  outputs: [
    "A suggested structure and the reasons behind it",
    "A side-by-side comparison of a C corporation and an LLC",
    "What QSBS could mean for your founders",
    "Conversion flags if you've already formed",
  ],
  pages: [
    {
      title: "Your plans",
      fields: [
        {
          kind: "choice",
          id: "funding",
          label: "How do you expect to fund the company?",
          options: [
            { value: "venture", label: "Venture capital" },
            { value: "angels", label: "Angels or SAFEs, maybe venture later" },
            { value: "bootstrapped", label: "Revenue and our own money" },
            { value: "unsure", label: "Not sure yet" },
          ],
        },
        {
          kind: "choice",
          id: "equity",
          label: "Will you give equity to employees or advisors?",
          options: [
            { value: "soon", label: "Yes, within the next year" },
            { value: "later", label: "Probably, later on" },
            { value: "no", label: "No plans to" },
          ],
        },
        {
          kind: "choice",
          id: "exit",
          label: "What's the long-term plan for the owners?",
          options: [
            { value: "sale", label: "Sell the company or go public" },
            { value: "distributions", label: "Run it and pay out profits" },
            { value: "unsure", label: "Too early to say" },
          ],
        },
      ],
    },
    {
      title: "Owners and taxes",
      fields: [
        {
          kind: "choice",
          id: "owners",
          label: "Who will own the company at the start?",
          options: [
            { value: "us-individuals", label: "U.S. individuals only" },
            { value: "foreign-or-entity", label: "Includes foreign owners or companies" },
          ],
        },
        {
          kind: "choice",
          id: "passThrough",
          label: "Do the founders want profits and early losses on their personal tax returns?",
          options: yesNoUnsure,
        },
        {
          kind: "choice",
          id: "mission",
          label: "Do you want to commit the company to a public benefit in its charter?",
          options: [
            { value: "yes", label: "Yes" },
            { value: "maybe", label: "Maybe" },
            { value: "no", label: "No" },
          ],
        },
      ],
    },
    {
      title: "Where you are today",
      fields: [
        {
          kind: "choice",
          id: "location",
          label: "Where will the company mainly operate?",
          options: [
            { value: "colorado", label: "Colorado" },
            { value: "elsewhere", label: "Elsewhere in the U.S." },
          ],
        },
        {
          kind: "choice",
          id: "formed",
          label: "Have you already formed an entity?",
          options: [
            { value: "none", label: "Not yet" },
            { value: "llc", label: "Yes, an LLC" },
            { value: "s-corp", label: "Yes, an S corporation" },
            { value: "c-corp", label: "Yes, a C corporation" },
          ],
        },
      ],
    },
  ],
  compute,
  followUpTopic: "your entity setup",
  followUpAngles: [
    "The entity question is easy to get right at formation and expensive to fix in the middle of a financing. If your answers pointed one way and your current setup points another, that's worth a short conversation before anyone signs a term sheet.",
    "The formation step founders most often skip is documenting founder stock properly: vesting, an assignment of the IP each founder built before the company existed, and an 83(b) filed within 30 days. Investors check all three.",
    "If QSBS matters to your exit plans, the details count: when the stock is issued, the company's assets at that time and the type of business. It pays to set things up with the exclusion in mind from day one.",
  ],
  related: ["founder-equity-planner", "83b-election", "ip-ownership-audit"],
  sources: [
    {
      label: "Mintz: QSBS benefits expanded under the One Big Beautiful Bill Act",
      url: "https://www.mintz.com/insights-center/viewpoints/2906/2025-07-09-qsbs-benefits-expanded-under-one-big-beautiful-bill-act",
    },
  ],
};
