# Source-Unavailability Report — 2026-05-11

## Run Label
2026-05-11 nightly prospective research run

## Gate 1 Failure Details

### Tool 1: web_search (Firecrawl)
- **Status:** FAILED
- **Error:** "Payment Required: Failed to search. Insufficient credits to perform this request. For more credits, you can upgrade your plan at https://firecrawl.dev/pricing or try changing the request limit to a lower value."
- **Impact:** No web search queries could be executed for prospect discovery.
- **Attempted queries:** None (stopped after first failure)

### Tool 2: web_extract (Firecrawl)
- **Status:** FAILED
- **Error:** "Payment Required: Failed to scrape. Insufficient credits to perform this request. For more credits, you can upgrade your plan at https://firecrawl.dev/pricing or try changing the request limit to a lower value."
- **Impact:** No page extraction was possible — including the preflight smoke test on example.com.

### Clarification: Live-Source vs. Local-RAG
Per the preflight requirements, these are two separate checks and must not be collapsed:

| Check | Result | Details |
|---|---|---|
| **Live-source tools** (web_search + web_extract) | FAIL | Both unavailable due to credit exhaustion. |
| **Local context / QMD / business-dev corpus** | OK | Available and reachable. Cannot satisfy Gate 1. |

This means:
- Strategy guidance, rubric context, and educational framing from QMD and the business-development corpus ARE available.
- Live-source verification for prospect discovery, company/contact fact-checking, and evidence capture IS NOT available.

### What Happened as a Result
Per the preflight rules: "If either fails for credits, quota, auth, network, or extraction errors, Gate 1 is failed; stop prospect staging."

No prospects were researched. No companies were searched. No contact validation was attempted. All research gates (2-7) were not reached because no prospects were discovered in the first place.

## Remediation Required
1. **Immediate:** Resolve Firecrawl credit/quota. Upgrade plan or add credits at https://firecrawl.dev/pricing, or contact the provider for a credit top-up.
2. **Alternative:** Configure a secondary web_search/provider if Firecrawl credits remain constrained by plan limits.
3. **After fix:** Confirm Gate 1 passes (both tools return data on a smoke test) before running prospect discovery.

## Artifact Status
- `prospect_candidates.json`: Empty array [] (Gate 1 failure, no discoveries)
- `digest.md`: Written with this summary
- `source_unavailable_report.md`: This file

## Safety Reminder
Per the hard gates:
- No prospects were staged.
- No workflow trigger tags were created.
- `ops:no-auto-send` remained on the run state.
- No external sends, CRM writes, or LinkedIn actions occurred.
