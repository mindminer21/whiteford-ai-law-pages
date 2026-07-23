# Nightly Lead Research Digest — 2026-05-23 (patched after review t_ae1d6444)

> Original run: qwen-local research run t_864b28e6
> Review artifact: /Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-23/nightly_qwen_prospect_digest_review_t_b86e59af.md
> External action allowed: false
> Posture: research_only / attorney_review_required / manual/no-post/no-send

## Executive Summary

Firecrawl/API source access was operational for the original 2026-05-23 run, but reviewer t_b86e59af found blocking geography/current-source issues. This patched digest corrects the packet before downstream use:

- Josh.ai remains the only currently supportable Denver/HQ prospect in this packet, still internal-only and attorney-review-required.
- AKASA is corrected from “Denver, CO (HQ)” to “South San Francisco, CA HQ; Denver hub/coworking presence only.” It is on HOLD for Mountain-West-specific queueing until first-party/reliable source review clears the geography use.
- Deepwatch is removed from the Denver/Mountain West queue. Current checked sources do not support Denver geography; Crunchbase News describes Tampa, Florida, founded 2019, $256M total raised, and Deepwatch’s first-party 2024 announcement names John DiLullo CEO based in Silicon Valley.
- Social/LinkedIn draft candidates are untagged only, attorney-review-only, manual, and no-post.

No CRM writes, HighLevel actions, Supabase live sync/backfill/DDL, workflow activation/enrollment/tagging, outreach, email/SMS/DM, LinkedIn/social/ad action, Clio write, public publishing, or client/prospect-facing action is authorized.

## Corrected Prospect Status

### Prospect 1: Josh.ai (fit_score: 88) — internal priority, attorney review required

| Field | Value |
|---|---|
| Industry | AI / Smart Home / Voice Assistant Software |
| Location | Denver, CO (HQ; first-party source checked by reviewer) |
| Founded | 2015 |
| Primary Lane | ai-patent |
| Outreach Readiness | draft_ready_attorney_review_only |
| Lead Magnet | AI Patent Strategy Scorecard |
| Contacts | Tim Gill (Co-Founder & CTO), Alex Capecelatro (Co-Founder & CEO) |

Corrections:
- Removed the Josh.ai company LinkedIn URL from Tim Gill’s person-level `linkedin_url` field.
- Added `https://josh.ai/patents/` as explicit first-party evidence for patent-page wording.
- Replaced “actively producing/filing AI patents” with source-exact wording: public patent page lists numerous provisional patent applications plus listed utility/design patents.

### Prospect 2: AKASA — HOLD for Mountain-West queue until geography review clears

| Field | Value |
|---|---|
| Industry | Healthcare / AI / Revenue Cycle Management |
| Corrected Location | South San Francisco, CA HQ; Denver/Colorado hub/coworking presence only |
| Founded | 2019 per Built In profile; first-party confirmation recommended before external use |
| Primary Lane | ai-compliance |
| Outreach Readiness | hold_geography_needs_corroboration |
| Lead Magnet | AI Compliance Gameplan Builder |

Corrections:
- Removed the unsupported Denver HQ characterization.
- Added AKASA careers page support for Bay Area/NYC/Denver hubs and Built In support for South San Francisco HQ with Denver coworking hub/office.
- Reclassified geography as partial/hub-only, not a passed Denver HQ gate.
- Benjamin Beadle-Ryby remains medium confidence; LinkedIn-only evidence is not treated as primary and requires non-LinkedIn or manual human verification before named-recipient targeting.

### Prospect 3: Deepwatch — HOLD / removed from Denver-Mountain West queue

| Field | Value |
|---|---|
| Industry | Cybersecurity / MDR |
| Corrected Geography | Tampa, FL per Crunchbase News; no current Denver/Mountain West nexus verified |
| Founded | 2019 per Crunchbase News |
| Funding | $256M total raised per Crunchbase News; $180M 2023 financing included equity investments and strategic financing with no debt/equity breakdown |
| Outreach Readiness | hold_geography_current_source_correction_required |

