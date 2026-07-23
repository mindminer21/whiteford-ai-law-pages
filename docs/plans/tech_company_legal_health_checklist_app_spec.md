# Tech Company Legal Health Checklist App v1 Product Spec

Task: `t_a86c707c`
Status: internal specification only; do not publish, send, enroll, activate workflows, launch ads, post to social, or mutate live CRM from this document.
Source of truth: `docs/lead_magnet_opt_in_and_app_strategy.md`
Related prior draft: `docs/tech_company_legal_health_checklist_app_spec.md`
Primary lane: Tech GC / Tech Company OGC Launchpad
HighLevel trigger tag: `workflow:tech-gc-launchpad` only after affirmative Tech GC opt-in

## 1. Product goal

Build a lightweight advisory web app that helps a Colorado/Mountain West technology company identify its likely legal operating gaps before a business milestone, while preserving a consent-based follow-up funnel.

The lead magnet should solve one narrow problem completely: “What are the top legal operating cleanup priorities for my tech company before the next milestone?” It should not be a generic consultation request, a static PDF, or a bait-and-switch. The app should give immediate diagnostic value before the email gate and deliver the promised result first after opt-in.

Business-development principle applied:

- A high-performing lead magnet is a complete solution to a narrow problem, not a broad brochure.
- The user pays with attention and answers first; the opt-in is earned by useful partial value.
- The follow-up funnel should be consent-based, educational, and bounded around the promised problem.

## 2. Target audience and promise

Primary audience:

- Founder/CEO, COO, CFO, product/engineering executive, operations lead, or in-house legal/ops owner at a Colorado or Mountain West technology, SaaS, AI, software, hardware, data, or advanced-services company.

Likely triggers:

- Enterprise customer review or procurement push.
- New product, AI/data, or platform launch.
- Hiring or contractor-heavy buildout.
- Fundraising, board/investor request, partnership, or acquisition discussion.
- Existing legal work feels fragmented, reactive, or template-driven.

Public-facing promise draft:

“Get a practical legal health snapshot for a growing technology company, including your likely top cleanup priorities before the next business milestone.”

Internal positioning:

- Primary recommended offer: `Tech Company OGC Launchpad`.
- Secondary branch recommendations may point to AI Compliance, AI Patent, or Founder M&A Readiness apps, but this app must not silently enroll users into those other workflow lanes.

## 3. Recommended route and component scope

Preferred route for v1:

- Embed on `/colorado-tech-general-counsel#lead-magnet` using existing Tech GC page traffic and authority context.

Optional later standalone route:

- `/tech-company-legal-health-checklist`

Known current implementation anchor:

- `src/components/tech-gc-legal-health-checklist.tsx`
- `src/components/landing.tsx` imports the component for the Tech GC landing page.
- `src/lib/campaigns.ts` already defines `campaignKey: "tech-gc"`, lead magnet label, tags, and trigger tag.

## 4. UX flow

1. Hero / intro panel
   - Explain who the checklist is for.
   - State that it uses non-confidential inputs only.
   - State the result is educational and not legal advice.

2. Diagnostic questions
   - Ask 8-10 short, non-confidential questions.
   - Use radio/select answers, not open-text legal fact collection.
   - Avoid names of counterparties, disputes, employee issues, claim charts, financial details, or private transaction details.

3. Instant pre-gate preview
   - Show overall readiness score and score band.
   - Show 3-5 category scores or a compact heat map.
   - Show top 2 cleanup priorities.
   - Show likely next step: Tech Company OGC Launchpad.
   - If relevant, show branch note such as “AI/data governance may deserve a separate AI Compliance review,” but do not apply other workflow tags.

4. Full report gate
   - Collect name, business email, company, and role.
   - Opt-in checkbox must be unchecked by default.
   - The opt-in language must be specific to receiving the checklist/report and related educational emails from Whiteford/Schell IP.
   - Submission may be disabled unless the opt-in checkbox is checked. If a later non-consented analytics path is added, it must not trigger any workflow and must set `Consent Basis = no_email_opt_in`.

