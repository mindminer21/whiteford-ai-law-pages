# QMD refresh — Josh.ai attorney-review packet — 2026-05-23

Task: `t_0809b5d0`
Tenant: `whiteford-mountain-west`
Generated: 2026-05-23 04:41:20 MDT

## Scope

Refreshed local QMD/searchability for the Josh.ai attorney-review packet after reviewer task `t_349a2421` completed.

Artifacts in scope:

- Draft packet: `docs/growth-os/prospect-drafts/2026-05-23_josh_ai_attorney_review_packet.md`
- Reviewer handoff: `docs/reviews/2026-05-23_josh_ai_attorney_review_packet_review.md`
- Deliverable-index row for reviewer task `t_349a2421`
- This QMD refresh report: `docs/qmd-refresh/2026-05-23_josh_ai_attorney_review_packet_qmd_refresh.md`
- Deliverable-index row for this refresh task `t_0809b5d0`

This was internal/private QMD retrieval maintenance only. No HighLevel, Supabase, CRM, Clio, workflow, calendar, contact, opportunity, tag, field, sync, DDL, email/SMS/DM, LinkedIn/social/ad, outreach, public, client-facing, or prospect-facing action was performed.

## Commands run

All commands were run from `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages` with `PATH="/opt/homebrew/bin:$PATH"`.

```bash
PATH="/opt/homebrew/bin:$PATH" qmd --version
PATH="/opt/homebrew/bin:$PATH" qmd status
PATH="/opt/homebrew/bin:$PATH" qmd update
PATH="/opt/homebrew/bin:$PATH" qmd embed --max-docs-per-batch 50 --max-batch-mb 10
PATH="/opt/homebrew/bin:$PATH" qmd search "<probe>" -c whiteford-ai-law-pages --limit 8 --line-numbers
```

QMD printed the known non-blocking diagnostic `[node-llama-cpp] ggml_metal_library_init_from_source: error compiling source` during status/embed, but commands exited `0` and embedding completed.

## Initial status and refresh result

Before refresh:

- QMD version: `qmd 2.1.0`
- Index: `/Users/jeff/.cache/qmd/index.sqlite`
- Index size: 81.8 MB
- Documents: 542 indexed files
- Vectors: 17,055 embedded
- Collection `whiteford-ai-law-pages`: 536 Markdown files, updated about 1 hour earlier
- Collection `business-development-books`: 6 Markdown files, updated 17 days earlier
- Collection pattern: `**/*.md`

`qmd update` completed successfully:

- `whiteford-ai-law-pages`: indexed 2 new, 1 updated, 535 unchanged, 0 removed.
- Cleaned up 1 orphaned content hash.
- `business-development-books`: indexed 0 new, 0 updated, 6 unchanged, 0 removed.
- QMD reported 3 unique hashes needing vectors.

Bounded embedding completed successfully:

- `qmd embed --max-docs-per-batch 50 --max-batch-mb 10`
- Embedded 177 chunks from 3 documents in 4 seconds.

## Post-refresh smoke searches before self-indexing this report

| Probe | Result after update/embed |
|---|---|
| `t_449b029c` | PASS. Hit the reviewer handoff at `docs/reviews/2026-05-23-josh-ai-attorney-review-packet-review.md`, the draft packet at `docs/growth-os/prospect-drafts/2026-05-23-josh-ai-attorney-review-packet.md`, and the deliverable index. |
| `t_349a2421` | PASS. Hit the reviewer handoff and `docs/kanban-deliverable-index.md` row for `Review Josh.ai attorney-review draft packet - 2026-05-23`. |
| `Josh.ai attorney-review draft packet` | PASS. Hit the draft packet title and related nightly-review context. |
| `t_349a2421 Review Josh.ai attorney-review draft packet` | MISS as a combined strict phrase/query. The individual task-ID probe and title/body probe both pass, and direct source files remain controlling. |
| `docs/KANBAN_DELIVERABLE_INDEX.md Josh.ai attorney-review` | MISS as a literal path-plus-title query. The normalized deliverable-index URI `qmd://whiteford-ai-law-pages/docs/kanban-deliverable-index.md` is retrieved by task-ID/title probes, and direct `qmd get` can retrieve the index. |

QMD search result URIs normalized underscores to hyphens and lowercased the deliverable-index path in displayed URIs. This is a QMD display/search normalization caveat, not a source-file mutation.

## Guardrail notes

