# QMD refresh — 2026-05-22 nightly Qwen handoff chain

Task: `t_e029011b`
Tenant: `whiteford-mountain-west`
Generated: 2026-05-22 02:34:46 MDT

## Scope

Refreshed local QMD/searchability for the completed 2026-05-22 nightly Qwen prospect research chain after the reviewer handoff. This is internal/private QMD retrieval maintenance only.

Chain surfaces verified or intentionally self-indexed here:

- Container/control task: `t_2bf4dc89` — `Nightly Qwen prospect research - 2026-05-22`; distinctive body/result terms: `cron-created 2026-05-22 prospecting graph`, `research -> validation -> review/sync gates`, and `docs/nightly-lead-research/runs/2026-05-22`.
- Qwen research task: `t_6e5ba4f8` — `Run qwen-local structured prospect research - 2026-05-22`; source artifacts: `docs/nightly-lead-research/runs/2026-05-22/prospect_candidates.json` and `docs/nightly-lead-research/runs/2026-05-22/digest.md`.
- Validation/staging task: `t_e4acb4a2` — `Validate and stage nightly prospects - 2026-05-22`; source artifact: `docs/nightly-lead-research/runs/2026-05-22/validation_report.md`.
- Review task: `t_231f89d4` — `Review nightly Qwen prospect research digest - 2026-05-22`; source artifact: `docs/nightly-lead-research/runs/2026-05-22/nightly_qwen_prospect_digest_review_t_231f89d4.md`.
- This refresh report: `docs/reports/2026-05-22-0230-nightly-qwen-qmd-refresh.md`.

No Supabase DDL/sync/backfill, HighLevel live or dry-run sync, contact/opportunity/tag/field mutation, workflow activation/enrollment, sends, outreach, LinkedIn/social/ad action, Clio write, public deployment, or client/prospect-facing action was performed.

## Commands run

All commands were run from `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages` with `PATH="/opt/homebrew/bin:$PATH"`.

Initial refresh:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd status
PATH="/opt/homebrew/bin:$PATH" qmd search "<probe>" -c whiteford-ai-law-pages --limit 5
PATH="/opt/homebrew/bin:$PATH" qmd update
PATH="/opt/homebrew/bin:$PATH" qmd embed --max-docs-per-batch 50 --max-batch-mb 10
PATH="/opt/homebrew/bin:$PATH" qmd status
PATH="/opt/homebrew/bin:$PATH" qmd get qmd://whiteford-ai-law-pages/<source-path>
```

Raw initial refresh log:

- `/tmp/t_e029011b_qmd_initial.log`

QMD printed the non-blocking diagnostic `[node-llama-cpp] ggml_metal_library_init_from_source: error compiling source` during `status`/`embed`, but the commands exited `0` and embedding completed.

## Initial QMD status

Before refresh:

- Index: `/Users/jeff/.cache/qmd/index.sqlite`
- Size: 77.3 MB
- Documents: 516 indexed files
- Vectors: 15,635 embedded
- Collection `whiteford-ai-law-pages`: 510 Markdown files, updated about 1 hour earlier
- Collection `business-development-books`: 6 Markdown files

## Before-refresh smoke searches

All before-refresh probe searches missed the 2026-05-22 nightly Qwen chain surfaces:

| Probe | Before result |
|---|---|
| `t_2bf4dc89 Nightly Qwen prospect research 2026-05-22` | MISS. No results found. |
| `t_6e5ba4f8 Run qwen-local structured prospect research 2026-05-22` | MISS. No results found. |
| `qwen-local research run t_6e5ba4f8 Gate 1 failed no prospects researched` | MISS. No results found. |
| `t_e4acb4a2 validation_report 2026-05-22` | MISS. No results found. |
| `t_231f89d4 nightly_qwen_prospect_digest_review 2026-05-22` | MISS. No results found. |
| `nightly_qwen_prospect_digest_review_t_231f89d4` | MISS. No results found. |
| `2026-05-22-0230-nightly-qwen-qmd-refresh` | MISS as expected because this report did not exist yet. |

## Refresh result

`qmd update`:

- `whiteford-ai-law-pages`: indexed 6 new, 1 updated, 509 unchanged, 0 removed.
- Cleaned up 1 orphaned content hash.
- `business-development-books`: indexed 0 new, 0 updated, 6 unchanged, 0 removed.

`qmd embed --max-docs-per-batch 50 --max-batch-mb 10`:

- Embedded 174 chunks from 7 documents in 4 seconds.

After refresh status:

- Index size: 77.7 MB
- Documents: 522 indexed files
- Vectors: 15,809 embedded
- Collection `whiteford-ai-law-pages`: 516 Markdown files

## Post-refresh smoke searches before self-indexing this report

| Probe | Result after update/embed |
|---|---|
| `t_2bf4dc89 Nightly Qwen prospect research 2026-05-22` | MISS in QMD because the container/control task lived in Kanban state rather than a Markdown artifact indexed before this report. This report and the updated deliverable index intentionally include the container task ID/title/body terms for final self-index retrieval. |
| `t_6e5ba4f8 Run qwen-local structured prospect research 2026-05-22` | PASS. Hit `docs/kanban-deliverable-index.md` at the `t_6e5ba4f8` row. |
| `qwen-local research run t_6e5ba4f8 Gate 1 failed no prospects researched` | PASS. Hit `docs/nightly-lead-research/runs/2026-05-22/digest.md` with the H1 and Gate 1 status. |
| `t_e4acb4a2 validation_report 2026-05-22` | PASS. Hit `docs/nightly-lead-research/runs/2026-05-22/validation-report.md:1` and the deliverable-index row. |
| `t_231f89d4 nightly_qwen_prospect_digest_review 2026-05-22` | PASS. Hit `docs/nightly-lead-research/runs/2026-05-22/nightly-qwen-prospect-digest-review-t-231f89d4.md:1` and the deliverable-index row. |
| `nightly_qwen_prospect_digest_review_t_231f89d4` | PASS. Hit the review report and the deliverable-index row. |

## Direct QMD get verification before self-indexing this report

`qmd get` returned current content for these controlling Markdown artifacts:

- `qmd://whiteford-ai-law-pages/docs/KANBAN_DELIVERABLE_INDEX.md`
- `qmd://whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-22/digest.md`
- `qmd://whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-22/validation_report.md`
- `qmd://whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-22/nightly_qwen_prospect_digest_review_t_231f89d4.md`

