import { str } from "../fields";
import { pct } from "../format";
import type { ChoiceField, ReportSection, ToolReport, ToolSpec, Values } from "../types";

type AreaKey = "founders" | "team" | "assets";

type Answer = {
  value: string;
  label: string;
  /** Points out of the question's max; null means "doesn't apply" and drops out of the score. */
  points: number | null;
  flag?: string;
  critical?: boolean;
  signal?: string;
};

type Question = { id: string; area: AreaKey; label: string; help?: string; max: number; answers: Answer[] };

const areaLabels: Record<AreaKey, string> = {
  founders: "Founders",
  team: "Employees & contractors",
  assets: "Code, brands & patents",
};

const questions: Question[] = [
  {
    id: "founderAssignment",
    area: "founders",
    label: "Has every founder signed an agreement assigning to the company the IP they created before it was formed?",
    max: 10,
    answers: [
      { value: "all", label: "Yes, every founder", points: 10 },
      { value: "some", label: "Some founders, not all", points: 4, critical: true, signal: "ip:founder-gap", flag: "Not every founder has assigned pre-formation work to the company. Have each founder sign a technology or IP assignment covering everything built before incorporation, for stock or other consideration." },
      { value: "none", label: "No", points: 0, critical: true, signal: "ip:founder-gap", flag: "The company may not own the work its founders did before incorporation. A founder IP assignment is usually the first document an investor's counsel asks for; put one in place for every founder." },
      { value: "unsure", label: "Not sure", points: 2, critical: true, signal: "ip:founder-gap", flag: "Find out whether founder assignments exist. If you can't locate signed copies, treat it as missing and paper it now." },
    ],
  },
  {
    id: "priorObligations",
    area: "founders",
    label: "When the core technology was built, was any founder bound by a prior employer's or university's invention-assignment or IP policy?",
    max: 10,
    answers: [
      { value: "none", label: "No", points: 10 },
      { value: "cleared", label: "Yes, and we reviewed it or got a release", points: 8 },
      { value: "unreviewed", label: "Yes, and nobody has reviewed it", points: 2, critical: true, signal: "ip:prior-employer-risk", flag: "A prior employer's or university's assignment clause may reach work done on their time, equipment or in their line of business. Have counsel review the agreement or policy and, if needed, get a written release." },
      { value: "unsure", label: "Not sure", points: 4, signal: "ip:prior-employer-risk", flag: "Collect each founder's prior employment and university agreements so someone can check their invention-assignment language." },
    ],
  },
  {
    id: "sideProject",
    area: "founders",
    label: "Was any of it built while a founder was employed elsewhere, using that employer's time, equipment or confidential information?",
    max: 8,
    answers: [
      { value: "no", label: "No", points: 8 },
      { value: "possibly", label: "Possibly, some overlap", points: 3, signal: "ip:prior-employer-risk", flag: "Overlap with a former employer's time or equipment is a common source of ownership claims. Document when and how the work was done and have counsel assess the exposure." },
      { value: "yes", label: "Yes", points: 0, critical: true, signal: "ip:prior-employer-risk", flag: "Work built on a former employer's time or equipment is a serious diligence issue. Get counsel's view on the employer's possible claim before you raise or sell." },
    ],
  },
  {
    id: "accounts",
    area: "founders",
    label: "Are the domains, code repositories, cloud and app-store accounts registered to the company?",
    max: 6,
    answers: [
      { value: "company", label: "Yes, all in the company's name", points: 6 },
      { value: "mixed", label: "Some are in a founder's personal name", points: 3, flag: "Move domains, repositories, cloud and app-store accounts into company-owned accounts with at least two administrators." },
      { value: "personal", label: "Mostly personal accounts", points: 0, flag: "Key assets sit in personal accounts. Transfer them to the company and record the transfer in the founder's IP assignment." },
    ],
  },
  {
    id: "employees",
    area: "team",
    label: "Has every current and former employee signed a confidentiality and invention assignment agreement?",
    max: 10,
    answers: [
      { value: "all", label: "Yes, all of them", points: 10 },
      { value: "most", label: "Most, with a few gaps", points: 5, signal: "ip:employee-gap", flag: "Close the gaps: have current employees sign (with fresh consideration where your state requires it) and try to get confirmatory assignments from former employees who built product." },
      { value: "few", label: "Few or none", points: 0, critical: true, signal: "ip:employee-gap", flag: "Employees haven't signed invention assignments. Roll out a standard agreement to everyone now; for departed contributors, seek confirmatory assignments." },
      { value: "na", label: "We have no employees yet", points: null },
    ],
  },
  {
    id: "contractors",
    area: "team",
    label: "Do your contractors and agencies have written agreements that assign their work to the company?",
    help: "\"Work made for hire\" language alone usually isn't enough for contractor-written software.",
    max: 10,
    answers: [
      { value: "assignment", label: "Yes, with an express assignment of IP", points: 10 },
      { value: "wmfh", label: "Agreements say \"work made for hire\" but don't assign", points: 4, signal: "ip:contractor-gap", flag: "For most contractor software, \"work made for hire\" language doesn't transfer copyright on its own. Add an express present assignment (\"hereby assigns\") to each contractor agreement and get confirmatory assignments for past work." },
      { value: "none", label: "Some have no written agreement", points: 0, critical: true, signal: "ip:contractor-gap", flag: "Contractors without written agreements usually own what they wrote. Get signed assignments covering past and future work from every contractor who touched the product." },
      { value: "na", label: "We haven't used contractors", points: null },
    ],
  },
  {
    id: "offshore",
    area: "team",
    label: "Has an offshore development firm or overseas contractor built any of the product?",
    max: 6,
    answers: [
      { value: "no", label: "No", points: 6 },
      { value: "reviewed", label: "Yes, and the assignment was checked under local law", points: 5 },
      { value: "unreviewed", label: "Yes, and nobody checked the paperwork", points: 1, signal: "ip:contractor-gap", flag: "Some countries require specific formalities or moral-rights waivers for an assignment to work. Confirm the firm's agreement, and its own agreements with the individual developers, actually pass ownership to you." },
    ],
  },
  {
    id: "openSource",
    area: "assets",
    label: "Do you keep an inventory of open-source components and their licenses?",
    max: 8,
    answers: [
      { value: "tracked", label: "Yes, tracked with license review", points: 8 },
      { value: "informal", label: "Informally; we know the main ones", points: 4, signal: "ip:oss-review", flag: "Run a software composition scan and list every open-source license. Look closely at copyleft licenses (GPL, AGPL) in code you distribute or offer as a network service." },
      { value: "none", label: "No inventory", points: 1, signal: "ip:oss-review", flag: "Buyers and many investors scan code for open-source licenses. Do it first: inventory components, flag copyleft obligations and fix problems before diligence." },
    ],
  },
  {
    id: "aiTools",
    area: "assets",
    label: "How does the team use AI coding or content tools?",
    max: 6,
    answers: [
      { value: "policy", label: "Under a written policy with human review", points: 6 },
      { value: "nopolicy", label: "Used freely, no policy", points: 2, signal: "ip:ai-policy", flag: "Adopt a short AI-use policy: approved tools and account settings, no confidential data in consumer tools, human review of generated code and content, and records of significant AI-assisted work. Purely AI-generated material may not be copyrightable." },
      { value: "notused", label: "We don't use them", points: 6 },
    ],
  },
  {
    id: "trademarks",
    area: "assets",
    label: "Have you cleared and filed trademark applications for your company and main product names?",
    max: 6,
    answers: [
      { value: "filed", label: "Cleared and filed", points: 6 },
      { value: "uncleared", label: "Using the names, not cleared or filed", points: 2, signal: "ip:trademark-gap", flag: "Run a clearance search on your company and product names and file applications for the ones you'll build a brand on. Rebranding after launch is expensive." },
      { value: "na", label: "Names aren't settled yet", points: null },
    ],
  },
  {
    id: "patents",
    area: "assets",
    label: "Has anything you might patent been publicly disclosed (demo, pitch deck, paper, launch) before a filing?",
    help: "The U.S. allows a one-year grace period after your own disclosure; many other countries don't.",
    max: 8,
    answers: [
      { value: "filedfirst", label: "No disclosures, or we filed first", points: 8 },
      { value: "recent", label: "Yes, within the last 12 months, not filed", points: 3, signal: "ip:patent-deadline", flag: "A U.S. filing must generally be made within one year of your own public disclosure, and foreign rights may already be affected. Talk to patent counsel now about a provisional filing." },
      { value: "old", label: "Yes, more than 12 months ago, not filed", points: 1, signal: "ip:patent-deadline", flag: "A disclosure more than a year old may bar a U.S. patent on what was shown. Have patent counsel assess what remains protectable, such as later improvements." },
      { value: "na", label: "We don't have patentable technology", points: null },
    ],
  },
];

