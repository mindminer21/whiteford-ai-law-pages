# 2026-05-18 YouTube Authority SEO Support Recommendations

Task: t_4bf5c124
Status: INTERNAL DRAFT / ATTORNEY-REVIEW-ONLY / NOT PUBLIC / NO PUBLIC PAGE MUTATION.

No publishing, page deployment, email/SMS send, HighLevel workflow activation, contact enrollment, CRM/Supabase/Clio/DMS mutation, ad launch, social post/comment/message, or client/prospect-facing use is authorized by this document. Public use requires Jeff/Whiteford attorney, ethics, privacy, source-current, brand, accessibility, and technical SEO review.

## Source inputs reviewed

- `whiteford_schellip_ai_authority_youtube_strategy.md`
- `docs/ai-authority-packets/2026-05-18-weekly-youtube-script-packets.md`
- `/ai-law-youtube` source: `src/app/ai-law-youtube/page.tsx`
- `/ai-patent-strategy-scorecard` source: `src/app/ai-patent-strategy-scorecard/page.tsx`
- `/ai-compliance-gameplan` source: `src/app/ai-compliance-gameplan/page.tsx`
- `/colorado-tech-general-counsel` source: `src/app/colorado-tech-general-counsel/page.tsx` plus `src/lib/site.ts`
- `/colorado-startup-ma-lawyer` source: `src/app/colorado-startup-ma-lawyer/page.tsx` plus `src/lib/site.ts`
- Campaign map: `src/lib/campaigns.ts`
- Official/source anchors named in the packets: Google video structured data guidance, Google helpful content guidance, USPTO AI-assisted inventorship guidance page, Colorado General Assembly SB25B-004/SB24-205 pages, and NIST AI RMF.

## Executive summary

The three 2026-05-18 recording topics are strong SEO support candidates because each maps cleanly to an existing route, lead magnet, and HighLevel campaign tag without requiring a new public page today.

Recommended internal SEO posture:

1. Keep `/ai-law-youtube` as the authority hub, but add a future "Current recording queue" block only after attorney/source-current review. The block should link to the three route-specific CTAs and eventually embed or link to approved videos.
2. Add route-specific FAQ/content-block recommendations to the five current routes in draft only. The additions should reinforce non-confidential issue spotting and internal links, not provide legal conclusions.
3. When videos exist, implement `VideoObject` structured data only on pages that visibly contain or link to the corresponding public video and include required Google fields such as `name`, `description`, `thumbnailUrl`, and `uploadDate`.
4. Before public implementation, add or verify production sitemap/robots/canonical policy. This repo currently exposes `metadataBase` in `src/app/layout.tsx`, but this task found no `robots.*` or `sitemap.*` file in the workspace.

## Priority keyword and route map

| Weekly topic | Primary route | Secondary route | Primary SEO intent | Lead magnet / campaign |
| --- | --- | --- | --- | --- |
| AI-assisted invention records / USPTO human contribution | `/ai-patent-strategy-scorecard` | `/ai-law-youtube` | Founder wants to know what to document before patent strategy when AI helped R&D. | AI Patent Strategy Scorecard / `workflow:ai-patent-strategy` |
| Colorado AI Act June 30, 2026 readiness / ADMT inventory | `/ai-compliance-gameplan` | `/ai-law-youtube`; later `/colorado-ai-compliance-lawyer` if included in scope | Colorado company wants first-pass AI/ADMT readiness inventory. | AI Compliance Gameplan Builder / `workflow:ai-compliance-readiness` |
| AI/data/IP diligence for Colorado tech deals | `/colorado-startup-ma-lawyer` | `/colorado-tech-general-counsel`; `/ai-law-youtube` | Founder wants to reduce diligence friction around IP ownership, AI/data use, and contracts. | Founder M&A Readiness Checklist / `workflow:ma-readiness`; secondary Tech GC checklist / `workflow:tech-gc-launchpad` |

## YouTube hub recommendations for `/ai-law-youtube`

Current strengths:

- Metadata exists: title `Schell IP AI Law YouTube Authority Hub`; description frames the YouTube-led AI patent/legal-risk/Tech GC authority hub.
- Hub already links to the four authority lanes and uses campaign trigger tags from `src/lib/campaigns.ts`.
- Hub already includes an initial recording queue and `@SchellIP` external link.

