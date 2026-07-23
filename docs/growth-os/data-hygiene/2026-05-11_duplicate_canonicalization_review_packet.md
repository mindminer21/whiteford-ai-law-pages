# Duplicate canonicalization review packet — 2026-05-11

Task: `t_a2ddeb9e`
Tenant: `whiteford-mountain-west`
Status: INTERNAL / LOCAL / READ-ONLY / NO-MUTATION REVIEW PACKET

## Hard boundary

This packet is a no-mutation duplicate-canonicalization review packet for Jeff/Whiteford decision prep only. It does not approve prospect merges, archive records, update canonical IDs, map offers, map contacts, restore source access, enrich contacts, create mutation SQL, sync Supabase, mutate HighLevel/CRM/Clio, test or activate workflows, enroll contacts, send email/SMS, post to social/LinkedIn/YouTube, run ads, publish public/client-facing material, or contact any company/person.

Internal records, dashboard rows, source snippets, draft records, local suppression prechecks, list membership, lead score, duplicate confidence, or HighLevel stage labels are not consent, not conflicts clearance, not attorney approval, not source-current proof, and not permission to contact.

## Evidence used

- Review gate: `docs/reviews/2026-05-11_data_hygiene_tranche_review.md`
- Data-hygiene audit: `docs/growth-os/data-hygiene/2026-05-11_growth_os_data_hygiene_audit.md`
- Offer/contact mapping remediation worksheet: `docs/growth-os/data-hygiene/2026-05-11_offer_contact_mapping_remediation_plan.md`
- Local SQLite input: `/Users/jeff/.openclaw/projects/mountain-west-growth-os/data/growth-os.sqlite`
- SQLite access mode used here: `file:/Users/jeff/.openclaw/projects/mountain-west-growth-os/data/growth-os.sqlite?mode=ro&immutable=1` with `PRAGMA query_only=ON`
- Unknown/null quarantine payload read-only file: `/Users/jeff/.openclaw/projects/mountain-west-growth-os/logs/ghl-stage-poller/ghl-stage-hUevEZZwjvyALchVzSzv-2026-05-10T18-32-02-464Z-payload.json`

No SQLite write or live-system mutation was performed.

## Executive posture

All three exact-name duplicate groups remain HOLD. The local duplicate evidence is strong enough to require canonical-review before any offer/contact mapping, prior-touch clearance, or external use, but not enough to select a canonical ID or approve a merge. The unknown/null `targeting-packet-ready` opportunity is a quarantine/HOLD row in the local opportunity table; the read-only payload indicates it is related to Sereact Agent Targeting, but the local opportunity record is not linked to the existing Sereact prospect and therefore must not be treated as source-current, contact-current, or send-ready.

Recommended order:

1. Hold all affected records and related drafts/work items.
2. Verify current source identity and legal entity/domain from approved source-access path.
3. Decide whether each duplicate pair is one legal entity with two local segments or whether one row should be retired/archived.
4. Only after Jeff/Whiteford review, prepare a separate exact row-level mutation packet with backup, rollback, dry-run/read-only verification, and named operator approval.

## Summary table

