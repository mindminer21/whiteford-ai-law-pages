# Investor Directory Data Model + Supabase Import Plan

> Internal build artifact for the `Investor Outreach Kanban` lead magnet. No live Supabase mutation, public deployment, external outreach, or HighLevel workflow activation is authorized by this file.

## Executive summary

The useful version of this database is not a copied investor directory. It is a provenance-first fundraising-readiness data layer that helps users turn investor fit signals into a prioritized Kanban workflow while preserving source attribution and legal/source-license boundaries.

This implementation creates:

- A Supabase/Postgres schema for investors, firms, stages, sectors, geographies, investments, co-investors, companies, CEOs/founders, source observations, and import batches.
- A source registry that distinguishes public-link data from licensed/API-only data.
- A JSONL ingestion contract and importer that defaults to dry-run validation.
- A pilot fixture from one public Signal profile to validate the data shape.

## Source constraints discovered

### NFX Signal

Observed public facts:

- Signal homepage describes the service as a free tool for founders to find investors.
- Public list pages expose sector/stage/geographic list URLs and counts.
- Public investor profile pages can expose structured facts including role, firm, location, investment range, sweet spot, current fund size, rankings, investments, co-investors, and profile links.
- Signal methodology says list ranking is algorithmic and includes self-reported data, founder activity, connectedness via email graph, and upvotes.
- `robots.txt` includes `Crawl-delay: 8`, disallows some paths, and does not disallow individual public investor profile paths.

Allowed implementation posture for this project:

- Store structured facts from public profile/list pages, source URLs, and concise evidence excerpts.
- Respect crawl delay and avoid login/private intro-path/email-graph data.
- Attribute Signal on user-facing rows.
- Do not imply Signal endorsement.
- Do not copy/export a full restricted database if NFX objects or a license/API path is required.

### PitchBook

PitchBook Terms of Use expressly restrict systematic scraping/data-mining and restrict AI/ML use of PitchBook content absent separate rights. The schema supports PitchBook as a `licensed_export` source, but the importer should only ingest PitchBook data from an approved export/API/license workflow. Do not scrape PitchBook pages for this lead magnet.

### Other sources

Use only source-specific lawful/approved paths:

- Company websites and press releases for CEO/founder/current leadership.
- SEC/state filings where relevant.
- Crunchbase/PitchBook/CB Insights only if access and usage rights permit the target use.
- Public investor/fund websites for thesis, check size, portfolio, and stage data.
- Manual research with per-row source URL and confidence.

## Supabase artifacts

- Migration: `supabase/migrations/202605260001_investor_directory.sql`
- Importer: `scripts/investor_directory_import.py`
- Sample fixture: `data/investor-directory/samples/signal_angela_tran_seed.jsonl`

## Tables

- `investor_sources`: Source registry, access policy, allowed capture scope, attribution, crawl delay.
- `investor_import_batches`: Batch metadata for dry-run/staging/production imports.
- `firms`: VC/fund/company investor organizations.
- `investors`: Investor people/profiles with check-size and current-position fields.
- `investor_firm_roles`: Current/past roles.
- `investor_stages`: Stage interests, e.g., Pre-Seed, Seed, Series A.
- `investor_sectors`: Sector/topic interests, optionally stage-specific.
- `investor_geographies`: Geographic areas of interest and relationship-market lists.
- `companies`: Portfolio companies.
- `company_people`: CEOs/founders/executives with source URLs.
- `investments`: Investor-to-company investments with stage/date/amount/total raised.
- `investment_co_investors`: Co-investor names/firms/URLs.
- `source_observations`: Raw structured provenance, evidence hash, concise excerpt, and confidence.

## User-facing views

- `investor_directory_cards`: Investor profile card data: name, firm, URLs, location, stage/sector/geo arrays, investment range, sweet spot, fund size, source confidence.
- `investor_portfolio_with_ceos`: Investor portfolio rows joined to companies and CEOs/founders where known.

## Lead magnet UX use cases

1. User picks target round + verticals + regions.
2. App queries `investor_directory_cards` for matching `stages`, `sectors`, and `geographies`.
3. App shows a curated list of investor cards with:
   - investor name and firm,
   - source URL,
   - stage/sector/geographic tags,
   - investment range/sweet spot where known,
   - confidence/provenance indicator,
   - portfolio company examples.
4. App queries `investor_portfolio_with_ceos` for selected investors to show:
   - company invested in,
   - round/date/amount where known,
   - CEO/founder where publicly sourced,
   - source URL and confidence.
5. App still keeps form input categorical-only and does not ask users to submit confidential investor strategy, financing details, deck materials, or trade secrets.

## Import workflow

Dry-run validation:

```bash
python3 scripts/investor_directory_import.py data/investor-directory/samples/signal_angela_tran_seed.jsonl
```

Apply after Supabase migration and source/license approval:

```bash
SUPABASE_URL="https://<project>.supabase.co" \
SUPABASE_SERVICE_ROLE_KEY="<service-role-key>" \
python3 scripts/investor_directory_import.py data/investor-directory/samples/signal_angela_tran_seed.jsonl --apply
```

For public Signal crawling, use a separate crawler that:

- starts from approved public list URLs,
- stores fetched HTML/markdown only in a private cache if necessary,
- writes only structured facts + concise excerpts to JSONL,
- respects `Crawl-delay: 8`,
- records source URL, observed timestamp, and evidence hash,
- stops if rate-limited, blocked, or source terms change.

## Acceptance criteria

- Supabase migration creates normalized tables, views, RLS read policies for curated data, and no public read policy for raw import batches/source observations.
- Importer validates JSONL without credentials in dry-run mode.
- Importer requires `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` for `--apply`.
- PitchBook is represented as licensed-import-only, not scraped.
- Every investor/company/investment/person record can carry at least one source URL and confidence value.
- CEO/founder fields are optional but source-required when present.
- User-facing app should show source/confidence and avoid legal or investment advice language.

## Approval gates before expanding beyond the fixture

1. Source/legal approval for bulk Signal crawling and public lead-magnet use.
2. Licensed-data approval before any PitchBook ingest.
3. Supabase project/keys and target environment confirmation.
4. App UX decision: public searchable directory vs. gated report-only matching.
5. Privacy/security review for RLS and whether raw provenance should stay service-role only.
6. Deployment approval before connecting live Supabase data to `learn.schellip.com`.
