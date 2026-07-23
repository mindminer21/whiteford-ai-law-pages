# Review — AMP LinkedIn Awareness Draft

Task: `t_e81b6210`
Reviewed at: 2026-05-10 07:38:43 MDT
Reviewer profile: `reviewer`
Tenant: `whiteford-mountain-west`
Source draft reviewed: `docs/growth-os/linkedin-awareness-drafts/2026-05-10/2026-05-10-amp-linkedin-awareness-draft.md`
Preflight template applied: `docs/growth-os/named_company_awareness_preflight_checklist_2026-05-08.md`

## Overall verdict

PASS for internal attorney-review-only decision prep.

REVISE before any exact copy/paste or manual LinkedIn use. The draft is directionally safe, first-party-source-tied, and a good AI Patent Strategy Scorecard fit, but the public-copy section still includes bracketed tag candidates and a bare/local CTA route. The currently suggested production URL `https://www.schellip.com/ai-patent-strategy-scorecard` returned HTTP 404 during this review, so no external copy should use that URL until Jeff verifies the intended domain, route, and UTM/no-UTM posture.

HOLD for every external action. This review does not approve publishing, scheduling, LinkedIn tagging, LinkedIn commenting, LinkedIn messages, connection requests, email/SMS outreach, HighLevel tag changes, workflow enrollment, opportunity movement, Clio writes, Supabase writes, CRM notes/tasks, ads, public-page changes, or any other prospect-facing/live-record action.

## Evidence and verification performed

Reviewed local artifacts:

- Draft under review: `docs/growth-os/linkedin-awareness-drafts/2026-05-10/2026-05-10-amp-linkedin-awareness-draft.md`
- Named-company awareness preflight checklist: `docs/growth-os/named_company_awareness_preflight_checklist_2026-05-08.md`
- CTA route map evidence: `src/lib/site.ts`, `src/app/ai-patent-strategy-scorecard/page.tsx`, `src/components/patent-scorecard.tsx`, and `src/lib/campaigns.ts`
- Kanban deliverable index: `docs/KANBAN_DELIVERABLE_INDEX.md`

Public-source spot checks from this review, using direct HTTP fetches because `web_extract` returned Firecrawl payment/quota errors:

- `https://ampsortation.com` returned HTTP 200. The fetched page text supports AMP positioning around AI-powered waste sorting solutions, AMP ONE, facilities for single-stream recycling and municipal solid waste, and use of artificial intelligence in sortation services.
- `https://ampsortation.com/about` returned HTTP 200. The fetched page text supports AMP applying AI and automation to waste sortation, being headquartered and having manufacturing operations in Colorado, building/deploying recycling technology, and having hundreds of systems installed across three continents.
- `https://ampsortation.com/about` page source supports leadership statements: Matanya Horowitz as Founder and CTO, Tim Stuart as Chief Executive Officer, and Horowitz as a named inventor on 61 granted patents and pending patent applications in the waste and recycling industry involving devices, systems, AI, and more.
- `https://www.schellip.com/ai-patent-strategy-scorecard` returned HTTP 404 in this review. Treat the external/public CTA URL as unresolved until Jeff confirms the intended production route and UTM/no-UTM policy.

CTA route verification:

- Local route `/ai-patent-strategy-scorecard` is mapped in `src/lib/site.ts` as the AI Patent lane.
- `src/app/ai-patent-strategy-scorecard/page.tsx` renders the `PatentScorecard` component.
- `src/lib/campaigns.ts` maps the AI Patent lead magnet to `workflow:ai-patent-strategy` and tags `leadmagnet:ai-patent-scorecard` / `interest:ai-patent-law` for future opted-in website leads only.
- This does not authorize applying workflow tags to AMP, Matanya Horowitz, Tim Stuart, or any researched prospect.

Business-development and QMD lens:

- Business-development corpus search returned lead-magnet guidance consistent with value-first awareness: a lead magnet should solve a narrow problem and build trust before a stronger ask. The AMP draft mostly follows this by teaching documentation hygiene for AI-enabled physical systems rather than pushing a consultation or implying a legal deficiency.
- QMD search in `whiteford-ai-law-pages` retrieved the named-company awareness preflight checklist and prior AI Patent awareness-route review context. Those local artifacts support the same gate posture: educational/category-wide copy only, no default tags, final URL/UTM verification, and no external action without exact approval.

## Acceptance checklist

