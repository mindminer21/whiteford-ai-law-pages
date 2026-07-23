# QMD Refresh: 2026-05-11 Duplicate/Lifecycle Data-Hygiene Handoffs

Task: `t_16d1bb88`
Tenant: `whiteford-mountain-west`
Status: local QMD/docs/index maintenance only; no Supabase, HighLevel, CRM, Clio, SQLite data mutation, source restoration, enrichment, prospecting, workflow/email/social/public/client-facing action performed.

## Scope

Refresh local QMD after the duplicate/lifecycle data-hygiene handoffs were created, because smoke checks found the new task IDs/docs were not yet retrievable even though the markdown files and deliverable-index rows existed.

Target artifacts checked:

- `docs/growth-os/data-hygiene/2026-05-11_duplicate_canonicalization_review_packet.md` (`t_a2ddeb9e`)
- `docs/growth-os/data-hygiene/2026-05-11_agent_targeting_lifecycle_reconciliation_plan.md` (`t_04c6c2d8`)
- `docs/growth-os/data-hygiene/2026-05-11_duplicate_lifecycle_future_approval_packet.md` (`t_857fdefa`)
- `docs/reviews/2026-05-11_duplicate_lifecycle_data_hygiene_review.md` (`t_236efbe6`)
- `docs/KANBAN_DELIVERABLE_INDEX.md`

## Commands run

All commands were run from:

`/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages`

with:

`PATH="/opt/homebrew/bin:$PATH"`

Maintenance and verification commands:

```bash
qmd status
qmd update
qmd embed --max-docs-per-batch 50 --max-batch-mb 10
qmd status
qmd search "t_a2ddeb9e" -c whiteford-ai-law-pages -n 8 --line-numbers
qmd search "t_04c6c2d8" -c whiteford-ai-law-pages -n 8 --line-numbers
qmd search "t_857fdefa" -c whiteford-ai-law-pages -n 8 --line-numbers
qmd search "t_236efbe6" -c whiteford-ai-law-pages -n 8 --line-numbers
qmd search "duplicate canonicalization review packet" -c whiteford-ai-law-pages -n 8 --line-numbers
qmd search "agent targeting lifecycle reconciliation plan" -c whiteford-ai-law-pages -n 8 --line-numbers
qmd search "duplicate lifecycle future approval packet" -c whiteford-ai-law-pages -n 8 --line-numbers
qmd search "duplicate lifecycle data hygiene review" -c whiteford-ai-law-pages -n 8 --line-numbers
```

## Before status

```text
Index: /Users/jeff/.cache/qmd/index.sqlite
Size: 27.7 MB
Documents total: 235 files indexed
Vectors: 3701 embedded
Updated: 1h ago
whiteford-ai-law-pages: 229 files, updated 1h ago
business-development-books: 6 files, updated 5d ago
AST chunking: active
Embedding model: ggml-org/embeddinggemma-300M-GGUF
Reranking model: ggml-org/Qwen3-Reranker-0.6B-Q8_0-GGUF
Generation model: tobil/qmd-query-expansion-1.7B-gguf
Device: Metal on Apple M5 Max
Observed non-fatal warning after status output: [node-llama-cpp] ggml_metal_library_init_from_source: error compiling source
```

## Update/embed result

```text
Updating 2 collection(s)...

[1/2] whiteford-ai-law-pages (**/*.md)
Indexed: 4 new, 1 updated, 228 unchanged, 0 removed
Cleaned up 1 orphaned content hash(es)

[2/2] business-development-books (**/*.md)
Indexed: 0 new, 0 updated, 6 unchanged, 0 removed

Run 'qmd embed' to update embeddings (5 unique hashes need vectors)
Batch: 50 docs / 10.0 MB
Done: Embedded 83 chunks from 5 documents in 2s
Observed non-fatal warning during embedding: [node-llama-cpp] ggml_metal_library_init_from_source: error compiling source
```

## After status

