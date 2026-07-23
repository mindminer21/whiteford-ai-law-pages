# Agent Targeting lifecycle reconciliation plan — 2026-05-11

Task: `t_04c6c2d8`
Tenant: `whiteford-mountain-west`
Status: INTERNAL / LOCAL / READ-ONLY / NO-MUTATION WORKSHEET

## Hard boundary

This worksheet is a no-mutation lifecycle reconciliation plan for Jeff/Whiteford decision prep only. It does not approve SQLite, Supabase, HighLevel, CRM, Clio, workflow, source-access, contact-enrichment, prospecting, publishing, email/SMS/social/LinkedIn/YouTube/ad, or client/prospect-facing action.

Internal records, dashboard rows, list membership, scores, draft records, opportunity stages, source snippets, local contacts, HighLevel placeholders, local suppression rows, or queued work items are not consent, not conflicts clearance, not attorney approval, not source-current proof, and not permission to contact.

## Evidence used

No public-source browsing, enrichment, outreach, source restoration, or live-system mutation was performed. Evidence was limited to already-cited local artifacts and read-only local SQLite inspection:

- Parent duplicate packet: `docs/growth-os/data-hygiene/2026-05-11_duplicate_canonicalization_review_packet.md`
- Data-hygiene audit: `docs/growth-os/data-hygiene/2026-05-11_growth_os_data_hygiene_audit.md`
- Offer/contact mapping plan: `docs/growth-os/data-hygiene/2026-05-11_offer_contact_mapping_remediation_plan.md`
- Data-hygiene tranche review: `docs/reviews/2026-05-11_data_hygiene_tranche_review.md`
- Local SQLite input: `/Users/jeff/.openclaw/projects/mountain-west-growth-os/data/growth-os.sqlite`
- SQLite access mode used here: `file:/Users/jeff/.openclaw/projects/mountain-west-growth-os/data/growth-os.sqlite?mode=ro&immutable=1` with `PRAGMA query_only=ON`
- Sereact quarantine payload already cited by parent packet: `/Users/jeff/.openclaw/projects/mountain-west-growth-os/logs/ghl-stage-poller/ghl-stage-hUevEZZwjvyALchVzSzv-2026-05-10T18-32-02-464Z-payload.json`

## Executive posture

All Agent Targeting lifecycle reconciliation records should remain HOLD. The local evidence is useful enough to identify reconciliation classes, but not enough to link contacts automatically, mark records packet-ready, choose canonical lifecycle rows, clear conflicts/suppression/prior-touch, or approve live/local mutation.

The narrow diagnostic problem is to separate lifecycle hygiene from outreach readiness: first decide which local records represent the same prospect lifecycle, then decide whether current-source and contact evidence are strong enough for a future exact approval packet. Until then, every record below is internal-only, educational-planning-only, non-hypey, no-ACR/no-legal-advice, and attorney-review-gated.

## Proposed future review order

1. Sereact quarantine and targeting-packet-ready discrepancy: resolve the orphan/null-company opportunity before relying on any Agent Targeting packet-ready signal.
2. AION Robotics lifecycle duplicate: compare the research-staged row with contact/offer against the HighLevel Agent Targeting placeholder missing both IDs.
3. Suspect-contact pairings: Rigetti, Nexar, Sereact, and Flatfile/Obvious because existing contact rows have quality defects that could contaminate any contact link.
4. Cleanest lifecycle pairings with still-missing clearance: Kodiak, PickNik, Electra, RADICL, and Manifest OS. These still require current-source, contact, suppression/conflicts/prior-touch, and Jeff/attorney decisions.
5. Cross-cutting approval packet definition: only after the classes above are resolved should any row-level local/live mutation packet be prepared.

## Risk-class summary

