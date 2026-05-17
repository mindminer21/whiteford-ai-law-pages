export const campaigns = {
  "ai-compliance": {
    label: "AI Compliance Readiness Nurture",
    authorityPillar: "AI Legal Risk and Compliance",
    leadMagnet: "AI Compliance Gameplan Builder",
    triggerTag: "workflow:ai-compliance-readiness",
    tags: [
      "leadmagnet:ai-compliance-gameplan",
      "interest:ai-compliance",
    ],
    recommendedOffer: "AI Compliance Readiness Sprint",
    emails: [
      {
        subject: "Your AI compliance gameplan",
        preview: "A practical next-step map for AI governance and legal readiness.",
        body:
          "Your scorecard is a starting point, not a legal conclusion. The useful next step is to turn the risk areas into an inventory, owner map, vendor review, and 30/60/90-day implementation plan.",
      },
      {
        subject: "Vendor risk is often the first AI legal risk",
        preview: "AI legal readiness often starts with the contract stack.",
        body:
          "Before a policy solves anything, a company needs to know which AI vendors touch data, what rights the vendor has, and where confidentiality, IP ownership, indemnity, audit, and security terms live.",
      },
      {
        subject: "Colorado AI readiness without overreacting",
        preview: "How to treat unsettled law as a readiness workstream.",
        body:
          "Colorado AI and ADMT rules are moving. That does not mean companies should freeze. It means readiness should focus on use-case inventory, consequential decision exposure, human review, notices, records, and governance ownership.",
      },
      {
        subject: "Turn AI use into a legal operating system",
        preview: "The goal is repeatable governance, not one-off panic.",
        body:
          "A durable AI legal system includes intake, approval, vendor review, documentation, escalation, training, and board-ready reporting. That is the workstream behind an AI Compliance Readiness Sprint.",
      },
    ],
  },
  "ai-patent": {
    label: "AI Patent Strategy Nurture",
    authorityPillar: "AI Patent Law",
    leadMagnet: "AI Patent Strategy Scorecard",
    triggerTag: "workflow:ai-patent-strategy",
    tags: [
      "leadmagnet:ai-patent-scorecard",
      "interest:ai-patent-law",
    ],
    recommendedOffer: "AI Patent Strategy Sprint",
    emails: [
      {
        subject: "Your AI patent strategy scorecard",
        preview: "What to document before AI-assisted R&D becomes a patent problem.",
        body:
          "The scorecard is designed to help founders identify where human contribution, invention records, ownership, claim strategy, and product roadmap need to be tightened before patent filing.",
      },
      {
        subject: "The mistake founders make with AI-assisted invention",
        preview: "The AI tool is not the inventor. The human contribution still matters.",
        body:
          "For AI-assisted inventions, the practical question is not whether AI was used. It is whether the human contribution to conception is documented clearly enough to support inventorship and patent strategy.",
      },
      {
        subject: "Can you patent AI software?",
        preview: "Eligibility and claim strategy need to be designed early.",
        body:
          "AI and software inventions can raise subject-matter eligibility questions. Strong strategy usually starts with the technical improvement, data flow, model role, system architecture, and business use case.",
      },
      {
        subject: "Build the legal moat before the demo gets copied",
        preview: "Patents, trade secrets, contracts, and product roadmap work together.",
        body:
          "The strongest AI IP strategies rarely depend on one filing alone. They align patent claims, trade secret controls, contractor assignments, customer terms, and the product roadmap.",
      },
    ],
  },
  "tech-gc": {
    label: "Tech GC Launchpad Nurture",
    authorityPillar: "Tech Outside General Counsel",
    leadMagnet: "Colorado Tech Company Legal Health Checklist",
    triggerTag: "workflow:tech-gc-launchpad",
    tags: ["leadmagnet:tech-gc-checklist", "interest:tech-ogc"],
    recommendedOffer: "Tech Company OGC Launchpad",
    emails: [
      {
        subject: "Your technology-company legal health checklist",
        preview: "A practical way to see where the company is carrying legal drag.",
        body:
          "The checklist is designed to sort legal work by operational risk: contracts, hiring, IP ownership, privacy, financing readiness, and AI governance.",
      },
      {
        subject: "From patent strategy to company legal infrastructure",
        preview: "What changes when a technology company starts to scale.",
        body:
          "Patent protection is only one part of the legal system a scaling technology company needs. Contracts, employment, data, financing, governance, and commercial risk become part of the same operating layer.",
      },
      {
        subject: "What to fix before hiring, fundraising, or selling",
        preview: "Legal readiness should match the next business event.",
        body:
          "The right legal priorities depend on the next milestone: hiring, enterprise customers, financing, acquisition talks, or product launch. A legal operating review turns that into a sequence.",
      },
      {
        subject: "When an outside GC launchpad is useful",
        preview: "A bounded legal operating review can create the roadmap.",
        body:
          "A Tech Company OGC Launchpad is useful when legal work is becoming too broad for one-off fixes. The goal is to map the operating layer across contracts, IP ownership, workforce, privacy, AI/data, financing, and deal readiness.",
      },
    ],
  },
  "ma-readiness": {
    label: "M&A Readiness Nurture",
    authorityPillar: "M&A, Diligence, and Transaction Readiness",
    leadMagnet: "Founder M&A Readiness Checklist",
    triggerTag: "workflow:ma-readiness",
    tags: ["leadmagnet:ma-readiness-checklist", "interest:ma-readiness"],
    recommendedOffer: "Founder M&A Readiness Review",
    emails: [
      {
        subject: "Your founder M&A readiness checklist",
        preview: "Start cleaning up the issues a buyer will ask about later.",
        body:
          "The checklist focuses on the non-financial diligence issues that can slow deals: IP ownership, assignments, customer contracts, employee matters, AI/data/privacy, and corporate records.",
      },
      {
        subject: "Three non-financial risks that slow tech deals",
        preview: "The diligence problems that show up before price becomes the issue.",
        body:
          "Tech deals often slow down around IP ownership, customer/vendor contracts, and data or AI product risk. The earlier those are mapped, the better the founder can control the process.",
      },
      {
        subject: "What a buyer will ask before you are ready",
        preview: "A little cleanup before diligence can change the conversation.",
        body:
          "A buyer will ask for cap table support, invention assignments, key contracts, employee documents, product risk, disputes, and compliance posture. A readiness review identifies what needs attention before the request list arrives.",
      },
      {
        subject: "When a founder M&A readiness review is useful",
        preview: "Map diligence cleanup before the process controls you.",
        body:
          "A Founder M&A Readiness Review is useful before a banker, buyer, investor, or strategic partner drives the process. The practical work is to identify non-financial diligence friction, prioritize cleanup, and decide which Whiteford resources should be involved.",
      },
    ],
  },
} as const;

export type CampaignKey = keyof typeof campaigns;

export function getCampaign(key: string | undefined) {
  if (key && key in campaigns) {
    return campaigns[key as CampaignKey];
  }

  return campaigns["ai-compliance"];
}
