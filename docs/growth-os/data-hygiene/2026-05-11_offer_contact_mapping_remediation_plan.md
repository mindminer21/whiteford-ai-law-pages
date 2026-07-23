# Offer/contact mapping remediation plan — 2026-05-11

Task: `t_1a9b4706`
Parent audit: `t_f16eb5da`
Status: INTERNAL / LOCAL / NO-MUTATION PLAN ONLY

## Hard boundary

This packet is a remediation plan for Jeff/Whiteford review. It does not create mutation SQL, does not approve a database update, does not restore source access, does not enrich contacts from public web, does not authorize HighLevel/CRM/Clio/Supabase movement, and does not approve outreach, email, social, workflow, ads, publication, or any client/prospect-facing action.

Evidence used:

- `docs/growth-os/data-hygiene/2026-05-11_growth_os_data_hygiene_audit.md`
- `docs/digests/2026-05-10_daily_digest.md`
- `docs/strategy/four_lane_lead_magnet_promise_audit_2026-05-10.md`
- Read-only local SQLite inspection via `file:/Users/jeff/.openclaw/projects/mountain-west-growth-os/data/growth-os.sqlite?mode=ro&immutable=1`
- Existing local route/asset map: `/ai-patent-strategy-scorecard`, `/ai-compliance-gameplan`, `/colorado-ai-compliance-lawyer`, `/colorado-tech-general-counsel`, `/colorado-startup-ma-lawyer`, `/ai-law-youtube`

Read-only note: the local `offers` table currently exists but returned no rows in read-only inspection. The offer IDs below are therefore recommended future canonical lane keys based on already-used opportunity `offer_id` values and local strategy docs, not proof of an existing approved offer-table record.

## Executive posture

The next safe step is not prospecting, outreach, or CRM advancement. It is a narrow data-quality pass that makes the backlog safer to review: duplicate canonicalization first, then offer-lane mapping, then contact-linking only where a verified person-level contact already exists, then suppression/conflicts/prior-touch clearance. List membership, internal scoring, prior draft existence, or HighLevel placeholder status must not be treated as consent, conflicts clearance, legal clearance, or permission to contact.

## Canonical offer / asset lane map for future review

| Recommended future offer key | Offer / diagnostic lane | Primary route / asset | Supporting route | Trigger tag if separately opted in later | Use in this packet |
| --- | --- | --- | --- | --- | --- |
| `ai-patent` | AI Patent Strategy Scorecard / AI Patent Strategy Sprint | `/ai-patent-strategy-scorecard` | `/ai-law-youtube` for educational authority only | `workflow:ai-patent-strategy` | Safe candidate for AI/software/robotics/deep-tech invention-record readiness where local evidence supports AI/software/patent fit. |
| `ai-compliance` | AI Compliance Gameplan / AI Compliance Readiness Sprint | `/ai-compliance-gameplan` | `/colorado-ai-compliance-lawyer`; `/ai-law-youtube` for educational authority only | `workflow:ai-compliance-readiness` | Safe candidate for AI governance, vendor/data, human-review, ADMT/current-law readiness where local evidence supports compliance fit. |
| `tech-gc` | Tech Company Legal Health Checklist / Tech Company OGC Launchpad | `/colorado-tech-general-counsel` | `/ai-law-youtube` for educational authority only | `workflow:tech-gc-launchpad` | Safest broad default for technology-company legal-operating cleanup when patent/compliance/M&A evidence is insufficient. |
| `ma-readiness` | Founder M&A Readiness Checklist / Founder M&A Readiness Review | `/colorado-startup-ma-lawyer` | app-specific route context may also appear as `/founder-ma-readiness-checklist`; route needs Jeff/attorney decision before external use | `workflow:ma-readiness` | Use only where the record explicitly indicates M&A/diligence/readiness pressure. No current missing-ID row has enough local evidence for this lane. |
| `authority-watch` | Educational authority / no offer assignment | `/ai-law-youtube` | Relevant diagnostic route only after later source and legal review | none | HOLD lane for referral ecosystems, national/international ambiguity, source-blocked rows, or records without enough fit evidence. |

