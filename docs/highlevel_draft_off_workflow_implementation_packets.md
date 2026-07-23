# HighLevel Draft/Off Workflow Implementation Packets

Generated: 2026-05-06
Task: `t_443ad476`
Location: Whiteford Schell IP (`tm68WWMrcAa3TqQbEAMa`)
Pipeline: Whiteford Schell IP Pipeline (`Tbx4tA6wHv5lTwZPSHyZ`)
Mode: Approval-ready build packets only. Build internal draft/off specs and dashboard syncs are auto-approved; activation, external messages, enrollment, live social publishing, and live CRM mutation are not approved by this packet.

## 1. Operating Decision

Create the workflow library below in HighLevel as draft/off workflows with manual-start or draft-only safety settings where available. The workflows are designed to organize lead-magnet intake, internal review, opportunity hygiene, and social draft approval without sending messages, publishing, enrolling contacts, or changing live records until Jeff gives a specific approval for the relevant external action.

Reference inputs used:

- `docs/highlevel_ops_research_synthesis.md`
- `docs/highlevel_ops_execution_blueprint.md`
- Local business-development RAG search for lead funnel/follow-up principles
- QMD export fallback search over the business-development text corpus because the qmd CLI currently fails with a Node/better-sqlite3 module-version mismatch

Business-development synthesis applied: each workflow should fulfill a narrow lead-magnet promise, preserve trust immediately, diagnose the prospect's underlying business/legal risk, and route toward a bounded service conversation. Legal-marketing safety overrides urgency, scarcity, automated claims, and automated external outreach.

## 2. Global Build Standards

### 2.1 Naming Convention

Use this pattern:

`WF | <Function> | Whiteford | <Offer/System> | Draft`

Examples:

- `WF | Intake | Whiteford | AI Compliance Gameplan | Draft`
- `WF | Pipeline | Whiteford | Stage Change Internal Review | Draft`
- `WF | Social | Whiteford | LinkedIn Draft Approval | Draft`

### 2.2 Global Safety Tags

Apply these tags in every intake workflow before any downstream logic:

- `brand:whiteford-schellip`
- `workflow:draft-only`
- `workflow:manual-start`
- `ops:approval-required`
- `ops:no-auto-send`

Use these additional tags when applicable:

- `workflow:ai-compliance-readiness`
- `workflow:ai-patent-strategy`
- `workflow:tech-gc-launchpad`
- `workflow:ma-readiness`
- `enrichment:needs-research`
- `enrichment:public-source`
- `outreach:personalized-draft-ready`
- `outreach:do-not-send`
- `social:linkedin-draft`
- `social:attorney-review-required`
- `newsletter:daily-ai-authority`

### 2.3 Global Custom Fields Used

- Decision Maker Role: `contact.decision_maker_role`
- Decision Maker Priority: `contact.decision_maker_priority`
- LinkedIn Profile URL: `contact.linkedin_profile_url`
- Enrichment Source URL: `contact.enrichment_source_url`
- Enrichment Confidence: `contact.enrichment_confidence`
- Consent Basis: `contact.consent_basis`
- Approval Status: `contact.approval_status`
- Last Human Review At: `contact.last_human_review_at`
- Outreach Hypothesis: `contact.outreach_hypothesis`
- Personalized Content Angle: `contact.personalized_content_angle`
- LinkedIn Draft Status: `contact.linkedin_draft_status`
- Suggested Offer Lane: `contact.suggested_offer_lane`
- Pipeline Next Action: `contact.pipeline_next_action`

### 2.4 Global Workflow Settings

Configure each workflow as follows unless a packet below says otherwise:

- Status: Draft/off. Do not publish or activate.
- Re-entry: Off by default unless the workflow is explicitly an internal status-review workflow.
- Stop on response: On for any workflow that ever contains an external email/SMS action after future approval.
- Time window: Not applicable for internal task-only workflows. If future external email is approved, restrict sends to normal business hours in the relevant recipient timezone when known.
- Unsubscribe/suppression: Any email-capable workflow must exit on unsubscribe, DND/suppression, `outreach:do-not-send`, or `Approval Status = suppressed/no-auto-send`.
- Opportunity handling: Use Find Opportunity before Create/Update Opportunity. Do not allow duplicate opportunities unless Jeff approves multiple legal-matter opportunities for one contact/company.
- External actions: Build as disabled draft steps, comments, or placeholder tasks; do not enable sends or publishing.
- Opt-in rule: external email nurture is allowed only for contacts who opted into the specific lead magnet. The matching `workflow:*` trigger tag should be applied only after opt-in. Non-consented contacts may receive lead-magnet/interest metadata and internal review tasks, but must not receive a workflow trigger tag or external nurture sequence.

### 2.5 Common Approval Gates

Gate A — Build Gate, auto-approved by task: create draft/off workflow specs and internal dashboard sync documentation.

Gate B — QA Gate, requires builder verification before Jeff review: test contact run-through, trigger filters, suppression exits, duplicate-opportunity handling, execution logs, and rollback notes.

Gate C — Jeff Activation Gate, requires explicit approval: turning any workflow from draft/off to active.

Gate D — External Action Gate, requires explicit approval per action class: sending email/SMS/DM, enrolling contacts, publishing/scheduling social posts, or creating personalized LinkedIn/profile actions.

Gate E — Live CRM Mutation Gate, requires explicit approval unless separately authorized: importing contacts, updating live contacts/opportunities, changing opportunity stages, syncing enrichment to HighLevel records.

## 3. Workflow Packet: AI Compliance Gameplan

### Workflow Name

`WF | Intake | Whiteford | AI Compliance Gameplan | Draft`

### Business Purpose

Fulfill the AI Compliance Gameplan lead magnet, classify readiness risk, route promising companies toward an internal review for an AI Compliance Readiness Sprint, and keep all external follow-up approval-only.

### Trigger

Primary trigger options, built but kept draft/off:

1. Form Submitted or Survey Submitted.
2. Tag Added: `workflow:ai-compliance-readiness`.

### Trigger Filters

Use all applicable filters:

- Location equals Whiteford Schell IP (`tm68WWMrcAa3TqQbEAMa`).
- Source page contains `/ai-compliance-gameplan` or `/colorado-ai-compliance-lawyer`.
- Submitted form/survey name equals the AI Compliance Gameplan form/survey once final object name exists.
- Contact does not have `outreach:do-not-send`.
- Contact Approval Status is not `suppressed` and not `no-auto-send`.

### Actions

1. Add tags:
   - `brand:whiteford-schellip`
   - `workflow:draft-only`
   - `workflow:manual-start`
   - `ops:approval-required`
   - `ops:no-auto-send`
   - `workflow:ai-compliance-readiness`
2. Set fields:
   - Suggested Offer Lane = `ai-compliance`
   - Approval Status = `pending`
   - Pipeline Next Action = `Review AI readiness score; decide whether to invite AI Compliance Readiness Sprint consult.`
3. If consent exists and is documented, set Consent Basis to the captured value; otherwise set Consent Basis = `no consent` or `unknown pending review`.
4. Find Opportunity in Whiteford Schell IP Pipeline for the contact/company.
5. Draft-only opportunity logic:
   - If no opportunity exists, create an internal review task recommending a new opportunity titled `AI Compliance Gameplan - <Company/Contact>` in stage `New Lead`.
   - If an opportunity exists, create an internal task recommending metadata update rather than mutating the record automatically.
6. Create internal task for Jeff/highlevel-ops:
   - Title: `Review AI Compliance Gameplan lead: {{contact.name}}`
   - Due: same business day where possible.
   - Description includes source page, readiness score/answers if available, consent basis, suggested next action, and approval status.
7. Internal notification only:
   - Send in-app/internal notification or dashboard item to Jeff/highlevel-ops if available.
   - No email/SMS to the prospect.
8. Draft disabled email steps for future approval only:
   - Email 1: deliver promised gameplan result and explain next step.
   - Email 2: diagnose governance blind spots.
   - Email 3: implementation-readiness checklist.
   - Email 4: invite to discuss AI Compliance Readiness Sprint.
   - Email 5: close the loop with educational resource and preference link.

### Exit Conditions

