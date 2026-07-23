# HighLevel Campaign Implementation Plan — Whiteford Schell IP

Generated: 2026-05-05 22:49:55 MDT
Task: `t_c44c11f6`
HighLevel location: `tm68WWMrcAa3TqQbEAMa` (Whiteford Schell IP only)

Safe operating status: tags and contact custom fields were created/verified only. No contacts were messaged, no emails were sent, and no live workflows were activated.

## Strategy basis

This setup applies the business-development corpus as synthesis, not quotation: each funnel starts by fulfilling the promised lead magnet, then uses short follow-up emails to (1) diagnose a costly/problematic blind spot, (2) show why timing matters, and (3) route the lead to a specific next-step offer. For legal/ethics safety, the sequence avoids outcome guarantees, avoids urgent pressure language, and frames the scorecards/checklists as educational starting points rather than legal advice.

## HighLevel assets configured by API

### Tags

| Tag | HighLevel id | Purpose |
| --- | --- | --- |
| `whiteford-mountain-west` | `UgFtJxRzDJuuXzwv0O7d` | Location/project marker applied to every lead. |
| `newsletter:ai` | `DWMSyc3Cw4jH1JuzGF23` | Opt-in / AI newsletter interest. |
| `newsletter:not-consented` | `PuS7pqcwDAgU9CzjjgCD` | Explicit non-consent marker from lead endpoint. |
| `workflow:ai-patent-strategy` | `WZfRXwccEjnHflOUL9Nt` | Trigger tag for AI Patent Strategy Scorecard nurture. |
| `leadmagnet:ai-patent-scorecard` | `q7OYTozjWdpqPbY6xsvi` | Lead magnet source tag. |
| `interest:ai-patent-law` | `isgN68rHai067UsUbosa` | Interest tag for patent-law segmentation. |
| `workflow:ai-compliance-readiness` | `aLH8Z1rmQSfjFIRHagGy` | Trigger tag for AI Compliance Gameplan Builder nurture. |
| `leadmagnet:ai-compliance-gameplan` | `aeMI5TVvDleFPBfx2aEI` | Lead magnet source tag. |
| `interest:ai-compliance` | `SZ1VWuu7A8kAVpTDc1F0` | Interest tag for AI compliance segmentation. |
| `workflow:tech-gc-launchpad` | `JUG30WwG9bNmdUzT2Tn9` | Trigger tag for Tech GC Launchpad nurture. |
| `leadmagnet:tech-gc-checklist` | `J5hcj9jHgrmkTlfAz9AX` | Lead magnet source tag. |
| `interest:tech-ogc` | `U3IETGpVAAUsCA2GAdX4` | Interest tag for tech OGC segmentation. |
| `workflow:ma-readiness` | `vBjCsu6UEeaEOmvu0vhc` | Trigger tag for M&A Readiness nurture. |
| `leadmagnet:ma-readiness-checklist` | `Y6gtxKo1wQ9kWYcPejda` | Lead magnet source tag. |
| `interest:ma-readiness` | `vAasc4oplv4L2ITjcKHR` | Interest tag for M&A readiness segmentation. |

### Contact custom fields

