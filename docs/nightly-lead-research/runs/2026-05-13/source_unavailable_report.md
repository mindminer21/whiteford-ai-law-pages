# Source Unavailability Report — 2026-05-13

## Preflight Status (as of 2026-05-13)

### Gate 1: Live-Source Extraction — FAILED

| Tool | Result | Reason |
|---|---|---|
| `web_search` (smoke test) | FAILED | Firecrawl API returned "Payment Required: Insufficient credits". No live search available. |
| `web_extract` (smoke test of https://example.com) | FAILED | Firecrawl API returned "Payment Required: Insufficient credits". No live scraping available. |

**Consequence:** All live-source-dependent gates (Gate 2: domain/entity canonicalization, Gate 3: URL freshness, Gate 4: contact validation, Gate 5: LinkedIn URL hygiene, Gate 6: Mountain West/geographic support) cannot be satisfied. Prospect staging is halted.

### Local RAG / Context Availability — PASSED

| Resource | Status | Notes |
|---|---|---|
| qmd CLI (`/Users/jeff/.local/bin/qmd`) | Available | CLI binary present on PATH. |
| Business-development corpus index | Available | Found at `/Users/jeff/.hermes/knowledge/business-development/business_dev_index.sqlite`. Queryable via `search_business_dev.py` with `HOME=/Users/jeff`. |
| Required context files (7 of 9) | READ | All read successfully from the working directory docs/ folder. |
| `highlevel_ai_authority_funnel_map.md` | NOT PRESENT | File not found in working directory (non-blocking). |
| `qwen_nightly_prospecting_agent_plan.md` | NOT READ | File not found at expected path (non-blocking). |

**Key distinction:** Local RAG/context (QMD, business-development corpus, stored docs) is available for internal strategy and rubric support. It does NOT substitute for live-source verification under Gate 1.

## What Was NOT Done (Because Gate 1 Failed)

- No prospect discovery or company research.
- No live-source company/contact verification.
- No domain/entity canonicalization.
- No outreach vector drafting.
- No LinkedIn awareness post drafting.
- No CRM/Supabase/HighLevel writes.

## Remediation Required Before Next Run

1. **Firecrawl credits:** Upgrade the Firecrawl plan or lower the request limit per call to avoid credit exhaustion. The daily quota was fully consumed by prior runs.
2. **Alternative search tools:** Consider configuring an alternative web-search backend (e.g., Google custom search API) as a fallback for prospect discovery.
3. **Rate limiting:** Stagger nightly runs to avoid exhausting credits from multiple agents in the same window.
