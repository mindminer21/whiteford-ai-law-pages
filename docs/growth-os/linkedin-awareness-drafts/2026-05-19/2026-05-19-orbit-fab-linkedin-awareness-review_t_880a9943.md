# Review — Orbit Fab LinkedIn Awareness Draft — 2026-05-19

Task: `t_880a9943`
Reviewed draft: `docs/growth-os/linkedin-awareness-drafts/2026-05-19/2026-05-19-orbit-fab-linkedin-awareness-draft.md`
Review timestamp: 2026-05-19 07:44:43 MDT
Status: attorney-review-only / draft-only / no external action authorized
Reviewer verdict: PASS FOR INTERNAL ATTORNEY REVIEW WITH REQUIRED PRE-POST CLEANUP; NOT APPROVED FOR POSTING, TAGGING, OUTREACH, CRM ACTION, HIGHLEVEL ACTION, OR PUBLIC USE

## Executive verdict

The Orbit Fab LinkedIn awareness draft is suitable for internal attorney/Jeff/Whiteford review. It uses Orbit Fab as a neutral public Colorado space-infrastructure example to discuss system-level invention records across hardware, interfaces, software, operations, testing, disclosures, and patent-vs-trade-secret triage. It routes to the established AI Patent Strategy Scorecard lane and includes strong manual-only/no-automation/no-CRM/no-outreach gates.

This review does not authorize publication. Before any manual public use, Jeff or another authorized human should approve exact final copy, exact CTA URL/UTM posture, source currency, tag/no-tag posture, conflicts/suppression/prior-touch status, and legal-marketing tone.

No emails, DMs, LinkedIn posts, comments, tags, CRM updates, HighLevel workflow actions, opportunity movement, scheduling, publishing, ads, or outreach were performed in this review.

## Review scope and evidence checked

### Internal artifacts

- Draft reviewed: `docs/growth-os/linkedin-awareness-drafts/2026-05-19/2026-05-19-orbit-fab-linkedin-awareness-draft.md`
- Local campaign route/source checks: `src/lib/site.ts` and `src/lib/campaigns.ts`
- Deliverable index checked/updated: `docs/KANBAN_DELIVERABLE_INDEX.md`

### Public source spot checks

`web_extract`/Firecrawl again returned insufficient-credits errors during this review, so I used direct first-party public-page fetches with Python `urllib`. The first-party Orbit Fab pages below returned HTTP 200 during review and support the draft's factual posture:

- `https://www.orbitfab.com/` supports Orbit Fab's public positioning around spacecraft refueling, UMPIRE mission-planning software, RAFTI navigation references, and the Lafayette, Colorado footer address.
- `https://www.orbitfab.com/about/` supports the Lafayette, Colorado address, leadership candidates Peter Shaper as CEO and Daniel Faber as Co-Founder, and public references to RAVEN/NEST updates.
- `https://www.orbitfab.com/news/orbit-fab-enters-new-growth-chapter-with-leadership-transition-and-20-million-series-b/` returned HTTP 200 and supports the Lafayette, Colorado March 13, 2026 leadership-transition and $20 million Series B announcement framing, plus Peter Shaper/Daniel Faber references.
- `https://www.orbitfab.com/news/orbit-fab-unveils-raven-shuttle-nest-depot-for-in-space-refueling-network/` returned HTTP 200 and supports the Lafayette, Colorado April 13, 2026 RAVEN/NEST announcement and Peter Shaper CEO quote.
- `https://www.orbitfab.com/rafti/` returned HTTP 200 and supports RAFTI as an open-license TRL 8 cooperative docking and refueling interface.
- `https://www.orbitfab.com/umpire/` returned HTTP 200 and supports UMPIRE as mission-planning software that optimizes refueling logistics for mission goals.

I did not scrape LinkedIn or verify LinkedIn handles. The LinkedIn company/profile references in the draft remain manual verification candidates only.

### Local offer/campaign checks

- `src/lib/site.ts` lines 61-74 confirm `/ai-patent-strategy-scorecard`, the primary CTA “Run the AI Patent Scorecard,” the lead magnet “AI Patent Strategy Scorecard,” and the buyer/promise posture around technical founders, inventors, product leaders, and executives documenting AI-assisted R&D and patent strategy questions.
- `src/lib/campaigns.ts` lines 39-47 confirm the `AI Patent Strategy Nurture` lane, trigger tag `workflow:ai-patent-strategy`, and tags `leadmagnet:ai-patent-scorecard` and `interest:ai-patent-law`.

### Business-development and QMD checks

- Business-development corpus search returned the value-first lead-magnet principle that a lead magnet should solve a narrow problem and build trust before a stronger ask. The draft applies that safely by presenting the AI Patent Strategy Scorecard as non-confidential first-pass issue spotting, not as a company-specific legal diagnosis or solicitation.
- QMD search over `whiteford-ai-law-pages` for “AI Patent Strategy Scorecard” returned existing AI Patent Strategy Scorecard, AI-assisted invention records, recording calendar, and prior LinkedIn-awareness context. This supports the draft's use of the established AI Patent lane.
- A narrower QMD search for “AI Patent Strategy Scorecard LinkedIn awareness Orbit Fab” returned no results, which is consistent with the draft's fresh Orbit Fab fallback posture and does not create a local duplication concern.

## Acceptance-criteria review

### 1. Attorney-review-only posture — PASS

