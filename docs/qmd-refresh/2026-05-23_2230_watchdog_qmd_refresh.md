# QMD refresh — watchdog same-day handoffs — 2026-05-23 22:30 MDT

Task: `t_97f5d327`
Tenant: `whiteford-mountain-west`
Generated: 2026-05-23 22:34:22 MDT
Collection: `whiteford-ai-law-pages`

## Scope

Watchdog reported that QMD was stale for same-day May 23 Whiteford handoffs and that the following smoke searches returned no results even though the controlling Markdown files existed and were listed in `docs/KANBAN_DELIVERABLE_INDEX.md`:

- `2026-05-23 daily digest Josh.ai Vexcel`
- `t_41b8c44a Vexcel no-tag CTA 404`
- `May 23 DB reconciliation AKASA Deepwatch Josh.ai LinkedIn`

This refresh covered the May 23 daily digest, Vexcel LinkedIn awareness review, Josh.ai attorney-review packet/review/QMD refresh report, corrected nightly prospect packet/review/QMD report, and the deliverable-index rows. This was internal/private QMD retrieval maintenance only. No public/client-facing publishing, HighLevel/CRM/Supabase/Clio mutation, workflow activation/enrollment, email/SMS/DM/social/LinkedIn/ad action, DDL, sync, backfill, prospect contact, tagging, field updates, or external action was performed or authorized.

## Commands run

All commands were run from `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages` with `PATH="/opt/homebrew/bin:$PATH"`.

```bash
PATH="/opt/homebrew/bin:$PATH" qmd --version
PATH="/opt/homebrew/bin:$PATH" qmd status
PATH="/opt/homebrew/bin:$PATH" qmd search "2026-05-23 daily digest Josh.ai Vexcel" -c whiteford-ai-law-pages --limit 8 --line-numbers
PATH="/opt/homebrew/bin:$PATH" qmd search "t_41b8c44a Vexcel no-tag CTA 404" -c whiteford-ai-law-pages --limit 8 --line-numbers
PATH="/opt/homebrew/bin:$PATH" qmd search "May 23 DB reconciliation AKASA Deepwatch Josh.ai LinkedIn" -c whiteford-ai-law-pages --limit 8 --line-numbers
PATH="/opt/homebrew/bin:$PATH" qmd update
PATH="/opt/homebrew/bin:$PATH" qmd embed --max-docs-per-batch 50 --max-batch-mb 10
PATH="/opt/homebrew/bin:$PATH" qmd status
PATH="/opt/homebrew/bin:$PATH" qmd get qmd://whiteford-ai-law-pages/docs/digests/2026-05-23_daily_digest.md -l 12
PATH="/opt/homebrew/bin:$PATH" qmd get qmd://whiteford-ai-law-pages/docs/growth-os/linkedin-awareness-drafts/2026-05-23/2026-05-23-vexcel-linkedin-awareness-review_t_41b8c44a.md -l 12
PATH="/opt/homebrew/bin:$PATH" qmd get qmd://whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-23/qmd_refresh_report_t_e0c293f1.md -l 12
PATH="/opt/homebrew/bin:$PATH" qmd get qmd://whiteford-ai-law-pages/docs/qmd-refresh/2026-05-23_josh_ai_attorney_review_packet_qmd_refresh.md -l 12
PATH="/opt/homebrew/bin:$PATH" qmd get qmd://whiteford-ai-law-pages/docs/reviews/2026-05-23_josh_ai_attorney_review_packet_review.md -l 12
PATH="/opt/homebrew/bin:$PATH" qmd search "Daily HighLevel Growth OS Optimization Digest 2026-05-23" -c whiteford-ai-law-pages --limit 8 --line-numbers
PATH="/opt/homebrew/bin:$PATH" qmd search "correction report AKASA Deepwatch Josh.ai LinkedIn" -c whiteford-ai-law-pages --limit 8 --line-numbers
PATH="/opt/homebrew/bin:$PATH" qmd search "t_e0c293f1 corrected 2026-05-23 nightly prospect packet" -c whiteford-ai-law-pages --limit 8 --line-numbers
PATH="/opt/homebrew/bin:$PATH" qmd search "t_417dd89d AKASA Deepwatch no-tag social posture" -c whiteford-ai-law-pages --limit 8 --line-numbers
```

