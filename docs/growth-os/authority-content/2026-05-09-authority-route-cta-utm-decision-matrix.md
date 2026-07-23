# Authority Route / CTA / UTM Decision Matrix — 2026-05-09

Task: `t_f0fa6f80`
Tenant: `whiteford-mountain-west`
Status: INTERNAL DECISION MATRIX / JEFF + WHITEFORD REVIEW ONLY / NOT APPROVED FOR EXTERNAL USE.

No email, SMS, DM, LinkedIn post, social post, newsletter, ad, HighLevel workflow, HighLevel workflow test, HighLevel enrollment, HighLevel/CRM contact/opportunity/tag/task/note mutation, Supabase DDL/sync/row mutation, Clio action, public page publish/deploy, production credential change, or client/prospect-facing use is approved or performed by this packet.

## Purpose

This matrix converts the evergreen authority readiness review into a Jeff/Whiteford approval packet for:

- canonical lead-magnet route;
- CTA label and microcopy posture;
- UTM posture;
- non-confidential form-warning placement;
- approval status for public, email, social, YouTube, and HighLevel use.

It covers the four evergreen authority pillars currently staged for internal review:

1. AI Patent Strategy Scorecard — `/ai-patent-strategy-scorecard`
2. AI Compliance Gameplan Builder — `/ai-compliance-gameplan`
3. Tech Company Legal Health Checklist — `/colorado-tech-general-counsel`
4. Founder M&A Readiness Checklist — route decision between `/colorado-startup-ma-lawyer`, `/founder-ma-readiness-checklist`, or another Jeff/Whiteford-approved route

Business-development principle applied: a lead magnet should solve a complete narrow diagnostic problem and deliver useful value before any next-step ask. For Whiteford/Schell IP, that means educational, restrained, opt-in-only, non-hypey, non-confidential, attorney-review-gated CTAs. This packet uses that principle only and does not quote or reproduce private book passages.

## Controlling inputs reviewed

- `docs/reviews/2026-05-09-authority-content-readiness-review.md`
- `docs/growth-os/authority-content/2026-05-09-evergreen-source-independent-briefs.md`
- `docs/growth-os/authority-content/2026-05-09-youtube-recording-brief-backlog.md`
- `docs/growth-os/authority-content/2026-05-09-authority-supporting-copy-packet.md`
- `docs/growth-os/authority-content/2026-05-09-authority-supporting-copy-no-acr-redline.md`
- Local app route inventory confirmed these route files exist: `/ai-patent-strategy-scorecard`, `/ai-compliance-gameplan`, `/colorado-tech-general-counsel`, `/colorado-startup-ma-lawyer`, and `/founder-ma-readiness-checklist`.
- Business-development RAG was queried locally for lead-magnet principles; this packet uses the narrow-diagnostic-value principle only and does not reproduce book text.

## Executive recommendation

Default recommendation: use no UTM for internal review links and local/private QA; use clean canonical route paths in public-facing copy until Jeff/Whiteford approve a privacy-reviewed UTM taxonomy. Do not add default ad/social/email UTMs to public, YouTube, LinkedIn, newsletter, HighLevel, or lead-magnet links from this tranche without privacy review and exact-channel approval.

Recommended route posture:

- AI Patent: keep `/ai-patent-strategy-scorecard` as the canonical lead-magnet route, pending final route/CTA/privacy/legal approval.
- AI Compliance: keep `/ai-compliance-gameplan` as the canonical lead-magnet route, pending final route/CTA/privacy/legal approval.
- Tech GC: keep `/colorado-tech-general-counsel` as the canonical route for now, with any anchor such as `#lead-magnet` treated as optional and requiring UX review; do not assume anchor approval.
- M&A: default decision for Jeff is to approve `/founder-ma-readiness-checklist` as the app-specific lead-magnet route for authority CTAs, while preserving `/colorado-startup-ma-lawyer` as the broader service/SEO page. This is a recommendation only; it is not approved until Jeff/Whiteford mark the decision box.

Recommended CTA posture:

- CTA labels should name the diagnostic, not the service engagement.
- Each CTA should promise educational issue-spotting, readiness mapping, or a cleanup frame before any next-step ask.
- Productized service next steps may appear only after the diagnostic value is delivered and only in restrained, non-guaranteed, attorney-review-gated language.

Recommended form-warning posture:

- The non-confidential warning must appear immediately before or adjacent to the form/question start and again before any free-text field, reply path, report request, or optional opt-in field.
- Avoid relying only on footer disclaimers. Footer language is supplemental, not a substitute for near-form warnings.

