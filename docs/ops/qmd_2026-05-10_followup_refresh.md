# QMD 2026-05-10 Follow-up Refresh

Task: `t_6089e32a`
Completed: 2026-05-10 02:35:16 MDT
Workspace: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages`
Collection: `whiteford-ai-law-pages`

## Scope and safety

This was local-only QMD/docs/index maintenance. I did not mutate Supabase, HighLevel, CRM, Clio, workflows, email/SMS/social/LinkedIn/ads, credentials, public routes, client-facing systems, or prospect records.

QMD is internal memory only. It must not be used as live public-source proof for prospecting, source-current claims, outreach, or external publication. Live-source and attorney-review gates still control prospecting and external use.

Business-development principle preserved: lead magnets should deliver a complete narrow diagnostic, make the buyer problem-aware, earn engaged time/trust before any consultation ask, and keep Whiteford legal-services follow-up opt-in-only, educational, non-hypey, non-confidential, no-ACR/no-legal-advice, and attorney-review-gated.

## Target documents

- `docs/reviews/2026-05-10_sunday_internal_readiness_tranche_review.md`
- `docs/nightly-lead-research/runs/2026-05-10/nightly_qwen_prospect_digest_review_t_b4382197.md`
- `docs/reviews/2026-05-10_sunday_decision_review_deck_review.md`
- `docs/KANBAN_DELIVERABLE_INDEX.md`

QMD normalizes some URI path segments from underscores to hyphens. For example, the source file `docs/reviews/2026-05-10_sunday_internal_readiness_tranche_review.md` appears in search output as `qmd://whiteford-ai-law-pages/docs/reviews/2026-05-10-sunday-internal-readiness-tranche-review.md`. This is QMD URI normalization, not a missing-source issue.

## Before status

Command:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd status
```

Observed before maintenance:

```text
Index: /Users/jeff/.cache/qmd/index.sqlite
Size:  22.5 MB
Documents
  Total:    188 files indexed
  Vectors:  2681 embedded
Collections
  whiteford-ai-law-pages
    Pattern:  **/*.md
    Files:    182 (updated 3h ago)
  business-development-books
    Files:    6 (updated 4d ago)
```

QMD emitted this non-fatal local Metal warning during status/search/embed commands:

```text
[node-llama-cpp] ggml_metal_library_init_from_source: error compiling source
```

Commands still completed successfully, and BM25/hybrid search worked after refresh.

## Before smoke searches

### Sunday internal readiness tranche review

Command:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd search "sunday internal readiness tranche review" -c whiteford-ai-law-pages -n 5 --line-numbers
```

Top before result did not retrieve the newest internal readiness review directly; it returned older/current related items instead:

```text
qmd://whiteford-ai-law-pages/docs/reviews/2026-05-10-sunday-morning-decision-packet-review.md:23
Title: Sunday Morning Decision Packet Review — 2026-05-10
Score:  90%

qmd://whiteford-ai-law-pages/docs/kanban-deliverable-index.md:166
Title: Whiteford Mountain West Kanban Deliverable Index
Score:  90%

qmd://whiteford-ai-law-pages/docs/digests/2026-05-10-sunday-morning-decision-packet.md:34
Title: Sunday Morning Whiteford Decision Packet — 2026-05-10
Score:  90%
```

### Nightly prospect digest review, 2026-05-10

Command:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd search "nightly qwen prospect digest review t_b4382197 2026-05-10" -c whiteford-ai-law-pages -n 5 --line-numbers
```

Before result:

```text
No results found.
```

### Sunday decision review deck review

Command:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd search "sunday decision review deck review" -c whiteford-ai-law-pages -n 5 --line-numbers
```

Before result:

```text
No results found.
```

Because the newest docs were not reliably retrieved, I ran the safe local QMD refresh and bounded embed requested by the task.

## Maintenance commands run

Command:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd update && PATH="/opt/homebrew/bin:$PATH" qmd embed --max-docs-per-batch 50 --max-batch-mb 10
```

Output summary:

```text
Updating 2 collection(s)...

[1/2] whiteford-ai-law-pages (**/*.md)
Indexed: 12 new, 1 updated, 181 unchanged, 0 removed
Cleaned up 1 orphaned content hash(es)

