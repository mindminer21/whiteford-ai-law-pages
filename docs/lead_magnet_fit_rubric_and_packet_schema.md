# Lead-Magnet Fit Rubric — Scoring, Packet Schema, Examples

Created: 2026-05-06
Task: t_549db261

This file is a supplemental reference for the nightly Qwen prospect research agent.
It refines the lead-magnet fit classification introduced in
`docs/nightly_qwen_prospect_research_prompt.md` (section "Lead-Magnet Fit Classification")
and the offer-lane definitions in `docs/plans/qwen_nightly_prospecting_agent_plan.md`
(section "1. Offer lanes and lead magnets").

Read before scoring or classifying any prospect. This file takes precedence over the prompt
where instructions conflict.

---

## 1. Scoring Model (Unified)

### 1.1 Primary Scoring Fields (per prospect, per lane)

Every prospect MUST be scored on all four lead-magnet lanes:

| Field | Range | Meaning |
|---|---|---|
| `lane_fit_score` | 1, 2, 3, or 4 | Match tier for that lane (1=low, 2=moderate, 3=high, 4=very_high). This is the ONLY lane-fit score for the prospect; do not use a separate 0-3 scale. |
| `fit_score` | 0-100 | Overall company fit (primary lane), mapped from `lane_fit_score` of the primary lane |
| `urgency_score` | 0-100 | How time-sensitive the prospect's situation is |
| `value_potential_score` | 0-100 | Revenue / engagement value if Whiteford converts this prospect |
| `evidence_confidence` | low, medium, medium_high, high | How well-sourced the prospect's facts are |
| `combined_priority_score` | 0-100 | Weighted priority for sequencing |
| `lead_magnet_consented` | true/false | Affirmative opt-in exists? Default false |

### 1.2 Lane-Fit Score Mapping (FIXED — replaces the conflicting mapping in the old prompt)

Use ONLY the 1-4 scale below. There is no 0 fit score. If a lane is completely irrelevant, score 1 and deprioritize.

| Score | Label | Classification | Action |
|---|---|---|---|
| 4 | very_high | Ideal, direct-match. Prospect is exactly who this lead magnet serves. | Prioritize this lane above all. Draft outreach tied to this lane. Consider as primary. |
| 3 | high | Strong candidate. Multiple public signals point here. | Suggest this lead magnet in outreach. Use as primary unless a 4 exists. |
| 2 | moderate | Possible fit, weaker signals. | Note as secondary lane only. Do not use as primary. |
| 1 | low | No strong alignment. | Classify for completeness; do not prioritize. |

**Tie-breaking:** If two lanes both score 3 or 4, pick the lane with the higher `urgency_score` as primary.

### 1.3 `fit_score` (0-100) from `lane_fit_score`

Map the primary lane's 1-4 score to fit_score 0-100:

| lane_fit_score | fit_score | fit_score range |
|---|---|---|
| 4 | 90 | 90-100 (clear direct match) |
| 3 | 77 | 75-89 (strong match) |
| 2 | 67 | 60-74 (plausible match) |
| 1 | 48 | 40-59 (weak match) |
| < 1 | 30 | 0-39 (not a fit / too little evidence) |

The fit_score range (not just the center point) SHOULD be narrowed when enough public evidence exists — i.e., score 92 instead of 90 if multiple strong signals back the fit, or score 75 instead of 89 if evidence is strong but not overwhelming.

### 1.4 `urgency_score` Determination

Assign urgency by these public, time-sensitive signals (count how many apply within range):

