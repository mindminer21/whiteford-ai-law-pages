# Nightly Qwen Prospect Research Operating Loop

## Purpose

Run local Qwen overnight to find 1-3 high-quality Colorado / Mountain West prospects for the Whiteford/Schell IP productized offer lanes, then make the results visible in Hermes Kanban, Growth OS, Supabase, and HighLevel without taking any prospect-facing action.

## Schedule

Hermes cron job:

- Job id: `fe351ea19388`
- Name: `Nightly Qwen prospect research operating loop`
- Schedule: `30 1 * * *`
- Delivery: Telegram
- Script: `/Users/jeff/.hermes/scripts/nightly_qwen_prospect_research_kanban.sh`
- Workdir: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages`

## Run Flow

1. Create a dated Hermes Kanban parent task and child tasks on `whiteford-mountain-west`.
2. Ask `qwen-local` to produce structured public-source prospect research.
3. Write run artifacts under `docs/nightly-lead-research/runs/YYYY-MM-DD/`.
4. Validate and stage candidates into local Growth OS SQLite with `scripts/prospect_research_store.py`.
5. Create local `agent_targeting_packet` work items for each staged prospect.
6. Sync validated prospects to HighLevel as internal contacts/opportunities in the `Agent Targeting` stage.
7. Mirror available local Growth OS tables to Supabase.
8. Leave a Kanban review task open for Jeff with links to the digest and sync reports.

## Safety Gates

The cron wrapper may create internal CRM/contact/opportunity records and Supabase mirror rows. It must not:

- send email;
- send LinkedIn messages;
- post, tag, comment, connect, or otherwise act on LinkedIn;
- activate HighLevel workflows;
- enroll contacts in campaigns;
- apply workflow trigger tags;
- write to Clio;
- run paid ads;
- take public or prospect-facing action.

Outreach drafts, targeting packets, social concepts, and collateral remain attorney-review-only until Jeff gives exact approval.

## Current Supabase Note

The Supabase project currently has the earlier core Growth OS schema. The sync helper now skips missing mirror tables and reports partial status instead of failing the nightly run. To mirror all evidence, draft, CRM, content, and audit tables, apply the expanded schema SQL files in:

- `/Users/jeff/.openclaw/projects/mountain-west-growth-os/supabase/phase6-draft-factory-schema.sql`
- `/Users/jeff/.openclaw/projects/mountain-west-growth-os/supabase/phase7-outreach-execution-schema.sql`
- `/Users/jeff/.openclaw/projects/mountain-west-growth-os/supabase/phase8-crm-highlevel-integration-schema.sql`
- `/Users/jeff/.openclaw/projects/mountain-west-growth-os/supabase/phase9-11-growth-engine-schema.sql`

