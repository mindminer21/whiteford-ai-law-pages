# Review — SkildAI LinkedIn Awareness Draft

Task: `t_e84bc491`
Reviewed at: 2026-06-01 07:41:19 MDT
Reviewer profile: `reviewer`
Tenant: `whiteford-mountain-west`
Source draft reviewed: `docs/growth-os/linkedin-awareness-drafts/2026-06-01/2026-06-01-skildai-linkedin-awareness-draft.md`
Preflight template applied: `docs/growth-os/named_company_awareness_preflight_checklist_2026-05-08.md`

## Overall verdict

PASS for internal attorney-review-only decision prep.

REVISE before any exact copy/paste or manual LinkedIn use. The draft is directionally safe, source-tied, and a reasonable AI Patent Strategy Scorecard awareness angle for a named physical-AI/robotics company. It keeps the legal point category-wide and repeatedly states that the post is not legal advice or a comment on SkildAI's legal posture. However, the public-copy section still includes bracketed company/contact tag candidates, uses a bare local CTA route instead of the currently verified production scorecard URL, includes a third-party funding phrasing that should be corrected against first-party Skild language, and includes stale Kanban-status text.

HOLD for every external action. This review does not approve publishing, scheduling, LinkedIn tagging, LinkedIn commenting, LinkedIn messages, connection requests, email/SMS outreach, HighLevel tag changes, workflow enrollment, opportunity movement, Clio writes, Supabase writes, CRM notes/tasks, ads, public-page changes, or any other prospect-facing/live-record action.

## Evidence and verification performed

Reviewed local artifacts:

- Draft under review: `docs/growth-os/linkedin-awareness-drafts/2026-06-01/2026-06-01-skildai-linkedin-awareness-draft.md`
- Agent-targeting work item: `docs/nightly-lead-research/runs/2026-06-01/agent-targeting-work-items/skildai.json`
- Nightly validation report: `docs/nightly-lead-research/runs/2026-06-01/validation_report.md`
- Named-company awareness preflight checklist: `docs/growth-os/named_company_awareness_preflight_checklist_2026-05-08.md`
- CTA route/code evidence: `src/app/ai-patent-strategy-scorecard/page.tsx`, `src/components/patent-scorecard.tsx`, `src/lib/site.ts`, `src/lib/campaigns.ts`, and `src/lib/magnets/finalization.ts`
- Kanban deliverable index: `docs/KANBAN_DELIVERABLE_INDEX.md`

Public-source spot checks from this review:

- `https://www.skild.ai/` returned HTTP 200 and HTML text supports Skild's public first-party positioning that physical AI should be “omni-bodied,” that Skild is building a unified omni-bodied brain to control any robot for any task, and that public application examples include security/inspection, mobile manipulation, and autonomous packing.
- `https://www.skild.ai/blogs/series-c` returned HTTP 200 and first-party text supports the January 14, 2026 Skild AI Series C announcement, $1.4B raised, SoftBank-led investment, NVentures (NVIDIA) participation, valuation over $14B, and mission to build a single general-purpose brain that can control any robot for any task.
- `https://techcrunch.com/2026/02/17/here-are-the-17-us-based-ai-companies-that-have-raised-100m-or-more-in-2026/` returned HTTP 200 and supports the TechCrunch roundup statement that SkildAI raised a $1.4B Series C at a $14B valuation announced January 14. It describes the round as led by SoftBank and Nvidia; for public copy, prefer first-party Skild wording: led by SoftBank, with NVentures/NVIDIA participation.
- `https://news.crunchbase.com/venture/robotics-startup-skild-ai-triples-valuation/` returned HTTP 200 and supports Crunchbase News reporting on Skild AI's $1.4B raise, over-$14B valuation, SoftBank/NVentures participation, Pittsburgh description, Deepak Pathak and Abhinav Gupta as co-founders, and omni-bodied robotics framing.
- `https://technical.ly/entrepreneurship/skild-ai-1-4-billion-raise/` returned HTTP 200 and supports Technical.ly reporting on East Liberty/Pittsburgh location, $1.4B raise, valuation over $14B, SoftBank-led round, NVentures participation, Deepak Pathak as CEO/cofounder, and Abhinav Gupta as cofounder.
- `https://www.cs.umd.edu/article/2025/01/softbank-invest-500-million-robotics-startup-skild-ai` returned HTTP 200 and supports UMD reporting on Abhinav Gupta and Deepak Pathak as Skild AI co-founders, their Carnegie Mellon professor background, and general-purpose robotics intelligence framing. Treat the 2025 investment/valuation details there as older context, not controlling current funding facts.
- Firecrawl/web_extract was unavailable because of insufficient credits; direct HTTP/text checks were used instead.

