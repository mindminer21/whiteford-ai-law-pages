# 2026-05-25 Machina Labs Agent Targeting QMD Refresh

Task: t_14196910
Date/time: 2026-05-25 03:00 MDT
Collection: `whiteford-ai-law-pages`
Scope: internal QMD/search maintenance only. No CRM, HighLevel, Supabase, Clio, workflow, trigger tag, email/SMS/DM, LinkedIn/social, ad, public publishing, prospect contact, client-facing, or other external/live-system action was performed or authorized.

## Source deliverables verified on disk

- `docs/growth-os/agent-targeting-packets/2026-05-25_machina_labs_internal_attorney_review_packet.md` — present; title: `# Machina Labs Agent Targeting Packet — Attorney Review Only — 2026-05-25`; task: `t_343fe326`; posture: private/internal attorney-review staging only.
- `docs/reviews/2026-05-25_machina_labs_agent_targeting_packet_review.md` — present; title: `# Review — Machina Labs Agent Targeting Packet — 2026-05-25`; task: `t_9b767ec8`; verdict: `PASS-with-constraints for private/internal attorney-review prep only.`
- `docs/nightly-lead-research/runs/2026-05-25/agent-targeting-work-items/machina-labs.json` — present local work item referenced by the reviewer.
- `docs/KANBAN_DELIVERABLE_INDEX.md` — already carried the writer row for `t_343fe326` and reviewer row for `t_9b767ec8`; this task adds the `t_14196910` QMD refresh row.

## Commands run

```bash
export PATH="/opt/homebrew/bin:$PATH"
qmd status
qmd update
qmd embed --max-docs-per-batch 50 --max-batch-mb 10
qmd status
qmd search "t_343fe326" -c whiteford-ai-law-pages -n 5 --line-numbers
qmd search "t_9b767ec8" -c whiteford-ai-law-pages -n 5 --line-numbers
qmd search "t_14196910" -c whiteford-ai-law-pages -n 5 --line-numbers
qmd search "Machina Labs Agent Targeting packet" -c whiteford-ai-law-pages -n 5 --line-numbers
qmd search "t_343fe326 t_9b767ec8 Machina Labs Agent Targeting packet" -c whiteford-ai-law-pages -n 5 --line-numbers
qmd search "t_9b767ec8 Review Machina Labs Agent Targeting packet" -c whiteford-ai-law-pages -n 5 --line-numbers
qmd search "t_14196910 Machina Labs Agent Targeting QMD refresh" -c whiteford-ai-law-pages -n 5 --line-numbers
qmd get qmd://whiteford-ai-law-pages/docs/growth-os/agent-targeting-packets/2026-05-25_machina_labs_internal_attorney_review_packet.md -l 8
qmd get qmd://whiteford-ai-law-pages/docs/growth-os/agent-targeting-packets/2026-05-25-machina-labs-internal-attorney-review-packet.md -l 8
qmd get qmd://whiteford-ai-law-pages/docs/reviews/2026-05-25_machina_labs_agent_targeting_packet_review.md -l 8
qmd get qmd://whiteford-ai-law-pages/docs/reviews/2026-05-25-machina-labs-agent-targeting-packet-review.md -l 8
qmd get qmd://whiteford-ai-law-pages/docs/kanban-deliverable-index.md -l 8
qmd get qmd://whiteford-ai-law-pages/docs/KANBAN_DELIVERABLE_INDEX.md -l 8
```

## Refresh result

Before refresh, `qmd status` showed:

- Index: `/Users/jeff/.cache/qmd/index.sqlite`
- Size: 96.9 MB
- Total indexed documents: 589
- Embedded vectors: 21289
- `whiteford-ai-law-pages`: 583 Markdown files, updated about 15 minutes earlier
- `business-development-books`: 6 Markdown files, unchanged

`qmd update` result:

- `whiteford-ai-law-pages`: indexed 2 new Markdown files, 1 updated file, 582 unchanged, 0 removed.
- `business-development-books`: 0 new, 0 updated, 6 unchanged, 0 removed.
- QMD reported 3 unique hashes needing vectors and cleaned up 1 orphaned content hash.

`qmd embed --max-docs-per-batch 50 --max-batch-mb 10` result:

- Embedded 211 chunks from 3 documents in 5 seconds.
- QMD emitted the recurring non-fatal `[node-llama-cpp] ggml_metal_library_init_from_source: error compiling source` Metal warning, but embedding completed successfully.

After refresh, `qmd status` showed:

- Total indexed documents: 591
- Embedded vectors: 21500
- `whiteford-ai-law-pages`: 585 Markdown files
- `business-development-books`: 6 Markdown files

## Smoke-search results after initial refresh

| Query | Top relevant result(s) | Status |
| --- | --- | --- |
| `t_343fe326` | Review report score 0.89; packet score 0.78; deliverable index score 0.35. | PASS. |
| `t_9b767ec8` | Review report score 0.88; deliverable index score 0.36. | PASS. |
| `t_14196910` | No results before this report/index row was written. | Expected pre-self-index miss; this task ID is introduced by this report and index row. |
| `Machina Labs Agent Targeting packet` | Review report score 0.91; packet score 0.91; validation report score 0.90; digest review score 0.90; deliverable index score 0.78. | PASS. |
| `t_343fe326 t_9b767ec8 Machina Labs Agent Targeting packet` | Review report score 0.96; deliverable index score 0.82. | PASS. |
| `t_9b767ec8 Review Machina Labs Agent Targeting packet` | Review report score 0.95; deliverable index score 0.81. | PASS. |
| `t_14196910 Machina Labs Agent Targeting QMD refresh` | No results before this report/index row was written. | Expected pre-self-index miss; final self-index verification below must pass. |

