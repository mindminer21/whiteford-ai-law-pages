# Duplicate canonicalization review packet — 2026-05-15

Task: `t_e370191d`  
Tenant: `whiteford-mountain-west`  
Status: INTERNAL / READ-ONLY / NO-MUTATION REVIEW PACKET  
Evidence JSON: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/growth-os/data-hygiene/2026-05-15_duplicate_canonicalization_review_packet_evidence.json`

## Hard boundary

This packet is a private Jeff/Whiteford decision-prep artifact only. I inspected already-local Markdown/JSON artifacts and the local Growth OS SQLite database using a read-only immutable URI (`mode=ro&immutable=1`) with `PRAGMA query_only=ON`.

No SQLite, Supabase, HighLevel, CRM, Clio, workflow, public page, email/SMS, LinkedIn/social, ad, source-provider, prospect/contact enrichment, dashboard-live, or client/prospect-facing action was performed or authorized. This packet does not approve any merge, canonical-row mutation, opportunity reassignment, draft change, suppression/conflicts clearance, send, export, contact enrollment, or public/client-facing use.

Internal records, scores, stages, drafts, suppression checks, source snippets, QMD retrieval, dashboard rows, and this review packet are not consent, not source-current proof, not conflicts clearance, not attorney approval, not legal advice, and not permission to contact.

## Inputs inspected

- `docs/growth-os/data-hygiene/2026-05-15_growth_os_data_hygiene_cleanup_packet.md`
- `docs/growth-os/data-hygiene/2026-05-15_growth_os_data_hygiene_cleanup_packet_evidence.json`
- `docs/reviews/2026-05-15_data_hygiene_consent_gate_review.md`
- `/Users/jeff/.openclaw/projects/mountain-west-growth-os/data/growth-os.sqlite` read-only/immutable

## Executive summary

The duplicate backlog for this tranche remains exactly three pending prospect duplicate groups:

1. Great Sky: `ai-great-sky` + `funded-great-sky`
2. Pluto Bio: `ai-pluto-bio` + `funded-pluto-bio`
3. Swimlane: `ai-swimlane` + `funded-swimlane`

Each group has exact company-name match, 0.95 duplicate confidence, and `review_status=pending`. The local rows should remain HOLD. The proposed canonicalization posture is diagnostic only: treat each pair as one likely company identity with multiple possible lane attributes, but do not select or mutate a canonical row until a future exact approval packet names the canonical prospect ID, child record handling, rollback, verification queries, and Jeff/Whiteford approval language.

The immediate safe use of this packet is to decide whether Jeff wants a later exact row-level canonicalization packet. It is not a merge instruction.

## Current and proposed canonical posture

| Group | Current posture | Proposed review posture | Merge approved here? |
| --- | --- | --- | --- |
| Great Sky | Two local prospect IDs exist: `ai-great-sky` and `funded-great-sky`; duplicate candidate is pending. | HOLD both rows. Future canonicalization should evaluate one company entity with AI/deep-tech IP and funded-startup attributes; exact canonical ID remains TBD. | No. |
| Pluto Bio | Two local prospect IDs exist: `ai-pluto-bio` and `funded-pluto-bio`; duplicate candidate is pending. | HOLD both rows. Future canonicalization should evaluate one company entity with AI/software and biotech/funded-startup attributes; exact canonical ID remains TBD. | No. |
| Swimlane | Two local prospect IDs exist: `ai-swimlane` and `funded-swimlane`; duplicate candidate is pending. | HOLD both rows. Future canonicalization should evaluate one company entity with AI/security-automation and funded/growth-company attributes; exact canonical ID remains TBD. | No. |

Do not choose the canonical row solely because one ID begins with `ai-` and another begins with `funded-`. Segment names are routing metadata, not company-identity proof, consent, or source-current proof.

## Duplicate group details

### Great Sky — `ai-great-sky` + `funded-great-sky`

Duplicate candidate:

| Field | Value |
| --- | --- |
| `duplicate_id` | `dup-ai-great-sky-funded-great-sky` |
| `entity_type` | `prospect` |
| `local_id_a` | `ai-great-sky` |
| `local_id_b` | `funded-great-sky` |
| `match_reason` | exact company-name match |
| `confidence` | 0.95 |
| `review_status` | pending |

Prospect comparison:

| Field | `ai-great-sky` | `funded-great-sky` |
| --- | --- | --- |
| Company | Great Sky | Great Sky |
| Domain | `raising.fi` | `raising.fi` |
| Website/source URL | `https://raising.fi/news/great-sky-seed-march-2026` | `https://raising.fi/news/great-sky-seed-march-2026` |
| Location | Boulder, CO | Boulder, CO |
| Region | Colorado primary / Utah secondary | Colorado primary / Utah secondary |
| Segment | `ai-software` | `funded-startups` |
| Pipeline stage | `researched` | `researched` |
| Fit / urgency | 93 / 78 | 93 / 78 |
| Risk | medium | medium |
| Suppression / conflicts | `not_checked` / `not_checked` | `not_checked` / `not_checked` |
| Notes | IP moat audit / deep-tech patent strategy; verify public details and avoid technical overclaims. | Deep-tech IP moat / product legal infrastructure; duplicate with AI segment; high IP relevance. |

