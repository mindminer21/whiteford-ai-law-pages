-- Founder Library follow-up schedule for learn.schellip.com.
-- One row per email address. Only the server (service role) reads or writes these tables:
-- row level security is on with no policies, so the public anon/publishable keys get nothing.

create table if not exists public.founder_followups (
  email            text primary key check (email = lower(email) and length(email) <= 254),
  name             text not null,
  company          text not null,
  website          text,
  status           text not null default 'active'
                     check (status in ('active', 'replied', 'unsubscribed', 'completed', 'paused')),
  step             integer not null default 0,          -- follow-ups sent in the current sequence
  next_send_at     timestamptz,
  last_sent_at     timestamptz,
  last_tool_slug   text not null,
  last_tool_title  text not null,
  last_headline    text,
  last_signals     text[] not null default '{}',
  tools_used       text[] not null default '{}',
  thread_ids       text[] not null default '{}',      -- AgentMail threads to watch for replies
  sends_count      integer not null default 0,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create index if not exists founder_followups_due_idx
  on public.founder_followups (next_send_at)
  where status = 'active';

create table if not exists public.founder_tool_runs (
  id          bigint generated always as identity primary key,
  email       text not null,
  company     text not null,
  tool_slug   text not null,
  headline    text,
  signals     text[] not null default '{}',
  metrics     jsonb not null default '[]',
  created_at  timestamptz not null default now()
);

create index if not exists founder_tool_runs_email_idx on public.founder_tool_runs (email);

alter table public.founder_followups enable row level security;
alter table public.founder_tool_runs enable row level security;

-- Enrolls (or re-enrolls) a contact after they finish a tool.
--  * New contact: first follow-up in 2 days.
--  * Active or completed contact who uses another tool: the sequence restarts around the new tool,
--    but never sooner than 5 days after the last follow-up.
--  * Replied or unsubscribed contacts keep that status; only the tool history is updated.
create or replace function public.founder_followup_enroll(
  p_email text,
  p_name text,
  p_company text,
  p_website text,
  p_tool_slug text,
  p_tool_title text,
  p_headline text,
  p_signals text[],
  p_thread_id text
) returns public.founder_followups
language plpgsql
security invoker
set search_path = public
as $$
declare
  result public.founder_followups;
begin
  insert into public.founder_followups as f (
    email, name, company, website, last_tool_slug, last_tool_title, last_headline,
    last_signals, tools_used, thread_ids, next_send_at
  ) values (
    lower(p_email), p_name, p_company, p_website, p_tool_slug, p_tool_title, p_headline,
    coalesce(p_signals, '{}'), array[p_tool_slug],
    case when p_thread_id is null then '{}' else array[p_thread_id] end,
    now() + interval '2 days'
  )
  on conflict (email) do update set
    name            = excluded.name,
    company         = excluded.company,
    website         = coalesce(excluded.website, f.website),
    last_tool_slug  = excluded.last_tool_slug,
    last_tool_title = excluded.last_tool_title,
    last_headline   = excluded.last_headline,
    last_signals    = excluded.last_signals,
    tools_used      = case when p_tool_slug = any(f.tools_used) then f.tools_used else f.tools_used || p_tool_slug end,
    thread_ids      = case
                        when p_thread_id is null or p_thread_id = any(f.thread_ids) then f.thread_ids
                        else (f.thread_ids || p_thread_id)[greatest(1, cardinality(f.thread_ids) - 8):]
                      end,
    status          = case when f.status in ('replied', 'unsubscribed', 'paused') then f.status else 'active' end,
    step            = case when f.status in ('replied', 'unsubscribed', 'paused') then f.step else 0 end,
    next_send_at    = case
                        when f.status in ('replied', 'unsubscribed', 'paused') then f.next_send_at
                        else greatest(now() + interval '2 days', coalesce(f.last_sent_at + interval '5 days', now()))
                      end,
    updated_at      = now()
  returning * into result;
  return result;
end;
$$;

revoke all on function public.founder_followup_enroll(text, text, text, text, text, text, text, text[], text) from public, anon, authenticated;
grant execute on function public.founder_followup_enroll(text, text, text, text, text, text, text, text[], text) to service_role;
