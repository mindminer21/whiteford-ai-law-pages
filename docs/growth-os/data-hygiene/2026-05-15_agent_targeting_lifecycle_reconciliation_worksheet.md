# Agent Targeting lifecycle reconciliation worksheet — 2026-05-15

Task: `t_3a3c3fa8`  
Tenant: `whiteford-mountain-west`  
Status: INTERNAL / READ-ONLY / NO-MUTATION WORKSHEET

## Hard boundary

This worksheet is a private Jeff/Whiteford diagnostic artifact only. It uses already-local source material from the 2026-05-15 data-hygiene cleanup packet, its review, the parent duplicate canonicalization packet, and the prior 2026-05-11 Agent Targeting reconciliation plan. No public-source browsing, contact enrichment, prospect expansion, source-provider access, CRM/HighLevel/Supabase/Clio/SQLite mutation, workflow activation, send, social/public/ad action, or client/prospect-facing use was performed or authorized.

Internal records, scores, local contacts, HighLevel stages, `agent-targeting` / `targeting-packet-ready` labels, dashboard rows, source snippets, QMD retrieval, prior packets, and this worksheet are not consent, not conflicts clearance, not source-current proof, not attorney approval, not legal advice, and not permission to contact.

Legal-services growth posture remains narrow and diagnostic: reduce data-quality friction first, fulfill a reviewable internal hygiene value before any next-step ask, keep all copy educational/non-hypey/opt-in-only/non-confidential, and require attorney/Whiteford review before external use.

## Inputs used

- `docs/growth-os/data-hygiene/2026-05-15_growth_os_data_hygiene_cleanup_packet.md`
- `docs/growth-os/data-hygiene/2026-05-15_growth_os_data_hygiene_cleanup_packet_evidence.json`
- `docs/reviews/2026-05-15_data_hygiene_consent_gate_review.md`
- Parent packet: `docs/growth-os/data-hygiene/2026-05-15_duplicate_canonicalization_review_packet.md`
- Parent evidence JSON: `docs/growth-os/data-hygiene/2026-05-15_duplicate_canonicalization_review_packet_evidence.json`
- Prior worksheet: `docs/growth-os/data-hygiene/2026-05-11_agent_targeting_lifecycle_reconciliation_plan.md`

## Executive posture

All named Agent Targeting, targeting-packet-ready, duplicate-held, suspect-contact, source-current, suppression/conflicts, and prior-touch rows remain HOLD. The safe value of this worksheet is to classify the reconciliation backlog and define what a future exact approval packet would have to prove. It does not approve auto-linking contacts, inferring offers from sibling opportunities, moving lifecycle stages, marking anything packet-ready, merging prospects, suppressing/replacing contacts, or sending/publishing any communication.

The 2026-05-15 data-hygiene packet confirms 10 `agent-targeting` rows and one `targeting-packet-ready` orphan missing contact. It also confirms 30 opportunities missing `offer_id`, 39 missing `contact_id`, 49 stale opportunities, three pending prospect duplicate groups, 20/20 contacts with `suppression_status=not_checked`, 20/20 suppression checks not cleared, 0/20 outreach drafts externally allowed, and 8/8 execution authorizations not sent. Those counts support a HOLD-first reconciliation sequence rather than a mutation packet.

## Future review order

1. Sereact quarantine / packet-ready discrepancy: resolve the orphan/null-company `targeting-packet-ready` row before relying on any Agent Targeting readiness label.
2. AION lifecycle placeholder: compare the research-staged row with offer/contact against the HighLevel Agent Targeting placeholder missing both offer and contact.
3. Pending duplicate groups from parent packet: Great Sky, Pluto Bio, and Swimlane must stay duplicate-held before any offer/contact mapping or canonical route selection.
4. Highest-risk suspect contact rows: Rigetti, Nexar, Flatfile/Obvious, Sereact, Kodiak, and AION; add Kore.ai to the broader contact-quality queue even though it is not one of the 11 Agent Targeting/packet-ready rows.
5. Remaining Agent Targeting contact-missing pairs: Electra, Manifest OS, PickNik, RADICL, plus any comparatively cleaner Kodiak/AION contact rows after quality review.
6. Cross-cutting exact approval packet design: only after the diagnostic classes above are reviewed should Jeff/Whiteford consider any row-level mutation packet.