Related opportunities:

| Opportunity | Prospect | Stage | Offer | Contact | Source | Updated | Posture |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `ghl-lead-ai-great-sky` | `ai-great-sky` | `identified` | missing | missing | `gohighlevel` | 2026-05-05 | HOLD; do not map independently while duplicate pending. |
| `ghl-lead-funded-great-sky` | `funded-great-sky` | `identified` | missing | missing | `gohighlevel` | 2026-05-05 | HOLD; do not map independently while duplicate pending. |

Local source evidence already present:

| Evidence | Prospect | Source type | Confidence | Safe-for-outreach field | Corroboration | Safe use |
| --- | --- | --- | --- | --- | --- | --- |
| `src-great-sky-raisingfi-20260504` | `ai-great-sky` | `public_news` | medium | `conditional` | secondary source only; company-source corroboration still recommended before send | General AI/computing company stage/sector only; do not diagnose legal need. |

Draft / suppression / prior-touch implications:

| Record class | Local rows | Implication |
| --- | --- | --- |
| Outreach drafts | `phase6-ai_product_legal_risk_brief-ai-great-sky`; `phase6-educational_email-funded-great-sky` | Two attorney-review-only drafts exist for the same company name across the duplicate pair. Both are `blocked_not_send_ready`; `external_action_allowed=0`; both are solicitation-sensitive and require approved brand block. Do not approve or send either draft from this packet. |
| Approval items | `approval-phase6-ai_product_legal_risk_brief-ai-great-sky`; `approval-phase6-educational_email-funded-great-sky` | Both approval items are pending. Their presence is not approval and not canonicalization permission. |
| Suppression checks | `sup-phase6-ai_product_legal_risk_brief-ai-great-sky`; `sup-phase6-educational_email-funded-great-sky` | Both have local-only precheck notes, `whiteford_conflicts_status=required_before_send`, `duplicate_prior_touch_status=needs_review`, and `final_clearance=not_cleared`. |
| Execution authorization | `auth-phase6-educational_email-funded-great-sky` | Shell only; `final_review_status=pending`, `send_status=not_sent`, suppression/conflicts/opt-out/brand required. It does not authorize export or send. |

Current/proposed canonical posture: HOLD. Great Sky is the highest-risk duplicate in this packet because both sides already have draft/suppression/approval implications. Future canonicalization should first decide whether the canonical company record should retain both lane tags or one primary lane, then explicitly retire/alias/close the non-canonical prospect and all child references. No merge is approved here.

### Pluto Bio — `ai-pluto-bio` + `funded-pluto-bio`

Duplicate candidate:

| Field | Value |
| --- | --- |
| `duplicate_id` | `dup-ai-pluto-bio-funded-pluto-bio` |
| `entity_type` | `prospect` |
| `local_id_a` | `ai-pluto-bio` |
| `local_id_b` | `funded-pluto-bio` |
| `match_reason` | exact company-name match |
| `confidence` | 0.95 |
| `review_status` | pending |

Prospect comparison:

| Field | `ai-pluto-bio` | `funded-pluto-bio` |
| --- | --- | --- |
| Company | Pluto Bio | Pluto Bio |
| Domain | `pluto.bio` | `pluto.bio` |
| Website/source URL | `https://pluto.bio/resources/News/pluto-bio-raises-usd3-6m-to-expand-ai-powered-multi-omics-analysis-platform` | `https://pluto.bio/resources/News/pluto-bio-raises-usd3-6m-to-expand-ai-powered-multi-omics-analysis-platform` |
| Location | Denver, CO | Denver, CO |
| Region | Colorado primary / Utah secondary | Colorado primary / Utah secondary |
| Segment | `ai-software` | `funded-startups` |
| Pipeline stage | `researched` | `researched` |
| Fit / urgency | 90 / 77 | 90 / 77 |
| Risk | high | high |
| Suppression / conflicts | `not_checked` / `not_checked` | `not_checked` / `not_checked` |
| Notes | IP moat / biotech/software data strategy; regulated/life-science sensitivity. | Biotech/software IP and data strategy; duplicate with AI segment; dedupe before outreach. |

Related opportunities:

| Opportunity | Prospect | Stage | Offer | Contact | Source | Updated | Posture |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `ghl-lead-ai-pluto-bio` | `ai-pluto-bio` | `identified` | missing | missing | `gohighlevel` | 2026-05-05 | HOLD; do not map independently while duplicate pending. |
| `ghl-lead-funded-pluto-bio` | `funded-pluto-bio` | `identified` | missing | missing | `gohighlevel` | 2026-05-05 | HOLD; do not map independently while duplicate pending. |

Local source evidence already present:

| Evidence | Prospect | Source type | Confidence | Safe-for-outreach field | Corroboration | Safe use |
| --- | --- | --- | --- | --- | --- | --- |
| `src-pluto-bio-company-20260504` | `ai-pluto-bio` | `public_company_press` | high | `conditional` | primary company source | General computational biology/software stage/sector only; avoid regulated/life-science legal diagnosis. |

Draft / suppression / prior-touch implications:

| Record class | Local rows | Implication |
| --- | --- | --- |
| Outreach drafts | `phase6-ai_product_legal_risk_brief-ai-pluto-bio` | One attorney-review-only AI/product legal-risk draft exists for `ai-pluto-bio`; it is `blocked_not_send_ready`, `external_action_allowed=0`, solicitation-sensitive, high-risk, and brand-block-required. |
| Approval items | `approval-phase6-ai_product_legal_risk_brief-ai-pluto-bio` | Approval is pending; no decision language is present. |
| Suppression checks | `sup-phase6-ai_product_legal_risk_brief-ai-pluto-bio` | Local-only precheck; `whiteford_conflicts_status=required_before_send`, `duplicate_prior_touch_status=needs_review`, `final_clearance=not_cleared`. |
| Execution authorizations | none found for this pair in the read-only query | Absence of an authorization row is not clearance; it strengthens HOLD posture. |

Current/proposed canonical posture: HOLD. Pluto Bio has high-risk regulated/life-science sensitivity, so future canonicalization must not collapse records into a legal-services action path. A later exact packet may propose one canonical company record with AI/software and biotech/funded-stage attributes only after source-currentness, suppression, conflicts, opt-out, duplicate prior-touch, and attorney-review gates are explicitly handled. No merge is approved here.

### Swimlane — `ai-swimlane` + `funded-swimlane`

Duplicate candidate:

| Field | Value |
| --- | --- |
| `duplicate_id` | `dup-ai-swimlane-funded-swimlane` |
| `entity_type` | `prospect` |
| `local_id_a` | `ai-swimlane` |
| `local_id_b` | `funded-swimlane` |
| `match_reason` | exact company-name match |
| `confidence` | 0.95 |
| `review_status` | pending |

Prospect comparison:

| Field | `ai-swimlane` | `funded-swimlane` |
| --- | --- | --- |
| Company | Swimlane | Swimlane |
| Domain | `www.builtincolorado.com` | `www.builtincolorado.com` |
| Website/source URL | `https://www.builtincolorado.com/articles/swimlane-secures-45m-in-funding-20250611` | `https://www.builtincolorado.com/articles/swimlane-secures-45m-in-funding-20250611` |
| Location | Denver, CO | Denver, CO |
| Region | Colorado primary / Utah secondary | Colorado primary / Utah secondary |
| Segment | `ai-software` | `funded-startups` |
| Pipeline stage | `researched` | `researched` |
| Fit / urgency | 84 / 76 | 84 / 76 |
| Risk | medium | medium |
| Suppression / conflicts | `not_checked` / `not_checked` | `not_checked` / `not_checked` |
| Notes | AI/product legal risk / enterprise contracts/privacy/security; mature company likely existing counsel, use educational/relationship route only. | Growth company outside counsel / enterprise legal layer; duplicate with AI segment; likely existing counsel. |

Related opportunities:

| Opportunity | Prospect | Stage | Offer | Contact | Source | Updated | Posture |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `ghl-lead-ai-swimlane` | `ai-swimlane` | `identified` | missing | missing | `gohighlevel` | 2026-05-05 | HOLD; do not map independently while duplicate pending. |
| `ghl-lead-funded-swimlane` | `funded-swimlane` | `identified` | missing | missing | `gohighlevel` | 2026-05-05 | HOLD; do not map independently while duplicate pending. |

Local source evidence already present:

No `source_evidence` row was found in the read-only query for the exact Swimlane source URL. The prospects do contain the Built In Colorado URL in `source_url`/`website_url`, but that local prospect-field value alone is not source-current proof and not safe for outreach.

Draft / suppression / prior-touch implications:

| Record class | Local rows | Implication |
| --- | --- | --- |
| Outreach drafts | none found for this pair in the read-only query | Absence of drafts does not authorize new drafting or outreach. |
| Approval items | none found for this pair in the read-only query | No approval is present. |
| Suppression checks | none found for this pair in the read-only query | No final clearance exists; prospect fields still show `suppression_status=not_checked` and `conflicts_status=not_checked`. |
| Execution authorizations | none found for this pair in the read-only query | No export/send path exists or is authorized. |

Current/proposed canonical posture: HOLD. Swimlane is likely one company identity across AI-software and funded-startup lanes, but it has weaker local source-evidence grounding in the `source_evidence` table than Great Sky or Pluto Bio. Future canonicalization should require source-current proof and explicit handling of the mature-company/existing-counsel caveat before any downstream draft, suppression, or opportunity mapping. No merge is approved here.

## Cross-group implications

### Opportunity mapping

All six duplicate-related opportunities are currently `stage=identified`, source `gohighlevel`, missing `offer_id`, and missing `contact_id`. They should not be independently mapped to offers or contacts until duplicate canonicalization is decided.

Safe interim classification: duplicate-held missing-offer/missing-contact rows.

### Drafts and approval items

Only three local outreach drafts were found for the six IDs:

- `phase6-ai_product_legal_risk_brief-ai-great-sky`
- `phase6-educational_email-funded-great-sky`
- `phase6-ai_product_legal_risk_brief-ai-pluto-bio`

All are attorney-review-only, solicitation-sensitive, blocked/not-send-ready, and have `external_action_allowed=0`. Their approval items are pending. They should remain frozen until canonicalization is separately approved.

### Suppression, conflicts, opt-out, and prior-touch

The local suppression rows that exist are not final clearance. They explicitly preserve required Whiteford conflicts review and duplicate/prior-touch review:

- `whiteford_conflicts_status=required_before_send`
- `duplicate_prior_touch_status=needs_review`
- `final_clearance=not_cleared`

Swimlane has no suppression check rows in this read-only query, so it is also not cleared.

### Contacts

No contacts were found for these six prospect IDs in the read-only query. Do not infer a missing contact, enrich contacts, copy contacts from another record, or draft to a generic company/contact field from this packet.

## Future exact approval fields required before any canonicalization mutation

A later exact canonicalization execution packet must name, at minimum:

1. Exact system(s): local SQLite only, Supabase mirror, HighLevel, CRM, dashboard cache, or other named systems. If any system is out of scope, say so.
2. Operator: named human/operator who will run the mutation.
3. Backup/export path: pre-change database/file export location and timestamp.
4. Table and primary key list for every touched row.
5. Current value and proposed value for every changed field.
6. Canonical prospect ID selected for each group.
7. Non-canonical prospect ID disposition for each group: alias, merge, retire, archive, close, or leave separate.
8. Child-record handling for each affected table:
   - `opportunities`: `opportunity_id`, `prospect_id`, `offer_id`, `contact_id`, `stage`, `source`, `updated_at`
   - `contacts`: `contact_id`, `prospect_id`, `confidence`, `permission_basis`, `suppression_status`
   - `duplicate_candidates`: `duplicate_id`, `review_status`, canonical decision note if field exists
   - `suppression_checks`: `check_id`, `prospect_id`, `draft_id`, duplicate/prior-touch status, final clearance
   - `outreach_drafts`: `draft_id`, `prospect_id`, `status`, `external_action_allowed`, approval item linkage, source evidence linkage
   - `approval_items`: `approval_item_id`, `related_id`, `approval_status`, approval language
   - `execution_authorizations`: `authorization_id`, `draft_id`, `prospect_id`, send/export/final-review fields
   - `source_evidence`: `evidence_id`, `prospect_id`, source URL, source-currentness posture
9. Deduplication rules for lane metadata: whether AI/funded segments become tags, attributes, or only historical notes.
10. Verification queries to run before and after mutation.
11. Rollback/undo steps for every mutation.
12. Stop conditions and abort behavior.
13. Exact Jeff/Whiteford approval text naming the task, date, systems, tables, IDs, and whether any downstream external action is explicitly excluded.

## Stop conditions

Stop and do not mutate if any of these are true:

- Jeff/Whiteford has not given exact written approval for the named canonicalization execution packet.
- The packet does not name exact primary keys, current values, proposed values, backup path, verification queries, rollback, and operator.
- The operator cannot open the database/system in a safe reviewed mode or cannot create the required pre-change backup/export.
- A source URL is stale, inaccessible, contradictory, or not clearly tied to the same company identity.
- A row has pending, missing, or contradictory `suppression_status`, conflicts, opt-out, or duplicate-prior-touch posture.
- Any draft, approval item, execution authorization, or contact row would become send/export/enroll-ready as a side effect.
- The proposed mutation would write to HighLevel, Supabase, CRM, Clio, public pages, workflows, social/LinkedIn, email/SMS, ads, source providers, or live dashboards without separate exact approval naming that external system.
- A non-canonical row has child records that cannot be safely reassigned, retired, or left as historical aliases.
- The operator sees unexpected row counts, schema drift, missing columns, missing IDs, or new duplicate groups.

## Copy/paste Jeff decision boxes

### Option A — GO for read-only packet only

```text
GO for read-only packet only: I approve using the 2026-05-15 duplicate canonicalization review packet as a private/internal decision aid only. This does not approve any SQLite, Supabase, HighLevel, CRM, Clio, dashboard, workflow, outreach, public/social, email/SMS, source, prospect/contact, or client/prospect-facing action. Prepare a separate exact canonicalization execution packet before any mutation.
```

### Option B — HOLD

```text
HOLD: Do not proceed beyond this read-only duplicate canonicalization packet. Keep Great Sky, Pluto Bio, and Swimlane duplicate groups and all related opportunities, drafts, suppression checks, approval items, and execution authorization rows frozen. No mutation or external action is approved.
```

### Option C — REVISE

```text
REVISE: Update the duplicate canonicalization review packet before I decide. Required revisions: [name missing group, source-currentness issue, canonical ID preference to evaluate, child-record handling concern, stop condition, approval language, or other requested change]. No mutation or external action is approved while revisions are pending.
```

## Recommended next internal action

If Jeff wants to continue, the safest next step is a separate no-mutation exact canonicalization execution draft that proposes row-level changes for these three groups but still requires a later explicit GO before any database or system mutation.

Until that future exact packet is approved, keep all three duplicate groups, six opportunities, three drafts, three approval items, three suppression checks, and one execution authorization in HOLD / no-external-action posture.
