# QMD refresh — 2026-05-21 nightly Qwen chain

Task: `t_33bee133`
Parent review task indexed: `t_7915095e`
Supabase mirror task indexed: `t_20b815f4`
HighLevel no-op task indexed: `t_73616310`
Validation task indexed: `t_4143651f`
Generated: 2026-05-21 01:55:04 MDT
Status: internal/private QMD retrieval maintenance only. This report intentionally includes the exact smoke-search phrases `nightly_qwen_prospect_digest_review_t_7915095e`, `t_20b815f4 supabase_sync_report 2026-05-21`, `2026-05-21 nightly Qwen prospect digest review`, `highlevel_agent_targeting_sync_noop_report`, and `validation_report.md 2026-05-21 nightly prospects` for self-index verification. No HighLevel probe, CRM/Supabase/Clio mutation, workflow activation/enrollment, tag, send, outreach, LinkedIn/social/ad action, public/client-facing action, DDL, sync, backfill, source-provider restoration, or production credential use was performed.

## Scope

Refreshed and verified local QMD retrieval for the completed 2026-05-21 nightly Qwen handoff chain and the updated Kanban deliverable-index rows.

Source artifacts:

- `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/KANBAN_DELIVERABLE_INDEX.md`
- `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-21/nightly_qwen_prospect_digest_review_t_7915095e.md`
- `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-21/supabase_sync_report.md`
- `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-21/highlevel_agent_targeting_sync_noop_report.md`
- `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-21/validation_report.md`

## Commands run

All commands were run from `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages` with `PATH="/opt/homebrew/bin:$PATH"`.

Required refresh:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd status
PATH="/opt/homebrew/bin:$PATH" qmd update
PATH="/opt/homebrew/bin:$PATH" qmd embed --max-docs-per-batch 50 --max-batch-mb 10
PATH="/opt/homebrew/bin:$PATH" qmd status
```

QMD printed `[node-llama-cpp] ggml_metal_library_init_from_source: error compiling source` during status/embed output, but the commands exited `0` and indexing/embedding completed.

Raw logs retained during this run:

- `/tmp/t_33bee133_qmd_refresh.log`
- `/tmp/t_33bee133_qmd_searches_after.log`
- `/tmp/t_33bee133_qmd_gets_after.log`

## Before status

`PATH="/opt/homebrew/bin:$PATH" qmd status`

```text
QMD Status

Index: /Users/jeff/.cache/qmd/index.sqlite
Size:  73.4 MB

Documents
  Total:    500 files indexed
  Vectors:  14625 embedded
  Updated:  1h ago

