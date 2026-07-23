# QMD refresh report — data-hygiene and consent-gate handoffs — 2026-05-15

Task: `t_85845d99`
Tenant: `whiteford-mountain-west`
Run timestamp: 2026-05-14 23:03 MDT
Posture: local QMD indexing/search only. This report is internal memory support, not live public-source proof, legal approval, CRM/Supabase/HighLevel/Clio approval, workflow authorization, outreach permission, or client/prospect-facing action.

## Inputs checked

- Daily digest: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/digests/2026-05-14_daily_digest.md`
- Data-hygiene cleanup packet: `t_eec256f3` — `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/growth-os/data-hygiene/2026-05-15_growth_os_data_hygiene_cleanup_packet.md`
- Consent-gate decision checklist: `t_8c79cbe4` — `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/lead-magnets/2026-05-15_consent_gate_decision_checklist.md`
- Review report: `t_d03ac374` — `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/reviews/2026-05-15_data_hygiene_consent_gate_review.md`
- Deliverable index: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/KANBAN_DELIVERABLE_INDEX.md`

## Initial QMD status

Command:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd status
```

Result before update/embed:

- Index: `/Users/jeff/.cache/qmd/index.sqlite`
- Size: 41.9 MB
- Documents: 354 files indexed
- Vectors: 7117 embedded
- Updated: 18h ago
- `whiteford-ai-law-pages`: 348 Markdown files, updated 18h ago
- `business-development-books`: 6 Markdown files, updated 9d ago
- Device: Apple M5 Max / Metal offloading yes
- Note: status emitted `[node-llama-cpp] ggml_metal_library_init_from_source: error compiling source`, but status completed and reported collection/model/device information.

## Initial smoke searches

Commands:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd search "2026-05-14 daily digest" --limit 5 --json
PATH="/opt/homebrew/bin:$PATH" qmd search "2026-05-15 growth os data hygiene cleanup packet" --limit 5 --json
PATH="/opt/homebrew/bin:$PATH" qmd search "2026-05-15 consent gate decision checklist" --limit 5 --json
PATH="/opt/homebrew/bin:$PATH" qmd search "2026-05-15 data hygiene consent gate review" --limit 5 --json
PATH="/opt/homebrew/bin:$PATH" qmd search "t_eec256f3" --limit 5 --json
PATH="/opt/homebrew/bin:$PATH" qmd search "t_8c79cbe4" --limit 5 --json
PATH="/opt/homebrew/bin:$PATH" qmd search "t_d03ac374" --limit 5 --json
```

Initial result: refresh was needed.

- `2026-05-14 daily digest` returned the deliverable index and the 2026-05-14 06:30 morning action brief, but did not return `docs/digests/2026-05-14_daily_digest.md` directly.
- The data-hygiene packet query returned `[]`.
- The consent-gate checklist query returned `[]`.
- The review report query returned `[]`.
- `t_eec256f3`, `t_8c79cbe4`, and `t_d03ac374` all returned `[]`.

## Refresh performed

Commands:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd update
PATH="/opt/homebrew/bin:$PATH" qmd embed --max-docs-per-batch 50 --max-batch-mb 10
```

`qmd update` result:

- `whiteford-ai-law-pages`: 6 new, 1 updated, 347 unchanged, 0 removed
- Cleaned up 1 orphaned content hash
- `business-development-books`: 0 new, 0 updated, 6 unchanged, 0 removed
- Update reported 7 unique hashes needing vectors.

`qmd embed` result:

- Model: `hf:ggml-org/embeddinggemma-300M-GGUF/embeddinggemma-300M-Q8_0.gguf`
- Batch: 50 docs / 10.0 MB
- Embedded 128 chunks from 7 documents in 3s
- The same Metal compile warning appeared, but embedding completed successfully.

## Post-refresh QMD status

Command:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd status
```

Result after update/embed:

- Index: `/Users/jeff/.cache/qmd/index.sqlite`
- Size: 44.9 MB
- Documents: 360 files indexed
- Vectors: 7245 embedded
- Updated: 2m ago
- `whiteford-ai-law-pages`: 354 Markdown files, updated 2m ago
- `business-development-books`: 6 Markdown files, updated 9d ago
- Device: Apple M5 Max / Metal offloading yes
- Note: status again emitted `[node-llama-cpp] ggml_metal_library_init_from_source: error compiling source`, but status completed.

## Post-refresh smoke-search verification

