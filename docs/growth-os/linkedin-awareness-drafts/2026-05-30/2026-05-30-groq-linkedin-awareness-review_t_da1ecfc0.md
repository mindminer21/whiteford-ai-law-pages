# Review — Groq LinkedIn Awareness Draft

Task: `t_da1ecfc0`
Reviewed at: 2026-05-30 07:39:31 MDT
Reviewer profile: `reviewer`
Tenant: `whiteford-mountain-west`
Source draft reviewed: `docs/growth-os/linkedin-awareness-drafts/2026-05-30/2026-05-30-groq-linkedin-awareness-draft.md`
Preflight template applied: `docs/growth-os/named_company_awareness_preflight_checklist_2026-05-08.md`

## Overall verdict

PASS for internal attorney-review-only decision prep.

REVISE before any exact copy/paste or manual LinkedIn use. The draft is directionally safe, source-tied, and a reasonable AI Patent Strategy Scorecard awareness angle for a named AI infrastructure company. It does a good job making the point category-wide and expressly says the post is not a comment on Groq's legal posture. However, the public-copy section still includes bracketed company/contact tag candidates, uses a bare local CTA route instead of the currently working production scorecard URL, and relies on a TechCrunch/Axios funding/licensing article that should be treated as third-party reporting and refreshed close to any posting decision.

HOLD for every external action. This review does not approve publishing, scheduling, LinkedIn tagging, LinkedIn commenting, LinkedIn messages, connection requests, email/SMS outreach, HighLevel tag changes, workflow enrollment, opportunity movement, Clio writes, Supabase writes, CRM notes/tasks, ads, public-page changes, or any other prospect-facing/live-record action.

## Evidence and verification performed

Reviewed local artifacts:

- Draft under review: `docs/growth-os/linkedin-awareness-drafts/2026-05-30/2026-05-30-groq-linkedin-awareness-draft.md`
- Agent-targeting work item: `docs/nightly-lead-research/runs/2026-05-30/agent-targeting-work-items/groq-inc.json`
- Nightly validation report: `docs/nightly-lead-research/runs/2026-05-30/validation_report.md`
- Named-company awareness preflight checklist: `docs/growth-os/named_company_awareness_preflight_checklist_2026-05-08.md`
- CTA route/code evidence: `src/app/ai-patent-strategy-scorecard/page.tsx`, `src/components/patent-scorecard.tsx`, `src/lib/site.ts`, `src/lib/campaigns.ts`, and `src/lib/magnets/finalization.ts`
- Kanban deliverable index: `docs/KANBAN_DELIVERABLE_INDEX.md`

Public-source spot checks from this review:

- `https://groq.com/` returned HTTP 200 and the browser-rendered page supports Groq's public positioning as fast, low-cost inference; GroqCloud; custom silicon; LPU architecture; LPU-based globally deployed inference stack; McLaren F1 Team selection for global inference; and “3M developers and teams.”
- `https://techcrunch.com/2026/05/29/after-nvidias-20b-not-acqui-hire-ai-chip-startup-groq-reportedly-raising-650m/` returned HTTP 200 and the browser-rendered page supports the article title, May 29, 2026 timestamp, reported $650M raise from existing investors via Axios sourcing, discussion of a reported $20B Nvidia not-acquisition/licensing arrangement, and Adam Winter / Matt Eng as interim CEO / CFO in that article.
- Firecrawl and `web_extract` were unavailable because of insufficient credits; browser checks and direct HTTP status checks were used instead.

CTA route verification:

- Local route `/ai-patent-strategy-scorecard` exists in the codebase, and `src/lib/site.ts` maps AI Patent navigation to `/ai-patent-strategy-scorecard`.
- `src/lib/campaigns.ts` maps the AI Patent lane to `workflow:ai-patent-strategy`, `leadmagnet:ai-patent-scorecard`, and `interest:ai-patent-law` for future voluntary website opt-ins only.
- `src/lib/magnets/finalization.ts` contains the scorecard/legal-disclaimer language: general informational only, not legal advice, no attorney-client relationship, no confidential/privileged/trade-secret information, conflicts check/written engagement letter requirement, attorney advertising, and no similar-outcome guarantee.
- Production URL checks returned HTTP 404 for `https://www.schellip.com/ai-patent-strategy-scorecard` and `https://schellip.com/ai-patent-strategy-scorecard`.
- `https://learn.schellip.com/ai-patent-strategy-scorecard` returned HTTP 200 and the browser-rendered page title is “AI Patent Strategy Scorecard | Learn Schell IP.” The page displays the no-confidential-information / educational-only / no-legal-advice / no-attorney-client disclaimer gate and categorical-input caution. Treat this as the currently verified candidate production URL unless Jeff approves another domain or UTM policy.

Business-development and QMD lens:

- Business-development corpus search returned lead-magnet guidance consistent with using a narrow diagnostic/free tool to solve a specific problem and earn trust before a stronger ask. The Groq draft follows this by teaching invention-record mapping and scorecard use rather than pitching representation or diagnosing Groq.
- QMD search in `whiteford-ai-law-pages` found the 2026-05-30 digest and t_2ad6423c review confirming all three staged 2026-05-30 prospects route to the AI Patent Strategy Scorecard and remain internal-only/no-send/no-workflow.

## Acceptance checklist

| Gate | Result | Notes |
| --- | --- | --- |
| Source evidence listed | PASS for internal review | The draft lists Groq first-party and TechCrunch article URLs. Refresh all source URLs within 24–48 hours before any proposed external/manual use. |
| Entity/domain accuracy | PASS for draft | Draft uses `Groq, Inc.` and `groq.com`. Headquarters/location remains unverified; do not use Santa Cruz/location in public copy unless separately verified. |
| Offer-lane fit | PASS | AI Patent Strategy Scorecard fits the category-wide custom silicon, cloud inference, invention-record, and patent/trade-secret theme. |
| Business-development posture | PASS | Narrow educational scorecard CTA is more appropriate than direct representation outreach. |
| No legal-problem implication | PASS with caution | The public copy expressly says the post is not a comment on Groq's legal posture. Preserve this sentence if final copy is shortened. |
| Third-party funding/licensing sensitivity | HOLD before public use | TechCrunch/Axios funding and Nvidia licensing details are third-party reported. Avoid over-weighting these facts in public copy unless refreshed and lawyer-approved. The current draft mostly avoids them in the public post, which is safer. |
| Source-current precision | PASS for internal review; HOLD before public use | Browser checks passed during this review. Any manual public use needs fresh source-current verification close to the post time. |
| Company tag posture | REVISE before final/public copy | The public-copy section includes bracketed company tag-candidate text. Remove bracketed tag text from the exact public copy unless Jeff approves a verified page/handle. Default: no company tag. |
| Individual tag/name posture | REVISE before final/public copy | The public-copy section includes Adam Winter and Matt Eng as tag candidates. Do not include individual tags by default; keep person-tag language in internal notes unless Jeff and Whiteford approve exact relevance, source support, and tag/no-tag posture. |
| CTA URL posture | REVISE before final/public copy | Draft uses the bare route `/ai-patent-strategy-scorecard`; the currently verified candidate production URL is `https://learn.schellip.com/ai-patent-strategy-scorecard`. Jeff must approve final URL and UTM/no-UTM policy. |
| Conflicts/suppression/Clio/prior-touch | HOLD before public use | This review did not clear conflicts, Clio, suppression/DND, opt-out, duplicate-prior-touch, prior-relationship, or adverse-party checks. |
| HighLevel/CRM/workflow safety | PASS | Draft preserves no CRM mutation, no workflow enrollment, and no external outreach. Keep workflow tags limited to future voluntary opt-in leads only. |
| Platform compliance | PASS with manual-use gate | Draft prohibits automation. Any future LinkedIn use must be manual by an authorized human after exact approval. |
| Metadata/status accuracy | MINOR FIX RECOMMENDED | Draft line 84 says Kanban status was verified as `ready` after creation; this is stale once review starts. Remove live task-status text from any final approval packet. |

