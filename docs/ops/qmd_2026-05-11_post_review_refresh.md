# QMD Refresh: 2026-05-11 Morning Watchdog Post-Review Handoffs

Task: `t_461d6dbc`
Tenant: `whiteford-mountain-west`
Status: local QMD/docs/index maintenance only; no external, CRM, Supabase, HighLevel, Clio, email, social, publishing, ad, prospecting, or client-facing action performed.

## Scope

Refresh local QMD after the 2026-05-11 morning watchdog register/deck/review chain completed, because immediate watchdog smoke searches for the new task IDs did not return results.

Target artifacts checked:

- `docs/ops/qmd_2026-05-11_morning_watchdog_refresh.md` (`t_337e7257`)
- `docs/digests/2026-05-11_morning_watchdog_decision_register.md` (`t_73520ad9`)
- `docs/digests/2026-05-11_morning_watchdog_decision_deck.html` (`t_4dd3e1e1`; HTML is not directly collected by the current `**/*.md` QMD collection, so QMD visibility is through markdown references/index rows unless the collection pattern changes)
- `docs/reviews/2026-05-11_morning_watchdog_decision_deck_review.md` (`t_5175d553`)
- `docs/KANBAN_DELIVERABLE_INDEX.md`

## Commands run

All commands were run from:

`/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages`

with:

`PATH="/opt/homebrew/bin:$PATH"`

Maintenance commands:

```bash
qmd status
qmd update
qmd embed --max-docs-per-batch 50 --max-batch-mb 10
qmd status
qmd search "t_73520ad9" -c whiteford-ai-law-pages -n 8 --line-numbers
qmd search "t_4dd3e1e1" -c whiteford-ai-law-pages -n 8 --line-numbers
qmd search "t_5175d553" -c whiteford-ai-law-pages -n 8 --line-numbers
qmd search "2026-05-11 morning watchdog decision deck review" -c whiteford-ai-law-pages -n 8 --line-numbers
```

## Before status

```text
Index: /Users/jeff/.cache/qmd/index.sqlite
Size: 27.5 MB
Documents total: 227 files indexed
Vectors: 3460 embedded
Updated: 13m ago
whiteford-ai-law-pages: 221 files, updated 13m ago
business-development-books: 6 files, updated 5d ago
AST chunking: active
Embedding model: ggml-org/embeddinggemma-300M-GGUF
Reranking model: ggml-org/Qwen3-Reranker-0.6B-Q8_0-GGUF
Generation model: tobil/qmd-query-expansion-1.7B-gguf
Device: Metal on Apple M5 Max
Observed non-fatal warning: [node-llama-cpp] ggml_metal_library_init_from_source: error compiling source
```

## Update/embed result

```text
Updating 2 collection(s)...

[1/2] whiteford-ai-law-pages (**/*.md)
Indexed: 2 new, 1 updated, 220 unchanged, 0 removed
Cleaned up 1 orphaned content hash(es)

[2/2] business-development-books (**/*.md)
Indexed: 0 new, 0 updated, 6 unchanged, 0 removed

Run 'qmd embed' to update embeddings (3 unique hashes need vectors)
Batch: 50 docs / 10.0 MB
Done: Embedded 50 chunks from 3 documents in 1s
```

## After status

```text
Index: /Users/jeff/.cache/qmd/index.sqlite
Size: 27.5 MB
Documents total: 229 files indexed
Vectors: 3510 embedded
Updated: 1m ago
whiteford-ai-law-pages: 223 files, updated 1m ago
business-development-books: 6 files, updated 5d ago
AST chunking: active
Device: Metal on Apple M5 Max
Observed non-fatal warning after status output: [node-llama-cpp] ggml_metal_library_init_from_source: error compiling source
```

The refresh moved `whiteford-ai-law-pages` from 221 to 223 indexed markdown files and vectors from 3460 to 3510 before this report and its deliverable-index row were added.

## Smoke searches

### `t_73520ad9`

Result: PASS.

Top hits:

- `qmd://whiteford-ai-law-pages/docs/digests/2026-05-11-morning-watchdog-decision-register.md`, score 86%, showing `Task: t_73520ad9`.
- `qmd://whiteford-ai-law-pages/docs/kanban-deliverable-index.md`, score 71%, showing the `t_73520ad9` index row.

### `t_4dd3e1e1`

Result: PASS through markdown index/reference visibility.

Top hit:

- `qmd://whiteford-ai-law-pages/docs/kanban-deliverable-index.md`, score 73%, showing the `t_4dd3e1e1` deck row.

Caveat: the deck artifact itself is HTML, and the active `whiteford-ai-law-pages` collection pattern is `**/*.md`; QMD should not be expected to retrieve the HTML body unless the collection pattern is expanded or a markdown mirror/reference is created.

### `t_5175d553`

Result: PASS.

Top hits:

- `qmd://whiteford-ai-law-pages/docs/reviews/2026-05-11-morning-watchdog-decision-deck-review.md`, score 86%, showing `Task: t_5175d553`.
- `qmd://whiteford-ai-law-pages/docs/kanban-deliverable-index.md`, score 71%, showing the `t_5175d553` index row.

### `2026-05-11 morning watchdog decision deck review`

Result: PASS.

Top hits:

- `qmd://whiteford-ai-law-pages/docs/reviews/2026-05-11-morning-watchdog-decision-deck-review.md`, score 96%, showing `# 2026-05-11 Morning Watchdog Decision Register and Deck Review`.
- `qmd://whiteford-ai-law-pages/docs/kanban-deliverable-index.md`, score 95%, showing the adjacent register/deck/review rows.

## QMD-as-internal-memory caveat

QMD is an internal/local retrieval layer for Jeff/Whiteford operational memory and document discovery. Passing QMD searches confirms local markdown/index visibility only. It does not approve, authorize, publish, mutate, or validate any external system, CRM, HighLevel object, Supabase row, Clio record, campaign, workflow, social post, ad, prospect outreach, or client-facing action.

## Post-report self-index evidence

After this report and its `docs/KANBAN_DELIVERABLE_INDEX.md` row were written, a final bounded refresh was run:

```bash
qmd update
qmd embed --max-docs-per-batch 50 --max-batch-mb 10
```

Result:

```text
whiteford-ai-law-pages: Indexed 1 new, 1 updated, 222 unchanged, 0 removed
business-development-books: Indexed 0 new, 0 updated, 6 unchanged, 0 removed
Embedded 45 chunks from 2 documents in 1s
Final status: 230 total files indexed; 3555 vectors embedded; whiteford-ai-law-pages 224 files updated 10s ago
```

Self smoke searches passed:

- `t_461d6dbc` returned this report at score 89% and `docs/kanban-deliverable-index.md` at score 71%.
- `QMD Refresh 2026-05-11 Morning Watchdog Post-Review Handoffs` returned this report at score 97% and `docs/kanban-deliverable-index.md` at score 96%.

A second final bounded update/embed was run after this evidence section was appended. It embedded 4 chunks from 1 updated document, left `whiteford-ai-law-pages` at 224 indexed markdown files, and increased total vectors to 3559. Verification searches still returned this report and the deliverable-index row for both `t_461d6dbc` and the report title. No external or live-system action was required or authorized.
