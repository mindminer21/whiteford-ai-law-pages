# Review — LinkedIn Awareness Draft: Lunar Outpost (2026-06-05)

Task: t_bc68a2f0
Reviewer: Hermes reviewer
Tenant: whiteford-mountain-west
Reviewed on: 2026-06-05 07:41:48 MDT

Reviewed draft:
- /Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/growth-os/linkedin-awareness-drafts/2026-06-05/2026-06-05-lunar-outpost-linkedin-awareness-draft.md

Related artifacts checked:
- /Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/src/lib/site.ts
- /Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/src/lib/campaigns.ts
- Local QMD search over `whiteford-ai-law-pages`
- Local business-development corpus search over lead-magnet / diagnostic-scorecard principles
- Read-only direct source checks for cited Lunar Outpost and NASA pages
- Read-only attempted check for `https://learn.schellip.com/ai-patent-strategy-scorecard`

## Verdict

PASS for internal attorney-review-only decision prep, with required constraints before any exact-copy/manual LinkedIn use.

The draft is directionally safe as a private review artifact. It uses Lunar Outpost as a public example for broader physical-AI invention-record education, ties the CTA to the established AI Patent Strategy Scorecard lane, includes no-legal-advice/no-attorney-client/no-comment-on-Lunar-Outpost posture, and repeatedly blocks publishing, live tagging, outreach, automation, workflow enrollment, and CRM/HighLevel/Supabase/Clio mutation.

This review does not approve publishing, scheduling, tagging, commenting, DMs, connection requests, email/SMS, workflow enrollment, trigger tags, CRM/HighLevel/Supabase/Clio mutation, paid amplification, or any other external action.

## Required changes before any public/manual LinkedIn use

1. Use a full approved production CTA URL instead of the bare relative route in the visible post. The candidate URL is likely `https://learn.schellip.com/ai-patent-strategy-scorecard`, but this run could not verify it externally: local `urllib` returned DNS resolution failure, and `web_extract` returned “Blocked: URL targets a private or internal network address.” Jeff should verify the exact URL/UTM/no-UTM posture before any use.
2. Default to a no-tag post. Keep company/person tag candidates only in internal approval notes unless Jeff manually verifies exact LinkedIn handles inside LinkedIn and explicitly approves tagging.
3. Remove bracketed tag-candidate lines from any exact-copy public post view. The bracketed company/contact lines are appropriate for an internal draft packet, not for copy/paste public text.
4. Re-fetch Lunar Outpost and NASA sources on posting day. This review used read-only direct source checks and supports only internal review; it does not create a durable source-currentness claim for future posting.
5. Correct or remove the draft's internal line saying the Kanban task was “verified status: `ready`.” During this review, the task was `running`; a status assertion in a reusable draft will become stale.
6. Confirm conflicts, suppression/opt-out, Clio/prior-touch, named-recipient/no-recipient posture, channel, operator, timing, and rollback before any external use.
7. Keep all Lunar Outpost, NASA, partner, mission, rover, and logo/image usage out of creative unless separately rights-reviewed and approved.

## Source-current spot-check notes

Read-only direct source checks were performed on 2026-06-05. They support the draft as an internal review surface only and must be repeated before external use.

