# Private dashboard data-hygiene visibility spec — 2026-05-11

Task: `t_79645a06`
Parent: `t_1a9b4706`
Status: INTERNAL / PRIVATE DASHBOARD SPEC ONLY / NO EXECUTION

## Hard no-execution boundary

This specification is a private/local dashboard visibility plan only. It does not authorize CRM, HighLevel, Supabase, SQLite, Clio, social, email, workflow, public-page, source-access, enrichment, prospecting, deployment, or client/prospect-facing action.

Required warning copy for any dashboard surface:

> NO EXECUTION AUTHORIZED: These rows are status and decision aids only. Opening, filtering, exporting, or reviewing this dashboard does not authorize CRM, HighLevel, Supabase, SQLite, Clio, social, email, workflow, source-access, enrichment, public-page, or client/prospect-facing action. Any external action or live-system mutation requires a separate exact approval packet naming the recipient/record, final copy or proposed field change, channel/system, timing, suppression/conflicts/prior-touch status, rollback/verification plan, and Jeff/Whiteford approval.

Short warning copy for compact cards:

> Decision-prep only. No sends, posts, enrollments, CRM moves, HighLevel changes, Supabase/SQLite/Clio writes, enrichment, or public actions are authorized from this view.

## Inputs linked from the dashboard

Primary evidence links that the dashboard section should expose:

- Audit: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/growth-os/data-hygiene/2026-05-11_growth_os_data_hygiene_audit.md`
- Remediation plan: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/growth-os/data-hygiene/2026-05-11_offer_contact_mapping_remediation_plan.md`
- Private dashboard pattern: `/Users/jeff/.openclaw/projects/mountain-west-growth-os/dashboards/growth-os-dashboard/docs/2026-05-09_approval_command_center_dashboard_plan.md`
- No-execution warning precedent: `/Users/jeff/.openclaw/projects/mountain-west-growth-os/dashboards/growth-os-dashboard/docs/2026-05-10_approval_queue_no_execution_warning_t_9c2eab79.md`
- Current index row after this task: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/KANBAN_DELIVERABLE_INDEX.md`

Business-development principle preserved: the dashboard should make the diagnostic backlog easier to understand and safer to resolve before any next-step ask. Consent, clearance, attorney review, and exact approval remain explicit gates; dashboard visibility itself is not a sales or outreach step.

## Recommended surface

Add one private/local section to the existing approval command center, or a linked sibling card if implementation scope must remain tiny:

- Preferred route label: `Data Hygiene Backlog`
- Suggested private route if implemented later: `/approval-command-center#data-hygiene` or `/data-hygiene`
- Placement: below the current top blocker/decision cards and above supporting links, so the backlog is visible before any approval queue or content queue review.
- Design posture: compact operations UI, high contrast, no fake charts, no vanity metrics, no live buttons, no mutation/export controls.
- Data posture: static/local data derived from the audit/remediation artifacts or a future read-only local snapshot; do not query live HighLevel, Supabase, Clio, or public web from this dashboard section.

## Top summary card

Card title: `Data Hygiene Backlog — HOLD / review required`

Purpose copy:

> Growth OS records are not ready for external use. Use this card to see which rows need offer mapping, contact linkage, duplicate review, suppression/conflicts/prior-touch clearance, attorney review, or Jeff approval. The default state is HOLD.

Suggested summary fields:

| Field | Value from 2026-05-11 audit | Display rule |
| --- | ---: | --- |
| Total opportunities | 49 | Show as read-only count with `local audit` label. |
| Missing `offer_id` | 30 | Red/blocked badge. |
| Missing `contact_id` | 39 | Red/blocked badge. |
| Stale opportunities before 2026-05-07 | 30 | Amber/needs review badge. |
| Duplicate candidate groups | 3 | Red/blocked badge until canonical decision exists. |
| Contacts suppression-uncleared | 19 / 19 | Red/blocked badge. |
| Suppression checks final clearance | 20 / 20 not cleared | Red/blocked badge. |
| Pending approval items | 46 | Amber/decision queue badge; not approval. |
| Execution authorizations | 8 pending / 0 sent | Red/blocked badge; do not execute. |
| Work items | 13 queued / all external_action_allowed=0 | Red/blocked badge. |

