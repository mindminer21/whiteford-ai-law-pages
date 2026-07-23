# Qwen Nightly Prospect Research Agent Implementation Plan

> For Hermes: use this plan to configure a locally running Qwen Hermes profile that performs overnight public-source prospect research for Whiteford Mountain West / Schell IP, stages prospective leads in Growth OS / Supabase and/or HighLevel only under the approval gates below, and prepares customized lead-magnet outreach vectors for attorney review.

Goal: Run a local-Qwen Hermes agent every night to identify high-potential companies and decision makers for four productized Whiteford/Schell IP offers, enrich them from public sources, score their likely fit, draft value-first outreach vectors tied to the correct lead magnet, and stage the data for human-approved CRM/Supabase sync.

Architecture: The nightly agent should be local-model-first and approval-gated. It should research public sources, write structured findings into the local Growth OS SQLite database, optionally stage Supabase/GHL payloads as pending sync records, and produce a daily digest. It should not send messages, activate workflows, auto-enroll contacts, scrape behind logins, or create live GHL contacts/opportunities until Jeff approves the exact write policy.

Current 2026-05-06 operating decision: pause net-new prospect expansion until the consent-gated lead magnets and draft/off HighLevel workflow gates are cleaner. During the pause, use this plan to improve the research prompt, scoring rubric, lane matching, source requirements, and Agent Targeting packet requirements. Do not discover new companies unless Jeff explicitly reopens expansion.

When expansion resumes, the lead magnet is the center of the classification model. The agent should answer: "Which first-party opt-in tool would this company genuinely benefit from?" before drafting any outreach vector. Re-searched/imported prospects must remain outside nurture; `workflow:*` tags are reserved for affirmative lead-magnet opt-ins or exact current Jeff approval.

Every future Agent Targeting packet should also include at least one draft LinkedIn awareness post using the pattern in `docs/targeted_linkedin_awareness_post_strategy.md`. The post should be written for Jeff's profile, use a public company fact, include a company tag candidate and optional key-contact tag candidate, teach a broader point relevant to the selected lead magnet, and include the matching lead-magnet URL. It must remain attorney-review-only / draft-only: no posting, tagging, commenting, DMs, connection requests, scheduling, or LinkedIn automation without exact current approval.

Tech stack: Hermes profile `qwen-local`, Ollama model `qwen3.6:35b-a3b`, Hermes cron or launchd, Growth OS SQLite at `/Users/jeff/.openclaw/projects/mountain-west-growth-os/data/growth-os.sqlite`, Whiteford app repo at `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages`, HighLevel location `tm68WWMrcAa3TqQbEAMa`, existing HighLevel scripts under `scripts/`, existing campaign/ops docs under `docs/`.

---

## 0. Existing discovered state

- Local Ollama model available: `qwen3.6:35b-a3b`.
- Hermes profile available: `qwen-local` with model `qwen3.6:35b-a3b`, provider `custom`, base URL `http://localhost:11434/v1`.
- Existing HighLevel operations profile: `highlevel-ops`.
- Existing HighLevel campaign profile: `highlevel-campaign`.
- HighLevel location: `tm68WWMrcAa3TqQbEAMa`.
- Growth OS SQLite database: `/Users/jeff/.openclaw/projects/mountain-west-growth-os/data/growth-os.sqlite`.
- Growth OS has tables already suitable for this workflow: `prospects`, `contacts`, `opportunities`, `source_evidence`, `outreach_drafts`, `approval_items`, `crm_sync_records`, `crm_sync_batches`, `suppression_checks`, `duplicate_candidates`, `send_authorization_rules`, `execution_authorizations`, and `supabase_sync_log`.
- Existing HighLevel campaign tags/custom fields are documented in `docs/highlevel_campaign_implementation_plan.md`.
- Existing HighLevel ops tags/custom fields are documented in `docs/highlevel_ops_execution_blueprint.md`.
- Existing safety rule: public-source research and internal drafts are allowed; external sends, workflow activation, LinkedIn/social action, live CRM mutation, Clio writes, paid ads, and public publishing require Jeff approval.