```text
Index: /Users/jeff/.cache/qmd/index.sqlite
Size: 27.8 MB
Documents total: 239 files indexed
Vectors: 3784 embedded
Updated: 2m ago
whiteford-ai-law-pages: 233 files, updated 2m ago
business-development-books: 6 files, updated 5d ago
AST chunking: active
Device: Metal on Apple M5 Max
Observed non-fatal warning after status output: [node-llama-cpp] ggml_metal_library_init_from_source: error compiling source
```

The refresh moved `whiteford-ai-law-pages` from 229 to 233 indexed markdown files and total vectors from 3701 to 3784 before this report and its deliverable-index row were added.

## Smoke searches

### `t_a2ddeb9e`

Result: PASS.

Top hits:

- `qmd://whiteford-ai-law-pages/docs/reviews/2026-05-11-duplicate-lifecycle-data-hygiene-review.md`, score 88%, showing review/index verification lines referencing `t_a...` task IDs.
- `qmd://whiteford-ai-law-pages/docs/growth-os/data-hygiene/2026-05-11-duplicate-canonicalization-review-packet.md`, score 81%, showing `Task: t_a2ddeb9e`.
- `qmd://whiteford-ai-law-pages/docs/kanban-deliverable-index.md`, score 68%, showing the `t_a2ddeb9e` deliverable-index row.

### `t_04c6c2d8`

Result: PASS.

Top hits:

- `qmd://whiteford-ai-law-pages/docs/reviews/2026-05-11-duplicate-lifecycle-data-hygiene-review.md`, score 88%, showing review/index verification lines referencing the lifecycle handoff set.
- `qmd://whiteford-ai-law-pages/docs/growth-os/data-hygiene/2026-05-11-agent-targeting-lifecycle-reconciliation-plan.md`, score 83%, showing `Task: t_04c6c2d8`.
- `qmd://whiteford-ai-law-pages/docs/kanban-deliverable-index.md`, score 68%, showing the `t_04c6c2d8` deliverable-index row.

### `t_857fdefa`

Result: PASS.

Top hits:

- `qmd://whiteford-ai-law-pages/docs/reviews/2026-05-11-duplicate-lifecycle-data-hygiene-review.md`, score 88%, showing the dormant future-approval packet row.
- `qmd://whiteford-ai-law-pages/docs/growth-os/data-hygiene/2026-05-11-duplicate-lifecycle-future-approval-packet.md`, score 83%, showing `Task: t_857fdefa`.
- `qmd://whiteford-ai-law-pages/docs/kanban-deliverable-index.md`, score 68%, showing the `t_857fdefa` deliverable-index row.

### `t_236efbe6`

Result: PASS.

Top hits:

- `qmd://whiteford-ai-law-pages/docs/reviews/2026-05-11-duplicate-lifecycle-data-hygiene-review.md`, score 86%, showing `Task: t_236efbe6`.
- `qmd://whiteford-ai-law-pages/docs/kanban-deliverable-index.md`, score 70%, showing the `t_236efbe6` deliverable-index row.

### `duplicate canonicalization review packet`

Result: PASS.

Top hits:

- `qmd://whiteford-ai-law-pages/docs/growth-os/data-hygiene/2026-05-11-duplicate-canonicalization-review-packet.md`, score 86%, showing the report title and `Task: t_a2ddeb9e`.
- `qmd://whiteford-ai-law-pages/docs/reviews/2026-05-11-duplicate-lifecycle-data-hygiene-review.md`, score 85%, showing the duplicate canonicalization packet review row.
- `qmd://whiteford-ai-law-pages/docs/growth-os/data-hygiene/2026-05-11-duplicate-lifecycle-future-approval-packet.md`, score 85%, showing the related artifact link.

### `agent targeting lifecycle reconciliation plan`

Result: PASS.

Top hits:

- `qmd://whiteford-ai-law-pages/docs/growth-os/data-hygiene/2026-05-11-agent-targeting-lifecycle-reconciliation-plan.md`, score 93%, showing the title and `Task: t_04c6c2d8`.
- `qmd://whiteford-ai-law-pages/docs/reviews/2026-05-11-duplicate-lifecycle-data-hygiene-review.md`, score 93%, showing the lifecycle reconciliation plan review row.
- `qmd://whiteford-ai-law-pages/docs/growth-os/data-hygiene/2026-05-11-duplicate-lifecycle-future-approval-packet.md`, score 93%, showing the related artifact link.

### `duplicate lifecycle future approval packet`

Result: PASS.

Top hits:

- `qmd://whiteford-ai-law-pages/docs/reviews/2026-05-11-duplicate-lifecycle-data-hygiene-review.md`, score 90%, showing the dormant duplicate/lifecycle future-approval packet row.
- `qmd://whiteford-ai-law-pages/docs/growth-os/data-hygiene/2026-05-11-duplicate-lifecycle-future-approval-packet.md`, score 89%, showing the title and `Task: t_857fdefa`.
- `qmd://whiteford-ai-law-pages/docs/kanban-deliverable-index.md`, score 86%, showing the `t_857fdefa` row.

### `duplicate lifecycle data hygiene review`

Result: PASS.

Top hits:

- `qmd://whiteford-ai-law-pages/docs/reviews/2026-05-11-duplicate-lifecycle-data-hygiene-review.md`, score 91%, showing the title and `Task: t_236efbe6`.
- `qmd://whiteford-ai-law-pages/docs/growth-os/data-hygiene/2026-05-11-agent-targeting-lifecycle-reconciliation-plan.md`, score 91%, showing related parent links.
- `qmd://whiteford-ai-law-pages/docs/kanban-deliverable-index.md`, score 89%, showing adjacent duplicate/lifecycle rows.

## Retrieval verdict

All four requested task IDs and all four distinctive titles are now retrievable in local QMD. Each target artifact appears either as the top direct document hit or in the top three along with its review/index references.

## QMD-as-internal-memory caveat

QMD is an internal/local retrieval layer for Jeff/Whiteford operational memory and document discovery. Passing QMD searches confirms local markdown/index visibility only. It is not live public-source proof and does not approve, authorize, publish, mutate, restore sources, enrich prospects, validate external systems, or permit any CRM, HighLevel, Supabase, Clio, campaign, workflow, social, email, ad, prospect-outreach, public, client-facing, or prospect-facing action.

## Post-report self-index evidence

After this report and its `docs/KANBAN_DELIVERABLE_INDEX.md` row were written, a final bounded refresh was run:

```bash
qmd update
qmd embed --max-docs-per-batch 50 --max-batch-mb 10
qmd status
qmd search "t_16d1bb88" -c whiteford-ai-law-pages -n 8 --line-numbers
qmd search "QMD Refresh 2026-05-11 Duplicate Lifecycle Data Hygiene Handoffs" -c whiteford-ai-law-pages -n 8 --line-numbers
```

Result:

```text
whiteford-ai-law-pages: Indexed 1 new, 1 updated, 232 unchanged, 0 removed
business-development-books: Indexed 0 new, 0 updated, 6 unchanged, 0 removed
Embedded 49 chunks from 2 documents in 1s
Final status after self-index pass: 240 total files indexed; 3833 vectors embedded; whiteford-ai-law-pages 234 files updated 9s ago
Observed non-fatal warning: [node-llama-cpp] ggml_metal_library_init_from_source: error compiling source
```

Self smoke searches passed:

- `t_16d1bb88` returned this report at score 86% and `docs/kanban-deliverable-index.md` at score 70%.
- `QMD Refresh 2026-05-11 Duplicate Lifecycle Data Hygiene Handoffs` returned this report at score 96%, the duplicate/lifecycle review at score 95%, and `docs/kanban-deliverable-index.md` at score 95%.

A second final bounded update/embed was run after this evidence section was appended. It embedded the updated report text and preserved the no-external-action boundary. No external, live-system, public, client-facing, prospect-facing, CRM, HighLevel, Supabase, Clio, workflow, email, social, source-restoration, enrichment, prospecting, or SQLite data mutation action was performed or authorized.
