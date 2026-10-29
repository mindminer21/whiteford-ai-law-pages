import { num, str } from "../fields";
import { int, longDate, usd } from "../format";
import type { ReportSection, ToolReport, ToolSpec, Values } from "../types";

/** CDLE 2026 PAY CALC Order: highly compensated worker threshold for C.R.S. 8-2-113. */
export const THRESHOLD_2026 = 130_014;
/** Customer non-solicit threshold: 60% of the highly compensated threshold. */
export const NONSOLICIT_2026 = Math.round(THRESHOLD_2026 * 0.6 * 100) / 100; // 78,008.40
/** SB25-083's health-care carve-out applies to covenants entered into or renewed on or after this date. */
const SB25_083_EFFECTIVE = "2025-08-06";
const PENALTY_PER_WORKER = 5_000;

type Verdict = "likely-enforceable" | "likely-void" | "needs-review";

const verdictLabels: Record<Verdict, string> = {
  "likely-enforceable": "Likely enforceable, if drafted narrowly",
  "likely-void": "Likely void under Colorado law",
  "needs-review": "Needs a closer review",
};

export type NoncompeteResult = {
  verdict: Verdict;
  threshold: number;
  reasons: string[];
  fixes: string[];
  penaltyExposure: number;
};

export function assessCovenant(values: Values): NoncompeteResult {
  const type = str(values, "covenantType");
  const signed = str(values, "signedDate");
  const year = Number(signed.slice(0, 4));
  const pay = num(values, "annualPay");
  const workers = Math.max(1, Math.round(num(values, "workers", 1)));
  const colorado = str(values, "coloradoWorker") === "yes";
  const healthcare = str(values, "healthcare") === "yes";
  const purpose = str(values, "purpose");
  const sale = str(values, "saleOfBusiness");
  const notice = str(values, "notice");
  const restrictive = type === "noncompete" || type === "customer_nonsolicit";
  const threshold = type === "customer_nonsolicit" ? NONSOLICIT_2026 : THRESHOLD_2026;

  const reasons: string[] = [];
  const fixes: string[] = [];
  let verdict: Verdict = "needs-review";

  if (!colorado) {
    reasons.push("The worker doesn't primarily live or work in Colorado, so another state's law may govern. Colorado's rules apply to workers who primarily resided or worked in Colorado.");
    return { verdict: "needs-review", threshold, reasons, fixes: ["Have counsel check the law of the state where the worker lives and works."], penaltyExposure: 0 };
  }

  if (type === "confidentiality") {
    reasons.push("Confidentiality provisions are generally allowed in Colorado, as long as they don't reach general training, knowledge, skill or experience, or information that is publicly available or otherwise lawfully available.");
    fixes.push("Check that the definition of confidential information carves out general skills and knowledge and public information.");
    return { verdict: "likely-enforceable", threshold, reasons, fixes, penaltyExposure: 0 };
  }

  if (type === "employee_nonsolicit") {
    reasons.push("Colorado's statute doesn't expressly address agreements not to solicit co-workers, and how they are treated is debated. We don't draw a conclusion; counsel should review the specific language.");
    return { verdict: "needs-review", threshold, reasons, fixes: ["Have counsel review the clause; if it functions like a non-compete, it may face the same limits."], penaltyExposure: 0 };
  }

  if (sale === "owner_seller") {
    reasons.push("Covenants given by owners in connection with selling a business, or their interest in it, are a recognized exception. The restriction still needs to be reasonable for the business sold.");
    verdict = "needs-review";
  } else if (sale === "minority_comp_equity") {
    reasons.push("For a minority owner who received the equity as compensation, a 2025 amendment (SB25-083) limits the covenant's length in years to the total sale consideration divided by the owner's average annualized cash compensation over the prior two years, or the length of affiliation if shorter.");
    fixes.push("Calculate the permitted duration under the SB25-083 formula and shorten the covenant if it runs longer.");
    verdict = "needs-review";
  } else {
    const healthcareBlocked = healthcare && signed >= SB25_083_EFFECTIVE;
    if (healthcareBlocked) {
      reasons.push(`For physicians, advanced practice registered nurses and dentists, covenants entered into or renewed on or after ${longDate(SB25_083_EFFECTIVE)} can't rely on the highly compensated or customer non-solicit exceptions.`);
      verdict = "likely-void";
    } else {
      if (healthcare) reasons.push("Health-care practitioners have additional rules; signed before August 6, 2025, the older rules may apply. Counsel should confirm.");
      const label = type === "customer_nonsolicit" ? "customer non-solicit threshold (60% of the highly compensated threshold)" : "highly compensated threshold";
      const meetsPay = pay >= threshold;
      if (year < 2026) {
        reasons.push(`Signed in ${year}: we compared against the 2026 ${label} of ${usd(threshold, { cents: true })}. The threshold for the year it was signed was lower and is the one that applies, so a shortfall here doesn't settle the question.`);
      } else if (year > 2026) {
        reasons.push(`We used the 2026 ${label} of ${usd(threshold, { cents: true })}; check whether the state has published a newer figure for ${year}.`);
      } else {
        reasons.push(`The 2026 ${label} is ${usd(threshold, { cents: true })} in annualized cash compensation.`);
      }

      if (meetsPay) {
        reasons.push(`At ${usd(pay)} the worker is at or above it. Pay must meet the threshold both when the covenant is signed and when it is enforced, and equity doesn't count.`);
      } else {
        reasons.push(`At ${usd(pay)} the worker is below it, so the ${type === "customer_nonsolicit" ? "customer non-solicit" : "non-compete"} exception isn't available on pay.`);
      }

      if (purpose === "trade_secrets") {
        reasons.push("You say it protects trade secrets. It must also be no broader than reasonably necessary to protect them.");
      } else if (purpose === "general_competition") {
        reasons.push("Restricting competition in general, rather than protecting trade secrets, doesn't fit the exception.");
      } else {
        reasons.push("Whether the covenant is for protecting trade secrets is unclear; the exception requires it.");
      }

      if (!meetsPay && year >= 2026) verdict = "likely-void";
      else if (purpose === "general_competition") verdict = "likely-void";
      else if (meetsPay && purpose === "trade_secrets") verdict = "likely-enforceable";
      else verdict = "needs-review";
    }
  }

  if (str(values, "workerType") === "contractor") {
    reasons.push("The worker is a contractor. Whether and how the statute's limits apply to independent contractors should be confirmed with counsel.");
    if (verdict === "likely-enforceable") verdict = "needs-review";
  }

  if (restrictive && sale === "no") {
    if (notice === "separate_signed") {
      reasons.push("Notice: a separate, signed notice was given, as the statute requires.");
    } else {
      reasons.push(
        notice === "in_agreement"
          ? "Notice: the covenant appears only inside the agreement. Colorado requires a separate notice document, in clear terms, signed by the worker."
          : "Notice: no notice was given. Colorado requires a separate notice document, signed by the worker.",
      );
      fixes.push("Give a separate notice document that identifies the agreement by name, states that it contains a covenant not to compete, directs the worker to the relevant sections and is signed by the worker. New hires get it before accepting the offer; current workers at least 14 days before the covenant (or the consideration for it) takes effect.");
      if (verdict === "likely-enforceable") verdict = "needs-review";
      if (verdict === "needs-review") verdict = "likely-void";
    }
  }

  const penaltyExposure = verdict === "likely-void" && restrictive ? workers * PENALTY_PER_WORKER : 0;
  if (verdict === "likely-void") {
    fixes.push("Stop presenting this covenant to new workers until it is revised, and don't try to enforce it as written.");
  }
  if (verdict === "likely-enforceable") {
    fixes.push("Keep the restriction narrow in time, geography and scope, tied to the trade secrets the worker actually has, and recheck pay at enforcement.");
  }

  return { verdict, threshold, reasons, fixes, penaltyExposure };
}

