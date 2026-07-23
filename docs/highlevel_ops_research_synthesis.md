# HighLevel Operations Research Synthesis

Generated: 2026-05-06
Scope: Whiteford Mountain West + Schell IP HighLevel operations

## Executive Decision

Use HighLevel as the operational layer for approved CRM, email, workflow, Social Planner, brand, and pipeline activity. Use Hermes/Growth OS as the strategy, drafting, research, QA, and approval layer. No external send, publish, workflow activation, LinkedIn action, or contact import should happen without a specific approval packet.

## Email Campaigns And Templates

Best-practice structure:

- Use templates for reusable branded shells.
- Use campaigns for one-time or batch sends.
- Use email sequences for linear follow-up.
- Use workflows when branching, lead scoring, opportunity movement, tasks, booking, or internal notifications are involved.
- Keep email sequence naming explicit: `SEQ | Whiteford | AI Compliance Gameplan | 5 Touch`.
- Use a dedicated sending domain, SPF/DKIM/DMARC, unsubscribe/preference management, seed testing, and small engaged batches.
- Keep legal-service emails educational, evidence-based, and specific to the offer. Avoid superiority claims, guarantees, or pressure language.

Whiteford/Schell IP application:

- Four offer lanes remain the primary nurture architecture: AI patent, AI compliance, tech GC, and M&A readiness.
- Every email sequence should start by fulfilling the promised lead magnet, then diagnose the related blind spot, then route to a clear productized service conversation.
- Newsletter content should be separate from lead-magnet nurture. Newsletter subscribers get authority-building updates; lead-magnet contacts get a short diagnostic sequence.

Primary sources:

- HighLevel email sending guide: https://help.gohighlevel.com/support/solutions/articles/155000001021-email-sending-guide-email-best-practices-email-warm-up
- Dedicated sending domains: https://help.gohighlevel.com/support/solutions/articles/48001226115-dedicated-email-sending-domains-overview-setup
- Email sequences: https://help.gohighlevel.com/support/solutions/articles/155000007772-email-sequences-in-highlevel
- Templates versus campaigns: https://help.gohighlevel.com/support/solutions/articles/48001215255
- Preference management: https://help.gohighlevel.com/support/solutions/articles/155000007291-preference-management-email-unsubscription-management-
- FTC CAN-SPAM guide: https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business

## Workflows And Pipeline Linkage

Best-practice structure:

- Build modular workflows instead of one giant automation.
- Separate intake, qualification/routing, speed-to-lead, nurture, pipeline-stage logic, booking, reply/no-show, stale-opportunity, and internal review.
- Every trigger should have filters. Avoid broad `Form Submitted` or `Tag Added` triggers without specific form/tag/source constraints.
- Use `Find Opportunity` before creating/updating an opportunity where duplicate risk exists.
- Use `Stop on Response` for nurture sequences.
- Use `Allow Multiple Opportunities` only when contacts may have separate legal matters.
- Keep all workflows in draft/off/manual-start until QA and Jeff approval are complete.

Whiteford/Schell IP application:

- Each productized offer gets a draft workflow and a pipeline-routing workflow.
- Pipeline-stage workflows should create internal tasks and approval packets, not automatic external sends.
- Stale opportunity workflows should route to Jeff for review and recommended next action, not automatically escalate outreach.

Primary sources:

- HighLevel workflow triggers: https://help.gohighlevel.com/support/solutions/articles/155000002292-a-list-of-workflow-triggers
- Workflow settings: https://help.gohighlevel.com/support/solutions/articles/48001239875-workflow-settings-overview/
- Opportunity created trigger: https://help.gohighlevel.com/support/solutions/articles/155000003499-workflow-trigger-opportunity-created
- Pipeline stage changed trigger: https://help.gohighlevel.com/support/solutions/articles/155000002493-workflow-trigger-pipeline-stage-changed
- Find opportunity: https://help.gohighlevel.com/support/solutions/articles/155000004751-workflow-action-find-opportunity
- Create opportunity: https://help.gohighlevel.com/support/solutions/articles/155000004752-workflow-action-create-opportunity
- Update opportunity: https://help.gohighlevel.com/support/solutions/articles/155000004753-workflow-action-update-opportunity
- Execution logs and enrollment history: https://help.gohighlevel.com/support/solutions/articles/155000003992-workflows-improved-execution-logs-enrollment-history

## Social Planner

Best-practice structure:

- Treat LinkedIn as the main distribution channel for authority, with the firm/company page for institutional credibility and attorney profiles for expert judgment.
- Use categories from day one: AI law update, AI/IP, patent/AI, trade secrets, executive risk, event, attorney POV, evergreen.
- Draft posts two to four weeks ahead, then use HighLevel approvals before scheduling.
- Use external approval links where firm/partner/client sensitivity requires review.
- Maintain a monthly token-health check because LinkedIn tokens can expire.
- Use analytics monthly to review posts, likes, comments, impressions, reach, and channel performance.

