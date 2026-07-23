# HighLevel AI Authority Funnel Map

Source files audited:
- src/app/api/leads/route.ts
- src/lib/campaigns.ts
- src/components/gameplan-builder.tsx
- src/components/patent-scorecard.tsx
- src/components/quick-lead-form.tsx
- src/components/landing.tsx
- src/components/tech-gc-legal-health-checklist.tsx
- src/components/founder-ma-readiness-checklist.tsx
- src/components/lead-magnet-flow.tsx
- src/lib/magnets/finalization.ts
- tests/verify_lead_magnet_api_consent.mjs
- tests/verify_lead_magnet_static_guardrails.mjs

Implementation state:
- The site posts leads to POST /api/leads.
- /api/leads upserts contacts to HighLevel through https://services.leadconnectorhq.com/contacts/upsert when GHL_PRIVATE_INTEGRATION_TOKEN and GHL_LOCATION_ID are set.
- The route currently creates/updates contacts, tags, and custom field values only. HighLevel forms, workflow assets, email steps, calendars, list/smart-list filters, and opportunity pipelines still need to be created in HighLevel manually unless a separate admin automation is added.
- Current consent routing is literal-checkbox-gated: newsletter tags, workflow trigger tags, and email-sequence routing are allowed only when the submitted payload has `contact.subscribe === true` for regular lead magnets or `subscribe === true` for final magnets.
- Non-consented submissions may receive the promised browser/on-page or download value, but they must stay in a HOLD posture: no newsletter segment, no workflow trigger, no nurture/email-sequence routing, no auto-send status, and no live HighLevel enrollment beyond any separately approved contact upsert.
- This map is architecture/reference only. It does not authorize any HighLevel live edits, workflow activation, contact mutation, tag application, send, enrollment, public publishing, or client/prospect-facing action.

## 1. Shared HighLevel contact upsert contract

Required environment variables:
- GHL_PRIVATE_INTEGRATION_TOKEN
- GHL_LOCATION_ID

HighLevel endpoint used:
- POST https://services.leadconnectorhq.com/contacts/upsert
- Headers:
  - Authorization: Bearer $GHL_PRIVATE_INTEGRATION_TOKEN
  - Content-Type: application/json
  - Version: 2021-07-28

Required lead field:
- contact.email

Contact fields sent:
- locationId: GHL_LOCATION_ID
- firstName: first token from contact.name
- lastName: remaining tokens from contact.name
- email: contact.email
- companyName: contact.company
- tags: calculated tag set below
- customFields: calculated custom fields below

Base tags added to regular campaign submissions:
- whiteford-mountain-west
- all non-consent static campaign tags from src/lib/campaigns.ts
- assessment.tags, when present, after the API filters out client-supplied `workflow:*` tags
- campaign trigger tag for the selected campaign only when `contact.subscribe === true`
- newsletter:ai only when `contact.subscribe === true`
- newsletter:not-consented when `contact.subscribe` is false or missing

Consent/routing behavior:
- `newsletter:ai` is no longer a static campaign tag. It is applied only by the API consent branch after a literal checked opt-in value.
- Non-consented regular campaign submissions receive `newsletter:not-consented`, `consent_basis=no_email_opt_in`, `approval_status=no-auto-send`, no `workflow:*` trigger tag, and an empty `campaignRouting.emailSequence`.
- Opted-in regular campaign submissions receive the relevant campaign workflow trigger tag, `newsletter:ai`, `consent_basis=lead_magnet_email_opt_in:{campaign-key}`, and `approval_status=pending`; this remains routing metadata, not authorization to activate or send from HighLevel without separate review.
- Final-magnet submissions use the same literal opt-in principle, but never add workflow trigger tags or email-sequence routing from the API branch.

## 2. Custom fields to create in HighLevel

Create these as contact custom fields and map each API key exactly as shown. Use text fields unless a score field is noted as numeric.

