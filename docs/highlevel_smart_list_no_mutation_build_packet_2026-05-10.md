# HighLevel Smart List No-Mutation Build Packet — 2026-05-10

Task: `t_bba80127`
Tenant: `whiteford-mountain-west`
HighLevel location: Whiteford Schell IP (`tm68WWMrcAa3TqQbEAMa`)
Mode: no-mutation preparation packet only
Prepared for: Jeff / future approved `highlevel-browser-operator`

## 1. Current authorization boundary

This packet defines six HighLevel smart lists that may be built later after Jeff gives exact approval. This task did not open HighLevel, create contacts, create or save smart lists, mutate tags, create opportunities, enroll contacts, activate workflows, send emails/SMS/DMs, publish social content, run test workflows, or perform CRM/Supabase/Clio writes.

The only completed work is documentation: exact list definitions, safe future UI steps, QA criteria, evidence checklist, and copy/paste approval language for a later task.

## 2. Inputs and source basis

Primary internal inputs:

- `docs/highlevel_campaign_implementation_plan.md`
- `docs/lead_magnet_opt_in_and_app_strategy.md`
- `docs/highlevel_draft_off_workflow_implementation_packets.md`
- `docs/reviews/2026-05-10_sunday_internal_readiness_tranche_review.md`
- `docs/reviews/2026-05-10_overnight_followup_visibility_review.md`
- `docs/reviews/2026-05-10_overnight_safe_progress_tranche_review.md`

Research/memory checks performed:

- Business-development RAG query: `lead magnet opt in newsletter segmentation follow up consent legal services`. Synthesis used only: useful lead magnets should fulfill a narrow promise, build trust, and route only appropriate/consented follow-up.
- QMD project search: `HighLevel smart lists newsletter consent workflow tags` over `whiteford-ai-law-pages`, run with Homebrew Node on PATH. Retrieved prior HighLevel funnel/workflow docs and confirmed smart lists are manual HighLevel objects, not currently built by the app/API.

## 3. Global smart-list rules

Use these rules for all six lists.

1. Smart lists are segmentation/views only. They are not workflows, campaigns, broadcasts, automations, or approval records.
2. Do not use smart-list creation as permission to send, enroll, test, activate, import, sync, or mutate CRM records.
3. Do not create the lists until test contacts exist or Jeff explicitly approves building empty saved views for later QA.
4. Do not broaden filters beyond the exact tag logic below unless Jeff approves a revised packet.
5. Include an exclusion for `outreach:do-not-send` wherever HighLevel smart-list UI supports negative tag filters.
6. For marketing/newsletter-use lists, also exclude DND/unsubscribed/bounced/suppressed records if those filters are available in the Contacts smart-list UI.
7. If HighLevel cannot express the exact boolean logic in one smart list, stop and document the limitation. Do not approximate with a broader audience.
8. Naming must match exactly so later operators and reviewers can find the lists.
9. Evidence must show the list is a saved view only and not connected to any send/enrollment/automation action.

## 4. Exact smart-list definitions

### 4.1 Whiteford - AI Patent Leads

List name: `Whiteford - AI Patent Leads`

Primary inclusion logic:

- Contact tag contains `workflow:ai-patent-strategy` OR
- Contact tag contains `interest:ai-patent-law`

Recommended HighLevel tag IDs for operator cross-check only:

- `workflow:ai-patent-strategy` = `WZfRXwccEjnHflOUL9Nt`
- `interest:ai-patent-law` = `isgN68rHai067UsUbosa`

Exclusion logic:

- Exclude contacts with tag `outreach:do-not-send`, if available.
- Exclude DND/unsubscribed/bounced/suppressed contacts for any export, campaign-audience review, or marketing use.
- Do not exclude `newsletter:not-consented` from this internal leads view by default, because non-consented AI Patent leads may still be useful for internal review; however, non-consented contacts must not be used for nurture/newsletter sends.

Intended use:

- Internal segmentation for AI-assisted invention / AI patent strategy leads.
- Review source, scorecard metadata, consent basis, and next action before any manual follow-up decision.
- Help Jeff identify contacts that may belong in AI Patent Strategy Sprint review.

What NOT to do:

- Do not use this list as a broadcast audience.
- Do not enroll this list in `WF - Whiteford - AI Patent Strategy Scorecard - Draft` or any active workflow.
- Do not assume `interest:ai-patent-law` equals email consent.
- Do not create or move opportunities from this list without separate live CRM mutation approval.

QA acceptance criteria:

- A test contact with only `workflow:ai-patent-strategy` appears.
- A test contact with only `interest:ai-patent-law` appears.
- A test contact with only `workflow:ai-compliance-readiness`, `workflow:tech-gc-launchpad`, or `workflow:ma-readiness` does not appear.
- A test contact with `outreach:do-not-send` is excluded if the negative tag filter is configured.