function compute(values: Values): ToolReport {
  const result = assessCovenant(values);
  const workers = Math.max(1, Math.round(num(values, "workers", 1)));
  const type = str(values, "covenantType");
  const typeLabel =
    type === "noncompete" ? "non-compete" : type === "customer_nonsolicit" ? "customer non-solicit" : type === "employee_nonsolicit" ? "employee non-solicit" : "confidentiality provision";

  const sections: ReportSection[] = [
    { title: "Why", items: result.reasons, tone: result.verdict === "likely-void" ? "flag" : result.verdict === "likely-enforceable" ? "ok" : "info" },
  ];
  if (result.fixes.length) sections.push({ title: "What to fix", items: result.fixes, tone: "info" });
  sections.push({
    title: "What's at stake",
    tone: "info",
    items: [
      "An employer that enters into, presents or tries to enforce a covenant that Colorado law makes void can owe each affected worker actual damages plus a $5,000 penalty, along with attorney fees. A court may reduce or waive the penalty for an employer that acted in good faith.",
      "A worker who primarily lived or worked in Colorado at the end of employment can't be required to litigate the covenant outside Colorado, and Colorado law governs for workers who primarily lived and worked here.",
    ],
  });

  const signals = ["employment:colorado-covenant", `covenant:${result.verdict}`];
  if (workers > 1) signals.push("covenant:template");

  return {
    headline: `Your ${typeLabel}: ${verdictLabels[result.verdict].charAt(0).toLowerCase() + verdictLabels[result.verdict].slice(1)}.`,
    summary:
      "This is an automated screen of the facts you entered against Colorado's non-compete statute, not a legal opinion on your agreement. The wording of the agreement, the worker's actual pay and the business reasons behind it all matter.",
    metrics: [
      { label: "Screening result", value: verdictLabels[result.verdict] },
      { label: type === "customer_nonsolicit" ? "2026 non-solicit pay threshold" : "2026 non-compete pay threshold", value: usd(result.threshold, { cents: result.threshold % 1 !== 0 }) },
      { label: "Workers on this template", value: int(workers) },
      ...(result.penaltyExposure
        ? [{ label: "Possible statutory penalties", value: usd(result.penaltyExposure), note: `${int(workers)} × $5,000, plus actual damages and fees` }]
        : []),
    ],
    tables: [],
    sections,
    nextSteps: [
      "Pull the exact agreement and the notice (if any) each worker signed.",
      "Confirm each worker's annualized cash compensation when they signed and today.",
      "Have Colorado employment counsel review before you present, renew or enforce the covenant.",
    ],
    signals,
  };
}

