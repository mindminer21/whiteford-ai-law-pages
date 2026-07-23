import type { PortalAgendaItem, PortalDocument, PortalMeetingRequest, PortalMatterWorkspace, PortalOrganization, PortalThread, PortalUser } from "./types";

export const portalOrganization: PortalOrganization = {
  id: "org-northstar-robotics",
  name: "Northstar Robotics, Inc.",
  status: "engaged",
  primaryContactUserId: "user-maya",
  relationshipAttorneyId: "jeff-schell",
};

export const portalUsers: PortalUser[] = [
  { id: "user-maya", organizationId: portalOrganization.id, email: "maya@example.test", displayName: "Maya Chen", role: "client-owner", status: "active" },
  { id: "user-ops", organizationId: portalOrganization.id, email: "ops@example.test", displayName: "Operations Lead", role: "client-contributor", status: "active" },
  { id: "user-jeff", email: "jeff@schellip.example", displayName: "Jeff Schell", role: "relationship-attorney", status: "active" },
];

export const portalWorkspaces: PortalMatterWorkspace[] = [
  { id: "workspace-ogc", organizationId: portalOrganization.id, name: "Tech Company OGC + AI Compliance", status: "engaged", engagementScopeSummary: "Mock engaged workspace for Phase 0 UX validation only; no real client data or legal advice automation.", relationshipAttorneyId: "jeff-schell" },
];

export const portalThreads: PortalThread[] = [
  { id: "thread-ai-vendor", organizationId: portalOrganization.id, workspaceId: "workspace-ogc", subject: "AI vendor terms before enterprise pilot", status: "awaiting-attorney", urgency: "prompt-triage", issueTags: ["#ai-contracts", "#privacy-security"], lawyerTags: ["#jeff-schell", "#slaven-jesic", "#bruce-martino"], assignedAttorneyIds: ["jeff-schell"], createdByUserId: "user-maya", createdAt: "2026-05-12", updatedAt: "2026-05-13", nextAction: "Jeff to triage contract clauses and decide whether privacy specialist review is needed." },
  { id: "thread-board", organizationId: portalOrganization.id, workspaceId: "workspace-ogc", subject: "Board memo: AI governance roadmap", status: "open", urgency: "monthly-call", issueTags: ["#ai-governance", "#board-investor-sensitive", "#monthly-gc-call"], lawyerTags: ["#jeff-schell", "#slaven-jesic"], assignedAttorneyIds: ["jeff-schell"], createdByUserId: "user-maya", createdAt: "2026-05-10", updatedAt: "2026-05-12", nextAction: "Add to monthly legal operating plan with audience and draft/final status." },
  { id: "thread-contractor", organizationId: portalOrganization.id, workspaceId: "workspace-ogc", subject: "Contractor invention assignment cleanup", status: "awaiting-client", urgency: "normal", issueTags: ["#employment-contractors", "#trade-secrets", "#ip-patents"], lawyerTags: ["#jeff-schell", "#david-stevens"], assignedAttorneyIds: ["jeff-schell"], createdByUserId: "user-ops", createdAt: "2026-05-06", updatedAt: "2026-05-11", nextAction: "Client to gather current contractor agreement forms before attorney review." },
];

export const portalDocuments: PortalDocument[] = [
  { id: "doc-vendor-dpa", organizationId: portalOrganization.id, workspaceId: "workspace-ogc", displayFilename: "mock-ai-vendor-dpa-summary.pdf", mimeType: "application/pdf", sizeBytes: 248000, storageProvider: "mock", status: "scan-pending", issueTags: ["#ai-contracts", "#privacy-security"], lawyerTags: ["#jeff-schell", "#bruce-martino"], uploadedByUserId: "user-maya", uploadedAt: "2026-05-12", linkedThreadIds: ["thread-ai-vendor"], note: "Mock metadata only; no document is stored in this repository." },
  { id: "doc-board-outline", organizationId: portalOrganization.id, workspaceId: "workspace-ogc", displayFilename: "mock-board-ai-governance-outline.docx", mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document", sizeBytes: 96000, storageProvider: "mock", status: "available", issueTags: ["#ai-governance", "#board-investor-sensitive"], lawyerTags: ["#jeff-schell", "#slaven-jesic"], uploadedByUserId: "user-maya", uploadedAt: "2026-05-11", linkedThreadIds: ["thread-board"], note: "Prototype shows status and routing only." },
];

export const portalMeetingRequests: PortalMeetingRequest[] = [
  { id: "meeting-monthly-ogc", organizationId: portalOrganization.id, workspaceId: "workspace-ogc", requestedAttorneyIds: ["jeff-schell", "slaven-jesic"], issueTags: ["#monthly-gc-call", "#ai-governance"], lawyerTags: ["#jeff-schell", "#slaven-jesic"], purpose: "Monthly legal operating plan: AI governance, vendor contracts, contractor IP cleanup.", preferredWindows: [{ label: "Week of May 18, Tuesday or Thursday afternoon", timezone: "America/Denver" }], durationMinutes: 60, status: "requested", linkedThreadIds: ["thread-board", "thread-ai-vendor"], linkedDocumentIds: ["doc-board-outline"], createdByUserId: "user-maya", createdAt: "2026-05-12", updatedAt: "2026-05-12" },
];

export const portalAgendaItems: PortalAgendaItem[] = [
  { id: "agenda-ai-vendor", title: "AI vendor contract risk map", lane: "urgent", issueTags: ["#ai-contracts", "#privacy-security"], lawyerTags: ["#jeff-schell", "#bruce-martino"], owner: "Jeff / privacy bench", targetDate: "2026-05-20", status: "triage", notes: "Managed outcome: decide review depth and next negotiation fallback points." },
  { id: "agenda-governance", title: "AI governance board narrative", lane: "important", issueTags: ["#ai-governance", "#board-investor-sensitive"], lawyerTags: ["#jeff-schell", "#slaven-jesic"], owner: "Jeff + Slaven routing request", targetDate: "2026-05-24", status: "new", notes: "Clarify audience, draft/final posture, and 30-day operating plan." },
  { id: "agenda-contractor", title: "Contractor IP assignment cleanup", lane: "monitor", issueTags: ["#employment-contractors", "#trade-secrets"], lawyerTags: ["#david-stevens", "#jeff-schell"], owner: "Client ops", targetDate: "2026-05-28", status: "waiting", notes: "Collect forms before deciding attorney workflow." },
  { id: "agenda-facilities", title: "Lab lease expansion issue spotting", lane: "defer", issueTags: ["#real-estate-facilities"], lawyerTags: ["#alexandra-neifert"], owner: "Client COO", targetDate: "2026-06-10", status: "new", notes: "Not a May blocker; queue for next operating plan." },
];

export const prototypeCaveat = "Prototype only — no live messages, uploads, calendar invites, external notifications, auth integration, CRM mutation, or document persistence.";