## Risk-class summary

| Risk class | Rows / examples | Local evidence issue | Current posture | Future review threshold |
| --- | --- | --- | --- | --- |
| Duplicate lifecycle | Great Sky, Pluto Bio, Swimlane duplicate pairs; AION research-staged vs Agent Targeting placeholder; Sereact research-staged + Agent Targeting + orphan packet-ready row | Multiple local rows may describe the same company/lifecycle, but local evidence does not select a canonical row or child-record disposition. | HOLD; no merge, link, close, archive, stage movement, or child reassignment. | Exact row-level packet naming canonical/local IDs, all child records, current/proposed values, rollback, verification, and Jeff/Whiteford approval. |
| Missing offer | AION Agent Targeting placeholder; Sereact orphan/null-company packet-ready row; 28 legacy identified HighLevel-sourced rows outside the Agent Targeting focus | `offer_id` is missing, and sibling/research-staged rows or GHL payloads are not permission to infer an offer lane. | HOLD; no offer inference. | Current-source review plus explicit offer-lane decision and exact system/table scope. |
| Missing contact | All 10 Agent Targeting rows plus the one targeting-packet-ready orphan | Agent Targeting rows lack `contact_id`; research-staged siblings may have contacts but quality, currentness, consent, and clearance vary. | HOLD; no auto-copy from sibling row. | Verified person-level contact, contact-quality decision, suppression/conflicts/prior-touch clearance, and exact approval. |
| Suspect contact | Rigetti `Sub cool`; Nexar duplicate Saurav Gupta rows/company LinkedIn; Flatfile/Obvious department email and incomplete founder row; Sereact low-confidence rows; Kodiak/AION below-threshold or incomplete contacts; Kore.ai broad contact-quality queue | Local contacts are low-confidence, incomplete, company/department-level, stale/ambiguous, or not cleared. | HOLD; internal review only. | Keep/suppress/replace/internal-reference-only decision with person-level current evidence and no external use unless separately approved. |
| Source-current gap | Sereact, AION, Manifest OS, RADICL, Flatfile/Obvious, Electra, PickNik, Swimlane duplicate source-evidence gap | Local snippets, old rows, and prospect fields are not current-source proof. | HOLD; no public/named-company use. | Approved source-current evidence with timestamp/path; no source-blocked inference. |
| Suppression / conflicts / prior-touch gap | All named rows | Local suppression remains not cleared; conflicts required before send; prior-touch/duplicate review unresolved or missing. | HOLD; no outreach, workflow, CRM movement, public use, or stage reliance. | Local suppression, HighLevel DND/unsubscribe/bounce/manual suppression, opt-out/preferences, Whiteford conflicts, Clio/adverse-party precheck, duplicate/prior-touch, brand, and attorney review cleared. |

## Agent Targeting / targeting-packet-ready rows by lifecycle and data-quality risk

### 1. Sereact — quarantine / packet-ready lifecycle conflict

