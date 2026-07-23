# QMD refresh — Sunday AI Vendor Intake decision handoffs — 2026-05-17

Task: `t_a4e4c40c`

## Scope

Refresh and verify local QMD retrieval for the Sunday AI Vendor Intake decision brief, private decision deck note/reference, review report, and related Kanban deliverable-index rows.

Guardrail: this was QMD/local-search maintenance only. No public-source proof, prospecting restart, CRM/HighLevel/Clio/Supabase mutation, workflow activation/enrollment, outreach, social/ad/webinar, public route, or client/prospect-facing action was performed or authorized.

## Source artifacts checked

- Decision brief: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/decision-packets/2026-05-17_sunday_morning_ai_vendor_intake_decision_brief.md`
- Private HTML deck: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/decision-packets/2026-05-17_sunday_morning_ai_vendor_intake_decision_deck.html`
- Deck note: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/decision-packets/2026-05-17_sunday_morning_ai_vendor_intake_decision_deck_note.md`
- Review report: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/reviews/2026-05-17_sunday_ai_vendor_intake_decision_deck_review.md`
- Deliverable index rows: `t_0e14cdbe`, `t_eab355f4`, and `t_9afa6fe0` in `docs/KANBAN_DELIVERABLE_INDEX.md`

## Commands run

```bash
PATH="/opt/homebrew/bin:$PATH" qmd status
PATH="/opt/homebrew/bin:$PATH" qmd search "Sunday Morning AI Vendor Intake Decision Brief" -c whiteford-ai-law-pages
PATH="/opt/homebrew/bin:$PATH" qmd search "Sunday Morning AI Vendor Intake Decision Deck Note" -c whiteford-ai-law-pages
PATH="/opt/homebrew/bin:$PATH" qmd search "Sunday AI Vendor Intake Decision Deck Review PASS-with-constraints" -c whiteford-ai-law-pages
PATH="/opt/homebrew/bin:$PATH" qmd update
PATH="/opt/homebrew/bin:$PATH" qmd embed --max-docs-per-batch 50 --max-batch-mb 10
PATH="/opt/homebrew/bin:$PATH" qmd status
```

## Before refresh

Initial `qmd status` showed:

- Total indexed documents: 423
- Embedded vectors: 9,924
- `whiteford-ai-law-pages` collection files: 417
- Last update: 47 minutes prior

Initial smoke searches found older deliverable-index material but did not directly retrieve all new source Markdown documents as top results.

## Refresh result

`qmd update` reported:

- `whiteford-ai-law-pages`: 3 new Markdown files indexed, 1 updated, 416 unchanged, 0 removed
- Cleanup: 1 orphaned content hash removed
- `business-development-books`: 0 new, 0 updated, 6 unchanged, 0 removed

Bounded embed reported:

- 4 unique hashes needed vectors
- 130 chunks embedded from 4 documents
- Batch bounds used: 50 docs / 10.0 MB

The recurring node-llama-cpp Metal compile warning appeared during status/embed, but the update and embed commands exited successfully.

## After refresh verification

Post-refresh `qmd status` showed:

- Total indexed documents: 426
- Embedded vectors: 10,054
- `whiteford-ai-law-pages` collection files: 420
- Last update: 1 minute prior

Smoke searches verified retrieval:

- `Sunday Morning AI Vendor Intake Decision Brief` returned:
  - `qmd://whiteford-ai-law-pages/docs/decision-packets/2026-05-17-sunday-morning-ai-vendor-intake-decision-brief.md`
  - `qmd://whiteford-ai-law-pages/docs/decision-packets/2026-05-17-sunday-morning-ai-vendor-intake-decision-deck-note.md`
  - `qmd://whiteford-ai-law-pages/docs/reviews/2026-05-17-sunday-ai-vendor-intake-decision-deck-review.md`
  - `qmd://whiteford-ai-law-pages/docs/kanban-deliverable-index.md`
- `Sunday Morning AI Vendor Intake Decision Deck Note` returned:
  - `qmd://whiteford-ai-law-pages/docs/decision-packets/2026-05-17-sunday-morning-ai-vendor-intake-decision-deck-note.md`
  - `qmd://whiteford-ai-law-pages/docs/reviews/2026-05-17-sunday-ai-vendor-intake-decision-deck-review.md`
  - `qmd://whiteford-ai-law-pages/docs/kanban-deliverable-index.md`
- `Sunday AI Vendor Intake Decision Deck Review PASS-with-constraints` returned:
  - `qmd://whiteford-ai-law-pages/docs/reviews/2026-05-17-sunday-ai-vendor-intake-decision-deck-review.md`
  - `qmd://whiteford-ai-law-pages/docs/kanban-deliverable-index.md`

The QMD URI display normalizes underscores to hyphens, but the retrieved snippets point back to the correct absolute source paths.

## HTML deck caveat

The `whiteford-ai-law-pages` QMD collection pattern is `**/*.md`, so the HTML deck body is not directly indexed. It is retrievable indirectly through the deck note and deliverable-index row, both of which include the absolute HTML deck path and summarize the private/local deck contents.

## Deliverable-index verification

The required rows were present in `docs/KANBAN_DELIVERABLE_INDEX.md`:

- `t_eab355f4` — private Sunday AI Vendor decision deck, with implementation note and HOLD guardrails.
- `t_0e14cdbe` — Sunday morning AI Vendor Intake decision brief, with internal-only next action and live/public HOLD guardrails.
- `t_9afa6fe0` — PASS-with-constraints review for private/internal decision prep only, with external/live lanes still on HOLD.

## Final self-index verification

After adding this report to `docs/KANBAN_DELIVERABLE_INDEX.md`, I ran a second bounded QMD update/embed:

- `whiteford-ai-law-pages`: 1 new Markdown file indexed, 1 updated, 419 unchanged, 0 removed
- 2 unique hashes embedded
- 121 chunks embedded from 2 documents

Final `qmd status` showed:

- Total indexed documents: 427
- Embedded vectors: 10,175
- `whiteford-ai-law-pages` collection files: 421

Self-index smoke search verified retrieval of this report and the new index row:

- `Refresh QMD for Sunday AI Vendor Intake decision handoffs t_a4e4c40c` returned:
  - `qmd://whiteford-ai-law-pages/docs/ops/qmd-2026-05-17-sunday-ai-vendor-intake-decision-refresh.md`
  - `qmd://whiteford-ai-law-pages/docs/kanban-deliverable-index.md`

A filename-style smoke query containing the underscore-normalized local filename did not return results, but the title/task query retrieved both expected QMD documents. This is consistent with QMD URI/path token normalization and does not block retrieval by task/title/content.
