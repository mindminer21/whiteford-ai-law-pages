import { list, str } from "../fields";
import type { ReportSection, ReportTable, ToolReport, ToolSpec, Values } from "../types";

type Item = { text: string; high?: boolean };
type Section = { title: string; items: Item[] };

function buildSections(values: Values): { sections: Section[]; longLead: string[] } {
  const sale = str(values, "txType") === "sale";
  const types = list(values, "businessTypes");
  const software = types.includes("software");
  const hardware = types.includes("hardware");
  const life = types.includes("life");
  const consumer = types.includes("consumer");
  const patents = str(values, "patents") === "yes";
  const openSource = str(values, "openSource");
  const personalData = str(values, "personalData");
  const offshore = str(values, "offshore") === "yes";
  const international = str(values, "international") === "yes";
  const government = str(values, "government") === "yes";
  const changeOfControl = str(values, "changeOfControl");
  const disputes = str(values, "disputes") === "yes";
  const employees = str(values, "employees");
  const longLead: string[] = [];

  const corporate: Item[] = [
    { text: "Charter, bylaws and every amendment, with state filing evidence", high: true },
    { text: "Board and stockholder minutes and written consents, including equity grant approvals", high: true },
    { text: "Fully diluted cap table reconciled to stock ledgers, option grants and signed SAFEs or notes", high: true },
    { text: "Founder stock purchase agreements, vesting terms and 83(b) election copies", high: true },
    { text: "Every financing document: SAFEs, notes, stock purchase agreements and investor side letters" },
    { text: "Equity plan, form award agreements and the history of 409A valuations", high: true },
    { text: "Certificates of good standing and foreign qualifications in each state where you operate" },
  ];
  longLead.push("Reconcile the cap table against every signed grant, SAFE and note; mismatches take time to trace and may need corrective board approvals.");
  longLead.push("Gather the 409A valuation history and confirm each option grant's exercise price matched the valuation in effect when it was granted.");

  const financial: Item[] = [
    { text: "Annual financial statements for the last two or three years and year-to-date results", high: true },
    { text: "Current budget, forecast and the assumptions behind it" },
    { text: "Revenue by customer and product, with deferred revenue and bookings detail", high: sale },
    { text: "Debt, loans, guarantees, liens and any off-balance-sheet commitments" },
    { text: "Accounts receivable aging and accounts payable summary" },
  ];

  const contracts: Item[] = [
    { text: "Top customer contracts by revenue, including amendments and order forms", high: true },
    { text: "Key supplier, vendor, reseller and channel partner agreements" },
    { text: "Contracts with exclusivity, most-favored-customer, non-compete or minimum purchase terms", high: true },
    { text: "Contracts with assignment or change-of-control clauses and who must consent", high: sale },
    { text: "Strategic partnership, joint development and license agreements (in and out)", high: true },
  ];
  if (changeOfControl !== "no" && sale) {
    longLead.push("Identify contracts that need consent to assignment or change of control; counterparties can take weeks to respond and sometimes ask for concessions.");
  }
  if (government) contracts.push({ text: "Government contracts and subcontracts, with any data rights, security or set-aside requirements", high: true });

  const ip: Item[] = [
    { text: "Invention assignment and confidentiality agreements from every founder, employee and contractor", high: true },
    { text: "Assignment of any IP the founders created before the company was formed", high: true },
    { text: "List of registered and pending trademarks and domain names", high: false },
    { text: "Inbound licenses for software, data and technology the product depends on" },
    { text: "Any claims, demand letters or disputes about IP" },
  ];
  longLead.push("Close gaps in IP chain of title (missing founder or contractor assignments) before diligence starts; signatures from former contributors can be slow to get.");
  if (patents) {
    ip.push(
      { text: "Patent and patent application list with status, deadlines and owners of record", high: true },
      { text: "Recorded patent assignments from each inventor to the company", high: true },
      { text: "Any freedom-to-operate analyses and patent licenses or covenants not to sue" },
    );
  }
  if (software) {
    ip.push(
      { text: "Description of the product architecture and where the source code is hosted", high: false },
      { text: "Open-source component inventory with licenses, and how each is used and distributed", high: openSource !== "no" },
    );
    if (openSource !== "no") longLead.push("Run an open-source scan and remediate any components whose licenses conflict with how you distribute the product.");
    ip.push({ text: "Use of AI tools in development and any AI training data sources and permissions" });
  }
  if (hardware) ip.push({ text: "Manufacturing, tooling and design files ownership, and contract manufacturer agreements", high: true });
  if (life) ip.push({ text: "Research, sponsored research and university license agreements", high: true });

  const people: Item[] = [
    { text: "Employee census with title, location, start date, compensation and equity", high: true },
    { text: "Offer letters, employment agreements and any severance or change-of-control arrangements", high: true },
    { text: "Contractor and consultant agreements, with invention assignment terms", high: true },
    { text: "Employee handbook and key policies" },
    { text: "Non-compete and non-solicit agreements, and where each signer lives and works" },
    { text: "Benefit plans and any employment claims or agency charges" },
  ];
  if (offshore) people.push({ text: "Offshore contractor agreements, with assignment language that works under local law", high: true });
  if (employees === "50plus") people.push({ text: "Worker classification review and wage-and-hour compliance summary" });

  const privacy: Item[] = [];
  if (personalData !== "none") {
    privacy.push(
      { text: "Privacy policy, terms of service and data processing agreements with customers and vendors", high: true },
      { text: "Data map: what personal data you collect, where it is stored and who can access it", high: true },
      { text: "Security program summary, penetration test results and incident history", high: true },
    );
    if (personalData === "health") privacy.push({ text: "Health data compliance materials (for example HIPAA business associate agreements, where applicable)", high: true });
    if (consumer || personalData === "consumer") privacy.push({ text: "State consumer privacy law compliance, including Colorado's privacy law where it applies" });
  } else {
    privacy.push({ text: "Information security policies and any security incidents" });
  }

  const regulatory: Item[] = [{ text: "Licenses, permits and registrations needed to operate" }];
  if (life) regulatory.push({ text: "FDA or other regulatory submissions, correspondence and clearances", high: true });
  if (international) {
    regulatory.push(
      { text: "Foreign subsidiaries, registrations and local employment arrangements", high: true },
      { text: "Export control classification and sanctions screening" },
    );
  }
  if (government) regulatory.push({ text: "Facility clearances, security requirements and compliance certifications" });

  const litigation: Item[] = [{ text: "Pending, threatened or settled litigation, arbitration and government inquiries", high: disputes }];
  if (disputes) litigation.push({ text: "Demand letters, settlement agreements and litigation hold notices", high: true });

  const tax: Item[] = [
    { text: "Federal and state income tax returns for the last three years", high: sale },
    { text: "Sales and use tax analysis by state", high: software && sale },
    { text: "Payroll tax filings and any tax notices or audits" },
    { text: "Tax elections, including entity classification and QSBS support" },
  ];

  const property: Item[] = [
    { text: "Office leases and any subleases" },
    { text: "Insurance policies and claims history, including D&O and cyber" },
  ];

  return {
    sections: [
      { title: "Corporate and capitalization", items: corporate },
      { title: "Financial", items: financial },
      { title: "Material contracts", items: contracts },
      { title: "IP and technology", items: ip },
      { title: "Employees and contractors", items: people },
      { title: "Data privacy and security", items: privacy },
      { title: "Regulatory", items: regulatory },
      { title: "Litigation", items: litigation },
      { title: "Tax", items: tax },
      { title: "Real estate and insurance", items: property },
    ],
    longLead,
  };
}