5. Confirmation
   - If opted in: confirm the checklist/report request and educational email path.
   - If in preview/test mode: say routing is preview-only.
   - If not opted in and a no-email path exists: show in-browser results only and confirm no email sequence will be sent.

## 5. Non-confidential v1 questions and scoring

Scoring model:

- Overall readiness score: 0-100.
- Ten questions, each scored 0, 5, or 10 for implementation simplicity.
- Higher score means stronger legal operating readiness, not lower legal risk as a legal conclusion.
- Each answer contributes to one or more category scores.
- Category scores normalize to 0-100.

Answer scale for each question:

- 0 = Not yet / not sure.
- 5 = Partly in place, but not systematic.
- 10 = Documented, current, and repeatable.

### Q1. Next business milestone

Prompt: “Which milestone is creating the most pressure in the next 6-12 months?”

Options:

- Early build or first customers.
- Enterprise sales or procurement review.
- Hiring or contractor scale-up.
- Financing, board/investor diligence, strategic partnership, or acquisition discussion.
- AI/data product expansion.

Scoring: This question is primarily a weighting input. Assign 5 baseline points and use it to weight matching categories 1.25x when ranking cleanup actions.

Categories: legal operations, contracts, employment/contractor, privacy/security, AI/data, corporate/M&A.

### Q2. Legal operating rhythm

Prompt: “How is legal work currently managed?”

Options:

- Mostly ad hoc when an issue becomes urgent: 0.
- Outside counsel or templates help, but no recurring operating cadence: 5.
- Recurring review is tied to product, sales, hiring, governance, and data milestones: 10.

Categories: legal operations, contracts, corporate.

### Q3. Customer and vendor contract stack

Prompt: “How current and consistent are your customer, vendor, NDA, and partner templates?”

Options:

- We reuse old forms or customer/vendor paper case by case: 0.
- We have core forms, but terms, exhibits, and fallback positions vary: 5.
- We maintain templates, approval thresholds, playbooks, and renewal/obligation ownership: 10.

Categories: contracts, privacy/security, M&A.

### Q4. IP ownership and invention assignment

Prompt: “How quickly could the company prove ownership of core product work?”

Options:

- Not sure or records are scattered: 0.
- Founder/employee agreements exist, but contractor/vendor/advisor coverage is uncertain: 5.
- Founder, employee, contractor, vendor, open-source, and invention records are centrally tracked: 10.

Categories: IP ownership, employment/contractor, M&A.

### Q5. Employment and contractor hygiene

Prompt: “How current are hiring, contractor, confidentiality, assignment, and offboarding records?”

Options:

- Informal arrangements or old templates: 0.
- Standard forms exist for most contributors, but variation is not tracked: 5.
- Current forms plus onboarding/offboarding, role/IP/confidentiality review, and escalation path: 10.

Categories: employment/contractor, IP ownership, corporate.

### Q6. Privacy, security, and customer assurance

Prompt: “What can you provide if a customer asks about privacy and security practices?”

Options:

- Case-by-case answers: 0.
- Basic privacy policy, security summary, or questionnaire responses exist but need cleanup: 5.
- Privacy policy, DPA/security exhibit, subprocessor/vendor map, owner, and update cadence exist: 10.

Categories: privacy/security, contracts, AI/data.

### Q7. Vendor, data, and AI tool intake

Prompt: “How do you review vendors, data tools, and AI systems before use?”

Options:

- No consistent review process: 0.
- Basic business/security review for major tools: 5.
- Legal/security/product review captures data, confidentiality, IP, AI use, audit, exit terms, records, and owner: 10.

Categories: AI/data, privacy/security, contracts.
Branch signal: AI Compliance if score is 0 or 5 and AI/data use is a milestone pressure.

### Q8. Product claims and AI/data disclosures

Prompt: “How are product, marketing, security, performance, and AI/data claims reviewed before release?”

Options:

- No formal review: 0.
- Business/product review happens, legal only for major launches: 5.
- Review is tied to releases, customer commitments, AI/data usage, evidence records, and escalation triggers: 10.

Categories: AI/data, privacy/security, contracts.
Branch signal: AI Compliance if score is 0 or 5.

