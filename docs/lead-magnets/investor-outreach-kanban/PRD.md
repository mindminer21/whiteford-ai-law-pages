# PRD — Investor Outreach Kanban Lead Magnet

## 1. Executive Summary

Build a new learn.schellip.com lead magnet for founders and business leaders who are preparing a venture fundraising process. The lead magnet starts with name, work email, company, role, and explicit email-consent controls, then asks categorical questions that map the user to investor categories and stages visible on NFX Signal. The output is a practical investor-outreach Kanban board with columns for:

1. Find investors
2. Identify introduction sources
3. Connect with introducers
4. Request introduction
5. Meeting set with investor
6. Follow up and data room
7. Due diligence
8. Funding
9. Archive

The first build should be a local MVP route at `/investor-outreach-kanban` that matches the visual language of the current learn.schellip.com lead magnets, stores only non-confidential categorical answers, and routes opt-in contacts through a Whiteford/Schell IP HighLevel campaign key.

## 2. Current Lead Magnet Evaluation

Reviewed current public surfaces on `learn.schellip.com`:

- `/ai-risk-triage`
  - Style: Whiteford + Schell IP lockup, editorial serif-like display treatment, navy/purple palette, noindex, strong legal/ethics disclaimer.
  - Pattern: landing page explains the value, CTA to `/start`, start route captures contact + categorical answers, inline result, PDF/report option, HighLevel route.
  - Useful carryover: “5-minute” framing, categorical questions, four-step “how it works,” operational output preview.

- `/patent-moat-scorecard`
  - Style: same brand system; a concrete sample output appears above the fold.
  - Pattern: investor/founder framing and benchmark language. This is closest conceptually because the new magnet is also venture-facing.
  - Useful carryover: investor-mode credibility, practical readiness tiering, output preview before the form.

- Directory page `/`
  - Pattern: cards for each lead magnet; strong visual preview; no forms embedded on landing pages.

Design conclusion: the investor Kanban magnet should feel like the Patent Moat Scorecard and AI Risk Triage, but the output preview should be a Kanban board instead of a radar/scorecard.

## 3. Data Source Strategy: Signal / NFX

### What was discovered

- `https://signal.nfx.com` exposes a large set of public investor-list pages.
- A local scrape extracted 357 public list links and saved them to:
  - `docs/lead-magnets/investor-outreach-kanban/signal-public-investor-list-links.json`
- Useful stage-correlated categories include Pre-Seed, Seed, Series A, and Series B pages for verticals such as AI, SaaS, Enterprise, FinTech, BioTech, Digital Health, Medical Devices, ClimateTech/CleanTech, DeepTech, Developer Tools, Cybersecurity, Hardware, Robotics, Manufacturing, Marketplaces, GovTech, DefenseTech, LegalTech, Space, Supply Chain Tech, and Web3/Blockchain.
- Useful region lists include Colorado / Utah, San Francisco Bay Area, New York City, Boston / New England, Austin, Los Angeles / Southern California, Seattle / Portland, Washington D.C., Midwest, Raleigh-Durham / Southeast US, Canada, London, and Israel.

### Constraint / legal-safe implementation boundary

The MVP should **not** copy, cache, enrich, or republish the full NFX Signal investor database. It should:

- use Signal public list pages as source links;
- keep only the user’s categorical preferences and selected public list URLs;
- link users out to Signal for investor discovery;
- avoid implying Whiteford/Schell IP owns or maintains the Signal database;
- avoid scraping logged-in, gated, or personal investor data unless Jeff later approves a licensed/API-compatible source.

## 4. Target Audience

Primary:

- Founders, CEOs, CFOs, and business leaders preparing a Pre-Seed, Seed, Series A, or Series B financing.
- Especially Colorado / Mountain West technology companies where investor readiness, IP diligence, and introductions intersect with Jeff’s Whiteford/Schell IP practice.

Secondary:

- Investors and board members helping a portfolio company organize outreach.
- Startup advisors who can refer companies to Jeff for IP/data-room readiness before fundraising.

## 5. Core User Problem

Founders often build investor spreadsheets before they build an investor process. They may know they need introductions, but they lack a structured workflow for investor fit, intro mapping, warm-intro requests, follow-up, data-room readiness, diligence, and archive hygiene.

The lead magnet reframes investor outreach as an operating system: pick investor categories, identify warm paths, manage stage progression, and tighten IP/data-room readiness before diligence.

## 6. Offer / Positioning

Working title: **Investor Outreach Kanban**

Headline direction:

> Build the investor outreach board your next financing round needs.

CTA:

> Build my investor outreach board

Promise:

- A categorical, non-confidential intake maps the founder to Signal investor categories and funding stage.
- The output is a starter Kanban board with stage-by-stage cards, Signal category links, intro-source tasks, data-room readiness prompts, and a Whiteford/Schell IP diligence-readiness angle.

Follow-up offer:

- Founder Fundraising Readiness / IP + Data Room Review
- Patent moat + investor diligence prep
- Tech Company OGC Launchpad if the company needs broader operating legal support

## 7. User Flow

1. User lands on `/investor-outreach-kanban`.
2. Hero explains the tool and shows a board preview.
3. User starts with contact fields:
   - name
   - work email
   - company
   - role/title
   - optional opt-in checkbox for the Whiteford/Schell IP investor-outreach email path
