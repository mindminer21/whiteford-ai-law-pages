# 2026-05-25 YouTube Authority SEO Support Recommendations

Task: t_cc7ccc34
Status: INTERNAL DRAFT / ATTORNEY-REVIEW-ONLY / NOT PUBLIC / NO PUBLIC PAGE MUTATION.

No publishing, page deployment, email/SMS send, HighLevel workflow activation, contact enrollment, CRM/Supabase/Clio/DMS mutation, ad launch, social post/comment/message, or client/prospect-facing use is authorized by this document. Public use requires exact-copy Jeff/Whiteford attorney, ethics, privacy, source-current, brand, accessibility, deliverability, and technical SEO review.

## Source inputs reviewed

- `docs/ai-authority-packets/2026-05-25-weekly-youtube-script-packets.md`
- `/ai-law-youtube` source: `src/app/ai-law-youtube/page.tsx`
- `/ai-patent-strategy-scorecard` source: `src/app/ai-patent-strategy-scorecard/page.tsx`
- `/ai-compliance-gameplan` source: `src/app/ai-compliance-gameplan/page.tsx`
- `/colorado-ai-compliance-lawyer` source: `src/app/colorado-ai-compliance-lawyer/page.tsx` plus `src/lib/site.ts`
- `/colorado-tech-general-counsel` source: `src/app/colorado-tech-general-counsel/page.tsx` plus `src/lib/site.ts`
- `/colorado-startup-ma-lawyer` source: `src/app/colorado-startup-ma-lawyer/page.tsx` plus `src/lib/site.ts`
- Campaign map: `src/lib/campaigns.ts`
- Technical SEO context from prior 2026-05-18 support report.

## Executive summary

The 2026-05-25 packet is strong no-publish SEO support because each recording brief maps to an existing route, existing lead magnet, and existing campaign tag without requiring a new public page today.

Recommended internal SEO posture:

1. Keep `/ai-law-youtube` as the authority hub and prepare a future reviewed weekly-queue block for the three current topics: AI-assisted invention file, Colorado AI readiness inventory, and AI vendor/data terms as operating/diligence risk.
2. Use route-specific FAQ/content-block recommendations to strengthen the active landing pages without making legal conclusions or asking for confidential facts.
3. Do not add `VideoObject` schema until each approved public video exists and the target page visibly embeds or links to that video with approved title, description, thumbnail, and upload date.
4. Before public implementation, verify canonicals, sitemap, robots, redirects, performance impact of video embeds, and broken links in the deployed environment.

## Priority keyword and route map

| Weekly topic | Primary route | Secondary route(s) | Primary SEO intent | Lead magnet / campaign |
| --- | --- | --- | --- | --- |
| AI-assisted invention file / human contribution record | `/ai-patent-strategy-scorecard` | `/ai-law-youtube`; later `/colorado-tech-general-counsel#lead-magnet` for broader company cleanup | Founder used AI in R&D and wants a safe way to organize the record before patent strategy review. | AI Patent Strategy Scorecard / `workflow:ai-patent-strategy` |
| Colorado AI readiness inventory before policy | `/ai-compliance-gameplan` | `/colorado-ai-compliance-lawyer`; `/ai-law-youtube`; later `/colorado-tech-general-counsel#lead-magnet` | Colorado company wants an AI use-case, vendor, data, human-review, and records inventory before counsel review. | AI Compliance Gameplan Builder / `workflow:ai-compliance-readiness` |
| AI vendor/data terms as operating and diligence risk | `/colorado-tech-general-counsel#lead-magnet` or `/colorado-startup-ma-lawyer#lead-magnet` depending on viewer intent | `/ai-law-youtube`; `/ai-compliance-gameplan` for governance inventory | Founder/operator wants to organize AI vendor terms, data promises, customer/privacy commitments, and transfer/diligence issues. | Tech Company Legal Health Checklist / `workflow:tech-gc-launchpad`; Founder M&A Readiness Checklist / `workflow:ma-readiness` |

