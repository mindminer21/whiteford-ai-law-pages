# Whiteford/Schell IP Lead Magnet Opt-In and App Strategy

Generated: 2026-05-06
Location: Whiteford Schell IP (`tm68WWMrcAa3TqQbEAMa`)

## Operating Decision

The four HighLevel offer-lane workflows may send email sequences only when a prospect affirmatively opts into the matching lead-magnet email path. A researched, imported, enriched, or manually added prospect must not receive a nurture workflow trigger tag unless that prospect separately opted in through the relevant lead magnet or Jeff gives exact current approval for a different compliant outreach path.

The website/API now enforces this rule:

- If `contact.subscribe === true`, `/api/leads` adds the matching `workflow:*` tag and `newsletter:ai`.
- If `contact.subscribe !== true`, `/api/leads` does not add any workflow trigger tag, adds `newsletter:not-consented`, sets `Consent Basis = no_email_opt_in`, and sets `Approval Status = no-auto-send`.

## Required HighLevel Trigger Rule

Each workflow trigger should remain narrow:

| Lane | Lead Magnet | Trigger Tag Added Only After Opt-In |
| --- | --- | --- |
| AI Compliance | AI Compliance Gameplan Builder | `workflow:ai-compliance-readiness` |
| AI Patent | AI Patent Strategy Scorecard | `workflow:ai-patent-strategy` |
| Tech GC | Tech Company Legal Health Checklist | `workflow:tech-gc-launchpad` |
| M&A Readiness | Founder M&A Readiness Checklist | `workflow:ma-readiness` |

Every workflow must also check or preserve:

- `newsletter:ai` present.
- `Consent Basis` starts with `lead_magnet_email_opt_in:`.
- No `newsletter:not-consented`.
- No `outreach:do-not-send`.
- No DND/unsubscribe/suppression.
- `Approval Status` is not `no-auto-send`, `suppressed`, or `revise`.

## App Lead Magnet Pattern

The highest-value lead magnets should be lightweight advisory webapps, not static PDFs. Each should let the prospect answer a small number of non-confidential questions, see a useful partial result, and opt in to receive the full report and follow-up sequence.

The pattern:

1. Ask 6-10 non-confidential diagnostic questions.
2. Show partial value before the gate: score band, top 2 risks, and likely next step.
3. Gate the full personalized report behind business email and an unchecked opt-in box.
4. Store source route, lead magnet, campaign key, score, answers, consent basis, and recommended offer in HighLevel.
5. Trigger the lane-specific workflow only if the opt-in box is checked.
6. Deliver the promised result first; use later emails to educate and qualify.
7. Route high-fit/high-urgency leads to a bounded productized review, not a generic consultation.

## LinkedIn Awareness Post Requirement

Every offer-lane strategy and Agent Targeting packet should include at least one draft LinkedIn awareness post modeled on Jeff's public educational style: a sourced company event, company/key-contact tag candidate, concise business insight, audience-specific implications, and a soft CTA to the relevant lead magnet.

This is a draft-only asset until Jeff approves exact copy, tag handles, source grounding, timing, and channel. Agents may prepare the post and queue it for review, but must not publish, schedule, tag, comment, DM, connect, or automate LinkedIn activity.

Control spec:

- `docs/targeted_linkedin_awareness_post_strategy.md`

Required routing:

- AI Patent posts should point to `/ai-patent-strategy-scorecard`.
- AI Compliance posts should point to `/ai-compliance-gameplan`.
- Tech GC posts should point to `/colorado-tech-general-counsel`.
- Founder M&A posts should point to `/colorado-startup-ma-lawyer`.

## Four App Concepts

### 1. Tech Company Legal Health Checklist

Priority: build first. It is broad, low-risk, useful to every target buyer, and can route into the other three lanes.

Inputs:

- Company stage.
- Existing outside counsel or no counsel.
- Contract stack maturity.
- IP assignment status.
- Employment/contractor hygiene.
- Privacy/security posture.
- AI/data usage.
- Financing or enterprise customer pressure.

Output:

- Legal health score by category.
- Top 5 cleanup actions.
- Suggested offer: Tech Company OGC Launchpad.
- Branch recommendations into AI Compliance, AI Patent, or M&A Readiness when answers justify it.

### 2. AI Compliance Gameplan Builder

Priority: second. Timely and urgent for Colorado/Mountain West companies using AI.

Inputs:

- AI use case category.
- Consequential decision exposure.
- Vendor/data posture.
- Human review.
- Notices and records.
- Governance owner.
- Testing/audit process.

Output:

- AI governance maturity level.
- Readiness heat map.
- 10-day fixes and 30/60/90-day roadmap.
- Suggested offer: AI Compliance Readiness Sprint.

### 3. Founder M&A Readiness Checklist

Priority: third. Strong for high-intent founders and CFOs.

Inputs:

- Exit/investment timing.
- Corporate records.
- IP ownership.
- Customer/vendor assignability.
- Employment/contractor cleanup.
- AI/data/privacy diligence.
- Disputes or concentration risk.

Output:

- Buyer diligence risk map.
- 60-day cleanup plan.
- Suggested offer: Founder M&A Readiness Review.

### 4. AI Patent Strategy Scorecard

Priority: fourth. Specialized and high-intent.

Inputs:

- Product stage.
- Human contribution documentation.
- Prototype/notebook records.
- AI vendor terms.
- Technical differentiator.
- Disclosure timing.
- Trade secret versus patent posture.

Output:

- Patent strategy readiness score.
- Documentation and ownership gap map.
- Suggested offer: AI Patent Strategy Sprint.

## Email Sequence Standard

Use the four existing draft email assets per lane, but only after workflow QA confirms opt-in gating:

1. Immediate fulfillment email: deliver the promised report/checklist and non-advice limits.
2. Day 2: explain how to interpret the score.
3. Day 5: focus on the highest-priority risk/gap.
4. Day 9: bounded CTA to productized review/sprint.

Optional Day 16 close-loop can be added later after deliverability and engagement data exists.

## Legal, Ethics, and Privacy Guardrails

- This is educational information only.
- No attorney-client relationship is formed by using a tool, downloading a report, or submitting a public form.
- Do not request confidential facts, adverse-party names, exact claim charts, private transaction counterparties, or sensitive employment/financial details in the public app.
- Do not promise compliance, patentability, valuation impact, transaction outcomes, or risk elimination.
- SMS remains off unless separately approved with documented SMS consent and opt-out language.
- Every email must include truthful sender/subject information, a physical mailing address/footer, and working unsubscribe/preference handling before activation.

## Hermes / Kanban Execution Plan

Create the following tasks:

1. Research and benchmark interactive legal/professional-services lead magnets.
2. Specify the Tech Company Legal Health Checklist app.
3. Upgrade AI Compliance Gameplan Builder opt-in UX and report output.
4. Specify Founder M&A Readiness app.
5. Specify AI Patent Strategy Scorecard app improvements.
6. Map all four apps to HighLevel fields, tags, consent gates, and workflow triggers.
7. Browser-configure HighLevel workflows so email sequence branches require opt-in evidence.
8. Review legal ethics, privacy, and marketing claims before activation.

No workflow activation, external send, or public publishing occurs until Jeff approves the exact final workflow and copy.