| Signal | +15 points | Notes |
|---|---|---|
| Recent funding (Crunchbase, pitchbook, press) | Yes | Recent = past 12 months |
| Acquisition / strategic partnership announcement | Yes | |
| Major product launch (blog, press, demo) | Yes | Past 6 months |
| Hiring surge (LinkedIn jobs, public postings) | Yes | 10+ roles in past 3 months |
| Regulatory deadline (Colorado AI Act, CUI, HIPAA, etc.) | Yes | Deadline is within 12 months |
| Public AI deployment or model release | Yes | Past 6 months |
| Founder exit interview / succession discussion | Yes | |
| Customer concentration risk (public dependency on 1-2 names) | Yes | |
| Legal/regulatory scrutiny or lawsuit | Yes | Public news, court filings |
| Security / data breach | Yes | Past 12 months |

Base urgency = 20. Each signal adds +15. Cap at 95.

### 1.5 `value_potential_score` Determination

| Company size signal | Base |
|---|---|
| Series C+ or revenue > $20M+ | 85 |
| Series B or revenue $5-20M | 70 |
| Series A or revenue $1-5M | 60 |
| Seed / pre-seed / bootstrapped < $1M | 45 |
| Unknown but growing (funding, hiring, enterprise sales) | 55 |
| Unknown and no growth signals | 30 |

Adjust by decision-maker access: +15 if direct business email and LinkedIn confirmed from official source (confidence >= 85).

### 1.6 `combined_priority_score` Formula

```
combined_priority_score = (fit_score * 0.40) + (urgency_score * 0.30) + (value_potential_score * 0.30)
```

Round to nearest integer. Cap at 100.

---

## 2. Lane-Fit Rubric Table (per-lane scoring factors)

For each lane, evaluate each of the six fit factors. The column shows what constitutes a 4-score (very_high) match for that lane. If the prospect doesn't hit very_high, drop the score according to the rubric below.

### Factor-to-score mapping per lane (same mapping for all lanes):

| Very-high (4-score) condition | High (3) condition | Moderate (2) condition | Low (1) condition |
|---|---|---|---|
| Meets all key signals for the lane | 3 out of 4+ key signals met | 1-2 key signals meet | No key signals; only tangential overlap |

### Lane A: AI Patent Strategy (lane_fit_score for "AI Patent")

| Fit factor | Score 4 (very_high) criteria | Score 3 (high) criteria | Score 2 (moderate) criteria | Score 1 (low) criteria |
|---|---|---|---|---|
| Technical depth / IP moat | Proprietary AI/ML system, patent filings (USPTO/app), open-source dependency risk, invention documentation gaps | Technical product; some patent history or prior art gaps | Tech company; no clear IP angle | Not relevant |
| Innovation velocity | Regular product launches, R&D spending, university spinout, technical hiring, SBIR awards | Occasional new products or technical announcements | Stable product line | No technical activity visible |
| AI-assisted R&D exposure | AI used in R&D, design, prototyping, testing | Partial AI in workflow | No AI R&D visible | Non-technical |

### Lane B: AI Compliance Readiness (lane_fit_score for "AI Compliance")

| Fit factor | Score 4 (very_high) criteria | Score 3 (high) criteria | Score 2 (moderate) criteria | Score 1 (low) criteria |
|---|---|---|---|---|
| AI deployment scale | Consequential-decision AI (hiring, lending, insurance, healthcare, risk scoring, pricing, customer-facing) | Any AI with data governance implications | Uses AI tools (e.g., ChatGPT) internally | No AI visible |
| Governance exposure | Colorado AI Act, ADMT, privacy legislation, enterprise vendor AI risk, data privacy of outputs | Some regulatory exposure | Regulatory awareness, but low deployment | No exposure |
| Data sensitivity | Handles PII, protected health, financial, or consumer profiles | Some structured data | Limited personal data | No personal data |

### Lane C: Tech Company OGC Launchpad (lane_fit_score for "Tech GC")

