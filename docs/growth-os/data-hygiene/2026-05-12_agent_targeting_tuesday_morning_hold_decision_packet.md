# Agent Targeting Tuesday-morning HOLD decision packet — 2026-05-12

Task: `t_bf27ecdb`
Tenant: `whiteford-mountain-west`
Status: INTERNAL / LOCAL / READ-ONLY / NO-MUTATION REVIEW PACKET
Prepared: 2026-05-12 Tuesday morning MDT

## Hard boundary

This is a narrow Jeff/Whiteford decision packet for the highest-risk Agent Targeting data-hygiene holds. It does not authorize SQLite, Supabase, HighLevel, Clio, CRM, workflow, source-access, contact-enrichment, outreach, email/SMS/social/LinkedIn/YouTube/ad, public, client-facing, prospect-facing, or legal-client action.

Every recommendation below is HOLD. The only copy/paste language provided is for approving read-only source review or preparation of a future exact row-level packet. It is not mutation language.

## Narrow useful problem

Before any broader campaign, lead magnet, or outreach ask, decide the five highest-risk data-hygiene holds one at a time. The useful asset here is not a campaign draft; it is a ranked decision queue that prevents bad local records, orphan HighLevel rows, suspect contacts, or department emails from contaminating later exact approval packets.

## Evidence paths used

No public-source browsing, enrichment, CRM mutation, HighLevel action, Clio action, workflow action, or outreach was performed for this packet. Evidence was limited to local plans and read-only local SQLite inspection.

Primary local plans:
- `docs/growth-os/data-hygiene/2026-05-11_agent_targeting_lifecycle_reconciliation_plan.md`
- `docs/growth-os/data-hygiene/2026-05-11_offer_contact_mapping_remediation_plan.md`
- `docs/growth-os/data-hygiene/2026-05-11_duplicate_lifecycle_future_approval_packet.md`
- `docs/highlevel_campaign_implementation_plan.md`

Local read-only database evidence:
- `/Users/jeff/.openclaw/projects/mountain-west-growth-os/data/growth-os.sqlite`
- Read-only mode used for spot verification: `file:/Users/jeff/.openclaw/projects/mountain-west-growth-os/data/growth-os.sqlite?mode=ro&immutable=1` with `PRAGMA query_only=ON`

Sereact payload evidence path from parent plans:
- `/Users/jeff/.openclaw/projects/mountain-west-growth-os/logs/ghl-stage-poller/ghl-stage-hUevEZZwjvyALchVzSzv-2026-05-10T18-32-02-464Z-payload.json`

HighLevel campaign guardrail context:
- Workflows remain manual draft/off until approved.
- Trigger tags and lead-magnet lanes exist as implementation context only; they do not authorize audience use, workflow enrollment, or sends.
- Relevant lanes: `ai-patent`, `ai-compliance`, `tech-gc`.

## Ranked next 5 no-mutation human decisions

| Rank | Decision | Why it is high risk | Recommended posture | Human decision needed now |
| --- | --- | --- | --- | --- |
| 1 | Sereact orphan/quarantine | A null-company/orphan HighLevel opportunity is marked `targeting-packet-ready` while local Sereact lifecycle rows remain unresolved and uncleared. | HOLD / quarantine | Decide whether to approve read-only source review and preparation of a future exact Sereact lifecycle packet. Do not treat the orphan row as packet-ready. |
| 2 | AION missing offer/contact placeholder | Same prospect has one research-staged row with `offer_id=ai-patent` and contact, plus a HighLevel Agent Targeting placeholder missing both `offer_id` and `contact_id`. | HOLD | Decide whether to prepare a future exact AION opportunity-reconciliation packet; do not auto-fill the placeholder. |
| 3 | Rigetti suspect contact | Research-staged opportunity points to suspect contact `Sub cool`; secondary CFO row is incomplete; Agent Targeting row lacks contact. | HOLD | Decide whether to approve source review/contact suppression-replacement review before any lifecycle packet. |
| 4 | Nexar duplicate/company-vs-person contact | Duplicate Saurav Gupta rows exist; one contact uses a company LinkedIn URL where person-level evidence is required; Agent Targeting row lacks contact. | HOLD | Decide whether to approve duplicate contact/entity-source review before any lifecycle packet. |
| 5 | Flatfile/Obvious naming/department-email issue | Company naming/rebrand posture is unresolved and local contact set includes a department PR email that is not a decision-maker contact. | HOLD | Decide whether to approve naming/person-contact review before any lifecycle packet. |