| Field | Local evidence |
| --- | --- |
| Research-staged lifecycle row | `opp_7aaf67df3d4d774803c8607d`; prospect `prospect_ef30df45ad62c93981758ca3`; `offer_id=ai-patent`; `contact_id=contact_be2ee5a1d75bffb184f923c5`; source `nightly_prospect_research`. |
| Agent Targeting row | `ghl-agent-targeting-prospect_ef30df45ad62c93981758ca3`; stage `agent-targeting`; `offer_id=ai-patent`; missing `contact_id`; source `gohighlevel`; suppression `consent_gap_no_auto_send`; conflicts `required_before_send`. |
| Orphan packet-ready row | `ghl-opp-hUevEZZwjvyALchVzSzv`; prospect value `ghl-prospect-hUevEZZwjvyALchVzSzv`; stage `targeting-packet-ready`; missing local company, `offer_id`, and `contact_id`. |
| Contact risks | `contact_be2ee5a1d75bffb184f923c5` Dr. Ralf Gulde and `contact_44ef39121d6425c00cb55936` Marc Tuscher are low-confidence, missing email/LinkedIn, and require international/source-current review before any use. |
| Risk classes | Duplicate lifecycle; missing offer for orphan; missing contact for Agent Targeting/orphan; suspect contact; source-current gap; suppression/conflicts/prior-touch gap. |
| Posture | HOLD / quarantine. Do not treat `targeting-packet-ready` as readiness; do not link, close, archive, rename, contact, or mark cleared. |
| Future review need | Sereact-only exact lifecycle quarantine packet naming all three opportunity rows, the GHL payload clue, contacts, international/non-Mountain-West targeting decision, source-current evidence, clearance evidence, child-record disposition, rollback, and stop conditions. |

### 2. AION Robotics Corporation — lifecycle placeholder plus missing offer/contact

| Field | Local evidence |
| --- | --- |
| Research-staged lifecycle row | `opp_8b9cb9cb94b88f73b74b7064`; prospect `prospect_089c4bc541c05da752169c7a`; stage `research_staged`; `offer_id=ai-patent`; `contact_id=contact_14b42eb2f15da73c52694fcb`; source `nightly_prospect_research`. |
| Agent Targeting placeholder | `ghl-lead-prospect_089c4bc541c05da752169c7a`; stage `agent-targeting`; missing `offer_id`; missing `contact_id`; source `gohighlevel`; suppression `not_checked`; conflicts `required_before_send`; updated 2026-05-06. |
| Contact risk | Nicholas Nunno row has email/LinkedIn/phone-like fields but confidence 72 and suppression `not_checked`; it must not be auto-linked or used externally. |
| Risk classes | Duplicate lifecycle; missing offer; missing contact; suspect/under-threshold contact; source-current gap; suppression/conflicts/prior-touch gap. |
| Posture | HOLD. Treat the GHL Agent Targeting placeholder as a lifecycle duplicate risk, not a fill-in task. |
| Future review need | AION-specific row packet comparing both opportunity rows, deciding link/close/archive/keep-separate posture, verifying contact quality/currentness, proving suppression/conflicts/prior-touch gates, and naming every current/proposed field before any mutation. |

### 3. Parent duplicate-held identified rows — Great Sky, Pluto Bio, Swimlane

These are not Agent Targeting rows, but the 2026-05-15 cleanup packet says duplicate canonicalization must precede offer/contact mapping. The parent packet caveat controls: do not choose a canonical row solely because one ID begins with `ai-` and another begins with `funded-`; segment labels are routing metadata, not company-identity proof, consent, source-current proof, or clearance.

| Company | Duplicate IDs | Related opportunities | Local issue | Posture |
| --- | --- | --- | --- | --- |
| Great Sky | `ai-great-sky` + `funded-great-sky`; duplicate `dup-ai-great-sky-funded-great-sky`; confidence 0.95; pending | `ghl-lead-ai-great-sky`; `ghl-lead-funded-great-sky`; both `identified`, missing offer/contact | Exact company/domain match; both sides have draft/suppression/approval implications, all blocked/not cleared. | HOLD duplicate-held; no independent mapping, merge, or draft/send action. |
| Pluto Bio | `ai-pluto-bio` + `funded-pluto-bio`; duplicate `dup-ai-pluto-bio-funded-pluto-bio`; confidence 0.95; pending | `ghl-lead-ai-pluto-bio`; `ghl-lead-funded-pluto-bio`; both `identified`, missing offer/contact | High-risk regulated/life-science sensitivity; AI/funded rows likely one company identity but canonical ID and child disposition remain TBD. | HOLD duplicate-held; no canonical row selected. |
| Swimlane | `ai-swimlane` + `funded-swimlane`; duplicate `dup-ai-swimlane-funded-swimlane`; confidence 0.95; pending | `ghl-lead-ai-swimlane`; `ghl-lead-funded-swimlane`; both `identified`, missing offer/contact | Mature-company/existing-counsel caveat; no `source_evidence` row found for exact source URL in parent query; prospect URL alone is not source-current proof. | HOLD duplicate-held; source-current proof required before any downstream mapping. |