Draft-only recommended copy block:

> Reviewed weekly recording queue — attorney-review-only draft
>
> This week's internal recording themes connect @SchellIP's patent-law authority to three practical company-building questions: how AI-assisted invention records should show human contribution, how Colorado companies can begin a non-confidential AI/ADMT inventory before June 30, 2026 readiness work, and how founders can organize AI, data, and IP diligence before a financing, partnership, or acquisition process.
>
> These topics are educational issue-spotting only. Do not submit confidential invention details, contracts, customer data, personnel facts, source code, prompts, model documentation, cap tables, diligence requests, or matter-specific facts through comments or public forms. Whiteford can advise only after conflicts review and a written engagement.

Recommended hub internal-link pattern:

- Link "AI-assisted invention record" to `/ai-patent-strategy-scorecard`.
- Link "Colorado AI/ADMT inventory" to `/ai-compliance-gameplan`.
- Link "AI, data, and IP diligence" to `/colorado-startup-ma-lawyer#lead-magnet`.
- Link "broader legal operating cleanup" to `/colorado-tech-general-counsel#lead-magnet`.
- Keep `https://www.youtube.com/@SchellIP` external link with `target="_blank"` and `rel="noreferrer"` as currently used.

Recommended hub FAQ candidates:

1. What should a founder organize before discussing an AI-assisted invention?
   - Safe answer: non-confidential categories such as timeline, human decision points, AI tool categories, prototype/testing milestones, disclosure categories, and ownership/assignment flags. Do not decide inventorship or patentability in the FAQ.
2. What is the first useful step for Colorado AI Act readiness?
   - Safe answer: a non-confidential inventory of AI/ADMT use cases, owners, vendors, data categories, human-review points, and records. Do not state that any workflow is covered, compliant, non-compliant, high risk, or low risk.
3. What should a tech founder clean up before deal diligence?
   - Safe answer: IP ownership records, assignment status, open-source flags, AI/data-use categories, vendor/customer contract friction, privacy/security commitments, and a green/yellow/red cleanup board. Do not predict valuation, diligence outcome, closing risk, or buyer response.
4. Which lead magnet fits each video?
   - Safe answer: AI Patent Strategy Scorecard for AI-assisted invention records; AI Compliance Gameplan Builder for ADMT inventory/readiness; Founder M&A Readiness Checklist for diligence cleanup; Tech Company Legal Health Checklist for broader outside-GC operating cleanup.

Schema recommendation for hub while videos are not public:

- Do not add `VideoObject` yet unless the page contains an actual public video or approved video URL/thumbnail/date.
- Consider future `ItemList` or plain HTML list of approved videos only after publication and source-current review.
- Consider FAQ structured data only if the exact visible FAQ is added to the page and approved; otherwise keep FAQs as recommendations only.

## Route-specific landing-page recommendations

### `/ai-patent-strategy-scorecard`

Current route signals:

- Metadata title: `AI Patent Strategy Scorecard`.
- Description: non-confidential scorecard for founders documenting human contribution, ownership, and patent readiness.
- Existing H1: `Score your AI-assisted invention record before patent strategy gets expensive.`
- Existing supporting section anchors to USPTO AI resources, USPTO AI inventorship FAQ, and AI Patent Dataset.

Recommended draft content block:

> AI-assisted invention record checklist
>
> If AI tools helped during R&D, the first useful preparation step is not to post invention details publicly. Organize non-confidential categories: who framed the problem, which humans selected constraints and architecture, what alternatives were tested, what prototype or validation milestones exist, what disclosure dates may matter, and which ownership or assignment flags counsel should review through the right channel.

Recommended FAQ candidates:

- Does using AI automatically prevent patent protection?
  - Safe answer: avoid categorical answers; refer to attorney review and official USPTO source-currentness. The scorecard helps organize human-contribution and documentation questions.
- What records should I organize before an AI patent strategy call?
  - Safe answer: timeline, contributor roles, AI tool categories, human decision points, prototype/test milestones, disclosure categories, and ownership/assignment flags.
