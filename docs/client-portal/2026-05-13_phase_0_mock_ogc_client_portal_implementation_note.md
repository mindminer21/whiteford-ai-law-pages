# Phase 0 mock OGC client portal implementation note

Date: 2026-05-13
Task: t_04d0c3ac
Status: Internal/local prototype only

## Deliverable

Local routes added inside the existing Next.js app:

- `/client-portal`
- `/portal`
- `/portal/messages`
- `/portal/messages/new`
- `/portal/documents`
- `/portal/documents/upload`
- `/portal/schedule`
- `/portal/schedule/new`
- `/portal/onboarding`
- `/portal/agenda`
- `/portal/attorneys`

Typed mock data and components added under:

- `src/lib/portal/`
- `src/components/portal/`

Static guardrail test added:

- `tests/verify_client_portal_static_guardrails.mjs`
- `npm run test:portal-static`

## What Phase 0 demonstrates

The prototype shows the Whiteford Tech Company OGC + AI Compliance portal as a managed legal operating system rather than a feature list. The dashboard and supporting routes emphasize:

1. clear issue triage,
2. predefined tag-based routing metadata,
3. simulated document context,
4. request-only scheduling,
5. attorney-review-only onboarding checklists, and
6. a monthly legal operating plan with urgent / important / monitor / defer lanes.

This reflects the business-development synthesis from the offer and corpus: make the buyer see a concrete managed outcome and next action before asking for deeper consultation, while avoiding claims of unlimited access or guaranteed results.

## Safety and legal/ethics guardrails preserved

Phase 0 intentionally does not implement:

- auth,
- file persistence,
- document storage,
- calendar invites,
- external notifications,
- live AI analysis,
- HighLevel/CRM mutation,
- Supabase/Clio/DMS mutation,
- attorney availability promises, or
- creation/expansion of any attorney-client relationship.

Required PRD §9.1 guardrail wording appears in the shared `GuardrailCallout` and near message, upload, scheduling, onboarding, and entry UI. Attorney tags are displayed as routing metadata only. Document upload and scheduling screens are simulated only.

## Verification run

Command run from the project root:

```bash
npm run test:portal-static && npm run lint && npm run build
```

Result: PASS.

Build confirmed all new portal routes prerender as static content, including `/client-portal`, `/portal`, and the Phase 0 subroutes.

## Next action

Jeff / reviewer should review the local prototype routes and decide whether Phase 0 is acceptable for UX/scoping discussion. Any Phase 1 work involving auth, storage, notifications, AI analysis, calendar, HighLevel, CRM, Supabase, Clio, DMS, or real client use requires a separate approved architecture/security/legal-review task before implementation.
