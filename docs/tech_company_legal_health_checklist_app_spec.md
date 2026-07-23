# Tech Company Legal Health Checklist Interactive App Spec

Task: `t_c0314fa7`
Location: Whiteford Schell IP (`tm68WWMrcAa3TqQbEAMa`)
Pipeline: Whiteford Schell IP Pipeline (`Tbx4tA6wHv5lTwZPSHyZ`)
Primary workflow lane: `workflow:tech-gc-launchpad`
Status: draft/specification only; no HighLevel activation, external sends, SMS, social posting, or contact enrollment approved.

## 1. Purpose

Build the first-priority interactive lead magnet app for the Tech GC lane: a lightweight, non-confidential diagnostic that helps founders, executives, and operators understand where a technology company may be carrying legal drag across contracts, IP ownership, employment/contractor hygiene, privacy/security, AI/data usage, financing/customer pressure, and transaction readiness.

The app should:

1. Ask 8-10 non-confidential questions.
2. Show useful partial value before the email gate: overall band, category heat map, top 2 likely cleanup priorities, and an educational next step.
3. Gate the full personalized report behind business email and an unchecked opt-in checkbox.
4. Route only affirmative opt-ins into the Tech GC HighLevel workflow.
5. Store score, category outputs, consent evidence, and routing metadata in HighLevel.
6. Recommend the bounded productized next step: Tech Company OGC Launchpad.
7. Branch-readiness signals to the AI Compliance, AI Patent, and Founder M&A lanes without automatically tagging those workflows unless the user separately opts in to that lane.

Business-development synthesis used: keep the lead magnet immediately useful, fulfill the promised result first, then use follow-up to build trust and qualify. The app should not feel like a generic consultation request; it should diagnose the buyer's next operational milestone and convert to a bounded review.

## 2. Audience and positioning

Primary buyer:

- Founder/CEO, COO, CFO, general counsel, product/engineering executive, or operations lead at a Colorado/Mountain West technology, SaaS, AI, software, hardware, data, or advanced-services company.

Likely triggers:

- Hiring push.
- Enterprise customer review.
- New product launch.
- AI/data product expansion.
- Contractor-heavy buildout.
- Fundraising, board/investor request, or transaction discussion.
- Existing outside counsel relationship feels fragmented or reactive.

Promise:

- "Get a practical legal health snapshot for a growing technology company, with the top cleanup priorities to discuss before your next business milestone."

Legal/ethics boundary:

- The result is educational and triage-oriented only. It does not provide legal advice, does not create an attorney-client relationship, and should not ask for confidential details.

## 3. Recommended app route and UX structure

Recommended public route:

- `/tech-company-legal-health-checklist` for the app experience, with CTA links from `/colorado-tech-general-counsel`.

If avoiding a new route for the first build, embed the app at:

- `/colorado-tech-general-counsel#legal-health-checklist`

Recommended component names:

- `src/components/tech-legal-health-checklist.tsx`
- optional route: `src/app/tech-company-legal-health-checklist/page.tsx`

UX flow:

1. Hero panel: title, who it is for, 3 promised outputs, short disclaimer.
2. Diagnostic questions: 10 cards or a compact single-page checklist; no confidential facts requested.
3. Instant preview: overall score band, top 2 category risks, and a plain-English next step.
4. Report gate: business email, name, company, role, and unchecked opt-in.
5. Submit action: POST to `/api/leads` with `campaignKey: "tech-gc"` and `sourcePage` set to the actual app route.
6. Confirmation:
   - Opted in: explain that the report/checklist path is queued and future emails are based on opt-in.
   - Not opted in, if submission without opt-in is allowed: show in-browser result only and state no email sequence will be sent.

Important UX decision:

- The current `patent-scorecard.tsx` disables submission unless `contact.subscribe` is checked. For this app, prefer allowing a non-opted-in "Save preview / request no-email result" POST only if useful for analytics, but the API must not add the workflow trigger tag. If implementation needs less complexity, it may simply show preview in-browser and only submit when opt-in is checked.