| Group | Records | Current evidence | Source-current status | Clearance status | Recommended posture |
| --- | --- | --- | --- | --- | --- |
| Great Sky duplicate | `ai-great-sky` + `funded-great-sky`; opportunities `ghl-lead-ai-great-sky` + `ghl-lead-funded-great-sky` | Exact company-name duplicate, same `raising.fi` source URL/domain field, same location, same scores, different segment labels | Not current enough for mutation; local source evidence only | Prospect statuses `not_checked`; local suppression prechecks exist for related Phase 6 drafts but final clearance remains `not_cleared` | HOLD / needs source + Jeff decision |
| Pluto Bio duplicate | `ai-pluto-bio` + `funded-pluto-bio`; opportunities `ghl-lead-ai-pluto-bio` + `ghl-lead-funded-pluto-bio` | Exact company-name duplicate, same `pluto.bio` source URL/domain, same location, same scores, high risk, different segment labels | Not current enough for mutation; local source evidence only | Prospect statuses `not_checked`; one local suppression precheck exists for the AI draft but final clearance remains `not_cleared` | HOLD / needs source + attorney/Jeff decision |
| Swimlane duplicate | `ai-swimlane` + `funded-swimlane`; opportunities `ghl-lead-ai-swimlane` + `ghl-lead-funded-swimlane` | Exact company-name duplicate, same Built In Colorado source URL/domain field, same location, same scores, different segment labels | Not current enough for mutation; Built In source should be secondary only until official/current source is reviewed | Prospect statuses `not_checked`; no local contacts/suppression/drafts found for these IDs in this read-only pass | HOLD / needs official source + Jeff decision |
| Unknown/null quarantine row | opportunity `ghl-opp-hUevEZZwjvyALchVzSzv`; local prospect ID value `ghl-prospect-hUevEZZwjvyALchVzSzv` has no matching `prospects` row | Local opportunity has null company/offer/contact; read-only GHL stage payload names `Sereact — Agent Targeting` and contact/company `Sereact`, but local opportunity is unlinked to canonical Sereact prospect | Not source-current and not locally canonical; payload is only a quarantine clue | Work item is queued/approval-required/external_action_allowed=0 with blocker; Sereact underlying prospect/contact rows remain low-confidence and uncleared | HOLD / quarantine / needs source + lifecycle reconciliation |

## Duplicate group details

### 1. Great Sky

#### Local IDs and opportunity IDs

| Record type | ID | Current local fields |
| --- | --- | --- |
| Prospect A | `ai-great-sky` | company `Great Sky`; segment `ai-software`; domain field `raising.fi`; source URL `https://raising.fi/news/great-sky-seed-march-2026`; location `Boulder, CO`; fit `93`; urgency `78`; risk `medium`; suppression `not_checked`; conflicts `not_checked` |
| Prospect B | `funded-great-sky` | company `Great Sky`; segment `funded-startups`; same domain/source/location/scores/risk; suppression `not_checked`; conflicts `not_checked` |
| Duplicate candidate | `dup-ai-great-sky-funded-great-sky` | entity type `prospect`; match reason `exact company-name match`; confidence `0.95`; review status `pending`; created `2026-05-05T00:05:00-06:00` |
| Opportunity A | `ghl-lead-ai-great-sky` | prospect `ai-great-sky`; stage `identified`; source `gohighlevel`; missing `offer_id`; missing `contact_id`; updated `2026-05-05T05:43:35.598Z` |
| Opportunity B | `ghl-lead-funded-great-sky` | prospect `funded-great-sky`; stage `identified`; source `gohighlevel`; missing `offer_id`; missing `contact_id`; updated `2026-05-05T05:43:35.598Z` |

#### Current evidence

- Both prospect rows point to the same non-company-domain source URL and use the same `raising.fi` domain field.
- Segment labels differ (`ai-software` versus `funded-startups`), but the company name, source URL, location, fit score, urgency score, and risk level match.
- Notes suggest overlapping offer-fit themes: IP moat/deep-tech patent strategy/product legal infrastructure.
- Local draft evidence exists for both IDs:
  - `phase6-ai_product_legal_risk_brief-ai-great-sky` tied to `ai-great-sky`, status `attorney_review_only`, compliance `blocked_not_send_ready`, `external_action_allowed=0`, risk `high`.
  - `phase6-educational_email-funded-great-sky` tied to `funded-great-sky`, status `attorney_review_only`, compliance `blocked_not_send_ready`, `external_action_allowed=0`, risk `medium`.
- Pending approval items exist for both draft records.
- One execution authorization shell exists for the funded draft, with `final_review_status=pending`, `suppression_status=required`, `conflicts_status=required`, `opt_out_status=required`, `brand_status=required`, `export_status=not_exported`, and `send_status=not_sent`.

#### Missing evidence

- Current official/company source confirming legal entity, domain, location, product/funding facts, and whether the Raising.fi source is still accurate.
- Person-level contact evidence; both opportunities have no `contact_id`, and no contact rows were found for these two prospect IDs in this pass.
- Consent basis, opt-in/preference state, HighLevel DND/unsubscribe/bounce/manual suppression, Whiteford conflicts clearance, local Clio/adverse-party precheck by authorized process, duplicate/prior-touch decision, brand review, and attorney review.
- Jeff/Whiteford decision on canonical lane: AI Patent, AI Compliance, Tech GC, authority-watch, or retire/park.