## UTM posture decision menu

Use this menu for each pillar and channel.

### Option A — No UTM / clean canonical route

Decision box:

- [ ] APPROVE no-UTM route for internal/private review only.
- [ ] APPROVE no-UTM route for public/social/YouTube use after legal/privacy/source-current approval.
- [ ] HOLD no-UTM route pending route/CTA/privacy review.

When to use:

- Internal review links.
- Local/private QA.
- Attorney-review packets.
- First public use if Jeff/Whiteford prefer simplest privacy posture.

Pros:

- Lowest privacy/tracking risk.
- Least chance of confusing attorney-review copy with analytics claims.
- Easier to preserve canonical route language across YouTube, social, and email drafts.

Cons:

- Less channel attribution.
- Requires separate manual/source tracking if later measuring campaign performance.

### Option B — Default UTM taxonomy

Decision box:

- [ ] APPROVE default UTM taxonomy for named channels.
- [ ] APPROVE default UTM taxonomy only for internal tests using synthetic/non-client data.
- [ ] HOLD default UTM taxonomy pending privacy review.

Possible taxonomy for review only, not approved:

- `utm_source`: `youtube`, `linkedin`, `newsletter`, `website`, `internal_review`
- `utm_medium`: `organic_video`, `organic_social`, `email`, `site`, `internal`
- `utm_campaign`: `authority_evergreen_2026_05`
- `utm_content`: pillar slug such as `ai_patent`, `ai_compliance`, `tech_gc`, `ma_readiness`

Important: do not use person, company, matter, prospect, client, health, employment, legal-issue, regulated-data, or sensitive category values in UTM parameters.

### Option C — Privacy-reviewed UTM taxonomy

Decision box:

- [ ] APPROVE privacy-reviewed UTM taxonomy for exact channel/scope below.
- [ ] APPROVE only after privacy counsel/Whiteford reviewer confirms taxonomy and retention posture.
- [ ] HOLD until privacy, analytics, HighLevel, and data-retention review is complete.

Required before use:

- Approved parameter names and values.
- Approved channels.
- Data minimization review.
- Privacy notice/analytics disclosure review.
- HighLevel/source-field mapping review if UTMs are captured or synced.
- Retention and access-control posture.
- Confirmation that UTM values do not encode client/prospect identity, legal-issue sensitivity, protected classes, employee/customer facts, deal status, or confidential/source-current claims.

Default recommendation for this tranche: Option A for now; Option C before any measured public campaign; avoid Option B unless Whiteford approves a short default taxonomy after privacy review.

## Decision matrix

| Pillar | Lead magnet | Candidate canonical route | Recommended route decision | CTA label recommendation | UTM recommendation | Non-confidential warning placement | Current approval status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| AI Patent | AI Patent Strategy Scorecard | `/ai-patent-strategy-scorecard` | Keep as canonical lead-magnet route, pending Jeff/Whiteford approval. | “Use the AI Patent Strategy Scorecard” or “Start the AI Patent Strategy Scorecard.” Avoid “Get legal advice” or patentability promises. | Default: no UTM for review/public drafts; privacy-reviewed UTM only if campaign attribution is approved. | Immediately before scorecard start; above any optional report/email request; near any free-text field if present; footer as supplement. | Internal review only. HOLD public/email/social/YouTube/HighLevel use pending approvals. |
| AI Compliance | AI Compliance Gameplan Builder | `/ai-compliance-gameplan` | Keep as canonical lead-magnet route, pending Jeff/Whiteford approval. | “Build your AI Compliance Gameplan” or “Use the AI Compliance Gameplan Builder.” Avoid compliance determinations or urgency tied to current law. | Default: no UTM for review/public drafts; privacy-reviewed UTM only if campaign attribution is approved. | Immediately before gameplan questions; above optional report/email request; near any data/vendor/use-case text fields; footer as supplement. | Internal review only. HOLD public/email/social/YouTube/HighLevel use pending approvals. |
| Tech GC | Tech Company Legal Health Checklist | `/colorado-tech-general-counsel` | Keep as canonical route for now; optional `#lead-magnet` anchor requires UX/legal/privacy review before external use. | “Use the Tech Company Legal Health Checklist” or “Run the Legal Health Checklist.” Avoid “diagnose your legal health” if it implies a legal opinion. | Default: no UTM for review/public drafts; privacy-reviewed UTM only if campaign attribution is approved. | Above checklist start; before milestone/category questions if they could invite sensitive facts; above opt-in/report request; footer as supplement. | Internal review only. HOLD public/email/social/YouTube/HighLevel use pending approvals. |
| M&A Readiness | Founder M&A Readiness Checklist | `/colorado-startup-ma-lawyer` or `/founder-ma-readiness-checklist` | Recommended: approve `/founder-ma-readiness-checklist` as the app-specific authority CTA route; reserve `/colorado-startup-ma-lawyer` for broader SEO/service-page context. Not approved until Jeff/Whiteford decide. | “Use the Founder M&A Readiness Checklist” or “Map your non-financial diligence categories.” Avoid transaction-readiness opinions, valuation, buyer-confidence, or deal-speed claims. | Default: no UTM for review/public drafts; privacy-reviewed UTM only if campaign attribution is approved. | Above checklist start; before any diligence/deal/category inputs; above opt-in/report request; footer as supplement. | Internal review only. HOLD public/email/social/YouTube/HighLevel use pending M&A route decision and approvals. |