## 4. Consent-gated routing rules

Follow `docs/lead_magnet_opt_in_and_app_strategy.md` exactly.

Opted in (`contact.subscribe === true`):

- Add `newsletter:ai`.
- Set `Consent Basis = lead_magnet_email_opt_in:tech-gc`.
- Add `workflow:tech-gc-launchpad`.
- Add persistent interest/lead magnet tags:
  - `leadmagnet:tech-gc-checklist`
  - `interest:tech-ogc`
  - `whiteford-mountain-west`
- Set `Approval Status = pending`.
- Route to draft/off workflow: `WF | Intake | Whiteford | Tech GC Launchpad | Draft`.

Not opted in (`contact.subscribe !== true`):

- Add `newsletter:not-consented`.
- Set `Consent Basis = no_email_opt_in`.
- Set `Approval Status = no-auto-send`.
- Do not add `workflow:tech-gc-launchpad`.
- Do not add any other workflow trigger tag.
- Do not enroll in any email sequence.

Workflow should additionally check/preserve:

- `newsletter:ai` present.
- `Consent Basis` starts with `lead_magnet_email_opt_in:`.
- No `newsletter:not-consented`.
- No `outreach:do-not-send`.
- No DND/unsubscribe/suppression.
- `Approval Status` is not `no-auto-send`, `suppressed`, or `revise`.

## 5. Questions, answer options, and scoring

Scoring model:

- Overall score is 0-100.
- Higher score means stronger legal operating readiness.
- Ten questions, each 0-10 points.
- Each answer also contributes to category scores and branch indicators.
- Do not call the score a legal-risk conclusion; call it a readiness snapshot.

### Q1. Company stage and next milestone

Prompt:
"Which milestone best describes the next 6-12 months?"

Options:

- Early build / pre-revenue: 4 points; categories: corporate 4, contracts 2, IP 4.
- First paying customers or pilot customers: 6 points; categories: contracts 6, privacy 4, IP 4.
- Enterprise sales / procurement reviews: 7 points; categories: contracts 7, privacy 6, security 5.
- Hiring or contractor scale-up: 6 points; categories: employment 7, IP 5.
- Financing, board/investor diligence, or acquisition discussion: 5 points; categories: corporate 6, M&A 8, IP 6.

Notes:

- This question helps prioritize the report; it should not imply that any stage has a specific legal requirement.

### Q2. Legal operating rhythm

Prompt:
"How is legal work currently managed?"

Options:

- Mostly ad hoc when an issue becomes urgent: 1 point.
- Founder/executive handles most legal issues with templates or old forms: 3 points.
- Outside counsel helps when asked, but no regular operating cadence: 5 points.
- Recurring counsel review tied to product, sales, hiring, and governance milestones: 8 points.
- Internal legal/ops owner plus outside specialist bench: 10 points.

Categories: legal ops, corporate, contracts.

### Q3. Customer contract stack maturity

Prompt:
"Which best describes your customer-facing contract stack?"

Options:

- We reuse customer paper or negotiate from scratch each time: 2 points.
- We have basic terms/order form but key exhibits are inconsistent: 4 points.
- We have standard MSA/order form plus privacy/security addenda where needed: 7 points.
- We have a maintained playbook for negotiation positions, approvals, and fallback language: 10 points.

Categories: contracts, privacy/security, M&A.

### Q4. Vendor, data, and AI tool intake

Prompt:
"How do you review vendors, data tools, and AI systems before use?"

Options:

- No consistent review process: 1 point.
- Informal business review, legal terms rarely checked: 3 points.
- Basic security/privacy review for major vendors: 6 points.
- Legal/security/product review captures data, confidentiality, IP, AI-use, audit, and exit terms: 9 points.
- Same as above plus owner, records, renewal, and escalation workflow: 10 points.

Categories: privacy/security, AI compliance, contracts.
Branch signal: AI Compliance if selected score <= 6 or AI systems are material.

