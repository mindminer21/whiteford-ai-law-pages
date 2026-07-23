# QMD Refresh Report — 2026-05-28 nightly Qwen research/validation/review chain

Task: t_31022752
Tenant: whiteford-mountain-west
Generated: 2026-05-28 03:08:14 MDT
Workspace: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages`

## Scope

Refresh and verify local QMD retrieval for the 2026-05-28 nightly Qwen research, validation, review, source-unavailable-report fix, and canonical prompt review chain after reviewer gate `t_bf0eb514` completed.

Controlling artifacts verified:

- Research digest task `t_13611754`: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-28/digest.md`
- Structured prospect candidates: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-28/prospect_candidates.json`
- Validation/staging task `t_31c183aa`: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-28/validation_report.md`
- Digest review task `t_c02c37ce`: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/reviews/2026-05-28_t_c02c37ce_nightly_qwen_prospect_digest_review.md`
- Source-unavailable fix task `t_14a437a2`: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/reviews/t_14a437a2_browser_fallback_conflict_analysis.md`
- Source-unavailable fix review task `t_59f7b92d`: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/reviews/2026-05-28_t_14a437a2_source_unavailable_report_fix_review.md`
- Canonical prompt patch review gate `t_bf0eb514`: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/reviews/2026-05-28_t_f8263eab_canonical_prompt_patch_review.md`
- Human deliverable index: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/KANBAN_DELIVERABLE_INDEX.md`

## Safety posture

QMD is internal memory/search support only. This refresh does not create source-currentness proof, attorney approval, conflicts/suppression clearance, launch approval, legal-marketing approval, live-system approval, or authorization for any external/client/prospect-facing action.

No external/live action was performed: no outreach, email/SMS/newsletter/DM send, workflow activation/enrollment/testing, trigger tag use, HighLevel/CRM/Supabase/Clio mutation, Supabase DDL/sync/backfill, LinkedIn/social/public action, public route/page/schema deployment, prospect contact, or client/prospect-facing use.

## Commands run

Used the known-good Homebrew Node prefix for every QMD command:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd status
PATH="/opt/homebrew/bin:$PATH" qmd search "..." --collection whiteford-ai-law-pages --json -n 5
PATH="/opt/homebrew/bin:$PATH" qmd update
PATH="/opt/homebrew/bin:$PATH" qmd embed --max-docs-per-batch 50 --max-batch-mb 10
PATH="/opt/homebrew/bin:$PATH" qmd get qmd://whiteford-ai-law-pages/... -l 8
```

## Before refresh smoke search

Initial QMD status showed:

- Index: `/Users/jeff/.cache/qmd/index.sqlite`
- Collection: `whiteford-ai-law-pages`
- Pattern: `**/*.md`
- Files: 629
- Vectors: 25,219
- Updated: about 3 hours earlier

Initial smoke searches were stale/missing for required probes:

| Probe | Initial result |
| --- | --- |
| `t_13611754` | no results |
| `t_31c183aa` | no results |
| `t_c02c37ce` | no results |
| `t_14a437a2` | no results |
| `t_59f7b92d` | no results |
| `t_bf0eb514` | no results |
| `Cognition Labs SimplexAI Triomics` | no results |
| `2026-05-28 nightly Qwen prospect digest` | partial/stale results only; returned older morning-action and deliverable-index context before refresh |

## Refresh action