- Can I submit invention details through the scorecard?
  - Safe answer: no confidential, proprietary, trade-secret, privileged, source code, prompt, claim, customer, or contract details; use categorical answers only.

Recommended internal links:

- Add contextual link back to `/ai-law-youtube` using anchor text such as "AI Patent Brief recording queue".
- Link to `/colorado-tech-general-counsel#lead-magnet` for founders who realize the issue is broader than patent strategy.
- Link to `/colorado-startup-ma-lawyer#lead-magnet` where AI-assisted invention records are being cleaned up for financing, partnership, or acquisition diligence.

Campaign alignment:

- Primary: `ai-patent`, `workflow:ai-patent-strategy`, `leadmagnet:ai-patent-scorecard`, `interest:ai-patent-law`.
- Suggested YouTube `utm_content` after privacy/analytics approval only: `2026-05-18-ai-assisted-invention-records`.

### `/ai-compliance-gameplan`

Current route signals:

- Metadata title: `AI Compliance Gameplan Builder`.
- Description: non-confidential AI governance and compliance readiness assessment for Colorado and Mountain West companies.
- Existing privacy/engagement guardrail is strong and should be preserved.
- Existing research-anchor section uses `aiSources` from `src/lib/site.ts`.

Recommended draft content block:

> Colorado AI/ADMT readiness starts with inventory
>
> Before policy drafting or compliance conclusions, create a non-confidential inventory of AI and automated-decision workflows: business owner, vendor or internal system, data category, affected audience, decision or recommendation type, human-review point, override/escalation path, contract owner, and recordkeeping owner. The inventory helps counsel focus source-current legal review; it does not decide coverage or compliance.

Recommended FAQ candidates:

- Is an inventory the same as a compliance determination?
  - Safe answer: no. It is an issue-spotting tool for legal and operational review.
- What AI systems should be listed first?
  - Safe answer: start with workflows touching hiring/HR, credit/lending, housing, education, healthcare/benefits, insurance, pricing/eligibility/fraud/account action, customer support/sales routing, and product features using user data. Legal classification requires counsel review.
- What should not be submitted through the public builder?
  - Safe answer: no personnel records, consumer/customer details, vendor contracts, model documentation, security reports, confidential business plans, or matter-specific facts.

Recommended internal links:

- Link to `/ai-law-youtube` as the source of the Colorado AI Law Brief queue.
- Link to `/colorado-tech-general-counsel#lead-magnet` for companies that need broader governance ownership, vendor contract triage, and legal operating cadence.
- If `/colorado-ai-compliance-lawyer` is in scope later, use it as the service page for broader legal-readiness content, but this task's current five-route scope should not mutate it.

Campaign alignment:

- Primary: `ai-compliance`, `workflow:ai-compliance-readiness`, `leadmagnet:ai-compliance-gameplan`, `interest:ai-compliance`.
- Suggested YouTube `utm_content` after privacy/analytics approval only: `2026-05-18-colorado-ai-act-admt-inventory`.

### `/colorado-tech-general-counsel`

Current route signals:

- Metadata derives from `src/lib/site.ts`: `Colorado Tech Outside General Counsel`.
- Description frames legal operating systems for IP, contracts, hiring, fundraising, AI governance, and growth-stage execution.
- Lead magnet: Colorado Tech Company Legal Health Checklist.

Recommended draft content block:

> When AI and diligence issues become outside-GC work
>
> Some AI legal issues do not fit neatly into one patent, one policy, or one transaction. A Colorado technology company may need an operating layer that connects contracts, IP ownership, privacy/data governance, vendor review, workforce policies, board reporting, and upcoming financing or M&A events. Use the legal health checklist to identify which workstream needs attorney review first.

Recommended FAQ candidates:

- When is this broader than an AI patent or AI compliance question?
  - Safe answer: when the issue touches contracts, employment/contractor assignments, data/privacy, customer promises, board reporting, financing readiness, or deal preparation.
- What records should a company organize before an outside-GC review?
  - Safe answer: contract stack summary, vendor list, IP ownership flags, privacy/data map, AI-use inventory, fundraising/M&A timeline, employment/contractor issues, and open disputes by category.
- How should this connect to the weekly videos?
  - Safe answer: use the Tech GC checklist when a video reveals a broader legal operating-system gap.

