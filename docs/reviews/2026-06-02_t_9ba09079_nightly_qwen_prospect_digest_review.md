# Review — Nightly Qwen Prospect Research Digest (2026-06-02)

Task: t_9ba09079
Reviewer: Hermes reviewer
Tenant: whiteford-mountain-west
Reviewed on: 2026-06-02 05:27:03 MDT

Reviewed artifacts:
- /Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-06-02/digest.md
- /Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-06-02/prospect_candidates.json
- /Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-06-02/prospect_candidates.normalized_for_store.json
- /Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-06-02/source_unavailable_report.md
- /Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-06-02/validation_report.md
- /Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-06-02/validation_report.json
- /Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-06-02/store_verification.json
- /Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-06-02/store_dry_run.json
- /Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-06-02/store_output.json
- /Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-06-02/agent-targeting-work-items/windborne-systems.json
- /Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-06-02/agent-targeting-work-items/mach-industries.json
- /Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-06-02/agent-targeting-work-items/gigascale-capital.json
- Local Growth OS SQLite read-only verification: /Users/jeff/.openclaw/projects/mountain-west-growth-os/data/growth-os.sqlite
- Related sync/blocker tasks: t_c1584530, t_dc25385f, t_7884ab57, t_fa6eb9c1

## Verdict

PASS-with-major-constraints for local/internal Growth OS staging and attorney-review queueing only, with one remediation-required source hygiene issue before any downstream sync/outreach packet.

The packet is directionally usable as a private prioritization surface for three research-only prospects: Mach Industries, WindBorne Systems, and Gigascale Capital. The local staging preserves the correct no-send/no-workflow posture: 0 contacts staged, external_action_allowed total 0, no opt-in/consent-gap language, conflicts-required status, pending approval/suppression/sync rows, and no workflow trigger tags.

This review does not approve outreach, manual email, HighLevel sync, Supabase mirror, LinkedIn/social use, public/client-facing copy, workflow enrollment/activation, trigger tags, Clio writes, or any live CRM mutation.

## Executive review summary

- Local staging succeeded for 3 prospects, 0 contacts, 3 opportunities, 6 source-evidence rows, 3 outreach drafts, 3 pending approval items, 3 CRM sync records, 3 suppression checks, and 3 queued Agent Targeting work items.
- Highest priority: Mach Industries (priority 85, AI Compliance primary; Tech OGC and M&A Readiness secondary). WindBorne Systems is a strong Tech OGC candidate (priority 77). Gigascale Capital is lower-priority and should be treated as a portfolio-introduction channel rather than a direct operating-company prospect (priority 71).
- Gate 4 failed for all prospects: no named decision-maker contact details were verified, and no contact rows were staged. This is the correct conservative result.
- TechCrunch source spot-checks passed via browser fallback for the three article URLs and supported the material funding/product/fund facts used in internal notes.
- First-party source spot-check found a remediation issue: the staged WindBorne and Mach first-party domains are not currently canonical. `https://windborne.systems` returned 404, while `https://windbornesystems.com` loaded first-party WindBorne content. `https://machindustries.ai` returned 404, while `https://machindustries.com` loaded first-party Mach content. `https://gigascale.capital` redirected to first-party `https://gigascale.com` and loaded.
- `source_unavailable_report.md` is correctly marked SUPERSEDED because browser fallback produced prospects; it is not a controlling no-op report.
- HighLevel sync is not complete and not approved: t_c1584530 remains todo and gated by blocked t_7884ab57. No live HighLevel contact, opportunity, tag, workflow, enrollment, campaign, or send action is complete or approved.
- Supabase mirror is not complete and not approved: t_dc25385f remains todo and gated by blocked t_fa6eb9c1. No expanded-table mirror, sync, DDL, or backfill is complete or approved.
- Follow-up created: t_c79e98c9 for ops to repair the canonical domain/source-evidence fields before any sync or external-action packet.

## Business-development / QMD calibration used

- Loaded the local business-development-rag and qmd skills before review.
- Business-development corpus search returned lead-magnet principles around narrow value-first education, qualification, and avoiding commoditized or premature outreach. Applied here only as a review lens: the lanes are plausible for private prioritization, but the drafts must stay gated behind exact approval and legal-marketing review.
- QMD search over whiteford-ai-law-pages surfaced prior nightly Qwen review patterns emphasizing no-auto-send posture, source-current checks, contact validation, HighLevel/Supabase blocker recognition, and attorney-review-only treatment.

## Artifact and data checks performed