| Risk class | Records | Current local issue | Recommended posture | Future approval threshold |
| --- | --- | --- | --- | --- |
| Duplicate lifecycle | AION; Kodiak; Nexar; Rigetti; Electra; Flatfile/Obvious; PickNik; Manifest OS; RADICL; Sereact | Research-staged rows have offer/contact data while Agent Targeting rows are missing contact IDs; AION Agent Targeting also lacks offer ID. | HOLD; reconcile lifecycle before any contact linking or stage movement. | Exact row-level packet comparing paired opportunity IDs, current values, proposed values, source evidence, contact decision, rollback, and Jeff/Whiteford approval. |
| Missing offer | AION HighLevel Agent Targeting placeholder; Sereact orphan/null quarantine opportunity | AION Agent Targeting row has no `offer_id`; Sereact orphan row has no company/offer/contact. | HOLD; do not infer offer from sibling row or GHL payload. | Current source + explicit offer-lane decision + exact local/live row scope. |
| Missing contact | All nine paired Agent Targeting rows plus AION placeholder and Sereact quarantine row | Agent Targeting opportunities lack local `contact_id`; research-staged rows often have a contact but quality/clearance varies. | HOLD; no auto-link from research-staged to Agent Targeting. | Verified person-level contact, contact-quality review, suppression/conflicts/prior-touch checks, and exact approval. |
| Suspect contact | Rigetti; Nexar; Sereact; Flatfile/Obvious; RADICL; AION; Kodiak | Low-confidence, duplicate, department, company-level LinkedIn, missing email/LinkedIn, or non-current-source issues are present. | HOLD; person/contact-quality review required before any link. | Official/current source or approved contact-source evidence; no department/company-level substitute as decision-maker contact unless explicitly kept for internal reference only. |
| Source-current gap | Sereact, Manifest OS, RADICL, Flatfile/Obvious, Electra, PickNik; older 2026-05-06 records; AION placeholder | Local source fields and nightly research evidence are not current-source proof for mutation or external use. | HOLD pending approved source-current review; do not rely on internal stage labels. | Approved current-source evidence with timestamp and source path before any mutation or public/named-company use. |
| Suppression/conflicts/prior-touch gap | All named records | Suppression checks remain `final_clearance=not_cleared`; conflicts are `required_before_send`; prior-touch is `not_checked` or needs review. | HOLD; no outreach, workflows, CRM movement, or public named-company use. | Local suppression, HighLevel DND/unsubscribe/bounce/manual suppression, opt-out/preferences, Whiteford conflicts, Clio/adverse-party precheck, duplicate/prior-touch, brand, and attorney review cleared. |

## Lifecycle reconciliation worksheet

### A. AION Robotics Corporation — duplicate lifecycle plus missing offer/contact

| Field | Local evidence |
| --- | --- |
| Prospect | `prospect_089c4bc541c05da752169c7a` / AION Robotics Corporation |
| Research-staged opportunity | `opp_8b9cb9cb94b88f73b74b7064`; stage `research_staged`; `offer_id=ai-patent`; `contact_id=contact_14b42eb2f15da73c52694fcb`; source `nightly_prospect_research`; created 2026-05-06. |
| Agent Targeting placeholder | `ghl-lead-prospect_089c4bc541c05da752169c7a`; stage `agent-targeting`; missing `offer_id`; missing `contact_id`; source `gohighlevel`; created/updated 2026-05-06. |
| Contact-quality note | `contact_14b42eb2f15da73c52694fcb` is Nicholas Nunno with email, LinkedIn, and phone fields, but confidence is 72 and suppression is `not_checked`; contact must not be auto-linked or used externally. |
| Clearance | Prospect suppression `not_checked`; conflicts `required_before_send`; suppression check `suppress_7605e2e8ab3ca93b488624ed` final clearance `not_cleared`; draft `draft_58482b23881d3aa940dfc4c1` external action allowed `0`. |
| Recommended posture | HOLD. Treat as lifecycle duplicate: the HighLevel Agent Targeting placeholder may represent the same prospect as the research-staged row, but the missing offer/contact fields must not be filled without future exact approval. |
| Future review need | Compare both opportunity rows, decide whether the GHL placeholder should be linked, closed, archived, or kept separate, verify contact quality/currentness, and clear all suppression/conflicts/prior-touch gates. |

