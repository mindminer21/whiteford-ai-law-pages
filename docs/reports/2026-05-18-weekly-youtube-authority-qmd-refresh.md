# 2026-05-18 Weekly YouTube Authority QMD Refresh

Task: t_56746470
Date/time: 2026-05-18 05:06 MDT
Collection: `whiteford-ai-law-pages`
Scope: internal QMD/search maintenance only. No publishing, email/SMS, workflow activation, contact enrollment, CRM/Supabase/Clio/DMS mutation, social action, ad launch, route mutation, or client/prospect-facing action was performed or authorized.

## Source deliverables verified on disk

- `docs/ai-authority-packets/2026-05-18-weekly-youtube-script-packets.md` — present; title line: `# @SchellIP Weekly YouTube Script Packets — 2026-05-18`; status line: `INTERNAL DRAFT / ATTORNEY-REVIEW-ONLY / NOT PUBLIC SCRIPT.`
- `docs/seo/2026-05-18-youtube-authority-seo-support.md` — present; title line: `# 2026-05-18 YouTube Authority SEO Support Recommendations`; task line: `Task: t_4bf5c124`.
- `docs/reviews/2026-05-18-weekly-youtube-authority-review.md` — present; title line: `# Review — 2026-05-18 Weekly @SchellIP Authority Production Packet`; task line: `Task: t_1a24307b`.
- `docs/KANBAN_DELIVERABLE_INDEX.md` — already included rows for `t_77b97da8`, `t_4bf5c124`, and `t_1a24307b` before this refresh; this report adds `t_56746470`.

## Commands run

```bash
export PATH="/opt/homebrew/bin:$PATH"
qmd status
qmd search "2026-05-18 weekly @SchellIP authority production packet review" --collection whiteford-ai-law-pages --limit 5 --json
qmd search "t_77b97da8 t_4bf5c124 t_1a24307b" --collection whiteford-ai-law-pages --limit 5 --json
qmd search "2026-05-18-weekly-youtube-script-packets.md" --collection whiteford-ai-law-pages --limit 5 --json
qmd update
qmd embed --max-docs-per-batch 50 --max-batch-mb 10
qmd status
qmd search "2026-05-18 weekly @SchellIP authority production packet review" --collection whiteford-ai-law-pages --limit 5 --json
qmd search "t_77b97da8 t_4bf5c124 t_1a24307b" --collection whiteford-ai-law-pages --limit 5 --json
qmd search "@SchellIP Weekly YouTube Script Packets 2026-05-18" --collection whiteford-ai-law-pages --limit 5 --json
qmd search "2026-05-18 YouTube Authority SEO Support Recommendations" --collection whiteford-ai-law-pages --limit 5 --json
qmd search "Review 2026-05-18 Weekly @SchellIP Authority Production Packet" --collection whiteford-ai-law-pages --limit 5 --json
qmd search "t_77b97da8" --collection whiteford-ai-law-pages --limit 5 --json
qmd search "t_4bf5c124" --collection whiteford-ai-law-pages --limit 5 --json
qmd search "t_1a24307b" --collection whiteford-ai-law-pages --limit 5 --json
qmd get qmd://whiteford-ai-law-pages/docs/ai-authority-packets/2026-05-18-weekly-youtube-script-packets.md -l 8
qmd get qmd://whiteford-ai-law-pages/docs/seo/2026-05-18-youtube-authority-seo-support.md -l 8
qmd get qmd://whiteford-ai-law-pages/docs/reviews/2026-05-18-weekly-youtube-authority-review.md -l 8
```

## Before refresh status

`qmd status` before update:

- Index: `/Users/jeff/.cache/qmd/index.sqlite`
- Total indexed documents: 442
- Embedded vectors: 10865
- `whiteford-ai-law-pages`: 436 Markdown files, updated about 1 hour earlier
- `business-development-books`: 6 Markdown files, unchanged

Before-refresh smoke searches matched the watchdog precheck:

| Query | Result |
| --- | --- |
| `2026-05-18 weekly @SchellIP authority production packet review` | Returned older/noisy context, primarily `docs/kanban-deliverable-index.md` and `docs/highlevel-social-planner-operating-plan.md`; did not return the new handoff docs directly. |
| `t_77b97da8 t_4bf5c124 t_1a24307b` | Returned no results. |
| `2026-05-18-weekly-youtube-script-packets.md` | Returned no results. |

## Refresh result

`qmd update` result:

- `whiteford-ai-law-pages`: indexed 3 new Markdown files, 1 updated file, 435 unchanged, 0 removed.
- `business-development-books`: 0 new, 0 updated, 6 unchanged.
- QMD reported 4 unique hashes needing vectors.