export const coloradoNoncompeteChecker: ToolSpec = {
  slug: "colorado-noncompete-checker",
  title: "Colorado Non-Compete Checker",
  titleParts: ["Colorado", "Non-Compete Checker"],
  stage: "team",
  meta: "Screening tool · 2026 thresholds",
  description:
    "Screen a non-compete, customer non-solicit or confidentiality clause against Colorado's statute and 2026 pay thresholds before you present it or rely on it.",
  explainer: {
    heading: "Colorado voids most non-competes",
    paragraphs: [
      "Since August 2022, Colorado has treated most non-competes as void. The main exception covers highly compensated workers, and only when the covenant protects trade secrets and is no broader than reasonably necessary. For 2026 the threshold is $130,014 in annualized cash compensation; customer non-solicits use 60% of that, $78,008.40.",
      "The rules are procedural too. A separate, signed notice is required, Colorado workers can't be forced to litigate elsewhere, and employers that present or enforce a void covenant risk a $5,000 penalty per worker plus damages.",
      "A 2025 amendment (SB25-083) added limits for minority owners in a sale and for physicians, advanced practice nurses and dentists. This tool screens your facts against those rules and tells you what to fix.",
    ],
  },
  outputs: [
    "A screening result: likely enforceable, likely void or needs review",
    "The pay threshold that applies, compared to the worker's pay",
    "Notice problems and how to fix them",
    "Your possible penalty exposure across a template",
  ],
  pages: [
    {
      title: "The covenant",
      fields: [
        {
          kind: "choice",
          id: "covenantType",
          label: "What kind of restriction is it?",
          options: [
            { value: "noncompete", label: "Non-compete", hint: "Can't work for or start a competitor" },
            { value: "customer_nonsolicit", label: "Customer non-solicit", hint: "Can't solicit the company's customers" },
            { value: "employee_nonsolicit", label: "Employee non-solicit", hint: "Can't recruit the company's workers" },
            { value: "confidentiality", label: "Confidentiality only" },
          ],
        },
        { kind: "date", id: "signedDate", label: "When was it signed (or will it be)?", default: "today" },
        {
          kind: "choice",
          id: "workerType",
          label: "Is the worker an employee or a contractor?",
          options: [
            { value: "employee", label: "Employee" },
            { value: "contractor", label: "Independent contractor" },
          ],
        },
        {
          kind: "number",
          id: "workers",
          label: "How many workers have signed this same template?",
          help: "Used to estimate penalty exposure if the template is void.",
          unit: "people",
          min: 1,
          max: 100_000,
          step: 1,
          default: 1,
        },
      ],
    },
    {
      title: "The worker",
      fields: [
        {
          kind: "number",
          id: "annualPay",
          label: "Worker's annualized cash compensation",
          help: "Salary, wages, bonuses and commissions. Don't include equity.",
          unit: "usd",
          min: 0,
          max: 100_000_000,
          step: 1_000,
          default: 120_000,
        },
        {
          kind: "choice",
          id: "coloradoWorker",
          label: "Does the worker primarily live or work in Colorado?",
          options: [
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
          ],
        },
        {
          kind: "choice",
          id: "purpose",
          label: "What is the restriction for?",
          options: [
            { value: "trade_secrets", label: "Protecting trade secrets the worker has access to" },
            { value: "general_competition", label: "Keeping the worker from competing generally" },
            { value: "unsure", label: "Not sure" },
          ],
        },
        {
          kind: "choice",
          id: "healthcare",
          label: "Is the worker a physician, advanced practice registered nurse or dentist?",
          options: [
            { value: "no", label: "No" },
            { value: "yes", label: "Yes" },
          ],
        },
      ],
    },
    {
      title: "Context and notice",
      fields: [
        {
          kind: "choice",
          id: "saleOfBusiness",
          label: "Is the covenant part of selling a business or an ownership interest?",
          options: [
            { value: "no", label: "No" },
            { value: "owner_seller", label: "Yes, the worker is an owner selling their interest" },
            { value: "minority_comp_equity", label: "Yes, a minority owner who received equity as compensation" },
          ],
        },
        {
          kind: "choice",
          id: "notice",
          label: "How was the worker told about the restriction?",
          options: [
            { value: "separate_signed", label: "A separate notice document the worker signed" },
            { value: "in_agreement", label: "Only in the agreement itself" },
            { value: "none", label: "No notice" },
          ],
        },
      ],
    },
  ],
  compute,
  followUpTopic: "your Colorado employment agreements",
  followUpAngles: [
    "The issue I see most with Colorado non-competes isn't the covenant itself, it's the notice. The statute wants a separate document the worker signs, delivered before they accept the offer. Most templates from before 2022 don't have one.",
    "If the same template went to a whole team, it's worth checking it once against current pay. The threshold moves every year, and the $5,000 penalty is counted per worker.",
    "If you're hiring senior people or selling a business, the 2025 changes for minority owners and health-care practitioners are worth a look before you finalize the agreements. Happy to review the language.",
  ],
  related: ["option-pool-sizer", "ip-ownership-audit", "advisor-equity-calculator"],
  sources: [
    { label: "Colorado SB25-083 (2025 amendments to C.R.S. 8-2-113)", url: "https://content.leg.colorado.gov/sites/default/files/documents/2025A/bills/sl/2025a_sl_366.pdf" },
    { label: "Epstein Becker Green: 2026 state non-compete salary thresholds", url: "https://www.ebglaw.com/trade-secrets-employee-mobility/raising-the-cost-of-noncompetes-2026-state-noncompete-salary-threshold-changes" },
  ],
};
