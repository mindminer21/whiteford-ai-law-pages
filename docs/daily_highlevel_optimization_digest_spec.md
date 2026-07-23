# Daily HighLevel Optimization Digest Operating Spec

Generated: 2026-05-05 23:41:17 MDT
Task: `t_f0324dc8`
Tenant: `whiteford-mountain-west`
HighLevel location: `Whiteford Schell IP` / `tm68WWMrcAa3TqQbEAMa`
Pipeline: `Whiteford Schell IP Pipeline` / `Tbx4tA6wHv5lTwZPSHyZ`
Default campaign lanes:
- AI Patent Strategy Scorecard -> `workflow:ai-patent-strategy`
- AI Compliance Gameplan Builder -> `workflow:ai-compliance-readiness`
- Tech Company Legal Health Checklist -> `workflow:tech-gc-launchpad`
- Founder M&A Readiness Checklist -> `workflow:ma-readiness`

## 1. Purpose

Create a daily AI-agent monitor that reviews the Whiteford/Schell IP HighLevel, Growth OS, Kanban, landing-page, and content-production state, then sends Jeff a concise improvement digest. The monitor is advisory by default: it may inspect, summarize, reconcile internal status, draft proposed tasks, and identify blockers, but it must not send external messages, activate automations, publish social posts, enroll contacts, or mutate live CRM records unless Jeff has approved the exact action in the current instruction.

Business-development basis: the digest should optimize the whole funnel, not just CRM hygiene. Each recommendation should connect a narrow lead magnet, a specific buyer pain, a concrete next-step offer, and a measurable action. Use the private corpus for synthesis only; do not quote or reproduce book text.

## 2. Daily schedule and delivery

Recommended schedule:
- Run once per weekday morning at 07:30 Mountain time.
- Optional second lightweight check at 16:30 Mountain time only if active campaigns or test submissions are running.

Delivery target:
- Send the final digest to Jeff through Hermes' configured origin/current chat or the approved internal notification channel.
- The digest is internal advisory content, not marketing content.

Maximum length:
- Default: 12 bullets or fewer.
- Include links/paths/HighLevel object names for anything Jeff needs to inspect.
- Put detailed evidence in an artifact file only when the daily run finds more than five issues.

## 3. Authority and guardrails

### Auto-approved internal actions

The monitor may do these without separate approval:
- Read HighLevel configuration, contacts, opportunities, tags, custom fields, pipeline stages, workflow status, email/sender settings, Social Planner draft/approval metadata, and analytics available to the integration.
- Read local project files in `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages`.
- Read Growth OS SQLite state at `/Users/jeff/.openclaw/projects/mountain-west-growth-os/data/growth-os.sqlite`.
- Read Kanban task state and summarize open/blocking/done items.
- Write internal report artifacts, local QA notes, and proposed Kanban task specs.
- Create internal-only Kanban follow-up tasks when the digest identifies a blocker that should be routed to another specialist.
- Update internal sync/audit rows in Growth OS if the row is strictly about monitor run metadata and does not change a prospect/contact/opportunity/customer-facing record.

### Actions that require Jeff's exact approval first

The monitor must not do any of these from a daily digest run:
- Send email, SMS, voicemail drops, DMs, LinkedIn messages, comments, or connection requests.
- Publish or schedule social posts, ads, newsletters, campaigns, or blog/page changes.
- Activate, publish, or enroll anyone into HighLevel workflows, campaigns, sequences, or broadcasts.
- Import, sync, update, delete, or enrich live HighLevel contacts/opportunities unless the task explicitly approves the exact write.
- Scrape LinkedIn, bypass platform rules, automate profile posting/commenting, or automate personalized outreach.
- Change unsubscribe/preference/consent status except by reporting an inconsistency for human review.
- Make legal claims, compliance determinations, or patentability conclusions about a prospect.

Every proposed external action must be phrased as: "Approve/revise/reject this proposed action." Include recipient/class, channel, exact draft or object, risk notes, and why it is recommended.

## 4. Source systems and read checks

### A. HighLevel location

Inspect:
- Location ID equals `tm68WWMrcAa3TqQbEAMa`.
- Pipeline ID equals `Tbx4tA6wHv5lTwZPSHyZ` when opportunity data is read.
- Required campaign tags exist:
  - `workflow:ai-patent-strategy`
  - `workflow:ai-compliance-readiness`
  - `workflow:tech-gc-launchpad`
  - `workflow:ma-readiness`
  - lead magnet, interest, newsletter consent/non-consent, and operational safety tags from `docs/highlevel_campaign_implementation_plan.md` and `docs/highlevel_ops_execution_blueprint.md`.
