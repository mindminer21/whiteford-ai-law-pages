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
  | "disclosure-self-audit"
  | "chain-of-title-audit"
  | "routing-matrix"
  | "ip-data-room-checklist";

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
  requirePhone?: boolean;
};

export type AssessmentMagnetConfig = BaseMagnetConfig & {
  kind: "assessment";
  scoreMax: number;
  modeToggle?: boolean;
  questions: MagnetQuestion[];
  areas: MagnetArea[];
  tiers: TierRule[];
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
  "disclosure-self-audit": {
    slug: "disclosure-self-audit",
    kind: "assessment",
    title: "The Disclosure Self-Audit",
    formTitle: "Run the Disclosure Self-Audit",
    formDescription:
      "Answer nine categorical questions about what you have shown, sold, and filed. Every launch, demo, and sale starts a patent clock - this audit shows which clocks are running.",
    buttonLabel: "Audit my disclosures",
    statusLegend: "Where is your company right now?",
    statusOptions: [
      "Idea / prototype",
      "MVP in market",
      "Fundraising or diligence",
      "Enterprise/customer rollout",
    ],
    requirePhone: true,
    scoreMax: 22,
    areas: [
      {
        key: "public_disclosure",
        label: "Public disclosure",
        maxScore: 8,
        action: "Institute the one-question launch rule before anything else ships.",
      },
      {
        key: "on_sale",
        label: "Sales and offers",
        maxScore: 3,
        action: "Pull every pilot, LOI, and pre-order - confidential sales count (Helsinn v. Teva). Review with counsel.",
      },
      {
        key: "filing",
        label: "Filing posture",
        maxScore: 6,
        action: "File a provisional before your next trigger event - the 12-month U.S. window is statutory, and foreign rights die at disclosure.",
      },
      {
        key: "process",
        label: "Disclosure discipline",
        maxScore: 5,
        action: "Close the NDA gap and add the disclosure check to your launch checklist.",
      },
    ],
    questions: [
      {
        id: "q1",
        areaKey: "public_disclosure",
        label: "Have you publicly described HOW your invention works (blog, video, talk, paper, listing)?",
        options: [
          { label: "No", score: 3 },
          { label: "Not sure", score: 1 },
          { label: "Yes", score: 0 },
        ],
      },
      {
        id: "q2",
        areaKey: "public_disclosure",
        label: "Have you demonstrated it publicly (demo day, trade show, pitch event)?",
        options: [
          { label: "No", score: 3 },
          { label: "Not sure", score: 1 },
          { label: "Yes", score: 0 },
        ],
      },
      {
        id: "q3",
        areaKey: "public_disclosure",
        label: "Has it appeared on a crowdfunding page?",
        options: [
          { label: "No", score: 2 },
          { label: "Yes", score: 0 },
        ],
      },
      {
        id: "q4",
        areaKey: "on_sale",
        label: "Have you sold it, offered it for sale, or signed a pilot/pre-order - including confidentially?",
        options: [
          { label: "No", score: 3 },
          { label: "Not sure", score: 1 },
          { label: "Yes", score: 0 },
        ],
      },
      {
        id: "q5",
        areaKey: "filing",
        label: "When was your earliest public disclosure or sale?",
        options: [
          { label: "Nothing disclosed or sold yet", score: 3 },
          { label: "Less than 6 months ago", score: 2 },
          { label: "6-12 months ago", score: 1 },
          { label: "More than 12 months ago", score: 0 },
          { label: "Not sure", score: 0 },
        ],
      },
      {
        id: "q6",
        areaKey: "filing",
        label: "Did you file a patent application BEFORE your earliest disclosure or sale?",
        options: [
          { label: "Filed before any disclosure", score: 3 },
          { label: "Filed, but after disclosing", score: 1 },
          { label: "Nothing filed", score: 0 },
          { label: "Not sure", score: 0 },
        ],
      },
      {
        id: "q7",
        areaKey: "process",
        label: "Is a launch, demo day, pilot, or conference coming in the next 90 days?",
        options: [
          { label: "No", score: 1 },
          { label: "Yes - and we plan to file first", score: 2 },
          { label: "Yes - no filing planned", score: 0 },
        ],
      },
      {
        id: "q8",
        areaKey: "process",
        label: "Do partners/contractors who have seen the mechanism have signed NDAs?",
        options: [
          { label: "Yes", score: 2 },
          { label: "No one outside has seen it", score: 2 },
          { label: "Some", score: 1 },
          { label: "No", score: 0 },
        ],
      },
      {
        id: "q9",
        areaKey: "process",
        label: "Does your launch checklist ask: does this reveal how it works, or only what it does?",
        options: [
          { label: "Yes", score: 1 },
          { label: "No", score: 0 },
        ],
      },
    ],
    tiers: [
      {
        min: 17,
        max: 22,
        key: "clocks-stopped",
        label: "Clocks stopped",
        tag: "disclosure-green",
        headline: "Your disclosure posture is protecting your rights - keep filing before every trigger event.",
      },
      {
        min: 9,
        max: 16,
        key: "clock-running",
        label: "A clock is running",
        tag: "disclosure-orange",
        headline: "Rights are still salvageable, but at least one clock is running - act this quarter.",
      },
      {
        min: 0,
        max: 8,
        key: "window-at-risk",
        label: "Window at risk",
        tag: "disclosure-red",
        headline: "Disclosed-material rights may already be barred - get a counsel review of what remains protectable this month.",
      },
    ],
  },
  "chain-of-title-audit": {
    slug: "chain-of-title-audit",
    kind: "assessment",
    title: "The Chain-of-Title Audit",
    formTitle: "Run the Chain-of-Title Audit",
    formDescription:
      "Answer ten categorical questions. Inventions start out owned by the human inventor - the company owns only what was assigned. This audit checks every link.",
    buttonLabel: "Audit my chain of title",
    statusLegend: "Where is your company right now?",
    statusOptions: [
      "Idea / prototype",
      "MVP in market",
      "Fundraising or diligence",
      "Enterprise/customer rollout",
    ],
    requirePhone: true,
    scoreMax: 24,
    areas: [
      {
        key: "founders",
        label: "Founder assignments",
        maxScore: 8,
        action: "Fix templates to present-tense 'hereby assigns' and sweep pre-incorporation work in (Stanford v. Roche turned on those two words).",
      },
      {
        key: "contributors",
        label: "Contributors and contractors",
        maxScore: 6,
        action: "Get confirmatory assignments from departed contributors and paper every contractor - there is no work-for-hire for patents.",
      },
      {
        key: "institutions",
        label: "Employers and institutions",
        maxScore: 4,
        action: "Pull the actual prior employment agreements and answer the tech-transfer question - before diligence does.",
      },
      {
        key: "records",
        label: "Records and inventorship",
        maxScore: 6,
        action: "Record assignments with the USPTO and correct the owning entity.",
      },
    ],
    questions: [
      {
        id: "q1",
        areaKey: "founders",
        label: "Has every founder signed a written IP assignment to the company?",
        options: [
          { label: "Yes", score: 3 },
          { label: "Not sure", score: 1 },
          { label: "No", score: 0 },
        ],
      },
      {
        id: "q2",
        areaKey: "founders",
        label: "Does your assignment language say 'hereby assigns' (present tense), not just 'agrees to assign'?",
        options: [
          { label: "Yes", score: 3 },
          { label: "Not sure", score: 1 },
          { label: "No", score: 0 },
        ],
      },
      {
        id: "q3",
        areaKey: "founders",
        label: "Were pre-incorporation inventions explicitly assigned INTO the company?",
        options: [
          { label: "Yes", score: 2 },
          { label: "Not sure", score: 1 },
          { label: "No", score: 0 },
        ],
      },
      {
        id: "q4",
        areaKey: "contributors",
        label: "Did every departed contributor sign an assignment before or at departure?",
        options: [
          { label: "Yes", score: 3 },
          { label: "No one has left", score: 3 },
          { label: "Not sure", score: 1 },
          { label: "No", score: 0 },
        ],
      },
      {
        id: "q5",
        areaKey: "contributors",
        label: "Did every contractor and dev shop sign an IP assignment BEFORE work began?",
        options: [
          { label: "Yes", score: 3 },
          { label: "No contractors used", score: 3 },
          { label: "Some", score: 1 },
          { label: "No", score: 0 },
        ],
      },
      {
        id: "q6",
        areaKey: "institutions",
        label: "Has each founder mapped their prior employers' invention-assignment agreements against this company's tech?",
        options: [
          { label: "Yes", score: 2 },
          { label: "Not sure", score: 1 },
          { label: "No", score: 0 },
        ],
      },
      {
        id: "q7",
        areaKey: "institutions",
        label: "Did any founder invent anything while at a university, hospital, or lab?",
        options: [
          { label: "No", score: 2 },
          { label: "Yes - resolved with the institution", score: 2 },
          { label: "Not sure", score: 1 },
          { label: "Yes - unresolved", score: 0 },
        ],
      },
      {
        id: "q8",
        areaKey: "records",
        label: "Are assignments for filed applications recorded with the USPTO?",
        options: [
          { label: "Yes", score: 2 },
          { label: "Nothing filed yet", score: 2 },
          { label: "Not sure", score: 1 },
          { label: "No", score: 0 },
        ],
      },
      {
        id: "q9",
        areaKey: "records",
        label: "Is the owning entity the correct current company (not a dead LLC or a founder personally)?",
        options: [
          { label: "Yes", score: 2 },
          { label: "Not sure", score: 1 },
          { label: "No", score: 0 },
        ],
      },
      {
        id: "q10",
        areaKey: "records",
        label: "Are named inventors accurate - everyone who contributed to conception, no one who didn't?",
        options: [
          { label: "Yes", score: 2 },
          { label: "Nothing filed yet", score: 2 },
          { label: "Not sure", score: 1 },
          { label: "No", score: 0 },
        ],
      },
    ],
    tiers: [
      {
        min: 18,
        max: 24,
        key: "chain-intact",
        label: "Chain intact",
        tag: "title-green",
        headline: "Every link holds - re-run this audit at every hire, departure, and contractor engagement.",
      },
      {
        min: 10,
        max: 17,
        key: "links-need-reinforcement",
        label: "Links need reinforcement",
        tag: "title-orange",
        headline: "Fixable cheaply today; the same items found in diligence become escrows and haircuts.",
      },
      {
        min: 0,
        max: 9,
        key: "broken-links",
        label: "Broken links",
        tag: "title-red",
        headline: "Multiple gaps - any unassigned co-inventor can license your patent to a competitor. Start fixes now.",
      },
    ],
  },
  "routing-matrix": {
    slug: "routing-matrix",
    kind: "assessment",
    title: "The Routing Matrix",
    formTitle: "Run the Routing Matrix",
    formDescription:
      "Answer six categorical questions. Patent, trade secret, publish, or nothing - two questions route every piece of what you have built.",
    buttonLabel: "Route my stack",
    statusLegend: "Where is your company right now?",
    statusOptions: [
      "Idea / prototype",
      "MVP in market",
      "Fundraising or diligence",
      "Enterprise/customer rollout",
    ],
    requirePhone: true,
    scoreMax: 10,
    areas: [
      {
        key: "core",
        label: "Your core piece",
        maxScore: 5,
        action: "Detectable + durable routes to PATENT - file before the next trigger event. Invisible + durable routes to TRADE SECRET - but reverse-engineerable secrets are temporary; lean patent.",
      },
      {
        key: "secrecy",
        label: "Trade-secret practice",
        maxScore: 2,
        action: "A trade secret without secrecy practices is fiction - stand up access controls, NDAs, and marking this month.",
      },
      {
        key: "discipline",
        label: "Routing discipline",
        maxScore: 3,
        action: "Write the one-sentence routing decision per piece; spoken aloud it becomes your ninety-second IP-position answer.",
      },
    ],
    questions: [
      {
        id: "q1",
        areaKey: "core",
        label: "Your core invented piece: could you DETECT copying from outside a competitor's product?",
        options: [
          { label: "Yes", score: 2 },
          { label: "Not sure", score: 1 },
          { label: "No", score: 0 },
        ],
      },
      {
        id: "q2",
        areaKey: "core",
        label: "Will that core piece still matter in 5+ years?",
        options: [
          { label: "Yes", score: 2 },
          { label: "Not sure", score: 1 },
          { label: "No", score: 0 },
        ],
      },
      {
        id: "q3",
        areaKey: "core",
        label: "Does it ship inside your product where engineers could extract it?",
        options: [
          { label: "No", score: 1 },
          { label: "Not sure", score: 0 },
          { label: "Yes", score: 0 },
        ],
      },
      {
        id: "q4",
        areaKey: "secrecy",
        label: "For pieces you keep secret: are real secrecy practices in place (access controls, NDAs, marked documents)?",
        options: [
          { label: "Yes", score: 2 },
          { label: "Partially", score: 1 },
          { label: "No", score: 0 },
          { label: "Nothing routed to secret", score: 2 },
        ],
      },
      {
        id: "q5",
        areaKey: "discipline",
        label: "Do short-lived features get consciously shipped without patent spend (or defensively published)?",
        options: [
          { label: "Yes", score: 1 },
          { label: "No", score: 0 },
        ],
      },
      {
        id: "q6",
        areaKey: "discipline",
        label: "Do you have a written routing decision (patent/secret/publish/nothing) for each major piece?",
        options: [
          { label: "Yes, for every piece", score: 2 },
          { label: "For some pieces", score: 1 },
          { label: "No", score: 0 },
        ],
      },
    ],
    tiers: [
      {
        min: 8,
        max: 10,
        key: "routed",
        label: "Routed",
        tag: "routing-green",
        headline: "Your stack is consciously routed - rehearse the ninety-second answer for your next pitch.",
      },
      {
        min: 4,
        max: 7,
        key: "partially-routed",
        label: "Partially routed",
        tag: "routing-orange",
        headline: "The core piece needs a decision - fence the valuable twenty feet before the next launch.",
      },
      {
        min: 0,
        max: 3,
        key: "unrouted",
        label: "Unrouted",
        tag: "routing-red",
        headline: "Protection is currently accidental - run the decomposition this week.",
      },
    ],
  },
  "ip-data-room-checklist": {
    slug: "ip-data-room-checklist",
    kind: "assessment",
    title: "The IP Data Room Checklist",
    formTitle: "Run the IP Data Room Checklist",
    formDescription:
      "Answer ten categorical questions. The diligence checklist is not a secret - this tool scores how ready you are to pass the exam in advance.",
    buttonLabel: "Score my data room",
    statusLegend: "Where is your company right now?",
    statusOptions: [
      "Idea / prototype",
      "MVP in market",
      "Fundraising or diligence",
      "Enterprise/customer rollout",
    ],
    requirePhone: true,
    scoreMax: 20,
    areas: [
      {
        key: "title",
        label: "Chain of title",
        maxScore: 4,
        action: "Confirmatory assignments and USPTO recording - cheapest fix on the list.",
      },
      {
        key: "scope",
        label: "Status and scope",
        maxScore: 4,
        action: "Build the IP schedule and claim-to-product map - it converts your IP section from inventory to argument.",
      },
      {
        key: "fto",
        label: "Freedom to operate",
        maxScore: 4,
        action: "Commission the landscape memo; never improvise FTO answers.",
      },
      {
        key: "hygiene",
        label: "Code and secrecy hygiene",
        maxScore: 4,
        action: "Run the license scanner before anyone else can; make secrecy practices real.",
      },
      {
        key: "encumbrances",
        label: "Encumbrances and skeletons",
        maxScore: 4,
        action: "Inventory every granted license and reconstruct the disclosure timeline - they will rebuild it from YouTube either way.",
      },
    ],
    questions: [
      {
        id: "q1",
        areaKey: "title",
        label: "Signed present-tense assignments exist for every contributor, including departed ones.",
        options: [
          { label: "Done", score: 2 },
          { label: "Partial", score: 1 },
          { label: "Not yet", score: 0 },
        ],
      },
      {
        id: "q2",
        areaKey: "title",
        label: "USPTO assignment records are current and name the correct entity.",
        options: [
          { label: "Done", score: 2 },
          { label: "Partial", score: 1 },
          { label: "Not yet", score: 0 },
          { label: "N/A - nothing filed", score: 2 },
        ],
      },
      {
        id: "q3",
        areaKey: "scope",
        label: "An IP schedule lists every asset with status and geography.",
        options: [
          { label: "Done", score: 2 },
          { label: "Partial", score: 1 },
          { label: "Not yet", score: 0 },
        ],
      },
      {
        id: "q4",
        areaKey: "scope",
        label: "A one-line claim-to-product map exists for every filing.",
        options: [
          { label: "Done", score: 2 },
          { label: "Partial", score: 1 },
          { label: "Not yet", score: 0 },
          { label: "N/A - nothing filed", score: 2 },
        ],
      },
      {
        id: "q5",
        areaKey: "fto",
        label: "A landscape memo exists - who patents in your space, which families are scary.",
        options: [
          { label: "Done", score: 2 },
          { label: "Partial", score: 1 },
          { label: "Not yet", score: 0 },
        ],
      },
      {
        id: "q6",
        areaKey: "fto",
        label: "Every threat letter ever received has a documented, counsel-reviewed story.",
        options: [
          { label: "Done", score: 2 },
          { label: "Partial", score: 1 },
          { label: "Not yet", score: 0 },
          { label: "N/A - never received one", score: 2 },
        ],
      },
      {
        id: "q7",
        areaKey: "hygiene",
        label: "A dependency inventory with licenses exists - you ran the scanner first.",
        options: [
          { label: "Done", score: 2 },
          { label: "Partial", score: 1 },
          { label: "Not yet", score: 0 },
        ],
      },
      {
        id: "q8",
        areaKey: "hygiene",
        label: "Everything routed trade-secret has real secrecy practices.",
        options: [
          { label: "Done", score: 2 },
          { label: "Partial", score: 1 },
          { label: "Not yet", score: 0 },
        ],
      },
      {
        id: "q9",
        areaKey: "encumbrances",
        label: "Every license ever granted is inventoried with scope and exclusivity terms.",
        options: [
          { label: "Done", score: 2 },
          { label: "Partial", score: 1 },
          { label: "Not yet", score: 0 },
          { label: "N/A - none granted", score: 2 },
        ],
      },
      {
        id: "q10",
        areaKey: "encumbrances",
        label: "Your public disclosure timeline is reconstructed and documented.",
        options: [
          { label: "Done", score: 2 },
          { label: "Partial", score: 1 },
          { label: "Not yet", score: 0 },
        ],
      },
    ],
    tiers: [
      {
        min: 15,
        max: 20,
        key: "ready",
        label: "48 hours from ready",
        tag: "dataroom-green",
        headline: "Offer the data room index before anyone asks - it deletes the slowest workstream from your close.",
      },
      {
        min: 8,
        max: 14,
        key: "known-gaps",
        label: "Solid spine, known gaps",
        tag: "dataroom-orange",
        headline: "Each gap is hours of work now versus weeks of deal momentum later.",
      },
      {
        min: 0,
        max: 7,
        key: "surprises",
        label: "The X-ray would find surprises",
        tag: "dataroom-red",
        headline: "What reprices deals is the discovery that the founder didn't know - work the list top-down.",
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