### Q5. IP ownership and invention assignment hygiene

Prompt:
"How quickly could the company prove ownership of core product work?"

Options:

- Not sure / records are scattered: 1 point.
- Founder and employee agreements exist, contractor/vendor coverage uncertain: 4 points.
- Most assignments are in place, but no recent audit: 6 points.
- Founder, employee, contractor, vendor, open-source, and invention records are centrally tracked: 9 points.
- Same as above plus regular product/IP review before disclosure or filing decisions: 10 points.

Categories: IP, employment/contractor, M&A.
Branch signal: AI Patent if AI-assisted R&D, technical differentiators, or invention records are selected in follow-up.

### Q6. Employment and contractor hygiene

Prompt:
"Which statement best fits hiring and contractor documentation?"

Options:

- We are using informal arrangements or old templates: 2 points.
- Basic agreements exist, but roles/IP/confidentiality vary by person: 4 points.
- Standard employee and contractor forms exist for most contributors: 7 points.
- Standard forms plus onboarding/offboarding, invention assignment, confidentiality, and restrictive-covenant review where appropriate: 9 points.
- Same as above plus periodic cleanup before financing, customer audits, or transaction review: 10 points.

Categories: employment/contractor, IP, M&A.

### Q7. Privacy, security, and customer assurance posture

Prompt:
"What can you provide if a customer asks about privacy/security practices?"

Options:

- We answer case by case: 2 points.
- Basic privacy policy or security summary only: 4 points.
- DPA/security exhibit or questionnaire responses exist but need cleanup: 6 points.
- Privacy policy, DPA, security exhibit, subprocessors/vendor map, and response owner exist: 8 points.
- Same as above plus regular update cadence and AI/data-use mapping: 10 points.

Categories: privacy/security, contracts, AI compliance.

### Q8. Corporate records and approval discipline

Prompt:
"How clean are corporate approvals and governance records?"

Options:

- We rely on memory/email threads: 1 point.
- Some formation and equity records exist, but updates may lag: 4 points.
- Major approvals and equity records are mostly current: 7 points.
- Board/manager approvals, equity, option/compensation, financings, and major contracts are centrally tracked: 9 points.
- Same as above plus diligence-ready recordkeeping before financings or transactions: 10 points.

Categories: corporate, M&A.
Branch signal: Founder M&A if next milestone includes financing/acquisition or score <= 6.

### Q9. Product claims, regulated-risk, and AI/data disclosures

Prompt:
"How do you review product, marketing, and AI/data claims before release?"

Options:

- No formal review: 1 point.
- Business/product team reviews claims, legal only for major launches: 4 points.
- Legal/security/product review for higher-risk claims or regulated customers: 7 points.
- Claim review is tied to product release, customer commitments, AI/data usage, and evidence records: 9 points.
- Same as above plus escalation path for high-impact decisions, sensitive data, or regulated use cases: 10 points.

Categories: AI compliance, privacy/security, contracts.
Branch signal: AI Compliance if AI/data claims or high-impact decisions are present.

### Q10. Diligence and continuity readiness

Prompt:
"If a large customer, investor, or buyer requested diligence next month, what would happen?"

Options:

- We would have to reconstruct the story from scratch: 1 point.
- Some folders exist, but ownership and completeness are unclear: 4 points.
- Core records could be gathered with moderate effort: 6 points.
- A data-room-style checklist exists for IP, contracts, privacy/security, employment, corporate, and product records: 8 points.
- Same as above plus assigned owners and regular updates around business milestones: 10 points.

Categories: M&A, corporate, IP, contracts, privacy/security.
Branch signal: Founder M&A if score <= 6 or transaction/financing milestone selected.

## 6. Category model

Recommended categories and normalized scoring:

- Legal operations: Q1, Q2.
- Customer contracts: Q1, Q3, Q4, Q7, Q10.
- IP ownership and innovation records: Q1, Q5, Q6, Q10.
- Employment/contractor hygiene: Q5, Q6.
- Privacy/security and vendor/data posture: Q4, Q7, Q9, Q10.
- AI/data governance: Q4, Q7, Q9.
- Corporate and financing readiness: Q1, Q2, Q8, Q10.
- M&A/diligence readiness: Q1, Q3, Q5, Q6, Q8, Q10.

For each category:

- Normalize to 0-100 by dividing achieved points by available category points.
- Display as a heat map:
  - 0-39: Needs attention before the next business milestone.
  - 40-69: Useful foundation, but cleanup should be sequenced.
  - 70-84: Solid operating base; confirm fit to current milestone.
  - 85-100: Stronger posture; maintain cadence and update records.

## 7. Overall score bands and messaging

0-39: "Legal drag is likely accumulating"

- Preview: "Your answers suggest several legal operating areas may need cleanup before the next business milestone. Start with ownership records, customer/vendor contract posture, and the highest-pressure milestone."
- CTA: "Consider a bounded Tech Company OGC Launchpad review to sequence the first 30 days."

40-64: "Useful foundation, uneven operating rhythm"

- Preview: "You likely have parts of the system in place, but the company may still be relying on ad hoc review when sales, hiring, AI/data, or financing pressure increases."
- CTA: "Use the full checklist to identify which category deserves the first review."

65-84: "Scaling legal system in progress"

- Preview: "The company appears to have a meaningful legal foundation. The next step is to align the cadence to the business event: enterprise sales, hiring, product launch, financing, or diligence."
- CTA: "Use the report to decide whether Tech OGC Launchpad, AI Compliance, AI Patent, or M&A Readiness is the right next conversation."

85-100: "Strong operating base; maintain and tune"

- Preview: "Your answers suggest a stronger legal operating base. The value may be in periodic review, milestone-specific readiness, and specialist work around AI, IP, or transactions."
- CTA: "Use the category map to target specialist review rather than broad cleanup."

## 8. Top cleanup action algorithm

Generate the top 5 cleanup actions for the full report.

Selection logic:

1. Rank category scores ascending.
2. Weight categories tied to the user's next milestone 1.4x.
3. Include at least one action from the lowest-scoring category.
4. Include at least one action tied to the stated next milestone.
5. Include branch-specific action if branch signal is high.
6. Avoid legal conclusions; phrase actions as review/organize/map/update steps.

Action bank:

- Legal operations: "Map a 30-day legal operating cadence tied to sales, hiring, product, and governance decisions."
- Contracts: "Inventory customer paper, order forms, DPAs, security exhibits, and negotiation fallback positions."
- Vendor/data/AI: "Create a vendor and AI tool intake table covering data touched, owner, vendor rights, confidentiality, IP, audit, and exit terms."
- IP ownership: "Run an ownership-record check across founders, employees, contractors, vendors, open-source inputs, and invention records."
- Employment/contractor: "Review contributor agreements and onboarding/offboarding records for assignment, confidentiality, role, and jurisdiction-specific issues."
- Privacy/security: "Align the privacy policy, DPA, security exhibit, subprocessor/vendor map, and customer questionnaire responses."
- Corporate: "Centralize approvals, equity records, major contracts, financing records, and board/manager materials."
- AI compliance: "Map AI use cases by owner, data, decision impact, human review, records, vendor terms, and notices."
- M&A/diligence: "Build a lightweight diligence folder for IP, contracts, corporate, employment, privacy/security, AI/data, and product-claim records."
- Product claims: "Create a product/marketing claim review path for regulated, AI/data, security, performance, and customer commitment claims."

## 9. Report output

Partial in-browser report before opt-in:

- Overall score and score band.
- Category heat map with 3-4 highest-signal categories.
- Top 2 likely cleanup actions.
- Suggested next step: Tech Company OGC Launchpad, with branch note if relevant.
- Disclaimer: educational only, no legal advice, no attorney-client relationship.

Full report after opt-in:

