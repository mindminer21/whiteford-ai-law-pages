# QMD refresh — funnel map consent alignment — 2026-05-22

Task: `t_f24c5af1`
Parent review task: `t_9f11934b`
Parent implementation task: `t_0a7330ea`
Tenant: `whiteford-mountain-west`
Run timestamp: 2026-05-22 00:46:22 MDT

## Scope

Refresh and verify local QMD/searchability for the 2026-05-22 HighLevel funnel-map consent-alignment handoffs after reviewer completion.

Source files checked:
- `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/highlevel_ai_authority_funnel_map.md`
- `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/highlevel/2026-05-22_funnel_map_consent_alignment_note.md`
- `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/reviews/2026-05-22_funnel_map_consent_alignment_review.md`
- `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/KANBAN_DELIVERABLE_INDEX.md`

No HighLevel live edit, contact/opportunity mutation, tag application, workflow activation/enrollment, email/SMS/DM/newsletter send, social/LinkedIn/ad action, Supabase/Clio write, public deployment, DDL/sync/backfill, or client/prospect-facing action was performed.

## Initial QMD status

Command:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd status
```

Result:
- Index: `/Users/jeff/.cache/qmd/index.sqlite`
- Size: 74.0 MB
- Documents: 513 indexed files
- Vectors: 15302 embedded
- Collection `whiteford-ai-law-pages`: 507 files, updated about 2 hours earlier
- Collection `business-development-books`: 6 files
- Non-blocking QMD/Metal diagnostic appeared: `[node-llama-cpp] ggml_metal_library_init_from_source: error compiling source`

## Before-refresh smoke searches

Commands used `PATH="/opt/homebrew/bin:$PATH" qmd search <query> -c whiteford-ai-law-pages`.

| Query | Before result |
| --- | --- |
| `highlevel_ai_authority_funnel_map opt-in-only consent routing` | Returned older related hits, including `docs/digests/2026-05-21-daily-digest.md` and `docs/kanban-deliverable-index.md`, but did not yet return the 2026-05-22 note/review. |
| `t_0a7330ea` | No results found. |
| `t_9f11934b` | No results found. |
| `Review — HighLevel funnel map consent alignment — 2026-05-22` | No results found. |
| `QMD refresh — funnel map consent alignment — 2026-05-22` | No results found; expected because this report did not exist yet. |

Direct `qmd get` before refresh:
- `qmd://whiteford-ai-law-pages/highlevel_ai_authority_funnel_map.md` worked.
- `qmd://whiteford-ai-law-pages/docs/highlevel/2026-05-22_funnel_map_consent_alignment_note.md` was not found.
- `qmd://whiteford-ai-law-pages/docs/reviews/2026-05-22_funnel_map_consent_alignment_review.md` was not found.
- `qmd://whiteford-ai-law-pages/docs/reports/2026-05-22-0030-funnel-map-consent-qmd-refresh.md` was not found; expected because this report did not exist yet.

## Refresh commands

Command:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd update && PATH="/opt/homebrew/bin:$PATH" qmd embed --max-docs-per-batch 50 --max-batch-mb 10
```

Result:
- `whiteford-ai-law-pages`: 2 new, 2 updated, 505 unchanged, 0 removed.
- Cleaned up 2 orphaned content hashes.
- `business-development-books`: 0 new, 0 updated, 6 unchanged, 0 removed.
- Embedded 174 chunks from 4 documents in 4 seconds.
- The same non-blocking QMD/Metal diagnostic appeared during embedding.

## Post-refresh smoke searches before self-indexing this report

| Query | Result after update/embed |
| --- | --- |
| `highlevel_ai_authority_funnel_map opt-in-only consent routing` | Returned the 2026-05-22 consent-alignment note and review, plus older digest/index context. |
| `t_0a7330ea` | Returned the 2026-05-22 consent-alignment note, review, and deliverable index. |
| `t_9f11934b` | Returned the 2026-05-22 consent-alignment review and deliverable index. |
| `Review — HighLevel funnel map consent alignment — 2026-05-22` | Returned the review and related note/index entries. |
| `QMD refresh — funnel map consent alignment — 2026-05-22` | Returned related note/review/index entries before this report was created; final verification after self-indexing should return this report directly. |

Direct `qmd get` after update/embed succeeded for:
- `qmd://whiteford-ai-law-pages/docs/highlevel/2026-05-22_funnel_map_consent_alignment_note.md`
- `qmd://whiteford-ai-law-pages/docs/reviews/2026-05-22_funnel_map_consent_alignment_review.md`

## QMD path-normalization caveat

QMD search output normalizes some URI path components by replacing underscores with hyphens, for example:
- source file path: `docs/highlevel/2026-05-22_funnel_map_consent_alignment_note.md`
- search result URI: `qmd://whiteford-ai-law-pages/docs/highlevel/2026-05-22-funnel-map-consent-alignment-note.md`

However, direct `qmd get` using the underscore source path now works after refresh. For exact-path verification, prefer `qmd get qmd://whiteford-ai-law-pages/<source-path>`; for broad discovery, search by title, task ID, or distinctive body text.

## Final self-index verification

After this report and `docs/KANBAN_DELIVERABLE_INDEX.md` were written, the refresh command was run again:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd update && PATH="/opt/homebrew/bin:$PATH" qmd embed --max-docs-per-batch 50 --max-batch-mb 10
```

Result:
- `whiteford-ai-law-pages`: 1 new, 1 updated, 508 unchanged, 0 removed.
- Cleaned up 1 orphaned content hash.
- Embedded 155 chunks from 2 documents in 4 seconds.
- The same non-blocking QMD/Metal diagnostic appeared during embedding.

Final smoke searches verified:
- `highlevel_ai_authority_funnel_map opt-in-only consent routing` returned this QMD refresh report, the 2026-05-22 note, and the 2026-05-22 review.
- `t_0a7330ea` returned this QMD refresh report, the note, the review, and the deliverable index.
- `t_9f11934b` returned this QMD refresh report, the review, and the deliverable index.
- `t_f24c5af1` returned this QMD refresh report and the deliverable index.
- `Review — HighLevel funnel map consent alignment — 2026-05-22` returned the review and related report/note/index surfaces.
- `QMD refresh — funnel map consent alignment — 2026-05-22` returned this report as the top hit.

Final direct `qmd get` verified:
- `qmd://whiteford-ai-law-pages/docs/reports/2026-05-22-0030-funnel-map-consent-qmd-refresh.md`
- `qmd://whiteford-ai-law-pages/docs/KANBAN_DELIVERABLE_INDEX.md`
- `qmd://whiteford-ai-law-pages/docs/highlevel/2026-05-22_funnel_map_consent_alignment_note.md`
- `qmd://whiteford-ai-law-pages/docs/reviews/2026-05-22_funnel_map_consent_alignment_review.md`

## Operational conclusion

Local QMD was stale for the 2026-05-22 funnel-map consent-alignment note/review before refresh. After `qmd update` and bounded `qmd embed`, QMD search and direct retrieval found the reviewer-completed handoffs by task IDs and title/body terms. This report and the updated deliverable index were then self-indexed and verified by title, task ID, and direct `qmd get`.
