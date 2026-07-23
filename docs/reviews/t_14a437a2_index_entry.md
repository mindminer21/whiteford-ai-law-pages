# Kanban Index Entry: t_14a437a2

Append the following block to the end of `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/KANBAN_DELIVERABLE_INDEX.md` when Jeff merges this entry:

```
## t_14a437a2 — Resolve t_13611754 run conflict: stale source_unavailable_report vs browser-fallback staging

Deliverable: /Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/reviews/t_14a437a2_browser_fallback_conflict_analysis.md
Stale report (annotated): /Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-28/source_unavailable_report.md
Prompt fix (preflight): /Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-28/nightly_run_prompt.md (line ~139)
Prompt fix (Gate 1): /Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-28/nightly_run_prompt.md (line ~150)
Summary: Identified the root cause of the stale source_unavailable_report co-existing with a 3-prospect digest in the 2026-05-28 nightly run — the prompt had a single-path halt instruction with no browser-fallback recovery path. Annotated the stale report as SUPERSEDED, patched the nightly prompt to require early browser-fallback testing and mandatory supersede annotation at run completion, and produced a conflict analysis with timeline and historical scan across all prior runs. First-time occurrence of this pattern.
Next action: Jeff should verify the prompt patches and test the updated nightly_run_prompt in the next nightly run to confirm no stale-halt conflict reappears. Also consider Firecrawl credit monitoring at cron-job creation to prevent the initial stall entirely.
```
