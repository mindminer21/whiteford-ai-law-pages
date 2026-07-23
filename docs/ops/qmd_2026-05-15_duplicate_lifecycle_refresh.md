# QMD refresh — duplicate/lifecycle handoffs — 2026-05-15

Task: `t_6dbd1948`  
Tenant: `whiteford-mountain-west`  
Scope: local/private QMD retrieval verification only.

## Boundary

QMD is internal memory/search support only. This refresh is not live public-source proof, consent proof, attorney review, CRM readiness, outreach clearance, approval to mutate local SQLite/Supabase/HighLevel/CRM/Clio data, workflow activation, enrichment, source restoration/testing, public/social/ad action, or client/prospect-facing authorization.

No SQLite business data, Supabase, HighLevel, CRM, Clio, workflows, public pages, social/LinkedIn, email/SMS, ads, source providers, prospect/contact records, live dashboard data, enrichment, or prospect expansion were written.

## Prerequisite handoff

Parent `t_35fc3ee1` was complete before this task ran and produced:

`docs/reviews/2026-05-15_duplicate_lifecycle_data_hygiene_followup_review.md`

The parent review reports PASS for private/internal Jeff/Whiteford decision prep only and keeps all downstream mutation/external-action lanes separately gated.

## Before status

Command:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd status
```

Observed before refresh:

```text
QMD Status

Index: /Users/jeff/.cache/qmd/index.sqlite
Size:  45.2 MB

Documents
  Total:    361 files indexed
  Vectors:  7349 embedded
  Updated:  45m ago