## YouTube hub recommendations for `/ai-law-youtube`

Current route signals:

- Metadata exists: title `Schell IP AI Law YouTube Authority Hub`; description frames a YouTube-led AI patent law, AI legal risk, and Colorado tech general counsel authority hub.
- The hub already exposes four programming lanes and links to the active lead magnets.
- The current queue includes AI patent, Colorado AI compliance, Tech GC, and M&A readiness concepts; this week's packet is a natural update to that queue.
- The external @SchellIP link already uses `target="_blank"` and `rel="noreferrer"`.

Draft-only hub copy block for later attorney/source-current review:

> Reviewed weekly recording queue — 2026-05-25 attorney-review-only draft
>
> This week's internal @SchellIP recording themes connect AI patent strategy, Colorado AI readiness, and technology-company legal operations. The episodes help founders organize a non-confidential AI-assisted invention file, build an AI use-case and vendor inventory before policy drafting, and spot AI vendor/data terms that can become operating or diligence issues.
>
> These videos are educational issue-spotting only. Do not submit confidential invention details, source code, prompts, model outputs, contracts, customer data, personnel facts, diligence requests, transaction facts, or matter-specific information through comments or public forms. Whiteford can advise only after conflicts review and a written engagement.

Recommended hub internal-link pattern:

- Link `AI-assisted invention file` to `/ai-patent-strategy-scorecard`.
- Link `Colorado AI readiness inventory` to `/ai-compliance-gameplan` and contextually to `/colorado-ai-compliance-lawyer` for broader service positioning.
- Link `AI vendor/data terms` first to `/colorado-tech-general-counsel#lead-magnet` for operating cleanup.
- Link `deal diligence cleanup` to `/colorado-startup-ma-lawyer#lead-magnet` where the viewer is preparing for financing, enterprise sale, partnership, or acquisition discussions.
- Keep `https://www.youtube.com/@SchellIP` as the channel link; add final video URLs only after public approval.

Recommended hub FAQ candidates:

1. What should founders organize if AI helped with R&D?
   - Safe answer: non-confidential categories such as human decision points, development chronology, AI tool categories, prototype/testing milestones, public-disclosure checkpoints, contributor roles, and ownership/assignment flags. Do not decide inventorship, patentability, eligibility, ownership, disclosure deadlines, or trade-secret status in the FAQ.
2. Why start Colorado AI readiness with an inventory?
   - Safe answer: an inventory shows use cases, owners, vendors, data categories, affected audiences, human-review points, escalation paths, and records before counsel reviews classification or compliance. Do not state that any workflow is or is not covered, high risk, compliant, discriminatory, or legally sufficient.
3. Why can AI vendor terms become a diligence issue?
   - Safe answer: contracts, privacy promises, customer commitments, training-use rights, output rights, retention/deletion terms, security terms, assignment/change-of-control provisions, and vendor documentation can become operating or deal-readiness friction. Do not interpret contracts or predict deal results.
4. Which diagnostic should a viewer use after each video?
   - Safe answer: AI Patent Strategy Scorecard for AI-assisted invention records; AI Compliance Gameplan Builder for AI use-case readiness inventory; Tech Company Legal Health Checklist for operating cleanup; Founder M&A Readiness Checklist for transaction-facing diligence cleanup.

Schema recommendation for hub while videos are not public:

- Do not add `VideoObject` yet unless the hub visibly contains or links to an approved public video.
- Consider a visible `ItemList` or simple HTML list of approved videos later, but only after exact video URLs, dates, thumbnails, and descriptions are reviewed.
- Consider FAQ structured data only if exact visible FAQ copy is added to the page and approved; otherwise keep FAQ material as internal recommendations.

## Route-specific landing-page recommendations

### `/ai-patent-strategy-scorecard`

Current route signals:

- Metadata title: `AI Patent Strategy Scorecard`.
- Description: non-confidential AI patent strategy scorecard for founders documenting human contribution, ownership, and patent readiness.
- Existing H1: `Score your AI-assisted invention record before patent strategy gets expensive.`
- Existing source-anchor section links to USPTO AI resources, USPTO AI inventorship FAQ, and AI Patent Dataset.

Recommended draft content block:

> AI-assisted invention file: organize the human-contribution story
>
> If AI tools helped during R&D, the useful first step is not to post invention details publicly or self-diagnose inventorship. Organize non-confidential categories for attorney review: who framed the problem, which humans selected architecture or constraints, what AI tool categories were used, what alternatives were tested, what prototype or validation milestones exist, what public-disclosure checkpoints may matter, and which ownership or assignment flags need review through a protected channel.

Recommended FAQ candidates:

- Does AI use automatically answer inventorship or patentability?
  - Safe answer: no public FAQ should make that legal determination. The scorecard helps organize categories for attorney review.
- What should go into an AI-assisted invention file?
  - Safe answer: timeline, contributor roles, AI tool categories, human technical decision points, prototype/test milestones, public-disclosure categories, and ownership/assignment flags.
- What should not be submitted through the scorecard or comments?
  - Safe answer: no confidential invention details, source code, prompts, model outputs, claim ideas, drawings, customer data, contracts, or trade secrets.

Recommended internal links:

- Link back to `/ai-law-youtube` using anchor text such as `AI Patent Brief videos`.
- Link to `/colorado-tech-general-counsel#lead-magnet` for founders whose invention-record issue reveals broader contract, assignment, vendor, privacy, or governance cleanup.
- Link to `/colorado-startup-ma-lawyer#lead-magnet` where AI-assisted invention records are being organized for financing, enterprise sale, strategic partnership, or acquisition diligence.

Campaign alignment:

- Primary: `ai-patent`, `workflow:ai-patent-strategy`, `leadmagnet:ai-patent-scorecard`, `interest:ai-patent-law`.
- Suggested YouTube `utm_content` after privacy/analytics approval only: `2026-05-25-ai-assisted-invention-file`.

### `/ai-compliance-gameplan`

Current route signals:

- Metadata title: `AI Compliance Gameplan Builder`.
- Description: non-confidential AI governance and compliance readiness assessment for Colorado and Mountain West companies.
- Existing privacy/engagement guardrail is strong and should be preserved.
- Existing source-current note warns that legal sources and public-copy claims must be rechecked before public launch.

Recommended draft content block:

> Colorado AI readiness inventory: use cases before policy language
>
> Before policy drafting or compliance conclusions, build a non-confidential inventory of AI and automated-decision workflows: business owner, technical owner, contract owner, vendor or internal system, data category, affected audience, decision or recommendation category, human-review point, override or escalation path, records retained, and available vendor documentation. The inventory helps leadership and counsel focus review; it does not decide coverage, compliance, discrimination risk, or operational sufficiency.

Recommended FAQ candidates:

- Is an AI inventory a compliance determination?
  - Safe answer: no. It is an issue-spotting and readiness tool for legal and operational review.
- Which systems should be listed first?
  - Safe answer: start with workflows touching hiring/HR, credit/lending/payments, housing, healthcare/benefits, insurance, education/training, fraud/account action, pricing/eligibility, customer support/sales routing, product features using user data, and internal productivity copilots. Legal classification requires counsel review.
- What should not be submitted through the public builder?
  - Safe answer: no personnel records, consumer/customer/patient data, vendor contracts, model documentation, security reports, confidential business plans, or matter-specific facts.

Recommended internal links:

- Link to `/ai-law-youtube` as the Colorado AI Law Brief / recording hub.
- Link to `/colorado-ai-compliance-lawyer` for broader AI governance and compliance service positioning.
- Link to `/colorado-tech-general-counsel#lead-magnet` for companies that need governance ownership, vendor contract triage, data/privacy review, and recurring legal operating cadence.

Campaign alignment:

- Primary: `ai-compliance`, `workflow:ai-compliance-readiness`, `leadmagnet:ai-compliance-gameplan`, `interest:ai-compliance`.
- Suggested YouTube `utm_content` after privacy/analytics approval only: `2026-05-25-colorado-ai-readiness-inventory`.

### `/colorado-ai-compliance-lawyer`

Current route signals:

- Metadata derives from `src/lib/site.ts`: `Colorado AI Compliance Lawyer`.
- Description frames a practical readiness path for Colorado and Mountain West companies using, buying, or embedding AI in consequential workflows.
- Lead magnet: AI Compliance Gameplan Builder.
- Offer screens include consequential decision exposure, developer/deployer posture, vendor/contract risk, data sensitivity/privacy, human review/escalation, and records/notices/governance maturity.

Recommended draft content block:

> Inventory first, then attorney-reviewed AI readiness work
>
> Colorado AI readiness should begin with a concrete inventory rather than a generic policy. Companies can organize non-confidential categories: AI use case, owner, vendor, data category, affected audience, business consequence, human-review point, records, notices, and contract/documentation status. Counsel can then review source-current legal requirements, risk classification, vendor terms, and implementation priorities.

Recommended FAQ candidates:

- Does an inventory prove Colorado AI compliance?
  - Safe answer: no. It helps counsel and leadership see the systems, owners, records, and vendor/data issues that need review.
- When should a company use the Gameplan Builder versus request counsel review?
  - Safe answer: use the builder for non-confidential issue spotting; use counsel review for actual facts, source-current legal analysis, contracts, data maps, and implementation decisions.
- How should companies handle changing legal timing?
  - Safe answer: recheck official sources before public copy or operational decisions; readiness can still proceed around inventory, owners, vendors, human review, records, and governance cadence.

Recommended internal links:

- Link to `/ai-compliance-gameplan` with anchor text `AI Compliance Gameplan Builder`.
- Link to `/ai-law-youtube` with anchor text `Colorado AI Law Brief videos`.
- Link to `/colorado-tech-general-counsel#lead-magnet` where readiness becomes a broader company legal-operating-system project.

### `/colorado-tech-general-counsel`

Current route signals:

- Metadata derives from `src/lib/site.ts`: `Colorado Tech Outside General Counsel`.
- Description frames a legal operating system for companies moving from IP protection into contracts, hiring, fundraising, AI governance, and growth-stage execution.
- Lead magnet: Colorado Tech Company Legal Health Checklist.
- Offer screens include contract stack maturity, employment/contractor exposure, IP ownership hygiene, privacy and AI usage, fundraising readiness, and M&A/partnership risk.

Recommended draft content block:

> AI vendor and data terms as legal operating-system work
>
> AI adoption can create a contract stack, not just a tool stack. Before the next renewal, financing, enterprise sale, or customer security review, companies can organize non-confidential categories: AI vendor list, business and technical owners, input/output data categories, training or product-improvement rights, confidentiality and security terms, retention/deletion terms, customer/privacy promises, and assignment or change-of-control restrictions.

Recommended FAQ candidates:

- When is an AI issue broader than patent strategy or compliance?
  - Safe answer: when it touches vendor contracts, customer promises, privacy notices, security commitments, IP ownership, board reporting, financing readiness, or transaction preparation.
- What should a tech company organize before an outside-GC review?
  - Safe answer: vendor list, contract owners, AI/data-use categories, customer commitments, privacy/security checkpoints, IP ownership flags, renewal dates, and upcoming financing/sale/customer events.
- Should contracts be uploaded through public forms?
  - Safe answer: no. Public forms should use categorical, non-confidential issue spotting only; actual contracts belong in a protected channel after conflicts and engagement steps.

Recommended internal links:

- Link to `/ai-compliance-gameplan` for use-case and vendor readiness inventory.
- Link to `/ai-patent-strategy-scorecard` for AI-assisted invention documentation.
- Link to `/colorado-startup-ma-lawyer#lead-magnet` for deal-specific AI/data/IP diligence cleanup.
- Link to `/ai-law-youtube` as the educational-video hub.

