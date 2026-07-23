# Phase 0 OGC client portal prototype launch-gate review

Date: 2026-05-13
Reviewer task: t_86be9c8a
Implementation parent: t_04d0c3ac
Verdict: PASS for private/internal Phase 0 prototype review only

Important limit: this PASS is not firm approval, launch approval, production approval, client-facing approval, public deployment approval, or approval to connect auth, storage, calendar, email, attorney notifications, HighLevel/CRM, Supabase, Clio, DMS, AI analysis, or any other live system.

## Reviewed inputs

- PRD: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/prds/2026-05-13_client_portal_lawyer_chat_documents_scheduling_prd.md`
- Offer draft: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/offers/2026-05-13_whiteford_tech_company_ogc_ai_compliance_package.md`
- Parent implementation note: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/client-portal/2026-05-13_phase_0_mock_ogc_client_portal_implementation_note.md`
- Routes/components/data under:
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

Build output confirmed these Phase 0 portal routes prerendered as static content:

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

The only dynamic route listed by the build was the pre-existing `/api/leads`; the reviewed portal components do not call it.

## Launch-gate checklist

### 1. Phase 0 / mock-only posture

Status: PASS.

Evidence reviewed:

- `src/components/portal/conversation-composer.tsx` uses local React state only, prevents default form submission, and displays “Preview mock thread — no network call” plus “No live messages, notifications, CRM records, or attorney assignments were created.”
- `src/components/portal/document-upload-panel.tsx` uses a browser file picker only to read the selected file name into local state; it prevents default form submission and displays “No upload, persistence, virus scan, or external storage occurs.”
- `src/components/portal/scheduling-request-form.tsx` prevents default form submission and displays “No calendar invite, no booking guarantee, no attorney notification.”
- `src/components/portal/onboarding-assistant.tsx` states that no live AI model, legal advice, conflict clearance, matter acceptance, autonomous attorney assignment, or client data storage occurs.
- `src/lib/portal/mock-data.ts` keeps document `storageProvider` typed as `"mock"` and uses mock document metadata only.
- `src/lib/portal/attorneys.ts` sets every attorney record to `availabilityMode: "request-only"` and `isDraftRoster: true`.
- Search review found no portal-component `fetch`, Supabase, HighLevel, Clio, DMS, email, SMS, notification, calendar invite, localStorage, or sessionStorage implementation.

### 2. Auth / storage / notification / live-system mutations

Status: PASS.

No auth integration was added. The `/client-portal` CTA says “Approved-client prototype sign in,” but it links to the mock `/portal` route and the shared UI caveats state no auth integration. No real file persistence, calendar/email/attorney notification, CRM/HighLevel mutation, Supabase mutation, Clio/DMS mutation, or external deployment action was found in the portal implementation.

### 3. Legal-marketing and professional-responsibility posture

Status: PASS.

The shared `GuardrailCallout` contains the PRD §9.1 guardrail:

> This portal is for approved Whiteford/Schell IP client communication and matter coordination. Portal use does not create a new attorney-client relationship, expand an existing engagement, or confirm that a lawyer is available for a specific matter. Do not submit confidential or time-sensitive information unless your engagement and conflicts procedures authorize portal use for that matter. Portal messages are not an emergency channel.

Additional context-specific caveats are present:

- Upload screen: do not upload confidential or sensitive documents until engagement/conflicts clearance and portal authorization are confirmed.
- Scheduling screen: meeting request is not accepted until confirmed by Whiteford; no invite/email/Teams/external notification.
- Lawyer tags: routing metadata only; no notification, review, assignment, availability, or representation guarantee.
- Onboarding: deterministic prototype only; no live AI model, legal advice, conflict clearance, matter acceptance, autonomous attorney assignment, or client data storage.

No reviewed portal text promises legal outcomes, guaranteed lawyer response, automatic attorney assignment, compliance certification, emergency response, or engagement expansion.

### 4. Privacy and security posture

Status: PASS.

- No secrets, API keys, tokens, or environment variable use were found in the portal implementation files reviewed.
- Mock user emails use `.example` / `.example.test` style addresses.
- Mock documents are represented as metadata rows; no real client documents were found in the portal files.
- No localStorage/sessionStorage document persistence was found.
- The file picker reads a local file name for preview only and performs no upload or persistence. This is acceptable for the Phase 0 internal prototype, but should be removed or replaced with a non-file-control mock if the prototype is ever shown outside a controlled internal review context.

### 5. Attorney seed data currentness and HighLevel reconciliation

Status: PASS with non-blocking note.

The source-currentness/current-roster caveat is explicit in the PRD and offer draft, and the implementation note says attorney names and capabilities must be reconciled before production. In the prototype itself, the dashboard says the attorney bench consists of draft roster records and is request-only until Whiteford approves availability, conflicts, engagement scope, and calendar policy.

Non-blocking improvement before any broader demo: add a visible caveat on `/portal/attorneys` stating that attorney names/practice signals are internal draft seed data and must be reconciled with current Whiteford availability, conflicts, engagement scope, and Jeff’s HighLevel/referral-list before any production or client-facing use. This is not a Phase 0 internal-review blocker because the implementation and source docs preserve the reconciliation gate.

### 6. Routes/components render

Status: PASS.

`npm run test:portal-static`, `npm run lint`, and `npm run build` all passed. The build listed all reviewed portal routes as static prerendered content.

## Findings

No blocking launch-gate safety defects found for private/internal Phase 0 prototype review.

Non-blocking improvements before any broader demo or Phase 1 planning:

1. Add the HighLevel/referral-list reconciliation caveat visibly to `/portal/attorneys`, not only in source docs.
2. Consider replacing the real browser file picker with a pure text/mock filename selector if the prototype will be shown to anyone who might accidentally select a sensitive local file. The current implementation does not upload or persist the file, but a non-file-control mock would reduce perceived upload risk.
3. If the `/client-portal` route is ever exposed outside local/internal review, rename “prototype sign in” to “open mock portal” or add an adjacent note that no authentication occurs.

## Final verdict

PASS for private/internal Phase 0 prototype review only.

Held actions: no launch, no client-facing use, no public deployment, no auth, no real document storage, no calendar/email/attorney notification, no AI analysis, no CRM/HighLevel/Supabase/Clio/DMS mutation, no workflow/send/social/public action, and no production integration are approved by this review.
