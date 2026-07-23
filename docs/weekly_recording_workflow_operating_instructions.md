# Weekly Schell IP / Whiteford Recording Workflow Operating Instructions

Last updated: 2026-05-05

## Purpose

Run a recurring Hermes agent every Monday morning to refresh SEO and YouTube opportunities for the Schell IP / Whiteford AI authority engine, turn the best opportunities into a top 3 recording queue for Jeff Schell, create or update durable Kanban tasks for production follow-through, map every topic to the right landing page and HighLevel campaign, and send Jeff a concise Telegram brief.

System of record:

- Strategy: `whiteford_schellip_ai_authority_youtube_strategy.md`
- Current app routes: `src/app/**/page.tsx`
- Campaign and HighLevel routing: `src/lib/campaigns.ts`
- Landing page offer map: `src/lib/site.ts`
- Lead API behavior: `src/app/api/leads/route.ts`

Do not invent new positioning, lead magnets, campaigns, or landing pages unless a human explicitly asks. If a new opportunity does not fit the map below, flag it as a proposed gap instead of forcing it.

## Current route and campaign map

| Pillar | Show | Buyer intent | Landing page / CTA | Lead magnet | HighLevel workflow trigger | Primary tags | Productized offer |
| --- | --- | --- | --- | --- | --- | --- | --- |
| AI Patent Law | AI Patent Brief | AI-assisted invention, inventorship, patent eligibility, ownership, patent documentation | `/ai-patent-strategy-scorecard` | AI Patent Strategy Scorecard | `workflow:ai-patent-strategy` | `leadmagnet:ai-patent-scorecard`, `interest:ai-patent-law`, `newsletter:ai` | AI Patent Strategy Sprint |
| AI Legal Risk and Compliance | Colorado AI Law Brief | Colorado AI / ADMT readiness, vendor risk, human review, records, notices, governance | `/ai-compliance-gameplan` or `/colorado-ai-compliance-lawyer` | AI Compliance Gameplan Builder | `workflow:ai-compliance-readiness` | `leadmagnet:ai-compliance-gameplan`, `interest:ai-compliance`, `newsletter:ai` | AI Compliance Readiness Sprint |
| Tech Outside General Counsel | Founder Legal Operating System | contracts, hiring, IP assignment hygiene, privacy/data governance, legal ops for scaling tech companies | `/colorado-tech-general-counsel#lead-magnet` | Colorado Tech Company Legal Health Checklist | `workflow:tech-gc-launchpad` | `leadmagnet:tech-gc-checklist`, `interest:tech-ogc`, `newsletter:ai` | Tech Company OGC Launchpad |
| M&A, Diligence, and Transaction Readiness | Deal-Ready Founder | IP/data/AI diligence, non-financial diligence risk, cap table and assignment cleanup, customer/vendor red flags | `/colorado-startup-ma-lawyer#lead-magnet` | Founder M&A Readiness Checklist | `workflow:ma-readiness` | `leadmagnet:ma-readiness-checklist`, `interest:ma-readiness`, `newsletter:ai` | Founder M&A Readiness Review |
| Authority hub | All shows | explain the channel architecture and route viewers into the right lead magnet | `/ai-law-youtube` | route-specific | route-specific | route-specific | route-specific |

The app lead API accepts `campaignKey`, `sourcePage`, `sourceChannel`, `youtubeTopic`, contact data, assessment data, and patent scorecard data. For YouTube-originated leads, set:

- `sourceChannel`: `youtube`
- `sourcePage`: the selected landing page path
- `youtubeTopic`: the exact video topic/title
- `campaignKey`: one of `ai-patent`, `ai-compliance`, `tech-gc`, `ma-readiness`

## Weekly run cadence

Preferred schedule: Monday 7:00 AM Mountain Time.

If scheduling with Hermes cron, use a self-contained prompt and deliver to Jeff's Telegram origin/home channel. Do not let the cron-run agent create or modify cron jobs recursively.

Recommended cron job shape:

```text
Name: Weekly SchellIP Whiteford AI recording radar
Schedule: 0 7 * * 1
Workdir: /Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages
Toolsets: web, kanban, file, session_search
Prompt: use the "Recurring agent prompt" section in this file verbatim.
```

If the Hermes cron tool is used from an interactive session, create it with:

```python
cronjob(
  action="create",
  name="Weekly SchellIP Whiteford AI recording radar",
  schedule="0 7 * * 1",
  workdir="/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages",
  enabled_toolsets=["web", "kanban", "file", "session_search"],
  deliver="origin",
  prompt="<paste the Recurring agent prompt below>"
)
```

