# QMD Refresh — AI Vendor Legal-Ops Derivative Handoffs (2026-05-17)

Task: t_502ac6e5
Parent review task: t_2bbe1106
Related tasks: t_5c50f682, t_e770e73e, t_9558d99a
Run timestamp: 2026-05-17 00:53:27 MDT
Workspace: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages`

## Scope and guardrails

This was a local QMD indexing/searchability refresh only. QMD is internal memory/search support for private Whiteford/Schell IP decision prep; it is not source-current proof, legal approval, public-use approval, live-action authorization, or a substitute for direct file/Kanban handoffs.

No email/SMS/DM sends, workflow activation/enrollment, HighLevel/CRM/Clio/Supabase mutation, LinkedIn/social posting/commenting/tagging/messaging, ads, public publishing/deploy, or client/prospect-facing use was performed.

Collection-scope caveat: the `whiteford-ai-law-pages` QMD collection indexes Markdown only (`**/*.md`). The private/local HTML prototype is not a first-class indexed document and is retrievable only indirectly through its Markdown implementation note, review, and deliverable-index rows.

## Initial QMD status

Command:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd status
```

Result summary:

- Index: `/Users/jeff/.cache/qmd/index.sqlite`
- Size: 53.0 MB
- Total documents: 405 files indexed
- Vectors: 9255 embedded
- `whiteford-ai-law-pages`: 399 Markdown files, updated 1h before this run
- `business-development-books`: 6 Markdown files, updated 11d before this run
- QMD emitted the existing node-llama-cpp Metal compile warning during status, but the command exited 0.

## Initial smoke-search results before refresh

Command shape:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd search "<query>" -c whiteford-ai-law-pages -n 5 --files
```

| Query | Before-refresh result |
| --- | --- |
| `t_5c50f682` | No hits |
| `t_e770e73e` | No hits |
| `t_9558d99a` | No hits |
| `t_2bbe1106` | No hits |
| `t_502ac6e5` | No hits |
| `AI vendor legal-ops diagnostic derivative` | Hit older 2026-05-16 review/visual-note rows and the deliverable index, but missed the new 2026-05-17 derivative/review/source-currentness Markdown docs |
| `source-currentness gate` | Returned mostly unrelated stale/zero-score rows and missed the new 2026-05-17 source-currentness gate row |

Conclusion: current Markdown references for the 2026-05-17 source-currentness gate, derivative, prototype note, review, and deliverable-index rows were missing or only partially retrievable, so a refresh was required.

## Refresh commands

Commands run:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd update
PATH="/opt/homebrew/bin:$PATH" qmd embed --max-docs-per-batch 50 --max-batch-mb 10
PATH="/opt/homebrew/bin:$PATH" qmd status
```

Result summary:

- `qmd update` indexed 4 new Markdown files, 1 updated Markdown file, 398 unchanged, and 0 removed in `whiteford-ai-law-pages`.
- `business-development-books` had 0 new/updated and 6 unchanged.
- Cleanup removed 1 orphaned content hash.
- Bounded embed added vectors for 5 unique hashes and embedded 139 chunks from 5 documents in 3 seconds.
- QMD emitted the existing node-llama-cpp Metal compile warning during embed/status, but the commands exited 0.

## Post-refresh QMD status

Result summary:

- Index: `/Users/jeff/.cache/qmd/index.sqlite`
- Size: 53.5 MB
- Total documents: 409 files indexed
- Vectors: 9394 embedded
- `whiteford-ai-law-pages`: 403 Markdown files, updated 2m before the post-refresh status check
- `business-development-books`: 6 Markdown files, unchanged

## Post-refresh smoke-search results

Command shape:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd search "<query>" -c whiteford-ai-law-pages -n 5 --files
```

| Query | After-refresh result |
| --- | --- |
| `t_5c50f682` | Hit `qmd://whiteford-ai-law-pages/docs/reviews/2026-05-17-ai-vendor-legal-ops-derivative-review.md`, `qmd://whiteford-ai-law-pages/docs/ai-authority-packets/2026-05-17-ai-vendor-legal-ops-source-currentness-gate.md`, `qmd://whiteford-ai-law-pages/docs/ai-authority-packets/2026-05-17-ai-vendor-legal-ops-diagnostic-derivative.md`, and `qmd://whiteford-ai-law-pages/docs/kanban-deliverable-index.md` |
| `t_e770e73e` | Hit prototype implementation note, review, derivative packet, and deliverable index |
| `t_9558d99a` | Hit prototype implementation note, review, and deliverable index |
| `t_2bbe1106` | Hit derivative review and deliverable index |
| `t_502ac6e5` | No hits before this report/index row was written; expected because this report and the deliverable-index row did not yet exist in QMD at that point |
| `AI vendor legal-ops diagnostic derivative` | Hit the 2026-05-17 review, derivative packet, source-currentness gate, prototype implementation note, and older 2026-05-16 review |
| `source-currentness gate` | Hit the new 2026-05-17 source-currentness gate and derivative review, but also returned older zero-score rows; tokenized AI-vendor-specific searches remain more precise |

## HTML/direct-indexing limitation check

Direct HTML filename query:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd search "2026-05-17-ai-vendor-legal-ops-diagnostic-prototype.html" -c whiteford-ai-law-pages -n 8 --files
```

Result: no direct QMD hit for the `.html` artifact, consistent with the collection pattern `**/*.md`.

Indirect retrieval checks:

| Query | Result |
| --- | --- |
| `ai vendor legal ops diagnostic prototype html` | Hit prototype implementation note, derivative review, and deliverable index |
| `private AI Vendor Intake Snapshot diagnostic prototype` | Hit derivative review, prototype implementation note, and deliverable index |

Conclusion: the private/local HTML prototype is discoverable through Markdown references only. Direct on-disk files and Kanban handoffs remain controlling for exact HTML path access.

## Path-normalization caveat

QMD search output normalizes some file/path tokens in returned URIs, including uppercase-to-lowercase and underscore-to-hyphen display behavior. For example, the on-disk review path is:

`/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/reviews/2026-05-17_ai_vendor_legal_ops_derivative_review.md`

The corresponding QMD result displays as:

`qmd://whiteford-ai-law-pages/docs/reviews/2026-05-17-ai-vendor-legal-ops-derivative-review.md`

