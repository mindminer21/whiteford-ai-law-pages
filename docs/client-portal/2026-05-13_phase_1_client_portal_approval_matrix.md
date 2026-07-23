# Phase 1 OGC client portal approval matrix

Date: 2026-05-13  
Task: t_40557aa3  
Status: Internal Jeff/Whiteford decision prep only  
Scope: Convert the Phase 0 private/internal PASS into Phase 1 approval gates for architecture discussion. This matrix does not approve production coding, client-facing use, public deployment, auth, storage, notifications, AI analysis, CRM/HighLevel/Supabase/Clio/DMS mutation, calendar records, real client documents, or any workflow activation.

## Source basis

- Phase 0 implementation note: `docs/client-portal/2026-05-13_phase_0_mock_ogc_client_portal_implementation_note.md`
- Phase 0 PASS review: `docs/reviews/2026-05-13_client_portal_phase0_review.md`
- PRD: `docs/prds/2026-05-13_client_portal_lawyer_chat_documents_scheduling_prd.md`
- Offer draft: `docs/offers/2026-05-13_whiteford_tech_company_ogc_ai_compliance_package.md`

## Phase 0 PASS converted to Phase 1 rule

Phase 0 passed only because it stayed static, local, mock-only, and caveated. Phase 1 may proceed only as an internal architecture package unless Jeff/Whiteford separately approve each live-system lane below. The next artifact should continue to solve one narrow diagnostic/coordination problem completely: help an engaged tech-company client organize a legal question, related documents, attorney-routing metadata, and requested meeting context before any consultation or cross-sell expansion.

Default decision posture: HOLD all live/client-facing changes until the named owner approves the exact artifact and prohibited actions remain blocked.

## Approval matrix