| Fit factor | Score 4 (very_high) criteria | Score 3 (high) criteria | Score 2 (moderate) criteria | Score 1 (low) criteria |
|---|---|---|---|---|
| Growth-stage legal complexity | Contracts, hiring, IP ownership, privacy, financing, AI use, vendor/customer terms all active | 2-3 of these categories visible | 1 category visible | None |
| Outside counsel need | No obvious GC; legal scattered across founder, COO, CFO, existing outside counsel | Lean legal team | Some legal ops present | Clear full-time GC already in place |
| Milestone pressure | Upcoming product, hiring, fundraising, enterprise sales, or expansion | One active pressure point | Mild pressure signals | No pressure signals |

### Lane D: Founder M&A Readiness (lane_fit_score for "M&A Readiness")

| Fit factor | Score 4 (very_high) criteria | Score 3 (high) criteria | Score 2 (moderate) criteria | Score 1 (low) criteria |
|---|---|---|---|---|
| Transaction proximity | Exit interviews, founder succession, PE-backed aging, buyer ecosystem signals, consolidation wave | Funding age > 5 years, market pressure growing | Some financial maturity | Very early stage |
| Diligence posture | Corporate records gaps, IP ownership messy, customer contracts with assignment issues, cap table complexity | Some diligence concerns visible | Records seem adequate | Excellent diligence posture |
| Customer / revenue concentration | >40% revenue from 1-2 customers, key customer at risk, supply dependency | Some concentration risk | Well diversified | N/A |

---

## 3. Agent Targeting Packet Schema

Every high-fit prospect (combined_priority_score >= 70, or combined_priority_score >= 55 with urgency >= 75) MUST have a targeting packet.

**Packet structure (JSON schema for staging records):**

```json
{
  "prospect_packet": {
    "created_at": "2026-05-06T03:00:00Z",
    "prospect_id": "<Growth OS prospect id or domain-derived slug>",
    "company": {
      "name": "string",
      "domain": "string",
      "website": "URL",
      "location_hq": "string (city, state/region)",
      "industry_raw": "string (from public source)",
      "size_signal": "string (e.g., 'Series B, ~80 employees')",
      "maturity_signal": "string (e.g., '3 years post-seed')",
      "product_service_summary": "string (2-4 sentences max)"
    },
    "lane_classification": {
      "primary_lane": "ai-patent | ai-compliance | tech-gc | ma-readiness",
      "primary_lane_score": 1-4,
      "primary_fit_score": 0-100,
      "secondary_lanes": [
        {
          "lane": "ai-patent | ai-compliance | tech-gc | ma-readiness",
          "score": 1-4
        }
      ],
      "lead_magnet_fit_lane": "ai-patent | ai-compliance | tech-gc | ma-readiness",
      "lead_magnet_fit_tier": "low | moderate | high | very_high",
      "lead_magnet_consented": false,
      "branch_signals": {
        "ai_compliance": boolean,
        "ai_patent": boolean,
        "tech_gc": boolean,
        "ma_readiness": boolean
      }
    },
    "scores": {
      "fit_score": 0-100,
      "urgency_score": 0-100,
      "value_potential_score": 0-100,
      "combined_priority_score": 0-100,
      "contact_confidence": 0-100
    },
    "contacts": [
      {
        "name": "string",
        "title": "string",
        "role_category": "founder | ceo | cto | coo | gc | cfo | product_leader | engineer | hr_leader | other",
        "email": "string or null",
        "email_confidence": 0-100,
        "linkedin_url": "URL or null",
        "phone": "string or null (public/lawful only)",
        "source_url": "URL (official profile or company page)",
        "permission_basis": "public-source research; attorney review required before outreach"
      }
    ],
    "evidence": [
      {
        "url": "URL",
        "accessed_date": "YYYY-MM-DD",
        "source_type": "company_website | press_release | job_posting | patent_database | news | sec_filing | investor_page | linkedin_profile | other_public",
        "supports_fact": "string (1 sentence: what this URL proves)",
        "confident": true,
        "safe_for_outreach": true
      }
    ],
    "outreach": {
      "status": "research_only | draft_ready | needs_attorney_review | suppress",
      "suggested_lead_magnet": "string (full name)",
      "suggested_lead_magnet_route": "URL path",
      "outreach_hypothesis": "string (2-3 sentences tying public fact -> legal gap -> lead magnet value)",
      "draft_ready": boolean (true if fit >= 75 and 2+ safe public facts exist),
      "outreach_vector_options": [
        "educational_resource_note | linkedin_awareness_post_draft | direct_email_draft | partner_referral | event_webinar_invite | watchlist"
      ]
    },
    "consent_gating": {
      "ops_no_auto_send": true,
      "consent_basis": "no_email_opt_in",
      "approval_status": "no-auto-send",
      "workflow_trigger_tags": [],
      "suppression_tags": ["newsletter:not-consented"]
    },
    "linkedin_awareness_post_draft": {
      "draft_text": "string (for Jeff review only)",
      "company_tag_candidate": "string (@Handle if verified)",
      "key_contact_tag_candidate": "string or null",
      "hook_source_url": "URL (public fact used)",
      "lead_magnet_route": "URL path",
      "lane": "ai-patent | ai-compliance | tech-gc | ma-readiness",
      "status": "attorney_review_only | drafted_for_review"
    },
    "suppression": {
      "conflict_of_interest": boolean,
      "existing_representation": boolean,
      "preference_match": "string or null (e.g., 'already a client of Whiteford')",
      "consent_gap": boolean (always true for researched prospects),
      "suppress_reason": "string or null"
    },
    "next_action": {
      "recommended": "lead_magnet_invite | attorney_review | watchlist | suppress | schedule_cal",
      "notes": "string (optional context for Jeff)"
    }
  }
}
```