- Required contact custom fields exist and are mapped, especially source, campaign, role, consent, approval, enrichment, and pipeline-next-action fields.
- Workflow objects are off/draft/manual-start unless separately approved.
- Email templates/sequences include unsubscribe/preference handling and legal disclaimer language.
- Social Planner assets are drafts or approval-queued, not published by the agent.

Recommended API mode:
- Prefer read-only GET calls or dry-run scripts.
- If an endpoint is uncertain, skip the call and report the missing safe API path rather than guessing.

### B. Growth OS database

Database path:
- `/Users/jeff/.openclaw/projects/mountain-west-growth-os/data/growth-os.sqlite`

High-value tables to inspect:
- Funnel and CRM state: `prospects`, `contacts`, `opportunities`, `offers`, `campaigns`, `cohort_tracking`, `offer_performance`, `revenue_attribution`.
- HighLevel sync metadata: `crm_integration_config`, `crm_field_mappings`, `ghl_pipeline_blueprints`, `ghl_pipeline_stage_mappings`, `ghl_stage_action_rules`, `ghl_sync_links`, `ghl_opportunity_stage_events`, `crm_sync_batches`, `crm_sync_records`, `crm_audit_log`.
- Approval/safety: `approval_items`, `send_authorization_rules`, `execution_authorizations`, `suppression_checks`, `compliance_reviews`, `qa_reviews`, `draft_audit_trail`.
- Content engine: `content_topics`, `content_assets`, `content_lanes`, `content_sources`, `content_performance`, `outreach_drafts`, `outreach_events`, `outreach_channels`.
- Health/ops: `kpi_snapshots`, `weekly_growth_reports`, `agent_events`, `agent_productivity_metrics`, `hardening_checks`, `source_freshness_checks`, `duplicate_candidates`.

Daily SQL checks should be read-only unless the run is writing a monitor-run audit row. Recommended queries:
- Count opportunities by stage, owner, offer, and age since `updated_at`.
- Count contacts by `permission_basis`, `suppression_status`, `confidence`, missing source URL, and missing role category.
- Count pending approval items by type, risk level, and age.
- Count content assets by lane, approval status, publish_allowed, and performance status.
- Count CRM sync batches with blocked/failed status.
- Count hardening checks by status/severity and next_run_at.
- Pull latest KPI snapshot and compare to prior seven days if available.

### C. Kanban board

Inspect:
- Ready/running/blocked tasks for the Whiteford Mountain West tenant.
- Completed task deliverables from `docs/KANBAN_DELIVERABLE_INDEX.md`.
- Unclaimed blockers that affect HighLevel, Growth OS, landing-page intake, lead-magnet delivery, content approvals, or email/social activation.

Digest use:
- Summarize only blockers and recommended next tasks.
- Create follow-up Kanban tasks only when the blocker is clear, scoped, and assigned to the right specialist profile. Do not assign follow-ups to `highlevel-ops` by default unless it is truly a HighLevel operations task.

### D. Landing pages and lead endpoint

Inspect local/public routes:
- `/ai-patent-strategy-scorecard`
- `/ai-compliance-gameplan`
- `/colorado-ai-compliance-lawyer`
- `/colorado-tech-general-counsel`
- `/colorado-startup-ma-lawyer`
- `/ai-law-youtube`

Read files:
- `src/app/api/leads/route.ts`
- `src/lib/campaigns.ts`
- lead-magnet components in `src/components/`

Checks:
- Lead endpoint has `GHL_PRIVATE_INTEGRATION_TOKEN` and `GHL_LOCATION_ID` only in server env, never client code.
- Non-consented leads are not given `newsletter:ai` through static campaign tags. This is a known risk in `src/lib/campaigns.ts` because each campaign tag list includes `newsletter:ai` even when `contact.subscribe` is false; keep it in the digest until fixed.
- Custom fields use HighLevel-accepted field keys or IDs; `docs/highlevel_campaign_implementation_plan.md` notes that the route sends bare keys while verified HighLevel keys are `contact.*`.
- CTA links, disclaimers, privacy language, and no-attorney-client language remain visible.
- Form submissions fail safely in preview mode if credentials are absent.

## 5. Metrics to inspect daily

### Funnel and lead metrics

Report when available:
- New website leads by campaign lane in the last 24 hours and last 7 days.
- Lead-to-contact upsert success/failure count.
- Contact records with missing campaign/source/lead magnet/recommended offer fields.
- Contacts with `newsletter:not-consented` plus any newsletter/marketing-interest tag conflict.
- Lead magnet completion/submission rates by route if analytics exist.
- CTA clicks, bookings, replies, and consultation conversions when HighLevel/analytics data is available.

### Pipeline metrics