| Phase 1 area | Decision owner | Exact approval needed | Minimum architecture artifact | Safe local prototype work allowed before approval | Prohibited action before approval |
|---|---|---|---|---|---|
| Auth | Jeff + Whiteford IT/security + firm-approved identity owner | Choose approved identity provider, allowed domains/users, MFA/session rules, role model, and whether the app may contain an authenticated route at all. | Auth architecture memo with provider comparison, user/role matrix, session lifecycle, invite/deprovisioning flow, threat model, and no-secrets handling plan. | Mock session objects, static role labels, non-authenticated local route guards, and UI copy saying no real authentication exists. | Connecting Clerk/Auth.js/Entra/SSO, creating users, issuing invites, storing tokens, adding production auth middleware, or exposing an auth-like route externally. |
| Client identity | Jeff + relationship attorney + conflicts/intake owner | Define which organizations, matters, workspaces, and user roles may exist; decide whether portal access requires engaged-client status, conflicts clearance, and matter-scope authorization. | Client/matter identity map with statuses (`prospect`, `conflicts-pending`, `engaged`, `paused`, `closed`), RBAC matrix, workspace lifecycle, and sample non-PII fixtures. | Typed mock organizations/users/matters with `.example` emails and local-only status badges. | Creating real client records, importing HighLevel contacts, storing PII, using actual client emails, or implying conflicts clearance/matter acceptance. |
| Document storage | Jeff + Whiteford records/DMS owner + IT/security/privacy | Decide approved system of record and whether object storage is permitted; approve encryption, signed URL, malware scan, file-size/type, retention, and access rules. | Document-storage architecture packet with DMS/Supabase/S3/Azure/firm-storage comparison, data-flow diagram, virus-scan path, access-control matrix, retention/deletion hooks, and incident/escalation plan. | Simulated document metadata, fake filenames, non-file-control mock selector, local UI statuses, and storage provider value `mock`. | Uploading/persisting files, reading document contents, writing to local filesystem/git/browser storage, generating signed URLs, integrating DMS/S3/Supabase/Azure, or using real client documents. |
| Message intake | Jeff + relationship attorney + professional-responsibility reviewer | Approve when a message may be accepted, who can see it, acknowledgment language, emergency/time-sensitive handling, and whether message creation is tied to a matter/workspace. | Message-intake flow spec with statuses, required fields, acknowledgment gates, triage queue fields, audit events, and copy deck for disclaimers. | Local React state previews, mock thread data, deterministic validation, and UI copy showing no network call or attorney notification. | Persisting messages, emailing attorneys/clients, accepting confidential/time-sensitive information, creating records in a live backend, or promising attorney response. |
| Attorney routing metadata | Jeff + Whiteford practice/relationship attorney owner + roster/currentness owner | Approve lawyer-tag taxonomy, current roster, client-visible vs internal-only tag visibility, routing-status terms, and attorney opt-in/availability posture. | Roster reconciliation sheet, lawyer/issue tag taxonomy, routing-status state machine, visibility matrix, and copy for “routing request only.” | Draft attorney seed data, issue-tag suggestions, mock routing statuses, and request-only display. | Notifying attorneys, assigning matters, showing unreconciled roster publicly, implying availability/representation, or mutating HighLevel/referral records. |
| Scheduling requests | Jeff + Whiteford calendar/IT owner + affected attorneys | Approve request-only vs booking flow, permitted calendar system, attorney opt-in, invite content rules, time-zone handling, and no-confidential-details policy. | Scheduling architecture memo with provider choice, status model, calendar data map, invite-content policy, attorney opt-in record, and failure/decline flow. | Static/request-only form, mock preferred windows, local preview status, and caveats that no meeting is booked until confirmed. | Creating calendar events/invites, sending Teams/Outlook/Calendly/Cal.com links, exposing live availability, notifying attorneys, or guaranteeing booking. |
| AI analysis | Jeff + Whiteford AI/privacy/security/professional-responsibility reviewers | Decide whether any AI may process intake, messages, metadata, or documents; approve model/provider, data boundaries, logging, retention, human-review workflow, opt-in, and output caveats. | AI data-boundary and model-risk packet with use cases, non-use cases, data-classification table, prompt/output logging policy, human-review gate, evaluation plan, and copy for “not legal advice.” | Deterministic checklist/onboarding prototype using hard-coded prompts, no model calls, no document analysis, and attorney-review-only generated checklist labels. | Calling LLM APIs, uploading documents/messages to AI tools, producing legal recommendations, claiming conflicts clearance/matter acceptance, autonomous routing, or client-visible AI analysis. |
| HighLevel/CRM | Jeff + CRM admin + consent/legal-marketing reviewer | Approve whether portal data can create/update contacts/opportunities/tags, consent basis, suppression checks, field map, and dry-run evidence. | CRM integration plan with read/write scopes, field/tag map, consent/suppression rules, dry-run/no-op report format, rollback plan, and audit mapping. | Static suggested fields/tags in docs, local UI labels, and no-op planning notes. | Mutating HighLevel/CRM, applying tags, enrolling workflows, importing researched prospects, sending messages, or using portal activity for marketing without approved consent. |
| Supabase / Clio / DMS | Jeff + Whiteford IT/security + records/DMS/Clio owner | Decide approved backend/system-of-record boundaries, schema ownership, RLS/access model, sync vs source-of-truth, and dry-run/rollback requirements. | System-of-record architecture diagram, data dictionary, RLS matrix, sync/mutation map, migration plan, dry-run plan, backup/rollback plan, and ownership table. | Local TypeScript interfaces, mock data, schema sketches, and non-executing SQL drafts marked “not approved.” | Running migrations, creating tables/buckets, writing to Supabase/Clio/DMS, syncing records, backfilling data, storing real matter/client content, or treating a secondary database as source-of-truth. |
| Notifications | Jeff + Whiteford communications/IT + attorney recipients | Approve recipient classes, channels, digest vs immediate policy, confidential-content suppression, opt-in/opt-out, and escalation rules. | Notification policy and event matrix with recipient/channel rules, copy templates, redaction rules, quiet hours, audit events, and test/no-op evidence. | UI states such as “notification pending/not connected,” static notification preference mockups, and no-op logs. | Sending email/SMS/Teams/Slack/push, notifying attorneys/clients, triggering HighLevel workflows, including confidential content in previews, or enabling background jobs. |
| Retention / logging | Jeff + Whiteford records/privacy/security | Approve what events are logged, where logs live, retention/deletion policy, privilege/confidentiality treatment, analytics boundaries, and export requirements. | Audit/retention architecture with event taxonomy, retention schedule, deletion workflow, analytics/log redaction rules, access controls, and sample audit export. | Mock audit-event rows and local-only status history with fake IDs and no real content. | Logging real PII/confidential content, enabling analytics/telemetry with client data, creating immutable records without records approval, or deleting/retaining records outside policy. |
| Conflicts / intake | Jeff + Whiteford conflicts/intake/professional-responsibility owner | Approve conflict-check workflow, new-client vs existing-client vs new-matter paths, matter acceptance language, stop rules, and who may clear portal use. | Intake/conflicts gate spec with status transitions, required questions, clearance authority, escalation/decline path, and copy for no acceptance/no advice. | Deterministic onboarding checklist prototype, mock statuses, and local-only “attorney review required” outputs. | Saying conflicts are cleared, accepting a matter, opening a live matter, requesting confidential facts from prospects, routing to attorneys as accepted work, or expanding engagement scope. |
| Privacy / security | Jeff + Whiteford privacy/security/IT | Approve threat model, data classification, access controls, encryption, rate limiting, CSRF/XSS/file safety, secrets handling, incident response, and security-review gate. | Security/privacy review packet with data inventory, threat model, STRIDE-style risks, controls checklist, dependency review, environment/secrets plan, and penetration/accessibility review scope. | Static guardrail tests, mock UI, dependency-free planning docs, and local-only code review notes. | Deploying public routes, handling real client data, adding secrets/API keys, bypassing security review, exposing admin views, or shipping production endpoints. |
| Client-facing disclaimers | Jeff + Whiteford professional-responsibility/legal-marketing reviewer | Approve final wording for no attorney-client relationship expansion, no emergency use, no legal advice by AI/prototype, no availability guarantee, confidentiality limits, and approved-client-only posture. | Disclaimers/copy approval deck with exact UI placement, copy variants by workflow, reviewer sign-off line, and screenshot map. | Reusing PRD §9.1 language in local/private prototype and adding stronger internal-only caveats. | Publishing client-facing copy, implying legal advice/availability/compliance certification, weakening emergency/confidentiality warnings, or using copy in ads/email/social/proposals without review. |

