# 2026-05-13 Pre-Wake Whiteford Decision Deck — Implementation Note

Task: `t_38aa6253`
Tenant: `whiteford-mountain-west`
Status: PRIVATE / LOCAL / INTERNAL DECISION PREP ONLY

## Deliverable

HTML deck:
`/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/private-decks/2026-05-13_prewake_whiteford_decision_deck.html`

Parent brief:
`/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/digests/2026-05-13_prewake_whiteford_action_brief.md`

## What was built

A sparse 16:9 private/local HTML decision deck for Jeff's 2026-05-13 pre-wake Whiteford/Schell IP review. It converts the parent brief into eight slides:

1. Cover / posture
2. Hard no-action boundary
3. Current blockers
4. Safe lanes
5. Hard forbidden actions
6. Exact approval boxes A-C
7. Exact approval boxes D-F
8. Recommended read order and source-path reference

## Design and safety posture

- Self-contained HTML/CSS/JS; no remote dependencies.
- Fixed 1920x1080 deck canvas scaled to fit the viewport.
- Keyboard navigation: ArrowLeft, ArrowRight, PageUp, PageDown, Space, Home, End.
- Visible slide count and previous/next navigation.
- `localStorage` only preserves current slide position; it does not store approvals, form data, contacts, prospects, tokens, or secrets.
- Print-friendly CSS displays all slides for local print/PDF review.
- No forms, API calls, secrets, CRM/Supabase/HighLevel/Clio mutation controls, workflow controls, send controls, social/publishing controls, or prospecting controls.
- Approval boxes are static text decision aids copied from the parent brief posture; they are not approval records or executable controls.

## Source and research notes

- The deck is grounded in the parent action brief `t_0813b2e5`.
- Business-development corpus check reinforced the narrow-diagnostic lead-magnet principle: solve one narrow problem and deliver value before a consultation ask. The deck applies that only as internal attorney-review copy posture, not as external copy or launch authorization.
- QMD was queried for the 2026-05-13 pre-wake brief. The exact artifact was not yet retrievable from QMD at build time, so the deck relies on the direct filesystem parent brief path and treats QMD as internal memory only.

## Guardrails preserved

This deck does not authorize or perform:

- Supabase DDL, sync, or backfill.
- HighLevel, CRM, SQLite, Clio, or opportunity/contact mutation.
- Workflow activation, testing, manual start, enrollment, tagging, campaigns, newsletters, emails, SMS, DMs, LinkedIn/social/YouTube posts, ads, or public publishing.
- Source/prospecting smoke tests, named-company research, enrichment, scoring, or outreach.
- Client/prospect-facing use.
- Credential guessing, credential exposure, API bypass, or live-system action.

## Verification performed

- Wrote the HTML deck and this implementation note to the requested private-decks paths.
- Confirmed the parent brief was read before design.
- Checked business-development corpus and QMD as internal reference sources.
- Ran local deterministic verification for file existence, required phrases, slide count, navigation code, no remote dependencies, and absence of common live-action/API/form patterns.

## Next action

Jeff should open the deck locally, review the source-path parent brief, and choose HOLD or exactly one narrow manual/internal lane. No external, public, CRM/HighLevel/Supabase/Clio, workflow, source/prospecting, send, social, ad, or client/prospect-facing action is authorized by this deck.
