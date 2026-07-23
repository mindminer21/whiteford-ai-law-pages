# Nightly Lead Research Digest — 2026-05-11

## Run Label
2026-05-11

## Executive Summary
Tonight's run hit a hard Gate 1 failure on live-source tools both early and repeatedly. Both `web_search` (Firecrawl credits exhausted) and `web_extract` (Firecrawl credits exhausted) failed before any prospect discovery could begin. This is NOT a strategy or rubric failure — it's a tool-availability failure. No prospects were researched, scored, or staged. This is the correct behavior per the preflight rules and Gates 1-7. See `source_unavailable_report.md` for full details.

## Status
- New companies researched: 0
- Contacts researched: 0
- Evidence records created: 0
- Outreach drafts created: 0
- Approval items created: 0
- Records written/staged to Growth OS: 0
- CRM writes (GHL/Supabase): 0

## Tool Availability
| Tool | Status | Details |
|---|---|---|
| web_search (Firecrawl) | FAIL | Credit limit reached. No results returned. |
| web_extract (Firecrawl) | FAIL | Credit limit reached. example.com returned empty/error. |
| Direct HTTP curl | OK | Confirmed working for raw text/fetch. Not sufficient for Gate 1 (requires structured extraction). |
| Local QMD | OK | Available for strategy/rubric support. Cannot replace live-source verification (Gate 1 rule). |
| Business-dev corpus | OK | Available for strategy/rubric support. Cannot replace live-source verification. |

## Why Zero Prospects Were Researched
Gate 1 is explicit: "If live web extraction/search is unavailable, stop prospect staging." The two live-source tools used for every material fact in scoring and outreach vectors are both unavailable. Per the rubric, the QMD and business-development corpus can inform educational framing but "cannot name prospects, validate current company/contact facts, satisfy Gate 1, or override a live-source failure."

## Recommended Next Steps
1. Resolve Firecrawl credit/quota issue (upgrade plan or request credit top-up).
2. Re-run the agent after live-source tools are confirmed working.
3. Alternatively, configure an alternative web_search/web_extract provider if Firecrawl credits are the bottleneck.
4. When expansion resumes, revisit the search queries from the nightly plan for:
   - AI patent prospects (AI/ML, robotics, computer vision, medtech, autonomy startups)
   - AI compliance prospects (Colorado/Mountain West companies deploying consequential AI)
   - Tech GC prospects (growth-stage tech companies without full-time GC)
   - M&A readiness prospects (VC-backed companies showing acquisition signals)

## Files Written
- `prospect_candidates.json` — empty array (no candidates due to Gate 1 failure)
- `digest.md` — this file
- `source_unavailable_report.md` — full Gate 1 failure details

## Consent & Safety
- No prospects researched, contacted, or staged.
- No workflow tags applied (none needed).
- No external send. No live CRM write. No LinkedIn action.
- All outreach-drafting gates (Gates 2-7) remain satisfied by default because no prospects were discovered.
