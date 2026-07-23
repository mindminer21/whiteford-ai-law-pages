# PRD: Whiteford Tech Company OGC Client Portal

> **For Codex:** Read `AGENTS.md` first. Then use this PRD as the build spec. Implement in small, reviewable PRs. Do not introduce live email, calendar, CRM, payment, storage, or attorney-notification side effects until Jeff explicitly approves the exact integration and credentials are configured safely.

**Draft date:** 2026-05-13  
**Status:** Internal Jeff/Whiteford product requirements draft only — not firm-approved, not client-facing, and not a substitute for Whiteford security, privacy, conflicts, records, billing, engagement-letter, or professional-responsibility review.  
**Related offer:** `docs/offers/2026-05-13_whiteford_tech_company_ogc_ai_compliance_package.md`  
**Product name:** Whiteford Tech Company OGC Client Portal  
**Primary route:** `/client-portal` for public/marketing entry, `/portal` for authenticated portal app.  
**Audience:** Growth-stage technology, AI, robotics, SaaS, cybersecurity, data, defense-tech, and IP-heavy company clients using the Whiteford Tech Company OGC + AI Compliance Counsel package.

---

## 1. Executive summary

Build a secure client portal where approved/engaged clients can:

1. Start and continue matter-aware conversations with Jeff Schell, Slaven Jesic, and a predefined Whiteford specialist bench.
2. Upload documents into scoped workspaces.
3. Tag communications and documents with predefined hashtags for issue type, urgency, and lawyer routing.
4. Request or book discussion times with specific attorneys, subject to conflicts, engagement scope, availability, and attorney approval.
5. See a lightweight legal operating dashboard: open threads, uploaded files, upcoming meetings, assigned lawyers, AI-agent onboarding checkpoints, and next actions.

The portal should make the $8,000/month OGC + AI Compliance package feel like a managed legal operating system: recurring access, practical triage, Whiteford specialist routing, structured document flow, and a clear monthly action cadence.

The MVP should prioritize **safe workflow scaffolding** over complex automation:

- Use firm-approved auth and storage before handling real client documents.
- Treat scheduling as meeting requests unless a calendar integration is explicitly approved.
- Treat lawyer hashtags as routing metadata, not a promise of availability or representation.
- Treat AI agent assistance as guided intake, checklist generation, and internal triage support only — not legal advice, conflict clearance, or autonomous attorney assignment.
- Include legal-ethics and confidentiality guardrails everywhere the user might submit sensitive information.
- Maintain an audit trail for messages, document events, tag changes, and meeting requests.

---

## 2. Product goals

### 2.1 Business goals

- Increase perceived value of the monthly OGC package by turning access into a visible operating system.
- Reduce Jeff/client friction around “who should see this?” and “what do I upload before the call?”
- Route issues to the right Whiteford lawyer without requiring the client to understand practice-group boundaries.
- Create a repeatable client experience for AI/tech companies while preserving professional-responsibility review gates.
- Provide Codex with a concrete implementation target for staged portal development inside the existing Next.js app.

### 2.2 User goals

A client should be able to say:

- “I have a contract / AI / employment / financing / privacy issue — I know where to put it.”
- “I can tag the right lawyer or issue category without guessing an email thread.”
- “I can upload the relevant documents in one place.”
- “I can ask for time with Jeff or a Whiteford specialist and see what is pending.”
- “I understand when not to upload confidential information and when engagement/conflicts approval is required.”

### 2.3 Firm / attorney goals

Whiteford/Jeff should be able to:

- Triage client communications by issue, lawyer, urgency, and document set.
- See client-submitted context before meetings.
- Preserve guardrails around conflicts, engagement scope, privilege, retention, and no-confidential-information warnings where needed.
- Export or sync structured records later to approved systems of record.
- Keep notification volume manageable through digest and assignment rules.

---

## 3. Non-goals for MVP

The MVP should **not** attempt to implement these until explicitly approved:

- No live legal advice automation or AI-generated legal recommendations to clients.
- No client document analysis using an LLM unless Whiteford approves privacy/security model and data boundaries.
- No automatic creation of an attorney-client relationship.
- No automated conflicts clearance.
- No live HighLevel, Clio, NetDocuments/iManage, Outlook, Teams, or billing mutation.
- No external sends to attorneys/clients beyond local UI state unless Jeff approves a concrete integration.
- No payment processing.
- No public self-service signup for unvetted prospects.
- No guarantee that a tagged lawyer will respond or accept the issue.
- No production storage of documents in local filesystem, git, browser localStorage, or unaudited third-party tools.

---

## 4. Primary personas

### 4.1 Client executive / founder

- CEO, COO, CFO, GC-equivalent, product leader, or founder at a technology company.
- Needs fast issue triage, monthly strategy, and specialist access.
- May not know whether an issue is IP, privacy, contracts, employment, M&A, tax, or litigation.
- Wants to upload contracts, policies, investor docs, vendor terms, product materials, or board questions.

### 4.2 Client operations user

- Executive assistant, operations lead, legal ops/admin, HR lead, finance lead, or product ops user.
- Uploads documents and schedules meetings on behalf of the executive team.
- Needs role-based permission controls.

