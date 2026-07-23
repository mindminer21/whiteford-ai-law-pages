# QMD refresh — 2026-05-13 Enveda final-copy handoffs

Task: t_1f92ef83
Collection: `whiteford-ai-law-pages`
Workspace: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages`

## Purpose

Refresh and verify local QMD retrieval for the Enveda final no-tag LinkedIn awareness packet and its internal review handoff after reviewer task `t_e6c983f0` completed.

QMD is internal memory/search support only. It is not source-current public evidence, legal approval, attorney/firm approval, consent, conflicts clearance, suppression clearance, prior-touch clearance, legal advice, live-action authorization, or permission for LinkedIn posting/tagging/commenting/messaging, email/SMS sends, ads, CRM/HighLevel/Supabase/SQLite/Clio mutation, workflow enrollment, opportunity movement, public-page publishing, prospecting, or any client/prospect-facing use.

## Files verified on disk before refresh

- Final-copy packet: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/growth-os/linkedin-awareness-drafts/2026-05-13/2026-05-13-enveda-linkedin-awareness-final-copy-no-tag.md`
- Review packet: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/growth-os/linkedin-awareness-drafts/2026-05-13/2026-05-13-enveda-final-copy-no-tag-review.md`
- Deliverable index: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/KANBAN_DELIVERABLE_INDEX.md`

The final-copy packet title is `Enveda Final No-Tag LinkedIn Awareness Copy Packet — Attorney Review Only` and records task `t_0dcc39ea`. The review packet title is `Review — Enveda Final No-Tag LinkedIn Awareness Copy Packet` and records task `t_e6c983f0`.

## Commands run

```bash
qmd status
cd "$(npm root -g)/@tobilu/qmd" && npm rebuild better-sqlite3
qmd status
qmd search "<query>" -c whiteford-ai-law-pages -n 5 --files
qmd update
qmd embed --max-docs-per-batch 50 --max-batch-mb 10
qmd status
qmd ls whiteford-ai-law-pages | grep -i 'enveda'
```

## Initial qmd status and repair

Bare `qmd status` initially failed with a Node ABI mismatch:

- QMD executable: `/Users/jeff/.local/bin/qmd`
- Node at failure time: `v25.9.0`
- Error: `better_sqlite3.node` was compiled for `NODE_MODULE_VERSION 137`, while the active Node required `NODE_MODULE_VERSION 141`.

The documented fallback `PATH="/opt/homebrew/bin:$PATH" qmd status` did not fix this run because `/opt/homebrew/bin/node` was also `v25.9.0` and required the same ABI. I repaired the local QMD install by rebuilding inside `$(npm root -g)/@tobilu/qmd`:

```text
rebuilt dependencies successfully
```

After the rebuild, `qmd status` succeeded.

## Before status after ABI repair, before collection refresh

Post-rebuild/pre-refresh `qmd status`:

- Index: `/Users/jeff/.cache/qmd/index.sqlite`
- Size: 37.4 MB
- Total documents: 318 indexed files
- Vectors: 5,813 embedded
- Updated: 15h ago
- `whiteford-ai-law-pages`: 312 Markdown files, updated 15h ago
- `business-development-books`: 6 Markdown files, updated 7d ago
- AST chunking active for TypeScript/TSX/JavaScript/Python/Go/Rust
- QMD printed a non-fatal `[node-llama-cpp] ggml_metal_library_init_from_source: error compiling source` warning while still returning status.

## Initial smoke-search outcomes

Initial searches showed the collection was stale for the newly completed Enveda final-copy/review Markdown handoffs:

| Query | Initial result |
| --- | --- |
| `t_0dcc39ea` | MISS |
| `t_e6c983f0` | MISS |
| `Enveda Final No-Tag LinkedIn Awareness Copy Packet Attorney Review Only` | MISS |
| `Review Enveda Final No-Tag LinkedIn Awareness Copy Packet` | MISS |

## Refresh/update results

`qmd update` completed successfully:

- `whiteford-ai-law-pages`: 9 new, 2 updated, 310 unchanged, 0 removed
- Cleaned up 2 orphaned content hashes
- `business-development-books`: 0 new, 0 updated, 6 unchanged, 0 removed
- QMD reported that 11 unique hashes needed vectors.

`qmd embed --max-docs-per-batch 50 --max-batch-mb 10` completed successfully:

- Embedded 132 chunks from 11 documents in 3s
- QMD printed a non-fatal `[node-llama-cpp] ggml_metal_library_init_from_source: error compiling source` warning, but embedding completed.

## After status

Post-refresh `qmd status`:

- Index: `/Users/jeff/.cache/qmd/index.sqlite`
- Size: 37.8 MB
- Total documents: 327 indexed files
- Vectors: 5,945 embedded
- Updated: 2m ago
- `whiteford-ai-law-pages`: 321 Markdown files, updated 2m ago
- `business-development-books`: 6 Markdown files, updated 7d ago
- AST chunking active for TypeScript/TSX/JavaScript/Python/Go/Rust
- QMD printed the same non-fatal `[node-llama-cpp] ggml_metal_library_init_from_source: error compiling source` warning while still returning status.