Sort summary card items by risk, not volume: uncleared suppression/conflicts, duplicate candidates, missing contact, missing offer, stale rows, pending approvals.

## Required sections / cards

### 1. Missing `offer_id`

Card copy:

> These opportunity rows do not yet have a defensible offer lane. Do not infer an offer from filename prefixes, list membership, old HighLevel import status, or internal scores.

Primary data fields:

- company_name
- opportunity_id
- prospect_id
- current_stage
- current_offer_id, nullable
- source_signal or evidence_signal
- recommended_offer_lane from remediation worksheet
- recommended_route, if lane is supported
- fit_confidence: `supported`, `candidate`, `hold`, or `unknown`
- evidence_path
- missing_input
- mutation_posture

Sample table columns:

| Company | Opportunity ID | Stage | Evidence signal | Recommended lane | Missing input | Posture |
| --- | --- | --- | --- | --- | --- | --- |
| Great Sky | `ghl-lead-ai-great-sky` | identified | duplicate group; AI/funded split | HOLD | canonical duplicate decision; source-current review | Do not mutate |
| Polaris Electro-Optics | `ghl-lead-funded-polaris-electro-optics` | identified | funded/deep-tech signal | AI Patent candidate | current official source; contact/clearance | Do not mutate |
| unknown/null company | `ghl-opp-hUevEZZwjvyALchVzSzv` | targeting-packet-ready | missing company identity | HOLD / quarantine | company, source, offer, contact, clearance | Do not use |

Filters:

- `Lane = HOLD`, `AI Patent candidate`, `AI Compliance candidate`, `Tech GC candidate`, `Authority-watch`, `Unknown/quarantine`
- `Stage`
- `Duplicate-sensitive = yes/no`
- `Missing input`

Default sort: `HOLD/quarantine` first, then duplicate-sensitive rows, then oldest updated_at.

### 2. Missing `contact_id`

Card copy:

> Missing contact links are not just a data-entry issue. A contact should not be linked until the person-level identity, role, source-currentness, consent/suppression, conflicts, opt-out, and prior-touch status have been reviewed.

Primary data fields:

- company_name
- opportunity_id
- current_offer_id
- current_contact_id, nullable
- paired_research_staged_contact_id, if present
- contact_quality_flag
- contact_source_status
- suppression_status
- conflicts_status
- prior_touch_status
- recommendation: `hold`, `verify contact`, `suppress/replace`, `reconcile lifecycle`, `unknown`
- evidence_path

Sample table columns:

| Company | Agent Targeting opportunity | Offer | Candidate contact evidence | Contact-quality flag | Required next review | Posture |
| --- | --- | --- | --- | --- | --- | --- |
| Rigetti Computing | `ghl-agent-targeting-prospect_d249372d03e9b2df1dd67726` | `ai-patent` | research-staged row has contact | suspect CEO / incomplete CFO | suppress/replace suspect contacts | No auto-link |
| Nexar | `ghl-agent-targeting-prospect_c542c95f73995e2dbd2a15c3` | `ai-compliance` | research-staged row has contact | duplicate/ambiguous Saurav Gupta | resolve duplicate person rows | No auto-link |
| RADICL | `ghl-agent-targeting-prospect_2180fd85f6085ebc2a595f72` | `tech-gc` | research-staged row has contact | source-current and no-tag decision needed | source/currentness + clearance | HOLD |

Filters:

- `Contact risk`: suspect, low-confidence, duplicate, department email, missing email, missing LinkedIn, no person-level evidence
- `Offer lane`
- `Suppression status`
- `Lifecycle reconciliation needed`

