# Source Unavailable Report — 2026-06-07 Nightly Run

## Status: BROWSER_FALLBACK_RESUMED

### Live Source Tools

| Tool | Status | Reason |
|------|--------|--------|
| web_search | FAILED | Firecrawl credits exhausted (Payment Required) |
| web_extract | FAILED | Firecrawl credits exhausted (Payment Required) |

### Browser Fallback

| Method | Status |
|--------|--------|
| curl (example.com) | SUCCESS — HTTP 200, full HTML returned |
| curl (TechCrunch AI category) | SUCCESS — HTTP 200, HTML returned |
| curl (company sites) | SUCCESS — verified during research |

### QMD / Business-Development RAG

| Resource | Status |
|----------|--------|
| QMD (qmd CLI) | Used for rubric lookup per standard practice |
| BD corpus | Used for educational framing only |

### Resolution

The `source_unavailable_report.md` with status `BROWSER_FALLBACK_RESUMED` on this line is SUPSEDED as follows:
- Final prospect count: see prospect_candidates.json
- Rescue method: curl-based extraction for all prospect URLs
- Artifacts: prospect_candidates.json, digest.md  
- All source gates passed via curl-based verification