Core routing fields:
- campaign_key: Text. Values: ai-compliance, ai-patent, tech-gc, ma-readiness.
- campaign_label: Text. Human-readable nurture label.
- authority_pillar: Text. Authority pillar from campaign config.
- source_page: Text. Page or tool slug that submitted the lead.
- source_channel: Text. Usually website when the frontend sends it.
- youtube_topic: Text. Reserved for YouTube lead-source context.
- lead_magnet: Text. Lead magnet name from campaign config.
- recommended_offer: Text. Productized offer from campaign config.
- role: Text. Prospect role/title from form.

AI compliance/gameplan fields:
- ai_risk_score: Number. riskScore from Gameplan Builder.
- ai_readiness_score: Number. readinessScore from Gameplan Builder.
- ai_score_band: Text. assessment.band.label.
- ai_recommended_offer: Text. assessment.band.cta.
- ai_use_cases: Text/long text. Comma-separated selected use-case keys.
- ai_readiness_checks: Text/long text. Comma-separated readiness control keys.

AI patent scorecard fields:
- ai_patent_score: Number. Patent scorecard total.
- ai_patent_stage: Text. Company stage.
- ai_patent_score_band: Text. Patent score band.
- ai_patent_checks: Text/long text. Comma-separated selected patent check keys.

Recommended additional HighLevel fields not currently sent by /api/leads:
- calendar_interest: Text/boolean. Set by HighLevel workflow when a meeting CTA is clicked.
- calendar_booked: Boolean. Set by HighLevel appointment trigger.
- ghl_source_url: Text. Full submitted URL, if frontend adds it later.
- utm_source, utm_medium, utm_campaign, utm_content, utm_term: Text. Landing attribution, if frontend adds UTM capture later.
- legal_disclaimer_acknowledged: Boolean. Useful if forms later require explicit disclaimer acknowledgement.

## 3. Forms and site-to-HighLevel mapping

### AI Compliance Gameplan Builder

Site source:
- Component: src/components/gameplan-builder.tsx
- Form/tool page: /ai-compliance-gameplan
- API payload sourcePage: ai-compliance-gameplan
- API payload campaignKey: not explicitly sent; /api/leads defaults to ai-compliance

Visible form/contact fields:
- Name
- Email
- Company
- Role
- Subscribe checkbox, default false / optional opt-in

Assessment fields collected:
- selectedUseCases keys:
  - hr
  - financial
  - health
  - customer
  - sales
  - vendor
- readinessChecks keys:
  - owner
  - inventory
  - contracts
  - data
  - review
  - records
  - bias
- assessment.riskScore
- assessment.readinessScore
- assessment.band.label
- assessment.band.cta
- assessment.tags

Assessment tags generated by Gameplan Builder:
- leadmagnet:ai-gameplan
- ai-risk:board-level-readiness-gap OR ai-risk:elevated-implementation-need OR ai-risk:managed-governance-foundation
- ai-use:hr, ai-use:financial, ai-use:health, ai-use:customer, ai-use:sales, ai-use:vendor depending on selections

Recommended HighLevel form name:
- AI Compliance Gameplan Builder - Website

### AI Patent Strategy Scorecard

Site source:
- Component: src/components/patent-scorecard.tsx
- Page: /ai-patent-strategy-scorecard
- API payload sourcePage: ai-patent-strategy-scorecard
- API payload campaignKey: ai-patent
- sourceChannel: website

Visible form/contact fields:
- Name
- Email
- Company
- Role
- Subscribe checkbox, default false / optional opt-in

Patent scorecard inputs:
- stage values:
  - Idea / prototype
  - MVP in market
  - Fundraising or diligence
  - Enterprise/customer rollout
- patent.checks keys:
  - human
  - records
  - ownership
  - vendor
  - technical
  - disclosure
  - secret
- patent.score
- patent.band values:
  - Urgent documentation gap
  - Strategy needs tightening
  - Strong foundation for review

Recommended HighLevel form name:
- AI Patent Strategy Scorecard - Website