const readinessBase: Record<string, number> = { notstarted: 15, partial: 50, organized: 80 };

function compute(values: Values): ToolReport {
  const sale = str(values, "txType") === "sale";
  const { sections, longLead } = buildSections(values);
  const total = sections.reduce((sum, section) => sum + section.items.length, 0);
  const high = sections.reduce((sum, section) => sum + section.items.filter((item) => item.high).length, 0);
  const dataRoom = str(values, "dataRoom");
  const readiness = Math.max(5, (readinessBase[dataRoom] ?? 15) - Math.max(0, longLead.length - 2) * 5);

  const tables: ReportTable[] = sections.map((section) => ({
    title: section.title,
    columns: ["Request", "Priority"],
    rows: section.items.map((item) => [item.text, item.high ? "High" : "Medium"]),
  }));

  const reportSections: ReportSection[] = [
    { title: "Start these long-lead items now", tone: "flag", items: longLead },
    {
      title: "How to use this list",
      tone: "info",
      items: [
        "Build the data room folders to match these sections so reviewers can find things quickly.",
        "Collect the high-priority items first; they come up in nearly every review.",
        "Note any missing or unsigned document instead of hiding the gap; a short explanation is better than a surprise.",
      ],
    },
  ];

  return {
    headline: `Your ${sale ? "sale" : "financing"} diligence list has ${total} requests, ${high} of them high priority.`,
    summary: `Based on your data room status, you're roughly ${readiness}% ready. ${longLead.length} items take weeks to fix, so start them first.`,
    metrics: [
      { label: "Requests on your list", value: String(total) },
      { label: "High priority", value: String(high) },
      { label: "Long-lead items", value: String(longLead.length), note: "Fixes that depend on other people's signatures or reviews" },
      { label: "Estimated readiness", value: `${readiness}%`, note: "From your data room status and long-lead items" },
    ],
    tables,
    sections: reportSections,
    nextSteps: [
      "Assign an owner and a date to each long-lead item this week.",
      sale
        ? "Score the five areas buyers look at first with the Sale & Investor Readiness Audit at learn.schellip.com/sale-readiness-audit."
        : "Check your investor-facing documents with the Sale & Investor Readiness Audit at learn.schellip.com/sale-readiness-audit.",
      "Have counsel review the IP, cap table and change-of-control items before the data room opens to the other side.",
    ],
    signals: [sale ? "sale:diligence-prep" : "raising:diligence-prep", ...(dataRoom === "notstarted" ? ["diligence:not-started"] : [])],
  };
}

