import type { PortalIssueTag, PortalIssueTagSlug } from "./types";

export const portalIssueTags: PortalIssueTag[] = [
  { slug: "#ai-governance", label: "AI governance", category: "ai", description: "AI use-case inventory, model governance, human review, AI policy, and product claims.", routingHints: ["jeff-schell", "slaven-jesic"] },
  { slug: "#ai-contracts", label: "AI contracts", category: "ai", description: "AI vendor/customer terms, data use, output ownership, indemnity, audit, and warranties.", routingHints: ["jeff-schell", "slaven-jesic", "frank-jones", "clare-lewis"] },
  { slug: "#ip-patents", label: "IP / patents", category: "ip", description: "Patents, invention capture, AI-assisted invention, patent vs. trade secret decisions.", routingHints: ["jeff-schell"] },
  { slug: "#trade-secrets", label: "Trade secrets", category: "ip", description: "Know-how, data/process protection, employee and contractor leakage risk.", routingHints: ["jeff-schell", "david-stevens"] },
  { slug: "#open-source-software", label: "Open-source software", category: "ip", description: "OSS licensing, code provenance, and AI-assisted coding risk.", routingHints: ["jeff-schell", "frank-jones"] },
  { slug: "#commercial-contracts", label: "Commercial contracts", category: "contracts", description: "MSAs, SaaS agreements, SOWs, order forms, and procurement terms.", routingHints: ["jeff-schell", "eric-vendt", "frank-jones", "clare-lewis"] },
  { slug: "#privacy-security", label: "Privacy / security", category: "privacy-security", description: "Privacy, DPA/BAA/SCC, data retention, incident preparedness, and security reviews.", routingHints: ["bruce-martino", "frank-jones", "clare-lewis", "joseph-mezzanotte"] },
  { slug: "#employment-contractors", label: "Employment / contractors", category: "employment", description: "Hiring, contractor classification, invention assignment, restrictive covenants, and terminations.", routingHints: ["david-stevens"] },
  { slug: "#corporate-governance", label: "Corporate governance", category: "corporate", description: "Board/manager consents, cap table, corporate records, subsidiaries, and entity issues.", routingHints: ["eric-vendt", "john-selbach", "kellie-newton", "edward-lee"] },
  { slug: "#financing-investor-readiness", label: "Financing readiness", category: "corporate", description: "SAFE/note/equity financing, investor diligence, and securities issue spotting.", routingHints: ["eric-vendt", "clare-lewis", "enayat-qasimi"] },
  { slug: "#ma-exit-readiness", label: "M&A / exit readiness", category: "corporate", description: "Diligence room, change-of-control, transaction readiness, and strategic partnerships.", routingHints: ["eric-vendt", "john-selbach", "edward-lee"] },
  { slug: "#litigation-disputes", label: "Litigation / disputes", category: "disputes", description: "Demand letters, subpoenas, litigation holds, breach/termination risk.", routingHints: ["albert-mezzanotte", "eric-rowe", "brent-strickland"] },
  { slug: "#gov-contracts-defense", label: "Gov contracts / defense", category: "regulated", description: "Flow-downs, CMMC/security contracting, federal funding, export/sanctions triage.", routingHints: ["james-kahl", "adam-cizek", "enayat-qasimi"] },
  { slug: "#real-estate-facilities", label: "Real estate / facilities", category: "facilities", description: "Office, lab, warehouse leases, facility vendors, and expansion diligence.", routingHints: ["alexandra-neifert", "joseph-mezzanotte"] },
  { slug: "#tax-structure", label: "Tax / structure", category: "tax", description: "Tax-sensitive transactions, cross-border, restructuring, and succession.", routingHints: ["curtis-paul", "edwin-fee", "shane-smith"] },
  { slug: "#monthly-gc-call", label: "Monthly GC call", category: "cadence", description: "Agenda item for recurring OGC call.", routingHints: ["jeff-schell"] },
  { slug: "#urgent-triage", label: "Urgent triage", category: "sensitivity", description: "Requires prompt review; not an emergency response guarantee.", routingHints: ["jeff-schell"], caveat: "Portal messages are not an emergency channel. Contact your designated attorney by an approved urgent channel if time-sensitive." },
  { slug: "#board-investor-sensitive", label: "Board / investor sensitive", category: "sensitivity", description: "Board, investor, diligence, or external stakeholder sensitivity.", routingHints: ["jeff-schell", "eric-vendt", "clare-lewis"], caveat: "Clarify audience and whether material is draft, final, or external-facing." },
];

export function getTagBySlug(slug: string) {
  return portalIssueTags.find((tag) => tag.slug === slug);
}

export function isPortalIssueTagSlug(slug: string): slug is PortalIssueTagSlug {
  return portalIssueTags.some((tag) => tag.slug === slug);
}