| Gate | Result | Notes |
| --- | --- | --- |
| Source evidence listed | PASS for internal review | First-party AMP pages were accessible by direct fetch and support the general company, technology, Colorado, leadership, and patent/invention facts used. Refresh within 24–48 hours before any proposed external use. |
| Offer-lane fit | PASS | AI Patent Strategy Scorecard is the best current lane for an AI/automation/hardware/data/sensor documentation-hygiene lesson. |
| Business-development posture | PASS | The post gives a narrow educational diagnostic frame and uses a soft scorecard CTA; it avoids a hard sales pitch. |
| No legal-problem implication | PASS with caution | The copy says the lesson is “not company-specific” and disclaims any comment on AMP’s legal position. Preserve that language and avoid adding patent-gap, FTO, ownership, documentation-defect, or diligence-risk implications. |
| Source-current precision | PASS for internal review; HOLD before public use | Direct fetch supports the facts today. Any public/manual use still needs fresh source-current verification near posting time. |
| Company tag posture | REVISE before final/public copy | Draft line 38 contains a bracketed company tag candidate inside the public-copy body. Remove it for a no-tag final copy unless Jeff approves the exact verified LinkedIn company page/handle. |
| Individual tag/name posture | REVISE before final/public copy | Draft lines 61–62 contain contact tag candidate prompts. Do not include individual tags by default. Keep Matanya Horowitz and Tim Stuart references in evidence/internal notes unless Jeff approves exact public relevance and tag/no-tag posture. |
| CTA URL posture | HOLD before public use | Draft line 57 uses the bare route `/ai-patent-strategy-scorecard`, and the suggested `https://www.schellip.com/ai-patent-strategy-scorecard` URL returned HTTP 404. Jeff must approve the final production URL and UTM/no-UTM policy before manual posting. |
| Conflicts/suppression/Clio/prior-touch | HOLD before public use | This was a public-source fallback with no Growth OS/HighLevel record created or changed. No conflicts, Clio, suppression, DND, opt-out, or duplicate-prior-touch clearance evidence was produced in this task. |
| HighLevel/CRM/workflow safety | PASS | Draft preserves no CRM mutation, no workflow enrollment, and no external outreach. Keep workflow tags limited to future voluntary opt-in leads. |
| Platform compliance | PASS with manual-use gate | Draft prohibits automation. Any future LinkedIn use must be manual by an authorized human after exact approval. |
| Metadata/status accuracy | MINOR FIX RECOMMENDED | Draft line 80 says this task was verified as `ready`; this review observed it as `running`. Remove operational task-status text from any final approval packet to avoid stale audit metadata. |

## Required revisions before any manual LinkedIn use

1. Create a final no-tag copy view with all bracketed tag-candidate text removed from the public-copy section.
2. Do not include individual tags. Do not include Matanya Horowitz or Tim Stuart in public copy unless Jeff and Whiteford approve exact relevance, source support, and tag/no-tag posture.
3. Re-check AMP source-current facts within 24–48 hours of the proposed post time, including AI-powered waste sorting, AI/automation in waste sortation, Colorado headquarters/manufacturing operations, systems across three continents, leadership names/roles, and Horowitz patent/invention statement if any are used.
4. Confirm the exact final CTA URL and UTM/no-UTM policy. Do not use the currently suggested `https://www.schellip.com/ai-patent-strategy-scorecard` URL unless it is fixed or otherwise verified, because it returned HTTP 404 during this review.
5. Complete and document conflicts, suppression/DND, Clio/adverse-party, opt-out, and duplicate-prior-touch checks before any prospect-facing use.
6. Confirm the channel, posting human, timing, rollback owner, and archived final copy. No automation, scheduling, scraping, commenting, DMs, connection requests, or follow-up outreach should be bundled with this draft.
7. Remove stale operational text about Kanban status from any final approval packet.

## Recommended Jeff decision

Approve this draft only as an internal review artifact. If Jeff wants to consider an AMP LinkedIn awareness post, prepare a separate exact-copy approval packet with the default posture: no company tag, no person tags, manual human posting only, exact approved CTA URL/UTM decision, fresh source-current evidence, documented conflicts/suppression/Clio/prior-touch clearance, and no CRM/workflow/outreach side effects.

## No-external-action confirmation

This review performed file review, local route checks, business-development corpus retrieval, QMD keyword search, public-source HTTP spot checks, and creation of this local review artifact only. It did not publish, schedule, tag, comment, message, connect, email, send SMS, mutate HighLevel, enroll workflows, move opportunities, write to Clio, write to Supabase, or approve any external action.