Recommended internal links:

- Link to `/ai-compliance-gameplan` for AI/ADMT inventory and governance readiness.
- Link to `/ai-patent-strategy-scorecard` for AI-assisted invention documentation.
- Link to `/colorado-startup-ma-lawyer#lead-magnet` for companies preparing for financing, acquisition, or diligence.
- Link to `/ai-law-youtube` as the educational-video hub.

Campaign alignment:

- Primary for broad OGC: `tech-gc`, `workflow:tech-gc-launchpad`, `leadmagnet:tech-gc-checklist`, `interest:tech-ogc`.
- Secondary for this week's diligence topic: send deal-specific CTA to M&A route first, then offer Tech GC as broader cleanup.

### `/colorado-startup-ma-lawyer`

Current route signals:

- Metadata derives from `src/lib/site.ts`: `Colorado Startup M&A Lawyer`.
- Description frames companies considering acquisition, strategic partnership, recapitalization, or venture/PE diligence.
- Existing offer screens include IP assignment/ownership, contracts, employment, AI/data/privacy diligence, and disputes.

Recommended draft content block:

> AI, data, and IP diligence cleanup before a buyer asks
>
> For a Colorado technology company, non-financial diligence can slow down when the AI/data/IP story is scattered. Before a transaction process, founders can organize non-confidential categories: IP ownership and assignment status, open-source and customer-funded development flags, AI features and internal tools, data categories, vendor/model restrictions, customer contract transfer or audit issues, privacy/security commitments, and a green/yellow/red cleanup board for counsel.

Recommended FAQ candidates:

- What AI/data/IP records should founders organize before diligence?
  - Safe answer: IP ownership file, AI/data-use file, and contract-friction file. Do not submit documents publicly.
- Does cleanup guarantee a better valuation or deal outcome?
  - Safe answer: no. It helps identify diligence friction before the process is controlled by buyer/investor requests.
- When should a founder use the Tech GC checklist instead?
  - Safe answer: when the immediate need is broad legal operating cleanup rather than a specific transaction-readiness review.

Recommended internal links:

- Link to `/colorado-tech-general-counsel#lead-magnet` for broader cleanup.
- Link to `/ai-patent-strategy-scorecard` when AI-assisted invention records and ownership are a core diligence issue.
- Link to `/ai-compliance-gameplan` when buyer/investor diligence will ask about AI governance, data, vendors, human review, or records.
- Link to `/ai-law-youtube` as the video authority hub.

Campaign alignment:

- Primary: `ma-readiness`, `workflow:ma-readiness`, `leadmagnet:ma-readiness-checklist`, `interest:ma-readiness`.
- Suggested YouTube `utm_content` after privacy/analytics approval only: `2026-05-18-ai-data-ip-diligence`.

## Metadata recommendations

Do not change page metadata in this task. For future implementation review, consider the following draft metadata changes if character lengths and brand review pass:

| Route | Draft title option | Draft meta description option |
| --- | --- | --- |
| `/ai-law-youtube` | `Schell IP AI Law YouTube Hub | AI Patent, AI Compliance, Tech GC` | `Weekly @SchellIP AI law videos for Colorado and Mountain West founders, linked to non-confidential AI patent, AI compliance, Tech GC, and M&A readiness tools.` |
| `/ai-patent-strategy-scorecard` | `AI Patent Strategy Scorecard | Human Contribution & Invention Records` | `Organize non-confidential AI-assisted invention records, human contribution, ownership flags, and patent strategy questions before attorney review.` |
| `/ai-compliance-gameplan` | `AI Compliance Gameplan Builder | Colorado AI & ADMT Readiness` | `Build a non-confidential AI/ADMT inventory for Colorado AI readiness, vendor governance, human review, records, and 30/60/90-day planning.` |
| `/colorado-tech-general-counsel` | `Colorado Tech Outside General Counsel | AI, Contracts, IP & Growth` | `A legal operating-system checklist for Colorado tech companies managing contracts, IP ownership, AI governance, privacy, financing, and scale.` |
| `/colorado-startup-ma-lawyer` | `Colorado Startup M&A Lawyer | AI, Data & IP Diligence Readiness` | `Founder-facing M&A readiness for Colorado tech companies organizing IP ownership, AI/data use, contracts, corporate records, and diligence cleanup.` |