#### Source-current status

Not source-current for mutation. Local source fields are useful diagnostic evidence only. A future packet must include a current official/company source or an approved source-access path. The Raising.fi item may remain supporting evidence, but should not be the only source for canonicalization, claim use, or external action.

#### Suppression, conflicts, and prior-touch implications

- Prospect-level suppression/conflicts fields are `not_checked` for both local IDs.
- Draft-level suppression checks show local precheck evidence, but both final clearances are `not_cleared`; Whiteford conflicts remain `required_before_send`; opt-out is `needs_human_review_if_email`; duplicate/prior-touch is `needs_review`.
- Canonical selection matters because two IDs currently imply two separate prior-touch/draft lineages. No future clearance should review only one ID while ignoring the other.

#### Recommended canonical-review posture

HOLD / needs source + Jeff decision.

Do not choose `ai-great-sky` or `funded-great-sky` based on segment label alone. Treat as one likely duplicate group for review, but require source-current identity, relationship/prior-touch review, and lane decision before any merge/archive/reference update.

#### Future exact approval requirements

A future approval packet must name the exact canonical prospect ID, non-canonical prospect ID disposition, related opportunity IDs, related draft/approval/suppression/execution rows, current values, proposed values, backup path, rollback plan, dry-run/read-only verification command, stop conditions, and the exact Jeff/Whiteford operator approval. It must also preserve all no-send/no-workflow/no-outreach gates.

### 2. Pluto Bio

#### Local IDs and opportunity IDs

| Record type | ID | Current local fields |
| --- | --- | --- |
| Prospect A | `ai-pluto-bio` | company `Pluto Bio`; segment `ai-software`; domain `pluto.bio`; source URL `https://pluto.bio/resources/News/pluto-bio-raises-usd3-6m-to-expand-ai-powered-multi-omics-analysis-platform`; location `Denver, CO`; fit `90`; urgency `77`; risk `high`; suppression `not_checked`; conflicts `not_checked` |
| Prospect B | `funded-pluto-bio` | company `Pluto Bio`; segment `funded-startups`; same domain/source/location/scores/risk; suppression `not_checked`; conflicts `not_checked` |
| Duplicate candidate | `dup-ai-pluto-bio-funded-pluto-bio` | entity type `prospect`; match reason `exact company-name match`; confidence `0.95`; review status `pending`; created `2026-05-05T00:05:00-06:00` |
| Opportunity A | `ghl-lead-ai-pluto-bio` | prospect `ai-pluto-bio`; stage `identified`; source `gohighlevel`; missing `offer_id`; missing `contact_id`; updated `2026-05-05T05:43:35.598Z` |
| Opportunity B | `ghl-lead-funded-pluto-bio` | prospect `funded-pluto-bio`; stage `identified`; source `gohighlevel`; missing `offer_id`; missing `contact_id`; updated `2026-05-05T05:43:35.598Z` |

#### Current evidence

- Both prospect rows point to the same company-domain source URL and same local source/domain fields.
- Segment labels differ (`ai-software` versus `funded-startups`), while company name, domain, source URL, location, scores, and high-risk classification match.
- Notes indicate sensitive life-sciences/software/data/IP fit and warn of higher legal sensitivity.
- Local draft evidence exists for `ai-pluto-bio`:
  - `phase6-ai_product_legal_risk_brief-ai-pluto-bio`, status `attorney_review_only`, compliance `blocked_not_send_ready`, `external_action_allowed=0`, risk `high`.
- A pending approval item exists for that draft.
- No local draft was found for `funded-pluto-bio` in this pass.

#### Missing evidence

- Current official/company source confirming legal entity, product/funding facts, life-sciences/data/IP context, and source-currentness.
- Any verified person-level contact; both opportunities lack `contact_id`, and no contact rows were found for either local ID in this pass.
- Consent basis, HighLevel DND/unsubscribe/bounce/manual suppression, opt-out/preference state, Whiteford conflicts clearance, local Clio/adverse-party precheck by authorized process, duplicate/prior-touch decision, attorney review, and brand review.
- Specific decision on whether Pluto Bio should be held, mapped to AI Patent, mapped to AI Compliance, mapped to Tech GC, or retired/parked.

