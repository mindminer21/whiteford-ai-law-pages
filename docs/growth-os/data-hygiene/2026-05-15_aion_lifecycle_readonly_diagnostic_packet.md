# AION lifecycle read-only diagnostic packet — 2026-05-15

Task: `t_1285c205`  
Tenant: `whiteford-mountain-west`  
Status: INTERNAL / PRIVATE / READ-ONLY / NO-MUTATION DIAGNOSTIC PACKET

## Hard boundary

This packet is decision prep only. I inspected local files and the local SQLite database in read-only mode (`mode=ro&immutable=1` plus `PRAGMA query_only=ON`). I did not mutate SQLite, Supabase, HighLevel/CRM, Clio/DMS, dashboard state, auth/storage/calendar systems, source providers, contacts, opportunities, tags, workflows, drafts, approvals, suppression rows, or public/client-facing assets. I did not browse live sources, enrich contacts, send/email/SMS, enroll or activate workflows, tag/message/comment on LinkedIn, publish/social/ad content, or imply attorney-client relationship/availability.

Internal rows, local source snippets, HighLevel sync history, Agent Targeting stages, draft records, and approval rows are not consent, not conflicts clearance, not source-current proof, not legal advice, not matter acceptance, and not permission to contact.

## Bottom-line recommendation

HOLD AION. The local record set shows one research-staged AION opportunity with an offer/contact and one HighLevel/Agent Targeting placeholder opportunity for the same prospect that lacks both `offer_id` and `contact_id`. That is a lifecycle conflict and data-quality risk, not a fill-in task. No row should be linked, closed, archived, stage-moved, offer-filled, contact-filled, draft-used, approval-cleared, CRM-moved, or externally used without a future exact row-level packet and explicit Jeff/Whiteford approval.

## One-screen AION row map

| Surface | Visible local rows / IDs | Current posture |
| --- | --- | --- |
| Prospect | `prospect_089c4bc541c05da752169c7a` / AION Robotics Corporation; stage `research_staged`; segment `ai-patent`; risk `attorney_review_required`; suppression `not_checked`; conflicts `required_before_send`; created/updated 2026-05-06 | HOLD; useful as local research context only |
| Research-staged opportunity | `opp_8b9cb9cb94b88f73b74b7064`; prospect `prospect_089c4bc541c05da752169c7a`; `offer_id=ai-patent`; `contact_id=contact_14b42eb2f15da73c52694fcb`; stage `research_staged`; source `nightly_prospect_research` | HOLD; do not treat as approval to copy values |
| Agent Targeting placeholder | `ghl-lead-prospect_089c4bc541c05da752169c7a`; same prospect; stage `agent-targeting`; source `gohighlevel`; owner `GHL`; missing `offer_id`; missing `contact_id`; estimated value 0; created/updated 2026-05-06 | HOLD; lifecycle duplicate/placeholder risk |
| Contact | `contact_14b42eb2f15da73c52694fcb`; Nicholas Nunno; role/title founder/CEO/product-architect style; email/phone/LinkedIn present but minimized in evidence JSON; confidence 72; suppression `not_checked`; permission basis requires attorney review, suppression check, and conflicts/pre-contact clearance | HOLD; below send/link readiness; no auto-link |
| Source evidence | Five local `source_evidence` rows for AION: `evidence_09bcbfa1cb3b37db7bb9af2c`, `evidence_6a78fcbbc855e137a8974ee6`, `evidence_73bb8b9b7ce2a8c50bdcd449`, `evidence_9d37bdf00cd8ec86b1e24b21`, `evidence_e4a1da166a749df72312a6a9`; accessed 2026-05-06 | Stale/source-current sensitive; not current proof on 2026-05-15 |
| Outreach draft | `draft_58482b23881d3aa940dfc4c1`; title "AION Robotics AI Patent Strategy Scorecard invitation"; channel `manual_email_review`; status `drafted`; risk `attorney_review_required`; compliance `needs_review`; external_action_allowed `0`; brand block required | HOLD; draft exists only as internal attorney-review material |
| Approval item | `approval_4b75daaceafbd4ba71f96a2b`; review outreach draft; reviewer Jeff Schell; approval status `pending`; no decision/approval language | HOLD; no approval exists |
| Suppression check | `suppress_7605e2e8ab3ca93b488624ed`; local suppression `not_checked`; Clio precheck `not_checked`; conflicts `required_before_send`; opt-out `not_checked`; prior-touch `not_checked`; final clearance `not_cleared` | HOLD; clearance is explicitly missing |
| Work item | `work_nightly_agent_targeting_ef920ffa3aefae3eafae`; "Prepare Agent Targeting packet: AION Robotics Corporation"; stage `queued`; risk `high`; approval_required `1`; external_action_allowed `0` | HOLD; internal packet preparation only |
| GHL sync links | `ghl-link-prospect-contact-prospect_089c4bc541c05da752169c7a`; `ghl-link-prospect-opportunity-prospect_089c4bc541c05da752169c7a`; sync status `synced`; location/pipeline/stage IDs present in local rows | Historical local sync evidence only; not authority for new mutation |
| Activity / CRM sync record | `activity-ghl-lead-sync-prospect_089c4bc541c05da752169c7a` records prior outbound CRM write with summary "No sends/sequences"; `sync_b17108cafcf3cab12f91314f` records `upsert_staging` synced | Historical only; no new live action authorized |
| Empty surfaces in read-only query | No AION `execution_authorizations`, `duplicate_candidates`, `ghl_opportunity_stage_events`, or `qa_reviews` rows found by targeted query | Missing evidence; do not infer clearance/readiness |