### Minimum Evidence Requirements (per prospect)

| Score tier | Minimum evidence rows | Minimum URL types |
|---|---|---|
| very_high (4) | 3+ evidence rows from 3+ source types | 1x company, 1x press/news, 1x patent/SEC/filing/profile |
| high (3) | 2+ evidence rows from 2+ source types | 1x company + 1x public source |
| moderate (2) | 1+ evidence row | 1x public URL (company site or profile OK) |
| low (1) | 0 rows required (for completeness only) | N/A |

---

## 4. Suppression / Conflict / Consent Rules

### 4.1 Mandatory Suppression (suppress all outreach)

A prospect MUST be suppressed (status = "suppress") if ANY of these apply:

1. **Conflict of interest** — Whiteford/Schell IP currently represents or has recently represented the prospect or a key party in their counterparty position.
2. **Existing engagement** — Prospect is already a client of Whiteford/Schell IP (check Growth OS `suppression_checks` and historical opportunities).
3. **Adverse-party match** — Prospect is a known opposing party in active Whiteford/Schell IP litigation or transaction.
4. **Data reliability** — contact confidence < 40 with no public source confirming the decision-maker's current role.
5. **Ethics concern** — the public fact used as a hook could imply a legal violation by the prospect in a way that raises advertising ethics concerns (e.g., implying regulatory non-compliance).
6. **Suppression tag** — the company or contact already carries `outreach:do-not-send`, `ops:no-auto-send` (for active contact records), `ops:blocked`, or equivalent in Growth OS / HighHistory.

### 4.2 Consent Gating Rules (no exceptions)

1. **Researched/imported prospects NEVER get workflow trigger tags.** Do NOT add `workflow:ai-patent-strategy`, `workflow:ai-compliance-readiness`, `workflow:tech-gc-launchpad`, or `workflow:ma-readiness` to any researched, imported, enriched, or manually added record.

2. **Lead magnet opt-in is the ONLY path to workflow triggers.** A workflow trigger tag may be applied ONLY when a prospect has affirmatively checked the opt-in box on the matching lead magnet's app or website form.

3. **Non-consented prospects get suppression tags, not nurture tags.** Record: `ops:no-auto-send`, `newsletter:not-consented`, `consent_basis = no_email_opt_in`, `approval_status = no-auto-send`. No workflow tag.