## Pillar-specific approval boxes

### 1. AI Patent Strategy Scorecard

Route decision:

- [ ] APPROVE `/ai-patent-strategy-scorecard` as canonical for AI Patent authority CTAs.
- [ ] APPROVE a different route: ________________________________
- [ ] HOLD pending route/UX/legal/privacy review.

CTA decision:

- [ ] APPROVE CTA label: “Use the AI Patent Strategy Scorecard.”
- [ ] APPROVE CTA label: “Start the AI Patent Strategy Scorecard.”
- [ ] REQUEST revised CTA label: ________________________________
- [ ] HOLD pending attorney/brand review.

UTM decision:

- [ ] No UTM / clean canonical route.
- [ ] Default UTM taxonomy after privacy review.
- [ ] Privacy-reviewed UTM taxonomy only.
- [ ] HOLD all UTM use.

Required warning placement:

- [ ] APPROVE warning immediately before scorecard questions and report/opt-in request.
- [ ] REQUEST warning placement revision.
- [ ] HOLD until privacy/legal reviewer confirms.

Before external use, Jeff/Whiteford must approve:

- exact route;
- exact CTA label;
- exact public/social/YouTube/email copy;
- no legal advice / no attorney-client relationship / no guarantee language;
- visible non-confidential warning;
- source-current posture for any USPTO, patent-law, AI-inventorship, or filing-timing reference;
- UTM policy;
- privacy/terms/disclaimer URL placement;
- HighLevel opt-in-only routing if any report/nurture path is used;
- conflicts/suppression/prior-touch review before any company-specific or contact-specific adaptation.

### 2. AI Compliance Gameplan Builder

Route decision:

- [ ] APPROVE `/ai-compliance-gameplan` as canonical for AI Compliance authority CTAs.
- [ ] APPROVE a different route: ________________________________
- [ ] HOLD pending route/UX/legal/privacy review.

CTA decision:

- [ ] APPROVE CTA label: “Build your AI Compliance Gameplan.”
- [ ] APPROVE CTA label: “Use the AI Compliance Gameplan Builder.”
- [ ] REQUEST revised CTA label: ________________________________
- [ ] HOLD pending attorney/brand review.

UTM decision:

- [ ] No UTM / clean canonical route.
- [ ] Default UTM taxonomy after privacy review.
- [ ] Privacy-reviewed UTM taxonomy only.
- [ ] HOLD all UTM use.

Required warning placement:

- [ ] APPROVE warning immediately before gameplan questions and report/opt-in request.
- [ ] REQUEST warning placement revision.
- [ ] HOLD until privacy/legal reviewer confirms.

Before external use, Jeff/Whiteford must approve:

- exact route;
- exact CTA label;
- exact public/social/YouTube/email copy;
- no legal advice / no attorney-client relationship / no guarantee language;
- visible non-confidential warning;
- source-current posture for any Colorado, federal, EU, employment, privacy, AI-governance, or sector-specific legal reference;
- UTM policy;
- privacy/terms/disclaimer URL placement;
- HighLevel opt-in-only routing if any report/nurture path is used;
- email sender/footer/unsubscribe/consent basis before newsletter or nurture use;
- conflicts/suppression/prior-touch review before any company-specific or contact-specific adaptation.

### 3. Tech Company Legal Health Checklist

Route decision:

- [ ] APPROVE `/colorado-tech-general-counsel` as canonical for Tech GC authority CTAs.
- [ ] APPROVE `/colorado-tech-general-counsel#lead-magnet` only after UX/legal/privacy review.
- [ ] APPROVE a different route: ________________________________
- [ ] HOLD pending route/UX/legal/privacy review.

CTA decision:

- [ ] APPROVE CTA label: “Use the Tech Company Legal Health Checklist.”
- [ ] APPROVE CTA label: “Run the Legal Health Checklist.”
- [ ] REQUEST revised CTA label: ________________________________
- [ ] HOLD pending attorney/brand review.

UTM decision:

- [ ] No UTM / clean canonical route.
- [ ] Default UTM taxonomy after privacy review.
- [ ] Privacy-reviewed UTM taxonomy only.
- [ ] HOLD all UTM use.

Required warning placement:

- [ ] APPROVE warning immediately before checklist questions and report/opt-in request.
- [ ] REQUEST warning placement revision.
- [ ] HOLD until privacy/legal reviewer confirms.

Before external use, Jeff/Whiteford must approve:

- exact route and whether any anchor is acceptable;
- exact CTA label;
- exact public/social/YouTube/email copy;
- no legal advice / no attorney-client relationship / no guarantee language;
- visible non-confidential warning;
- source-current posture for any Colorado, employment, privacy/security, AI/data, diligence, or legal-operation reference;
- UTM policy;
- privacy/terms/disclaimer URL placement;
- non-subscriber browser-only value posture;
- HighLevel opt-in-only routing if any report/nurture path is used;
- email sender/footer/unsubscribe/consent basis before newsletter or nurture use;
- conflicts/suppression/prior-touch review before any company-specific or contact-specific adaptation.

### 4. Founder M&A Readiness Checklist

Route decision:

- [ ] APPROVE `/founder-ma-readiness-checklist` as canonical app-specific lead-magnet route for authority CTAs.
- [ ] APPROVE `/colorado-startup-ma-lawyer` as canonical route for this campaign.
- [ ] APPROVE a different route: ________________________________
- [ ] HOLD pending M&A route/UX/legal/privacy review.

Recommended PM decision: approve `/founder-ma-readiness-checklist` for the lead-magnet CTA because it routes directly to the interactive diagnostic and better satisfies the narrow-problem value-first principle. Preserve `/colorado-startup-ma-lawyer` for broader service-page, SEO, or contextual internal-link use if Jeff/Whiteford prefer that architecture.

CTA decision:

- [ ] APPROVE CTA label: “Use the Founder M&A Readiness Checklist.”
- [ ] APPROVE CTA label: “Map your non-financial diligence categories.”
- [ ] REQUEST revised CTA label: ________________________________
- [ ] HOLD pending attorney/brand review.

UTM decision:

- [ ] No UTM / clean canonical route.
- [ ] Default UTM taxonomy after privacy review.
- [ ] Privacy-reviewed UTM taxonomy only.
- [ ] HOLD all UTM use.

Required warning placement:

- [ ] APPROVE warning immediately before checklist questions and report/opt-in request.
- [ ] REQUEST warning placement revision.
- [ ] HOLD until privacy/legal reviewer confirms.

Before external use, Jeff/Whiteford must approve:

- exact M&A route choice;
- exact CTA label;
- exact public/social/YouTube/email copy;
- no legal advice / no attorney-client relationship / no guarantee language;
- visible non-confidential warning;
- source-current posture for any M&A, diligence, financing, buyer, valuation, privacy/security, employment, AI/data, corporate, or transaction-related reference;
- UTM policy;
- privacy/terms/disclaimer URL placement;
- HighLevel opt-in-only routing if any report/nurture path is used;
- email sender/footer/unsubscribe/consent basis before newsletter or nurture use;
- conflicts/suppression/prior-touch review before any company-specific or contact-specific adaptation;
- confirmation that no buyer names, target names, cap-table details, valuation facts, customer-contract details, adverse-party facts, employment disputes, or confidential diligence materials are requested through public forms.

## Channel approval requirements

### Public web / landing pages

Not approved from this packet.

Before any public page copy, CTA, form, route, or analytics tracking goes live, Jeff/Whiteford must approve:

- exact canonical route per pillar;
- final CTA label and surrounding copy;
- non-confidential warning placement near the form and any optional opt-in/report request;
- privacy/terms/disclaimer URLs and display location;
- attorney-advertising treatment and co-brand posture;
- source-current review for any legal/current-law/current-market/reference claims;
- UTM/no-UTM policy and whether parameters are captured anywhere;
- no-advice/no-ACR/no-guarantee/conflicts/scope/written-engagement language;
- implementation scope, owner/operator, rollback/stop conditions, and final Jeff approval text.

