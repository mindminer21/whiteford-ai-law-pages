# QMD Refresh Report — 2026-06-02 nightly Qwen repaired chain

Task: `t_275ae2a7`
Controlling repair parent: `t_c79e98c9`
Controlling upstream tasks: `t_eb1acffd`, `t_ccdd72c7`, `t_9ba09079`
Tenant: `whiteford-mountain-west`
Generated: 2026-06-02 05:39:07 MDT
Workspace: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages`

## Scope

Refresh and smoke-verify local QMD retrieval for the completed 2026-06-02 nightly Qwen prospect research, validation/staging, review, and canonical-domain repair chain.

Controlling direct artifacts remain:

- Research closeout: `docs/nightly-lead-research/runs/2026-06-02/digest.md` and `docs/nightly-lead-research/runs/2026-06-02/prospect_candidates.json`
- Validation/staging: `docs/nightly-lead-research/runs/2026-06-02/validation_report.md`, `validation_report.json`, `store_verification.json`, and `agent-targeting-work-items/`
- Review: `docs/reviews/2026-06-02_t_9ba09079_nightly_qwen_prospect_digest_review.md`
- Canonical repair: `docs/nightly-lead-research/runs/2026-06-02/canonical_domain_repair_t_c79e98c9.md` and `.verification.json`
- Deliverable index: `docs/KANBAN_DELIVERABLE_INDEX.md`
- This QMD refresh report: `docs/qmd-refresh/2026-06-02_t_275ae2a7_nightly_qwen_repaired_chain_qmd_refresh.md`

## Safety posture

No external/live action was performed. This task did not contact prospects, publish/post, send email/SMS/DM, perform LinkedIn/social action, enroll contacts, apply tags, activate/test workflows, mutate HighLevel, mutate Supabase, write Clio, launch ads, make client-facing/public changes, or authorize outreach.

QMD is retrieval support only. Direct Markdown/JSON artifacts, local store artifacts, and Kanban handoffs remain controlling. QMD retrieval is not source-currentness proof, contact validation, conflicts/suppression clearance, attorney approval, final-copy approval, live-system approval, or authorization for any external action.

## Commands run

Every required QMD command used the known-good Homebrew/local prefix:

```bash
PATH="/opt/homebrew/bin:/Users/jeff/.local/bin:$PATH" /Users/jeff/.local/bin/qmd update
PATH="/opt/homebrew/bin:/Users/jeff/.local/bin:$PATH" /Users/jeff/.local/bin/qmd embed --max-docs-per-batch 50 --max-batch-mb 10
PATH="/opt/homebrew/bin:/Users/jeff/.local/bin:$PATH" /Users/jeff/.local/bin/qmd search "..." --collection whiteford-ai-law-pages -n 8
PATH="/opt/homebrew/bin:/Users/jeff/.local/bin:$PATH" /Users/jeff/.local/bin/qmd get qmd://whiteford-ai-law-pages/...
```

Raw command outputs for this run were captured under `/tmp/qmd-refresh-t_275ae2a7/`.

## Refresh action and exits

| Command | Exit | Result |
| --- | ---: | --- |
| `qmd update` | 0 | Updated 3 collections. `whiteford-ai-law-pages`: 6 new, 1 updated, 687 unchanged, 0 removed; cleaned up 1 orphaned content hash. |
| `qmd embed --max-docs-per-batch 50 --max-batch-mb 10` | 0 | Embedded 277 chunks from 7 documents in 6 seconds. |

Note: `qmd embed` printed the recurring `node-llama-cpp` Metal compile warning (`ggml_metal_library_init_from_source: error compiling source`), but completed with exit 0.

## Required smoke verification

| Probe | Result |
| --- | --- |
| `qmd search "t_eb1acffd 2026-06-02 nightly Qwen Mach WindBorne Gigascale" --collection whiteford-ai-law-pages -n 8` | PASS with normalization note — returned `docs/KANBAN_DELIVERABLE_INDEX.md` at 93%, including the `t_eb1acffd` row and summary naming Mach Industries, WindBorne Systems, and Gigascale Capital. The semantic search did not return `digest.md` in the top result set, so direct QMD get was used for the controlling digest URI and passed. |
| `qmd search "t_ccdd72c7 validation_report WindBorne Mach Gigascale local Growth OS" --collection whiteford-ai-law-pages -n 8` | PASS — returned `qmd://whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-06-02/validation-report.md` at 97% and `docs/KANBAN_DELIVERABLE_INDEX.md` at 89%. |
| `qmd search "t_9ba09079 PASS-with-major-constraints nightly Qwen prospect digest review" --collection whiteford-ai-law-pages -n 8` | PASS — returned `qmd://whiteford-ai-law-pages/docs/reviews/2026-06-02-t-9ba09079-nightly-qwen-prospect-digest-review.md` at 94% and `docs/KANBAN_DELIVERABLE_INDEX.md` at 84%. |
| `qmd search "t_c79e98c9 canonical domain repair WindBorne Mach" --collection whiteford-ai-law-pages -n 8` | PASS — returned `qmd://whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-06-02/canonical-domain-repair-t-c79e98c9.md` at 97%, `digest.md` at 97%, the review at 97%, and `docs/KANBAN_DELIVERABLE_INDEX.md` at 92%. |