## Decision 1 — Sereact orphan/quarantine

### Exact local row IDs

- Prospect row: `prospect_ef30df45ad62c93981758ca3` / Sereact.
- Research-staged opportunity: `opp_7aaf67df3d4d774803c8607d`; `stage=research_staged`; `offer_id=ai-patent`; `contact_id=contact_be2ee5a1d75bffb184f923c5`.
- Agent Targeting opportunity: `ghl-agent-targeting-prospect_ef30df45ad62c93981758ca3`; `stage=agent-targeting`; `offer_id=ai-patent`; missing `contact_id`.
- Orphan/null-company HighLevel opportunity: `ghl-opp-hUevEZZwjvyALchVzSzv`; `prospect_id=ghl-prospect-hUevEZZwjvyALchVzSzv`; no matching local prospect row found; `stage=targeting-packet-ready`; missing company, `offer_id`, and `contact_id`.
- Work item: `work-ghl-stage-hUevEZZwjvyALchVzSzv-2026-05-10T18-32-02-464Z`; `stage=queued`; `risk=high`; `approval_required=1`; `external_action_allowed=0`.
- Contact rows: `contact_be2ee5a1d75bffb184f923c5` / Dr. Ralf Gulde / CEO / confidence 65 / no email / no LinkedIn / Instagram-source-only; `contact_44ef39121d6425c00cb55936` / Marc Tuscher / CTO / confidence 65 / no email / no LinkedIn / Instagram-source-only.
- Suppression check: `suppress_7ea545e06cad606889f750d4`; draft `draft_6c7ea9b4b76cc04ba5ff7819`; `final_clearance=not_cleared`; conflicts `required_before_send`; local suppression, Clio, opt-out, and duplicate/prior-touch `not_checked`.
- GHL payload path: `/Users/jeff/.openclaw/projects/mountain-west-growth-os/logs/ghl-stage-poller/ghl-stage-hUevEZZwjvyALchVzSzv-2026-05-10T18-32-02-464Z-payload.json`.

### HOLD recommendation

Keep Sereact quarantined. Do not use `targeting-packet-ready` as a reliable state. Do not link the orphan opportunity to the local Sereact prospect, close/archive it, rename it, fill missing fields, move stage, or prepare external collateral until a future exact packet is approved.

### Missing evidence

- Current-source confirmation of official Sereact identity/domain and whether `sereact.ai`, `sereact.de`, or another domain is controlling for this packet.
- Jeff decision on international/non-Mountain-West targeting scope.
- Official/current person-level evidence for Dr. Ralf Gulde and Marc Tuscher.
- Exact HighLevel row evidence for the orphan opportunity and contact `1a2gBW9IhpZfgnh6bT2K` from the payload.
- Suppression, opt-out, Whiteford conflicts, local Clio/adverse-party, duplicate/prior-touch, brand, and attorney-review clearance.

### Copy/paste approval language — source review / packet prep only

```text
Approved for read-only Sereact source review and preparation of a future exact lifecycle reconciliation packet only. Scope is limited to comparing `ghl-opp-hUevEZZwjvyALchVzSzv`, `ghl-agent-targeting-prospect_ef30df45ad62c93981758ca3`, `opp_7aaf67df3d4d774803c8607d`, related contact rows, the cited GHL payload, and clearance evidence. No SQLite/Supabase/HighLevel/Clio mutation, no contact enrichment that writes data, no outreach, no workflow enrollment, no social/LinkedIn/public use, and no client/prospect-facing copy is approved.
```

