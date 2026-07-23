# QMD Refresh — AI Vendor Intake Snapshot worksheet/opt-in QA handoffs (2026-05-17)

Task: t_3f964420
Parent review tasks: t_fcb5bd71, t_14de3129
Related tasks: t_c7da6557, t_45b95165, t_bb4b9b41
Run timestamp: 2026-05-17 02:56 MDT
Workspace: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages`

## Scope and guardrails

This was a local QMD indexing/searchability refresh only. QMD is internal memory/search support for private Whiteford/Schell IP decision prep; it is not source-current proof, legal approval, public-use approval, launch approval, live-action authorization, or a substitute for direct file/Kanban handoffs.

No public page/route change, form publication, email/SMS/DM send, HighLevel/CRM/Clio/Supabase mutation, workflow activation/enrollment, LinkedIn/social/ad/webinar action, contact tagging, tracking, public deployment, client/prospect-facing use, or legal advice was performed.

Collection-scope caveat: the `whiteford-ai-law-pages` QMD collection indexes Markdown only (`**/*.md`). The private/local HTML prototype is not a first-class indexed document and is retrievable only indirectly through its Markdown QA note, reviews, copy-alignment note, and deliverable-index rows.

## Initial QMD status

Command:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd status
```

Result summary:

- Index: `/Users/jeff/.cache/qmd/index.sqlite`
- Size: 53.9 MB
- Total documents: 420 files indexed
- Vectors: 9677 embedded
- `whiteford-ai-law-pages`: 414 Markdown files, updated 9m before this run
- `business-development-books`: 6 Markdown files, updated 11d before this run
- QMD emitted the existing node-llama-cpp Metal compile warning during status, but the command exited 0.

## Initial smoke-search results before refresh

Command shape:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd search "<query>" -c whiteford-ai-law-pages -n 5 --files
```

| Query | Before-refresh result |
| --- | --- |
| `t_c7da6557` | Hit the opt-in QA note, worksheet/thank-you asset, and deliverable index. |
| `t_45b95165` | Hit the opt-in QA note and deliverable index. |
| `t_fcb5bd71` | Hit the worksheet/opt-in QA review and deliverable index. |
| `AI Vendor Intake Snapshot: A 15-Minute Non-Confidential Checklist for Technology Company Leaders` | Hit the 2026-05-17 AI vendor legal-ops derivative and the worksheet/thank-you asset. |
| `AI Vendor Intake Snapshot opt-in QA prototype` | Hit the opt-in QA note, worksheet/opt-in QA review, prior derivative review, worksheet/thank-you asset, and deliverable index. |

Conclusion: the core worksheet/prototype/review Markdown artifacts were already partially retrievable before this run, but the final copy-alignment re-review and current deliverable-index state still needed a bounded refresh and self-indexing pass.

## Refresh commands

Commands run:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd update
PATH="/opt/homebrew/bin:$PATH" qmd embed --max-docs-per-batch 50 --max-batch-mb 10
PATH="/opt/homebrew/bin:$PATH" qmd status
```

Result summary:

- `qmd update` indexed 2 new Markdown files, 2 updated Markdown files, 412 unchanged, and 0 removed in `whiteford-ai-law-pages`.
- `business-development-books` had 0 new/updated and 6 unchanged.
- Cleanup removed 2 orphaned content hashes.
- Bounded embed added vectors for 4 unique hashes and embedded 123 chunks from 4 documents in 3 seconds.
- QMD emitted the existing node-llama-cpp Metal compile warning during embed/status, but the commands exited 0.

## Post-refresh QMD status

Result summary:

- Index: `/Users/jeff/.cache/qmd/index.sqlite`
- Size: 54.1 MB
- Total documents: 422 files indexed
- Vectors: 9800 embedded
- `whiteford-ai-law-pages`: 416 Markdown files, updated 1m before the post-refresh status check
- `business-development-books`: 6 Markdown files, unchanged

## Post-refresh smoke-search results

Command shape:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd search "<query>" -c whiteford-ai-law-pages -n 6 --files
```

| Query | After-refresh result |
| --- | --- |
| `t_c7da6557` | Hit the opt-in QA note, worksheet/thank-you asset, and deliverable index. |
| `t_45b95165` | Hit the opt-in QA note and deliverable index. |
| `t_fcb5bd71` | Hit the copy-alignment note, prototype alignment re-review, worksheet/opt-in QA review, and deliverable index. |
| `t_14de3129` | Hit the prototype warning alignment re-review and deliverable index. |
| `AI Vendor Intake Snapshot: A 15-Minute Non-Confidential Checklist for Technology Company Leaders` | Hit the prior AI vendor legal-ops derivative and the worksheet/thank-you asset. |
| `AI Vendor Intake Snapshot opt-in QA prototype` | Hit the opt-in QA note, prototype alignment re-review, worksheet/opt-in QA review, prior derivative review, worksheet/thank-you asset, and deliverable index. |
| `AI Vendor Intake Snapshot prototype warning alignment re-review` | Hit the re-review and deliverable index. |

## HTML/direct-indexing limitation check

Direct HTML filename query:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd search "2026-05-17-ai-vendor-intake-snapshot-optin-qa-prototype.html" -c whiteford-ai-law-pages -n 6 --files
```

Result: no direct QMD hit for the `.html` artifact, consistent with the collection pattern `**/*.md`.

Indirect retrieval checks confirm the prototype is discoverable through Markdown references:

- `AI Vendor Intake Snapshot opt-in QA prototype` returns the QA note, re-review, prior review, worksheet/thank-you asset, and deliverable index.
- `t_45b95165` returns the QA note and deliverable index.
- `t_fcb5bd71` and `t_14de3129` return the review/re-review chain and deliverable index.

Conclusion: the private/local HTML prototype is discoverable through Markdown references only. Direct on-disk files and Kanban handoffs remain controlling for exact HTML path access.

## Path-normalization caveat

QMD search output normalizes some file/path tokens in returned URIs, including uppercase-to-lowercase and underscore-to-hyphen display behavior. For example, the on-disk worksheet path is:

`/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/ai-authority-packets/2026-05-17_ai_vendor_intake_snapshot_worksheet_thank_you_asset.md`

The corresponding QMD result displays as:

`qmd://whiteford-ai-law-pages/docs/ai-authority-packets/2026-05-17-ai-vendor-intake-snapshot-worksheet-thank-you-asset.md`