### 4.3 Jeff / relationship attorney

- Primary portal relationship owner.
- Leads AI/IP/compliance triage and routes to specialist attorneys.
- Needs conversation summaries, document context, tags, meeting requests, and escalation dashboard.

### 4.4 Whiteford specialist attorney

- Receives scoped issues by tag, assignment, or meeting request.
- Needs only the client/matter information they are approved to access.
- Must be able to accept, decline, reassign, or request more context.

### 4.5 Internal portal admin

- Manages client organizations, users, roles, approved attorneys, hashtag taxonomy, and feature flags.
- Reviews audit logs and export/sync status.

---

## 5. Lawyer bench and predefined lawyer hashtags

The initial roster comes from the OGC + AI Compliance package draft and must be reconciled against current Whiteford availability, conflicts, engagement scope, and Jeff’s HighLevel/referral list before production use.

### 5.1 Attorney profiles for MVP seed data

Codex should create a typed seed list in `src/lib/portal/attorneys.ts` with these records as **internal draft seed data**:

- Jeff Schell — AI/IP strategy, technology OGC relationship lead, and AI compliance coordination with Slaven Jesic. Tag: `#jeff-schell`.
- Slaven Jesic — AI compliance and AI policy leader; AI governance, policy design, risk classification, and responsible-AI operating model routing. Tag: `#slaven-jesic`.
- Eric A. Vendt — corporate, governance, M&A, financing, tax/structure-sensitive escalation signals. Tag: `#eric-vendt`.
- John C. Selbach — corporate, governance, M&A, financing, government contracts, real estate signals. Tag: `#john-selbach`.
- Kellie L. Newton — corporate governance / OGC bench signal. Tag: `#kellie-newton`.
- Edward U. Lee III — corporate, M&A, financing, real estate signals. Tag: `#edward-lee`.
- Frank S. Jones, Jr. — corporate, financing, privacy/cyber, government contracts, regulatory signals. Tag: `#frank-jones`.
- Clare M. Lewis — corporate, financing, privacy/cyber, M&A signals. Tag: `#clare-lewis`.
- Philip M. Bogart — corporate governance / OGC bench signal. Tag: `#philip-bogart`.
- D. Shane Smith — corporate governance / OGC and tax/structure-sensitive signal. Tag: `#shane-smith`.
- Dale G. Mullen — corporate governance / OGC bench signal. Tag: `#dale-mullen`.
- Bruce F. Martino — privacy, data, cybersecurity; CIPP/G and CIPM signal. Tag: `#bruce-martino`.
- Joseph J. Mezzanotte — privacy/cyber and real estate/leasing signals. Tag: `#joseph-mezzanotte`.
- David M. Stevens — labor and employment. Tag: `#david-stevens`.
- Enayat Qasimi — financing, securities, government contracts, international/regulatory signals. Tag: `#enayat-qasimi`.
- Albert J. Mezzanotte, Jr. — disputes, litigation avoidance, professional liability/restructuring signal. Tag: `#albert-mezzanotte`.
- Eric C. Rowe — disputes, business/IP litigation signal. Tag: `#eric-rowe`.
- Brent C. Strickland — disputes / litigation signal. Tag: `#brent-strickland`.
- James A. Kahl — government contracts / regulatory signal. Tag: `#james-kahl`.
- Adam Cizek — government contracts / regulated customer signal. Tag: `#adam-cizek`.
- Alexandra L. Neifert — real estate / leasing signal. Tag: `#alexandra-neifert`.
- Curtis C. Paul — tax / business succession / structure-sensitive signal. Tag: `#curtis-paul`.
- Edwin G. Fee, Jr. — tax / structure-sensitive signal. Tag: `#edwin-fee`.

### 5.2 Attorney profile fields

Each attorney seed record should include:

```ts
export type PortalAttorney = {
  id: string;
  displayName: string;
  slug: string;
  hashtag: string;
  roleSummary: string;
  practiceTags: PortalIssueTag[];
  availabilityMode: "request-only" | "bookable" | "hidden";
  isDraftRoster: boolean;
  caveat: string;
};
```

Default `availabilityMode` should be `"request-only"` for all attorneys until calendar integration and attorney approval are configured.

---

## 6. Predefined hashtag taxonomy

The portal should support two hashtag types:

1. **Lawyer tags** — route or notify a specific lawyer, subject to approval.
2. **Issue tags** — classify the legal/business issue.

Tags must be selected from a predefined taxonomy in the MVP. Do not allow arbitrary client-created tags until moderation and data hygiene rules exist.

### 6.1 Issue tags

Create `src/lib/portal/tags.ts` with these initial issue tags:

- `#ai-governance` — AI use-case inventory, model governance, human review, AI policy, product claims.
- `#ai-contracts` — AI vendor/customer terms, data use, model output ownership, indemnity, audit, warranties.
- `#ip-patents` — patents, invention capture, AI-assisted invention, patent vs. trade secret.
- `#trade-secrets` — confidential know-how, data/process protection, employee/contractor leakage risk.
- `#open-source-software` — OSS licensing, code provenance, AI-assisted coding risk.
- `#commercial-contracts` — MSAs, SaaS agreements, SOWs, order forms, procurement terms.
- `#privacy-security` — privacy, DPA/BAA/SCC, data retention, incident preparedness, SOC 2/customer security reviews.
- `#employment-contractors` — hiring, contractor classification, invention assignment, restrictive covenants, terminations.
- `#corporate-governance` — board/manager consents, cap table, corporate records, subsidiary/entity issues.
- `#financing-investor-readiness` — SAFE/note/equity financing, investor diligence, securities issue spotting.
- `#ma-exit-readiness` — diligence room, change-of-control, transaction readiness, strategic partnerships.
- `#litigation-disputes` — demand letters, subpoenas, litigation holds, breach/termination risk.
- `#gov-contracts-defense` — flow-downs, CMMC/security contracting, federal funding, export/sanctions triage.
- `#real-estate-facilities` — office/lab/warehouse leases, facility vendors, expansion diligence.
- `#tax-structure` — tax-sensitive transactions, cross-border, restructuring, succession.
- `#monthly-gc-call` — agenda item for recurring OGC call.
- `#urgent-triage` — requires prompt review, not emergency response guarantee.
- `#board-investor-sensitive` — board, investor, diligence, or external stakeholder sensitivity.

### 6.2 Tag behavior

- Every thread must have at least one issue tag.
- Lawyer tags are optional; the UI should suggest lawyers based on issue tags.
- `#urgent-triage` should display a prominent caveat: “Portal messages are not an emergency channel. Contact your designated attorney by approved urgent channel if time-sensitive.”
- `#board-investor-sensitive` should trigger a context prompt asking who the audience is and whether the material is draft, final, or external-facing.
- Lawyer tags should not directly notify external systems in MVP. They should update local/mock portal state only.

---

## 7. Core user journeys

### 7.1 Client starts a tagged conversation

1. Client enters `/portal`.
2. Client sees dashboard with active matters, threads, documents, and upcoming meetings.
3. Client clicks “New legal question.”
4. Client chooses one or more issue tags.
5. UI suggests lawyer tags based on selected issue tags.
6. Client optionally selects a lawyer tag.
7. Client writes message.
8. Client optionally attaches documents already uploaded or uploads new documents.
9. Client acknowledges no-confidential-information / engagement-scope warning if required.
10. Thread is created with status `open`, default owner `Jeff / relationship attorney`, and any lawyer tags marked `requested`.

### 7.2 Client uploads documents

1. Client clicks “Upload documents.”
2. Client selects matter/workspace.
3. Client chooses issue tags and optional lawyer tags.
4. Client sees accepted file types, max size, confidentiality warning, and retention caveat.
5. Client uploads documents.
6. System stores file metadata, virus-scan status, processing status, uploader, tags, and linked thread/meeting if any.
7. Documents are not viewable by attorneys until access policy allows it.

### 7.3 Client requests time with an attorney

1. Client opens “Schedule discussion.”
2. Client picks issue tags.
3. UI suggests attorneys and shows `request-only` unless live availability is configured.
4. Client selects attorney(s), preferred time windows, duration, and meeting purpose.
5. Client links relevant threads/documents.
6. Client submits request.
7. Portal creates `meeting_request` with status `requested`.
8. Internal user can approve, propose alternatives, attach calendar link, or decline/reassign.

### 7.4 Attorney reviews triage queue

1. Attorney/admin opens internal portal view.
2. Filters by tag, client, urgency, assigned lawyer, status, and date.
3. Reviews thread summary, messages, documents, and requested meeting.
4. Accepts assignment, requests more information, routes to another attorney, or marks out of scope.
5. Status and audit log update.

### 7.5 Monthly OGC operating rhythm

1. Portal automatically groups `#monthly-gc-call` items into the next OGC agenda.
2. Jeff/relationship attorney can mark agenda items as urgent / important / monitor / defer.
3. After the call, internal user posts a “Monthly legal operating plan” update.
4. Client sees action items, owners, due dates, and related documents.

---

## 8. Functional requirements

### 8.1 Portal entry and onboarding

**FR-001:** Create a public `/client-portal` route explaining the portal concept, caveats, and “approved clients only” posture.  
**FR-002:** Create authenticated `/portal` app shell with dashboard, messages, documents, scheduling, and settings nav.  
**FR-003:** MVP may use mock auth/session state for prototype, but production must use approved auth with organization-level access control.  
**FR-004:** Add a visible disclaimer on entry: no legal advice, no attorney-client relationship unless engagement/conflicts procedures are complete, no emergency use, do not submit confidential information unless authorized.

### 8.1A AI-agent-assisted onboarding

**FR-005:** Create an onboarding workspace that helps new and existing clients organize intake without providing legal advice.  
**FR-006:** Onboarding should distinguish `new-client`, `existing-client`, and `new-matter-for-existing-client` paths.  
**FR-007:** The AI agent should ask structured intake questions, suggest predefined issue tags, suggest likely lawyer tags, and generate a draft onboarding checklist for attorney review.  
**FR-008:** The AI agent must never state that conflicts are cleared, a matter is accepted, a lawyer is assigned, or legal advice has been given.  
**FR-009:** The MVP should implement onboarding as a deterministic guided prototype using mock prompts/checklists; production AI assistance requires separate Whiteford approval, model/data-boundary review, logging policy, and opt-in controls.