Collections
  whiteford-ai-law-pages (qmd://whiteford-ai-law-pages/)
    Pattern:  **/*.md
    Files:    355 (updated 45m ago)
  business-development-books (qmd://business-development-books/)
    Pattern:  **/*.md
    Files:    6 (updated 9d ago)

[node-llama-cpp] ggml_metal_library_init_from_source: error compiling source
Device: Apple M5 Max, GPU metal offloading yes
```

The QMD status command exited successfully, but printed the existing node-llama-cpp Metal compile warning shown above.

## Initial smoke search before refresh

Command shape:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd search "<query>" -c whiteford-ai-law-pages -n 5 --files
```

Initial result summary:

| Query | Before-refresh result |
| --- | --- |
| `t_e370191d` | Miss |
| `No-mutation duplicate canonicalization review packet` | Returned older 2026-05-11 duplicate/lifecycle artifacts, not the 2026-05-15 packet |
| `t_3a3c3fa8` | Miss |
| `Agent Targeting lifecycle reconciliation worksheet` | Returned older 2026-05-11 lifecycle plan and adjacent artifacts, not the 2026-05-15 worksheet |
| `t_14304df2` | Miss |
| `Dormant duplicate/lifecycle future-approval packet` | Miss |
| `t_35fc3ee1` | Miss |
| `Review duplicate/lifecycle data-hygiene follow-up` | Miss |
| `KANBAN_DELIVERABLE_INDEX duplicate lifecycle future approval packet` | Returned older 2026-05-11 QMD/data-hygiene artifacts |

Conclusion: the new 2026-05-15 duplicate/lifecycle handoffs were not reliably retrievable before refresh, so QMD update/embed was required.

## Refresh commands

Commands run:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd update
PATH="/opt/homebrew/bin:$PATH" qmd embed --max-docs-per-batch 50 --max-batch-mb 10
```

Observed output summary:

```text
Updating 2 collection(s)...

[1/2] whiteford-ai-law-pages (**/*.md)
Indexed: 4 new, 1 updated, 354 unchanged, 0 removed
Cleaned up 1 orphaned content hash(es)

[2/2] business-development-books (**/*.md)
Indexed: 0 new, 0 updated, 6 unchanged, 0 removed

Run 'qmd embed' to update embeddings (5 unique hashes need vectors)

Batch: 50 docs / 10.0 MB
[node-llama-cpp] ggml_metal_library_init_from_source: error compiling source
✓ Done! Embedded 134 chunks from 5 documents in 3s
```

## After status

Command:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd status
```

Observed after refresh:

```text
QMD Status

Index: /Users/jeff/.cache/qmd/index.sqlite
Size:  45.5 MB

Documents
  Total:    365 files indexed
  Vectors:  7483 embedded
  Updated:  2m ago

Collections
  whiteford-ai-law-pages (qmd://whiteford-ai-law-pages/)
    Pattern:  **/*.md
    Files:    359 (updated 2m ago)
  business-development-books (qmd://business-development-books/)
    Pattern:  **/*.md
    Files:    6 (updated 9d ago)

[node-llama-cpp] ggml_metal_library_init_from_source: error compiling source
Device: Apple M5 Max, GPU metal offloading yes
```

The document count increased by four Markdown files and vectors increased by 134 chunks.

## Post-refresh smoke search

Command shape:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd search "<query>" -c whiteford-ai-law-pages -n 5 --files
```

| Query | Post-refresh result |
| --- | --- |
| `t_e370191d` | Hit `qmd://whiteford-ai-law-pages/docs/reviews/2026-05-15-duplicate-lifecycle-data-hygiene-followup-review.md`; hit `qmd://whiteford-ai-law-pages/docs/growth-os/data-hygiene/2026-05-15-duplicate-canonicalization-review-packet.md`; hit deliverable index |
| `No-mutation duplicate canonicalization review packet - 2026-05-15` | Hit `qmd://whiteford-ai-law-pages/docs/growth-os/data-hygiene/2026-05-15-duplicate-canonicalization-review-packet.md`; hit parent review and related 2026-05-15 worksheet/packet files |
| `t_3a3c3fa8` | Hit parent review, `qmd://whiteford-ai-law-pages/docs/growth-os/data-hygiene/2026-05-15-agent-targeting-lifecycle-reconciliation-worksheet.md`, and deliverable index |
| `Agent Targeting lifecycle reconciliation worksheet - 2026-05-15` | Hit `qmd://whiteford-ai-law-pages/docs/growth-os/data-hygiene/2026-05-15-agent-targeting-lifecycle-reconciliation-worksheet.md`, parent review, future-approval packet, and deliverable index |
| `t_14304df2` | Hit parent review, `qmd://whiteford-ai-law-pages/docs/growth-os/data-hygiene/2026-05-15-duplicate-lifecycle-future-approval-packet.md`, and deliverable index |
| `Dormant duplicate/lifecycle future-approval packet - 2026-05-15` | Exact slash/hyphen title query missed; normalized token query below succeeds |
| `t_35fc3ee1` | Hit `qmd://whiteford-ai-law-pages/docs/reviews/2026-05-15-duplicate-lifecycle-data-hygiene-followup-review.md` and deliverable index |
| `Review duplicate/lifecycle data-hygiene follow-up - 2026-05-15` | Exact slash/hyphen title query missed; normalized token query below succeeds |
| `t_14304df2 KANBAN_DELIVERABLE_INDEX` | Hit parent review and `qmd://whiteford-ai-law-pages/docs/kanban-deliverable-index.md` |
| `t_3a3c3fa8 KANBAN_DELIVERABLE_INDEX` | Hit parent review and `qmd://whiteford-ai-law-pages/docs/kanban-deliverable-index.md` |
| `t_e370191d KANBAN_DELIVERABLE_INDEX` | Hit parent review and `qmd://whiteford-ai-law-pages/docs/kanban-deliverable-index.md` |
| `t_35fc3ee1 KANBAN_DELIVERABLE_INDEX` | Hit parent review and `qmd://whiteford-ai-law-pages/docs/kanban-deliverable-index.md` |

Additional normalized-title checks:

| Query | Result |
| --- | --- |
| `duplicate lifecycle future approval packet 2026 05 15` | Hit parent review, Agent Targeting worksheet, `qmd://whiteford-ai-law-pages/docs/growth-os/data-hygiene/2026-05-15-duplicate-lifecycle-future-approval-packet.md`, and adjacent 2026-05-15 data-hygiene files |
| `Duplicate lifecycle data hygiene follow up review 2026 05 15` | Hit `qmd://whiteford-ai-law-pages/docs/reviews/2026-05-15-duplicate-lifecycle-data-hygiene-followup-review.md`, related worksheet/packet files, and deliverable index |
| `2026 05 15 duplicate lifecycle future approval packet` | Hit `qmd://whiteford-ai-law-pages/docs/growth-os/data-hygiene/2026-05-15-duplicate-lifecycle-future-approval-packet.md` among top results |
| `2026 05 15 duplicate lifecycle data hygiene followup review` | Hit `qmd://whiteford-ai-law-pages/docs/reviews/2026-05-15-duplicate-lifecycle-data-hygiene-followup-review.md` and deliverable index |

## Direct retrieval checks

Commands:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd get qmd://whiteford-ai-law-pages/docs/reviews/2026-05-15-duplicate-lifecycle-data-hygiene-followup-review.md -l 25
PATH="/opt/homebrew/bin:$PATH" qmd get qmd://whiteford-ai-law-pages/docs/kanban-deliverable-index.md -l 35
```

Direct retrieval succeeded for both the parent review and deliverable index. The parent review retrieval showed task `t_35fc3ee1`, the three parent task IDs `t_e370191d`, `t_3a3c3fa8`, and `t_14304df2`, and the no-live-system/private-review posture. The index retrieval showed rows for all four handoff tasks and their direct deliverable paths.

## Markdown-only and normalized-path caveats

- The active `whiteford-ai-law-pages` QMD collection is configured as `Pattern: **/*.md`; JSON evidence files such as `2026-05-15_duplicate_canonicalization_review_packet_evidence.json` are not part of this QMD collection.
- QMD URIs normalize Markdown file names to lowercase/hyphenated paths. Example: `docs/reviews/2026-05-15_duplicate_lifecycle_data_hygiene_followup_review.md` is retrieved as `qmd://whiteford-ai-law-pages/docs/reviews/2026-05-15-duplicate-lifecycle-data-hygiene-followup-review.md`.
- Exact title queries containing punctuation such as `/` and `follow-up` may miss even after indexing; normalized token queries without punctuation returned the expected files.
- QMD retrieval confirms local Markdown indexability only. Direct files, Kanban handoffs, source evidence, and separately approved review packets remain controlling.

## Self-index status

After writing this report and updating `docs/KANBAN_DELIVERABLE_INDEX.md`, QMD was refreshed again.

Commands:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd update
PATH="/opt/homebrew/bin:$PATH" qmd embed --max-docs-per-batch 50 --max-batch-mb 10
PATH="/opt/homebrew/bin:$PATH" qmd status
PATH="/opt/homebrew/bin:$PATH" qmd search "t_6dbd1948 qmd duplicate lifecycle refresh" -c whiteford-ai-law-pages -n 5 --files
PATH="/opt/homebrew/bin:$PATH" qmd search "t_6dbd1948 KANBAN_DELIVERABLE_INDEX qmd duplicate lifecycle refresh" -c whiteford-ai-law-pages -n 5 --files
PATH="/opt/homebrew/bin:$PATH" qmd get qmd://whiteford-ai-law-pages/docs/ops/qmd-2026-05-15-duplicate-lifecycle-refresh.md -l 20
```

Observed self-index output summary:

```text
qmd update: Indexed 1 new, 1 updated, 358 unchanged, 0 removed
qmd embed: Embedded 100 chunks from 2 documents in 2s
qmd status: Total 366 files indexed; 7583 vectors embedded; whiteford-ai-law-pages 360 Markdown files updated 16s ago
qmd search "t_6dbd1948 qmd duplicate lifecycle refresh": hit qmd://whiteford-ai-law-pages/docs/ops/qmd-2026-05-15-duplicate-lifecycle-refresh.md and qmd://whiteford-ai-law-pages/docs/kanban-deliverable-index.md
qmd search "t_6dbd1948 KANBAN_DELIVERABLE_INDEX qmd duplicate lifecycle refresh": hit this report and qmd://whiteford-ai-law-pages/docs/kanban-deliverable-index.md
qmd get report URI: retrieved this report header, task ID, tenant, boundary, and prerequisite handoff section
```

The existing node-llama-cpp Metal compile warning still appeared in `qmd status`/`qmd embed` output, but the commands exited successfully and indexed/embedded the expected Markdown files.

## Result

Local QMD retrieval is refreshed for the 2026-05-15 duplicate/lifecycle data-hygiene handoff chain. The task IDs, distinctive normalized titles, parent review, and deliverable-index rows are retrievable as internal Markdown memory/search support, with the caveats above.
