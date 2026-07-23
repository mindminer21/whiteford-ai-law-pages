# QMD Refresh Report — 2026-06-03 nightly Qwen prospect digest/review chain

Task: `t_7a05c928`
Controlling repair parent: `t_c468aef1`
Controlling upstream tasks: `t_11b89c47`, `t_2aff8ce4`, `t_796fff73`
Tenant: `whiteford-mountain-west`
Generated: 2026-06-03 22:36:27 MDT
Workspace: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages`

## Scope

Refresh and smoke-verify local QMD retrieval for the completed 2026-06-03 nightly Qwen prospect research, validation/staging, review, and spelling/wording repair chain after QMD search previously missed review task `t_796fff73`.

Controlling direct artifacts remain:

- Research digest: `docs/nightly-lead-research/runs/2026-06-03/digest.md`
- Research candidate payload: `docs/nightly-lead-research/runs/2026-06-03/prospect_candidates.json`
- Validation/staging report: `docs/nightly-lead-research/runs/2026-06-03/validation_report.md`
- Validation/staging JSON artifacts: `prospect_candidates.normalized_for_store.json`, `validation_report.json`, `store_output.json`, `store_verification.json`, and `agent-targeting-work-items/`
- Review: `docs/reviews/2026-06-03_t_796fff73_nightly_qwen_prospect_digest_review.md`
- Repair parent: `t_c468aef1`, which corrected Coralogix spelling and Cyera `Fortune 500` wording in `digest.md`
- Deliverable index: `docs/KANBAN_DELIVERABLE_INDEX.md`
- This QMD refresh report: `docs/qmd-refresh/2026-06-03_t_7a05c928_nightly_qwen_prospect_digest_review_chain_qmd_refresh.md`

## Safety posture

No external/live action was performed. This task did not contact prospects, publish/post, send email/SMS/DM, perform LinkedIn/social action, enroll contacts, apply tags, activate/test workflows, mutate HighLevel, mutate Supabase, write Clio, launch ads, make client-facing/public changes, or authorize outreach.

QMD is retrieval support only. Direct Markdown/JSON artifacts, local store artifacts, and Kanban handoffs remain controlling. QMD retrieval is not source-currentness proof, contact validation, conflicts/suppression clearance, attorney approval, final-copy approval, live-system approval, or authorization for any external action.

Coralogix, Layup Parts, and Cyera remain local/internal research-staged and attorney-review-only under existing HOLD constraints.

## Commands run

Every required QMD command used the known-good Homebrew/local prefix requested by the task:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd update
PATH="/opt/homebrew/bin:$PATH" qmd embed --max-docs-per-batch 50 --max-batch-mb 10
PATH="/opt/homebrew/bin:$PATH" qmd search "..." -c whiteford-ai-law-pages -n 8 --line-numbers
PATH="/opt/homebrew/bin:$PATH" qmd query "..." -c whiteford-ai-law-pages -n 8 --no-rerank --line-numbers
PATH="/opt/homebrew/bin:$PATH" qmd get qmd://whiteford-ai-law-pages/...
```

Raw command outputs for this run were captured locally at:

- `/tmp/t_7a05c928_qmd_update_embed.log`
- `/tmp/t_7a05c928_qmd_verification.log`

## Refresh action and exits

| Command | Exit | Result |
| --- | ---: | --- |
| `qmd status` before refresh | 0 | Index contained 710 files and 31,911 embedded vectors. `whiteford-ai-law-pages` had 703 indexed Markdown files. |
| `qmd update` | 0 | Updated 3 collections. `whiteford-ai-law-pages`: 6 new, 1 updated, 702 unchanged, 0 removed; cleaned up 1 orphaned content hash. |
| `qmd embed --max-docs-per-batch 50 --max-batch-mb 10` | 0 | Embedded 283 chunks from 7 documents in 6 seconds. |
| `qmd status` after refresh | 0 | Index contained 716 files and 32,194 embedded vectors. `whiteford-ai-law-pages` had 709 indexed Markdown files. |

Note: `qmd status` and `qmd embed` printed the recurring `node-llama-cpp` Metal compile warning (`ggml_metal_library_init_from_source: error compiling source`), but the required update/embed commands completed with exit 0.

## Required retrieval verification