### Q9. Corporate records and approval discipline

Prompt: “How clean are board/manager approvals, equity records, financing records, and major contract approvals?”

Options:

- We rely on memory, email threads, or scattered files: 0.
- Major records are mostly current but not diligence-ready: 5.
- Approvals, equity, financings, compensation, and major contracts are centrally tracked and updated: 10.

Categories: corporate, M&A.
Branch signal: Founder M&A if score is 0 or 5 and financing/acquisition is the milestone.

### Q10. Diligence and continuity readiness

Prompt: “If a large customer, investor, or buyer requested diligence next month, what would happen?”

Options:

- We would reconstruct the story from scratch: 0.
- Core folders exist but ownership or completeness is unclear: 5.
- A data-room-style checklist exists for IP, contracts, privacy/security, employment, corporate, AI/data, and product records: 10.

Categories: M&A, corporate, IP ownership, contracts, privacy/security.
Branch signal: Founder M&A if score is 0 or 5.

## 6. Category model

Recommended category scores:

- Legal operations.
- Customer and vendor contracts.
- IP ownership and innovation records.
- Employment and contractor hygiene.
- Privacy/security and customer assurance.
- AI/data governance.
- Corporate and financing readiness.
- M&A/diligence readiness.

Heat-map labels:

- 0-39: Needs attention before the next milestone.
- 40-64: Useful foundation, but cleanup should be sequenced.
- 65-84: Scaling legal system in progress.
- 85-100: Stronger operating base; maintain and tune.

Overall score bands:

- 0-39: “Legal drag is likely accumulating.”
- 40-64: “Useful foundation, uneven operating rhythm.”
- 65-84: “Scaling legal system in progress.”
- 85-100: “Strong operating base; maintain and tune.”

Do not present the score as legal advice, compliance status, enforceability, patentability, risk elimination, valuation impact, or deal-readiness guarantee.

## 7. Partial pre-gate value

The pre-gate preview must show enough value that the user feels the promised problem has been meaningfully addressed before contact collection.

Minimum preview:

- Overall score and band.
- Category heat map for at least the 5 highest-signal categories.
- Top 2 cleanup actions, selected from the lowest category scores and weighted by next milestone.
- Suggested bounded next step: Tech Company OGC Launchpad.
- Educational disclaimer.

Action bank for preview/full report:

- Legal operations: Map a 30-day legal operating cadence tied to sales, hiring, product, and governance decisions.
- Contracts: Inventory customer paper, order forms, DPAs, security exhibits, approval thresholds, and fallback positions.
- Vendor/data/AI: Create a vendor and AI tool intake table covering data touched, owner, vendor rights, confidentiality, IP, audit, records, and exit terms.
- IP ownership: Check ownership records across founders, employees, contractors, vendors, open-source inputs, and invention records.
- Employment/contractor: Review contributor agreements and onboarding/offboarding records for assignment, confidentiality, role, and jurisdiction-specific issues.
- Privacy/security: Align the privacy policy, DPA, security exhibit, subprocessor/vendor map, and customer questionnaire responses.
- Corporate: Centralize approvals, equity records, major contracts, financing records, and board/manager materials.
- AI compliance: Map AI use cases by owner, data, decision impact, human review, records, vendor terms, and notices.
- M&A/diligence: Build a lightweight diligence folder for IP, contracts, corporate, employment, privacy/security, AI/data, and product-claim records.
- Product claims: Create a release review path for regulated, AI/data, security, performance, and customer commitment claims.

## 8. Full report after unchecked opt-in gate

Gate rule:

- The opt-in checkbox must be unchecked by default.
- The user must affirmatively check the box before any Tech GC email workflow trigger tag is added.
- Opt-in copy must mention Whiteford/Schell IP, the checklist/report, related educational emails, and unsubscribe availability.
- SMS is out of scope.

Recommended opt-in copy:

“I agree to receive the Tech Company Legal Health Checklist results and related educational emails from Whiteford/Schell IP. I can unsubscribe at any time. I understand this form is not for confidential information and does not create an attorney-client relationship.”

Full report contents:

- Overall score and band.
- Full category heat map.
- Top 5 cleanup actions.
- 10/30/60-90 day sequencing:
  - Next 10 days: inventory key records, assign owners, identify the lowest-scoring category.
  - Next 30 days: clean up highest-pressure documents/processes tied to the next milestone.
  - Next 60-90 days: install operating cadence and evaluate specialist follow-on lane if warranted.
- Branch recommendations:
  - AI Compliance Gameplan Builder if AI/data governance is low or AI/data expansion is the milestone.
  - AI Patent Strategy Scorecard if IP ownership, invention records, AI-assisted R&D, or disclosure timing is relevant.
  - Founder M&A Readiness Checklist if financing, acquisition, diligence, corporate records, customer assignability, or ownership proof is a pressure point.
- Offer CTA: Tech Company OGC Launchpad as a bounded review, not a generic consultation.
- Safety footer: educational information only; no legal advice; no attorney-client relationship; do not send confidential details through a public form.

## 9. HighLevel payload and field mapping

Recommended `/api/leads` payload:

```json
{
  "campaignKey": "tech-gc",
  "sourcePage": "colorado-tech-general-counsel#lead-magnet",
  "sourceChannel": "website",
  "contact": {
    "name": "Jane Founder",
    "email": "jane@example.com",
    "company": "ExampleCo",
    "role": "CEO",
    "subscribe": true
  },
  "techLegalHealth": {
    "reportVersion": "v1.0",
    "overallScore": 62,
    "scoreBand": "Useful foundation, uneven operating rhythm",
    "nextMilestone": "Enterprise sales or procurement review",
    "categoryScores": {
      "legal_operations": 55,
      "contracts": 48,
      "ip_ownership": 70,
      "employment_contractor": 64,
      "privacy_security": 46,
      "ai_data_governance": 38,
      "corporate_financing": 70,
      "ma_diligence": 58
    },
    "topCleanupActions": [
      "Create a vendor and AI tool intake table covering data touched, owner, vendor rights, confidentiality, IP, audit, records, and exit terms.",
      "Inventory customer paper, order forms, DPAs, security exhibits, approval thresholds, and fallback positions."
    ],
    "branchSignals": {
      "ai_compliance": true,
      "ai_patent": false,
      "ma_readiness": true
    },
    "answers": {
      "next_milestone": "enterprise_sales",
      "legal_operating_rhythm": 5,
      "contract_stack": 5,
      "ip_ownership": 10,
      "employment_contractor": 5,
      "privacy_security": 5,
      "vendor_data_ai_intake": 0,
      "product_claims_ai_data": 5,
      "corporate_records": 10,
      "diligence_readiness": 5
    }
  }
}
```

Shared fields to reuse where present:

- `campaign_key` = `tech-gc`
- `campaign_label` = `Tech GC Launchpad Nurture`
- `authority_pillar` = `Tech Outside General Counsel`
- `source_page` = route or section.
- `source_channel` = `website` unless another approved source is used.
- `lead_magnet` = `Colorado Tech Company Legal Health Checklist`
- `consent_basis` = `lead_magnet_email_opt_in:tech-gc` or `no_email_opt_in`
- `approval_status` = `pending` for opted in, `no-auto-send` for non-opted.
- `recommended_offer` = `Tech Company OGC Launchpad`
- `role` = submitted role.

Recommended Tech Legal Health custom fields:

- `tech_legal_health_score` number.
- `tech_legal_health_band` text/dropdown.
- `tech_legal_health_next_milestone` dropdown.
- `tech_legal_health_lowest_category` text.
- `tech_legal_health_top_categories` long text or JSON.
- `tech_legal_health_top_actions` long text.
- `tech_legal_health_branch_signals` long text or multi-select.
- `tech_legal_health_answers_json` long text. Keep non-confidential.
- `tech_legal_health_report_version` text, e.g. `v1.0`.
- `tech_legal_health_submitted_at` datetime if available.

Optional normalized reporting fields:

- `tech_legal_ops_score`
- `tech_contracts_score`
- `tech_ip_ownership_score`
- `tech_employment_contractor_score`
- `tech_privacy_security_score`
- `tech_ai_data_governance_score`
- `tech_corporate_financing_score`
- `tech_ma_diligence_score`

## 10. HighLevel tag and workflow mapping

Base tags for all valid submissions, if API supports non-consented capture:

- `whiteford-mountain-west`
- `brand:whiteford-schellip`
- `leadmagnet:tech-gc-checklist`
- `interest:tech-ogc`

Only if `contact.subscribe === true`:

- `newsletter:ai`
- `workflow:tech-gc-launchpad`

Only if `contact.subscribe !== true` and a submission is captured:

- `newsletter:not-consented`

Internal/draft tags only where approved:

- `workflow:draft-only`
- `workflow:manual-start`
- `ops:approval-required`
- `ops:no-auto-send`

Branch signal tags:

- Permitted only as internal segmentation after approval: `signal:ai-compliance`, `signal:ai-patent`, `signal:ma-readiness`.
- Do not add `workflow:ai-compliance-readiness`, `workflow:ai-patent-strategy`, or `workflow:ma-readiness` from this app unless the user separately opts into that matching app/lead magnet or Jeff gives exact current approval.

Required workflow trigger rule:

- Trigger: Tag added = `workflow:tech-gc-launchpad`.
- Continue only if:
  - `newsletter:ai` present.
  - `Consent Basis` starts with `lead_magnet_email_opt_in:tech-gc`.
  - `newsletter:not-consented` absent.
  - `outreach:do-not-send` absent.
  - No DND/unsubscribe/suppression.
  - `Approval Status` is not `no-auto-send`, `suppressed`, or `revise`.
  - Source page is `/colorado-tech-general-counsel`, `/colorado-tech-general-counsel#lead-magnet`, `/tech-company-legal-health-checklist`, or another Jeff-approved Tech GC source.

## 11. Legal, ethics, and privacy caveats

Required in-app caveats:

- Educational information only.
- No legal advice.
- No attorney-client relationship is formed by using the tool, viewing a result, submitting a form, or receiving a report.
- Do not submit confidential information.
- Submission does not mean Whiteford/Schell IP can represent the user; conflict checks and engagement terms would be required.
- No promise of compliance, enforceability, patentability, valuation effect, transaction success, customer acceptance, financing success, speed, or risk elimination.
- SMS remains off unless separately approved with documented SMS consent and opt-out language.
- Emails must have truthful sender/subject information, physical mailing address/footer, working unsubscribe/preference handling, suppression checks, and attorney/ethics review before activation.

Privacy/data minimization requirements:

- No required open-text field for legal facts.
- Do not ask for adverse-party names, exact disputes, claim charts, financial details, private transaction counterparties, employee medical/disciplinary details, sensitive personal data, customer names, or secrets.
- Store only categorical answers and report outputs needed for the promised report and consent-based follow-up.
- If storing answers JSON in HighLevel, label it as non-confidential and keep it compact.

## 12. Frontend implementation acceptance criteria

A frontend-eng implementation is acceptable when all criteria below pass in local/test mode.

### UX and content

- App appears on the Tech GC page at `/colorado-tech-general-counsel#lead-magnet` or another Jeff-approved route.
- It contains 8-10 non-confidential diagnostic questions using radio/select controls.
- There are no required free-text fields for legal facts.
- It displays an overall score and score band immediately as answers change.
- It displays category scores/heat map.
- It displays the top 2 cleanup actions before the opt-in gate.
- It recommends Tech Company OGC Launchpad as the primary next step.
- Branch recommendations are framed as optional next diagnostic apps, not automatic enrollment.
- Educational/no-attorney-client/no-confidential-information disclaimer appears near the questions and near the gate.

### Consent gate

- The opt-in checkbox is unchecked by default.
- The primary submission button cannot trigger `workflow:tech-gc-launchpad` unless the checkbox is checked.
- Opt-in copy is specific to the checklist/report and related educational emails from Whiteford/Schell IP.
- If a non-opted-in capture path exists, its API response contains no workflow trigger tag and sets `Consent Basis = no_email_opt_in` and `Approval Status = no-auto-send`.
- SMS opt-in is absent.

