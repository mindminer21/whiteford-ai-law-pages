# QMD refresh — 2026-05-21 22:30 watchdog daily digest and awareness handoffs

Task: `t_2a0b4fe5`
Date: 2026-05-21
Scope: internal local QMD/search maintenance only for same-day Whiteford Growth OS handoffs.

No DDL, Supabase sync/backfill, CRM/HighLevel mutation, contact/opportunity writes, workflow activation/enrollment, tags, sends, LinkedIn/social/public posting, ads, Clio writes, source-provider restoration, prospect reruns, or client-facing/public changes were performed.

## Commands run

```bash
PATH="/opt/homebrew/bin:$PATH" qmd status
PATH="/opt/homebrew/bin:$PATH" qmd search '2026-05-21_daily_digest' -n 8 --line-numbers
PATH="/opt/homebrew/bin:$PATH" qmd search 'Daily HighLevel/Growth OS optimization digest' -n 8 --line-numbers
PATH="/opt/homebrew/bin:$PATH" qmd search 'Strider Technologies LinkedIn awareness draft t_18913bcb' -n 8 --line-numbers
PATH="/opt/homebrew/bin:$PATH" qmd search 't_33bee133 Refresh QMD for 2026-05-21 nightly Qwen chain' -n 8 --line-numbers
PATH="/opt/homebrew/bin:$PATH" qmd search 't_fa6eb9c1 t_7884ab57' -n 8 --line-numbers
PATH="/opt/homebrew/bin:$PATH" qmd update
PATH="/opt/homebrew/bin:$PATH" qmd embed --max-docs-per-batch 50 --max-batch-mb 10
PATH="/opt/homebrew/bin:$PATH" qmd get qmd://whiteford-ai-law-pages/docs/digests/2026-05-21_daily_digest.md -l 40
PATH="/opt/homebrew/bin:$PATH" qmd search 'Firecrawl source-blocked zero-candidate run HighLevel 403 partial Supabase mirror 2026-05-21' -n 8 --line-numbers
PATH="/opt/homebrew/bin:$PATH" qmd search 'Daily HighLevel Growth OS optimization digest 2026-05-21' -n 8 --line-numbers
```

Raw command logs for this run were also saved temporarily under `/tmp/t_2a0b4fe5_qmd_before.log`, `/tmp/t_2a0b4fe5_qmd_update1.log`, `/tmp/t_2a0b4fe5_qmd_embed1.log`, `/tmp/t_2a0b4fe5_qmd_after1.log`, and `/tmp/t_2a0b4fe5_qmd_daily_digest_probe.log`.

## Before status

`PATH="/opt/homebrew/bin:$PATH" qmd status` before refresh reported:

- Index: `/Users/jeff/.cache/qmd/index.sqlite`
- Size: 73.7 MB
- Total documents: 508 files indexed
- Vectors: 14,969 embedded
- Updated: 20h ago
- `whiteford-ai-law-pages`: 502 files, updated 20h ago
- `business-development-books`: 6 files, updated 15d ago
- Device: Apple M5 Max, Metal offloading enabled
- Note: QMD printed `[node-llama-cpp] ggml_metal_library_init_from_source: error compiling source`, but status still completed and embeddings later completed successfully.

Before refresh smoke-search results:

| Query | Before result |
| --- | --- |
| `2026-05-21_daily_digest` | No results found. |
| `Daily HighLevel/Growth OS optimization digest` | No results found. |
| `Strider Technologies LinkedIn awareness draft t_18913bcb` | No results found. |
| `t_33bee133 Refresh QMD for 2026-05-21 nightly Qwen chain` | Hit `qmd://whiteford-ai-law-pages/docs/reports/2026-05-21-nightly-qwen-chain-qmd-refresh.md` and `qmd://whiteford-ai-law-pages/docs/kanban-deliverable-index.md`. |
| `t_fa6eb9c1 t_7884ab57` | Hit older blocker/dashboard/digest surfaces, including `docs/dashboard/2026-05-11-approval-command-center-exact-unblock-visibility-spec.md`, `docs/reviews/2026-05-18-approval-command-center-late-watchdog-refresh-review.md`, and 2026-05-19/2026-05-18/2026-05-15 digest surfaces. |

## Refresh run

`PATH="/opt/homebrew/bin:$PATH" qmd update` completed successfully:

- `whiteford-ai-law-pages`: 4 new, 1 updated, 501 unchanged, 0 removed.
- Cleaned up 1 orphaned content hash.
- `business-development-books`: 0 new, 0 updated, 6 unchanged, 0 removed.
- QMD reported 5 unique hashes needing vectors.

`PATH="/opt/homebrew/bin:$PATH" qmd embed --max-docs-per-batch 50 --max-batch-mb 10` completed successfully:

- Model: `hf:ggml-org/embeddinggemma-300M-GGUF/embeddinggemma-300M-Q8_0.gguf`
- Batch cap: 50 docs / 10.0 MB
- Embedded 172 chunks from 5 documents in 4s.
- QMD again printed the Metal source compile warning, but the embed job completed with exit code 0.

## After status

`PATH="/opt/homebrew/bin:$PATH" qmd status` after the first refresh reported:

- Index: `/Users/jeff/.cache/qmd/index.sqlite`
- Size: 73.9 MB
- Total documents: 512 files indexed
- Vectors: 15,141 embedded
- Updated: 14h ago
- `whiteford-ai-law-pages`: 506 files, updated 14h ago
- `business-development-books`: 6 files, updated 15d ago