### 8.2 Client / organization management

**FR-010:** Support organization workspaces.  
**FR-011:** Support roles: client owner, client contributor, attorney, relationship attorney, admin.  
**FR-012:** Support matter/workspace status: prospect, conflicts-pending, engaged, paused, closed.  
**FR-013:** Restrict real chat/upload/scheduling to `engaged` or explicitly approved workspaces in production.

### 8.3 Conversations / chat

**FR-020:** Users can create a thread with subject, message body, issue tags, optional lawyer tags, linked documents, and urgency.  
**FR-021:** Users can reply to threads.  
**FR-022:** Threads support statuses: draft, open, awaiting-client, awaiting-attorney, assigned, scheduled, resolved, archived, out-of-scope.  
**FR-023:** Threads show participants, assigned attorney, requested attorneys, tags, linked documents, linked meeting requests, and audit history.  
**FR-024:** MVP should display mock chat state using local typed data. Production must persist through a secure backend.  
**FR-025:** Add “do not rely on portal for emergencies” copy anywhere urgency is selected.

### 8.4 Hashtag tagging

**FR-030:** Users can select only predefined tags.  
**FR-031:** Tags have descriptions, type, category, and routing hints.  
**FR-032:** UI suggests issue tags based on selected lawyer tags and suggests lawyers based on issue tags.  
**FR-033:** Tag changes are audit logged.  
**FR-034:** Tags can be applied to threads, individual messages, documents, meeting requests, and monthly agenda items.

### 8.5 Document upload and management

**FR-040:** Users can upload files to a matter/workspace.  
**FR-041:** Files require issue tags and can optionally have lawyer tags.  
**FR-042:** Store metadata: original filename, safe display filename, file size, MIME type, uploaded by, uploaded at, virus scan status, storage key, checksum, tags, linked thread/meeting, confidentiality status, retention status.  
**FR-043:** Support document statuses: uploading, scan-pending, available, quarantined, restricted, deleted, export-pending.  
**FR-044:** Production must use secure storage with encryption at rest, signed URLs, file-size limits, virus/malware scanning, access controls, and audit logs.  
**FR-045:** Never commit uploaded documents to git or store them in the repo.  
**FR-046:** MVP prototype may use a simulated upload queue without real file persistence.

### 8.6 Scheduling

**FR-050:** Users can request a meeting with one or more attorneys.  
**FR-051:** Meeting request includes preferred windows, timezone, duration, meeting purpose, tags, lawyers, linked docs/threads, and sensitivity level.  
**FR-052:** Default attorney availability mode is `request-only`.  
**FR-053:** Statuses: draft, requested, under-review, proposed-times, booked, declined, canceled, completed.  
**FR-054:** MVP should not send calendar invites. It should create local portal meeting requests only.  
**FR-055:** Future approved integrations may include Microsoft 365/Outlook, Teams, Calendly, Cal.com, or firm-approved scheduling tool.

### 8.7 Internal triage dashboard

**FR-060:** Internal users can view all open threads and meeting requests by tag, client, lawyer, urgency, and status.  
**FR-061:** Internal users can assign/reassign attorney owners.  
**FR-062:** Internal users can mark lawyer tag requests as requested, approved, declined, reassigned, or hidden.  
**FR-063:** Internal users can create monthly OGC agenda items from threads/documents.

### 8.8 Monthly legal operating plan

**FR-070:** Each client workspace has a monthly agenda.  
**FR-071:** Agenda item fields: title, issue tags, lawyer tags, source threads/documents, priority, owner, target date, status, notes.  
**FR-072:** Generate a client-visible “Monthly Legal Operating Plan” view with urgent, important, monitor, and defer columns.  
**FR-073:** MVP can use mock plan data; production should persist plan history.

### 8.9 Notifications

**FR-080:** MVP should not send live notifications.  
**FR-081:** UI should show “notification pending / not connected” states.  
**FR-082:** Future notifications must be configurable by role and channel and must avoid sending confidential content in email/SMS previews.  
**FR-083:** Attorney notification rules must be explicitly approved before activation.

### 8.10 Search and filtering

**FR-090:** Users can filter threads/documents/meetings by tag, lawyer, status, client, date, and urgency.  
**FR-091:** Production should support full-text search across message subjects and permitted metadata.  
**FR-092:** Document content search is out of MVP unless Whiteford approves secure extraction/indexing.

---

## 9. Legal, ethics, security, and privacy requirements

### 9.1 Required disclaimers and gates

Use consistent wording in UI components:

> This portal is for approved Whiteford/Schell IP client communication and matter coordination. Portal use does not create a new attorney-client relationship, expand an existing engagement, or confirm that a lawyer is available for a specific matter. Do not submit confidential or time-sensitive information unless your engagement and conflicts procedures authorize portal use for that matter. Portal messages are not an emergency channel.

Add context-specific warnings:

- Upload screen: “Do not upload confidential or sensitive documents until engagement/conflicts clearance and portal authorization are confirmed.”
- Scheduling screen: “A meeting request is not accepted until confirmed by Whiteford.”
- Lawyer tags: “Tagging a lawyer requests routing; it does not guarantee review, assignment, or representation.”
- AI/analysis future feature: “No AI analysis is enabled unless separately approved.”

### 9.2 Security requirements

Production portal must include:

- Organization-scoped authentication and authorization.
- Role-based access control.
- Matter/workspace-level permissions.
- Encryption in transit and at rest.
- File malware scanning before attorney access.
- Signed URL document access with short expirations.
- Audit logs for login, message, upload, download, tag, assignment, status, and scheduling events.
- Secure secret management; no secrets in source code or client bundle.
- Data retention and deletion policy hooks.
- Rate limiting and abuse monitoring.
- CSRF/XSS protections and safe file-name handling.
- No confidential content in telemetry, analytics, logs, or notification previews.

### 9.3 Compliance questions to resolve before production

- Which firm-approved identity provider should be used?
- Which document management system is the system of record?
- Can client documents be stored in Supabase/S3/Azure, or must they go to a firm DMS?
- What retention/deletion policy applies?
- What is the conflicts workflow before enabling a workspace?
- Are external client portal notifications permitted by Whiteford policy?
- Which attorney calendar/scheduling system is approved?
- What accessibility/security review is required before launch?

---

## 10. UX requirements

### 10.1 Navigation

Authenticated portal routes:

- `/portal` — dashboard.
- `/portal/messages` — threads and chat.
- `/portal/messages/new` — create tagged conversation.
- `/portal/documents` — document library.
- `/portal/documents/upload` — upload flow.
- `/portal/schedule` — meeting request list.
- `/portal/schedule/new` — request discussion time.
- `/portal/onboarding` — AI-agent-assisted intake and onboarding checklist prototype.
- `/portal/agenda` — monthly OGC agenda and legal operating plan.
- `/portal/attorneys` — approved attorney bench and tag guide.
- `/portal/settings` — organization/users/preferences; admin only as needed.

### 10.2 Dashboard modules

The `/portal` dashboard should include:

- Current client organization / matter switcher.
- “Start legal question” CTA.
- “Upload documents” CTA.
- “Request discussion time” CTA.
- Open conversations card.
- Documents awaiting review card.
- Upcoming / requested meetings card.
- Monthly OGC agenda card.
- Attorney bench card with suggested tags.
- AI onboarding assistant card with new-client, existing-client, and new-matter paths.
- Guardrail callout.

### 10.3 Conversation composer

Fields:

- Subject.
- Issue tags.
- Optional lawyer tags.
- Urgency: normal, next monthly call, prompt triage, time-sensitive.
- Message body.
- Link existing documents.
- Upload new documents.
- Acknowledgment checkbox for confidentiality/engagement warning when sensitivity is elevated.

### 10.4 Document upload UI

Fields:

- Workspace/matter.
- File picker.
- Document category: contract, policy, board/investor, employment, IP, privacy/security, financing, dispute, real estate, tax, other.
- Issue tags.
- Lawyer tags.
- Link to thread or meeting request.
- Description / what should lawyer look for?
- Confidentiality/sensitivity selector.
- Required acknowledgment.

### 10.5 Scheduling UI

Fields:

- Attorney(s) requested.
- Issue tags.
- Meeting purpose.
- Preferred windows.
- Timezone.
- Duration: 15, 30, 45, 60, 90 minutes.
- Linked documents and threads.
- Additional attendees.
- Sensitivity / external deadline.

### 10.6 Visual design

Fit existing Whiteford/Schell IP site style:

- Professional, restrained legal SaaS look.
- High-contrast accessible typography.
- Dashboard cards, tag pills, status badges.
- Clear caveats without overwhelming the main workflow.
- Use existing brand components where possible: `src/components/brand.tsx`, `src/lib/site.ts`, existing Tailwind conventions.

---

## 11. Proposed technical architecture

### 11.1 Existing app constraints

Current repository:

- Next.js `16.2.4`.
- React `19.2.4`.
- TypeScript.
- Tailwind CSS v4.
- Minimal dependencies; existing app is mostly marketing pages and local lead-magnet components.

Codex must read Next.js 16 docs under `node_modules/next/dist/docs/` before implementing route handlers, server actions, metadata, or app-router patterns.

### 11.2 MVP architecture phases

#### Phase 0 — PRD and prototype-only UI

- Add routes and components using typed mock data.
- No auth, no real upload persistence, no external notifications.
- Store no client secrets/documents.
- Purpose: validate portal UX and feature scope.

#### Phase 1 — Auth and persistent data

Candidate options to decide later:

- Auth: Clerk, Auth.js, Microsoft Entra ID, or Whiteford-approved SSO.
- DB: Supabase Postgres, Neon/Postgres, or firm-approved database.
- Storage: Supabase Storage, S3, Azure Blob, or firm DMS integration.

Phase 1 should require explicit architecture approval before coding.

#### Phase 2 — Approved document storage and scanning

- Secure object storage.
- Malware scanning workflow.
- Signed URLs.
- Audit logs.
- Retention/deletion policy.

