# Source Unavailable Report — 2026-05-16

**Run label:** 2026-05-16
**Run time:** 2026-05-16
**Agent:** Whiteford/Schell IP local Qwen prospect research agent (qwen3.6:35b-a3b)

## Gate 1: Live-source extraction — FAILED

| Tool | Status | Error |
|---|---|---|
| web_search (Firecrawl) | FAILED | Payment Required: Insufficient credits |
| web_extract (Firecrawl) | FAILED | Payment Required: Insufficient credits |

**Impact:** Live-source verification is unavailable for this run. No new prospects can be researched, scored, staged, or drafted. All prospect claims require a current, independently accessible public URL accessed through a live source tool during the current session. Model memory, old notes, QMD results, and the business-development corpus cannot substitute for live-source evidence.

## Local context / RAG — AVAILABLE (informational only)

| Resource | Status |
|---|---|
| Business-development corpus SQLite | Available at `~/.hermes/knowledge/business-development/business_dev_index.sqlite` |
| QMD collections (whiteford-ai-law-pages) | Available |
| QMD collections (business-development-books) | Available |

**Note:** Local RAG may inform educational framing and rubric recall. It cannot validate company facts, contact information, domain canonicalization, or public disclosures. Local RAG availability does not cure a Gate 1 failure.

## What is required to resume prospect staging

1. **Restore live-source access.** Either:
   - Upgrade the Firecrawl (or equivalent) plan with sufficient credits.
   - Configure an alternative web_search and web_extract tool with working credentials.
   - Verify that the current provider has not exhausted its quota.
2. **Re-run the preflight smoke test** with `https://example.com` after restoring access.
3. **Begin prospect research** using the validated tools, following all seven hard gates in the nightly prompt.

## Prospects held during this failure

**None researched or staged.** All four prospect lanes (AI Patent, AI Compliance, Tech GC, M&A Readiness) remain at zero new prospects for this run.

## Additional notes

- The 2026-05-06 historical failures cited in the prompt (stale URLs, domain/entity ambiguity, fake names, non-person LinkedIn URLs, unsupported Mountain West claims) make live-source verification even more critical. Without it, the risk of repeated errors is unacceptably high.
- The business-development corpus and QMD are safe to use for refining scoring rubrics, outreach framing, and lead-magnet strategy during the pause. They should not be invoked as prospect evidence.
- This report should be replaced with a full prospect research digest once live-source access is restored.
