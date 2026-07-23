# 2026-05-25 Weekly YouTube Authority QMD Refresh

Task: t_d2102cbc
Date/time: 2026-05-25 01:03 MDT
Collection: `whiteford-ai-law-pages`
Scope: internal QMD/search maintenance only. No publishing, email/SMS, workflow activation, contact enrollment, HighLevel/CRM/Supabase/Clio/DMS mutation, DMS/Clio write, social/LinkedIn action, ad launch, route/schema mutation, or client/prospect-facing action was performed or authorized.

## Source deliverables verified on disk

- `docs/ai-authority-packets/2026-05-25-weekly-youtube-script-packets.md` — present; title line: `# @SchellIP Weekly YouTube Script Packets — 2026-05-25`; status line: `Status: INTERNAL DRAFT / ATTORNEY-REVIEW-ONLY / NOT PUBLIC SCRIPT.`
- `docs/seo/2026-05-25-youtube-authority-seo-support.md` — present; title line: `# 2026-05-25 YouTube Authority SEO Support Recommendations`; task line: `Task: t_cc7ccc34`.
- `docs/reviews/2026-05-25-weekly-youtube-authority-review.md` — present; title line: `# Review — 2026-05-25 Weekly @SchellIP YouTube Authority Packet and SEO Support`; task line: `Task: t_eec8803c`.
- `docs/KANBAN_DELIVERABLE_INDEX.md` — already included rows for `t_11431a39`, `t_cc7ccc34`, and `t_eec8803c` before this refresh; this report adds `t_d2102cbc`.

## Commands run

```bash
export PATH="/opt/homebrew/bin:$PATH"
qmd status
qmd search "2026-05-25 weekly @SchellIP YouTube Authority Packet and SEO Support" --collection whiteford-ai-law-pages --limit 5 --json
qmd search "t_11431a39 t_cc7ccc34 t_eec8803c" --collection whiteford-ai-law-pages --limit 5 --json
qmd search "@SchellIP Weekly YouTube Script Packets 2026-05-25" --collection whiteford-ai-law-pages --limit 5 --json
qmd search "2026-05-25 YouTube Authority SEO Support Recommendations" --collection whiteford-ai-law-pages --limit 5 --json
qmd search "Review 2026-05-25 Weekly @SchellIP YouTube Authority Packet and SEO Support" --collection whiteford-ai-law-pages --limit 5 --json
qmd get qmd://whiteford-ai-law-pages/docs/ai-authority-packets/2026-05-25-weekly-youtube-script-packets.md -l 8
qmd get qmd://whiteford-ai-law-pages/docs/seo/2026-05-25-youtube-authority-seo-support.md -l 8
qmd get qmd://whiteford-ai-law-pages/docs/reviews/2026-05-25-weekly-youtube-authority-review.md -l 8
qmd update
qmd embed --max-docs-per-batch 50 --max-batch-mb 10
qmd status
qmd search "t_11431a39" --collection whiteford-ai-law-pages --limit 5 --json
qmd search "t_cc7ccc34" --collection whiteford-ai-law-pages --limit 5 --json
qmd search "t_eec8803c" --collection whiteford-ai-law-pages --limit 5 --json
qmd search "t_d2102cbc" --collection whiteford-ai-law-pages --limit 5 --json
qmd search "AI-assisted invention" --collection whiteford-ai-law-pages --limit 5 --json
qmd search "Colorado AI readiness inventory" --collection whiteford-ai-law-pages --limit 5 --json
qmd search "AI vendor/data terms" --collection whiteford-ai-law-pages --limit 5 --json
qmd search "deliverability and technical SEO review" --collection whiteford-ai-law-pages --limit 5 --json
```

## Before refresh status

`qmd status` before update:

- Index: `/Users/jeff/.cache/qmd/index.sqlite`
- Size: 93.3 MB
- Total indexed documents: 580
- Embedded vectors: 20449
- `whiteford-ai-law-pages`: 574 Markdown files, updated about 2 hours earlier
- `business-development-books`: 6 Markdown files, updated 19 days earlier
- QMD emitted the recurring non-fatal `[node-llama-cpp] ggml_metal_library_init_from_source: error compiling source` Metal warning during status.

Before-refresh smoke searches showed the three fresh source docs were not yet indexed:

| Query | Result |
| --- | --- |
| `2026-05-25 weekly @SchellIP YouTube Authority Packet and SEO Support` | No direct fresh-doc results. |
| `t_11431a39 t_cc7ccc34 t_eec8803c` | No results. |
| `@SchellIP Weekly YouTube Script Packets 2026-05-25` | No direct fresh-doc results. |
| Exact `qmd get` for all three expected source Markdown URIs | `Document not found` for script packet, SEO support, and review. |
| Long guardrail phrase query for `PASS FOR INTERNAL MANUAL ATTORNEY-REVIEW...` | Returned older/noisy internal-draft review context and the deliverable index, not the fresh review. |

## Refresh result

`qmd update` result:

- `whiteford-ai-law-pages`: indexed 3 new Markdown files, 1 updated file, 573 unchanged, 0 removed.
- `business-development-books`: 0 new, 0 updated, 6 unchanged, 0 removed.
- QMD reported 4 unique hashes needing vectors and cleaned up 1 orphaned content hash.

