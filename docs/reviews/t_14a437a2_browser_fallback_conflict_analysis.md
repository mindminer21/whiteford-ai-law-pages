# Conflict Analysis: Stale source_unavailable_report vs Browser-Fallback Success

**Task:** t_14a437a2  
**Run affected:** 2026-05-28 (kanban task t_13611754)  
**Analyzer:** qwen-local  
**Date:** 2026-05-28

---

## Executive Summary

The `source_unavailable_report.md` in the 2026-05-28 run claims "STAGE HALTED — 0 prospects" at its status line. However, the digest (01:41), normalized payload (02:35), validation_report (02:35), and store_verification all confirm **3 valid prospects were successfully staged** via browser-fallback research. The stale halt report was never updated or superseded, creating a direct contradiction within the same run directory.

---

## Root Cause

The nightly run prompt (`nightly_run_prompt.md`) contains a **single-path halt instruction** in two locations:

**Preflight section (line ~139, now patched):**
> "If either fails for credits, quota, auth, network, or extraction errors, Gate 1 is failed; stop prospect staging and write only `source_unavailable_report.md` plus empty/no-op packet artifacts."

**Gate 1 section (line ~146, now patched):**
> "If live web extraction/search is unavailable, stop prospect staging and write only a `source_unavailable_report.md`..."

Both instructions tell the agent to halt and write the stall report with no exception for later recovery. The agent faithfully executed this at ~01:30 when Firecrawl credits were exhausted (HTTP 402).

However, the agent later **independently recovered** via browser-based navigation:
- `browser_navigate` to TechCrunch (verified working — page loaded, Cognition article confirmed)
- `browser_navigate` to company websites (SimplexAI, Triomics)
- Direct source scraping produced valid prospect data

The prompt had **no instruction** for:
1. What to do when browser fallback rescues the run after a stale halt report is already written
2. How to annotate/ supersede the stale halt report at run completion
3. How to detect and resolve the stale-report-vs-non-empty-digest conflict

---

## Evidence Timeline

| Time | Event |
|---|---|
| ~01:30 | Agent runs web_search smoke test → HTTP 402 (insufficient credits) |
| ~01:30 | Agent writes `source_unavailable_report.md` with status "STAGE HALTED" |
| ~01:30 | Agent reads config files (11 files) |
| ~01:33 | Prompt shows "search example.com FAILED" and "fetch example.com error" |
| 01:33-01:41 | Agent uses browser-based fallback → identifies 3 prospects (Cognition Labs, SimplexAI, Triomics) |
| 01:41 | `digest.md` generated: "Source status: browser-based direct scraping" |
| 01:41 | `prospect_candidates.json` generated: 3 prospects |
| 02:34 | Validation + normalization run |
| 02:35 | `validation_report.md` confirms: 3 prospects staged successfully |
| 02:35 | Store dry run + apply: `{approval_items: 3, contacts: 4, prospects: 3, source_evidence: 12, ...}` |
| 02:35 | **`source_unavailable_report.md` STILL SAYS "STAGE HALTED"** — stale, contradictory |

---

## Historical Context

This is the **first occurrence** of this specific conflict pattern. Historical scan of all runs:

| Date | has_report | prospect_count | digest_status | conflict? |
|---|---|---|---|---|
| 2026-05-08 | Yes | 0 | halted | no (accurate) |
| 2026-05-10 | Yes | 0 | halted | no |
| 2026-05-11 | Yes | 0 | halted | no |
| ... (multiple similar) | Yes | 0 | halted | no |
| 2026-05-27 | Yes | 0 | halted/no-op | no |
| **2026-05-28** | **Yes** | **3** | **browser_fallback** | **YES — FIRST TIME** |

Prior runs with `source_unavailable_report.md` all had 0 prospects (the report was accurate). On 2026-05-28, browser fallback succeeded — making the early halt report stale.

---

## Fix Applied

### 1. Annotated the stale report
- Updated the 2026-05-28 `source_unavailable_report.md` status line to:
  `**SUPERSEDED — Browser fallback rescued the run**`
- Added a NOTE section clarifying the timeline and cross-referencing this analysis document

### 2. Patched the nightly prompt (nightly_run_prompt.md)
Two patches applied:

**Preflight section (line ~139):** Replaced the single-path "halt and write report" instruction with a multi-step fallback protocol:
- a. Write the report documenting which tools failed
- b. Immediately test browser-fallback — if it succeeds, CONTINUE (not halted)
- c. Only stop if browser fallback ALSO fails
- d. At run end, if report exists and prospect_count > 0, the report's status MUST be annotated as superseded

**Gate 1 section (line ~146-150):** Replaced standalone halt instruction with reference to preflight section, plus explicit requirement to annotate superseded reports:
- "If a `source_unavailable_report.md` was written but the run later continued (via browser fallback or credits restored), the report's status line MUST be updated to mark it superseded"
- "A stale halt report co-existing with a non-empty digest is a conflict."

---

## Impact Assessment

### Data integrity
- **No data was lost or corrupted.** The 3 prospects were properly staged and verified.
- The stale report was misleading only in its status line ("STAGE HALTED") and "No External Action Summary" (claimed 0; actual = 3).

### Operational risk
- **Low.** The prompt's safety guarantees were maintained (no live CRM writes, no outreach, no workflow actions).
- The only risk was confusion for human reviewers parsing run directories programmatically or manually.

### Pattern prevention
- Future runs will either: (a) write the halt report and stay halted (accurate), or (b) annotate the halt report as superseded (conflict-free).
- The digest validation step (when it runs) can also check for this conflict programmatically.

---

## Recommendations

1. **Monitor future runs for this pattern.** If browser tools become the default fallback, consider renaming or removing `source_unavailable_report.md` entirely — or making it a separate artifact (e.g., `preflight_browser_test_failure.md`) that is never confused with the run verdict.

2. **Add a post-run sanity check** to the orchestration layer: if `source_unavailable_report.md` exists AND `prospect_candidates.json` exists with `prospect_count > 0`, flag as a conflict to review.

3. **Consider Firecrawl credit monitoring.** The root trigger was credit exhaustion. A pre-flight credit check at cron-job creation time (before the agent starts) would prevent the initial stall entirely.

4. **Standardize the superseded annotation format.** The format used above (`**SUPERSEDED — <reason>**` + NOTE paragraph) should become the canonical convention in the prompt going forward.

---

## Files Changed

1. `docs/nightly-lead-research/runs/2026-05-28/source_unavailable_report.md` — annotated as superseded
2. `docs/nightly-lead-research/runs/2026-05-28/nightly_run_prompt.md` — patched preflight + Gate 1 fallback instructions
3. This analysis document

---

*Analysis performed as part of t_14a437a2. Next action: review patches, test prompt in next nightly run.*
