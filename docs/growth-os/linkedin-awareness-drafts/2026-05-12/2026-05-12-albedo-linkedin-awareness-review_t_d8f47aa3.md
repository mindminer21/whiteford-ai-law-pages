# Review — Albedo LinkedIn Awareness Draft — 2026-05-12

Task: `t_d8f47aa3`
Reviewed draft: `docs/growth-os/linkedin-awareness-drafts/2026-05-12/2026-05-12-albedo-linkedin-awareness-draft.md`
Review timestamp: 2026-05-12 05:44:28 MDT
Status: attorney-review-only / draft-only / no external action authorized
Reviewer verdict: PASS FOR INTERNAL ATTORNEY REVIEW; REVISE CTA URL BEFORE ANY MANUAL POST; NOT APPROVED FOR POSTING OR OUTREACH

## Executive verdict

The Albedo LinkedIn awareness draft is suitable for internal attorney/Jeff review as a draft-only educational awareness packet. It is grounded in public Albedo first-party sources, uses Albedo only as a category example for Colorado/Mountain West deep-tech invention-record discipline, avoids stating or implying an Albedo-specific legal problem, and preserves strong no-legal-advice, no-attorney-client, no-confidential-information, no-CRM-action, and manual-only gates.

This review does not authorize publication. Jeff or an authorized human must still approve the exact final copy, channel, timing, CTA URL, company tag/no-tag decision, and any asset usage after conflicts/suppression, source-current, brand, and legal-marketing review.

No emails, DMs, LinkedIn posts, comments, tags, CRM updates, HighLevel workflow actions, opportunity movement, scheduling, publishing, ads, or outreach were performed in this review.

## Review scope and evidence checked

### Internal artifacts

- Draft reviewed: `docs/growth-os/linkedin-awareness-drafts/2026-05-12/2026-05-12-albedo-linkedin-awareness-draft.md`
- AI Patent Strategy Scorecard local route: `src/app/ai-patent-strategy-scorecard/page.tsx`
- Scorecard guardrails component: `src/components/patent-scorecard.tsx`
- Deliverable index: `docs/KANBAN_DELIVERABLE_INDEX.md`

### Public-source spot checks

`web_extract` failed because the Firecrawl backend returned payment-required/insufficient-credit errors. I used a read-only Python `urllib` fetch fallback with a browser user agent and checked page titles plus relevant text snippets. The fallback checks support the draft's factual posture:

- `https://albedo.com/company` loaded with title `Company` and supports the first-party team listing for Topher Haddad as Co-founder & CEO and AyJay Lasater as Co-founder & CTO; it also shows Denver, CO role locations and public Clarity-1/VLEO language.
- `https://albedo.com/` loaded with title `Albedo` and supports public VLEO positioning, Clarity-1 launched March 2025 language, customer/contractor logo context, and the leadership teaser listing Topher Haddad and AyJay Lasater.
- `https://albedo.com/post/clarity-1-what-worked-and-where-we-go-next` loaded with title `Clarity-1: What Worked, and Where We Go Next`; it supports the January 23, 2026 first-party post by Topher Haddad, the March 14, 2025 SpaceX Transporter-13 launch, and the stated mission goals around sustainable VLEO operations plus visible/thermal imaging outcomes.
- `https://albedo.com/post/national-reconnaissance-office-nro-awards-albedo-stage-ii-contract-award` loaded with title `National Reconnaissance Office (NRO) Awards Albedo Stage II Contract Award`; it supports Albedo's Stage II NRO award announcement, Denver dateline, VLEO satellite/imaging positioning, and Clarity-1 reference. Note: the page text includes a July 25, 2025 dateline while the post metadata shows August 1, 2025, so keep the draft's wording tied to the post date or say `announced in a first-party post dated August 1, 2025` if used.
- `https://albedo.com/post/aerospace-startup-to-provide-highest-resolution-images-with-low-flying-satellites` loaded with title `Albedo opens manufacturing facility and establishes headquarters in Denver area`; it supports the Denver-area manufacturing facility/headquarters framing and links out to the Denver Post item.
- Albedo's first-party site footer contains `https://www.linkedin.com/company/albedo-space/`; this supports treating the LinkedIn company page as a candidate only. I did not scrape LinkedIn or verify individual LinkedIn profiles.

### Business-development and QMD checks

- Business-development corpus search returned the narrow-lead-magnet principle: a lead magnet should solve a complete narrow problem and identify engaged readers before deeper follow-up. The draft applies that principle safely by positioning the AI Patent Strategy Scorecard as a non-confidential issue-spotting/documentation-readiness tool rather than a legal diagnosis or direct solicitation.
- QMD search over `whiteford-ai-law-pages` for `ai-patent-strategy-scorecard` confirmed the scorecard is an established Whiteford/Schell IP campaign/authority route used across recording, YouTube, and nurture materials. A more specific Albedo query returned no result, which is expected for a fresh public-source fallback.