#### Phase 3 — Calendar / scheduling integration

- Microsoft 365 / Outlook / Teams or firm-approved scheduling provider.
- No confidential details in invite titles/descriptions unless approved.
- Attorney opt-in per calendar.

#### Phase 4 — System-of-record sync

- Clio / DMS / CRM sync only after firm approval.
- Explicit no-mutation dry run before any live sync.

### 11.3 Recommended MVP file layout

Codex should start with these files:

```text
src/app/client-portal/page.tsx
src/app/portal/page.tsx
src/app/portal/messages/page.tsx
src/app/portal/messages/new/page.tsx
src/app/portal/documents/page.tsx
src/app/portal/documents/upload/page.tsx
src/app/portal/schedule/page.tsx
src/app/portal/schedule/new/page.tsx
src/app/portal/onboarding/page.tsx
src/app/portal/agenda/page.tsx
src/app/portal/attorneys/page.tsx
src/components/portal/portal-shell.tsx
src/components/portal/portal-dashboard.tsx
src/components/portal/tag-selector.tsx
src/components/portal/attorney-tag-guide.tsx
src/components/portal/conversation-composer.tsx
src/components/portal/document-upload-panel.tsx
src/components/portal/scheduling-request-form.tsx
src/components/portal/onboarding-assistant.tsx
src/components/portal/monthly-agenda-board.tsx
src/components/portal/guardrail-callout.tsx
src/lib/portal/types.ts
src/lib/portal/attorneys.ts
src/lib/portal/tags.ts
src/lib/portal/mock-data.ts
src/lib/portal/routing.ts
```

Keep prototype state simple and typed. Prefer server components for static/mock views unless interactivity requires client components.

---

## 12. Data model for production planning

### 12.1 Core entities

```ts
type PortalOrganization = {
  id: string;
  name: string;
  status: "prospect" | "conflicts-pending" | "engaged" | "paused" | "closed";
  primaryContactUserId: string;
  relationshipAttorneyId: string;
  createdAt: string;
  updatedAt: string;
};

type PortalUser = {
  id: string;
  organizationId?: string;
  email: string;
  displayName: string;
  role: "client-owner" | "client-contributor" | "attorney" | "relationship-attorney" | "admin";
  status: "invited" | "active" | "disabled";
};

type PortalMatterWorkspace = {
  id: string;
  organizationId: string;
  name: string;
  status: "conflicts-pending" | "engaged" | "paused" | "closed";
  engagementScopeSummary: string;
  relationshipAttorneyId: string;
};

type PortalThread = {
  id: string;
  organizationId: string;
  workspaceId: string;
  subject: string;
  status: "draft" | "open" | "awaiting-client" | "awaiting-attorney" | "assigned" | "scheduled" | "resolved" | "archived" | "out-of-scope";
  urgency: "normal" | "monthly-call" | "prompt-triage" | "time-sensitive";
  issueTags: string[];
  lawyerTags: string[];
  assignedAttorneyIds: string[];
  createdByUserId: string;
  createdAt: string;
  updatedAt: string;
};

type PortalMessage = {
  id: string;
  threadId: string;
  authorUserId: string;
  body: string;
  issueTags: string[];
  lawyerTags: string[];
  linkedDocumentIds: string[];
  createdAt: string;
};

type PortalDocument = {
  id: string;
  organizationId: string;
  workspaceId: string;
  originalFilename: string;
  displayFilename: string;
  mimeType: string;
  sizeBytes: number;
  checksumSha256: string;
  storageProvider: "mock" | "supabase" | "s3" | "azure" | "firm-dms";
  storageKey: string;
  status: "uploading" | "scan-pending" | "available" | "quarantined" | "restricted" | "deleted";
  issueTags: string[];
  lawyerTags: string[];
  uploadedByUserId: string;
  uploadedAt: string;
};

type PortalMeetingRequest = {
  id: string;
  organizationId: string;
  workspaceId: string;
  requestedAttorneyIds: string[];
  issueTags: string[];
  lawyerTags: string[];
  purpose: string;
  preferredWindows: { startsAt: string; endsAt: string; timezone: string }[];
  durationMinutes: 15 | 30 | 45 | 60 | 90;
  status: "draft" | "requested" | "under-review" | "proposed-times" | "booked" | "declined" | "canceled" | "completed";
  linkedThreadIds: string[];
  linkedDocumentIds: string[];
  createdByUserId: string;
  createdAt: string;
  updatedAt: string;
};

type PortalAuditEvent = {
  id: string;
  organizationId: string;
  actorUserId: string;
  action: string;
  entityType: string;
  entityId: string;
  metadata: Record<string, unknown>;
  createdAt: string;
};
```

---

## 13. API / server-action planning

Do not implement live production endpoints until data architecture is approved. When approved, likely route handlers/server actions:

- `GET /api/portal/session` — current user, org, roles, feature flags.
- `GET /api/portal/threads` — list/filter threads.
- `POST /api/portal/threads` — create thread.
- `POST /api/portal/threads/:id/messages` — add reply.
- `GET /api/portal/documents` — list documents.
- `POST /api/portal/documents/presign` — create signed upload URL.
- `POST /api/portal/documents/:id/complete` — mark uploaded; enqueue scan.
- `GET /api/portal/meeting-requests` — list meeting requests.
- `POST /api/portal/meeting-requests` — create meeting request.
- `PATCH /api/portal/meeting-requests/:id` — internal status updates.
- `GET /api/portal/tags` — issue/lawyer tag taxonomy.
- `POST /api/portal/audit-events` — internal-only audit append, or automatic server-side logging.

Security default: every handler must verify authenticated user, organization access, workspace access, and role permission before returning any data.

---

## 14. Acceptance criteria

### 14.1 Prototype acceptance criteria

- `/client-portal` renders without errors and explains the portal value proposition and caveats.
- `/portal` renders dashboard with mock client, thread, document, meeting, and attorney data.
- User can navigate among dashboard, messages, documents, schedule, agenda, and attorneys pages.
- New conversation UI supports issue tags, lawyer tags, urgency, message body, linked documents, and guardrail acknowledgment.
- Document upload UI presents required metadata and safety caveats without storing real files.
- Scheduling UI creates or previews request-only meeting data without sending invites.
- Attorney guide displays every attorney seed record and its predefined hashtag.
- Tag selector prevents arbitrary tags.
- Build and lint pass.

### 14.2 Production acceptance criteria before real client use

- Firm-approved auth is integrated.
- Role and matter-level access control tested.
- Secure document storage and malware scanning are integrated.
- No confidential content leaks into logs, analytics, email previews, or client-side fixtures.
- Audit logs capture all critical events.
- Retention/deletion policy is documented.
- Conflicts/engagement gate is implemented.
- Whiteford approves attorney roster, bio references, disclaimers, and scheduling posture.
- Security/privacy review is complete.

---

## 15. Codex implementation plan

> **For Hermes/Codex:** Implement this plan task-by-task. Keep commits small. Read Next.js 16 docs before route/component changes. Do not add auth/storage/calendar dependencies until Jeff approves architecture.

### Task 1: Add typed portal data model and tag taxonomy

**Objective:** Create compile-safe seed data for attorneys, issue tags, and mock portal records.

**Files:**

- Create: `src/lib/portal/types.ts`
- Create: `src/lib/portal/attorneys.ts`
- Create: `src/lib/portal/tags.ts`
- Create: `src/lib/portal/routing.ts`
- Create: `src/lib/portal/mock-data.ts`

**Implementation notes:**

- Use the attorney and issue tag lists from this PRD.
- Add helper `suggestAttorneysForIssueTags(issueTags: string[]): PortalAttorney[]`.
- Add helper `getTagBySlug(slug: string)`.
- Mark every attorney seed record `isDraftRoster: true` and `availabilityMode: "request-only"`.

**Verification:**

```bash
npm run lint
npm run build
```

Expected: both pass.

### Task 2: Create shared portal UI components

**Objective:** Build reusable, non-persistent UI pieces.

**Files:**

- Create: `src/components/portal/portal-shell.tsx`
- Create: `src/components/portal/guardrail-callout.tsx`
- Create: `src/components/portal/tag-selector.tsx`
- Create: `src/components/portal/attorney-tag-guide.tsx`

**Implementation notes:**

- Use existing Tailwind setup.
- `PortalShell` should provide side nav and top context bar.
- `GuardrailCallout` should support variants: info, warning, urgent.
- `TagSelector` should accept predefined tags only.
- `AttorneyTagGuide` should display the lawyer hashtag roster with caveats.

**Verification:**

```bash
npm run lint
npm run build
```

Expected: both pass.

### Task 3: Add public client portal landing route

**Objective:** Explain the portal, package fit, and approval-only posture.

**Files:**

- Create: `src/app/client-portal/page.tsx`

**Sections:**

- Hero: “A legal operating portal for technology companies.”
- Value cards: chat, documents, hashtags, scheduling, monthly legal plan.
- How it works.
- Safety/ethics caveats.
- CTA: “Approved clients sign in” / “Talk with Jeff about the OGC package.”

**Verification:**

```bash
npm run lint
npm run build
```

Expected: route builds successfully.

### Task 4: Add authenticated portal shell pages using mock state

**Objective:** Create navigable prototype pages.

**Files:**

- Create: `src/app/portal/page.tsx`
- Create: `src/app/portal/messages/page.tsx`
- Create: `src/app/portal/documents/page.tsx`
- Create: `src/app/portal/schedule/page.tsx`
- Create: `src/app/portal/agenda/page.tsx`
- Create: `src/app/portal/attorneys/page.tsx`
- Create: `src/components/portal/portal-dashboard.tsx`
- Create: `src/components/portal/monthly-agenda-board.tsx`

**Implementation notes:**

- Use mock engaged client and mock threads/documents/meeting requests.
- Add “Prototype only — no live messages, uploads, or calendar invites” banner.
- Keep all data local and static.

**Verification:**

```bash
npm run lint
npm run build
```

Expected: all routes build successfully.

### Task 5: Add new conversation composer prototype

**Objective:** Build the tagged chat intake form without persistence.

**Files:**

