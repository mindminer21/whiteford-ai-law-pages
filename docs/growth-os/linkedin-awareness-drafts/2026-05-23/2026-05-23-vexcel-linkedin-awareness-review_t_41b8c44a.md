# Review — Vexcel LinkedIn Awareness Draft

Task: `t_41b8c44a`
Reviewed at: 2026-05-23 07:49:01 MDT
Reviewer profile: `reviewer`
Tenant: `whiteford-mountain-west`
Source draft reviewed: `docs/growth-os/linkedin-awareness-drafts/2026-05-23/2026-05-23-vexcel-linkedin-awareness-draft.md`
Preflight template applied: `docs/growth-os/named_company_awareness_preflight_checklist_2026-05-08.md`

## Overall verdict

PASS for internal attorney-review-only decision prep.

REVISE before any exact copy/paste or manual LinkedIn use. The draft is directionally safe, public-source-tied, and a strong AI Patent Strategy Scorecard fit for AI/geospatial/data-infrastructure invention-record education, but the public-copy section still includes bracketed company/contact tag candidates and a bare local CTA route. Create a final no-tag copy view and verify the exact production CTA URL/UTM posture before any human posting decision.

HOLD for every external action. This review does not approve publishing, scheduling, LinkedIn tagging, LinkedIn commenting, LinkedIn messages, connection requests, email/SMS outreach, HighLevel tag changes, workflow enrollment, opportunity movement, Clio writes, Supabase writes, CRM notes/tasks, ads, public-page changes, or any other prospect-facing/live-record action.

## Evidence and verification performed

Reviewed local artifacts:

- Draft under review: `docs/growth-os/linkedin-awareness-drafts/2026-05-23/2026-05-23-vexcel-linkedin-awareness-draft.md`
- Named-company awareness preflight checklist: `docs/growth-os/named_company_awareness_preflight_checklist_2026-05-08.md`
- CTA route map evidence: `src/lib/site.ts`, `src/app/ai-patent-strategy-scorecard/page.tsx`, `src/components/patent-scorecard.tsx`, `src/components/landing.tsx`, and `src/lib/campaigns.ts`
- Kanban deliverable index: `docs/KANBAN_DELIVERABLE_INDEX.md`

Public-source spot checks from this review:

- `https://vexceldata.com/` was accessible through `web_extract` and supports Vexcel positioning around high-accuracy aerial imagery, 3D/elevation/geospatial data, AI-enhanced data, Vexcel APIs/platform integrations, Vexcel Intelligence, and 45+ country/territory coverage.
- `https://vexceldata.com/intelligence/` was accessible through `web_extract` and supports Vexcel Intelligence as a Preview AI platform using high-resolution aerial imagery/geospatial data, semantic search, visual/contextual signals, change tracking, developer/team APIs and tools, and phased 2026 rollout language.
- `https://vexceldata.com/stories/introducing-vexcel-intelligence-ai-for-the-real-world/` was accessible through `web_extract` and supports the February 24, 2026 Vexcel Intelligence launch, the Group CEO Erik Jorgensen quote, physical-world search/query/reasoning framing, 7.5–15 cm imagery, dedicated aircraft/camera-sensor foundation, and use-case categories.
- `https://www.prnewswire.com/news-releases/vexcel-intelligence-gives-ai-eyes-making-the-world-searchable-for-the-first-time-302695220.html` was accessible through `web_extract` and supports the Denver-datelined announcement, high-resolution aerial imagery, physical-world search/query/reasoning, Erik Jorgensen as Group CEO, 45-country/territory coverage, petabytes of imagery/data, 7.5–15 cm resolution, and enterprise/government/AI-system audiences.
- `https://www.prnewswire.com/news-releases/vexcel-wins-geospatial-world-leadership-award-for-transformative-business-model-302758347.html` was accessible through `web_extract` and supports the Centennial, Colorado dateline, Geospatial World Leadership Award recognition, Vexcel's real-world AI/geospatial AI infrastructure positioning, and Erik Jorgensen as Chairman and Group CEO of Vexcel Imaging.
- `https://www.vexcel-imaging.com/` was accessible through `web_extract` and supports Vexcel Imaging positioning around UltraCam aerial mapping systems, UltraMap photogrammetry software, large-scale mapping, high-volume production, modular camera systems, hybrid LiDAR-imaging solutions, and mapping/customer workflow context.
- `https://www.vexcel-imaging.com/contact/` was accessible through `web_extract` and supports corporate offices in Graz, Austria and Denver/Centennial, Colorado; the North America office address at 12503 E Euclid Drive Unit 20, Centennial, CO 80111; and the Vexcel Imaging LinkedIn social link `https://www.linkedin.com/company/11503106/`.

CTA route verification:

- Local route `/ai-patent-strategy-scorecard` is mapped in `src/lib/site.ts` as the AI Patent lane.
- `src/app/ai-patent-strategy-scorecard/page.tsx` exists locally and renders the `PatentScorecard` component.
- `src/components/landing.tsx` maps the AI Patent offer slug to `/ai-patent-strategy-scorecard#scorecard` and campaign key `ai-patent`.
- `src/lib/campaigns.ts` maps the AI Patent lead magnet to `workflow:ai-patent-strategy` and tags `leadmagnet:ai-patent-scorecard` / `interest:ai-patent-law` for future opted-in website leads only.
- `https://www.schellip.com/ai-patent-strategy-scorecard` returned HTTP 404 during this review. Treat the production/public CTA URL as unresolved until Jeff confirms the intended domain and UTM/no-UTM posture.
- This does not authorize applying workflow tags to Vexcel, Erik Jorgensen, or any researched prospect.

