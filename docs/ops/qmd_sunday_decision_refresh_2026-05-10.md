# QMD Sunday Decision Refresh — 2026-05-10

Task: `t_b14c27d5`
Completed: 2026-05-09 23:51:33 MDT
Workspace: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages`
Collection: `whiteford-ai-law-pages`

## Scope and safety

This was local-only QMD maintenance. I did not delete collections, overwrite source documents, mutate CRM/HighLevel/Supabase/Clio records, send email/social/LinkedIn/ad content, change credentials, or take any public/client-facing action.

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
  Total:    185 files indexed
  Vectors:  2629 embedded
Collections
  whiteford-ai-law-pages
    Pattern:  **/*.md
    Files:    179 (updated 1h ago)
  business-development-books
    Files:    6 (updated 4d ago)
```

QMD also emitted this non-fatal local Metal compile warning during status/search/embed commands:

```text
[node-llama-cpp] ggml_metal_library_init_from_source: error compiling source
```

The commands still completed successfully.

## Before search evidence

Command:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd search "Sunday morning decision packet" -c whiteford-ai-law-pages
```

Result before maintenance:

```text
No results found.
```

Control searches already had partial coverage before maintenance:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd search "Supabase blocker t_fa6eb9c1 t_53d470c6" -c whiteford-ai-law-pages
PATH="/opt/homebrew/bin:$PATH" qmd search "Tech GC local no-token QA" -c whiteford-ai-law-pages
```

Before maintenance, the Supabase blocker query returned older/high-level sources including `docs/reviews/2026-05-09-authority-content-readiness-review.md` and `docs/kanban-deliverable-index.md`; the Tech GC query returned the local/no-token QA harness plan and related controlled-pilot docs.

## Maintenance commands run

```bash
PATH="/opt/homebrew/bin:$PATH" qmd update
```

Output summary:

```text
Updating 2 collection(s)...

[1/2] whiteford-ai-law-pages (**/*.md)
Indexed: 3 new, 1 updated, 178 unchanged, 0 removed
Cleaned up 1 orphaned content hash(es)

[2/2] business-development-books (**/*.md)
Indexed: 0 new, 0 updated, 6 unchanged, 0 removed

✓ All collections updated.

Run 'qmd embed' to update embeddings (4 unique hashes need vectors)
```

Then I ran the bounded embed requested by the task:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd embed --max-docs-per-batch 50 --max-batch-mb 10
```

Output summary:

```text
Model: hf:ggml-org/embeddinggemma-300M-GGUF/embeddinggemma-300M-Q8_0.gguf
Batch: 50 docs / 10.0 MB
[node-llama-cpp] ggml_metal_library_init_from_source: error compiling source
✓ Done! Embedded 52 chunks from 4 documents in 1s
```

## After status

Command:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd status
```

Observed after maintenance:

```text
Index: /Users/jeff/.cache/qmd/index.sqlite
Size:  22.5 MB
Documents
  Total:    188 files indexed
  Vectors:  2681 embedded
Collections
  whiteford-ai-law-pages
    Pattern:  **/*.md
    Files:    182 (updated 55m ago)
  business-development-books
    Files:    6 (updated 4d ago)
```

Net effect: `whiteford-ai-law-pages` increased from 179 to 182 indexed markdown files, total documents increased from 185 to 188, and embedded vectors increased from 2629 to 2681.

## After search evidence

### Sunday morning decision packet

Command:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd search "Sunday morning decision packet" -c whiteford-ai-law-pages
```

Top results after maintenance:

```text
qmd://whiteford-ai-law-pages/docs/reviews/2026-05-10-sunday-morning-decision-packet-review.md:1 #8dbbc7
Title: Sunday Morning Decision Packet Review — 2026-05-10
Score:  90%

qmd://whiteford-ai-law-pages/docs/reviews/2026-05-10-sunday-morning-decision-packet-rereview.md:1 #bfd086
Title: Sunday Morning Decision Packet Re-review — 2026-05-10
Score:  90%