1. JSON syntax: PASS for prospect_candidates.json, prospect_candidates.normalized_for_store.json, validation_report.json, store_verification.json, store_dry_run.json, store_output.json, and all 3 agent-targeting work-item JSON files.
2. Local SQLite table count recheck: PASS. Current counts match store_verification.json: prospects 65, contacts 57, opportunities 76, source_evidence 132, outreach_drafts 47, approval_items 79, crm_sync_records 58, suppression_checks 47, work_items 42.
3. Staged prospect row recheck: PASS. Rows exist for prospect_windborne_systems_20260602, prospect_mach_industries_20260602, and prospect_gigascale_capital_20260602 with pipeline_stage=research_staged, suppression_status=consent_gap_no_auto_send, conflicts_status=required_before_send, and fit scores 88/86/82.
4. Per-prospect local record shape: PASS/HOLD. Each staged prospect has 1 opportunity, 2 source-evidence rows, 1 outreach draft, 1 suppression check, 1 pending CRM sync row, 1 pending approval item via the related draft, and 1 queued Agent Targeting work item; each has 0 contacts because Gate 4 failed.
5. Approval gate rows: PASS/HOLD. Each draft has a pending approval item assigned for Jeff Schell review and remains attorney-review-only.
6. Suppression/conflicts rows: PASS/HOLD. Each suppression check remains local_suppression_status=not_checked, whiteford_conflicts_status=required_before_send, opt_out_status=not_checked, duplicate_prior_touch_status=not_checked, and final_clearance=not_cleared.
7. Consent/workflow controls: PASS. Agent-targeting work items have ops_no_auto_send=true, consent_basis=no_email_opt_in, approval_status=no-auto-send, workflow_trigger_tags=[], suppression_tags including newsletter:not-consented, approval_required=true, and external_action_allowed=false.
8. Source evidence: PASS for TechCrunch article facts; HOLD/REPAIR for first-party evidence rows on WindBorne and Mach because the staged domains 404 and should be corrected to currently loading first-party domains before any live sync, source-current claim, or copy finalization.
9. Sync lanes: PASS for blocker recognition. Kanban shows HighLevel sync t_c1584530 and Supabase mirror t_dc25385f remain todo/gated by blocked parents t_7884ab57 and t_fa6eb9c1.

## Source spot-check notes

- TechCrunch / WindBorne article loaded with title "This AI weather startup is out-forecasting government agencies" and supports WindBorne Systems, WeatherMesh-6, hourly/3 km forecast detail, about 400 balloons, 15 global sites, CEO John Dean quote, data assimilation/model claims, and customers including NOAA, U.S. Air Force, and Navy.
- TechCrunch / Mach article loaded with title "Defense tech darling Mach Industries hits $1.8B valuation, a 4x jump in a year" and supports $300M Series C, $1.8B valuation, Ethan Thornton, Huntington Beach, five autonomous vehicles, DIU/Navy contract, about 350 employees, four facilities by end of 2026, and Exquadrum/Mach Energetics facts.
- TechCrunch / Gigascale article loaded with title "Zigging when most are zagging, ex-Meta CTO raises $250M climate fund" and supports $250M fund, former Meta CTO Mike Schroepfer, energy/grid/critical-minerals focus, and portfolio references including Commonwealth Fusion Systems, Heron Power, Mill, and Form Energy.
- First-party WindBorne check: staged `https://windborne.systems` returned 404; `https://windbornesystems.com` loaded first-party WindBorne content including WeatherMesh, Atlas/balloon constellation, partnerships, NOAA/federal-contract links, and contact/navigation surfaces.
- First-party Mach check: staged `https://machindustries.ai` returned 404; `https://machindustries.com` loaded first-party Mach Industries content including defense positioning, product links, Careers, Contact, Newsroom, LinkedIn/X links, and newsroom items.
- First-party Gigascale check: `https://gigascale.capital` redirected to `https://gigascale.com`, which loaded first-party Gigascale Capital content, portfolio/team sections, contact form, and info/press email links.
- Firecrawl/web_extract still returns 402 Payment Required. Browser fallback is therefore the only successful live source-current tool used in this review, and a fresh approved source-current check remains required before any external use.

## Prospect-by-prospect review notes

### Mach Industries

Status: usable for internal prioritization only; HOLD for external use; canonical domain repair required.

- AI Compliance + M&A Readiness fit is plausible because the public facts concern defense autonomous systems, dual government/commercial revenue, DIU/Navy contract work, rapid valuation increase, acquisition activity, and manufacturing scale-up.
- The staged domain should be corrected from `machindustries.ai` to the current first-party domain `machindustries.com` before any sync, source-current claim, or final-copy use.
- No named contact is validated. Ethan Thornton is named publicly, but no direct contact/GC/CTO/Head of IP route is verified.
- Do not imply a compliance failure or legal deficiency. Keep future copy educational and framed around scale-up governance, export-control/IP/M&A readiness questions.