### Tech GC Lead Magnet Form

Site source:
- Component: src/components/tech-gc-legal-health-checklist.tsx (legacy quick-lead/landing references should not control consent routing)
- Landing page slug/sourcePage: colorado-tech-general-counsel
- API payload campaignKey: tech-gc
- sourceChannel: website

Visible form/contact fields:
- Name
- Email
- Company
- Role
- Subscribe checkbox, default false / optional opt-in

Recommended HighLevel form name:
- Tech GC Legal Health Checklist - Website

### M&A Readiness Lead Magnet Form

Site source:
- Component: src/components/founder-ma-readiness-checklist.tsx (legacy quick-lead/landing references should not control consent routing)
- Landing page slug/sourcePage: colorado-startup-ma-lawyer
- API payload campaignKey: ma-readiness
- sourceChannel: website

Visible form/contact fields:
- Name
- Email
- Company
- Role
- Subscribe checkbox, default false / optional opt-in

Recommended HighLevel form name:
- Founder M&A Readiness Checklist - Website

## 4. Campaign-specific tags, segments, triggers, and copy

### ai-compliance

Campaign label:
- AI Compliance Readiness Nurture

Authority pillar:
- AI Legal Risk and Compliance

Lead magnet:
- AI Compliance Gameplan Builder

Recommended offer:
- AI Compliance Readiness Sprint

Exact trigger tag:
- workflow:ai-compliance-readiness

Exact static campaign tags:
- leadmagnet:ai-compliance-gameplan
- interest:ai-compliance

Consent-gated tags added by /api/leads only when `contact.subscribe === true`:
- workflow:ai-compliance-readiness
- newsletter:ai

HOLD tags/fields for false or missing opt-in:
- newsletter:not-consented
- consent_basis: no_email_opt_in
- approval_status: no-auto-send

Additional possible assessment tags:
- leadmagnet:ai-gameplan
- ai-risk:board-level-readiness-gap
- ai-risk:elevated-implementation-need
- ai-risk:managed-governance-foundation
- ai-use:hr
- ai-use:financial
- ai-use:health
- ai-use:customer
- ai-use:sales
- ai-use:vendor

HighLevel smart lists / segments:
- Segment: AI Compliance - All
  - Filter: tag is workflow:ai-compliance-readiness OR tag is interest:ai-compliance
- Segment: AI Compliance - Board-Level Gap
  - Filter: tag is ai-risk:board-level-readiness-gap
- Segment: AI Compliance - Elevated Need
  - Filter: tag is ai-risk:elevated-implementation-need
- Segment: AI Compliance - Vendor Risk
  - Filter: tag is ai-use:vendor OR ai_use_cases contains vendor
- Segment: AI Compliance - HR/Financial/Health Consequential Workflows
  - Filter: tag is ai-use:hr OR tag is ai-use:financial OR tag is ai-use:health
- Segment: AI Newsletter Consented
  - Filter: tag is newsletter:ai AND tag is not newsletter:not-consented

Trigger rule:
- Workflow name: AI Compliance Readiness Nurture
- Trigger: Contact Tag Added
- Tag: workflow:ai-compliance-readiness
- Suggested re-entry: off unless tag is removed/re-added intentionally
- Suppression: if `newsletter:not-consented` is present, do not enter or continue this workflow, do not send newsletter/nurture emails, and do not use the trigger tag; allow only the promised browser/on-page or separately reviewed transactional fulfillment value.

Email nurture copy:

Email 1
- Subject: Your AI compliance gameplan
- Preview: A practical next-step map for AI governance and legal readiness.
- Body: Your scorecard is a starting point, not a legal conclusion. The useful next step is to turn the risk areas into an inventory, owner map, vendor review, and 30/60/90-day implementation plan.

