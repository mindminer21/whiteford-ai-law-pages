# Review — AION Robotics LinkedIn Awareness Draft

Task: `t_cea1cbcd`
Reviewed at: 2026-05-09 07:41:35 MDT
Reviewer profile: `reviewer`
Tenant: `whiteford-mountain-west`
Source draft reviewed: `docs/growth-os/linkedin-awareness-drafts/2026-05-09/2026-05-09-aion-robotics-linkedin-awareness-draft.md`
Prior AION review: `docs/nightly-lead-research/runs/2026-05-06-controlled-test/aion_robotics_packet_review_t_546f548c.md`
Preflight template applied: `docs/growth-os/named_company_awareness_preflight_checklist_2026-05-08.md`

## Overall verdict

PASS for internal attorney-review-only decision prep.

REVISE before any exact copy/paste or manual LinkedIn use. The draft is directionally safe and source-tied, but the public-copy section still contains bracketed company/contact tag candidates and a bare internal route. Before any human posts anything, create a final no-tag copy view or a Jeff-approved exact-tag copy view, verify the production CTA URL/UTM posture, and remove stale operational task-status text from any final approval packet.

HOLD for every external action. This review does not approve publishing, scheduling, LinkedIn tagging, LinkedIn commenting, LinkedIn messages, connection requests, email/SMS outreach, HighLevel tag changes, workflow enrollment, opportunity movement, Clio writes, Supabase writes, CRM notes/tasks, ads, public-page changes, or any other prospect-facing/live-record action.

## Evidence and verification performed

Reviewed local artifacts:

- Draft under review: `docs/growth-os/linkedin-awareness-drafts/2026-05-09/2026-05-09-aion-robotics-linkedin-awareness-draft.md`
- Prior AION prospect packet review: `docs/nightly-lead-research/runs/2026-05-06-controlled-test/aion_robotics_packet_review_t_546f548c.md`
- Named-company awareness preflight checklist: `docs/growth-os/named_company_awareness_preflight_checklist_2026-05-08.md`
- CTA route map evidence: `src/lib/site.ts`, `src/app/ai-patent-strategy-scorecard/page.tsx`, `src/components/patent-scorecard.tsx`, and `src/lib/campaigns.ts`
- Kanban deliverable index: `docs/KANBAN_DELIVERABLE_INDEX.md`

Public-source spot checks from this review, using direct HTTP fetches because `web_extract` returned Firecrawl payment/quota errors:

- `https://www.aionrobotics.com/` returned HTTP 200. The fetched page text exposed first-party support for AION Robotics as autonomous infrastructure monitoring, advanced autonomous robots for monitoring/inspection/mapping/surveying/security/drone infrastructure inspections, onboard Artificial Intelligence, hardened autonomy, edge AI sensing, compute, physical task execution, and the Arvada address block.
- `https://www.aionrobotics.com/investors` returned HTTP 200. The fetched page text exposed first-party support for “Physical Manifestations of AI,” AI automation of dull/dirty/dangerous commercial labor tasks, and Nicholas Nunno as CEO.
- `https://www.aionrobotics.com/contact` returned HTTP 200. The fetched page text exposed first-party support for the Arvada address block.
- The staged LinkedIn person URL returned HTTP 200 and exposed Nicholas Nunno / AION Robotics / Arvada metadata, but this is not a substitute for manual LinkedIn verification and does not approve any LinkedIn scraping, tagging, messaging, connection request, or profile automation.

CTA route verification:

- `/ai-patent-strategy-scorecard` is mapped in `src/lib/site.ts` as the AI Patent Strategy lane.
- `src/app/ai-patent-strategy-scorecard/page.tsx` renders the `PatentScorecard` component.
- `src/lib/campaigns.ts` maps the AI Patent lead magnet to `workflow:ai-patent-strategy` for future opted-in website leads only.
- This does not authorize applying workflow tags to AION, Nicholas Nunno, or any researched prospect.

Business-development and QMD lens:

- Business-development corpus search returned lead-magnet guidance consistent with value-first awareness: use a narrow educational lead magnet to earn attention before a stronger ask. The AION draft mostly follows this by teaching an AI robotics documentation map rather than pushing a consultation or implying a legal deficiency.
- QMD keyword search in `whiteford-ai-law-pages` for this exact AION / AI Patent awareness context returned no additional results; local artifact review, the prior AION review, and the business-development corpus were sufficient for this gate.

