# Review — Crusoe LinkedIn Awareness Draft — 2026-05-16

Task: `t_f447c8e1`
Reviewed draft: `docs/growth-os/linkedin-awareness-drafts/2026-05-16/2026-05-16-crusoe-linkedin-awareness-draft.md`
Review timestamp: 2026-05-16 22:33:49 MDT
Status: attorney-review-only / draft-only / no external action authorized
Reviewer verdict: PASS FOR INTERNAL ATTORNEY REVIEW WITH REQUIRED PRE-POST CLEANUP; NOT APPROVED FOR POSTING, TAGGING, OUTREACH, OR CRM ACTION

## Executive verdict

The Crusoe LinkedIn awareness draft is suitable for internal attorney/Jeff/Whiteford review. It uses Crusoe as a neutral public example of multi-layer AI infrastructure invention-record issues, routes to the AI Patent Strategy Scorecard lane, and includes strong draft-only/manual-only/no-automation/no-CRM/no-outreach gates.

This review does not authorize publication. Before any manual public use, Jeff or another authorized human should approve exact final copy, exact CTA URL/UTM posture, source currency, tag/no-tag posture, conflicts/suppression/prior-touch status, and legal-marketing tone.

No emails, DMs, LinkedIn posts, comments, tags, CRM updates, HighLevel workflow actions, opportunity movement, scheduling, publishing, ads, or outreach were performed in this review.

## Review scope and evidence checked

### Internal artifacts

- Draft reviewed: `docs/growth-os/linkedin-awareness-drafts/2026-05-16/2026-05-16-crusoe-linkedin-awareness-draft.md`
- Local campaign route/source checks: `src/lib/site.ts`, `src/lib/campaigns.ts`, and `src/components/patent-scorecard.tsx`
- Deliverable index checked and updated: `docs/KANBAN_DELIVERABLE_INDEX.md`

### Public source spot checks

`web_extract`/Firecrawl has been source-blocked in recent Growth OS runs, so I used direct first-party public-page fetches with Python/urllib. Spot checks returned HTTP 200 for the first-party Crusoe pages below and support the draft's factual posture:

- `https://www.crusoe.ai/` supports Crusoe's public positioning as “The AI factory company,” Crusoe Cloud, managed inference, energy/infrastructure language, leadership/news references, and related public AI-infrastructure context.
- `https://www.crusoe.ai/cloud` supports Crusoe Cloud and AI platform/services positioning, including managed-inference context.
- `https://www.crusoe.ai/about/company` supports AI-optimized cloud infrastructure, AI factories, Crusoe Cloud, vertically integrated infrastructure, managed inference, energy-first positioning, and Atero/acquisition references.
- `https://www.crusoe.ai/about/leadership` supports Chase Lochmiller as a leadership contact candidate and Nitin Perumbeti as a technical leadership contact candidate. It also supports treating LinkedIn handles/tags as unverified unless manually checked.
- `https://www.crusoe.ai/resources/newsroom/crusoe-named-to-fast-companys-list-of-the-worlds-most-innovative-companies-of-2026` supports Denver-datelined Fast Company recognition, vertically integrated infrastructure language, Brighton/Spark Factory context, and AI factory/managed inference context.
- `https://www.crusoe.ai/resources/newsroom/crusoe-announces-new-900-mw-ai-factory-campus-in-abilene-texas-to-support-microsoft-ai-infrastructure` supports the public 900 MW Abilene AI factory campus and Microsoft AI infrastructure context.

I did not scrape LinkedIn or verify LinkedIn handles. The LinkedIn company/profile references in the draft remain manual verification candidates only.

### Business-development and QMD checks

- Business-development corpus search returned the value-first lead-magnet principle that a good lead magnet should solve a narrow problem and identify engaged readers before a stronger ask. The draft applies that safely by presenting the AI Patent Strategy Scorecard as a non-confidential issue-spotting checklist, not as a diagnosis or company-specific solicitation.
- QMD search over `whiteford-ai-law-pages` for `ai-patent-strategy-scorecard` returned existing AI authority, LinkedIn awareness, HighLevel Social Planner, and AI Patent Strategy Scorecard fulfillment materials. This supports the draft's use of the established scorecard route as the relevant campaign lane. A narrower Crusoe-specific QMD search returned no result, which is acceptable because the draft identifies Crusoe as a fresh public-source research fallback.

## Acceptance-criteria review

### 1. Attorney-review-only posture — PASS

