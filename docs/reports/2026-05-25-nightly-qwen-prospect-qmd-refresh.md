# 2026-05-25 Nightly Qwen Prospect QMD Refresh

Task: t_e4517dc9
Date/time: 2026-05-25 02:36 MDT
Collection: `whiteford-ai-law-pages`
Scope: internal QMD/search maintenance only. No Supabase DDL or mirror/backfill, HighLevel/CRM/Clio mutation, sends, workflow activation/enrollment, trigger tags, LinkedIn/social action, public publishing, ads, client/prospect-facing action, or external action was performed or authorized.

## Source deliverables verified on disk

- `docs/nightly-lead-research/runs/2026-05-25/digest.md` — present; title line: `# Nightly Lead Research Digest — 2026-05-25`; run label: `2026-05-25 nightly`; prospects: Rhoda AI, Machina Labs, and Mind Robotics.
- `docs/nightly-lead-research/runs/2026-05-25/validation_report.md` — present; title line: `# 2026-05-25 Nightly Prospect Validation / Local Staging Report`; staged records include Machina Labs, Rhoda AI, and Mind Robotics with external-action holds.
- `docs/reviews/2026-05-25_t_09f2ba63_nightly_qwen_prospect_digest_review.md` — present; title line: `# Review — Nightly Qwen Prospect Research Digest (2026-05-25)`; verdict: `PASS-with-constraints for internal attorney-review-only use.`
- `docs/KANBAN_DELIVERABLE_INDEX.md` — already included rows for t_06ef8d68, t_a879a957, and t_09f2ba63 before this refresh; this task adds the t_e4517dc9 QMD refresh report row.

## Commands run

```bash
export PATH="/opt/homebrew/bin:$PATH"
qmd status
qmd update
qmd embed --max-docs-per-batch 50 --max-batch-mb 10
qmd status
qmd search "t_06ef8d68" --collection whiteford-ai-law-pages --limit 5 --json
qmd search "t_a879a957" --collection whiteford-ai-law-pages --limit 5 --json
qmd search "t_09f2ba63" --collection whiteford-ai-law-pages --limit 5 --json
qmd search "t_e4517dc9" --collection whiteford-ai-law-pages --limit 5 --json
qmd search "Rhoda AI Machina Labs Mind Robotics" --collection whiteford-ai-law-pages --limit 5 --json
qmd search "PASS-with-constraints" --collection whiteford-ai-law-pages --limit 5 --json
qmd search "PASS-with-constraints Nightly Qwen Prospect Research Digest 2026-05-25" --collection whiteford-ai-law-pages --limit 5 --json
qmd search "nightly Qwen prospect digest 2026-05-25" --collection whiteford-ai-law-pages --limit 5 --json
qmd search "2026-05-25 nightly Qwen prospect digest Rhoda Machina Mind Robotics" --collection whiteford-ai-law-pages --limit 5 --json
qmd get qmd://whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-25/digest.md -l 8
qmd get qmd://whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-25/validation_report.md -l 8
qmd get qmd://whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-25/validation-report.md -l 8
qmd get qmd://whiteford-ai-law-pages/docs/reviews/2026-05-25_t_09f2ba63_nightly_qwen_prospect_digest_review.md -l 8
qmd get qmd://whiteford-ai-law-pages/docs/reviews/2026-05-25-t-09f2ba63-nightly-qwen-prospect-digest-review.md -l 8
qmd get qmd://whiteford-ai-law-pages/docs/kanban-deliverable-index.md -l 8
qmd get qmd://whiteford-ai-law-pages/docs/KANBAN_DELIVERABLE_INDEX.md -l 8
```

## Refresh result

Before refresh, `qmd status` showed:

- Index: `/Users/jeff/.cache/qmd/index.sqlite`
- Size: 96.8 MB
- Total indexed documents: 584
- Embedded vectors: 20869
- `whiteford-ai-law-pages`: 578 Markdown files, updated about 1 hour earlier
- `business-development-books`: 6 Markdown files, unchanged

