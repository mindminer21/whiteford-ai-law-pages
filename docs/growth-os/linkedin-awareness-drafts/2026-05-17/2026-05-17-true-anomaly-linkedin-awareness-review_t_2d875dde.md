# Review — True Anomaly LinkedIn Awareness Draft — 2026-05-17

Task: `t_2d875dde`
Reviewed draft: `docs/growth-os/linkedin-awareness-drafts/2026-05-17/2026-05-17-true-anomaly-linkedin-awareness-draft.md`
Review timestamp: 2026-05-17 07:43:28 MDT
Status: attorney-review-only / draft-only / no external action authorized
Reviewer verdict: PASS FOR INTERNAL ATTORNEY REVIEW WITH REQUIRED PRE-POST CLEANUP; NOT APPROVED FOR POSTING, TAGGING, OUTREACH, CRM ACTION, HIGHLEVEL ACTION, OR PUBLIC USE

## Executive verdict

The True Anomaly LinkedIn awareness draft is suitable for internal attorney/Jeff/Whiteford review. It uses True Anomaly as a neutral public example of AI/autonomy-enabled deep-tech invention-record complexity, routes to the established AI Patent Strategy Scorecard lane, and includes strong draft-only/manual-only/no-automation/no-CRM/no-outreach gates.

This review does not authorize publication. Before any manual public use, Jeff or another authorized human should approve exact final copy, exact CTA URL/UTM posture, source currency, tag/no-tag posture, conflicts/suppression/prior-touch status, and legal-marketing tone.

No emails, DMs, LinkedIn posts, comments, tags, CRM updates, HighLevel workflow actions, opportunity movement, scheduling, publishing, ads, or outreach were performed in this review.

## Review scope and evidence checked

### Internal artifacts

- Draft reviewed: `docs/growth-os/linkedin-awareness-drafts/2026-05-17/2026-05-17-true-anomaly-linkedin-awareness-draft.md`
- Local campaign route/source checks: `src/lib/site.ts`, `src/lib/campaigns.ts`, and `src/components/patent-scorecard.tsx`
- Deliverable index checked and updated: `docs/KANBAN_DELIVERABLE_INDEX.md`

### Public source spot checks

`web_extract`/Firecrawl returned insufficient-credits errors again during this review, so I used direct first-party public-page fetches with Python/urllib. The first-party True Anomaly pages below returned HTTP 200 during review and support the draft's factual posture:

- `https://www.trueanomaly.space/` supports the public positioning as a defense-technology company focused on space defense; spacecraft, software, and payload language; space-superiority framing; Denver founding/HQ timeline milestones; Jackal/Mosaic references; and human-command/machine-control language.
- `https://www.trueanomaly.space/about-us` supports leadership/title candidates: Even Rogers as CEO and Co-Founder, Kyle Zakrzewski as Chief Engineer and Co-Founder, and Sarah Walter as Chief Operating Officer. It also supports hardware/software systems for space-superiority positioning.
- `https://www.trueanomaly.space/jackal` supports the technical-stack example: Jackal as a maneuverable, payload-agnostic spacecraft with modular structure, rapid-fit mission hardpoints, payload flexibility, propulsion, Mosaic-powered detection/tracking, and imaging/processing/dissemination language.
- `https://www.trueanomaly.space/mosaic` supports the autonomy/AI framing: test and training, mission planning and analysis, flight software, on-orbit operations, constellation management, space domain awareness, multi-domain battle management, and effects-driven decisions/autonomy that translate operator intent into autonomous actions.

I did not scrape LinkedIn or verify LinkedIn handles. The LinkedIn company/profile references in the draft remain manual verification candidates only.

### Business-development and QMD checks

- Business-development corpus search returned the value-first lead-magnet principle that a lead magnet should solve a narrow problem and build trust before a stronger ask. The draft applies that safely by presenting the AI Patent Strategy Scorecard as a non-confidential issue-spotting checklist, not as a company-specific diagnosis or solicitation.
- QMD search over `whiteford-ai-law-pages` for AI Patent Strategy Scorecard materials returned existing AI authority, nurture, recording-calendar, and prior LinkedIn-awareness materials. This supports the draft's use of the established scorecard route as the relevant campaign lane.
- A narrower QMD search for `True Anomaly` returned no results, which is consistent with the draft's “fresh public-source fallback” posture and does not create a duplication concern in local QMD memory.

## Acceptance-criteria review

### 1. Attorney-review-only posture — PASS

The draft repeatedly marks the packet as draft-only / attorney-review-only and states no publication, scheduling, tagging, outreach, CRM mutation, workflow activation/enrollment, or external action is authorized.

### 2. Public-source support — PASS WITH FINAL SOURCE-CURRENT CHECK

