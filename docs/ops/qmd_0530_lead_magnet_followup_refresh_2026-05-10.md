# QMD 05:30 Lead-Magnet Follow-Up Refresh — 2026-05-10

Task: `t_222a1542`
Completed: 2026-05-10
Workspace: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages`
Collection: `whiteford-ai-law-pages`

## Scope and safety

This was local-only QMD/docs/index maintenance. I did not mutate Supabase, HighLevel, CRM, Clio, workflows, email/SMS/social/LinkedIn/ads, credentials, public routes, client-facing systems, or prospect records.

QMD is internal memory only. It is not live public-source proof for prospecting, source-current claims, outreach, external publication, or attorney/legal conclusions. Live-source verification, conflicts/suppression checks, attorney review, and exact Jeff approval still govern any external or live-system action.

## Target documents

The refresh targeted the 05:30 lead-magnet follow-up prep handoffs and review:

- `docs/reviews/2026-05-10_0530_lead_magnet_followup_prep_review.md`
- `docs/controlled-pilot/lead_api_payload_adapter_no_token_test_packet_2026-05-10.md`
- `docs/highlevel_custom_field_decision_table_2026-05-10.md`
- `docs/controlled-pilot/tech_gc_lead_magnet_consolidated_copy_redline_2026-05-10.md`
- `docs/highlevel_smart_list_build_evidence_template_2026-05-10.md`

QMD normalizes some URI path segments from underscores to hyphens. For example, `docs/reviews/2026-05-10_0530_lead_magnet_followup_prep_review.md` appears in QMD output as `qmd://whiteford-ai-law-pages/docs/reviews/2026-05-10-0530-lead-magnet-followup-prep-review.md`. This is QMD URI normalization, not a missing-source issue.

## Before status

Command:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd status
```

Observed before maintenance:

```text
Index: /Users/jeff/.cache/qmd/index.sqlite
Size:  26.5 MB
Documents
  Total:    213 files indexed
  Vectors:  3086 embedded
  Updated:  57m ago
Collections
  whiteford-ai-law-pages
    Files:    207 (updated 57m ago)
  business-development-books
    Files:    6 (updated 4d ago)
```

QMD emitted the known non-fatal local Metal warning during status/search/embed commands:

```text
[node-llama-cpp] ggml_metal_library_init_from_source: error compiling source
```

Commands exited `0`, BM25/hybrid searches worked, and the warning was treated as non-fatal per task instructions.

## Before smoke-search status

Commands:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd search "05:30 lead-magnet follow-up prep review" -c whiteford-ai-law-pages -n 5 --line-numbers
PATH="/opt/homebrew/bin:$PATH" qmd search "lead api payload adapter no token test packet" -c whiteford-ai-law-pages -n 5 --line-numbers
PATH="/opt/homebrew/bin:$PATH" qmd search "highlevel custom field decision table 2026-05-10" -c whiteford-ai-law-pages -n 5 --line-numbers
PATH="/opt/homebrew/bin:$PATH" qmd search "tech gc lead magnet consolidated copy redline" -c whiteford-ai-law-pages -n 5 --line-numbers
PATH="/opt/homebrew/bin:$PATH" qmd search "smart list build evidence template" -c whiteford-ai-law-pages -n 5 --line-numbers
```

Observed before maintenance:

```text
05:30 lead-magnet follow-up prep review: No results found.
lead api payload adapter no token test packet: returned older/adjacent docs only; the new 2026-05-10 adapter packet was not the top/new direct result.
highlevel custom field decision table 2026-05-10: returned older/adjacent docs and the deliverable index, but not the new direct decision-table document.
tech gc lead magnet consolidated copy redline: returned older/adjacent docs and the deliverable index, but not the new direct copy-redline document.
smart list build evidence template: returned older/adjacent docs and the deliverable index, but not the new direct evidence-template document.
```

## Maintenance commands run

Because the review and several new handoff documents were missing from smoke retrieval, I ran the bounded refresh:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd update
PATH="/opt/homebrew/bin:$PATH" qmd embed --max-docs-per-batch 50 --max-batch-mb 10
```

Output summary:

```text
Updating 2 collection(s)...

[1/2] whiteford-ai-law-pages (**/*.md)
Indexed: 5 new, 2 updated, 205 unchanged, 0 removed
Cleaned up 2 orphaned content hash(es)

[2/2] business-development-books (**/*.md)
Indexed: 0 new, 0 updated, 6 unchanged, 0 removed

✓ All collections updated.
Run 'qmd embed' to update embeddings (7 unique hashes need vectors)

Model: hf:ggml-org/embeddinggemma-300M-GGUF/embeddinggemma-300M-Q8_0.gguf
Batch: 50 docs / 10.0 MB
[node-llama-cpp] ggml_metal_library_init_from_source: error compiling source
✓ Done! Embedded 104 chunks from 7 documents in 2s
```

## After status

Command:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd status
```

Observed after maintenance:

```text
Index: /Users/jeff/.cache/qmd/index.sqlite
Size:  27.0 MB
Documents
  Total:    218 files indexed
  Vectors:  3190 embedded
  Updated:  2m ago
Collections
  whiteford-ai-law-pages
    Files:    212 (updated 2m ago)
  business-development-books
    Files:    6 (updated 4d ago)
```

Net effect before writing this report: `whiteford-ai-law-pages` increased from 207 to 212 indexed markdown files, total indexed documents increased from 213 to 218, and embedded vectors increased from 3086 to 3190.

