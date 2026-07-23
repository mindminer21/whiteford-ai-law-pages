# LinkedIn awareness draft — endpoint AI control test (2026-07-23)

Attorney-review-only draft for Jeff Schell's personal LinkedIn profile. Draft only; no external/public action authorized.

## 1. Topic selected and why

- **Selected topic:** Glow’s July 22, 2026 stealth exit with $180 million at a $1.2 billion valuation, translated into a five-question endpoint AI control test for engineering leaders deploying AI agents, coding tools, and developer software on employee devices.
- **Target reader:** CTO / engineering leader responsible for AI tooling, endpoint standards, developer platforms, or enterprise security partnerships. Secondary readers: CISOs/security leaders, product leaders, founders/CEOs, in-house GCs, VC/PE investors, and Colorado operators rolling AI into product or internal workflows.
- **Business moment:** AI feature / internal-tool rollout; pilot-to-production transition for coding agents and workplace AI; enterprise procurement of endpoint or developer security tooling; board/investor update on AI adoption controls.
- **Audience-value gate:** A **CTO or engineering leader expanding AI agents and developer tools onto employee devices this week** would save/share this because it helps them decide what must be known, allowed, blocked, reviewed, and owned before more AI software lands on the endpoint.
- **Operator value:** A five-question control test that separates “AI is available” from “we can explain what runs, what it can touch, who approved it, and who can shut it off.”
- **Why selected:** TechCrunch and Glow’s first-party announcement are one day old. The market signal is not “another security unicorn.” It is that AI agents and developer tools are changing what lives on the endpoint faster than many teams can inventory or govern it. Agent Targeting candidates (Sereact, RADICL, PickNik, Electra) already have prior awareness packets. Recent primary readers were VC/PE (Jul 22), product (Jul 20), founder/CEO (Jul 19), Colorado operator (Jul 18), in-house GC (Jul 17), and product (Jul 16)—so CTO/engineering is due without repeating Jul 14’s model-switch drill.
- **Tone:** Plainspoken operator, slightly contrarian opening, then calm expert checklist.
- **Growth OS source:** Public-source research fallback plus read-only Growth OS inspection. Current Agent Targeting rows were inspected but were older, internationally focused, or already represented in prior awareness work. No Growth OS DB prospect, contact, opportunity, source, approval, or outreach row was created or modified.
- **Whiteford/Schell IP asset map:** `/ai-compliance-gameplan` and `/colorado-tech-general-counsel` (internal alignment only; neither is linked in the caption).

## 2. Public-source evidence URLs

Every material factual claim in the proposed caption is supported by the public sources below. Reopen them before any manual use.

1. **TechCrunch — “Glow emerges from stealth at $1.2B valuation to challenge endpoint security in the AI era”**  
   URL: https://techcrunch.com/2026/07/22/glow-emerges-from-stealth-at-1-2b-valuation-to-challenge-endpoint-security-in-the-ai-era/  
   Published: July 22, 2026 (3:00 AM PDT).  
   Supports: Glow, a cybersecurity startup founded by former Meta and Snowflake executives, emerged from stealth; raised $180 million Series A valued at $1.2 billion; backing from Sequoia Capital, Cyberstarts, Greenoaks, and Redpoint Ventures, with participation from Index Ventures, Swish Ventures, Lux Capital, Operator Collective, and Holly Ventures; Palo Alto headquartered; founded in 2025; building an endpoint security platform to help enterprises monitor and control software, AI agents, and developer tools on employee devices; uses specialized AI agents to map environments, assess risk, and enforce policies; CEO Roi Tiger (former Meta VP of engineering); co-founders Omer Singer (former Snowflake cybersecurity strategy head), Ophir Arie (former Claroty VP R&D), and Arnon Joseph (former Meta engineering leader); COO Emily Heath (former CISO at United Airlines and Docusign; former Wiz board member through Google acquisition; former Cyberstarts partner); company-reported paying customers across healthcare, retail, and financial services without disclosed names/numbers; company-reported typical deployments spanning tens of thousands of devices; uses AI models from Anthropic and Google’s Gemini through Amazon Bedrock while building its own software for enterprise context; company-attributed examples include preventing malicious npm packages, identifying AI agents attempting to pull in such software, and detecting devices where EDR tools were missing or reduced; Tiger contrast of existing EDR focus on detecting threats after they emerge versus Glow’s stated prevention-first design. Funding figures, valuation, customer claims, and product-performance statements are company/press-reported and not independently audited facts.

