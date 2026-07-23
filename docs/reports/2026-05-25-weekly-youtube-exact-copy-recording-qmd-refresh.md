# 2026-05-25 Weekly YouTube Exact-Copy Recording QMD Refresh

Task: t_32bf9016
Date/time: 2026-05-25 06:35 MDT
Collection: `whiteford-ai-law-pages`
Scope: internal QMD/search maintenance only. No publishing, recording release, upload, public page/schema mutation, email/SMS/DM send, HighLevel workflow activation, tag application, contact enrollment, CRM/Supabase/Clio/DMS mutation, social/LinkedIn action, ad launch, prospect/client contact, or client/prospect-facing action was performed or authorized.

## Source deliverables verified on disk

- `docs/ai-authority-packets/2026-05-25-weekly-youtube-exact-copy-recording-drafts.md` — present; title line: `# Exact-copy recording drafts — 2026-05-25 weekly @SchellIP AI authority videos`; task line: `Task: t_c6d63503`; status line: `Status: INTERNAL DRAFT / EXACT-COPY RECORDING PREP / ATTORNEY-REVIEW-ONLY / NOT PUBLIC SCRIPT`.
- `docs/reviews/2026-05-25-weekly-youtube-exact-copy-recording-review.md` — present; title line: `# Review — 2026-05-25 weekly @SchellIP exact-copy recording drafts`; task line: `Task: t_cdcb521b`; status line: `Status: PASS FOR PRIVATE / INTERNAL RECORDING-PREP READINESS ONLY; HOLD FOR PUBLIC, CLIENT-FACING, LIVE-SYSTEM, OR DISTRIBUTION USE.`
- `docs/KANBAN_DELIVERABLE_INDEX.md` — already included top rows for `t_cdcb521b` and `t_c6d63503` before this refresh; this report adds `t_32bf9016`.

## Commands run

```bash
export PATH="/opt/homebrew/bin:$PATH"
qmd status
qmd search "t_c6d63503" -c whiteford-ai-law-pages --limit 5
qmd search "t_cdcb521b" -c whiteford-ai-law-pages --limit 5
qmd search "exact-copy recording drafts 2026-05-25 @SchellIP weekly AI authority videos" -c whiteford-ai-law-pages --limit 5
qmd search "Review exact-copy recording drafts for 2026-05-25 @SchellIP weekly AI authority videos" -c whiteford-ai-law-pages --limit 5
qmd search "t_cdcb521b Review exact-copy recording drafts exact-copy recording-prep readiness" -c whiteford-ai-law-pages --limit 5
qmd get qmd://whiteford-ai-law-pages/docs/ai-authority-packets/2026-05-25-weekly-youtube-exact-copy-recording-drafts.md
qmd get qmd://whiteford-ai-law-pages/docs/reviews/2026-05-25-weekly-youtube-exact-copy-recording-review.md
qmd update
qmd embed
qmd status
qmd search "t_c6d63503" -c whiteford-ai-law-pages --limit 5
qmd search "t_cdcb521b" -c whiteford-ai-law-pages --limit 5
qmd search "exact-copy recording drafts 2026-05-25 @SchellIP weekly AI authority videos" -c whiteford-ai-law-pages --limit 5
qmd search "Review exact-copy recording drafts for 2026-05-25 @SchellIP weekly AI authority videos" -c whiteford-ai-law-pages --limit 5
qmd search "PASS for private internal exact-copy recording-prep readiness only HOLD public live client-facing use" -c whiteford-ai-law-pages --limit 5
qmd search "t_cdcb521b exact-copy recording-prep readiness all public live client-facing use still on HOLD" -c whiteford-ai-law-pages --limit 5
qmd get qmd://whiteford-ai-law-pages/docs/ai-authority-packets/2026-05-25-weekly-youtube-exact-copy-recording-drafts.md
qmd get qmd://whiteford-ai-law-pages/docs/reviews/2026-05-25-weekly-youtube-exact-copy-recording-review.md
qmd get qmd://whiteford-ai-law-pages/docs/kanban-deliverable-index.md
```

## Before refresh status

`qmd status` before update:

- Index: `/Users/jeff/.cache/qmd/index.sqlite`
- Size: 100.8 MB
- Total indexed documents: 596
- Embedded vectors: 22115
- `whiteford-ai-law-pages`: 590 Markdown files, updated about 2 hours earlier
- `business-development-books`: 6 Markdown files, updated 19 days earlier
- QMD emitted the recurring non-fatal `[node-llama-cpp] ggml_metal_library_init_from_source: error compiling source` Metal warning during status.

Before-refresh smoke searches confirmed the 06:30 watchdog finding: the fresh exact-copy draft/review chain was not yet retrievable from QMD.

| Query / retrieval surface | Result before refresh |
| --- | --- |
| `t_c6d63503` | No results. |
| `t_cdcb521b` | No results. |
| `exact-copy recording drafts 2026-05-25 @SchellIP weekly AI authority videos` | Returned older weekly YouTube authority materials and the existing deliverable-index context, not the fresh exact-copy recording draft/review docs. |
| `Review exact-copy recording drafts for 2026-05-25 @SchellIP weekly AI authority videos` | Returned older weekly YouTube authority materials and older/noisy deliverable-index context, not the fresh exact-copy review. |
| `t_cdcb521b Review exact-copy recording drafts exact-copy recording-prep readiness` | No results. |
| Direct `qmd get` for `qmd://whiteford-ai-law-pages/docs/ai-authority-packets/2026-05-25-weekly-youtube-exact-copy-recording-drafts.md` | `Document not found`. |
| Direct `qmd get` for `qmd://whiteford-ai-law-pages/docs/reviews/2026-05-25-weekly-youtube-exact-copy-recording-review.md` | `Document not found`. |

