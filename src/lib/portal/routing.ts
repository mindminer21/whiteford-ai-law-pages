import { portalAttorneys } from "./attorneys";
import type { PortalIssueTagSlug } from "./types";

export function suggestAttorneysForIssueTags(issueTags: PortalIssueTagSlug[]) {
  const scoreByAttorneyId = new Map<string, number>();
  for (const attorney of portalAttorneys) {
    const score = issueTags.filter((tag) => attorney.practiceTags.includes(tag)).length;
    if (score > 0) scoreByAttorneyId.set(attorney.id, score);
  }
  return [...portalAttorneys]
    .filter((attorney) => scoreByAttorneyId.has(attorney.id))
    .sort((a, b) => (scoreByAttorneyId.get(b.id) ?? 0) - (scoreByAttorneyId.get(a.id) ?? 0) || a.displayName.localeCompare(b.displayName))
    .slice(0, 6);
}
