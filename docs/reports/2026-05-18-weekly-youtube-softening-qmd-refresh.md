# QMD Refresh — 2026-05-18 Weekly YouTube Softening Handoffs

Task: t_53f6e755
Parent reviewer task: t_ea188bf3
Writer task: t_4c430aca
Run timestamp: 2026-05-18 05:45:23 MDT
Workspace: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages`
Collection: `whiteford-ai-law-pages`

## Scope

Refresh and verify local QMD/searchability for the 2026-05-18 weekly @SchellIP YouTube exact-copy softening chain.

Controlling source files:

- Softened draft: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/ai-authority-packets/2026-05-18-weekly-youtube-exact-copy-softened-draft.md`
- Reviewer handoff: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/reviews/2026-05-18-weekly-youtube-softened-exact-copy-review.md`
- Deliverable index: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/KANBAN_DELIVERABLE_INDEX.md`

## QMD status before refresh

`PATH="/opt/homebrew/bin:$PATH" qmd status` showed:

- Index: `/Users/jeff/.cache/qmd/index.sqlite`
- Initial total: 446 files indexed, 11,153 vectors embedded.
- `whiteford-ai-law-pages`: 440 Markdown files indexed, updated about 36 minutes earlier.
- QMD emitted a non-fatal Metal compile warning: `[node-llama-cpp] ggml_metal_library_init_from_source: error compiling source`.

Initial smoke searches found the older authority-review/index context for the phrase query, but did not retrieve the new softened draft or softened review for `t_4c430aca`, `t_ea188bf3`, or exact filename queries. Because the current Markdown files were not reliably retrievable from search, I refreshed QMD.

## Refresh commands run

From the project workspace:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd update
PATH="/opt/homebrew/bin:$PATH" qmd embed --max-docs-per-batch 50 --max-batch-mb 10
```

Result:

- `whiteford-ai-law-pages`: indexed 2 new Markdown files, 1 updated Markdown file, 439 unchanged, 0 removed.
- Cleaned up 1 orphaned content hash.
- `business-development-books`: 0 new, 0 updated, 6 unchanged.
- Embedded 150 chunks from 3 documents in 3 seconds.

## QMD status after refresh

`PATH="/opt/homebrew/bin:$PATH" qmd status` showed:

- Total: 448 files indexed, 11,303 vectors embedded.
- `whiteford-ai-law-pages`: 442 Markdown files indexed, updated about 2 minutes before the status check.
- `business-development-books`: unchanged at 6 Markdown files.
- The same non-fatal Metal compile warning appeared during status.

## Smoke-search results after refresh

Commands used this shape:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd search "<query>" -c whiteford-ai-law-pages
```

| Query | Result |
| --- | --- |
| `t_4c430aca` | PASS. Retrieved the review file at `docs/reviews/2026-05-18-weekly-youtube-softened-exact-copy-review.md`, the softened draft at `docs/ai-authority-packets/2026-05-18-weekly-youtube-exact-copy-softened-draft.md`, and deliverable-index context. |
| `t_ea188bf3` | PASS. Retrieved the review file at `docs/reviews/2026-05-18-weekly-youtube-softened-exact-copy-review.md` and deliverable-index context. |
| `weekly YouTube exact-copy softening` | PASS. Retrieved the softened review, softened draft, prior authority review, and deliverable-index context. |
| `2026-05-18-weekly-youtube-exact-copy-softened-draft.md` | PARTIAL. Exact filename search returned no results, but the file is searchable by title/body/task ID and directly retrievable by QMD URI. |
| `2026-05-18-weekly-youtube-softened-exact-copy-review.md` | PARTIAL. Exact filename search returned no results, but the file is searchable by title/body/task ID and directly retrievable by QMD URI. |

Direct retrieval also works:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd get qmd://whiteford-ai-law-pages/docs/ai-authority-packets/2026-05-18-weekly-youtube-exact-copy-softened-draft.md
PATH="/opt/homebrew/bin:$PATH" qmd get qmd://whiteford-ai-law-pages/docs/reviews/2026-05-18-weekly-youtube-softened-exact-copy-review.md
```

Both direct gets returned the expected current Markdown content.

## Caveats and controls

- QMD is internal memory/search support only. Direct files and Kanban handoffs remain controlling.
- Exact filename-only QMD search can miss hyphenated Markdown filenames even when direct QMD URI retrieval and title/body/task-ID search work. Use task IDs, titles, distinctive body phrases, or `qmd get` with the direct QMD URI for deterministic lookup.
- The QMD Metal compile warning was non-fatal in this run: status, update, embed, search, and direct get all completed.
- This task performed internal indexing/reporting only. It did not perform public-source proof, route/source mutation, CRM/HighLevel/Supabase/Clio/DMS mutation, workflow activation/enrollment, sends, outreach, social/ad action, DDL, backfill, publishing, or any client/prospect-facing action.

## Final verification posture

The 2026-05-18 weekly YouTube softened exact-copy prep draft and reviewer handoff are now indexed and embedded in local QMD. Task-ID and phrase searches retrieve the current artifacts, and direct QMD gets retrieve both controlling Markdown files. Filename-only searches remain a known QMD search limitation; use direct QMD URIs or task/title/body queries when exact filename search misses.