## Decision 2 — AION missing offer/contact placeholder

### Exact local row IDs

- Prospect row: `prospect_089c4bc541c05da752169c7a` / AION Robotics Corporation.
- Research-staged opportunity: `opp_8b9cb9cb94b88f73b74b7064`; `stage=research_staged`; `offer_id=ai-patent`; `contact_id=contact_14b42eb2f15da73c52694fcb`.
- HighLevel Agent Targeting placeholder: `ghl-lead-prospect_089c4bc541c05da752169c7a`; `stage=agent-targeting`; missing `offer_id`; missing `contact_id`; `source=gohighlevel`.
- Contact row: `contact_14b42eb2f15da73c52694fcb` / Nicholas Nunno / CEO-Founder-Product Architect; email, LinkedIn, and phone present; confidence 72; suppression `not_checked`.
- Suppression check: `suppress_7605e2e8ab3ca93b488624ed`; draft `draft_58482b23881d3aa940dfc4c1`; `final_clearance=not_cleared`; conflicts `required_before_send`; local suppression, Clio, opt-out, and duplicate/prior-touch `not_checked`.

### HOLD recommendation

Keep the placeholder held. Do not infer `offer_id=ai-patent` or `contact_id=contact_14b42eb2f15da73c52694fcb` from the research-staged row. Treat it as an opportunity-reconciliation duplicate risk, not as a prospect duplicate to be resolved casually.

### Missing evidence

- Exact decision on whether the HighLevel placeholder represents the same lifecycle as the research-staged opportunity.
- Current-source review of AION company/person facts and current role.
- Contact-quality decision for Nicholas Nunno despite populated fields.
- Suppression, opt-out, Whiteford conflicts, local Clio/adverse-party, duplicate/prior-touch, brand, and attorney-review clearance.
- Exact rollback/undo and read-only verification plan for any future mutation packet.

### Copy/paste approval language — source review / packet prep only

```text
Approved for read-only AION opportunity-reconciliation packet preparation only. Scope is limited to comparing `opp_8b9cb9cb94b88f73b74b7064`, `ghl-lead-prospect_089c4bc541c05da752169c7a`, `prospect_089c4bc541c05da752169c7a`, `contact_14b42eb2f15da73c52694fcb`, and clearance evidence. Do not fill missing `offer_id` or `contact_id`, do not move lifecycle stage, do not mutate SQLite/Supabase/HighLevel/Clio, and do not contact or message anyone.
```

## Decision 3 — Rigetti suspect contact

### Exact local row IDs

- Prospect row: `prospect_d249372d03e9b2df1dd67726` / Rigetti Computing.
- Research-staged opportunity: `opp_1d79b1a5b3897c337a3f43be`; `stage=research_staged`; `offer_id=ai-patent`; `contact_id=contact_87a4528f8034e072e84af395`.
- Agent Targeting opportunity: `ghl-agent-targeting-prospect_d249372d03e9b2df1dd67726`; `stage=agent-targeting`; `offer_id=ai-patent`; missing `contact_id`.
- Suspect contact row: `contact_87a4528f8034e072e84af395` / `Sub cool` / CEO / LinkedIn `https://www.linkedin.com/in/supercool` / confidence 60 / suppression `not_checked`.
- Secondary contact row to review separately: `contact_e5358ebe2bf6f9959920e19f` / Rob Mortensen / CFO / no email / no LinkedIn / confidence 55 / suppression `not_checked`.
- Suppression check: `suppress_8453219f60e43caecdb048ab`; draft `draft_beb7a04cd418d728e5fc451a`; `final_clearance=not_cleared`; conflicts `required_before_send`; local suppression, Clio, opt-out, and duplicate/prior-touch `not_checked`.

