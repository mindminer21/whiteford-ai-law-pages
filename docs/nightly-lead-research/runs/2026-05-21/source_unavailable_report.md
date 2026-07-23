# Source Availability Report — 2026-05-21 Nightly Run

## Preflight: Live-Source Tools

| Tool | Status | Error / Details |
|------|--------|-----------------|
| web_search (smoke test: "example.com") | FAILED | Firecrawl credits exhausted — "Payment Required: Failed to search. Insufficient credits." |
| web_extract (smoke test: https://example.com) | FAILED | Firecrawl credits exhausted — "Payment Required: Failed to scrape. Insufficient credits." |

**Gate 1 Result: FAILED — live-source extraction unavailable.**

No prospect discovery, scoring, enrichment, staging, or outreach drafting may occur until live-source tools recover.

## Preflight: Local Context / RAG

| Resource | Availability | Notes |
|----------|-------------|-------|
| Business-development RAG corpus (`/Users/jeff/.hermes/knowledge/business-development/`) | AVAILABLE | Index SQLite present; available for internal strategy/rubric support. |
| QMD collections (`whiteford-ai-law-pages`, `business-development-books`) | AVAILABLE | Base repo and docs are present for rubric reference. |
| Local growth OS SQLite | AVAILABLE | `/Users/jeff/.openclaw/projects/mountain-west-growth-os/data/growth-os.sqlite` is accessible. |
| Context files (rubric, lane definitions, opt-in strategy, LinkedIn strategy) | READ | All required docs loaded successfully. |

**Local RAG/context: AVAILABLE — but this does NOT satisfy Gate 1.**
QMD and business-development RAG may inform educational framing and scoring rubrics. They cannot validate prospect facts, replace live-source URLs, or override a live-source failure. Every material fact requires a live-accessed public URL.

## Consequences (per Gate 1 rules)

1. **No prospect discovery** — no new companies researched or staged.
2. **No enrichment** — no contact verification, LinkedIn validation, or domain canonicalization performed.
3. **No scoring** — no lane classification, fit scores, urgency, or value-potential scores calculated for new prospects.
4. **No outreach drafting** — no email drafts, LinkedIn awareness post drafts, or partner/referral vectors created.
5. **No Growth OS writes** — no prospects, contacts, opportunities, evidence, drafts, or approval_items created.
6. **No live CRM writes** — zero HighLevel, Supabase, Apollo.io, or Clio actions.

## Required Remediation Before Next Run

1. **Resolve Firecrawl credit exhaustion:**
   - Visit https://firecrawl.dev/pricing to upgrade credits.
   - Or lower the request limit / switch to an alternative search/extract provider.
   - On the next run, re-run the smoke tests against `https://example.com` before proceeding.

2. **Verify Ollama connectivity** (if the cron run will use the local model):
   - `curl -fsS http://localhost:11434/api/tags` should succeed.
   - Confirm `qwen3.6:35b-a3b` model is loaded.

3. **Re-run the nightly agent after credits are restored.**

## Run Summary

| Metric | Value |
|--------|-------|
| Run date | 2026-05-21 |
| New companies researched | 0 |
| New contacts researched | 0 |
| New evidence records | 0 |
| New outreach drafts | 0 |
| Approval items created | 0 |
| Growth OS records written | 0 |
| Live CRM writes | 0 |
| External outreach | 0 |
| Workflow activation | 0 |
| Prospects staged | 0 |