CTA route verification:

- Local route `/ai-patent-strategy-scorecard` exists in the codebase, and `src/lib/site.ts` maps AI Patent navigation to `/ai-patent-strategy-scorecard`.
- `src/lib/campaigns.ts` maps the AI Patent lane to `workflow:ai-patent-strategy`, `leadmagnet:ai-patent-scorecard`, and `interest:ai-patent-law` for future voluntary website opt-ins only.
- `https://learn.schellip.com/ai-patent-strategy-scorecard` returned HTTP 200 and displays the AI Patent Strategy Scorecard with educational-only / no-legal-advice / no-attorney-client disclaimer language and caution against confidential inputs.
- `https://www.schellip.com/ai-patent-strategy-scorecard` and `https://schellip.com/ai-patent-strategy-scorecard` returned HTTP 404 in direct checks. Treat `https://learn.schellip.com/ai-patent-strategy-scorecard` as the currently verified candidate production URL unless Jeff approves another domain or UTM policy.

Business-development and QMD lens:

- Business-development corpus search returned lead-magnet guidance consistent with using a narrow diagnostic/free tool to provide value before a stronger ask. The SkildAI draft follows this by teaching invention-record, human-contribution, patent/trade-secret, and contract-alignment questions rather than pitching representation or diagnosing SkildAI.
- QMD search in `whiteford-ai-law-pages` found existing named-company awareness and deliverable-index patterns, but did not return a better Skild-specific controlling artifact than the local draft, work item, and validation report reviewed above.

## Acceptance checklist

| Gate | Result | Notes |
| --- | --- | --- |
| Source evidence listed | PASS for internal review | The draft lists first-party Skild sources and corroborating third-party sources. Refresh all source URLs within 24–48 hours before any proposed external/manual use. |
| Entity/domain accuracy | PASS with cleanup | Use `Skild AI` as the safer public name unless Jeff specifically approves `SkildAI` branding. The first-party site uses `Skild AI`; Growth OS uses `SkildAI`. |
| Offer-lane fit | PASS | AI Patent Strategy Scorecard fits the category-wide physical-AI, robotics foundation model, human contribution, data/model ownership, patent/trade-secret, and contract-alignment theme. |
| Business-development posture | PASS | Narrow educational scorecard CTA is more appropriate than direct representation outreach. |
| No legal-problem implication | PASS with caution | The draft expressly says it is not company-specific legal advice and does not identify a SkildAI problem. Preserve or strengthen this sentence if final copy is shortened. |
| Funding/investor sensitivity | REVISE before final copy | The draft's evidence section says TechCrunch supports “SoftBank and Nvidia-led funding.” First-party Skild copy says SoftBank led, with NVentures/NVIDIA participating. Use first-party wording in any approval packet. |
| Source-current precision | PASS for internal review; HOLD before public use | Direct HTTP/text checks passed during this review. Any manual public use needs fresh source-current verification close to the post time. |
| Company tag posture | REVISE before final/public copy | The public-copy section includes bracketed company tag-candidate text. Remove bracketed tag text from exact public copy unless Jeff approves a verified page/handle. Default: no company tag. |
| Individual tag/name posture | REVISE before final/public copy | The public-copy section includes Deepak Pathak and Abhinav Gupta as tag candidates. Do not include individual tags by default; keep person-tag language in internal notes unless Jeff and Whiteford approve exact relevance, source support, and tag/no-tag posture. |
| Contact validation | HOLD before outreach/use as targeting | The nightly work item and validation report say Gate 4 named-contact validation failed and no named contacts were staged. The two founders are manual tag-review candidates only, not outreach targets. |
| CTA URL posture | REVISE before final/public copy | Draft uses the bare route `/ai-patent-strategy-scorecard`; the currently verified candidate production URL is `https://learn.schellip.com/ai-patent-strategy-scorecard`. Jeff must approve final URL and UTM/no-UTM policy. |
| Conflicts/suppression/Clio/prior-touch | HOLD before public use | This review did not clear conflicts, Clio, suppression/DND, opt-out, duplicate-prior-touch, prior-relationship, or adverse-party checks. |
| HighLevel/CRM/workflow safety | PASS | Draft preserves no CRM mutation, no workflow enrollment, and no external outreach. Keep workflow tags limited to future voluntary opt-in leads only. |
| Platform compliance | PASS with manual-use gate | Draft prohibits automation. Any future LinkedIn use must be manual by an authorized human after exact approval. |
| Metadata/status accuracy | MINOR FIX RECOMMENDED | Draft line 91 says this Kanban task was `ready` after final verification; this is stale once the reviewer claimed the task. Remove live task-status text from any final approval packet. |