### B. Paired Agent Targeting rows missing contact IDs

These rows each have a research-staged opportunity with an offer/contact and a HighLevel Agent Targeting opportunity with the offer but no contact. The safe position is no automatic carry-over of the research-staged contact into the Agent Targeting opportunity.

| Company | Prospect ID | Research-staged opportunity | Agent Targeting opportunity | Offer | Contact-quality / source-current issue | Posture |
| --- | --- | --- | --- | --- | --- | --- |
| Kodiak Robotics | `prospect_c6c776b4596056a65d055c7c` | `opp_b3657faae575b0051d983aac`; contact `contact_1ee5c91d35f8623be577e448` | `ghl-agent-targeting-prospect_c6c776b4596056a65d055c7c`; missing contact | `ai-patent` | Contact Tim Heister has person LinkedIn but no email, confidence 68, suppression `not_checked`; 2026-05-06 remediation history corrected earlier source/contact issues, so current-source evidence should be re-verified before any packet. | HOLD / source-current plus person-contact review. |
| Nexar | `prospect_c542c95f73995e2dbd2a15c3` | `opp_a506b58fff7a549c6030f18f`; contact `contact_f4aee748a54b4db92013be70` | `ghl-agent-targeting-prospect_c542c95f73995e2dbd2a15c3`; missing contact | `ai-compliance` | Duplicate Saurav Gupta rows; one LinkedIn URL is company-level, not person-level; 2026-05-06 remediation indicates entity/domain ambiguity was previously corrected. | HOLD / duplicate contact and entity-source review before any contact link. |
| Rigetti Computing | `prospect_d249372d03e9b2df1dd67726` | `opp_1d79b1a5b3897c337a3f43be`; contact `contact_87a4528f8034e072e84af395` | `ghl-agent-targeting-prospect_d249372d03e9b2df1dd67726`; missing contact | `ai-patent` | Contact `Sub cool` is flagged suspect, confidence 60, with an implausible person/source profile; CFO row also incomplete at confidence 55. | HOLD / suppress or replace suspect contact before any lifecycle link. |
| Electra | `prospect_bba8ec0dec6e73619770860d` | `opp_fa99adf8279fe1eab995446d`; contact `contact_e59b2ac9c62305afc09c3996` | `ghl-agent-targeting-prospect_bba8ec0dec6e73619770860d`; missing contact | `tech-gc` | Local contacts include source-current-looking team-page evidence but missing email/LinkedIn fields; suppression `not_checked`; source claims require current review before mutation. | HOLD / source-current and contact completeness review. |
| Flatfile / Obvious | `prospect_bea9dbd287cb8fcf077720d0` | `opp_8a46a832f79bb082853b7f8d`; contact `contact_01092cd32c14e0196826c3cf` | `ghl-agent-targeting-prospect_bea9dbd287cb8fcf077720d0`; missing contact | `tech-gc` | Naming convention risk remains; local contact set includes David Boskovic without email/LinkedIn and a department email `pr@flatfile.com`, which is not a decision-maker contact. | HOLD / naming decision plus person-contact review. |
| PickNik Robotics | `prospect_bd2e46b6a31bc423d3064218` | `opp_13871090d48553c1bb33f070`; contact `contact_7f7b01744f974e6675d820e4` | `ghl-agent-targeting-prospect_bd2e46b6a31bc423d3064218`; missing contact | `ai-patent` | Contact Nathan Brooks has person LinkedIn and confidence 85 but no email and suppression `not_checked`; source-current review still required. | HOLD / comparatively cleaner, but still no auto-link. |
| Manifest OS | `prospect_647f303b12467f9d88c68da4` | `opp_adf051f5b2ecf7ec4b948830`; contact `contact_901692d2b8ad292fa4dad595` | `ghl-agent-targeting-prospect_647f303b12467f9d88c68da4`; missing contact | `tech-gc` | National legaltech ambiguity; prior memo recommended default hold. Contact has person LinkedIn but no email and needs Jeff national-targeting decision. | HOLD / Jeff targeting decision before any packet. |
| RADICL | `prospect_2180fd85f6085ebc2a595f72` | `opp_47375ccb6ed1ab896657be50`; contact `contact_7b81ad216a82bb64bf401c90` | `ghl-agent-targeting-prospect_2180fd85f6085ebc2a595f72`; missing contact | `tech-gc` | Defense/cyber context; contact LinkedIn appears company-level, not person-level; phone is company-style; source-current and no-tag/default decision remain. | HOLD / contact-source and clearance review. |
| Sereact | `prospect_ef30df45ad62c93981758ca3` | `opp_7aaf67df3d4d774803c8607d`; contact `contact_be2ee5a1d75bffb184f923c5` | `ghl-agent-targeting-prospect_ef30df45ad62c93981758ca3`; missing contact | `ai-patent` | International/non-Mountain-West decision required; contact rows are low-confidence, missing email/LinkedIn, and were originally Instagram-source only though later source remediation improved company source posture. | HOLD / international-targeting, source-current, and contact-quality review. |

