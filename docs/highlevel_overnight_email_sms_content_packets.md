# HighLevel Overnight Email/SMS Content Packets

Generated: 2026-05-06
Safety status: draft/off copy only. Do not send, schedule, publish, enroll, or activate without Jeff/attorney review.

## Global disclaimers and merge-field assumptions

Use these copy blocks as drafting packets for HighLevel workflow steps. The 16 email campaign assets listed below already exist as draft HighLevel email campaign assets and were re-verified in `docs/highlevel_overnight_email_assets_verify.json`.

Required footer/disclaimer before activation:

> This is educational information only, is not legal advice, and does not create an attorney-client relationship. Any engagement would require a separate written agreement. You are receiving this because you requested a Whiteford/Schell IP resource or otherwise gave consent to receive follow-up. Unsubscribe/preference link required before sending.

Suggested merge fields, subject to HighLevel field names:

- `{{contact.first_name}}`
- `{{contact.company_name}}`
- `{{contact.source_page}}`
- `{{contact.suggested_offer_lane}}`
- `{{contact.pipeline_next_action}}`

SMS status: packet-only. Do not enable SMS unless SMS consent, DND status, 10DLC/sender settings, STOP handling, and attorney review are confirmed.

---

## Lane 1: AI Patent Strategy Scorecard

Tag: `workflow:ai-patent-strategy`
Route: `/ai-patent-strategy-scorecard`
Offer: AI Patent Strategy Sprint
Existing draft workflow observed: `AI Patent Strategy Campaign`, id `424fd134-b34b-494f-a337-2aba0dec3060`, status `draft`.
Recommended final workflow name: `WF | Intake | Whiteford | AI Patent Strategy Scorecard | Draft`.

### Draft email assets already in HighLevel

1. `69fae707b403f2826bb84ed3` — `WF | Email | AI Patent Strategy Scorecard | 01 Deliver Scorecard | Draft`
   - Subject: Your AI patent strategy scorecard
   - Timing: Day 0 after approved fulfillment.
   - Purpose: deliver the scorecard and clarify non-advice limits.
2. `69fae709e13643c94a7a1e30` — `WF | Email | AI Patent Strategy Scorecard | 02 AI Invention Records | Draft`
   - Subject: The mistake founders make with AI-assisted invention
   - Timing: Day 2.
   - Purpose: educate on human contribution and invention documentation.
3. `69fae70ae2f2acabb6cea700` — `WF | Email | AI Patent Strategy Scorecard | 03 Legal Moat | Draft`
   - Subject: Build the legal moat before the demo gets copied
   - Timing: Day 5.
   - Purpose: frame patents, trade secrets, contracts, and roadmap as a system.
4. `69fae70ca3d63272ae7a8646` — `WF | Email | AI Patent Strategy Scorecard | 04 Sprint CTA | Draft`
   - Subject: When an AI patent strategy sprint is useful
   - Timing: Day 9.
   - Purpose: bounded CTA for a human-reviewed AI Patent Strategy Sprint.

### Optional Email 5 packet: educational close-loop

Subject: A practical way to decide what belongs in an AI IP review
Preview: A short checklist for separating invention capture, ownership, disclosure, and trade-secret issues.

Body:

Hi {{contact.first_name}},

One useful way to approach AI-assisted invention is to separate four questions:

1. What did the human team contribute?
2. Who owns the code, model work, data rights, and invention records?
3. What has already been disclosed or will be disclosed soon?
4. Which parts should be considered for patents, trade secrets, contracts, or operational controls?

The scorecard is meant to organize those questions so a strategy conversation is concrete rather than abstract.

If you want Jeff to review whether a bounded AI Patent Strategy Sprint makes sense, the next step should be attorney-reviewed and based on the facts you are comfortable sharing.

Educational only; not legal advice; no attorney-client relationship is created by this message.

### SMS packet only — do not enable

- Fulfillment reminder: `Whiteford/Schell IP: your AI patent scorecard resource is ready for review. This is educational only, not legal advice. Reply STOP to opt out.`
- Appointment reminder: `Reminder: AI Patent Strategy Sprint review with Whiteford/Schell IP at {{appointment.start_time}}. Bring invention records, disclosure timeline, and ownership questions. Reply STOP to opt out.`
- No-show/rebook: `Whiteford/Schell IP: sorry we missed you for the AI patent strategy review. If you want to reschedule, use {{appointment.reschedule_link}}. Reply STOP to opt out.`

