# Review: t_f8263eab canonical nightly Qwen prompt browser-fallback patch — 2026-05-28

Task reviewed: `t_f8263eab`
Reviewer task: `t_bf0eb514`
Review timestamp: 2026-05-28 03:05:21 MDT
Scope: internal/local file review only; no outreach, CRM/HighLevel/Supabase/Clio mutation, workflow activation/enrollment/testing, LinkedIn/social/public action, prospect contact, or nightly rerun.

## Verdict

PASS. The canonical prompt patch is durable for future scheduled nightly runs because the launcher reads `docs/nightly_qwen_prospect_research_prompt.md`, and that canonical prompt now contains the browser-fallback/supersede protocol that previously existed only in the reviewed 2026-05-28 run snapshot.

No rerun or live/external action was performed during this review. This review was limited to local file inspection and documentation updates.

## Files reviewed

- Launcher: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/scripts/run_nightly_qwen_prospect_research.sh`
- Canonical prompt: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly_qwen_prospect_research_prompt.md`
- Reviewed run snapshot prompt: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-28/nightly_run_prompt.md`
- Prior reviewer report that requested the canonical patch: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/reviews/2026-05-28_t_14a437a2_source_unavailable_report_fix_review.md`
- Deliverable index: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/KANBAN_DELIVERABLE_INDEX.md`

## Acceptance checks

| Check | Result | Evidence |
|---|---:|---|
| Launcher reads canonical prompt | PASS | `scripts/run_nightly_qwen_prospect_research.sh` line 5 sets `PROMPT="$REPO/docs/nightly_qwen_prospect_research_prompt.md"`, and line 38 passes `$(cat "$PROMPT")` into `hermes -p qwen-local chat`. |
| Canonical prompt includes browser fallback before halting | PASS | `docs/nightly_qwen_prospect_research_prompt.md` lines 139-143 now require a source failure report, immediate browser-based fallback testing, continued research if browser fallback succeeds, `BROWSER_FALLBACK_RESUMED` status update within 2 minutes, and stopping only if browser fallback also fails. |
| Canonical prompt includes supersede protocol | PASS | Canonical prompt line 143 requires any `source_unavailable_report.md` to be clearly marked superseded when final prospect count is greater than zero, and line 151 repeats the run-later-continued/superseded requirement. |
| Patch matches reviewed run snapshot protocol | PASS | `docs/nightly-lead-research/runs/2026-05-28/nightly_run_prompt.md` lines 139-151 contain the same browser-fallback and supersede logic as the canonical prompt lines 139-151. |
| Old single-path halt language removed from canonical prompt | PASS | Local count check returned `0` matches for the old preflight halt phrase and `0` matches for the old Gate 1 halt phrase; the canonical prompt now counts `browser_fallback: 4`, `BROWSER_FALLBACK_RESUMED: 1`, `superseded: 2`, and `ONLY THEN stop: 1`. |
| Deliverable-index row/comment verified | PASS | `docs/KANBAN_DELIVERABLE_INDEX.md` already has a top row for `t_f8263eab` with the canonical prompt deliverable, launcher verification, safety limits, and next action. This reviewer task adds its own index row above it. |
| No rerun or live/external action occurred | PASS | Review actions were limited to `read_file`, `search_files`, local `git status`/text-count checks, and writing this review/index entry. I did not run `scripts/run_nightly_qwen_prospect_research.sh`, did not invoke Qwen/Ollama, and did not perform outreach, CRM/HighLevel/Supabase/Clio mutation, workflow activation/enrollment/testing, LinkedIn/social/public action, prospect contact, or nightly rerun. |

## Review notes

The previous review (`t_59f7b92d`) found that the 2026-05-28 run snapshot had been repaired but the scheduled launcher still targeted the canonical prompt. This patch resolves that future-run durability issue: the canonical prompt now tells the nightly agent to separate live-source access from local RAG/context, write an explicit source failure report if web/search tools fail, immediately test browser fallback, continue if browser fallback works, mark the report `BROWSER_FALLBACK_RESUMED` within 2 minutes when resuming, and mark any report superseded at completion if prospects were produced.

The patch does not authorize any prospect expansion, outreach, HighLevel/Supabase/Clio sync, workflow trigger tags, LinkedIn/social action, or public/client-facing use. It is a local prompt-safety improvement only.

## Next action

Use the canonical prompt in the next scheduled nightly run. If the next run encounters web/search extraction failure, reviewer should verify that the run either uses the browser-fallback/supersede path correctly or halts only after browser fallback also fails.
