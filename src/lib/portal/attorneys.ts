import type { PortalAttorney, PortalIssueTagSlug } from "./types";

const caveat = "Internal draft roster only. Tagging a lawyer requests routing metadata; it does not guarantee review, assignment, availability, or representation.";

function attorney(id: string, displayName: string, hashtag: string, roleSummary: string, practiceTags: PortalIssueTagSlug[]): PortalAttorney {
  return { id, displayName, slug: id, hashtag, roleSummary, practiceTags, availabilityMode: "request-only", isDraftRoster: true, caveat };
}

export const portalAttorneys: PortalAttorney[] = [
  attorney("jeff-schell", "Jeff Schell", "#jeff-schell", "AI/IP strategy, technology OGC relationship lead, and AI compliance coordination with Slaven Jesic.", ["#ai-governance", "#ai-contracts", "#ip-patents", "#trade-secrets", "#open-source-software", "#monthly-gc-call"]),
  attorney("slaven-jesic", "Slaven Jesic", "#slaven-jesic", "AI compliance and AI policy leader for governance, risk classification, and responsible-AI operating model routing.", ["#ai-governance", "#ai-contracts"]),
  attorney("eric-vendt", "Eric A. Vendt", "#eric-vendt", "Corporate, governance, M&A, financing, and tax/structure-sensitive escalation signals.", ["#corporate-governance", "#financing-investor-readiness", "#ma-exit-readiness", "#tax-structure"]),
  attorney("john-selbach", "John C. Selbach", "#john-selbach", "Corporate, governance, M&A, financing, government contracts, and real estate signals.", ["#corporate-governance", "#financing-investor-readiness", "#ma-exit-readiness", "#gov-contracts-defense", "#real-estate-facilities"]),
  attorney("kellie-newton", "Kellie L. Newton", "#kellie-newton", "Corporate governance / OGC bench signal.", ["#corporate-governance", "#monthly-gc-call"]),
  attorney("edward-lee", "Edward U. Lee III", "#edward-lee", "Corporate, M&A, financing, and real estate signals.", ["#corporate-governance", "#financing-investor-readiness", "#ma-exit-readiness", "#real-estate-facilities"]),
  attorney("frank-jones", "Frank S. Jones, Jr.", "#frank-jones", "Corporate, financing, privacy/cyber, government contracts, and regulatory signals.", ["#commercial-contracts", "#privacy-security", "#gov-contracts-defense", "#financing-investor-readiness"]),
  attorney("clare-lewis", "Clare M. Lewis", "#clare-lewis", "Corporate, financing, privacy/cyber, and M&A signals.", ["#commercial-contracts", "#privacy-security", "#financing-investor-readiness", "#ma-exit-readiness", "#board-investor-sensitive"]),
  attorney("philip-bogart", "Philip M. Bogart", "#philip-bogart", "Corporate governance / OGC bench signal.", ["#corporate-governance", "#monthly-gc-call"]),
  attorney("shane-smith", "D. Shane Smith", "#shane-smith", "Corporate governance / OGC and tax/structure-sensitive signal.", ["#corporate-governance", "#tax-structure"]),
  attorney("dale-mullen", "Dale G. Mullen", "#dale-mullen", "Corporate governance / OGC bench signal.", ["#corporate-governance", "#monthly-gc-call"]),
  attorney("bruce-martino", "Bruce F. Martino", "#bruce-martino", "Privacy, data, and cybersecurity; CIPP/G and CIPM signal.", ["#privacy-security", "#ai-governance"]),
  attorney("joseph-mezzanotte", "Joseph J. Mezzanotte", "#joseph-mezzanotte", "Privacy/cyber and real estate/leasing signals.", ["#privacy-security", "#real-estate-facilities"]),
  attorney("david-stevens", "David M. Stevens", "#david-stevens", "Labor and employment.", ["#employment-contractors", "#trade-secrets"]),
  attorney("enayat-qasimi", "Enayat Qasimi", "#enayat-qasimi", "Financing, securities, government contracts, and international/regulatory signals.", ["#financing-investor-readiness", "#gov-contracts-defense"]),
  attorney("albert-mezzanotte", "Albert J. Mezzanotte, Jr.", "#albert-mezzanotte", "Disputes, litigation avoidance, professional liability/restructuring signal.", ["#litigation-disputes"]),
  attorney("eric-rowe", "Eric C. Rowe", "#eric-rowe", "Disputes and business/IP litigation signal.", ["#litigation-disputes", "#ip-patents"]),
  attorney("brent-strickland", "Brent C. Strickland", "#brent-strickland", "Disputes / litigation signal.", ["#litigation-disputes"]),
  attorney("james-kahl", "James A. Kahl", "#james-kahl", "Government contracts / regulatory signal.", ["#gov-contracts-defense"]),
  attorney("adam-cizek", "Adam Cizek", "#adam-cizek", "Government contracts / regulated customer signal.", ["#gov-contracts-defense"]),
  attorney("alexandra-neifert", "Alexandra L. Neifert", "#alexandra-neifert", "Real estate / leasing signal.", ["#real-estate-facilities"]),
  attorney("curtis-paul", "Curtis C. Paul", "#curtis-paul", "Tax / business succession / structure-sensitive signal.", ["#tax-structure"]),
  attorney("edwin-fee", "Edwin G. Fee, Jr.", "#edwin-fee", "Tax / structure-sensitive signal.", ["#tax-structure"]),
];

export function getAttorneyById(id: string) {
  return portalAttorneys.find((attorneyRecord) => attorneyRecord.id === id);
}