| Field name | App/API field key | HighLevel field key | HighLevel id | Type |
| --- | --- | --- | --- | --- |
| Campaign Key | `campaign_key` | `contact.campaign_key` | `Qz7tTt2gHbiIKEuOKf9Q` | TEXT |
| Campaign Label | `campaign_label` | `contact.campaign_label` | `ktyUD9eDp9A3v5WVNzvu` | TEXT |
| Authority Pillar | `authority_pillar` | `contact.authority_pillar` | `UQ78yAPlH4UAIZ8juHR0` | TEXT |
| Source Page | `source_page` | `contact.source_page` | `INEppd3YGJBDLfHerE9a` | TEXT |
| Source Channel | `source_channel` | `contact.source_channel` | `qBbuCGIureBlrA5sHmRf` | TEXT |
| YouTube Topic | `youtube_topic` | `contact.youtube_topic` | `ZrgezIZJxwAryrX5vWcy` | TEXT |
| Lead Magnet | `lead_magnet` | `contact.lead_magnet` | `e3SJHNsUNdW67ouLWFYQ` | TEXT |
| Recommended Offer | `recommended_offer` | `contact.recommended_offer` | `edel6dKsWHAFFUlB2mBM` | TEXT |
| AI Risk Score | `ai_risk_score` | `contact.ai_risk_score` | `9gjvKtASWn49eo5mLeuB` | NUMERICAL |
| AI Readiness Score | `ai_readiness_score` | `contact.ai_readiness_score` | `meQ6hnsgWOYZzBcMmm2E` | NUMERICAL |
| AI Score Band | `ai_score_band` | `contact.ai_score_band` | `kWP4zmf9VwL5andDQfEk` | TEXT |
| AI Recommended Offer | `ai_recommended_offer` | `contact.ai_recommended_offer` | `n356Iz93Y6U0ByWFFpGn` | TEXT |
| AI Use Cases | `ai_use_cases` | `contact.ai_use_cases` | `UlFRPwpAbUzvKQZeN0HA` | LARGE_TEXT |
| AI Readiness Checks | `ai_readiness_checks` | `contact.ai_readiness_checks` | `TVTNLJnRkTMoWJiXIa6Q` | LARGE_TEXT |
| AI Patent Score | `ai_patent_score` | `contact.ai_patent_score` | `L78KuFhyFafq5PSp5MjR` | NUMERICAL |
| AI Patent Stage | `ai_patent_stage` | `contact.ai_patent_stage` | `7pf3mgT5ttvFjBjEpg5m` | TEXT |
| AI Patent Score Band | `ai_patent_score_band` | `contact.ai_patent_score_band` | `xh6AfuK3kI9YCbkL3Wko` | TEXT |
| AI Patent Checks | `ai_patent_checks` | `contact.ai_patent_checks` | `0mv2zSrrPiwTw3Eufuwk` | LARGE_TEXT |
| Role | `role` | `contact.role` | `bDDyFlZKHlwIULA2OqgJ` | TEXT |

Verification artifacts:

- Dry run before changes: `docs/highlevel_campaign_setup_dryrun.json`
- Apply result: `docs/highlevel_campaign_setup_results.json`
- Post-apply verification: `docs/highlevel_campaign_setup_verify.json`
- Reusable safe setup script: `scripts/ghl_campaign_setup.py`

## Campaign lanes and manual workflow/email setup

HighLevel public API access was sufficient for tags and contact custom fields. Workflow/email automation creation is not included in the safe script because the public API does not provide a reliable, documented way here to create draft/manual-start workflow email steps without risking activation. Build these four workflows manually in HighLevel and keep them disabled until Jeff approves QA.

### 1. AI Patent Strategy Scorecard

HighLevel workflow name: `WF - Whiteford - AI Patent Strategy Scorecard - Draft`
Trigger: Contact Tag Added = `workflow:ai-patent-strategy`
Lead magnet/source tags: `leadmagnet:ai-patent-scorecard`, `interest:ai-patent-law`, `newsletter:ai`
Recommended offer: AI Patent Strategy Sprint
Landing page: `/ai-patent-strategy-scorecard`
Manual workflow status: draft/off until approved.

Email sequence draft:

1. Subject: Your AI patent strategy scorecard
   Preview: What to document before AI-assisted R&D becomes a patent problem.
   Body: The scorecard is designed to help founders identify where human contribution, invention records, ownership, claim strategy, and product roadmap need to be tightened before patent filing.

2. Subject: The mistake founders make with AI-assisted invention
   Preview: The AI tool is not the inventor. The human contribution still matters.
   Body: For AI-assisted inventions, the practical question is not whether AI was used. It is whether the human contribution to conception is documented clearly enough to support inventorship and patent strategy.