`qmd embed --max-docs-per-batch 50 --max-batch-mb 10` result:

- Embedded 225 chunks from 4 documents in 5 seconds.
- QMD emitted the same non-fatal Metal/node-llama-cpp compile warning, but embedding completed successfully and status reflected increased document/vector counts.

After-refresh `qmd status`:

- Index: `/Users/jeff/.cache/qmd/index.sqlite`
- Size: 96.2 MB
- Total indexed documents: 583
- Embedded vectors: 20674
- `whiteford-ai-law-pages`: 577 Markdown files, updated about 2 minutes before the status call
- `business-development-books`: 6 Markdown files, unchanged

## After-refresh smoke-search results

| Query | Top relevant result(s) | Status |
| --- | --- | --- |
| `2026-05-25 weekly @SchellIP YouTube Authority Packet and SEO Support` | Review score 0.96; SEO support score 0.96; script packet score 0.95; deliverable index score 0.93. | PASS: direct title/body search finds all three fresh handoff docs plus index context. |
| `@SchellIP Weekly YouTube Script Packets 2026-05-25` | Review score 0.95; SEO support score 0.95; script packet score 0.95; deliverable index score 0.92. | PASS. |
| `2026-05-25 YouTube Authority SEO Support Recommendations` | Review score 0.94; SEO support score 0.94; script packet score 0.93; deliverable index score 0.89. | PASS. |
| `Review 2026-05-25 Weekly @SchellIP YouTube Authority Packet and SEO Support` | Review score 0.96; SEO support score 0.96; script packet score 0.95; deliverable index score 0.93. | PASS. |
| `t_11431a39` | Deliverable index score 0.39, showing the script-packet row. | PASS through the index row; the script packet itself does not contain a task-ID line. |
| `t_cc7ccc34` | SEO support score 0.81 and deliverable index score 0.37. | PASS. |
| `t_eec8803c` | Review score 0.86 and deliverable index score 0.37. | PASS. |
| `t_d2102cbc` | No results before this report/index row was written. | Expected pre-self-index miss; see self-index section below. |
| `AI-assisted invention` | Top results were older AI-assisted invention materials; this phrase is broad and noisy. | LIMITATION: use the exact weekly title or direct URI for this week's packet. |
| `Colorado AI readiness inventory` | SEO support score 0.79; other older YouTube/authority docs also returned. | PASS with noisy but relevant corpus context. |
| `AI vendor/data terms` | No results as a slash-tokenized phrase. | LIMITATION: use `AI vendor data terms`, exact title/body query, or direct URI retrieval instead. |
| `deliverability and technical SEO review` | Review score 0.87 and SEO support score 0.87; older review context also returned. | PASS for guardrail phrase coverage. |

## Direct QMD retrieval fallback

After refresh, all three source docs were retrievable by exact QMD URI:

```bash
qmd get qmd://whiteford-ai-law-pages/docs/ai-authority-packets/2026-05-25-weekly-youtube-script-packets.md -l 8
qmd get qmd://whiteford-ai-law-pages/docs/seo/2026-05-25-youtube-authority-seo-support.md -l 8
qmd get qmd://whiteford-ai-law-pages/docs/reviews/2026-05-25-weekly-youtube-authority-review.md -l 8
```

The retrieved headers/status lines matched the local source files. This confirms the collection includes the expected source docs; broad or punctuation-heavy searches can still be noisy or empty because of query/tokenization behavior.

## Self-index result

After this report and the new deliverable-index row were written, one final self-index refresh was run:

```bash
qmd update
qmd embed --max-docs-per-batch 50 --max-batch-mb 10
qmd status
```

Final self-index `qmd update` result:

- `whiteford-ai-law-pages`: indexed 1 new Markdown file, 1 updated file, 576 unchanged, 0 removed.
- `business-development-books`: 0 new, 0 updated, 6 unchanged, 0 removed.
- QMD reported 2 unique hashes needing vectors and cleaned up 1 orphaned content hash.

Final self-index embed result:

- Embedded 189 chunks from 2 documents in 4 seconds.
- Final status: 584 total indexed documents, 20863 embedded vectors, `whiteford-ai-law-pages` at 578 Markdown files, updated 9 seconds before the status call.
- The recurring non-fatal Metal/node-llama-cpp compile warning appeared again, but update/embed completed successfully.

Final verification targets: `t_d2102cbc`, this report title, the report QMD URI, and the new top deliverable-index row.

## Conclusion

QMD retrieval for the 2026-05-25 weekly @SchellIP YouTube authority handoff chain is refreshed and verified for exact titles, core task IDs, distinctive guardrail phrases, and direct QMD URI retrieval. Current limitations are search-tokenization noise for broad phrases (`AI-assisted invention`, `AI vendor/data terms`) and the expected fact that `t_11431a39` is found through the deliverable index because the script packet does not include a task-ID line.

QMD is internal memory/search support only. It is not source-currentness proof, legal approval, launch approval, public/client-facing approval, attorney approval, or authorization for recording release, upload, page/schema mutation, email/SMS, HighLevel/CRM workflow, social/ad action, or any other live-system/client-facing action. Direct Markdown files and Kanban handoffs remain controlling.