- Create: `src/app/portal/messages/new/page.tsx`
- Create: `src/components/portal/conversation-composer.tsx`

**Implementation notes:**

- This component will likely need `"use client"` for form state.
- Use issue tags and lawyer tags from taxonomy.
- Show suggested attorney tags after issue tag selection.
- Require acknowledgment when urgency is `time-sensitive` or tag is `#urgent-triage`.
- On submit, show local preview/success state only; no network call.

**Verification:**

```bash
npm run lint
npm run build
```

Expected: pass.

### Task 6: Add document upload prototype

**Objective:** Build metadata and simulated upload workflow without real file persistence.

**Files:**

- Create: `src/app/portal/documents/upload/page.tsx`
- Create: `src/components/portal/document-upload-panel.tsx`

**Implementation notes:**

- This component likely needs `"use client"`.
- Accept file selection but do not upload or persist files.
- Display simulated file metadata and `scan-pending` / `available` statuses.
- Prominently state that production requires approved secure storage and malware scanning.

**Verification:**

```bash
npm run lint
npm run build
```

Expected: pass.

### Task 7: Add scheduling request prototype

**Objective:** Build request-only scheduling form without calendar side effects.

**Files:**

- Create: `src/app/portal/schedule/new/page.tsx`
- Create: `src/components/portal/scheduling-request-form.tsx`

**Implementation notes:**

- Select attorneys, tags, duration, preferred windows, linked docs/threads.
- Show “request-only” status for every attorney.
- On submit, show local preview/success state only; do not send email/invites.

**Verification:**

```bash
npm run lint
npm run build
```

Expected: pass.

### Task 8: Add AI-agent-assisted onboarding prototype

**Objective:** Build a deterministic onboarding assistant for new clients, existing clients, and new matters without live AI calls or legal advice.

**Files:**

- Create: `src/app/portal/onboarding/page.tsx`
- Create: `src/components/portal/onboarding-assistant.tsx`
- Modify: `src/lib/portal/types.ts`
- Modify: `src/lib/portal/mock-data.ts`

**Implementation notes:**

- This component likely needs `"use client"`.
- Provide three paths: new client, existing client, new matter for existing client.
- Ask structured questions about company, users, issue lanes, documents, deadlines, stakeholder sensitivity, and desired meeting.
- Suggest predefined issue tags and likely lawyer tags, including `#slaven-jesic` for AI compliance / AI policy and `#jeff-schell` for AI/IP coordination.
- Generate a draft checklist for attorney review only.
- Include clear caveats: no legal advice, no conflict clearance, no matter acceptance, no autonomous attorney assignment, no live AI model in MVP.

**Verification:**

```bash
npm run lint
npm run build
```

Expected: pass.

### Task 9: Add tests / static guardrails

**Objective:** Protect against accidental production-like claims or unsafe persistence.

**Files:**

- Create: `tests/verify_client_portal_static_guardrails.mjs`
- Modify: `package.json`

**Test ideas:**

- Verify portal pages contain no attorney-client relationship guarantee.
- Verify upload route contains no real storage provider instructions in UI.
- Verify scheduling route contains “request” posture, not “book guaranteed.”
- Verify all attorney seed records have `isDraftRoster: true`.
- Verify tags are predefined.

**Package script:**

```json
"test:portal-static": "node tests/verify_client_portal_static_guardrails.mjs"
```

**Verification:**

```bash
npm run test:portal-static
npm run lint
npm run build
```

Expected: all pass.

---

## 16. Open decisions for Jeff / Whiteford

- Should the portal be part of `whiteford-ai-law-pages`, or a separate private app/repo?
- Which clients should be allowed into the first controlled pilot?
- Which identity provider and email domains should be permitted?
- Which attorney roster is approved for display?
- Should lawyer tags be visible to clients or only issue tags visible externally?
- Should scheduling be request-only forever, or integrated with approved calendars?
- Which document storage/DMS is approved?
- Is any AI summarization/document analysis permitted? If yes, under what data boundaries?
- What language does Whiteford require for privilege, confidentiality, engagement scope, emergency use, and attorney advertising?

---

## 17. Success metrics

Prototype metrics:

- Jeff can demo the portal in under 5 minutes.
- Client can identify correct place to ask a legal question, upload docs, and request time without instructions.
- All lawyer and issue tags display clearly.
- Static guardrail tests pass.

Pilot metrics, after approval:

- Time from client issue to internal routing decreases.
- Fewer unstructured email threads for OGC clients.
- Monthly GC calls have clearer agendas and linked documents.
- Attorney routing requests are easier to review and accept/decline.
- No unauthorized external sends, calendar invites, document exposures, or client data leaks.

---

## 18. Recommended first build scope

Build **Phase 0 only** first:

1. Public `/client-portal` page.
2. Mock authenticated `/portal` dashboard.
3. Attorney/tag guide.
4. New conversation prototype.
5. Simulated document upload prototype.
6. Request-only scheduling prototype.
7. Monthly agenda prototype.
8. Static guardrail tests.

This gives Jeff a concrete UX demo for deciding architecture, security, Whiteford approval, and integrations before any real client data or attorney notifications are involved.