#### Source-current status

Not source-current for mutation. The local source URL is more company-specific than the Great Sky/Swimlane source fields, but currentness still must be verified before any canonicalization, claim use, or external-facing action. Life-sciences/data/IP sensitivity raises the review bar.

#### Suppression, conflicts, and prior-touch implications

- Prospect-level suppression/conflicts fields are `not_checked` for both local IDs.
- The AI draft has a suppression check showing only local precheck evidence; final clearance remains `not_cleared`; Whiteford conflicts are `required_before_send`; opt-out is `needs_human_review_if_email`; duplicate/prior-touch is `needs_review`.
- Because one side has a draft and the other does not, canonicalization could orphan or misattribute draft/prior-touch evidence if performed without an exact row-level reconciliation packet.

#### Recommended canonical-review posture

HOLD / needs source + attorney/Jeff decision.

Do not choose a canonical ID until official/current identity and risk review confirms whether the AI/software or funded-startup segment should carry the canonical record, whether both should be collapsed into a broader hold lane, or whether one should be retired/archived.

#### Future exact approval requirements

A future approval packet must include current official source evidence, legal-entity/domain confirmation, sensitive-data/life-sciences review notes, exact canonical/non-canonical ID choice, opportunities/drafts/approval/suppression rows to reconcile, rollback plan, dry-run verification, and explicit Jeff/Whiteford approval. No external copy, named-company awareness, outreach, workflow, or CRM stage action may ride along with that packet.

### 3. Swimlane

#### Local IDs and opportunity IDs

| Record type | ID | Current local fields |
| --- | --- | --- |
| Prospect A | `ai-swimlane` | company `Swimlane`; segment `ai-software`; domain field `www.builtincolorado.com`; source URL `https://www.builtincolorado.com/articles/swimlane-secures-45m-in-funding-20250611`; location `Denver, CO`; fit `84`; urgency `76`; risk `medium`; suppression `not_checked`; conflicts `not_checked` |
| Prospect B | `funded-swimlane` | company `Swimlane`; segment `funded-startups`; same Built In Colorado source URL/domain field/location/scores/risk; suppression `not_checked`; conflicts `not_checked` |
| Duplicate candidate | `dup-ai-swimlane-funded-swimlane` | entity type `prospect`; match reason `exact company-name match`; confidence `0.95`; review status `pending`; created `2026-05-05T00:05:00-06:00` |
| Opportunity A | `ghl-lead-ai-swimlane` | prospect `ai-swimlane`; stage `identified`; source `gohighlevel`; missing `offer_id`; missing `contact_id`; updated `2026-05-05T05:43:35.598Z` |
| Opportunity B | `ghl-lead-funded-swimlane` | prospect `funded-swimlane`; stage `identified`; source `gohighlevel`; missing `offer_id`; missing `contact_id`; updated `2026-05-05T05:43:35.598Z` |

#### Current evidence

- Both prospect rows share an exact company name, the same Built In Colorado article URL, the same local domain field, the same location, the same scores, and the same risk level.
- Segment labels differ (`ai-software` versus `funded-startups`).
- Notes suggest enterprise/security automation/product legal risk, likely existing counsel, and educational/relationship route only.
- No local contact rows, suppression-check rows, outreach drafts, approval items, or execution authorization rows were found for these two prospect IDs in this read-only pass.

#### Missing evidence

- Official current company domain/source; the existing domain field is a publisher domain, not an official company domain.
- Current funding/product facts and confirmation that the Built In Colorado item remains accurate and acceptable only as supporting evidence.
- Person-level contact evidence and `contact_id` mapping; both opportunities are missing contacts.
- Consent basis, HighLevel DND/unsubscribe/bounce/manual suppression, opt-out/preference status, Whiteford conflicts clearance, local Clio/adverse-party precheck, duplicate/prior-touch status, brand review, and attorney review.
- Jeff decision on whether a mature/security automation company should remain active, move to Tech GC/AI Compliance authority-watch, or be parked.

#### Source-current status

