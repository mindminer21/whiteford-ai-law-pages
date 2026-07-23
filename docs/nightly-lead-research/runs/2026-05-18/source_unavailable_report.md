# Source Unavailability Report — 2026-05-18

## Tool Failure Summary

| Tool | Status | Error |
|---|---|---|
| `web_search` | FAILED | "Payment Required: Failed to search. Insufficient credits to perform this request" from Firecrawl API |
| `web_extract` | FAILED | "Payment Required: Failed to scrape. Insufficient credits to perform this request" from Firecrawl API |

## Live vs RAG Status

Both **live-source tools** (web_search and web_extract) are independently down. This is not a RAG issue — the Firecrawl API is returning a payment-required response for both search and extraction endpoints.

The business-development RAG corpus and QMD are available for internal strategy only and cannot substitute for live-source verification of company/contact facts.

## Consecutive Failure History

This is night 7 in a row of Gate 1 failure (2026-05-12 through 2026-05-18). Every night since then has produced the same no-op pattern. No prospects have been discovered since the last successful run.

## Required Remediation

1. Restore Firecrawl API credits (upgrade plan at https://firecrawl.dev/pricing or replenish credits).
2. Alternatively, reconfigure the Hermes web_search/web_extract connector to a tool that has available credits.
3. Re-index business-dev RAG corpus and QMD for local strategy support.