This matches prior QMD refresh handoffs in this repo. Direct on-disk files and Kanban handoffs remain controlling when exact paths matter.

## Self-indexing pass after writing this report/index row

After this report and the `t_3f964420` deliverable-index row were written, I ran a second bounded refresh:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd update
PATH="/opt/homebrew/bin:$PATH" qmd embed --max-docs-per-batch 50 --max-batch-mb 10
PATH="/opt/homebrew/bin:$PATH" qmd status
```

Result summary:

- Indexed 1 new Markdown file, 1 updated Markdown file, and 415 unchanged in `whiteford-ai-law-pages`.
- Embedded 120 chunks from 2 documents in 3 seconds.
- Checkpoint status after the self-indexing pass: 423 total documents indexed, 9920 vectors embedded, `whiteford-ai-law-pages` at 417 Markdown files.
- Final self-check search for `t_3f964420` returned this report and the deliverable index.
- Final self-check search for `QMD Refresh AI Vendor Intake Snapshot worksheet opt-in QA handoffs` returned this report and the deliverable index.
- Literal underscore filename search for `qmd_2026-05-17_ai_vendor_intake_snapshot_worksheet_qa_refresh` returned no hits; tokenized title and task-ID searches are reliable, consistent with the path-normalization caveat above.

Because this final section was patched after the first self-indexing pass, I ran one additional bounded `qmd update`/`qmd embed` after patching it so the final report text itself is indexed.

## Outcome

QMD now retrieves Markdown references for the 2026-05-17 AI Vendor Intake Snapshot worksheet/thank-you asset, opt-in QA note, copy-alignment note, PASS-with-constraints worksheet QA review, PASS-with-constraints prototype alignment re-review, and deliverable-index rows for `t_c7da6557`, `t_45b95165`, `t_fcb5bd71`, and `t_14de3129`. The HTML prototype remains indirectly discoverable through Markdown references because the collection indexes `**/*.md` only.