### C. Sereact orphan/null-company targeting-packet-ready row — quarantine lifecycle risk

| Field | Local evidence |
| --- | --- |
| Orphan/local opportunity | `ghl-opp-hUevEZZwjvyALchVzSzv`; prospect ID value `ghl-prospect-hUevEZZwjvyALchVzSzv`; no matching local prospect row; stage `targeting-packet-ready`; missing company, `offer_id`, and `contact_id`. |
| Payload clue | Read-only payload names `Sereact — Agent Targeting`, source `Growth OS nightly prospect research - Agent Targeting (prospect_ef30df45ad62c93981758ca3)`, GHL contact `1a2gBW9IhpZfgnh6bT2K`, contact/company `Sereact`. |
| Existing Sereact lifecycle | Local Sereact already has `ghl-agent-targeting-prospect_ef30df45ad62c93981758ca3` and `opp_7aaf67df3d4d774803c8607d`, with low-confidence contact and uncleared suppression/conflicts. |
| Work item | `work-ghl-stage-hUevEZZwjvyALchVzSzv-2026-05-10T18-32-02-464Z`; stage `queued`; risk `high`; approval required `1`; external action allowed `0`; blocker says not to deliver collateral or contact prospect until exact approval. |
| Recommended posture | HOLD / quarantine. Do not treat the orphan row as a valid packet-ready state. |
| Future review need | Exact Sereact lifecycle packet deciding whether the orphan row should be linked, closed, archived, renamed, or otherwise reconciled; include GHL payload, local opportunity pair, contacts, international decision, and clearance evidence. |

## Records that should remain HOLD now

All named records should remain HOLD because at least one required gate is unresolved:

- AION Robotics: duplicate lifecycle plus missing Agent Targeting offer/contact.
- Kodiak Robotics: paired lifecycle rows; missing Agent Targeting contact; source-current and person-contact review required.
- Nexar: paired lifecycle rows; duplicate/ambiguous Saurav Gupta contact and company/person LinkedIn issue.
- Rigetti Computing: paired lifecycle rows; suspect CEO contact and incomplete CFO contact.
- Electra: paired lifecycle rows; person-contact completeness and source-current review required.
- Flatfile/Obvious: paired lifecycle rows; naming decision and department-email/person-contact quality issue.
- PickNik Robotics: paired lifecycle rows; still missing Agent Targeting contact and all clearance gates.
- Manifest OS: paired lifecycle rows; national legaltech/targeting decision and clearance required.
- RADICL: paired lifecycle rows; defense/cyber sensitivity, contact-source issue, and clearance required.
- Sereact: paired lifecycle rows plus orphan packet-ready row; international targeting, source-current, and low-confidence contact issues.

## Current-source verification queue