The draft repeatedly marks the packet as draft-only / attorney-review-only and states no publication, tagging, outreach, CRM mutation, workflow enrollment, or external action is authorized.

### 2. Public-source support — PASS WITH FINAL SOURCE-CURRENT CHECK

The key factual claims in the draft are supported by first-party Crusoe pages that loaded during this review. Because company pages, leadership listings, product descriptions, and news pages can change, Jeff should re-open the exact source URLs immediately before any public use.

### 3. No legal-problem implication — PASS

The draft frames Crusoe as a public example of complex AI infrastructure, not as a company with an IP, patent, ownership, disclosure, compliance, contract, diligence, or counsel need. The sentence beginning “The safe educational angle is not that Crusoe has an IP problem” is directionally correct and should be preserved in the internal packet.

### 4. No legal advice / no attorney-client issue — PASS WITH PUBLIC-COPY TIGHTENING RECOMMENDED

The review packet includes no-legal-advice, no-attorney-client, and no-confidential-information gates. Before posting, I recommend adding a short public-copy caveat inside the actual post copy, not only in the checklist, such as:

`General education only; not legal advice, not a comment on Crusoe's legal position, and not the start of an attorney-client relationship. Please do not share confidential invention, customer, vendor, code, roadmap, or legal details in comments or forms.`

### 5. Individual and company tagging — PASS ONLY IF MANUAL-ONLY / DEFAULT NO-TAG IS PRESERVED

The draft properly says Jeff must verify tag candidates manually and states no live LinkedIn lookup or scraping was performed. However, the actual draft post block includes bracketed company and individual tag placeholders. Those placeholders must not be pasted into LinkedIn as-is.

Safest final posture: remove all bracketed tag placeholders and post without individual tags. If Jeff wants a company tag, verify the exact company page manually and approve that exact tag after conflicts/suppression/prior-touch and brand review. Do not use individual tags unless Jeff/Whiteford expressly approves them for this exact final copy.

### 6. CTA / HighLevel route — PASS WITH URL APPROVAL CONDITION

The relative route `/ai-patent-strategy-scorecard` matches the local AI Patent Strategy Scorecard route. The campaign architecture references `workflow:ai-patent-strategy` and `leadmagnet:ai-patent-scorecard` only as future opted-in website visitor handling; no tag was applied and no enrollment was performed.

Before public use, Jeff should decide whether to use an absolute production URL, a Vercel preview URL, a canonical Whiteford URL, or a UTM URL. Do not post a relative route literally unless the channel/context makes it clickable and approved.

### 7. Hype, guarantees, and solicitation risk — PASS

The copy avoids guarantees, urgency pressure, legal conclusions, and aggressive solicitation. The lead magnet CTA is soft and educational. The “systems problem” framing is appropriate if kept as a general observation about AI infrastructure rather than a legal assessment of Crusoe.

### 8. Draft metadata accuracy — MINOR CLEANUP

The draft's related-links section says the Kanban task was verified as `running` after reviewer dispatch. That was true during drafting/review, but it will be stale after this task closes. This is not public-facing, but the final internal packet should avoid status-specific language. Recommended replacement:

`Kanban task: t_f447c8e1 — internal review task for this Crusoe LinkedIn awareness packet.`

## Required pre-post cleanup

1. Remove all bracketed tag placeholders from the actual public copy unless Jeff explicitly approves a manually verified tag.
2. Add or preserve a public-copy caveat covering general education, no legal advice, no comment on Crusoe's legal position, no attorney-client relationship, and no confidential information in comments/forms.
3. Replace `/ai-patent-strategy-scorecard` with an approved absolute URL, approved UTM URL, or approved no-link CTA posture.
4. Re-verify every public source URL and date immediately before manual use.
5. Complete conflicts/suppression/prior-touch/Clio review before any prospect-linked use.
6. Do not use Crusoe logos, screenshots, executive photos, partner logos, customer logos, or branded visuals in a carousel unless separate permission/brand-use approval exists.
7. Remove or neutralize stale Kanban `running` status language in the draft metadata before treating the packet as final.

## Final gate

Approved now: internal attorney/ethics/brand/source-current review and Jeff's manual decision process only.

Not approved: posting, scheduling, tagging, commenting, DMs, connection requests, emails, SMS, HighLevel workflow enrollment, HighLevel tags, CRM mutation, opportunity movement, ads, public/client-facing changes, or any external action.

Next action: Jeff should decide whether to revise the draft into a no-tag final-copy version, approve an exact CTA URL/posting posture, or hold the packet for later use.