2. **Glow — first-party news release: “Glow Emerges From Stealth With $180 Million to Reinvent Endpoint Security in the AI Era”**  
   URL: https://www.glow.io/news/glow-emerges-from-stealth-with-180-million  
   Dated: July 22, 2026, 6:00 AM ET.  
   Supports: Tel Aviv and Palo Alto dateline; $180 million funding at $1.2 billion valuation; prevention-first endpoint positioning; same investor set; use of proceeds to accelerate U.S. go-to-market and expand Glow Labs; founder/executive titles for Tiger, Singer, Arie, Joseph, and Heath; company claim that regular usage of AI on corporate devices (authorized or not) rose from 15% to 45% in one year (company statistic—treat as company-reported, not independent verification); positioning that AI enters the organization at the endpoint faster than security review; specialized AI agents continuously map environment, analyze risk, and enforce policies; adaptive prevention framing. Homepage marketing claims and company statistics are not treated as independent proof.

3. **Glow — homepage**  
   URL: https://www.glow.io/  
   Accessed: July 23, 2026.  
   Supports: “The Endpoint AI Company” positioning; control of what runs on the endpoint so teams can adopt AI safely; company-stated marketing figures such as 12,000+ unique pieces of software in an average organization, 67% of software invisible to existing tools, and 30% of AI agents operating with no guardrails (company marketing claims only); living inventory / asset intelligence and software-control messaging; Black Hat USA 2026 event mention. Do not treat homepage percentages as independently verified industry facts in the public caption beyond labeling them as company-stated market texture if used at all. The proposed caption does **not** rely on those percentage claims.

4. **Glow — About / leadership**  
   URL: https://www.glow.io/about  
   Accessed: July 23, 2026.  
   Supports: Leadership identities and titles (Roi Tiger, Co-Founder & CEO; Omer Singer, Co-Founder & CTO; Ophir Arie, Co-Founder & VP R&D; Arnon Joseph, Chief Product Officer; Emily Heath, Chief Operating Officer); public LinkedIn profile URLs for manual tag-candidate verification only; company LinkedIn candidate `https://www.linkedin.com/company/glowsecurity`.

5. **Glow — founder blog: “Why We Started Glow”**  
   URL: https://www.glow.io/blogs/why-we-started-glow  
   Dated: July 22, 2026 (Roi Tiger).  
   Supports: Same funding announcement; thesis that endpoint security has forced a choice between reacting after harm and slowing the business; claim that AI makes reactive endpoint control harder because technology enters faster than teams can react; product framing around knowing and controlling everything that runs on the endpoint.

**Source-access note:** Web search plus direct public-page fetches (`urllib` and web_extract) were sufficient. Firecrawl was not used. Re-verify all URLs, funding/valuation figures, leadership titles, customer claims, and forward-looking product statements before any manual use. Do not treat search snippets as controlling if they conflict with TechCrunch or first-party Glow pages.

## 3. Concise internal brief

- **Why the topic matters:** AI coding agents, browser assistants, and developer tools land on laptops and workstations faster than many companies update their inventory, allow-list, data-boundary, or kill-switch rules. The operating question is not whether a new security category is “hot.” It is whether engineering and security can still answer what runs, what it can touch, who approved it, and who can stop it.
- **Practical operator lens:** Run a five-question endpoint AI control test on one real workflow: inventory, data/tool reach, approval path, human override, and named owner. If any answer is vague, the company is expanding AI surface area faster than control.
- **Target-reader value:** Gives a CTO a 10-minute architecture/security stand-up agenda without turning the post into a vendor review, security audit, compliance opinion, or legal advice.
- **Business moment:** Before rolling another AI coding agent, browser assistant, or developer plugin into production-adjacent machines; before buying endpoint AI security tooling; before telling a board or enterprise customer that AI adoption is under control.
- **Business-development corpus synthesis:** Applied the private corpus principle that the post itself should be a complete solution to a narrow problem: one concrete decision this week, usable without a click. No forced lead magnet; native checklist is the value.
- **SIFT check:** Signal = Glow’s July 22 stealth exit / $180M / $1.2B coverage and first-party endpoint-AI thesis; Insight = AI changes the endpoint faster than many control models assume; Field artifact = five-question endpoint AI control test; Transfer = a CTO can run it in a stand-up this week.
- **Hard framing check:** No “readiness file,” “proof file,” “evidence file,” “diligence file,” “control file,” “operating file,” “launch file,” folder, dossier, data-room, proof-stack, or document-bundle motif. Lead with the decision and the five questions.

