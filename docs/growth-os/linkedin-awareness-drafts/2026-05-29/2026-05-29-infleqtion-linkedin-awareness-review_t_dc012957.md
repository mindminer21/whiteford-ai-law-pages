# Review — Infleqtion LinkedIn Awareness Draft

Task: `t_dc012957`
Reviewed at: 2026-05-29 22:32:34 MDT
Reviewer profile: `reviewer`
Tenant: `whiteford-mountain-west`
Source draft reviewed: `docs/growth-os/linkedin-awareness-drafts/2026-05-29/2026-05-29-infleqtion-linkedin-awareness-draft.md`
Preflight template applied: `docs/growth-os/named_company_awareness_preflight_checklist_2026-05-08.md`

## Overall verdict

PASS for internal attorney-review-only decision prep.

REVISE before any exact copy/paste or manual LinkedIn use. The draft is directionally safe, source-tied, and a reasonable AI Patent Strategy Scorecard awareness angle for a Colorado/Mountain West quantum/deep-tech example. It correctly frames invention-record discipline as a category-level educational issue, not a diagnosis of Infleqtion. However, the public-copy section still contains bracketed company/contact tag candidates, uses a bare local CTA route, and relies on a public-market/investor-relations context that should be treated with extra sensitivity before any named-company public use. Create a final no-tag copy view, verify the production CTA URL/UTM posture, refresh sources close to posting time, and complete conflicts/suppression/Clio/prior-touch review before any human posting decision.

HOLD for every external action. This review does not approve publishing, scheduling, LinkedIn tagging, LinkedIn commenting, LinkedIn messages, connection requests, email/SMS outreach, HighLevel tag changes, workflow enrollment, opportunity movement, Clio writes, Supabase writes, CRM notes/tasks, ads, public-page changes, or any other prospect-facing/live-record action.

## Evidence and verification performed

Reviewed local artifacts:

- Draft under review: `docs/growth-os/linkedin-awareness-drafts/2026-05-29/2026-05-29-infleqtion-linkedin-awareness-draft.md`
- Named-company awareness preflight checklist: `docs/growth-os/named_company_awareness_preflight_checklist_2026-05-08.md`
- CTA route/code evidence: `src/app/ai-patent-strategy-scorecard/page.tsx`, `src/components/patent-scorecard.tsx`, `src/lib/site.ts`, and `src/lib/campaigns.ts`
- Kanban deliverable index: `docs/KANBAN_DELIVERABLE_INDEX.md`

Public-source spot checks from this review:

- `https://infleqtion.com/` returned HTTP 200 and supports first-party positioning around quantum computing, contextual machine learning, Superstaq quantum software, quantum sensing, and Sqale/neutral-atom quantum-computing language.
- `https://infleqtion.com/about/` returned HTTP 200 and supports Louisville, Colorado headquarters, Boulder, Colorado office, Matt Kinsella as Chief Executive Officer & Founding Investor, and Pranav Gokhale as Chief Technology Officer & Co-founder.
- `https://infleqtion.com/quantum-computing/` returned HTTP 200 and supports Sqale as Infleqtion’s quantum-computing product, with first-party page text including “full-stack” and “neutral atom” quantum-computer positioning.
- `https://infleqtion.com/contextual-machine-learning/` returned HTTP 200 and supports the Contextual Machine Learning product/page label and AI/quantum positioning.
- `https://infleqtion.com/quantum-software/` returned HTTP 200 and supports Superstaq quantum software/applications research positioning.
- `https://infleqtion.com/infleqtion-names-matthew-kinsella-ceo-to-lead-next-phase-of-quantum-innovation-and-growth/` returned HTTP 200 and supports the April 5, 2024 Boulder-datelined CEO appointment release.
- `https://ir.infleqtion.com/news-events/press-releases/detail/124/infleqtion-names-matthew-kinsella-chief-executive-officer-to-lead-next-phase-of-quantum-innovation-and-growth` returned HTTP 200 and corroborates the CEO appointment release on Infleqtion investor-relations infrastructure.

CTA route verification:

- Local route `/ai-patent-strategy-scorecard` exists in `src/app/ai-patent-strategy-scorecard/page.tsx` and is mapped in `src/lib/site.ts` as the AI Patent navigation lane.
- `src/components/patent-scorecard.tsx` includes no-confidential-information, educational-use, no-legal-advice, no-attorney-client, and optional unchecked educational email consent language.
- `src/lib/campaigns.ts` maps the AI Patent lane to `workflow:ai-patent-strategy`, `leadmagnet:ai-patent-scorecard`, and `interest:ai-patent-law` for future voluntary website opt-ins only.
- Production URL checks returned HTTP 404 for both `https://www.schellip.com/ai-patent-strategy-scorecard` and `https://schellip.com/ai-patent-strategy-scorecard` during this review. Treat the public/production CTA URL as unresolved until Jeff confirms intended domain, deployment status, and UTM/no-UTM posture.

Business-development and QMD lens:

- Business-development corpus search returned lead-magnet guidance consistent with using a narrow diagnostic/free tool to solve a specific problem and earn trust before any stronger ask. The Infleqtion draft follows this by teaching invention-record mapping rather than pitching representation or diagnosing Infleqtion.
- QMD search in `whiteford-ai-law-pages` confirmed the AI Patent Strategy Scorecard route/campaign mapping (`workflow:ai-patent-strategy`, `leadmagnet:ai-patent-scorecard`, `interest:ai-patent-law`).