Not source-current for mutation. This group has the weakest source-current posture of the three because the domain/source field is a third-party publisher domain. An official/current source should be required before any canonical choice, claim, route mapping, or external use.

#### Suppression, conflicts, and prior-touch implications

- Prospect-level suppression/conflicts fields are `not_checked` for both local IDs.
- No related suppression-check rows were found for these IDs, so there is no local even-precheck evidence for this group in this pass.
- Lack of draft/suppression rows reduces immediate prior-touch entanglement, but it does not create clearance. Canonicalization should still precede any future contact/offer mapping.

#### Recommended canonical-review posture

HOLD / needs official source + Jeff decision.

Do not map both opportunities independently. Do not infer offer fit from the Built In Colorado article or segment labels alone. Decide after official-source review whether one canonical record should remain, whether it should be a hold/authority-watch record, or whether the group should be retired/parked.

#### Future exact approval requirements

A future approval packet must include official source evidence, current company-domain confirmation, proposed canonical/non-canonical ID disposition, both opportunity IDs, dry-run verification, backup/rollback, and explicit Jeff/Whiteford approval. No outreach, awareness copy, workflow use, CRM stage movement, or contact enrichment should be bundled into the canonicalization approval.

## Unknown/null quarantine row

### Local IDs and payload evidence

| Record type | ID / path | Current local fields |
| --- | --- | --- |
| Opportunity | `ghl-opp-hUevEZZwjvyALchVzSzv` | prospect ID value `ghl-prospect-hUevEZZwjvyALchVzSzv`; no matching `prospects` row found; `contact_id=null`; `offer_id=null`; stage `targeting-packet-ready`; owner `GHL`; source `gohighlevel`; created/updated `2026-05-10T18:32:02.464Z` |
| Work item | `work-ghl-stage-hUevEZZwjvyALchVzSzv-2026-05-10T18-32-02-464Z` | title `Targeting Packet Ready: Sereact — Agent Targeting`; stage `queued`; risk `high`; `approval_required=1`; `external_action_allowed=0`; blocker says not to deliver collateral or contact prospect until exact approval is recorded |
| Payload | `/Users/jeff/.openclaw/projects/mountain-west-growth-os/logs/ghl-stage-poller/ghl-stage-hUevEZZwjvyALchVzSzv-2026-05-10T18-32-02-464Z-payload.json` | GHL opportunity `hUevEZZwjvyALchVzSzv`, name `Sereact — Agent Targeting`, source `Growth OS nightly prospect research - Agent Targeting (prospect_ef30df45ad62c93981758ca3)`, contact ID `1a2gBW9IhpZfgnh6bT2K`, contact/company `Sereact` |
| Existing Sereact local prospect | `prospect_ef30df45ad62c93981758ca3` | company `Sereact`; stage `agent-targeting`; offer lane `ai-patent`; international/non-Mountain-West; consent gap/no auto-send; conflicts required; low-confidence contact caveats |

### Current evidence

- The local `opportunities` table contains a `targeting-packet-ready` row with no company name, no contact ID, no offer ID, and a `prospect_id` value that does not join to a local `prospects` row.
- The read-only GHL stage payload names Sereact and references `prospect_ef30df45ad62c93981758ca3` in its source field.
- The existing Sereact local prospect has two separate opportunity rows:
  - `ghl-agent-targeting-prospect_ef30df45ad62c93981758ca3`: stage `agent-targeting`, offer `ai-patent`, missing `contact_id`.
  - `opp_7aaf67df3d4d774803c8607d`: stage `research_staged`, offer `ai-patent`, contact `contact_be2ee5a1d75bffb184f923c5`.
- Existing Sereact contact rows are low-confidence, have no email or LinkedIn URL, use an Instagram source, and remain `suppression_status=not_checked`.
- Sereact suppression check `suppress_7ea545e06cad606889f750d4` remains `final_clearance=not_cleared`, with local suppression, local Clio, opt-out, and duplicate/prior-touch all `not_checked`, and Whiteford conflicts `required_before_send`.

### Missing evidence

