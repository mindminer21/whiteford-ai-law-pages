# Source Unavailable Report — 2026-05-08 Nightly Research

## Blockers

| # | Tool | Failure | Remediation Command |
|--|--|--|-------------------|
| 1 | web_search | "Payment Required: Insufficient credits" on firecrawl.dev | Upgrade at https://firecrawl.dev/pricing |
| 2 | web_extract | "Payment Required: Insufficient credits" on firecrawl.dev | Upgrade at https://firecrawl.dev/pricing |
| 3 | qmd status/status | better-sqlite3 ABI mismatch (v25/141 vs compiled 137) | `PATH="$HOME/.nvm/versions/node/v24.15.0/bin:$PATH" qmd status` or `npm rebuild better-sqlite3` |
| 4 | business_dev_rag | Index not found at `business_dev_index.sqlite` | `python3 ~/.hermes/knowledge/business-development/build_index.py` |

## Gates Failed

- **Gate 1 (Live-source extraction): FAILED** — No live-source extraction possible. All material facts require live extraction per prompt section "**Source Validation Hard Gates added after 2026-05-06 failures**."

## Remediation Checklist

1. [ ] Replenish firecrawl.dev credits (visit https://firecrawl.dev/pricing or upgrade plan)
2. [ ] Verify web_search works again (test search for "AI startup 2026")
3. [ ] Verify web_extract works again (test extract on https://example.com)
4. [ ] Rebuild qmd better-sqlite3 or switch to Node v24: `PATH="$HOME/.nvm/versions/node/v24.15.0/bin:$PATH" qmd status`
5. [ ] Build business_dev_rag index: `python3 ~/.hermes/knowledge/business-development/build_index.py`
6. [ ] Re-run nightly research task t_05c3fc5f or create new task
