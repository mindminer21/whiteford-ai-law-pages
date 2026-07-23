# YouTube hub + landing-page SEO support audit — 2026-05-11

Status: INTERNAL DRAFT / NO-MUTATION SEO RECOMMENDATIONS ONLY / ATTORNEY-REVIEW-ONLY.

No production code was edited. No deploy, publishing, CRM/HighLevel, Supabase, Clio, social, email, workflow, contact enrollment, or public action was performed.

## Scope

Routes audited against the 2026-05-11 weekly @SchellIP YouTube brief:

- `/ai-law-youtube`
- `/ai-patent-strategy-scorecard`
- `/ai-compliance-gameplan`
- `/colorado-tech-general-counsel`
- `/colorado-startup-ma-lawyer`

Primary source materials reviewed:

- `docs/growth-os/authority-content/2026-05-11_weekly_schellip_youtube_seo_brief.md`
- `docs/growth-os/authority-content/2026-05-11_source_current_seo_refresh.md`
- `src/app/ai-law-youtube/page.tsx`
- `src/app/ai-patent-strategy-scorecard/page.tsx`
- `src/app/ai-compliance-gameplan/page.tsx`
- `src/app/colorado-tech-general-counsel/page.tsx`
- `src/app/colorado-startup-ma-lawyer/page.tsx`
- `src/components/landing.tsx`
- `src/lib/site.ts`
- `src/lib/campaigns.ts`
- `src/app/layout.tsx`

Note: The local business-development RAG command was attempted because this is offer/funnel/YouTube strategy work, but the profile-resolved path reported the index as unavailable from this worker context. I therefore relied on the parent task’s already-recorded RAG principle: earned YouTube/search traffic should convert to a narrow diagnostic lead magnet before asking for a bounded next step.

## Executive findings

1. The routes are present and internally connected, but the YouTube hub queue is stale against the 2026-05-11 brief. The biggest no-code recommendation is to refresh the hub’s visible `initialQueue` copy so the public queue mirrors the source-current weekly brief.
2. Crawlability is likely fine for the audited routes because the pages are normal App Router pages, but no `robots.ts`, `robots.txt`, `sitemap.ts`, or sitemap file was found. Add explicit robots and sitemap support before public launch.
3. Indexability is not blocked in the code inspected, but canonical URLs are not explicitly declared per route. Add `alternates.canonical` and route-specific Open Graph/Twitter metadata before publishing.
4. Metadata exists, but most titles are short/default and not aligned to the week’s search evidence. Expand page titles/descriptions with route-specific, source-current phrasing.
5. No FAQPage, VideoObject, Clip, BreadcrumbList, LegalService, or WebPage JSON-LD implementation was found. For this week, add FAQ blocks and JSON-LD plans first; add VideoObject/Clip only when final YouTube URLs, thumbnails, upload dates, durations, and chapters exist.
6. Internal links are useful and mostly coherent. Add cross-links from each landing page back to the YouTube hub and to the sibling route that matches the video journey.
7. Page-speed risk is currently moderate/low because the audited pages appear static and image-light. Future YouTube embeds are the main risk; use thumbnails/lite embeds until user interaction and keep iframes lazy.
8. Broken-link risk: internal app routes referenced by the audited pages exist. The hub currently points the Deal-Ready Founder show to `/colorado-startup-ma-lawyer#lead-magnet`, but the route’s more specific CTA sends users to `/founder-ma-readiness-checklist#checklist`; decide whether the hub should link to the landing page or directly to the guarded checklist.

## Technical SEO baseline