`qmd update` result:

- `whiteford-ai-law-pages`: indexed 4 new Markdown files, 1 updated file, 577 unchanged, 0 removed.
- `business-development-books`: 0 new, 0 updated, 6 unchanged, 0 removed.
- QMD reported 5 unique hashes needing vectors and cleaned up 1 orphaned content hash.

`qmd embed --max-docs-per-batch 50 --max-batch-mb 10` result:

- Embedded 213 chunks from 5 documents in 5 seconds.
- QMD emitted the recurring non-fatal `[node-llama-cpp] ggml_metal_library_init_from_source: error compiling source` Metal warning, but embedding completed successfully.

After refresh, `qmd status` showed:

- Total indexed documents: 588
- Embedded vectors: 21082
- `whiteford-ai-law-pages`: 582 Markdown files, updated about 2 minutes before status
- `business-development-books`: 6 Markdown files, unchanged

## Smoke-search results after initial refresh

| Query | Top relevant result(s) | Status |
| --- | --- | --- |
| `t_06ef8d68` | Deliverable index score 0.39, showing the qwen-local research row. | PASS through deliverable-index row; source digest itself does not carry this task ID. |
| `t_a879a957` | Deliverable index score 0.52, showing the validation/local-staging row. | PASS through deliverable-index row; validation report itself does not carry this task ID. |
| `t_09f2ba63` | Review report score 0.90 and deliverable index score 0.61. | PASS. |
| `t_e4517dc9` | No results before this report/index row was written. | Expected pre-self-index miss; this task ID is introduced by this report and index row. |
| `Rhoda AI Machina Labs Mind Robotics` | Digest score 0.97; validation report score 0.97; review report score 0.97; deliverable index score 0.91. | PASS. |
| `PASS-with-constraints` | Broad phrase returned older/noisy PASS-with-constraints review contexts, not the 2026-05-25 review in the top five. | LIMITATION for broad hyphenated phrase search; use the scoped query or direct URI below. |
| `PASS-with-constraints Nightly Qwen Prospect Research Digest 2026-05-25` | Review report score 0.94; deliverable index score 0.92. | PASS when scoped to this digest/review. |
| `nightly Qwen prospect digest 2026-05-25` | Review report score 0.92; digest score 0.91; qwen prompt score 0.91; deliverable index score 0.89. | PASS. |
| `2026-05-25 nightly Qwen prospect digest Rhoda Machina Mind Robotics` | Review report score 0.97; digest score 0.97; deliverable index score 0.95. | PASS; this was the prior failed smoke query and now returns the fresh chain. |

## Direct QMD retrieval and path-normalization notes

Exact/direct retrieval passed for the expected source and index targets:

- Digest: `qmd://whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-25/digest.md`
- Validation report, original underscore path: `qmd://whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-25/validation_report.md`
- Validation report, normalized display path: `qmd://whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-25/validation-report.md`
- Review report, original underscore path: `qmd://whiteford-ai-law-pages/docs/reviews/2026-05-25_t_09f2ba63_nightly_qwen_prospect_digest_review.md`
- Review report, normalized display path: `qmd://whiteford-ai-law-pages/docs/reviews/2026-05-25-t-09f2ba63-nightly-qwen-prospect-digest-review.md`
- Deliverable index, lowercase normalized path: `qmd://whiteford-ai-law-pages/docs/kanban-deliverable-index.md`
- Deliverable index, original uppercase path: `qmd://whiteford-ai-law-pages/docs/KANBAN_DELIVERABLE_INDEX.md`

Caveat: QMD search results display some Markdown file URIs with normalized lowercase and hyphenated path segments, even when the local filename contains uppercase letters or underscores. Both original and normalized URI forms were accepted by `qmd get` for the tested validation report, review report, and deliverable index. Direct Markdown files and Kanban handoffs remain controlling if QMD display/path normalization is confusing.

