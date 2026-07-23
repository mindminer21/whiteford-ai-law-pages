# QMD refresh — 2026-05-20 00:30 watchdog action handoffs

Task: `t_d59dee35`
Parent review task indexed: `t_bf892071`
Brief task indexed: `t_e2df35fe`
Deck/note task indexed: `t_41c77db2`
Generated: 2026-05-20 00:49:09 MDT
Status: internal/private QMD retrieval verification only. This report intentionally includes the exact smoke-search phrases `Prepare 2026-05-20 00:30 Whiteford watchdog action brief`, `Create private 2026-05-20 watchdog command deck`, `Review private 2026-05-20 watchdog command deck`, `PGRST205`, and `Cloudflare Error 1010` for self-index verification. No HighLevel probe, CRM/Supabase/Clio mutation, workflow activation/enrollment, tag, send, outreach, LinkedIn/social/ad action, public/client-facing action, DDL, sync, backfill, source-provider restoration, or production credential use was performed.

## Scope

Refreshed and verified local QMD retrieval for the 2026-05-20 00:30 watchdog action brief, command deck implementation note, command deck review, and deliverable-index rows.

Source artifacts:

- `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/decision-packets/2026-05-20_0030_watchdog_action_brief.md`
- `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/decision-packets/2026-05-20_0030_watchdog_command_deck.html`
- `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/decision-packets/2026-05-20_0030_watchdog_command_deck_note.md`
- `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/reviews/2026-05-20_0030_watchdog_command_deck_review.md`
- `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/KANBAN_DELIVERABLE_INDEX.md`

## Commands run

All commands were run from `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages` with `PATH="/opt/homebrew/bin:$PATH"`.

Refresh command after preflight misses:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd update
PATH="/opt/homebrew/bin:$PATH" qmd embed --max-docs-per-batch 50 --max-batch-mb 10
```

QMD printed `[node-llama-cpp] ggml_metal_library_init_from_source: error compiling source` during status/embed output, but the commands exited `0` and indexing/embedding completed.

Raw logs retained during this run:

- `/tmp/t_d59dee35_qmd_before.log`
- `/tmp/t_d59dee35_qmd_after.log`
- `/tmp/t_d59dee35_qmd_targeted.log`

## Before status

`PATH="/opt/homebrew/bin:$PATH" qmd status`

```text
QMD Status

Index: /Users/jeff/.cache/qmd/index.sqlite
Size:  68.9 MB

Documents
  Total:    480 files indexed
  Vectors:  13343 embedded
  Updated:  57m ago

