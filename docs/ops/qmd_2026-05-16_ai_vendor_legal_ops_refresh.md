# QMD Refresh — AI Vendor Legal-Ops Packet Handoffs (2026-05-16)

Task: t_801b6cf0
Parent review task: t_0401ddbb
Related visual artifact task: t_cf412ca2
Run timestamp: 2026-05-16 23:45:25 MDT
Workspace: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages`

## Scope and guardrails

This was a local QMD indexing/searchability refresh only. QMD is internal memory/search support for private Whiteford/Schell IP decision prep; it is not source-current proof, legal approval, public-use approval, live-action authorization, or a substitute for direct file/Kanban handoffs.

No public/source-provider tests, HighLevel/Supabase/CRM/Clio/SQLite mutation, sends, workflow action, social/LinkedIn action, ads, publishing, or client/prospect-facing changes were performed.

Collection-scope caveat: the `whiteford-ai-law-pages` QMD collection indexes Markdown only (`**/*.md`). The HTML visual-direction board is retrievable indirectly through its Markdown implementation note, review, digest, and deliverable-index rows, not as a first-class HTML document.

## Initial QMD status

Command:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd status
```

Result summary:

- Index: `/Users/jeff/.cache/qmd/index.sqlite`
- Size: 50.1 MB
- Total documents: 402 files indexed
- Vectors: 9019 embedded
- `whiteford-ai-law-pages`: 396 Markdown files, updated 56m before this run
- QMD emitted the existing node-llama-cpp Metal compile warning during status, but the command exited 0.

## Initial smoke-search results before refresh

Command shape:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd search "<query>" -c whiteford-ai-law-pages -n 5 --files
```

| Query | Before-refresh result |
| --- | --- |
| `t_cf412ca2` | No hits |
| `t_0401ddbb` | No hits |
| `t_801b6cf0` | No hits |
| `2026-05-16-ai-vendor-legal-ops-content-packet` | Hit `qmd://whiteford-ai-law-pages/docs/ai-authority-packets/2026-05-16-ai-vendor-legal-ops-content-packet.md`; also hit `docs/digests/2026-05-16-daily-digest.md` |
| `docs/ai-authority-packets/2026-05-16-ai-vendor-legal-ops-visual-direction-note.md` | No hits |
| `docs/reviews/2026-05-16_ai_vendor_legal_ops_packet_review.md` | No hits |

Conclusion: current Markdown references for the new handoff/review/index rows were missing or only partially retrievable, so a refresh was required.

## Refresh commands

Commands run:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd update
PATH="/opt/homebrew/bin:$PATH" qmd embed --max-docs-per-batch 50 --max-batch-mb 10
```

Result summary:

- `qmd update` indexed 2 new Markdown files, 1 updated Markdown file, 395 unchanged, and 0 removed in `whiteford-ai-law-pages`.
- `business-development-books` had 0 new/updated and 6 unchanged.
- Cleanup removed 1 orphaned content hash.
- Bounded embed added vectors for 3 unique hashes and embedded 114 chunks from 3 documents in 3 seconds.
- QMD emitted the existing node-llama-cpp Metal compile warning during embed/status, but the command exited 0.

## Post-refresh QMD status

Command:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd status
```

Result summary:

- Index: `/Users/jeff/.cache/qmd/index.sqlite`
- Size: 50.2 MB
- Total documents: 404 files indexed
- Vectors: 9133 embedded
- `whiteford-ai-law-pages`: 398 Markdown files, updated 2m before the post-refresh status check
- `business-development-books`: 6 Markdown files, unchanged

## Post-refresh smoke-search results

Command shape:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd search "<query>" -c whiteford-ai-law-pages -n 5 --files
```

| Query | After-refresh result |
| --- | --- |
| `t_cf412ca2` | Hit `qmd://whiteford-ai-law-pages/docs/ai-authority-packets/2026-05-16-ai-vendor-legal-ops-visual-direction-note.md`; hit `qmd://whiteford-ai-law-pages/docs/reviews/2026-05-16-ai-vendor-legal-ops-packet-review.md`; hit `qmd://whiteford-ai-law-pages/docs/kanban-deliverable-index.md` |
| `t_0401ddbb` | Hit `qmd://whiteford-ai-law-pages/docs/reviews/2026-05-16-ai-vendor-legal-ops-packet-review.md`; hit `qmd://whiteford-ai-law-pages/docs/kanban-deliverable-index.md` |
| `t_801b6cf0` | No hits before this report/index row was written; expected because this report and deliverable-index row did not yet exist in QMD at that point |
| `2026-05-16-ai-vendor-legal-ops-content-packet` | Hit visual note, source content packet, review, and 2026-05-16 daily digest |
| `docs/ai-authority-packets/2026-05-16-ai-vendor-legal-ops-visual-direction-note.md` | No hits with the full literal path query |
| `docs/reviews/2026-05-16_ai_vendor_legal_ops_packet_review.md` | No hits with the full literal path query |

Additional tokenized smoke searches:

| Query | Result |
| --- | --- |
| `2026-05-16-ai-vendor-legal-ops-visual-direction-note` | Hit `qmd://whiteford-ai-law-pages/docs/ai-authority-packets/2026-05-16-ai-vendor-legal-ops-visual-direction-note.md` and the review |
| `2026 05 16 ai vendor legal ops packet review` | Hit visual note, review, source content packet, digest, and an unrelated same-day Crusoe draft |
| `AI vendor legal-ops authority packet visual artifact` | Hit review, source content packet, digest, and deliverable index |

## Path-normalization caveat

QMD search output normalizes some file/path tokens in returned URIs, including uppercase-to-lowercase and underscore-to-hyphen display behavior. For example, the on-disk review path is:

`/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/reviews/2026-05-16_ai_vendor_legal_ops_packet_review.md`

The corresponding QMD result displays as:

`qmd://whiteford-ai-law-pages/docs/reviews/2026-05-16-ai-vendor-legal-ops-packet-review.md`

This matches prior QMD refresh handoffs in this repo. Direct on-disk files and Kanban handoffs remain controlling when exact paths matter.

## Self-indexing pass after writing this report/index row

After this report and the `t_801b6cf0` deliverable-index row were written, I ran a second bounded refresh:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd update
PATH="/opt/homebrew/bin:$PATH" qmd embed --max-docs-per-batch 50 --max-batch-mb 10
```

Result summary:

- Indexed 1 new Markdown file, 1 updated Markdown file, and 397 unchanged in `whiteford-ai-law-pages`.
- Embedded 112 chunks from 2 documents in 3 seconds.
- Checkpoint status after the self-indexing pass: 405 total documents indexed, 9245 vectors embedded, `whiteford-ai-law-pages` at 399 Markdown files.
- Final self-check search for `t_801b6cf0` returned this report and the deliverable index.
- A later report-only wording patch was re-indexed with the same bounded commands; the controlling verification remains that `t_801b6cf0` retrieves this report and the deliverable index.

## Outcome

QMD was refreshed and now retrieves Markdown references for the AI vendor legal-ops source packet, visual-direction note, review handoff, deliverable-index rows for `t_cf412ca2`/`t_0401ddbb`, and this `t_801b6cf0` QMD refresh report/index row through task-ID and tokenized title queries. The HTML board remains indirectly discoverable through Markdown references because the collection indexes `**/*.md` only.
