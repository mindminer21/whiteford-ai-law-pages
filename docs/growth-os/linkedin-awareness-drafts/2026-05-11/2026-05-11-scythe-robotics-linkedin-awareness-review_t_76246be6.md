# Review — Scythe Robotics LinkedIn Awareness Draft

Task: `t_76246be6`
Reviewed at: 2026-05-11 09:50:05 EDT
Reviewer profile: `reviewer`
Tenant: `whiteford-mountain-west`
Source draft reviewed: `docs/growth-os/linkedin-awareness-drafts/2026-05-11/2026-05-11-scythe-robotics-linkedin-awareness-draft.md`
Preflight template applied: `docs/growth-os/named_company_awareness_preflight_checklist_2026-05-08.md`

## Overall verdict

PASS for internal attorney-review-only decision prep.

REVISE before any exact copy/paste or manual LinkedIn use. The draft is directionally safe, first-party-source-tied, and a strong Founder M&A Readiness Checklist fit because Scythe itself publicly announced an acquisition and transition context. But the public-copy block still contains bracketed tag candidates and a bare local CTA route, and both tested public `schellip.com` route candidates returned HTTP 404 during this review. No external copy should use those routes until Jeff verifies the intended production domain, exact URL, and UTM/no-UTM posture.

HOLD for every external action. This review does not approve publishing, scheduling, LinkedIn tagging, LinkedIn commenting, LinkedIn messages, connection requests, email/SMS outreach, HighLevel tag changes, workflow enrollment, opportunity movement, Clio writes, Supabase writes, CRM notes/tasks, ads, public-page changes, or any other prospect-facing/live-record action.

## Evidence and verification performed

Reviewed local artifacts:

- Draft under review: `docs/growth-os/linkedin-awareness-drafts/2026-05-11/2026-05-11-scythe-robotics-linkedin-awareness-draft.md`
- Named-company awareness preflight checklist: `docs/growth-os/named_company_awareness_preflight_checklist_2026-05-08.md`
- CTA/campaign map evidence: `src/lib/site.ts` and `src/lib/campaigns.ts`
- Kanban deliverable index: `docs/KANBAN_DELIVERABLE_INDEX.md`

Public-source spot checks from this review, using direct HTTP fetches because `web_extract` returned Firecrawl payment/quota errors:

- `https://www.scytherobotics.com/blog-posts/then-now-next` returned fetchable HTML. The fetched page source supports the title/description tying the post to Jack Morrison and Davis Foster reflecting on Scythe's acquisition by ASI, the statement that Autonomous Solutions, Inc. of Utah acquired Scythe Robotics, and the transition language that M.52 operations/account management/customer support/field service would continue from Scythe's Colorado HQ and across the country, with M.52 development continuing within ASI Landscaping.
- `https://www.scytherobotics.com/contact-us` returned fetchable HTML and supports the listed address `2120 Miller Dr, Longmont, CO 80501`.
- `https://www.scytherobotics.com/meet-m-52` returned fetchable HTML and supports M.52 positioning as an all-electric/self-driving/autonomous commercial mower.
- `https://www.scytherobotics.com/about-scythe` returned fetchable HTML and supports Scythe's mission/technology/product context and company-site navigation to M.52/About/Resources.
- `https://www.scytherobotics.com/blog-posts/leadership-change-marks-new-chapter-for-scythe` returned fetchable HTML and supports the May 30, 2025 title, author Jack Morrison, and leadership-change context; use any team-size/commercialization-scaling claims only after a tighter visible-text source-current review before public use.
- The Scythe site HTML includes the LinkedIn company-page candidate `https://www.linkedin.com/company/scythe-robotics/`; this was not independently verified as the current exact LinkedIn page for tagging.

CTA route verification:

- Local `src/lib/site.ts` maps the M&A lane to slug `/colorado-startup-ma-lawyer`, with lead magnet `Founder M&A Readiness Checklist`, primary CTA `Run the M&A readiness check`, and service path `Founder M&A Readiness Review`.
- Local `src/lib/campaigns.ts` maps `ma-readiness` to trigger tag `workflow:ma-readiness` and tags `leadmagnet:ma-readiness-checklist` / `interest:ma-readiness` for future opted-in website leads only.
- Public route tests for `https://www.schellip.com/colorado-startup-ma-lawyer` and `https://www.schellip.com/founder-ma-readiness-checklist` returned HTTP 404 in this review. Treat the external/public CTA URL as unresolved until Jeff confirms the intended production route and UTM/no-UTM policy.
- This does not authorize applying workflow tags to Scythe, Jack Morrison, Davis Foster, ASI, or any researched prospect/contact.

Business-development and QMD lens:

- Business-development corpus search returned lead-magnet guidance consistent with narrow-problem, value-first awareness: a useful lead magnet should surface a specific problem, help readers self-identify readiness gaps, and build trust before a stronger ask. The Scythe draft mostly follows this by making the M&A readiness checklist a non-confidential diagnostic for founders generally rather than a direct pitch to Scythe.
- QMD search in `whiteford-ai-law-pages` retrieved the named-company awareness preflight checklist and prior named-company LinkedIn review patterns. Those artifacts support the same gate posture: source-current named-company facts, no default tags, no legal-problem implication, final URL/UTM verification, conflicts/suppression/Clio/prior-touch clearance, and exact Jeff approval before any manual external action.