Default sort: suspect/department/duplicate contacts first, then lifecycle reconciliation rows, then rows missing both email and LinkedIn.

### 3. Stale opportunities

Card copy:

> Stale rows show where local Growth OS state may no longer match source facts, offer strategy, or HighLevel placeholders. Stale status does not authorize refresh, enrichment, CRM movement, or outreach.

Primary data fields:

- company_name
- opportunity_id
- stage
- updated_at
- days_stale or stale_bucket
- missing_offer_id
- missing_contact_id
- duplicate_sensitive
- source_currentness_status
- next_review_type

Sample table columns:

| Company | Opportunity ID | Stage | Last updated | Stale bucket | Other blockers | Review type |
| --- | --- | --- | --- | --- | --- | --- |
| Bifrost Electronics | `ghl-lead-funded-bifrost-electronics` | identified | 2026-05-05 | before 2026-05-07 | missing offer/contact | source/fit review |
| AION Robotics Corporation | `ghl-lead-prospect_089c4bc541c05da752169c7a` | agent-targeting | 2026-05-06 | before 2026-05-07 | missing offer/contact; lifecycle duplicate risk | opportunity reconciliation |

Filters:

- `Updated before`
- `Stage`
- `Missing offer/contact`
- `Duplicate-sensitive`

Default sort: oldest updated_at first, with unknown/null company pinned to top regardless of timestamp.

### 4. Duplicate candidates

Card copy:

> Resolve duplicate canonical IDs before offer/contact mapping or prior-touch clearance. Duplicate rows can cause duplicated outreach risk, incorrect suppression checks, and conflicting opportunity lineage.

Primary data fields:

- duplicate_id
- entity_type
- local_id_a
- local_id_b
- names
- domains
- confidence
- review_status
- related_opportunity_ids
- related_drafts_or_checks
- provisional_recommendation
- evidence_needed

Sample table columns:

| Duplicate group | Local IDs | Evidence | Related rows | Evidence needed | Posture |
| --- | --- | --- | --- | --- | --- |
| Great Sky | `ai-great-sky` + `funded-great-sky` | exact-name match; same domain/source | two identified opportunities | official source; relationship/prior-touch review | HOLD |
| Pluto Bio | `ai-pluto-bio` + `funded-pluto-bio` | exact-name match; same domain/source | two identified opportunities | source, life-sciences/IP/privacy risk, conflicts | HOLD |
| Swimlane | `ai-swimlane` + `funded-swimlane` | exact-name match; same Built In source | two identified opportunities | official company domain/source | HOLD |

Filters:

- `Review status`
- `Duplicate confidence`
- `Offer lane candidate`
- `Related clearance status`

Default sort: all pending duplicates pinned above non-duplicate mapping rows.

### 5. Uncleared suppression / conflicts / prior-touch

Card copy:

> No named-company row has clearance for outreach, CRM movement, social use, workflow enrollment, or public/client-facing action. Clearance must be explicit and record-specific.

Primary data fields:

- company_name
- prospect_id
- contact_id, nullable
- local_suppression_status
- highlevel_dnd_unsubscribe_status
- whiteford_conflicts_status
- clio_precheck_status
- opt_out_status
- duplicate_prior_touch_status
- final_clearance
- clearance_owner
- clearance_evidence_path
- next_required_gate

Sample table columns:

| Company | Local suppression | HighLevel DND/unsubscribe | Conflicts | Clio precheck | Prior touch | Final clearance | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| AION Robotics Corporation | not checked | not checked | required before send | not checked | needs review | not cleared | BLOCKED |
| RADICL | not checked | not checked | required before send | not checked | needs review | not cleared | BLOCKED |
| Legacy Phase 6 rows | partial local precheck only | not externally cleared | required before send | local precheck only | needs review | not cleared | BLOCKED |

Filters:

- `Final clearance = not_cleared`
- `Conflicts required`
- `Opt-out needs review`
- `Prior-touch needs review`
- `HighLevel DND unchecked`

Default sort: rows with any proposed external action/draft/authorization first, then named Agent Targeting rows, then legacy rows.

### 6. Pending approvals

Card copy:

> Pending approval means decision required, not permission granted. Previously approved setup items still do not override suppression, conflicts, opt-in, attorney-review, or exact-action approvals.

Primary data fields:

- approval_item_id
- item_type
- related_company_or_lane
- status
- risk
- approval_required
- exact_action_scope
- external_action_allowed
- required_approver
- evidence_path
- blocker_summary

Sample table columns:

| Item type | Status | Risk | Count / row | Exact action scope | External action allowed | Next decision |
| --- | --- | --- | --- | --- | --- | --- |
| outreach_draft | pending | attorney_review_required | 10 | exact copy/channel/recipient needed | 0 | attorney review + Jeff approval |
| phase7_send_rule | pending | high | 4 | send rule not approved | 0 | hold until suppression/conflicts |
| campaign/setup items | pending/approved mix | medium/high | mixed | setup only, not execution | 0 unless exact future packet | review scope |

Filters:

- `Status`: pending, approved, rejected/held if later added
- `Risk`: high, medium, attorney_review_required
- `Item type`
- `External action allowed = 0`

Default sort: high risk and attorney-review-required first; approved setup items below pending external-risk items.

### 7. Forbidden actions

Card copy:

> Forbidden actions remain forbidden even if a row is visible, filtered, marked pending, or appears in an approval queue.

Display as a persistent wall or sticky side panel:

- Do not send email, SMS, DM, newsletter, ad, LinkedIn message, social post, comment, tag, or public update.
- Do not activate, test, publish, manual-start, or enroll anyone into HighLevel workflows, campaigns, templates, newsletters, ads, sequences, or smart lists.
- Do not mutate HighLevel contacts, opportunities, tags, fields, tasks, notes, pipeline stages, DND status, or owner assignments.
- Do not run Supabase DDL, sync/backfill, row update, production credential change, or SQLite mutation.
- Do not write to Clio or treat local Clio precheck as Whiteford conflicts clearance.
- Do not enrich contacts, scrape LinkedIn, infer source-blocked facts, or turn department/company-level contacts into person-level decision makers.
- Do not publish or deploy public pages or use named-company content externally.
- Do not treat offer fit, score, list membership, dashboard status, or prior internal draft as consent.

Optional display fields for the wall:

- action_category
- prohibited_action
- reason
- required_future_packet_type
- current_status: `forbidden`

## Global filters and behavior

Global filter bar:

- `Risk lane`: missing offer, missing contact, stale, duplicate, suppression/conflicts, pending approval, forbidden action
- `Offer lane`: AI Patent, AI Compliance, Tech GC, M&A Readiness, Authority-watch, HOLD, unknown
- `Stage`: identified, research_staged, agent-targeting, targeting-packet-ready
- `Company search`
- `Approval status`: pending, approved setup only, blocked, hold
- `Clearance`: not checked, required before send, not cleared, cleared only if later verified
- `Record type`: opportunity, contact, duplicate candidate, suppression check, approval item, work item

Default view:

1. Show no-execution warning at top.
2. Pin `forbidden actions` and `uncleared suppression/conflicts/prior-touch` cards.
3. Show `duplicate candidates` before mapping worksheets.
4. Show `missing contact_id` before `missing offer_id` because bad contact linkage can create external-action risk.
5. Show `pending approvals` as decision queue, not as action queue.

Sorting rules:

- `BLOCKED` and `HOLD` always sort before `candidate` or `review-ready`.
- Unknown/null company rows sort first in any table.
- Duplicate-sensitive rows sort before single-row mapping gaps.
- Rows with outreach drafts, execution authorizations, or pending send-rule approvals sort above rows with no downstream artifact.
- Do not sort by score unless score is explicitly labeled internal-only and non-consent.