### 4.2 Whiteford - AI Compliance Leads

List name: `Whiteford - AI Compliance Leads`

Primary inclusion logic:

- Contact tag contains `workflow:ai-compliance-readiness` OR
- Contact tag contains `interest:ai-compliance`

Recommended HighLevel tag IDs for operator cross-check only:

- `workflow:ai-compliance-readiness` = `aLH8Z1rmQSfjFIRHagGy`
- `interest:ai-compliance` = `SZ1VWuu7A8kAVpTDc1F0`

Exclusion logic:

- Exclude contacts with tag `outreach:do-not-send`, if available.
- Exclude DND/unsubscribed/bounced/suppressed contacts for any export, campaign-audience review, or marketing use.
- Do not exclude `newsletter:not-consented` from the internal leads view by default; consent must be checked separately before any external action.

Intended use:

- Internal segmentation for AI governance, AI compliance, vendor/data, and Colorado/Mountain West AI readiness leads.
- Review readiness-score metadata and consent basis before any next-step recommendation.

What NOT to do:

- Do not treat this list as proof of compliance concern or legal issue.
- Do not broadcast to this list.
- Do not enroll the list in an AI Compliance workflow or newsletter.
- Do not use list membership as approval for source-current claims, named-company content, or outreach.

QA acceptance criteria:

- A test contact with only `workflow:ai-compliance-readiness` appears.
- A test contact with only `interest:ai-compliance` appears.
- AI Patent, Tech GC, and M&A-only contacts do not appear unless they also carry one of the two AI Compliance tags.
- Suppressed/DND contacts are excluded where the UI supports those filters.

### 4.3 Whiteford - Tech GC Leads

List name: `Whiteford - Tech GC Leads`

Primary inclusion logic:

- Contact tag contains `workflow:tech-gc-launchpad` OR
- Contact tag contains `interest:tech-ogc`

Recommended HighLevel tag IDs for operator cross-check only:

- `workflow:tech-gc-launchpad` = `JUG30WwG9bNmdUzT2Tn9`
- `interest:tech-ogc` = `U3IETGpVAAUsCA2GAdX4`

Exclusion logic:

- Exclude contacts with tag `outreach:do-not-send`, if available.
- Exclude DND/unsubscribed/bounced/suppressed contacts for any export, campaign-audience review, or marketing use.
- Do not exclude `newsletter:not-consented` from internal review because a non-consented Tech GC checklist user may still need browser-only/no-send handling or human review.

Intended use:

- Internal segmentation for technology-company legal operating system / outside general counsel leads.
- Help Jeff review Tech GC Checklist and OGC Launchpad fit after consent and suppression checks.

What NOT to do:

- Do not send OGC Launchpad invitations from this list.
- Do not activate or test `WF - Whiteford - Tech GC Launchpad - Draft` from this list.
- Do not infer consent from `interest:tech-ogc`.
- Do not include contacts in external named-company awareness work without conflicts/suppression/prior-touch review and exact copy approval.

QA acceptance criteria:

- A test contact with only `workflow:tech-gc-launchpad` appears.
- A test contact with only `interest:tech-ogc` appears.
- AI Patent, AI Compliance, and M&A-only contacts do not appear unless they also carry a Tech GC tag.
- Non-consented Tech GC test records appear in this internal leads view only if not otherwise suppressed, confirming the list is not being used as a send audience.

### 4.4 Whiteford - M&A Readiness Leads

List name: `Whiteford - M&A Readiness Leads`

Primary inclusion logic:

- Contact tag contains `workflow:ma-readiness` OR
- Contact tag contains `interest:ma-readiness`

Recommended HighLevel tag IDs for operator cross-check only:

- `workflow:ma-readiness` = `vBjCsu6UEeaEOmvu0vhc`
- `interest:ma-readiness` = `vAasc4oplv4L2ITjcKHR`

Exclusion logic:

- Exclude contacts with tag `outreach:do-not-send`, if available.
- Exclude DND/unsubscribed/bounced/suppressed contacts for any export, campaign-audience review, or marketing use.
- Do not exclude `newsletter:not-consented` from the internal leads view by default; do require consent review before any external M&A readiness email or consult invitation.

Intended use:

- Internal segmentation for founder/CEO/CFO M&A readiness and diligence-cleanup leads.
- Review readiness checklist metadata, timing, and internal next action before Jeff decides on any follow-up.

What NOT to do:

- Do not imply deal-readiness, valuation impact, buyer interest, or transaction outcome from list membership.
- Do not use the list as an email broadcast audience.
- Do not enroll contacts in `WF - Whiteford - Founder M&A Readiness - Draft` or any active workflow.
- Do not create/update opportunities without exact live CRM mutation approval.

