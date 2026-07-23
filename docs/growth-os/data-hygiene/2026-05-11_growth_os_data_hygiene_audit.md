# Growth OS Data Hygiene Audit — 2026-05-11

Task: `t_f16eb5da`
Scope: local/read-only audit of the Growth OS SQLite backlog referenced in the 2026-05-10 daily digest.

## Read-only boundary

This audit only inspected local files and the local SQLite database:

- Digest input: `docs/digests/2026-05-10_daily_digest.md`
- SQLite input: `/Users/jeff/.openclaw/projects/mountain-west-growth-os/data/growth-os.sqlite`
- QMD smoke hit: `qmd search "data hygiene backlog missing offer_id contact_id suppression checks Great Sky Pluto Bio Swimlane" -n 5 --line-numbers`
- SQLite access mode used for audit queries: `file:/Users/jeff/.openclaw/projects/mountain-west-growth-os/data/growth-os.sqlite?mode=ro&immutable=1`

No SQLite write, Supabase write, HighLevel/CRM mutation, Clio write, source-access restoration, prospect discovery, workflow test/enrollment, email send, social/LinkedIn action, public publishing, deploy, or client/prospect-facing action was performed.

## Executive finding

The May 10 digest's hygiene warning is still valid and slightly worse on opportunity counts because a new HighLevel-derived Sereact targeting-packet-ready row is now present locally.

Current local state:

- Opportunities: 49 total, up from the May 10 digest's 48.
- Missing `offer_id`: 30 opportunities.
- Missing `contact_id`: 39 opportunities.
- Stale opportunities last updated before 2026-05-07: 30 opportunities.
- Duplicate candidates: 3 total, all pending, all involving the named Great Sky / Pluto Bio / Swimlane duplicate groups.
- Contacts: 19 total; all 19 have `suppression_status=not_checked`.
- Suppression checks: 20 total; all 20 have `final_clearance=not_cleared`.
- Execution authorizations: 8 total; all 8 have `send_status=not_sent` and still require review/suppression/conflicts/opt-out/brand clearance.
- Outreach drafts: 20 total; all have `external_action_allowed=0`.
- Work items: 13 total; all are queued, approval-required, and `external_action_allowed=0`.

Recommended posture: treat this as a diagnostic backlog only. Do not move any named-company record toward outreach, publication, workflow use, or CRM action until duplicates, offer/contact mapping, suppression, conflicts, opt-out, prior-touch, and attorney-review gates are resolved.

## Counts and status distribution

| Table / queue | Current count | Relevant status distribution |
| --- | ---: | --- |
| `opportunities` | 49 | `identified`: 28; `agent-targeting`: 10; `research_staged`: 10; `targeting-packet-ready`: 1 |
| `contacts` | 19 | `suppression_status=not_checked`: 19 |
| `approval_items` | 52 | `pending`: 46; `approved`: 6 |
| `suppression_checks` | 20 | `final_clearance=not_cleared`: 20 |
| `execution_authorizations` | 8 | `send_status=not_sent`: 8 |
| `outreach_drafts` | 20 | 10 `attorney_review_only` / `blocked_not_send_ready`; 10 `drafted` / `needs_review`; all `external_action_allowed=0` |
| `duplicate_candidates` | 3 | `review_status=pending`: 3 |
| `work_items` | 13 | all `queued`; all `approval_required=1`; all `external_action_allowed=0` |

Approval-item backlog detail:

| Item type | Status | Risk | Count |
| --- | --- | --- | ---: |
| `outreach_draft` | pending | attorney_review_required | 10 |
| `draft` | pending | medium | 8 |
| `phase7_final_copy` | pending | medium | 8 |
| `phase7_send_rule` | pending | high | 4 |
| `phase7_channel` | pending | medium | 3 |
| `campaign` | pending | medium | 2 |
| `draft` | pending | high | 2 |
| single pending high/medium setup items | pending | mixed | 9 |
| previously approved setup items | approved | mixed | 6 |

Work-item backlog detail:

| Work type | Stage | Risk | Count | External action allowed |
| --- | --- | --- | ---: | --- |
| `agent_targeting_packet` | queued | attorney_review_required | 6 | 0 |
| `agent_targeting_packet` | queued | high | 4 | 0 |
| `qa_review` | queued | high | 1 | 0 |
| `segment_research` | queued | medium | 1 | 0 |
| `targeting_packet_review` | queued | high | 1 | 0 |

