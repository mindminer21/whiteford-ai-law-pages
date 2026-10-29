export const complianceText =
  "This tool is for general informational purposes only and is not legal advice. Use of this tool does not create an attorney-client relationship between you, your company, and Whiteford Taylor & Preston LLP or Schell IP. Do not submit confidential, privileged, or trade-secret information through this tool. Any engagement is subject to a conflicts check and a written engagement letter. Attorney advertising. Prior results do not guarantee a similar outcome.";

export const noConfidentialInfoText =
  "All answers are categorical. Do not submit confidential, privileged, or trade-secret information.";

export const permissionText =
  "I understand this tool does not provide legal advice and does not create an attorney-client relationship. I have not submitted confidential or privileged information.";

export const outsideCounselPdfUrl = "https://learn.schellip.com/pdfs/outside-counsel-playbook.pdf";

export type MagnetSlug =
  | "ai-risk-triage"
  | "patent-moat-scorecard"
  | "governance-plan"
  | "outside-counsel-playbook"
  | "sale-readiness-audit";

/**
 * Optional company-profile fields a magnet may collect alongside name, email and company.
 * Everything except phone and website is categorical so no confidential detail is captured.
 */
export const companyProfileOptions = {
  role: ["Founder / CEO", "Owner", "Executive team", "Board member or investor", "Advisor"],
  industry: [
    "Software / SaaS",
    "AI / data",
    "Hardware / devices",
    "Life sciences / medtech",
    "Energy / cleantech",
    "Aerospace / defense",
    "Consumer products",
    "Business / professional services",
    "Manufacturing / industrial",
    "Other",
  ],
  revenue: ["Pre-revenue", "Under $1M", "$1M to $5M", "$5M to $20M", "$20M to $50M", "Over $50M", "Prefer not to say"],
  employees: ["1 to 10", "11 to 50", "51 to 200", "201 to 500", "Over 500"],
  hq: ["Colorado", "Another Mountain West state", "Elsewhere in the U.S.", "Outside the U.S."],
} as const;

export type CompanyProfileKey = keyof typeof companyProfileOptions;

export const companyProfileLabels: Record<CompanyProfileKey, string> = {
  role: "Your role",
  industry: "Industry",
  revenue: "Annual revenue",
  employees: "Employees",
  hq: "Company headquarters",
};

export type CompanyProfile = Partial<Record<CompanyProfileKey, string>> & {
  phone?: string;
  website?: string;
};

/** Sale-interest code recorded in HighLevel for each sale-readiness status option. */
export const saleInterestByStatus: Record<string, { code: string; label: string }> = {
  "Exploring a sale in the next 12 months.": { code: "sale-0-12-months", label: "Exploring a sale within 12 months" },
  "Considering a sale in one to three years.": { code: "sale-1-3-years", label: "Considering a sale in 1 to 3 years" },
  "Raising capital or preparing for investor diligence.": { code: "raise-capital", label: "Raising capital / investor diligence" },
  "No sale planned; I want to know where we stand.": { code: "no-sale-planned", label: "No sale planned (benchmarking)" },
};

export type MagnetMode = "founder" | "investor";

export type QuestionOption = {
  label: string;
  score: number;
};

export type MagnetQuestion = {
  id: `q${number}`;
  label: string;
  areaKey: string;
  fieldKey?: string;
  options: QuestionOption[];
};

export type MagnetArea = {
  key: string;
  label: string;
  maxScore: number;
  action: string;
  investorAction?: string;
};

export type Tier = {
  key: string;
  label: string;
  tag: string;
  headline: string;
};

type BaseMagnetConfig = {
  slug: MagnetSlug;
  title: string;
  formTitle: string;
  formDescription: string;
  buttonLabel: string;
  statusLegend: string;
  statusOptions: string[];
  kind: "assessment" | "download";
  /** Collect role, phone, website and categorical company details with the contact block. */
  companyProfile?: boolean;
  /** Email the scored report to the respondent through AgentMail. */
  emailDelivery?: "agentmail";
  /** Offer an optional "have Jeff follow up" checkbox. */
  followUpOption?: string;
  /**
   * Gate the tool: collect name, email, company and website first, email a 6-digit code, and
   * unlock the questions only after the code is verified. /api/leads enforces it server-side.
   */
  emailVerification?: boolean;
};

/** Presentation grouping for paged assessments (scoring areas are unchanged). */
export type QuestionPage = {
  title: string;
  intro: string;
  questionIds: string[];
};

export type AssessmentMagnetConfig = BaseMagnetConfig & {
  kind: "assessment";
  scoreMax: number;
  modeToggle?: boolean;
  questions: MagnetQuestion[];
  areas: MagnetArea[];
  tiers: TierRule[];
  /** When set, the verified flow shows these pages one at a time with a progress bar. */
  questionPages?: QuestionPage[];
};

export type DownloadMagnetConfig = BaseMagnetConfig & {
  kind: "download";
};

export type MagnetConfig = AssessmentMagnetConfig | DownloadMagnetConfig;

export type TierRule = Tier & {
  min: number;
  max: number;
};