---

## 1. Offer lanes and lead magnets

The nightly agent should classify each prospect into one primary lane and optionally secondary lanes.

### Lane A: Productized AI patent services

Productized service: AI Patent Strategy Sprint.
Lead magnet: AI Patent Strategy Scorecard.
Route: `/ai-patent-strategy-scorecard`.
HighLevel tags:
- `workflow:ai-patent-strategy`
- `leadmagnet:ai-patent-scorecard`
- `interest:ai-patent-law`

Ideal prospect signals:
- Company builds AI/ML-enabled software, robotics, medtech, data platforms, computer vision, NLP, autonomous systems, cybersecurity AI, fintech AI, or scientific/engineering AI.
- Public product or demo suggests a technical improvement, model pipeline, data architecture, sensor integration, or system-level invention.
- Recent product launch, funding, patent filings, technical hiring, university spinout, SBIR/STTR award, accelerator graduation, or strategic partnership.
- Founder/CTO/product leader is visibly technical and likely making invention-disclosure decisions.
- Company lacks visible IP strategy content or has signs of public disclosure before filings.

Priority decision makers:
- Founder / CEO
- CTO
- Chief Product Officer / Head of Product
- VP Engineering
- Inventor / technical cofounder

Readiness hook:
- “Before AI-assisted R&D becomes public, document human contribution, ownership, trade-secret controls, and the claim strategy options.”

Suggested initial value asset:
- Invite to complete the AI Patent Strategy Scorecard.
- Provide a short “AI invention documentation checklist” angle in drafted outreach.

### Lane B: Productized AI compliance / AI law services

Productized service: AI Compliance Readiness Sprint / AI Governance Gameplan.
Lead magnet: AI Compliance Gameplan Builder.
Routes:
- `/ai-compliance-gameplan`
- `/colorado-ai-compliance-lawyer`
HighLevel tags:
- `workflow:ai-compliance-readiness`
- `leadmagnet:ai-compliance-gameplan`
- `interest:ai-compliance`

Ideal prospect signals:
- Company deploys AI in customer-facing decisions, hiring, HR, lending, insurance, healthcare, education, housing, fraud/risk scoring, pricing, consumer recommendations, marketing personalization, or workflow automation.
- Colorado, Mountain West, or national company likely affected by Colorado AI Act / ADMT / privacy / employment / vendor risk issues.
- Public job postings mention AI governance, privacy, compliance, risk, model evaluation, responsible AI, data governance, GRC, legal operations, procurement, vendor management, or security questionnaires.
- Company advertises AI features but has limited visible governance disclosures.
- Company uses third-party AI vendors in regulated or sensitive workflows.

Priority decision makers:
- CEO / COO
- General Counsel / legal lead
- Head of Risk / Compliance
- Chief People Officer / HR leader
- Product leader
- Security / privacy leader

Readiness hook:
- “Turn scattered AI use into a defensible inventory, vendor-review process, owner map, and 30/60/90-day governance plan.”

Suggested initial value asset:
- Invite to complete the AI Compliance Gameplan Builder.
- Provide a tailored “AI use-case inventory and vendor-risk readiness” angle.

### Lane C: Productized tech outside general counsel services

Productized service: Tech Company OGC Launchpad.
Lead magnet: Tech Company Legal Health Checklist / legal operating review.
Route: `/colorado-tech-general-counsel`.
HighLevel tags:
- `workflow:tech-gc-launchpad`
- `leadmagnet:tech-gc-checklist`
- `interest:tech-ogc`

Ideal prospect signals:
- Growth-stage technology, SaaS, hardware, AI, data, cloud, fintech, healthtech, clean-tech, or manufacturing-tech company.
- No obvious full-time GC; legal needs appear distributed across founder, COO, CFO, outside counsel, or ops.
- Recent funding, new enterprise customers, hiring growth, expansion, procurement complexity, privacy/security needs, channel partnerships, licensing, contract volume, or regulatory exposure.
- Legal risk spans multiple categories: contracts, employment, privacy, IP ownership, commercial risk, fundraising, governance, AI use, vendor/customer terms.

