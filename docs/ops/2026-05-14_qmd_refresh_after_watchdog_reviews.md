# QMD Refresh — 2026-05-14 Watchdog Review Handoffs

Task: `t_e21813db`
Parent review tasks: `t_72fb9483`, `t_fc0096df`
Collection: `whiteford-ai-law-pages`
Workspace: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages`
Status: Internal/local QMD maintenance only. This does not authorize emails, HighLevel writes, workflow activation/enrollment, contact sync, social/LinkedIn action, ads, Clio writes, Supabase DDL/writes, public publishing, deployment, launch, client/prospect-facing use, attorney assignment, conflicts clearance, matter acceptance, or legal/ethics approval.

## Purpose

Refresh and verify local QMD retrieval after the overnight watchdog completed reviewer handoffs for:

- `t_72fb9483`: `docs/nightly-lead-research/runs/2026-05-14/nightly_qwen_prospect_digest_review_t_72fb9483.md`
- `t_fc0096df`: `docs/reviews/2026-05-14_phase_0_client_portal_roster_caveat_rereview.md`

The watchdog smoke check showed `qmd status` worked when run with Homebrew Node in PATH, but exact searches for the new Markdown handoffs either missed or returned older/index-adjacent rows.

## Commands run

All QMD commands used the Homebrew Node path requested by the task to avoid the known bare Node v24 / `better-sqlite3` ABI mismatch in cron:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd status
PATH="/opt/homebrew/bin:$PATH" qmd search "nightly_qwen_prospect_digest_review_t_72fb9483" -c whiteford-ai-law-pages
PATH="/opt/homebrew/bin:$PATH" qmd search "2026-05-14 nightly Qwen prospect digest review" -c whiteford-ai-law-pages
PATH="/opt/homebrew/bin:$PATH" qmd search "2026-05-14_phase_0_client_portal_roster_caveat_rereview" -c whiteford-ai-law-pages
PATH="/opt/homebrew/bin:$PATH" qmd search "t_fc0096df roster caveat" -c whiteford-ai-law-pages
PATH="/opt/homebrew/bin:$PATH" qmd update
PATH="/opt/homebrew/bin:$PATH" qmd embed --max-docs-per-batch 50 --max-batch-mb 10
PATH="/opt/homebrew/bin:$PATH" qmd status
# repeated the four smoke searches above
PATH="/opt/homebrew/bin:$PATH" qmd search "2026-05-14 phase 0 client portal roster caveat rereview" -c whiteford-ai-law-pages
```

## Before-refresh QMD status

- Index path: `/Users/jeff/.cache/qmd/index.sqlite`
- Index size: 41.6 MB
- Documents: 342 total files indexed
- Vectors: 6524 embedded
- Updated: 44 minutes before the status command
- `whiteford-ai-law-pages`: 336 Markdown files indexed, updated 44 minutes before the status command
- `business-development-books`: 6 Markdown files indexed
- Non-fatal note: `qmd status` printed `[node-llama-cpp] ggml_metal_library_init_from_source: error compiling source`, but exited successfully.

## Before-refresh smoke-search findings

| Query | Before result |
| --- | --- |
| `nightly_qwen_prospect_digest_review_t_72fb9483` | MISS. No results found. |
| `2026-05-14 nightly Qwen prospect digest review` | PARTIAL. Returned the 2026-05-14 digest, nightly-run prompt, and an older 2026-05-13 review index row, but not the new `t_72fb9483` review Markdown. |
| `2026-05-14_phase_0_client_portal_roster_caveat_rereview` | MISS. No results found. |
| `t_fc0096df roster caveat` | PARTIAL. Returned the earlier prototype review's `NEEDS REVISION` caveat and an older deliverable-index-adjacent row, but not the new `t_fc0096df` re-review Markdown. |

## Refresh results

- `qmd update`: `whiteford-ai-law-pages` indexed 3 new Markdown files, 1 updated Markdown file, 335 unchanged files, 0 removed files, and cleaned up 1 orphaned content hash.
- `business-development-books`: 0 new, 0 updated, 6 unchanged, 0 removed.
- `qmd embed --max-docs-per-batch 50 --max-batch-mb 10`: embedded 95 chunks from 4 documents in 2 seconds.
- Non-fatal note: `qmd embed` printed `[node-llama-cpp] ggml_metal_library_init_from_source: error compiling source`, but exited successfully and embeddings completed.

## After-refresh QMD status

- Index path: `/Users/jeff/.cache/qmd/index.sqlite`
- Index size: 41.6 MB
- Documents: 345 total files indexed
- Vectors: 6619 embedded
- Updated: 2 minutes before the status command
- `whiteford-ai-law-pages`: 339 Markdown files indexed, updated 2 minutes before the status command
- `business-development-books`: 6 Markdown files indexed
- Non-fatal note: `qmd status` again printed `[node-llama-cpp] ggml_metal_library_init_from_source: error compiling source`, but exited successfully.

## After-refresh smoke-search results

All after-refresh searches were scoped with `-c whiteford-ai-law-pages`.

