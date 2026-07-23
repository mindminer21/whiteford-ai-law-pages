# QMD refresh — 2026-05-13 OGC client portal Phase 0 handoffs

Task: t_7948fe87
Collection: `whiteford-ai-law-pages`
Workspace: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages`

## Purpose

Refresh and verify local QMD retrieval for the 2026-05-13 OGC client portal PRD, offer draft, Phase 0 mock implementation note, launch-gate review report, and related deliverable-index rows.

QMD is internal memory/search support only. It is not public-source proof, attorney/firm approval, source-current evidence, conflicts clearance, consent, legal advice, live-action authorization, or permission for CRM/HighLevel/Supabase/SQLite/Clio mutation, workflow action, sends, posts, publishing, prospecting, ads, or client/prospect-facing use.

## Commands run

```bash
PATH="/opt/homebrew/bin:$PATH" qmd status
PATH="/opt/homebrew/bin:$PATH" qmd search "<query>" -c whiteford-ai-law-pages -n 5 --files
PATH="/opt/homebrew/bin:$PATH" qmd update
PATH="/opt/homebrew/bin:$PATH" qmd embed --max-docs-per-batch 50 --max-batch-mb 10
PATH="/opt/homebrew/bin:$PATH" qmd status
PATH="/opt/homebrew/bin:$PATH" qmd ls whiteford-ai-law-pages/docs/client-portal
PATH="/opt/homebrew/bin:$PATH" qmd ls whiteford-ai-law-pages/docs/reviews
```

## Before status

Initial `qmd status`:

- Index: `/Users/jeff/.cache/qmd/index.sqlite`
- Size: 37.0 MB
- Total documents: 310 indexed files
- Vectors: 5,615 embedded
- Updated: 4h ago
- `whiteford-ai-law-pages`: 304 Markdown files, updated 4h ago
- `business-development-books`: 6 Markdown files, updated 7d ago
- AST chunking active for TypeScript/TSX/JavaScript/Python/Go/Rust
- QMD printed a non-fatal `[node-llama-cpp] ggml_metal_library_init_from_source: error compiling source` warning while still returning status.

## Initial smoke-search outcomes

All initial `qmd search ... --files` smoke searches returned no results, so the collection was stale for the new handoff Markdown:

| Query | Initial result |
| --- | --- |
| `client portal lawyer chat documents scheduling` | MISS |
| `Whiteford Tech Company OGC Client Portal` | MISS |
| `Phase 0 mock OGC client portal implementation note` | MISS |
| `t_04d0c3ac` | MISS |
| `t_86be9c8a` | MISS |
| `2026-05-13_phase_0_mock_ogc_client_portal_implementation_note.md` | MISS |
| `2026-05-13_client_portal_phase0_review.md` | MISS |
| `Phase 0 OGC client portal launch-gate review` | MISS |

Local filesystem grep confirmed the Markdown handoffs existed before refresh, including:

- `docs/prds/2026-05-13_client_portal_lawyer_chat_documents_scheduling_prd.md`
- `docs/client-portal/2026-05-13_phase_0_mock_ogc_client_portal_implementation_note.md`
- `docs/reviews/2026-05-13_client_portal_phase0_review.md`
- `docs/KANBAN_DELIVERABLE_INDEX.md` rows for `t_04d0c3ac`, `t_86be9c8a`, the PRD, and the OGC/AI Compliance Package offer draft.

## Refresh/update results

`qmd update` completed successfully:

- `whiteford-ai-law-pages`: 4 new, 1 updated, 303 unchanged, 0 removed
- Cleaned up 1 orphaned content hash
- `business-development-books`: 0 new, 0 updated, 6 unchanged, 0 removed
- QMD reported that 5 unique hashes needed vectors.

`qmd embed --max-docs-per-batch 50 --max-batch-mb 10` completed successfully:

- Embedded 108 chunks from 5 documents in 3s
- QMD printed a non-fatal `[node-llama-cpp] ggml_metal_library_init_from_source: error compiling source` warning, but embedding completed.

## After status

Post-refresh `qmd status`:

- Index: `/Users/jeff/.cache/qmd/index.sqlite`
- Size: 37.2 MB
- Total documents: 314 indexed files
- Vectors: 5,723 embedded
- Updated: 1m ago
- `whiteford-ai-law-pages`: 308 Markdown files, updated 1m ago
- `business-development-books`: 6 Markdown files, updated 7d ago
- AST chunking active for TypeScript/TSX/JavaScript/Python/Go/Rust

## Post-refresh smoke-search outcomes

| Query | Post-refresh result |
| --- | --- |
| `client portal lawyer chat documents scheduling` | HIT: `qmd://whiteford-ai-law-pages/docs/prds/2026-05-13-client-portal-lawyer-chat-documents-scheduling-prd.md` (0.94), `qmd://whiteford-ai-law-pages/docs/reviews/2026-05-13-client-portal-phase0-review.md` (0.94), `qmd://whiteford-ai-law-pages/docs/kanban-deliverable-index.md` (0.90) |
| `Whiteford Tech Company OGC Client Portal` | HIT: `qmd://whiteford-ai-law-pages/docs/client-portal/2026-05-13-phase-0-mock-ogc-client-portal-implementation-note.md` (0.91), PRD (0.91), review (0.91), deliverable index (0.89) |
| `Phase 0 mock OGC client portal implementation note` | HIT: implementation note (0.96), review (0.96), PRD (0.95), deliverable index (0.93) |
| `t_04d0c3ac` | HIT: implementation note (0.88), review (0.86), deliverable index (0.59) |
| `t_86be9c8a` | HIT: review (0.87), deliverable index (0.60) |
| `2026-05-13_phase_0_mock_ogc_client_portal_implementation_note.md` | MISS by exact underscore filename search |
| `2026-05-13_client_portal_phase0_review.md` | MISS by exact underscore filename search |
| `Phase 0 OGC client portal launch-gate review` | HIT: review (0.94), deliverable index (0.93) |

## Filename retrieval caveat

The two exact underscore filename searches still missed via `qmd search --files`, but `qmd ls` confirmed both files are indexed under QMD's normalized URI-style path display with hyphens:

- `qmd://whiteford-ai-law-pages/docs/client-portal/2026-05-13-phase-0-mock-ogc-client-portal-implementation-note.md`
- `qmd://whiteford-ai-law-pages/docs/reviews/2026-05-13-client-portal-phase0-review.md`

Use phrase/task-ID searches or `qmd ls`/`qmd get` for these handoffs rather than relying on exact underscore filename BM25 search.

## Markdown-only collection caveat

The `whiteford-ai-law-pages` QMD collection is configured as `**/*.md`. It indexes Markdown handoffs and references to HTML/local app artifacts, but it does not directly index `.html`, route-rendered Next.js pages, screenshots, uploads, or live app state. Any HTML artifact, local route, browser UI, uploaded document, calendar flow, CRM object, HighLevel object, Supabase row, Clio/DMS item, email/social/workflow, or client/prospect-facing artifact mentioned in Markdown must be verified through its own source system before use.

## Outcome

QMD was refreshed and now retrieves the new OGC client portal Phase 0 handoffs by title/phrase/task-ID queries. Exact underscore filename BM25 searches remain unreliable due to QMD's normalized URI display, but indexed file presence was verified with `qmd ls`.