3. Subject: Can you patent AI software?
   Preview: Eligibility and claim strategy need to be designed early.
   Body: AI and software inventions can raise subject-matter eligibility questions. Strong strategy usually starts with the technical improvement, data flow, model role, system architecture, and business use case.

4. Subject: Build the legal moat before the demo gets copied
   Preview: Patents, trade secrets, contracts, and product roadmap work together.
   Body: The strongest AI IP strategies rarely depend on one filing alone. They align patent claims, trade secret controls, contractor assignments, customer terms, and the product roadmap.

CTA for each email: Ask Jeff to review the scorecard and decide whether an AI Patent Strategy Sprint is appropriate. Include legal disclaimer/footer.

### 2. AI Compliance Gameplan Builder

HighLevel workflow name: `WF - Whiteford - AI Compliance Gameplan Builder - Draft`
Trigger: Contact Tag Added = `workflow:ai-compliance-readiness`
Lead magnet/source tags: `leadmagnet:ai-compliance-gameplan`, `interest:ai-compliance`, `newsletter:ai`
Recommended offer: AI Compliance Readiness Sprint
Landing page: `/ai-compliance-gameplan`
Manual workflow status: draft/off until approved.

Email sequence draft:

1. Subject: Your AI compliance gameplan
   Preview: A practical next-step map for AI governance and legal readiness.
   Body: Your scorecard is a starting point, not a legal conclusion. The useful next step is to turn the risk areas into an inventory, owner map, vendor review, and 30/60/90-day implementation plan.

2. Subject: Vendor risk is often the first AI legal risk
   Preview: AI legal readiness often starts with the contract stack.
   Body: Before a policy solves anything, a company needs to know which AI vendors touch data, what rights the vendor has, and where confidentiality, IP ownership, indemnity, audit, and security terms live.

3. Subject: Colorado AI readiness without overreacting
   Preview: How to treat unsettled law as a readiness workstream.
   Body: Colorado AI and ADMT rules are moving. That does not mean companies should freeze. It means readiness should focus on use-case inventory, consequential decision exposure, human review, notices, records, and governance ownership.

4. Subject: Turn AI use into a legal operating system
   Preview: The goal is repeatable governance, not one-off panic.
   Body: A durable AI legal system includes intake, approval, vendor review, documentation, escalation, training, and board-ready reporting. That is the workstream behind an AI Compliance Readiness Sprint.

CTA for each email: Invite a readiness discussion; avoid stating the lead is compliant/non-compliant.

### 3. Tech Company Legal Health Checklist

HighLevel workflow name: `WF - Whiteford - Tech GC Launchpad - Draft`
Trigger: Contact Tag Added = `workflow:tech-gc-launchpad`
Lead magnet/source tags: `leadmagnet:tech-gc-checklist`, `interest:tech-ogc`, `newsletter:ai`
Recommended offer: Tech Company OGC Launchpad
Landing page: `/colorado-tech-general-counsel`
Manual workflow status: draft/off until approved.

Email sequence draft:

1. Subject: Your technology-company legal health checklist
   Preview: A practical way to see where the company is carrying legal drag.
   Body: The checklist is designed to sort legal work by operational risk: contracts, hiring, IP ownership, privacy, financing readiness, and AI governance.

2. Subject: From patent strategy to company legal infrastructure
   Preview: What changes when a technology company starts to scale.
   Body: Patent protection is only one part of the legal system a scaling technology company needs. Contracts, employment, data, financing, governance, and commercial risk become part of the same operating layer.

3. Subject: What to fix before hiring, fundraising, or selling
   Preview: Legal readiness should match the next business event.
   Body: The right legal priorities depend on the next milestone: hiring, enterprise customers, financing, acquisition talks, or product launch. A legal operating review turns that into a sequence.

CTA for each email: Invite a legal operating review / OGC Launchpad discussion.

### 4. Founder M&A Readiness Checklist