## Post-refresh smoke-search outcomes

| Query | Post-refresh result |
| --- | --- |
| `t_0dcc39ea` | HIT: final-copy packet `qmd://whiteford-ai-law-pages/docs/growth-os/linkedin-awareness-drafts/2026-05-13/2026-05-13-enveda-linkedin-awareness-final-copy-no-tag.md` (0.85), plus deliverable index (0.58). |
| `t_e6c983f0` | HIT: review packet `qmd://whiteford-ai-law-pages/docs/growth-os/linkedin-awareness-drafts/2026-05-13/2026-05-13-enveda-final-copy-no-tag-review.md` (0.87), plus deliverable index (0.58). |
| `Enveda Final No-Tag LinkedIn Awareness Copy Packet Attorney Review Only` | HIT: review packet (0.92), final-copy packet (0.92), prior Enveda review (0.92), daily digest (0.91), deliverable index (0.90). |
| `Review Enveda Final No-Tag LinkedIn Awareness Copy Packet` | HIT: review packet (0.92), final-copy packet (0.92), prior Enveda review (0.92), daily digest (0.91), deliverable index (0.90). |

`qmd ls whiteford-ai-law-pages | grep -i 'enveda'` confirmed indexed URIs for the Enveda Markdown handoffs:

- `qmd://whiteford-ai-law-pages/docs/growth-os/linkedin-awareness-drafts/2026-05-13/2026-05-13-enveda-final-copy-no-tag-review.md`
- `qmd://whiteford-ai-law-pages/docs/growth-os/linkedin-awareness-drafts/2026-05-13/2026-05-13-enveda-linkedin-awareness-draft.md`
- `qmd://whiteford-ai-law-pages/docs/growth-os/linkedin-awareness-drafts/2026-05-13/2026-05-13-enveda-linkedin-awareness-final-copy-no-tag.md`
- `qmd://whiteford-ai-law-pages/docs/growth-os/linkedin-awareness-drafts/2026-05-13/2026-05-13-enveda-linkedin-awareness-review-t-aba09dc2.md`

## Self-index status

This refresh report was created after the first `qmd update`/`qmd embed` pass, so it required a second local self-index pass before QMD could retrieve it. After writing this report and updating the deliverable index, I ran another bounded update/embed:

- Second `qmd update`: 1 new, 1 updated, 320 unchanged, 0 removed; cleaned up 1 orphaned content hash.
- Second `qmd embed --max-docs-per-batch 50 --max-batch-mb 10`: embedded 82 chunks from 2 documents in 2s.
- Final status: 328 indexed files, 6,027 embedded vectors, `whiteford-ai-law-pages` 322 Markdown files, updated 15s before the final status check.

Self-retrieval verified:

- `qmd search 'QMD refresh 2026 05 13 Enveda final copy handoffs' -c whiteford-ai-law-pages -n 5 --files` returned the normalized report URI `qmd://whiteford-ai-law-pages/docs/ops/qmd-2026-05-13-enveda-final-copy-refresh.md` (0.94) and the deliverable index (0.92).
- `qmd search 'Refresh QMD for Enveda final-copy handoffs t_1f92ef83' -c whiteford-ai-law-pages -n 5 --files` returned the normalized report URI (0.96) and the deliverable index (0.93).
- `qmd get qmd://whiteford-ai-law-pages/docs/ops/qmd-2026-05-13-enveda-final-copy-refresh.md -l 20` returned this report.

Caveat: exact underscore filename search for `qmd_2026-05-13_enveda_final_copy_refresh t_1f92ef83` returned no file in `qmd search --files`, while title/phrase searches and `qmd get` using QMD's normalized hyphenated URI succeeded.

## Collection-scope caveats

The `whiteford-ai-law-pages` QMD collection is configured as `**/*.md`. It indexes Markdown handoffs and references to app routes or external systems, but it does not directly index route-rendered Next.js pages, screenshots, uploads, CRM/HighLevel objects, Supabase/SQLite/Clio rows, calendars, emails, social posts, ads, or live/public source state. Any artifact, source, route, object, person, company, workflow, prospect, or public/client-facing action mentioned in Markdown must be verified in its own source system before use.

## Outcome

QMD was repaired, refreshed, embedded, and verified for the Enveda final no-tag packet, review packet, task IDs `t_0dcc39ea` and `t_e6c983f0`, and title-style queries. The collection is usable as internal memory/search support for this Enveda handoff set only; it does not approve posting, outreach, tagging, workflows, CRM/HighLevel/Supabase/SQLite/Clio mutation, source-current claims, legal conclusions, or any public/client/prospect-facing action.
