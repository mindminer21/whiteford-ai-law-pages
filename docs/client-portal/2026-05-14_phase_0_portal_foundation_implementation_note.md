# Phase 0 OGC portal foundation implementation note

Date: 2026-05-14
Task: t_c534ccd4
Status: Internal/local foundation only

## Scope completed

Implemented and verified the Phase 0 typed foundation for the Whiteford/Schell IP tech-company OGC portal prototype, limited to local TypeScript seed data, deterministic routing helpers, mock fixtures, and static guardrail testing.

This work does not authorize launch, public/client-facing use, deployment, authentication, storage, calendar integration, email/notification sends, AI calls, HighLevel/CRM mutation, Supabase/Clio/DMS mutation, attorney assignment, conflicts clearance, matter acceptance, real client data handling, or engagement-scope expansion.

## Files in the foundation

- `src/lib/portal/types.ts` defines the Phase 0 portal domain types for issue tags, attorney seed records, mock organizations/users/workspaces, threads, messages, documents, meeting requests, and agenda items.
- `src/lib/portal/tags.ts` defines the predefined issue-tag taxonomy from the PRD and exposes lookup/validation helpers that return only existing taxonomy entries.
- `src/lib/portal/attorneys.ts` defines 23 attorney seed records as internal draft roster data. Every record is `availabilityMode: "request-only"`, `isDraftRoster: true`, and carries a caveat that lawyer tags request routing metadata only and do not guarantee review, assignment, availability, or representation.
- `src/lib/portal/routing.ts` exposes `suggestAttorneysForIssueTags(issueTags: PortalIssueTagSlug[])`, scoring draft attorneys only from predefined issue-tag slugs.
- `src/lib/portal/mock-data.ts` provides fictional `.example`/`.test` fixtures for a local diagnostic prototype: classify an approved-client issue, relate mock documents, request review-only scheduling, and queue monthly OGC agenda items.
- `tests/verify_client_portal_static_guardrails.mjs` checks the static guardrails for required files, draft roster posture, request-only attorneys, predefined tags, no arbitrary tag creation helper, no attorney-client relationship guarantee, emergency-channel caveats, no live messages, no real storage posture, and request-only scheduling posture.
- `package.json` already includes `test:portal-static` as `node tests/verify_client_portal_static_guardrails.mjs`.

## Business-development synthesis applied

The business-development corpus reinforced a narrow-problem principle: deliver a small complete solution that makes the next problem clearer and earns trust before asking for a consultation or live integration. Applied here, the foundation avoids broad portal/AI/legal-service promises and instead supports one narrow diagnostic job: help an approved tech-company client decide where to place an issue, related document metadata, attorney-routing request, or meeting-request context for review.

The foundation therefore emphasizes:

1. Diagnostic clarity over launch claims.
2. Predefined taxonomy over open-ended client-created tags.
3. Request-only attorney routing over implied assignment or availability.
4. Mock/local records over storage, CRM, calendar, notification, or AI integration.
5. Caveated internal review posture before any client-facing or production path.

QMD was queried against the `whiteford-ai-law-pages` collection for related client-portal memory; the targeted query returned no direct hits, so implementation relied on the PRD, Phase 1 approval matrix, prior re-review, and source files as current ground truth.

## Guardrails preserved

- No live integrations were added.
- No auth, storage, calendar, HighLevel/CRM, Supabase, Clio, DMS, notification, email, or AI dependencies were added.
- No real client data, secrets, tokens, or confidential facts were added.
- Attorney roster remains unreconciled draft seed data only.
- Scheduling remains request-only; no booking guarantee or calendar invite is created.
- Tags are selected from the predefined taxonomy; helper functions validate/look up existing tags only.
- The prototype caveat remains: no live messages, uploads, calendar invites, external notifications, auth integration, CRM mutation, or document persistence.

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
- `npm run build`: PASS. Next.js 16.2.4 compiled successfully and prerendered `/client-portal` and all `/portal/*` Phase 0 routes as static content, with `/api/leads` remaining dynamic from existing app functionality.

## Next action

Jeff/reviewer should inspect this foundation as local/internal Phase 0 scaffolding only and decide whether to approve a separate review task or request revisions. Any real client use, public demo, auth, storage, calendar, notification, AI, CRM/HighLevel, Supabase/Clio/DMS, attorney routing, conflicts, or matter-acceptance work still requires a separate exact approval and architecture/security/legal review.