Canonical guidance:

- Keep one clean canonical route for each authority asset.
- Use absolute public URLs only after Jeff approves the production domain and UTM policy.
- Do not use relative routes in public YouTube descriptions or LinkedIn posts unless the channel/context makes them clickable and approved.
- If video descriptions use tracking parameters later, preserve canonical page URLs in page metadata and use UTM only in outbound campaign links after privacy review.

## Heading recommendations

Recommended future H2/H3 additions:

- `/ai-law-youtube`
  - H2: `This week's AI law recording queue`
  - H3: `AI-assisted invention records`
  - H3: `Colorado AI/ADMT inventory readiness`
  - H3: `AI, data, and IP diligence cleanup`
- `/ai-patent-strategy-scorecard`
  - H2: `What to organize before an AI-assisted invention review`
- `/ai-compliance-gameplan`
  - H2: `What to inventory before Colorado AI readiness review`
- `/colorado-tech-general-counsel`
  - H2: `When AI legal issues become company legal infrastructure`
- `/colorado-startup-ma-lawyer`
  - H2: `AI, data, and IP files to organize before diligence`

Avoid headings that promise legal conclusions, such as "Are you compliant," "Can you patent it," "Will this pass diligence," or "Guaranteed deal-ready."

## Video structured-data checklist for when videos exist

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
- `transcript`: consider visible transcript or summary on the page if approved and not confidential.

Per-video draft schema mapping:

| Video | Candidate page for schema | `name` draft | CTA URL |
| --- | --- | --- | --- |
| AI-assisted invention records | `/ai-patent-strategy-scorecard` and/or `/ai-law-youtube` after visible embed | `AI Helped Build It. What Human Contribution Should Your Patent Record Show?` | `/ai-patent-strategy-scorecard` |
| Colorado AI/ADMT inventory | `/ai-compliance-gameplan` and/or `/ai-law-youtube` after visible embed | `Colorado AI Act Readiness: What to Inventory Before June 30, 2026` | `/ai-compliance-gameplan` |
| AI/data/IP diligence | `/colorado-startup-ma-lawyer` and/or `/ai-law-youtube` after visible embed | `AI, Data, and IP Diligence: What Colorado Tech Founders Should Clean Up Before a Deal` | `/colorado-startup-ma-lawyer#lead-magnet` |

Implementation guardrails:

- Do not mark a draft/local/private video as public schema.
- Do not add `VideoObject` to a page if the video is not visible to users on that page.
- Do not use unofficial thumbnails, draft titles, or unreviewed descriptions.
- Re-check Google Search Central video structured-data guidance before implementation.
- Validate JSON-LD with a structured data validator before deployment.

## Crawlability, indexability, sitemap, robots, and redirects

Current observations from repository scan:

- `src/app/layout.tsx` sets `metadataBase` to `https://learn.schellip.com`.
- No `robots.*` file was found in this workspace scan.
- No `sitemap.*` file was found in this workspace scan.
- Some `/start` routes intentionally use `robots: { index: false, follow: false }`; the five current routes in scope do not show a page-level `noindex` setting in the files reviewed.

Draft recommendations before any public SEO launch:

1. Add or verify a production `robots.txt` that allows public authority routes and blocks only private/internal/staging routes.
2. Add or verify a production XML sitemap containing the final canonical public URLs for:
   - `/ai-law-youtube`
   - `/ai-patent-strategy-scorecard`
   - `/ai-compliance-gameplan`
   - `/colorado-tech-general-counsel`
   - `/colorado-startup-ma-lawyer`
3. Confirm no draft/internal docs, private decks, portal prototypes, or unpublished review artifacts are included in public sitemap output.
4. Confirm route redirects if a public domain moves from `learn.schellip.com` to a Whiteford/Schell IP canonical domain.
5. Confirm any `#lead-magnet` anchor behavior before using anchor links in public YouTube descriptions.
6. Run a broken-link crawl after implementation; this recommendation doc did not mutate or crawl a deployed public site.

## Internal-link matrix