## Acceptance checklist

| Gate | Result | Notes |
| --- | --- | --- |
| Source evidence listed | PASS for internal review | First-party Scythe pages were accessible by direct HTTP fetch and support the acquisition, M.52, Longmont address, site LinkedIn-company candidate, and Jack/Davis cofounder facts used in the draft. Refresh within 24-48 hours before any proposed external use. |
| Offer-lane fit | PASS | Founder M&A Readiness is the best current lane for an educational lesson drawn from a public acquisition/transition milestone. |
| Business-development posture | PASS | The post uses a narrow readiness diagnostic and soft CTA; it does not pressure Scythe or imply Scythe should become a lead. |
| No legal-problem implication | PASS with caution | The draft repeatedly says it is not a legal comment on Scythe and not a statement that Scythe has any legal or diligence issue. Preserve that language and avoid adding any implication that Scythe had cleanup gaps, diligence defects, transition risk, IP/customer/employee/data problems, or unmet legal needs. |
| Source-current precision | PASS for internal review; HOLD before public use | Direct fetch supports the core facts today, but any public/manual use still needs fresh source-current verification near posting time. Treat the 2025 leadership/team-size/commercialization claims as optional internal context unless reconfirmed carefully. |
| Company tag posture | REVISE before final/public copy | Draft line 51 contains a bracketed company tag candidate inside the public-copy body. Remove it for a no-tag final copy unless Jeff approves the exact verified LinkedIn company page/handle. |
| Individual tag/name posture | REVISE before final/public copy | Draft lines 72-73 contain Jack Morrison and Davis Foster contact tag candidate prompts. Do not include individual tags by default. If the public copy names them, keep it limited to first-party-source attribution and only after Jeff approves relevance and tag/no-tag posture. |
| CTA URL posture | HOLD before public use | Draft line 70 uses the bare route `/colorado-startup-ma-lawyer`; public `schellip.com` tests for `/colorado-startup-ma-lawyer` and `/founder-ma-readiness-checklist` returned HTTP 404. Jeff must approve the final production URL and UTM/no-UTM policy before manual posting. |
| Conflicts/suppression/Clio/prior-touch | HOLD before public use | This was a public-source fallback with no Growth OS/HighLevel record created or changed. No conflicts, Clio, suppression, DND, opt-out, or duplicate-prior-touch clearance evidence was produced in this task. |
| HighLevel/CRM/workflow safety | PASS | Draft preserves no CRM mutation, no workflow enrollment, and no external outreach. Keep workflow tags limited to future voluntary opt-in leads. |
| Platform compliance | PASS with manual-use gate | Draft prohibits automation. Any future LinkedIn use must be manual by an authorized human after exact approval. |
| Metadata/status accuracy | MINOR FIX RECOMMENDED | Draft line 106 says the task was verified as `running` immediately after creation. Remove operational task-status text from any final approval packet to avoid stale audit metadata. |

## Required revisions before any manual LinkedIn use

1. Create a final no-tag copy view with all bracketed tag-candidate text removed from the public-copy section.
2. Do not include individual tags. Do not tag Jack Morrison or Davis Foster by default. If names are retained in public copy, use them only as first-party source attribution after Jeff confirms relevance and exact tag/no-tag posture.
3. Re-check Scythe source-current facts within 24-48 hours of the proposed post time, including ASI acquisition, M.52/ASI Landscaping transition language, Colorado HQ/customer support/service language, Longmont address if used, and any leadership/cofounder names.
4. Confirm the exact final CTA URL and UTM/no-UTM policy. Do not use public `schellip.com/colorado-startup-ma-lawyer` or `schellip.com/founder-ma-readiness-checklist` unless fixed or otherwise verified, because both returned HTTP 404 during this review.
5. Complete and document conflicts, suppression/DND, Clio/adverse-party, opt-out, and duplicate-prior-touch checks before any prospect-facing use.
6. Confirm the channel, posting human, timing, rollback owner, and archived final copy. No automation, scheduling, scraping, commenting, DMs, connection requests, or follow-up outreach should be bundled with this draft.
7. Remove stale operational text about Kanban status from any final approval packet.

## Recommended Jeff decision

Approve this draft only as an internal review artifact. If Jeff wants to consider a Scythe Robotics LinkedIn awareness post, prepare a separate exact-copy approval packet with the default posture: no company tag, no person tags, manual human posting only, exact approved CTA URL/UTM decision, fresh source-current evidence, documented conflicts/suppression/Clio/prior-touch clearance, and no CRM/workflow/outreach side effects.

## No-external-action confirmation

This review performed file review, local route checks, business-development corpus retrieval, QMD keyword search, public-source HTTP spot checks, and creation of this local review artifact only. It did not publish, schedule, tag, comment, message, connect, email, send SMS, mutate HighLevel, enroll workflows, move opportunities, write to Clio, write to Supabase, or approve any external action.