Clickable behavior:

- Row clicks may expand evidence paths, blockers, and proposed next decision text.
- Row clicks must not open live CRM edit screens by default.
- If future implementation links to HighLevel/Supabase/Clio, label them `reference only — separate approval required` and require manual copy/open, not an execute button.
- Do not include `approve`, `send`, `sync`, `push`, `stage move`, `create task`, `enrich`, or `run workflow` controls.

## Empty states

Use empty states that preserve fail-closed posture:

- Missing offer/contact table empty: `No rows in this local snapshot. Verify against the latest read-only audit before treating the backlog as clean.`
- Duplicate table empty: `No duplicate candidates in this local snapshot. This is not a prior-touch or conflicts clearance.`
- Suppression/conflicts table empty: `No uncleared rows shown by this snapshot. Do not execute until a current authorized clearance packet confirms suppression, conflicts, opt-out, Clio/adverse-party, prior-touch, attorney review, and Jeff approval.`
- Pending approvals empty: `No pending approval items in this view. This does not authorize external or live-system action.`
- Forbidden actions empty due to data-load failure: `Forbidden-action list failed to load. Treat all external and live-system actions as prohibited.`

## Error states

Use error states that do not invite workaround execution:

- Audit/remediation link missing: `Evidence file unavailable. Keep backlog in HOLD and regenerate/read the audit before review.`
- Snapshot stale: `Snapshot is older than the latest known audit. Do not execute or approve based on this view.`
- Data parse error: `Could not parse local dashboard data. No live API fallback is allowed from this dashboard.`
- Counts mismatch: `Dashboard counts differ from source audit. Treat the stricter/higher-risk value as controlling until reconciled.`
- Source unavailable: `Source access is unavailable. Do not infer facts, enrich contacts, or move rows forward.`

## Review-ready labels

Avoid labels that imply permission. Use:

- `HOLD`
- `Needs Jeff decision`
- `Needs attorney review`
- `Needs source-current review`
- `Needs duplicate canonicalization`
- `Needs contact-quality review`
- `Needs suppression/conflicts/prior-touch clearance`
- `Ready for approval-packet drafting` only when the row has enough evidence to draft a future exact packet, not to execute.

Do not use:

- `Approved to send`
- `Ready to outreach`
- `Ready to sync`
- `Launch ready`
- `CRM ready`
- `Workflow ready`

## Tiny safe implementation note

If a later worker implements this, keep it static and local:

1. Add a static data object or markdown-derived fixture under the private dashboard repo for the 2026-05-11 audit counts and section rows.
2. Add a new `Data Hygiene Backlog` section/card to `/approval-command-center` or a local-only `/data-hygiene` route.
3. Link to the audit and remediation plan by absolute path or documented local path.
4. Run only local lint/build checks.
5. Do not add API routes, live database clients, HighLevel calls, Supabase calls, Clio calls, browser automation, export-to-CRM controls, or approval/execute buttons.

Suggested implementation owner if code is requested later: `frontend-eng` for static UI, with `reviewer` gate before any dashboard source patch is considered done. Any live CRM/Supabase/HighLevel work must be a separate approval-packet task, not a dashboard task.

## Acceptance checklist

- [x] Missing `offer_id` visibility specified.
- [x] Missing `contact_id` visibility specified.
- [x] Stale opportunities visibility specified.
- [x] Duplicate candidates visibility specified.
- [x] Uncleared suppression/conflicts/prior-touch visibility specified.
- [x] Pending approvals visibility specified.
- [x] Forbidden actions visibility specified.
- [x] No-execution warning copy included.
- [x] Data fields, sample columns, filters, sorting, empty states, and error states included.
- [x] Audit and remediation deliverables linked.
- [x] No live API calls, no deployment, no source changes, no data mutation, and no external action performed.
