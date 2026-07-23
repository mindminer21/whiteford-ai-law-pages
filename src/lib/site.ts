import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Binary,
  BriefcaseBusiness,
  Building2,
  ClipboardCheck,
  FileCheck2,
  Gauge,
  Landmark,
  Lightbulb,
  Scale,
  ShieldCheck,
  Workflow,
} from "lucide-react";

export type Offer = {
  slug: string;
  eyebrow: string;
  title: string;
  shortTitle: string;
  metaTitle: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  leadMagnet: string;
  buyer: string;
  promise: string;
  proof: string[];
  screens: string[];
  deliverables: string[];
  servicePath: string[];
  icon: LucideIcon;
};

export const navLinks = [
  { label: "AI Compliance", href: "/colorado-ai-compliance-lawyer" },
  { label: "AI Patent", href: "/ai-patent-strategy-scorecard" },
  { label: "YouTube", href: "/ai-law-youtube" },
  { label: "Gameplan Builder", href: "/ai-compliance-gameplan" },
  { label: "Tech GC", href: "/colorado-tech-general-counsel" },
];

export const aiSources = [
  {
    label: "Colorado SB24-205",
    href: "https://leg.colorado.gov/bills/sb24-205",
  },
  {
    label: "Colorado SB25B-004",
    href: "https://leg.colorado.gov/bills/sb25b-004",
  },
  {
    label: "Colorado SB26-189",
    href: "https://leg.colorado.gov/bills/sb26-189",
  },
];

