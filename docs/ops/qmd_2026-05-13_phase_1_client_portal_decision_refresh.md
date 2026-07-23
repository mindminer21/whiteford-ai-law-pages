# QMD refresh — 2026-05-13 Phase 1 OGC client portal decision handoffs

Task: t_7bab5375
Collection: `whiteford-ai-law-pages`
Workspace: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages`

## Purpose

Refresh and verify local QMD retrieval for the Phase 1 OGC client portal approval matrix, private/local decision deck implementation note, deck launch-gate review, and related deliverable-index rows.

QMD is internal memory/search support only. It is not public-source proof, attorney/firm approval, source-current evidence, conflicts clearance, consent, legal advice, live-action authorization, or permission for CRM/HighLevel/Supabase/SQLite/Clio mutation, workflow action, sends, posts, publishing, prospecting, ads, or client/prospect-facing use.

## Commands run

```bash
PATH="/opt/homebrew/bin:$PATH" qmd status
PATH="/opt/homebrew/bin:$PATH" qmd search "<query>" -c whiteford-ai-law-pages
PATH="/opt/homebrew/bin:$PATH" qmd update
PATH="/opt/homebrew/bin:$PATH" qmd embed --max-docs-per-batch 50 --max-batch-mb 10
PATH="/opt/homebrew/bin:$PATH" qmd status
PATH="/opt/homebrew/bin:$PATH" qmd ls whiteford-ai-law-pages | grep '2026-05-13.*phase.*client.*portal'
```

## Before status

Initial `qmd status`:

- Index: `/Users/jeff/.cache/qmd/index.sqlite`
- Size: 37.2 MB
- Total documents: 314 indexed files
- Vectors: 5,723 embedded
- Updated: 18m ago
- `whiteford-ai-law-pages`: 308 Markdown files, updated 18m ago
- `business-development-books`: 6 Markdown files, updated 7d ago
- AST chunking active for TypeScript/TSX/JavaScript/Python/Go/Rust
- QMD printed a non-fatal `[node-llama-cpp] ggml_metal_library_init_from_source: error compiling source` warning while still returning status.

## Initial smoke-search outcomes

Initial searches showed the collection was stale for the newly completed Phase 1 Markdown handoffs:

| Query | Initial result |
| --- | --- |
| `Phase 1 OGC client portal approval matrix` | PARTIAL HIT: deliverable-index row only; no direct approval-matrix Markdown result before refresh. |
| `t_40557aa3` | MISS |
| `t_b395b770` | MISS |
| `t_bae907ef` | MISS |
| `client portal decision deck` | PARTIAL/STALE HIT: deliverable-index and unrelated older material; no direct Phase 1 decision deck implementation note or review before refresh. |
| `2026-05-13_phase_1_client_portal_decision_deck_review.md` | MISS |

Local filesystem search confirmed the Markdown handoffs existed before refresh, including:

- `docs/client-portal/2026-05-13_phase_1_client_portal_approval_matrix.md`
- `docs/private-decks/2026-05-13_phase_1_client_portal_decision_deck_implementation_note.md`
- `docs/reviews/2026-05-13_phase_1_client_portal_decision_deck_review.md`
- `docs/KANBAN_DELIVERABLE_INDEX.md` rows for `t_40557aa3`, `t_b395b770`, and `t_bae907ef`

## Refresh/update results

`qmd update` completed successfully:

- `whiteford-ai-law-pages`: 4 new, 1 updated, 307 unchanged, 0 removed
- Cleaned up 1 orphaned content hash
- `business-development-books`: 0 new, 0 updated, 6 unchanged, 0 removed
- QMD reported that 5 unique hashes needed vectors.

`qmd embed --max-docs-per-batch 50 --max-batch-mb 10` completed successfully:

- Embedded 90 chunks from 5 documents in 2s
- QMD printed a non-fatal `[node-llama-cpp] ggml_metal_library_init_from_source: error compiling source` warning, but embedding completed.

## After status

Post-refresh `qmd status`:

- Index: `/Users/jeff/.cache/qmd/index.sqlite`
- Size: 37.4 MB
- Total documents: 318 indexed files
- Vectors: 5,813 embedded
- Updated: 2m ago
- `whiteford-ai-law-pages`: 312 Markdown files, updated 2m ago
- `business-development-books`: 6 Markdown files, updated 7d ago
- AST chunking active for TypeScript/TSX/JavaScript/Python/Go/Rust
- QMD printed the same non-fatal `[node-llama-cpp] ggml_metal_library_init_from_source: error compiling source` warning while still returning status.

## Post-refresh smoke-search outcomes

| Query | Post-refresh result |
| --- | --- |
| `Phase 1 OGC client portal approval matrix` | HIT: `qmd://whiteford-ai-law-pages/docs/client-portal/2026-05-13-phase-1-client-portal-approval-matrix.md` (0.94), implementation note (0.94), review (0.94), deliverable index (0.93). |
| `t_40557aa3` | HIT: review (0.86), approval matrix (0.84), deliverable index (0.58). |
| `t_b395b770` | HIT: implementation note (0.87), review (0.86), deliverable index (0.58). |
| `t_bae907ef` | HIT: review (0.87), deliverable index (0.60). |
| `client portal decision deck` | HIT: implementation note (0.92), review (0.92), deliverable index (0.91), approval matrix (0.91), plus older authority-content material (0.87). |
| `2026-05-13_phase_1_client_portal_decision_deck_review.md` | MISS by exact underscore filename search. |
| `docs/reviews/2026-05-13_phase_1_client_portal_decision_deck_review.md` | MISS by exact underscore filename path search. |
| `2026-05-13 phase 1 client portal decision deck review` | HIT: implementation note (0.95), review (0.95), approval matrix (0.95), deliverable index (0.95). |