## Sequencing rule

1. Resolve duplicate canonical IDs before any offer/contact mutation for duplicate groups.
2. For each opportunity, assign a lane only when local prospect segment, source, prior strategy docs, and route map support it.
3. If evidence is insufficient, mark HOLD and name the missing input.
4. Link `contact_id` only to verified person-level contacts that already exist locally and pass quality review; do not link department emails, suspect names, or low-confidence duplicates.
5. Run suppression, conflicts, opt-out, local Clio/adverse-party precheck, duplicate/prior-touch, brand, attorney-review, consent, and final approval gates before any external or live-system use.

## Missing `offer_id` / `contact_id` remediation worksheet

### A. Legacy `identified` rows missing both IDs

These 28 older rows are all `source=gohighlevel`, `stage=identified`, last updated 2026-05-05, and lack both `offer_id` and `contact_id`. Recommended action is lane classification only, not mutation. Contact mapping remains HOLD for every row because no verified person-level `contact_id` is present in the opportunity record and all local contacts remain suppression-uncleared.

| Company | Opportunity ID | Evidence signal | Recommended offer lane | Contact recommendation | Mutation posture |
| --- | --- | --- | --- | --- | --- |
| Bifrost Electronics | `ghl-lead-funded-bifrost-electronics` | `funded-` prospect ID; electronics/deep-tech funding signal, but no stronger local patent/compliance/M&A proof in the audit. | HOLD / likely `tech-gc` only after source review | HOLD — need verified person-level contact and clearance | Do not mutate until source/fit evidence confirms broad Tech GC or AI Patent. |
| AskElephant | `ghl-lead-ai-askelephant` | `ai-` prospect ID. | `ai-compliance` candidate if product/use-case governance evidence exists; otherwise HOLD | HOLD | Do not mutate until source evidence confirms AI governance or patent-readiness fit. |
| Board in a Bag | `ghl-lead-prod-board-in-a-bag` | `prod-` prospect ID; product company but no local lane detail. | HOLD / possible `tech-gc` | HOLD | Need current source evidence and business milestone before lane assignment. |
| Boomtown Innovation Platforms | `ghl-lead-ref-boomtown-boulder` | `ref-` referral/ecosystem source. | `authority-watch` HOLD | HOLD | Referral ecosystem membership is not an offer fit or contact consent. |
| CU Boulder Venture Partners | `ghl-lead-ref-cu-venture-partners` | `ref-` ecosystem source. | `authority-watch` HOLD | HOLD | Treat as referral/partner context only pending Jeff relationship review. |
| Denver Ventures | `ghl-lead-ref-denver-ventures` | `ref-` ecosystem source. | `authority-watch` HOLD | HOLD | Need relationship/conflicts/prior-touch review before any lane use. |
| Flatirons AI | `ghl-lead-ai-flatirons-ai` | `ai-` prospect ID. | `ai-compliance` candidate; `ai-patent` only if invention/R&D evidence exists | HOLD | Need source-current fit review and contact verification. |
| GenFlux | `ghl-lead-ai-genflux` | `ai-` prospect ID. | `ai-patent` or `ai-compliance` HOLD; name suggests science/deep-tech but evidence is insufficient locally | HOLD | Need source evidence for patent versus compliance lane. |
| Gravitee | `ghl-lead-ai-gravitee` | `ai-` prospect ID. | HOLD; possible `ai-compliance` if AI governance evidence exists | HOLD | Need current source evidence before lane assignment. |
| Great Sky | `ghl-lead-ai-great-sky` | Duplicate group; `ai-software` segment in local prospect; same source/domain as funded row. | HOLD until canonical duplicate decision; likely `ai-compliance` or `tech-gc` after source review | HOLD | Resolve duplicate first. Do not map both rows independently. |
| Great Sky | `ghl-lead-funded-great-sky` | Duplicate group; `funded-startups` segment; same source/domain as AI row. | HOLD until canonical duplicate decision; likely `tech-gc` after source review | HOLD | Resolve duplicate first. Do not map both rows independently. |
| Innosphere Ventures | `ghl-lead-ref-innosphere` | `ref-` ecosystem source. | `authority-watch` HOLD | HOLD | Referral ecosystem record, not a prospect consent/offer fit. |
| Kamber Labs | `ghl-lead-prod-kamber-labs` | `prod-` prospect ID; product company but no local lane detail. | HOLD / possible `tech-gc` | HOLD | Need source-current fit evidence. |
| LightTable | `ghl-lead-ai-lighttable` | `ai-` prospect ID. | `ai-compliance` candidate unless source evidence supports patent-specific R&D | HOLD | Need source-current fit evidence. |
| Mindsmith | `ghl-lead-funded-mindsmith` | `funded-` prospect ID; local company name suggests AI/education but audit only proves funded row. | HOLD / possible `ai-compliance` or `tech-gc` | HOLD | Need current source and buyer milestone evidence. |
| Mountain Drifter | `ghl-lead-prod-mountain-drifter` | `prod-` prospect ID; no clear tech/AI/legal-operation evidence in audit. | HOLD | HOLD | Do not infer fit from product status alone. |
| Nectr Bottle Co. | `ghl-lead-prod-nectr` | `prod-` prospect ID; no clear technology/AI legal fit in audit. | HOLD | HOLD | Likely remove/park unless Jeff has fit evidence. |
| Pluto Bio | `ghl-lead-ai-pluto-bio` | Duplicate group; `ai-software` and high risk; same `pluto.bio` domain/source as funded row. | HOLD until canonical duplicate decision; likely `ai-patent` or `ai-compliance` after source review | HOLD | Resolve duplicate and source-sensitive life-sciences/privacy/IP fit before any mutation. |
| Pluto Bio | `ghl-lead-funded-pluto-bio` | Duplicate group; `funded-startups`; same `pluto.bio` domain/source. | HOLD until canonical duplicate decision; possible `tech-gc` or `ai-patent` after source review | HOLD | Resolve duplicate first. |
| Polaris Electro-Optics | `ghl-lead-funded-polaris-electro-optics` | `funded-` plus electro-optics/deep-tech name. | `ai-patent` candidate if source confirms technical invention/R&D; otherwise HOLD | HOLD | Need source-current evidence before mapping. |
| RVC HyperAccelerator | `ghl-lead-ref-rvc-hyperaccelerator` | `ref-` ecosystem source. | `authority-watch` HOLD | HOLD | Ecosystem/referral context only. |
| ReNu | `ghl-lead-prod-renu` | `prod-` prospect ID; no clear lane evidence. | HOLD | HOLD | Need source-current technology/legal-fit evidence. |
| Rockies Venture Club | `ghl-lead-ref-rockies-venture-club` | `ref-` ecosystem source. | `authority-watch` HOLD | HOLD | Referral ecosystem record only. |
| Seed Theory Skincare | `ghl-lead-prod-seed-theory` | `prod-` prospect ID; no clear tech/AI legal fit in audit. | HOLD | HOLD | Do not infer fit from product status alone. |
| Simple Body | `ghl-lead-prod-simple-body` | `prod-` prospect ID; no clear tech/AI legal fit in audit. | HOLD | HOLD | Do not infer fit from product status alone. |
| Swimlane | `ghl-lead-ai-swimlane` | Duplicate group; `ai-software`, source URL is Built In Colorado, same as funded row. | HOLD until canonical duplicate decision; likely `ai-compliance` or `tech-gc` after source review | HOLD | Resolve duplicate first. |
| Swimlane | `ghl-lead-funded-swimlane` | Duplicate group; `funded-startups`, same domain/source. | HOLD until canonical duplicate decision; likely `tech-gc` after source review | HOLD | Resolve duplicate first. |
| Techstars Boulder Accelerator | `ghl-lead-ref-techstars-boulder` | `ref-` ecosystem source. | `authority-watch` HOLD | HOLD | Referral ecosystem record only; not consent. |