| Probe | Result |
| --- | --- |
| `qmd search "t_11b89c47" -c whiteford-ai-law-pages -n 8 --line-numbers` | CAVEAT — exit 0 but no BM25 results. The research parent id appears in the Kanban handoff/task body but not in the indexed Markdown artifacts checked here. The controlling research artifact itself is directly retrievable through `digest.md`; the exact parent-id lookup should use Kanban or this refresh report/index row after self-indexing. |
| `qmd search "t_2aff8ce4" -c whiteford-ai-law-pages -n 8 --line-numbers` | PASS — returned `qmd://whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-06-03/validation-report.md:3` at 90%, the review at 88%, and `docs/kanban-deliverable-index.md:2822` at 29%. |
| `qmd search "t_796fff73" -c whiteford-ai-law-pages -n 8 --line-numbers` | PASS — returned `qmd://whiteford-ai-law-pages/docs/reviews/2026-06-03-t-796fff73-nightly-qwen-prospect-digest-review.md:3` at 89% and `docs/kanban-deliverable-index.md:5` at 46%. This resolves the prior miss for `t_796fff73`. |
| `qmd search "t_c468aef1" -c whiteford-ai-law-pages -n 8 --line-numbers` | PASS — returned the review at 88% and `docs/kanban-deliverable-index.md:10` at 46%, including the repair follow-up row and Coralogix/Cyera hygiene note. |
| `qmd search "2026-06-03 nightly Qwen prospect" -c whiteford-ai-law-pages -n 8 --line-numbers` | PASS — returned the 2026-06-03 review at 91%, the nightly-run prompt at 90%, and the deliverable-index row at 87%. |
| `qmd search "Coralogix" -c whiteford-ai-law-pages -n 8 --line-numbers` | PASS — returned `digest.md:5`, the review, `validation-report.md:18`, `source-unavailable-report.md:25`, and the deliverable index. |
| `qmd search "Layup Parts" -c whiteford-ai-law-pages -n 8 --line-numbers` | PASS — returned `digest.md:5`, the review, `validation-report.md:19`, `source-unavailable-report.md:25`, and the deliverable index. |
| `qmd search "Cyera" -c whiteford-ai-law-pages -n 8 --line-numbers` | PASS — returned `digest.md:5`, the review, `validation-report.md:20`, `source-unavailable-report.md:25`, and the deliverable index. |
| `qmd search "KANBAN_DELIVERABLE_INDEX t_796fff73 Coralogix Layup Parts Cyera" -c whiteford-ai-law-pages -n 8 --line-numbers` | PASS — returned `qmd://whiteford-ai-law-pages/docs/kanban-deliverable-index.md:11`, confirming the existing deliverable-index row for the review chain. |
| `qmd query "t_796fff73 Review nightly Qwen prospect research digest 2026-06-03 Coralogix Layup Parts Cyera PASS-with-constraints" -c whiteford-ai-law-pages -n 8 --no-rerank --line-numbers` | PASS — hybrid query returned the review as the top hit at `qmd://whiteford-ai-law-pages/docs/reviews/2026-06-03-t-796fff73-nightly-qwen-prospect-digest-review.md:1`. |

## Direct QMD gets / normalized URI notes

QMD normalizes underscores in Markdown filenames/paths to hyphens in document URIs in search output, while `qmd get` accepted the original underscore artifact paths used below. Direct `qmd get` passed for the controlling Markdown artifacts:

| Direct QMD document | Result |
| --- | --- |
| `qmd://whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-06-03/digest.md` | PASS — returned `Nightly Prospect Research Digest — 2026-06-03`, the three prospects, Coralogix/Layup Parts/Cyera language, and no-auto-send posture. |
| `qmd://whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-06-03/validation_report.md` | PASS — returned `Task: t_2aff8ce4`, staged prospect rows for Coralogix, Layup Parts, and Cyera, verification status, and no-send/no-workflow safety posture. |
| `qmd://whiteford-ai-law-pages/docs/reviews/2026-06-03_t_796fff73_nightly_qwen_prospect_digest_review.md` | PASS — returned `Task: t_796fff73`, PASS-with-constraints review content, review caveats, and Coralogix/Layup Parts/Cyera HOLD boundaries. |
| `qmd://whiteford-ai-law-pages/docs/KANBAN_DELIVERABLE_INDEX.md:1` | PASS — returned the top deliverable-index rows, including `t_796fff73` and the reviewed digest/validation/review paths. |