4. **Branch signals are NOT consent.** If a prospect shows signals for multiple lanes, store as `branch_signals` in notes/custom fields. Branch signals MUST NOT produce workflow trigger tags.

5. **Jeff's exact approval overrides only under explicit conditions.** Written approval must name: prospect identifier, exact lane, exact workflow tag, rationale, and scope limit. Blanket lane-level approvals without named prospects do NOT count.

6. **Always retain `ops:no-auto-send`** on every researched/imported prospect. Remove only after opt-in evidence exists AND Jeff confirms the workflow is ready for that lane.

### 4.3 Confidence Gating

| Confidence | Action |
|---|---|
| >= 85 | Full outreach draft (needs attorney review) |
| 70-84 | Research-only stage; draft if fit >= 75 |
| 60-69 | Watchlist; enrich if possible |
| 40-59 | Do not use for outreach. Note contact as "inferred; needs verification." |
| < 40 | Discard from outreach consideration. |

---

## 5. Lane Examples (attorney-review-only, non-sendable)

These are example classifications. They are NOT real companies — they illustrate the rubric in action.

### Example 1: AI Patent — very_high fit

**Company (fictional):** "RoboForge Inc."
**Signal:** AI/ML-powered robotic welding systems for manufacturing; recent product launch at AWE 2026; CTO (Dr. Maya Lin) published a technical paper on computer vision for defect detection; 2 patent applications filed (USPTO); Seed+ funding from Y Combinator.

**Scoring:**
- Primary lane: ai-patent (4 — very_high)
  - Technical depth: proprietary ML system, patent filings, invention documentation = score 4
  - Innovation velocity: Y Combinator, AWE launch, technical paper = score 4
  - AI-assisted R&D: computer vision for defect detection = score 4
- Secondary lane: ma-readiness (2 — moderate)
  - Early stage, no exit signals; IP ownership may affect diligence later
- Tertiary lane: tech-gc (2 — moderate)
  - Growth signals, but not enough legal complexity yet
- `fit_score` = 92 (very_high mapped)
- `urgency_score` = 50 (recent funding + product launch = 2 signals)
- `value_potential_score` = 55 (seed stage, technical founding team likely values IP protection)
- `combined_priority_score` = 92*0.4 + 50*0.3 + 55*0.3 = 36.8 + 15 + 16.5 = 68
- `evidence_confidence` = high (USPTO filings, public paper, Y Combinator profile)
- `lead_magnet_consented` = false
- `ops:no-auto-send` = true

**Outreach hypothesis:** "RoboForge's published technical paper and recent patent filings indicate active invention documentation, but there's no visible public guidance on AI-assisted R&D attribution — a common risk when prototype disclosures precede formal filing strategies."

**Suggested lead magnet:** AI Patent Strategy Scorecard (/ai-patent-strategy-scorecard)
**Suggested next action:** Lead magnet + attorney review of draft outreach.

### Example 2: AI Compliance — very_high fit

**Company (fictional):** "MedScreen Analytics"
**Signal:** Healthcare SaaS company deploying AI diagnostic models for radiology; hiring "Head of Responsible AI" and "AI Governance Lead"; public privacy page with limited governance content; Colorado-based SaaS with enterprise hospital customers; Colorado AI Act exposure.

**Scoring:**
- Primary lane: ai-compliance (4 — very_high)
  - AI deployment scale: consequential healthcare AI, diagnostic decisions = score 4
  - Governance exposure: Colorado AI Act exposure, enterprise hospital customers, but limited visible governance = score 4
  - Data sensitivity: PII + protected health information = score 4
- Secondary lane: tech-gc (3 — high)
  - Growth-stage SaaS with enterprise customers, hiring new governance roles = score 3