Use the exact current Hermes environment's delivery target if Jeff wants a specific Telegram chat/thread rather than the current origin.

## Recurring agent prompt

You are the recurring weekly recording workflow agent for Jeff Schell's Schell IP / Whiteford AI authority engine.

Your goal each run:

1. Refresh current SEO, YouTube, and legal-development opportunities.
2. Select the top 3 recording topics for this week.
3. Map each topic to the correct authority pillar, show, landing page, lead magnet, HighLevel campaign key, trigger tag, and productized offer.
4. Create or update Kanban tasks that move each selected topic through script, landing/supporting content, email/nurture, and legal/ethics review.
5. Send Jeff a concise Telegram-ready brief with the recording queue and open tasks.

System of record:

- Read `whiteford_schellip_ai_authority_youtube_strategy.md` first.
- Read these current app files before mapping campaigns:
  - `src/app/ai-law-youtube/page.tsx`
  - `src/lib/campaigns.ts`
  - `src/lib/site.ts`
  - `src/app/api/leads/route.ts`
- Use current app routes only unless you explicitly label a proposed gap.

Research inputs to check every run:

- USPTO AI resources: https://www.uspto.gov/initiatives/artificial-intelligence/artificial-intelligence-resources
- USPTO AI-assisted inventorship FAQ: https://www.uspto.gov/initiatives/artificial-intelligence/faqs
- USPTO AI Patent Dataset: https://www.uspto.gov/ip-policy/economic-research/research-datasets/artificial-intelligence-patent-dataset
- Copyright Office AI reports and policy materials.
- Colorado AI / ADMT legislative and rulemaking activity, including the app's current anchors: Colorado SB24-205, SB25B-004, and SB26-189.
- Google helpful-content and video structured-data guidance when producing SEO/video-support tasks.
- Search/YouTube surface checks for buyer-intent phrases tied to the four authority pillars.

Candidate topic requirements:

- Identify 10 candidates before selecting the top 3.
- Score each candidate 1-5 on:
  - Buyer intent
  - Urgency/timeliness
  - Jeff authority fit
  - Colorado/Mountain West local advantage
  - Lead magnet fit
  - Productized service fit
  - Low-competition/content-gap potential
- Prefer topics that create useful, non-alarmist explanations for founders and executives.
- Avoid legal advice, guarantees, confidential-information requests, and overclaiming unsettled law.

Top 3 output requirements:

For each selected topic, produce a recording brief with:

- Rank and score summary.
- Primary keyword.
- Secondary keywords.
- Search intent.
- Show assignment.
- Proposed title options.
- Thumbnail hook.
- One-sentence promise.
- 5-7 section outline.
- Cold open script.
- Source links.
- Colorado/Mountain West localization angle.
- Legal/ethics cautions.
- CTA and landing page.
- Lead magnet.
- HighLevel campaign key, workflow trigger tag, and tags.
- Email nurture branch.
- Shorts clips and timestamp/chapter ideas.
- Blog/supporting-article angle.
- Landing-page FAQ or content-block repurpose angle.

Kanban task creation/update rules:

- Search existing active tasks first, using topic/title keywords and the tenant `whiteford-mountain-west`, to avoid duplicates.
- If a matching active task exists, comment with the refreshed brief and update the task only if the board supports updating. If updates are unavailable, leave a structured comment rather than creating a duplicate.
- If no matching active task exists, create a parent topic task and child production tasks.
- Use tenant `whiteford-mountain-west` on every created task.
- Do not assign follow-up work to `orchestrator` unless the work is decomposition/planning. Use specialists:
  - `researcher`: source-gathering and fact pack.
  - `writer`: script, LinkedIn/email/blog drafts.
  - `frontend-eng` or `seo-content`: landing-page or app content changes, depending on available profiles.
  - `reviewer`: legal/ethics/brand/attorney-advertising review.
  - `ops`: HighLevel workflow or automation setup.
- Use parent dependencies so production starts after the topic brief/fact pack and review gates final publication.
- Capture returned task IDs exactly. Never invent task IDs.

Recommended Kanban graph per selected topic:

```text
Topic parent: Produce video package: <topic title> [assignee: pm or analyst]
  -> Research fact pack and source notes [researcher]
  -> Draft YouTube script and description [writer]
  -> Draft supporting blog/LinkedIn/email assets [writer]
  -> Update landing-page FAQ/content block if needed [seo-content or frontend-eng]
  -> Verify HighLevel campaign/tag mapping [ops]
  -> Review public content for legal/ethics/Whiteford brand risk [reviewer]
```

If a selected topic is truly recording-ready and only needs Jeff to film, create a single lightweight task titled `Record: <topic title>` with the recording brief in the body and assign it to the appropriate human-facing profile if one exists; otherwise include it only in the Telegram brief.

