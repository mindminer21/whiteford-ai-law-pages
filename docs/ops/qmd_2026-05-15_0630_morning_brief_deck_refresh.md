# QMD refresh — 2026-05-15 06:30 morning brief/deck/review

Task: `t_0f49fae5`
Parent review task: `t_669f2f99`
Scope: internal/private QMD memory/search support for the completed 2026-05-15 06:30 morning action brief, private decision deck note/index references, and safety review. QMD is not live source proof, approval authority, legal advice, CRM/HighLevel/Supabase/Clio state proof, or authorization for outreach, workflow activation, contact enrollment, email/SMS/LinkedIn/social action, ads, public publishing, source/prospect expansion, or client/prospect-facing use.

## Files checked

Filesystem artifacts existed before refresh:

- `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/digests/2026-05-15_0630_morning_action_brief.md`
- `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/private-decks/2026-05-15_0630_whiteford_morning_decision_deck.html`
- `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/private-decks/2026-05-15_0630_whiteford_morning_decision_deck_note.md`
- `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/reviews/2026-05-15_0630_morning_action_brief_deck_review.md`
- `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/KANBAN_DELIVERABLE_INDEX.md`

QMD indexes Markdown only for `whiteford-ai-law-pages` (`Pattern: **/*.md`). The HTML deck body is therefore out of collection scope; the deck is expected to be discoverable through Markdown references in the deck note, review, and deliverable index. QMD URI/path display normalizes underscores to hyphens, so exact underscore filename/path queries can be weaker than title, task-ID, or normalized-token searches.

## Before status

Command:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd status
```

Exit status: `0`

Before refresh summary:

- Index: `/Users/jeff/.cache/qmd/index.sqlite`
- Size: 45.9 MB
- Documents: 378 files indexed
- Vectors: 8046 embedded
- Updated: 53m ago
- `whiteford-ai-law-pages`: 372 Markdown files
- `business-development-books`: 6 Markdown files
- Status emitted `[node-llama-cpp] ggml_metal_library_init_from_source: error compiling source`, but QMD status completed and reported the index.

## Before smoke-search results

Command pattern:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd search "<term>" -c whiteford-ai-law-pages --files -n 8
```

All before-search commands exited `0`.

| Term | Before result |
|---|---|
| `2026-05-15 0630 morning action brief deck review` | Hit only `qmd://whiteford-ai-law-pages/docs/kanban-deliverable-index.md`; did not retrieve the new brief, deck note, or review files. |
| `t_31087eec t_1bf6c3fa t_669f2f99` | Miss. |
| Exact underscore paths for the brief, deck note, and review | Miss. |

Because the new 2026-05-15 06:30 handoff files missed or were not in the top result set, I ran QMD update and bounded embedding.

## Refresh commands run

```bash
PATH="/opt/homebrew/bin:$PATH" qmd update
PATH="/opt/homebrew/bin:$PATH" qmd embed --max-docs-per-batch 50 --max-batch-mb 10
```

Exit statuses:

- `qmd update`: `0`
- `qmd embed --max-docs-per-batch 50 --max-batch-mb 10`: `0`

Refresh output summary:

- `whiteford-ai-law-pages`: indexed 3 new, 1 updated, 371 unchanged, 0 removed
- Cleaned up 1 orphaned content hash
- `business-development-books`: 0 new, 0 updated, 6 unchanged
- QMD reported 4 unique hashes needing vectors
- Bounded embed completed: embedded 116 chunks from 4 documents in 3s
- Embed emitted the same node-llama-cpp Metal compile warning, but completed successfully.

## After status

Command:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd status
```

Exit status: `0`

After refresh summary:

- Index: `/Users/jeff/.cache/qmd/index.sqlite`
- Size: 46.2 MB
- Documents: 381 files indexed
- Vectors: 8162 embedded
- Updated: 2m ago
- `whiteford-ai-law-pages`: 375 Markdown files
- `business-development-books`: 6 Markdown files
- Status still emitted `[node-llama-cpp] ggml_metal_library_init_from_source: error compiling source`, but the index counts and vectors reflected the completed refresh.

## After smoke-search results

Command pattern:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd search "<term>" -c whiteford-ai-law-pages --files -n 10
```

All after-search commands exited `0`.

