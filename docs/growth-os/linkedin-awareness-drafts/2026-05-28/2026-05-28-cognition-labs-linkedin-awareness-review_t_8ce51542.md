# Review — Cognition Labs LinkedIn Awareness Draft

Task: `t_8ce51542`
Reviewed at: 2026-05-28 07:40:09 MDT
Reviewer profile: `reviewer`
Tenant: `whiteford-mountain-west`
Source draft reviewed: `docs/growth-os/linkedin-awareness-drafts/2026-05-28/2026-05-28-cognition-labs-linkedin-awareness-draft.md`
Preflight template applied: `docs/growth-os/named_company_awareness_preflight_checklist_2026-05-08.md`

## Overall verdict

PASS for internal attorney-review-only decision prep.

REVISE before any exact copy/paste or manual LinkedIn use. The draft is directionally safe, source-tied, and a reasonable Tech Company Legal Health Checklist / outside-GC awareness angle for a public AI software scale-up example. However, the public-copy section still contains bracketed company/contact tag candidates and a bare local CTA route; the CTA is Colorado-branded while the company is San Francisco-based; and the upstream local Growth OS packet has a canonical-domain mismatch (`cognition.com` in JSON, while the draft/public sources use `cognition.ai`). Before any human posting decision, create a final no-tag copy view, verify the production CTA URL/UTM posture, refresh sources, resolve the domain metadata issue for any future CRM sync, and complete conflicts/suppression/Clio/prior-touch review.

HOLD for every external action. This review does not approve publishing, scheduling, LinkedIn tagging, LinkedIn commenting, LinkedIn messages, connection requests, email/SMS outreach, HighLevel tag changes, workflow enrollment, opportunity movement, Clio writes, Supabase writes, CRM notes/tasks, ads, public-page changes, or any other prospect-facing/live-record action.

## Evidence and verification performed

Reviewed local artifacts:

- Draft under review: `docs/growth-os/linkedin-awareness-drafts/2026-05-28/2026-05-28-cognition-labs-linkedin-awareness-draft.md`
- Named-company awareness preflight checklist: `docs/growth-os/named_company_awareness_preflight_checklist_2026-05-08.md`
- Agent-targeting work item: `docs/nightly-lead-research/runs/2026-05-28/agent-targeting-work-items/cognition-labs.json`
- CTA route map evidence: `src/lib/site.ts`, `src/app/colorado-tech-general-counsel/page.tsx`, `src/components/landing.tsx`, and `src/lib/campaigns.ts`/local campaign references found by search
- Kanban deliverable index: `docs/KANBAN_DELIVERABLE_INDEX.md`

Public-source spot checks from this review:

- `https://cognition.ai/` opened in browser and supports the first-party statement that Cognition operates Devin, “the first autonomous software engineer,” and builds tools for software creation. It also displays customer/logo context, including enterprise/government logos. Do not expand customer/government references in public copy unless separately approved.
- `https://cognition.ai/blog/series-d` opened in browser and supports the May 27, 2026 first-party statements that Cognition raised over $1B at a $26B valuation led by Lux Capital, General Catalyst, and 8VC; launched Devin two years ago; grew run-rate revenue to $492M; and identifies large organization/customer examples.
- `https://techcrunch.com/2026/05/27/ai-coding-startup-cognition-raises-1b-at-25b-pre-money-valuation/` opened in browser and corroborates more than $1B raised, $25B pre-money / $26B post-money valuation, Devin as an autonomous AI software engineer, Windsurf acquisition context, enterprise customers, $492M annualized run-rate revenue, and 50% month-over-month enterprise usage growth for six months.
- `https://cognition.ai/blog/windsurf` opened in browser and supports first-party July 14, 2025 acquisition language: definitive agreement to acquire Windsurf, including IP, product, trademark/brand, business, and people.
- `https://cognition.ai/blog/introducing-devin` opened in browser and supports the March 12, 2024 introduction of Devin as the first AI software engineer and describes it as able to independently complete tasks for human review.
- `https://en.wikipedia.org/wiki/Scott_Wu` opened in browser and supports Scott Wu as co-founder of Cognition AI. Treat Wikipedia only as a low-friction contact/tag aid, not controlling proof for a LinkedIn tag or recipient decision.

CTA route verification:

- Local route `/colorado-tech-general-counsel` exists in `src/app/colorado-tech-general-counsel/page.tsx` and is mapped in `src/lib/site.ts` as the Technology outside general counsel / Tech GC lane.
- Local components map `colorado-tech-general-counsel` to the Tech GC variant and display the Tech Company Legal Health Checklist module.
- Production URL checks returned HTTP 404 for both `https://www.schellip.com/colorado-tech-general-counsel` and `https://schellip.com/colorado-tech-general-counsel` during this review. Treat the public/production CTA URL as unresolved until Jeff confirms the intended domain, deployment status, and UTM/no-UTM posture.
- The draft’s route/HighLevel tag references must remain future opt-in lead-flow metadata only; this review does not authorize applying tags to Cognition Labs or Scott Wu.

Business-development and QMD lens:

- Business-development corpus search returned lead-magnet guidance consistent with using a narrow diagnostic tool to make the relevant problem visible before any stronger ask. The Cognition draft follows this by teaching operating-system/legal-health questions rather than pitching representation or diagnosing Cognition.
- QMD search in `business-development-books` separately returned narrow-problem lead-magnet guidance. QMD search in `whiteford-ai-law-pages` surfaced existing deliverable-index context for this task; direct file review remained controlling for the draft and preflight.

## Acceptance checklist