Commands repeated:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd search "2026-05-14 daily digest" --limit 5 --json
PATH="/opt/homebrew/bin:$PATH" qmd search "2026-05-15 growth os data hygiene cleanup packet" --limit 5 --json
PATH="/opt/homebrew/bin:$PATH" qmd search "2026-05-15 consent gate decision checklist" --limit 5 --json
PATH="/opt/homebrew/bin:$PATH" qmd search "2026-05-15 data hygiene consent gate review" --limit 5 --json
PATH="/opt/homebrew/bin:$PATH" qmd search "t_eec256f3" --limit 5 --json
PATH="/opt/homebrew/bin:$PATH" qmd search "t_8c79cbe4" --limit 5 --json
PATH="/opt/homebrew/bin:$PATH" qmd search "t_d03ac374" --limit 5 --json
```

Verified retrieval after update/embed:

- `2026-05-14 daily digest` retrieved `qmd://whiteford-ai-law-pages/docs/digests/2026-05-14-daily-digest.md` as the top result with title `Daily HighLevel Growth OS Optimization Digest - 2026-05-14`, and also retrieved the deliverable-index row.
- `2026-05-15 growth os data hygiene cleanup packet` retrieved `qmd://whiteford-ai-law-pages/docs/growth-os/data-hygiene/2026-05-15-growth-os-data-hygiene-cleanup-packet.md` as the top result with title `Growth OS data-hygiene cleanup packet — 2026-05-15`, plus the deliverable-index row.
- `2026-05-15 consent gate decision checklist` retrieved the newly indexed data-hygiene packet plus the deliverable-index row for `t_8c79cbe4`; it did not retrieve the checklist file as a direct top-5 result.
- `2026-05-15 data hygiene consent gate review` retrieved the newly indexed data-hygiene packet plus the deliverable-index row for `t_d03ac374`; it did not retrieve the review file as a direct top-5 result.
- `t_eec256f3` retrieved the data-hygiene packet as the top result plus the deliverable-index row.
- `t_8c79cbe4` retrieved the deliverable-index row pointing to the consent-gate checklist; it did not retrieve the checklist file as a direct top-5 result.
- `t_d03ac374` retrieved the deliverable-index row pointing to the review report; it did not retrieve the review file as a direct top-5 result.

Additional exact/variant searches tried for the checklist and review:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd search "Consent-gate decision checklist 2026-05-15 t_8c79cbe4" --limit 5 --json
PATH="/opt/homebrew/bin:$PATH" qmd search "Task t_8c79cbe4 Consent-gate decision checklist" --limit 5 --json
PATH="/opt/homebrew/bin:$PATH" qmd search "Review 2026-05-15 data-hygiene cleanup packet consent-gate checklist t_d03ac374" --limit 5 --json
PATH="/opt/homebrew/bin:$PATH" qmd search "Task t_d03ac374 Review data hygiene consent gate" --limit 5 --json
PATH="/opt/homebrew/bin:$PATH" qmd search "2026-05-15_consent_gate_decision_checklist" --limit 5 --json
PATH="/opt/homebrew/bin:$PATH" qmd search "2026-05-15_data_hygiene_consent_gate_review" --limit 5 --json
```

- The title/task variants still returned the deliverable-index rows for `t_8c79cbe4` and `t_d03ac374` rather than direct checklist/review hits.
- The underscore filename queries returned `[]`, consistent with QMD URI normalization using hyphens.

## Indexed-file existence check

Command:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd ls whiteford-ai-law-pages | grep -E '2026-05-15|2026-05-14-daily|consent|hygiene'
```

QMD did list the expected newly indexed Markdown files, including:

- `qmd://whiteford-ai-law-pages/docs/digests/2026-05-14-daily-digest.md`
- `qmd://whiteford-ai-law-pages/docs/growth-os/data-hygiene/2026-05-15-growth-os-data-hygiene-cleanup-packet.md`
- `qmd://whiteford-ai-law-pages/docs/lead-magnets/2026-05-15-consent-gate-decision-checklist.md`
- `qmd://whiteford-ai-law-pages/docs/reviews/2026-05-15-data-hygiene-consent-gate-review.md`

## Caveats and boundaries

- PASS for local QMD indexing freshness and partial searchability: the target files are indexed, the daily digest and data-hygiene packet are directly search-retrievable, and the consent-gate checklist/review are discoverable through the indexed deliverable rows and `qmd ls` but not direct top-5 `qmd search` hits in this run.
- QMD normalizes file names in URI output with hyphens; the source files remain at their underscore paths on disk.
- QMD retrieval is internal local-memory support only. Direct files and Kanban handoffs remain controlling.
- No Supabase DDL/sync/backfill, HighLevel/CRM/Clio/SQLite mutation, dashboard approval/execution, workflow activation/testing/enrollment, sends, social/LinkedIn, ads, public publishing, source-restoration side effects, prospect/client contact, or client-facing action was authorized or performed.

## Self-index verification

After writing this report and updating `docs/KANBAN_DELIVERABLE_INDEX.md`, I ran:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd update
PATH="/opt/homebrew/bin:$PATH" qmd embed --max-docs-per-batch 50 --max-batch-mb 10
PATH="/opt/homebrew/bin:$PATH" qmd search "QMD refresh report data hygiene consent gate handoffs 2026-05-15 t_85845d99" --limit 5 --json
PATH="/opt/homebrew/bin:$PATH" qmd search "t_85845d99" --limit 5 --json
```

Self-index result:

- `qmd update`: 1 new report, 1 updated deliverable-index file, 353 unchanged, 0 removed; 2 unique hashes needed vectors.
- `qmd embed`: embedded 97 chunks from 2 documents in 2s.
- The report query retrieved `qmd://whiteford-ai-law-pages/docs/ops/qmd-2026-05-15-data-hygiene-consent-refresh.md` as the top result and the deliverable-index row as the second result.
- `t_85845d99` retrieved this report as the top result and the deliverable-index row as the second result.

## Final status

PASS with caveat for local QMD refresh. `qmd update` and bounded `qmd embed` refreshed the collection from 354/7117 to 360/7245 indexed documents/vectors before this report was written; the expected current Markdown files are listed by QMD, the daily digest and data-hygiene packet are directly smoke-searchable, and the checklist/review/task IDs are at least retrievable through the indexed deliverable-index rows. This report and its deliverable-index row were then self-indexed and verified by title/task-ID search.