## Direct QMD retrieval check

Command:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd get <target-qmd-uri>
```

Each target document was retrievable after refresh:

```text
qmd://whiteford-ai-law-pages/docs/reviews/2026-05-10-0530-lead-magnet-followup-prep-review.md
Title: 05:30 lead-magnet follow-up prep tranche review — 2026-05-10
Task: `t_3f39009d`

qmd://whiteford-ai-law-pages/docs/controlled-pilot/lead-api-payload-adapter-no-token-test-packet-2026-05-10.md
Title: Local no-token `/api/leads` payload-shape adapter test packet
Task: `t_1ca7d420`

qmd://whiteford-ai-law-pages/docs/highlevel-custom-field-decision-table-2026-05-10.md
Title: HighLevel custom-field decision table for six unmapped emitted fields — 2026-05-10
Task: `t_1ec7e0dc`

qmd://whiteford-ai-law-pages/docs/controlled-pilot/tech-gc-lead-magnet-consolidated-copy-redline-2026-05-10.md
Title: Tech GC lead-magnet consolidated copy redline — 2026-05-10
Task: `t_47760fd5`

qmd://whiteford-ai-law-pages/docs/highlevel-smart-list-build-evidence-template-2026-05-10.md
Title: HighLevel Smart-List Build Evidence Template — 2026-05-10
Task: `t_ec5e3010`
```

## Smoke searches after refresh

### 05:30 lead-magnet follow-up prep review

Command:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd search "05:30 lead-magnet follow-up prep review" -c whiteford-ai-law-pages -n 5 --line-numbers
```

Top relevant results after maintenance:

```text
qmd://whiteford-ai-law-pages/docs/reviews/2026-05-10-0530-lead-magnet-followup-prep-review.md:1 #425da9
Title: 05:30 lead-magnet follow-up prep tranche review — 2026-05-10
Score:  87%

qmd://whiteford-ai-law-pages/docs/kanban-deliverable-index.md:222 #c2a1bf
Title: Whiteford Mountain West Kanban Deliverable Index
Score:  72%
```

### Lead API payload adapter no-token test packet

Command:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd search "lead api payload adapter no token test packet" -c whiteford-ai-law-pages -n 5 --line-numbers
```

Top relevant results after maintenance:

```text
qmd://whiteford-ai-law-pages/docs/controlled-pilot/lead-api-payload-adapter-no-token-test-packet-2026-05-10.md:1 #5e6b31
Title: Local no-token `/api/leads` payload-shape adapter test packet
Score:  89%

qmd://whiteford-ai-law-pages/docs/reviews/2026-05-10-0530-lead-magnet-followup-prep-review.md:27 #425da9
Title: 05:30 lead-magnet follow-up prep tranche review — 2026-05-10
Score:  88%
```

### HighLevel custom-field decision table

Command:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd search "highlevel custom field decision table 2026-05-10" -c whiteford-ai-law-pages -n 5 --line-numbers
```

Top relevant results after maintenance:

```text
qmd://whiteford-ai-law-pages/docs/highlevel-custom-field-decision-table-2026-05-10.md:1 #af0585
Title: HighLevel custom-field decision table for six unmapped emitted fields — 2026-05-10
Score:  80%

qmd://whiteford-ai-law-pages/docs/reviews/2026-05-10-0530-lead-magnet-followup-prep-review.md:28 #425da9
Title: 05:30 lead-magnet follow-up prep tranche review — 2026-05-10
Score:  80%
```

The decision table was retrieved directly, though not as the first result for this broad query; the first result was the overnight follow-up decision register. Direct `qmd get` also verified the decision-table URI.

### Tech GC lead-magnet consolidated copy redline

Command:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd search "tech gc lead magnet consolidated copy redline" -c whiteford-ai-law-pages -n 5 --line-numbers
```

Top relevant results after maintenance:

```text
qmd://whiteford-ai-law-pages/docs/controlled-pilot/tech-gc-lead-magnet-consolidated-copy-redline-2026-05-10.md:1 #312678
Title: Tech GC lead-magnet consolidated copy redline — 2026-05-10
Score:  91%

qmd://whiteford-ai-law-pages/docs/reviews/2026-05-10-0530-lead-magnet-followup-prep-review.md:29 #425da9
Title: 05:30 lead-magnet follow-up prep tranche review — 2026-05-10
Score:  91%
```

### Smart-list build evidence template

Command:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd search "smart list build evidence template" -c whiteford-ai-law-pages -n 5 --line-numbers
```

Top relevant results after maintenance:

```text
qmd://whiteford-ai-law-pages/docs/highlevel-smart-list-build-evidence-template-2026-05-10.md:1 #9c4bbc
Title: HighLevel Smart-List Build Evidence Template — 2026-05-10
Score:  88%

qmd://whiteford-ai-law-pages/docs/reviews/2026-05-10-0530-lead-magnet-followup-prep-review.md:30 #425da9
Title: 05:30 lead-magnet follow-up prep tranche review — 2026-05-10
Score:  87%
```

## Result

QMD now retrieves the 05:30 lead-magnet follow-up review and all four new handoff artifacts in the local `whiteford-ai-law-pages` collection. This refresh only improves internal local memory and does not authorize or constitute any live/public-source proof, HighLevel action, CRM mutation, workflow activation, outreach, publication, or client/prospect-facing use.