### B. HighLevel Agent Targeting placeholder missing both IDs

| Company | Opportunity ID | Evidence signal | Recommended offer lane | Contact recommendation | Mutation posture |
| --- | --- | --- | --- | --- | --- |
| AION Robotics Corporation | `ghl-lead-prospect_089c4bc541c05da752169c7a` | Same prospect has a separate `research_staged` opportunity with `offer_id=ai-patent` and `contact_id=contact_14b42eb2f15da73c52694fcb`; local prospect segment is `ai-patent`. | `ai-patent` candidate for placeholder reconciliation | HOLD until duplicate/opportunity reconciliation confirms this HighLevel row should point to the same verified contact; then re-check suppression/conflicts/prior-touch | Do not directly mutate placeholder. Prepare a reconciliation packet that compares the `research_staged` and `agent-targeting` rows. |
| unknown/null company | `ghl-opp-hUevEZZwjvyALchVzSzv` | No local company name; `prospect_id=ghl-prospect-hUevEZZwjvyALchVzSzv`; stage is `targeting-packet-ready`. | HOLD / quarantine | HOLD | Missing company identity, source, offer fit, contact, and clearance. Treat as highest-risk data-quality row; do not use externally. |

### C. Agent Targeting rows with `offer_id` present but `contact_id` missing