## Opportunity mapping gaps

Opportunity mapping is the largest structural backlog.

| Gap | Count |
| --- | ---: |
| Missing `offer_id` | 30 |
| Missing `contact_id` | 39 |
| Missing both `offer_id` and `contact_id` | 30 |
| Last updated before 2026-05-07 | 30 |

The 30 rows missing both `offer_id` and `contact_id` are mostly the older `identified` rows plus one AION HighLevel Agent Targeting placeholder:

| Company | Opportunity ID | Stage | Updated at |
| --- | --- | --- | --- |
| Bifrost Electronics | `ghl-lead-funded-bifrost-electronics` | identified | 2026-05-05T05:43:31.586Z |
| AskElephant | `ghl-lead-ai-askelephant` | identified | 2026-05-05T05:43:35.598Z |
| Board in a Bag | `ghl-lead-prod-board-in-a-bag` | identified | 2026-05-05T05:43:35.598Z |
| Boomtown Innovation Platforms | `ghl-lead-ref-boomtown-boulder` | identified | 2026-05-05T05:43:35.598Z |
| CU Boulder Venture Partners | `ghl-lead-ref-cu-venture-partners` | identified | 2026-05-05T05:43:35.598Z |
| Denver Ventures | `ghl-lead-ref-denver-ventures` | identified | 2026-05-05T05:43:35.598Z |
| Flatirons AI | `ghl-lead-ai-flatirons-ai` | identified | 2026-05-05T05:43:35.598Z |
| GenFlux | `ghl-lead-ai-genflux` | identified | 2026-05-05T05:43:35.598Z |
| Gravitee | `ghl-lead-ai-gravitee` | identified | 2026-05-05T05:43:35.598Z |
| Great Sky | `ghl-lead-ai-great-sky` | identified | 2026-05-05T05:43:35.598Z |
| Great Sky | `ghl-lead-funded-great-sky` | identified | 2026-05-05T05:43:35.598Z |
| Innosphere Ventures | `ghl-lead-ref-innosphere` | identified | 2026-05-05T05:43:35.598Z |
| Kamber Labs | `ghl-lead-prod-kamber-labs` | identified | 2026-05-05T05:43:35.598Z |
| LightTable | `ghl-lead-ai-lighttable` | identified | 2026-05-05T05:43:35.598Z |
| Mindsmith | `ghl-lead-funded-mindsmith` | identified | 2026-05-05T05:43:35.598Z |
| Mountain Drifter | `ghl-lead-prod-mountain-drifter` | identified | 2026-05-05T05:43:35.598Z |
| Nectr Bottle Co. | `ghl-lead-prod-nectr` | identified | 2026-05-05T05:43:35.598Z |
| Pluto Bio | `ghl-lead-ai-pluto-bio` | identified | 2026-05-05T05:43:35.598Z |
| Pluto Bio | `ghl-lead-funded-pluto-bio` | identified | 2026-05-05T05:43:35.598Z |
| Polaris Electro-Optics | `ghl-lead-funded-polaris-electro-optics` | identified | 2026-05-05T05:43:35.598Z |
| RVC HyperAccelerator | `ghl-lead-ref-rvc-hyperaccelerator` | identified | 2026-05-05T05:43:35.598Z |
| ReNu | `ghl-lead-prod-renu` | identified | 2026-05-05T05:43:35.598Z |
| Rockies Venture Club | `ghl-lead-ref-rockies-venture-club` | identified | 2026-05-05T05:43:35.598Z |
| Seed Theory Skincare | `ghl-lead-prod-seed-theory` | identified | 2026-05-05T05:43:35.598Z |
| Simple Body | `ghl-lead-prod-simple-body` | identified | 2026-05-05T05:43:35.598Z |
| Swimlane | `ghl-lead-ai-swimlane` | identified | 2026-05-05T05:43:35.598Z |
| Swimlane | `ghl-lead-funded-swimlane` | identified | 2026-05-05T05:43:35.598Z |
| Techstars Boulder Accelerator | `ghl-lead-ref-techstars-boulder` | identified | 2026-05-05T05:43:35.598Z |
| AION Robotics Corporation | `ghl-lead-prospect_089c4bc541c05da752169c7a` | agent-targeting | 2026-05-06T06:52:29.088Z |
| unknown/null company | `ghl-opp-hUevEZZwjvyALchVzSzv` | targeting-packet-ready | 2026-05-10T18:32:02.464Z |