QA acceptance criteria:

- A test contact with only `workflow:ma-readiness` appears.
- A test contact with only `interest:ma-readiness` appears.
- AI Patent, AI Compliance, and Tech GC-only contacts do not appear unless they also carry an M&A tag.
- Suppressed or DND records are excluded where the UI supports that filtering.

### 4.5 Whiteford - AI Newsletter Consented

List name: `Whiteford - AI Newsletter Consented`

Primary inclusion logic:

- Contact tag contains `newsletter:ai` AND
- Contact tag does not contain `newsletter:not-consented`

Recommended HighLevel tag IDs for operator cross-check only:

- `newsletter:ai` = `DWMSyc3Cw4jH1JuzGF23`
- `newsletter:not-consented` = `PuS7pqcwDAgU9CzjjgCD`

Additional recommended consent/suppression filters if fields exist in the UI:

- `Consent Basis` starts with `lead_magnet_email_opt_in:` OR otherwise reflects a Jeff/Whiteford-approved current consent basis.
- `Approval Status` is not `no-auto-send`, not `suppressed`, and not `revise`.
- Contact is not DND, unsubscribed, bounced, or globally suppressed.
- Contact does not have `outreach:do-not-send`.

Intended use:

- Internal review population for future AI newsletter or educational email approval packets.
- Verify that a contact has the positive AI newsletter tag and lacks the explicit non-consent tag before any newsletter-send packet is considered.

What NOT to do:

- Do not send or schedule a newsletter to this list from this packet.
- Do not treat `newsletter:ai` alone as enough if HighLevel shows DND, unsubscribe, bounce, suppression, `outreach:do-not-send`, or no-auto-send status.
- Do not add contacts to this list manually by adding tags unless a separate exact contact/tag mutation approval exists.
- Do not override unsubscribe or DND status.

QA acceptance criteria:

- A test contact with `newsletter:ai` and no `newsletter:not-consented` appears.
- A test contact with both `newsletter:ai` and `newsletter:not-consented` does not appear.
- A test contact with only `newsletter:not-consented` does not appear.
- DND/unsubscribed/bounced/suppressed records are excluded if those UI filters are configured.
- Evidence shows no campaign, workflow, broadcast, or newsletter object was created, selected, scheduled, or sent from this list.

### 4.6 Whiteford - No Newsletter Consent

List name: `Whiteford - No Newsletter Consent`

Primary inclusion logic:

- Contact tag contains `newsletter:not-consented`

Recommended HighLevel tag ID for operator cross-check only:

- `newsletter:not-consented` = `PuS7pqcwDAgU9CzjjgCD`

Recommended enrichment filters if fields exist in the UI:

- Optional display-only review columns: `Consent Basis`, `Approval Status`, `Source Page`, `Campaign Key`, `Lead Magnet`, `Pipeline Next Action`.
- Do not add negative suppression filters by default; this list is intended to find all explicit no-consent records for hygiene review.

Intended use:

- Internal suppression and QA population for contacts that should not receive newsletter/nurture sends.
- Verify lead-magnet non-opt-in behavior and no-auto-send posture.
- Support internal hygiene checks before any future external action packet.

What NOT to do:

- Do not use this list as any send audience.
- Do not remove `newsletter:not-consented` or add `newsletter:ai` without exact approval and documented consent basis.
- Do not enroll these contacts in workflows, newsletters, campaigns, broadcasts, or sequences.
- Do not use this list for retargeting, paid audiences, social uploads, or personalized outreach.

QA acceptance criteria:

- A test contact with `newsletter:not-consented` appears.
- A test contact without `newsletter:not-consented` does not appear.
- A test contact with both `newsletter:ai` and `newsletter:not-consented` appears here and is excluded from `Whiteford - AI Newsletter Consented`.
- Evidence confirms the list is labeled internal/no-send and not attached to any campaign, workflow, or newsletter.

## 5. Future UI build steps — approval required before doing these

These steps are for a future approved HighLevel-browser task. Do not execute them from this packet.

1. Confirm Jeff's approval text names:
   - operator/profile;
   - HighLevel location `tm68WWMrcAa3TqQbEAMa` only;
   - the six exact smart-list names;
   - permission to create saved smart-list views only;
   - evidence folder/path;
   - stop conditions;
   - no send/enroll/activate/import/contact/opportunity mutation boundary.
