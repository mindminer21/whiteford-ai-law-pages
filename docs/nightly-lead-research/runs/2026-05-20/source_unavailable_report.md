# Source Unavailability Report — 2026-05-20

## Run Label
2026-05-20 night Qwen prospect research

## Executive Summary
All live-source tools failed due to insufficient Firecrawl credits. No new prospects were discovered, scored, or staged. This is a Gate 1 failure requiring credit replenishment before any prospect discovery can resume.

## Preflight Check Results

### Gate 1: Live-Source Extraction — FAILED

| Tool | Status | Error |
|---|---|---|
| `web_search` (smoke test) | FAILED | Payment Required: Insufficient credits for Firecrawl search |
| `web_extract` (smoke test on example.com) | FAILED | Payment Required: Insufficient credits for Firecrawl extraction |

**Impact:** Cannot discover companies, validate domains, verify contacts, check public sources, or extract any material facts. All prospect staging is halted.

### Local Context / RAG Status — AVAILABLE (for reference only)

| Resource | Status | Scope |
|---|---|---|
| QMD collections (`whiteford-ai-law-pages`, `business-development-books`) | Available | Internal strategy/rubric support only. Cannot validate prospects. |
| Business-development corpus (`business_dev_index.sqlite`) | Available | Synthesis for offer framing only. Cannot validate company/contact facts. |
| Context files (all required docs) | Loaded and reviewed | Scoring rubrics, consent gates, LinkedIn strategy, pipeline spec, ops blueprint |

**Important:** QMD and business-development RAG availability does NOT satisfy Gate 1. They cannot validate company names, domains, contact information, or public facts about prospects. They inform educational framing only.

## Remediation Required

1. **Replenish Firecrawl credits** — Upgrade plan or lower request limits at https://firecrawl.dev/pricing
2. **Verify tool connectivity** after credit restore with additional smoke tests
3. **Resume prospect discovery** only after Gate 1 passes
4. **No prospect staging** should occur until live-source verification is confirmed

## No Prospect Activity This Run

- New companies discovered: 0
- Companies staged: 0
- Contacts staged: 0
- Outreach drafts: 0
- Approval items: 0

## Next Steps

1. Jeff to resolve Firecrawl credit shortage
2. Re-run the nightly agent after credits restored
3. When restored, run a fresh preflight smoke test before any prospect research begins