export const offers: Offer[] = [
  {
    slug: "ai-patent-strategy-scorecard",
    eyebrow: "AI patent law and strategy",
    title: "AI patent strategy for founders building with generative tools",
    shortTitle: "AI Patent Strategy",
    metaTitle: "AI Patent Strategy Scorecard",
    description:
      "A practical scorecard for founders documenting human contribution, invention records, ownership, and patent strategy when AI tools touch R&D.",
    primaryCta: "Run the AI Patent Scorecard",
    secondaryCta: "Book an AI patent strategy call",
    leadMagnet: "AI Patent Strategy Scorecard",
    buyer:
      "Technical founders, inventors, product leaders, and executives building patentable AI-enabled products.",
    promise:
      "Understand where AI-assisted R&D creates inventorship, eligibility, ownership, and documentation questions before a patent filing or investor diligence process.",
    proof: [
      "Built for AI-assisted invention workflows.",
      "Anchored in patent strategy and founder documentation habits.",
      "Connects patents, trade secrets, assignments, contracts, and product roadmap.",
    ],
    screens: [
      "Human contribution and conception records",
      "Prompt, prototype, and experiment documentation",
      "Model/data ownership and vendor terms",
      "Patent eligibility and technical improvement",
      "Trade secret versus patent decision points",
      "Assignment and contractor hygiene",
    ],
    deliverables: [
      "AI invention documentation score",
      "Patentability issue map",
      "Ownership and assignment checklist",
      "Trade secret versus patent decision guide",
      "Recommended AI Patent Strategy Sprint",
    ],
    servicePath: [
      "AI Patent Strategy Sprint",
      "AI/Software Patentability Review",
      "Inventorship Documentation Review",
      "AI IP Ownership and Assignment Cleanup",
    ],
    icon: Lightbulb,
  },
  {
    slug: "colorado-ai-compliance-lawyer",
    eyebrow: "AI governance and compliance",
    title: "Colorado AI compliance counsel for companies building with AI",
    shortTitle: "AI Compliance",
    metaTitle: "Colorado AI Compliance Lawyer",
    description:
      "A practical readiness path for Colorado and Mountain West companies using, buying, or embedding AI in consequential workflows.",
    primaryCta: "Start the AI Gameplan Builder",
    secondaryCta: "Book an AI strategy call",
    leadMagnet: "AI Compliance Gameplan Builder",
    buyer:
      "Founders, CEOs, CFOs, COOs, GCs, HR leaders, product leaders, and risk teams.",
    promise:
      "Know where AI creates governance, documentation, vendor, notice, human-review, and discrimination-risk workstreams before those issues become a board-level surprise.",
    proof: [
      "Designed for Colorado and Mountain West companies.",
      "Built around use-case inventory, readiness scoring, and productized legal execution.",
      "Useful even while the Colorado AI framework continues to move.",
    ],
    screens: [
      "Consequential decision exposure",
      "Developer vs. deployer posture",
      "Vendor and contract risk",
      "Data sensitivity and privacy",
      "Human review and escalation",
      "Records, notices, and governance maturity",
    ],
    deliverables: [
      "AI use-case inventory",
      "Readiness heat map",
      "10-day fixes",
      "30/60/90-day implementation roadmap",
      "Recommended Whiteford service package",
    ],
    servicePath: [
      "AI Compliance Readiness Sprint",
      "Colorado ADMT / AI Act Readiness Pack",
      "AI Vendor + Contract Risk Review",
      "AI Governance Operating System",
      "AI Product Launch Legal Review",
    ],
    icon: ShieldCheck,
  },
  {
    slug: "colorado-tech-general-counsel",
    eyebrow: "Technology outside general counsel",
    title: "Outside general counsel for Colorado technology companies",
    shortTitle: "Tech GC",
    metaTitle: "Colorado Tech Outside General Counsel",
    description:
      "A legal operating system for companies moving from IP protection into contracts, hiring, fundraising, AI governance, and growth-stage execution.",
    primaryCta: "Get the legal health checklist",
    secondaryCta: "Book a legal operating review",
    leadMagnet: "Colorado Tech Company Legal Health Checklist",
    buyer:
      "Founder-led and venture-backed technology companies without mature in-house legal.",
    promise:
      "Turn scattered legal needs into a prioritized operating plan backed by Jeff's patent practice context and Whiteford's broader bench.",
    proof: [
      "Built for patent clients expanding into broader company-building legal needs.",
      "Routes matters to corporate, employment, M&A, litigation, and regulatory resources.",
      "Supports fixed-fee or monthly OGC packaging.",
    ],
    screens: [
      "Contract stack maturity",
      "Employment and contractor exposure",
      "IP ownership hygiene",
      "AI use register and data-flow visibility",
      "Fundraising readiness",
      "M&A and partnership risk",
    ],
    deliverables: [
      "AI Use Register Snapshot",
      "Legal operating review",
      "Contract and vendor triage",
      "IP/commercialization issue map",
      "Whiteford attorney bench map",
      "Monthly OGC option menu",
    ],
    servicePath: [
      "Tech Company OGC Launchpad",
      "AI Use Register + Vendor Terms Sprint",
      "Contract Stack Review",
      "Employment/Contractor Risk Triage",
      "Founder Legal Operating System",
    ],
    icon: BriefcaseBusiness,
  },
  {
    slug: "colorado-startup-ma-lawyer",
    eyebrow: "Founder M&A and diligence readiness",
    title: "Get deal-ready before a buyer starts diligence",
    shortTitle: "M&A Readiness",
    metaTitle: "Colorado Startup M&A Lawyer",
    description:
      "A founder-facing readiness page for companies considering acquisition, strategic partnership, recapitalization, or venture/PE diligence.",
    primaryCta: "Run the M&A readiness check",
    secondaryCta: "Book a founder transaction review",
    leadMagnet: "Founder M&A Readiness Checklist",
    buyer:
      "Founders, CEOs, CFOs, and owners preparing for a sale, financing, partnership, or strategic transaction.",
    promise:
      "Find the legal and business issues that reduce valuation, slow diligence, or create closing friction before the other side finds them.",
    proof: [
      "Connects IP ownership, corporate hygiene, contracts, employee matters, and AI/data diligence.",
      "Positions Whiteford's corporate/M&A bench without losing Jeff's founder trust bridge.",
      "Turns diligence cleanup into a structured pre-deal workplan.",
    ],
    screens: [
      "IP assignment and ownership",
      "Cap table and corporate records",
      "Customer and vendor contracts",
      "Employment and incentive-plan issues",
      "AI/data/privacy diligence",
      "Litigation and dispute posture",
    ],
    deliverables: [
      "Diligence readiness score",
      "Founder cleanup checklist",
      "Buyer-facing issue map",
      "Whiteford corporate/M&A introduction path",
      "Pre-deal action plan",
    ],
    servicePath: [
      "Founder M&A Readiness Review",
      "Corporate Hygiene Sprint",
      "IP + Data Diligence Cleanup",
      "Transaction Counsel Introduction",
    ],
    icon: Building2,
  },
];

export const authorityPillars = [
  {
    title: "AI Governance",
    text: "Risk classification, vendor controls, documentation, notices, and human-review pathways for companies deploying AI.",
    icon: Binary,
  },
  {
    title: "Tech OGC",
    text: "A practical legal operating system for companies growing beyond pure patent strategy.",
    icon: Workflow,
  },
  {
    title: "M&A Readiness",
    text: "Diligence preparation across IP, contracts, corporate records, employment, AI, and data risk.",
    icon: Landmark,
  },
  {
    title: "Founder/IP",
    text: "Founder agreements, assignment hygiene, investor readiness, and portfolio strategy that can survive diligence.",
    icon: FileCheck2,
  },
];

export const gameplanDimensions = [
  { key: "governance", label: "Governance", icon: Scale },
  { key: "contracts", label: "Vendor contracts", icon: ClipboardCheck },
  { key: "data", label: "Data and privacy", icon: ShieldCheck },
  { key: "review", label: "Human review", icon: Gauge },
];

export const arrowIcon = ArrowRight;