| Term | After result |
|---|---|
| `2026-05-15 0630 morning action brief` | Hit the deck note, review, deliverable index, and source brief: `qmd://whiteford-ai-law-pages/docs/private-decks/2026-05-15-0630-whiteford-morning-decision-deck-note.md`, `qmd://whiteford-ai-law-pages/docs/reviews/2026-05-15-0630-morning-action-brief-deck-review.md`, `qmd://whiteford-ai-law-pages/docs/kanban-deliverable-index.md`, and `qmd://whiteford-ai-law-pages/docs/digests/2026-05-15-0630-morning-action-brief.md`. |
| `2026-05-15 0630 Whiteford morning decision deck note t_1bf6c3fa` | Hit the review and deliverable index. A normalized-token deck-note path search also hit the deck note at rank 1. |
| `t_31087eec` | Hit the deck note, review, and deliverable index. |
| `t_1bf6c3fa` | Hit the review and deliverable index. |
| `t_669f2f99` | Hit the review and deliverable index. |
| `t_0f49fae5` | Miss before this report existed; expected to resolve after the self-indexing pass below. |
| Normalized path tokens for `docs/digests/2026-05-15_0630_morning_action_brief.md` | Hit the deck note, review, deliverable index, source brief, and an older daily digest. |
| Normalized path tokens for `docs/private-decks/2026-05-15_0630_whiteford_morning_decision_deck_note.md` | Hit the deck note, review, deliverable index, and source brief. |
| Exact underscore path tokens | Still weak/missing due QMD filename normalization; use normalized tokens, task IDs, or direct `qmd get` URIs. |

Direct retrieval checks also succeeded:

- `qmd get qmd://whiteford-ai-law-pages/docs/digests/2026-05-15_0630_morning_action_brief.md -l 8` returned the brief title and internal/no-action boundary.
- `qmd get qmd://whiteford-ai-law-pages/docs/private-decks/2026-05-15_0630_whiteford_morning_decision_deck_note.md -l 8` returned the deck-note title and HTML deck/source-brief references.
- `qmd get qmd://whiteford-ai-law-pages/docs/reviews/2026-05-15_0630_morning_action_brief_deck_review.md -l 8` returned the review title, task ID `t_669f2f99`, and reviewed-asset paths.

## Collection-scope caveats

- QMD search is scoped here to `whiteford-ai-law-pages`; results from the separate `business-development-books` collection are intentionally excluded from smoke searches.
- QMD indexes Markdown only under the configured collection pattern. The HTML deck body is not expected to be directly searchable unless the collection pattern is expanded; Markdown references in the deck note, review, and deliverable index are searchable and sufficient for internal memory support.
- QMD URI/path display normalizes underscores to hyphens. Exact underscore filename searches can miss; task-ID, title, direct `qmd get`, and normalized-token searches are more reliable for these handoffs.
- QMD is internal memory/search support only. Direct files, Kanban handoffs, Jeff/attorney approvals, source-access gates, Supabase schema gates, and HighLevel/CRM approval gates remain controlling.

## Self-indexing pass

After writing this report and updating `docs/KANBAN_DELIVERABLE_INDEX.md`, I ran:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd update
PATH="/opt/homebrew/bin:$PATH" qmd embed --max-docs-per-batch 50 --max-batch-mb 10
```

Exit statuses:

- Final `qmd update`: `0`
- Final bounded `qmd embed`: `0`

Self-index output summary:

- `whiteford-ai-law-pages`: indexed 1 new report, 1 updated deliverable index, 374 unchanged, 0 removed
- Cleaned up 1 orphaned content hash
- QMD reported 2 unique hashes needing vectors
- Bounded embed completed: embedded 106 chunks from 2 documents in 3s
- Final status after self-index: 382 files indexed, 8268 vectors embedded, `whiteford-ai-law-pages` 376 Markdown files, updated 12s before verification
- Smoke search `Refresh QMD for 2026-05-15 morning brief deck review` hit this report, the review, the deck note, the deliverable index, and the source brief
- Smoke search `t_0f49fae5` hit this report and the deliverable index
- Smoke search `t_31087eec t_1bf6c3fa t_669f2f99` hit this report, the review, and the deliverable index

Because adding these final details changed the report, I ran one last bounded QMD update/embed pass after the report was complete; it completed successfully and kept this report searchable.

## Final note

QMD is internal memory/search support only. Direct files, Kanban handoffs, Jeff/attorney approvals, source-access gates, Supabase schema gates, and HighLevel/CRM approval gates remain controlling. This refresh is not source-current proof, consent/conflicts/Clio clearance, CRM/Supabase/HighLevel state proof, or authorization for any live/public/client/prospect-facing action.
