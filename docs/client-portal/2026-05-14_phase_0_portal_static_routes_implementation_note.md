# Phase 0 OGC portal static routes implementation note

Date: 2026-05-14
Task: t_6ac04f55
Status: Internal/local static prototype only

## Scope completed

Built the Phase 0 static/mock Whiteford Tech Company OGC Client Portal route set and shared UI prototype components on top of the existing typed portal foundation from task t_c534ccd4.

The prototype is intentionally narrow: it helps an approved tech-company client decide where an issue, document metadata record, meeting request, or monthly agenda item should be placed for attorney review. It does not ask for trust through launch claims or integrations; it earns trust by making the next legal operations step clearer while preserving explicit approval gates.

## Local route list

- `/client-portal` — public concept page for the Tech Company OGC / AI Compliance package, approved-client posture, and caveated CTA path to `/colorado-tech-general-counsel` plus local prototype sign-in.
- `/portal` — mock authenticated dashboard with fictional workspace, thread, document, meeting, agenda, and attorney summaries.
- `/portal/messages` — static thread list using local mock records.
- `/portal/messages/new` — local-only tagged conversation composer with predefined issue tags, optional draft attorney routing tags, linked mock documents, urgency acknowledgment, and preview-only success state.
- `/portal/documents` — static document metadata list.
- `/portal/documents/upload` — simulated upload metadata workflow; file selection is only read by the browser for local preview and no file is uploaded, saved, scanned, or persisted.
- `/portal/schedule` — request-only scheduling list using local mock meeting requests.
- `/portal/schedule/new` — local-only scheduling request form with request-only attorney metadata, preferred windows, linked mock threads/documents, and preview-only success state.
- `/portal/onboarding` — deterministic onboarding assistant for new clients, existing clients, and new matters for existing clients; no live AI model.
- `/portal/agenda` — monthly legal operating plan board using mock agenda items.
- `/portal/attorneys` — draft attorney/tag guide showing request-only routing metadata plus a visible currentness/reconciliation/approval caveat for the attorney roster.

## Shared components

- `src/components/portal/portal-shell.tsx`
- `src/components/portal/portal-dashboard.tsx`
- `src/components/portal/guardrail-callout.tsx`
- `src/components/portal/tag-selector.tsx`
- `src/components/portal/attorney-tag-guide.tsx`
- `src/components/portal/conversation-composer.tsx`
- `src/components/portal/document-upload-panel.tsx`
- `src/components/portal/scheduling-request-form.tsx`
- `src/components/portal/onboarding-assistant.tsx`
- `src/components/portal/monthly-agenda-board.tsx`

## No-live-action notes

This deliverable remains an internal/local Phase 0 prototype only. It does not authorize public launch, client/prospect-facing use, deployment, authentication, storage, calendar integration, email or notification sends, AI calls, attorney assignment, conflicts clearance, matter acceptance, HighLevel/CRM mutation, Supabase/Clio/DMS mutation, document persistence, or use with real client data.

The composer, upload, scheduling, onboarding, and attorney roster screens now include explicit caveats that the prototype provides no legal advice, no conflicts clearance, no matter acceptance, no autonomous attorney assignment, no guaranteed response, and no production/client-facing/broader-demo use of attorney roster seed data until reconciliation with current Whiteford availability, conflicts, engagement scope, attorney approval, and Jeff's HighLevel/referral-list. All success states are local React state only.

## Research context

- Read `AGENTS.md`, which requires use of local Next.js docs before route/component work and requires a Kanban deliverable-index entry plus a standard deliverable comment.
- Read Next.js 16 local docs under `node_modules/next/dist/docs/`, including the version 16 upgrade notes and app-router/testing references; used static app route files and client components only where form preview state required browser state.
- Read PRD sections 8, 11.3, 14.1, 15 Tasks 2-8, and 18, plus the parent foundation implementation note from t_c534ccd4.
- Queried the business-development RAG for narrow diagnostic/trust-before-consultation principles and applied the result as original Whiteford-appropriate UX copy rather than reproducing source text.
- Queried QMD `whiteford-ai-law-pages` for client portal/static route context; results surfaced the PRD and existing deliverable-index context.

## Verification

Commands run from the project root:

```bash
npm run test:portal-static
npm run lint
npm run build
```

Results:

- `npm run test:portal-static`: PASS (`client portal static guardrails passed`).
- `npm run lint`: PASS.
- `npm run build`: PASS. Next.js 16.2.4 compiled successfully and prerendered the Phase 0 client portal route set as static content, with the pre-existing `/api/leads` route remaining dynamic.

## Next action

Jeff/reviewer should inspect the local/internal route prototype and decide whether to approve a separate UX/legal/security review. Any public launch, real-client use, authentication, storage, calendar/email/notification integration, AI analysis, attorney routing, conflicts workflow, matter acceptance, HighLevel/CRM, Supabase/Clio/DMS, or deployment work requires separate exact approval.