The draft repeatedly marks the packet as draft-only / attorney-review-only and states no publication, scheduling, tagging, outreach, CRM mutation, workflow activation/enrollment, or external action is authorized.

### 2. Public-source support — PASS WITH FINAL SOURCE-CURRENT CHECK

The key factual claims in the draft are supported by first-party Orbit Fab pages that loaded during this review. Because company pages, leadership listings, product descriptions, and footer/contact information can change, Jeff should re-open the exact source URLs immediately before any public use.

### 3. No legal-problem implication — PASS

The draft frames Orbit Fab as a neutral public example of a broader category-level issue: system-level invention records in advanced engineering/deep-tech. It expressly says the post should not imply Orbit Fab has any IP, patent, ownership, contract, government-program, financing, disclosure, or legal-readiness problem. Preserve that framing; do not convert the copy into a warning directed at Orbit Fab.

### 4. No legal advice / no attorney-client issue — PASS WITH PUBLIC-COPY TIGHTENING RECOMMENDED

The draft includes no-legal-advice, no-attorney-client, and no-confidential-information language in both the post and checklist. Before posting, I recommend tightening the final public caveat to include “not a comment on Orbit Fab's legal position” and to avoid asking readers to submit sensitive technical or government-program details in a public channel.

Suggested public-copy caveat:

`General education only; not legal advice, not a comment on Orbit Fab's legal position, and not the start of an attorney-client relationship. Please do not share confidential invention, customer, partner, government-program, code, roadmap, financing, or legal details in comments or forms.`

### 5. Individual and company tagging — PASS ONLY IF MANUAL-ONLY / DEFAULT NO-TAG IS PRESERVED

The draft properly says Jeff must verify tag candidates manually and that no live LinkedIn lookup or scraping was performed. However, the actual draft post block includes bracketed company and individual tag placeholders. Those placeholders must not be pasted into LinkedIn as-is.

Safest final posture: remove all bracketed tag placeholders and post without individual tags. If Jeff wants a company tag, verify the exact company page manually and approve that exact tag after conflicts/suppression/prior-touch and brand review. Do not use individual tags unless Jeff/Whiteford expressly approves them for this exact final copy.

### 6. CTA / HighLevel route — PASS WITH URL APPROVAL CONDITION

The relative route `/ai-patent-strategy-scorecard` matches the local AI Patent Strategy Scorecard route in `src/lib/site.ts`, and `src/lib/campaigns.ts` confirms the AI Patent lane uses `workflow:ai-patent-strategy`, `leadmagnet:ai-patent-scorecard`, and `interest:ai-patent-law` as the relevant nurture/tag architecture. No tag was applied and no enrollment was performed.

Before public use, Jeff should decide whether to use an absolute production URL, a Vercel preview URL, a canonical Whiteford/Schell IP URL, or a UTM URL. Do not post a relative route literally unless the channel/context makes it clickable and approved.

### 7. Hype, guarantees, endorsement, and solicitation risk — PASS

The copy avoids guarantees, urgency pressure, legal conclusions, and aggressive solicitation. It also avoids saying Orbit Fab endorses Whiteford/Schell IP or the scorecard. Preserve the generic educational framing and do not use Orbit Fab logos, screenshots, executive photos, spacecraft imagery, customer logos, partner logos, or branded visuals without separate permission/brand-use approval.

### 8. Named-company sensitivity — PASS WITH EXTRA CAUTION

The company is active in space infrastructure, commercial/government programs, and public technical roadmap announcements. The draft's category-level framing is appropriate, but final public copy should avoid implying anything about Orbit Fab's patent portfolio, contract posture, financing diligence, government-program obligations, export controls, or confidential roadmap. Keep the post about general invention-record discipline for deep-tech teams.

### 9. Draft metadata accuracy — MINOR CLEANUP

The draft's related-links section says `Kanban task: t_880a9943 ... final verified status after hermes kanban show: ready`. That status is stale during this review because the task is running, and it will be stale after closure. This is not public-facing, but the final internal packet should avoid status-specific language.

Recommended replacement:

`Kanban task: t_880a9943 — internal review task for this Orbit Fab LinkedIn awareness packet.`

## Required pre-post cleanup

1. Remove all bracketed tag placeholders from the actual public copy unless Jeff explicitly approves a manually verified exact tag.
2. Add or preserve a public-copy caveat covering general education, no legal advice, no comment on Orbit Fab's legal position, no attorney-client relationship, and no confidential information in comments/forms.
3. Replace `/ai-patent-strategy-scorecard` with an approved absolute URL, approved UTM URL, or approved no-link CTA posture.
4. Re-verify every public source URL and date immediately before manual use.
5. Complete conflicts/suppression/prior-touch/Clio review before any prospect-linked use.
6. Do not use Orbit Fab logos, screenshots, executive photos, spacecraft imagery, customer logos, partner logos, or branded visuals in a carousel unless separate permission/brand-use approval exists.
7. Remove or neutralize stale Kanban status language in the draft metadata before treating the packet as final.

## Final gate

Approved now: internal attorney/ethics/brand/source-current review and Jeff's manual decision process only.

Not approved: posting, scheduling, tagging, commenting, DMs, connection requests, emails, SMS, HighLevel workflow enrollment, HighLevel tags, CRM mutation, opportunity movement, ads, public/client-facing changes, or any external action.

Next action: Jeff should decide whether to revise the draft into a no-tag final-copy version, approve an exact CTA URL/posting posture, re-verify all sources, or hold the packet for later use.