Corrections:
- Removed “Denver, CO” and “rapidly scaling from Denver” claims.
- Added first-party Deepwatch 2024 CEO-change source for John DiLullo.
- Corrected the 2023 Crunchbase source: Charlie Thomas was CEO in the 2023 funding article; John DiLullo became CEO in 2024 and is based in Silicon Valley.
- Removed Deepwatch from Mountain-West-specific Agent Targeting prep unless a new current reliable source supports a Colorado nexus.

## Evidence URLs Added or Corrected

| Prospect | Source URL | Source Type | Patch Use |
|---|---|---|---|
| Josh.ai | https://josh.ai/patents/ | first_party | Source-exact patent-page wording |
| AKASA | https://akasa.com/careers/ | first_party | Bay Area/NYC/Denver hubs; not Denver HQ |
| AKASA | https://www.builtinsf.com/company/akasa/offices | external_directory | South San Francisco HQ; Denver coworking hub/office |
| Deepwatch | https://news.crunchbase.com/cybersecurity/startup-venture-funding-deepwatch/ | third_party | Tampa FL, founded 2019, $256M total, 2023 CEO Charlie Thomas |
| Deepwatch | https://www.deepwatch.com/deepwatch-names-john-dilullo-as-chief-executive-officer/ | first_party | John DiLullo CEO effective 2024-07-02; based in Silicon Valley |

## Lead Magnet Fit Classification After Patch

| Prospect | Primary Lane | Tier / Status | Runner-Up |
|---|---|---|---|
| Josh.ai | ai-patent | high, attorney-review-only | tech-gc |
| AKASA | ai-compliance | HOLD until geography/source-current review clears | tech-gc |
| Deepwatch | tech-gc | HOLD / not Mountain-West queue | ma-readiness |

## Consent and Safety Status

All prospects remain `research_only`, `no_email_opt_in`, `ops:no-auto-send`, `lead_magnet_consented=false`, `attorney_review_required`, and `external_action_allowed=false`. No workflow trigger tags are applied. Suppression, conflicts, source-current verification, attorney/privacy/ethics review, and Jeff exact approval remain required before any external use.

## LinkedIn / Social Draft Posture

Attorney review only — no posting, no tags, no external action:

1. Josh.ai candidate hook: "Smart home companies building proprietary AI systems and public patent portfolios may benefit from mapping those public IP signals against competitive threats before expansion into healthcare/hotels."
2. AKASA candidate hook: "Healthcare AI revenue-cycle companies raise governance questions around HIPAA, state AI regulation, and operational risk; any AKASA-specific use must first clear geography/source-current review."

No `@` tags are included. These are internal drafting notes only and are not approved for LinkedIn/social publication.

## Validation Gate Summary After Patch

| Gate | Status |
|---|---|
| Gate 1: Live-source extraction | PASSED for patch source checks |
| Gate 2: Domain canonicalization | PASSED |
| Gate 3: Current URL/stale-page checks | PATCHED with AKASA and Deepwatch current checks |
| Gate 4: Contact/person validation | Josh.ai high; AKASA Benjamin manual/non-LinkedIn verification required; Deepwatch CEO first-party source added |
| Gate 5: LinkedIn URL hygiene | PATCHED — no company LinkedIn URL in person field; LinkedIn-only person evidence not primary |
| Gate 6: Mountain West geographic support | Josh.ai passed; AKASA partial/hub-only; Deepwatch hold/remove |
| Gate 7: Outreach/CRM readiness | Internal-only; AKASA/Deepwatch hold; all external actions blocked |

## Records Written or Staged

- `prospect_candidates.json` — patched source packet
- `prospect_candidates.normalized_for_store.json` — patched normalized local-store payload
- `agent-targeting-work-items/*.json` — patched per-company internal inputs
- `correction_report_t_ae1d6444.md` — correction report

## Recommended Next Tasks

1. Reviewer should re-review the patched packet and correction report.
2. Keep Josh.ai as the only supportable Denver/HQ prospect in this packet, still attorney-review-only.
3. Keep AKASA and Deepwatch on HOLD for Mountain-West-specific queues until source-current geography issues are separately cleared.
4. Do not use any copy externally without exact Jeff approval plus attorney, conflicts, suppression, privacy/ethics, and source-current review.