- Contact replies or books a meeting.
- Contact unsubscribes or DND/suppression applies.
- Contact has `newsletter:not-consented` or lacks `newsletter:ai`.
- Contact gets `outreach:do-not-send`.
- Approval Status becomes `suppressed`, `no-auto-send`, or `revise`.
- Opportunity stage changes out of intake/review by a human.

### QA Tests

- Submit a test contact from `/ai-compliance-gameplan`; confirm trigger filters match only this lane.
- Add tag `workflow:ai-compliance-readiness` to a test contact; confirm workflow would enter draft/off only after activation.
- Test a suppressed contact; confirm immediate exit/no task except suppression log.
- Test a contact with an existing pipeline opportunity; confirm Find Opportunity prevents duplicate creation.
- Confirm no external send step is enabled.
- Confirm task description includes consent basis, source page, and approval gate.

### Approval Gates

- Jeff must approve workflow activation.
- Jeff must approve any first external email and any sequence enrollment.
- Jeff must approve live opportunity create/update until a separate safe sync script is approved.

## 4. Workflow Packet: AI Patent Strategy Scorecard

### Workflow Name

`WF | Intake | Whiteford | AI Patent Strategy Scorecard | Draft`

### Business Purpose

Fulfill the AI Patent Strategy Scorecard, surface patentability/inventorship/documentation issues for human review, and route high-fit technical founders/operators toward an AI Patent Strategy Sprint conversation.

### Trigger

1. Form Submitted or Survey Submitted.
2. Tag Added: `workflow:ai-patent-strategy`.

### Trigger Filters

- Source page contains `/ai-patent-strategy-scorecard`.
- Submitted form/survey name equals AI Patent Strategy Scorecard once final object name exists.
- Contact does not have suppression/DND/no-auto-send markers.
- Contact has a valid consent basis before any external follow-up is drafted for send approval.
- Contact has `newsletter:ai`, does not have `newsletter:not-consented`, and `Consent Basis` starts with `lead_magnet_email_opt_in:`.

### Actions

1. Add tags:
   - `brand:whiteford-schellip`
   - `workflow:draft-only`
   - `workflow:manual-start`
   - `ops:approval-required`
   - `ops:no-auto-send`
   - `workflow:ai-patent-strategy`
2. Set fields:
   - Suggested Offer Lane = `ai-patent`
   - Approval Status = `pending`
   - Pipeline Next Action = `Review scorecard for invention capture, ownership, documentation, eligibility, and prior-art risk.`
3. Find Opportunity in Whiteford Schell IP Pipeline.
4. Draft-only opportunity recommendation:
   - Proposed opportunity title: `AI Patent Scorecard - <Company/Contact>`
   - Proposed offer: `AI Patent Strategy Sprint`
   - Proposed initial stage: `New Lead` or `Jeff / Whiteford Review` if high-fit answers are present.
5. Create internal review task:
   - Title: `Review AI Patent Strategy Scorecard lead: {{contact.name}}`
   - Description includes technical role, invention stage, AI usage, ownership indicators, documentation gaps, and recommended consult path.
6. Internal notification for high-fit indicators:
   - Founder/CTO/inventor role.
   - Active product/R&D effort.
   - Ownership or inventorship ambiguity.
   - Near-term disclosure, funding, launch, or competitor milestone.
7. Draft disabled email sequence for future approval:
   - Email 1: deliver scorecard result and explain non-advice limits.
   - Email 2: invention documentation and ownership blind spots.
   - Email 3: AI-assisted inventorship and patent strategy issues.
   - Email 4: invite AI Patent Strategy Sprint discussion.
   - Email 5: educational close-loop with preference/unsubscribe handling.

### Exit Conditions

- Reply, booking, unsubscribe, DND/suppression, `outreach:do-not-send`, Approval Status = `suppressed/no-auto-send/revise`, or human stage change.

### QA Tests

- Test lead from `/ai-patent-strategy-scorecard` only.
- Confirm AI compliance tags do not trigger this workflow.
- Confirm high-fit indicators create internal notification but no prospect-facing send.
- Confirm scorecard fulfillment email is disabled until explicit approval.
- Confirm no patent legal advice language is inserted into automated copy.