The relative updated age appears tied to source file mtimes rather than wall-clock run time; the indexed-document count and vector count did change as expected.

## Smoke-search results after refresh

| Query | After result |
| --- | --- |
| `2026-05-21_daily_digest` | Still no direct full-text result. Caveat: QMD normalized the path to `qmd://whiteford-ai-law-pages/docs/digests/2026-05-21-daily-digest.md`, replacing underscores with hyphens in the QMD URI. Direct source file remains `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/digests/2026-05-21_daily_digest.md`. |
| `Daily HighLevel/Growth OS optimization digest` | Still no direct exact result with slash/case wording, but verified via equivalent normalized title query and deliverable-index/body hits below. |
| `Strider Technologies LinkedIn awareness draft t_18913bcb` | PASS. Hit `qmd://whiteford-ai-law-pages/docs/growth-os/linkedin-awareness-drafts/2026-05-21/2026-05-21-strider-technologies-linkedin-awareness-review-t-18913bcb.md`, `qmd://whiteford-ai-law-pages/docs/growth-os/linkedin-awareness-drafts/2026-05-21/2026-05-21-strider-technologies-linkedin-awareness-draft.md`, and `qmd://whiteford-ai-law-pages/docs/kanban-deliverable-index.md`. |
| `t_33bee133 Refresh QMD for 2026-05-21 nightly Qwen chain` | PASS. Hit `qmd://whiteford-ai-law-pages/docs/reports/2026-05-21-nightly-qwen-chain-qmd-refresh.md` and the deliverable index. |
| `t_fa6eb9c1 t_7884ab57` | PASS for blocker surface recall. Hit existing dashboard/review/digest records with both blocker task IDs. |

Additional verification for the daily digest:

- `qmd get qmd://whiteford-ai-law-pages/docs/digests/2026-05-21_daily_digest.md -l 40` succeeded and displayed `# Daily HighLevel / Growth OS Optimization Digest - 2026-05-21` plus the digest body. This confirms the source file is retrievable even though QMD lists the URI with hyphens.
- `qmd search 'Firecrawl source-blocked zero-candidate run HighLevel 403 partial Supabase mirror 2026-05-21' -n 8 --line-numbers` hit `qmd://whiteford-ai-law-pages/docs/kanban-deliverable-index.md` at the May 21 daily digest row.
- `qmd search 'Daily HighLevel Growth OS optimization digest 2026-05-21' -n 8 --line-numbers` hit `qmd://whiteford-ai-law-pages/docs/digests/2026-05-21-daily-digest.md` with title `Daily HighLevel / Growth OS Optimization Digest - 2026-05-21`, and also hit the deliverable index.

## Path normalization caveat

QMD appears to normalize underscores to hyphens in displayed `qmd://` URIs for some markdown paths. In this run, the filesystem path is:

`/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/digests/2026-05-21_daily_digest.md`

but `qmd ls whiteford-ai-law-pages/docs/digests` displayed:

`qmd://whiteford-ai-law-pages/docs/digests/2026-05-21-daily-digest.md`

The exact filename query with underscore missed, but `qmd get`, equivalent normalized title search, distinctive body search, and the deliverable-index row all verified the digest is indexed and searchable. Direct source files and Kanban handoffs remain controlling.

## Final self-indexing requirement

After this report and the deliverable index are updated, run one more:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd update
PATH="/opt/homebrew/bin:$PATH" qmd embed --max-docs-per-batch 50 --max-batch-mb 10
PATH="/opt/homebrew/bin:$PATH" qmd search 'QMD refresh 2026-05-21 22:30 watchdog daily digest awareness handoffs t_2a0b4fe5' -n 8 --line-numbers
PATH="/opt/homebrew/bin:$PATH" qmd get qmd://whiteford-ai-law-pages/docs/reports/2026-05-21-2230-watchdog-qmd-refresh.md -l 20
```

The post-final-edit results will be appended below.

## Final self-index results

After the report and deliverable-index entry were written, the final self-index run completed successfully:

- `qmd update`: 1 new, 1 updated, 505 unchanged in `whiteford-ai-law-pages`; 0 changes in `business-development-books`; 2 unique hashes needed vectors.
- `qmd embed --max-docs-per-batch 50 --max-batch-mb 10`: embedded 155 chunks from 2 documents in 4s.
- Final `qmd status`: 513 files indexed, 15,296 vectors embedded, index size 74.0 MB, `whiteford-ai-law-pages` 507 files updated 14s ago.
- Final report title/task search `QMD refresh 2026-05-21 22:30 watchdog daily digest awareness handoffs t_2a0b4fe5`: PASS, hit this report at `qmd://whiteford-ai-law-pages/docs/reports/2026-05-21-2230-watchdog-qmd-refresh.md` and the deliverable-index row.
- Final exact filename/path query `2026-05-21-2230-watchdog-qmd-refresh.md`: no result as a standalone filename query; this matches the path-normalization/exact-path caveat. Direct `qmd get qmd://whiteford-ai-law-pages/docs/reports/2026-05-21-2230-watchdog-qmd-refresh.md -l 24` succeeded and displayed this report title and body.

Final conclusion: QMD was refreshed, newly indexed same-day artifacts are searchable by distinctive title/body/task surfaces, the report and deliverable-index row are self-indexed, and exact filename/path searches may still miss due to QMD URI/path normalization. Direct source files and Kanban handoffs remain controlling.
