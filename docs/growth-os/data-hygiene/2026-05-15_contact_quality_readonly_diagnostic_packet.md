# Contact-quality read-only diagnostic packet — 2026-05-15

Task: `t_4d1fc236`  
Tenant: `whiteford-mountain-west`  
Prepared: 2026-05-15 04:36:08 MDT  
Status: INTERNAL / PRIVATE / READ-ONLY / NO-MUTATION DIAGNOSTIC PACKET  
Evidence JSON: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/growth-os/data-hygiene/2026-05-15_contact_quality_readonly_diagnostic_packet_evidence.json`

## Hard boundary

This packet is a narrow contact-quality decision aid for Jeff/Whiteford review. I inspected already-local Markdown and the local Growth OS SQLite database in read-only mode (`mode=ro&immutable=1` plus `PRAGMA query_only=ON`). I did not mutate SQLite, Supabase, HighLevel/CRM, Clio, dashboard state, docs outside this packet/index work, source providers, contacts, opportunities, prospects, tags, workflows, drafts, approvals, suppression rows, public pages, social/LinkedIn surfaces, ads, emails, SMS, or any client/prospect-facing system.

This packet does not authorize outreach, contact enrichment, source browsing, CRM/HighLevel movement, workflow activation/enrollment, email/SMS, LinkedIn/social action, public/client-facing use, Clio activity, or legal advice. Local records, local source snippets, contact names/titles, email/phone presence flags, LinkedIn fields, confidence scores, pending drafts, HighLevel/Agent Targeting rows, and approval shells are not consent, not suppression clearance, not conflicts clearance, not prior-touch clearance, not Clio/adverse-party clearance, not source-current proof, not attorney approval, and not permission to contact.

Data-minimization note: this packet avoids raw email and phone dumps. Email/phone are described only as presence flags. LinkedIn is described as missing, person-like, or company/org-like where that is sufficient for contact-quality diagnosis.

## Source anchors used

- `docs/digests/2026-05-15_0630_morning_action_brief.md` lines 179-181 name read-only data-hygiene decision packets as the safest cleanup/planning lane.
- `docs/growth-os/data-hygiene/2026-05-15_growth_os_data_hygiene_cleanup_packet.md` lines 122-147 identify suspect/low-confidence contacts and rank contact-quality review needs.
- `docs/growth-os/data-hygiene/2026-05-15_agent_targeting_lifecycle_reconciliation_worksheet.md` lines 107-117 define the contact-quality review queue.
- `docs/growth-os/data-hygiene/2026-05-11_private_dashboard_data_hygiene_visibility_spec.md` lines 106-142 define missing-contact dashboard fields and contact-risk filters.
- `docs/growth-os/data-hygiene/2026-05-11_offer_contact_mapping_remediation_plan.md` lines 115-124 define the earlier contact-quality remediation worksheet.
- Existing completed packets are treated as controlling for their covered companies: AION packet `2026-05-15_aion_lifecycle_readonly_diagnostic_packet.md`; Sereact packet `2026-05-15_sereact_quarantine_exact_approval_packet.md`.

## Executive recommendation

Keep every reviewed contact/company in HOLD. The immediate value is not sending, enriching, filling `contact_id`, approving drafts, or moving Agent Targeting rows. The immediate value is a local, reviewable map of which contact rows are suspect, incomplete, department-level, duplicate, stale/source-current sensitive, or already controlled by a narrower packet.

Highest-priority contact-quality decisions:

1. Rigetti Computing — resolve the suspect `Sub cool` CEO contact and incomplete CFO contact before any lifecycle link or recipient-level packet.
2. Nexar — resolve duplicate Saurav Gupta rows and reject company/org LinkedIn as person-level evidence unless explicitly kept as internal reference only.
3. Flatfile / Obvious — resolve naming/rebrand posture, reject the department-email row as a decision-maker contact, and verify any founder/CEO person row before use.
4. AION — do not redo the completed AION lifecycle packet; carry forward its HOLD for `contact_14b42eb2f15da73c52694fcb` and its no-auto-link posture.
5. Sereact — do not redo the completed Sereact quarantine packet; carry forward its HOLD/quarantine and low-confidence contact caveats.
6. Kore.ai and Kodiak remain in the broader contact-quality queue; include them in a later tranche only if Jeff wants a broader suppress/replace/keep worksheet.

## One-screen contact-quality queue

| Priority | Company | Exact local rows | Current local evidence | Missing evidence / blocker | Default posture | Safe next choice |
| ---: | --- | --- | --- | --- | --- | --- |
| 1 | Rigetti Computing | Prospect `prospect_d249372d03e9b2df1dd67726`; Agent Targeting opportunity `ghl-agent-targeting-prospect_d249372d03e9b2df1dd67726`; research opportunity `opp_1d79b1a5b3897c337a3f43be`; contacts `contact_87a4528f8034e072e84af395`, `contact_e5358ebe2bf6f9959920e19f`; draft `draft_beb7a04cd418d728e5fc451a`; suppression `suppress_8453219f60e43caecdb048ab`; work item `work_nightly_agent_targeting_a2124de0cc59fed06b53` | Agent Targeting row has `offer_id=ai-patent` and missing `contact_id`; sibling research row uses `contact_87a4528f8034e072e84af395`. Contact row `contact_87a4528f8034e072e84af395` is named `Sub cool`, title `CEO`, confidence 60, email/phone missing, LinkedIn person-like present. Contact row `contact_e5358ebe2bf6f9959920e19f` is Rob Mortensen/CFO, confidence 55, email/phone/LinkedIn missing. | Person identity/current role proof; decision whether `Sub cool` should be suppressed/replaced; whether CFO row is relevant to `ai-patent`; current source evidence; suppression, opt-out, prior-touch, conflicts, Clio, brand, attorney review. | HOLD / suppress-or-replace review first. | HOLD, or approve a future read-only Rigetti contact-quality review only. Do not auto-link either contact to Agent Targeting. |
| 2 | Nexar | Prospect `prospect_c542c95f73995e2dbd2a15c3`; Agent Targeting opportunity `ghl-agent-targeting-prospect_c542c95f73995e2dbd2a15c3`; research opportunity `opp_a506b58fff7a549c6030f18f`; contacts `contact_f23d2a57ec5c1b0565f188a4`, `contact_f4aee748a54b4db92013be70`; draft `draft_e8a16edaa16c1051d8fa867b`; suppression `suppress_4e41e4854d6671cebf3e8f03`; work item `work_nightly_agent_targeting_cfc6d7ea6fc45a6e2ffd` | Agent Targeting row has `offer_id=ai-compliance` and missing `contact_id`; sibling research row uses `contact_f4aee748a54b4db92013be70`. Two Saurav Gupta rows exist: confidence 62 with email/LinkedIn missing, and confidence 65 with email missing plus LinkedIn classified company/org-like. | Duplicate contact decision; person-vs-company LinkedIn evidence; current CEO/co-founder role proof; offer-lane source-current check; suppression, opt-out, prior-touch, conflicts, Clio, brand, attorney review. | HOLD / duplicate-contact review first. | HOLD, or approve a future read-only Nexar contact dedupe/person-evidence review only. Do not copy either row into Agent Targeting. |
| 3 | Flatfile / Obvious | Prospect `prospect_bea9dbd287cb8fcf077720d0`; Agent Targeting opportunity `ghl-agent-targeting-prospect_bea9dbd287cb8fcf077720d0`; research opportunity `opp_8a46a832f79bb082853b7f8d`; contacts `contact_01092cd32c14e0196826c3cf`, `contact_9119665bd6e83c1b8387d00e`; draft `draft_23bf6537385d43536d4d325c`; suppression `suppress_a78d92d35273d37e4df3352a`; work item `work_nightly_agent_targeting_9e331922b7ef2980d8f1` | Agent Targeting row has `offer_id=tech-gc` and missing `contact_id`; sibling research row uses founder/CEO contact `contact_01092cd32c14e0196826c3cf`, confidence 80, email/phone/LinkedIn missing. Separate `contact_9119665bd6e83c1b8387d00e` is a department/media email row, confidence 65, email present, LinkedIn missing. | Current naming decision: Flatfile, Obvious, or approved combined label; current person-level CEO/contact proof; explicit department-email disposition; source-current evidence; suppression, opt-out, prior-touch, conflicts, Clio, brand, attorney review. | HOLD / naming + person-contact review first. | HOLD, or approve future read-only Flatfile/Obvious naming/contact review only. Department email must not be treated as decision-maker contact. |
| 4 | AION Robotics Corporation | Covered by AION packet. Key IDs: prospect `prospect_089c4bc541c05da752169c7a`; opportunities `opp_8b9cb9cb94b88f73b74b7064`, `ghl-lead-prospect_089c4bc541c05da752169c7a`; contact `contact_14b42eb2f15da73c52694fcb`; draft `draft_58482b23881d3aa940dfc4c1`; suppression `suppress_7605e2e8ab3ca93b488624ed`. | Completed AION packet says the local research row has offer/contact, while the Agent Targeting placeholder lacks both; contact confidence is 72 with email/phone/LinkedIn present but suppression not checked. | See `2026-05-15_aion_lifecycle_readonly_diagnostic_packet.md`; missing current-source, lifecycle decision, contact-quality decision, suppression, HighLevel DND, opt-out, conflicts, Clio, prior-touch, brand/attorney review. | HOLD; no duplication here. | Point Jeff to AION packet. Do not redo, auto-link, enrich, or use contact. |
| 5 | Sereact | Covered by Sereact quarantine packet. Key IDs: prospect `prospect_ef30df45ad62c93981758ca3`; opportunities `opp_7aaf67df3d4d774803c8607d`, `ghl-agent-targeting-prospect_ef30df45ad62c93981758ca3`, `ghl-opp-hUevEZZwjvyALchVzSzv`; contacts `contact_be2ee5a1d75bffb184f923c5`, `contact_44ef39121d6425c00cb55936`; draft `draft_6c7ea9b4b76cc04ba5ff7819`; suppression `suppress_7ea545e06cad606889f750d4`. | Completed Sereact packet says contacts are low-confidence/incomplete, no email/LinkedIn/phone, source host Instagram, confidence 65, international/non-Mountain-West targeting unresolved, and packet-ready orphan is a discrepancy not readiness. | See `2026-05-15_sereact_quarantine_exact_approval_packet.md`; missing source-current, international targeting decision, lifecycle disposition, contact-quality decision, suppression/conflicts/Clio/prior-touch/attorney review. | HOLD / quarantine; no duplication here. | Point Jeff to Sereact packet. Do not redo, link, suppress/replace, enrich, or use contacts. |
| 6 | Kore.ai | Prospect `prospect_ae4ea495016fb286698d44da`; opportunity `opp_db86025f54767be1d8614956`; contact `contact_459c2a325250da48f37fa924`; work item `work_nightly_agent_targeting_d9e8526442f6ac499abd` | Broad queue item, not one of the current Agent Targeting contact-missing rows. Contact confidence 20, email/phone missing, LinkedIn person-like present; source is curl-limited local evidence. | Current source and person identity; role; whether this belongs in a Whiteford/Mountain West lane; suppression, opt-out, prior-touch, conflicts, Clio, attorney review. | HOLD / later broad queue review. | Do not include in recipient-level drafting until a separate read-only review is approved. |
| 7 | Kodiak Robotics | Prospect `prospect_c6c776b4596056a65d055c7c`; Agent Targeting opportunity `ghl-agent-targeting-prospect_c6c776b4596056a65d055c7c`; research opportunity `opp_b3657faae575b0051d983aac`; contacts `contact_1ee5c91d35f8623be577e448`, `contact_30e1768b7710a9db8abc7277`; draft `draft_dca13d4ac0cb7f11a2300e02`; suppression `suppress_b1a80d3b889a7f6790b5de5e`; work item `work_nightly_agent_targeting_342cdb2db5260e24bc78` | Agent Targeting row has `offer_id=ai-patent` and missing `contact_id`; sibling research row uses `contact_1ee5c91d35f8623be577e448`. Two person-like contacts are below/near threshold: confidence 68 and 65; email/phone missing, LinkedIn person-like present. | Current role proof; which contact, if any, is appropriate; suppression, opt-out, prior-touch, conflicts, Clio, brand, attorney review. | HOLD / later broad queue review. | Lower priority than Rigetti/Nexar/Flatfile because the contact issue is incomplete/under-threshold rather than obviously suspect/department/company-level. |

## Company-specific notes and Jeff choices

### Rigetti Computing — suspect CEO row plus incomplete CFO row

Current local IDs:

- Prospect: `prospect_d249372d03e9b2df1dd67726`
- Opportunities: `ghl-agent-targeting-prospect_d249372d03e9b2df1dd67726`; `opp_1d79b1a5b3897c337a3f43be`
- Contacts: `contact_87a4528f8034e072e84af395` (`Sub cool`, CEO, confidence 60, no email/phone, person-like LinkedIn present); `contact_e5358ebe2bf6f9959920e19f` (Rob Mortensen, CFO, confidence 55, email/phone/LinkedIn missing)
- Source evidence: `evidence_3590d7c90ab626cac6c779bc`; `evidence_d34c95319d742ef30b478b8e`
- Draft/approval/suppression/work: `draft_beb7a04cd418d728e5fc451a`; `approval_b4c6110c1c5361b84422d173`; `suppress_8453219f60e43caecdb048ab`; `work_nightly_agent_targeting_a2124de0cc59fed06b53`

Current local evidence: local source evidence is dated 2026-05-07. The Agent Targeting row has an AI Patent offer but no contact. A sibling research row points to the suspect CEO row. Suppression and conflicts are not cleared; draft is attorney-review-only with `external_action_allowed=0`; no execution authorization row was found for Rigetti in the targeted read-only query.

Missing evidence before any mutation or external use: current person-level leadership proof; decision to suppress/replace/keep `Sub cool`; decision whether CFO row is relevant to AI Patent; current source review; local and HighLevel suppression/DND/opt-out/bounce/manual suppression; Whiteford conflicts; Clio/adverse-party precheck; duplicate/prior-touch review; exact attorney/brand approval; exact future mutation packet.

Copy/paste Jeff choices:

```text
HOLD Rigetti contact-quality rows: Keep prospect_d249372d03e9b2df1dd67726, opportunities ghl-agent-targeting-prospect_d249372d03e9b2df1dd67726 and opp_1d79b1a5b3897c337a3f43be, contacts contact_87a4528f8034e072e84af395 and contact_e5358ebe2bf6f9959920e19f, draft/approval/suppression/work rows frozen. No mutation, source browsing, enrichment, outreach, workflow, CRM/HighLevel/Supabase/Clio, public/social, or client/prospect-facing action is approved.
```

```text
GO for future Rigetti read-only contact-quality review only: I approve a private/internal no-mutation review to decide whether the suspect/incomplete Rigetti contacts should remain HOLD, be marked internal-reference-only, be suppress/replace candidates, or require a later local-only mutation-plan packet. This does not approve contact enrichment, source-provider access beyond separately approved read-only sources, SQLite/Supabase/HighLevel/CRM/Clio mutation, outreach, workflow, social/public, email/SMS, or client/prospect-facing use.
```

### Nexar — duplicate Saurav Gupta rows and company/org LinkedIn issue

Current local IDs:

- Prospect: `prospect_c542c95f73995e2dbd2a15c3`
- Opportunities: `ghl-agent-targeting-prospect_c542c95f73995e2dbd2a15c3`; `opp_a506b58fff7a549c6030f18f`
- Contacts: `contact_f23d2a57ec5c1b0565f188a4` (Saurav Gupta, CEO, confidence 62, email/phone/LinkedIn missing); `contact_f4aee748a54b4db92013be70` (Saurav Gupta, CEO/co-founder, confidence 65, email/phone missing, LinkedIn classified company/org-like)
- Source evidence: `evidence_45604a6b85b38a062a0ee8af`; `evidence_f9a7d936af2f8473f408a8fa`
- Draft/approval/suppression/work: `draft_e8a16edaa16c1051d8fa867b`; `approval_d9a0dca6935dfd761032505d`; `suppress_4e41e4854d6671cebf3e8f03`; `work_nightly_agent_targeting_cfc6d7ea6fc45a6e2ffd`

Current local evidence: local source evidence is dated 2026-05-07. The Agent Targeting row has `offer_id=ai-compliance` but no contact. A sibling research row points to the company/org LinkedIn-classified Saurav Gupta row. The second Saurav Gupta row is lower-confidence and lacks LinkedIn. Suppression and conflicts are not cleared; draft is attorney-review-only with `external_action_allowed=0`; no execution authorization row was found for Nexar in the targeted read-only query.

Missing evidence before any mutation or external use: duplicate-contact canonical choice; person-level LinkedIn or other person-level source proof; current role proof; current offer-lane source review; suppression/DND/opt-out/prior-touch/conflicts/Clio clearance; attorney/brand review; exact future mutation packet.

Copy/paste Jeff choices:

```text
HOLD Nexar contact-quality rows: Keep prospect_c542c95f73995e2dbd2a15c3, opportunities ghl-agent-targeting-prospect_c542c95f73995e2dbd2a15c3 and opp_a506b58fff7a549c6030f18f, contacts contact_f23d2a57ec5c1b0565f188a4 and contact_f4aee748a54b4db92013be70, draft/approval/suppression/work rows frozen. No mutation, source browsing, enrichment, outreach, workflow, CRM/HighLevel/Supabase/Clio, public/social, or client/prospect-facing action is approved.
```

```text
GO for future Nexar read-only contact dedupe/person-evidence review only: I approve a private/internal no-mutation review to decide whether either Saurav Gupta row is person-level, current, and usable only for future planning, or whether both should remain HOLD/suppress-replace candidates. This does not approve auto-linking, enrichment, SQLite/Supabase/HighLevel/CRM/Clio mutation, outreach, workflow, social/public, email/SMS, or client/prospect-facing use.
```

### Flatfile / Obvious — naming/rebrand plus department email

Current local IDs:

- Prospect: `prospect_bea9dbd287cb8fcf077720d0`
- Opportunities: `ghl-agent-targeting-prospect_bea9dbd287cb8fcf077720d0`; `opp_8a46a832f79bb082853b7f8d`
- Contacts: `contact_01092cd32c14e0196826c3cf` (David Boskovic, Founder & CEO, confidence 80, email/phone/LinkedIn missing); `contact_9119665bd6e83c1b8387d00e` (department/media email row, confidence 65, email present, LinkedIn missing)
- Source evidence: `evidence_2eae060a97f8f12029b02e21`; `evidence_477734467b875df27c10a6f2`; `evidence_c727ea259d34c7f0b58e18a3`
- Draft/approval/suppression/work: `draft_23bf6537385d43536d4d325c`; `approval_1b30f906a673bf469f3953c0`; `suppress_a78d92d35273d37e4df3352a`; `work_nightly_agent_targeting_9e331922b7ef2980d8f1`

Current local evidence: local source evidence is dated 2026-05-07 and uses `safe_for_outreach=conditional`. The Agent Targeting row has `offer_id=tech-gc` but no contact. A sibling research row points to the founder/CEO contact, but the person row lacks email/LinkedIn and still requires current person-level verification. The department/media email row is not a decision-maker contact. The draft is LinkedIn manual-review-only / attorney-review-required with `external_action_allowed=0`; suppression and conflicts are not cleared; no execution authorization row was found for Flatfile/Obvious in the targeted read-only query.

Missing evidence before any mutation or external use: final naming convention (`Flatfile`, `Obvious`, or approved combined label); current first-party rebrand/naming evidence; current person-level founder/CEO evidence; explicit department-email disposition; suppression/DND/opt-out/prior-touch/conflicts/Clio clearance; attorney/brand/no-tag review; exact future mutation packet.

Copy/paste Jeff choices:

```text
HOLD Flatfile/Obvious contact-quality rows: Keep prospect_bea9dbd287cb8fcf077720d0, opportunities ghl-agent-targeting-prospect_bea9dbd287cb8fcf077720d0 and opp_8a46a832f79bb082853b7f8d, contacts contact_01092cd32c14e0196826c3cf and contact_9119665bd6e83c1b8387d00e, draft/approval/suppression/work rows frozen. No mutation, source browsing, enrichment, outreach, workflow, CRM/HighLevel/Supabase/Clio, public/social, or client/prospect-facing action is approved.
```

```text
GO for future Flatfile/Obvious read-only naming/contact review only: I approve a private/internal no-mutation review to decide the safe local naming label and whether the founder/CEO row, department/media email row, both, or neither should be kept only as internal reference for future planning. This does not approve contact enrichment, source-provider access beyond separately approved read-only sources, auto-linking, SQLite/Supabase/HighLevel/CRM/Clio mutation, outreach, workflow, social/public, email/SMS, or client/prospect-facing use.
```

## Covered elsewhere — do not duplicate unless Jeff asks for a narrower follow-up

### AION Robotics Corporation

Use the completed AION packet as the controlling artifact:

`/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/growth-os/data-hygiene/2026-05-15_aion_lifecycle_readonly_diagnostic_packet.md`

Carried-forward caveat: AION remains HOLD. The sibling research row has `offer_id=ai-patent` and contact `contact_14b42eb2f15da73c52694fcb`, but the Agent Targeting placeholder lacks both offer and contact. The contact has useful internal fields but is not link-ready or send-ready because confidence, suppression, conflicts, source-currentness, prior-touch, Clio, and attorney/brand review remain unresolved.

### Sereact

Use the completed Sereact quarantine packet as the controlling artifact:

`/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/growth-os/data-hygiene/2026-05-15_sereact_quarantine_exact_approval_packet.md`

Carried-forward caveat: Sereact remains HOLD / quarantine. Its local packet-ready/orphan signal is a discrepancy, not readiness. Contacts `contact_be2ee5a1d75bffb184f923c5` and `contact_44ef39121d6425c00cb55936` remain low-confidence, incomplete, international/source-current sensitive, not-cleared, and not link/send-ready.

## Standard missing-evidence checklist before any later local-only mutation-plan packet

Every affected company/contact must have all of the following before a mutation-plan packet can even be considered:

1. Exact row IDs for prospects, opportunities, contacts, source evidence, drafts, approvals, suppression checks, work items, execution authorizations, and GHL sync links where applicable.
2. Current values and proposed values for every field in scope.
3. Person-level contact evidence, role currentness, and reason the row is keep/suppress/replace/internal-reference-only.
4. Source-current evidence paths/timestamps; no source-blocked inference.
5. Local suppression status reviewed and cleared.
6. HighLevel DND/unsubscribe/bounce/manual suppression checked by an authorized operator, if HighLevel is ever in scope.
7. Opt-out/preferences reviewed.
8. Whiteford conflicts cleared through the approved Whiteford process.
9. Clio/adverse-party precheck completed where applicable.
10. Duplicate/prior-touch lineage reviewed.
11. Brand, privacy, deliverability, and attorney review completed for exact route/copy/channel/timing if any external use is later contemplated.
12. Backup/export path, verification queries, expected row counts, rollback/undo plan, operator, reviewer, and stop conditions.
13. Explicit exclusion of outreach, workflow enrollment, CRM movement beyond named fields, email/SMS/social/LinkedIn/YouTube/ad action, public use, legal advice, or client/prospect-facing action unless separately and exactly approved.

## Stop conditions

Stop and keep rows HOLD if any of these are true:

- Jeff/Whiteford has not given exact written approval for the specific future lane.
- A requested action would rely on this packet, a dashboard row, a local score, a work item, a HighLevel stage label, a draft, or an approval shell as execution authority.
- Any contact is suspect, duplicate, department/company-level, incomplete, non-current, low-confidence, or not person-level verified.
- Any row has missing or contradictory source-current, consent, suppression, opt-out, conflicts, Clio, prior-touch, brand, or attorney-review posture.
- Any proposed action would fill `contact_id`, suppress/replace contact records, set offer/stage values, link/close/archive rows, move CRM/HighLevel opportunities, mark drafts/approvals ready, or otherwise mutate systems without a separate exact approval packet.
- Any outreach, workflow, public/social, email/SMS, ad, Clio, source-provider, Supabase, HighLevel/CRM, SQLite, public-page, client/prospect-facing, or legal-services action is requested without separate exact approval.

## Bottom line

The safest next internal lane is a three-company read-only contact-quality review tranche: Rigetti, Nexar, and Flatfile/Obvious. AION and Sereact already have controlling packets and should be referenced, not duplicated. Every reviewed row remains HOLD until a future exact packet proves person-level evidence, source-currentness, suppression/conflicts/prior-touch/Clio clearance, attorney review, current/proposed values, rollback, and stop conditions.