Nine additional Agent Targeting opportunities have offer IDs but still lack contact IDs: Kodiak Robotics, Nexar, Rigetti Computing, Electra, Flatfile/Obvious, PickNik Robotics, Manifest OS, RADICL, and Sereact.

The 30 stale rows before 2026-05-07 are the 28 older `identified` rows plus AION's original `research_staged` row and AION's HighLevel Agent Targeting placeholder. The newer Agent Targeting records from 2026-05-07/08 are not stale by that cutoff but still lack contact IDs and clearance.

## Duplicate groups requiring review

All duplicate candidates are exact company-name matches with confidence 0.95 and `review_status=pending`.

| Duplicate ID | Entity type | Local ID A | Local ID B | Names | Domains | Status |
| --- | --- | --- | --- | --- | --- | --- |
| `dup-ai-pluto-bio-funded-pluto-bio` | prospect | `ai-pluto-bio` | `funded-pluto-bio` | Pluto Bio / Pluto Bio | `pluto.bio` / `pluto.bio` | pending |
| `dup-ai-swimlane-funded-swimlane` | prospect | `ai-swimlane` | `funded-swimlane` | Swimlane / Swimlane | `www.builtincolorado.com` / `www.builtincolorado.com` | pending |
| `dup-ai-great-sky-funded-great-sky` | prospect | `ai-great-sky` | `funded-great-sky` | Great Sky / Great Sky | `raising.fi` / `raising.fi` | pending |

Read-only finding: these duplicate groups should be triaged before mapping offers/contacts or clearing prior-touch checks, because duplicate resolution affects which local IDs should be canonical.

Future remediation only: choose canonical prospect IDs, archive/merge duplicate local records, reconcile related opportunities/drafts/suppression checks, and update prior-touch evidence. Do not perform those mutations without exact approval.

## Suspect and low-confidence contacts noted by the digest

The digest's named contact-quality warnings are still visible in local contacts. Contact confidence appears stored on a 0–100 scale, so these are low-confidence by practical review standards even though a naive `< 0.75` query returns none.

| Company | Contact | Title | Email | LinkedIn | Confidence | Status / issue |
| --- | --- | --- | --- | --- | ---: | --- |
| Rigetti Computing | Sub cool | CEO | blank | `https://www.linkedin.com/in/supercool` | 60.0 | Suspect CEO data noted by digest; do not use externally. |
| Rigetti Computing | Rob Mortensen | CFO | blank | blank | 55.0 | Low confidence and incomplete contact fields. |
| Nexar | Saurav Gupta | CEO / Co-founder | blank | company LinkedIn URL | 65.0 | Duplicate Saurav Gupta row; LinkedIn is company-level, not person-level. |
| Nexar | Saurav Gupta | CEO | blank | blank | 62.0 | Duplicate Saurav Gupta row. |
| Sereact | Dr. Ralf Gulde | CEO | blank | blank | 65.0 | Low-confidence source; digest flags Sereact contact data as low-confidence. |
| Sereact | Marc Tuscher | CTO | blank | blank | 65.0 | Low-confidence source; digest flags Sereact contact data as low-confidence. |
| Flatfile / Obvious | David Boskovic | Founder & CEO | blank | blank | 80.0 | Missing email and LinkedIn; naming convention still needs care. |
| Flatfile / Obvious | pr@flatfile.com | Media Contact (department email) | `pr@flatfile.com` | blank | 65.0 | Department email is not a decision-maker contact. |

Contact-field hygiene totals:

- Contacts missing email: 17 of 19.
- Contacts missing LinkedIn: 11 of 19.
- Contacts missing both email and LinkedIn: 10 of 19.
- Contacts with `suppression_status=not_checked`: 19 of 19.

Future remediation only: normalize duplicate contacts, replace suspect/department records with verified person-level data only after approved source access, and keep any named-company use blocked until attorney/conflicts/suppression review is complete.

## Suppression, conflicts, opt-out, and prior-touch clearance

No outreach clearance is present.

Prospect-level fields:

| Prospect suppression status | Prospect conflicts status | Count |
| --- | --- | ---: |
| `not_checked` | `not_checked` | 28 |
| `consent_gap_no_auto_send` | `required_before_send` | 6 |
| `not_checked` | `required_before_send` | 4 |