## Refresh result

`qmd update` result:

- `whiteford-ai-law-pages`: indexed 3 new Markdown files, 1 updated file, 589 unchanged, 0 removed.
- `business-development-books`: 0 new, 0 updated, 6 unchanged, 0 removed.
- QMD reported 4 unique hashes needing vectors and cleaned up 1 orphaned content hash.

`qmd embed` result:

- Embedded 231 chunks from 4 documents in 5 seconds.
- QMD emitted the same non-fatal Metal/node-llama-cpp compile warning, but embedding completed successfully.

After-refresh `qmd status`:

- Index: `/Users/jeff/.cache/qmd/index.sqlite`
- Size: 101.0 MB
- Total indexed documents: 599
- Embedded vectors: 22346
- `whiteford-ai-law-pages`: 593 Markdown files, updated about 15 minutes before the status call
- `business-development-books`: 6 Markdown files, unchanged

## After-refresh smoke-search results

| Query / retrieval surface | Top relevant result(s) | Status |
| --- | --- | --- |
| `t_c6d63503` | Review score 86%; exact-copy draft score 76%; deliverable-index row score 34%. | PASS: draft task ID now retrieves both the review cross-reference and the draft itself. |
| `t_cdcb521b` | Review score 87%; deliverable-index row score 36%. | PASS: review task ID now retrieves the review and index row. |
| `exact-copy recording drafts 2026-05-25 @SchellIP weekly AI authority videos` | Review score 96%; exact-copy draft score 95%; older weekly context also appears. | PASS with expected corpus-neighbor noise for broad weekly YouTube terms. |
| `Review exact-copy recording drafts for 2026-05-25 @SchellIP weekly AI authority videos` | Review score 96%; exact-copy draft score 95%; older weekly context also appears. | PASS with expected corpus-neighbor noise. |
| `PASS for private internal exact-copy recording-prep readiness only HOLD public live client-facing use` | Exact-copy review score 91%; deliverable-index row score 81%; older recording-prep materials also appear. | PASS: distinctive guardrail phrase retrieves the exact-copy review and index row. |
| `t_cdcb521b exact-copy recording-prep readiness all public live client-facing use still on HOLD` | Deliverable index score 83%. | PASS: deliverable-index row is searchable. |
| Direct `qmd get` for draft normalized URI | Returned the exact-copy recording draft header, task line, status line, guardrails, and input list. | PASS. |
| Direct `qmd get` for review normalized URI | Returned the exact-copy review header, task lines, status line, no-live-action guardrail, and verdict section. | PASS. |
| Direct `qmd get` for deliverable-index normalized URI | Returned the top `t_cdcb521b` and `t_c6d63503` rows. | PASS. |

## URI normalization caveats

- QMD normalizes collection document URIs to lowercase slug-like paths. The repository file is `docs/KANBAN_DELIVERABLE_INDEX.md`, but direct retrieval uses `qmd://whiteford-ai-law-pages/docs/kanban-deliverable-index.md`.
- Paths with underscores in source filenames have historically appeared normalized to hyphens in QMD URIs. This exact-copy chain uses hyphenated source filenames already, so the draft and review direct URIs match their relative filesystem paths except for the `qmd://whiteford-ai-law-pages/` prefix.
- Broad semantic searches containing common words such as `weekly`, `YouTube`, `authority`, and `review` can surface older weekly authority packets alongside the fresh exact-copy files. For deterministic retrieval, prefer task IDs, exact file-title phrases, distinctive guardrail phrases, or direct QMD URIs.

## Self-index result

After this report and the new deliverable-index row were written, one final self-index refresh was run:

```bash
qmd update
qmd embed
qmd status
```

Final self-index `qmd update` result:

- `whiteford-ai-law-pages`: indexed 1 new Markdown file, 1 updated file, 592 unchanged, 0 removed.
- `business-development-books`: 0 new, 0 updated, 6 unchanged, 0 removed.
- QMD reported 2 unique hashes needing vectors and cleaned up 1 orphaned content hash.

Final self-index embed result:

- Embedded 200 chunks from 2 documents in 5 seconds on the first self-index pass after creating this report and the deliverable-index row.
- A follow-up self-index pass after report wording cleanup embedded 6 chunks from 1 updated document and confirmed the report, `t_32bf9016` row, and direct report URI were retrievable.
- Final status checks stayed at 600 total indexed documents and `whiteford-ai-law-pages` at 594 Markdown files; vector counts increased as the updated report hash was embedded.
- The recurring non-fatal Metal/node-llama-cpp compile warning appeared again, but update/embed completed successfully.

Final verification targets passed: `t_32bf9016`, this report title, the report QMD URI, and the new top deliverable-index row.

## Conclusion

QMD retrieval for the 2026-05-25 weekly @SchellIP exact-copy recording draft/review chain is refreshed and verified for task IDs `t_c6d63503` and `t_cdcb521b`, title/body searches, distinctive review guardrail phrases, the deliverable-index row, and direct normalized QMD URI retrieval.

QMD is internal memory/search support only. It is not source-currentness proof, legal approval, launch approval, public/client-facing approval, attorney approval, or authorization for recording release, upload, page/schema mutation, email/SMS, HighLevel/CRM workflow, social/ad action, or any other live-system/client-facing action. Direct Markdown files and Kanban handoffs remain controlling.
