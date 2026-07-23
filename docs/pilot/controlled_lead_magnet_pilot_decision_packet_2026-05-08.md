# Controlled Lead-Magnet Pilot Decision Packet — 2026-05-08

Task: `t_db1588cc`
Tenant: `whiteford-mountain-west`
Workspace: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages`
Status: internal decision packet only. No public launch, live HighLevel activation, email send, workflow enrollment, CRM mutation, Supabase DDL, Clio write, LinkedIn/social/ad action, or client/prospect-facing action is approved by this packet.

## Executive decision

Recommendation: choose Tech Company Legal Health Checklist as the next safest controlled lead-magnet pilot lane, limited to internal/local or preview QA only.

Why: the Tech GC checklist solves the broadest narrow problem for the target buyer: “What legal operating cleanup priority should a growing technology company address before the next business milestone?” It delivers useful diagnostic value without making compliance, patentability, transaction, financing, or legal-risk conclusions. It also naturally routes interested, opted-in users to a bounded next offer: Tech Company OGC Launchpad.

AI Compliance Gameplan Builder should remain the backup lane, not the first controlled pilot, unless Jeff specifically wants to prioritize AI governance urgency over lower current-law sensitivity. AI Compliance is timely and valuable, but it carries higher legal/current-law review burden and should not move first until Jeff/Whiteford is ready to review the Colorado/Mountain West/current-law posture and final copy.

Business-development principle applied: the lead magnet should solve one narrow problem completely enough to earn engaged time now. The funnel should deliver the promised result first, then use consented follow-up to diagnose timing/pain and route to a specific next offer without hype, pressure, or legal-risk guarantees.

## No-send / no-enroll / no-publish safety gate

Hard gate: this packet authorizes internal documentation and decision review only.

Do not do any of the following from this packet:

1. Do not activate, publish, manually start, or test-run any HighLevel workflow.
2. Do not enroll any contact in automation.
3. Do not send email, SMS, DM, voicemail, LinkedIn message, social post, ad, or newsletter.
4. Do not add production HighLevel credentials or mutate production environment variables.
5. Do not create, update, tag, or move live HighLevel contacts/opportunities, except under a later separate Jeff-approved TEST-record scope.
6. Do not publish or change public/client-facing pages, posts, forms, campaigns, or ads.
7. Do not write to Clio.
8. Do not run Supabase DDL or mutate Supabase rows from this packet.
9. Do not use real prospects, imported/researched contacts, clients, or third-party contacts in the pilot.
10. Do not treat preview email-sequence output as send authorization.

## Lane decision matrix

| Decision field | Tech Company Legal Health Checklist — recommended first lane | AI Compliance Gameplan Builder — backup lane |
| --- | --- | --- |
| Audience / dream customer | Founder, CEO, COO, CFO, GC, CTO, product/ops leader at a growing Mountain West technology company approaching enterprise sales, hiring, financing, AI/data expansion, partnership, or diligence pressure. | Founder, CEO, GC, CTO, product, security, compliance, HR, or ops leader at a company using or shipping AI and needing a practical AI governance readiness map. |
| Core pain | Legal work is scattered across contracts, IP ownership, hiring/contractor records, privacy/security, AI/data, corporate records, and diligence readiness; leadership does not know which cleanup item matters first. | AI use is expanding faster than inventory, vendor review, data maps, human review, notices, records, governance ownership, and Colorado/Mountain West current-law tracking. |
| Desired outcome | A practical legal health score, category map, top cleanup priorities, and a next-milestone-based 10-day starting point. | AI governance maturity/readiness band, heat map, 10-day fixes, and a 30/60/90-day operating roadmap. |
| Lead magnet / offer | Tech Company Legal Health Checklist → Tech Company OGC Launchpad. | AI Compliance Gameplan Builder → AI Compliance Readiness Sprint. |
| Landing-page CTA | “Get your Tech Company Legal Health Checklist” / “Review the Tech Company OGC Launchpad” after value is delivered. Route: `/colorado-tech-general-counsel#lead-magnet`. | “Build your AI Compliance Gameplan” / “Request AI Compliance Readiness Sprint review” after value is delivered. Route: `/ai-compliance-gameplan`. |
| HighLevel tag | `workflow:tech-gc-launchpad` only after affirmative Tech GC opt-in; source tags `leadmagnet:tech-gc-checklist`, `interest:tech-ogc`, `newsletter:ai` after opt-in. | `workflow:ai-compliance-readiness` only after affirmative AI Compliance opt-in; source tags `leadmagnet:ai-compliance-gameplan`, `interest:ai-compliance`, `newsletter:ai` after opt-in. |
| Email sequence angle | 3-part educational sequence: immediate checklist/report fulfillment; Day 2 score interpretation tied to next milestone; Day 6/9 one top-gap education plus bounded OGC Launchpad CTA. | 4-part educational sequence: immediate gameplan/report fulfillment; Day 2 readiness/heat-map interpretation; Day 5 highest-priority AI governance workstream / 10-day fix; Day 9 bounded Readiness Sprint CTA. |
| Legal / ethics caveat | Educational readiness snapshot only; no legal advice, no attorney-client relationship, no confidential information, no guarantee of compliance, enforceability, financing, transaction, patent, valuation, customer acceptance, speed, or risk reduction. | Educational AI governance readiness snapshot only; no legal advice, no compliance determination/certification, no guarantee of compliance/risk reduction/customer/regulator acceptance, no confidential or regulated facts, current-law review required before public use. |
| Next measurable action | Jeff approves or rejects Tech GC as the internal local/preview QA lane; if approved, create a dated no-token QA evidence folder and run only local/preview API/browser checks with no live HighLevel writes. | Jeff either holds AI Compliance as backup or explicitly approves it as first lane; if selected, require current-law/copy review and AI Compliance-specific guard evidence before any local/preview QA expansion. |