Email 2
- Subject: Vendor risk is often the first AI legal risk
- Preview: AI legal readiness often starts with the contract stack.
- Body: Before a policy solves anything, a company needs to know which AI vendors touch data, what rights the vendor has, and where confidentiality, IP ownership, indemnity, audit, and security terms live.

Email 3
- Subject: Colorado AI readiness without overreacting
- Preview: How to treat unsettled law as a readiness workstream.
- Body: Colorado AI and ADMT rules are moving. That does not mean companies should freeze. It means readiness should focus on use-case inventory, consequential decision exposure, human review, notices, records, and governance ownership.

Email 4
- Subject: Turn AI use into a legal operating system
- Preview: The goal is repeatable governance, not one-off panic.
- Body: A durable AI legal system includes intake, approval, vendor review, documentation, escalation, training, and board-ready reporting. That is the workstream behind an AI Compliance Readiness Sprint.

Calendar handoff:
- Primary CTA: Book an AI strategy call / AI Compliance Readiness Sprint consult.
- Route to Jeff's AI compliance calendar.
- Pass meeting context in internal notification: campaign_label, companyName, role, ai_risk_score, ai_readiness_score, ai_score_band, ai_recommended_offer, ai_use_cases, ai_readiness_checks, source_page.
- If ai_score_band is Board-level readiness gap or riskScore >= 70, create an internal priority notification before email 2.

### ai-patent

Campaign label:
- AI Patent Strategy Nurture

Authority pillar:
- AI Patent Law

Lead magnet:
- AI Patent Strategy Scorecard

Recommended offer:
- AI Patent Strategy Sprint

Exact trigger tag:
- workflow:ai-patent-strategy

Exact static campaign tags:
- leadmagnet:ai-patent-scorecard
- interest:ai-patent-law

Consent-gated tags added by /api/leads only when `contact.subscribe === true`:
- workflow:ai-patent-strategy
- newsletter:ai

HOLD tags/fields for false or missing opt-in:
- newsletter:not-consented
- consent_basis: no_email_opt_in
- approval_status: no-auto-send

HighLevel smart lists / segments:
- Segment: AI Patent - All
  - Filter: tag is workflow:ai-patent-strategy OR tag is interest:ai-patent-law
- Segment: AI Patent - Urgent Documentation Gap
  - Filter: ai_patent_score_band equals Urgent documentation gap OR ai_patent_score less than 42
- Segment: AI Patent - Fundraising or Diligence
  - Filter: ai_patent_stage equals Fundraising or diligence
- Segment: AI Patent - Enterprise Rollout
  - Filter: ai_patent_stage equals Enterprise/customer rollout
- Segment: AI Newsletter Consented
  - Filter: tag is newsletter:ai AND tag is not newsletter:not-consented

Trigger rule:
- Workflow name: AI Patent Strategy Nurture
- Trigger: Contact Tag Added
- Tag: workflow:ai-patent-strategy
- Suggested re-entry: off unless a new scorecard is submitted after a meaningful status change.
- Suppression: if `newsletter:not-consented` is present, do not enter or continue this workflow, do not send newsletter/nurture emails, and do not use the trigger tag; allow only the promised browser/on-page or separately reviewed transactional fulfillment value.

Email nurture copy:

Email 1
- Subject: Your AI patent strategy scorecard
- Preview: What to document before AI-assisted R&D becomes a patent problem.
- Body: The scorecard is designed to help founders identify where human contribution, invention records, ownership, claim strategy, and product roadmap need to be tightened before patent filing.

Email 2
- Subject: The mistake founders make with AI-assisted invention
- Preview: The AI tool is not the inventor. The human contribution still matters.
- Body: For AI-assisted inventions, the practical question is not whether AI was used. It is whether the human contribution to conception is documented clearly enough to support inventorship and patent strategy.

Email 3
- Subject: Can you patent AI software?
- Preview: Eligibility and claim strategy need to be designed early.
- Body: AI and software inventions can raise subject-matter eligibility questions. Strong strategy usually starts with the technical improvement, data flow, model role, system architecture, and business use case.