- A reliable local join from `ghl-opp-hUevEZZwjvyALchVzSzv` to canonical prospect `prospect_ef30df45ad62c93981758ca3`.
- Confirmation that GHL contact `1a2gBW9IhpZfgnh6bT2K` should map to any local contact record; no local contact_id is present on the quarantine opportunity.
- Current official Sereact source evidence and Jeff decision on international targeting.
- Person-level verified contact source, consent basis, suppression/conflicts/Clio/prior-touch clearance, attorney review, and final approval.

### Source-current status

Quarantine only. The payload is useful linkage evidence, but the local opportunity row is not source-current, not locally canonical, and not sufficient to mark Sereact as targeting-packet-ready. The local table state and payload disagree enough that a lifecycle reconciliation packet is required before any mutation or external action.

### Suppression, conflicts, and prior-touch implications

- The work item already blocks delivery/contact until exact approval.
- The existing Sereact local prospect is `consent_gap_no_auto_send` and `required_before_send` for conflicts.
- Contact rows are low-confidence and uncleared.
- Any use of this row without reconciliation could bypass the intended Agent Targeting hold, the low-confidence contact warnings, and the international targeting decision gate.

### Recommended quarantine posture

HOLD / quarantine / needs source + lifecycle reconciliation.

Do not treat `ghl-opp-hUevEZZwjvyALchVzSzv` as a valid targeting-packet-ready prospect row. The safest next packet is a separate lifecycle-reconciliation approval worksheet for Sereact that compares the GHL payload, the orphan/local quarantine opportunity, the existing Sereact local prospect, the Agent Targeting opportunity, the research-staged opportunity, and the low-confidence contacts.

### Future exact approval requirements

A future approval packet must name whether the quarantine opportunity should be linked, closed, archived, renamed, or otherwise reconciled; list current and proposed values for every affected local/HighLevel row; include source-current evidence; include international-targeting decision; include contact-quality decision; include suppression/conflicts/Clio/prior-touch status; include dry-run/read-only verification; include backup/rollback; and include exact Jeff/Whiteford approval. No collateral delivery, no stage advancement, no workflow, no send, and no contact action should be bundled with reconciliation.

## Cross-group clearance implications

Before any duplicate canonicalization, offer/contact mapping, CRM movement, source restoration, public named-company awareness, workflow use, email/newsletter, social/LinkedIn/YouTube/ad action, or client/prospect-facing step, require:

1. Exact record IDs and current local/live-system values.
2. Approved source-current evidence for entity identity, domain, location, product/funding facts, and legal-services fit.
3. Canonical prospect ID decision and non-canonical record disposition.
4. Contact-quality decision with verified person-level source, if contact mapping is in scope.
5. Consent basis; HighLevel DND/unsubscribe/bounce/manual suppression; opt-out/preferences; local suppression; Whiteford conflicts; local Clio/adverse-party precheck; duplicate/prior-touch review.
6. Attorney review of any copy, claim, route, CTA, and lead-magnet fit.
7. Backup/export, rollback/undo plan, dry-run/read-only verification, stop conditions, named operator, exact environment, and exact approval language.
8. Explicit statement that list membership, lead scores, local drafts, local prechecks, dashboard rows, or internal review status do not authorize outreach.

## Recommended next safe actions

1. Jeff/Whiteford review this packet and decide whether each group remains hold, gets a source-review packet, gets a canonicalization mutation packet later, or is retired/parked.
2. Prepare a separate source-current evidence packet for Great Sky, Pluto Bio, and Swimlane if Jeff wants canonicalization to proceed.
3. Prepare a separate Sereact lifecycle-reconciliation packet for the unknown/null quarantine row; do not combine it with the three duplicate groups unless Jeff explicitly wants one larger reconciliation review.
4. Only after the above decisions, prepare exact row-level mutation packets. Do not create mutation SQL or execute system changes from this review packet.

## Final no-mutation verdict

The duplicate-canonicalization review can proceed internally, but all affected rows remain HOLD. Great Sky, Pluto Bio, and Swimlane appear to be exact-name duplicate candidates that require canonical-review before any offer/contact mapping or prior-touch clearance, but local evidence does not authorize a canonical ID choice. The unknown/null row is a Sereact-linked quarantine/lifecycle discrepancy, not a valid targeting-packet-ready clearance record. No external action or live-system mutation is approved.