### HOLD recommendation

Keep Rigetti held. The suspect `Sub cool` contact should not be linked to the Agent Targeting row, used externally, or treated as packet-ready. Review whether the suspect row should be suppressed, replaced, or kept only as a bad-data example before any lifecycle reconciliation.

### Missing evidence

- Official/current leadership source confirming valid person-level decision-maker identity.
- Decision whether `contact_87a4528f8034e072e84af395` should be suppressed, replaced, archived, or marked internal-reference-only.
- Decision whether `contact_e5358ebe2bf6f9959920e19f` is a valid secondary contact or should remain held.
- Suppression, opt-out, Whiteford conflicts, local Clio/adverse-party, duplicate/prior-touch, brand, and attorney-review clearance.

### Copy/paste approval language — source review / packet prep only

```text
Approved for read-only Rigetti contact-quality review and future packet preparation only. Scope is limited to verifying whether `contact_87a4528f8034e072e84af395` should be suppressed/replaced, separately reviewing `contact_e5358ebe2bf6f9959920e19f`, and comparing `opp_1d79b1a5b3897c337a3f43be` with `ghl-agent-targeting-prospect_d249372d03e9b2df1dd67726`. No contact linking, no data mutation, no enrichment writeback, no outreach, and no external use is approved.
```

## Decision 4 — Nexar duplicate/company-vs-person contact

### Exact local row IDs

- Prospect row: `prospect_c542c95f73995e2dbd2a15c3` / Nexar.
- Research-staged opportunity: `opp_a506b58fff7a549c6030f18f`; `stage=research_staged`; `offer_id=ai-compliance`; `contact_id=contact_f4aee748a54b4db92013be70`.
- Agent Targeting opportunity: `ghl-agent-targeting-prospect_c542c95f73995e2dbd2a15c3`; `stage=agent-targeting`; `offer_id=ai-compliance`; missing `contact_id`.
- Candidate contact row 1: `contact_f4aee748a54b4db92013be70` / Saurav Gupta / CEO-Co-founder / LinkedIn `https://www.linkedin.com/company/nexar` / confidence 65 / suppression `not_checked`.
- Candidate contact row 2: `contact_f23d2a57ec5c1b0565f188a4` / Saurav Gupta / CEO / no email / no LinkedIn / confidence 62 / suppression `not_checked`.
- Suppression check: `suppress_4e41e4854d6671cebf3e8f03`; draft `draft_e8a16edaa16c1051d8fa867b`; `final_clearance=not_cleared`; conflicts `required_before_send`; local suppression, Clio, opt-out, and duplicate/prior-touch `not_checked`.

### HOLD recommendation

Keep Nexar held. Do not treat a company LinkedIn URL as person-level evidence. Do not link either duplicate Saurav Gupta row to the Agent Targeting opportunity until current entity/source and contact identity are resolved.

### Missing evidence

- Official/current source confirming correct Nexar entity/domain and Saurav Gupta role.
- Person-level LinkedIn or other approved person-level evidence if a contact link is ever proposed.
- Duplicate-contact decision: keep one, suppress one, replace both, or mark internal-reference-only.
- Suppression, opt-out, Whiteford conflicts, local Clio/adverse-party, duplicate/prior-touch, brand, and attorney-review clearance.

### Copy/paste approval language — source review / packet prep only

```text
Approved for read-only Nexar duplicate contact/entity-source review and future packet preparation only. Scope is limited to comparing `contact_f4aee748a54b4db92013be70`, `contact_f23d2a57ec5c1b0565f188a4`, `opp_a506b58fff7a549c6030f18f`, and `ghl-agent-targeting-prospect_c542c95f73995e2dbd2a15c3`. Do not link a contact, do not treat a company LinkedIn URL as person-level evidence, do not mutate any system, and do not initiate outreach or workflow action.
```