The key factual claims in the draft are supported by first-party True Anomaly pages that loaded during this review. Because company pages, leadership listings, product descriptions, and timeline claims can change, Jeff should re-open the exact source URLs immediately before any public use.

### 3. No legal-problem implication — PASS

The draft frames True Anomaly as a neutral public example of a complex AI/autonomy-enabled deep-tech product stack. It expressly says the post should not say or imply True Anomaly has any IP issue. Preserve that framing; do not convert the copy into a warning directed at True Anomaly.

### 4. No legal advice / no attorney-client issue — PASS WITH PUBLIC-COPY TIGHTENING RECOMMENDED

The draft includes no-legal-advice, no-attorney-client, and no-confidential-information language in both the post and checklist. Before posting, I recommend tightening the final public caveat to include “not a comment on True Anomaly's legal position” and “do not share confidential invention, customer, vendor, code, roadmap, or legal details in comments or forms.”

Suggested public-copy caveat:

`General education only; not legal advice, not a comment on True Anomaly's legal position, and not the start of an attorney-client relationship. Please do not share confidential invention, customer, vendor, code, roadmap, or legal details in comments or forms.`

### 5. Individual and company tagging — PASS ONLY IF MANUAL-ONLY / DEFAULT NO-TAG IS PRESERVED

The draft properly says Jeff must verify tag candidates manually and that no live LinkedIn lookup or scraping was performed. However, the actual draft post block includes bracketed company and individual tag placeholders. Those placeholders must not be pasted into LinkedIn as-is.

Safest final posture: remove all bracketed tag placeholders and post without individual tags. If Jeff wants a company tag, verify the exact company page manually and approve that exact tag after conflicts/suppression/prior-touch and brand review. Do not use individual tags unless Jeff/Whiteford expressly approves them for this exact final copy.

### 6. CTA / HighLevel route — PASS WITH URL APPROVAL CONDITION

The relative route `/ai-patent-strategy-scorecard` matches the local AI Patent Strategy Scorecard route in `src/lib/site.ts`, and `src/lib/campaigns.ts` confirms the AI Patent Strategy lane uses `workflow:ai-patent-strategy`, `leadmagnet:ai-patent-scorecard`, and `interest:ai-patent-law` as the relevant nurture/tag architecture. No tag was applied and no enrollment was performed.

Before public use, Jeff should decide whether to use an absolute production URL, a Vercel preview URL, a canonical Whiteford/Schell IP URL, or a UTM URL. Do not post a relative route literally unless the channel/context makes it clickable and approved.

### 7. Hype, guarantees, endorsement, and solicitation risk — PASS

The copy avoids guarantees, urgency pressure, legal conclusions, and aggressive solicitation. It also avoids saying True Anomaly endorses Whiteford/Schell IP or the scorecard. Preserve the generic educational framing and do not use True Anomaly logos, screenshots, spacecraft imagery, executive photos, partner/customer logos, or branded visuals without separate permission/brand-use approval.

### 8. Draft metadata accuracy — MINOR CLEANUP

The draft's related-links section says `Kanban task id/status: t_2d875dde / ready` as verified by a CLI command. That status is already stale during this review because the task is running, and it will be stale after closure. This is not public-facing, but the final internal packet should avoid status-specific language.

Recommended replacement:

`Kanban task: t_2d875dde — internal review task for this True Anomaly LinkedIn awareness packet.`

## Required pre-post cleanup

1. Remove all bracketed tag placeholders from the actual public copy unless Jeff explicitly approves a manually verified exact tag.
2. Add or preserve a public-copy caveat covering general education, no legal advice, no comment on True Anomaly's legal position, no attorney-client relationship, and no confidential information in comments/forms.
3. Replace `/ai-patent-strategy-scorecard` with an approved absolute URL, approved UTM URL, or approved no-link CTA posture.
4. Re-verify every public source URL and date immediately before manual use.
5. Complete conflicts/suppression/prior-touch/Clio review before any prospect-linked use.
6. Do not use True Anomaly logos, screenshots, executive photos, spacecraft imagery, partner logos, customer logos, or branded visuals in a carousel unless separate permission/brand-use approval exists.
7. Remove or neutralize stale Kanban status language in the draft metadata before treating the packet as final.

## Final gate

Approved now: internal attorney/ethics/brand/source-current review and Jeff's manual decision process only.

Not approved: posting, scheduling, tagging, commenting, DMs, connection requests, emails, SMS, HighLevel workflow enrollment, HighLevel tags, CRM mutation, opportunity movement, ads, public/client-facing changes, or any external action.

Next action: Jeff should decide whether to revise the draft into a no-tag final-copy version, approve an exact CTA URL/posting posture, or hold the packet for later use.