2. Log in to HighLevel as an authorized human/operator.
3. Select location Whiteford Schell IP only.
4. Navigate to Contacts.
5. For each list, use More Filters / Tags or the current HighLevel equivalent to define the exact boolean tag logic above.
6. Add negative filters only where stated and where HighLevel clearly supports exact negative tag/DND/suppression logic.
7. Save the smart list with the exact name.
8. Capture evidence screenshots/DOM notes showing the saved filter definition and list name.
9. Do not click Send Email, Send SMS, Add to Workflow, Bulk Action, Import, Export, Pipeline Update, or Campaign/Newsletter controls.
10. If HighLevel presents a bulk-action modal or a send/enroll prompt, cancel immediately and stop.
11. If HighLevel cannot express exact OR/AND/NOT logic, do not save a broader list. Document the limitation and block for Jeff.
12. After all six lists are saved, re-open each list and verify the filter logic persisted exactly.

## 6. Evidence checklist for future build verification

A future approved builder should capture this evidence before completing their task:

- Screenshot or text evidence of the Whiteford Schell IP location selected.
- For each smart list:
  - exact list name visible;
  - inclusion tag filters visible;
  - exclusion tag/DND/suppression filters visible where configured;
  - contact count recorded;
  - no bulk action modal open;
  - no workflow/campaign/newsletter/send/enroll step selected.
- A short before/after log listing the six saved smart-list names and no other changed objects.
- Confirmation that no contacts were created, imported, exported, tagged, untagged, enrolled, messaged, deleted, merged, or moved.
- Confirmation that no workflows were activated, tested, manually started, published, or enrolled.
- Confirmation that no email campaigns, newsletters, SMS, DMs, social posts, ads, or Social Planner posts were created/sent/scheduled/published.
- Confirmation that no opportunities, tasks, notes, custom fields, campaigns, forms, surveys, calendars, pipelines, Supabase rows, or Clio records were mutated.
- If test contacts are used, evidence that they are Jeff-owned/internal/synthetic and that any test data is removed or labeled test-only according to the approved task scope.

## 7. Stop conditions

Stop immediately and block the future task if any of these occur:

- The selected HighLevel location is not Whiteford Schell IP (`tm68WWMrcAa3TqQbEAMa`).
- The UI cannot represent OR/AND/NOT logic exactly.
- The UI tries to apply a bulk action to contacts instead of saving a view.
- The UI prompts for send, schedule, add to workflow, export, import, or enrollment.
- A filter would include `newsletter:not-consented` contacts in `Whiteford - AI Newsletter Consented`.
- A filter would treat non-consented contacts as mailable or workflow-eligible.
- Any operator is unsure whether clicking Save will mutate contacts rather than save a smart-list view.
- Any approval text is missing the location, operator, exact object scope, evidence path, and no-send/no-enroll/no-activation boundary.

## 8. Manual unblock / approval language for a later HighLevel-browser task

Jeff can paste one of these into a future task if he wants the lists built.

### Approve saved smart-list build only

I approve a future `highlevel-browser-operator` task to create only the six saved HighLevel contact smart-list views named below in the Whiteford Schell IP location (`tm68WWMrcAa3TqQbEAMa`) using `docs/highlevel_smart_list_no_mutation_build_packet_2026-05-10.md` as the exact source of truth:

1. `Whiteford - AI Patent Leads`
2. `Whiteford - AI Compliance Leads`
3. `Whiteford - Tech GC Leads`
4. `Whiteford - M&A Readiness Leads`
5. `Whiteford - AI Newsletter Consented`
6. `Whiteford - No Newsletter Consent`

Scope approved: save smart-list/contact-view definitions only, capture evidence, and report contact counts. Do not create, import, export, tag, untag, delete, merge, enroll, message, bulk update, or move contacts/opportunities. Do not activate/test/start workflows. Do not create/send/schedule email, SMS, newsletter, campaign, social, ad, or LinkedIn actions. Stop if HighLevel cannot express the exact filter logic or presents a bulk-action/send/enroll prompt.

Approved evidence folder/path: `<Jeff to specify>`.
Named operator/profile: `<Jeff to specify>`.

### Hold / no build approval

I do not approve HighLevel smart-list UI work yet. Keep the six list definitions in `docs/highlevel_smart_list_no_mutation_build_packet_2026-05-10.md` as no-mutation documentation only. No HighLevel login, UI change, contact mutation, workflow test/activation/enrollment, send, import/export, CRM/Supabase/Clio write, social action, or public/external action is authorized.

### Request revision

Revise `docs/highlevel_smart_list_no_mutation_build_packet_2026-05-10.md` before any HighLevel UI task. Required changes: `<Jeff to specify>`. Until the revision is approved, no HighLevel login, smart-list save, contact mutation, workflow test/activation/enrollment, send, import/export, CRM/Supabase/Clio write, social action, or public/external action is authorized.

## 9. Final no-mutation confirmation

This packet is documentation-only. It did not use HighLevel browser/API access and did not change any CRM, HighLevel, Supabase, Clio, website, social, email, newsletter, campaign, workflow, pipeline, contact, opportunity, tag, task, note, or field record.