Email 4
- Subject: Build the legal moat before the demo gets copied
- Preview: Patents, trade secrets, contracts, and product roadmap work together.
- Body: The strongest AI IP strategies rarely depend on one filing alone. They align patent claims, trade secret controls, contractor assignments, customer terms, and the product roadmap.

Calendar handoff:
- Primary CTA: Book an AI patent strategy call / AI Patent Strategy Sprint.
- Route to Jeff's AI patent strategy calendar.
- Pass meeting context in internal notification: campaign_label, companyName, role, ai_patent_score, ai_patent_stage, ai_patent_score_band, ai_patent_checks, source_page.
- If ai_patent_score_band is Urgent documentation gap or ai_patent_stage is Fundraising or diligence, create an internal high-priority task for Jeff before the appointment.

### tech-gc

Campaign label:
- Tech GC Launchpad Nurture

Authority pillar:
- Tech Outside General Counsel

Lead magnet:
- Colorado Tech Company Legal Health Checklist

Recommended offer:
- Tech Company OGC Launchpad

Exact trigger tag:
- workflow:tech-gc-launchpad

Exact static campaign tags:
- leadmagnet:tech-gc-checklist
- interest:tech-ogc

Consent-gated tags added by /api/leads only when `contact.subscribe === true`:
- workflow:tech-gc-launchpad
- newsletter:ai

HOLD tags/fields for false or missing opt-in:
- newsletter:not-consented
- consent_basis: no_email_opt_in
- approval_status: no-auto-send

HighLevel smart lists / segments:
- Segment: Tech GC - All
  - Filter: tag is workflow:tech-gc-launchpad OR tag is interest:tech-ogc
- Segment: Tech GC - Checklist Leads
  - Filter: tag is leadmagnet:tech-gc-checklist
- Segment: Tech GC - Company Leadership
  - Filter: role contains founder OR role contains CEO OR role contains COO OR role contains GC OR role contains counsel
- Segment: AI Newsletter Consented
  - Filter: tag is newsletter:ai AND tag is not newsletter:not-consented

Trigger rule:
- Workflow name: Tech GC Launchpad Nurture
- Trigger: Contact Tag Added
- Tag: workflow:tech-gc-launchpad
- Suggested re-entry: off unless the lead magnet is requested again after a new company milestone.
- Suppression: if `newsletter:not-consented` is present, do not enter or continue this workflow, do not send newsletter/nurture emails, and do not use the trigger tag; allow only the promised browser/on-page or separately reviewed transactional fulfillment value.

Email nurture copy:

Email 1
- Subject: Your technology-company legal health checklist
- Preview: A practical way to see where the company is carrying legal drag.
- Body: The checklist is designed to sort legal work by operational risk: contracts, hiring, IP ownership, privacy, financing readiness, and AI governance.

Email 2
- Subject: From patent strategy to company legal infrastructure
- Preview: What changes when a technology company starts to scale.
- Body: Patent protection is only one part of the legal system a scaling technology company needs. Contracts, employment, data, financing, governance, and commercial risk become part of the same operating layer.

Email 3
- Subject: What to fix before hiring, fundraising, or selling
- Preview: Legal readiness should match the next business event.
- Body: The right legal priorities depend on the next milestone: hiring, enterprise customers, financing, acquisition talks, or product launch. A legal operating review turns that into a sequence.

Calendar handoff:
- Primary CTA: Book a legal operating review / Tech Company OGC Launchpad consult.
- Route to Jeff's technology outside general counsel calendar or general consultation calendar.
- Pass meeting context in internal notification: campaign_label, companyName, role, lead_magnet, recommended_offer, source_page.
- If role indicates founder/CEO/GC, create internal task: review company legal operating needs before call.

### ma-readiness

Campaign label:
- M&A Readiness Nurture

Authority pillar:
- M&A, Diligence, and Transaction Readiness

Lead magnet:
- Founder M&A Readiness Checklist