Campaign alignment:

- Primary for operating cleanup: `tech-gc`, `workflow:tech-gc-launchpad`, `leadmagnet:tech-gc-checklist`, `interest:tech-ogc`.
- Suggested YouTube `utm_content` after privacy/analytics approval only: `2026-05-25-ai-vendor-terms-operating-risk`.

### `/colorado-startup-ma-lawyer`

Current route signals:

- Metadata derives from `src/lib/site.ts`: `Colorado Startup M&A Lawyer`.
- Description frames companies considering acquisition, strategic partnership, recapitalization, or venture/PE diligence.
- Lead magnet: Founder M&A Readiness Checklist.
- Existing screens include IP assignment/ownership, cap table/corporate records, customer/vendor contracts, employment/incentive-plan issues, AI/data/privacy diligence, and disputes.

Recommended draft content block:

> AI vendor terms and data promises before diligence starts
>
> A buyer, investor, enterprise customer, or strategic partner may ask how AI tools touch company data, customer promises, product claims, privacy notices, security commitments, and IP ownership. Founders can prepare a non-confidential issue map covering AI vendor list, data categories, training/use restrictions, output rights, privacy/security commitments, customer contract promises, assignment or change-of-control restrictions, and red/yellow/green cleanup priorities for counsel.

Recommended FAQ candidates:

- What AI/data records should founders organize before diligence?
  - Safe answer: vendor list, AI/data-use file, customer/privacy promise map, IP ownership/assignment file, security documentation categories, and transfer/renewal restrictions.
- Does cleanup guarantee valuation, financing, partnership, or deal success?
  - Safe answer: no. It helps identify diligence friction before the process is controlled by buyer/investor/customer requests.
- When should a founder use the Tech GC checklist instead?
  - Safe answer: when the immediate problem is broad operating cleanup rather than a specific transaction-readiness review.

Recommended internal links:

- Link to `/colorado-tech-general-counsel#lead-magnet` for broader operating cleanup.
- Link to `/ai-compliance-gameplan` where AI governance, vendor, human-review, and records inventory is needed.
- Link to `/ai-patent-strategy-scorecard` when AI-assisted invention records and ownership are a diligence issue.
- Link to `/ai-law-youtube` as the video authority hub.

Campaign alignment:

- Primary for deal-facing cleanup: `ma-readiness`, `workflow:ma-readiness`, `leadmagnet:ma-readiness-checklist`, `interest:ma-readiness`.
- Suggested YouTube `utm_content` after privacy/analytics approval only: `2026-05-25-ai-contract-diligence`.

## Metadata recommendations

Do not change page metadata in this task. For future implementation review, consider these draft metadata options only after character-length, brand, attorney, source-current, and technical review:

| Route | Draft title option | Draft meta description option |
| --- | --- | --- |
| `/ai-law-youtube` | `Schell IP AI Law YouTube Hub | AI Patent, AI Compliance & Tech GC` | `Weekly @SchellIP AI law videos for founders, linked to non-confidential AI patent, Colorado AI readiness, Tech GC, and M&A readiness diagnostics.` |
| `/ai-patent-strategy-scorecard` | `AI Patent Strategy Scorecard | AI-Assisted Invention Records` | `Organize non-confidential AI-assisted invention records, human contribution, ownership flags, and patent strategy questions before attorney review.` |
| `/ai-compliance-gameplan` | `AI Compliance Gameplan Builder | Colorado AI Readiness Inventory` | `Build a non-confidential AI use-case, vendor, data, human-review, and records inventory for Colorado AI readiness before legal review.` |
| `/colorado-ai-compliance-lawyer` | `Colorado AI Compliance Lawyer | Inventory, Vendors & Governance` | `Attorney-reviewed AI readiness support for Colorado and Mountain West companies organizing use cases, vendors, data, records, and governance.` |
| `/colorado-tech-general-counsel` | `Colorado Tech Outside General Counsel | AI Vendor & Data Terms` | `Legal operating-system support for Colorado tech companies managing contracts, IP ownership, AI governance, privacy, financing, and scale.` |
| `/colorado-startup-ma-lawyer` | `Colorado Startup M&A Lawyer | AI, Data & IP Diligence Readiness` | `Founder-facing M&A readiness for Colorado tech companies organizing AI vendor terms, data promises, IP ownership, contracts, and diligence cleanup.` |