qmd://whiteford-ai-law-pages/docs/digests/2026-05-10-sunday-morning-decision-packet.md:1 #490ec6
Title: Sunday Morning Whiteford Decision Packet — 2026-05-10
Score:  90%
```

The shorter variant also retrieves the same current packet/review set:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd search "Sunday decision packet" -c whiteford-ai-law-pages
```

Top results:

```text
qmd://whiteford-ai-law-pages/docs/reviews/2026-05-10-sunday-morning-decision-packet-review.md:1 #8dbbc7
Title: Sunday Morning Decision Packet Review — 2026-05-10
Score:  87%

qmd://whiteford-ai-law-pages/docs/reviews/2026-05-10-sunday-morning-decision-packet-rereview.md:1 #bfd086
Title: Sunday Morning Decision Packet Re-review — 2026-05-10
Score:  86%

qmd://whiteford-ai-law-pages/docs/digests/2026-05-10-sunday-morning-decision-packet.md:1 #490ec6
Title: Sunday Morning Whiteford Decision Packet — 2026-05-10
Score:  86%
```

### Supabase blocker lineage

Command:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd search "Supabase blocker t_fa6eb9c1 t_53d470c6" -c whiteford-ai-law-pages
```

Top relevant results after maintenance:

```text
qmd://whiteford-ai-law-pages/docs/reviews/2026-05-10-sunday-morning-decision-packet-review.md:14 #8dbbc7
Title: Sunday Morning Decision Packet Review — 2026-05-10
Score:  93%
Context: explicitly names `t_fa6eb9c1` for Supabase expanded-schema DDL and `t_53d470c6` for gated backfill/sync follow-through.

qmd://whiteford-ai-law-pages/docs/reviews/2026-05-10-sunday-morning-decision-packet-rereview.md:14 #bfd086
Title: Sunday Morning Decision Packet Re-review — 2026-05-10
Score:  93%
Context: confirms the revised packet explicitly names both blocker tasks while preserving the no-external-action wall.

qmd://whiteford-ai-law-pages/docs/digests/2026-05-10-sunday-morning-decision-packet.md:43 #490ec6
Title: Sunday Morning Whiteford Decision Packet — 2026-05-10
Score:  92%
Context: `Supabase expanded schema / gated backfill` row lists blocker lineage for expanded-schema DDL task `t_fa6eb9c1` and gated backfill/sync task `t_53d470c6`.
```

### Tech GC local no-token QA

Command:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd search "Tech GC local no-token QA" -c whiteford-ai-law-pages
```

Top results after maintenance:

```text
qmd://whiteford-ai-law-pages/docs/controlled-pilot/tech-gc-local-no-token-qa-harness-plan-2026-05-09.md:1 #555648
Title: Tech GC Local / No-Token QA Harness Plan — 2026-05-09
Score:  79%

qmd://whiteford-ai-law-pages/docs/controlled-pilot/tech-gc-controlled-pilot-morning-approval-checklist-2026-05-09.md:20 #022c08
Title: Tech GC Controlled-Pilot Morning Approval Checklist — 2026-05-09
Score:  79%

qmd://whiteford-ai-law-pages/docs/controlled-pilot/tech-gc-internal-controlled-pilot-packet-2026-05-09.md:16 #106b4f
Title: Tech GC Internal Controlled-Pilot Decision Packet
Score:  79%

qmd://whiteford-ai-law-pages/docs/tech-gc-local-no-token-qa-evidence-2026-05-08.md:1 #131fd1
Title: Tech GC Local / No-Token QA Evidence Matrix
Score:  79%
```

## Conclusion

Acceptance criterion is met: QMD now retrieves the Sunday morning decision packet, its review, and its re-review from the `whiteford-ai-law-pages` collection. The Supabase blocker-lineage query now retrieves the newest Sunday packet/review/re-review evidence with both blocker IDs (`t_fa6eb9c1` and `t_53d470c6`). The Tech GC local/no-token QA query remains covered by the relevant controlled-pilot and evidence docs.

Remaining local note: QMD displays hyphenated URI slugs for underscore-named source files, for example `2026-05-10-sunday-morning-decision-packet.md` in the QMD URI corresponds to the source file `docs/digests/2026-05-10_sunday_morning_decision_packet.md`. This appears to be QMD URI normalization, not a missing-source issue.