Recommended offer:
- Founder M&A Readiness Review

Exact trigger tag:
- workflow:ma-readiness

Exact static campaign tags:
- leadmagnet:ma-readiness-checklist
- interest:ma-readiness

Consent-gated tags added by /api/leads only when `contact.subscribe === true`:
- workflow:ma-readiness
- newsletter:ai

HOLD tags/fields for false or missing opt-in:
- newsletter:not-consented
- consent_basis: no_email_opt_in
- approval_status: no-auto-send

HighLevel smart lists / segments:
- Segment: M&A Readiness - All
  - Filter: tag is workflow:ma-readiness OR tag is interest:ma-readiness
- Segment: M&A Readiness - Checklist Leads
  - Filter: tag is leadmagnet:ma-readiness-checklist
- Segment: M&A Readiness - Founder/Owner Roles
  - Filter: role contains founder OR role contains CEO OR role contains owner OR role contains CFO
- Segment: AI Newsletter Consented
  - Filter: tag is newsletter:ai AND tag is not newsletter:not-consented

Trigger rule:
- Workflow name: M&A Readiness Nurture
- Trigger: Contact Tag Added
- Tag: workflow:ma-readiness
- Suggested re-entry: off unless a new deal-readiness event occurs.
- Suppression: if `newsletter:not-consented` is present, do not enter or continue this workflow, do not send newsletter/nurture emails, and do not use the trigger tag; allow only the promised browser/on-page or separately reviewed transactional fulfillment value.

Email nurture copy:

Email 1
- Subject: Your founder M&A readiness checklist
- Preview: Start cleaning up the issues a buyer will ask about later.
- Body: The checklist focuses on the non-financial diligence issues that can slow deals: IP ownership, assignments, customer contracts, employee matters, AI/data/privacy, and corporate records.

Email 2
- Subject: Three non-financial risks that slow tech deals
- Preview: The diligence problems that show up before price becomes the issue.
- Body: Tech deals often slow down around IP ownership, customer/vendor contracts, and data or AI product risk. The earlier those are mapped, the better the founder can control the process.

Email 3
- Subject: What a buyer will ask before you are ready
- Preview: A little cleanup before diligence can change the conversation.
- Body: A buyer will ask for cap table support, invention assignments, key contracts, employee documents, product risk, disputes, and compliance posture. A readiness review identifies what needs attention before the request list arrives.

Calendar handoff:
- Primary CTA: Book a founder transaction review / Founder M&A Readiness Review.
- Route to Jeff's M&A/founder readiness calendar, or to a shared intake calendar that can introduce Whiteford corporate/M&A attorneys.
- Pass meeting context in internal notification: campaign_label, companyName, role, lead_magnet, recommended_offer, source_page.
- If role indicates founder/CEO/CFO/owner, create internal task: review whether Whiteford corporate/M&A bench should be introduced.

## 5. Final-magnet consent-routing posture

Final-magnet sources:
- Browser flow: src/components/lead-magnet-flow.tsx
- API branch: handleFinalMagnetSubmission in src/app/api/leads/route.ts
- Regression coverage: tests/verify_lead_magnet_api_consent.mjs and tests/verify_lead_magnet_static_guardrails.mjs

Final magnet slugs and lane tags:
- ai-risk-triage -> magnet-ai-risk-triage
- patent-moat-scorecard -> magnet-patent-moat-scorecard
- governance-plan -> magnet-governance-plan
- outside-counsel-playbook -> magnet-outside-counsel-playbook

Literal opt-in rule:
- `subscribe === true` is required before the final-magnet API branch adds `newsletter:ai` or `consent_basis=lead_magnet_email_opt_in:{magnet_slug}`.
- `subscribe === false`, missing `subscribe`, or any non-boolean value is non-consented and receives `newsletter:not-consented`, `consent_basis=no_email_opt_in`, and `approval_status=no-auto-send`.
- Final-magnet opted-in submissions still do not receive `workflow:*` trigger tags or API-provided email sequence routing. The API response sets `campaignRouting.triggerTag` to null and `campaignRouting.emailSequence` to an empty array.
- Non-consented final-magnet submissions may receive the promised browser/on-page result or download value, but must not be routed into newsletter segments, workflow triggers, nurture/email sequences, auto-send queues, or any live HighLevel enrollment.