Future source review should be diagnostic only unless separately authorized. Recommended order:

1. Sereact: because the orphan packet-ready row conflicts with local lifecycle state and the international/contact-quality posture is unresolved.
2. AION: because one HighLevel Agent Targeting placeholder lacks both offer and contact while the research-staged row has both.
3. Rigetti and Nexar: because source/contact remediation history makes stale or wrong person/entity data the highest risk.
4. Flatfile/Obvious: because company naming/rebrand and department email issues affect record identity.
5. Manifest OS and RADICL: because Jeff targeting/no-tag/default decisions should be made before any row packet.
6. Kodiak, Electra, PickNik: comparatively cleaner but still blocked by source-current, contact, suppression/conflicts/prior-touch, and attorney-review gates.

## Person/contact-quality review queue

No local contact should be treated as send-ready. Suggested contact review order:

1. Rigetti: suppress/replace `contact_87a4528f8034e072e84af395` (`Sub cool`) before any lifecycle link; review `contact_e5358ebe2bf6f9959920e19f` separately.
2. Nexar: resolve duplicate Saurav Gupta contacts and reject company-level LinkedIn as person-level evidence.
3. Sereact: verify Dr. Ralf Gulde and Marc Tuscher from official/current sources and resolve international targeting before use.
4. Flatfile/Obvious: decide legal/company naming and reject `pr@flatfile.com` as a decision-maker contact.
5. RADICL: verify person-level identity/LinkedIn for Chris Petersen before relying on the row.
6. AION, Kodiak, Electra, PickNik, Manifest OS: verify current role, person-level source, and email/LinkedIn completeness; still require suppression/conflicts/prior-touch clearance.

## Suppression, conflicts, and prior-touch gates

Before any future mutation or external action packet, each record must show:

- Local suppression status reviewed and cleared.
- HighLevel DND, unsubscribe, bounce, and manual suppression checked by an authorized operator.
- Opt-out/preference status reviewed.
- Consent basis documented; list membership, score, or internal stage is not consent.
- Whiteford conflicts cleared through the approved Whiteford process.
- Local Clio/adverse-party precheck completed where applicable.
- Duplicate/prior-touch lineage reviewed across research-staged, Agent Targeting, draft, suppression, approval, and execution authorization rows.
- Brand and attorney review completed for exact route, CTA, copy, claim, channel, and timing.
- No legal advice, no attorney-client relationship, no confidential information, no guarantees, and no outcome promises preserved.

## Future exact approval packet requirements

A future row-level lifecycle reconciliation packet must include, at minimum:

1. Exact environment and systems in scope: local SQLite, Supabase, HighLevel, Clio, docs, dashboard, or other.
2. Exact record IDs for every affected prospect, opportunity, contact, draft, suppression check, work item, approval item, and execution authorization.
3. Current values and proposed values for each row, including stage, offer, contact, prospect, source, suppression/conflicts/prior-touch fields, and related IDs.
4. Source-current evidence paths and timestamps; no source-blocked inference.
5. Contact-quality decision: keep, suppress, replace, or internal-reference-only, with person-level evidence.
6. Duplicate/lifecycle decision: link, keep separate, close, archive, rename, quarantine, or prepare a separate canonicalization packet.
7. Consent/suppression/conflicts/Clio/prior-touch/brand/attorney-review checklist.
8. Backup/export evidence, rollback/undo plan, dry-run/read-only verification plan, and stop conditions.
9. Named operator and exact Jeff/Whiteford approval language.
10. Explicit exclusion of outreach, workflow enrollment, CRM movement, email/SMS/social/LinkedIn/YouTube/ad action, public use, or client/prospect-facing action unless separately and exactly approved.

## Bottom-line recommendation

Keep every Agent Targeting lifecycle reconciliation record held. The safe useful value here is a diagnostic worksheet: it identifies where local lifecycle rows disagree, which contacts are not reliable enough to link, which source-current decisions come first, and what a future exact approval packet must prove. It does not authorize any mutation or external step.