| Area | Current observation | Risk | No-mutation recommendation |
| --- | --- | --- | --- |
| Crawlability | App routes exist under `src/app`; no inspected code sets `noindex`; no robots file found. | Medium before public launch. | Add `src/app/robots.ts` or public `robots.txt` allowing the public routes and pointing to sitemap. |
| XML sitemap | No `sitemap.ts` or sitemap file found. | Medium. | Add `src/app/sitemap.ts` with homepage plus audited routes and future video watch/episode URLs. |
| Indexability | No explicit noindex found; static content is server-rendered enough for crawlable copy. | Low/medium. | Keep lead magnets crawlable where public; consider `noindex` only for private/test/report-result pages, not these public authority routes. |
| Canonicals | `metadataBase` exists in `layout.tsx`, but route-level canonicals were not found. | Medium. | Add `alternates: { canonical: "/route" }` per page. |
| Metadata | Page metadata exists but is short and sometimes generic. | Medium. | Expand title/description per below; add Open Graph/Twitter route metadata. |
| Headings | H1/H2 structure is generally sound; hub and landing pages have clear H1s. | Low. | Add FAQ H2 sections after primary CTA/lead magnet sections; avoid multiple competing H1s. |
| Schema | No JSON-LD implementation found. | Medium/high for video rollout. | Add WebPage/BreadcrumbList now; FAQPage after copy approval; VideoObject/Clip after final video asset data exists. |
| Internal links | Header nav links five core assets; hub links to lead magnets; landings link to guarded tools/checklists. | Low/medium. | Add contextual links back to `/ai-law-youtube` and route-to-route links from the relevant FAQ/CTA sections. |
| Redirects | No redirect config found in inspected files. | Unknown/low. | Before public launch, define any legacy/campaign aliases deliberately; avoid accidental duplicate URLs. |
| Broken links | Internal route targets appear present. External links were not re-crawled in this task; parent task verified official anchors. | Medium. | Run a pre-launch link check once routes are served locally/preview; verify source anchors on publication day. |
| Page speed | No heavy media found in current hub; fonts and icons are the main shared dependencies. | Low now; medium after embeds. | Use lite YouTube embeds, lazy loading, fixed thumbnail dimensions, and avoid third-party embeds above the fold. |

## Route-by-route recommendations

### 1. `/ai-law-youtube`

Current fit:

- Metadata: `Schell IP AI Law YouTube Authority Hub` with a broad description.
- H1: “Build @SchellIP into the Colorado AI law and AI patent strategy channel.”
- Programming lanes align to AI Patent, Colorado AI Law, Founder Legal OS, and Deal-Ready Founder.
- Current recording queue is stale versus the 2026-05-11 weekly brief.

Recommended title/description:

- Title: `@SchellIP AI Law YouTube Hub: AI Patent, Colorado AI Act, and M&A Diligence Briefs`
- Description: `Weekly @SchellIP recording queue for AI patent strategy, Colorado AI Act readiness, tech outside general counsel, and founder M&A diligence topics routed to non-confidential Whiteford lead magnets.`

Refresh the hub queue copy to match the 2026-05-11 brief:

1. `AI Helped Build It. What Should You Document Before a Patent Review?`
   - Primary search target: `AI patent lawyer`
   - Lead magnet: `AI Patent Strategy Scorecard`
   - CTA route: `/ai-patent-strategy-scorecard?utm_source=youtube&utm_medium=video&utm_campaign=2026-05-11-ai-patent-human-contribution`
   - Tag notes: `workflow:ai-patent-strategy`, `leadmagnet:ai-patent-scorecard`, `interest:ai-patent-law`, `source:youtube` only after consent-gated opt-in.

2. `Colorado AI Act Compliance Date: What Changed and What to Inventory Now`
   - Primary search target: `Colorado AI Act compliance date`
   - Lead magnet: `AI Compliance Gameplan Builder`
   - CTA route: `/ai-compliance-gameplan?utm_source=youtube&utm_medium=video&utm_campaign=2026-05-11-colorado-ai-act-inventory`
   - Tag notes: `workflow:ai-compliance-readiness`, `leadmagnet:ai-compliance-gameplan`, `interest:ai-compliance`, `source:youtube` only after consent-gated opt-in.