The QMD collection is Markdown-only (`**/*.md`). JSON payloads (`prospect_candidates.json`, validation/store JSON, and agent-targeting work-item JSON files) remain controlling direct files, but their contents are not indexed as standalone QMD documents. Their paths and summaries are retrievable indirectly through the Markdown digest, validation report, review, deliverable index, and this refresh report.

## QMD collection listing checks

| Probe | Result |
| --- | --- |
| `qmd ls whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-06-03` | PASS — listed `digest.md`, `nightly-run-prompt.md`, `source-unavailable-report.md`, and `validation-report.md`. |
| `qmd ls whiteford-ai-law-pages/docs/reviews` | PASS — listed `qmd://whiteford-ai-law-pages/docs/reviews/2026-06-03-t-796fff73-nightly-qwen-prospect-digest-review.md` among review documents. |

## Caveats

- Exact BM25 lookup for `t_11b89c47` returned no result before this report was written. This is because the research parent id is not present in the indexed Markdown artifacts verified here; use Kanban task state for that exact id, or use QMD direct retrieval for the controlling digest artifact.
- Exact BM25 lookup for this refresh task id `t_7a05c928` also returned no result before this report/index row existed. Self-index verification below is intended to make this report and deliverable-index row retrievable.
- QMD search output normalizes Markdown URI path separators/underscores to hyphenated forms such as `validation-report.md` and `2026-06-03-t-796fff73-nightly-qwen-prospect-digest-review.md`; direct local file paths remain underscore-named on disk.
- QMD retrieval is not an external-action approval layer. The review, repair parent, direct Markdown/JSON artifacts, and Kanban handoffs remain controlling.

## Guardrails preserved

- Local/internal indexing and retrieval only.
- Direct Markdown/JSON files remain controlling.
- Coralogix, Layup Parts, and Cyera remain research-staged / attorney-review-only / no-auto-send.
- No source-currentness claim, contact validation, conflicts/suppression clearance, approval, final copy, live sync, or external action is granted by QMD refresh.
- HighLevel/Supabase/Clio/live CRM, workflow, tag, LinkedIn/social, email/SMS/DM, ad, public, client-facing, and prospect-contact actions remain held until a separate exact approval packet clears the relevant gates.

## Self-index verification

After this report and the `docs/KANBAN_DELIVERABLE_INDEX.md` row were written, the same bounded QMD refresh was run again.

| Command/probe | Exit/result |
| --- | --- |
| Self-index `qmd update` | Exit 0. `whiteford-ai-law-pages`: 1 new, 1 updated, 708 unchanged, 0 removed; cleaned up 1 orphaned content hash. |
| Self-index `qmd embed --max-docs-per-batch 50 --max-batch-mb 10` | Exit 0. Embedded 255 chunks from 2 documents in 6 seconds. |
| `qmd search "t_7a05c928 nightly Qwen prospect digest review chain QMD refresh Coralogix Layup Parts Cyera" -c whiteford-ai-law-pages -n 8 --line-numbers` | PASS — returned this report at 98% and `docs/kanban-deliverable-index.md:5` at 90%. |
| `qmd search "KANBAN_DELIVERABLE_INDEX t_7a05c928 nightly Qwen QMD refresh t_796fff73" -c whiteford-ai-law-pages -n 8 --line-numbers` | PASS — returned this report at 96% and `docs/kanban-deliverable-index.md:5` at 85%. |
| `qmd get qmd://whiteford-ai-law-pages/docs/qmd-refresh/2026-06-03_t_7a05c928_nightly_qwen_prospect_digest_review_chain_qmd_refresh.md -l 80` | PASS — returned this report with `Task: t_7a05c928`, controlling repair parent `t_c468aef1`, upstream tasks `t_11b89c47`, `t_2aff8ce4`, `t_796fff73`, and the safety posture. |

## Current verdict

PASS with one documented caveat. QMD update/embed completed successfully, exact search for the previously missed review id `t_796fff73` now returns the review and deliverable-index row, prospect/title/artifact retrieval passed, and the refresh report plus deliverable-index row self-indexed successfully. The only caveat is that exact BM25 lookup for research parent `t_11b89c47` returned no pre-report QMD result because that exact Kanban id is not present in the indexed Markdown artifacts; use Kanban for the exact id and QMD direct retrieval for the controlling digest artifact.
