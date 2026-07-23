# Review — LinkedIn Awareness Draft: Mach Industries (2026-06-02)

Task: t_53721fbf
Reviewer: Hermes reviewer
Tenant: whiteford-mountain-west
Reviewed on: 2026-06-02 07:40:31 MDT

Reviewed draft:
- /Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/growth-os/linkedin-awareness-drafts/2026-06-02/2026-06-02-mach-industries-linkedin-awareness-draft.md

Related artifacts checked:
- /Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-06-02/validation_report.md
- /Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/src/app/ai-compliance-gameplan/page.tsx
- /Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/src/lib/campaigns.ts
- Local Growth OS SQLite read-only spot-check: /Users/jeff/.openclaw/projects/mountain-west-growth-os/data/growth-os.sqlite

## Verdict

PASS for internal attorney-review-only decision prep, with required constraints before any exact-copy/manual LinkedIn use.

The draft is directionally safe as a private review artifact because it uses Mach Industries only as a public example of a broader defense-tech/autonomy operating-record issue, avoids saying Mach has a legal or compliance problem, defaults to no live tags unless Jeff verifies them manually, and routes to the correct AI Compliance Gameplan Builder lane. It does not approve publishing, scheduling, tagging, commenting, DMs, connection requests, email/SMS, workflow enrollment, trigger tags, CRM/HighLevel/Supabase/Clio mutation, or any other external action.

## Required changes before any public/manual LinkedIn use

1. Use a full approved production CTA URL, not a raw relative route. Suggested placeholder pending approval: `https://learn.schellip.com/ai-compliance-gameplan` or an approved UTM version.
2. Default to a no-tag post. Keep the company/person tag candidates only in the internal approval notes unless Jeff manually verifies exact handles and explicitly approves tagging.
3. Tighten the AI/autonomy wording so it does not imply that Mach specifically uses AI unless a source-current first-party or reliable public source supports that exact claim. Safer public-copy phrasing: “When autonomous, AI-enabled, or dual-use technical products move from prototype to production…”
4. Re-fetch sources on posting day. Direct source spot-checks worked in this review, but Firecrawl/web_extract returned 402 Payment Required, so no Firecrawl-backed source-current claim is available from this run.
5. Add a final exact-copy legal-marketing check for defense/weapons sensitivity. Avoid weapons imagery, company logos, product screenshots, founder photos, investor logos, export-control/compliance insinuations, or statements that Mach needs counsel.
6. Confirm conflicts, suppression/opt-out, Clio/prior-touch, named-recipient/no-recipient posture, channel, operator, timing, and rollback before any external use.

## Source-current spot-check notes

Firecrawl/web_extract failed with 402 Payment Required for both cited URLs. I used direct `urllib` browser-style requests for read-only source spot-checks instead.

- https://machindustries.com loaded with HTTP 200. It supports Mach Industries branding, “Building the Future of Defense,” mission language to develop/manufacture asymmetric aerospace and defense systems and components, and category/product references including Viper, Glide, Stratos, Pike, Dart, and Energetics.
- https://techcrunch.com/2026/06/01/defense-tech-darling-mach-industries-hits-1-8b-valuation-a-4x-jump-in-a-year/ loaded with HTTP 200. It supports the article title, founder/CEO Ethan Thornton, $300M Series C, $1.8B valuation, Huntington Beach location, five autonomous vehicles in development, and Exquadrum / solid rocket motor acquisition context.
- Source-currentness still must be repeated before external use because this review is only an internal spot-check and the post would be prospect-facing/public.

## Growth OS / CRM safety checks

- Validation report confirms Mach Industries is locally staged in the `ai-compliance` lane with priority 85 and Gate 4 contact validation failed; contacts staged: 0.
- Local SQLite spot-check found prospect `prospect_mach_industries_20260602` with `pipeline_stage=research_staged`, `suppression_status=consent_gap_no_auto_send`, and `conflicts_status=required_before_send`.
- Local SQLite spot-check found one Mach outreach draft with `status=drafted` and `external_action_allowed=0`.
- Local SQLite spot-check found a pending approval item for Mach, a pending CRM sync record blocked on Jeff approval, and a queued work item with `external_action_allowed=0`.
- Suppression/conflicts remain uncleared: local suppression not checked, Whiteford conflicts required before send, opt-out not checked, duplicate/prior-touch not checked, final clearance not cleared.

No live HighLevel, Supabase, Clio, LinkedIn, CRM, workflow, email, SMS, DM, social, ad, contact, opportunity, tag, or enrollment action is approved by this review.

## Business-development / QMD calibration used

- Loaded `business-development-rag` and `qmd` before review.
- Business-development corpus search surfaced lead-magnet principles: value-first education, narrow useful diagnostic, and attracting engaged leads through a practical first step rather than an immediate hard sell. Applied here as a review lens only; no book text is reproduced.
- QMD search over `whiteford-ai-law-pages` surfaced the established LinkedIn awareness-post pattern: attorney-review-only, public company fact, broader educational point, tag candidates for manual verification, matching lead-magnet URL, and no posting/tagging/CRM/workflow action without exact approval.

## Lead magnet / lane check

The selected CTA/lane is correct:

- Route: `/ai-compliance-gameplan`
- Campaign lane: `workflow:ai-compliance-readiness`
- Lead magnet: AI Compliance Gameplan Builder
- Page positioning: non-confidential AI governance and compliance readiness assessment; answers a short set of non-confidential questions; generates a readiness heat map, priority workstreams, and suggested Whiteford service path; includes privacy/confidentiality, no-legal-advice, no-compliance-determination, no-attorney-client-relationship, conflicts-review, and written-engagement caveats.

## Suggested no-tag public-copy cleanup direction

If Jeff wants to move this toward a separate exact-copy approval packet, use a no-tag variant and keep company evidence in the approval notes rather than the visible post tags. The educational angle should stay category-level:

- scale from prototype to production;
- maintain a non-confidential use-case / data-flow / human-review / vendor-contract / evidence-trail inventory;
- frame the Gameplan Builder as a first-pass map, not legal advice or a compliance determination.

## Final decision

Approved only as an internal attorney-review and revision surface. HOLD for all external/public/manual-social/live-system use until Jeff approves exact final copy, no-tag/tag posture, source-current evidence, conflicts/suppression/prior-touch status, CTA URL, channel/operator/timing, and legal-marketing review.