Ran:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd update
PATH="/opt/homebrew/bin:$PATH" qmd embed --max-docs-per-batch 50 --max-batch-mb 10
```

Refresh result:

- `whiteford-ai-law-pages`: 9 new, 2 updated, 627 unchanged, 0 removed
- Cleaned up 2 orphaned content hashes
- `business-development-books`: 0 new, 0 updated, 6 unchanged, 0 removed
- Embedded 258 chunks from 11 documents in 6 seconds
- Post-refresh status: 644 total files indexed, 25,477 vectors embedded, `whiteford-ai-law-pages` 638 files updated about 2 minutes earlier

Note: `qmd status` and `qmd embed` printed a `node-llama-cpp` Metal compile warning, but indexing and embedding completed successfully.

## Post-refresh verification

Required task ID and distinctive-term retrieval passed:

| Probe | Result |
| --- | --- |
| `t_13611754` | PASS — returned digest, source-fix analysis/index, and deliverable-index hits. |
| `t_31c183aa` | PASS — returned validation report, digest, and deliverable-index hits. |
| `t_c02c37ce` | PASS — returned digest review, digest, and deliverable-index hits. |
| `t_14a437a2` | PASS — returned source-fix index, source-fix review, conflict analysis, source-unavailable report, and canonical-prompt review hits. |
| `t_59f7b92d` | PASS — returned canonical-prompt review, source-fix review, and deliverable-index hits. |
| `t_bf0eb514` | PASS — returned canonical-prompt review and deliverable-index hits. |
| `t_f8263eab` | PASS — returned canonical-prompt review, source-fix review, and deliverable-index hits. |
| `Cognition Labs SimplexAI Triomics` | PASS — returned validation report, digest review, digest, conflict analysis, and source-fix review hits. |
| `2026-05-28 nightly Qwen prospect digest` | PASS — returned source-fix review, digest review, source-unavailable report, digest, and conflict analysis hits. |

Direct Markdown retrieval passed via `qmd get`:

| Direct QMD document | Result |
| --- | --- |
| `qmd://whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-28/digest.md` | PASS — returned digest title and `Run ID: t_13611754`. |
| `qmd://whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-28/validation_report.md` | PASS — returned validation title, task `t_31c183aa`, and source payload path. |
| `qmd://whiteford-ai-law-pages/docs/reviews/2026-05-28_t_c02c37ce_nightly_qwen_prospect_digest_review.md` | PASS — returned review title and task `t_c02c37ce`. |
| `qmd://whiteford-ai-law-pages/docs/reviews/t_14a437a2_browser_fallback_conflict_analysis.md` | PASS — returned conflict-analysis title, task `t_14a437a2`, and affected run task `t_13611754`. |
| `qmd://whiteford-ai-law-pages/docs/reviews/2026-05-28_t_14a437a2_source_unavailable_report_fix_review.md` | PASS — returned source-fix review title, task `t_14a437a2`, reviewer task `t_59f7b92d`, and internal-only scope. |
| `qmd://whiteford-ai-law-pages/docs/reviews/2026-05-28_t_f8263eab_canonical_prompt_patch_review.md` | PASS — returned canonical-prompt review title, reviewed task `t_f8263eab`, reviewer task `t_bf0eb514`, and internal-only scope. |
| `qmd://whiteford-ai-law-pages/docs/KANBAN_DELIVERABLE_INDEX.md` | PASS — returned the deliverable index with rows for `t_bf0eb514`, `t_f8263eab`, `t_59f7b92d`, `t_c02c37ce`, `t_31c183aa`, and `t_13611754`. |

Caveat: QMD normalizes underscores to hyphens in displayed `qmd://` result URIs. Direct `qmd get` retrieval by the exact underscore Markdown paths still works and remains the controlling direct-file verification.

## Current verdict

PASS. QMD has been refreshed, embedded, and now retrieves the 2026-05-28 nightly Qwen research/validation/review/fix/canonical-review chain by required task IDs, distinctive prospect terms, distinctive nightly Qwen digest wording, direct Markdown `qmd get`, and deliverable-index rows.

## Next action

Use this QMD refresh only as internal memory/search support. Direct Markdown files, local store artifacts, and Kanban handoffs remain controlling; this task does not authorize outreach, workflow activation/enrollment/testing, CRM/HighLevel/Supabase/Clio mutation, Supabase DDL/sync/backfill, LinkedIn/social/public action, prospect contact, source-currentness claims, attorney approval, or final-copy/public/client-facing use.