[2/2] business-development-books (**/*.md)
Indexed: 0 new, 0 updated, 6 unchanged, 0 removed

✓ All collections updated.

Run 'qmd embed' to update embeddings (13 unique hashes need vectors)
Model: hf:ggml-org/embeddinggemma-300M-GGUF/embeddinggemma-300M-Q8_0.gguf
Batch: 50 docs / 10.0 MB
[node-llama-cpp] ggml_metal_library_init_from_source: error compiling source
✓ Done! Embedded 97 chunks from 13 documents in 2s
```

## After status

Command:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd status
```

Observed after maintenance:

```text
Index: /Users/jeff/.cache/qmd/index.sqlite
Size:  23.0 MB
Documents
  Total:    200 files indexed
  Vectors:  2778 embedded
Collections
  whiteford-ai-law-pages
    Pattern:  **/*.md
    Files:    194 (updated 34m ago)
  business-development-books
    Files:    6 (updated 4d ago)
```

Net effect: `whiteford-ai-law-pages` increased from 182 to 194 indexed markdown files, total indexed documents increased from 188 to 200, and embedded vectors increased from 2681 to 2778.

## After smoke searches

### Sunday internal readiness tranche review

Command:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd search "2026-05-10 sunday internal readiness tranche review Tech GC" -c whiteford-ai-law-pages -n 5 --line-numbers
```

Top relevant results after maintenance:

```text
qmd://whiteford-ai-law-pages/docs/reviews/2026-05-10-sunday-internal-readiness-tranche-review.md:1 #d676c2
Title: Sunday Internal Readiness Tranche Review — 2026-05-10
Score:  93%

1: @@ -1,3 @@ (0 before, 68 after)
2: # Sunday Internal Readiness Tranche Review — 2026-05-10
3:
4: Task: `t_5f6eb002`

qmd://whiteford-ai-law-pages/docs/kanban-deliverable-index.md:169 #16870e
Title: Whiteford Mountain West Kanban Deliverable Index
Score:  93%
```

### Nightly Qwen prospect digest review, 2026-05-10

Command:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd search "nightly qwen prospect digest review t_b4382197 2026-05-10 source-blocked no-op" -c whiteford-ai-law-pages -n 5 --line-numbers
```

Top relevant results after maintenance:

```text
qmd://whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-10/nightly-qwen-prospect-digest-review-t-b4382197.md:1 #6e870c
Title: Nightly Qwen Prospect Digest Review — 2026-05-10
Score:  97%

1: @@ -1,3 @@ (0 before, 81 after)
2: # Nightly Qwen Prospect Digest Review — 2026-05-10
3:
4: Task: `t_b4382197`

qmd://whiteford-ai-law-pages/docs/kanban-deliverable-index.md:120 #16870e
Title: Whiteford Mountain West Kanban Deliverable Index
Score:  96%
```

### Sunday decision review deck review

Command:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd search "2026-05-10 sunday decision review deck review PASS internal Jeff Whiteford decision prep" -c whiteford-ai-law-pages -n 5 --line-numbers
```

Top relevant results after maintenance:

```text
qmd://whiteford-ai-law-pages/docs/reviews/2026-05-10-sunday-decision-review-deck-review.md:74 #0b6ddf
Title: Sunday Decision Packet Review Deck Review — 2026-05-10
Score:  94%

74: @@ -73,3 @@ (72 before, 0 after)
75:
76: The deck is safe and useful for Jeff's internal Sunday decision prep. It should remain a private/local review aid; the only potentially approvable next step is the exact Tech GC local/no-token QA lane, and every external/live-system action remains blocked pending later exact Jeff/Whiteford approvals.
77:

qmd://whiteford-ai-law-pages/docs/kanban-deliverable-index.md:198 #16870e
Title: Whiteford Mountain West Kanban Deliverable Index
Score:  94%
```

## Final self-indexing pass after writing this report

After writing this report and updating `docs/KANBAN_DELIVERABLE_INDEX.md`, I ran one final local QMD update/embed pass so the report and updated deliverable index are also indexed.

Command:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd update && PATH="/opt/homebrew/bin:$PATH" qmd embed --max-docs-per-batch 50 --max-batch-mb 10 && PATH="/opt/homebrew/bin:$PATH" qmd status
```

Output summary:

```text
[1/2] whiteford-ai-law-pages (**/*.md)
Indexed: 1 new, 1 updated, 193 unchanged, 0 removed
Cleaned up 1 orphaned content hash(es)

Run 'qmd embed' to update embeddings (2 unique hashes need vectors)
[node-llama-cpp] ggml_metal_library_init_from_source: error compiling source
✓ Done! Embedded 40 chunks from 2 documents in 1s

Documents
  Total:    201 files indexed
  Vectors:  2818 embedded
Collections
  whiteford-ai-law-pages
    Files:    195 (updated 14s ago)
  business-development-books
    Files:    6 (updated 4d ago)
```

Final net effect including this report and the updated deliverable index: `whiteford-ai-law-pages` increased from 182 to 195 indexed markdown files, total indexed documents increased from 188 to 201, and embedded vectors increased from 2681 to 2818.

## Conclusion

Acceptance criteria are met. QMD status was captured before and after using `PATH="/opt/homebrew/bin:$PATH"`; the newest docs were not reliably retrieved before maintenance, so I ran safe local `qmd update` plus bounded `qmd embed --max-docs-per-batch 50 --max-batch-mb 10`; after refresh, smoke searches retrieve all three newest target documents directly. A final local update/embed pass then indexed this report and the updated deliverable index.

The Metal compile warning remains a non-fatal local QMD warning because commands completed and retrieval now works. QMD remains internal memory only and is not live public-source proof for prospecting or external use.