## Acceptance-criteria review

### 1. Attorney-review-only posture — PASS

The draft states at the top that it is draft-only and attorney-review-only, and it expressly blocks publishing, scheduling, live tagging, commenting, DMs, connection requests, CRM/Supabase/HighLevel/Clio mutation, workflow action, enrollment, and external outreach. The approval checklist repeats manual-only and no-external-action conditions.

### 2. Source-current/public-source support — PASS WITH FINAL SOURCE-CURRENT CHECK

The factual claims are supported by first-party Albedo pages checked during this review. The public post copy avoids detailed claims that would require paywalled or third-party confirmation and keeps the company mention at a high level: public Albedo VLEO satellite milestones and Clarity-1 technical lessons.

Required condition before manual use: re-check all source pages on the day of posting because aerospace contract, customer, launch, and facility details can change quickly.

### 3. No legal-problem implication — PASS

The draft repeatedly frames Albedo as a public-source category example and says it is not commenting on Albedo's legal position. It does not state that Albedo has patent, ownership, clearance, diligence, contracting, documentation, compliance, or counsel gaps.

### 4. No legal advice / no attorney-client issue — PASS

The draft preserves the essential caveats: public educational content only, no legal advice, no attorney-client relationship, no company-specific legal conclusion, and no confidential information request. The linked scorecard component also includes no-confidential-information, educational-use, no-inventorship/patentability/eligibility determination, and no-attorney-client disclaimers.

### 5. Tagging and LinkedIn safety — PASS WITH MANUAL-ONLY CONDITION

The company page is supported only as a candidate from Albedo's own site footer. The draft correctly treats individual names as internal tag candidates only and recommends no individual tags by default. No LinkedIn scraping or automated profile verification was performed.

Safest manual posture: post without individual tags and preferably without any company tag unless Jeff manually verifies the exact company page and approves a company tag after conflicts/suppression and brand review. If using no-tag copy, remove the bracketed tag-candidate placeholders from the final public copy.

### 6. CTA URL accuracy — REVISE BEFORE MANUAL POST

The draft's LinkedIn post body currently uses a relative CTA route: `/ai-patent-strategy-scorecard`. That is useful internally but should be replaced before any LinkedIn/manual-social use with a verified absolute public URL, such as the approved production/canonical Whiteford/Schell IP URL or the currently available preview URL if Jeff approves preview use.

The local route and scorecard component exist and include relevant guardrails, but this review did not confirm a final canonical production URL. Required revision before posting: insert the exact approved absolute CTA URL and re-check that the page loads with no-confidential/no-attorney-client/educational-use disclaimers intact.

### 7. No hype, guarantees, or pressure — PASS

The copy is concise, educational, and measured. It avoids outcome promises, superiority claims, pressure tactics, or statements that Albedo needs counsel. The proposed carousel/image concept avoids logos, executive photos, screenshots, customer/agency logos, and facility imagery unless separately authorized.

### 8. HighLevel / CRM / workflow safety — PASS

The draft lists the relevant HighLevel tags and email-sequence angle only as a hypothetical opt-in path. It correctly blocks applying tags, enrolling contacts, sending emails, creating tasks, moving opportunities, or mutating CRM/HighLevel/Clio/Supabase records without exact Jeff approval and opt-in evidence.

## Minor non-blocking suggestions before Jeff approval

1. Replace the relative CTA with an approved absolute URL before any LinkedIn/manual-social use.
2. If choosing the safest posture, delete the bracketed company-tag placeholder and both individual-tag candidate lines from the final public copy.
3. Consider changing `I put together` to `I maintain` or `we built` only if that better matches Jeff/Whiteford positioning; the current phrase is acceptable but personal.
4. Keep the sentence `I’m not commenting on Albedo’s legal position` or equivalent language in any final edited version.
5. Remove or update the internal line saying the Kanban task status was `ready` if this packet is circulated as a current operational artifact; the live task is now under review/running and the line is not needed for public copy.

## Final gate

Approved now: internal attorney/ethics/brand/source-current review and Jeff's manual decision process only.

Not approved: posting, scheduling, tagging, commenting, DMs, connection requests, emails, SMS, HighLevel workflow enrollment, HighLevel tags, CRM mutation, opportunity movement, ads, public/client-facing changes, or any external outreach.

Next action: Jeff should decide whether to revise the CTA to an approved absolute URL and use no-tag final copy, then perform final source-current, conflicts/suppression, URL, tag/no-tag, and legal-marketing review before any manual human posting.
