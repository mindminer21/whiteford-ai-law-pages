CONTROLLED TEST MODE for Whiteford/Schell IP local Qwen prospect research.

Use the standard nightly prompt in docs/nightly_qwen_prospect_research_prompt.md, but override these limits for this run:
- Research exactly 1 high-potential public-source prospect.
- Prefer a Colorado / Mountain West AI company or technology company with clear fit for AI patent strategy, AI compliance, tech OGC, or M&A readiness.
- Identify up to 1 key person.
- Capture company name, domain/website, location, industry, key relevance facts, key person name/title, email if publicly available, LinkedIn URL if publicly available, phone if publicly available, source URLs, confidence, suggested offer lane, recommended lead magnet, and suggested outreach vector.
- Do not use Apollo.io in this test run.
- Do not write to HighLevel.
- Do not write to Supabase.
- Do not send outreach.
- Do not activate workflows.
- Write a candidate JSON report to docs/nightly-lead-research/runs/YYYY-MM-DD-controlled-test/prospect_candidates.json.
- If and only if the candidate has enough evidence, use scripts/prospect_research_store.py to stage it in local Growth OS SQLite.
- Write a human-review digest to docs/nightly-lead-research/runs/YYYY-MM-DD-controlled-test/digest.md.
- Final response must include counts and paths.
