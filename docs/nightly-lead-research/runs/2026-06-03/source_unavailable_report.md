# Source Availability Report — 2026-06-03

## Status: SUPERSEDED

## What failed and why

- `web_search`: FAILED — Firecrawl returned "Payment Required: Insufficient credits."
- `web_extract`: FAILED — Firecrawl returned "Payment Required: Insufficient credits."

## Fallback validation

- `curl` HTTP 200 to example.com confirms basic connectivity.
- `curl` to external sites yields varied responses (some 200, some 301/403) — usable for public site extraction where curl is not blocked.
- Browser navigation to TechCrunch article URLs confirmed working for prospect extraction.

## Research method

- Prospects sourced via TechCrunch homepage crawl (curl) to extract article URLs, then browser navigation to extract article content.
- Growth OS local data and session_search used as secondary context for company verification.

## Final status: SUPERSEDED — BROWSER_FALLBACK_RESUMED via curl + browser extraction

- Final prospect count: 3
- Artifacts: prospect_candidates.json (3 prospects), digest.md
- All 3 prospects verified against live first-party domains (coralogix.com, layupparts.com, cyera.com)
- All prospects classified under consent gating: ops:no-auto-send=true, no workflow trigger tags