---

## Lane 2: AI Compliance / AI Law Gameplan

Tag: `workflow:ai-compliance-readiness`
Routes: `/ai-compliance-gameplan`, `/colorado-ai-compliance-lawyer`
Offer: AI Compliance Readiness Sprint
Recommended workflow name: `WF | Intake | Whiteford | AI Compliance Gameplan | Draft`.

### Draft email assets already in HighLevel

1. `69fae70d092f9b30795116ca` — `WF | Email | AI Compliance Gameplan | 01 Deliver Gameplan | Draft`
   - Subject: Your AI compliance gameplan
   - Timing: Day 0.
   - Purpose: deliver gameplan and establish use-case inventory/vendor map frame.
2. `69fae70fb9da8d23821dfc28` — `WF | Email | AI Compliance Gameplan | 02 Vendor Risk | Draft`
   - Subject: Vendor risk is often the first AI legal risk
   - Timing: Day 2.
   - Purpose: contracts, data rights, vendor review.
3. `69fae710e2f2ac4753cea729` — `WF | Email | AI Compliance Gameplan | 03 Colorado AI Readiness | Draft`
   - Subject: Colorado AI readiness without overreacting
   - Timing: Day 5.
   - Purpose: readiness workstream without legal conclusions.
4. `69fae7112cae7d5fdf5fba02` — `WF | Email | AI Compliance Gameplan | 04 Sprint CTA | Draft`
   - Subject: Turn AI use into a legal operating system
   - Timing: Day 9.
   - Purpose: bounded AI Compliance Readiness Sprint CTA.

### Optional Email 5 packet: governance close-loop

Subject: The AI compliance question leadership usually needs answered first
Preview: Who is using AI, for what, with which data, and under whose approval?

Body:

Hi {{contact.first_name}},

For many companies, the first practical AI legal-readiness question is not “Which law applies?” It is:

Who is using AI, for what workflow, with what data, through which vendor, and under whose approval?

Once that inventory exists, legal review can be sequenced around vendor terms, privacy/data use, human review, notices, documentation, and governance ownership.

If your team wants to turn the gameplan into a 30/60/90-day implementation roadmap, Jeff can review whether an AI Compliance Readiness Sprint is the right next step.

Educational only; not legal advice; no attorney-client relationship is created by this message.

### SMS packet only — do not enable

- Fulfillment reminder: `Whiteford/Schell IP: your AI compliance gameplan resource is ready. Educational only, not legal advice. Reply STOP to opt out.`
- Appointment reminder: `Reminder: AI Compliance Readiness review with Whiteford/Schell IP at {{appointment.start_time}}. Helpful prep: AI use cases, vendors, data flows. Reply STOP to opt out.`
- No-show/rebook: `Whiteford/Schell IP: sorry we missed you for the AI compliance review. Reschedule here: {{appointment.reschedule_link}}. Reply STOP to opt out.`

---

## Lane 3: Tech Outside General Counsel / Fractional GC

Tag: `workflow:tech-gc-launchpad`
Route: `/colorado-tech-general-counsel`
Offer: Tech GC Launchpad
Recommended workflow name: `WF | Intake | Whiteford | Tech GC Launchpad | Draft`.

### Draft email assets already in HighLevel

1. `69fae713e1364318517a1e97` — `WF | Email | Tech GC Launchpad | 01 Deliver Checklist | Draft`
   - Subject: Your technology-company legal health checklist
   - Timing: Day 0.
2. `69fae714e2f2ac3f34cea769` — `WF | Email | Tech GC Launchpad | 02 Legal Infrastructure | Draft`
   - Subject: From patent strategy to company legal infrastructure
   - Timing: Day 2.
3. `69fae715092f9ba066511737` — `WF | Email | Tech GC Launchpad | 03 Milestone Readiness | Draft`
   - Subject: What to fix before hiring, fundraising, or selling
   - Timing: Day 5.
4. `69fae716b403f2fcddb84f89` — `WF | Email | Tech GC Launchpad | 04 Launchpad CTA | Draft`
   - Subject: When an outside GC launchpad is useful
   - Timing: Day 9.

