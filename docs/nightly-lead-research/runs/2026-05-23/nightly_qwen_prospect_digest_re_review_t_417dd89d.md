# Re-review — Patched Nightly Qwen Prospect Packet, 2026-05-23

Task: `t_417dd89d`  
Original review task: `t_b86e59af`  
Patch task: `t_ae1d6444`  
Reviewed at: 2026-05-23 02:49 MDT  
Tenant: `whiteford-mountain-west`

## Verdict

PASS-with-constraints for internal-only downstream draft/staging review.

This is not approval for outreach, HighLevel mutation, Supabase live sync/backfill/DDL, workflow activation/enrollment/tagging, email/SMS/DM, LinkedIn/social/ad action, Clio write, attorney/prospect contact, public publishing, or client/prospect-facing use. All external/live actions remain blocked unless a later task has exact Jeff approval plus attorney/privacy/ethics, conflicts, suppression/opt-out, and source-current gates.

## Reviewed Artifacts

- `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-23/correction_report_t_ae1d6444.md`
- `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-23/nightly_qwen_prospect_digest_review_t_b86e59af.md`
- `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-23/digest.md`
- `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-23/prospect_candidates.json`
- `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-23/prospect_candidates.normalized_for_store.json`
- `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-23/validation_report.md`
- `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-23/store_verification.json`
- `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-23/agent-targeting-work-items/josh-ai.json`
- `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-23/agent-targeting-work-items/akasa.json`
- `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-23/agent-targeting-work-items/deepwatch.json`

## Verification Performed

- Parsed and scanned the patched JSON payloads and Agent Targeting work-item inputs.
- Static-scanned reviewed artifacts for prohibited social tags `@joshai` and `@akasahealth` and other explicit `@` tag patterns.
- Checked person-level LinkedIn fields and LinkedIn evidence handling in the patched JSON payloads.
- Verified `external_action_allowed` posture in the source, normalized, and per-company work-item JSON inputs.
- Read the correction report and original blocking review to compare each blocking finding against the patched artifacts.
- Spot-checked the public source URLs used by the patch for AKASA geography/current-source handling, Deepwatch geography/current CEO/founding/funding handling, and Josh.ai patent-page wording.

## Blocking Finding Re-check

### 1. AKASA geography/current-source wording — corrected with HOLD constraint

Original blocking issue: AKASA was classified as `Denver, CO (HQ)` and treated as passing Mountain West geography.

Patched status:
- `digest.md` now states AKASA is `South San Francisco, CA HQ; Denver hub/coworking presence only` and places it on HOLD for Mountain-West-specific queueing.
- `prospect_candidates.json`, normalized payload, and `agent-targeting-work-items/akasa.json` now use `South San Francisco, CA (HQ); Denver/Colorado hub/coworking presence only`.
- Outreach readiness is `hold_geography_needs_corroboration`; lead magnet tier is `hold_until_geo_review`; `external_action_allowed=false`.
- Source spot checks support the corrected framing: AKASA's careers page describes Bay Area/NYC/Denver hubs and co-working days; Built In SF describes South San Francisco headquarters plus Denver/NYC coworking hubs.

Reviewer conclusion: corrected. Constraint remains: AKASA should not be treated as a passed Denver/HQ or Mountain-West-specific named outreach prospect unless a later source-current review clears exactly how the Denver hub/coworking presence may be used.

### 2. Deepwatch geography/current-fact handling — corrected with HOLD/remove constraint

Original blocking issue: Deepwatch was classified as Denver/Mountain West and had stale/mismatched CEO/founding/funding evidence.

Patched status:
- `digest.md`, `prospect_candidates.json`, normalized payload, and `agent-targeting-work-items/deepwatch.json` now state `Tampa, FL per Crunchbase 2023; no current Denver/Mountain West nexus verified`.
- The packet removes Deepwatch from the Denver/Mountain West queue and sets outreach readiness to `hold_geography_current_source_correction_required`.
- Funding/founding wording is corrected to founded 2019 and `$256M total raised per Crunchbase News`; the 2023 $180M round is described as equity investments and strategic financing with no debt/equity breakdown.
- CEO evidence is split correctly: Crunchbase News names Charlie Thomas in the 2023 article; first-party Deepwatch 2024 source names John DiLullo CEO effective July 2, 2024 and based in Silicon Valley.

Reviewer conclusion: corrected. Constraint remains: Deepwatch should remain out of Mountain West queueing unless a later current reliable source supports a Colorado/Mountain West nexus.

### 3. No `@` tags in social drafts — corrected

Original blocking issue: digest social drafts included explicit LinkedIn tags `@joshai` and `@akasahealth`.

Patched status:
- Static scan of reviewed artifacts found zero explicit social/company `@` tags.
- `digest.md` now says social/LinkedIn draft candidates are untagged only, attorney-review-only, manual, and no-post.
- The remaining draft hooks at lines 97-100 are untagged internal drafting notes and expressly not approved for publication.

Reviewer conclusion: corrected.

### 4. LinkedIn evidence hygiene — corrected for internal staging

Original blocking issue: Josh.ai company LinkedIn was assigned to Tim Gill's person-level `linkedin_url`, and AKASA LinkedIn-only person evidence was too strong for named-recipient targeting.

Patched status:
- Person-level `linkedin_url` fields in the source packet, normalized payload, and per-company work-item JSON are blank for Tim Gill, Alex Capecelatro, Malinka Walaliyadde, Benjamin Beadle-Ryby, and John DiLullo.
- Josh.ai company LinkedIn remains only as company-level external-directory evidence, not a person/contact URL.
- Benjamin Beadle-Ryby remains medium confidence and is expressly subject to non-LinkedIn or manual human verification before named-recipient targeting.

Reviewer conclusion: corrected for internal staging. Constraint remains: do not use LinkedIn-only or unverified person evidence for recipient targeting without manual/human verification.

### 5. External-action and attorney-review posture — preserved

Patched status:
- `digest.md` header states `External action allowed: false` and `research_only / attorney_review_required / manual/no-post/no-send`.
- Source and normalized JSON payloads set `external_action_allowed=false` for all prospects.
- Normalized payload and per-company Agent Targeting inputs include `risk_level=attorney_review_required`, `suppression_status=consent_gap_no_auto_send`, and `conflicts_status=required_before_send`.
- `validation_report.md` and `correction_report_t_ae1d6444.md` repeat that local pending sync/work-item rows are not permission for HighLevel, Supabase, CRM, workflow, outreach, social/LinkedIn, Clio, public, or client/prospect-facing action.

Reviewer conclusion: preserved.

## Constraints / Required Next Action

1. Treat this PASS-with-constraints as internal readiness only for downstream draft/staging review.
2. Keep Josh.ai as the only supportable Denver/HQ prospect in this patched packet, still attorney-review-only and blocked from external action.
3. Keep AKASA on HOLD for Mountain-West-specific queueing until a later source-current review clears the Denver hub/coworking use.
4. Keep Deepwatch removed/on HOLD from Denver/Mountain West queueing unless a later current reliable source supports a Colorado/Mountain West nexus.
5. Do not perform HighLevel/Supabase/CRM/Clio mutation, workflow enrollment/activation/tagging, outreach, LinkedIn/social/ad/public/client-facing use, or attorney/prospect contact without exact Jeff approval plus attorney, conflicts, suppression, privacy/ethics, and source-current gates.

## Bottom Line

The specific blocking findings from `t_b86e59af` have been corrected in the patched digest, source/normalized packet, staged work-item inputs, and guardrail language. The packet may proceed only to internal downstream draft/staging review under the constraints above.