These nine rows already carry an `offer_id`, and most have a corresponding `research_staged` row with a `contact_id`. The safe plan is not to link automatically. First verify whether the HighLevel Agent Targeting opportunity and the research-staged opportunity are intended to represent the same local prospect lifecycle, then review the existing contact quality and suppression status.

| Company | Agent Targeting opportunity ID | Existing offer_id | Corresponding local evidence | Contact recommendation | Mutation posture |
| --- | --- | --- | --- | --- | --- |
| Kodiak Robotics | `ghl-agent-targeting-prospect_c6c776b4596056a65d055c7c` | `ai-patent` | Research-staged row has `contact_1ee5c91d35f8623be577e448`; prospect segment `ai-patent`. | HOLD pending contact verification, suppression, conflicts, opt-out, prior-touch, and row-reconciliation review. | No auto-link. |
| Nexar | `ghl-agent-targeting-prospect_c542c95f73995e2dbd2a15c3` | `ai-compliance` | Research-staged row has `contact_f4aee748a54b4db92013be70`; audit flags duplicate/low-quality Saurav Gupta rows. | HOLD; resolve duplicate contact quality and company/person LinkedIn issue first. | No auto-link. |
| Rigetti Computing | `ghl-agent-targeting-prospect_d249372d03e9b2df1dd67726` | `ai-patent` | Research-staged row has `contact_87a4528f8034e072e84af395`; audit flags suspect CEO data and incomplete CFO record. | HOLD; replace/suppress suspect contacts before linking. | No auto-link. |
| Electra | `ghl-agent-targeting-prospect_bba8ec0dec6e73619770860d` | `tech-gc` | Research-staged row has `contact_e59b2ac9c62305afc09c3996`; prospect is Colorado/Mountain West deep-tech and attorney-review-required. | HOLD pending person-level source/currentness and clearance. | No auto-link. |
| Flatfile / Obvious | `ghl-agent-targeting-prospect_bea9dbd287cb8fcf077720d0` | `tech-gc` | Research-staged row has `contact_01092cd32c14e0196826c3cf`; audit flags department email and naming convention issue. | HOLD; do not use department email as decision-maker contact. Resolve Obvious/Flatfile naming and person-level contact. | No auto-link. |
| PickNik Robotics | `ghl-agent-targeting-prospect_bd2e46b6a31bc423d3064218` | `ai-patent` | Research-staged row has `contact_7f7b01744f974e6675d820e4`; prospect segment `ai-patent`, Colorado robotics. | HOLD pending person-level source/currentness and clearance. | No auto-link. |
| Manifest OS | `ghl-agent-targeting-prospect_647f303b12467f9d88c68da4` | `tech-gc` | Research-staged row has `contact_901692d2b8ad292fa4dad595`; local decision memo recommended default hold / national legaltech ambiguity. | HOLD; requires Jeff national-targeting decision and clearance. | No auto-link. |
| RADICL | `ghl-agent-targeting-prospect_2180fd85f6085ebc2a595f72` | `tech-gc` | Research-staged row has `contact_7b81ad216a82bb64bf401c90`; Colorado/Mountain West defense/cyber context. | HOLD pending source-current review, no-tag/default decision, and clearance. | No auto-link. |
| Sereact | `ghl-agent-targeting-prospect_ef30df45ad62c93981758ca3` | `ai-patent` | Research-staged row has `contact_be2ee5a1d75bffb184f923c5`; audit flags low-confidence contact data and international/non-Mountain-West status. | HOLD; requires Jeff international-targeting decision, official-source contact verification, and clearance. | No auto-link. |

