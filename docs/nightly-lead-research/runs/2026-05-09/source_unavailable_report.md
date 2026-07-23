# Source Availability Report — 2026-05-09 Nightly Run

## Status: BLOCKED — no live-source extraction possible

All material claims for any prospect require at least two independently accessible public URLs per Gate 1. Neither `web_search` nor `web_extract` succeeded on any attempt.

## Failed tool calls

| Tool | Failure | Attempted targets |
|---|---|---|
| `web_search` | Payment Required: Insufficient credits (firecrawl.dev) | 3 attempts (Colorado AI startup, AI robotics computer vision, Denver tech funding) |
| `web_extract` | Payment Required: Insufficient credits (firecrawl.dev) | 2 attempts (crunchbase.com/company profiles, techcrunch.com, whiteford.com/personal page, denverbusinessjournal.com) |
| `curl` (HTTP probe) | Mixed — whitefordip.com domain unresolved; whiteford.com returned 200; LinkedIn returned 999; Crunchbase denied (403) | Basic connectivity check only; did not yield prospect data |

## Impact on prospect staging

Gate 1 (live-source extraction required) is not satisfied. No prospects were staged.

What could be sourced if / when web access is restored:

| Lane | Intended search | Verification needed |
|---|---|---|
| AI Patent | YC / Series B/C startups with AI/ML proprietary tech and patent filings | domain verification, leadership page, USPTO/search, funding page |
| AI Compliance | Colorado AI Act exposure companies, enterprise AI deployment with governance gaps | Colorado regulatory pages, official website, public job postings |
| Tech GC | Growth-stage tech without in-house GC | company website, about/team page, Crunchbase or similar |
| M&A Readiness | VC-backed 5+ year companies with aging funds, founder succession signals | funding age, investor portfolio, press articles |

Required fixes before next prospect run:

1. Configure or renew firecrawl.dev credits for web_search and web_extract.
2. Ensure at least the above four search vectors are covered by restored search access.
3. Once search is available, validate each candidate against Gates 2-7 before staging.

## Suppression / compliance posture

- `ops:no-auto-send` applies to all researched/imported prospects (always).
- No workflow trigger tags were created.
- No outreach was sent.
- No live CRM writes (GHL or Supabase) were attempted.
- No LinkedIn actions were taken.

## Recommended next action

Jeff: restore web search capability (firecrawl credits) and re-approve this nightly run. The run will then discover 1-3 high-fit prospects across the four lanes, score each against the `lead_magnet_fit_rubric_and_packet_schema`, and stage them as `research_only` with full evidence rows pending lead-magnet opt-in or Jeff's exact written approval.