### API payload and routing

- Submits `campaignKey: "tech-gc"`.
- Submits `sourcePage` matching the live route/section.
- Submits contact fields: name, email, company, role, subscribe.
- Submits score band, overall score, category scores, answers, top actions, branch signals, and report version either under `techLegalHealth` or a documented equivalent mapping.
- Opted-in preview/API response includes `newsletter:ai` and `workflow:tech-gc-launchpad`.
- Non-opted or unchecked path never includes `workflow:tech-gc-launchpad`, `newsletter:ai`, or any other workflow trigger tag.
- Branch signals never add `workflow:ai-compliance-readiness`, `workflow:ai-patent-strategy`, or `workflow:ma-readiness`.

### Accessibility and quality

- Questions are keyboard-operable.
- Buttons/inputs have accessible labels or visible labels.
- Score/heat map is understandable without color alone.
- Mobile layout remains usable.
- Form errors are visible and plain language.
- User cannot submit while request is pending.
- Print/save PDF preview does not expose confidential-data prompts.

### Test cases

Implement or manually verify these cases:

1. Opted-in Tech GC submission
   - Input: `campaignKey = "tech-gc"`, `contact.subscribe = true`.
   - Expected: `workflow:tech-gc-launchpad`, `newsletter:ai`, `consent_basis = lead_magnet_email_opt_in:tech-gc`, `approval_status = pending`.

2. Unchecked opt-in
   - Input: `contact.subscribe = false` or missing.
   - Expected: no workflow trigger tag; if captured, `newsletter:not-consented`, `consent_basis = no_email_opt_in`, `approval_status = no-auto-send`.

3. Branch signal safety
   - Input: answers produce AI Compliance and M&A branch signals.
   - Expected: only Tech GC workflow tag is possible after Tech GC opt-in; other workflow tags absent.

4. Suppression protection
   - Input/state: DND, unsubscribe, suppression, `outreach:do-not-send`, `newsletter:not-consented`, or `Approval Status = no-auto-send`.
   - Expected: no email action executes.

5. Confidential information guardrail
   - User has no required place to provide counterparties, disputes, secrets, exact financials, claim charts, or sensitive employment details.

## 13. Launch gates and non-goals

Non-goals for this task:

- No HighLevel live workflow activation.
- No public publishing decision.
- No email sending.
- No SMS.
- No LinkedIn/social action.
- No attorney-client intake or legal advice.
- No live CRM mutation from this spec.

Required before launch/activation:

- Jeff approves route, app copy, report copy, opt-in language, and CTA language.
- Attorney/legal-marketing review approves disclaimers, claims, and no-advice framing.
- Privacy review approves fields, retention, report access, and consent language.
- HighLevel custom fields/tags are confirmed.
- Draft/off workflow filters are QA’d with evidence.
- Sender identity, unsubscribe/preference handling, physical address footer, suppression/DND checks, and deliverability basics are verified.
- API preview tests prove opt-in and non-opt-in routing behavior.

## 14. Open decisions for Jeff

1. Route: keep embedded on `/colorado-tech-general-counsel#lead-magnet` for v1, or create `/tech-company-legal-health-checklist` now?
2. Non-opted-in analytics: keep unchecked users browser-local, or capture a no-email submission with `no_email_opt_in` for analytics?
3. Full report fulfillment: show on-screen after opt-in, email a generated report link, or send a static checklist plus scored summary?
4. HighLevel fields: store category scores as JSON/long text for v1, or create individual normalized score fields now?
5. Branch signals: store only in report/custom fields, or create approved internal segmentation tags such as `signal:ai-compliance`?

## 15. Frontend handoff summary

Implement the v1 app as a non-confidential interactive checklist that gives a useful score preview before opt-in, gates the full report behind a business-email form with an unchecked opt-in, and routes only affirmative opt-ins into `workflow:tech-gc-launchpad`. Use the consent-gated `/api/leads` pattern from `docs/lead_magnet_opt_in_and_app_strategy.md`; branch recommendations are advisory only and must not trigger other workflows.
