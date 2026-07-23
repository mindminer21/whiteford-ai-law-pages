import type { SignalStage } from "@/lib/investor-outreach/signal-public-lists";

export const portfolioEnrichmentVersion = "investor-portfolio-company-ceo-enrichment-v1";

export type PortfolioCompanyMatch = {
  investorName: string;
  investorFirm?: string;
  portfolioCompany: string;
  relevanceToUserCompany?: string;
  relevanceTags: string[];
  ceoName: string;
  ceoTitle?: string;
  ceoEmail?: string;
  ceoLinkedIn?: string;
  ceoContactUrl?: string;
  sourceUrl?: string;
  verificationStatus: "verified_public" | "research_needed";
};

export type PortfolioResearchQueueItem = {
  investorSegment: string;
  targetCompany: string;
  targetRound: SignalStage;
  category: string;
  region: string;
  signalListUrl?: string;
  researchBrief: string;
  requiredFields: string[];
};

type SignalSelection = {
  label: string;
  href: string;
  stage: SignalStage;
};

type BuildPortfolioResearchQueueArgs = {
  companyName: string;
  targetRound: SignalStage;
  regions: string[];
  signalLinks: SignalSelection[];
};

function compactText(value: string, fallback: string, maxLength = 140) {
  const cleaned = value.trim().replace(/\s+/g, " ");
  if (!cleaned) return fallback;
  return cleaned.length <= maxLength ? cleaned : `${cleaned.slice(0, maxLength - 3)}...`;
}

export function buildPortfolioResearchQueue({
  companyName,
  targetRound,
  regions,
  signalLinks,
}: BuildPortfolioResearchQueueArgs): PortfolioResearchQueueItem[] {
  const targetCompany = compactText(companyName, "the user's company");
  const region = regions.length ? regions.slice(0, 3).join(", ") : "selected relationship markets";

  return signalLinks.slice(0, 6).map((link) => ({
    investorSegment: `${link.label} - ${link.stage}`,
    targetCompany,
    targetRound,
    category: link.label,
    region,
    signalListUrl: link.href,
    researchBrief: `For each shortlisted investor in this segment, identify 1-3 portfolio companies relevant to ${targetCompany}, then verify the CEO/founder name and public business contact source before outreach.`,
    requiredFields: [
      "Investor name",
      "Portfolio company",
      "Why relevant",
      "CEO/founder name",
      "CEO public business contact",
      "Source URL",
    ],
  }));
}

export function summarizePortfolioMatches(matches: PortfolioCompanyMatch[]) {
  if (!matches.length) return "No verified portfolio-company CEO matches have been attached yet.";
  return `${matches.length} verified portfolio-company CEO match${matches.length === 1 ? "" : "es"} attached.`;
}