## Required revisions before any manual LinkedIn use

1. Create a final no-tag copy view with the bracketed company and person tag-candidate lines removed from the public-copy section.
2. Do not include individual tags. Do not tag Deepak Pathak or Abhinav Gupta unless Jeff and Whiteford approve exact relevance, source support, LinkedIn profile/page verification, and tag/no-tag posture.
3. Decide whether to tag Skild AI at all. Default to no tag; if tagging is desired, verify the exact live LinkedIn company page because no live LinkedIn company URL was staged or checked in this review.
4. Replace the bare CTA route with an approved production URL or approved UTM link. The currently verified candidate is `https://learn.schellip.com/ai-patent-strategy-scorecard`.
5. Correct funding/investor phrasing to first-party wording: “led by SoftBank with participation from NVentures (NVIDIA)” if funding facts are used at all. Do not use “Nvidia-led” unless Jeff intentionally relies on and labels TechCrunch's third-party roundup wording.
6. Re-check Skild AI source-current facts within 24–48 hours of the proposed post time, including the public “omni-bodied” framing, product/application examples, Series C facts if used, and any founder/location facts if included.
7. Complete and document conflicts, suppression/DND, Clio/adverse-party, opt-out, duplicate-prior-touch, and prior-relationship checks before any prospect-facing use.
8. Remove stale operational text about Kanban task status from any final approval packet.
9. Confirm the channel, posting human, timing, rollback owner, and archived final copy. No automation, scheduling, scraping, commenting, DMs, connection requests, or follow-up outreach should be bundled with this draft.

## Suggested no-tag final-copy starting point for a later approval packet

Draft only — not approved for posting.

> Skild AI's public materials are a useful example of where robotics and AI patent strategy is heading.
>
> The company describes a general-purpose “omni-bodied” robotics intelligence platform — one brain that can control different robot bodies and tasks — with public examples around inspection, mobile manipulation, autonomous packing, and learning from human videos.
>
> For founders building in physical AI, the patent conversation usually cannot start with “file on the model.”
>
> The better first questions are more concrete:
>
> - What is the technical improvement — control architecture, data loop, training method, deployment feedback, robot/task generalization, or system integration?
> - Who contributed the human conception behind that improvement?
> - Which records show the path from insight to experiment to working system?
> - What belongs in a patent filing, and what should stay as trade secret/process know-how?
> - Do contractor, customer, vendor, and research-collaboration terms match the IP story?
>
> That is not a comment on Skild AI's legal posture. It is a practical operating issue for any AI/robotics team where technical differentiation moves faster than the paperwork.
>
> I put together an AI Patent Strategy Scorecard as a non-confidential way for founders and technical teams to organize those questions before a counsel-led review.
>
> Draft CTA for review: https://learn.schellip.com/ai-patent-strategy-scorecard
>
> Educational only — not legal advice, not an attorney-client relationship, and not a request for confidential invention details.

This no-tag version is only a starting point for a future exact-copy approval packet. It still requires source-current, conflicts/suppression/Clio/prior-touch, URL/UTM, channel/operator/timing/rollback, and Jeff approval gates.

## Recommended Jeff decision

Approve this draft only as an internal review artifact. If Jeff wants to consider a Skild AI LinkedIn awareness post, prepare a separate exact-copy/no-tag approval packet using the verified production CTA URL or approved alternative, fresh source evidence, first-party funding wording, conflicts/suppression/Clio/prior-touch clearance, manual human posting only, and no CRM/workflow/outreach side effects.

## No-external-action confirmation

This review performed file review, local route/code checks, business-development corpus retrieval, QMD keyword search, direct public-source URL/text spot checks, production URL HTTP/text checks, and creation of this local review artifact only. It did not publish, schedule, tag, comment, message, connect, email, send SMS, mutate HighLevel, enroll workflows, move opportunities, write to Clio, write to Supabase, or approve any external action.