export type AssessmentResult = {
  ok: true;
  magnet_slug: Exclude<MagnetSlug, "outside-counsel-playbook">;
  score: number;
  score_max: number;
  tier: Tier;
  sub_scores: Record<string, number>;
  actions: string[];
  mode?: MagnetMode;
};

export type DownloadResult = {
  ok: true;
  magnet_slug: "outside-counsel-playbook";
};

export const magnetConfigs = {
  "ai-risk-triage": {
    slug: "ai-risk-triage",
    kind: "assessment",
    title: "AI Legal Risk Triage",
    formTitle: "Run the AI Legal Risk Triage",
    formDescription:
      "Answer twelve categorical questions about posture, process, and cadence. Your result appears here and is also queued to HighLevel for email follow-up.",
    buttonLabel: "Get my AI risk profile",
    statusLegend: "What best describes your current need?",
    statusOptions: [
      "I need help with my company's AI compliance immediately.",
      "I'm just starting to explore whether we need AI compliance.",
      "We use AI internally and need a governance plan.",
      "We are preparing for customer, investor, or diligence questions about AI.",
    ],
    scoreMax: 36,
    areas: [
      {
        key: "data_rights",
        label: "Data Rights",
        maxScore: 9,
        action: "Document AI data-use rules, customer-data flows, and vendor retention positions before the next investor or customer review.",
      },
      {
        key: "output_ownership",
        label: "Output Ownership",
        maxScore: 9,
        action: "Update employee and contractor IP language so AI-assisted work product ownership is addressed in writing.",
      },
      {
        key: "contracts",
        label: "Contracts",
        maxScore: 9,
        action: "Review customer terms, AI capability claims, and vendor agreements for training rights, output rights, retention, and indemnity.",
      },
      {
        key: "governance",
        label: "Governance",
        maxScore: 9,
        action: "Designate an AI approval owner and document the cadence for tool approval, leadership reporting, and escalation.",
      },
    ],
    questions: [
      {
        id: "q1",
        areaKey: "data_rights",
        label: "Does your company have a written policy describing what data can be used to train, fine-tune, or prompt AI tools?",
        options: [
          { label: "Yes, formal written policy", score: 3 },
          { label: "In progress or draft policy", score: 2 },
          { label: "Informal practice, no written policy", score: 1 },
          { label: "No policy or practice", score: 0 },
        ],
      },
      {
        id: "q2",
        areaKey: "data_rights",
        label: "How would you describe documentation of customer data flowing into AI tools?",
        options: [
          { label: "Mapped and documented across all tools", score: 3 },
          { label: "Partially mapped", score: 2 },
          { label: "Not documented", score: 1 },
          { label: "We do not use customer data in AI tools", score: 3 },
        ],
      },
      {
        id: "q3",
        areaKey: "data_rights",
        label: "How does your company approach AI vendor data-retention terms?",
        options: [
          { label: "Custom terms negotiated with key vendors", score: 3 },
          { label: "Standard terms reviewed and accepted", score: 2 },
          { label: "Standard terms accepted without review", score: 1 },
          { label: "Vendor terms not reviewed", score: 0 },
        ],
      },
      {
        id: "q4",
        areaKey: "output_ownership",
        label: "Do your employment agreements address ownership of AI-assisted work product?",
        options: [
          { label: "Yes, updated within the past 12 months", score: 3 },
          { label: "Yes, but predate AI use", score: 2 },
          { label: "General IP language only", score: 1 },
          { label: "No specific language", score: 0 },
        ],
      },
      {
        id: "q5",
        areaKey: "output_ownership",
        label: "Do your contractor agreements address ownership of AI-assisted work product?",
        options: [
          { label: "Yes, updated within the past 12 months", score: 3 },
          { label: "Yes, but predate AI use", score: 2 },
          { label: "General IP language only", score: 1 },
          { label: "No specific language", score: 0 },
          { label: "We do not use contractors", score: 3 },
        ],
      },
      {
        id: "q6",
        areaKey: "output_ownership",
        label: "How frequently does work product at your company incorporate AI-generated content?",
        options: [
          { label: "Daily across the team", score: 1 },
          { label: "Weekly", score: 2 },
          { label: "Occasionally", score: 3 },
          { label: "Rarely or never", score: 3 },
        ],
      },
      {
        id: "q7",
        areaKey: "contracts",
        label: "Do your customer-facing terms address how the product uses AI?",
        options: [
          { label: "Yes, current language", score: 3 },
          { label: "Yes, but not recently reviewed", score: 2 },
          { label: "No specific AI language", score: 1 },
          { label: "We do not have AI in the product", score: 3 },
        ],
      },
      {
        id: "q8",
        areaKey: "contracts",
        label: "Have you reviewed vendor agreements for AI-specific terms (training rights, output rights, retention)?",
        options: [
          { label: "All vendors reviewed", score: 3 },
          { label: "Most vendors reviewed", score: 2 },
          { label: "Some vendors reviewed", score: 1 },
          { label: "Not reviewed", score: 0 },
        ],
      },
      {
        id: "q9",
        areaKey: "contracts",
        label: "How are AI capability claims in marketing materials reviewed before publication?",
        options: [
          { label: "Legal review required", score: 3 },
          { label: "Marketing review with legal escalation", score: 2 },
          { label: "Ad hoc review", score: 1 },
          { label: "No formal review", score: 0 },
        ],
      },
      {
        id: "q10",
        areaKey: "governance",
        label: "Is there a designated owner for AI policy and approvals at your company?",
        options: [
          { label: "Yes, formally designated", score: 3 },
          { label: "Informally designated", score: 2 },
          { label: "Distributed across leaders", score: 1 },
          { label: "No designated owner", score: 0 },
        ],
      },
      {
        id: "q11",
        areaKey: "governance",
        label: "How often does leadership review AI-related risks and decisions?",
        options: [
          { label: "At every board or leadership meeting", score: 3 },
          { label: "Quarterly", score: 2 },
          { label: "As-needed", score: 1 },
          { label: "Has not formally reviewed", score: 0 },
        ],
      },
      {
        id: "q12",
        areaKey: "governance",
        label: "How are new AI tools introduced into the company?",
        options: [
          { label: "Formal approval process required", score: 3 },
          { label: "Manager approval required", score: 2 },
          { label: "Anyone can adopt", score: 1 },
          { label: "No standard process", score: 0 },
        ],
      },
    ],
    tiers: [
      {
        min: 28,
        max: 36,
        key: "strong",
        label: "Strong posture",
        tag: "risk-tier-strong",
        headline: "You are past the basics; the useful next step is targeted counsel review of edge-case scenarios.",
      },
      {
        min: 18,
        max: 27,
        key: "building",
        label: "Material building",
        tag: "risk-tier-building",
        headline: "You have meaningful structure, but contracts and governance cadence need focused attention.",
      },
      {
        min: 9,
        max: 17,
        key: "material-exposure",
        label: "Material exposure",
        tag: "risk-tier-material-exposure",
        headline: "Several posture gaps are likely to surface in diligence, customer review, or leadership reporting.",
      },
      {
        min: 0,
        max: 8,
        key: "foundational",
        label: "Foundational gaps",
        tag: "risk-tier-foundational",
        headline: "The first priority is basic documentation, ownership, and approval structure.",
      },
    ],
  },
  "patent-moat-scorecard": {
    slug: "patent-moat-scorecard",
    kind: "assessment",
    title: "Patent Moat Scorecard",
    formTitle: "Run the Patent Moat Scorecard",
    formDescription:
      "Answer fifteen categorical questions. Founder mode and investor mode use the same score with different action framing.",
    buttonLabel: "Score my moat",
    statusLegend: "What best describes the IP issue?",
    statusOptions: [
      "I need help protecting AI-assisted inventions immediately.",
      "I'm exploring whether our AI product needs patent protection.",
      "We are preparing for fundraising, customer diligence, or an exit.",
      "We need to clean up ownership or invention records.",
    ],
    scoreMax: 45,
    modeToggle: true,
    areas: [
      {
        key: "invention_capture",
        label: "Invention Capture",
        maxScore: 9,
        action: "Create a recurring invention-capture rhythm tied to product milestones and inventor education.",
        investorAction: "Ask management how invention capture is tied to product releases and whether inventor training is current.",
      },
      {
        key: "allocation",
        label: "Patent vs. Trade Secret Allocation",
        maxScore: 9,
        action: "Document the patent-versus-trade-secret allocation framework and confirm access controls for trade-secret material.",
        investorAction: "Review whether patent filings and trade-secret controls reflect deliberate allocation rather than ad hoc filing choices.",
      },
      {
        key: "fto",
        label: "Freedom to Operate",
        maxScore: 9,
        action: "Refresh freedom-to-operate posture and competitor monitoring before the next financing, launch, or diligence event.",
        investorAction: "Probe whether freedom-to-operate analysis and competitor monitoring are current for the highest-value product features.",
      },
      {
        key: "claim_alignment",
        label: "Claim-Product Alignment",
        maxScore: 9,
        action: "Map claims to product features and identify whether continuations should cover roadmap features.",
        investorAction: "Ask for a claim-to-product map and a continuation strategy aligned to the current roadmap.",
      },
      {
        key: "exit_fit",
        label: "Exit-Horizon Fit",
        maxScore: 9,
        action: "Organize portfolio records, international filing rationale, and adjacent IP posture for diligence readiness.",
        investorAction: "Evaluate whether the portfolio can support diligence quickly and whether geography and adjacent IP match revenue strategy.",
      },
    ],
    questions: [
      {
        id: "q1",
        areaKey: "invention_capture",
        label: "How structured is invention documentation at your company?",
        options: [
          { label: "Continuous structured process", score: 3 },
          { label: "Quarterly capture", score: 2 },
          { label: "Only when filing patents", score: 1 },
          { label: "Rarely captured", score: 0 },
        ],
      },
      {
        id: "q2",
        areaKey: "invention_capture",
        label: "Do inventors receive training on what is potentially patentable and on disclosure timing?",
        options: [
          { label: "Yes, formal training program", score: 3 },
          { label: "Informal guidance", score: 2 },
          { label: "General awareness only", score: 1 },
          { label: "No training", score: 0 },
        ],
      },
      {
        id: "q3",
        areaKey: "invention_capture",
        label: "How is invention disclosure tied to product milestones?",
        options: [
          { label: "Disclosure review before each major release", score: 3 },
          { label: "Periodic review independent of releases", score: 2 },
          { label: "Only when filing comes up", score: 1 },
          { label: "Not tied to milestones", score: 0 },
        ],
      },
      {
        id: "q4",
        areaKey: "allocation",
        label: "Has your company made deliberate decisions about what to patent versus keep as trade secret?",
        options: [
          { label: "Yes, documented framework", score: 3 },
          { label: "Yes, case-by-case decisions", score: 2 },
          { label: "File what comes up, no framework", score: 1 },
          { label: "Not applicable to our business", score: 3 },
        ],
      },
      {
        id: "q5",
        areaKey: "allocation",
        label: "Do you maintain access controls and documentation for material treated as trade secret?",
        options: [
          { label: "Yes, comprehensive program", score: 3 },
          { label: "Yes, partial program", score: 2 },
          { label: "Informal controls", score: 1 },
          { label: "No formal program", score: 0 },
          { label: "Not applicable", score: 3 },
        ],
      },
      {
        id: "q6",
        areaKey: "allocation",
        label: "How would you describe your patent claim breadth strategy?",
        options: [
          { label: "Mix of narrow and broad claims by design", score: 3 },
          { label: "As broad as possible", score: 2 },
          { label: "Narrow defensive claims", score: 2 },
          { label: "No defined strategy", score: 0 },
        ],
      },
      {
        id: "q7",
        areaKey: "fto",
        label: "Have you conducted formal freedom-to-operate analysis against key competitors?",
        options: [
          { label: "Comprehensive FTO completed and current", score: 3 },
          { label: "Targeted FTO on key features", score: 2 },
          { label: "Informal awareness", score: 1 },
          { label: "No FTO work", score: 0 },
        ],
      },
      {
        id: "q8",
        areaKey: "fto",
        label: "Do you monitor competitor patent activity in your space?",
        options: [
          { label: "Continuous monitoring", score: 3 },
          { label: "Quarterly review", score: 2 },
          { label: "Annual review", score: 1 },
          { label: "Not actively monitored", score: 0 },
        ],
      },
      {
        id: "q9",
        areaKey: "fto",
        label: "How prepared is your engineering team to design around adverse claims if needed?",
        options: [
          { label: "Documented design-around capability", score: 3 },
          { label: "General awareness in engineering", score: 2 },
          { label: "Limited awareness", score: 1 },
          { label: "Not addressed", score: 0 },
        ],
      },
      {
        id: "q10",
        areaKey: "claim_alignment",
        label: "Do you maintain a current map of which patent claims cover which product features?",
        options: [
          { label: "Yes, updated continuously", score: 3 },
          { label: "Yes, updated annually", score: 2 },
          { label: "Informal mapping", score: 1 },
          { label: "No mapping", score: 0 },
        ],
      },
      {
        id: "q11",
        areaKey: "claim_alignment",
        label: "How often is portfolio strategy reviewed against the current product roadmap?",
        options: [
          { label: "Quarterly", score: 3 },
          { label: "Annually", score: 2 },
          { label: "Less than annually", score: 1 },
          { label: "Has not occurred", score: 0 },
        ],
      },
      {
        id: "q12",
        areaKey: "claim_alignment",
        label: "Do you file continuations to address features that emerge after initial filings?",
        options: [
          { label: "Yes, proactive strategy", score: 3 },
          { label: "Yes, reactive to specific needs", score: 2 },
          { label: "Rarely", score: 1 },
          { label: "Never", score: 0 },
        ],
      },
      {
        id: "q13",
        areaKey: "exit_fit",
        label: "How would you describe your portfolio's diligence-ready posture?",
        options: [
          { label: "Could respond to diligence inquiry in days", score: 3 },
          { label: "Could respond in weeks", score: 2 },
          { label: "Would require significant prep", score: 1 },
          { label: "Not ready", score: 0 },
        ],
      },
      {
        id: "q14",
        areaKey: "exit_fit",
        label: "Do you have an international filing strategy aligned with revenue geography?",
        options: [
          { label: "Yes, documented and current", score: 3 },
          { label: "Case-by-case decisions", score: 2 },
          { label: "Default-everywhere", score: 1 },
          { label: "No filings abroad", score: 0 },
        ],
      },
      {
        id: "q15",
        areaKey: "exit_fit",
        label: "Have you assessed the strategic value of adjacent IP (data rights, copyrights, design patents)?",
        options: [
          { label: "Comprehensive assessment", score: 3 },
          { label: "Partial assessment", score: 2 },
          { label: "Not assessed", score: 0 },
        ],
      },
    ],
    tiers: [
      {
        min: 36,
        max: 45,
        key: "defensible",
        label: "Defensible moat",
        tag: "moat-tier-defensible",
        headline: "Your portfolio posture is organized, mapped, monitored, and aligned enough to maintain and report.",
      },
      {
        min: 24,
        max: 35,
        key: "seriesa-ready",
        label: "Series A-ready",
        tag: "moat-tier-seriesa-ready",
        headline: "Your moat has real structure; claim-product alignment and exit-horizon fit are the next pressure points.",
      },
      {
        min: 14,
        max: 23,
        key: "building",
        label: "Building",
        tag: "moat-tier-building",
        headline: "Foundational filings may exist, but the operating rhythm needs work before diligence pressure rises.",
      },
      {
        min: 0,
        max: 13,
        key: "early-gap",
        label: "Early-stage gap",
        tag: "moat-tier-early-gap",
        headline: "Diligence-blocking gaps should be closed before the next financing, launch, or strategic conversation.",
      },
    ],
  },
  "governance-plan": {
    slug: "governance-plan",
    kind: "assessment",
    title: "AI Governance Readiness Plan",
    formTitle: "Build the AI Governance Readiness Plan",
    formDescription:
      "Answer nine categorical questions. The result maps each governance area into Structure, Draft, or Gap status.",
    buttonLabel: "Build my governance plan",
    statusLegend: "What kind of governance help do you need?",
    statusOptions: [
      "I need help with my company's AI compliance immediately.",
      "I'm just starting to explore whether we need AI compliance.",
      "We use AI internally and need a governance plan.",
      "We are preparing for customer, investor, or diligence questions about AI.",
    ],
    scoreMax: 27,
    areas: [
      { key: "q1", label: "AI Use Policy", maxScore: 3, action: "Adopt a written AI use policy that distinguishes low-risk and high-risk use." },
      { key: "q2", label: "AI in Hiring", maxScore: 3, action: "Review hiring-related AI tools for bias, candidate disclosure, and disparate-impact controls." },
      { key: "q3", label: "Content Generation", maxScore: 3, action: "Document the workflow for allowed AI content tools, attribution, and ownership review." },
      { key: "q4", label: "Customer Data & AI", maxScore: 3, action: "Maintain a current inventory of AI tools that touch customer data and document data flows." },
      { key: "q5", label: "Vendor Intake", maxScore: 3, action: "Create vendor intake that covers training rights, retention, indemnity, and security." },
      { key: "q6", label: "Approval Authority", maxScore: 3, action: "Designate a single owner with documented authority for AI tool and use-case approvals." },
      { key: "q7", label: "Customer Contracts", maxScore: 3, action: "Update customer contracts to address AI use, output, data, and indemnity." },
      { key: "q8", label: "Board Reporting", maxScore: 3, action: "Add AI use, risk, and governance reporting to the board or leadership cadence." },
      { key: "q9", label: "Outside Counsel", maxScore: 3, action: "Confirm outside counsel coverage for AI-specific IP, contracts, policy, and vendor review." },
    ],
    questions: [
      {
        id: "q1",
        areaKey: "q1",
        fieldKey: "gov_q1_use_policy",
        label: "AI Use Policy. Do you have a written AI use policy distinguishing low-risk and high-risk AI use?",
        options: [
          { label: "Comprehensive policy in force", score: 3 },
          { label: "Basic policy in force", score: 2 },
          { label: "Draft policy", score: 1 },
          { label: "No policy", score: 0 },
        ],
      },
      {
        id: "q2",
        areaKey: "q2",
        fieldKey: "gov_q2_hiring",
        label: "AI in Hiring. Have you reviewed AI tools used in hiring for bias, candidate disclosure, and disparate impact?",
        options: [
          { label: "Formal review completed", score: 3 },
          { label: "Partial review", score: 2 },
          { label: "Not yet reviewed", score: 1 },
          { label: "We do not use AI in hiring", score: 3 },
        ],
      },
      {
        id: "q3",
        areaKey: "q3",
        fieldKey: "gov_q3_content",
        label: "Content Generation. Do you have a documented workflow for AI-generated content (allowed tools, attribution, ownership)?",
        options: [
          { label: "Clear written workflow", score: 3 },
          { label: "Informal practice", score: 2 },
          { label: "No workflow", score: 0 },
          { label: "Not applicable to our work", score: 3 },
        ],
      },
      {
        id: "q4",
        areaKey: "q4",
        fieldKey: "gov_q4_customer_data",
        label: "Customer Data & AI. Do you maintain a current inventory of AI tools that touch customer data, with documented data flows?",
        options: [
          { label: "Current inventory", score: 3 },
          { label: "Outdated inventory", score: 2 },
          { label: "No formal inventory", score: 0 },
        ],
      },
      {
        id: "q5",
        areaKey: "q5",
        fieldKey: "gov_q5_vendor_intake",
        label: "Vendor Intake. Is there a formal intake process for new AI vendors addressing training, retention, indemnity, and security?",
        options: [
          { label: "Required for all vendors", score: 3 },
          { label: "Required for high-risk vendors only", score: 2 },
          { label: "Ad hoc", score: 1 },
          { label: "No process", score: 0 },
        ],
      },
      {
        id: "q6",
        areaKey: "q6",
        fieldKey: "gov_q6_approval",
        label: "Approval Authority. Is there a designated owner with documented authority for AI tool and use-case approvals?",
        options: [
          { label: "Formally designated", score: 3 },
          { label: "Informally designated", score: 2 },
          { label: "Distributed", score: 1 },
          { label: "No designated owner", score: 0 },
        ],
      },
      {
        id: "q7",
        areaKey: "q7",
        fieldKey: "gov_q7_customer_contracts",
        label: "Customer Contracts. Have customer contracts been updated to address AI use, output, data, and indemnity?",
        options: [
          { label: "All updated", score: 3 },
          { label: "Some updated", score: 2 },
          { label: "Not yet", score: 0 },
        ],
      },
      {
        id: "q8",
        areaKey: "q8",
        fieldKey: "gov_q8_board_reporting",
        label: "Board Reporting. How often does the board receive reporting on AI use, risks, and governance?",
        options: [
          { label: "Every meeting", score: 3 },
          { label: "Quarterly", score: 2 },
          { label: "Annually", score: 1 },
          { label: "Has not received reporting", score: 0 },
        ],
      },
      {
        id: "q9",
        areaKey: "q9",
        fieldKey: "gov_q9_outside_counsel",
        label: "Outside Counsel. Does your outside counsel engagement cover AI-specific issues (IP, contracts, policy, vendor review)?",
        options: [
          { label: "Comprehensive coverage", score: 3 },
          { label: "Partial coverage", score: 2 },
          { label: "No coverage", score: 0 },
          { label: "Not applicable", score: 3 },
        ],
      },
    ],
    tiers: [
      {
        min: 22,
        max: 27,
        key: "mature",
        label: "Mature governance",
        tag: "gov-tier-mature",
        headline: "Governance is functioning; the work now is keeping the plan current quarter over quarter.",
      },
      {
        min: 13,
        max: 21,
        key: "building",
        label: "Building governance",
        tag: "gov-tier-building",
        headline: "The foundations are visible, but specific operational and external areas need attention.",
      },
      {
        min: 0,
        max: 12,
        key: "prefoundation",
        label: "Pre-foundation",
        tag: "gov-tier-prefoundation",
        headline: "Foundational governance work is needed before a board, customer, or diligence review asks for it.",
      },
    ],
  },
  "outside-counsel-playbook": {
    slug: "outside-counsel-playbook",
    kind: "download",
    title: "Outside Counsel Playbook",
    formTitle: "Send the Outside Counsel Playbook",
    formDescription:
      "Enter your contact details and permission acknowledgment. The playbook is delivered through the HighLevel follow-up workflow.",
    buttonLabel: "Send me the playbook",
    statusLegend: "What best describes your current need?",
    statusOptions: [
      "I need help with outside counsel structure immediately.",
      "I'm comparing legal support models for a technology company.",
      "We are preparing for financing, diligence, customer growth, or an exit.",
      "I want the playbook for planning.",
    ],
  },
  "sale-readiness-audit": {
    slug: "sale-readiness-audit",
    kind: "assessment",
    title: "Sale & Investor Readiness Audit",
    formTitle: "Run the Sale & Investor Readiness Audit",
    formDescription:
      "Answer fifteen categorical questions about the issues buyers and investors diligence first. Your score, buyer-diligence risk map and 60-day cleanup priorities appear here and arrive in your inbox.",
    buttonLabel: "Score my sale readiness",
    statusLegend: "Where is the company on a sale or capital raise?",
    statusOptions: [
      "Exploring a sale in the next 12 months.",
      "Considering a sale in one to three years.",
      "Raising capital or preparing for investor diligence.",
      "No sale planned; I want to know where we stand.",
    ],
    companyProfile: true,
    emailVerification: true,
    emailDelivery: "agentmail",
    followUpOption: "I'd like Jeff to follow up about my result and timeline.",
    scoreMax: 45,
    questionPages: [
      {
        title: "IP ownership & protection",
        intro: "Who owns the technology and the brand, and how well it is protected.",
        questionIds: ["q1", "q2", "q3", "q4", "q6"],
      },
      {
        title: "Know-how, software & data",
        intro: "Trade secrets, the licenses and code the product depends on, and the data behind it.",
        questionIds: ["q5", "q8", "q10", "q11", "q12"],
      },
      {
        title: "Contracts, records & disputes",
        intro: "What a buyer will ask to see before signing.",
        questionIds: ["q7", "q9", "q13", "q14", "q15"],
      },
    ],
    areas: [
      {
        key: "ownership",
        label: "Ownership",
        maxScore: 9,
        action: "Collect signed, present-tense invention assignments from every founder, employee and contractor who built core technology, and record any missing assignments with the patent and trademark offices.",
      },
      {
        key: "protection",
        label: "Protection",
        maxScore: 9,
        action: "Map patents, trade secrets and trademarks to the products that generate revenue, and close the gaps a buyer will see first: unfiled core inventions, unregistered brand names and undocumented trade secrets.",
      },
      {
        key: "contracts",
        label: "Contracts",
        maxScore: 9,
        action: "Pull every key customer, supplier and inbound license, flag change-of-control and anti-assignment clauses, and line up the consents a buyer will require before signing.",
      },
      {
        key: "tech_data",
        label: "Software & Data",
        maxScore: 9,
        action: "Inventory open-source components and AI tools, confirm license obligations are met, and document the rights you hold in the customer and training data the business relies on.",
      },
      {
        key: "records",
        label: "Records",
        maxScore: 9,
        action: "Reconcile the cap table to signed equity documents, log any IP claims or demand letters with their status, and stage the core documents in a data room before a buyer asks.",
      },
    ],
    questions: [
      {
        id: "q1",
        areaKey: "ownership",
        label: "Have all founders and employees who built core technology signed invention assignment agreements?",
        options: [
          { label: "Yes, all signed with present-tense assignment language", score: 3 },
          { label: "Most have signed", score: 2 },
          { label: "Some have, or the language is unclear", score: 1 },
          { label: "No, or we are not sure", score: 0 },
        ],
      },
      {
        id: "q2",
        areaKey: "ownership",
        label: "Do contractors, agencies and offshore developers who wrote code or designs assign their IP to the company?",
        options: [
          { label: "Yes, every engagement has a written assignment", score: 3 },
          { label: "Most engagements do", score: 2 },
          { label: "Only some, or the terms are unclear", score: 1 },
          { label: "No, or we are not sure", score: 0 },
          { label: "We have not used outside developers", score: 3 },
        ],
      },
      {
        id: "q3",
        areaKey: "ownership",
        label: "Are patents, trademarks and domain names held in the company's name with current records?",
        options: [
          { label: "Yes, all held by the company and recorded", score: 3 },
          { label: "Mostly, with a few to transfer", score: 2 },
          { label: "Some sit with a founder or a prior entity", score: 1 },
          { label: "Not sure where title sits", score: 0 },
        ],
      },
      {
        id: "q4",
        areaKey: "protection",
        label: "How well do patent filings cover the products that generate revenue?",
        options: [
          { label: "Filed and mapped to current products", score: 3 },
          { label: "Some filings, not mapped to products", score: 2 },
          { label: "Considered, but nothing filed", score: 1 },
          { label: "Not considered", score: 0 },
          { label: "Patents are not relevant to our business", score: 3 },
        ],
      },
      {
        id: "q5",
        areaKey: "protection",
        label: "How are trade secrets and confidential know-how protected?",
        options: [
          { label: "Documented program with access controls and NDAs", score: 3 },
          { label: "NDAs and some access controls", score: 2 },
          { label: "Informal practices only", score: 1 },
          { label: "No program", score: 0 },
        ],
      },
      {
        id: "q6",
        areaKey: "protection",
        label: "Are the company and product names registered as trademarks in your key markets?",
        options: [
          { label: "Yes, registered in our key markets", score: 3 },
          { label: "Applications pending", score: 2 },
          { label: "Some names registered, others not", score: 1 },
          { label: "No registrations", score: 0 },
        ],
      },
      {
        id: "q7",
        areaKey: "contracts",
        label: "Have key customer and supplier contracts been reviewed for change-of-control or anti-assignment terms?",
        options: [
          { label: "Yes, reviewed and the consents needed are known", score: 3 },
          { label: "Partially reviewed", score: 2 },
          { label: "Not reviewed", score: 1 },
          { label: "Not sure which contracts matter", score: 0 },
        ],
      },
      {
        id: "q8",
        areaKey: "contracts",
        label: "Can the software, technology and data licenses the business depends on transfer to a buyer?",
        options: [
          { label: "Yes, confirmed transferable", score: 3 },
          { label: "Most are, a few need consent", score: 2 },
          { label: "Not reviewed", score: 1 },
          { label: "Key licenses are personal to a founder or not transferable", score: 0 },
        ],
      },
      {
        id: "q9",
        areaKey: "contracts",
        label: "How organized are signed contracts?",
        options: [
          { label: "Central repository with signed copies", score: 3 },
          { label: "Mostly organized", score: 2 },
          { label: "Scattered across email and drives", score: 1 },
          { label: "Some signed copies are missing", score: 0 },
        ],
      },
      {
        id: "q10",
        areaKey: "tech_data",
        label: "Do you track open-source components and their license obligations?",
        options: [
          { label: "Yes, current inventory and policy", score: 3 },
          { label: "Partial inventory", score: 2 },
          { label: "Developers decide case by case", score: 1 },
          { label: "Not tracked", score: 0 },
          { label: "We do not ship software", score: 3 },
        ],
      },
      {
        id: "q11",
        areaKey: "tech_data",
        label: "Are your rights to use customer data documented in contracts and a current privacy policy?",
        options: [
          { label: "Yes, documented and current", score: 3 },
          { label: "Mostly documented", score: 2 },
          { label: "Gaps between practice and policy", score: 1 },
          { label: "Not documented", score: 0 },
          { label: "We do not handle customer data", score: 3 },
        ],
      },
      {
        id: "q12",
        areaKey: "tech_data",
        label: "Is AI use in the product and in development documented, including ownership of AI-assisted output?",
        options: [
          { label: "Yes, documented policy and records", score: 3 },
          { label: "Partially documented", score: 2 },
          { label: "Used, but not documented", score: 1 },
          { label: "Not sure how AI is used", score: 0 },
          { label: "We do not use AI tools", score: 3 },
        ],
      },
      {
        id: "q13",
        areaKey: "records",
        label: "Is the cap table reconciled to signed stock, option and SAFE or note documents?",
        options: [
          { label: "Yes, fully reconciled", score: 3 },
          { label: "Minor gaps", score: 2 },
          { label: "Significant gaps", score: 1 },
          { label: "Not reconciled", score: 0 },
        ],
      },
      {
        id: "q14",
        areaKey: "records",
        label: "Are any IP claims, demand letters or disputes documented, with their status known?",
        options: [
          { label: "None received", score: 3 },
          { label: "Received, resolved and documented", score: 3 },
          { label: "Received, still open but documented", score: 1 },
          { label: "Received, not documented or not sure", score: 0 },
        ],
      },
      {
        id: "q15",
        areaKey: "records",
        label: "How quickly could you produce your core IP and contract documents for a buyer?",
        options: [
          { label: "Within days: a data room is ready", score: 3 },
          { label: "Within a few weeks", score: 2 },
          { label: "It would take significant work", score: 1 },
          { label: "Not sure", score: 0 },
        ],
      },
    ],
    tiers: [
      {
        min: 36,
        max: 45,
        key: "diligence-ready",
        label: "Diligence-ready",
        tag: "sale-tier-diligence-ready",
        headline: "Buyers should find what they expect. The work now is keeping records current and presenting the IP story well.",
      },
      {
        min: 24,
        max: 35,
        key: "fixable-gaps",
        label: "Close, with fixable gaps",
        tag: "sale-tier-fixable-gaps",
        headline: "The foundation is there, but a buyer will find gaps worth closing before a process starts, while you still control the timeline.",
      },
      {
        min: 14,
        max: 23,
        key: "value-at-risk",
        label: "Value at risk",
        tag: "sale-tier-value-at-risk",
        headline: "Gaps like these tend to surface in diligence as escrows, holdbacks, special indemnities or delay. Most can be fixed in advance.",
      },
      {
        min: 0,
        max: 13,
        key: "not-yet-ready",
        label: "Not yet sale-ready",
        tag: "sale-tier-not-yet-ready",
        headline: "Ownership and records questions would likely stall a deal today. Start with who owns the IP, then build out from there.",
      },
    ],
  },
} satisfies Record<MagnetSlug, MagnetConfig>;