3. `AI Due Diligence in M&A: What Founders Should Organize Before a Buyer Asks`
   - Primary search target: `AI due diligence M&A`
   - Lead magnet: `Founder M&A Readiness Checklist`
   - CTA route: `/colorado-startup-ma-lawyer?utm_source=youtube&utm_medium=video&utm_campaign=2026-05-11-ai-ma-diligence`
   - Optional direct guarded checklist route after landing-page intro: `/founder-ma-readiness-checklist#checklist`
   - Tag notes: `workflow:ma-readiness`, `leadmagnet:ma-readiness-checklist`, `interest:ma-readiness`, `source:youtube` only after consent-gated opt-in.

Recommended hub FAQ block:

- `What should an AI patent founder document before a patent review?`
  - Answer angle: human contribution, problem framing, technical choices, validation, ownership context, and non-confidential scorecard inputs.
- `What changed in the Colorado AI Act compliance timeline?`
  - Answer angle: SB25B-004 extended SB24-205 requirements to June 30, 2026; SB26-189 should be described with current bill-status language pending attorney review.
- `How should founders prepare AI, data, and IP records before M&A diligence?`
  - Answer angle: organize records and owners before a buyer/investor request list; avoid promising deal speed or valuation impact.
- `Should viewers send confidential details through these tools?`
  - Answer angle: no; use categorical, non-confidential inputs only; representation requires conflicts review and written engagement.

Internal-link additions:

- Add a short “This week’s route map” module linking all three weekly video CTAs.
- Add contextual links from each show card to the relevant source-current landing page, not just the lead magnet.
- Add a footer/contextual link to `/colorado-ai-compliance-lawyer` because the header includes it but the hub hero emphasizes only the gameplan builder.

### 2. `/ai-patent-strategy-scorecard`

Current fit:

- Good privacy posture: non-confidential scorecard language appears in metadata and page framing.
- H1 aligns to source-current angle: score the AI-assisted invention record before patent strategy gets expensive.
- Source links include USPTO AI resources, FAQ, and AI Patent Dataset, but not the 2025 revised inventorship guidance anchor from the parent refresh.

Recommended title/description:

- Title: `AI Patent Strategy Scorecard for AI-Assisted Inventions`
- Description: `Use a non-confidential scorecard to organize human contribution, inventorship documentation, ownership, vendor terms, and patent strategy questions before an AI patent review.`

FAQ block:

- `Can AI be named as an inventor on a patent application?`
  - Answer angle: USPTO materials emphasize natural-person inventors and human contribution; do not turn this into an opinion on a viewer’s facts.
- `What records help an AI patent lawyer evaluate human contribution?`
  - Answer angle: prompts are not enough; include problem framing, design decisions, prototypes, tests, architecture notes, validation, and ownership context.
- `Should I submit invention details through the scorecard?`
  - Answer angle: no confidential, trade-secret, source-code, unpublished technical, or matter-specific details.
- `How does the scorecard connect to patent, trade secret, and contract strategy?`
  - Answer angle: use it to identify categories for a reviewed strategy call, not to determine patentability or ownership.

Schema plan:

- Add `WebPage` + `FAQPage` after attorney review.
- Add `BreadcrumbList`: Home > AI Patent Strategy Scorecard.
- Do not add `HowTo` unless the tool becomes a true step-by-step public process; current legal-risk posture is safer as FAQ/WebPage.

Internal-link additions:

- Link back to `/ai-law-youtube` with copy such as “Watch the AI Patent Brief that explains how to use this scorecard.”
- Link to `/colorado-startup-ma-lawyer` in the ownership/diligence context because AI patent records often resurface in buyer diligence.
- Add a route-safe source-current note pointing to the USPTO 2025 revised guidance in public copy only after attorney review.

### 3. `/ai-compliance-gameplan`

Current fit:

- Strong privacy and no-confidential-information warning already appears near the hero.
- Metadata is useful but broad.
- Source-current note is present, but the route could better align to the weekly `Colorado AI Act compliance date` topic.

Recommended title/description:

- Title: `AI Compliance Gameplan Builder for Colorado AI Act Readiness`
- Description: `Build a non-confidential AI use-case inventory, vendor-risk map, human-review checklist, and 30/60/90-day readiness plan before a Colorado AI compliance strategy call.`

FAQ block:

- `What should Colorado companies inventory before building an AI policy?`
  - Answer angle: use cases, owners, vendors, data categories, output use, human review, record locations, and consequential-decision exposure for counsel review.
- `Is the Colorado AI Act compliance date final?`
  - Answer angle: SB25B-004 extended SB24-205 requirements to June 30, 2026; SB26-189 requires current bill-status language and attorney review before public statements.
- `Is this gameplan a compliance determination?`
  - Answer angle: no; it is educational readiness triage, not legal advice or a coverage/compliance conclusion.
- `What information should not be submitted?`
  - Answer angle: no employee/applicant/customer/patient-specific facts, regulated data, confidential vendor terms, security incidents, or disputes.

Schema plan:

- Add `WebPage`, `FAQPage`, and `BreadcrumbList` after attorney review.
- If a public video is embedded on this route, add route-specific `VideoObject` for the Colorado AI Act episode, not a generic hub-level video object.

Internal-link additions:

- Link to `/colorado-ai-compliance-lawyer` as the broader service page after the builder explanation.
- Link to `/ai-law-youtube` with “Watch the Colorado AI Law Brief.”
- Add a supporting link to `/colorado-tech-general-counsel` for companies needing recurring AI vendor/governance operating support.

### 4. `/colorado-tech-general-counsel`

Current fit:

- Page is powered by shared `OfferLandingPage` data.
- Metadata from `src/lib/site.ts`: `Colorado Tech Outside General Counsel`; description focuses on legal operating system.
- Good lead-magnet fit: Tech Company Legal Health Checklist.
- Search evidence from the parent task says exact `tech outside general counsel Colorado` is weak; use it as supporting local-service language, not as the primary YouTube keyword.

Recommended title/description:

- Title: `Colorado Tech Outside General Counsel for AI, IP, Contracts, and Growth`
- Description: `Outside general counsel support for Colorado technology companies moving from patent strategy into contracts, hiring, fundraising, AI governance, data risk, and growth-stage legal operations.`

FAQ block:

- `When does a Colorado technology company need outside general counsel?`
  - Answer angle: when contract, hiring, IP, privacy, AI/data, fundraising, and customer-risk issues are too broad for one-off legal fixes.
- `How does outside GC support connect to AI vendor and data governance?`
  - Answer angle: create intake, vendor review, contract, human-review, documentation, and escalation workflows.
- `Is this the right route for AI-agent procurement or AI vendor review?`
  - Answer angle: yes for operational legal infrastructure; link to AI Compliance Gameplan for initial AI-readiness mapping.
- `What should not be submitted through the checklist?`
  - Answer angle: no confidential contracts, employee facts, customer names, disputes, regulated data, or matter-specific details.

Schema plan:

- Add `LegalService` only if final public launch approves Whiteford/Schell IP business identity, geography, and attorney-advertising disclaimers.
- Add `FAQPage`, `WebPage`, and `BreadcrumbList` first.

Internal-link additions:

- Link to `/ai-law-youtube` from a “Watch Founder Legal Operating System” or “AI-agent procurement brief” module.
- Link to `/ai-compliance-gameplan` where the page discusses AI governance and vendor workflows.
- Link to `/colorado-startup-ma-lawyer` where the page discusses deal readiness, diligence, or financing events.

### 5. `/colorado-startup-ma-lawyer`

Current fit:

- Page is powered by shared `OfferLandingPage` data.
- Metadata from `src/lib/site.ts`: `Colorado Startup M&A Lawyer`; description is founder-facing and readiness-oriented.
- Strong match for the weekly video topic `AI due diligence in M&A`.
- Current proof/promise includes valuation/friction language; keep public copy careful to avoid promising transaction outcomes.

Recommended title/description:

- Title: `Colorado Startup M&A Lawyer for Founder Diligence Readiness`
- Description: `Founder-facing M&A readiness support for organizing IP ownership, customer/vendor contracts, corporate records, employment issues, AI/data/privacy diligence, and pre-deal cleanup before buyer or investor diligence.`

FAQ block:

- `What should founders organize before a buyer starts diligence?`
  - Answer angle: cap table support, corporate records, IP assignments, customer/vendor contracts, employment/contractor records, AI/data/privacy, disputes, and owners for each cleanup step.
- `How does AI due diligence in M&A differ from using AI tools for diligence?`
  - Answer angle: this route is about the target company’s AI/data/IP records and risk posture, not generic AI tools for buyer diligence.
- `Does M&A readiness guarantee a faster deal or better valuation?`
  - Answer angle: no; it is preparation and issue-spotting, not an outcome promise.
- `Should founders submit deal details or buyer names through the checklist?`
  - Answer angle: no pending deal facts, buyer names, cap table details, contracts, valuation data, customer names, or confidential diligence documents.

Schema plan:

- Add `FAQPage`, `WebPage`, and `BreadcrumbList` after review.
- Add `LegalService` only under the same launch/attorney-advertising conditions as the Tech GC page.
- If embedding the weekly M&A video, add a dedicated `VideoObject` with `Clip` chapters matching the final timestamps.

Internal-link additions:

- Add a contextual link to `/colorado-tech-general-counsel` for companies that are not selling now but need an operating-system cleanup path.
- Link back to `/ai-law-youtube` as “Watch the Deal-Ready Founder brief.”
- Consider whether the primary CTA should remain `/founder-ma-readiness-checklist#checklist` after visitors understand the landing-page context, while YouTube descriptions initially point to `/colorado-startup-ma-lawyer`.

## VideoObject and Clip schema plan

Use Google’s VideoObject guidance from the parent source-current refresh. Do not ship generic or placeholder video schema.

### Required per-video data before schema is added

- Final public YouTube URL or embed URL.
- Final video title.
- Unique video description.
- Thumbnail URL.
- Upload date.
- Duration in ISO 8601 format.
- Final chapter timestamps and names.
- Final canonical landing/watch URL.
- Attorney-reviewed disclaimer/caveat copy.

### Recommended JSON-LD shape per embedded video

- `@type`: `VideoObject`
- `name`: final video title
- `description`: unique, route-specific description
- `thumbnailUrl`: approved thumbnail URL
- `uploadDate`: final upload date
- `duration`: ISO 8601 duration
- `embedUrl`: YouTube embed URL
- `contentUrl`: only if an approved content URL exists; otherwise omit or use embed per Google guidance
- `publisher`: approved Whiteford/Schell IP publisher entity after brand review
- `potentialAction`: optional `SeekToAction` if using URL timestamp patterns
- `hasPart`: array of `Clip` objects for key moments

### Suggested Clip chapters for this week

AI Patent video:

1. `AI use is not the whole patent question`
2. `Human contribution records`
3. `Prompts, prototypes, tests, and architecture notes`
4. `Ownership, vendors, contractors, and assignments`
5. `Patent, trade secret, and disclosure timing`
6. `Use the AI Patent Strategy Scorecard`

Colorado AI Act video:

1. `Compliance-date question`
2. `Inventory before policy`
3. `Consequential-decision exposure for counsel review`
4. `Vendor and contract triage`
5. `Human review and records`
6. `Build the AI Compliance Gameplan`

AI diligence / M&A video:

1. `Deal readiness is not only financial`
2. `Core diligence categories`
3. `Exists somewhere vs ready to explain`
4. `AI, data, IP, vendor, and product-claim records`
5. `Outside-GC cleanup path`
6. `Run the Founder M&A Readiness Checklist`

## CTA / UTM / privacy-safe route mapping

Default rule: YouTube descriptions and pinned comments can carry UTMs, but the app should not push workflow tags or contact enrollment unless the user affirmatively requests results and consents to the relevant marketing workflow. Avoid putting sensitive audience facts in UTM values.