Collections
  whiteford-ai-law-pages (qmd://whiteford-ai-law-pages/)
    Pattern:  **/*.md
    Files:    494 (updated 1h ago)
  business-development-books (qmd://business-development-books/)
    Pattern:  **/*.md
    Files:    6 (updated 15d ago)
```

## Refresh result

- `qmd update`: for `whiteford-ai-law-pages`, indexed `7 new`, `1 updated`, `493 unchanged`, `0 removed`, and cleaned `1 orphaned content hash`; for `business-development-books`, indexed `0 new`, `0 updated`, `6 unchanged`, `0 removed`.
- `qmd embed --max-docs-per-batch 50 --max-batch-mb 10`: embedded `180 chunks from 8 documents in 4s`.

## After status

`PATH="/opt/homebrew/bin:$PATH" qmd status`

```text
QMD Status

Index: /Users/jeff/.cache/qmd/index.sqlite
Size:  73.7 MB

Documents
  Total:    507 files indexed
  Vectors:  14805 embedded
  Updated:  2m ago

Collections
  whiteford-ai-law-pages (qmd://whiteford-ai-law-pages/)
    Pattern:  **/*.md
    Files:    501 (updated 2m ago)
  business-development-books (qmd://business-development-books/)
    Pattern:  **/*.md
    Files:    6 (updated 15d ago)
```

## After smoke searches

All searches used `PATH="/opt/homebrew/bin:$PATH" qmd search "<probe>" -c whiteford-ai-law-pages --limit 5`.

| Probe | After result |
|---|---|
| `nightly_qwen_prospect_digest_review_t_7915095e` | PASS. Hit the 2026-05-21 review report at `docs/nightly-lead-research/runs/2026-05-21/nightly-qwen-prospect-digest-review-t-7915095e.md:1` and the deliverable-index row at `docs/kanban-deliverable-index.md:7`. |
| `t_20b815f4 supabase_sync_report 2026-05-21` | PASS. Hit the 2026-05-21 review report material list, the Supabase report at `docs/nightly-lead-research/runs/2026-05-21/supabase-sync-report.md:92`, and the deliverable-index row at `docs/kanban-deliverable-index.md:11`. |
| `2026-05-21 nightly Qwen prospect digest review` | PASS. Hit the current review report at line 1, the 2026-05-21 digest, the 2026-05-21 nightly run prompt, and the deliverable-index row. |
| `t_7915095e` | PASS. Hit the current review report at line 4 and the deliverable-index row. |
| `t_73616310 highlevel_agent_targeting_sync_noop_report 2026-05-21` | PASS. Hit the current review report material list, the 2026-05-21 HighLevel no-op report at `docs/nightly-lead-research/runs/2026-05-21/highlevel-agent-targeting-sync-noop-report.md:1`, and the deliverable-index row. |
| `t_4143651f validation_report 2026-05-21` | PASS. Hit the validation report at `docs/nightly-lead-research/runs/2026-05-21/validation-report.md:1`, the HighLevel report reference to upstream validation, the review report material list, and the deliverable-index row. |
| `nightly-lead-research/runs/2026-05-21/supabase_sync_report.md` | MISS for slash/underscore exact path form. Normalized task/title query and direct `qmd get` both verify the report is indexed. |
| `highlevel_agent_targeting_sync_noop_report` | PARTIAL/MISS for generic underscore-only filename form; older reports outranked the 2026-05-21 report. Targeted task/date query and direct `qmd get` both verify the 2026-05-21 report is indexed. |
| `validation_report.md 2026-05-21 nightly prospects` | MISS for this exact punctuation-heavy filename phrase. Targeted task/date query and direct `qmd get` both verify the 2026-05-21 validation report is indexed. |

## Direct QMD get verification

`qmd get` returned current content for all controlling Markdown artifacts using QMD's normalized hyphenated URI display paths:

- `qmd://whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-21/nightly-qwen-prospect-digest-review-t-7915095e.md`
- `qmd://whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-21/supabase-sync-report.md`
- `qmd://whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-21/highlevel-agent-targeting-sync-noop-report.md`
- `qmd://whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-21/validation-report.md`
- `qmd://whiteford-ai-law-pages/docs/kanban-deliverable-index.md`

Path note: QMD result display normalizes underscores to hyphens in result URLs for some documents, while the source files on disk retain underscores. Exact slash/underscore path probes can miss even when the normalized document is retrievable.

## Self-index result

After writing this report and updating the deliverable index, I ran the same bounded self-index refresh:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd update
PATH="/opt/homebrew/bin:$PATH" qmd embed --max-docs-per-batch 50 --max-batch-mb 10
PATH="/opt/homebrew/bin:$PATH" qmd status
```

Self-index result:

- `qmd update`: for `whiteford-ai-law-pages`, indexed `1 new`, `1 updated`, `500 unchanged`, `0 removed`, and cleaned `1 orphaned content hash`; for `business-development-books`, indexed `0 new`, `0 updated`, `6 unchanged`, `0 removed`.
- `qmd embed --max-docs-per-batch 50 --max-batch-mb 10`: embedded `156 chunks from 2 documents in 4s`.
- Follow-up status showed `508 files indexed`, `14961 embedded`, and `whiteford-ai-law-pages` at `502` Markdown files updated `15s ago`.

Final smoke searches confirmed:

| Probe | Result |
|---|---|
| `t_33bee133` | Hit this report and the deliverable-index row. |
| `2026-05-21 nightly Qwen chain QMD refresh` | Hit this report H1 and the deliverable-index row. |
| `2026-05-21-nightly-qwen-chain-qmd-refresh` | Hit this report and the deliverable-index row. |
| `nightly_qwen_prospect_digest_review_t_7915095e` | Hit this report, the current 2026-05-21 review report, and the deliverable-index row. |
| `t_20b815f4 supabase_sync_report 2026-05-21` | Hit this report, the current review report material list, the Supabase report, and the deliverable-index row. |
| `t_73616310 highlevel_agent_targeting_sync_noop_report 2026-05-21` | Hit this report, the current review report material list, the HighLevel no-op report, and the deliverable-index row. |
| `t_4143651f validation_report 2026-05-21` | Hit this report, the validation report, the HighLevel report reference to upstream validation, the review report material list, and the deliverable-index row. |

Because this section was added after that self-index pass, I ran one final bounded `qmd update`/`qmd embed` pass to index the finalized report body.

## QMD caveats

- QMD is internal memory/search support only. Direct source Markdown, tests, code, and Kanban handoffs remain controlling.
- QMD search does not authorize public/client-facing use, legal/privacy signoff, workflow activation/enrollment, outreach, send, CRM/HighLevel/Supabase/Clio mutation, DDL, sync, backfill, or any live action.
- QMD can miss exact punctuation-heavy, slash-form, or underscore filename probes even after indexing; normalized task-ID/title/date probes and direct `qmd get` are more reliable.

## Verdict

QMD retrieval for the 2026-05-21 nightly Qwen chain is refreshed. The review report, Supabase sync report, HighLevel no-op report, validation report, and deliverable-index rows are retrievable by task IDs, normalized titles, targeted task/date/report probes, and direct `qmd get`, with underscore/slash exact-path caveats documented above.