### Approval Gates

- Jeff activation approval required.
- External scorecard-result email approval required before enabling fulfillment email.
- Legal/ethics review required for claims about patentability, inventorship, or protectability.

## 5. Workflow Packet: Tech GC Launchpad

### Workflow Name

`WF | Intake | Whiteford | Tech GC Launchpad | Draft`

### Business Purpose

Route tech-company legal health checklist leads into a structured internal review that maps needs to Whiteford/Schell IP support areas: contracts, corporate, employment, privacy, AI, IP, and M&A readiness.

### Trigger

1. Form Submitted or Survey Submitted.
2. Tag Added: `workflow:tech-gc-launchpad`.

### Trigger Filters

- Source page contains `/colorado-tech-general-counsel`.
- Contact/company not suppressed.
- Offer lane equals or can be inferred as `tech-gc`.

### Actions

1. Add tags:
   - `brand:whiteford-schellip`
   - `workflow:draft-only`
   - `workflow:manual-start`
   - `ops:approval-required`
   - `ops:no-auto-send`
   - `workflow:tech-gc-launchpad`
2. Set fields:
   - Suggested Offer Lane = `tech-gc`
   - Approval Status = `pending`
   - Pipeline Next Action = `Map legal operating needs and decide whether OGC Launchpad review is appropriate.`
3. Find Opportunity in Whiteford Schell IP Pipeline.
4. Create internal review task:
   - Title: `Review Tech GC Launchpad lead: {{contact.name}}`
   - Description includes company stage, legal needs selected, urgency, existing counsel status, and possible Whiteford bench areas.
5. Draft-only opportunity recommendation:
   - Proposed title: `Tech GC Launchpad - <Company/Contact>`
   - Proposed service: `Tech Company OGC Launchpad`
   - Proposed stage: `New Lead` or `Qualification` after human review.
6. Draft disabled email sequence for future approval:
   - Email 1: fulfill checklist and frame operating-system review.
   - Email 2: common legal ops gaps for technical teams.
   - Email 3: how outside GC support coordinates specialist bench support.
   - Email 4: invite bounded OGC Launchpad review.
   - Email 5: educational close-loop and preference link.

### Exit Conditions

- Reply, booking, unsubscribe, suppression, no-auto-send, Approval Status changed by human, or opportunity leaves intake/review.

### QA Tests

- Test trigger from `/colorado-tech-general-counsel`.
- Confirm AI patent/compliance and M&A tags do not trigger this lane.
- Confirm task captures selected legal need categories.
- Confirm internal task is created even if no opportunity is created.
- Confirm no automated external consult invitation is enabled.

### Approval Gates

- Jeff must approve activation.
- Jeff must approve any external OGC Launchpad invitation or email enrollment.
- Whiteford brand/legal review required for descriptions of bench support and attorney availability.

## 6. Workflow Packet: Founder M&A Readiness

### Workflow Name

`WF | Intake | Whiteford | Founder M&A Readiness | Draft`

### Business Purpose

Use the M&A readiness checklist to surface diligence gaps, create an internal issue map, and route founder/CEO/CFO leads toward a Founder M&A Readiness Review without implying deal outcomes or legal advice.

### Trigger

1. Form Submitted or Survey Submitted.
2. Tag Added: `workflow:ma-readiness`.

### Trigger Filters

- Source page contains `/colorado-startup-ma-lawyer`.
- Contact not suppressed/DND/no-auto-send.
- Form/survey indicates founder, CEO, CFO, owner, corp dev, or deal-readiness role where available.

### Actions

1. Add tags:
   - `brand:whiteford-schellip`
   - `workflow:draft-only`
   - `workflow:manual-start`
   - `ops:approval-required`
   - `ops:no-auto-send`
   - `workflow:ma-readiness`
2. Set fields:
   - Suggested Offer Lane = `ma-readiness`
   - Approval Status = `pending`
   - Pipeline Next Action = `Review M&A checklist for diligence cleanup and readiness-review fit.`