- Overall score and band.
- Full category heat map.
- Top 5 cleanup actions.
- Milestone-specific sequencing:
  - Next 10 days: inventory and owner assignment.
  - Next 30 days: highest-risk document and process cleanup.
  - Next 60-90 days: cadence, specialist review, and readiness packet.
- Branch recommendations:
  - AI Compliance Gameplan Builder if AI/data governance category is low or AI use is business-critical.
  - AI Patent Strategy Scorecard if technical differentiators, AI-assisted R&D, invention records, or disclosure timing are relevant.
  - Founder M&A Readiness Checklist if financing/acquisition, corporate records, diligence, customer assignability, or ownership proof is a pressure point.
- Offer CTA: "Tech Company OGC Launchpad" as a bounded review, not an open-ended generic consultation.
- Safety footer: educational information only; no legal advice; no attorney-client relationship; do not send confidential details through the public form.

## 10. Payload shape for `/api/leads`

Recommended submission payload:

```json
{
  "campaignKey": "tech-gc",
  "sourcePage": "tech-company-legal-health-checklist",
  "sourceChannel": "website",
  "contact": {
    "name": "Jane Founder",
    "email": "jane@example.com",
    "company": "ExampleCo",
    "role": "CEO",
    "subscribe": true
  },
  "techLegalHealth": {
    "overallScore": 62,
    "scoreBand": "Useful foundation, uneven operating rhythm",
    "nextMilestone": "Enterprise sales / procurement reviews",
    "legalOperatingModel": "Outside counsel helps when asked, but no regular operating cadence",
    "categoryScores": {
      "legal_operations": 55,
      "customer_contracts": 48,
      "ip_ownership": 72,
      "employment_contractor": 64,
      "privacy_security": 46,
      "ai_data_governance": 38,
      "corporate_financing": 70,
      "ma_diligence": 58
    },
    "topCleanupActions": [
      "Create a vendor and AI tool intake table covering data touched, owner, vendor rights, confidentiality, IP, audit, and exit terms.",
      "Inventory customer paper, order forms, DPAs, security exhibits, and negotiation fallback positions."
    ],
    "branchSignals": {
      "ai_compliance": true,
      "ai_patent": false,
      "ma_readiness": true
    },
    "answers": {
      "company_stage": "enterprise_sales",
      "legal_operating_rhythm": "outside_counsel_ad_hoc",
      "contract_stack": "basic_inconsistent_exhibits",
      "vendor_ai_intake": "basic_security_privacy_major_vendors",
      "ip_ownership": "most_assignments_no_recent_audit",
      "employment_contractor": "standard_forms_most_contributors",
      "privacy_security": "dpa_security_responses_need_cleanup",
      "corporate_records": "major_approvals_mostly_current",
      "product_claims_ai_data": "legal_security_product_higher_risk",
      "diligence_readiness": "core_records_moderate_effort"
    }
  }
}
```

Implementation note:

- Existing `/api/leads` does not yet type or forward `techLegalHealth`. Add type support and custom field mapping before production. The opt-in logic already follows the required gating pattern for known campaigns.

## 11. HighLevel custom fields

Reuse existing shared fields where present:

- `campaign_key` = `tech-gc`
- `campaign_label` = `Tech GC Launchpad Nurture`
- `authority_pillar` = `Tech Outside General Counsel`
- `source_page` = exact route or landing section.
- `source_channel` = `website` unless otherwise sourced.
- `lead_magnet` = `Colorado Tech Company Legal Health Checklist`
- `consent_basis` = `lead_magnet_email_opt_in:tech-gc` or `no_email_opt_in`
- `approval_status` = `pending` or `no-auto-send`
- `recommended_offer` = `Tech Company OGC Launchpad`
- `role` = submitted role.

Recommended new tech health fields:

- `tech_legal_health_score` number.
- `tech_legal_health_band` single line text or dropdown.
- `tech_legal_health_next_milestone` dropdown.
- `tech_legal_health_top_categories` long text, comma-separated or JSON.
- `tech_legal_health_lowest_category` single line text.
- `tech_legal_health_top_actions` long text.
- `tech_legal_health_branch_signals` long text or multi-select.
- `tech_legal_health_answers_json` long text. Keep non-confidential; do not store secrets or sensitive facts.
- `tech_legal_health_report_version` text, e.g. `v1.0`.
- `tech_legal_health_submitted_at` datetime if available.

Optional normalized category fields if HighLevel reporting warrants it:

- `tech_legal_ops_score`
- `tech_contracts_score`
- `tech_ip_ownership_score`
- `tech_employment_contractor_score`
- `tech_privacy_security_score`
- `tech_ai_data_governance_score`
- `tech_corporate_financing_score`
- `tech_ma_diligence_score`

## 12. HighLevel tags

Base tags:

- `whiteford-mountain-west`
- `brand:whiteford-schellip`
- `leadmagnet:tech-gc-checklist`
- `interest:tech-ogc`

Only if opted in:

- `newsletter:ai`
- `workflow:tech-gc-launchpad`

Only if not opted in:

- `newsletter:not-consented`

Internal/draft workflow tags when used in draft/off HighLevel workflow packets:

- `workflow:draft-only`
- `workflow:manual-start`
- `ops:approval-required`
- `ops:no-auto-send` only for non-sending/internal approval states, not as a trigger for external sends.

Branch signal tags should not be workflow trigger tags unless there is a separate lane-specific opt-in:

- Allowed as internal segmentation only after Jeff approves: `signal:ai-compliance`, `signal:ai-patent`, `signal:ma-readiness`.
- Do not add `workflow:ai-compliance-readiness`, `workflow:ai-patent-strategy`, or `workflow:ma-readiness` from this app unless the user separately opts into that matching lead magnet or Jeff approves an exact compliant route.

## 13. Workflow implementation checklist

Draft/off workflow name:

- `WF | Intake | Whiteford | Tech GC Launchpad | Draft`

Trigger:

- Tag Added: `workflow:tech-gc-launchpad`.

Required trigger filters:

- `newsletter:ai` is present.
- `Consent Basis` starts with `lead_magnet_email_opt_in:tech-gc`.
- `newsletter:not-consented` is absent.
- `outreach:do-not-send` is absent.
- Contact is not DND/unsubscribed/suppressed.
- `Approval Status` is not `no-auto-send`, `suppressed`, or `revise`.
- Source page is `/tech-company-legal-health-checklist`, `/colorado-tech-general-counsel`, or another Jeff-approved Tech GC lead magnet source.
- Offer lane/campaign key is `tech-gc`.

Draft actions:

1. Add `brand:whiteford-schellip`.
2. Add `workflow:draft-only` and `workflow:manual-start` while not activated.
3. Set/confirm `Suggested Offer Lane = tech-gc` if that field exists.
4. Set `Approval Status = pending` for opted-in contacts.
5. Set `Pipeline Next Action = Review legal health checklist output and decide whether Tech Company OGC Launchpad is appropriate.`
6. Create internal review task for Jeff or designated reviewer.
7. Prepare draft opportunity recommendation only; do not create or change a live opportunity unless separately authorized.
8. Queue disabled fulfillment/nurture email drafts only after Jeff approves exact copy.
9. Exit on reply, booking, unsubscribe, suppression, `Approval Status` change, DND, or human review outcome.

Do not activate until:

- Jeff approves the app copy, report copy, custom fields, trigger filters, email drafts, and QA evidence.
- Legal/privacy/ethics review signs off.
- Deliverability footer, unsubscribe, preference handling, sender identity, and physical address are verified.

## 14. Email sequence mapping for opted-in users only

Use the existing 4-email lane standard, with Tech GC-specific content. Sequence remains disabled/draft until approved.

Email 1: immediate fulfillment

- Subject: "Your technology-company legal health checklist"
- Purpose: deliver/report link first; explain the score is an educational readiness snapshot.

