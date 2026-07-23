# Phase 0 OGC portal prototype ethics/privacy/no-live-action review

Date: 2026-05-14
Reviewer task: t_8e61c28d
Implementation parent: t_6ac04f55
Foundation parent: t_c534ccd4
Verdict: NEEDS REVISION before Jeff/Whiteford demo or further build step

Important limit: this review does not approve launch, public deployment, client/prospect-facing use, firm approval, production approval, authentication, real document storage, calendar/email/attorney notifications, AI analysis, HighLevel/CRM mutation, Supabase/Clio/DMS mutation, social/ads action, or any other live external action.

## Reviewed inputs

- PRD: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/prds/2026-05-13_client_portal_lawyer_chat_documents_scheduling_prd.md`
- Foundation implementation note: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/client-portal/2026-05-14_phase_0_portal_foundation_implementation_note.md`
- Static routes implementation note: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/client-portal/2026-05-14_phase_0_portal_static_routes_implementation_note.md`
- Prior Phase 0 review: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/reviews/2026-05-13_client_portal_phase0_review.md`
- Source files under:
  - `src/app/client-portal/`
  - `src/app/portal/`
  - `src/components/portal/`
  - `src/lib/portal/`
- Static guardrail test: `tests/verify_client_portal_static_guardrails.mjs`

## Verification commands

Run from project root:

```bash
npm run test:portal-static && npm run lint && npm run build
```

Result: PASS.

Build output confirmed the Phase 0 portal routes prerendered as static content:

- `/client-portal`
- `/portal`
- `/portal/agenda`
- `/portal/attorneys`
- `/portal/documents`
- `/portal/documents/upload`
- `/portal/messages`
- `/portal/messages/new`
- `/portal/onboarding`
- `/portal/schedule`
- `/portal/schedule/new`

The only dynamic route listed by the build was the pre-existing `/api/leads`. The reviewed portal components do not call it.

## Review checklist

### 1. Internal/prototype-only posture

Status: PASS.

Evidence:

- `src/app/client-portal/page.tsx` labels the entry as `Internal Phase 0 prototype · approved clients only` and states: `Prototype only — no live messages, uploads, calendar invites, external notifications, auth integration, CRM mutation, or document persistence. Do not submit confidential information.`
- `src/components/portal/portal-shell.tsx` displays the shared prototype caveat on all `/portal/*` pages and uses local `next/link` navigation only.
- `src/components/portal/guardrail-callout.tsx` includes the PRD §9.1 guardrail: no new attorney-client relationship, no engagement expansion, no lawyer availability confirmation, no confidential/time-sensitive submissions unless authorized, and no emergency-channel use.

### 2. No live side effects / external mutation

Status: PASS.

Evidence:

- `ConversationComposer`, `DocumentUploadPanel`, and `SchedulingRequestForm` use local React state, call `event.preventDefault()`, and render local preview/success states only.
- Search of the reviewed portal directories found no portal-specific `fetch(`, `axios`, Supabase, HighLevel, Clio, DMS, NetDocuments/iManage, `localStorage`, `sessionStorage`, `navigator.sendBeacon`, `XMLHttpRequest`, `indexedDB`, `mailto:`, or `sms:` implementation.
- Existing non-portal lead-magnet components still call `/api/leads`, but they are outside this review's Phase 0 portal scope and the build keeps `/api/leads` as the only dynamic route.

### 3. Chat/legal-question prototype

Status: PASS.

Evidence:

- `src/components/portal/conversation-composer.tsx` uses predefined issue tags from `portalIssueTags`, suggests attorneys through typed routing, and states `No live messages are sent in this prototype`.
- The composer states no legal advice, no conflicts clearance, no matter acceptance, no autonomous attorney assignment, and no guaranteed response.
- Time-sensitive / urgent / board-investor-sensitive paths require an acknowledgment that the prototype does not create a new attorney-client relationship and is not an emergency channel.

### 4. Document upload/privacy prototype

Status: PASS for internal Phase 0 only, with one non-blocking UX caution retained.

Evidence:

- `src/components/portal/document-upload-panel.tsx` uses a browser file input only to place the local file name into React state and states `No upload, persistence, virus scan, or external storage occurs.`
- Submit shows `Mock queue status: scan-pending → available. No file persistence, no CRM/HighLevel mutation, and no attorney notification.`
- The required acknowledgment says production requires approved secure storage, malware scanning, access controls, and retention policy.

Non-blocking caution: if this prototype is ever shown outside controlled internal review, replacing the actual browser file picker with a pure text/mock filename field would reduce accidental sensitive-file-selection risk, even though the current component does not upload or persist files.

### 5. Scheduling prototype

Status: PASS.

Evidence:

- `src/components/portal/scheduling-request-form.tsx` states a meeting request is not accepted until confirmed by Whiteford.
- The form sends no calendar invite, email, Teams link, or external notification.
- The attorney selection labels display `request-only`, and the local success state says `No calendar invite, no booking guarantee, no attorney notification.`

### 6. AI/onboarding prototype

Status: PASS.

Evidence:

- `src/components/portal/onboarding-assistant.tsx` states no live AI model is enabled and no legal advice, conflicts clearance, matter acceptance, autonomous attorney assignment, guaranteed response, or client data storage occurs.
- The checklist is labeled `for attorney review only`.
- The assistant is deterministic UI state; no model/API call was found in reviewed portal files.

### 7. Attorney roster currentness / approval caveat

Status: NEEDS REVISION.

Evidence:

- Source data in `src/lib/portal/attorneys.ts` correctly sets every attorney record to `availabilityMode: "request-only"`, `isDraftRoster: true`, and an internal caveat that routing tags do not guarantee review, assignment, availability, or representation.
- The visible `/portal/attorneys` route currently renders `<PortalShell title="Draft attorney tag guide"><AttorneyTagGuide /></PortalShell>`.
- `src/components/portal/attorney-tag-guide.tsx` renders attorney name, hashtag, role summary, practice tags, and a `request-only` badge, but it does not render the source `attorney.caveat` or an equivalent visible currentness/reconciliation/approval caveat.
- The task PASS criteria specifically require: `Lawyer roster remains draft/request-only with currentness and approval caveats.` The visible UI satisfies draft/request-only in part, but not the currentness/reconciliation/approval caveat.

Required narrow fix before demo/further build:

Add a visible caveat on `/portal/attorneys` and/or `AttorneyTagGuide` stating that attorney names/practice signals are internal draft seed data and must be reconciled with current Whiteford availability, conflicts, engagement scope, attorney approval, and Jeff's HighLevel/referral-list before any production, client-facing, or broader demo use. Extend `tests/verify_client_portal_static_guardrails.mjs` so the visible roster-currentness/approval caveat is guarded.

Revision task created: t_bf81dac1.
Re-review task created: t_fc0096df.

## Final verdict

NEEDS REVISION before Jeff/Whiteford demo or further build step.

The reviewed implementation otherwise preserves the required no-live-action posture for internal/local Phase 0 review: no legal advice automation, no attorney-client relationship creation, no conflicts clearance, no matter acceptance, no real upload/storage, no calendar booking, no email send, no external notification, no CRM/HighLevel/Supabase/Clio/DMS mutation, no public publish, no social/ads action, and no client/prospect-facing authorization. The only blocking issue is the missing visible attorney roster currentness/reconciliation/approval caveat.

## Next action

Frontend-eng should complete task t_bf81dac1, then reviewer should complete re-review task t_fc0096df. Until that re-review passes, do not treat the Phase 0 OGC portal prototype as demo-ready, launch-ready, client-use-ready, or approved for live integrations.