`qmd ls whiteford-ai-law-pages | grep '2026-05-13.*phase.*client.*portal'` confirmed indexed normalized URIs for the new Phase 1 Markdown handoffs:

- `qmd://whiteford-ai-law-pages/docs/client-portal/2026-05-13-phase-1-client-portal-approval-matrix.md`
- `qmd://whiteford-ai-law-pages/docs/private-decks/2026-05-13-phase-1-client-portal-decision-deck-implementation-note.md`
- `qmd://whiteford-ai-law-pages/docs/reviews/2026-05-13-phase-1-client-portal-decision-deck-review.md`

## Filename retrieval caveat

The exact underscore filename/path searches still missed via `qmd search`, but `qmd ls` confirmed the review file is indexed under QMD's normalized URI-style path display with hyphens:

- Source filename: `docs/reviews/2026-05-13_phase_1_client_portal_decision_deck_review.md`
- QMD URI display: `qmd://whiteford-ai-law-pages/docs/reviews/2026-05-13-phase-1-client-portal-decision-deck-review.md`

Use title/phrase/task-ID searches or `qmd ls`/`qmd get` for these handoffs rather than relying on exact underscore filename BM25 search.

## Markdown-only / HTML-indirect caveat

The `whiteford-ai-law-pages` QMD collection is configured as `**/*.md`. It indexes Markdown handoffs and references to HTML/local app artifacts, but it does not directly index `.html`, route-rendered Next.js pages, screenshots, uploads, or live app state. The Phase 1 decision deck HTML is therefore reachable only indirectly through Markdown references in the implementation note, review, and deliverable index. Any HTML artifact, local route, browser UI, uploaded document, calendar flow, CRM object, HighLevel object, Supabase row, Clio/DMS item, email/social/workflow, or client/prospect-facing artifact mentioned in Markdown must be verified through its own source system before use.

## Outcome

QMD was refreshed and now retrieves the Phase 1 OGC client portal decision handoffs by title/phrase/task-ID queries. Exact underscore filename BM25 searches remain unreliable due to QMD's normalized URI display, but indexed file presence was verified with `qmd ls`.
