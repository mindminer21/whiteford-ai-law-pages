# 2026-05-26 Nightly Qwen Prospect Chain QMD Refresh

Task: t_85f7c9c8
Date/time: 2026-05-26 23:35 MDT
Collection: `whiteford-ai-law-pages`
Scope: internal QMD/search maintenance only. No Supabase DDL or mirror/backfill, HighLevel/CRM/Clio mutation, sends, workflow activation/enrollment, trigger tags, LinkedIn/social action, ads, public publishing, client/prospect-facing action, or prospect contact was performed or authorized.

## Source deliverables verified on disk

- `docs/reviews/2026-05-26_t_af607dc6_nightly_qwen_prospect_digest_review.md` — present; title line: `# Review — Nightly Qwen Prospect Research Digest (2026-05-26)`; task: `t_af607dc6`; verdict: `PASS-with-constraints for internal attorney-review-only use.`
- `docs/nightly-lead-research/runs/2026-05-26/validation_report.md` — present; title line: `# 2026-05-26 nightly prospect validation/staging`; task: `t_95e1a383`; staged prospects: Physical Intelligence (π), XBOW, and Patlytics.
- `docs/nightly-lead-research/runs/2026-05-26/digest.md` — present; title line: `# 2026-05-26 Nightly Prospect Research Digest`; run label: `2026-05-26 nightly`; prospects: Physical Intelligence (π), XBOW, and Patlytics.
- `docs/KANBAN_DELIVERABLE_INDEX.md` — present; top rows already included `t_af607dc6`, `t_95e1a383`, and the 2026-05-26 daily digest before this task; this task adds the `t_85f7c9c8` QMD refresh report row.

## Commands run

```bash
export PATH="/opt/homebrew/bin:$PATH"
qmd status
qmd update
qmd embed --max-docs-per-batch 50 --max-batch-mb 10
qmd status
qmd search "t_af607dc6" --collection whiteford-ai-law-pages --limit 5 --json
qmd search "t_95e1a383" --collection whiteford-ai-law-pages --limit 5 --json
qmd search "2026-05-26_t_af607dc6_nightly_qwen_prospect_digest_review" --collection whiteford-ai-law-pages --limit 5 --json
qmd search "Physical Intelligence cleanest high-priority" --collection whiteford-ai-law-pages --limit 5 --json
qmd search "2026-05-26 nightly Qwen prospect digest review" --collection whiteford-ai-law-pages --limit 5 --json
qmd search "t_af607dc6 Deliverable KANBAN_DELIVERABLE_INDEX docs/reviews/2026-05-26_t_af607dc6_nightly_qwen_prospect_digest_review.md" --collection whiteford-ai-law-pages --limit 5 --json
qmd search "2026-05-26-t-af607dc6-nightly-qwen-prospect-digest-review" --collection whiteford-ai-law-pages --limit 5 --json
qmd get qmd://whiteford-ai-law-pages/docs/reviews/2026-05-26_t_af607dc6_nightly_qwen_prospect_digest_review.md -l 8
qmd get qmd://whiteford-ai-law-pages/docs/reviews/2026-05-26-t-af607dc6-nightly-qwen-prospect-digest-review.md -l 8
qmd get qmd://whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-26/validation_report.md -l 8
qmd get qmd://whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-26/digest.md -l 8
qmd get qmd://whiteford-ai-law-pages/docs/KANBAN_DELIVERABLE_INDEX.md -l 8
```

## Refresh result

Before refresh, `qmd status` showed:

- Index: `/Users/jeff/.cache/qmd/index.sqlite`
- Size: 103.5 MB
- Total indexed documents: 600
- Embedded vectors: 22,558
- `whiteford-ai-law-pages`: 594 Markdown files, updated 1 day earlier
- `business-development-books`: 6 Markdown files, unchanged

`qmd update` result:

- `whiteford-ai-law-pages`: indexed 12 new Markdown files, 1 updated file, 593 unchanged, 0 removed.
- `business-development-books`: indexed 0 new, 0 updated, 6 unchanged, 0 removed.
- QMD reported 13 unique hashes needing vectors and cleaned up 1 orphaned content hash.

