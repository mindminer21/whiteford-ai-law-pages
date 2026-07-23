# QMD refresh — 2026-05-22 digest RAG wording correction

Task: `t_d6a3145f`
Tenant: `whiteford-mountain-west`
Generated: 2026-05-22 04:38:00 MDT

## Scope

Refreshed local QMD/searchability for the corrected 2026-05-22 nightly digest RAG wording chain after reviewer PASS `t_ee538185`.

Artifacts in scope:

- Corrected digest: `docs/nightly-lead-research/runs/2026-05-22/digest.md`
- Writer implementation note: `docs/nightly-lead-research/runs/2026-05-22/local_rag_wording_correction_note_t_c7ea9913.md`
- Reviewer note: `docs/reviews/2026-05-22_digest_local_rag_wording_correction_review_t_ee538185.md`
- Deliverable-index rows for `t_c7ea9913`, `t_ee538185`, and this task `t_d6a3145f`
- This QMD refresh report: `docs/reports/2026-05-22-digest-rag-wording-correction-qmd-refresh.md`

This was internal/private QMD retrieval maintenance only. No Supabase/HighLevel/Clio mutation, DDL/sync/backfill, contact/opportunity/tag/field/workflow action, send, outreach, LinkedIn/social/ad action, source-provider restoration, public deployment, or client/prospect-facing action was performed.

## Commands run

All commands were run from `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages` with `PATH="/opt/homebrew/bin:$PATH"`.

Initial refresh and direct-get check:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd status
PATH="/opt/homebrew/bin:$PATH" qmd search "<probe>" -c whiteford-ai-law-pages --limit 5
PATH="/opt/homebrew/bin:$PATH" qmd update
PATH="/opt/homebrew/bin:$PATH" qmd embed --max-docs-per-batch 50 --max-batch-mb 10
PATH="/opt/homebrew/bin:$PATH" qmd status
PATH="/opt/homebrew/bin:$PATH" qmd get qmd://whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-22/digest.md
PATH="/opt/homebrew/bin:$PATH" qmd get qmd://whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-22/local_rag_wording_correction_note_t_c7ea9913.md
PATH="/opt/homebrew/bin:$PATH" qmd get qmd://whiteford-ai-law-pages/docs/reviews/2026-05-22_digest_local_rag_wording_correction_review_t_ee538185.md
PATH="/opt/homebrew/bin:$PATH" qmd get qmd://whiteford-ai-law-pages/docs/KANBAN_DELIVERABLE_INDEX.md
```

Raw initial log:

- `/tmp/t_d6a3145f_qmd_initial.log`

QMD printed the known non-blocking diagnostic `[node-llama-cpp] ggml_metal_library_init_from_source: error compiling source` during `status`/`embed`, but the commands exited `0` and embedding completed.

## Initial QMD status

Before refresh:

- Index: `/Users/jeff/.cache/qmd/index.sqlite`
- Size: 77.7 MB
- Documents: 523 indexed files
- Vectors: 15,974 embedded
- Collection `whiteford-ai-law-pages`: 517 Markdown files, updated about 2 hours earlier
- Collection `business-development-books`: 6 Markdown files

## Before-refresh smoke searches

Before `qmd update`, QMD missed the new correction/review task-ID retrieval surfaces and this not-yet-created report:

| Probe | Before result |
|---|---|
| `t_c7ea9913 Local RAG Wording Correction Note 2026-05-22 Nightly Qwen Digest` | MISS. No results found. |
| `local_rag_wording_correction_note_t_c7ea9913` | MISS. No results found. |
| `t_ee538185 Review 2026-05-22 digest local-RAG wording correction` | MISS. No results found. |
| `digest local-RAG wording correction QMD business-development RAG available internal strategy Gate 1` | PARTIAL. Returned the prior reviewer note and older related source-access material, but not the new correction note/review rows. |
| `QMD collections were available for internal strategy/rubric support not a substitute for current public-source prospect evidence` | MISS. No results found. |
| `t_d6a3145f Refresh QMD 2026-05-22 digest RAG wording correction` | MISS, expected because this report and index row did not exist yet. |

## Refresh result

`qmd update`:

- `whiteford-ai-law-pages`: indexed 2 new, 2 updated, 515 unchanged, 0 removed.
- Cleaned up 2 orphaned content hashes.
- `business-development-books`: indexed 0 new, 0 updated, 6 unchanged, 0 removed.

`qmd embed --max-docs-per-batch 50 --max-batch-mb 10`:

- Embedded 160 chunks from 4 documents in 4 seconds.

After refresh status:

- Index size: 77.9 MB
- Documents: 525 indexed files
- Vectors: 16,134 embedded
- Collection `whiteford-ai-law-pages`: 519 Markdown files updated about 1 minute earlier

## Post-refresh smoke searches before self-indexing this report

| Probe | Result after update/embed |
|---|---|
| `t_c7ea9913 Local RAG Wording Correction Note 2026-05-22 Nightly Qwen Digest` | PASS. Hit `docs/kanban-deliverable-index.md` at the reviewed correction-note row. |
| `local_rag_wording_correction_note_t_c7ea9913` | PASS. Hit `docs/kanban-deliverable-index.md` at the reviewed correction-note path. |
| `t_ee538185 Review 2026-05-22 digest local-RAG wording correction` | PASS. Hit `docs/kanban-deliverable-index.md` at the reviewer row. |
| `digest local-RAG wording correction QMD business-development RAG available internal strategy Gate 1` | PASS/PARTIAL. Hit the prior reviewer note and the updated deliverable-index summary. |
| `QMD collections were available for internal strategy/rubric support not a substitute for current public-source prospect evidence` | MISS in semantic search despite direct `qmd get` working for the digest/correction/review files. This report and the updated index row preserve the wording, but final verification shows QMD still prefers normalized wording probes for search retrieval. |
| `t_d6a3145f Refresh QMD 2026-05-22 digest RAG wording correction` | MISS, expected because this report and its deliverable-index row had not been written yet. |

## Direct QMD get verification before self-indexing this report

`qmd get` returned current content for these controlling Markdown artifacts:

- `qmd://whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-22/digest.md`
- `qmd://whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-22/local_rag_wording_correction_note_t_c7ea9913.md`
- `qmd://whiteford-ai-law-pages/docs/reviews/2026-05-22_digest_local_rag_wording_correction_review_t_ee538185.md`
- `qmd://whiteford-ai-law-pages/docs/KANBAN_DELIVERABLE_INDEX.md`