Priority decision makers:
- Founder / CEO
- COO
- CFO
- Head of Operations
- GC if lean legal team exists

Readiness hook:
- “Create a legal operating map that matches the next business milestone: hiring, fundraising, enterprise sales, product launch, or acquisition preparation.”

Suggested initial value asset:
- Invite to use the Tech Company Legal Health Checklist.
- Provide an issue-inventory angle tied to their public milestone.

### Lane D: Productized M&A evaluation services

Productized service: Founder M&A Readiness Review.
Lead magnet: Founder M&A Readiness Checklist.
Route: `/colorado-startup-ma-lawyer`.
HighLevel tags:
- `workflow:ma-readiness`
- `leadmagnet:ma-readiness-checklist`
- `interest:ma-readiness`

Ideal prospect signals:
- Founder-owned, VC-backed, PE-backed, or bootstrapped tech company likely approaching strategic sale, recap, acquisition, or diligence event.
- Signals include growth, funding age, strategic partnerships, consolidation in sector, founder exit interviews, buyer ecosystem, acquisitions by competitors, revenue maturity, or investor pressure.
- Public signs of diligence-sensitive assets: IP, AI/data products, customer contracts, assignment issues, privacy/security posture, employment classification, open-source software, cap table/history.

Priority decision makers:
- Founder / CEO
- CFO
- COO
- Head of Corporate Development
- Board/investor contact when public and appropriate

Readiness hook:
- “Find and fix non-financial diligence friction before a buyer asks for it.”

Suggested initial value asset:
- Invite to use the Founder M&A Readiness Checklist.
- Provide a tailored “diligence cleanup map” angle.

---

## 2. Prospect scoring criteria

The agent should assign separate scores and a combined priority score. Use transparent evidence; do not invent facts.

### Fit score, 0-100

Base fit by lane:
- 90-100: Clear direct match, public evidence strongly supports need and decision maker relevance.
- 75-89: Strong match with multiple public signals.
- 60-74: Plausible match with one or two useful signals.
- 40-59: Weak but possible match; needs more research.
- 0-39: Not a fit or too little evidence.

### Urgency score, 0-100

Urgency indicators:
- Funding, acquisition, product launch, major customer announcement, hiring surge, regulatory deadline, public AI deployment, new market entry, M&A activity, partnership, lawsuit/regulatory scrutiny, security/privacy event, or hiring for compliance/legal/security roles.

### Value potential score, 0-100

Estimate based on:
- Company size and maturity.
- Complexity of legal need.
- Recurring counsel potential.
- Patent portfolio/IP potential.
- Compliance exposure.
- M&A/diligence likelihood.
- Ability to pay for productized legal services.

### Contact confidence score, 0-100

Score decision-maker record quality:
- 90-100: Official company bio or official profile with current role and direct public contact info.
- 75-89: Official role source plus credible LinkedIn/profile URL.
- 60-74: Credible public source but no direct contact channel.
- 40-59: Inferred contact; needs verification.
- 0-39: Do not use.

### Outreach readiness status

- `research_only`: useful prospect but no safe outreach draft yet.
- `draft_ready`: public evidence supports a tailored educational draft.
- `needs_attorney_review`: default for all drafted outreach.
- `suppress`: do not contact because of conflicts, bad fit, existing suppression, unreliable data, or legal/ethics concern.

---

## 3. Approved source rules

Allowed sources:
- Company website and leadership/team pages.
- Company blog/news/press releases.
- Public job postings.
- SEC/state filings and public government sources.
- Public patent databases and company-assignee patent searches.
- Public LinkedIn profile URLs found through search, without scraping behind login.
- Investor portfolio pages and accelerator/company profile pages.
- News articles and credible trade publications.
- Public AI/product documentation, terms, privacy notices, and security pages.