## 4. Company and tag candidates for Jeff to verify manually

**Do not tag anyone live unless Jeff manually verifies the current LinkedIn entity, relevance, conflicts/suppression/prior-touch posture, and final copy. Default public-copy posture: no live tags.**

- **Glow / Glow Security** — company/source tag candidate. Confidence: high from TechCrunch exclusive/reporting and first-party site. Candidate company LinkedIn URL from first-party footer/about: `https://www.linkedin.com/company/glowsecurity`. Live tag resolution was not attempted. Default recommendation: name the company in text without a live tag.
- **Roi Tiger** — CEO/co-founder tag candidate. Confidence: high from TechCrunch and `https://www.glow.io/about`. Candidate profile URL from About page: `https://www.linkedin.com/in/roitiger/`. Default recommendation: no individual tag.
- **Omer Singer** — CTO/co-founder tag candidate. Confidence: high from first-party About and TechCrunch. Candidate profile: `https://www.linkedin.com/in/omer-singer/`. Caption does not require naming him. Default recommendation: no individual tag.
- **Ophir Arie / Arnon Joseph / Emily Heath** — leadership context only. Candidate profiles on About page. Default recommendation: omit from public caption.
- **Sequoia Capital, Cyberstarts, Greenoaks, Redpoint Ventures** — investor-context organizations only. Default recommendation: omit from the public caption for focus unless Jeff wants a longer market-context version. Index, Swish, Lux, Operator Collective, and Holly Ventures likewise optional.

The post uses Glow as a public market example of the endpoint-AI operating problem. It does not imply that Glow, its leaders, customers, partners, investors, competitors, or any company has a security failure, compliance failure, legal problem, product defect, customer issue, or need for counsel. It is not an endorsement, security assessment, diligence conclusion, or investment recommendation.

## 5. Lead magnet / tool usage

- **Lead magnet used in the public post:** No.
- **Reason:** Jul 22 already used a soft learn.schellip.com link. Native five-question value is complete without a CTA. Restrained 3–4 post cadence remains appropriate.
- **Natural future route, not included:** AI Compliance Gameplan — `https://learn.schellip.com/ai-compliance-gameplan`; Tech Company Legal Health Checklist — `https://learn.schellip.com/colorado-tech-general-counsel`.
- **HighLevel tag if this concept is later adapted into an approved, consented campaign:** Candidate `linkedin_awareness_endpoint_ai_control_test_2026_07_23`. No tag was created or applied.

## 6. Draft LinkedIn caption for Jeff review

Most companies are not failing at “AI strategy.”

They are failing at a simpler question:

What is allowed to run on the endpoint once AI tools start multiplying?

Glow gave the market a useful public example this week. The endpoint-security company emerged from stealth with $180 million at a $1.2 billion valuation, according to TechCrunch and Glow’s own announcement, arguing that AI agents and developer tools are reshaping what lives on employee devices faster than older endpoint models expected.

Treat that as a market signal, not a verdict on Glow, the round, or any security vendor.

If you lead engineering, the useful response is an operating test—not another strategy slide.

Pick one AI tool already on laptops or workstations: a coding agent, browser assistant, plugin, or internal copilot. Answer these five questions in one stand-up:

1. **Inventory**  
What exact software, agents, plugins, and model connections are on the machines that matter—not the approved list, the actual list?

2. **Reach**  
What files, repos, tickets, browsers, credentials, package registries, and production-adjacent systems can that tool touch today?

