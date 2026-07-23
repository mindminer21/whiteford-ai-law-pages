# Audit: recurring stale source_unavailable_report after 2026-05-29 nightly Qwen run

Task: `t_47449fe8`
Date: 2026-05-29 22:38:41 MDT
Scope: internal/local file and launcher audit only. No nightly rerun, outreach, prospect contact, HighLevel/Supabase/Clio/live CRM mutation, workflow activation/enrollment/testing, LinkedIn/social/public action, or external/client-facing change was performed.

## Verdict

Root cause found and safe local patch applied.

The 2026-05-28 canonical prompt patch did reach the 2026-05-29 nightly run: the run snapshot and Qwen log both contain the browser-fallback/supersede protocol. The recurrence happened because the scheduled launcher invoked Hermes with `--toolsets web,search,terminal,file,skills,session_search`, omitting the `browser` toolset. The prompt told Qwen to use `browser_navigate`, but the launched runtime did not expose browser tools, so `source_unavailable_report.md` recorded browser fallback as unavailable and left a HALTED/0 final disposition even though later run artifacts showed browser-sourced prospects.

I patched the launcher to include `browser` in the qwen-local toolset list, and I marked the 2026-05-29 stale source report as superseded/non-controlling so it no longer conflicts with the digest, validation, normalized payload, store output, and local Growth OS staging artifacts.

## Evidence reviewed

| Evidence | Finding |
|---|---|
| `scripts/run_nightly_qwen_prospect_research.sh` | Launcher reads the canonical prompt, but prior to this audit line 37 exposed only `web,search,terminal,file,skills,session_search`; `browser` was absent. |
| `docs/nightly_qwen_prospect_research_prompt.md` | Lines 139-151 include the 2026-05-28 browser-fallback/supersede protocol. The canonical prompt was not the missing piece. |
| `docs/nightly-lead-research/runs/2026-05-29/nightly_run_prompt.md` | Run snapshot also includes the same browser-fallback/supersede language, proving the 2026-05-29 run received the patched prompt. |
| `docs/nightly-lead-research/runs/2026-05-29/hermes_qwen_nightly.log` | Lines 214-231 and 244-251 show the launched prompt included the browser fallback and supersede requirements. |
| `docs/nightly-lead-research/runs/2026-05-29/source_unavailable_report.md` | Original report said `HALTED — no viable source path`, browser fallback failed because no browser tool was available, and final disposition claimed STOPPED/0. |
| `docs/nightly-lead-research/runs/2026-05-29/digest.md` | Digest says sources used were TechCrunch homepage/categories and direct article reads, with `web_search`/`web_extract` blocked; it lists non-empty prospect outputs. |
| `docs/nightly-lead-research/runs/2026-05-29/validation_report.md` | Validation staged 4 sufficient candidates: Glean, Anthropic, H1, and Asana/StackAI. |
| `hermes -p qwen-local tools list` | The `browser` toolset is enabled for the qwen-local profile, so adding it to the launcher is supported by the runtime. |

## Patch applied

### 1. Launcher runtime path

File: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/scripts/run_nightly_qwen_prospect_research.sh`

Changed the Hermes invocation from:

```bash
--toolsets web,search,terminal,file,skills,session_search
```

to:

```bash
--toolsets web,search,browser,terminal,file,skills,session_search
```

This is the narrowest durable fix: the canonical prompt already requires browser fallback, and the qwen-local profile already has `browser` enabled. The missing runtime capability is now present for future scheduled runs.

### 2. 2026-05-29 stale report annotation

File: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-29/source_unavailable_report.md`

Changed the top status from HALTED/0 to superseded/non-controlling and rewrote the final disposition to point to the controlling non-empty artifacts. This mirrors the 2026-05-28 repair pattern while preserving the original source-tool failure report as audit trail.

## Root-cause chain

1. Firecrawl-backed `web_search`/`web_extract` failed during the 2026-05-29 run.
2. The patched canonical prompt correctly instructed the agent to try browser fallback and to supersede any source-unavailable report if final prospect count was greater than zero.
3. The scheduled launcher did not expose browser tools to the qwen-local Hermes session.
4. The agent wrote a source report claiming browser fallback was unavailable.
5. Separate digest/JSON/validation/store artifacts nevertheless showed a non-empty browser-sourced run with 4 locally staged prospects.
6. Because the report was never superseded at the end, reviewers saw the same stale HALTED/0 conflict as on 2026-05-28.

## Verification performed

- Confirmed `hermes -p qwen-local tools list` reports `browser` as enabled.
- Ran `bash -n scripts/run_nightly_qwen_prospect_research.sh` after patch.
- Searched the launcher/prompt/run artifacts for browser fallback and source report references.
- Read the 2026-05-29 digest and validation report to confirm non-empty artifacts and 4 staged prospects.
- No nightly rerun was performed.

## Remaining limits and next action

- The launcher is now capable of browser fallback, but the next scheduled run still needs normal review to verify the agent actually marks any source report as `BROWSER_FALLBACK_RESUMED`/superseded when browser fallback succeeds.
- Source-currentness for the 2026-05-29 prospects remains held; the parent review's no-send/no-trigger-tag/approval-required/conflicts-required/suppression-not-cleared limits still apply.
- No external/live system action is authorized by this audit.