Current browser constraint:
- The browser flow currently sends `subscribe: contact.permissionAcknowledged` and requires the permission checkbox before final assessment/download submission. Attorney/privacy review should confirm the checkbox copy and email-consent scope before any public/live use.
- If Whiteford later wants non-opted browser users to receive on-page/PDF value without marketing consent while still being captured as `newsletter:not-consented`, that requires a separate product/privacy decision and test update.

Business-development posture:
- The lead magnet should solve one narrow diagnostic problem and fulfill the promised value first. A consultation CTA, newsletter, workflow, or stronger follow-up belongs only after explicit opt-in and separate attorney/privacy/brand/source-current review.

## 6. Recommended HighLevel workflow structure

For each campaign, build a workflow with this pattern:

1. Trigger
   - Contact Tag Added = campaign trigger tag.
2. Guardrails
   - The workflow should be reachable only when the API has added the campaign trigger tag after `contact.subscribe === true`.
   - If contact has tag `newsletter:not-consented`, stop before enrollment, remove/avoid newsletter-style nurture steps, and do not send emails, SMS, DMs, or other outbound follow-up.
   - Keep promised lead-magnet fulfillment separate from newsletter/nurture automation. Non-consented users may receive browser/on-page or separately attorney-reviewed transactional delivery value, but they are not send-ready.
   - If contact is already in the same workflow, do not duplicate unless intentionally re-entered.
3. Immediate actions for opted-in workflow entries only
   - Send the approved lead magnet / tool-result email only when consent, unsubscribe/suppression, sender/footer, and attorney-review gates are satisfied.
   - Add/update campaign-specific opportunity or task only if separately approved.
   - Notify Jeff/internal team with relevant custom fields.
4. Wait and nurture
   - Wait 2 days, send email 2.
   - Wait 4 days, send email 3.
   - Wait 5-7 days, send email 4 if a fourth email exists.
5. Calendar CTA
   - Add calendar link in each email after the first value-delivery paragraph.
   - Use campaign-specific calendar where possible.
6. Meeting booked branch
   - Trigger on appointment booked or calendar event created.
   - Add tag: calendar:booked.
   - Remove or pause nurture if needed.
   - Create internal task with submitted fields and recommended offer.
7. No-booking branch
   - After final nurture wait, add tag: nurture:completed:{campaign-key}.
   - Keep in smart list for periodic newsletter only if consented and separately approved for newsletter use.

Recommended generated completion tags:
- nurture:completed:ai-compliance
- nurture:completed:ai-patent
- nurture:completed:tech-gc
- nurture:completed:ma-readiness

Recommended calendar tags:
- calendar:clicked
- calendar:booked
- calendar:no-show
- calendar:completed

## 7. Calendar handoff map

Minimum handoff rules:
- Any meeting CTA click: add calendar:clicked and set calendar_interest to the recommended offer.
- Any appointment booked: add calendar:booked, create/assign internal task to Jeff, and include all campaign custom fields in the task body.
- Any completed appointment: add calendar:completed and remove active nurture if the prospect becomes an active matter.

Campaign-specific calendar routing:
- ai-compliance -> AI Compliance Readiness Sprint calendar.
- ai-patent -> AI Patent Strategy Sprint calendar.
- tech-gc -> Tech Company OGC Launchpad / Legal Operating Review calendar.
- ma-readiness -> Founder M&A Readiness Review / Transaction Readiness calendar.

If only one calendar is available at launch:
- Use one consultation calendar and add a hidden query parameter or link-specific tracking action per campaign.
- In the booked-appointment workflow, branch based on campaign_key and recommended_offer.