const opts = (options: [string, string][]) => options.map(([value, label]) => ({ value, label }));
const yesNo = opts([["yes", "Yes"], ["no", "No"]]);

export const diligenceListBuilder: ToolSpec = {
  slug: "diligence-list-builder",
  title: "Diligence Request List Builder",
  titleParts: ["Diligence Request", "List Builder"],
  stage: "sell",
  meta: "Tailored list · data room plan",
  description:
    "Answer a few questions about your company and get the diligence request list a buyer or lead investor is likely to send, with the slow items flagged.",
  explainer: {
    heading: "Diligence goes faster when you see the list first",
    paragraphs: [
      "Every acquirer and lead investor sends a request list, and most of the requests are predictable: corporate records, the cap table, key contracts, IP ownership, employees, data practices, taxes and disputes. The companies that move quickly have those documents organized before anyone asks.",
      "A few items take far longer than the rest because they depend on other people: missing IP assignments from former contributors, consents from customers whose contracts restrict assignment, and cap table records that don't reconcile.",
      "This builder tailors a request list to your business and flags the long-lead items so you can start them first.",
    ],
  },
  outputs: [
    "A request list tailored to your business, in ten sections",
    "High and medium priority for each request",
    "The long-lead items to start now",
    "A rough readiness estimate",
  ],
  pages: [
    {
      title: "The transaction",
      fields: [
        { kind: "choice", id: "txType", label: "What are you preparing for?", options: opts([["sale", "A sale of the company"], ["financing", "A priced financing round"]]) },
        {
          kind: "multi",
          id: "businessTypes",
          label: "What describes the business? Select all that apply.",
          options: opts([["software", "Software or SaaS"], ["hardware", "Hardware or devices"], ["life", "Life sciences or medical"], ["consumer", "Consumer products or services"], ["services", "Professional or business services"]]),
          default: ["software"],
        },
        { kind: "choice", id: "employees", label: "How many employees?", display: "select", default: "10to49", options: opts([["under10", "Fewer than 10"], ["10to49", "10 to 49"], ["50plus", "50 or more"]]) },
        { kind: "choice", id: "dataRoom", label: "Have you started a data room?", options: opts([["notstarted", "Not started"], ["partial", "Partly organized"], ["organized", "Organized and current"]]) },
      ],
    },
    {
      title: "IP and data",
      fields: [
        { kind: "choice", id: "patents", label: "Does the company own patents or patent applications?", options: yesNo },
        { kind: "choice", id: "openSource", label: "Does the product you distribute include open-source software?", options: opts([["yes", "Yes"], ["no", "No"], ["unsure", "Not sure"]]) },
        { kind: "choice", id: "personalData", label: "What personal data do you handle?", options: opts([["consumer", "Consumer personal data"], ["health", "Health data"], ["none", "Little or none"]]) },
        { kind: "choice", id: "offshore", label: "Do contractors outside the U.S. build product for you?", options: yesNo },
      ],
    },
    {
      title: "Contracts and risk",
      fields: [
        { kind: "choice", id: "international", label: "Do you have operations or subsidiaries outside the U.S.?", options: yesNo },
        { kind: "choice", id: "government", label: "Do you have government contracts?", options: yesNo },
        { kind: "choice", id: "changeOfControl", label: "Do key customer contracts limit assignment or change of control?", options: opts([["yes", "Yes"], ["no", "No"], ["unsure", "Not sure"]]) },
        { kind: "choice", id: "disputes", label: "Are there pending or threatened disputes?", options: yesNo },
      ],
    },
  ],
  compute,
  followUpTopic: "your diligence preparation",
  followUpAngles: [
    "The items on the list that slow deals down are almost always the long-lead ones: an IP assignment from someone who left years ago, or a customer consent. If any of those showed up for you, they're worth starting this month.",
    "One practical step: build the data room folders to mirror the request list before you fill them. Reviewers move faster, and gaps become obvious to you before they're obvious to the other side.",
    "If a transaction is getting closer, it helps to have counsel walk the data room once before it opens. Fixing a document beforehand is much cheaper than explaining it during diligence.",
  ],
  related: ["ip-ownership-audit", "exempt-offering-checklist", "term-sheet-decoder"],
  sources: [],
};
