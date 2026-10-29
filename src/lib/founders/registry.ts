import { eightyThreeBElection } from "./tools/83b-election";
import { advisorEquityCalculator } from "./tools/advisor-equity-calculator";
import { coloradoNoncompeteChecker } from "./tools/colorado-noncompete-checker";
import { diligenceListBuilder } from "./tools/diligence-list-builder";
import { entityChooser } from "./tools/entity-chooser";
import { exemptOfferingChecklist } from "./tools/exempt-offering-checklist";
import { founderEquityPlanner } from "./tools/founder-equity-planner";
import { ipOwnershipAudit } from "./tools/ip-ownership-audit";
import { optionPoolSizer } from "./tools/option-pool-sizer";
import { safeCalculator } from "./tools/safe-calculator";
import { termSheetDecoder } from "./tools/term-sheet-decoder";
import type { StageKey, ToolSpec } from "./types";

export const stages: { key: StageKey; number: string; title: string; blurb: string }[] = [
  { key: "start", number: "01", title: "Start", blurb: "Pick the right entity, issue founder stock cleanly and file the 83(b) on time." },
  { key: "protect", number: "02", title: "Create & protect", blurb: "Make sure the company, not the founders or contractors, owns what it builds." },
  { key: "team", number: "03", title: "Build your team", blurb: "Size the option pool, explain equity in offers and stay inside Colorado's non-compete law." },
  { key: "raise", number: "04", title: "Raise funds", blurb: "Model SAFEs, decode term sheets and file what securities law requires." },
  { key: "board", number: "05", title: "Board & advisors", blurb: "Compensate advisors sensibly and run the board like investors expect." },
  { key: "sell", number: "06", title: "Sell", blurb: "Get diligence-ready long before a buyer's request list arrives." },
];

/** Ordered by stage, then by how often founders need them. */
export const tools: ToolSpec[] = [
  entityChooser,
  founderEquityPlanner,
  eightyThreeBElection,
  ipOwnershipAudit,
  optionPoolSizer,
  coloradoNoncompeteChecker,
  safeCalculator,
  termSheetDecoder,
  exemptOfferingChecklist,
  advisorEquityCalculator,
  diligenceListBuilder,
];

export const toolsBySlug: Record<string, ToolSpec> = Object.fromEntries(tools.map((tool) => [tool.slug, tool]));

export function getTool(slug: unknown): ToolSpec | undefined {
  return typeof slug === "string" ? toolsBySlug[slug] : undefined;
}

/** The verification token for the Founder Library is shared across all of its tools. */
export const FOUNDERS_VERIFY_SCOPE = "founders";

export const BOOKING_URL = "https://schellip.com/book-a-consultation";

/** Tools that live outside the founder library but belong on its stage map. */
export const externalTools: { stage: StageKey; href: string; title: string; description: string; meta: string }[] = [
  {
    stage: "sell",
    href: "/sale-readiness-audit",
    title: "Sale & Investor Readiness Audit",
    description: "Score the five areas buyers and investors diligence first, with a 60-day cleanup plan.",
    meta: "15 questions · emailed report",
  },
  {
    stage: "protect",
    href: "/patent-moat-scorecard",
    title: "Patent Moat Scorecard",
    description: "Benchmark patent and IP readiness the way a venture investor or acquirer would.",
    meta: "15 questions · 5 dimensions",
  },
  {
    stage: "protect",
    href: "/ai-risk-triage",
    title: "AI Legal Risk Triage",
    description: "Map AI exposure across data rights, output ownership, contracts and governance.",
    meta: "12 questions",
  },
];