## Decision 5 — Flatfile/Obvious naming/department-email issue

### Exact local row IDs

- Prospect row: `prospect_bea9dbd287cb8fcf077720d0` / `Flatfile (also rebranded company name: Obvious)`.
- Research-staged opportunity: `opp_8a46a832f79bb082853b7f8d`; `stage=research_staged`; `offer_id=tech-gc`; `contact_id=contact_01092cd32c14e0196826c3cf`.
- Agent Targeting opportunity: `ghl-agent-targeting-prospect_bea9dbd287cb8fcf077720d0`; `stage=agent-targeting`; `offer_id=tech-gc`; missing `contact_id`.
- Person candidate: `contact_01092cd32c14e0196826c3cf` / David Boskovic / Founder & CEO / no email / no LinkedIn / confidence 80 / suppression `not_checked`.
- Department email row: `contact_9119665bd6e83c1b8387d00e` / `pr@flatfile.com` / Media Contact / email `pr@flatfile.com` / confidence 65 / suppression `not_checked`; not a decision-maker contact.
- Suppression check: `suppress_a78d92d35273d37e4df3352a`; draft `draft_23bf6537385d43536d4d325c`; `final_clearance=not_cleared`; conflicts `required_before_send`; local suppression, Clio, opt-out, and duplicate/prior-touch `not_checked`.

### HOLD recommendation

Keep Flatfile/Obvious held. Resolve the naming/rebrand convention before any packet. Do not link `pr@flatfile.com` as a decision-maker contact. Do not rely on the David Boskovic row for external use without person-level currentness and clearance.

### Missing evidence

- Jeff-approved naming convention for future internal packets: `Obvious / Flatfile`, `Obvious (Flatfile product)`, `Flatfile`, or another label.
- Current first-party source confirming company/product naming and whether Flatfile product support/positioning remains unchanged.
- Person-level current-source evidence for David Boskovic or approved alternative decision-maker.
- Decision to keep the department email row only for internal/PR-reference context, not as a decision-maker contact.
- Suppression, opt-out, Whiteford conflicts, local Clio/adverse-party, duplicate/prior-touch, brand, and attorney-review clearance.

### Copy/paste approval language — source review / packet prep only

```text
Approved for read-only Flatfile/Obvious naming and person-contact review plus future packet preparation only. Scope is limited to resolving naming convention for `prospect_bea9dbd287cb8fcf077720d0`, reviewing `contact_01092cd32c14e0196826c3cf`, marking `contact_9119665bd6e83c1b8387d00e` as department-email/internal-reference-only if appropriate, and comparing `opp_8a46a832f79bb082853b7f8d` with `ghl-agent-targeting-prospect_bea9dbd287cb8fcf077720d0`. No contact link, no CRM/database mutation, no social/public use, no workflow action, and no outreach is approved.
```

## Cross-cutting gates before any future exact packet becomes actionable

A future exact packet for any row above must include:

1. Exact systems in scope and explicit no-outreach/no-activation boundary unless separately approved.
2. Current values and proposed values for every affected local/live row.
3. Source-current evidence paths and timestamps.
4. Contact-quality decision: keep, suppress, replace, or internal-reference-only.
5. Suppression, opt-out, HighLevel DND/unsubscribe/bounce/manual suppression, Whiteford conflicts, Clio/adverse-party, duplicate/prior-touch, brand, and attorney-review checklist.
6. Backup/export evidence, rollback/undo plan, dry-run/read-only verification plan, and stop conditions.
7. Named human operator and exact Jeff/Whiteford approval language for the future action.

## Bottom-line recommendation

Keep all five risks in HOLD. If Jeff wants the next safe step, approve only read-only source review and preparation of one future exact packet at a time, starting with Sereact quarantine. Nothing in this packet authorizes data mutation, contact enrichment writeback, CRM movement, HighLevel workflow/list use, Clio action, public copy, or outreach.