| Query | After result |
| --- | --- |
| `nightly_qwen_prospect_digest_review_t_72fb9483` | PASS. Returned the new Markdown review at `qmd://whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-14/nightly-qwen-prospect-digest-review-t-72fb9483.md` and the deliverable-index row for `t_72fb9483`. |
| `2026-05-14 nightly Qwen prospect digest review` | PASS. Returned the new Markdown review at line 1, the 2026-05-14 digest, the deliverable-index row for `t_72fb9483`, and the nightly-run prompt. |
| `2026-05-14_phase_0_client_portal_roster_caveat_rereview` | MISS for the underscore-heavy literal query. QMD search did not return results for the exact underscore filename string even after update/embed, despite the Markdown file being indexed and retrievable by normalized phrase/task queries. |
| `t_fc0096df roster caveat` | PASS with caveat. Returned the previous prototype review first, then the new re-review Markdown at `qmd://whiteford-ai-law-pages/docs/reviews/2026-05-14-phase-0-client-portal-roster-caveat-rereview.md:1`, and the deliverable-index row for `t_fc0096df`. |
| `2026-05-14 phase 0 client portal roster caveat rereview` | PASS for normalized filename wording. Returned the new re-review Markdown at line 1 and the deliverable-index row containing the original underscore path. |

## Caveats

- QMD collection `whiteford-ai-law-pages` is configured with pattern `**/*.md`; it indexes Markdown files, not HTML body text, built Next.js output, browser-rendered UI text, or live local routes.
- The two requested artifacts are Markdown and are directly indexed. Search output normalizes file paths with hyphens, so `nightly_qwen_prospect_digest_review_t_72fb9483.md` appears as `nightly-qwen-prospect-digest-review-t-72fb9483.md`, and `2026-05-14_phase_0_client_portal_roster_caveat_rereview.md` appears as `2026-05-14-phase-0-client-portal-roster-caveat-rereview.md`.
- The exact underscore-heavy roster filename query remained a QMD search miss. The normalized phrase query and `t_fc0096df roster caveat` query verified the new Markdown re-review is indexed and searchable.
- Broad semantic queries can rank older, closely related review artifacts ahead of new handoffs. Task IDs and normalized title/filename phrases are more reliable for these QMD checks.
- QMD is internal memory/search only. Search hits are not source-current proof, legal/ethics approval, launch approval, outreach approval, CRM approval, consent verification, data-currentness proof, conflicts clearance, matter acceptance, or permission to take public/client-facing/live-system action.

## Final self-index verification

After writing this report and updating `docs/KANBAN_DELIVERABLE_INDEX.md`, a final self-index pass was run:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd update
PATH="/opt/homebrew/bin:$PATH" qmd embed --max-docs-per-batch 50 --max-batch-mb 10
PATH="/opt/homebrew/bin:$PATH" qmd status
PATH="/opt/homebrew/bin:$PATH" qmd search "t_e21813db" -c whiteford-ai-law-pages
PATH="/opt/homebrew/bin:$PATH" qmd search "QMD Refresh 2026 05 14 Watchdog Review Handoffs" -c whiteford-ai-law-pages
PATH="/opt/homebrew/bin:$PATH" qmd search "2026-05-14_qmd_refresh_after_watchdog_reviews" -c whiteford-ai-law-pages
```

Final self-index results:

- `qmd update`: `whiteford-ai-law-pages` indexed 1 new Markdown file, 1 updated Markdown file, 338 unchanged files, 0 removed files, and cleaned up 1 orphaned content hash.
- `qmd embed --max-docs-per-batch 50 --max-batch-mb 10`: embedded 89 chunks from 2 documents in 2 seconds.
- Final status: 346 total files indexed, 6708 vectors embedded.
- Final `whiteford-ai-law-pages` status: 340 Markdown files indexed, updated 10 seconds before the status output.
- Final query `t_e21813db`: PASS. Returned this report at `qmd://whiteford-ai-law-pages/docs/ops/2026-05-14-qmd-refresh-after-watchdog-reviews.md:3` and the deliverable-index row.
- Final query `QMD Refresh 2026 05 14 Watchdog Review Handoffs`: PASS. Returned this report at line 1 and the deliverable-index row.
- Final query `2026-05-14_qmd_refresh_after_watchdog_reviews`: MISS for the underscore-heavy literal report filename, matching the roster filename behavior above. The normalized report title and task-ID queries are the reliable self-index checks.
- Non-fatal note: `qmd embed` and `qmd status` again printed `[node-llama-cpp] ggml_metal_library_init_from_source: error compiling source`, but exited successfully.

## Boundary statement

This refresh only improves local/internal retrieval for the 2026-05-14 watchdog review handoff Markdown documents. It does not revise either parent review's safety posture: `t_72fb9483` remains PASS for internal-only review with HOLD on all external/live-system/client/prospect-facing actions, and `t_fc0096df` remains PASS for internal/local Phase 0 prototype review only with no launch/client-use/live-action approval.