- https://www.lunaroutpost.com/ loaded with HTTP 200 and title “Home | Lunar Outpost.” The first-party page text surfaced Golden, MAPP, and CEO markers.
- https://www.lunaroutpost.com/software loaded with HTTP 200 and title “Software | Lunar Outpost.” The first-party page text surfaced Stargate, Starweave, Spark, AI-driven, MAPP, Golden, and CEO markers.
- https://www.lunaroutpost.com/mapp loaded with HTTP 200 and title “MAPP | Lunar Outpost.” The first-party page text surfaced MAPP and Mobile Autonomous Prospecting Platform markers.
- https://www.lunaroutpost.com/ltv loaded with HTTP 200 and title “Eagle LTV | Lunar Outpost.” The first-party page text surfaced Lunar Terrain Vehicle and NASA markers.
- https://www.lunaroutpost.com/about loaded with HTTP 200 and title “About | Lunar Outpost.” The first-party page text surfaced Justin Cyrus, Founder, CEO, Forrest Meyen, MAPP, Lunar Terrain Vehicle, NASA, and Golden markers.
- https://www.nasa.gov/news-release/nasa-selects-companies-to-advance-moon-mobility-for-artemis-missions/ loaded with HTTP 200 and title “NASA Selects Companies to Advance Moon Mobility for Artemis Missions - NASA.” The page text surfaced NASA and Lunar Terrain Vehicle markers.
- https://learn.schellip.com/ai-patent-strategy-scorecard was not externally verified in this run. Treat the production CTA as unverified until Jeff or a separate source-current task confirms it.

I did not scrape LinkedIn or verify LinkedIn handles. The LinkedIn company/profile URLs in the draft remain manual-verification candidates only.

## Growth OS / CRM safety checks

- The draft states this is a public-source fallback and that no Growth OS prospect/contact record was created or modified. I did not perform any live CRM, HighLevel, Supabase, Clio, LinkedIn, email, SMS, DM, social, ad, workflow, contact, opportunity, tag, or enrollment action.
- The draft's recommended HighLevel tags are correctly limited to independent opt-in through the scorecard route: `workflow:ai-patent-strategy`, `leadmagnet:ai-patent-scorecard`, and `interest:ai-patent-law`.
- No company/person tag should be applied from this draft. Any Lunar Outpost, Justin Cyrus, or Forrest Meyen tag remains manual-only and requires Jeff verification plus conflicts/suppression/prior-touch clearance.

## Business-development / QMD calibration used

- Loaded `business-development-rag` and `qmd` before review.
- Business-development corpus search surfaced lead-magnet principles around useful value-first education, a narrow diagnostic first step, and attracting engaged leads by helping them self-identify a problem. Applied here as a review lens only; no book text is reproduced.
- QMD search over `whiteford-ai-law-pages` surfaced established LinkedIn awareness-review patterns: attorney-review-only posture, no external action, no-tag public-copy default, full production CTA URL, fresh source-current check, manual tag verification, and exact approval packet before any public use.

## Lead magnet / lane check

The selected CTA/lane is correct, but the exact public URL still needs approval and verification:

- Route: `/ai-patent-strategy-scorecard`
- Production URL candidate requiring verification: `https://learn.schellip.com/ai-patent-strategy-scorecard`
- Campaign lane: `workflow:ai-patent-strategy`
- Lead magnet: AI Patent Strategy Scorecard
- Consent-gated tags confirmed in repo campaign config: `leadmagnet:ai-patent-scorecard` and `interest:ai-patent-law`
- Repo site config includes `/ai-patent-strategy-scorecard` as the AI Patent navigation/offer route.

## Suggested no-tag public-copy cleanup direction

If Jeff wants to move this toward a separate exact-copy approval packet, prepare a no-tag final-copy view that keeps Lunar Outpost evidence in approval notes rather than visible post tags. The educational angle should stay category-level:

- physical-AI and autonomy companies can span hardware, software, control systems, model/data layers, testing evidence, contracts, and deployment records;
- teams benefit from a non-confidential map of human contribution, architecture choices, patent/trade-secret decisions, ownership/assignment, and operational evidence;
- the Scorecard is a first-pass issue-spotting tool, not legal advice and not a comment on Lunar Outpost.

## Final decision

Approved only as an internal attorney-review and revision surface. HOLD for all external/public/manual-social/live-system use until Jeff approves exact final copy, no-tag/tag posture, source-current evidence, conflicts/suppression/prior-touch status, CTA URL, channel/operator/timing, rollback posture, and legal-marketing review.