## Duplicate-resolution worksheet

Principle: exact-name duplicate candidates should be resolved before opportunity/contact mapping because canonical prospect ID choice controls related opportunities, drafts, suppression checks, prior-touch evidence, and future HighLevel hygiene packets. The recommendations below are review posture only; they are not merge instructions.

| Duplicate group | Local IDs | Evidence from audit/read-only DB | Provisional recommendation | Evidence needed before any mutation | Related records to reconcile after approval |
| --- | --- | --- | --- | --- | --- |
| Great Sky | `ai-great-sky` + `funded-great-sky` | Exact company-name match, confidence 0.95, same domain `raising.fi`, same source URL, same location, same scores, segments `ai-software` vs `funded-startups`, both suppression/conflicts `not_checked`. | HOLD, then likely keep one canonical prospect and merge/archive the other after source/relationship review. Do not pick canonical by segment alone. | Current official/company source; confirmation that both rows refer to the same legal entity; Jeff/Whiteford relationship/prior-touch check; conflicts/suppression status; desired lane: AI Compliance, Tech GC, or hold. | `ghl-lead-ai-great-sky`, `ghl-lead-funded-great-sky`, any drafts/approval items/suppression checks tied to either prospect ID. |
| Pluto Bio | `ai-pluto-bio` + `funded-pluto-bio` | Exact company-name match, confidence 0.95, same domain `pluto.bio`, same source URL, same location, same scores, high risk, segments `ai-software` vs `funded-startups`, both suppression/conflicts `not_checked`. | HOLD. Likely canonicalize one prospect only after source and risk review; lane could be AI Patent, AI Compliance, Tech GC, or hold depending on current official facts. | Current official/company source; life-sciences/data/IP sensitivity review; confirmation of legal entity/domain; conflicts/suppression; prior-touch; attorney review of whether named-company awareness is appropriate. | `ghl-lead-ai-pluto-bio`, `ghl-lead-funded-pluto-bio`, related drafts/approval/suppression rows. |
| Swimlane | `ai-swimlane` + `funded-swimlane` | Exact company-name match, confidence 0.95, same `www.builtincolorado.com` source/domain field, same source URL, same location/scores, segments `ai-software` vs `funded-startups`, both suppression/conflicts `not_checked`. | HOLD. Likely canonicalize one prospect after source-current review; probable broad lane is Tech GC or AI Compliance, but current source field is not company-domain-quality. | Official company domain/source; confirmation of current funding/product facts; conflict/suppression/prior-touch; decision whether Built In source is acceptable only as a secondary evidence row. | `ghl-lead-ai-swimlane`, `ghl-lead-funded-swimlane`, related drafts/approval/suppression rows. |
| AION Robotics Corporation lifecycle duplicate risk | `opp_8b9cb9cb94b88f73b74b7064` plus `ghl-lead-prospect_089c4bc541c05da752169c7a` for same prospect | Not listed in `duplicate_candidates`, but read-only opportunity query shows one research-staged row with `offer_id=ai-patent` and contact plus one HighLevel placeholder missing both IDs for same `prospect_id`. | HOLD as opportunity-reconciliation duplicate risk, not prospect duplicate. | Confirm whether HighLevel placeholder should be linked to the research-staged opportunity or closed/archived; verify contact and all clearance gates. | Both AION opportunities, contact `contact_14b42eb2f15da73c52694fcb`, suppression checks, HighLevel placeholder hygiene notes. |
| Research-staged vs Agent Targeting paired rows | Kodiak, Nexar, Rigetti, Electra, Flatfile/Obvious, PickNik, Manifest OS, RADICL, Sereact | Each has a research-staged opportunity with offer/contact and a HighLevel Agent Targeting opportunity with offer but missing contact. | HOLD as lifecycle reconciliation group. | Confirm intended one-to-one mapping, contact quality, HighLevel placeholder IDs, suppression/conflicts/prior-touch status, and any Jeff targeting decisions. | Corresponding research-staged row, Agent Targeting row, contact row, drafts, work items, suppression checks, execution authorizations. |

