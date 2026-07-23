# Review — Enveda LinkedIn Awareness Draft — 2026-05-13

Task: `t_aba09dc2`
Reviewed draft: `docs/growth-os/linkedin-awareness-drafts/2026-05-13/2026-05-13-enveda-linkedin-awareness-draft.md`
Review timestamp: 2026-05-13 07:46:23 MDT
Status: attorney-review-only / draft-only / no external action authorized
Reviewer verdict: PASS FOR INTERNAL ATTORNEY REVIEW; REVISE CTA URL AND VERIFY/REMOVE BUSINESS WIRE SOURCE BEFORE ANY MANUAL POST; NOT APPROVED FOR POSTING OR OUTREACH

## Executive verdict

The Enveda LinkedIn awareness draft is suitable for internal attorney/Jeff review as a draft-only educational awareness packet. It uses Enveda as a public-source category example for AI-enabled R&D/invention-record discipline, ties the copy to the AI Patent Strategy Scorecard, avoids asserting that Enveda has any company-specific legal problem, and preserves strong no-legal-advice, no-attorney-client, no-confidential-information, no-CRM-action, and manual-only gates.

This review does not authorize publication. Jeff or an authorized human must still approve the exact final copy, channel, timing, CTA URL, company tag/no-tag decision, and any asset usage after conflicts/suppression, source-current, brand, and legal-marketing review.

No emails, DMs, LinkedIn posts, comments, tags, CRM updates, HighLevel workflow actions, opportunity movement, scheduling, publishing, ads, or outreach were performed in this review.

## Review scope and evidence checked

### Internal artifacts

- Draft reviewed: `docs/growth-os/linkedin-awareness-drafts/2026-05-13/2026-05-13-enveda-linkedin-awareness-draft.md`
- AI Patent Strategy Scorecard route/offer copy checked: `src/lib/site.ts`
- AI Patent Strategy campaign tag/nurture mapping checked: `src/lib/campaigns.ts`
- Deliverable index checked and updated: `docs/KANBAN_DELIVERABLE_INDEX.md`

### Public-source spot checks

`web_extract` and `web_search` both failed because the Firecrawl backend returned payment-required/insufficient-credit errors. Python `urllib` was blocked by Enveda/Business Wire access controls. I therefore used the browser snapshot/DOM text as the read-only public-source fallback. That fallback supports the draft's core factual posture:

- `https://www.envedabio.com/` redirects to `https://enveda.com/` and supports Enveda's “learning from life to discover medicines” positioning, platform language around reading/translating nature's chemistry, and the Boulder location at 5700 Flatiron Parkway, Boulder, CO 80301.
- `https://www.envedabio.com/platform` redirects to `https://enveda.com/platform/` and supports the platform framing: analyzing natural samples, answering “What are the molecules?” and “What do they do?”, combining cutting-edge mass spectrometry with machine learning algorithms, AI/ML, PRISM, and natural chemistry foundation-model language.
- `https://www.envedabio.com/pipeline` redirects to `https://enveda.com/pipeline/` and supports the public “AI-enabled drug discovery platform” language, “differentiated medicines, discovered at record pace,” and several pipeline/clinical-stage references.
- `https://www.envedabio.com/people` redirects to `https://enveda.com/people/` and supports Viswa Colluru, PhD as Founder & CEO, current leadership/board/advisor listings, and the same Boulder location in the footer.
- `https://enveda.com/news/enveda-raises-150m-series-d-funding-to-reach-unicorn-status-enrolls-first-patient-in-lead-program-and-adds-mikael-dolsten-to-board-of-directors/` loaded and supports the 4 Sep 2025 first-party title: “Enveda Raises $150M Series D Funding to Reach Unicorn Status, Enrolls First Patient in Lead Program, and Adds Mikael Dolsten to Board of Directors.” The browser-visible page showed title/date/footer but not the full release body.
- The Business Wire URL could not be verified in this environment. Browser navigation failed with `ERR_HTTP2_PROTOCOL_ERROR`; `curl --http1.1` timed out with zero bytes. Treat the Business Wire source as unverified unless Jeff manually opens it in a normal browser before use.

### Business-development and QMD checks

- Business-development corpus search returned the narrow-lead-magnet principle: a lead magnet should solve a complete, narrow problem and identify engaged readers before deeper follow-up. The draft applies that principle safely by positioning the AI Patent Strategy Scorecard as a non-confidential issue-spotting/documentation-readiness tool rather than a legal diagnosis or direct solicitation.
- QMD searches over `whiteford-ai-law-pages` for the exact Enveda/scorecard query and tag query returned no hits, likely because this is a fresh draft and the collection has not been refreshed for it yet. I used direct local file checks instead: `src/lib/site.ts` confirms the AI Patent Strategy Scorecard route/offer copy, and `src/lib/campaigns.ts` confirms `workflow:ai-patent-strategy`, `leadmagnet:ai-patent-scorecard`, and `interest:ai-patent-law`.

## Acceptance-criteria review