Parent caveats carried forward:

- No merge or canonical row selection is approved by the parent packet or this worksheet.
- Duplicate groups require exact future approval language naming canonical prospect ID, non-canonical disposition, child-record handling, backup/export path, verification queries, rollback, and stop conditions.
- All related opportunities, drafts, approval items, suppression checks, and execution authorizations remain frozen.
- Any row with pending/missing/contradictory suppression, conflicts, opt-out, prior-touch, source-current, or child-record evidence remains HOLD.

### 4. Agent Targeting rows with offer present but contact missing

These rows have a HighLevel Agent Targeting opportunity with an offer but no contact. Each may have a research-staged sibling contact, but no contact may be copied into Agent Targeting without exact future approval.

| Company | Prospect ID | Agent Targeting opportunity | Offer | Key data-quality risk | Posture |
| --- | --- | --- | --- | --- | --- |
| Electra | `prospect_bba8ec0dec6e73619770860d` | `ghl-agent-targeting-prospect_bba8ec0dec6e73619770860d` | `tech-gc` | Missing Agent Targeting contact; source-current and contact-completeness review required; suppression `consent_gap_no_auto_send`; conflicts required. | HOLD / internal review only. |
| Flatfile / Obvious | `prospect_bea9dbd287cb8fcf077720d0` | `ghl-agent-targeting-prospect_bea9dbd287cb8fcf077720d0` | `tech-gc` | Naming/rebrand ambiguity; David Boskovic row lacks email/LinkedIn; `pr@flatfile.com` is a department email, not a decision-maker contact. | HOLD / naming and person-contact review. |
| Kodiak Robotics | `prospect_c6c776b4596056a65d055c7c` | `ghl-agent-targeting-prospect_c6c776b4596056a65d055c7c` | `ai-patent` | Missing contact; Tim Heister/Alex Vins rows below or near quality threshold, email missing, suppression not checked. | HOLD / source-current plus person-contact review. |
| Manifest OS | `prospect_647f303b12467f9d88c68da4` | `ghl-agent-targeting-prospect_647f303b12467f9d88c68da4` | `tech-gc` | National legaltech/targeting decision; contact row has no email/LinkedIn; source-current and clearance required. | HOLD / Jeff targeting decision before row packet. |
| Nexar | `prospect_c542c95f73995e2dbd2a15c3` | `ghl-agent-targeting-prospect_c542c95f73995e2dbd2a15c3` | `ai-compliance` | Duplicate Saurav Gupta contacts; one LinkedIn field is company-level; no email; suppression not checked. | HOLD / duplicate contact and person-vs-company evidence review. |
| PickNik Robotics | `prospect_bd2e46b6a31bc423d3064218` | `ghl-agent-targeting-prospect_bd2e46b6a31bc423d3064218` | `ai-patent` | Missing Agent Targeting contact; Nathan Brooks row appears comparatively cleaner but lacks email and all clearance gates remain open. | HOLD / comparatively cleaner, still no auto-link. |
| RADICL | `prospect_2180fd85f6085ebc2a595f72` | `ghl-agent-targeting-prospect_2180fd85f6085ebc2a595f72` | `tech-gc` | Defense/cyber sensitivity; contact-source issue; company-style phone/LinkedIn concerns; source-current and no-tag/default decision remain. | HOLD / contact-source and clearance review. |
| Rigetti Computing | `prospect_d249372d03e9b2df1dd67726` | `ghl-agent-targeting-prospect_d249372d03e9b2df1dd67726` | `ai-patent` | `Sub cool` suspect CEO row; Rob Mortensen CFO row incomplete; suppression not checked. | HOLD / suppress or replace suspect contact before any lifecycle link. |