- `fit_score` = 91
- `urgency_score` = 65 (Colorado AI Act deadline + hiring surge + enterprise exposure)
- `value_potential_score` = 70 (SaaS with enterprise + health data = high potential)
- `combined_priority_score` = 91*0.4 + 65*0.3 + 70*0.3 = 36.4 + 19.5 + 21 = 77
- `evidence_confidence` = medium_high (public jobs + privacy page = partial verification)
- `lead_magnet_consented` = false
- `ops:no-auto-send` = true

**Outreach hypothesis:** "MedScreen's public hiring of an AI governance lead and deployment of diagnostic AI in healthcare suggests growing compliance awareness, but no public governance framework is visible — a gap that could accelerate as Colorado AI Act implementation dates approach."

**Suggested lead magnet:** AI Compliance Gameplan Builder (/ai-compliance-gameplan)
**Suggested next action:** Lead magnet + attorney review.

### Example 3: Tech GC — high fit

**Company (fictional):** "LogiStack Solutions"
**Signal:** Series B SaaS company (logistics tech, $8M ARR); ~45 employees, no full-time GC (legal handled by founder + outside counsel on-demand); recent enterprise customer wins from Fortune 500; new Colorado office; hiring 12 roles in 3 months.

**Scoring:**
- Primary lane: tech-gc (3 — high)
  - Growth-stage legal complexity: contracts (enterprise SOWs), hiring surge, new office = score 3
  - Outside counsel need: founder + outside counsel, no GC = score 4
  - Milestone pressure: enterprise sales, new office, hiring = score 3
- Secondary lane: ai-compliance (1 — low)
  - Some AI use in logistics (likely low governance risk)
- `fit_score` = 77
- `urgency_score` = 50 (hiring surge + new office = 2 signals)
- `value_potential_score` = 70 (Series B, $8M ARR, Colorado expansion)
- `combined_priority_score` = 77*0.4 + 50*0.3 + 70*0.3 = 30.8 + 15 + 21 = 67
- `evidence_confidence` = high (Crunchbase/SimilarWeb + official website + public jobs)
- `lead_magnet_consented` = false
- `ops:no-auto-send` = true

**Outreach hypothesis:** "LogiStack's rapid growth (Series B, enterprise wins, Colorado expansion) has likely created legal complexity across contracts, hiring, and commercial risk — but no full-time GC is visible, suggesting a legal operating review may help before the next enterprise customer or funding round."

**Suggested lead magnet:** Tech Company Legal Health Checklist (/colorado-tech-general-counsel)
**Suggested next action:** Lead magnet invite + attorney review.

### Example 4: M&A Readiness — high fit

**Company (fictional):** "GreenVault Technologies"
**Signal:** 7-year old VC-backed data storage startup, Series C; PE investor (Bain Capital) aging fund; founder has given exit interviews in press; customer concentration: 2 customers represent 52% of revenue; corporate records appear scattered (LinkedIn confirms no CFO since 2022; COO acting).

**Scoring:**
- Primary lane: ma-readiness (3 — high)
  - Transaction proximity: aging PE fund, founder exit interviews = score 4
  - Diligence posture: no CFO since 2022, acting COO, likely messy records = score 3
  - Customer concentration: 52% from 2 customers = score 3
- Secondary lane: tech-gc (2 — moderate)
  - Governance gaps visible, but M&A is the stronger signal
- `fit_score` = 80
- `urgency_score` = 50 (founder exit + aging fund + dilution = 3 signals)
- `value_potential_score` = 85 (Series C, established product, PE backing = high value)
- `combined_priority_score` = 80*0.4 + 50*0.3 + 85*0.3 = 32 + 15 + 25.5 = 73
- `evidence_confidence` = medium_high (press articles, LinkedIn + Crunchbase)
- `lead_magnet_consented` = false
- `ops:no-auto-send` = true

**Outreach hypothesis:** "GreenVault's aging PE fund and founder exit conversations suggest potential transaction activity, but corporate record gaps and customer concentration could become material diligence friction — a Founder M&A Readiness review could surface and address these before buyer questions arise."

