# Preflight Report — 2026-05-18 Nightly Qwen Prospect Research

Run label: 2026-05-18
Run directory: docs/nightly-lead-research/runs/2026-05-18

## Live-Source Tool Status

| Tool | Status | Details |
|------|--------|---------|
| web_search (Firecrawl) | FAILED 3/3 attempts | "Payment Required: Insufficient credits to perform this request." All 3 queries (Colorado AI startup funding, Mountain West tech company Series B funding, AI compliance Colorado SaaS hiring) failed identically. |
| web_extract | NOT tested | Not attempted because web_search is the discovery layer; cannot extract without first discovering URLs via search. |
| Gate 1 Verdict | FAILED | Live-source extraction unavailable. No prospect discovery or staging may occur. |

## Local Context/RAG Status (separate from live-source)

| Source | Status |
|--------|--------|
| QMD collections | Available (context files verified at runtime) |
| business-development corpus | Available (index file present per AGENTS.md) |
| Context files read | All 9 required files + funnel_map and plan: verified and loaded |
| QMD BD RAG as prospect verification | NOT applicable — RAG cannot validate current company/contact facts or override a live-source failure |

## Key distinction

Live-source failure and local RAG availability are separate:
- Live-source tools (web_search, web_extract) are unavailable this run.
- Local context/RAG (QMD, business-development corpus) IS available but was NOT used for prospect discovery, scoring, or evidence because by hard rule it cannot substitute for live sources.

## Decision

Gate 1 FAILED. Per prompt Section "Source Validation Hard Gates": "If live web extraction/search is unavailable, stop prospect staging and write only source_unavailable_report.md explaining which source tools failed."

No prospects researched. No contacts researched. No outreach drafts created. No LinkedIn post drafts created. No CRM staging. No Growth OS writes.

No-op candidate JSON and digest written below to maintain run directory structure.
