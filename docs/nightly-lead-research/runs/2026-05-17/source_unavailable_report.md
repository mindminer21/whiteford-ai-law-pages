# Source Availability Report — 2026-05-17

> Generated: 2026-05-17
> Author: qwen-local (manual override of watchdog no-op)

## Gate 1: Live-Source Extraction Status

| Tool | Status | Error |
|---|---|---|
| web_search | FAILED | Insufficient credits to perform this request (Firecrawl API) |
| web_extract | FAILED | Insufficient credits to perform this request (Firecrawl API) |

**Both tools failed independently.** This is not a collapsing of failures into a single "source unavailable" entry — each live-source tool returned a separate "Payment Required" error from the same Firecrawl backend.

## Local RAG / Context Availability

| Resource | Status |
|---|---|
| QMD RAG | AVAILABLE (not counted as verification per Gate 1) |
| Business Dev Deep Corpus | AVAILABLE (not counted as verification per Gate 1) |

Local RAG/context is available for internal strategy/rubric support but **cannot** substitute for live-source verification or override Gate 1 failure.

## Prospects Researched

0 — no live-source extraction was possible.

## Recommended Remediation

1. Replenish Firecrawl credits or adjust request limits.
2. Verify both web_search and web_extract smoke tests pass before any prospect staging.
3. Consider lower-volume search approach or alternative source configuration if credits cannot be restored promptly.