Email 2: Day 2 interpretation

- Subject angle: "How to read your legal health score"
- Purpose: show how milestone pressure changes legal priorities.

Email 3: Day 5 highest-priority risk

- Subject angle: "Where legal drag usually appears first in tech companies"
- Purpose: teach one category based on score band or common gaps: contracts, ownership, AI/data, privacy/security, or employment/contractor hygiene.

Email 4: Day 9 bounded CTA

- Subject angle: "Turn the checklist into a 30-day legal operating plan"
- Purpose: invite a bounded Tech Company OGC Launchpad review, subject to Jeff approval and fit.

Optional later Day 16:

- Add only after deliverability and engagement data justify it.

## 15. QA test cases

API preview mode tests should verify returned `campaignRouting`, `tags`, and `customFields` without live HighLevel mutation when credentials are absent or test mode is used.

### Test A: opted-in Tech GC submission

Input:

- `campaignKey: "tech-gc"`
- `contact.subscribe: true`
- `sourcePage: "tech-company-legal-health-checklist"`

Expected:

- Tags include `workflow:tech-gc-launchpad`.
- Tags include `newsletter:ai`.
- Tags do not include `newsletter:not-consented`.
- `consent_basis = lead_magnet_email_opt_in:tech-gc`.
- `approval_status = pending`.
- `campaignRouting.triggerTag = workflow:tech-gc-launchpad`.
- `campaignRouting.emailSequence` contains Tech GC emails.

### Test B: non-opted-in Tech GC submission

Input:

- `campaignKey: "tech-gc"`
- `contact.subscribe: false` or missing.

Expected:

- Tags do not include `workflow:tech-gc-launchpad`.
- Tags include `newsletter:not-consented`.
- Tags do not include `newsletter:ai`.
- `consent_basis = no_email_opt_in`.
- `approval_status = no-auto-send`.
- `campaignRouting.triggerTag = null`.
- `campaignRouting.emailSequence = []`.

### Test C: branch signal does not trigger other workflows

Input:

- Tech GC app answer produces `branchSignals.ai_compliance = true` and `branchSignals.ma_readiness = true`.
- `contact.subscribe: true` for Tech GC only.

Expected:

- Tags include `workflow:tech-gc-launchpad` only.
- Tags do not include `workflow:ai-compliance-readiness`, `workflow:ai-patent-strategy`, or `workflow:ma-readiness`.
- Branch signals stored in non-trigger custom field or internal notes only.

### Test D: suppression protection

Input/state:

- Contact has DND, unsubscribe, `outreach:do-not-send`, `newsletter:not-consented`, or `Approval Status = no-auto-send`.

Expected:

- Workflow entry is blocked or exits.
- No email action executes.
- Internal review task may be created only if it does not create external outreach.

### Test E: source page mismatch

Input:

- Tag added manually but source page is unrelated.

Expected:

- Workflow should not continue unless a human approves the source or manually starts an internal-only review.

### Test F: confidential information guardrail

Input:

- User attempts to paste sensitive details into open text fields.

Expected:

- App UI should discourage confidential details.
- No required free-text field should ask for names of counterparties, disputes, financial details, claim charts, employee issues, or private transaction facts.

## 16. Legal, privacy, and ethics checklist

- Use educational language only.
- Add footer near diagnostic and report gate: "Do not submit confidential information. Using this tool does not create an attorney-client relationship."
- Avoid guarantees about compliance, enforceability, patentability, fundraising, valuation, deal speed, customer acceptance, or risk elimination.
- Avoid implying Whiteford/Schell IP availability or representation until conflict checks and engagement terms are complete.
- Keep opt-in checkbox unchecked by default.
- Make opt-in language specific: "I agree to receive the Tech Company Legal Health Checklist report and related educational emails from Whiteford/Schell IP. I can unsubscribe at any time."
- Keep SMS out of scope.
- Verify privacy policy link, unsubscribe/preference handling, physical address footer, sender identity, and HighLevel suppression checks before activation.