### 1. Attorney-review-only posture — PASS

The draft states at the top that it is draft-only and attorney-review-only, and it expressly blocks publishing, scheduling, live tagging, commenting, DMs, connection requests, CRM/Supabase/HighLevel/Clio mutation, workflow action, enrollment, and external outreach. The approval checklist repeats manual-only and no-external-action conditions.

### 2. Source-current/public-source support — PASS WITH FINAL SOURCE-CURRENT CHECK AND BUSINESS WIRE CAVEAT

The core claims used in the draft post body are supported by Enveda first-party pages checked during this review: Enveda publicly describes AI/ML, mass spectrometry, natural-product chemistry, an AI-enabled drug discovery platform, Boulder location, and Viswa Colluru's Founder & CEO role.

Required condition before manual use: re-check all source pages on the day of posting because biotech pipeline, leadership, financing, clinical, and board details can change. Also either manually verify the Business Wire URL in a normal browser or remove the Business Wire evidence bullet from any approval packet; the final post draft does not need the Business Wire source because it does not use financing/board/funding details.

### 3. No legal-problem implication — PASS

The copy repeatedly frames Enveda as a public-source category example and says it is not making a company-specific legal conclusion or commenting on Enveda's legal position. It does not state that Enveda has patent, ownership, trade-secret, diligence, clinical, regulatory, investor, data, or counsel gaps.

### 4. No legal advice / no attorney-client issue — PASS

The draft preserves the essential caveats: public educational content only, no legal advice, no attorney-client relationship, no company-specific legal conclusion, and no confidential information request. The proposed question list is framed as general issue-spotting for AI/R&D companies, not as advice to Enveda.

### 5. Tagging and LinkedIn safety — PASS WITH MANUAL-ONLY CONDITION

The draft correctly treats the Enveda company page and Viswa Colluru individual profile as tag candidates only and recommends no individual tag by default. I did not scrape LinkedIn or verify any LinkedIn profile.

Safest manual posture: post without individual tags and preferably without any company tag unless Jeff manually verifies the exact company page and approves a company tag after conflicts/suppression and brand review. If using no-tag copy, remove the bracketed tag-candidate placeholders from the final public copy.

### 6. CTA URL accuracy — REVISE BEFORE MANUAL POST

The draft's LinkedIn post body currently uses a relative CTA route: `/ai-patent-strategy-scorecard`. That is useful internally but should be replaced before any LinkedIn/manual-social use with a verified absolute public URL, such as the approved production/canonical Whiteford/Schell IP URL or the currently available preview URL if Jeff approves preview use.

The local offer definition exists and matches the draft's lead-magnet framing, but this review did not confirm a final canonical production URL. Required revision before posting: insert the exact approved absolute CTA URL and re-check that the page loads with no-confidential/no-attorney-client/educational-use disclaimers intact.

### 7. No hype, guarantees, or pressure — PASS

The copy is concise, educational, and measured. It avoids outcome promises, superiority claims by Whiteford/Schell IP, pressure tactics, or statements that Enveda needs counsel. The proposed carousel/image concept avoids Enveda logos, screenshots, executive images, pipeline graphics, investor logos, and proprietary-looking biotech visuals unless separately approved.

### 8. HighLevel / CRM / workflow safety — PASS

The draft lists the relevant HighLevel tags and email-sequence angle only as a hypothetical opt-in path. It correctly blocks applying tags, enrolling contacts, sending emails, creating tasks, moving opportunities, or mutating CRM/HighLevel/Clio/Supabase records without exact Jeff approval and opt-in evidence.

## Minor non-blocking suggestions before Jeff approval

1. Replace the relative CTA with an approved absolute URL before any LinkedIn/manual-social use.
2. Either manually verify the Business Wire URL outside this agent environment or remove the Business Wire evidence bullet from the approval packet; the public post can rely on Enveda first-party sources alone.
3. If choosing the safest posture, delete the bracketed company-tag placeholder and individual-tag candidate line from the final public copy.
4. Keep the phrase “not a company-specific legal conclusion and not a comment on Enveda's legal position” or equivalent in any final edited version.
5. Remove or update the internal line saying the Kanban task status was `ready` if this packet is circulated as a current operational artifact; the live task is now under review/running/done and the line is not needed for public copy.
6. Consider softening “I put together” to the exact approved Jeff/Whiteford voice if the final post should sound more firm-led than personal; the current phrasing is acceptable if Jeff wants first-person voice.

## Final gate

Approved now: internal attorney/ethics/brand/source-current review and Jeff's manual decision process only.

Not approved: posting, scheduling, tagging, commenting, DMs, connection requests, emails, SMS, HighLevel workflow enrollment, HighLevel tags, CRM mutation, opportunity movement, ads, public/client-facing changes, or any external outreach.

Next action: Jeff should decide whether to remove/verify the Business Wire evidence bullet, revise the CTA to an approved absolute URL, and use no-tag final copy, then perform final source-current, conflicts/suppression, URL, tag/no-tag, and legal-marketing review before any manual human posting.