3. **Approval path**  
Who can install, enable, or expand it without security and engineering both knowing?

4. **Human override**  
If the tool starts acting outside the intended job, who can pause it in minutes, and what evidence shows what it already did?

5. **Named owner**  
Which single leader owns the keep / restrict / remove decision for that tool next week?

If those answers are fuzzy, the company does not have an AI adoption problem yet.

It has an endpoint control problem.

That is a solvable engineering issue. Fix the answers for one workflow before the next wave of agents lands on every laptop.

## 7. Suggested image / carousel concept

- **Format:** Simple 6-card carousel or single stark graphic.
- **Card 1 hook:** “What is allowed to run once AI tools multiply?”
- **Cards 2–6:** One question each — Inventory / Reach / Approval path / Human override / Named owner.
- **Visual metaphor:** A laptop silhouette with multiple unlabeled agent icons; one control rail labeled “know / allow / stop / own.”
- **Guardrail:** No Glow logo, executive photos, investor logos, customer marks, Black Hat branding, or security-product UI screenshots unless separately authorized. Do not imply any company failed a control test. Avoid red “breach” imagery.

## 8. Approval checklist before any manual posting

- [ ] Reopen TechCrunch and Glow first-party URLs; confirm $180M / $1.2B valuation, date, investor set, and product positioning; keep company-reported customer/performance claims labeled or omitted.
- [ ] Confirm the caption does not imply Glow or any company has a security, legal, compliance, product, customer, financing, or governance problem.
- [ ] Confirm no legal advice, no attorney-client relationship language, and no “contact us / book a call” hard CTA.
- [ ] Confirm prohibited-framing scan is clean: no readiness/proof/evidence/diligence/control/operating/launch file, folder, dossier, data-room, or proof-stack motif.
- [ ] Decide whether to keep Glow named or generalize to “an endpoint-security company that emerged from stealth this week.”
- [ ] Verify manual tag candidates; default to zero live tags.
- [ ] Run conflicts/suppression/prior-touch review if Jeff makes the post company-specific, tags an entity, or reuses it in outreach.
- [ ] Confirm lead-magnet-free posture remains correct for today’s cadence.
- [ ] No publishing, scheduling, tagging live, commenting, DMs, connection requests, enrollment, workflow activation, or CRM/HighLevel/Supabase/Clio/LinkedIn mutation without Jeff’s explicit approval of the exact action.

## 9. Related Growth OS / Kanban links

- **Growth OS DB:** read-only inspection only at `/Users/jeff/.openclaw/projects/mountain-west-growth-os/data/growth-os.sqlite`. No prospect/contact/opportunity row created or modified for this draft.
- **Prospect posture:** public-source research fallback (not a staged Agent Targeting packet conversion). Highest DB Agent Targeting rows (Sereact, RADICL, PickNik, Electra) were de-duplicated against prior awareness drafts.
- **Deliverable path:** `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/growth-os/linkedin-awareness-drafts/2026-07-23/2026-07-23-endpoint-ai-control-test-linkedin-awareness-draft.md`
- **Kanban review task:** **Not created.** `hermes kanban create` refused to open the whiteford-mountain-west board because the DB is malformed/corrupt (`database disk image is malformed` at `/Users/jeff/.hermes/kanban/boards/whiteford-mountain-west/kanban.db`). CLI exit code was 0 while printing the refusal; no task id exists. Original preserved; backup path reported: `/Users/jeff/.hermes/kanban/boards/whiteford-mountain-west/kanban.db.corrupt.872e36df92fcb8fd.bak`. Do not run `kanban show` (no task id). Repair Kanban before creating the reviewer task.
- **Index entry:** `docs/KANBAN_DELIVERABLE_INDEX.md` — growth-os-linkedin-awareness-2026-07-23.

## 10. Safety confirmation

Draft only. No publishing, scheduling, live tagging, commenting, DMs, connection requests, outreach, workflow activation, campaign enrollment, or live HighLevel/Supabase/Clio/LinkedIn/Growth OS mutation was performed. Public-source evidence only. No legal advice. No attorney-client relationship. Educational operator content only.