Report:
- Opportunities by stage and offer lane.
- New opportunities created in last 24 hours.
- Stale opportunities by stage using the rules in section 7.
- Opportunities missing owner, next action, contact, offer lane, expected close date, or source.
- Opportunities not linked between Growth OS and HighLevel (`ghl_sync_links` missing or stale).
- Duplicate candidates or multiple open opportunities that appear to represent the same company/matter.

### Approval and safety metrics

Report:
- Pending approval items older than 2 business days.
- Approval items with high/unknown risk and no reviewer.
- Drafts marked `publish_allowed=1` without final legal/brand approval.
- Send authorization rules where `external_action_allowed=1`; these should be rare and tied to an approval item.
- Suppression or consent conflicts.
- Any live workflow/campaign/social item discovered without a visible approval trail.

### Email deliverability metrics

Report:
- Dedicated sending domain status, SPF, DKIM, DMARC, and bounce domain health if available.
- Sender reputation/warm-up status if available.
- Recent sends, bounces, spam complaints, unsubscribes, and reply rates by campaign.
- Missing unsubscribe/preference links in templates or campaigns.
- Marketing emails drafted for non-consented contacts.
- Subject lines or copy with legal-marketing risk: guarantees, pressure tactics, unverifiable superiority claims, or specific legal conclusions.

### Social Planner and content metrics

Report:
- Draft posts awaiting approval.
- Category queues that are empty for the next 14 days.
- Best-performing topics/posts from the last 30 days if analytics are available.
- Evergreen posts that can be refreshed or mapped to one of the four lead magnets.
- LinkedIn/page token health and days until next token check.
- Posts/comments/messages that must remain manual/profile-level drafts for Jeff or an authorized human.

### Token and integration health

Report:
- HighLevel private integration token presence in the runtime environment, without printing the token.
- HighLevel API read-call success/failure summary.
- Cloudflare/API blocker errors such as 401/403/429/1010.
- LinkedIn/Social Planner token connection status if available.
- Hermes profile/skill availability: `highlevel-ops`, `business-development-rag`, and `qmd`.
- QMD health: if `qmd` fails due to a Node/better-sqlite3 ABI mismatch, report it as an ops blocker and do not attempt broad package repair inside the digest run unless separately approved.

## 6. Best-practice checks

Daily recommendations should be scored against these rules:

1. Specific audience: Is the issue tied to founder/CEO/CTO/GC/CFO/COO/HR/product/investor personas?
2. Clear pain: Does the recommendation name the costly/legal/operational blind spot?
3. Concrete next step: Does it move toward a scorecard, gameplan, checklist, consultation, or internal review?
4. Consent safe: Does it avoid sending to people without consent or approval?
5. Legal/ethics safe: Does it avoid legal advice, guarantees, urgency hype, and misleading claims?
6. Workflow safe: Is activation/manual-start status clear?
7. Source-backed: Are enrichment and recommendations tied to evidence URLs or local artifact paths?
8. Owner assigned: Is the next action assigned to Jeff, highlevel-ops, content, engineering, or another specialist?
9. Measurable: Does the recommendation define the metric that will prove improvement?
10. Low blast radius: Can the next step be tested internally or on a single approved record before scaling?

## 7. Stale-opportunity rules

Use these defaults unless Jeff changes the sales cadence:

- `New Lead`: stale after 1 business day with no owner, next action, or review note.
- `Initial Contact`: stale after 3 business days with no reply, booking, or documented human next step.
- `Qualification`: stale after 5 business days with no fit/disqualify decision.
- `Jeff / Whiteford Review`: stale after 2 business days unless a reviewer and review date are set.
- `Approved for CRM Sync`: stale after 1 business day if the sync batch has not run or is blocked.
- `Contacted / Sent`: stale after 5 business days with no reply/open/click/booking signal; recommendation should be "review/revise/suppress/manual follow-up," not auto-send.
- `Suppressed / Do Not Contact`: never recommend outreach; only recommend data hygiene if conflicting tags/fields exist.
- `Closed Won`, `Closed Lost`, or `Not a Fit`: no nurture unless a separate approved reactivation strategy exists.

For each stale opportunity, recommend exactly one next action:
- enrich public sources;
- revise offer lane;
- draft an approval packet;
- ask Jeff for fit decision;
- suppress/do-not-contact;
- schedule a manual review;
- create a technical/CRM cleanup task.

## 8. Content-opportunity rules

A daily content recommendation is worth surfacing only if it meets at least one of these criteria:
- Maps directly to a default campaign lane and landing-page CTA.
- Answers a recurring objection from leads or prospects.
- Converts a recent legal/news change into an educational, non-advice explanation.
- Repurposes a YouTube brief or post into a lead-magnet CTA.
- Fills an empty Social Planner category queue for the next two weeks.
- Supports a stale-opportunity follow-up with an educational asset Jeff can manually send after approval.