Raw logs:

- `/tmp/qmd-refresh-t_97f5d327/initial_refresh.log`
- `/tmp/qmd-refresh-t_97f5d327/targeted_verification.log`

QMD printed the known non-blocking diagnostic `[node-llama-cpp] ggml_metal_library_init_from_source: error compiling source` during `qmd status`/`qmd embed`, but commands exited successfully and embedding completed.

## Before status

Before refresh:

- QMD version: `qmd 2.1.0`
- Index: `/Users/jeff/.cache/qmd/index.sqlite`
- Index size: 84.7 MB
- Documents: 545 indexed files
- Vectors: 17,412 embedded
- Overall updated: 17h ago
- Collection `whiteford-ai-law-pages`: 539 Markdown files, updated 17h ago
- Collection `business-development-books`: 6 Markdown files, updated 17d ago
- Collection pattern: `**/*.md`

Initial watchdog smoke-search results reproduced:

| Probe | Before result |
|---|---|
| `2026-05-23 daily digest Josh.ai Vexcel` | MISS: `No results found.` |
| `t_41b8c44a Vexcel no-tag CTA 404` | MISS: `No results found.` |
| `May 23 DB reconciliation AKASA Deepwatch Josh.ai LinkedIn` | MISS: `No results found.` |

## Refresh result

`qmd update` completed successfully:

- `whiteford-ai-law-pages`: indexed 4 new, 1 updated, 538 unchanged, 0 removed.
- Cleaned up 1 orphaned content hash.
- `business-development-books`: indexed 0 new, 0 updated, 6 unchanged, 0 removed.
- QMD reported 5 unique hashes needing vectors.

Bounded embedding completed successfully:

- Command: `qmd embed --max-docs-per-batch 50 --max-batch-mb 10`
- Embedded 188 chunks from 5 documents in 4 seconds.

After refresh status:

- Index size: 85.3 MB
- Documents: 549 indexed files
- Vectors: 17,600 embedded
- Overall updated: 14h ago
- Collection `whiteford-ai-law-pages`: 543 Markdown files, updated 14h ago
- Collection `business-development-books`: 6 Markdown files, updated 17d ago

## After smoke-search and retrieval results

| Probe | After result |
|---|---|
| `2026-05-23 daily digest Josh.ai Vexcel` | MISS as a combined semantic query. Direct `qmd get` and targeted title/search probes retrieve the daily digest; see caveats below. |
| `t_41b8c44a Vexcel no-tag CTA 404` | PASS. Hit the Vexcel review, the May 23 daily digest, and the deliverable index. |
| `May 23 DB reconciliation AKASA Deepwatch Josh.ai LinkedIn` | MISS as a combined semantic query. Targeted AKASA/Deepwatch/Josh.ai probes retrieve controlling artifacts; see caveats below. |
| `t_0809b5d0 t_e0c293f1 t_41b8c44a` | PASS. Hit `docs/KANBAN_DELIVERABLE_INDEX.md` at the May 23 rows. |
| `Daily HighLevel Growth OS Optimization Digest 2026-05-23` | PASS. Hit `docs/digests/2026-05-23_daily_digest.md` and the deliverable-index row. |
| `correction report AKASA Deepwatch Josh.ai LinkedIn` | PASS. Hit the nightly digest review and the Josh.ai attorney-review packet with AKASA/Deepwatch HOLD context. |
| `t_e0c293f1 corrected 2026-05-23 nightly prospect packet` | PASS. Hit `docs/nightly-lead-research/runs/2026-05-23/qmd_refresh_report_t_e0c293f1.md` and the deliverable-index row. |
| `t_417dd89d AKASA Deepwatch no-tag social posture` | PASS. Hit the Josh.ai review, daily digest, Josh.ai packet, and deliverable-index row with corrected AKASA/Deepwatch/no-tag posture. |

Direct `qmd get` retrieval verified these in-scope artifacts:

- `qmd://whiteford-ai-law-pages/docs/digests/2026-05-23_daily_digest.md`
- `qmd://whiteford-ai-law-pages/docs/growth-os/linkedin-awareness-drafts/2026-05-23/2026-05-23-vexcel-linkedin-awareness-review_t_41b8c44a.md`
- `qmd://whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-23/qmd_refresh_report_t_e0c293f1.md`
- `qmd://whiteford-ai-law-pages/docs/qmd-refresh/2026-05-23_josh_ai_attorney_review_packet_qmd_refresh.md`
- `qmd://whiteford-ai-law-pages/docs/reviews/2026-05-23_josh_ai_attorney_review_packet_review.md`

## Collection-pattern and normalization caveats

- The active `whiteford-ai-law-pages` collection pattern is Markdown-only: `**/*.md`.
- QMD display/search output normalizes some source paths, e.g. underscores may appear as hyphens in displayed URIs (`2026-05-23_daily_digest.md` displayed as `2026-05-23-daily-digest.md` in search results). Direct `qmd get` works with the controlling source paths above.
- Broad multi-topic combined queries can still miss even when the underlying documents are indexed and direct/title/task-ID probes retrieve them. For operational lookup, prefer task IDs, exact document titles, or direct `qmd get` URIs over long mixed-topic smoke strings.
- QMD is internal memory/search support only. Direct Markdown files and Kanban handoffs remain controlling.

## Final self-index verification

After this report and the `docs/KANBAN_DELIVERABLE_INDEX.md` row were written, I ran one final self-index pass.

```bash
PATH="/opt/homebrew/bin:$PATH" qmd update
PATH="/opt/homebrew/bin:$PATH" qmd embed --max-docs-per-batch 50 --max-batch-mb 10
PATH="/opt/homebrew/bin:$PATH" qmd status
PATH="/opt/homebrew/bin:$PATH" qmd search "t_97f5d327 Refresh QMD 2026-05-23 watchdog same-day handoffs" -c whiteford-ai-law-pages --limit 8 --line-numbers
PATH="/opt/homebrew/bin:$PATH" qmd get qmd://whiteford-ai-law-pages/docs/qmd-refresh/2026-05-23_2230_watchdog_qmd_refresh.md -l 24
PATH="/opt/homebrew/bin:$PATH" qmd get qmd://whiteford-ai-law-pages/docs/KANBAN_DELIVERABLE_INDEX.md -l 18
```

Raw final logs:

- `/tmp/qmd-refresh-t_97f5d327/final_self_index.log`
- `/tmp/qmd-refresh-t_97f5d327/final_reconciliation.log` (post-report-patch reconciliation)

Final self-index result:

- `qmd update`: `whiteford-ai-law-pages` indexed 1 new, 1 updated, 542 unchanged, 0 removed; cleaned up 1 orphaned content hash. `business-development-books` indexed 0 new, 0 updated, 6 unchanged, 0 removed.
- `qmd embed --max-docs-per-batch 50 --max-batch-mb 10`: embedded 172 chunks from 2 documents in 4 seconds.
- Final `qmd status`: 550 total files indexed, 17,772 vectors embedded, 85.6 MB index, overall updated 19 seconds earlier, `whiteford-ai-law-pages` 544 Markdown files updated 19 seconds earlier.
- Final search `t_97f5d327 Refresh QMD 2026-05-23 watchdog same-day handoffs`: PASS. Hit this report and the top-of-file deliverable-index row.
- Final direct `qmd get` verified this report and `docs/KANBAN_DELIVERABLE_INDEX.md`.
- Broad final probes `2026-05-23 2230 watchdog QMD refresh Vexcel Josh.ai Deepwatch` and `t_97f5d327 May 23 daily digest Vexcel Josh.ai AKASA Deepwatch` still missed as combined semantic queries; this matches the documented broad-query caveat, while task-ID/title/direct retrieval passes.

## Verdict

Local QMD was refreshed, embedded, and self-indexed for the same-day May 23 Whiteford handoff surfaces and this watchdog refresh report. The originally stale Vexcel smoke query now retrieves the Vexcel review/digest/index surfaces; the daily digest, Josh.ai, corrected nightly packet, this report, and deliverable-index artifacts are directly retrievable and pass targeted title/task-ID probes. The remaining misses are documented as combined-query/normalization caveats, not missing source files or authorization for any live action.