Disallowed without later approval:
- Scraping behind logins.
- Sending connection requests or messages.
- Scraping LinkedIn content in a way that violates platform terms.
- Buying lead lists.
- Using private/confidential data.
- Enriching with sensitive personal data.
- Contacting anyone directly.

Evidence rule:
- Every material prospect/contact fact must have a `source_evidence` row with URL, accessed date, source type, supported fact, confidence, and whether the fact is safe for outreach.

---

## 4. Data write policy and required lead depth

### Minimum lead/contact data standard

The system should prefer first-party lead-magnet/landing-page input when a prospect voluntarily supplies it. If first-party input is unavailable or incomplete, the local research agent should attempt public-source enrichment and, once separately configured/approved, Apollo.io enrichment.

Minimum target fields for every qualified lead:

Company-level:
- company name
- domain and website URL
- headquarters/location and Mountain West relevance
- industry/category
- company size or maturity signal when available
- product/service description
- AI/IP/compliance/GC/M&A relevance signals
- source URLs for material facts
- primary offer lane and secondary lanes
- recommended lead magnet
- recommended productized next step
- fit, urgency, value-potential, and confidence scores
- suggested next action: lead magnet invite, Cal.com appointment CTA, educational resource, watchlist, suppress, or attorney review

Key-person level:
- name
- title
- role category
- email, preferably business email
- LinkedIn URL
- phone number when lawfully/publicly available or voluntarily supplied
- source URL for each material contact field
- confidence score
- permission/consent basis
- outreach hypothesis and personalized content angle

Contact-path data:
- recommended outreach vector: email, LinkedIn profile review, referral path, event/webinar invite, lead magnet form, Cal.com appointment CTA, or no-outreach/watchlist
- whether the lead should be directed to complete a readiness lead magnet first or, if already high-intent, to schedule via Cal.com
- Cal.com/appointment routing field once Jeff confirms the preferred scheduling URL
- message/intake path if the lead contacts Jeff through a form or direct message

Apollo.io enrichment rule:
- Apollo.io may be used as an enrichment connector after credentials and terms-approved access are configured.
- Apollo should be treated as enrichment, not outreach authorization.
- Apollo-derived contact data should be marked with `source_type='apollo_enrichment'`, source metadata, confidence, and permission basis.
- Do not use Apollo to send email sequences or trigger outreach unless a separate approval authorizes the exact action.

### Phase 1 default: local Growth OS staging only

The nightly agent may write to local Growth OS SQLite:
- `prospects`
- `contacts`
- `opportunities`
- `source_evidence`
- `outreach_drafts`
- `approval_items`
- `crm_sync_records` with `sync_status='pending'` and `eligibility_status='not_checked'`
- `duplicate_candidates`
- `suppression_checks`

No live GHL or Supabase writes in Phase 1 unless Jeff approves a later task containing exact tables, fields, payload rules, and rollback procedure.

### Phase 2: Supabase staging sync

Only after approval, sync non-sensitive staged records to Supabase staging tables. Recommended approach:
- Use service role only from a locked-down script, not from LLM prompt text.
- Sync company-level prospect records first.
- Sync contacts only when contact confidence is >= 75 and permission basis is documented.
- Keep outreach copy as draft/approval items, not sent messages.
- Log every sync in `supabase_sync_log`.

### Phase 3: HighLevel draft/off CRM sync

Only after approval, create or update HighLevel records with safe tags and custom fields:
- Always apply `ops:no-auto-send`, `ops:approval-required`, `workflow:draft-only`, and `outreach:do-not-send` unless Jeff expressly approves active outreach.
- Do not add `workflow:*` trigger tags to live contacts unless the workflow is confirmed off/manual-start or Jeff approves enrollment.
- Prefer note/task/approval packet creation over active campaign enrollment.
- Log every GHL payload under `docs/nightly-lead-research/runs/<date>/ghl_payloads/` before sending.

---

## 5. Nightly agent operating loop

Each nightly run should perform these steps:

1. Load context:
   - `docs/highlevel_campaign_implementation_plan.md`
   - `docs/highlevel_ops_execution_blueprint.md`
   - `docs/highlevel_ops_research_synthesis.md`
   - `highlevel_ai_authority_funnel_map.md`
   - Growth OS SQLite schema and recent records
   - Business-development principles from the `business-development-rag` skill