### Optional Email 5 packet: legal operating system close-loop

Subject: Legal work should match the next business milestone
Preview: A practical way to sequence contracts, IP, privacy, hiring, financing, and AI issues.

Body:

Hi {{contact.first_name}},

The most useful outside-GC conversations usually start with the next company milestone: enterprise customer, financing, hiring, partnership, product launch, acquisition conversation, or board decision.

From there, the legal work can be sequenced into what must be fixed now, what should be monitored, what can wait, and what needs specialist review.

If a bounded Tech GC Launchpad review would help your team map the next 30/60/90 days, Jeff can decide whether that is a fit after attorney review.

Educational only; not legal advice; no attorney-client relationship is created by this message.

### SMS packet only — do not enable

- Fulfillment reminder: `Whiteford/Schell IP: your technology-company legal health checklist is ready. Educational only, not legal advice. Reply STOP to opt out.`
- Appointment reminder: `Reminder: Tech GC Launchpad review with Whiteford/Schell IP at {{appointment.start_time}}. Helpful prep: current legal bottlenecks and next milestone. Reply STOP to opt out.`
- No-show/rebook: `Whiteford/Schell IP: sorry we missed you for the Tech GC review. Reschedule here: {{appointment.reschedule_link}}. Reply STOP to opt out.`

---

## Lane 4: Founder M&A Readiness

Tag: `workflow:ma-readiness`
Route: `/colorado-startup-ma-lawyer`
Offer: Founder M&A Readiness Review
Recommended workflow name: `WF | Intake | Whiteford | Founder M&A Readiness | Draft`.

### Draft email assets already in HighLevel

1. `69fae7173501ab2683ed1367` — `WF | Email | Founder M&A Readiness | 01 Deliver Checklist | Draft`
   - Subject: Your founder M&A readiness checklist
   - Timing: Day 0.
2. `69fae7185f61ae5420c49d1e` — `WF | Email | Founder M&A Readiness | 02 Deal Friction | Draft`
   - Subject: Three non-financial risks that slow tech deals
   - Timing: Day 2.
3. `69fae71ae13643c7e47a1ee6` — `WF | Email | Founder M&A Readiness | 03 Buyer Questions | Draft`
   - Subject: What a buyer will ask before you are ready
   - Timing: Day 5.
4. `69fae71b614ce9e828db4b4e` — `WF | Email | Founder M&A Readiness | 04 Review CTA | Draft`
   - Subject: When a founder M&A readiness review is useful
   - Timing: Day 9.

### Optional Email 5 packet: diligence close-loop

Subject: A founder-friendly way to prepare before diligence starts
Preview: Map cleanup work before a buyer or investor controls the request list.

Body:

Hi {{contact.first_name}},

M&A readiness does not mean predicting a transaction or promising an outcome. It means reducing preventable diligence friction before someone else controls the timeline.

The usual cleanup map covers IP ownership, invention assignments, customer/vendor contracts, data and AI product risk, employee/contractor documentation, corporate records, and open disputes.

If you want to turn the checklist into a practical cleanup roadmap, Jeff can review whether a Founder M&A Readiness Review is appropriate.

Educational only; not legal advice; no attorney-client relationship is created by this message.

### SMS packet only — do not enable

- Fulfillment reminder: `Whiteford/Schell IP: your Founder M&A Readiness checklist is ready. Educational only, not legal advice. Reply STOP to opt out.`
- Appointment reminder: `Reminder: Founder M&A Readiness review with Whiteford/Schell IP at {{appointment.start_time}}. Helpful prep: IP assignments, key contracts, data/AI risk list. Reply STOP to opt out.`
- No-show/rebook: `Whiteford/Schell IP: sorry we missed you for the M&A readiness review. Reschedule here: {{appointment.reschedule_link}}. Reply STOP to opt out.`

---

## Supporting workflow copy packets

### Appointment confirmation + reminders

Workflow: existing draft `2. Appointment Confirmation + Reminders`, id `0a1749da-af77-4d51-ba2e-8a1027ca66b5`.

Email subject: Confirming your Whiteford/Schell IP strategy review

Body:

Hi {{contact.first_name}},

This confirms your scheduled Whiteford/Schell IP review at {{appointment.start_time}}.