Canonical guidance:

- Keep one clean canonical route for each authority asset.
- Use absolute public URLs only after Jeff approves the production domain and UTM/privacy policy.
- Do not use tracking parameters in canonical URLs; use UTM only in outbound campaign links after privacy review.
- If video descriptions use `#lead-magnet` anchors, verify the final public page renders the anchor and that the canonical remains the clean page URL.
- If the public domain changes from `learn.schellip.com` to a Whiteford/Schell IP canonical domain, map redirects and canonicals before publication.

## Heading recommendations

Recommended future H2/H3 additions:

- `/ai-law-youtube`
  - H2: `This week's AI law recording queue`
  - H3: `AI-assisted invention files`
  - H3: `Colorado AI readiness inventory`
  - H3: `AI vendor terms and diligence cleanup`
- `/ai-patent-strategy-scorecard`
  - H2: `What to organize when AI helped with R&D`
- `/ai-compliance-gameplan`
  - H2: `Build the AI inventory before the policy`
- `/colorado-ai-compliance-lawyer`
  - H2: `AI readiness starts with use cases, owners, vendors, and records`
- `/colorado-tech-general-counsel`
  - H2: `When AI vendor terms become company legal infrastructure`
- `/colorado-startup-ma-lawyer`
  - H2: `AI vendor and data files to organize before diligence`

Avoid headings that promise legal conclusions, such as `Are you compliant?`, `Can you patent it?`, `Will this pass diligence?`, `Guaranteed deal-ready`, or `No-risk AI vendor terms`.

## Video structured-data checklist for when approved videos exist

Use only after the public video exists, the exact page visibly embeds or links to it, and attorney/source-current review approves the public copy.

Required/strongly recommended fields to prepare per Google video structured-data guidance:

- `@context`: `https://schema.org`
- `@type`: `VideoObject`
- `name`: exact approved video title.
- `description`: concise public description matching visible page/YouTube copy and legal caveats.
- `thumbnailUrl`: approved absolute URL for the video thumbnail image.
- `uploadDate`: ISO 8601 upload/publication date.
- `duration`: ISO 8601 duration, if known.
- `contentUrl` or `embedUrl`: approved YouTube URL/embed URL.
- `publisher`: organization/person object only if brand/legal review approves how Whiteford/Schell IP is represented.
- `transcript`: consider a visible transcript or summary on the page if approved, accurate, and non-confidential.

Per-video draft schema mapping:

| Packet video | Candidate page for schema | `name` draft from packet | CTA URL |
| --- | --- | --- | --- |
| AI-assisted invention file | `/ai-patent-strategy-scorecard` and/or `/ai-law-youtube` after visible embed/link | `AI Helped Build the Product. What Should Your Patent Strategy File Show?` | `/ai-patent-strategy-scorecard` |
| Colorado AI readiness inventory | `/ai-compliance-gameplan`, `/colorado-ai-compliance-lawyer`, and/or `/ai-law-youtube` after visible embed/link | `Colorado AI Readiness: Build the Inventory Before You Write the Policy` | `/ai-compliance-gameplan` |
| AI vendor/data terms | `/colorado-tech-general-counsel`, `/colorado-startup-ma-lawyer`, and/or `/ai-law-youtube` after visible embed/link | `Your AI Vendor Terms May Become a Deal Diligence Problem` | `/colorado-tech-general-counsel#lead-magnet` or `/colorado-startup-ma-lawyer#lead-magnet` |