Suppression-check fields:

- 20 of 20 suppression checks have `final_clearance=not_cleared`.
- Named Agent Targeting checks for AION, Rigetti, Nexar, Kodiak, PickNik, Electra, Flatfile/Obvious, RADICL, Manifest OS, and Sereact are all still `not_checked` for local suppression, local Clio precheck, opt-out, and duplicate/prior-touch, with `whiteford_conflicts_status=required_before_send`.
- Older Phase 6 checks use local precheck statuses such as `no_opt_out_or_manual_suppression_in_local_project` / `local_clio_no_hit_precheck`, but still have `whiteford_conflicts_status=required_before_send`, `opt_out_status=needs_human_review_if_email`, `duplicate_prior_touch_status=needs_review`, and `final_clearance=not_cleared`.

Execution authorization fields:

- 8 of 8 authorizations have `final_review_status=pending`.
- 8 of 8 have `suppression_status=required`, `conflicts_status=required`, `opt_out_status=required`, and `brand_status=required`.
- 8 of 8 have `export_status=not_exported` and `send_status=not_sent`.

Read-only finding: there is no local basis to authorize outreach, sends, workflow enrollment, social action, or CRM stage advancement for any record in this backlog.

## Read-only findings vs. future remediation

### Read-only findings from this audit

1. The backlog remains active: 46 pending approval items, 13 queued work items, 20 uncleared suppression checks, and 8 unsent/pending execution authorizations.
2. Opportunity mapping has regressed numerically since the digest: 49 opportunities now exist; 30 miss `offer_id`; 39 miss `contact_id`; 30 miss both.
3. Great Sky, Pluto Bio, and Swimlane duplicate groups are still pending exact-name duplicate review.
4. All contacts remain suppression-uncleared; most contacts lack email and/or person-level LinkedIn data.
5. The digest's suspect-contact warnings remain true for Rigetti, Nexar, Sereact, and Flatfile/Obvious.
6. All outreach drafts remain internal-only with `external_action_allowed=0`.
7. All work items remain queued, approval-required, and not externally actionable.
8. QMD retrieval correctly returns the May 10 digest line that called out the same backlog.

### Future remediation, not performed here

1. Resolve canonical prospect records for Great Sky, Pluto Bio, and Swimlane; then reconcile related opportunity/draft/suppression references.
2. Map legacy `identified` opportunities to approved offer lanes or retire them from active queues.
3. Link Agent Targeting opportunities to verified person-level `contact_id` records only after contact source verification.
4. Replace or suppress suspect contacts: Rigetti `Sub cool`, duplicate Nexar `Saurav Gupta`, Sereact low-confidence rows, and Flatfile/Obvious department email.
5. Run approved conflicts, Clio/adverse-party, opt-out, suppression, and prior-touch checks before any named-company external use.
6. Triage 46 pending approval items and 13 queued work items before generating additional drafts or packets.
7. Keep Sereact's new `targeting-packet-ready`/unknown-company opportunity row under review until its source and local linkage are verified.

## Data-minimization note

This audit intentionally did not expand source claims, enrich contacts, infer source-blocked prospects, or use named-company details externally. No real-contact outreach action was taken. No public-source claim expansion was performed. No named-company external use was performed. No source-blocked prospect inference was performed. The report is internal diagnostic evidence only.

Business-development posture preserved: reduce backlog friction and deliver narrow diagnostic value before any consultation/outreach ask. Any future follow-up must remain opt-in-only, educational, non-hypey, non-confidential, no-ACR/no-legal-advice/no-guarantee, and attorney-review-gated.

## Suggested next safe action

Create a no-mutation remediation plan or task packet that sequences the backlog in this order:

1. Duplicate canonicalization plan for Great Sky, Pluto Bio, and Swimlane.
2. Offer/contact mapping worksheet for the 30 opportunities missing both IDs and the 9 Agent Targeting opportunities missing contact IDs.
3. Contact-quality replacement/suppression decision table for Rigetti, Nexar, Sereact, and Flatfile/Obvious.
4. Suppression/conflicts/prior-touch clearance checklist for approval by Jeff/Whiteford before any future external action.

That next packet should remain documentation-only unless Jeff explicitly authorizes exact database or system mutations.