Telegram brief format:

```text
Weekly SchellIP / Whiteford AI recording radar

Top 3 to record:
1. <Title> — <show>; <primary keyword>; CTA: <landing page> / <lead magnet>; why now: <one line>
2. ...
3. ...

Best immediate pick: <one title> because <one sentence>.

Kanban:
- Created/updated <N> topic packages.
- Task IDs: <real IDs only, grouped by topic>.

Watchouts:
- <legal/ethics or unsettled-law caution>
- <campaign/page gap if any>

Next action for Jeff:
Record <specific first video> using the cold open and outline in task <real task ID if available>.
```

Keep the Telegram brief concise. Put full research notes and source links in Kanban task bodies/comments, not in the Telegram message.

## Scoring rubric

Use this default weighting unless Jeff changes it:

- Buyer intent: 25%
- Urgency/timeliness: 15%
- Jeff authority fit: 20%
- Colorado/Mountain West local advantage: 15%
- Lead magnet fit: 10%
- Productized service fit: 10%
- Low competition/content gap: 5%

Tie-breakers:

1. AI Patent Law topics win when they credibly extend Schell IP's existing authority into Whiteford's broader platform.
2. Colorado AI Law topics win when there is a current Colorado-specific development or practical readiness angle.
3. Tech OGC and M&A topics win when they connect patent clients to broader Whiteford matters without feeling generic.

## Default first-week queue from the app

Use these as seed topics, but refresh them against current search and official sources before recommending them:

1. `Can You Patent an AI-Assisted Invention?`
   - Keyword: `AI patent lawyer`
   - Show: AI Patent Brief
   - Landing page: `/ai-patent-strategy-scorecard`
   - Campaign key: `ai-patent`
   - Trigger: `workflow:ai-patent-strategy`

2. `Colorado AI Compliance: What Companies Should Inventory First`
   - Keyword: `Colorado AI compliance lawyer`
   - Show: Colorado AI Law Brief
   - Landing page: `/ai-compliance-gameplan`
   - Campaign key: `ai-compliance`
   - Trigger: `workflow:ai-compliance-readiness`

3. `The Legal Checklist Every Colorado AI Startup Needs Before Fundraising`
   - Keyword: `Colorado startup general counsel`
   - Show: Founder Legal Operating System
   - Landing page: `/colorado-tech-general-counsel#lead-magnet`
   - Campaign key: `tech-gc`
   - Trigger: `workflow:tech-gc-launchpad`

4. `AI, Data, and IP Issues That Can Slow a Tech Company Acquisition`
   - Keyword: `tech M&A due diligence lawyer`
   - Show: Deal-Ready Founder
   - Landing page: `/colorado-startup-ma-lawyer#lead-magnet`
   - Campaign key: `ma-readiness`
   - Trigger: `workflow:ma-readiness`

## Review and compliance guardrails

Every generated public-facing asset must include or preserve these guardrails:

- Educational information only; no legal advice.
- No attorney-client relationship from viewing a video, downloading a lead magnet, or submitting a public form.
- No guarantee of legal outcome, compliance, patentability, funding, valuation, or deal success.
- Do not ask for confidential information in public forms or comments.
- Treat unsettled AI law carefully and distinguish legal requirements from readiness best practices.
- Preserve Whiteford/Schell IP positioning: Jeff's Colorado patent-law trust bridge plus Whiteford's national bench.
- Route viewers to a focused lead magnet or productized readiness offer, not a generic contact page.

## Failure modes and what to do

- If official sources are unavailable: continue with cached strategy/app sources, mark source-refresh as incomplete, and create a researcher task to retry.
- If no topic earns a strong score: recommend one maintenance video from the seed queue and say why the week is low-signal.
- If a topic lacks a route/campaign fit: label it as `proposed gap`, do not invent tags, and create a planning task for campaign-map expansion.
- If Kanban tools are unavailable: produce the full brief and explicitly say Kanban task creation was skipped because the tool was unavailable.
- If Telegram delivery is unavailable: save the brief as a Kanban comment or final cron output; do not silently drop it.

## Definition of done for each weekly run

A run is complete only when:

1. Strategy and app routing files were read.
2. Current legal/search inputs were checked or explicitly marked unavailable.
3. 10 candidates were scored.
4. Top 3 recording briefs were produced.
5. Each top topic was mapped to a landing page, lead magnet, campaign key, trigger tag, tags, and productized offer.
6. Kanban tasks were created or existing tasks were commented/updated without duplicates.
7. Jeff received a concise Telegram-ready brief.