## Required revisions before any manual LinkedIn use

1. Create a final no-tag copy view with the bracketed company and person tag-candidate lines removed from the public-copy section.
2. Do not include individual tags. Do not tag Adam Winter or Matt Eng unless Jeff and Whiteford approve exact relevance, source support, LinkedIn profile/page verification, and tag/no-tag posture.
3. Decide whether to tag Groq at all. Default to no tag; if tagging is desired, verify the exact live LinkedIn company page because no live LinkedIn company URL was staged or checked in this review.
4. Confirm the exact final CTA URL and UTM/no-UTM policy. Do not use the two checked Schell IP root-domain URL variants until deployed or separately approved; `https://learn.schellip.com/ai-patent-strategy-scorecard` is the currently verified candidate URL.
5. Re-check Groq source-current facts within 24–48 hours of the proposed post time, including custom silicon/LPU, GroqCloud, developer/team count, McLaren/customer reference if used, and any TechCrunch/Axios funding/licensing/leadership facts.
6. Complete and document conflicts, suppression/DND, Clio/adverse-party, opt-out, duplicate-prior-touch, and prior-relationship checks before any prospect-facing use.
7. Remove stale operational text about Kanban status from any final approval packet.
8. Confirm the channel, posting human, timing, rollback owner, and archived final copy. No automation, scheduling, scraping, commenting, DMs, connection requests, or follow-up outreach should be bundled with this draft.

## Suggested no-tag final-copy starting point for a later approval packet

Draft only — not approved for posting.

> Groq is a useful public example of a broader AI infrastructure issue: when the product is both custom hardware and a cloud inference platform, the “IP strategy” conversation is not just “should we file a patent?”
>
> It is usually a record-mapping exercise:
>
> - What is the technical contribution?
> - Who contributed to conception and reduction to practice?
> - Which parts should be patented, kept as trade secrets, or handled through contracts/licensing?
> - How do product roadmap, customer deployment, and partner discussions change the disclosure timeline?
>
> That is not a comment on Groq’s legal posture. It is a practical issue for any team building AI infrastructure, robotics, chips, developer tools, or applied AI systems where technical differentiation moves faster than the paperwork.
>
> I put together an AI Patent Strategy Scorecard as a non-confidential way for founders and technical leaders to organize those questions before a counsel-led review.
>
> Draft CTA for review: https://learn.schellip.com/ai-patent-strategy-scorecard
>
> Educational only — not legal advice, not an attorney-client relationship, and not a request for confidential invention details.

This no-tag version is only a starting point for a future exact-copy approval packet. It still requires source-current, conflicts/suppression/Clio/prior-touch, URL/UTM, channel/operator/timing/rollback, and Jeff approval gates.

## Recommended Jeff decision

Approve this draft only as an internal review artifact. If Jeff wants to consider a Groq LinkedIn awareness post, prepare a separate exact-copy/no-tag approval packet using the verified production CTA URL or approved alternative, fresh source evidence, documented third-party-reporting sensitivity, conflicts/suppression/Clio/prior-touch clearance, manual human posting only, and no CRM/workflow/outreach side effects.

## No-external-action confirmation

This review performed file review, local route/code checks, business-development corpus retrieval, QMD keyword search, direct public-source URL/browser spot checks, production URL HTTP/browser checks, and creation of this local review artifact only. It did not publish, schedule, tag, comment, message, connect, email, send SMS, mutate HighLevel, enroll workflows, move opportunities, write to Clio, write to Supabase, or approve any external action.