export function getMagnetConfig(slug: MagnetSlug) {
  return magnetConfigs[slug];
}

export function isMagnetSlug(value: unknown): value is MagnetSlug {
  return typeof value === "string" && value in magnetConfigs;
}

export function isAssessmentConfig(config: MagnetConfig): config is AssessmentMagnetConfig {
  return config.kind === "assessment";
}

export function scoreAssessment(
  slug: Exclude<MagnetSlug, "outside-counsel-playbook">,
  answers: Record<string, number>,
  mode?: MagnetMode,
): AssessmentResult {
  const config = magnetConfigs[slug];
  if (!isAssessmentConfig(config)) {
    throw new Error("Magnet is not an assessment.");
  }

  const subScores = Object.fromEntries(config.areas.map((area) => [area.key, 0]));

  for (const question of config.questions) {
    const score = answers[question.id];
    if (typeof score !== "number" || !question.options.some((option) => option.score === score)) {
      throw new Error(`Invalid answer for ${question.id}.`);
    }
    subScores[question.areaKey] = (subScores[question.areaKey] ?? 0) + score;
  }

  const score = Object.values(subScores).reduce((sum, value) => sum + value, 0);
  const tier = config.tiers.find((item) => score >= item.min && score <= item.max) ?? config.tiers.at(-1);
  if (!tier) {
    throw new Error("No scoring tier configured.");
  }

  const areas: MagnetArea[] = config.areas;
  const actions = areas
    .map((area, index) => ({
      index,
      score: subScores[area.key] ?? 0,
      action: mode === "investor" && area.investorAction ? area.investorAction : area.action,
    }))
    .sort((left, right) => left.score - right.score || left.index - right.index)
    .slice(0, 3)
    .map((area) => area.action);

  return {
    ok: true,
    magnet_slug: slug,
    score,
    score_max: config.scoreMax,
    tier,
    sub_scores: subScores,
    actions,
    mode: slug === "patent-moat-scorecard" ? mode ?? "founder" : undefined,
  };
}

export function getQuestionScoreMap(
  slug: Exclude<MagnetSlug, "outside-counsel-playbook">,
  answers: Record<string, number>,
) {
  const config = magnetConfigs[slug];
  if (!isAssessmentConfig(config)) return {};

  const questions: MagnetQuestion[] = config.questions;
  return Object.fromEntries(
    questions.map((question) => [question.fieldKey ?? question.id, answers[question.id]]),
  );
}

export function getMagnetHistoryEntry(result: AssessmentResult | DownloadResult) {
  if (result.magnet_slug === "outside-counsel-playbook") {
    return result.magnet_slug;
  }

  return `${result.magnet_slug}:${result.tier.label}`;
}