3. Find Opportunity in Whiteford Schell IP Pipeline.
4. Draft-only opportunity recommendation:
   - Proposed title: `Founder M&A Readiness - <Company/Contact>`
   - Proposed service: `Founder M&A Readiness Review`
   - Proposed stage: `New Lead` or `Jeff / Whiteford Review` after human triage.
5. Create internal review task:
   - Title: `Review Founder M&A Readiness lead: {{contact.name}}`
   - Description includes readiness score/answers, likely diligence issues, corporate cleanup needs, timing, and whether specialist review is needed.
6. Draft disabled email sequence for future approval:
   - Email 1: fulfill checklist and clarify non-advice.
   - Email 2: diligence cleanup themes.
   - Email 3: founder timeline/readiness framing.
   - Email 4: invite M&A Readiness Review.
   - Email 5: close-loop educational resource and preference link.

### Exit Conditions

- Reply, booking, unsubscribe, suppression, Approval Status not pending/approved, or human stage change.

### QA Tests

- Test source-page filter for `/colorado-startup-ma-lawyer`.
- Confirm no claims about improved valuation, deal certainty, or guaranteed outcome.
- Confirm readiness issues are routed to internal task only.
- Confirm disabled email sequence has unsubscribe/preference handling placeholders.

### Approval Gates

- Jeff activation approval required.
- Jeff and legal/ethics approval required before any deal-readiness claims or external sequence is enabled.
- Live pipeline mutation requires separate approval.

## 7. Workflow Packet: Pipeline Stage Change Internal Review

### Workflow Name

`WF | Pipeline | Whiteford | Stage Change Internal Review | Draft`

### Business Purpose

Use pipeline-stage changes as internal governance events so opportunities receive the right approval packet, suppression handling, enrichment path, or next-action recommendation. This workflow must not send external messages.

### Trigger

- Pipeline Stage Changed.

### Trigger Filters

- Pipeline equals Whiteford Schell IP Pipeline (`Tbx4tA6wHv5lTwZPSHyZ`).
- Opportunity is not deleted/archived.
- Contact does not have `outreach:do-not-send` unless the new stage is suppression-related.

### Proposed Stage Logic

Use the exact stage names currently present in HighLevel if they differ; these labels define the intended operating logic:

1. `New Lead`
   - Create internal task: verify source, offer lane, consent basis, and duplicate status.
   - Set Pipeline Next Action = `Verify lead source and approval status.`
2. `Qualification`
   - Create internal task: summarize fit, urgency, role, source evidence, and proposed next human action.
   - If enrichment data is missing, add/recommend `enrichment:needs-research`.
3. `Jeff / Whiteford Review`
   - Create approval packet task/note with proposed outreach, context, source URLs, consent basis, and legal/ethics caveats.
   - Set Approval Status = `pending` unless already approved/revise/suppressed.
4. `Approved for CRM Sync`
   - Permit only separately approved safe sync scripts with evidence fields present.
   - Required fields before any sync: Consent Basis, Approval Status, Last Human Review At, Pipeline Next Action, and source URL for any enrichment.
5. `Contacted / Sent`
   - Require evidence of actual human approval before allowing this state.
   - Add internal audit note: who approved, what was sent, when, channel, and copy/version reference.
6. `Booked / Consultation Scheduled`
   - Create internal prep task: summarize source, offer lane, score/checklist highlights, public evidence, and likely Whiteford/Schell IP issue map.
7. `Suppressed / Do Not Contact`
   - Apply/recommend `outreach:do-not-send`.
   - Set Approval Status = `suppressed`.
   - Remove from future drafting/review queues.

### Actions

- Branch by new stage.
- Create internal task or note per stage.
- Update internal fields only after live mutation approval; otherwise create recommended update note/task.
- Do not send email, SMS, or social messages.
- Do not enroll into nurture sequences automatically.

### Exit Conditions

- Stage branch task/note is created.
- Contact/opportunity is suppressed.
- Opportunity is archived/deleted.

### QA Tests

- Move a test opportunity through each stage in a sandbox/test record.
- Confirm branch matching uses pipeline ID/name filter.
- Confirm suppression stage exits all drafting/nurture paths.
- Confirm `Contacted / Sent` branch flags missing human approval.
- Confirm no external send actions exist in the workflow.