Whiteford/Schell IP application:

- HighLevel may manage drafts, categories, approvals, schedules, and analytics.
- Hermes may create proposed LinkedIn posts, comments, and personalized angles.
- Jeff or an authorized human should review and post profile-level LinkedIn material unless a later task explicitly approves a specific publishing action.

Primary sources:

- HighLevel Social Planner setup: https://help.gohighlevel.com/support/solutions/articles/155000005063-getting-started-setup-social-planner
- LinkedIn connection docs: https://help.gohighlevel.com/support/solutions/articles/48001215736
- Social Planner approvals: https://help.gohighlevel.com/support/solutions/articles/48001229834-post-approval-flow-in-social-planner
- External approval flow: https://help.gohighlevel.com/support/solutions/articles/155000007623-external-link-approval-flow-in-social-planner
- Category Queue: https://help.gohighlevel.com/support/solutions/articles/155000005514-social-planner-category-queue
- Best Time to Post: https://help.gohighlevel.com/support/solutions/articles/155000005654-social-planner-best-time-to-post
- Advanced analytics: https://help.gohighlevel.com/support/solutions/articles/155000004101-social-planner-track-social-performance-using-advance-analytics
- LinkedIn API rate limits: https://learn.microsoft.com/en-us/linkedin/shared/api-guide/concepts/rate-limits
- ABA Rule 7.1: https://www.americanbar.org/content/aba-cms-dotorg/en/groups/professional_responsibility/publications/model_rules_of_professional_conduct/rule_7_1_communication_concerning_a_lawyer_s_services/

## Brand Boards

Best-practice structure:

- Use one default Brand Board per campaign/sub-account.
- A Design Kit supports up to 2 logos, 2-10 colors, and 1-5 fonts.
- Only the default Brand Board generally appears in email/page color and font pickers.
- Brand Board colors do not retroactively restyle most existing assets.
- Use Global Custom Colors when a color should sync across reused assets.
- Check WCAG contrast before using brand colors for text or CTA buttons.

Whiteford/Schell IP application:

- Create a `Whiteford + Schell IP` campaign Brand Board if co-branded assets will be recurring.
- Use Whiteford as the lead institutional brand and Schell IP as Jeff's trust bridge.
- Keep the palette restrained:
  - Ink: `#121827`
  - Whiteford deep teal: sample from logo/background
  - Schell IP/authority blue: `#213f77`
  - Gold accent: `#b99057`
  - Paper: `#fffdf8`
  - Border: `#d8d0c3`
  - Muted text: `#5d6678`
- Use approved logo files only. Do not imply a business relationship beyond the actual Whiteford/Schell IP transition and campaign context.

Primary sources:

- Create Brand Board: https://help.gohighlevel.com/support/solutions/articles/155000003136
- Default Brand Board: https://help.gohighlevel.com/support/solutions/articles/155000003138
- Brand Boards in emails: https://help.gohighlevel.com/support/solutions/articles/155000003137-how-to-use-brand-boards-in-emails-
- Global Custom Colors: https://help.gohighlevel.com/support/solutions/articles/155000006500-global-custom-colors-in-color-picker
- Agent Studio Brand Kit: https://help.gohighlevel.com/support/solutions/articles/155000007510-how-to-use-brand-voice-and-brand-kit-in-agent-studio
- WCAG contrast: https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html

## Business-Development Corpus Application

The local business-development corpus was used as synthesis, not quotation. The relevant principles are:

- A lead magnet should solve a narrow, specific problem and attract a buyer who is likely to value the paid next step.
- The thank-you page and first email should immediately fulfill the promise and increase trust.
- The offer should make the next step concrete, bounded, and easier to say yes to.
- Follow-up should diagnose the business problem and show the path to implementation, not merely remind someone to book a call.
- Scarcity and urgency should be used carefully in legal marketing. Use genuine capacity constraints, dated legal-change windows, or implementation timelines, not hype.

Applied to Jeff's offers:

- AI Compliance Gameplan: diagnostic tool -> readiness map -> AI Compliance Readiness Sprint.
- AI Patent Scorecard: diagnostic score -> invention/documentation map -> AI Patent Strategy Sprint.
- Tech GC Checklist: issue inventory -> legal operating review -> OGC Launchpad.
- M&A Readiness Checklist: diligence map -> cleanup roadmap -> Founder M&A Readiness Review.

## Operating Guardrails

- HighLevel can draft, organize, and track, but Growth OS approval should precede sends, workflow activation, social publishing, and live CRM mutation.
- Do not ask users for confidential information in public forms.
- Every public asset needs legal information/no attorney-client relationship language.
- Every marketing email needs unsubscribe/preference handling.
- Every contact enrichment record should capture public source URL, confidence, permission basis, and suppression status.