`qmd embed --max-docs-per-batch 50 --max-batch-mb 10` result:

- Embedded 256 chunks from 13 documents in 6 seconds.
- QMD emitted the recurring non-fatal `[node-llama-cpp] ggml_metal_library_init_from_source: error compiling source` Metal warning, but embedding completed successfully.

After refresh, `qmd status` showed:

- Index size: 104.3 MB
- Total indexed documents: 612
- Embedded vectors: 22,814
- `whiteford-ai-law-pages`: 606 Markdown files, updated about 25 minutes before status.
- `business-development-books`: 6 Markdown files, unchanged.

## Smoke-search results after refresh

| Query | Top relevant result(s) | Status |
| --- | --- | --- |
| `t_af607dc6` | Review report score 0.89; daily digest score 0.86; deliverable index score 0.50. | PASS. |
| `t_95e1a383` | Daily digest score 0.86; deliverable index score 0.34. | PASS through daily digest and deliverable-index row; the validation report itself does not need to be top result because direct retrieval passes. |
| `2026-05-26_t_af607dc6_nightly_qwen_prospect_digest_review` | No search results. | MISS for underscore-heavy exact filename query. QMD normalizes display URIs to hyphenated lowercase paths; the normalized filename query and direct `qmd get` both pass. Use direct local file/Kanban handoff or normalized URI for retrieval. |
| `Physical Intelligence cleanest high-priority` | Review report score 0.95 with the sentence identifying Physical Intelligence as the cleanest high-priority prospect. | PASS. |
| `2026-05-26 nightly Qwen prospect digest review` | Review report score 0.92; digest score 0.92; daily digest score 0.92; nightly run prompt score 0.91; deliverable index score 0.86. | PASS. |
| `t_af607dc6 Deliverable KANBAN_DELIVERABLE_INDEX docs/reviews/2026-05-26_t_af607dc6_nightly_qwen_prospect_digest_review.md` | No search results. | MISS for over-specific mixed path/underscore query. Direct deliverable-index retrieval passes, and scoped task-ID search returns the deliverable index. |
| `2026-05-26-t-af607dc6-nightly-qwen-prospect-digest-review` | Review report score 0.88; deliverable index score 0.35. | PASS for normalized filename query. |

## Direct QMD retrieval and path-normalization notes

Exact/direct retrieval passed for the expected source and index targets:

- Review report, original underscore path: `qmd://whiteford-ai-law-pages/docs/reviews/2026-05-26_t_af607dc6_nightly_qwen_prospect_digest_review.md`
- Review report, normalized display path: `qmd://whiteford-ai-law-pages/docs/reviews/2026-05-26-t-af607dc6-nightly-qwen-prospect-digest-review.md`
- Validation report: `qmd://whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-26/validation_report.md`
- Digest: `qmd://whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-26/digest.md`
- Deliverable index: `qmd://whiteford-ai-law-pages/docs/KANBAN_DELIVERABLE_INDEX.md`

Caveat: QMD search results display some Markdown file URIs with normalized lowercase and hyphenated path segments, even when the local filename contains uppercase letters or underscores. Both original and normalized URI forms were accepted by `qmd get` for the tested review report. Direct Markdown files and Kanban handoffs remain controlling if QMD display/path normalization is confusing.

## Self-index plan

After this report and the `t_85f7c9c8` deliverable-index row are written, run one final bounded self-index refresh:

```bash
export PATH="/opt/homebrew/bin:$PATH"
qmd update
qmd embed --max-docs-per-batch 50 --max-batch-mb 10
qmd status
qmd search "t_85f7c9c8" --collection whiteford-ai-law-pages --limit 5 --json
qmd search "2026-05-26 Nightly Qwen Prospect Chain QMD Refresh" --collection whiteford-ai-law-pages --limit 5 --json
qmd search "2026-05-26_t_af607dc6_nightly_qwen_prospect_digest_review" --collection whiteford-ai-law-pages --limit 5 --json
qmd get qmd://whiteford-ai-law-pages/docs/qmd-refresh/2026-05-26_t_85f7c9c8_nightly_qwen_prospect_chain_qmd_refresh.md -l 8
qmd get qmd://whiteford-ai-law-pages/docs/KANBAN_DELIVERABLE_INDEX.md -l 8
```