## Direct QMD retrieval and path-normalization notes

Exact/direct retrieval passed for the packet, review, and deliverable-index targets:

- Packet, original underscore path: `qmd://whiteford-ai-law-pages/docs/growth-os/agent-targeting-packets/2026-05-25_machina_labs_internal_attorney_review_packet.md`
- Packet, normalized display path: `qmd://whiteford-ai-law-pages/docs/growth-os/agent-targeting-packets/2026-05-25-machina-labs-internal-attorney-review-packet.md`
- Review, original underscore path: `qmd://whiteford-ai-law-pages/docs/reviews/2026-05-25_machina_labs_agent_targeting_packet_review.md`
- Review, normalized display path: `qmd://whiteford-ai-law-pages/docs/reviews/2026-05-25-machina-labs-agent-targeting-packet-review.md`
- Deliverable index, lowercase normalized path: `qmd://whiteford-ai-law-pages/docs/kanban-deliverable-index.md`
- Deliverable index, original uppercase path: `qmd://whiteford-ai-law-pages/docs/KANBAN_DELIVERABLE_INDEX.md`

Caveat: QMD search results display some Markdown file URIs with normalized lowercase and hyphenated path segments, even when the local filename contains uppercase letters or underscores. Both original and normalized URI forms were accepted by `qmd get` for the tested packet, review, and deliverable index. Direct Markdown files and Kanban handoffs remain controlling if QMD display/path normalization is confusing.

## Self-index plan

After this report and the `t_14196910` deliverable-index row are written, run one final self-index refresh:

```bash
export PATH="/opt/homebrew/bin:$PATH"
qmd update
qmd embed --max-docs-per-batch 50 --max-batch-mb 10
qmd status
qmd search "t_14196910" -c whiteford-ai-law-pages -n 5 --line-numbers
qmd search "2026-05-25 Machina Labs Agent Targeting QMD Refresh" -c whiteford-ai-law-pages -n 5 --line-numbers
qmd search "t_14196910 Machina Labs Agent Targeting QMD refresh" -c whiteford-ai-law-pages -n 5 --line-numbers
qmd get qmd://whiteford-ai-law-pages/docs/reports/2026-05-25-machina-labs-agent-targeting-qmd-refresh.md -l 8
qmd get qmd://whiteford-ai-law-pages/docs/kanban-deliverable-index.md -l 20
```

## Final self-index verification

After this report and the `t_14196910` deliverable-index row were written, I ran the final bounded self-index pass:

- `qmd update`: `whiteford-ai-law-pages` indexed 1 new Markdown file, 1 updated file, 584 unchanged, 0 removed; `business-development-books` remained unchanged; QMD reported 2 unique hashes needing vectors and cleaned up 1 orphaned content hash.
- `qmd embed --max-docs-per-batch 50 --max-batch-mb 10`: embedded 195 chunks from 2 documents in 5 seconds; the same non-fatal Metal/node-llama-cpp compile warning appeared, but embedding completed successfully.
- Status after the pass: 592 total indexed documents, 21695 embedded vectors, `whiteford-ai-law-pages` at 586 Markdown files.
- Self-task smoke verification: `t_14196910` returned this report score 0.92 and the deliverable index score 0.52.
- Report-title smoke verification: `2026-05-25 Machina Labs Agent Targeting QMD Refresh` returned this report score 0.95 and the deliverable index score 0.92.
- Combined smoke verification: `t_14196910 Machina Labs Agent Targeting QMD refresh` returned this report score 0.96 and the deliverable index score 0.87.
- Direct self-index retrieval passed for `qmd://whiteford-ai-law-pages/docs/reports/2026-05-25-machina-labs-agent-targeting-qmd-refresh.md` and `qmd://whiteford-ai-law-pages/docs/kanban-deliverable-index.md`.

Because this final-result section patches the report after the first self-index, I ran one more bounded `qmd update` and `qmd embed` pass so the final report text is searchable. See `Final post-patch self-index verification` below.

## Final post-patch self-index verification

After adding the final-result section above, I ran one more bounded self-index pass:

- `qmd update`: `whiteford-ai-law-pages` indexed 0 new Markdown files, 1 updated file, 585 unchanged, 0 removed; `business-development-books` remained unchanged; QMD reported 1 unique hash needing vectors and cleaned up 1 orphaned content hash.
- `qmd embed --max-docs-per-batch 50 --max-batch-mb 10`: embedded 7 chunks from 1 document in 1 second; the recurring non-fatal Metal/node-llama-cpp warning appeared, but embedding completed successfully.
- Status after the pass: 592 total indexed documents, 21702 embedded vectors, `whiteford-ai-law-pages` at 586 Markdown files, updated about 8 seconds before status.
- Smoke verification: `Final post-patch self-index verification t_14196910` returned this report score 0.96; `t_14196910 Machina Labs Agent Targeting QMD refresh` returned this report score 0.96 and the deliverable index score 0.87.

## Conclusion

The local QMD index now retrieves the Machina Labs Agent Targeting packet chain for writer task `t_343fe326`, reviewer task `t_9b767ec8`, this QMD task `t_14196910`, the packet title query, the new deliverable-index row, and direct QMD URIs for the packet, review, report, and deliverable index. QMD remains internal memory/search support only. It is not external-source verification, source-currentness proof, legal approval, launch approval, public/client-facing approval, attorney approval, conflicts clearance, suppression clearance, CRM/Supabase/HighLevel sync approval, or authorization for outreach, workflow activation, sends, LinkedIn/social action, public publishing, ads, Clio writes, or any other live-system/client/prospect-facing action. Direct Markdown files and Kanban handoffs remain controlling.