`qmd embed --max-docs-per-batch 50 --max-batch-mb 10` result:

- Embedded 158 chunks from 4 documents in 4 seconds.
- QMD emitted a non-fatal Metal/node-llama-cpp compile warning during status/embed, but embedding completed successfully and status reflected increased document/vector counts.

After-refresh `qmd status`:

- Total indexed documents: 445
- Embedded vectors: 11023
- `whiteford-ai-law-pages`: 439 Markdown files, updated about 4 minutes before the status call
- `business-development-books`: 6 Markdown files, unchanged

## After-refresh smoke-search results

| Query | Top relevant result(s) | Status |
| --- | --- | --- |
| `2026-05-18 weekly @SchellIP authority production packet review` | `docs/reviews/2026-05-18-weekly-youtube-authority-review.md` score 0.94; `docs/seo/2026-05-18-youtube-authority-seo-support.md` score 0.94; `docs/ai-authority-packets/2026-05-18-weekly-youtube-script-packets.md` score 0.93; `docs/kanban-deliverable-index.md` score 0.92. | PASS: direct body search now finds all three new handoff docs plus index context. |
| `@SchellIP Weekly YouTube Script Packets 2026-05-18` | `docs/ai-authority-packets/2026-05-18-weekly-youtube-script-packets.md` score 0.95; review, SEO support, and index also returned. | PASS. |
| `2026-05-18 YouTube Authority SEO Support Recommendations` | `docs/seo/2026-05-18-youtube-authority-seo-support.md` score 0.93; review, script packet, and index also returned. | PASS. |
| `Review 2026-05-18 Weekly @SchellIP Authority Production Packet` | `docs/reviews/2026-05-18-weekly-youtube-authority-review.md` score 0.94; SEO support, script packet, index, and one unrelated older social-planner result also returned. | PASS with one lower-ranked noisy result. |
| `t_77b97da8 t_4bf5c124 t_1a24307b` | `docs/kanban-deliverable-index.md` score 0.73. | PARTIAL: combined task-ID query finds index context only. Direct task IDs in body are not all present in the source docs. |
| `t_77b97da8` | `docs/kanban-deliverable-index.md` score 0.49. | PARTIAL: the script-packet source file does not include a `Task: t_77b97da8` line, so QMD finds the task ID through the index row. |
| `t_4bf5c124` | `docs/seo/2026-05-18-youtube-authority-seo-support.md` score 0.82 and `docs/kanban-deliverable-index.md` score 0.47. | PASS. |
| `t_1a24307b` | `docs/reviews/2026-05-18-weekly-youtube-authority-review.md` score 0.86 and `docs/kanban-deliverable-index.md` score 0.47. | PASS. |
| Exact filename queries for `2026-05-18-weekly-youtube-script-packets.md`, `2026-05-18-youtube-authority-seo-support.md`, and `2026-05-18-weekly-youtube-authority-review.md` | Returned no direct hits in `qmd search`. | LIMITATION: QMD BM25 body search did not match filename-only queries, even though the documents are indexed and retrievable by title/body and `qmd get`. Use title/body/task-ID searches or direct QMD URI retrieval for exact-file fallback. |

## Direct QMD retrieval fallback

All three source docs were retrievable by exact QMD URI after refresh:

```bash
qmd get qmd://whiteford-ai-law-pages/docs/ai-authority-packets/2026-05-18-weekly-youtube-script-packets.md -l 8
qmd get qmd://whiteford-ai-law-pages/docs/seo/2026-05-18-youtube-authority-seo-support.md -l 8
qmd get qmd://whiteford-ai-law-pages/docs/reviews/2026-05-18-weekly-youtube-authority-review.md -l 8
```

The retrieved headers/status lines matched the local source files. This confirms the collection includes the files; the remaining filename-only misses are a search-query/tokenization limitation, not an indexing absence.

## Conclusion

QMD retrieval for the 2026-05-18 weekly @SchellIP authority handoffs is refreshed and verified for title/body searches and direct QMD URI retrieval. The only remaining caveats are:

1. `t_77b97da8` appears through `docs/KANBAN_DELIVERABLE_INDEX.md`, not through the script packet body, because the script packet does not include a task-ID line.
2. Filename-only `qmd search` queries did not return the exact docs; use title/body searches or `qmd get qmd://whiteford-ai-law-pages/...` for exact path fallback.
3. QMD is internal search/memory support only; direct source files and Kanban handoffs remain controlling, and this refresh does not authorize public/client-facing or live-system actions.