| Video | Primary route | Recommended CTA | Privacy-safe UTM | Consent-gated tags only after opt-in |
| --- | --- | --- | --- | --- |
| AI Patent Brief | `/ai-patent-strategy-scorecard` | `Run the AI Patent Strategy Scorecard with non-confidential answers.` | `utm_source=youtube&utm_medium=video&utm_campaign=2026-05-11-ai-patent-human-contribution` | `workflow:ai-patent-strategy`, `leadmagnet:ai-patent-scorecard`, `interest:ai-patent-law`, `source:youtube` |
| Colorado AI Law Brief | `/ai-compliance-gameplan` | `Build a non-confidential AI Compliance Gameplan.` | `utm_source=youtube&utm_medium=video&utm_campaign=2026-05-11-colorado-ai-act-inventory` | `workflow:ai-compliance-readiness`, `leadmagnet:ai-compliance-gameplan`, `interest:ai-compliance`, `source:youtube` |
| AI Due Diligence / M&A | `/colorado-startup-ma-lawyer` | `Start with the Founder M&A Readiness Checklist.` | `utm_source=youtube&utm_medium=video&utm_campaign=2026-05-11-ai-ma-diligence` | `workflow:ma-readiness`, `leadmagnet:ma-readiness-checklist`, `interest:ma-readiness`, `source:youtube` |
| Tech OGC supporting mention | `/colorado-tech-general-counsel` | `Use the Tech Company Legal Health Checklist for ongoing legal operating-system cleanup.` | `utm_source=youtube&utm_medium=video&utm_campaign=2026-05-11-tech-ogc-support` | `workflow:tech-gc-launchpad`, `leadmagnet:tech-gc-checklist`, `interest:tech-ogc`, `source:youtube` |

Privacy-safe UTM rules:

- Do not include company names, individual names, matter facts, legal-risk labels, or specific confidential issue descriptions in UTM values.
- Keep campaign values generic and content-based.
- Preserve the on-page no-confidential-information warning before any form or checklist submission.
- Keep `source:youtube` as a derived/contact tag only after opt-in; do not treat a UTM visit alone as marketing consent.

## Internal linking map

Recommended link graph for this week:

- Hub → AI Patent Scorecard, AI Compliance Gameplan, Colorado Startup M&A Lawyer, Colorado Tech GC, Colorado AI Compliance Lawyer.
- AI Patent Scorecard → Hub, Colorado Startup M&A Lawyer.
- AI Compliance Gameplan → Hub, Colorado AI Compliance Lawyer, Colorado Tech GC.
- Colorado Tech GC → Hub, AI Compliance Gameplan, Colorado Startup M&A Lawyer.
- Colorado Startup M&A Lawyer → Hub, Founder M&A Readiness Checklist, Colorado Tech GC, AI Patent Scorecard.

Anchor text examples:

- `Watch the AI Patent Brief before running the scorecard.`
- `Use the AI Compliance Gameplan to inventory use cases before drafting policy.`
- `If the issue is recurring legal operations, see Colorado Tech Outside General Counsel.`
- `If a buyer or investor may ask for diligence records, start with M&A readiness.`

## Pre-launch implementation checklist

No production changes are authorized by this audit, but the recommended future implementation order is:

1. Update hub queue copy to the 2026-05-11 titles and CTA routes.
2. Add route-level canonical metadata and richer title/description/Open Graph/Twitter metadata.
3. Add FAQ copy blocks to all five audited routes after attorney review.
4. Add FAQPage, WebPage, and BreadcrumbList JSON-LD.
5. Add robots and sitemap support.
6. Add VideoObject/Clip schema only after final public YouTube asset data exists.
7. Run local/preview link checks and metadata inspection.
8. Run lighthouse/page-speed pass after any YouTube embeds are added.
9. Recheck source-current legal claims on publication day.
10. Keep all HighLevel/workflow/contact tags consent-gated and opt-in-only.

## Guardrails preserved

- Internal draft only.
- No production code changes.
- No deploy or public publishing.
- No CRM, HighLevel, workflow, Supabase, Clio, email, social, contact, or prospect mutation.
- No legal advice, no attorney-client relationship, no confidential-information request, no compliance/inventorship/patentability/deal-outcome determination.
- Attorney, ethics, privacy, source-current, brand, and deliverability review required before public use.
