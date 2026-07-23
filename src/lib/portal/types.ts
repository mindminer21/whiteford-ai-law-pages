export type PortalIssueTagSlug =
  | "#ai-governance"
  | "#ai-contracts"
  | "#ip-patents"
  | "#trade-secrets"
  | "#open-source-software"
  | "#commercial-contracts"
  | "#privacy-security"
  | "#employment-contractors"
  | "#corporate-governance"
  | "#financing-investor-readiness"
  | "#ma-exit-readiness"
  | "#litigation-disputes"
  | "#gov-contracts-defense"
  | "#real-estate-facilities"
  | "#tax-structure"
  | "#monthly-gc-call"
  | "#urgent-triage"
  | "#board-investor-sensitive";

export type PortalTagCategory =
  | "ai"
  | "ip"
  | "contracts"
  | "privacy-security"
  | "employment"
  | "corporate"
  | "disputes"
  | "regulated"
  | "facilities"
  | "tax"
  | "cadence"
  | "sensitivity";

export type PortalIssueTag = {
  slug: PortalIssueTagSlug;
  label: string;
  description: string;
  category: PortalTagCategory;
  routingHints: string[];
  caveat?: string;
};

export type PortalAttorney = {
  id: string;
  displayName: string;
  slug: string;
  hashtag: string;
  roleSummary: string;
  practiceTags: PortalIssueTagSlug[];
  availabilityMode: "request-only" | "bookable" | "hidden";
  isDraftRoster: boolean;
  caveat: string;
};

export type PortalOrganization = {
  id: string;
  name: string;
  status: "prospect" | "conflicts-pending" | "engaged" | "paused" | "closed";
  primaryContactUserId: string;
  relationshipAttorneyId: string;
};

export type PortalUser = {
  id: string;
  organizationId?: string;
  email: string;
  displayName: string;
  role: "client-owner" | "client-contributor" | "attorney" | "relationship-attorney" | "admin";
  status: "invited" | "active" | "disabled";
};

export type PortalMatterWorkspace = {
  id: string;
  organizationId: string;
  name: string;
  status: "conflicts-pending" | "engaged" | "paused" | "closed";
  engagementScopeSummary: string;
  relationshipAttorneyId: string;
};

export type PortalThread = {
  id: string;
  organizationId: string;
  workspaceId: string;
  subject: string;
  status: "draft" | "open" | "awaiting-client" | "awaiting-attorney" | "assigned" | "scheduled" | "resolved" | "archived" | "out-of-scope";
  urgency: "normal" | "monthly-call" | "prompt-triage" | "time-sensitive";
  issueTags: PortalIssueTagSlug[];
  lawyerTags: string[];
  assignedAttorneyIds: string[];
  createdByUserId: string;
  createdAt: string;
  updatedAt: string;
  nextAction: string;
};

export type PortalMessage = {
  id: string;
  threadId: string;
  authorUserId: string;
  body: string;
  issueTags: PortalIssueTagSlug[];
  lawyerTags: string[];
  linkedDocumentIds: string[];
  createdAt: string;
};

export type PortalDocument = {
  id: string;
  organizationId: string;
  workspaceId: string;
  displayFilename: string;
  mimeType: string;
  sizeBytes: number;
  storageProvider: "mock";
  status: "uploading" | "scan-pending" | "available" | "quarantined" | "restricted" | "deleted";
  issueTags: PortalIssueTagSlug[];
  lawyerTags: string[];
  uploadedByUserId: string;
  uploadedAt: string;
  linkedThreadIds: string[];
  note: string;
};

export type PortalMeetingRequest = {
  id: string;
  organizationId: string;
  workspaceId: string;
  requestedAttorneyIds: string[];
  issueTags: PortalIssueTagSlug[];
  lawyerTags: string[];
  purpose: string;
  preferredWindows: { label: string; timezone: string }[];
  durationMinutes: 15 | 30 | 45 | 60 | 90;
  status: "draft" | "requested" | "under-review" | "proposed-times" | "booked" | "declined" | "canceled" | "completed";
  linkedThreadIds: string[];
  linkedDocumentIds: string[];
  createdByUserId: string;
  createdAt: string;
  updatedAt: string;
};

export type PortalAgendaItem = {
  id: string;
  title: string;
  lane: "urgent" | "important" | "monitor" | "defer";
  issueTags: PortalIssueTagSlug[];
  lawyerTags: string[];
  owner: string;
  targetDate: string;
  status: "new" | "triage" | "in-progress" | "waiting" | "done";
  notes: string;
};