### Approval Gates

- Workflow activation approval required.
- Any field update to live contact/opportunity requires separate live CRM mutation approval unless HighLevel test record only.
- Any outreach implied by a stage change requires the External Action Gate.

## 8. Workflow Packet: Stale Opportunity Review

### Workflow Name

`WF | Opportunity | Whiteford | Stale Lead Review | Draft`

### Business Purpose

Prevent dormant opportunities from becoming ungoverned outreach. The workflow creates internal review tasks recommending enrich, revise lane, draft content, suppress, or schedule manual follow-up.

### Trigger

HighLevel stale trigger options vary by configuration. Use the safest available option:

1. Manual-start scheduled review workflow over opportunities in selected stages, or
2. Opportunity Status/Stage trigger paired with wait conditions and filters, or
3. Saved smart-list/report reviewed by highlevel-ops, with internal task creation only.

### Trigger Filters

- Pipeline equals Whiteford Schell IP Pipeline.
- Stage in: `New Lead`, `Initial Contact`, `Qualification`, `Jeff / Whiteford Review`.
- No recent human activity for the chosen stale window.
- Suggested default stale windows:
  - `New Lead`: 7 calendar days since creation or last activity.
  - `Initial Contact`: 10 calendar days since last activity.
  - `Qualification`: 14 calendar days since last activity.
  - `Jeff / Whiteford Review`: 7 calendar days since last review request.
- Exclude suppressed/DND/no-auto-send contacts.

### Actions

1. Create internal task:
   - Title: `Stale opportunity review: {{opportunity.name}}`
   - Description includes stage, days stale, offer lane, last activity, consent basis, approval status, source URL, and recommended decision.
2. Recommend exactly one next action:
   - Enrich public sources.
   - Revise offer lane.
   - Draft personalized educational content for approval.
   - Suppress/do not contact.
   - Schedule manual follow-up by Jeff/authorized human.
3. Add/recommend tag `enrichment:needs-research` if role/source confidence is missing.
4. Add/recommend `outreach:personalized-draft-ready` only when a draft exists and is awaiting review.
5. No auto-send, no auto-stage escalation, no sequence enrollment.

### Exit Conditions

- Internal task created.
- Opportunity becomes suppressed/closed/booked.
- Human changes stage or next action.

### QA Tests

- Create test opportunities in each stale stage with old activity dates if possible.
- Confirm suppressed contacts are excluded.
- Confirm stale windows do not affect booked/closed/suppressed opportunities.
- Confirm one and only one recommended next action is present in each task.
- Confirm no external follow-up is sent.

### Approval Gates

- Jeff activation approval required.
- Any manual follow-up copy must go through External Action Gate.
- Any opportunity stage update must go through Live CRM Mutation Gate unless Jeff separately approves stale workflow field/stage updates.

## 9. Workflow Packet: LinkedIn Draft Approval

### Workflow Name

`WF | Social | Whiteford | LinkedIn Draft Approval | Draft`

### Business Purpose

Organize LinkedIn/profile/company-page draft review without publishing, commenting, DMing, connecting, scraping, or automating profile-level actions.

### Trigger

- Tag Added: `social:linkedin-draft`.
- Optional manual-start trigger from Growth OS/social content approval queue.

### Trigger Filters

- Contact/post record has LinkedIn Draft Status = `draft-ready` or an associated content draft/note exists.
- Approval Status is not `suppressed`.
- Draft is marked for one of these safe categories:
  - Jeff manual profile draft.
  - Company-page draft for Social Planner approval.
  - Educational comment idea for human review only.
  - Personalized content angle for future approval.

### Actions

1. Add/recommend tags:
   - `social:linkedin-draft`
   - `social:attorney-review-required`
   - `ops:approval-required`
   - `ops:no-auto-send`
2. Set fields where live field mutation is approved; otherwise include recommended values in task/note:
   - LinkedIn Draft Status = `draft-ready`
   - Approval Status = `pending`
   - Pipeline Next Action = `Attorney review required before any LinkedIn/social action.`
3. Create attorney review task:
   - Title: `Review LinkedIn draft: {{contact.name or content title}}`
   - Description includes draft text/link, channel, category, source URL if personalized, claim-risk notes, and proposed human action.