## Contact-quality remediation worksheet

| Contact issue | Affected company / records | Recommendation | Evidence required before contact_id mutation or external use |
| --- | --- | --- | --- |
| Suspect CEO contact | Rigetti Computing `Sub cool` | HOLD / suppress from any external-facing packet; do not link to Agent Targeting. | Official leadership source, person-level LinkedIn or reliable bio, source-current review, conflicts/suppression. |
| Low-confidence incomplete CFO | Rigetti Computing `Rob Mortensen` | HOLD. | Verified role, email/LinkedIn if approved source access exists, person-level source. |
| Duplicate/ambiguous person rows | Nexar `Saurav Gupta` duplicate rows | HOLD until duplicate contact resolution; company-level LinkedIn cannot be treated as person-level. | Confirm correct entity and current person role; person-level source; resolve duplicate contact row. |
| Low-confidence international contacts | Sereact `Dr. Ralf Gulde`, `Marc Tuscher` | HOLD; no external use; no HighLevel link until official-source confirmation and Jeff international-targeting decision. | Official company leadership/source, approved international targeting posture, conflicts/suppression. |
| Department email | Flatfile/Obvious `pr@flatfile.com` | HOLD / do not use as decision-maker `contact_id`. | Verified person-level decision-maker contact or explicit internal decision to keep department email only for non-outreach reference. |
| Missing email/LinkedIn broadly | 17/19 missing email; 11/19 missing LinkedIn; 10/19 missing both | HOLD for external use. | Approved source-access restoration or approved manual-source workflow; all clearances. |

## Suppression / conflicts / prior-touch clearance checklist

This checklist must pass before any outreach, CRM movement, social post/comment/tag/DM, email/newsletter, HighLevel workflow/list/smart-list use as an audience, Clio action, public/client-facing named-company use, or contact enrichment that would leave internal planning.

### Record identity and duplication

- [ ] Canonical prospect ID selected or row marked HOLD.
- [ ] Duplicate candidates reviewed and resolved by approved human operator.
- [ ] Research-staged vs HighLevel Agent Targeting lifecycle rows reconciled.
- [ ] Company legal name, domain, and source URL verified from approved source-access path.
- [ ] Referral/ecosystem records are not treated as prospects without relationship review.

### Offer / asset fit

- [ ] Offer lane has local evidence beyond list membership or filename prefix.
- [ ] Route/CTA is approved for the lane.
- [ ] Tech GC branch signals are not treated as cross-workflow consent.
- [ ] M&A route ambiguity is resolved before using `/colorado-startup-ma-lawyer` or `/founder-ma-readiness-checklist` externally.
- [ ] `authority-watch` rows remain educational/internal only and carry no workflow trigger.

### Contact quality

- [ ] Person-level contact identity verified from approved sources.
- [ ] Role/title currentness verified.
- [ ] Email and LinkedIn fields are person-level and not department/company-level unless explicitly approved for internal-only reference.
- [ ] Low-confidence/suspect/duplicate contacts resolved or suppressed.
- [ ] No confidential, regulated, privileged, trade-secret, employee/applicant, customer-specific, adverse-party, or matter-specific data is requested or stored via public forms.