Collections
  whiteford-ai-law-pages (qmd://whiteford-ai-law-pages/)
    Pattern:  **/*.md
    Files:    474 (updated 57m ago)
  business-development-books (qmd://business-development-books/)
    Pattern:  **/*.md
    Files:    6 (updated 14d ago)
```

## Before smoke searches

Before refresh, the current 2026-05-20 Markdown handoffs were not retrievable by the required task/title probes:

| Probe | Before result |
|---|---|
| `t_e2df35fe` | No results found. |
| `t_41c77db2` | No results found. |
| `t_bf892071` | No results found. |
| `t_d59dee35` | No results found. |
| `Prepare 2026-05-20 00:30 Whiteford watchdog action brief` | No results found. |
| `Create private 2026-05-20 watchdog command deck` | No results found. |
| `Review private 2026-05-20 watchdog command deck` | No results found. |
| `2026-05-20 watchdog command deck preserves no-live-action` | No results found. |
| Deliverable-index row probes for `t_e2df35fe`, `t_41c77db2`, and `t_bf892071` | No results found. |
| `PGRST205` | Returned older Supabase sync reports, not the new 2026-05-20 action brief. |
| `Cloudflare Error 1010` | Returned older HighLevel/QMD/action-brief context, not the new 2026-05-20 action brief. |

Because the expected current Markdown was missing from search results, I ran the bounded refresh/embed commands.

## Refresh result

- `qmd update`: for `whiteford-ai-law-pages`, indexed `3 new`, `1 updated`, `473 unchanged`, `0 removed`, and cleaned `1 orphaned content hash`; for `business-development-books`, indexed `0 new`, `0 updated`, `6 unchanged`, `0 removed`.
- `qmd embed --max-docs-per-batch 50 --max-batch-mb 10`: embedded `156 chunks from 4 documents in 4s`.

## After status

`PATH="/opt/homebrew/bin:$PATH" qmd status`

```text
QMD Status

Index: /Users/jeff/.cache/qmd/index.sqlite
Size:  69.3 MB

Documents
  Total:    483 files indexed
  Vectors:  13499 embedded
  Updated:  2m ago

Collections
  whiteford-ai-law-pages (qmd://whiteford-ai-law-pages/)
    Pattern:  **/*.md
    Files:    477 (updated 2m ago)
  business-development-books (qmd://business-development-books/)
    Pattern:  **/*.md
    Files:    6 (updated 14d ago)
```

## After smoke searches

All searches used `PATH="/opt/homebrew/bin:$PATH" qmd search "<probe>" -c whiteford-ai-law-pages --limit 5`.

| Probe | After result |
|---|---|
| `t_e2df35fe` | PASS. Hit `docs/kanban-deliverable-index.md:19` with the action-brief row. |
| `t_41c77db2` | PASS. Hit `docs/reviews/2026-05-20-0030-watchdog-command-deck-review.md:1` and `docs/kanban-deliverable-index.md:12`. |
| `t_bf892071` | PASS. Hit `docs/reviews/2026-05-20-0030-watchdog-command-deck-review.md:1` and `docs/kanban-deliverable-index.md:5`. |
| `Prepare 2026-05-20 00:30 Whiteford watchdog action brief` | PASS. Hit `docs/decision-packets/2026-05-20-0030-watchdog-action-brief.md:1` and the deliverable-index row. |
| `Create private 2026-05-20 watchdog command deck` | PASS. Hit the review, action brief, and deliverable-index row. |
| `Review private 2026-05-20 watchdog command deck` | PASS. Hit the implementation note, review, action brief, and deliverable-index row. |
| `2026-05-20 watchdog command deck preserves no-live-action` | PASS. Hit the implementation note, review, action brief, and deliverable-index row. |
| `t_e2df35fe Prepare 2026 05 20 0030 watchdog action brief deliverable index` | PASS. Hit the deliverable-index row. |
| `t_41c77db2 Create private 2026 05 20 watchdog command deck deliverable index` | PASS. Hit the review and deliverable-index row. |
| `t_bf892071 Review private 2026 05 20 watchdog command deck deliverable index` | PASS. Hit the review and deliverable-index row. |
| `PGRST205` | PARTIAL. Exact one-token query still ranks older Supabase sync reports first. Normalized targeted probe `Supabase expanded schema t_fa6eb9c1 core prospects readable expanded phase 6 11 tables` hit the current action brief at line 11, including `404/PGRST205`. |
| `Cloudflare Error 1010` | PASS. Hit the current action brief at line 12 plus older HighLevel context. |
| `HighLevel LeadConnector t_7884ab57 Cloudflare Error 1010 access denied` | PASS. Hit the current action brief at line 12 plus older HighLevel context. |

## Direct QMD get verification

`qmd get` returned current content for the controlling Markdown artifacts:

- `qmd://whiteford-ai-law-pages/docs/decision-packets/2026-05-20_0030_watchdog_action_brief.md`
- `qmd://whiteford-ai-law-pages/docs/decision-packets/2026-05-20_0030_watchdog_command_deck_note.md`
- `qmd://whiteford-ai-law-pages/docs/reviews/2026-05-20_0030_watchdog_command_deck_review.md`
- `qmd://whiteford-ai-law-pages/docs/KANBAN_DELIVERABLE_INDEX.md`

Path note: QMD result display normalizes underscores to hyphens in result URLs for some documents, while the source files on disk retain underscores.

## HTML deck indexing limitation

The raw HTML command deck body is not expected to be directly indexed because the QMD `whiteford-ai-law-pages` collection pattern is `**/*.md`. The Markdown action brief, implementation note, review, and deliverable-index rows are indexed and sufficient for internal retrieval of the deck context and handoff decisions; use the direct HTML file path for the raw deck.

## Self-index result

After writing this report and updating the deliverable index, I ran the same bounded self-index refresh:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd update
PATH="/opt/homebrew/bin:$PATH" qmd embed --max-docs-per-batch 50 --max-batch-mb 10
PATH="/opt/homebrew/bin:$PATH" qmd status
```

Self-index result:

- `qmd update`: for `whiteford-ai-law-pages`, indexed `1 new`, `1 updated`, `476 unchanged`, `0 removed`, and cleaned `1 orphaned content hash`; for `business-development-books`, indexed `0 new`, `0 updated`, `6 unchanged`, `0 removed`.
- `qmd embed --max-docs-per-batch 50 --max-batch-mb 10`: embedded `148 chunks from 2 documents in 4s`.
- Follow-up status showed `484 files indexed`, `13647 embedded`, and `whiteford-ai-law-pages` at `478` Markdown files updated `17s ago`.

Self-index smoke-searches confirmed:

| Probe | Result |
|---|---|
| `t_d59dee35` | Hit this report at `docs/reports/2026-05-20-0030-watchdog-qmd-refresh.md:3` and the deliverable-index row. |
| `QMD refresh 2026 05 20 0030 watchdog action handoffs` | Hit this report H1, the review, and the deliverable-index row. |
| `2026-05-20-0030-watchdog-qmd-refresh` | Hit this report and the deliverable-index row. |
| `PGRST205 ranking caveats Markdown-only limitation raw HTML deck` | Hit the deliverable-index row documenting the caveat. |
| `t_e2df35fe t_41c77db2 t_bf892071 watchdog QMD refresh` | Hit this report and the deliverable-index row. |

Because this section was added after that self-index pass, I ran one final bounded `qmd update`/`qmd embed` pass to index the finalized report body.

## QMD caveats

- QMD is internal memory/search support only. Direct source Markdown, source HTML, tests, code, and Kanban handoffs remain controlling.
- QMD search does not authorize public/client-facing use, legal/privacy signoff, workflow activation/enrollment, outreach, send, CRM/HighLevel/Supabase/Clio mutation, DDL, sync, backfill, or any live action.
- QMD can miss exact punctuation-heavy, slash-form, or underscore filename probes even after indexing; normalized task-ID/title/phrase probes are more reliable.

## Verdict

QMD retrieval for the 2026-05-20 00:30 watchdog action handoff chain is refreshed. The action brief, command deck implementation note, command deck review, and deliverable-index rows are retrievable by task IDs, normalized titles, distinctive phrases, blocker terms with targeted probes, direct `qmd get`, and this self-indexed refresh report/index row.
