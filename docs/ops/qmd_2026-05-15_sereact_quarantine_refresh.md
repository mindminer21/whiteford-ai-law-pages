# QMD refresh — Sereact quarantine handoffs — 2026-05-15

Task: `t_3aa8962d`
Scope: internal/private QMD memory/search support for the Sereact quarantine packet, private deck note, and review handoff. This report does not authorize any SQLite, Supabase, HighLevel, CRM, Clio, workflow, outreach, social/public/ad, source-provider, prospect/contact, or client/prospect-facing action.

## Files checked

Filesystem artifacts existed before refresh:

- `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/growth-os/data-hygiene/2026-05-15_sereact_quarantine_exact_approval_packet.md`
- `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/private-decks/2026-05-15_sereact_quarantine_hold_decision_deck.html`
- `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/private-decks/2026-05-15_sereact_quarantine_hold_decision_deck_note.md`
- `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/reviews/2026-05-15_sereact_quarantine_packet_deck_review.md`

QMD indexes Markdown only for `whiteford-ai-law-pages` (`Pattern: **/*.md`), so the HTML deck is not expected to be directly body-indexed. It is retrievable through Markdown references in the deck note, review, and deliverable index.

## Before status

Command:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd status
```

Before refresh summary:

- Index: `/Users/jeff/.cache/qmd/index.sqlite`
- Size: 45.8 MB
- Documents: 366 files indexed
- Vectors: 7590 embedded
- Updated: 54m ago
- `whiteford-ai-law-pages`: 360 Markdown files
- `business-development-books`: 6 Markdown files
- Note: status emitted `[node-llama-cpp] ggml_metal_library_init_from_source: error compiling source`, but QMD status still completed and reported the index.

## Initial smoke-search result

Command pattern:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd search "<term>" -c whiteford-ai-law-pages --files -n 10
```

Before refresh:

| Term | Result |
|---|---|
| `t_a86b0bdc` | Miss |
| `t_a47002eb` | Miss |
| `t_78026ba5` | Miss |
| `Sereact quarantine exact approval packet` | Returned older/non-Sereact-specific packet/review hits; did not return the new exact approval packet |
| `Sereact quarantine HOLD decision deck` | Returned older HOLD/deck references; did not return the new Sereact deck note/review |
| `2026-05-15_sereact_quarantine_packet_deck_review.md` | Miss |

Because the required new Markdown handoffs missed or were not in the top result set, I ran QMD update and bounded embedding.

## Refresh commands run

```bash
PATH="/opt/homebrew/bin:$PATH" qmd update
PATH="/opt/homebrew/bin:$PATH" qmd embed --max-docs-per-batch 50 --max-batch-mb 10
```

Refresh output summary:

- `whiteford-ai-law-pages`: indexed 3 new, 1 updated, 359 unchanged, 0 removed
- Cleaned up 1 orphaned content hash
- `business-development-books`: 0 new, 0 updated, 6 unchanged
- QMD reported 4 unique hashes needing vectors
- Bounded embed completed: embedded 115 chunks from 4 documents in 3s
- Embed also emitted the same node-llama-cpp Metal compile warning, but completed successfully.

## After status

Command:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd status
```

After refresh summary:

- Index: `/Users/jeff/.cache/qmd/index.sqlite`
- Size: 45.8 MB
- Documents: 369 files indexed
- Vectors: 7705 embedded
- Updated: 1m ago
- `whiteford-ai-law-pages`: 363 Markdown files
- `business-development-books`: 6 Markdown files
- Note: status still emitted `[node-llama-cpp] ggml_metal_library_init_from_source: error compiling source`, but the index counts and vectors reflected the completed refresh.

## After smoke-search results

Command pattern:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd search "<term>" -c whiteford-ai-law-pages --files -n 10
```

| Term | After result |
|---|---|
| `t_a86b0bdc` | Hit `qmd://whiteford-ai-law-pages/docs/private-decks/2026-05-15-sereact-quarantine-hold-decision-deck-note.md`, `qmd://whiteford-ai-law-pages/docs/reviews/2026-05-15-sereact-quarantine-packet-deck-review.md`, and `qmd://whiteford-ai-law-pages/docs/growth-os/data-hygiene/2026-05-15-sereact-quarantine-exact-approval-packet.md` |
| `t_a47002eb` | Hit the review, deck note, and deliverable index |
| `t_78026ba5` | Hit the review and deliverable index |
| `Sereact quarantine exact approval packet` | Hit the deck note, review, and exact approval packet in the top results |
| `Sereact quarantine HOLD decision deck` | Hit the deck note, review, and deliverable index in the top results; direct HTML body indexing is not expected because QMD indexes Markdown only |
| `2026-05-15_sereact_quarantine_packet_deck_review.md` | Exact underscore filename search still returned no rows; QMD's listed URI/path is normalized to hyphen separators. Tokenized smoke searches such as `sereact quarantine packet deck review`, `2026 05 15 sereact quarantine packet deck review`, and `reviews sereact quarantine packet deck review` hit `qmd://whiteford-ai-law-pages/docs/reviews/2026-05-15-sereact-quarantine-packet-deck-review.md`. `qmd ls whiteford-ai-law-pages --files` also lists the review URI. |

## Indexed Sereact Markdown URIs verified by `qmd ls`

`qmd ls whiteford-ai-law-pages --files` contains:

- `qmd://whiteford-ai-law-pages/docs/growth-os/data-hygiene/2026-05-15-sereact-quarantine-exact-approval-packet.md`
- `qmd://whiteford-ai-law-pages/docs/private-decks/2026-05-15-sereact-quarantine-hold-decision-deck-note.md`
- `qmd://whiteford-ai-law-pages/docs/reviews/2026-05-15-sereact-quarantine-packet-deck-review.md`

## Self-indexing pass

After writing this report and updating `docs/KANBAN_DELIVERABLE_INDEX.md`, I ran:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd update
PATH="/opt/homebrew/bin:$PATH" qmd embed --max-docs-per-batch 50 --max-batch-mb 10
```

Self-index output summary:

- `whiteford-ai-law-pages`: indexed 1 new report, 1 updated deliverable index, 362 unchanged, 0 removed
- Bounded embed completed: embedded 99 chunks from 2 documents in 2s
- Final verification status after self-index: 370 files indexed, `whiteford-ai-law-pages` 364 Markdown files, and vectors updated successfully; exact vector count is visible in the latest `qmd status` output
- Smoke search `Refresh QMD for Sereact quarantine handoffs` hit `qmd://whiteford-ai-law-pages/docs/ops/qmd-2026-05-15-sereact-quarantine-refresh.md` and `qmd://whiteford-ai-law-pages/docs/kanban-deliverable-index.md`
- Smoke search `t_3aa8962d` hit the report and deliverable index
- Exact underscore filename searches for QMD-normalized paths can return no rows; QMD URI listing and tokenized title searches confirm retrievability.

## Final note

QMD is internal memory/search support only. Direct files, Kanban handoffs, and attorney/Jeff approvals remain controlling. This refresh is not source-current proof, consent/conflicts/Clio clearance, CRM/Supabase/HighLevel state proof, or authorization for any live action.