HighLevel workflow name: `WF - Whiteford - Founder M&A Readiness - Draft`
Trigger: Contact Tag Added = `workflow:ma-readiness`
Lead magnet/source tags: `leadmagnet:ma-readiness-checklist`, `interest:ma-readiness`, `newsletter:ai`
Recommended offer: Founder M&A Readiness Review
Landing page: `/colorado-startup-ma-lawyer`
Manual workflow status: draft/off until approved.

Email sequence draft:

1. Subject: Your founder M&A readiness checklist
   Preview: Start cleaning up the issues a buyer will ask about later.
   Body: The checklist focuses on the non-financial diligence issues that can slow deals: IP ownership, assignments, customer contracts, employee matters, AI/data/privacy, and corporate records.

2. Subject: Three non-financial risks that slow tech deals
   Preview: The diligence problems that show up before price becomes the issue.
   Body: Tech deals often slow down around IP ownership, customer/vendor contracts, and data or AI product risk. The earlier those are mapped, the better the founder can control the process.

3. Subject: What a buyer will ask before you are ready
   Preview: A little cleanup before diligence can change the conversation.
   Body: A buyer will ask for cap table support, invention assignments, key contracts, employee documents, product risk, disputes, and compliance posture. A readiness review identifies what needs attention before the request list arrives.

CTA for each email: Invite a Founder M&A Readiness Review discussion.

## Smart lists to create manually

Create these HighLevel smart lists after the first test contacts exist:

1. `Whiteford - AI Patent Leads`: tag contains `workflow:ai-patent-strategy` OR `interest:ai-patent-law`.
2. `Whiteford - AI Compliance Leads`: tag contains `workflow:ai-compliance-readiness` OR `interest:ai-compliance`.
3. `Whiteford - Tech GC Leads`: tag contains `workflow:tech-gc-launchpad` OR `interest:tech-ogc`.
4. `Whiteford - M&A Readiness Leads`: tag contains `workflow:ma-readiness` OR `interest:ma-readiness`.
5. `Whiteford - AI Newsletter Consented`: tag contains `newsletter:ai` AND does not contain `newsletter:not-consented`.
6. `Whiteford - No Newsletter Consent`: tag contains `newsletter:not-consented`.

## Calendar routing setup

Manual step: in each workflow email, point the CTA button to Jeff's approved consultation/calendar URL. If using a HighLevel calendar trigger, add it only after Jeff confirms the calendar link and default meeting type. Do not auto-book or auto-message contacts without approval.

## QA checklist before activation

- Confirm all four workflows exist in HighLevel with the names above and remain off/draft.
- Confirm each workflow uses only a Contact Tag Added trigger with the exact `workflow:*` tag.
- Confirm no workflow is configured with SMS, voicemail drops, Facebook messages, or auto-send outside the approved email steps.
- Confirm each email includes firm footer/unsubscribe and legal disclaimer language: educational information only, not legal advice, no attorney-client relationship unless separately agreed.
- Submit one internal test lead per campaign through the landing page/app endpoint and verify the contact receives the correct tags and custom field values.
- Verify `newsletter:not-consented` contacts are excluded from marketing/newsletter broadcasts.
- Verify Jeff's calendar link or routing field is correct before enabling CTA buttons.
- Have Jeff approve the final copy, sequence timing, and workflow activation.

## Risks / open items

- The reusable setup script initially hit Cloudflare 1010 when using Python's default user agent; this is fixed by setting an explicit user agent in `scripts/ghl_campaign_setup.py`.
- The app currently sends custom fields by bare key (for example `campaign_key`). HighLevel verified field keys are `contact.*` (for example `contact.campaign_key`). If lead upserts reject custom fields, update `src/app/api/leads/route.ts` to send `fieldKey` or `id` format expected by the LeadConnector contacts/upsert endpoint.
- Workflow/email/smart-list creation remains manual because a safe draft workflow API path was not used in this task.
- Activation is a separate approval step. Do not activate workflows or send campaign emails until Jeff approves.