4. User accepts categorical-only/no-confidential-information disclaimer.
5. User answers categorical questions:
   - target financing round: Pre-Seed / Seed / Series A / Series B
   - primary investor categories: Signal verticals, max 5
   - priority geographies / relationship markets: Signal region lists, max 3
   - current outreach stage: one of the nine Kanban phases
   - available intro-source types: customers, founders, advisors, angels, lawyers, accountants, board members, accelerator/community, existing investors
   - data-room posture: not started / skeleton / populated / diligence-ready
6. UI renders Kanban output immediately.
7. On submit, `/api/leads` receives compact, non-confidential categorical payload.
8. If user opted in, HighLevel adds `workflow:investor-outreach-kanban`; otherwise it stores the lead with `newsletter:not-consented` and `approval_status = no-auto-send`.

## 8. MVP Scope

### In scope now

- New public route: `src/app/investor-outreach-kanban/page.tsx`
- New client component: `src/components/investor-outreach-kanban.tsx`
- New Signal public list data module: `src/lib/investor-outreach/signal-public-lists.ts`
- New campaign config key: `investor-outreach`
- API validation/custom fields for compact `investorOutreach` payload
- Directory card on `/`
- PRD and source-link evidence docs
- Local lint/build verification

### Out of scope until explicit approval

- Live CRM/workflow activation beyond existing opt-in-safe HighLevel upsert behavior.
- Scraping, storing, or republishing full Signal investor records.
- Sending email, SMS, LinkedIn, or other outbound messages.
- Building a persistent authenticated user Kanban app.
- Import/export to Trello/Notion/Airtable.
- Legal advice or investor-introduction guarantees.

## 9. Data Model

Frontend payload shape:

```ts
{
  campaignKey: "investor-outreach",
  sourcePage: "investor-outreach-kanban#builder",
  sourceChannel: "learn.schellip.com",
  disclaimerAccepted: true,
  reportRequested: true,
  privacyGuardrailVersion: "lead-magnet-guardrail-v2",
  publicFormInputType: "categorical_non_confidential",
  contact: {
    name: string,
    email: string,
    company: string,
    role: string,
    subscribe: boolean
  },
  investorOutreach: {
    targetRound: string,
    investorCategories: string[],
    investorRegions: string[],
    currentStage: string,
    introSources: string[],
    dataRoomStatus: string,
    kanbanStageCounts: Record<string, number>,
    reportVersion: "investor-outreach-kanban-privacy-guardrail-v1"
  }
}
```

HighLevel custom fields to populate:

- `investor_outreach_target_round`
- `investor_outreach_categories`
- `investor_outreach_regions`
- `investor_outreach_current_stage`
- `investor_outreach_intro_sources`
- `investor_outreach_data_room_status`
- `investor_outreach_kanban_stage_counts`
- `investor_outreach_report_version`

## 10. Kanban Output Rules

Default generated cards:

- Find investors
  - selected Signal vertical/stage lists
  - selected regional Signal lists
- Identify introduction sources
  - selected introducer categories
  - “map warm paths before asking for intros” prompt
- Connect with introducers
  - prepare short forwardable blurb
  - identify strongest path for top 20 investors
- Request introduction
  - ask for warm introduction using non-confidential summary
- Meeting set with investor
  - confirm thesis fit, partner ownership, and process
- Follow up and data room
  - share deck/data-room index only as appropriate
  - tighten IP, assignments, cap table, contracts, AI/data posture
- Due diligence
  - track diligence requests and owners
- Funding
  - closing checklist and post-close updates
- Archive
  - not-fit, no-response, stale, and later-round candidates

## 11. Legal / Ethics / Privacy Guardrails

- All public form answers must be categorical and compact.
- No textarea/free-text fields.
- Repeated disclaimer: informational only; not legal advice; no attorney-client relationship; no confidential, privileged, or trade-secret information; engagement requires conflicts check and written engagement letter; attorney advertising.
- Frontend must not hard-code workflow trigger tags.
- Email campaign trigger tag may only be added server-side when `contact.subscribe === true`.
- Non-opted contacts must receive no workflow/email-sequence routing.
- Signal links must be attribution-style source links, not copied investor records.

## 12. Acceptance Criteria

- `/investor-outreach-kanban` renders with the same Whiteford/Schell IP brand system and disclaimers.
- User can complete contact + categorical questionnaire without confidential text fields.
- Board preview updates from selections and includes all nine requested columns.
- Signal category/round links appear for selected categories.
- Submit succeeds in preview mode when HighLevel env vars are absent.
- Opt-in false does not route a workflow trigger tag or email sequence.
- Opt-in true routes campaign key `investor-outreach` and uses server-side trigger tag only.
- `npm run lint` and relevant lead-magnet tests pass or any pre-existing failures are documented.

## 13. Future Enhancements

- PDF/downloadable board.
- CSV export for founder’s CRM/spreadsheet.
- Kanban persistence after email magic-link login.
- Licensed/API investor import if a compliant Signal/Apollo/CRM data source is approved.
- HighLevel email sequence drafts for investor-outreach education.
- Integration with patent moat scorecard result so fundraising outreach and IP readiness can share a profile.