function question(id: string) {
  return questions.find((item) => item.id === id) as Question;
}

function choiceField(q: Question): ChoiceField {
  return {
    kind: "choice",
    id: q.id,
    label: q.label,
    help: q.help,
    options: q.answers.map((answer) => ({ value: answer.value, label: answer.label })),
  };
}

export type IpScore = {
  score: number;
  tier: "Clean" | "Gaps to close" | "Diligence red flags";
  areas: Record<AreaKey, number | null>;
  flags: string[];
  critical: number;
  signals: string[];
};

export function scoreIp(values: Values): IpScore {
  let earned = 0;
  let possible = 0;
  const areaTotals: Record<AreaKey, { earned: number; possible: number }> = {
    founders: { earned: 0, possible: 0 },
    team: { earned: 0, possible: 0 },
    assets: { earned: 0, possible: 0 },
  };
  const flags: string[] = [];
  const signals = new Set<string>();
  let critical = 0;

  for (const q of questions) {
    const answer = q.answers.find((item) => item.value === str(values, q.id));
    if (!answer || answer.points === null) continue;
    earned += answer.points;
    possible += q.max;
    areaTotals[q.area].earned += answer.points;
    areaTotals[q.area].possible += q.max;
    if (answer.flag) flags.push(answer.flag);
    if (answer.critical) critical += 1;
    if (answer.signal) signals.add(answer.signal);
  }

  const score = possible ? Math.round((earned / possible) * 100) : 0;
  let tier: IpScore["tier"] = score >= 80 ? "Clean" : score >= 55 ? "Gaps to close" : "Diligence red flags";
  if (tier === "Clean" && critical > 0) tier = "Gaps to close";
  if (critical >= 2) tier = "Diligence red flags";
  if (tier === "Diligence red flags") signals.add("ip:red-flags");

  const areas = Object.fromEntries(
    (Object.keys(areaTotals) as AreaKey[]).map((key) => [key, areaTotals[key].possible ? areaTotals[key].earned / areaTotals[key].possible : null]),
  ) as Record<AreaKey, number | null>;

  return { score, tier, areas, flags, critical, signals: Array.from(signals) };
}

