# QMD Overnight Safe-Progress Refresh — 2026-05-10

Task: `t_7ff4b17c`
Completed: 2026-05-10 03:46:53 MDT
Workspace: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages`
Collection: `whiteford-ai-law-pages`

## Scope and safety

This was local-only QMD/docs/index maintenance. I did not mutate Supabase, HighLevel, CRM, Clio, workflows, email/SMS/social/LinkedIn/ads, credentials, public routes, client-facing systems, or prospect records.

QMD is internal memory only. It must not be used as live public-source proof for prospecting, source-current claims, outreach, or external publication. Live-source and attorney-review gates still control prospecting and external use.

## Target documents

- `docs/reviews/2026-05-10_overnight_safe_progress_tranche_review.md`
- `docs/nightly-lead-research/source_access_replacement_preflight_packet_2026-05-10.md`
- `docs/controlled-pilot/tech_gc_box_a_post_approval_kanban_task_template_2026-05-10.md`
- `docs/KANBAN_DELIVERABLE_INDEX.md`

QMD normalizes some URI path segments from underscores to hyphens. For example, the source file `docs/reviews/2026-05-10_overnight_safe_progress_tranche_review.md` appears in search output as `qmd://whiteford-ai-law-pages/docs/reviews/2026-05-10-overnight-safe-progress-tranche-review.md`. This is QMD URI normalization, not a missing-source issue.

## Before status

Command:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd status
```

Observed before maintenance:

```text
Index: /Users/jeff/.cache/qmd/index.sqlite
Size:  23.0 MB
Documents
  Total:    201 files indexed
  Vectors:  2818 embedded
Collections
  whiteford-ai-law-pages
    Pattern:  **/*.md
    Files:    195 (updated 1h ago)
  business-development-books
    Files:    6 (updated 4d ago)
```

QMD emitted this non-fatal local Metal warning during status/search/embed commands:

```text
[node-llama-cpp] ggml_metal_library_init_from_source: error compiling source
```

Commands still completed successfully, and search worked after refresh.

## Maintenance commands run

Commands:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd update
PATH="/opt/homebrew/bin:$PATH" qmd embed --max-docs-per-batch 50 --max-batch-mb 10
```

Output summary:

```text
Updating 2 collection(s)...

[1/2] whiteford-ai-law-pages (**/*.md)
Indexed: 5 new, 2 updated, 193 unchanged, 0 removed
Cleaned up 2 orphaned content hash(es)

[2/2] business-development-books (**/*.md)
Indexed: 0 new, 0 updated, 6 unchanged, 0 removed

✓ All collections updated.
Run 'qmd embed' to update embeddings (7 unique hashes need vectors)

Model: hf:ggml-org/embeddinggemma-300M-GGUF/embeddinggemma-300M-Q8_0.gguf
Batch: 50 docs / 10.0 MB
[node-llama-cpp] ggml_metal_library_init_from_source: error compiling source
✓ Done! Embedded 83 chunks from 7 documents in 2s
```

## After status

Command:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd status
```

Observed after maintenance:

```text
Index: /Users/jeff/.cache/qmd/index.sqlite
Size:  23.1 MB
Documents
  Total:    206 files indexed
  Vectors:  2901 embedded
Collections
  whiteford-ai-law-pages
    Pattern:  **/*.md
    Files:    200 (updated 2m ago)
  business-development-books
    Files:    6 (updated 4d ago)
```

Net effect: `whiteford-ai-law-pages` increased from 195 to 200 indexed markdown files, total indexed documents increased from 201 to 206, and embedded vectors increased from 2818 to 2901.

## Smoke searches after refresh

### Overnight safe-progress prep tranche review

Command:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd search "overnight safe-progress prep tranche review" -c whiteford-ai-law-pages
```

Top relevant results after maintenance:

```text
qmd://whiteford-ai-law-pages/docs/reviews/2026-05-10-overnight-safe-progress-tranche-review.md:1 #b6df2d
Title: Overnight safe-progress prep tranche review — 2026-05-10
Score:  94%

qmd://whiteford-ai-law-pages/docs/kanban-deliverable-index.md:210 #ce5a8c
Title: Whiteford Mountain West Kanban Deliverable Index
Score:  91%
```

### Source access replacement preflight packet

Command:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd search "source access replacement preflight packet" -c whiteford-ai-law-pages
```

Top relevant results after maintenance:

```text
qmd://whiteford-ai-law-pages/docs/reviews/2026-05-10-overnight-safe-progress-tranche-review.md:19 #b6df2d
Title: Overnight safe-progress prep tranche review — 2026-05-10
Score:  86%

qmd://whiteford-ai-law-pages/docs/nightly-lead-research/source-access-replacement-preflight-packet-2026-05-10.md:1 #5286e6
Title: Source-Access Replacement Preflight Packet — 2026-05-10
Score:  86%
```

Note: the same query also returned `docs/nightly-lead-research/qwen-tool-preflight-hardening-2026-05-09.md` at 86%, which is a related older preflight-hardening document; the new source-access replacement packet is retrievable directly in the top result set.

### Box A post-approval Kanban task template

Command:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd search "Box A post-approval Kanban task template" -c whiteford-ai-law-pages
```

Top relevant results after maintenance:

```text
qmd://whiteford-ai-law-pages/docs/controlled-pilot/tech-gc-box-a-post-approval-kanban-task-template-2026-05-10.md:1 #4e0757
Title: Tech GC Box A post-approval Kanban task template — 2026-05-10
Score:  91%

qmd://whiteford-ai-law-pages/docs/reviews/2026-05-10-overnight-safe-progress-tranche-review.md:20 #b6df2d
Title: Overnight safe-progress prep tranche review — 2026-05-10
Score:  90%
```

## Result

Local QMD retrieval is refreshed for the overnight safe-progress artifacts. The new review, source-access replacement preflight packet, and Box A post-approval Kanban task template are retrievable from the `whiteford-ai-law-pages` collection. All external/live-system action remains held pending exact later approvals.