## Self-index plan

After this report and the t_e4517dc9 deliverable-index row are written, one final self-index refresh must be run:

```bash
export PATH="/opt/homebrew/bin:$PATH"
qmd update
qmd embed --max-docs-per-batch 50 --max-batch-mb 10
qmd status
qmd search "t_e4517dc9" --collection whiteford-ai-law-pages --limit 5 --json
qmd search "2026-05-25 Nightly Qwen Prospect QMD Refresh" --collection whiteford-ai-law-pages --limit 5 --json
qmd get qmd://whiteford-ai-law-pages/docs/reports/2026-05-25-nightly-qwen-prospect-qmd-refresh.md -l 8
```

Final self-index result:

- `qmd update`: `whiteford-ai-law-pages` indexed 1 new Markdown file, 1 updated file, 581 unchanged, 0 removed; `business-development-books` remained unchanged; QMD reported 2 unique hashes needing vectors and cleaned up 1 orphaned content hash.
- `qmd embed --max-docs-per-batch 50 --max-batch-mb 10`: embedded 193 chunks from 2 documents in 4 seconds; the recurring non-fatal Metal/node-llama-cpp compile warning appeared again, but embedding completed successfully.
- Final status after this self-index pass: 589 total indexed documents, 21275 embedded vectors, `whiteford-ai-law-pages` at 583 Markdown files, updated about 15 seconds before the status call.
- Self-index smoke verification: `t_e4517dc9` returned this report score 0.91 and the deliverable index score 0.36; `2026-05-25 Nightly Qwen Prospect QMD Refresh` returned this report score 0.93 and the deliverable index score 0.90.
- Direct self-index retrieval passed for `qmd://whiteford-ai-law-pages/docs/reports/2026-05-25-nightly-qwen-prospect-qmd-refresh.md` and `qmd://whiteford-ai-law-pages/docs/kanban-deliverable-index.md`.

Because this final-result section patches the report after the first self-index, I ran one more bounded `qmd update` and `qmd embed` pass so the final report text is searchable. See `Final post-patch self-index verification` below.

## Final post-patch self-index verification

After adding the final-result section above, I ran one more bounded self-index pass:

- `qmd update`: `whiteford-ai-law-pages` indexed 0 new Markdown files, 1 updated file, 582 unchanged, 0 removed; `business-development-books` remained unchanged; QMD reported 1 unique hash needing vectors and cleaned up 1 orphaned content hash.
- `qmd embed --max-docs-per-batch 50 --max-batch-mb 10`: embedded 7 chunks from 1 document in 1 second; the same non-fatal Metal/node-llama-cpp warning appeared, but embedding completed successfully.
- Status after the pass: 589 total indexed documents, 21282 embedded vectors, `whiteford-ai-law-pages` at 583 Markdown files, updated about 8 seconds before status.
- Smoke verification: `Final post-patch self-index verification t_e4517dc9` returned this report score 0.96; `2026-05-25 Nightly Qwen Prospect QMD Refresh t_e4517dc9` returned this report score 0.96 and deliverable index score 0.91.

## Conclusion

The local QMD index now retrieves the 2026-05-25 nightly Qwen prospect chain for the controlling task IDs, the prior failed distinctive search phrase, scoped PASS-with-constraints review language, and direct URIs for the digest, validation report, review report, and deliverable-index rows. Known limitations are broad hyphenated phrase search noise for `PASS-with-constraints` and QMD's URI display normalization for uppercase/underscore filenames.

QMD is internal memory/search support only. It is not external-source verification, source-currentness proof, legal approval, launch approval, public/client-facing approval, attorney approval, conflicts clearance, suppression clearance, CRM/Supabase/HighLevel sync approval, or authorization for outreach, workflow activation, sends, LinkedIn/social action, public publishing, ads, Clio writes, or any other live-system/client/prospect-facing action. Direct Markdown files and Kanban handoffs remain controlling.