QMD search output normalized some source filenames from underscores to hyphens, for example `validation_report.md` displayed as `validation-report.md` and `nightly_qwen_prospect_digest_review_t_231f89d4.md` displayed as `nightly-qwen-prospect-digest-review-t-231f89d4.md`. Direct `qmd get` using the underscore source paths still worked after refresh.

## Final self-index verification

After writing this report and updating `docs/KANBAN_DELIVERABLE_INDEX.md`, I ran:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd update
PATH="/opt/homebrew/bin:$PATH" qmd embed --max-docs-per-batch 50 --max-batch-mb 10
PATH="/opt/homebrew/bin:$PATH" qmd status
```

Raw self-index log:

- `/tmp/t_e029011b_qmd_self_index.log`

Self-index result:

- `qmd update`: `whiteford-ai-law-pages` indexed 1 new, 1 updated, 515 unchanged, 0 removed, and cleaned 1 orphaned content hash; `business-development-books` remained 0 new, 0 updated, 6 unchanged, 0 removed.
- `qmd embed --max-docs-per-batch 50 --max-batch-mb 10`: embedded 159 chunks from 2 documents in 4 seconds.
- Final status showed 523 total indexed files, 15,968 embedded vectors, and `whiteford-ai-law-pages` at 517 Markdown files updated 30 seconds earlier.

Final smoke searches verified:

| Probe | Final result |
|---|---|
| `t_e029011b` | PASS. Hit this report and the deliverable-index row. |
| `2026-05-22-0230-nightly-qwen-qmd-refresh` | PASS. Hit this report and the deliverable-index row. |
| `QMD refresh 2026-05-22 nightly Qwen handoff chain` | PASS. Hit this report and the deliverable-index row. |
| `t_2bf4dc89 Nightly Qwen prospect research 2026-05-22` | PASS. Hit this report and the deliverable-index row. The source/control details for this container task are Kanban-state rather than a standalone Markdown file, so this self-index report is the QMD retrieval surface for the container task. |
| `t_6e5ba4f8 Run qwen-local structured prospect research 2026-05-22` | PASS. Hit this report and the existing deliverable-index row. |
| `qwen-local research run t_6e5ba4f8 Gate 1 failed no prospects researched` | PASS. Hit the qwen-local digest, this report, and the deliverable index. |
| `t_e4acb4a2 validation_report 2026-05-22` | PASS. Hit this report, the validation report, and the deliverable index. |
| `t_231f89d4 nightly_qwen_prospect_digest_review 2026-05-22` | PASS. Hit this report, the review report, and the deliverable index. |
| `nightly_qwen_prospect_digest_review_t_231f89d4` | PASS. Hit this report, the review report, and the deliverable index. |

Final direct `qmd get` verified:

- `qmd://whiteford-ai-law-pages/docs/reports/2026-05-22-0230-nightly-qwen-qmd-refresh.md`
- `qmd://whiteford-ai-law-pages/docs/KANBAN_DELIVERABLE_INDEX.md`
- `qmd://whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-22/digest.md`
- `qmd://whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-22/validation_report.md`
- `qmd://whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-22/nightly_qwen_prospect_digest_review_t_231f89d4.md`

## QMD caveats

- QMD is a support/search layer only. Direct Markdown source files and Kanban handoffs remain controlling.
- QMD can miss exact slash/underscore/punctuation-heavy path probes even when normalized title/task-ID probes or direct `qmd get` work.
- QMD searchability does not authorize public/client-facing use, CRM/HighLevel/Supabase/Clio mutation, workflow activation/enrollment, tag, send, outreach, LinkedIn/social/ad action, DDL, sync, backfill, source-provider restoration, or any other live action.

## Verdict

Local QMD for the 2026-05-22 nightly Qwen handoff chain was stale before refresh. After `qmd update` and bounded `qmd embed`, QMD found the qwen-local digest, validation report, reviewer report, and deliverable-index rows by task IDs/titles/distinctive body terms, while the Kanban-only container task `t_2bf4dc89` was made searchable through this self-indexed report and index row.