### Consent and suppression

- [ ] Local suppression status cleared.
- [ ] HighLevel DND/unsubscribe/bounce/manual suppression checked by authorized operator.
- [ ] Opt-out and preference status reviewed.
- [ ] Consent basis documented; list membership or score is not consent.
- [ ] If no affirmative opt-in exists, no email nurture, workflow enrollment, smart-list audience use, social outreach, or contact attempt occurs.

### Conflicts / legal clearance

- [ ] Whiteford conflicts status cleared by approved Whiteford process.
- [ ] Local Clio/adverse-party precheck completed by authorized operator where applicable.
- [ ] Prior-touch / duplicate-prior-touch status reviewed.
- [ ] Attorney review completed for exact copy, claims, route, and use case.
- [ ] No legal advice, no attorney-client relationship, no guarantee, no outcome promise, and no confidential-info warnings remain intact.

### Channel-specific gates

- [ ] HighLevel workflow is Draft/Off and exact activation approval exists before any workflow use.
- [ ] Sender, reply-to, postal footer, unsubscribe/preferences, privacy/terms/disclaimer URLs, attorney-advertising treatment, and deliverability gates are approved before email use.
- [ ] Social/LinkedIn copy has final no-tag/manual-tag decision, source-current evidence, CTA/UTM approval, and human posting owner before any manual public use.
- [ ] CRM stage movement has exact row-level approval and rollback/notes plan.
- [ ] Supabase/SQLite/HighLevel mutation has a signed/exact mutation packet and backup/read-only verification plan.

## Future safe mutation packet format — definition only, not authorization

A future mutation packet should be one self-contained approval artifact. It should not include free-form broad permission. It should include:

1. Packet title, date, owner, reviewer, and scope.
2. Exact environment: local SQLite, Supabase, HighLevel, Clio, docs, or dashboard; production/sandbox/local status.
3. Source evidence list with file paths, read-only query outputs, and source-current timestamps.
4. A row-level worksheet with current values and proposed values:
   - table/system
   - primary key
   - company/prospect/contact label
   - current `offer_id`, `contact_id`, stage/status, suppression/conflicts fields
   - proposed new value
   - reason
   - supporting evidence path
   - clearance status
   - rollback/undo plan
5. Duplicate canonicalization decisions with related child records to reconcile.
6. Contact-quality decisions with explicit suppress/replace/keep rationale.
7. Suppression/conflicts/opt-out/prior-touch/brand/attorney-review checklist signed off.
8. Dry-run/read-only verification commands.
9. Backup/export evidence and restore plan.
10. Stop conditions.
11. Exact operator approval line naming who may execute, where, and when.
12. Post-mutation read-only verification plan.

Forbidden in this packet format unless separately authorized later: blanket SQL, wildcard updates, automatic contact enrichment, workflow enrollment, HighLevel send/test send, public posting, source-blocked inference, client/prospect-facing use, or any action that treats internal scores/list membership as consent.

## Recommended no-mutation next tasks

1. Jeff/Whiteford review this worksheet and mark each HOLD row as: keep in hold, approve source review, retire/archive candidate, or prepare exact mutation packet.
2. Prepare a duplicate-canonicalization approval packet for Great Sky, Pluto Bio, and Swimlane only; do not combine with outreach.
3. Prepare a lifecycle reconciliation packet for research-staged vs Agent Targeting rows; include AION and the nine Agent Targeting rows missing contact IDs.
4. Prepare a contact-quality replacement/suppression review for Rigetti, Nexar, Sereact, and Flatfile/Obvious.
5. Only after those packets pass, draft exact row-level mutation packets for a human/operator decision.

## Bottom-line recommendation

Keep all affected records internal and held. The safest near-term improvement is to standardize the diagnostic layer: canonical prospect IDs, defensible offer-lane labels, verified person-level contacts, and explicit clearance evidence. Do not generate new drafts or asks until the duplicate and mapping backlog is narrower and reviewable.