| From | To | Anchor text candidate | Rationale |
| --- | --- | --- | --- |
| `/ai-law-youtube` | `/ai-patent-strategy-scorecard` | `AI Patent Strategy Scorecard` | Converts AI-assisted invention viewers to the right diagnostic. |
| `/ai-law-youtube` | `/ai-compliance-gameplan` | `AI Compliance Gameplan Builder` | Converts Colorado AI/ADMT viewers to inventory/readiness diagnostic. |
| `/ai-law-youtube` | `/colorado-startup-ma-lawyer#lead-magnet` | `Founder M&A Readiness Checklist` | Converts diligence viewers to deal-readiness checklist. |
| `/ai-law-youtube` | `/colorado-tech-general-counsel#lead-magnet` | `Tech Company Legal Health Checklist` | Converts broad operating-system viewers. |
| `/ai-patent-strategy-scorecard` | `/ai-law-youtube` | `AI Patent Brief videos` | Builds authority loop back to hub. |
| `/ai-compliance-gameplan` | `/ai-law-youtube` | `Colorado AI Law Brief videos` | Builds authority loop back to hub. |
| `/colorado-startup-ma-lawyer` | `/colorado-tech-general-counsel#lead-magnet` | `broader legal operating cleanup` | Cross-sell from transaction issue spotting to OGC. |
| `/colorado-tech-general-counsel` | `/colorado-startup-ma-lawyer#lead-magnet` | `M&A readiness checklist` | Routes deal-specific prospects to the narrower M&A checklist. |

## Page-speed and Core Web Vitals signals to preserve

page-speed note: no performance test was run because this task is draft-only and did not start the app. Future implementation should preserve:

- Static/server-rendered text for FAQ/content blocks; avoid client-only rendering for SEO-critical copy.
- Minimal third-party scripts; do not add YouTube embeds above the fold until performance impact is reviewed.
- Lazy-load video embeds and thumbnails below the fold.
- Use appropriately sized thumbnails and `next/image` or optimized static assets where appropriate.
- Keep forms and interactive scorecards from blocking first contentful paint.
- Avoid embedding multiple full YouTube players on `/ai-law-youtube`; use thumbnail cards that open or link to YouTube unless one featured video is specifically approved.

## Broken-link and source-current checklist before public use

- [ ] Verify the exact public domain and canonical URL for each route.
- [ ] Verify `https://www.youtube.com/@SchellIP` and final video URLs.
- [ ] Verify all official source links on publication day:
  - USPTO AI-assisted inventorship guidance/resources.
  - Colorado SB25B-004 / SB24-205 / any replacement or rulemaking source.
  - NIST AI RMF page.
  - Google Search Central video structured-data guidance.
- [ ] Verify lead-magnet forms preserve no-confidential-information warnings.
- [ ] Verify HighLevel tags remain draft routing labels unless separate workflow/tag activation is approved.
- [ ] Run a crawl for 200/3xx/4xx status after any implementation.
- [ ] Validate metadata, headings, schema, canonicals, robots, and sitemap output in the deployed environment.

## Non-confidential legal/ethics language to preserve

Use variants of this language near public forms, descriptions, and pinned comments:

> This material is general legal education only and does not create an attorney-client relationship. It is not legal advice and does not determine inventorship, patentability, eligibility, ownership, compliance status, diligence outcome, valuation, or deal risk. Do not submit confidential, proprietary, trade-secret, privileged, employee/applicant/customer/patient-specific, source-code, prompt, contract, security, cap-table, transaction, or matter-specific facts through comments or public forms. Whiteford can advise only after conflicts review and a written engagement.

## Recommended implementation order after attorney/source-current review

1. Approve exact public copy and source-current claims for the three video descriptions/pinned comments.
2. Approve route-specific FAQ/content blocks in this document.
3. Approve canonical domain and UTM/privacy policy.
4. Add route content blocks and internal links in a feature branch.
5. Add public video embeds/cards only after videos are public and approved.
6. Add `VideoObject` JSON-LD only after pages visibly contain or link to the approved videos.
7. Add/verify `robots.txt`, sitemap, canonical output, and redirects.
8. Run build, lint/type checks, local route smoke tests, structured-data validation, and broken-link crawl.
9. Request human review before deploy; no public mutation is authorized by this document.
