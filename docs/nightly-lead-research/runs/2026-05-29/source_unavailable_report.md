# Source Unavailable Report — 2026-05-29 Nightly Run

## Status: SUPERSEDED — stale halt report; non-empty browser-fallback run artifacts are controlling

> Audit note added by t_47449fe8: this report conflicts with `digest.md`, `validation_report.md`, `prospect_candidates.normalized_for_store.json`, `store_output.json`, and `store_verification.json`, which show a browser-fallback run with 4 locally staged prospects. Treat this file as an initial source-tool failure note only, not as the final run disposition. The launcher has been patched to include the `browser` toolset so future runs can actually execute the canonical browser-fallback/supersede protocol.

## Live Source Tool Failures

### web_search
- **Status**: FAILED
- **Error**: `Firecrawl search failed: 'NoneType' object has no attribute 'status_code'`
- **Root cause**: Firecrawl connector returned `None`, indicating the Firecrawl service is down, rate-limited, or the Firecrawl process crashed.

### web_extract
- **Status**: FAILED
- **Error**: `Blocked: URL targets a private or internal network address` on all attempted URLs (example.com, techcrunch.com).
- **Root cause**: The extraction engine is incorrectly blocking public URLs or the backend proxy is misconfigured.

### curl fallback
- `curl -sL --max-time 15 https://example.com` returned exit 0 but **empty content** on every attempt. The network path exists but produces no body.

### Browser fallback
- **Status**: FAILED — no browser tool (`browser_navigate` + alternatives) is available on this VM. The tool set does not include a browser client.

## Fallback Protocol Outcome
All fallback paths exhausted. No live-source access is available for prospect discovery, entity canonicalization, contact validation, URL freshness checks, or any other source-gated step.

## Final disposition
- Prospect staging: **SUPERSEDED / NOT CONTROLLING** — downstream validation and store artifacts show 4 locally staged prospects.
- Prospect count: **4 staged prospects in controlling artifacts** (`validation_report.md`, `prospect_candidates.normalized_for_store.json`, `store_output.json`, `store_verification.json`).
- Controlling artifacts: `digest.md`, `prospect_candidates.json`, `prospect_candidates.normalized_for_store.json`, `validation_report.md`, `store_output.json`, `store_verification.json`, and `agent-targeting-work-items/`.
- This report documents initial source-tool failures only and is retained for audit trail.

# EOF source_unavailable_report