- HTML is not relevant for this task. The in-scope artifacts are Markdown and are covered by the `whiteford-ai-law-pages` `**/*.md` collection.
- QMD is an internal memory/search layer only. Direct Markdown source files and Kanban handoffs remain controlling.
- This QMD refresh does not authorize public/client-facing use, CRM/HighLevel/Supabase/Clio mutation, workflow activation/enrollment, contact/opportunity/tag/field action, send, outreach, LinkedIn/social/ad action, DDL, sync, backfill, prospect contact, or any other live-system action.

## Final self-index verification

After this report and the `docs/KANBAN_DELIVERABLE_INDEX.md` row were written, I ran one final self-index pass.

```bash
PATH="/opt/homebrew/bin:$PATH" qmd update
PATH="/opt/homebrew/bin:$PATH" qmd embed --max-docs-per-batch 50 --max-batch-mb 10
PATH="/opt/homebrew/bin:$PATH" qmd status
PATH="/opt/homebrew/bin:$PATH" qmd search "<final probe>" -c whiteford-ai-law-pages --limit 8 --line-numbers
PATH="/opt/homebrew/bin:$PATH" qmd get qmd://whiteford-ai-law-pages/docs/qmd-refresh/2026-05-23_josh_ai_attorney_review_packet_qmd_refresh.md -l 40
PATH="/opt/homebrew/bin:$PATH" qmd get qmd://whiteford-ai-law-pages/docs/KANBAN_DELIVERABLE_INDEX.md -l 35
```

Raw final log:

- `/tmp/t_0809b5d0_qmd_self_index_final.log`

Self-index result:

- Initial self-index after creating this report/index row: `qmd update` indexed 1 new, 1 updated, 537 unchanged, 0 removed in `whiteford-ai-law-pages`; `business-development-books` indexed 0 new, 0 updated, 6 unchanged, 0 removed; QMD reported 2 unique hashes needing vectors.
- Initial bounded embed: `qmd embed --max-docs-per-batch 50 --max-batch-mb 10` embedded 167 chunks from 2 documents in 4 seconds.
- Final status at that point: 545 files indexed, 17,399 vectors embedded, 82.1 MB index, `whiteford-ai-law-pages` 539 Markdown files updated 16 seconds earlier.
- After finalizing this report text, I ran additional update/embed reconciliation passes for the report itself; `/tmp/t_0809b5d0_qmd_self_index_final.log` records the exact final chunk counts.
- The final verification search `t_0809b5d0 t_349a2421 t_449b029c` hit this report and the deliverable-index row after the reconciliation passes.

Final smoke searches verified:

| Probe | Final result |
|---|---|
| `t_0809b5d0 t_349a2421 t_449b029c` | PASS. Hit this report and the deliverable-index row for this task. |
| `t_449b029c` | PASS. Hit this report, the reviewer handoff, the draft packet, and the deliverable-index row. |
| `t_349a2421` | PASS. Hit this report, the reviewer handoff, and the deliverable-index row. |
| `Josh.ai attorney-review draft packet` | PASS. Hit the draft packet title and related nightly-review context. |
| `t_0809b5d0 Refresh QMD Josh.ai attorney-review packet 2026-05-23` | MISS as a combined strict query; the combined task-ID probe above retrieves this report and the index row. |
| `2026-05-23_josh_ai_attorney_review_packet_qmd_refresh` | MISS as an underscore-heavy filename query; direct `qmd get` retrieves the report by source path. |
| `t_349a2421 Review Josh.ai attorney-review draft packet` | MISS as a combined strict query; the separate task-ID/title probes retrieve the controlling review, packet, and index surfaces. |
| `Whiteford Mountain West Kanban Deliverable Index t_0809b5d0 Josh.ai` | MISS as a combined strict query; direct `qmd get` retrieves the deliverable index and the multi-ID probe retrieves the index row. |

Final direct `qmd get` verified:

- `qmd://whiteford-ai-law-pages/docs/qmd-refresh/2026-05-23_josh_ai_attorney_review_packet_qmd_refresh.md`
- `qmd://whiteford-ai-law-pages/docs/KANBAN_DELIVERABLE_INDEX.md`

## Verdict

Local QMD was refreshed, embedded, and self-indexed for the Josh.ai attorney-review packet and reviewer handoff. Required retrieval surfaces pass for writer task `t_449b029c`, reviewer task `t_349a2421`, the phrase `Josh.ai attorney-review draft packet`, this task `t_0809b5d0`, and the deliverable-index row via normalized task-ID/title probes and direct `qmd get`; strict combined path/title probes have the documented QMD normalization caveat. QMD remains internal search support only and does not authorize any live-system, external, public, outreach, CRM/HighLevel/Supabase/Clio, workflow, social/ad, or prospect-facing action.
