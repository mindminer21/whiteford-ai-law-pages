# QMD refresh — Shield AI LinkedIn review and May 24 daily digest

Task: `t_62ec7b38`
Tenant: `whiteford-mountain-west`
Run timestamp: 2026-05-24 22:33:57 MDT
Scope: internal local QMD indexing/searchability only.

## Guardrail

QMD is internal memory/search support only. This refresh does not authorize, perform, or imply any live/public/client/prospect-facing action, including LinkedIn/social posting, email/SMS/DM outreach, HighLevel/CRM/Supabase/Clio mutation, workflow activation/enrollment, tags, fields, ads, DDL, sync, or backfill.

## Source files refreshed

- `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/KANBAN_DELIVERABLE_INDEX.md`
- `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/digests/2026-05-24_daily_digest.md`
- `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/growth-os/linkedin-awareness-drafts/2026-05-24/2026-05-24-shield-ai-linkedin-awareness-review_t_6b278dcb.md`
- `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/growth-os/linkedin-awareness-drafts/2026-05-24/2026-05-24-shield-ai-linkedin-awareness-draft.md`

## Commands run

Known-good prefix was used for every QMD command:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd status
PATH="/opt/homebrew/bin:$PATH" qmd search "Review LinkedIn awareness draft Shield AI 2026-05-24 t_6b278dcb" -c whiteford-ai-law-pages -n 5 --line-numbers
PATH="/opt/homebrew/bin:$PATH" qmd search "Daily digest 2026-05-24 Shield AI Rhoda AI Kodiak AI" -c whiteford-ai-law-pages -n 5 --line-numbers
PATH="/opt/homebrew/bin:$PATH" qmd search "2026-05-24-shield-ai-linkedin-awareness-review t_6b278dcb" -c whiteford-ai-law-pages -n 5 --line-numbers
PATH="/opt/homebrew/bin:$PATH" qmd update
PATH="/opt/homebrew/bin:$PATH" qmd embed --max-docs-per-batch 50 --max-batch-mb 10
```

## Before status

- Index: `/Users/jeff/.cache/qmd/index.sqlite`
- Size: 92.9 MB
- Total documents: 575 files indexed
- Vectors: 20057 embedded
- Global updated: 17h ago
- `whiteford-ai-law-pages`: 569 files, updated 17h ago
- `business-development-books`: 6 files, updated 18d ago
- Note: `qmd status` printed a `node-llama-cpp` Metal source compile warning, but exited 0 and returned status data.

## Before smoke searches

1. `Review LinkedIn awareness draft Shield AI 2026-05-24 t_6b278dcb`
   - Result: MISS (`No results found.`)
2. `Daily digest 2026-05-24 Shield AI Rhoda AI Kodiak AI`
   - Result: partial HIT only on older `qmd://whiteford-ai-law-pages/docs/kanban-deliverable-index.md:2023`, pointing to an older digest-review row rather than the new top-of-index daily digest row.
3. `2026-05-24-shield-ai-linkedin-awareness-review t_6b278dcb`
   - Result: MISS (`No results found.`)

## Refresh result

`qmd update` then bounded `qmd embed` completed successfully:

- `whiteford-ai-law-pages`: 4 new, 1 updated, 568 unchanged, 0 removed
- Cleaned up 1 orphaned content hash
- `business-development-books`: 0 new, 0 updated, 6 unchanged, 0 removed
- Embed result: 202 chunks from 5 documents in 5s

## After status

- Index: `/Users/jeff/.cache/qmd/index.sqlite`
- Size: 93.0 MB
- Total documents: 579 files indexed
- Vectors: 20259 embedded
- Global updated: 14h ago
- `whiteford-ai-law-pages`: 573 files, updated 14h ago
- `business-development-books`: 6 files, updated 18d ago
- Note: the human-visible relative age in `qmd status` still displayed `14h ago` after update, but document counts and vector counts increased and the new smoke searches returned current hits.

## After smoke searches

1. `Review LinkedIn awareness draft Shield AI 2026-05-24 t_6b278dcb`
   - HIT: `qmd://whiteford-ai-law-pages/docs/growth-os/linkedin-awareness-drafts/2026-05-24/2026-05-24-shield-ai-linkedin-awareness-review-t-6b278dcb.md:7`
   - HIT: `qmd://whiteford-ai-law-pages/docs/growth-os/linkedin-awareness-drafts/2026-05-24/2026-05-24-shield-ai-linkedin-awareness-draft.md:1`
   - HIT: `qmd://whiteford-ai-law-pages/docs/kanban-deliverable-index.md:11`
2. `Daily digest 2026-05-24 Shield AI Rhoda AI Kodiak AI`
   - HIT: `qmd://whiteford-ai-law-pages/docs/digests/2026-05-24-daily-digest.md:1`
   - HIT: `qmd://whiteford-ai-law-pages/docs/kanban-deliverable-index.md:8`
3. `2026-05-24-shield-ai-linkedin-awareness-review t_6b278dcb`
   - HIT: `qmd://whiteford-ai-law-pages/docs/growth-os/linkedin-awareness-drafts/2026-05-24/2026-05-24-shield-ai-linkedin-awareness-review-t-6b278dcb.md:3`
   - HIT: `qmd://whiteford-ai-law-pages/docs/kanban-deliverable-index.md:13`

## QMD URI normalization caveat

QMD displays normalized URI path segments with some underscores rendered as hyphens, e.g. the source file `2026-05-24-shield-ai-linkedin-awareness-review_t_6b278dcb.md` appears in search output as `2026-05-24-shield-ai-linkedin-awareness-review-t-6b278dcb.md`, and `2026-05-24_daily_digest.md` appears as `2026-05-24-daily-digest.md`. Treat direct filesystem paths and Kanban handoffs as controlling for exact filenames; use QMD URIs as search handles.

## Final self-index pass

After this report was written and `docs/KANBAN_DELIVERABLE_INDEX.md` was updated, a final self-index pass was run:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd update
PATH="/opt/homebrew/bin:$PATH" qmd embed --max-docs-per-batch 50 --max-batch-mb 10
PATH="/opt/homebrew/bin:$PATH" qmd search "t_62ec7b38 Shield AI LinkedIn review daily digest QMD refresh" -c whiteford-ai-law-pages -n 8 --line-numbers
PATH="/opt/homebrew/bin:$PATH" qmd search "QMD refresh Shield AI LinkedIn review and May 24 daily digest" -c whiteford-ai-law-pages -n 8 --line-numbers
PATH="/opt/homebrew/bin:$PATH" qmd status
```

Final update/embed result:

- `whiteford-ai-law-pages`: 1 new, 1 updated, 572 unchanged, 0 removed
- Embed result: 186 chunks from 2 documents in 4s
- Final status: 580 total documents, 20445 vectors, `whiteford-ai-law-pages` 574 files, updated 18s ago at verification time

Final verification:

- `t_62ec7b38 Shield AI LinkedIn review daily digest QMD refresh` returned this report as the top hit and the updated deliverable-index row as another hit.
- `QMD refresh Shield AI LinkedIn review and May 24 daily digest` returned this report as the top hit, plus the May 24 digest and updated deliverable-index row.

## Outcome

The newest Shield AI LinkedIn review, reviewed draft, May 24 daily digest, top deliverable-index rows, and this QMD refresh report are retrievable in QMD after the refresh. QMD remains internal memory/search only; direct Markdown files and Kanban handoffs remain controlling.