### WindBorne Systems

Status: usable for internal prioritization only; HOLD for external use; canonical domain repair required.

- Tech OGC fit is plausible because the public facts concern proprietary data infrastructure, AI forecasting, federal/government customers, model/data-assimilation claims, and scaling commercial/government uses.
- The staged domain should be corrected from `windborne.systems` to the current first-party domain `windbornesystems.com` before any sync, source-current claim, or final-copy use.
- No named contact is validated. John Dean is named publicly, but no direct contact/GC/CTO/Head of IP route is verified.
- Use national AI/weather-data/federal-contracting relevance only. Mountain West relevance is not supported.

### Gigascale Capital

Status: usable for internal prioritization only; HOLD for external use; treat as portfolio-introductions channel, not direct operating-company prospect.

- Tech OGC portfolio-company angle is plausible because Gigascale backs energy/grid/physical-infrastructure companies that may need governance, IP, compliance, and growth counsel as they scale.
- The first-party domain currently resolves from `gigascale.capital` to `gigascale.com`; downstream records should note that redirect/canonical domain before live sync.
- No named contact is validated. Mike Schroepfer is named publicly, but direct outreach target, portfolio comms contact, and right channel are unverified.
- The draft should not be treated like a standard company-prospect email. Any future packet should explicitly position this as educational material for portfolio-company introductions and avoid suggesting Gigascale itself needs Tech OGC services.

## Suppression / conflicts / consent review

The local staging correctly keeps all three prospects behind no-send controls:

- pipeline_stage: research_staged
- suppression_status: consent_gap_no_auto_send
- conflicts_status: required_before_send
- contact rows: 0
- local_suppression_status: not_checked
- whiteford_conflicts_status: required_before_send
- opt_out_status: not_checked
- duplicate_prior_touch_status: not_checked
- final_clearance: not_cleared
- consent_gating.ops_no_auto_send: true
- consent_basis: no_email_opt_in
- approval_status: no-auto-send
- workflow_trigger_tags: []
- suppression_tags include newsletter:not-consented
- external_action_allowed_total: 0

No email, SMS, DM, LinkedIn/social action, workflow activation/enrollment, trigger tag, HighLevel contact/opportunity write, Supabase live sync, Clio write, public publishing, ad action, or prospect-facing use is authorized by this review.

## HighLevel and Supabase sync status

HighLevel:
- t_c1584530 remains todo for the 2026-06-02 HighLevel Agent Targeting sync lane.
- It is gated by blocked parent t_7884ab57, the durable HighLevel token/location/API access blocker.
- The local crm_sync_records for the three prospects remain sync_status=pending, eligibility_status=not_checked, crm_object_id=null, with block_reason: "Live GHL/Supabase writes require Jeff approval; staged locally only."
- No live HighLevel contact, opportunity, tag, workflow, enrollment, campaign, or send action is complete or approved.

Supabase:
- t_dc25385f remains todo for the 2026-06-02 Supabase mirror lane.
- It is gated by blocked parent t_fa6eb9c1, the expanded Growth OS mirror schema/table blocker.
- No Supabase DDL, sync, mirror, or backfill is complete or approved.

## Required next actions

1. Keep all 3 prospects internal-only until Jeff approves a separate exact-action packet for any external step.
2. Complete follow-up t_c79e98c9 before any HighLevel/Supabase sync or external-action packet, so canonical first-party domains/source evidence are repaired locally.
3. Do not start HighLevel sync t_c1584530 until t_7884ab57 is resolved, canonical-domain repair is complete, and Jeff gives exact approval for any live CRM mutation. Even then, confirm no trigger tags, no workflows, no enrollment, and no sends.
4. Do not start Supabase mirror t_dc25385f until t_fa6eb9c1 is resolved and the expanded schema/sync path is approved; also wait for canonical-domain repair if the mirror would copy source evidence or company URLs.
5. Before any delivery or external-action packet, validate named recipient, final copy, channel, timing, source-current evidence, conflicts/suppression/prior-touch status, no-trigger-tag/no-enrollment posture, and Jeff approval.
6. If downstream automation consumes agent-targeting work-item JSON, normalize on the local Growth OS prospect id (`prospect_*_20260602`) rather than the shorter top-level source-packet id (`windborne_systems-20260602`, etc.).
7. Restore Firecrawl/search credits or continue to explicitly document browser fallback as the source-current method for this lane.

## Final decision

Approved only as an internal local-staging and prioritization record. HOLD for all external, live CRM, HighLevel, Supabase, social, workflow, and prospect-contact actions. Domain/source-evidence repair is required before live sync or exact-copy approval packets.
