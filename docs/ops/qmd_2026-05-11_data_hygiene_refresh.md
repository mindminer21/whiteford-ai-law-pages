# QMD Refresh: 2026-05-11 Data Hygiene Tranche

Task: `t_48930816`
Tenant: `whiteford-mountain-west`
Status: local QMD/docs/index maintenance only; no external, CRM, Supabase, HighLevel, Clio, email, social, publishing, ad, prospecting, or client-facing action performed.

## Scope

Refresh local QMD after the 2026-05-11 data-hygiene tranche completed, because immediate smoke searches missed the new task IDs and deliverables.

Target artifacts checked:

- `docs/growth-os/data-hygiene/2026-05-11_growth_os_data_hygiene_audit.md` (`t_f16eb5da`)
- `docs/growth-os/data-hygiene/2026-05-11_offer_contact_mapping_remediation_plan.md` (`t_1a9b4706`)
- `docs/growth-os/data-hygiene/2026-05-11_private_dashboard_data_hygiene_visibility_spec.md` (`t_79645a06`)
- `docs/reviews/2026-05-11_data_hygiene_tranche_review.md` (`t_328f93ff`)
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
qmd search "t_f16eb5da" -c whiteford-ai-law-pages -n 8 --line-numbers
qmd search "t_1a9b4706" -c whiteford-ai-law-pages -n 8 --line-numbers
qmd search "t_79645a06" -c whiteford-ai-law-pages -n 8 --line-numbers
qmd search "t_328f93ff" -c whiteford-ai-law-pages -n 8 --line-numbers
qmd search "2026-05-11 data hygiene tranche review" -c whiteford-ai-law-pages -n 8 --line-numbers
```

## Before status

```text
Index: /Users/jeff/.cache/qmd/index.sqlite
Size: 27.5 MB
Documents total: 230 files indexed
Vectors: 3563 embedded
Updated: 1h ago
whiteford-ai-law-pages: 224 files, updated 1h ago
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
Indexed: 4 new, 1 updated, 223 unchanged, 0 removed
Cleaned up 1 orphaned content hash(es)

[2/2] business-development-books (**/*.md)
Indexed: 0 new, 0 updated, 6 unchanged, 0 removed

Run 'qmd embed' to update embeddings (5 unique hashes need vectors)
Batch: 50 docs / 10.0 MB
Done: Embedded 80 chunks from 5 documents in 2s
```

## After status

```text
Index: /Users/jeff/.cache/qmd/index.sqlite
Size: 27.6 MB
Documents total: 234 files indexed
Vectors: 3643 embedded
Updated: 3m ago
whiteford-ai-law-pages: 228 files, updated 3m ago
business-development-books: 6 files, updated 5d ago
AST chunking: active
Device: Metal on Apple M5 Max
Observed non-fatal warning after status output: [node-llama-cpp] ggml_metal_library_init_from_source: error compiling source
```

The refresh moved `whiteford-ai-law-pages` from 224 to 228 indexed markdown files and vectors from 3563 to 3643 before this report and its deliverable-index row were added.

## Smoke searches

### `t_f16eb5da`

Result: PASS.

Top hits:

- `qmd://whiteford-ai-law-pages/docs/reviews/2026-05-11-data-hygiene-tranche-review.md`, score 87%, showing the deliverable index verification line referencing `t_f16eb5da`.
- `qmd://whiteford-ai-law-pages/docs/growth-os/data-hygiene/2026-05-11-growth-os-data-hygiene-audit.md`, score 83%, showing `Task: t_f16eb5da`.
- `qmd://whiteford-ai-law-pages/docs/kanban-deliverable-index.md`, score 67%, showing the `t_f16eb5da` index row.

### `t_1a9b4706`

Result: PASS.

Top hits:

- `qmd://whiteford-ai-law-pages/docs/reviews/2026-05-11-data-hygiene-tranche-review.md`, score 87%, showing the tranche review table.
- `qmd://whiteford-ai-law-pages/docs/growth-os/data-hygiene/2026-05-11-private-dashboard-data-hygiene-visibility-spec.md`, score 82%, showing `Parent: t_1a9b4706`.
- `qmd://whiteford-ai-law-pages/docs/growth-os/data-hygiene/2026-05-11-offer-contact-mapping-remediation-plan.md`, score 80%, showing `Task: t_1a9b4706`.
- `qmd://whiteford-ai-law-pages/docs/kanban-deliverable-index.md`, score 67%, showing the `t_1a9b4706` index row.

### `t_79645a06`

Result: PASS.

Top hits:

- `qmd://whiteford-ai-law-pages/docs/reviews/2026-05-11-data-hygiene-tranche-review.md`, score 88%, showing the private dashboard spec row.
- `qmd://whiteford-ai-law-pages/docs/growth-os/data-hygiene/2026-05-11-private-dashboard-data-hygiene-visibility-spec.md`, score 83%, showing `Task: t_79645a06`.
- `qmd://whiteford-ai-law-pages/docs/kanban-deliverable-index.md`, score 69%, showing the `t_79645a06` index row.

### `t_328f93ff`

Result: PASS.

Top hits:

- `qmd://whiteford-ai-law-pages/docs/reviews/2026-05-11-data-hygiene-tranche-review.md`, score 86%, showing `Task: t_328f93ff`.
- `qmd://whiteford-ai-law-pages/docs/kanban-deliverable-index.md`, score 70%, showing the `t_328f93ff` index row.

### `2026-05-11 data hygiene tranche review`

Result: PASS.

Top hits:

- `qmd://whiteford-ai-law-pages/docs/reviews/2026-05-11-data-hygiene-tranche-review.md`, score 92%, showing `# 2026-05-11 Data Hygiene Tranche Review`.
- `qmd://whiteford-ai-law-pages/docs/kanban-deliverable-index.md`, score 92%, showing the adjacent data-hygiene rows.

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
whiteford-ai-law-pages: Indexed 1 new, 1 updated, 227 unchanged, 0 removed
business-development-books: Indexed 0 new, 0 updated, 6 unchanged, 0 removed
Embedded 47 chunks from 2 documents in 1s
Final status: 235 total files indexed; 3690 vectors embedded; whiteford-ai-law-pages 229 files updated 10s ago
```

Self smoke searches passed:

- `t_48930816` returned this report at score 87% and `docs/kanban-deliverable-index.md` at score 70%.
- `QMD Refresh 2026-05-11 Data Hygiene Tranche` returned this report at score 94%, `docs/kanban-deliverable-index.md` at score 93%, and the data-hygiene tranche review at score 93%.

A second final bounded update/embed was run after this evidence section was appended. It embedded 5 chunks from 1 updated document, left `whiteford-ai-law-pages` at 229 indexed markdown files, and increased total vectors to 3695. Final verification searches returned this report and the deliverable-index row for both `t_48930816` and the report title. No external or live-system action was required or authorized.