The direct files remain controlling. QMD search can normalize or miss underscore/punctuation-heavy path probes, while direct `qmd get` using the underscore source paths works.

## Final self-index verification

After writing this report and updating `docs/KANBAN_DELIVERABLE_INDEX.md`, I ran:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd update
PATH="/opt/homebrew/bin:$PATH" qmd embed --max-docs-per-batch 50 --max-batch-mb 10
PATH="/opt/homebrew/bin:$PATH" qmd status
PATH="/opt/homebrew/bin:$PATH" qmd search "<final probe>" -c whiteford-ai-law-pages --limit 5
PATH="/opt/homebrew/bin:$PATH" qmd get qmd://whiteford-ai-law-pages/docs/reports/2026-05-22-digest-rag-wording-correction-qmd-refresh.md
```

Raw self-index log:

- `/tmp/t_d6a3145f_qmd_self_index.log`
- `/tmp/t_d6a3145f_qmd_final_patch_index.log` (final report-finalization pass: `qmd update` indexed 0 new / 1 updated, `qmd embed` embedded 6 chunks from 1 document, and final search/get checks returned this report plus the deliverable-index row.)

Self-index result:

`qmd update`:

- `whiteford-ai-law-pages`: indexed 1 new, 1 updated, 518 unchanged, 0 removed.
- Cleaned up 1 orphaned content hash.
- `business-development-books`: indexed 0 new, 0 updated, 6 unchanged, 0 removed.

`qmd embed --max-docs-per-batch 50 --max-batch-mb 10`:

- Embedded 160 chunks from 2 documents in 4 seconds.

Final status:

- Index size: 78.1 MB
- Documents: 526 indexed files
- Vectors: 16,294 embedded
- Collection `whiteford-ai-law-pages`: 520 Markdown files updated 22 seconds earlier

Final smoke searches verified:

| Probe | Final result |
|---|---|
| `t_d6a3145f Refresh QMD 2026-05-22 digest RAG wording correction` | PASS. Hit this report and the deliverable-index row. |
| `2026-05-22-digest-rag-wording-correction-qmd-refresh` | PASS. Hit this report and the deliverable-index row. |
| `QMD refresh 2026-05-22 digest RAG wording correction` | PASS. Hit this report and the deliverable-index row. |
| `t_c7ea9913 Local RAG Wording Correction Note 2026-05-22 Nightly Qwen Digest` | PASS. Hit this report and the deliverable-index row. |
| `local_rag_wording_correction_note_t_c7ea9913` | PASS. Hit this report and the deliverable-index row. |
| `t_ee538185 Review 2026-05-22 digest local-RAG wording correction` | PASS. Hit this report and the deliverable-index row. |
| `QMD collections were available for internal strategy/rubric support not a substitute for current public-source prospect evidence` | MISS as an exact semantic-search probe, even after self-indexing. Direct `qmd get` still retrieves the digest, where the phrase is present, and the normalized phrase below retrieves the report/digest. |
| `local RAG internal strategy support current public-source Gate 1 evidence 2026-05-22` | PASS. Hit this report, the corrected digest, prior reviewer note, nightly prompt, and deliverable-index row. |

Final direct `qmd get` verified:

- `qmd://whiteford-ai-law-pages/docs/reports/2026-05-22-digest-rag-wording-correction-qmd-refresh.md`
- `qmd://whiteford-ai-law-pages/docs/KANBAN_DELIVERABLE_INDEX.md`
- `qmd://whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-22/digest.md`
- `qmd://whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-22/local_rag_wording_correction_note_t_c7ea9913.md`
- `qmd://whiteford-ai-law-pages/docs/reviews/2026-05-22_digest_local_rag_wording_correction_review_t_ee538185.md`

## QMD caveats

- QMD is a support/search layer only. Direct Markdown source files and Kanban handoffs remain controlling.
- QMD search can miss exact slash/underscore/punctuation-heavy path probes even when normalized task-ID/title probes or direct `qmd get` work.
- QMD searchability does not authorize public/client-facing use, CRM/HighLevel/Supabase/Clio mutation, workflow activation/enrollment, tag, send, outreach, LinkedIn/social/ad action, DDL, sync, backfill, source-provider restoration, or any other live action.

## Verdict

Local QMD was stale for the 2026-05-22 digest local-RAG wording correction chain before refresh. After `qmd update` and bounded `qmd embed`, QMD retrieves this refresh task, the writer/reviewer task IDs, the corrected digest chain, and the deliverable-index row through task-ID/title/normalized wording probes; direct `qmd get` also retrieves the corrected digest, writer note, reviewer note, index, and this report. One exact long semantic phrase still misses in `qmd search`, so use the normalized `local RAG internal strategy support current public-source Gate 1 evidence 2026-05-22` probe or direct `qmd get` for that wording.