### Email / newsletter / nurture

Not approved from this packet.

Before any email loading, test send, manual send, newsletter, nurture, sequence, or HighLevel campaign use, Jeff/Whiteford must approve:

- exact copy and CTA route;
- opt-in/consent basis;
- sender name/address and reply-to handling;
- firm footer, physical mailing address, attorney-advertising language, unsubscribe/preference mechanism, privacy/terms/disclaimer links;
- suppression/DND/bounce/prior-touch/conflicts checks;
- HighLevel workflow state and owner/operator;
- route/UTM policy;
- deliverability review;
- clear separation between transactional/on-page fulfillment and optional marketing consent.

### LinkedIn / social

Not approved from this packet.

Before any LinkedIn/social post, schedule, tag, comment, DM, boost, ad, or Social Planner use, Jeff/Whiteford must approve:

- exact final copy;
- tag/no-tag decision;
- route/CTA/UTM policy;
- no named-company/current-event/current-law additions unless source-current reviewed;
- legal/ethics/brand/privacy review;
- conflicts/suppression/prior-touch review if adapted to a company, person, client, prospect, or relationship context;
- no-advice/no-ACR/no-guarantee/non-confidential warning language appropriate to format;
- operator/timing/rollback plan.

### YouTube / video / Shorts

Not approved from this packet.

Before recording for public use, uploading, scheduling, publishing, adding descriptions, pinned comments, cards, end screens, Shorts, or repurposed clips, Jeff/Whiteford must approve:

- final script or talking points;
- exact CTA route and CTA label;
- description/pinned-comment/footer disclaimers;
- no-UTM or privacy-reviewed UTM approach;
- source-current review for any patent, AI law, Colorado law, compliance, privacy, M&A, diligence, employment, or current-reference statement;
- no named-company/current-event hooks unless separately sourced and approved;
- non-confidential warning in description and linked-form placement;
- no-advice/no-ACR/no-guarantee/conflicts/scope/written-engagement language;
- brand/co-brand treatment.

### HighLevel / CRM / workflow

Not approved from this packet.

Before any HighLevel or CRM action, Jeff/Whiteford must approve a separate operator packet naming:

- exact lane and canonical route;
- exact tag keys and field mappings;
- workflow state, trigger, and opt-in guard logic;
- consent source and newsletter/marketing consent separation;
- suppression/DND/bounce/prior-touch/conflicts handling;
- report email/nurture copy and footer/unsubscribe language;
- privacy/terms/disclaimer URLs;
- UTM capture policy and retention/access posture;
- owner/operator;
- test records and whether live token use is permitted;
- rollback/stop conditions;
- evidence capture plan.

No HighLevel/CRM contact, opportunity, tag, note, task, custom field, workflow, campaign, sequence, enrollment, trigger, test, activation, import, or sync mutation is authorized here.

## Legal / ethics / privacy caveats

Universal caveat baseline for final-review copy:

This material is for general educational purposes only. It is not legal advice, does not create an attorney-client relationship, and should not be used as a substitute for advice from qualified counsel about a specific situation. Do not submit confidential, privileged, trade-secret, invention-disclosure, source-code, customer-specific, employee-specific, dispute-specific, regulated, transaction-specific, valuation, cap-table, diligence, or security-incident information through a public form or reply. Completing a checklist, scorecard, gameplan, or readiness tool does not guarantee any legal, business, compliance, patent, financing, diligence, transaction, valuation, customer, vendor, or operational outcome. Any legal engagement would require conflict checks, confirmed scope, attorney approval, and a signed written engagement agreement.

Privacy posture:

- Public forms should request only categorical, non-confidential information.
- Avoid free-text fields where possible; if retained, place an immediate non-confidential warning next to the field.
- Do not use UTM parameters or hidden fields to encode sensitive facts, client/prospect identity, legal issue details, deal status, employee/customer facts, or regulated categories.
- Do not capture or sync UTM values into HighLevel, Supabase, analytics, or reports without privacy review.
- Preserve browser/on-page educational value for non-opted users; do not trigger report emails, nurture, workflows, outbound follow-up, or opportunity movement for non-opted users.

Ethics / marketing posture:

- Avoid legal conclusions, guarantees, predictions, urgency claims, improper solicitation, or individualized legal assessments.
- Treat attorney-advertising, jurisdictional, co-brand, and firm-footer requirements as unresolved until Whiteford/Schell IP review approves exact language.
- Do not imply that use of a checklist, scorecard, or gameplan equals attorney review.

## Source-current blocker language

Firecrawl/source access remains blocked for current-source work. Therefore:

- Do not add named-company examples, current-event hooks, market-size claims, reviewed-as-of claims, or current legal-update claims to these CTAs or route descriptions.
- Do not state current USPTO, Colorado AI, federal, EU, privacy, employment, M&A, diligence, securities, or sector-specific legal requirements without source-current review.
- Do not treat QMD, old docs, model memory, or the business-development corpus as a substitute for current external legal/source evidence.
- Keep this tranche source-independent until source access is restored or an approved replacement source workflow is completed.

Recommended source-current approval box:

- [ ] APPROVE source-independent public copy with no current-law/named-company/current-event claims.
- [ ] APPROVE source-current review workflow before adding current legal/source claims.
- [ ] HOLD all external use until source-current review is complete.

## Final go / hold summary

| Use scope | Current status | What must happen before use |
| --- | --- | --- |
| Internal Jeff/Whiteford review | GO | Use this packet to decide routes, CTA labels, UTM posture, and warning placement. |
| Public landing-page CTA use | HOLD | Approve route/CTA/warnings/UTM/privacy/legal/source-current/brand and implementation scope. |
| Email/newsletter/nurture use | HOLD | Approve exact copy, consent basis, sender/footer/unsubscribe/privacy links, suppression/conflicts, deliverability, route/UTM, and HighLevel state. |
| LinkedIn/social use | HOLD | Approve exact copy, tag/no-tag posture, route/UTM, legal/ethics/privacy/brand/source-current, and operator/timing/rollback. |
| YouTube/video use | HOLD | Approve final script/description/pinned-comment CTA/disclaimer, route/UTM, source-current, brand, and non-confidential warning. |
| HighLevel/CRM/workflow use | HOLD | Separate operator packet required; no mutation or test is authorized here. |
| M&A route selection | HOLD | Jeff/Whiteford must choose `/founder-ma-readiness-checklist`, `/colorado-startup-ma-lawyer`, or another approved route before external use. |

## Jeff / Whiteford consolidated decision block

Canonical route approvals:

- [ ] AI Patent: approve `/ai-patent-strategy-scorecard`.
- [ ] AI Compliance: approve `/ai-compliance-gameplan`.
- [ ] Tech GC: approve `/colorado-tech-general-counsel`.
- [ ] M&A: approve `/founder-ma-readiness-checklist`.
- [ ] M&A: approve `/colorado-startup-ma-lawyer`.
- [ ] M&A: approve another route: ________________________________

CTA label approvals:

- [ ] AI Patent: “Use the AI Patent Strategy Scorecard.”
- [ ] AI Compliance: “Build your AI Compliance Gameplan.”
- [ ] Tech GC: “Use the Tech Company Legal Health Checklist.”
- [ ] M&A: “Use the Founder M&A Readiness Checklist.”
- [ ] Request revised CTA labels before external use.

UTM approvals:

- [ ] No UTM / clean canonical route by default.
- [ ] Default UTM taxonomy after privacy review.
- [ ] Privacy-reviewed UTM taxonomy only.
- [ ] Hold all UTM use until later analytics/privacy decision.

Warning placement approvals:

- [ ] Approve warning directly above/adjacent to each form start and opt-in/report request.
- [ ] Require warning next to every free-text field.
- [ ] Require footer disclaimer as supplemental only, not sole placement.
- [ ] Request revised warning placement before external use.

Launch/use approvals:

- [ ] Approve internal review only; no external/live action.
- [ ] Approve public use only after final legal/privacy/source-current/brand/route/CTA/UTM review.
- [ ] Approve email/newsletter only after sender/footer/unsubscribe/consent/suppression/deliverability review.
- [ ] Approve YouTube/social only after exact-copy/script/tag/no-tag/source-current review.
- [ ] Approve HighLevel only through a separate operator packet.

Default PM recommendation: mark “internal review only,” approve clean canonical route defaults for AI Patent, AI Compliance, and Tech GC, choose `/founder-ma-readiness-checklist` for M&A authority CTAs if Jeff wants direct app-specific diagnostic routing, and hold all external/public/HighLevel/email/social/YouTube use until the listed approvals are complete.