## Contact-quality review queue

No contact below is send-ready or link-ready. Suggested diagnostic order:

1. Rigetti: suppress/replace or quarantine `contact_87a4528f8034e072e84af395` (`Sub cool`) before any lifecycle link; review `contact_e5358ebe2bf6f9959920e19f` separately.
2. Nexar: resolve duplicate Saurav Gupta rows and reject company-level LinkedIn as person-level evidence unless explicitly retained for internal reference only.
3. Flatfile/Obvious: decide naming/rebrand posture; reject `pr@flatfile.com` as a decision-maker contact; verify David Boskovic only from current person-level source before use.
4. Sereact: verify Dr. Ralf Gulde and Marc Tuscher from official/current sources and resolve international/non-Mountain-West targeting before any packet.
5. Kodiak and AION: verify current role, person-level source, and email/LinkedIn completeness; confidence/suppression gaps prevent auto-linking.
6. RADICL, Manifest OS, Electra, PickNik: verify person-level identity, current role, source-current evidence, and suppression/conflicts/prior-touch gates.
7. Kore.ai broad queue: not one of the 11 Agent Targeting/packet-ready rows in this worksheet, but the 2026-05-15 cleanup packet flags `contact_459c2a325250da48f37fa924` as confidence 20; keep it out of any recipient-level drafting until separately reviewed.

## Source-current verification queue

No source review here authorizes live browsing or source-provider access. A future approved source-current packet should proceed in this diagnostic order:

1. Sereact: orphan packet-ready row conflicts with local lifecycle state; international/contact posture unresolved.
2. AION: Agent Targeting placeholder lacks both offer and contact while a sibling row has both.
3. Great Sky, Pluto Bio, Swimlane: duplicate groups must be canonicalized or held before any source-current/offer/contact use; Swimlane has the weakest `source_evidence` grounding in the parent packet.
4. Rigetti and Nexar: source/contact remediation history and suspect/duplicate contacts create high risk of stale or wrong person/entity data.
5. Flatfile/Obvious: naming/rebrand and department-email issues affect company identity and contact identity.
6. Manifest OS and RADICL: Jeff targeting/no-tag/default decisions should be made before any row-level packet.
7. Electra, PickNik, Kodiak: comparatively cleaner but still blocked by source-current, contact, suppression/conflicts/prior-touch, and attorney-review gates.

## Suppression, conflicts, and prior-touch checklist for future packets

Before any future mutation or external action packet, every affected row must show:

- Local suppression status reviewed and cleared.
- HighLevel DND, unsubscribe, bounce, and manual suppression checked by an authorized operator.
- Opt-out/preference status reviewed.
- Consent basis documented; internal list membership, score, source snippet, or stage label is not consent.
- Whiteford conflicts cleared through the approved Whiteford process.
- Clio/adverse-party precheck completed where applicable.
- Duplicate/prior-touch lineage reviewed across research-staged, Agent Targeting, packet-ready/orphan, duplicate candidate, draft, suppression, approval, execution authorization, and contact rows.
- Brand and attorney review completed for exact route, CTA, copy, claim, channel, and timing.
- No legal advice, no attorney-client relationship, no confidential information, no guarantees, and no outcome promises preserved.
- Any public/named-company use separately approved; this worksheet remains private/internal only.

## Exact future packet requirements before any mutation

A future row-level lifecycle reconciliation or canonicalization execution packet must include, at minimum:

1. Exact task/date and exact systems in scope: local SQLite, Supabase mirror, HighLevel, CRM, Clio, dashboard cache, docs, or other named systems. If any system is out of scope, say so.
2. Named operator and reviewer.
3. Backup/export path with timestamp before mutation.
4. Exact table and primary-key list for every affected row.
5. Current value and proposed value for every changed field.
6. Prospect, opportunity, contact, duplicate candidate, source evidence, outreach draft, approval item, suppression check, work item, and execution authorization IDs where applicable.
7. Lifecycle decision for each row: link, keep separate, close, archive, rename, quarantine, alias, merge, retire, or leave unchanged.
8. Canonical prospect ID for any duplicate group and non-canonical row disposition; no canonical ID may be implied from segment prefix.
9. Offer-lane decision, if any, with source-current evidence and reason no sibling inference is being used.
10. Contact-quality decision for every candidate contact: keep, suppress, replace, or internal-reference-only, with person-level evidence and confidence rationale.
11. Source-current evidence paths/timestamps; no source-blocked inference.
12. Consent/suppression/conflicts/Clio/prior-touch/brand/attorney-review checklist results.
13. Verification queries to run before and after mutation, including expected row counts.
14. Rollback/undo steps for every mutation.
15. Stop conditions and abort behavior.
16. Exact Jeff/Whiteford approval language naming the systems, tables, IDs, values, operator, rollback, and whether any external action is explicitly excluded.
17. Explicit statement that outreach, workflow enrollment, CRM movement, email/SMS/social/LinkedIn/YouTube/ad action, public use, legal advice, or client/prospect-facing action is excluded unless separately and exactly approved.

## Stop conditions

Stop and do not mutate if any of these are true:

- Jeff/Whiteford has not given exact written approval for the named future packet.
- The packet does not name exact primary keys, current values, proposed values, backup/export path, verification queries, rollback, and operator.
- Any source evidence is stale, inaccessible, contradictory, source-blocked, or not clearly tied to the same company/contact identity.
- Any row has missing or contradictory suppression, conflicts, opt-out, consent, prior-touch, source-current, contact-quality, or attorney-review posture.
- Any duplicate group still has unresolved canonical ID, non-canonical disposition, or child-record handling.
- Any contact is low-confidence, department/company-level, incomplete, suspect, non-current, or not person-level verified.
- Any draft, approval item, execution authorization, workflow, CRM/HighLevel row, dashboard state, or contact would become send/export/enroll-ready as a side effect.
- The proposed action would write to SQLite, Supabase, HighLevel, CRM, Clio, public pages, workflows, LinkedIn/social, email/SMS, ads, source providers, prospect/contact records, or live dashboards without separate exact approval for that system.
- Unexpected row counts, schema drift, missing IDs, new duplicate groups, or new GHL payload conflicts appear.

## Copy/paste Jeff decision boxes

### Option A — GO for read-only diagnostic packets only

```text
GO for read-only diagnostic packets only: I approve using the 2026-05-15 Agent Targeting lifecycle reconciliation worksheet as a private/internal decision aid and may request one future no-mutation packet for Sereact quarantine, AION lifecycle reconciliation, duplicate canonicalization, or contact-quality review. This does not approve any SQLite, Supabase, HighLevel, CRM, Clio, dashboard, workflow, outreach, public/social, email/SMS, source-provider, prospect/contact, legal, or client/prospect-facing action.
```

### Option B — HOLD

```text
HOLD: Do not proceed beyond this read-only Agent Targeting lifecycle reconciliation worksheet. Keep all named Agent Targeting, targeting-packet-ready, duplicate-held, suspect-contact, source-current, suppression/conflicts, prior-touch, draft, approval, work-item, and execution authorization rows frozen. No mutation or external action is approved.
```

### Option C — REVISE

```text
REVISE: Update the Agent Targeting lifecycle reconciliation worksheet before I decide. Required revisions: [name missing row, risk class, source-current issue, lifecycle decision concern, contact-quality concern, approval language, stop condition, or other requested change]. No mutation or external action is approved while revisions are pending.
```

## Bottom-line recommendation

Keep every named row HOLD. The next safe internal step is not execution; it is choosing one narrow read-only packet tranche: Sereact quarantine first, AION lifecycle second, duplicate canonicalization follow-through for Great Sky/Pluto Bio/Swimlane third, then contact-quality suppress/replace/keep review. Any future mutation requires exact Jeff/Whiteford approval with row-level values, rollback, verification, and no-external-action exclusions.