## 17. Consistency notes for the four-app strategy

The Tech Company Legal Health Checklist is the broad entry app. It can identify the right next specialist lane, but it must not silently enroll users into the other workflows.

AI Compliance Gameplan Builder refinement:

- Keep question count to 7-9.
- Add clearer maturity heat map: use cases, consequential decision exposure, vendor/data posture, human review, notices/records, governance owner, testing/audit.
- Score output: AI governance maturity, 10-day fixes, and 30/60/90-day roadmap.
- Workflow trigger remains only `workflow:ai-compliance-readiness` after AI Compliance opt-in.

Founder M&A Readiness app refinement:

- Keep questions focused on non-confidential diligence categories: timing, corporate records, IP ownership, customer/vendor assignability, employment/contractor cleanup, AI/data/privacy, disputes/concentration as high-level non-specific inputs.
- Score output: buyer diligence risk map and 60-day cleanup plan.
- Workflow trigger remains only `workflow:ma-readiness` after M&A opt-in.

AI Patent Strategy Scorecard refinement:

- Keep specialized focus: product stage, human contribution records, prototype/notebook records, AI vendor terms, technical differentiator, disclosure timing, trade secret/patent posture.
- Score output: patent strategy readiness and documentation/ownership gap map.
- Workflow trigger remains only `workflow:ai-patent-strategy` after AI Patent opt-in.

Cross-app rule:

- One app may recommend another app, but no app may apply another app's workflow trigger tag without explicit lane-specific opt-in or Jeff's exact current approval.

## 18. Implementation checklist

Frontend:

- Create Tech Legal Health Checklist component.
- Use non-confidential select/radio answers; minimize free text.
- Calculate overall and category scores client-side.
- Show partial preview before opt-in.
- Add unchecked opt-in checkbox with explicit language.
- Submit to `/api/leads` with `campaignKey: "tech-gc"` only when opt-in is checked, unless a no-email preview submission path is deliberately implemented.
- Add route or anchor CTA from `/colorado-tech-general-counsel`.
- Add educational/no-attorney-client disclaimer near form and report.

API:

- Extend `LeadPayload` to include `techLegalHealth`.
- Map tech health fields into HighLevel custom fields.
- Preserve existing opt-in gating logic.
- Ensure non-opted-in requests never add `workflow:tech-gc-launchpad`.
- Ensure branch signals do not add other workflow trigger tags.
- Add preview/test coverage for opted-in and not-opted-in payloads.

HighLevel:

- Create/confirm recommended custom fields.
- Confirm tags exist or prepare create list.
- Configure `WF | Intake | Whiteford | Tech GC Launchpad | Draft` in draft/off mode only.
- Add strict trigger filters listed above.
- Add internal review task action only.
- Keep email sequence disabled until Jeff approves exact copy.
- Do not create live opportunity mutations unless separately authorized.

QA and approval:

- Run API preview tests for opt-in and non-opt-in paths.
- Verify no HighLevel live mutation in local/test mode.
- Verify no external email/SMS/social send.
- Verify HighLevel workflow is draft/off.
- Verify legal/ethics/privacy checklist.
- Prepare Jeff approval packet before any activation or external delivery.

## 19. Open decisions for Jeff

1. Route choice: create `/tech-company-legal-health-checklist` or embed at `/colorado-tech-general-counsel#legal-health-checklist` first?
2. Non-opted-in analytics: should the app POST non-consented submissions for internal analytics, or keep non-opted-in users entirely browser-local?
3. Report fulfillment: should the first version send a static report email, generate a personalized HTML/email report, or simply show full report after opt-in and log the lead?
4. HighLevel fields: should category scores be individual fields for reporting, or stored as JSON/long text until usage volume justifies more fields?
5. Branch signals: should branch recommendations be stored only in notes/custom fields, or should approved non-trigger segmentation tags such as `signal:ai-compliance` be created?
