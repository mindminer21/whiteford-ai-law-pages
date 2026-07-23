# HighLevel Operations Execution Blueprint

Generated: 2026-05-06
Hermes profile: `highlevel-ops`
HighLevel location: `tm68WWMrcAa3TqQbEAMa`
Pipeline: `Whiteford Schell IP Pipeline` / `Tbx4tA6wHv5lTwZPSHyZ`

## What Was Configured Now

A dedicated Hermes profile was created:

- `/Users/jeff/.hermes/profiles/highlevel-ops/SOUL.md`
- It has the existing Whiteford Schell IP HighLevel credentials copied from `highlevel-campaign`.
- It has the local `business-development-rag` and `qmd` skills available.
- It has shared business-development memory linked at `~/.hermes/profiles/highlevel-ops/memories/MEMORY.md`.

A safe HighLevel operations setup script was added and run:

- Script: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/scripts/ghl_ops_setup.py`
- Dry run: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/highlevel_ops_setup_dryrun.json`
- Apply result: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/highlevel_ops_setup_results.json`
- Verification: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/highlevel_ops_setup_verify.json`

The script created and verified:

- 14 operational tags.
- 13 contact custom fields.
- No contacts, opportunities, messages, campaigns, workflows, or social posts were created or activated.

## HighLevel Operational Tags

| Tag | Purpose |
| --- | --- |
| `ops:approval-required` | A proposed action requires Jeff or human review before execution. |
| `ops:approval-approved` | A proposed action has been approved. |
| `ops:approval-revise` | A proposed action needs changes before approval. |
| `ops:no-auto-send` | Safety marker preventing automatic send/enrollment assumptions. |
| `brand:whiteford-schellip` | Co-branded Whiteford + Schell IP growth asset marker. |
| `workflow:draft-only` | Workflow or sequence is draft-only. |
| `workflow:manual-start` | Workflow or sequence should require manual start/approval. |
| `enrichment:needs-research` | Contact/opportunity needs public-source enrichment. |
| `enrichment:public-source` | Enrichment should be based on public-source evidence. |
| `outreach:personalized-draft-ready` | Personalized outreach/social draft exists for review. |
| `outreach:do-not-send` | No outreach should be sent. |
| `social:linkedin-draft` | LinkedIn/profile/company-page content exists as draft only. |
| `social:attorney-review-required` | Social content needs attorney/legal review. |
| `newsletter:daily-ai-authority` | Daily/recurring AI authority newsletter segment. |

## HighLevel Operational Custom Fields

| Field | Field key | Purpose |
| --- | --- | --- |
| Decision Maker Role | `contact.decision_maker_role` | Role category: founder, CEO, CTO, GC, CFO, COO, HR, investor, etc. |
| Decision Maker Priority | `contact.decision_maker_priority` | Priority level for outreach/review. |
| LinkedIn Profile URL | `contact.linkedin_profile_url` | Public LinkedIn profile URL if known. |
| Enrichment Source URL | `contact.enrichment_source_url` | Public evidence source for enrichment. |
| Enrichment Confidence | `contact.enrichment_confidence` | Confidence score for contact/relevance. |
| Consent Basis | `contact.consent_basis` | Newsletter, existing relationship, public-source research, referral, no consent, etc. |
| Approval Status | `contact.approval_status` | pending, approved, revise, suppressed, no-auto-send. |
| Last Human Review At | `contact.last_human_review_at` | Last human review timestamp. |
| Outreach Hypothesis | `contact.outreach_hypothesis` | Why this person may care about the offer. |
| Personalized Content Angle | `contact.personalized_content_angle` | Draft-specific angle or content hook. |
| LinkedIn Draft Status | `contact.linkedin_draft_status` | none, draft-needed, draft-ready, approved, posted-manual. |
| Suggested Offer Lane | `contact.suggested_offer_lane` | ai-compliance, ai-patent, tech-gc, ma-readiness. |
| Pipeline Next Action | `contact.pipeline_next_action` | Next safe human action. |

## Workflow Library To Build In HighLevel

These workflows should be created manually or through a verified safe API path if one becomes available. Keep every workflow in draft/off/manual-start until QA and approval.

### WF | Intake | AI Compliance Gameplan | Draft

Trigger:
- Form/survey submitted OR tag added `workflow:ai-compliance-readiness`
- Filter by source page `/ai-compliance-gameplan` or `/colorado-ai-compliance-lawyer`

Actions:
- Apply `brand:whiteford-schellip`, `workflow:draft-only`, `ops:approval-required`, and `newsletter:ai` if consent exists.
- Find existing opportunity in `Whiteford Schell IP Pipeline`.
- Create/update opportunity if approved path exists: stage `New Lead`, offer `AI Compliance Readiness Sprint`.
- Send immediate asset-delivery email only after workflow activation approval.
- Create internal task: review AI readiness score and decide whether to invite consult.
- If urgency/high score: internal notification to Jeff.
- Exit on reply, booking, unsubscribe, suppression, or human stage change.

### WF | Intake | AI Patent Strategy Scorecard | Draft