## Acceptance checklist

| Gate | Result | Notes |
| --- | --- | --- |
| Source evidence listed | PASS for internal review | The draft lists first-party Infleqtion pages and an IR copy of the CEO release. Refresh all source URLs within 24–48 hours before any proposed external/manual use. |
| Entity/domain accuracy | PASS for draft | The draft uses accessible `infleqtion.com` and `ir.infleqtion.com` URLs. No Growth OS/CRM record was created or modified. |
| Colorado/Mountain West relevance | PASS | First-party about page supports Louisville HQ and Boulder office. The copy’s “Colorado has a front-row seat” phrasing is supported, but avoid implying Whiteford has reviewed or advises Infleqtion. |
| Offer-lane fit | PASS with CTA caution | AI Patent Strategy Scorecard fits the hardware/software/AI invention-record theme. Public production CTA URL is not verified; hold exact use until URL/UTM decision is approved. |
| Business-development posture | PASS | Narrow educational scorecard CTA is more appropriate than a direct representation pitch. |
| No legal-problem implication | PASS with caution | The copy says this is a category-wide issue and not a comment on Infleqtion’s legal position. Preserve and consider strengthening that sentence if final copy is shortened. |
| Public-market / investor-relations sensitivity | HOLD before public use | The IR source/ticker-style infrastructure makes this more sensitive than an ordinary private-company awareness post. Avoid claims about securities status, market performance, investors, public filings, forecasts, or valuation unless separately source-reviewed and attorney-approved. |
| Source-current precision | PASS for internal review; HOLD before public use | Direct page checks passed during this review. Any manual public use needs fresh source-current verification close to the post time. |
| Company tag posture | REVISE before final/public copy | The public-copy section includes bracketed company tag-candidate text. Remove bracketed tag text from the exact public copy unless Jeff approves a verified page/handle. Default: no company tag. |
| Individual tag/name posture | REVISE before final/public copy | The public-copy section includes Matt Kinsella as a tag candidate. Do not include individual tags by default; keep person-tag language in internal notes unless Jeff and Whiteford approve exact relevance, source support, and tag/no-tag posture. |
| CTA URL posture | HOLD before public use | Draft uses the bare route `/ai-patent-strategy-scorecard`; production checks returned 404. Jeff must approve final production URL and UTM/no-UTM policy before manual posting. |
| Conflicts/suppression/Clio/prior-touch | HOLD before public use | This review did not clear conflicts, Clio, suppression/DND, opt-out, duplicate-prior-touch, prior-relationship, or adverse-party checks. |
| HighLevel/CRM/workflow safety | PASS | Draft preserves no CRM mutation, no workflow enrollment, and no external outreach. Keep workflow tags limited to future voluntary opt-in leads only. |
| Platform compliance | PASS with manual-use gate | Draft prohibits automation. Any future LinkedIn use must be manual by an authorized human after exact approval. |
| Metadata/status accuracy | MINOR FIX RECOMMENDED | Draft line 91 says Kanban status was verified as `ready` after creation; this is already stale because the task is now running/reviewed. Remove live task-status text from any final approval packet. |

## Required revisions before any manual LinkedIn use

1. Create a final no-tag copy view with the bracketed company and person tag-candidate lines removed from the public-copy section.
2. Do not include individual tags. Do not tag Matt Kinsella or Pranav Gokhale unless Jeff and Whiteford approve exact relevance, source support, LinkedIn page/profile verification, and tag/no-tag posture.
3. Decide whether to tag the company at all. Default to no tag; if tagging is desired, verify the exact live LinkedIn company page because the draft notes both `linkedin.com/company/infq/` and `linkedin.com/company/infleqtion/` signals.
4. Confirm the exact final CTA URL and UTM/no-UTM policy. Do not use either checked Schell IP URL variant until the route is deployed or Jeff approves another production URL.
5. Re-check Infleqtion source-current facts within 24–48 hours of the proposed post time, including Colorado locations, leadership titles, Sqale positioning, contextual machine learning, quantum software/Superstaq, quantum sensing, and any IR/public-market sensitivity.
6. Complete and document conflicts, suppression/DND, Clio/adverse-party, opt-out, duplicate-prior-touch, and prior-relationship checks before any prospect-facing use.
7. Remove stale operational text about Kanban status from any final approval packet.
8. Confirm the channel, posting human, timing, rollback owner, and archived final copy. No automation, scheduling, scraping, commenting, DMs, connection requests, or follow-up outreach should be bundled with this draft.

## Recommended Jeff decision

Approve this draft only as an internal review artifact. If Jeff wants to consider an Infleqtion LinkedIn awareness post, prepare a separate exact-copy/no-tag approval packet with fresh source evidence, approved production CTA URL/UTM posture, documented public-market sensitivity review, conflicts/suppression/Clio/prior-touch clearance, manual human posting only, and no CRM/workflow/outreach side effects.

## No-external-action confirmation

This review performed file review, local route/code checks, business-development corpus retrieval, QMD keyword search, direct public-source URL spot checks, production URL HTTP checks, and creation of this local review artifact only. It did not publish, schedule, tag, comment, message, connect, email, send SMS, mutate HighLevel, enroll workflows, move opportunities, write to Clio, write to Supabase, or approve any external action.