Implementation guardrails:

- Do not mark a draft/local/private video as public schema.
- Do not add `VideoObject` to a page if the video is not visible to users on that page.
- Do not use unofficial thumbnails, draft titles, or unreviewed descriptions.
- Do not include `uploadDate` until the public publication date is known.
- Re-check Google Search Central video structured-data guidance before implementation.
- Validate JSON-LD with a structured-data validator before deployment.

## Crawlability, indexability, sitemap, robots, and redirects

Current observations from repository scan:

- `src/app/layout.tsx` has previously been observed setting `metadataBase` to `https://learn.schellip.com`.
- Prior SEO support scan found no `robots.*` or `sitemap.*` file in the workspace at that time; re-scan before implementation because this report does not mutate production files.
- Some `/start` routes intentionally use `robots: { index: false, follow: false }`; the current authority routes reviewed for this report do not show page-level `noindex` settings in the files reviewed.
- This task did not crawl a deployed public site and did not test redirect status codes.

Draft recommendations before any public SEO launch:

1. Add or verify a production `robots.txt` that allows public authority routes and blocks only private/internal/staging/prototype routes.
2. Add or verify a production XML sitemap containing the final canonical public URLs for:
   - `/ai-law-youtube`
   - `/ai-patent-strategy-scorecard`
   - `/ai-compliance-gameplan`
   - `/colorado-ai-compliance-lawyer`
   - `/colorado-tech-general-counsel`
   - `/colorado-startup-ma-lawyer`
3. Confirm no draft/internal docs, private decks, portal prototypes, unpublished review artifacts, or Kanban deliverables are included in public sitemap output.
4. Confirm redirects if a route or domain changes; use one-hop 301/308 redirects from old public URLs to approved canonical URLs.
5. Confirm any `#lead-magnet` anchor behavior before using anchor links in YouTube descriptions or pinned comments.
6. Run a broken-link crawl after implementation; this recommendation doc did not mutate or crawl the deployed public site.

## Internal-link matrix

| From | To | Anchor text candidate | Rationale |
| --- | --- | --- | --- |
| `/ai-law-youtube` | `/ai-patent-strategy-scorecard` | `AI Patent Strategy Scorecard` | Converts AI-assisted invention viewers to the narrow diagnostic. |
| `/ai-law-youtube` | `/ai-compliance-gameplan` | `AI Compliance Gameplan Builder` | Converts Colorado AI readiness viewers to inventory/gameplan diagnostic. |
| `/ai-law-youtube` | `/colorado-ai-compliance-lawyer` | `Colorado AI readiness counsel` | Connects the educational hub to broader service positioning after source-current review. |
| `/ai-law-youtube` | `/colorado-tech-general-counsel#lead-magnet` | `Tech Company Legal Health Checklist` | Converts AI vendor/data terms viewers to operating cleanup. |
| `/ai-law-youtube` | `/colorado-startup-ma-lawyer#lead-magnet` | `Founder M&A Readiness Checklist` | Converts diligence-focused viewers to deal-readiness diagnostic. |
| `/ai-patent-strategy-scorecard` | `/ai-law-youtube` | `AI Patent Brief videos` | Builds authority loop back to the hub. |
| `/ai-patent-strategy-scorecard` | `/colorado-tech-general-counsel#lead-magnet` | `broader AI legal operating cleanup` | Routes beyond patent-only issue spotting. |
| `/ai-compliance-gameplan` | `/ai-law-youtube` | `Colorado AI Law Brief videos` | Builds authority loop back to the hub. |
| `/ai-compliance-gameplan` | `/colorado-ai-compliance-lawyer` | `Colorado AI compliance counsel` | Routes from diagnostic to broader attorney-reviewed service page. |
| `/colorado-ai-compliance-lawyer` | `/ai-compliance-gameplan` | `AI Compliance Gameplan Builder` | Preserves lead-magnet CTA loop. |
| `/colorado-tech-general-counsel` | `/ai-compliance-gameplan` | `AI use-case and vendor inventory` | Connects OGC route to governance diagnostic. |
| `/colorado-tech-general-counsel` | `/colorado-startup-ma-lawyer#lead-magnet` | `M&A readiness checklist` | Routes deal-specific visitors to the narrower M&A checklist. |
| `/colorado-startup-ma-lawyer` | `/colorado-tech-general-counsel#lead-magnet` | `broader legal operating cleanup` | Cross-sell from transaction issue spotting to OGC cleanup. |
| `/colorado-startup-ma-lawyer` | `/ai-patent-strategy-scorecard` | `AI-assisted invention record scorecard` | Connects AI/data/IP diligence to patent record hygiene. |