## What is already internally ready

1. Lead-magnet strategy: the opt-in-only rule is documented in `docs/lead_magnet_opt_in_and_app_strategy.md`.
2. Consent invariant: `/api/leads` is documented as adding workflow trigger tags only when `contact.subscribe === true`; non-opted submissions remain `newsletter:not-consented`, `Consent Basis = no_email_opt_in`, and `Approval Status = no-auto-send`.
3. Recommended first lane evidence: prior approval packet `docs/controlled_pilot_approval_packet_tech_gc_default_2026-05-07.md` recommends Tech GC as broadest/lower-risk first lane.
4. Local/staging hardening evidence: `docs/lead_magnet_pilot_hardening_launch_gate_review_2026-05-07.md` says server-side guardrail/test blockers are closed for local/internal QA preparation.
5. Tech GC app/copy artifacts: the Tech GC checklist app, non-subscriber on-page value direction, and draft fulfillment/nurture copy exist for internal review.
6. AI Compliance app/copy artifacts: the AI Compliance Gameplan Builder has shared guardrail parity and draft fulfillment/nurture copy for review.
7. Workflow safety posture: read-only evidence has treated all four intake workflows as Draft/Off; that is safety-positive.
8. Non-subscriber default: latest Tech GC approval-prep review supports on-page-only educational value as the safest default, with no report email/nurture for non-subscribers.
9. HighLevel tags and lane mappings exist in the campaign implementation plan.
10. Deliverability/legal caveats are already reflected in draft copy packets, but remain review-only.

## What still requires Jeff / Whiteford / legal review

1. Jeff lane decision: approve Tech GC as first lane, approve AI Compliance instead, or hold both.
2. HighLevel field path: approve manual creation of the 31 missing guardrail/mapped Contact fields, request edits, request a dry-run-first script packet, or hold.
3. 37/37 read-only HighLevel field verification after any approved field remediation.
4. Workflow guard evidence: current UI/read-only evidence that selected workflow remains Draft/Off and that message steps cannot proceed without opt-in, consent basis, suppression clearance, disclaimer/version/input-type, source-route, and approval-status guards.
5. Non-subscriber policy: confirm Tech GC default remains on-page-only educational value with no outbound fulfillment and no automatic attorney-review task.
6. Exact public/app/report/email copy approval, including Whiteford/Schell IP co-branding, no-attorney-client language, no-confidential-info language, privacy policy posture, footer/address, unsubscribe/preferences, sender identity, and approved calendar URL.
7. AI Compliance current-law review if AI Compliance moves forward: Colorado/Mountain West AI, privacy, employment/HR AI, consumer protection, vendor/data, and recordkeeping references.
8. Production env decision: keep production without live HighLevel credentials unless a separate TEST-record packet approves env scope, duration, rollback, records, and evidence capture.
9. Any live Jeff-owned TEST-record write scope, if later needed.
10. Separate activation packet before any workflow activation, contact enrollment, external send, public page publication, social/LinkedIn/ad action, Clio write, or client/prospect-facing step.