4. If Social Planner is used for company-page draft approval:
   - Store as draft only.
   - Use Social Planner approval queue/external approval link if configured.
   - Do not schedule/publish until separately approved.
5. If profile-level content is involved:
   - Treat the draft as copy Jeff or authorized human may manually post.
   - Do not connect, DM, scrape, comment, or post automatically.

### Exit Conditions

- Draft approved, revised, rejected, or posted manually by a human.
- Tag `outreach:do-not-send` or Approval Status = `suppressed`.
- LinkedIn Draft Status becomes `posted-manual` or `none`.

### QA Tests

- Add `social:linkedin-draft` to a test record; confirm attorney review task only.
- Confirm no publish/schedule action is enabled.
- Confirm profile-level drafts are labeled manual-only.
- Confirm claim-risk/ethics review section appears in the task.
- Confirm Social Planner token health is only checked/reported, not used to publish.

### Approval Gates

- Jeff/attorney review required before any social content is scheduled or posted.
- Explicit current approval required for any company-page Social Planner scheduling/publishing.
- No approval packet may authorize automated personalized LinkedIn actions unless Jeff explicitly instructs a lawful/manual process for a specific action.

## 10. Cross-Workflow QA Checklist

Complete this checklist before asking Jeff to activate any workflow:

1. Workflow status remains draft/off during build.
2. Name matches naming convention.
3. Trigger has source/tag/form filters; no broad unfiltered trigger exists.
4. Suppression/DND/no-auto-send exit exists.
5. Stop-on-response is enabled for any future external-send workflow.
6. Find Opportunity precedes any create/update opportunity action.
7. Duplicate opportunity settings are intentionally off unless approved.
8. Consent Basis is checked or captured before any external email path.
9. Approval Status is set or referenced before any external action.
10. Disabled email/social steps are visibly marked `Requires Jeff approval`.
11. Internal tasks include source page, offer lane, consent basis, and next action.
12. Execution logs/enrollment history are reviewed for each test contact.
13. Test contacts are removed from draft queues or marked test-only after QA.
14. Unsubscribe/preference links are present in any future email template.
15. Legal caveat is present in lead-magnet fulfillment copy: information only, no attorney-client relationship, no legal advice based solely on form submission.
16. No LinkedIn/profile action is automated.
17. No SMS/DM step exists unless separately approved.
18. No live CRM mutation is executed by this packet.

## 11. Approval Packet Template For Jeff

Use this template before activation or external action:

- Workflow/object name:
- HighLevel location:
- Offer lane:
- Trigger and filters:
- Contact/opportunity population affected:
- External actions proposed, if any:
- Live CRM mutations proposed, if any:
- Consent/preference handling:
- Suppression handling:
- Legal/ethics caveats:
- QA test records/results:
- Rollback plan:
- Exact decision requested:
  - Approve draft build only.
  - Approve activation.
  - Approve external email/send sequence.
  - Approve live CRM mutation/sync.
  - Approve Social Planner schedule/publish.
  - Revise.
  - Reject/suppress.

## 12. Implementation Order

1. Build draft/off workflows in this order:
   - AI Compliance Gameplan.
   - AI Patent Strategy Scorecard.
   - Tech GC Launchpad.
   - Founder M&A Readiness.
   - Pipeline Stage Change Internal Review.
   - Stale Opportunity Review.
   - LinkedIn Draft Approval.
2. Run QA with test contacts/opportunities only.
3. Export or screenshot each workflow canvas/settings for Jeff review.
4. Produce one activation approval packet per workflow.
5. Activate only after Jeff gives explicit approval for that workflow.
6. Enable external sends/social publishing/live CRM mutation only after the relevant separate approval gate is satisfied.

## 13. Known Blocker / Tool Note

The qmd CLI research path was attempted but failed because `better_sqlite3.node` was compiled for a different Node module version than the active Node runtime. The business-development corpus was still consulted through the local vector-search script and qmd-export fallback search. If qmd is needed for future live retrieval, rebuild/reinstall qmd dependencies under the active Node version before running `qmd query` again.