## Final self-index result

After this report and the `t_85f7c9c8` deliverable-index row were written, the final bounded self-index refresh was run:

- `qmd update`: `whiteford-ai-law-pages` indexed 1 new Markdown file, 1 updated file, 605 unchanged, 0 removed; `business-development-books` remained unchanged; QMD reported 2 unique hashes needing vectors and cleaned up 1 orphaned content hash.
- `qmd embed --max-docs-per-batch 50 --max-batch-mb 10`: embedded 203 chunks from 2 documents in 5 seconds; the recurring non-fatal Metal/node-llama-cpp compile warning appeared again, but embedding completed successfully.
- Final status after this self-index pass: 613 total indexed documents, 23,017 embedded vectors, `whiteford-ai-law-pages` at 607 Markdown files, updated 13 seconds before status.
- Self-index smoke verification: `t_85f7c9c8` returned this report score 0.92 and the deliverable index score 0.51; `2026-05-26 Nightly Qwen Prospect Chain QMD Refresh` returned this report score 0.94 and the deliverable index score 0.91.
- Direct self-index retrieval passed for `qmd://whiteford-ai-law-pages/docs/qmd-refresh/2026-05-26_t_85f7c9c8_nightly_qwen_prospect_chain_qmd_refresh.md` and `qmd://whiteford-ai-law-pages/docs/KANBAN_DELIVERABLE_INDEX.md`.
- The underscore-heavy exact filename query `2026-05-26_t_af607dc6_nightly_qwen_prospect_digest_review` still returned no results after self-index. This is recorded as a QMD search-tokenization/path-normalization limitation, not a missing-document condition, because direct retrieval of the original underscore URI and normalized hyphenated URI both passed.

Because this final-result section patches the report after the first self-index, I ran one more bounded `qmd update` and `qmd embed` pass so the final report text itself is searchable. See `Final post-patch self-index verification` below.

## Final post-patch self-index verification

After adding the final self-index result section, I ran one last bounded post-patch pass:

- `qmd update`: `whiteford-ai-law-pages` indexed 0 new Markdown files, 1 updated file, 606 unchanged, 0 removed; `business-development-books` remained unchanged; QMD reported 1 unique hash needing vectors and cleaned up 1 orphaned content hash.
- `qmd embed --max-docs-per-batch 50 --max-batch-mb 10`: embedded 7 chunks from 1 document in 1 second; the recurring non-fatal Metal/node-llama-cpp warning appeared again, but embedding completed successfully.
- Post-patch status: 613 total indexed documents, 23,024 embedded vectors, `whiteford-ai-law-pages` at 607 Markdown files, updated 6 seconds before status.
- Post-patch smoke verification: `Final post-patch self-index verification t_85f7c9c8` returned this report score 0.96; `underscore-heavy exact filename query QMD search-tokenization path-normalization limitation t_85f7c9c8` returned this report score 0.97.

## Conclusion

The local QMD index now retrieves the 2026-05-26 nightly Qwen prospect chain for the controlling task IDs, the distinctive Physical Intelligence cleanest/high-priority phrase, the scoped digest/review query, normalized review filename query, and direct URIs for the digest, validation report, review report, and deliverable index. Known misses are over-specific underscore-heavy path searches; QMD's normalized URI behavior means direct `qmd get` and normalized hyphenated searches are more reliable for those filenames.

QMD is internal memory/search support only. It is not external-source verification, source-currentness proof, legal approval, launch approval, public/client-facing approval, attorney approval, conflicts clearance, suppression clearance, CRM/Supabase/HighLevel sync approval, or authorization for outreach, workflow activation, sends, LinkedIn/social action, public publishing, ads, Clio writes, or any other live-system/client/prospect-facing action. Direct Markdown files and Kanban handoffs remain controlling.