function compute(values: Values): ToolReport {
  const result = scoreIp(values);
  const headline =
    result.tier === "Clean"
      ? `Your IP ownership scores ${result.score}/100: clean on the points buyers and investors check first.`
      : result.tier === "Gaps to close"
        ? `Your IP ownership scores ${result.score}/100, with gaps to close before diligence.`
        : `Your IP ownership scores ${result.score}/100, with issues a buyer's or investor's counsel is likely to flag.`;

  const sections: ReportSection[] = [];
  if (result.flags.length) sections.push({ title: "Gaps and how to fix them", items: result.flags, tone: "flag" });
  const strong = questions
    .filter((q) => {
      const answer = q.answers.find((item) => item.value === str(values, q.id));
      return answer && answer.points !== null && answer.points === q.max;
    })
    .map((q) => q.label.replace(/\?$/, ""));
  if (strong.length) sections.push({ title: "Already in good shape", items: strong.slice(0, 6).map((item) => `${item}: yes.`), tone: "ok" });
  sections.push({
    title: "Why contractor work needs an assignment",
    tone: "info",
    items: [
      "Under U.S. copyright law, an employer owns what employees create within the scope of their jobs. A contractor is different: \"work made for hire\" applies to contractors only for a short list of work types, which usually doesn't include software. Without a written assignment, a contractor generally keeps the copyright and you have, at best, an implied license.",
    ],
  });

  return {
    headline,
    summary: `Tier: ${result.tier}. ${result.critical ? `${result.critical} answer${result.critical === 1 ? "" : "s"} point to an ownership gap that diligence is likely to surface.` : "No critical ownership gaps in your answers."} This is a screening checklist based on your answers, not a legal review of your documents.`,
    metrics: [
      { label: "Overall score", value: `${result.score}/100`, note: result.tier },
      ...(Object.keys(result.areas) as AreaKey[])
        .filter((key) => result.areas[key] !== null)
        .map((key) => ({ label: areaLabels[key], value: pct(result.areas[key] as number, 0) })),
    ],
    tables: [],
    sections,
    nextSteps: [
      "Collect every signed founder, employee and contractor agreement in one folder and note who is missing.",
      "Fix the critical gaps first: founder assignments, contractors without written assignments and prior-employer claims.",
      "Have counsel review the documents themselves; a signature isn't enough if the assignment language is weak.",
    ],
    signals: result.signals,
  };
}