## Recommended controlled-pilot path

### Step 1 — Morning decision only

Jeff reviews this packet and chooses one of three options:

- Option A: Approve Tech GC for local/preview internal QA only.
- Option B: Approve AI Compliance instead, with current-law/copy review as the primary gate.
- Option C: Hold both until HighLevel fields, workflow guard evidence, and copy/legal review are complete.

Default recommendation: Option A, with no live HighLevel write and no activation.

### Step 2 — If Tech GC is approved

Next worker should prepare a dated internal QA evidence folder and run only local/preview checks:

- Browser route review: `/colorado-tech-general-counsel#lead-magnet`.
- Confirm partial value is visible before opt-in.
- Confirm opt-in checkbox is unchecked by default.
- Confirm non-confidential categorical input posture.
- Confirm no-send/no-enroll/no-publish language in the evidence note.
- Run no-token `/api/leads` matrix for opted-in, non-opted, missing disclaimer, wrong guardrail version, oversized/free-text payload, and malicious client workflow tags.

Do not write to live HighLevel unless Jeff later approves exact TEST records and env scope.

### Step 3 — If AI Compliance is approved instead

Before QA expansion, require a tighter review packet that confirms:

- Final AI Compliance current-law/source posture.
- AI Compliance email/report copy caveats and score-band language.
- No compliance determination, certification, or risk-reduction guarantee.
- HighLevel fields for AI maturity, heat map, 10-day fixes, 30/60/90 roadmap, report version, submitted-at, and guardrail metadata.
- Workflow guard evidence for `workflow:ai-compliance-readiness` while Draft/Off.

## Morning checklist — Jeff approve or reject

1. [ ] Choose first pilot lane: Tech GC recommended; AI Compliance only if current-law urgency outweighs lower-risk sequencing.
2. [ ] Confirm pilot mode: local/preview internal QA only; no live HighLevel writes.
3. [ ] Confirm non-subscriber policy: on-page-only educational value; no transactional/report email; no nurture; no automatic attorney task.
4. [ ] Confirm opt-in rule: workflow tags and nurture only after lane-specific affirmative opt-in.
5. [ ] Confirm production env rule: do not add `GHL_PRIVATE_INTEGRATION_TOKEN` or `GHL_LOCATION_ID` to production from this packet.
6. [ ] Decide HighLevel field path: approve manual 31-field creation, request edits, request script packet, or hold.
7. [ ] Require 37/37 read-only field verification before relying on live HighLevel field mapping.
8. [ ] Require selected workflow Draft/Off UI guard evidence before any future activation/test-record packet.
9. [ ] Assign copy/legal/privacy/current-law review owner for selected lane before public use or send.
10. [ ] Confirm no-send/no-enroll/no-publish boundary: no external or live-system action until a separate activation or TEST-record packet is approved.

## Decision log

| Decision | Recommendation | Rationale | Status |
| --- | --- | --- | --- |
| First controlled-pilot lane | Tech GC | Broadest target audience, lower current-law sensitivity, clear business milestone framing, existing non-subscriber on-page value direction. | Pending Jeff decision. |
| Backup lane | AI Compliance | Timely and valuable, but higher current-law/legal-copy review burden. | Hold unless Jeff selects it. |
| Non-subscriber fulfillment | On-page-only value | Delivers promised educational value without forcing marketing consent or creating outbound transactional-send risk. | Pending Jeff confirmation. |
| HighLevel posture | Draft/Off, read-only verification first | Missing fields and UI guard evidence still block live reliance. | Pending field/guard path. |
| External activation | Separate packet only | This packet is no-send/no-enroll/no-publish. | Not approved. |

## Source anchors reviewed

- `docs/lead_magnet_opt_in_and_app_strategy.md`
- `docs/lead_magnet_pilot_hardening_launch_gate_review_2026-05-07.md`
- `docs/final_pilot_readiness_report_t_8640b54c.md`
- `docs/highlevel_campaign_implementation_plan.md`
- `docs/controlled_pilot_approval_packet_tech_gc_default_2026-05-07.md`
- `docs/tech_gc_approval_prep_review_2026-05-08.md`
- `docs/tech_gc_legal_health_checklist_fulfillment_nurture_copy_2026-05-07.md`
- `docs/ai_compliance_gameplan_fulfillment_nurture_copy_2026-05-07.md`
- Local business-development corpus query on lead-magnet opt-in/trust/narrow diagnostic principles, used only as synthesis.