2. Select search themes for the night:
   - AI patent prospects
   - AI compliance prospects
   - tech OGC prospects
   - M&A readiness prospects
   - optionally one geographic / industry micro-segment per run

3. Generate public-source search queries, for example:
   - `Colorado AI startup funding CTO product launch machine learning`
   - `Denver SaaS company hiring general counsel privacy AI compliance`
   - `Mountain West healthtech AI decision system compliance risk`
   - `Colorado startup acquired strategic partnership founder CFO`
   - `AI patent startup robotics computer vision Denver founder CTO`

4. Research no more than a capped daily batch:
   - New companies: 10-25/day.
   - Contacts: 1-3 contacts/company.
   - Outreach drafts: only top 5-10 high-fit prospects/day.

5. Deduplicate:
   - Match by domain, normalized company name, LinkedIn company URL, and existing Growth OS prospect_id.
   - If possible duplicate, write to `duplicate_candidates` and do not create a new active opportunity.

6. Score each prospect:
   - primary_offer_lane
   - secondary_offer_lanes
   - fit_score
   - urgency_score
   - value_potential_score
   - evidence_confidence
   - combined_priority_score

7. Identify key contacts:
   - Match decision-maker roles by lane.
   - Prefer company website and public official profiles.
   - Store only business-relevant contact info.
   - Use `permission_basis='public-source research; attorney review required before outreach'` unless actual consent exists.

8. Write staged records:
   - Upsert `prospects`.
   - Upsert `contacts` where confidence >= 60.
   - Create `opportunities` for lane-specific high-fit prospects with stage `research_staged` or `Jeff / Whiteford Review` depending on existing stage conventions.
   - Write `source_evidence` rows for every material claim.
   - Write `outreach_drafts` only for prospects with fit >= 75 and at least two safe public facts.
   - Create `approval_items` for each draft that would require Jeff review.

9. Draft value-first outreach vectors:
   - Do not draft hard-sell emails.
   - Tie public fact -> business/legal blind spot -> free lead magnet -> optional productized next step.
   - Include suggested channel: LinkedIn profile post angle, direct email draft for review, educational resource note, partner/referral vector, event/webinar invitation, or no-outreach/watchlist.
   - Include why this is likely valuable to the prospect.

10. Produce digest:
   - Top new prospects.
   - Top contacts discovered.
   - Suggested lane/lead magnet per prospect.
   - Drafts ready for review.
   - Suppression/ethics/confidence flags.
   - Proposed next Kanban tasks.
   - Files/DB rows written.

---

## 6. Nightly prompt template

Store the full agent prompt at:

`docs/nightly_qwen_prospect_research_prompt.md`

The prompt should explicitly say:
- You are running locally on Qwen.
- Use public-source research only.
- Write local staging records only unless exact live-sync approval is present.
- No external outreach.
- No workflow activation.
- No LinkedIn actions.
- No legal advice.
- Every claim needs source evidence.
- Prioritize high-value, high-fit prospects who would get immediate value from the relevant lead magnet.

---

## 7. Configuration tasks

### Task 1: Harden `qwen-local` profile tool access

Objective: Ensure the local Qwen profile has the toolsets needed for overnight research and local staging.

Commands to run:

```bash
hermes -p qwen-local tools enable web
hermes -p qwen-local tools enable search
hermes -p qwen-local tools enable terminal
hermes -p qwen-local tools enable file
hermes -p qwen-local tools enable skills
hermes -p qwen-local tools enable session_search
```

Verification:

```bash
hermes -p qwen-local tools list
```

Expected: web/search/terminal/file/skills/session_search are enabled for the profile. Do not enable messaging or social-posting toolsets for this profile.

### Task 2: Add local profile guardrail persona

Objective: Make the `qwen-local` profile default to research/staging behavior.

Modify:

`/Users/jeff/.hermes/profiles/qwen-local/SOUL.md`