## Minimum Phase 1 architecture packet before any live work

Before any specialist implementation task is allowed to connect a live service, create a single Phase 1 architecture packet containing:

1. System context diagram: browser, Next.js app, auth provider, backend/database, storage/DMS, CRM/HighLevel, Clio/DMS, calendar, notification service, AI provider, audit/retention store.
2. Data classification table: no-data/mock, metadata, PII, confidential client content, attorney work product, privileged/conflicts-sensitive material, marketing-consent data.
3. Entity and permission model: organizations, users, roles, matters/workspaces, threads, messages, documents, meeting requests, lawyer tags, audit events.
4. Approval table matching the rows above with named reviewer, approval date, exact scope, and expiry/revisit date.
5. Dry-run/no-op testing plan proving no external sends, no CRM mutation, no calendar creation, no storage writes, and no AI calls until expressly enabled.
6. Reversion/kill-switch plan for each integration.
7. Final disclaimer/copy deck with professional-responsibility sign-off.

## Safe Phase 1 sequencing recommendation

1. Keep Phase 0 demo local and static.
2. Address the Phase 0 review’s non-blocking improvements before any wider demo:
   - add visible attorney-roster/currentness caveat to `/portal/attorneys`;
   - consider replacing the real file picker with a pure mock filename selector;
   - rename or caveat “prototype sign in” if `/client-portal` is ever exposed beyond local/internal review.
3. Draft the architecture packet above without credentials, migrations, workflow activations, or external API calls.
4. Hold implementation until Jeff chooses one of the checklist options below.

## One-screen Jeff decision checklist

Decision: Phase 1 OGC client portal next step

[ ] HOLD
- Keep Phase 0 as private/internal local prototype only.
- Do not assign any integration, auth, storage, CRM, AI, calendar, notification, Supabase, Clio, DMS, or public/client-facing work.
- Use the prototype only for internal UX/scoping discussion.

[ ] APPROVE INTERNAL ARCHITECTURE ONLY
- Approve creation of a Phase 1 architecture packet covering the matrix above.
- No credentials, no live accounts, no migrations, no external API calls, no client data, no CRM/HighLevel/Supabase/Clio/DMS/calendar/storage writes, no notifications, no AI analysis, and no deployment/public exposure.
- Deliverable should be a reviewable internal document/diagram set with exact approval boxes for later specialist work.

[ ] REQUEST REVISIONS
- Return this matrix for changes before any Phase 1 architecture packet is drafted.
- Revisions needed:
  - [ ] Owner names need to be more specific.
  - [ ] Add/remove approval areas.
  - [ ] Tighten prohibited actions.
  - [ ] Change sequencing or business objective.
  - [ ] Other: ______________________________

Jeff initial/date: ______________________________

## Explicit non-authorization

This matrix does not authorize launch, public/client-facing use, deployment, auth setup, storage setup, calendar setup, HighLevel/CRM mutation, Supabase/Clio/DMS mutation, notifications, AI calls, attorney assignments, conflicts clearance, matter acceptance, real client data storage, or engagement-scope expansion.