Business-development and QMD lens:

- Business-development corpus search returned lead-magnet guidance consistent with value-first awareness: a lead magnet should solve a narrow problem, make the reader aware of a specific issue where appropriate, and earn attention before a stronger ask. The Vexcel draft follows this by teaching invention-record mapping for AI/geospatial systems rather than pushing a consultation or implying a legal deficiency.
- QMD search in `whiteford-ai-law-pages` retrieved the named-company awareness preflight checklist and prior AI Patent LinkedIn awareness review context. Those local artifacts support the same gate posture: educational/category-wide copy only, no default tags, final URL/UTM verification, conflicts/suppression/prior-touch clearance, and no external action without exact approval.

## Acceptance checklist

| Gate | Result | Notes |
| --- | --- | --- |
| Source evidence listed | PASS for internal review | First-party Vexcel pages plus PR Newswire corroboration were accessible through review-time extraction and support the general company, technology, geography, product, and leadership facts used. Refresh within 24–48 hours before any proposed external use. |
| Offer-lane fit | PASS | AI Patent Strategy Scorecard is a strong fit for an AI/geospatial/sensor/data/software documentation-hygiene lesson. |
| Business-development posture | PASS | The draft gives a narrow educational diagnostic frame and uses a soft scorecard CTA; it avoids a hard sales pitch. |
| No legal-problem implication | PASS with caution | The draft states the lesson is not company-specific and says it does not imply Vexcel has an IP, patent, ownership, disclosure, compliance, or legal problem. Preserve that language and avoid adding Vexcel-specific patent-gap, FTO, ownership, documentation-defect, disclosure-risk, customer, or diligence implications. |
| Source-current precision | PASS for internal review; HOLD before public use | Sources support internal drafting today. Any public/manual use still needs fresh source-current verification near posting time. |
| Company/entity naming | PASS with caution | The draft distinguishes Vexcel Data Program / Vexcel / Vexcel Imaging and cites both vexceldata.com and vexcel-imaging.com. For final copy, keep entity naming simple and avoid implying the exact LinkedIn page/entity unless verified by Jeff. |
| Company tag posture | REVISE before final/public copy | Draft lines 45 and 28–29 include company tag candidates. Remove bracketed tag text from final copy unless Jeff approves an exact verified LinkedIn company page/handle. Default: no tag. |
| Individual tag/name posture | REVISE before final/public copy | Draft lines 30 and 71 include an Erik Jorgensen contact tag candidate. Do not include individual tags by default. Keep leadership names in evidence/internal notes unless Jeff and Whiteford approve exact public relevance and tag/no-tag posture. |
| CTA URL posture | HOLD before public use | Draft line 67 uses the bare route `/ai-patent-strategy-scorecard`, and `https://www.schellip.com/ai-patent-strategy-scorecard` returned HTTP 404 in this review. Jeff must approve the final production URL and UTM/no-UTM policy before manual posting. |
| Conflicts/suppression/Clio/prior-touch | HOLD before public use | This was a public-source fallback with no Growth OS/HighLevel record created or changed. No conflicts, Clio, suppression, DND, opt-out, or duplicate-prior-touch clearance evidence was produced in this task. |
| HighLevel/CRM/workflow safety | PASS | Draft preserves no CRM mutation, no workflow enrollment, and no external outreach. Keep workflow tags limited to future voluntary opt-in leads. |
| Platform compliance | PASS with manual-use gate | Draft prohibits automation. Any future LinkedIn use must be manual by an authorized human after exact approval. |
| Metadata/status accuracy | MINOR FIX RECOMMENDED | Draft line 96 includes operational Kanban status text. Remove task-status text from any final approval packet to avoid stale audit metadata. |

## Required revisions before any manual LinkedIn use

1. Create a final no-tag copy view with all bracketed tag-candidate text removed from the public-copy section.
2. Do not include individual tags. Do not include Erik Jorgensen in public copy unless Jeff and Whiteford approve exact relevance, source support, and tag/no-tag posture.
3. Re-check Vexcel source-current facts within 24–48 hours of the proposed post time, including Vexcel Intelligence status/rollout, AI/geospatial positioning, Denver/Centennial nexus, leadership names/roles if used internally, and any country/coverage/resolution claims.
4. Confirm the exact final CTA URL and UTM/no-UTM policy. Do not use `https://www.schellip.com/ai-patent-strategy-scorecard` unless it is fixed or otherwise verified, because it returned HTTP 404 during this review.
5. Complete and document conflicts, suppression/DND, Clio/adverse-party, opt-out, and duplicate-prior-touch checks before any prospect-facing use.
6. Confirm the channel, posting human, timing, rollback owner, and archived final copy. No automation, scheduling, scraping, commenting, DMs, connection requests, or follow-up outreach should be bundled with this draft.
7. Remove stale operational text about Kanban status from any final approval packet.

## Recommended Jeff decision

Approve this draft only as an internal review artifact. If Jeff wants to consider a Vexcel LinkedIn awareness post, prepare a separate exact-copy approval packet with the default posture: no company tag, no person tags, manual human posting only, exact approved CTA URL/UTM decision, fresh source-current evidence, documented conflicts/suppression/Clio/prior-touch clearance, and no CRM/workflow/outreach side effects.

## No-external-action confirmation

This review performed file review, local route checks, business-development corpus retrieval, QMD keyword search, public-source web extraction, and creation of this local review artifact only. It did not publish, schedule, tag, comment, message, connect, email, send SMS, mutate HighLevel, enroll workflows, move opportunities, write to Clio, write to Supabase, or approve any external action.