Recommended content:

```text
You are the Whiteford/Schell IP local Qwen research agent. Your job is public-source prospect research, evidence capture, scoring, local staging, and draft preparation for attorney review. You must not send messages, post publicly, activate workflows, enroll contacts in live campaigns, scrape behind logins, or write to live CRM/Supabase unless the current task contains explicit approval for exact objects and payloads. Every prospect claim needs source evidence. Every outreach draft is educational, value-first, attorney-review-only, and not legal advice.
```

Verification:

```bash
hermes -p qwen-local chat -q "State your live-action restrictions in one paragraph."
```

Expected: It refuses live outreach / workflow activation / live CRM writes without approval.

### Task 3: Create nightly prompt file

Objective: Store the operational instructions as a reusable file.

Create:

`docs/nightly_qwen_prospect_research_prompt.md`

Use the prompt included in this plan, or the companion prompt file already created by Hermes.

Verification:

```bash
wc -l docs/nightly_qwen_prospect_research_prompt.md
```

Expected: prompt file exists and is non-empty.

### Task 4: Create a runner script

Objective: Provide a repeatable local command for launchd/cron to run.

Create:

`scripts/run_nightly_qwen_prospect_research.sh`

Recommended script:

```bash
#!/usr/bin/env bash
set -euo pipefail

REPO="/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages"
PROMPT="$REPO/docs/nightly_qwen_prospect_research_prompt.md"
LOG_DIR="$REPO/docs/nightly-lead-research/logs"
mkdir -p "$LOG_DIR"
cd "$REPO"

# Ensure Ollama is reachable before starting a long research run.
curl -fsS http://localhost:11434/api/tags >/dev/null

hermes -p qwen-local chat \
  --toolsets web,search,terminal,file,skills,session_search \
  -q "$(cat "$PROMPT")" \
  2>&1 | tee "$LOG_DIR/qwen-prospect-research-$(date +%Y-%m-%d).log"
```

Make executable:

```bash
chmod +x scripts/run_nightly_qwen_prospect_research.sh
```

Verification:

```bash
scripts/run_nightly_qwen_prospect_research.sh
```

Expected: The Qwen agent starts and produces a digest. For a test run, include `TEST MODE: research only one prospect and do not write DB records` in the prompt or script command.

### Task 5: Add local SQLite writer utility

Objective: Avoid asking the LLM to hand-write SQL each night.

Create:

`scripts/prospect_research_store.py`

Capabilities:
- Validate JSON candidate records.
- Upsert prospects by domain/company name.
- Upsert contacts by prospect_id + normalized name/title/linkedin_url.
- Insert source_evidence records.
- Insert outreach_drafts and approval_items.
- Create pending crm_sync_records only when configured.
- Never send outreach.
- Never call GHL/Supabase directly in Phase 1.

Verification:

```bash
python3 scripts/prospect_research_store.py --help
python3 scripts/prospect_research_store.py --dry-run docs/nightly-lead-research/examples/sample_candidates.json
```

Expected: validates payload and prints planned DB changes without writing.

### Task 6: Configure nightly schedule

Preferred schedule: 1:30 AM local time daily.

Option A: Hermes cron, if profile-specific cron invocation is acceptable:

```bash
hermes cron create "30 1 * * *" \
  --name "Whiteford Qwen nightly prospect research" \
  --script "/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/scripts/run_nightly_qwen_prospect_research.sh"
```

Option B: macOS launchd, recommended for a local Ollama-dependent overnight job:

Create:

`~/Library/LaunchAgents/com.whiteford.qwen-prospect-research.plist`

Program:

`/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/scripts/run_nightly_qwen_prospect_research.sh`

Schedule:

1:30 AM daily.

Verification:

```bash
launchctl bootstrap gui/$(id -u) ~/Library/LaunchAgents/com.whiteford.qwen-prospect-research.plist
launchctl print gui/$(id -u)/com.whiteford.qwen-prospect-research
```

### Task 7: Create daily review digest

Objective: Make the run easy for Jeff to review.