To keep the conversation useful, please bring the facts behind the resource you completed: source page, score/checklist answers, current business milestone, and any documents you are comfortable discussing at a high level.

This appointment is not a legal engagement by itself and does not create an attorney-client relationship. If representation is appropriate, it would require a separate written agreement.

SMS packet: `Reminder: Whiteford/Schell IP review at {{appointment.start_time}}. This appointment does not create an attorney-client relationship. Reply STOP to opt out.`

### No-show / rebook

Workflow: existing draft `3. Appt No Show`, id `dcf4b664-4d02-4465-bf88-1be1a1e6ea34`.

Email subject: Should we find another time?

Body:

Hi {{contact.first_name}},

Sorry we missed each other for the scheduled review. If the issue is still timely, you can use the reschedule link below or reply with a better window.

If priorities have changed, no action is needed.

Reschedule: {{appointment.reschedule_link}}

Educational only; not legal advice; no attorney-client relationship is created by this message.

### Long-term authority nurture

Workflow: existing draft `5. Long-Term Nurture`, id `28cfdf24-11ec-47b6-9830-3aa3bc827cf0`.

Cadence: monthly or biweekly only after consent review. Keep educational and non-promissory.

Content pillars:

1. AI patent/invention documentation.
2. AI governance/vendor/data readiness.
3. Tech-company legal operating systems.
4. Founder M&A/diligence readiness.
5. Colorado/AI legal developments with caveats.

CTA: “If this issue is on your roadmap, Jeff can review whether a bounded strategy sprint/review is appropriate.”

### Stale lead re-engagement

Workflow: existing draft `6. Stale Leads`, id `39b5c831-10d4-4005-89f5-64307403158f`.

Email subject: Should we close the loop on this?

Body:

Hi {{contact.first_name}},

I am closing the loop on the {{contact.suggested_offer_lane}} resource you requested. If the issue is no longer active, no response is needed.

If it is still on your roadmap, the useful next step is to confirm the current facts and decide whether an attorney-reviewed strategy conversation makes sense.

Educational only; not legal advice; no attorney-client relationship is created by this message.

### Manual attorney-review queue / internal task workflow

Internal task title:

`Attorney review required: {{contact.full_name}} — {{contact.suggested_offer_lane}}`

Task description:

- Source route: `{{contact.source_page}}`
- Lane: `{{contact.suggested_offer_lane}}`
- Recommended offer: `{{contact.recommended_offer}}`
- Consent basis: `{{contact.consent_basis}}`
- Approval status: `{{contact.approval_status}}`
- Score/checklist answers: insert form answers.
- Proposed next action: `{{contact.pipeline_next_action}}`
- Safety note: do not send external message, enroll workflow, or update live opportunity until approved.

### Pipeline hygiene / opportunity stage updates

Pipeline: `Whiteford Schell IP Pipeline` (`Tbx4tA6wHv5lTwZPSHyZ`).

Recommended mappings:

- New lead intake: `c1e14510-2d11-41ee-b51a-b71025aed5e1` — New Lead.
- Agent/persona research: `fd569cf4-979b-43b8-bd0f-78e807e80ff1` — Agent Targeting.
- Internal review packet ready: `fbd84fbe-ed49-4246-b644-a557cf5a508c` — Targeting Packet Ready.
- Jeff approved outreach draft: `9d794930-a9a3-4efd-bb4e-9d203f9c5919` — Approved for Agent-Assisted Outreach.
- Human initial contact: `2da549c4-9123-4118-b997-6d72cc7f4ece` — Initial Contact.
- Qualification: `5eb0cbff-ea87-440a-90e1-edfffae7bf29` — Qualification.
- Meeting scheduled: `5ee7decd-7521-46dd-901b-a6bd1874ee94` — Prospect Meeting Scheduled.
- Whiteford/Jeff legal review: `f38c7a47-a100-4621-9800-f80aa962282c` — Jeff / Whiteford Review.
- Sent/contacted audit only: `4fa62be4-b950-4f34-96ba-649f137ffc12` — Contacted / Sent.
- Do not contact: `143ee9d4-74e3-4c5c-ab6d-23e154372b1b` — Suppressed / Do Not Contact.

All stage changes should create internal notes/tasks before any external action.