Trigger:
- Form/survey submitted OR tag added `workflow:ai-patent-strategy`
- Filter by source page `/ai-patent-strategy-scorecard`

Actions:
- Apply campaign and safety tags.
- Create/update opportunity: `AI Patent Strategy Sprint`.
- Deliver scorecard result after approval.
- Create internal task: review inventorship, documentation, ownership, and eligibility flags.
- Route high-fit leads to Jeff review.

### WF | Intake | Tech GC Launchpad | Draft

Trigger:
- Form/survey submitted OR tag added `workflow:tech-gc-launchpad`
- Filter by source page `/colorado-tech-general-counsel`

Actions:
- Apply `interest:tech-ogc`, brand and safety tags.
- Create/update opportunity: `Tech Company OGC Launchpad`.
- Create internal task: map needs to Whiteford bench: corporate, employment, contracts, privacy, AI, M&A.
- Exit on booking/reply/suppression.

### WF | Intake | Founder M&A Readiness | Draft

Trigger:
- Form/survey submitted OR tag added `workflow:ma-readiness`
- Filter by source page `/colorado-startup-ma-lawyer`

Actions:
- Apply `interest:ma-readiness`, brand and safety tags.
- Create/update opportunity: `Founder M&A Readiness Review`.
- Create internal task: diligence issue map and likely corporate/M&A support.
- Exit on booking/reply/suppression.

### WF | Pipeline | Stage Change | Internal Review

Trigger:
- `Pipeline Stage Changed`
- Filter: `Whiteford Schell IP Pipeline`

Actions:
- If stage becomes `Jeff / Whiteford Review`, create approval packet.
- If stage becomes `Approved for CRM Sync`, permit safe CRM sync scripts only if approval fields are present.
- If stage becomes `Contacted / Sent`, require evidence of actual human approval.
- If stage becomes `Suppressed / Do Not Contact`, apply `outreach:do-not-send` and exclude from future drafting.

### WF | Opportunity | Stale Lead Review

Trigger:
- Stale opportunities in `New Lead`, `Initial Contact`, `Qualification`, or `Jeff / Whiteford Review`.

Actions:
- Create internal task for Jeff/highlevel-ops.
- Recommend one of: enrich, revise offer lane, draft personalized content, suppress, or schedule manual follow-up.
- Do not auto-send.

### WF | Social | LinkedIn Draft Approval

Trigger:
- Tag added `social:linkedin-draft`

Actions:
- Create attorney review task.
- Store proposed content in Growth OS approval queue or HighLevel note.
- Mark `social:attorney-review-required`.
- Do not publish. Do not message. Do not comment.

## Contact And Opportunity Enrichment Operating Model

Current local Growth OS state:

- `prospects`: seeded companies.
- `opportunities`: company-level opportunities in the Whiteford Schell IP Pipeline.
- `contacts`: empty at the time of this setup.

The enrichment agent should:

1. Start from `opportunities` and `prospects` in `/Users/jeff/.openclaw/projects/mountain-west-growth-os/data/growth-os.sqlite`.
2. Identify target roles by offer lane:
   - AI compliance: CEO, COO, GC, Head of Risk, HR leader, product leader.
   - AI patent: founder, CTO, inventor, head of product, engineering leader.
   - Tech GC: CEO, founder, COO, CFO, head of operations.
   - M&A readiness: CEO, founder, CFO, owner, head of corp dev.
3. Use public sources only: company websites, leadership pages, press releases, Crunchbase-style public profiles, investor portfolio pages, and official LinkedIn profile URLs found through search.
4. Save source URL, confidence, role, offer lane, and outreach hypothesis.
5. Generate draft content angles and LinkedIn/post/email copy for approval.
6. Never message, connect, scrape, or post automatically.

## Social And Personalized Content Operating Model

The agent may draft:

- LinkedIn post/comment ideas for Jeff to publish manually.
- Company-page post drafts for HighLevel Social Planner approval.
- Short personalized educational notes tied to a public company milestone.
- Suggested article/video/lead-magnet to send after approval.

The agent must not:

- Post on a person's LinkedIn profile.
- Send LinkedIn DMs.
- Auto-comment.
- Use automation that violates platform terms.
- Imply legal advice or an attorney-client relationship.

## Daily Optimization Digest

Daily output should include:

1. Top 5 improvement recommendations.
2. New or stale opportunities needing human action.
3. Contacts needing enrichment or suppression.
4. Draft content ready for review.
5. HighLevel configuration risks: broken links, token health, missing approvals, deliverability, workflow QA.
6. One proposed next Kanban task per major blocker.

The digest should be advisory only. It should not execute sends, workflow activation, social publishing, or live CRM mutation.

## Immediate Next Approval Decisions

1. Confirm whether `Whiteford + Schell IP` should be the default Brand Board for the GHL location or only for these campaign assets.
2. Confirm Jeff's preferred consultation/calendar URL for CTAs.
3. Approve manual creation of draft/off workflows listed above.
4. Approve public-source enrichment research for the 28 seeded opportunities.
5. Decide whether HighLevel Social Planner should connect Jeff's LinkedIn profile, the Whiteford company page, both, or neither for now.
