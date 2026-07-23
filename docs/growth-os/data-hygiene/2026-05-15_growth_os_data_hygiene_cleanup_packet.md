# Growth OS data-hygiene cleanup packet — 2026-05-15

Task: `t_eec256f3`  
Tenant: `whiteford-mountain-west`  
Status: INTERNAL / READ-ONLY / NO-MUTATION CLEANUP PACKET  
Evidence JSON: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/growth-os/data-hygiene/2026-05-15_growth_os_data_hygiene_cleanup_packet_evidence.json`

## Hard boundary

This packet is a read-only decision-prep artifact for Jeff/Whiteford morning review. I inspected local Markdown, local JSON exports, and the local Growth OS SQLite database using a read-only URI (`mode=ro&immutable=1`) plus `PRAGMA query_only=ON`.

No SQLite, Supabase, HighLevel, Clio, CRM, LinkedIn/social, email/SMS, workflow, ad, public-page, source-access, prospect-enrichment, contact-enrichment, or client/prospect-facing action was performed or authorized. Internal Growth OS labels, scores, list membership, draft rows, local contacts, HighLevel placeholders, or source snippets are not consent, not conflicts clearance, not source-current proof, not attorney approval, and not permission to contact.

## Evidence anchors inspected

- `docs/digests/2026-05-14_daily_digest.md`
- `docs/growth-os/data-hygiene/2026-05-11_agent_targeting_lifecycle_reconciliation_plan.md`
- `docs/growth-os/data-hygiene/2026-05-11_offer_contact_mapping_remediation_plan.md`
- `/Users/jeff/.openclaw/projects/mountain-west-growth-os/data/growth-os.sqlite`
- `/Users/jeff/.openclaw/projects/mountain-west-growth-os/exports/nightly/2026-05-14T09-16-02-721Z/phase11-nightly-hardening-report.json`

## Executive summary

The 2026-05-14 digest counts are confirmed against read-only SQLite: 50 opportunities, 30 missing `offer_id`, 39 missing `contact_id`, and 49 opportunities stale before 2026-05-11. The duplicate backlog is still exactly three pending prospect duplicate groups: Great Sky, Pluto Bio, and Swimlane. Contact quality remains the dominant safety blocker: 20 contacts, 18 missing email, 11 missing LinkedIn, 20 with `suppression_status=not_checked`, and 20 of 20 suppression checks not cleared.

Recommended local-only cleanup order:

1. Freeze external/live posture and keep all named cleanup records HOLD.
2. Canonicalize pending duplicate groups in review packets before any offer/contact mapping: Great Sky, Pluto Bio, Swimlane.
3. Triage the 30 missing `offer_id` opportunities into duplicate-held, legacy identified lane-review, AION lifecycle placeholder, and Sereact orphan quarantine.
4. Triage the 39 missing `contact_id` opportunities: 28 legacy identified rows, 10 Agent Targeting rows, and one Sereact/null-company targeting-packet-ready orphan.
5. Quarantine Sereact's packet-ready orphan until an exact lifecycle reconciliation packet decides whether to link, close/archive, rename, or keep separate.
6. Resolve suspect/low-confidence contact rows before any contact linking: Kore.ai, Rigetti, Nexar, Flatfile/Obvious, Sereact, Kodiak, and AION.
7. Only after those diagnostic packets pass should Jeff/Whiteford consider a future exact row-level mutation packet.

## Confirmed counts

| Metric | Count |
| --- | ---: |
| Opportunities total | 50 |
| Missing `offer_id` | 30 |
| Missing `contact_id` | 39 |
| Stale opportunities, `updated_at < 2026-05-11` | 49 |
| Prospects total | 39 |
| Contacts total | 20 |
| Contacts missing email | 18 |
| Contacts missing LinkedIn | 11 |
| Contacts `suppression_status=not_checked` | 20 |
| Suppression checks not cleared | 20 / 20 |
| Approval items pending | 46 / 52 |
| Outreach drafts external-action allowed | 0 / 20 |
| Execution authorizations not sent | 8 / 8 |

Opportunity stages: `identified` 28; `research_staged` 11; `agent-targeting` 10; `targeting-packet-ready` 1.

Missing `offer_id` by stage: `identified` 28; `agent-targeting` 1; `targeting-packet-ready` 1.

Missing `contact_id` by stage: `identified` 28; `agent-targeting` 10; `targeting-packet-ready` 1.

Stale by stage: `identified` 28; `agent-targeting` 10; `research_staged` 10; `targeting-packet-ready` 1.

## Exact tables and fields to inspect in future review

- `opportunities`: `opportunity_id`, `prospect_id`, `contact_id`, `offer_id`, `stage`, `source`, `created_at`, `updated_at`
- `prospects`: `prospect_id`, `company_name`, `domain`, `segment`, `source_type`, `source_url`, `pipeline_stage`, `suppression_status`, `conflicts_status`, `updated_at`, `notes`
- `contacts`: `contact_id`, `prospect_id`, `name`, `title`, `email`, `linkedin_url`, `source_type`, `source_url`, `confidence`, `permission_basis`, `suppression_status`, `updated_at`
- `duplicate_candidates`: `duplicate_id`, `entity_type`, `local_id_a`, `local_id_b`, `match_reason`, `confidence`, `review_status`
- `suppression_checks`: `check_id`, `prospect_id`, `draft_id`, `local_suppression_status`, `local_clio_precheck_status`, `whiteford_conflicts_status`, `opt_out_status`, `duplicate_prior_touch_status`, `final_clearance`, `notes`
- `work_items`: `work_item_id`, `work_type`, `title`, `stage`, `risk_level`, `approval_required`, `external_action_allowed`, `blocker`
- `outreach_drafts`: `draft_id`, `prospect_id`, `status`, `risk_level`, `compliance_status`, `external_action_allowed`, `source_evidence_ids`
- `approval_items`: `approval_item_id`, `item_type`, `related_id`, `approval_status`, `risk_level`, `checklist_path`, `approval_language`
- `execution_authorizations`: `authorization_id`, `draft_id`, `prospect_id`, `final_review_status`, `source_grounding_status`, `suppression_status`, `conflicts_status`, `send_status`

## Duplicate groups to resolve first

| Group | IDs | Domain evidence | Current evidence | Safe next step |
| --- | --- | --- | --- | --- |
| Great Sky | `ai-great-sky` + `funded-great-sky` | raising.fi / raising.fi | exact company-name match; confidence 0.95; status `pending` | HOLD pending canonical prospect decision; do not map both rows independently. |
| Pluto Bio | `ai-pluto-bio` + `funded-pluto-bio` | pluto.bio / pluto.bio | exact company-name match; confidence 0.95; status `pending` | HOLD pending canonical prospect decision; do not map both rows independently. |
| Swimlane | `ai-swimlane` + `funded-swimlane` | www.builtincolorado.com / www.builtincolorado.com | exact company-name match; confidence 0.95; status `pending` | HOLD pending canonical prospect decision; do not map both rows independently. |

These are prospect identity decisions, not outreach decisions. A future packet should compare company legal name, current official source/domain, related opportunities, drafts, suppression checks, prior-touch evidence, and desired offer lane. Do not choose a canonical row solely because one segment says `ai-software` and another says `funded-startups`.

## Missing `offer_id` cleanup classes

The 30 missing-offer rows break into three useful classes:

1. 28 legacy `identified` HighLevel-sourced rows last updated 2026-05-05. These should receive lane-review labels only after source/current-fit review; they should not be mutated now.
2. AION Robotics Corporation Agent Targeting placeholder `ghl-lead-prospect_089c4bc541c05da752169c7a`, missing both offer and contact, while sibling research-staged row `opp_8b9cb9cb94b88f73b74b7064` has `offer_id=ai-patent` and `contact_id=contact_14b42eb2f15da73c52694fcb`. HOLD as lifecycle duplicate risk.
3. Sereact/null-company orphan `ghl-opp-hUevEZZwjvyALchVzSzv`, stage `targeting-packet-ready`, missing company/prospect linkage, offer, and contact. HOLD/quarantine.

Named missing-offer records in this tranche: (null company / Sereact orphan), AION Robotics Corporation, AskElephant, Bifrost Electronics, Board in a Bag, Boomtown Innovation Platforms, CU Boulder Venture Partners, Denver Ventures, Flatirons AI, GenFlux, Gravitee, Great Sky, Great Sky, Innosphere Ventures, Kamber Labs, LightTable, Mindsmith, Mountain Drifter, Nectr Bottle Co., Pluto Bio, Pluto Bio, Polaris Electro-Optics, RVC HyperAccelerator, ReNu, Rockies Venture Club, Seed Theory Skincare, Simple Body, Swimlane, Swimlane, Techstars Boulder Accelerator.

## Agent Targeting / targeting-packet-ready rows missing contact

| Company | Opportunity | Stage | Offer | Contact | Suppression / conflicts | Posture |
| --- | --- | --- | --- | --- | --- | --- |
| (null company / Sereact orphan) | `ghl-opp-hUevEZZwjvyALchVzSzv` | `targeting-packet-ready` | `None` | `None` | n/a / n/a | HOLD; no auto-link or stage reliance. |
| AION Robotics Corporation | `ghl-lead-prospect_089c4bc541c05da752169c7a` | `agent-targeting` | `None` | `None` | not_checked / required_before_send | HOLD; no auto-link or stage reliance. |
| Electra | `ghl-agent-targeting-prospect_bba8ec0dec6e73619770860d` | `agent-targeting` | `tech-gc` | `None` | consent_gap_no_auto_send / required_before_send | HOLD; no auto-link or stage reliance. |
| Flatfile (also rebranded company name: Obvious) | `ghl-agent-targeting-prospect_bea9dbd287cb8fcf077720d0` | `agent-targeting` | `tech-gc` | `None` | consent_gap_no_auto_send / required_before_send | HOLD; no auto-link or stage reliance. |
| Kodiak Robotics | `ghl-agent-targeting-prospect_c6c776b4596056a65d055c7c` | `agent-targeting` | `ai-patent` | `None` | not_checked / required_before_send | HOLD; no auto-link or stage reliance. |
| Manifest OS | `ghl-agent-targeting-prospect_647f303b12467f9d88c68da4` | `agent-targeting` | `tech-gc` | `None` | consent_gap_no_auto_send / required_before_send | HOLD; no auto-link or stage reliance. |
| Nexar | `ghl-agent-targeting-prospect_c542c95f73995e2dbd2a15c3` | `agent-targeting` | `ai-compliance` | `None` | not_checked / required_before_send | HOLD; no auto-link or stage reliance. |
| PickNik Robotics | `ghl-agent-targeting-prospect_bd2e46b6a31bc423d3064218` | `agent-targeting` | `ai-patent` | `None` | consent_gap_no_auto_send / required_before_send | HOLD; no auto-link or stage reliance. |
| RADICL (Radicl Defense LLC) | `ghl-agent-targeting-prospect_2180fd85f6085ebc2a595f72` | `agent-targeting` | `tech-gc` | `None` | consent_gap_no_auto_send / required_before_send | HOLD; no auto-link or stage reliance. |
| Rigetti Computing | `ghl-agent-targeting-prospect_d249372d03e9b2df1dd67726` | `agent-targeting` | `ai-patent` | `None` | not_checked / required_before_send | HOLD; no auto-link or stage reliance. |
| Sereact | `ghl-agent-targeting-prospect_ef30df45ad62c93981758ca3` | `agent-targeting` | `ai-patent` | `None` | consent_gap_no_auto_send / required_before_send | HOLD; no auto-link or stage reliance. |

Do not auto-copy contact IDs from research-staged siblings to Agent Targeting rows. Future reconciliation must prove that the rows represent the same lifecycle, that the contact is a verified person-level contact, and that suppression/conflicts/prior-touch/attorney gates are clear.

## Sereact HOLD posture

Sereact must remain HOLD despite a local `targeting-packet-ready` signal. Read-only evidence shows three conflicting lifecycle facts:

- Local research-staged Sereact row `opp_7aaf67df3d4d774803c8607d`, `offer_id=ai-patent`, `contact_id=contact_be2ee5a1d75bffb184f923c5`, source `nightly_prospect_research`.
- Local HighLevel Agent Targeting row `ghl-agent-targeting-prospect_ef30df45ad62c93981758ca3`, `offer_id=ai-patent`, missing `contact_id`.
- Orphan/null-company row `ghl-opp-hUevEZZwjvyALchVzSzv`, `stage=targeting-packet-ready`, missing local company/prospect, `offer_id`, and `contact_id`.

Sereact also carries international/non-Mountain-West targeting ambiguity, low-confidence contacts, missing email/LinkedIn, source-current gaps, and uncleared suppression/conflicts. Safe next action is a Sereact-only lifecycle quarantine packet, not a send/review packet.

## Suspect or low-confidence contacts

| Company | Contact ID | Name | Title | Confidence | Email | LinkedIn | Safe action |
| --- | --- | --- | --- | ---: | --- | --- | --- |
| AION Robotics Corporation | `contact_14b42eb2f15da73c52694fcb` | Nicholas Nunno | CEO / Founder / Product Architect | 72.0 | nickn@aionrobotics.com | https://www.linkedin.com/in/nicholas-nunno-212992bb | HOLD / verify or suppress before any contact link. |
| Flatfile (also rebranded company name: Obvious) | `contact_9119665bd6e83c1b8387d00e` | pr@flatfile.com | Media Contact (department email) | 65.0 | pr@flatfile.com | missing | HOLD / verify or suppress before any contact link. |
| Flatfile (also rebranded company name: Obvious) | `contact_01092cd32c14e0196826c3cf` | David Boskovic | Founder & CEO | 80.0 | missing | missing | HOLD / verify or suppress before any contact link. |
| Kodiak Robotics | `contact_30e1768b7710a9db8abc7277` | Alex Vins | CTO / Co-founder | 65.0 | missing | https://www.linkedin.com/in/alex-vins | HOLD / verify or suppress before any contact link. |
| Kodiak Robotics | `contact_1ee5c91d35f8623be577e448` | Tim Heister | CEO / Co-founder | 68.0 | missing | https://www.linkedin.com/in/timheister | HOLD / verify or suppress before any contact link. |
| Kore.ai | `contact_459c2a325250da48f37fa924` | Naveen Ravanti | CEO | 20.0 | missing | https://www.linkedin.com/in/naveenravanti | HOLD / verify or suppress before any contact link. |
| Manifest OS | `contact_8acc8e4f19e16573208d1cba` | David Schellhas | Former GC (Salesforce, Groupon, Slack) / Investor / Advisor | 65.0 | missing | missing | HOLD / verify or suppress before any contact link. |
| Nexar | `contact_f23d2a57ec5c1b0565f188a4` | Saurav Gupta | CEO | 62.0 | missing | missing | HOLD / verify or suppress before any contact link. |
| Nexar | `contact_f4aee748a54b4db92013be70` | Saurav Gupta | CEO / Co-founder | 65.0 | missing | https://www.linkedin.com/company/nexar | HOLD / verify or suppress before any contact link. |
| Rigetti Computing | `contact_e5358ebe2bf6f9959920e19f` | Rob Mortensen | CFO | 55.0 | missing | missing | HOLD / verify or suppress before any contact link. |
| Rigetti Computing | `contact_87a4528f8034e072e84af395` | Sub cool | CEO | 60.0 | missing | https://www.linkedin.com/in/supercool | HOLD / verify or suppress before any contact link. |
| Sereact | `contact_be2ee5a1d75bffb184f923c5` | Dr. Ralf Gulde | CEO | 65.0 | missing | missing | HOLD / verify or suppress before any contact link. |
| Sereact | `contact_44ef39121d6425c00cb55936` | Marc Tuscher | CTO | 65.0 | missing | missing | HOLD / verify or suppress before any contact link. |

Contact-quality order:

1. Kore.ai / Naveen Ravanti: confidence 20; verify identity and role before any dry-run packet use.
2. Rigetti / `Sub cool`: suspect CEO row; suppress or replace before lifecycle link; separately review Rob Mortensen incomplete CFO row.
3. Nexar / Saurav Gupta: duplicate rows and company-level LinkedIn in person field; resolve person-vs-company evidence.
4. Flatfile/Obvious / `pr@flatfile.com`: department email; do not use as decision-maker contact.
5. Sereact / Dr. Ralf Gulde and Marc Tuscher: low-confidence, missing email/LinkedIn, weak-source contact rows; keep separate from company packet posture.
6. Kodiak / Alex Vins and Tim Heister, plus AION / Nicholas Nunno: below/near 75 confidence threshold; verify current role and source before any recipient-level drafting.

## Safe internal cleanup vs forbidden actions

Safe internal cleanup now:

- Read-only SQLite/file inspection.
- Markdown/JSON packets and review worksheets.
- Duplicate, offer-lane, lifecycle, and contact-quality decision packets.
- Exact future mutation packet drafting, if it remains no-mutation and requires Jeff/Whiteford approval before execution.
- Local-only dashboard/report references that do not execute approvals.

Forbidden without new exact approval:

- SQLite mutation, Supabase DDL/backfill/mutation, HighLevel/CRM mutation, Clio write, or live dashboard execution.
- Contact enrichment, prospect expansion, Firecrawl/source tests, or live web sourcing beyond separately approved neutral smoke tests.
- Workflow activation, contact enrollment, email/SMS, LinkedIn/social action, public post/page/publishing, ads, or client/prospect-facing use.
- Treating internal list membership, scores, source snippets, drafts, or HighLevel stage labels as consent or clearance.

## Recommended local-only remediation queue

1. Create a duplicate canonicalization review packet for Great Sky, Pluto Bio, and Swimlane. Output should be review-only with current/proposed canonical posture, child records to reconcile, and explicit no-mutation language.
2. Create a missing-offer lane review for the 28 legacy `identified` rows, separating likely `authority-watch`, possible `tech-gc`, possible `ai-compliance`, possible `ai-patent`, and retire/park candidates. This is classification only.
3. Create an AION lifecycle reconciliation packet comparing `opp_8b9cb9cb94b88f73b74b7064` and `ghl-lead-prospect_089c4bc541c05da752169c7a`, including Nicholas Nunno contact-quality and clearance status.
4. Create a Sereact quarantine packet for `opp_7aaf67df3d4d774803c8607d`, `ghl-agent-targeting-prospect_ef30df45ad62c93981758ca3`, and `ghl-opp-hUevEZZwjvyALchVzSzv`.
5. Create a contact-quality suppress/replace/keep worksheet for Kore.ai, Rigetti, Nexar, Flatfile/Obvious, Sereact, Kodiak, and AION.
6. After Jeff/Whiteford review, prepare exact row-level mutation packets only for approved tranches, with backup/export evidence, rollback, verification queries, named operator, and stop conditions.

## Future exact approval threshold

A future execution packet must name exact systems, table names, primary keys, current values, proposed values, evidence paths, rollback/undo steps, verification queries, owner/operator, and exact Jeff/Whiteford approval language. It must separately state that no outreach, workflow, public/social/email action, Clio write, or client/prospect-facing use is included unless explicitly approved in that same future packet.

## Bottom line

The safe morning recommendation is HOLD for live/external action and proceed only with local review packets. The highest-return internal cleanup is to make the backlog reviewable: duplicate canonicalization first, missing-offer/contact triage second, Sereact/AION lifecycle quarantine third, and contact-quality suppression/replacement decisions fourth.
