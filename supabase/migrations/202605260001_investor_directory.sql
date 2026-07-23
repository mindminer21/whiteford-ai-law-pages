-- Investor Directory schema for the Investor Outreach Kanban lead magnet.
-- Purpose: Supabase-ready, provenance-first investor/fundraising research data.
-- Safety posture: store structured facts, source URLs, and concise snippets; do not
-- bulk-copy restricted third-party databases without licensed/API rights.

create extension if not exists pgcrypto;

create table if not exists public.investor_sources (
  id uuid primary key default gen_random_uuid(),
  source_key text not null unique,
  display_name text not null,
  homepage_url text,
  terms_url text,
  source_type text not null check (source_type in ('public_web', 'licensed_export', 'api', 'manual_research', 'partner_provided')),
  access_policy text not null check (access_policy in ('public_link_only', 'crawl_with_delay', 'licensed_import_only', 'manual_only', 'api_only')),
  allowed_capture_scope text not null,
  attribution_required text,
  crawl_delay_seconds integer,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.investor_import_batches (
  id uuid primary key default gen_random_uuid(),
  source_id uuid references public.investor_sources(id) on delete set null,
  batch_key text not null unique,
  import_mode text not null check (import_mode in ('dry_run', 'staging', 'production')),
  source_url text,
  input_file text,
  started_at timestamptz not null default now(),
  completed_at timestamptz,
  record_count integer not null default 0,
  warning_count integer not null default 0,
  notes text
);

create table if not exists public.firms (
  id uuid primary key default gen_random_uuid(),
  canonical_name text not null unique,
  slug text unique,
  website_url text,
  signal_url text,
  pitchbook_url text,
  crunchbase_url text,
  linkedin_url text,
  headquarters text,
  source_confidence numeric(3,2) not null default 0.50 check (source_confidence >= 0 and source_confidence <= 1),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.investors (
  id uuid primary key default gen_random_uuid(),
  canonical_name text not null,
  slug text not null unique,
  investor_kind text check (investor_kind in ('vc', 'angel', 'scout', 'solo_capitalist', 'corporate_vc', 'accelerator', 'family_office', 'unknown')) default 'unknown',
  title text,
  primary_firm_id uuid references public.firms(id) on delete set null,
  primary_firm_name text,
  profile_url text not null,
  signal_url text,
  pitchbook_url text,
  crunchbase_url text,
  linkedin_url text,
  twitter_url text,
  personal_website_url text,
  location_city text,
  location_region text,
  location_country text,
  investment_min_usd integer,
  investment_max_usd integer,
  investment_sweet_spot_usd integer,
  current_fund_size_usd bigint,
  investments_on_record integer,
  summary text,
  source_confidence numeric(3,2) not null default 0.50 check (source_confidence >= 0 and source_confidence <= 1),
  first_seen_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint investor_profile_url_unique unique (profile_url)
);

create table if not exists public.investor_firm_roles (
  id uuid primary key default gen_random_uuid(),
  investor_id uuid not null references public.investors(id) on delete cascade,
  firm_id uuid references public.firms(id) on delete set null,
  firm_name text not null,
  role_title text,
  is_current boolean not null default true,
  start_year integer,
  end_year integer,
  source_url text,
  source_id uuid references public.investor_sources(id) on delete set null,
  unique (investor_id, firm_name, role_title, is_current)
);

create table if not exists public.investor_stages (
  id uuid primary key default gen_random_uuid(),
  investor_id uuid not null references public.investors(id) on delete cascade,
  stage text not null check (stage in ('Pre-Seed', 'Seed', 'Series A', 'Series B', 'Series C+', 'Growth', 'Unknown')),
  source_id uuid references public.investor_sources(id) on delete set null,
  source_url text,
  confidence numeric(3,2) not null default 0.70 check (confidence >= 0 and confidence <= 1),
  unique (investor_id, stage, source_url)
);

create table if not exists public.investor_sectors (
  id uuid primary key default gen_random_uuid(),
  investor_id uuid not null references public.investors(id) on delete cascade,
  sector text not null,
  stage text check (stage in ('Pre-Seed', 'Seed', 'Series A', 'Series B', 'Series C+', 'Growth', 'Unknown')),
  source_id uuid references public.investor_sources(id) on delete set null,
  source_url text,
  ranking_label text,
  confidence numeric(3,2) not null default 0.70 check (confidence >= 0 and confidence <= 1),
  source_hash text generated always as (md5(coalesce(source_url, ''))) stored
);

create table if not exists public.investor_geographies (
  id uuid primary key default gen_random_uuid(),
  investor_id uuid not null references public.investors(id) on delete cascade,
  geography text not null,
  source_id uuid references public.investor_sources(id) on delete set null,
  source_url text,
  geography_kind text check (geography_kind in ('investor_location', 'relationship_market', 'investment_interest', 'source_list')) default 'source_list',
  confidence numeric(3,2) not null default 0.60 check (confidence >= 0 and confidence <= 1),
  unique (investor_id, geography, geography_kind, source_url)
);

create table if not exists public.companies (
  id uuid primary key default gen_random_uuid(),
  canonical_name text not null,
  slug text not null unique,
  website_url text,
  signal_url text,
  pitchbook_url text,
  crunchbase_url text,
  linkedin_url text,
  headquarters text,
  sector text,
  summary text,
  source_confidence numeric(3,2) not null default 0.50 check (source_confidence >= 0 and source_confidence <= 1),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint companies_name_unique unique (canonical_name)
);

create table if not exists public.company_people (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  person_name text not null,
  role_title text not null,
  role_kind text not null check (role_kind in ('ceo', 'founder', 'cofounder', 'president', 'executive', 'unknown')),
  linkedin_url text,
  source_id uuid references public.investor_sources(id) on delete set null,
  source_url text,
  source_confidence numeric(3,2) not null default 0.50 check (source_confidence >= 0 and source_confidence <= 1),
  last_verified_at timestamptz,
  unique (company_id, person_name, role_kind, source_url)
);

create table if not exists public.investments (
  id uuid primary key default gen_random_uuid(),
  investor_id uuid not null references public.investors(id) on delete cascade,
  company_id uuid not null references public.companies(id) on delete cascade,
  round_stage text,
  round_date date,
  round_month text,
  round_size_usd bigint,
  total_raised_usd bigint,
  investor_role text check (investor_role in ('lead', 'co-investor', 'participant', 'unknown')) default 'unknown',
  source_id uuid references public.investor_sources(id) on delete set null,
  source_url text,
  source_confidence numeric(3,2) not null default 0.60 check (source_confidence >= 0 and source_confidence <= 1),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  source_hash text generated always as (md5(coalesce(source_url, ''))) stored
);

create table if not exists public.investment_co_investors (
  id uuid primary key default gen_random_uuid(),
  investment_id uuid not null references public.investments(id) on delete cascade,
  co_investor_name text not null,
  co_investor_signal_url text,
  co_investor_firm_name text,
  co_investor_firm_url text,
  source_url text,
  unique (investment_id, co_investor_name)
);

create table if not exists public.source_observations (
  id uuid primary key default gen_random_uuid(),
  source_id uuid references public.investor_sources(id) on delete set null,
  batch_id uuid references public.investor_import_batches(id) on delete set null,
  entity_type text not null check (entity_type in ('investor', 'firm', 'company', 'company_person', 'investment', 'co_investor', 'source_list')),
  entity_slug text,
  source_url text not null,
  observed_at timestamptz not null default now(),
  evidence_hash text,
  evidence_excerpt text,
  structured_payload jsonb not null default '{}'::jsonb,
  confidence numeric(3,2) not null default 0.50 check (confidence >= 0 and confidence <= 1)
);

create index if not exists idx_investors_name on public.investors using gin (to_tsvector('english', canonical_name || ' ' || coalesce(primary_firm_name, '') || ' ' || coalesce(summary, '')));
create index if not exists idx_investor_sectors_sector_stage on public.investor_sectors (sector, stage);
create unique index if not exists idx_investor_sectors_unique_source on public.investor_sectors (investor_id, sector, coalesce(stage, 'Unknown'), source_hash);
create index if not exists idx_investor_geographies_geo on public.investor_geographies (geography);
create index if not exists idx_investor_stages_stage on public.investor_stages (stage);
create index if not exists idx_investments_investor on public.investments (investor_id);
create index if not exists idx_investments_company on public.investments (company_id);
create unique index if not exists idx_investments_unique_source on public.investments (investor_id, company_id, coalesce(round_stage, 'Unknown'), coalesce(round_month, 'Unknown'), source_hash);
create index if not exists idx_company_people_role on public.company_people (role_kind);
create index if not exists idx_source_observations_payload on public.source_observations using gin (structured_payload);
create unique index if not exists idx_source_observations_evidence_hash on public.source_observations (evidence_hash);

create or replace view public.investor_directory_cards as
select
  i.id,
  i.canonical_name,
  i.slug,
  i.investor_kind,
  i.title,
  i.primary_firm_name,
  i.profile_url,
  i.signal_url,
  i.pitchbook_url,
  i.crunchbase_url,
  i.linkedin_url,
  i.twitter_url,
  i.location_city,
  i.location_region,
  i.location_country,
  i.investment_min_usd,
  i.investment_max_usd,
  i.investment_sweet_spot_usd,
  i.current_fund_size_usd,
  i.investments_on_record,
  coalesce(array_remove(array_agg(distinct ist.stage), null), '{}') as stages,
  coalesce(array_remove(array_agg(distinct isec.sector), null), '{}') as sectors,
  coalesce(array_remove(array_agg(distinct geo.geography), null), '{}') as geographies,
  i.source_confidence,
  i.last_seen_at
from public.investors i
left join public.investor_stages ist on ist.investor_id = i.id
left join public.investor_sectors isec on isec.investor_id = i.id
left join public.investor_geographies geo on geo.investor_id = i.id
group by i.id;

create or replace view public.investor_portfolio_with_ceos as
select
  inv.id as investor_id,
  inv.canonical_name as investor_name,
  inv.profile_url as investor_url,
  co.canonical_name as company_name,
  co.website_url as company_url,
  co.crunchbase_url as company_crunchbase_url,
  p.person_name as ceo_or_founder_name,
  p.role_title as ceo_or_founder_title,
  p.linkedin_url as ceo_or_founder_linkedin_url,
  investments.round_stage,
  investments.round_month,
  investments.round_size_usd,
  investments.total_raised_usd,
  investments.source_url as investment_source_url,
  investments.source_confidence
from public.investments investments
join public.investors inv on inv.id = investments.investor_id
join public.companies co on co.id = investments.company_id
left join public.company_people p on p.company_id = co.id and p.role_kind in ('ceo', 'founder', 'cofounder');

alter table public.investor_sources enable row level security;
alter table public.investor_import_batches enable row level security;
alter table public.firms enable row level security;
alter table public.investors enable row level security;
alter table public.investor_firm_roles enable row level security;
alter table public.investor_stages enable row level security;
alter table public.investor_sectors enable row level security;
alter table public.investor_geographies enable row level security;
alter table public.companies enable row level security;
alter table public.company_people enable row level security;
alter table public.investments enable row level security;
alter table public.investment_co_investors enable row level security;
alter table public.source_observations enable row level security;

-- Public app users can read curated directory data. Raw import batches and raw
-- source observations intentionally remain service-role/admin only.
do $$
begin
  create policy investor_sources_public_read on public.investor_sources for select to anon, authenticated using (true);
exception when duplicate_object then null;
end $$;

do $$
begin
  create policy firms_public_read on public.firms for select to anon, authenticated using (true);
exception when duplicate_object then null;
end $$;

do $$
begin
  create policy investors_public_read on public.investors for select to anon, authenticated using (true);
exception when duplicate_object then null;
end $$;

do $$
begin
  create policy investor_firm_roles_public_read on public.investor_firm_roles for select to anon, authenticated using (true);
exception when duplicate_object then null;
end $$;

do $$
begin
  create policy investor_stages_public_read on public.investor_stages for select to anon, authenticated using (true);
exception when duplicate_object then null;
end $$;

do $$
begin
  create policy investor_sectors_public_read on public.investor_sectors for select to anon, authenticated using (true);
exception when duplicate_object then null;
end $$;

do $$
begin
  create policy investor_geographies_public_read on public.investor_geographies for select to anon, authenticated using (true);
exception when duplicate_object then null;
end $$;

do $$
begin
  create policy companies_public_read on public.companies for select to anon, authenticated using (true);
exception when duplicate_object then null;
end $$;

do $$
begin
  create policy company_people_public_read on public.company_people for select to anon, authenticated using (true);
exception when duplicate_object then null;
end $$;

do $$
begin
  create policy investments_public_read on public.investments for select to anon, authenticated using (true);
exception when duplicate_object then null;
end $$;

do $$
begin
  create policy investment_co_investors_public_read on public.investment_co_investors for select to anon, authenticated using (true);
exception when duplicate_object then null;
end $$;

insert into public.investor_sources (
  source_key,
  display_name,
  homepage_url,
  terms_url,
  source_type,
  access_policy,
  allowed_capture_scope,
  attribution_required,
  crawl_delay_seconds,
  notes
) values
  (
    'signal_nfx',
    'NFX Signal',
    'https://signal.nfx.com',
    'https://signal.nfx.com/terms',
    'public_web',
    'crawl_with_delay',
    'Structured facts from public profile/list pages with source URLs, concise excerpts, and robots.txt crawl-delay compliance. Do not store intro-path/email-graph/private account data.',
    'Source: NFX Signal',
    8,
    'Signal robots.txt includes Crawl-delay: 8 and disallows /investors$ but not individual public profile URLs. Treat as public-source directory data with caution and attribution.'
  ),
  (
    'pitchbook',
    'PitchBook',
    'https://pitchbook.com',
    'https://pitchbook.com/terms-of-use',
    'licensed_export',
    'licensed_import_only',
    'Licensed export/API rows only. Do not scrape PitchBook pages or use scraped data. Terms restrict systematic scraping and AI/ML use of Content unless separately licensed.',
    'Source: PitchBook Data, Inc. where permitted by license',
    null,
    'Requires Jeff/Whiteford license review before import into a user-facing lead magnet database.'
  ),
  (
    'manual_public_research',
    'Manual public research',
    null,
    null,
    'manual_research',
    'manual_only',
    'Founder/CEO/company facts gathered from public company websites, press releases, SEC/state filings, or approved public profiles with source URLs.',
    'Source shown per row',
    null,
    'Use to fill CEO/founder gaps where directory sources do not list executives.'
  )
on conflict (source_key) do update set
  display_name = excluded.display_name,
  homepage_url = excluded.homepage_url,
  terms_url = excluded.terms_url,
  source_type = excluded.source_type,
  access_policy = excluded.access_policy,
  allowed_capture_scope = excluded.allowed_capture_scope,
  attribution_required = excluded.attribution_required,
  crawl_delay_seconds = excluded.crawl_delay_seconds,
  notes = excluded.notes,
  updated_at = now();