export const ipOwnershipAudit: ToolSpec = {
  slug: "ip-ownership-audit",
  title: "IP Ownership Gap Audit",
  titleParts: ["IP Ownership", "Gap Audit"],
  stage: "protect",
  meta: "11 questions · scored report",
  description:
    "Check whether the company actually owns what its founders, employees and contractors built, before a buyer or investor's counsel checks for you.",
  explainer: {
    heading: "Owning your IP is a paperwork question",
    paragraphs: [
      "Startups often assume that whatever the team builds belongs to the company. Legally, ownership follows the paperwork: founders need to assign work they did before the company existed, employees need invention assignment agreements, and contractors need written assignments.",
      "Gaps are common and usually fixable while relationships are good and nothing is at stake. They get expensive when a financing or sale is on a deadline and a former contractor or co-founder has leverage.",
      "This audit walks through the eleven points diligence checks most often and tells you which gaps to close first.",
    ],
  },
  outputs: [
    "An ownership score out of 100, with a tier",
    "Sub-scores for founders, team and code",
    "Each gap with a concrete fix",
    "The order to fix things before diligence",
  ],
  pages: [
    {
      title: "Founders",
      intro: "Answer for the company's core product and technology.",
      fields: ["founderAssignment", "priorObligations", "sideProject", "accounts"].map((id) => choiceField(question(id))),
    },
    {
      title: "Employees & contractors",
      fields: ["employees", "contractors", "offshore"].map((id) => choiceField(question(id))),
    },
    {
      title: "Code, brands & patents",
      fields: ["openSource", "aiTools", "trademarks", "patents"].map((id) => choiceField(question(id))),
    },
  ],
  compute,
  followUpTopic: "your IP cleanup",
  followUpAngles: [
    "The gap I find most often is contractor code. A freelancer or agency wrote part of the product, the agreement says \"work made for hire,\" and nobody signed an assignment. It's a short document to fix today and a negotiation to fix during diligence.",
    "If a founder came from a larger company or a university, it's worth pulling their old invention-assignment agreement and reading the clause on outside work. Most turn out fine, but you want to know before an investor's counsel asks.",
    "When a financing or sale gets close, buyers ask for every signed IP agreement in one place. If you'd like a second set of eyes on the documents themselves, I'm happy to take a look.",
  ],
  related: ["diligence-list-builder", "founder-equity-planner", "colorado-noncompete-checker"],
  sources: [
    { label: "U.S. Copyright Office: Works made for hire (Circular 30)", url: "https://www.copyright.gov/circs/circ30.pdf" },
    { label: "USPTO: Provisional application for patent", url: "https://www.uspto.gov/patents/basics/apply/provisional-application" },
  ],
};