| Gate | Result | Notes |
| --- | --- | --- |
| Source evidence listed | PASS for internal review | The draft lists first-party Cognition pages, TechCrunch corroboration, and Wikipedia as a low-confidence contact aid. Refresh all sources within 24–48 hours before any proposed external/manual use. |
| Entity/domain accuracy | PASS for draft; FIX UPSTREAM BEFORE SYNC | The draft uses accessible `cognition.ai` URLs. The local work item JSON lists `domain: cognition.com` and `website_url: https://cognition.com/`, which conflicts with the opened first-party sources. Do not sync or use the local company domain field externally until corrected/verified. |
| Offer-lane fit | PASS with CTA/geography caution | Tech GC / legal operating-system framing fits the product, customer, fundraising, and acquisition context. Because Cognition is San Francisco-based and the route/checklist is Colorado-branded, Jeff should explicitly approve using this Colorado CTA with a national named-company example or revise CTA wording. |
| Business-development posture | PASS | The draft uses a narrow checklist/issue-spotting CTA and avoids a hard sales pitch. |
| No legal-problem implication | PASS with caution | The draft expressly says the takeaway is not that Cognition has a problem and frames the issues as broad AI-founder operating questions. Preserve this language. |
| Sensitive customer/government/investor posture | PASS with caution | The public-copy section avoids naming specific customers, government entities, or investors. Keep detailed names in evidence/internal notes unless exact attorney approval approves public use. |
| Source-current precision | PASS for internal review; HOLD before public use | Sources were accessible during review, but any public/manual use needs a fresh source-current check close to posting time. |
| Geography / targeting posture | PASS with caution | Draft correctly says not to make a Mountain West/local claim. CTA wording should not imply Cognition is a Colorado company or that Whiteford has assessed Cognition’s Colorado legal needs. |
| Company tag posture | REVISE before final/public copy | Draft public-copy lines include bracketed company tag-candidate text. Remove bracketed tag text from the exact public copy unless Jeff approves a verified page/handle. Default: no company tag. |
| Individual tag/name posture | REVISE before final/public copy | Draft public-copy lines include Scott Wu as a contact tag candidate. Do not include individual tags by default. Keep person-tag language in internal notes unless Jeff and Whiteford approve exact relevance, source support, and tag/no-tag posture. |
| CTA URL posture | HOLD before public use | Draft uses the bare route `/colorado-tech-general-counsel`; production checks returned 404. Jeff must approve the final production URL and UTM/no-UTM policy before manual posting. |
| Conflicts/suppression/Clio/prior-touch | HOLD before public use | This review did not clear conflicts, Clio, suppression/DND, opt-out, duplicate-prior-touch, prior-relationship, or adverse-party checks. |
| HighLevel/CRM/workflow safety | PASS | Draft preserves no CRM mutation, no workflow enrollment, and no external outreach. Keep workflow tags limited to future voluntary opt-in leads only. |
| Platform compliance | PASS with manual-use gate | Draft prohibits automation. Any future LinkedIn use must be manual by an authorized human after exact approval. |
| Metadata/status accuracy | MINOR FIX RECOMMENDED | Draft line 103 says latest Kanban status verified as running. Remove live task-status text from any final approval packet because it will become stale. |

## Required revisions before any manual LinkedIn use

1. Create a final no-tag copy view with all bracketed company and person tag-candidate text removed from the public-copy section.
2. Do not include individual tags. Do not tag Scott Wu unless Jeff and Whiteford approve exact relevance, source support, LinkedIn page/profile verification, and tag/no-tag posture.
3. Decide whether the Colorado-branded Tech Company Legal Health Checklist is the approved CTA for a national/San Francisco company example. If yes, make the CTA wording clearly reader-directed and not a Cognition-specific/local claim; if no, reroute to a more generally framed Tech GC/AI law asset.
4. Confirm the exact final CTA URL and UTM/no-UTM policy. Do not use either checked Schell IP URL variant until the route is deployed or Jeff approves another production URL.
5. Correct or quarantine the upstream `cognition.com` / `https://cognition.com/` domain fields before any HighLevel/Supabase/CRM sync or external approval packet relies on company metadata.
6. Re-check Cognition source-current facts within 24–48 hours of the proposed post time, including financing/valuation, run-rate revenue, customer/adoption language, Windsurf acquisition language, Devin positioning, and Scott Wu role/tag candidates if used internally.
7. Complete and document conflicts, suppression/DND, Clio/adverse-party, opt-out, and duplicate-prior-touch checks before any prospect-facing use.
8. Confirm the channel, posting human, timing, rollback owner, and archived final copy. No automation, scheduling, scraping, commenting, DMs, connection requests, or follow-up outreach should be bundled with this draft.
9. Remove stale operational text about Kanban status from any final approval packet.

## Recommended Jeff decision

Approve this draft only as an internal review artifact. If Jeff wants to consider a Cognition Labs LinkedIn awareness post, prepare a separate exact-copy/no-tag approval packet with fresh source evidence, an approved production CTA URL, a clear national-vs-Colorado CTA decision, resolved domain metadata, documented conflicts/suppression/Clio/prior-touch clearance, manual human posting only, and no CRM/workflow/outreach side effects.

## No-external-action confirmation

This review performed file review, local route checks, business-development corpus retrieval, QMD keyword searches, public-source browser spot checks, production URL HTTP checks, and creation of this local review artifact only. It did not publish, schedule, tag, comment, message, connect, email, send SMS, mutate HighLevel, enroll workflows, move opportunities, write to Clio, write to Supabase, or approve any external action.