## Direct QMD gets / normalized URI notes

QMD normalizes underscores in Markdown filenames/paths to hyphens in document URIs. Direct `qmd get` passed for the controlling Markdown artifacts using these normalized URIs:

| Direct QMD document | Result |
| --- | --- |
| `qmd://whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-06-02/digest.md` | PASS — returned the nightly digest title, browser-fallback completion status, post-review canonical-domain repair note, and Mach/WindBorne/Gigascale prospect sections. |
| `qmd://whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-06-02/validation-report.md` | PASS — returned `Task: t_ccdd72c7`, staged prospect counts, 0 contacts staged, WindBorne/Mach/Gigascale rows, verification details, and no-send/no-workflow safety posture. |
| `qmd://whiteford-ai-law-pages/docs/reviews/2026-06-02-t-9ba09079-nightly-qwen-prospect-digest-review.md` | PASS — returned `Task: t_9ba09079`, PASS-with-major-constraints verdict, canonical-domain repair requirement, and HighLevel/Supabase hold language. |
| `qmd://whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-06-02/canonical-domain-repair-t-c79e98c9.md` | PASS — returned canonical repair scope, guardrails, WindBorne `https://windbornesystems.com`, Mach `https://machindustries.com`, Gigascale redirect note, repaired local rows/artifacts, and remaining hold. |

JSON artifacts (`prospect_candidates.json`, `validation_report.json`, `store_verification.json`, `.verification.json`, and work-item JSON files) are controlling direct files but are not Markdown-backed QMD documents in the current `whiteford-ai-law-pages` collection. Their paths are retrievable indirectly through the Markdown digest, validation report, review, repair report, deliverable index, and this refresh report.

## Guardrails preserved

- Local/internal indexing and retrieval only.
- Direct Markdown/JSON files remain controlling.
- All three prospects remain research-staged / attorney-review-only / no-auto-send.
- No source-currentness claim, contact validation, conflicts/suppression clearance, approval, final copy, live sync, or external action is granted by QMD refresh.
- HighLevel/Supabase/Clio/live CRM, workflow, tag, LinkedIn/social, email/SMS/DM, ad, public, client-facing, and prospect-contact actions remain held until a separate exact approval packet clears the relevant gates.

## Self-index verification

After this report and the `docs/KANBAN_DELIVERABLE_INDEX.md` row were written, the same bounded QMD refresh was run again.

| Command/probe | Exit/result |
| --- | --- |
| Self-index `qmd update` | Exit 0. `whiteford-ai-law-pages`: 1 new, 1 updated, 693 unchanged, 0 removed; cleaned up 1 orphaned content hash. |
| Self-index `qmd embed --max-docs-per-batch 50 --max-batch-mb 10` | Exit 0. Embedded 246 chunks from 2 documents in 6 seconds. |
| `qmd search "t_275ae2a7 nightly Qwen repaired chain QMD refresh WindBorne Mach" --collection whiteford-ai-law-pages -n 8` | PASS — returned this report at 97% and `docs/KANBAN_DELIVERABLE_INDEX.md` at 93%. |
| `qmd search "KANBAN_DELIVERABLE_INDEX t_275ae2a7 nightly Qwen review repair QMD refresh" --collection whiteford-ai-law-pages -n 8` | PASS — returned this report at 95% and `docs/KANBAN_DELIVERABLE_INDEX.md` at 88%. |
| `qmd get qmd://whiteford-ai-law-pages/docs/qmd-refresh/2026-06-02-t-275ae2a7-nightly-qwen-repaired-chain-qmd-refresh.md` | PASS — returned this report with `Task: t_275ae2a7`, controlling repair parent `t_c79e98c9`, and upstream tasks `t_eb1acffd`, `t_ccdd72c7`, `t_9ba09079`. |

## Current verdict

PASS. QMD update/embed completed successfully, retrieval passed for the 2026-06-02 nightly Qwen digest, validation/staging report, review, canonical-domain repair report, deliverable-index row, and this refresh report. The only caveat is semantic-search ranking: the required `t_eb1acffd` query surfaced the deliverable-index row first, so direct `qmd get` was used to verify the controlling digest artifact.