This matches prior QMD refresh handoffs in this repo. Direct on-disk files and Kanban handoffs remain controlling when exact paths matter.

## Self-indexing pass after writing this report/index row

After this report and the `t_502ac6e5` deliverable-index row were written, I ran a second bounded refresh:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd update
PATH="/opt/homebrew/bin:$PATH" qmd embed --max-docs-per-batch 50 --max-batch-mb 10
PATH="/opt/homebrew/bin:$PATH" qmd status
```

Result summary:

- Indexed 1 new Markdown file, 1 updated Markdown file, and 402 unchanged in `whiteford-ai-law-pages`.
- Embedded 115 chunks from 2 documents in 3 seconds.
- Checkpoint status after the self-indexing pass: 410 total documents indexed, 9509 vectors embedded, `whiteford-ai-law-pages` at 404 Markdown files.
- Final self-check search for `t_502ac6e5` returned this report and the deliverable index.
- Final self-check search for `Refresh QMD for AI vendor legal-ops derivative handoffs` returned this report and the deliverable index.
- Literal underscore filename search for `qmd_2026-05-17_ai_vendor_legal_ops_derivative_refresh` returned no hits; tokenized title and task-ID searches are reliable, consistent with the path-normalization caveat above.

Because this final section was patched after the first self-indexing pass, I ran one additional bounded `qmd update`/`qmd embed` after patching it so the final report text itself is indexed.

## Outcome

QMD now retrieves Markdown references for the 2026-05-17 AI vendor legal-ops source-currentness gate, derivative packet, prototype implementation note, review handoff, deliverable-index rows for `t_5c50f682`/`t_e770e73e`/`t_9558d99a`/`t_2bbe1106`, and this `t_502ac6e5` QMD refresh report/index row. The HTML prototype remains indirectly discoverable through Markdown references because the collection indexes `**/*.md` only.