**Suggested lead magnet:** Founder M&A Readiness Checklist (/colorado-startup-ma-lawyer)
**Suggested next action:** Lead magnet invite + attorney review.

---

## 6. Edge Cases

### Edge Case 1: Prospect fits two lanes at score 4

**Example:** AI robotics company with both proprietary technology (AI Patent 4) and enterprise customer safety requirements triggering AI compliance scrutiny (AI Compliance 4).

**Resolution:** Use `urgency_score` as tiebreaker. If both are ~equal, default to the LANE whose lead magnet is broader (Tech GC > AI Compliance > AI Patent > M&A). Note the secondary lane prominently in outreach.

### Edge Case 2: Early-stage startup with no public evidence

**Decision:** Score every lane at 1 (low) for fit. Combined_priority_score will likely fall below 70. Mark `research_only` — too little evidence to justify an outreach draft. Enrich via additional public sources (pitchbook, Crunchbase, angellist) if available.

**Edge Case 3: Founder owns 2 companies in different lanes**

**Resolution:** Research each company separately. The founder's contacts may overlap; deduplicate by domain. Track both lanes in the same contact record's `branch_signals`.

### Edge Case 4: Large enterprise with compliance visible

**Decision:** Score AI Compliance as 2 or 1 (low/moderate) if AI deployment is visible but governance is already mature. The decision-maker signal is hard to reach at this scale — mark `suppress` for direct outreach unless Jeff approves a high-level relationship path.

### Edge Case 5: Company appears to be a client already

**Decision:** Check Growth OS `suppression_checks` for existing client records. Check HighLevel search for existing contacts. If found, mark as `existing_engagement` and `suppress` with reason "Already Whiteford client."

### Edge Case 6: AI Patent prospect with no technical co-founder or CTO listed

**Decision:** Still research if the company builds AI systems. Use founder/CEO as the alternative decision-maker. Score decision-maker access at 70-74 (credible public source but no direct CTO contact) rather than 90+.

---

## 7. Quick-Reference: What to Do Before Drafting Outreach

| Step | Action | Gate |
|---|---|---|
| 1 | Verify no conflict / existing client | `suppression_checks` |
| 2 | Score all 4 lanes | Rubric above |
| 3 | Pick primary lane by lane_fit_score, break ties with `urgency_score` | Highest score |
| 4 | Calculate `combined_priority_score` | Formula above |
| 5 | Collect evidence (3+ rows for 4-score, 2+ for 3-score) | Source rules |
| 6 | Check `lead_magnet_consented` | Default false |
| 7 | Set `ops:no-auto-send` | Always for researched prospects |
| 8 | If combined_priority >= 70 AND fit >= 75 AND 2+ safe public facts: draft READY | Proceed to outreach draft |
| 9 | If contact_confidence < 60: research_only | Do not draft |
| 10 | If suppression condition met: suppress | Note reason |

---

## 8. File Inventory

| File | Purpose |
|---|---|
| `docs/lead_magnet_fit_rubric_and_packet_schema.md` | This file — scoring rubric, packet schema, examples |
| `docs/nightly_qwen_prospect_research_prompt.md` | Core operational prompt (references this file) |
| `docs/plans/qwen_nightly_prospecting_agent_plan.md` | Implementation plan (lanes A-D detail) |
| `docs/lead_magnet_opt_in_and_app_strategy.md` | Opt-in gating, four app concepts, email sequences |
| `docs/tech_company_legal_health_checklist_app_spec.md` | Tech GC app spec (questions, scoring, payload) |
| `docs/targeted_linkedin_awareness_post_strategy.md` | LinkedIn post drafting guidance |
| `docs/lead_api_opt_in_gating_audit_t_f4abf859.md` | API audit of opt-in gating |

All six files form the complete prospecting reference set for the nightly Qwen agent. This supplemental file refines only the scoring and classification layer; the other files remain unchanged.