## Page-speed and Core Web Vitals signals to preserve

Page-speed note: no performance test was run because this task is draft-only and did not start the app. Future implementation should preserve:

- Static/server-rendered text for FAQ/content blocks; avoid client-only rendering for SEO-critical copy.
- Minimal third-party scripts; do not add YouTube embeds above the fold until performance impact is reviewed.
- Lazy-load video embeds and thumbnails below the fold.
- Use appropriately sized thumbnails and `next/image` or optimized static assets where appropriate.
- Keep forms and interactive scorecards from blocking first contentful paint.
- Avoid embedding multiple full YouTube players on `/ai-law-youtube`; use thumbnail cards that open or link to YouTube unless one featured video is specifically approved.
- Keep FAQ markup light and visible; do not hide SEO copy behind heavy client-side accordions if crawl/render behavior is uncertain.

## Broken-link and source-current checklist before public use

- [ ] Verify the exact public domain and canonical URL for each route.
- [ ] Verify `https://www.youtube.com/@SchellIP` and final public video URLs.
- [ ] Verify all official source links on publication day:
  - USPTO AI resources and AI-assisted inventorship FAQ.
  - Colorado SB24-205, SB25B-004, and any newer official timing/rulemaking source.
  - NIST AI RMF page.
  - FTC quiet AI/data terms guidance and Operation AI Comply source pages.
  - DOJ/FTC 2023 Merger Guidelines page if used as broad transaction context.
  - Google Search Central video structured-data guidance.
- [ ] Verify lead-magnet forms preserve no-confidential-information warnings.
- [ ] Verify HighLevel tags remain draft routing labels unless separate workflow/tag activation is approved.
- [ ] Run a crawl for 200/3xx/4xx/5xx status after any implementation.
- [ ] Validate metadata, headings, schema, canonicals, robots, and sitemap output in the deployed environment.

## Non-confidential legal/ethics language to preserve

Use variants of this language near public forms, descriptions, pinned comments, and video-supported route additions:

> This material is general legal education only and does not create an attorney-client relationship. It is not legal advice and does not determine inventorship, patentability, eligibility, ownership, compliance status, contract meaning, privacy sufficiency, diligence outcome, valuation, financing, partnership, or deal risk. Do not submit confidential, proprietary, trade-secret, privileged, employee/applicant/customer/patient-specific, source-code, prompt, model-output, contract, security, cap-table, transaction, or matter-specific facts through comments or public forms. Whiteford can advise only after conflicts review and a written engagement.

## Recommended implementation order after attorney/source-current review

1. Approve exact public copy and source-current claims for the three video descriptions, pinned comments, Shorts captions, and any route copy.
2. Approve route-specific FAQ/content blocks in this document.
3. Approve canonical domain and UTM/privacy policy.
4. Add route content blocks, internal links, and visible FAQs in a feature branch.
5. Add public video cards/embeds only after videos are public and approved.
6. Add `VideoObject` JSON-LD only after pages visibly contain or link to the approved videos.
7. Add/verify `robots.txt`, sitemap, canonical output, and redirects.
8. Run build, lint/type checks, local route smoke tests, structured-data validation, and broken-link crawl.
9. Request human review before deploy; no public mutation is authorized by this document.
