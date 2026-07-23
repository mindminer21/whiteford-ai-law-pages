# QMD refresh — May 23 local DB reconciliation

Task: `t_b931ed33`
Parent reviewer task: `t_b61f76ab`
Reviewed reconciliation task: `t_d9b5c7ee`
Refreshed at: 2026-05-24T04:51:20Z
Tenant: `whiteford-mountain-west`

This was internal/private QMD search maintenance only. QMD is internal memory and retrieval support, not public-source proof and not an authorization gate. No public/client-facing publishing, HighLevel/CRM/Supabase/Clio mutation, workflow activation/enrollment, email/SMS/DM, LinkedIn/social/ad action, DDL, sync, backfill, prospect contact, tagging, field action, or external/live action was performed or authorized.

## Artifacts covered

- Reconciliation report: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/growth-os/data-hygiene/2026-05-23_may23_local_db_reconciliation_t_d9b5c7ee.md`
- Review report: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/reviews/2026-05-24_t_b61f76ab_review_t_d9b5c7ee_may23_local_db_reconciliation.md`
- Deliverable index: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/KANBAN_DELIVERABLE_INDEX.md`
- This QMD report: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/qmd-refresh/2026-05-24_t_b931ed33_may23_local_db_reconciliation_qmd_refresh.md`

## Initial QMD status and smoke searches

Command run from the repository root:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd status
```

Initial status:

- Index: `/Users/jeff/.cache/qmd/index.sqlite`
- Size: 85.6 MB
- Total documents: 550 files indexed
- Vectors: 17,789 embedded
- `whiteford-ai-law-pages`: 544 Markdown files, updated 14 minutes earlier
- `business-development-books`: 6 Markdown files, updated 18 days earlier
- AST chunking: active
- Device reported: Apple M5 Max / Metal offload
- Nonblocking CLI message observed: `[node-llama-cpp] ggml_metal_library_init_from_source: error compiling source`; QMD status/search/update/embed still exited successfully.

Initial targeted smoke searches:

| Query | Initial result |
| --- | --- |
| `t_d9b5c7ee` | No results found. |
| `t_b61f76ab` | No results found. |
| `May 23 local DB reconciliation` | Hits included the prior watchdog QMD refresh, May 23 daily digest, and deliverable index row. |
| `AKASA Deepwatch Tim Gill LinkedIn` | Hits included the nightly review, patched digest, re-review, daily digest, and correction report. |

Because the two task-ID searches did not initially return the newly relevant reconciliation/review artifacts, an update and bounded embed were needed.

## Refresh commands run

```bash
PATH="/opt/homebrew/bin:$PATH" qmd update
PATH="/opt/homebrew/bin:$PATH" qmd embed --max-docs-per-batch 50 --max-batch-mb 10
```

Refresh result:

- `qmd update`: 2 new, 1 updated, 543 unchanged, 0 removed in `whiteford-ai-law-pages`; 0 new/updated in `business-development-books`; 1 orphaned content hash cleaned up.
- `qmd embed --max-docs-per-batch 50 --max-batch-mb 10`: embedded 182 chunks from 3 documents in 4 seconds.
- The same nonblocking node-llama-cpp Metal source compile message appeared, while embed completed successfully with exit code 0.

## Post-refresh status and smoke searches

Post-refresh status:

- Total documents: 552 files indexed
- Vectors: 17,971 embedded
- `whiteford-ai-law-pages`: 546 Markdown files, updated 1 minute earlier
- `business-development-books`: 6 Markdown files, unchanged

Post-refresh targeted smoke searches:

| Query | Post-refresh result |
| --- | --- |
| `t_d9b5c7ee` | PASS — top hits now include the reconciliation report, review report, and deliverable index row. |
| `t_b61f76ab` | PASS — top hits now include the review report and deliverable index row. |
| `May 23 local DB reconciliation` | PASS — top hits now include the review report, reconciliation report, prior watchdog QMD refresh, daily digest, and deliverable index row. |
| `AKASA Deepwatch Tim Gill LinkedIn` | PASS — top hits now include the review report, nightly review, reconciliation report, patched digest, and re-review. |

Representative QMD URIs returned after refresh:

- `qmd://whiteford-ai-law-pages/docs/growth-os/data-hygiene/2026-05-23-may23-local-db-reconciliation-t-d9b5c7ee.md`
- `qmd://whiteford-ai-law-pages/docs/reviews/2026-05-24-t-b61f76ab-review-t-d9b5c7ee-may23-local-db-reconciliation.md`
- `qmd://whiteford-ai-law-pages/docs/kanban-deliverable-index.md`
- `qmd://whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-23/nightly-qwen-prospect-digest-review-t-b86e59af.md`
- `qmd://whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-23/digest.md`
- `qmd://whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-23/nightly-qwen-prospect-digest-re-review-t-417dd89d.md`

## Notes and caveats

- The QMD refresh confirms internal searchability for the reconciliation and review handoff chain; it does not convert any local/internal evidence into public/current-source proof.
- Direct Markdown reports and Kanban parent handoffs remain controlling where QMD snippets conflict or omit context.
- All external/live actions remain blocked without separate exact Jeff approval and required attorney/conflicts/suppression/source-current/privacy/channel/final-copy gates.