Recommended content queue categories:
- AI patent strategy
- Colorado AI compliance / ADMT readiness
- Tech outside general counsel
- Founder M&A readiness
- AI law YouTube / authority clips
- Trade secrets and invention ownership
- Board/executive AI governance
- Evergreen lead-magnet CTA

## 9. Recommendation scoring

Score each candidate issue from 1 to 5 on:
- Revenue leverage: likely effect on qualified consults or matter creation.
- Risk reduction: consent/legal/deliverability/CRM safety improvement.
- Urgency: time sensitivity or blocker severity.
- Ease: can be fixed in a small scoped task.
- Evidence strength: backed by HighLevel, Growth OS, Kanban, or code/artifact evidence.

Sort by total score. The digest should show the top five recommendations and put the rest in "watchlist" only if useful.

Priority labels:
- P0: safety/legal/deliverability issue that could cause external harm if not fixed.
- P1: broken lead capture, booking, workflow routing, token/API access, or consent conflict.
- P2: stale opportunity, approval bottleneck, or missing owner/next action.
- P3: content/calendar optimization or strategic experiment.

## 10. Digest format

Use this concise format:

```text
Daily HighLevel Optimization Digest — <date>

1) Top recommendations
- [P#] <recommendation> — Evidence: <path/object/count>. Next action: <Jeff approves/assigns/decides X>.

2) Pipeline and approvals
- New: <count>. Stale: <count>. Pending approvals: <count>. Main blocker: <one sentence>.

3) Content and social
- Drafts awaiting review: <count>. Empty queues: <categories>. Best opportunity: <one sentence>.

4) Deliverability / integration health
- HighLevel API: <ok/blocked>. Email domain: <ok/unknown/issue>. Social token: <ok/unknown/issue>. QMD/business-dev RAG: <ok/issue>.

5) Approval requests
- Approve/revise/reject: <exact proposed action>. No external action will occur unless approved.
```

If everything is healthy, still include one growth improvement and one watch item.

## 11. Suggested self-contained cron prompt

Use this prompt when creating the recurring Hermes job:

```text
You are Jeff's HighLevel operations monitor for the Whiteford Mountain West / Schell IP growth system. Run the daily advisory digest using /Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/daily_highlevel_optimization_digest_spec.md as the operating spec. Load and use business-development-rag before making funnel/email/content recommendations, and use qmd if it is healthy. Inspect HighLevel/Growth OS/Kanban/landing-page/content state read-only unless writing internal report artifacts or internal monitor audit notes. Do not send emails/SMS/DMs, activate workflows, publish social posts, enroll contacts, scrape LinkedIn, or mutate live CRM records. Suggestions only unless Jeff has approved the exact action in the current task. Return a concise digest in the specified format with evidence paths/object names and explicit approval requests.
```

Recommended cron settings:
- Name: `Daily HighLevel Optimization Digest`
- Schedule: `30 7 * * 1-5`
- Deliver: origin/current Jeff channel
- Profile/model: current `highlevel-ops` profile
- Skills: `business-development-rag`, `qmd`
- Enabled toolsets: `kanban`, `terminal`, `file`, `web` only if web/API reads are needed
- Workdir: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages`

## 12. Launch checklist

Before enabling the recurring job:
- Confirm Jeff's preferred delivery channel and weekday/weekend cadence.
- Confirm whether HighLevel API read-only checks should run every day or only when credentials are present in the profile environment.
- Confirm whether the job may create internal Kanban follow-up tasks automatically, or should merely propose them in the digest.
- Fix or acknowledge the known `newsletter:ai` / `newsletter:not-consented` tag conflict risk in `src/lib/campaigns.ts` before production nurture activation.
- Fix or acknowledge the custom-field key format risk in `src/app/api/leads/route.ts` before production lead syncing.
- Resolve QMD's current Node/better-sqlite3 ABI mismatch or let the monitor report QMD as degraded while using business-development-rag.
- Do one manual dry run and verify the digest contains no secrets, PII dumps, or unapproved external-action language.

## 13. Current known watch items from this spec build

- QMD failed during this task with a Node native module ABI mismatch: `better_sqlite3.node` was compiled for NODE_MODULE_VERSION 137 while Node.js v25.9.0 requires 141.
- `src/lib/campaigns.ts` includes `newsletter:ai` in static tags for each campaign, while `src/app/api/leads/route.ts` also adds `newsletter:not-consented` when subscribe is false. This can create a consent-segmentation conflict.
- `src/app/api/leads/route.ts` sends custom field keys as bare keys such as `campaign_key`; verified HighLevel field keys in the setup plan are `contact.*` keys. Confirm accepted format before relying on production upserts.
- HighLevel workflow/email/social activation remains a separate approval step; the daily monitor should treat those assets as draft/off unless Jeff approves exact activation.