## 8. Manual HighLevel steps not created by the current public API route

The current /api/leads route does not create these assets:
- Custom fields in HighLevel.
- HighLevel native forms or surveys.
- Workflows and Contact Tag Added triggers.
- Email templates and email workflow steps.
- Calendars, calendar links, appointment triggers, or calendar-specific routing.
- Smart lists / saved segments.
- Pipelines, opportunities, opportunity stages, or sales tasks.
- Consent/suppression policies.
- Internal user assignment rules.
- Dedicated unsubscribe/compliance settings for marketing nurture.

These need to be configured manually in HighLevel or implemented later with additional HighLevel API calls/admin scripts where HighLevel exposes supported endpoints for the relevant asset type.

## 9. Setup checklist

HighLevel configuration:
- Create/confirm private integration token and location ID.
- Add GHL_PRIVATE_INTEGRATION_TOKEN and GHL_LOCATION_ID to deployment environment.
- Create all custom fields listed in section 2 with exact keys.
- Create campaign tags exactly as listed in section 4, keeping `newsletter:ai` and workflow trigger tags out of static campaign tags and reserved for literal opt-in routing.
- Create recommended completion/calendar tags from section 6.
- Create four draft workflows using Contact Tag Added triggers only after attorney/privacy/brand/deliverability review and exact approval:
  - AI Compliance Readiness Nurture -> workflow:ai-compliance-readiness
  - AI Patent Strategy Nurture -> workflow:ai-patent-strategy
  - Tech GC Launchpad Nurture -> workflow:tech-gc-launchpad
  - M&A Readiness Nurture -> workflow:ma-readiness
- Add the email copy from section 4 to the matching workflow only as attorney-review draft copy; do not activate or enroll contacts from this map alone.
- Add calendar CTAs and meeting-booked branches.
- Create smart lists/segments from section 4.
- Configure internal notifications/tasks for Jeff with the relevant custom fields.
- Confirm unsubscribe, suppression, DND, consent basis, and `newsletter:not-consented` HOLD behavior before any send or enrollment.

Site/API QA:
- Submit AI Compliance Gameplan with no HighLevel env vars and verify preview mode returns payload, tags, customFields, and campaignRouting.
- Submit AI Patent Scorecard with no HighLevel env vars and verify preview mode returns campaignKey ai-patent and trigger tag workflow:ai-patent-strategy only when `contact.subscribe === true`.
- Submit Tech GC and M&A tests and verify trigger tags workflow:tech-gc-launchpad and workflow:ma-readiness only when `contact.subscribe === true`.
- Run `npm run test:leads` and confirm non-consented regular and final-magnet submissions have `newsletter:not-consented`, `consent_basis=no_email_opt_in`, `approval_status=no-auto-send`, no `newsletter:ai`, no `workflow:*`, and no email-sequence routing.
- Treat any live HighLevel contact upsert or workflow test as a separate exact-approval packet; this map does not authorize live test contacts.
- Verify contacts are upserted in any approved HighLevel test with correct firstName, lastName, companyName, tags, and custom fields.
- Verify each tag-added workflow starts only the intended opted-in nurture and never enrolls `newsletter:not-consented` records.
- Verify non-consented contacts are not placed into marketing newsletter sends, workflows, smart-list send audiences, or auto-send queues.

Recommended follow-ups:
- Keep `newsletter:ai` out of static campaign tags; preserve the literal-checkbox-gated API behavior with regression tests.
- Add UTM/full URL capture to frontend payload and custom fields.
- Consider sending sourceChannel: website from Gameplan Builder for consistency.
- Consider opportunity/pipeline creation only as a separate reviewed and approved HighLevel automation lane, not as a side effect of lead-magnet submission.
- Attorney/privacy review remains required for final-magnet checkbox copy, educational-communications consent scope, unsubscribe/preference handling, sender/footer requirements, and any workflow/email activation.