## Plain-English lifecycle conflict / risk

AION has two local opportunity lifecycle records that point to the same prospect but disagree in readiness-critical fields:

1. The research-staged row has an offer and contact (`ai-patent` plus `contact_14b42eb2f15da73c52694fcb`).
2. The Agent Targeting/HighLevel placeholder row has neither offer nor contact.
3. The existence of a sibling row with filled fields does not authorize copying those fields into the Agent Targeting row.
4. The contact row has useful internal research facts, but confidence 72 plus suppression `not_checked` is not sufficient for link/send/readiness.
5. The source evidence is dated 2026-05-06 and therefore stale/currentness-sensitive on 2026-05-15, especially while live source access is separately blocked.
6. The draft and approval surfaces prove the opposite of readiness: a draft exists, attorney review is required, approval is pending, and external action is disallowed.
7. The suppression/conflicts/prior-touch row is not cleared.

## What is HOLD now

Keep all of these frozen:

- `prospect_089c4bc541c05da752169c7a`
- `opp_8b9cb9cb94b88f73b74b7064`
- `ghl-lead-prospect_089c4bc541c05da752169c7a`
- `contact_14b42eb2f15da73c52694fcb`
- AION source evidence rows listed above
- `draft_58482b23881d3aa940dfc4c1`
- `approval_4b75daaceafbd4ba71f96a2b`
- `suppress_7605e2e8ab3ca93b488624ed`
- `work_nightly_agent_targeting_ef920ffa3aefae3eafae`
- related GHL sync link, activity, and CRM sync history rows

No local mutation, live CRM/HighLevel write, Supabase mirror/backfill claim, contact enrichment, source browsing, draft revision for external use, approval clearance, suppression update, workflow/tag/email/SMS/social/LinkedIn/public action, Clio check/write, or client/prospect-facing use is approved by this packet.

## What is stale/source-currentness sensitive

The local source evidence and prospect/contact fields were created from 2026-05-06 research. They may still be useful for internal triage, but they are not current proof for 2026-05-15 mutation or public/named-company use. A future source-current review would need approved source access and must verify at minimum:

- current AION company identity, domain, location, and relevant product/AI/IP facts;
- whether the identified person is still the right person-level contact and role;
- whether any contact channel is appropriate, opt-in-compatible, non-confidential, and source-supported;
- whether the `ai-patent` offer lane still fits and is not inferred solely from a stale sibling row;
- whether HighLevel/local placeholder IDs still refer to the same lifecycle state;
- whether any prior touch, suppression, opt-out, DND, bounce, manual suppression, conflicts, Clio/adverse-party, or brand/attorney review blocker exists.

## Missing evidence before any mutation or external action

The local packet is missing all evidence that would be required for mutation or external use:

- no current-source verification after 2026-05-06;
- no exact AION row-level lifecycle decision: link, keep separate, close, archive, rename, quarantine, alias, merge, or leave unchanged;
- no explicit offer-lane decision for the Agent Targeting placeholder;
- no contact-quality decision: keep, suppress, replace, or internal-reference-only;
- no cleared local suppression status;
- no HighLevel DND/unsubscribe/bounce/manual suppression verification;
- no opt-out/preferences verification;
- no Whiteford conflicts clearance;
- no Clio/adverse-party precheck;
- no duplicate/prior-touch clearance;
- no attorney/brand/privacy/deliverability approval for exact copy, channel, CTA, route, and timing;
- no execution authorization row;
- no approved backup/export, proposed-values table, rollback, verification query set, operator, reviewer, or stop conditions.

## Exact future approval required before any mutation

A future mutation-plan packet would need explicit Jeff/Whiteford approval naming all of the following:

1. exact systems in scope, e.g. local SQLite only, Supabase mirror, HighLevel/CRM, Clio, dashboard/docs, or explicit exclusions;
2. exact table and primary-key list for every affected AION prospect, opportunity, contact, source evidence, draft, approval, suppression, work item, sync link, activity, CRM sync, and execution authorization row;
3. current value and proposed value for each changed field;
4. lifecycle decision for the two opportunity rows: link, keep separate, close, archive, rename, quarantine, alias, merge, retire, or leave unchanged;
5. whether `offer_id=ai-patent` may be set on any placeholder row and the current-source basis for that decision;
6. whether `contact_14b42eb2f15da73c52694fcb` may be kept, suppressed, replaced, or used as internal reference only;
7. source-current evidence paths/timestamps and no source-blocked inference;
8. suppression, HighLevel DND/unsubscribe/bounce/manual suppression, opt-out, conflicts, Clio/adverse-party, duplicate/prior-touch, brand, privacy, deliverability, and attorney-review checklist results;
9. backup/export path, verification queries with expected counts, rollback steps, operator, reviewer, and stop conditions;
10. explicit exclusion of outreach, workflow enrollment, CRM movement beyond named fields, email/SMS/social/LinkedIn/YouTube/ad action, public use, legal advice, or client/prospect-facing action unless separately and exactly approved.

## Copy/paste Jeff choices

### Option A — HOLD

```text
HOLD: Keep the AION Robotics lifecycle rows, contact, source evidence, draft, approval, suppression, work-item, GHL sync-link, activity, and CRM sync history frozen. Do not mutate SQLite, Supabase, HighLevel/CRM, Clio, dashboard/docs, workflow, source, prospect/contact, outreach, social/LinkedIn, email/SMS, public/client-facing, or legal-system records. No external action is approved.
```

### Option B — approve future read-only source-current review only

```text
GO for future AION read-only source-current review only: I approve a private/internal no-mutation review of current AION company/source/contact evidence and lifecycle consistency. This does not approve contact enrichment beyond approved source review, SQLite/Supabase/HighLevel/CRM/Clio mutation, draft use, approval clearance, workflow/tag/email/SMS/social/LinkedIn/public/client-facing action, or legal advice.
```

### Option C — request future local-only mutation-plan packet after review

```text
REQUEST a future AION local-only mutation-plan packet only after source-current, conflicts, suppression, opt-out, prior-touch, contact-quality, and attorney/brand review evidence is assembled. The packet must name exact local SQLite tables, row IDs, current values, proposed values, backup/export path, verification queries, rollback steps, operator, reviewer, stop conditions, and explicit no-external-action exclusions. Do not mutate anything until I separately approve that exact packet.
```

## Business-development principle applied

A strong lead magnet or decision asset should solve one narrow diagnostic problem completely before asking for a consultation. For AION, the useful narrow diagnostic is not "send the AI Patent Strategy Scorecard invitation"; it is "is the lifecycle/contact/source/clearance data clean enough to even consider a future packet?" This packet earns engaged time/trust by making that one data-quality decision clear, while keeping legal-services follow-up opt-in-only, educational, non-confidential, no-legal-advice, no attorney-client-relationship, and attorney-review-gated.

## Evidence file

Detailed query record and minimized row evidence: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/growth-os/data-hygiene/2026-05-15_aion_lifecycle_readonly_diagnostic_packet_evidence.json`
