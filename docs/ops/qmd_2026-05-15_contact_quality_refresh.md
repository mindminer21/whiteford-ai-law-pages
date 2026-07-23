# QMD refresh — contact-quality packet handoffs — 2026-05-15

Task: `t_78ae7ecc`  
Parent packet task: `t_4d1fc236`  
Parent review task: `t_79f27933`  
Collection: `whiteford-ai-law-pages`  
Completed: 2026-05-15 04:44:32 MDT  
Status: INTERNAL / PRIVATE / QMD MEMORY-SEARCH SUPPORT ONLY

## Scope and guardrails

This report refreshes and verifies local QMD retrieval for the contact-quality read-only diagnostic packet and its review handoff. It does not authorize or perform live source browsing, source-provider testing, contact enrichment, SQLite/Supabase/HighLevel/CRM/Clio mutation, dashboard mutation, workflow activation/enrollment, outreach, email/SMS, LinkedIn/social/public/ad action, legal approval, launch approval, or client/prospect-facing use.

QMD is internal memory/search support only. Direct Markdown files, evidence JSON, Kanban handoffs, and separate exact Jeff/Whiteford approvals remain controlling.

## Inputs verified locally

- Packet: `docs/growth-os/data-hygiene/2026-05-15_contact_quality_readonly_diagnostic_packet.md`
- Review: `docs/reviews/2026-05-15_contact_quality_readonly_packet_review.md`
- Deliverable index: `docs/KANBAN_DELIVERABLE_INDEX.md`

## Before status

Command:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd status
```

Observed before refresh:

- Index: `/Users/jeff/.cache/qmd/index.sqlite`
- Size: 49.5 MB
- Documents total: 385 files indexed
- Vectors: 8494 embedded
- Updated: 57m ago
- `whiteford-ai-law-pages`: 379 Markdown files
- `business-development-books`: 6 Markdown files
- Caveat observed: `[node-llama-cpp] ggml_metal_library_init_from_source: error compiling source` appeared in status output, but the command exited successfully.

## Before smoke searches

Command shape:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd search "<query>" -c whiteford-ai-law-pages
```

Initial retrieval results:

| Query | Before result |
| --- | --- |
| `t_4d1fc236` | No results found. |
| `t_79f27933` | No results found. |
| `Contact-quality read-only diagnostic packet 2026-05-15` | Missed the current packet/review; returned older duplicate/lifecycle and related data-hygiene artifacts. |
| `Review contact-quality read-only diagnostic packet 2026-05-15` | Missed the current review; returned older duplicate/lifecycle and related data-hygiene artifacts. |
| `2026 05 15 contact quality readonly diagnostic packet` | Missed the current contact-quality packet; returned AION lifecycle artifacts and older digest/index hits. |
| `2026 05 15 contact quality readonly packet review` | Missed the current contact-quality review; returned AION lifecycle artifacts and older digest hits. |
| `contact quality readonly diagnostic packet evidence` | Missed the current packet/review; returned AION lifecycle and older digest/index hits. |

Conclusion: current Markdown handoffs were missing from QMD retrieval before refresh.

## Refresh performed

Commands:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd update
PATH="/opt/homebrew/bin:$PATH" qmd embed --max-docs-per-batch 50 --max-batch-mb 10
```

Observed refresh output:

- `whiteford-ai-law-pages`: indexed 2 new Markdown files, 1 updated Markdown file, 378 unchanged, 0 removed.
- Cleaned up 1 orphaned content hash.
- `business-development-books`: 0 new, 0 updated, 6 unchanged, 0 removed.
- Embed step: embedded 122 chunks from 3 documents in 3 seconds.
- Caveat observed again: `[node-llama-cpp] ggml_metal_library_init_from_source: error compiling source` appeared, but embedding completed successfully.

## After status

Observed after refresh:

- Index: `/Users/jeff/.cache/qmd/index.sqlite`
- Size: 49.7 MB
- Documents total: 387 files indexed
- Vectors: 8616 embedded
- Updated: 2m ago at verification time
- `whiteford-ai-law-pages`: 381 Markdown files
- `business-development-books`: 6 Markdown files

## After smoke searches

After refresh, the required task IDs, titles, and normalized filename-token queries retrieved the expected current Markdown artifacts.

| Query | After result |
| --- | --- |
| `t_4d1fc236` | Retrieved `qmd://whiteford-ai-law-pages/docs/reviews/2026-05-15-contact-quality-readonly-packet-review.md`, `qmd://whiteford-ai-law-pages/docs/growth-os/data-hygiene/2026-05-15-contact-quality-readonly-diagnostic-packet.md`, and the deliverable-index row. |
| `t_79f27933` | Retrieved `qmd://whiteford-ai-law-pages/docs/reviews/2026-05-15-contact-quality-readonly-packet-review.md` and the deliverable-index row. |
| `Contact-quality read-only diagnostic packet 2026-05-15` | Retrieved the current review and current packet as top results. |
| `Review contact-quality read-only diagnostic packet 2026-05-15` | Retrieved the current review and current packet as top results. |
| `2026 05 15 contact quality readonly diagnostic packet` | Retrieved the current review and current packet as top results. |
| `2026 05 15 contact quality readonly packet review` | Retrieved the current review and current packet as top results. |
| `contact quality readonly diagnostic packet evidence` | Retrieved the current review and current packet as top results. |

Direct retrieval also worked for the normalized QMD URIs:

```text
qmd://whiteford-ai-law-pages/docs/growth-os/data-hygiene/2026-05-15-contact-quality-readonly-diagnostic-packet.md
qmd://whiteford-ai-law-pages/docs/reviews/2026-05-15-contact-quality-readonly-packet-review.md
```

## QMD caveats for future users

1. QMD normalizes underscores in Markdown paths to hyphens in QMD URIs. The source file `2026-05-15_contact_quality_readonly_diagnostic_packet.md` is retrieved as `2026-05-15-contact-quality-readonly-diagnostic-packet.md`.
2. The `whiteford-ai-law-pages` collection indexes `**/*.md`; evidence JSON and HTML are not direct QMD documents unless referenced from Markdown.
3. Search relevance can return related AION/Sereact/duplicate-lifecycle artifacts because those packets also discuss contact quality, data hygiene, HOLD posture, and source-currentness. Use task-ID queries or direct normalized QMD URIs for exact retrieval.
4. QMD retrieval is not source-current proof, consent/suppression/conflicts/Clio clearance, attorney approval, launch approval, mutation authorization, or external-action permission.

## Final verification

Final verification passed for internal QMD memory/search support:

- The parent packet and review are indexed in `whiteford-ai-law-pages`.
- Required task-ID searches retrieve current handoff artifacts.
- Required title and normalized filename-token searches retrieve current handoff artifacts.
- Direct normalized QMD URI retrieval works for both current Markdown files.
- This report and the updated deliverable-index row were self-indexed by a final `qmd update` plus bounded `qmd embed`; `t_78ae7ecc contact quality qmd refresh` retrieves this report and the index row.
