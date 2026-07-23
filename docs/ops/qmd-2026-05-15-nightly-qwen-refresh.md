# QMD refresh — 2026-05-15 nightly Qwen handoffs

Task: `t_04e5692b`
Parent review task: `t_7cd1b8d5`
Scope: internal/private QMD memory/search support for the completed 2026-05-15 nightly Qwen handoffs. This report does not authorize outreach, HighLevel/CRM writes, workflow activation, contact enrollment, email/social/LinkedIn action, ads, Clio writes, Supabase DDL, SQLite mutation, public publishing, or client/prospect-facing action.

## Files checked

Filesystem artifacts existed before refresh:

- `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-15/nightly_qwen_prospect_digest_review_t_7cd1b8d5.md`
- `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-15/supabase_sync_report.md`
- `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-15/highlevel_agent_targeting_sync_noop_report.md`
- `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-15/digest.md`
- `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/KANBAN_DELIVERABLE_INDEX.md`

QMD indexes Markdown only for `whiteford-ai-law-pages` (`Pattern: **/*.md`). QMD URI/path display normalizes underscores to hyphens, so exact underscore filename queries can be weaker than task-ID, title, or normalized-token searches.

## Before status

Command:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd status
```

Exit status: `0`

Before refresh summary:

- Index: `/Users/jeff/.cache/qmd/index.sqlite`
- Size: 45.8 MB
- Documents: 370 files indexed
- Vectors: 7814 embedded
- Updated: 59m ago
- `whiteford-ai-law-pages`: 364 Markdown files
- `business-development-books`: 6 Markdown files
- Status emitted `[node-llama-cpp] ggml_metal_library_init_from_source: error compiling source`, but QMD status completed and reported the index.

## Before smoke-search results

Command pattern:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd search "<term>" -c whiteford-ai-law-pages --files -n 10
```

All before-search commands exited `0`.

| Term | Before result |
|---|---|
| `t_7cd1b8d5` | Miss |
| `2026-05-15 source-blocked nightly Qwen` | Hit only `qmd://whiteford-ai-law-pages/docs/kanban-deliverable-index.md`; did not retrieve the new 2026-05-15 review file |
| `highlevel_agent_targeting_sync_noop_report` | Hit older 2026-05-12/13/14 HighLevel reports and older QMD refresh/report files; did not retrieve the 2026-05-15 HighLevel no-op report |
| `supabase_sync_report` | Hit older 2026-05-06/07/08/09/14 Supabase reports and older nightly reviews; did not retrieve the 2026-05-15 Supabase sync report |

Because the new 2026-05-15 handoff files missed or were not in the top result set, I ran QMD update and bounded embedding.

## Refresh commands run

```bash
PATH="/opt/homebrew/bin:$PATH" qmd update
PATH="/opt/homebrew/bin:$PATH" qmd embed --max-docs-per-batch 50 --max-batch-mb 10
```

Exit statuses:

- `qmd update`: `0`
- `qmd embed --max-docs-per-batch 50 --max-batch-mb 10`: `0`

Refresh output summary:

- `whiteford-ai-law-pages`: indexed 7 new, 1 updated, 363 unchanged, 0 removed
- Cleaned up 1 orphaned content hash
- `business-development-books`: 0 new, 0 updated, 6 unchanged
- QMD reported 8 unique hashes needing vectors
- Bounded embed completed: embedded 126 chunks from 8 documents in 3s
- Embed emitted the same node-llama-cpp Metal compile warning, but completed successfully.

## After status

Command:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd status
```

Exit status: `0`

After refresh summary:

- Index: `/Users/jeff/.cache/qmd/index.sqlite`
- Size: 45.9 MB
- Documents: 377 files indexed
- Vectors: 7940 embedded
- Updated: 3m ago
- `whiteford-ai-law-pages`: 371 Markdown files
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
| `t_7cd1b8d5` | Hit `qmd://whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-15/nightly-qwen-prospect-digest-review-t-7cd1b8d5.md` and `qmd://whiteford-ai-law-pages/docs/kanban-deliverable-index.md` |
| `2026-05-15 source-blocked nightly Qwen` | Hit the 2026-05-15 nightly Qwen review, the 2026-05-15 validation report, and the deliverable index |
| `highlevel_agent_targeting_sync_noop_report` | Hit the 2026-05-15 HighLevel no-op report at rank 8; underscore filename query still favors older similarly named files |
| `highlevel agent targeting sync noop report 2026 05 15` | Hit the 2026-05-15 nightly Qwen review, the 2026-05-15 HighLevel no-op report, and the deliverable index |
| `supabase_sync_report` | Hit the 2026-05-15 Supabase sync report at rank 4, alongside older Supabase reports |
| `supabase sync report 2026 05 15` | Hit the 2026-05-15 nightly Qwen review, the 2026-05-15 Supabase sync report, the 2026-05-15 HighLevel no-op report, and the deliverable index |

## Collection-scope caveats

- QMD search is scoped here to `whiteford-ai-law-pages`; results from the separate `business-development-books` collection are intentionally excluded from the smoke searches.
- QMD indexes Markdown only under the configured collection pattern. Non-Markdown JSON artifacts are not expected to be retrievable except through Markdown reports/index references.
- QMD URI/path display normalizes underscores to hyphens. Exact underscore filename searches can rank older same-name artifacts higher; task-ID and normalized token searches are more reliable for these handoffs.
- QMD is internal memory/search support only. Direct files, Kanban handoffs, and Jeff/attorney approvals remain controlling.

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

- `whiteford-ai-law-pages`: indexed 1 new report, 1 updated deliverable index, 370 unchanged, 0 removed
- Cleaned up 1 orphaned content hash
- QMD reported 2 unique hashes needing vectors
- Bounded embed completed: embedded 102 chunks from 2 documents in 3s
- Final status after self-index: 378 files indexed, 8042 vectors embedded, `whiteford-ai-law-pages` 372 Markdown files, updated 12s before verification
- Smoke search `Refresh QMD for 2026-05-15 nightly Qwen handoffs` hit `qmd://whiteford-ai-law-pages/docs/ops/qmd-2026-05-15-nightly-qwen-refresh.md` and `qmd://whiteford-ai-law-pages/docs/kanban-deliverable-index.md`
- Smoke search `t_04e5692b` hit this report and the deliverable index
- Smoke search `t_7cd1b8d5` hit this report, the 2026-05-15 nightly Qwen review, and the deliverable index

## Final note

QMD is internal memory/search support only. Direct files, Kanban handoffs, Jeff/attorney approvals, source-access gates, Supabase schema gates, and HighLevel/CRM approval gates remain controlling. This refresh is not source-current proof, consent/conflicts/Clio clearance, CRM/Supabase/HighLevel state proof, or authorization for any live/public/client/prospect-facing action.