Output path:

`docs/nightly-lead-research/runs/YYYY-MM-DD/digest.md`

Digest sections:
- Executive summary.
- Top 10 prospects by combined priority score.
- New contacts discovered.
- Suggested lane / lead magnet / CTA for each top prospect.
- Draft outreach vectors needing attorney review.
- Suppression/conflicts/confidence issues.
- Local records written.
- Optional staged GHL/Supabase payloads pending approval.
- Recommended Kanban tasks.

Verification:

```bash
ls docs/nightly-lead-research/runs/$(date +%Y-%m-%d)/digest.md
```

### Task 8: Approval gate for live GHL/Supabase writes

Objective: Separate research/staging from live CRM mutation.

Before live sync, require a written approval item stating:
- Destination: GHL, Supabase, or both.
- Exact tables/objects to write.
- Maximum record count for the batch.
- Tags/custom fields to apply.
- Whether trigger tags are allowed.
- Whether opportunities may be created.
- Whether any workflow enrollment is allowed.
- Rollback plan.

Default: no live write.

---

## 8. Initial search segments for first 14 nights

Night 1: Colorado / Denver / Boulder AI startups with recent funding or product launches.
Night 2: Mountain West companies advertising AI features in HR, employment, lending, insurance, or customer decisioning.
Night 3: AI/ML patent-heavy companies with founders/CTOs in Colorado, Utah, Arizona, New Mexico, Wyoming, Idaho, Montana, Nevada.
Night 4: Healthtech / medtech companies using AI in clinical, workflow, claims, or patient engagement contexts.
Night 5: Enterprise SaaS companies with no visible GC and recent hiring/funding/customer growth.
Night 6: Robotics, aerospace, defense, geospatial, sensor, and autonomy companies with protectable technical systems.
Night 7: Founder-led technology companies 5-10 years old with strategic partnership or acquisition-readiness signals.
Night 8: Portfolio companies of Mountain West venture funds and accelerators.
Night 9: Companies hiring privacy, compliance, security, AI governance, or legal operations roles.
Night 10: AI-enabled fintech, insurtech, proptech, and regtech companies.
Night 11: University spinouts and SBIR/STTR awardees with AI/software/hardware inventions.
Night 12: Companies with new terms/privacy/security pages suggesting enterprise sales motion.
Night 13: Companies in sectors facing consolidation where M&A readiness value is high.
Night 14: Review, dedupe, suppress weak records, and prepare the top 25 approval packet.

---

## 9. Safety and legal-marketing guardrails

- All drafts are attorney-review-only.
- Do not imply legal advice.
- Do not imply an attorney-client relationship.
- Do not promise outcomes, compliance, funding, patentability, deal success, or risk elimination.
- Use educational language and lead magnets as free diagnostic value.
- Avoid pressure tactics. Timing references must be fact-based: legal-change windows, public milestone, product launch, funding, diligence, or implementation timeline.
- Maintain unsubscribe/preference and consent handling for any later email use.
- Maintain suppression status and conflicts-review status.
- Prefer “this may be worth assessing” over “you need.”

---

## 10. Acceptance criteria

The system is ready when:

- `qwen-local` runs against local Ollama Qwen successfully.
- Nightly prompt exists.
- Runner script exists and works in test mode.
- Local database writes are validated through a store utility, not ad hoc SQL.
- First test run researches one prospect, writes source evidence, and produces a digest.
- No live GHL/Supabase writes occur without approval.
- First full overnight run produces at least 10 researched prospects, at least 10 source_evidence rows, top-priority scoring, and a digest with suggested lead magnets/outreach vectors.

---

## 11. Suggested first-run mode

Do not begin with an unconstrained overnight run. First run:

- Max companies: 3.
- Max contacts/company: 2.
- Max outreach drafts: 2.
- Write destination: local Growth OS SQLite only, or dry-run JSON if Jeff prefers.
- No GHL writes.
- No Supabase writes.
- Digest required.

After Jeff reviews data quality, expand to 10-25 companies/night.
