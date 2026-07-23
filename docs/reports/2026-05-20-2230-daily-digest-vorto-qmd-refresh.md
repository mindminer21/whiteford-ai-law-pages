# QMD Refresh Report — 2026-05-20 22:30 Daily Digest and Vorto Review

Task: `t_889f75aa`
Prepared: 2026-05-20 22:34 MDT
Scope: internal QMD/search maintenance only.

No email, SMS, DM, LinkedIn/social action, public publishing, ad, workflow activation/enrollment, tag, CRM/HighLevel/Supabase/Clio mutation, Supabase DDL/sync/backfill, or client/prospect-facing action was performed or authorized.

## Source handoffs targeted

- Daily digest: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/digests/2026-05-20_daily_digest.md`
- Vorto review: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/growth-os/linkedin-awareness-drafts/2026-05-20/2026-05-20-vorto-linkedin-awareness-review_t_707506cb.md`

Both source files existed locally before the refresh.

## Before status and smoke searches

Command group run from repo root with `PATH="/opt/homebrew/bin:$PATH"` at 2026-05-20 22:34:16 MDT.

### Before `qmd status`

- Index: `/Users/jeff/.cache/qmd/index.sqlite`
- Size: 69.9 MB
- Documents: 491 files indexed
- Vectors: 13,982 embedded
- Overall updated: 20h ago
- `whiteford-ai-law-pages`: 485 Markdown files, updated 20h ago
- `business-development-books`: 6 Markdown files, updated 14d ago
- QMD printed the known local warning: `[node-llama-cpp] ggml_metal_library_init_from_source: error compiling source`; status/search still returned successfully.

### Before searches

- `qmd search '2026-05-20_daily_digest' --collection whiteford-ai-law-pages --limit 5 --json` returned `[]`.
- `qmd search 'Vorto LinkedIn awareness review t_707506cb' --collection whiteford-ai-law-pages --limit 5 --json` returned `[]`.

## Refresh commands run

From `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages`:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd update
PATH="/opt/homebrew/bin:$PATH" qmd embed --max-docs-per-batch 50 --max-batch-mb 10
```

Result:

- `qmd update` updated 2 collections.
- `whiteford-ai-law-pages`: 4 new, 1 updated, 484 unchanged, 0 removed; cleaned up 1 orphaned content hash.
- `business-development-books`: 0 new, 0 updated, 6 unchanged, 0 removed.
- `qmd embed --max-docs-per-batch 50 --max-batch-mb 10` embedded 167 chunks from 5 documents in 4s.

## After-refresh status

After the first update/embed:

- Index size: 70.0 MB
- Documents: 495 files indexed
- Vectors: 14,149 embedded
- `whiteford-ai-law-pages`: 489 Markdown files
- `business-development-books`: 6 Markdown files
- QMD still printed the same local Metal compile warning during status, but commands completed successfully.

## After-refresh smoke searches

### Required same-day digest query

Query: `2026-05-20_daily_digest`

Result: `[]`.

Interpretation: QMD appears to normalize Markdown document paths by replacing underscores with hyphens in the indexed URI/title surface, and exact underscore filename search did not retrieve the document even after it was indexed. Direct `qmd get` against QMD's normalized URI succeeded; see direct-get checks below.

### Required Vorto task/title query

Query: `Vorto LinkedIn awareness review t_707506cb`

Top results included:

1. `qmd://whiteford-ai-law-pages/docs/growth-os/linkedin-awareness-drafts/2026-05-20/2026-05-20-vorto-linkedin-awareness-review-t-707506cb.md`
   - Title: `Review — Vorto LinkedIn Awareness Draft — 2026-05-20`
   - Snippet included `Kanban task: t_707506cb — internal review task for this Vorto LinkedIn awareness packet.`
2. `qmd://whiteford-ai-law-pages/docs/growth-os/linkedin-awareness-drafts/2026-05-20/2026-05-20-vorto-linkedin-awareness-draft.md`
   - Title: `LinkedIn Awareness Draft — Vorto — 2026-05-20`
   - Snippet included task `t_707506cb`.
3. `qmd://whiteford-ai-law-pages/docs/kanban-deliverable-index.md`
   - Snippet included the deliverable path for the Vorto review.

### Required digest distinctive-title/content query

Query: `Daily HighLevel Growth OS optimization digest May 20 Firecrawl`

Results included:

- `qmd://whiteford-ai-law-pages/docs/digests/2026-05-20-daily-digest.md`
  - Title: `Daily HighLevel / Growth OS Optimization Digest - 2026-05-20`
  - Snippet from the digest header/status.
- `qmd://whiteford-ai-law-pages/docs/kanban-deliverable-index.md`
  - Snippet included the 2026-05-20 daily digest deliverable and Firecrawl summary.

Note: the May 19 digest tied/preceded the May 20 digest for this broad semantic query, so Jeff/agents should inspect the returned title/path rather than assuming rank 1 is the current-day digest.

### Direct path / distinctive-title checks

Queries for the full absolute source paths returned `[]`:

- `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/digests/2026-05-20_daily_digest.md`
- `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/growth-os/linkedin-awareness-drafts/2026-05-20/2026-05-20-vorto-linkedin-awareness-review_t_707506cb.md`

Queries for QMD-normalized paths also returned `[]`:

- `docs/digests/2026-05-20-daily-digest.md`
- `qmd://whiteford-ai-law-pages/docs/digests/2026-05-20-daily-digest.md`
- `docs/growth-os/linkedin-awareness-drafts/2026-05-20/2026-05-20-vorto-linkedin-awareness-review-t-707506cb.md`
- `qmd://whiteford-ai-law-pages/docs/growth-os/linkedin-awareness-drafts/2026-05-20/2026-05-20-vorto-linkedin-awareness-review-t-707506cb.md`

Distinctive title/content searches succeeded:

- `Review — Vorto LinkedIn Awareness Draft — 2026-05-20` returned the Vorto review as rank 1, the Vorto draft as rank 2, the 2026-05-20 daily digest as rank 3, and the deliverable index as rank 4.
- `Daily HighLevel Growth OS optimization digest May 20 Firecrawl` returned the 2026-05-20 daily digest and deliverable index in the result set.

Direct `qmd get` checks succeeded:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd get qmd://whiteford-ai-law-pages/docs/digests/2026-05-20-daily-digest.md
PATH="/opt/homebrew/bin:$PATH" qmd get qmd://whiteford-ai-law-pages/docs/growth-os/linkedin-awareness-drafts/2026-05-20/2026-05-20-vorto-linkedin-awareness-review-t-707506cb.md
```

The digest `qmd get` output began with `# Daily HighLevel / Growth OS Optimization Digest - 2026-05-20`.

The Vorto review `qmd get` output began with `# Review — Vorto LinkedIn Awareness Draft — 2026-05-20` and `Task: t_707506cb`.

## Caveats

- The requested Markdown handoffs are now indexed and retrievable by distinctive title/content and via direct `qmd get` normalized URIs.
- Exact underscore filename and absolute-path `qmd search` queries still returned empty results. This appears to be a QMD search/path-tokenization behavior rather than a missing-index condition because normalized `qmd get` works and title/content search finds the documents.
- QMD reports normalized URIs such as `2026-05-20-daily-digest.md` and `2026-05-20-vorto-linkedin-awareness-review-t-707506cb.md` for local files whose filesystem names include underscores.
- Direct files and Kanban handoffs remain controlling. QMD is internal memory/search support only.

## Finalization note

This report and `docs/KANBAN_DELIVERABLE_INDEX.md` were written after the first update/embed. Per task instructions, a final `qmd update` plus bounded `qmd embed` must be run after these edits, followed by final smoke checks. The final run/check results are recorded below.

## Final update/embed and final smoke checks

After this report and `docs/KANBAN_DELIVERABLE_INDEX.md` were written, I ran the required final pass:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd update
PATH="/opt/homebrew/bin:$PATH" qmd embed --max-docs-per-batch 50 --max-batch-mb 10
```

Final update/embed result:

- `whiteford-ai-law-pages`: 1 new, 1 updated, 488 unchanged, 0 removed; cleaned up 1 orphaned content hash.
- `business-development-books`: 0 new, 0 updated, 6 unchanged, 0 removed.
- Final embed: 150 chunks from 2 documents in 4s.

Final status:

- Index size: 70.2 MB
- Documents: 496 files indexed
- Vectors: 14,299 embedded
- Overall updated: 15s ago at check time
- `whiteford-ai-law-pages`: 490 Markdown files, updated 15s ago at check time
- `business-development-books`: 6 Markdown files, updated 14d ago
- The same local Metal compile warning appeared, but status/search/get commands completed successfully.

Final smoke checks:

- `2026-05-20_daily_digest` still returned `[]`; this preserves the caveat that exact underscore filename search is not a reliable QMD search shape.
- `Vorto LinkedIn awareness review t_707506cb` returned the new report, the Vorto review, the Vorto draft, and the deliverable index.
- `Daily HighLevel Growth OS optimization digest May 20 Firecrawl` returned the new report, the 2026-05-20 daily digest, and the deliverable index among the result set.
- `Review — Vorto LinkedIn Awareness Draft — 2026-05-20` returned the new report, the Vorto review, the Vorto draft, the 2026-05-20 daily digest, and the deliverable index.
- `t_889f75aa Refresh QMD daily digest Vorto` returned this report and the deliverable index.
- `2026-05-20-2230-daily-digest-vorto-qmd-refresh` returned this report and the deliverable index.
- `qmd get qmd://whiteford-ai-law-pages/docs/reports/2026-05-20-2230-daily-digest-vorto-qmd-refresh.md` succeeded and returned this report header.

Final conclusion: QMD is refreshed and self-indexed for the daily digest, Vorto review, this report, and the deliverable-index handoff. Use distinctive title/content/task-ID searches or normalized `qmd get` URIs rather than exact underscore filename searches.