## Acceptance checklist

| Gate | Result | Notes |
| --- | --- | --- |
| Source evidence listed | PASS for internal review | First-party AION pages were accessible by direct fetch and support the general company/product facts used. Refresh within 24–48 hours before any proposed external use. |
| Offer-lane fit | PASS | AI Patent Strategy Scorecard is the best current lane for robotics/autonomy/edge-AI documentation hygiene. |
| Business-development posture | PASS | The post teaches a narrow practical issue and uses a soft scorecard CTA; it avoids a hard sales pitch. |
| No legal-problem implication | PASS with caution | The copy says “A Colorado robotics company like...” and frames the issue as general founder documentation hygiene. Preserve that category-wide framing and avoid adding language that implies AION has a patentability, ownership, trade-secret, FTO, or documentation problem. |
| Source-current precision | PASS for internal review; HOLD before public use | The direct fetch supports the facts today. Any public/manual use still needs a fresh source-current check near posting time because the AION site is dynamic and Wix-rendered. |
| Company tag posture | REVISE before final/public copy | Draft line 43 contains a bracketed company tag candidate inside the public-copy body. Remove it for a no-tag final copy unless Jeff approves the exact verified company page/handle. |
| Individual tag/name posture | REVISE before final/public copy | Draft line 65 contains a contact tag candidate prompt. Do not include any individual tag by default. If the person is mentioned internally, keep that outside public copy unless Jeff approves exact relevance and tag/no-tag posture. |
| CTA URL posture | HOLD before public use | Draft line 63 uses the bare route `/ai-patent-strategy-scorecard`. Jeff must approve the final production URL and UTM/no-UTM policy before manual posting. |
| Conflicts/suppression/Clio/prior-touch | HOLD before public use | The prior AION review recorded suppression, Clio, conflicts, opt-out, and duplicate-prior-touch as not checked / not cleared. No newer clearance evidence appears in this task. |
| HighLevel/CRM/workflow safety | PASS | Draft preserves no CRM mutation, no workflow enrollment, and no external outreach. Keep workflow tags limited to future voluntary opt-in leads. |
| Platform compliance | PASS with manual-use gate | Draft prohibits automation. Any future LinkedIn use must be manual by an authorized human after exact approval. |
| Metadata/status accuracy | MINOR FIX RECOMMENDED | Draft line 102 says Kanban task `t_cea1cbcd` was verified as `ready`; this review observed the task as `running`. Remove operational task-status text from any final copy or approval packet to avoid stale audit metadata. |

## Required revisions before any manual LinkedIn use

1. Create a final no-tag copy view with all bracketed tag-candidate text removed from the public-copy section.
2. Do not include individual tags. Do not include Nicholas Nunno in public copy unless Jeff and Whiteford approve exact relevance, source support, and tag/no-tag posture.
3. Re-check AION source-current facts within 24–48 hours of the proposed post time, including autonomous robotics, onboard AI, hardened autonomy, edge AI sensing/compute, physical task execution, investor-page AI framing, CEO title, and address if any are used.
4. Confirm the exact final CTA URL and UTM/no-UTM policy. Do not publish a bare internal route unless Jeff expressly approves that format.
5. Complete and document conflicts, suppression/DND, Clio/adverse-party, opt-out, and duplicate-prior-touch checks before any prospect-facing use.
6. Confirm the channel, posting human, timing, rollback owner, and archived final copy. No automation, scheduling, scraping, commenting, DMs, connection requests, or follow-up outreach should be bundled with this draft.
7. Remove stale operational text about Kanban status from any final approval packet.

## Recommended Jeff decision

Approve this draft only as an internal review artifact. If Jeff wants to consider an AION Robotics LinkedIn awareness post, prepare a separate exact-copy approval packet with the default posture: no company tag, no person tags, manual human posting only, exact approved CTA URL/UTM decision, fresh source-current evidence, documented conflicts/suppression/Clio/prior-touch clearance, and no CRM/workflow/outreach side effects.

## No-external-action confirmation

This review performed file review, local route checks, business-development corpus retrieval, QMD keyword search, public-source HTTP spot checks, and creation of this local review artifact only. It did not publish, schedule, tag, comment, message, connect, email, send SMS, mutate HighLevel, enroll workflows, move opportunities, write to Clio, write to Supabase, or approve any external action.
