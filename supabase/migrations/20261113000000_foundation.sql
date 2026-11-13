-- Renaissance — Étape 1 : socle de données (cahier technique, section 5).
-- Migration NON destructive : création uniquement. Aucun DROP, aucun TRUNCATE.
-- Principes : organization_id sur chaque table métier, RLS activée partout,
-- aucune policy d'écriture publique (le formulaire écrit via une route serveur,
-- avec la clé service_role qui contourne la RLS et ne quitte jamais le serveur).

------------------------------------------------------------------------------
-- Types
------------------------------------------------------------------------------
create type public.app_role as enum
  ('admin', 'president', 'formateur', 'candidat', 'apprenant', 'professionnel');

------------------------------------------------------------------------------
-- Schéma privé pour les fonctions d'aide (non exposé par l'API Data)
------------------------------------------------------------------------------
create schema if not exists private;
revoke all on schema private from public, anon;
grant usage on schema private to authenticated;

create or replace function private.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

------------------------------------------------------------------------------
-- organizations
------------------------------------------------------------------------------
create table public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  created_at timestamptz not null default now()
);

------------------------------------------------------------------------------
-- profiles (lié à auth.users)
------------------------------------------------------------------------------
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  organization_id uuid not null references public.organizations (id),
  role public.app_role not null default 'candidat',
  full_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index profiles_organization_id_idx on public.profiles (organization_id);
create trigger profiles_set_updated_at before update on public.profiles
  for each row execute function private.set_updated_at();

------------------------------------------------------------------------------
-- Fonctions SECURITY DEFINER (évitent la récursion de RLS sur profiles).
-- Nommée current_app_role() et non current_role() : CURRENT_ROLE est un mot
-- réservé SQL qui renverrait le rôle Postgres de connexion, pas le rôle métier.
------------------------------------------------------------------------------
create or replace function private.current_org_id()
returns uuid
language sql
stable
security definer
set search_path = ''
as $$
  select organization_id from public.profiles where id = (select auth.uid())
$$;

create or replace function private.current_app_role()
returns public.app_role
language sql
stable
security definer
set search_path = ''
as $$
  select role from public.profiles where id = (select auth.uid())
$$;

revoke all on function private.current_org_id() from public, anon;
revoke all on function private.current_app_role() from public, anon;
grant execute on function private.current_org_id() to authenticated;
grant execute on function private.current_app_role() to authenticated;

------------------------------------------------------------------------------
-- leads : préinscriptions
------------------------------------------------------------------------------
create table public.leads (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations (id),
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text,
  formation_visee text not null
    check (formation_visee in
      ('accueil-familial', 'animation-vie-sociale', 'dame-de-compagnie', 'autre')),
  zone text,                      -- commune ou département
  disponibilites text,
  message text,
  source text,                    -- ex. page d'origine / canal
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_term text,
  utm_content text,
  consent_rgpd boolean not null check (consent_rgpd is true),
  consent_at timestamptz not null,
  consent_text_version text not null,
  status text not null default 'nouveau'
    check (status in ('nouveau', 'contacte', 'qualifie', 'inscrit', 'perdu')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index leads_organization_id_idx on public.leads (organization_id);
create index leads_created_at_idx on public.leads (organization_id, created_at desc);
create index leads_email_idx on public.leads (organization_id, lower(email));
create trigger leads_set_updated_at before update on public.leads
  for each row execute function private.set_updated_at();

------------------------------------------------------------------------------
-- events : journal d'événements
------------------------------------------------------------------------------
create table public.events (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations (id),
  lead_id uuid references public.leads (id) on delete set null,
  type text not null,             -- ex. lead.created, email.sent
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
create index events_organization_id_idx on public.events (organization_id);
create index events_lead_id_idx on public.events (lead_id);

------------------------------------------------------------------------------
-- Étape 2 : tables créées vides
------------------------------------------------------------------------------
create table public.pipeline_stages (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations (id),
  name text not null,
  position integer not null default 0,
  created_at timestamptz not null default now()
);
create index pipeline_stages_organization_id_idx on public.pipeline_stages (organization_id);

create table public.appointments (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations (id),
  lead_id uuid references public.leads (id) on delete set null,
  starts_at timestamptz not null,
  status text not null default 'prevu',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index appointments_organization_id_idx on public.appointments (organization_id);
create index appointments_lead_id_idx on public.appointments (lead_id);
create trigger appointments_set_updated_at before update on public.appointments
  for each row execute function private.set_updated_at();

create table public.payments (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations (id),
  lead_id uuid references public.leads (id) on delete set null,
  amount_cents integer not null check (amount_cents >= 0),
  currency text not null default 'eur',
  stripe_payment_intent_id text unique,
  status text not null default 'en_attente',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index payments_organization_id_idx on public.payments (organization_id);
create index payments_lead_id_idx on public.payments (lead_id);
create trigger payments_set_updated_at before update on public.payments
  for each row execute function private.set_updated_at();

------------------------------------------------------------------------------
-- Tables réservées pour la suite : structure minimale + organization_id
------------------------------------------------------------------------------
create table public.sessions (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations (id),
  created_at timestamptz not null default now()
);
create index sessions_organization_id_idx on public.sessions (organization_id);

create table public.attendances (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations (id),
  session_id uuid references public.sessions (id) on delete cascade,
  created_at timestamptz not null default now()
);
create index attendances_organization_id_idx on public.attendances (organization_id);
create index attendances_session_id_idx on public.attendances (session_id);

create table public.messages (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations (id),
  created_at timestamptz not null default now()
);
create index messages_organization_id_idx on public.messages (organization_id);

------------------------------------------------------------------------------
-- RLS : activée partout
------------------------------------------------------------------------------
alter table public.organizations   enable row level security;
alter table public.profiles        enable row level security;
alter table public.leads           enable row level security;
alter table public.events          enable row level security;
alter table public.pipeline_stages enable row level security;
alter table public.appointments    enable row level security;
alter table public.payments        enable row level security;
alter table public.sessions        enable row level security;
alter table public.attendances     enable row level security;
alter table public.messages        enable row level security;

-- Moindre privilège : rien pour anon ; authenticated limité au strict besoin.
revoke all on all tables in schema public from anon;
revoke all on all tables in schema public from authenticated;

grant select on public.organizations to authenticated;
grant select on public.profiles to authenticated;
grant select, update on public.leads to authenticated;
grant select on public.events to authenticated;
grant select, insert, update, delete on
  public.pipeline_stages, public.appointments, public.payments,
  public.sessions, public.attendances, public.messages
  to authenticated;

------------------------------------------------------------------------------
-- Policies (aucune policy pour anon ; aucune écriture publique)
------------------------------------------------------------------------------
create policy organizations_select_own on public.organizations
  for select to authenticated
  using (id = (select private.current_org_id()));

create policy profiles_select_self on public.profiles
  for select to authenticated
  using (id = (select auth.uid()));

create policy profiles_select_staff on public.profiles
  for select to authenticated
  using (
    organization_id = (select private.current_org_id())
    and (select private.current_app_role()) in ('admin', 'president')
  );

create policy leads_select_staff on public.leads
  for select to authenticated
  using (
    organization_id = (select private.current_org_id())
    and (select private.current_app_role()) in ('admin', 'president')
  );

create policy leads_update_staff on public.leads
  for update to authenticated
  using (
    organization_id = (select private.current_org_id())
    and (select private.current_app_role()) in ('admin', 'president')
  )
  with check (organization_id = (select private.current_org_id()));

create policy events_select_staff on public.events
  for select to authenticated
  using (
    organization_id = (select private.current_org_id())
    and (select private.current_app_role()) in ('admin', 'president')
  );

create policy pipeline_stages_staff on public.pipeline_stages
  for all to authenticated
  using (
    organization_id = (select private.current_org_id())
    and (select private.current_app_role()) in ('admin', 'president')
  )
  with check (organization_id = (select private.current_org_id()));

create policy appointments_staff on public.appointments
  for all to authenticated
  using (
    organization_id = (select private.current_org_id())
    and (select private.current_app_role()) in ('admin', 'president')
  )
  with check (organization_id = (select private.current_org_id()));

create policy payments_staff on public.payments
  for all to authenticated
  using (
    organization_id = (select private.current_org_id())
    and (select private.current_app_role()) in ('admin', 'president')
  )
  with check (organization_id = (select private.current_org_id()));

create policy sessions_staff on public.sessions
  for all to authenticated
  using (
    organization_id = (select private.current_org_id())
    and (select private.current_app_role()) in ('admin', 'president')
  )
  with check (organization_id = (select private.current_org_id()));

create policy attendances_staff on public.attendances
  for all to authenticated
  using (
    organization_id = (select private.current_org_id())
    and (select private.current_app_role()) in ('admin', 'president')
  )
  with check (organization_id = (select private.current_org_id()));

create policy messages_staff on public.messages
  for all to authenticated
  using (
    organization_id = (select private.current_org_id())
    and (select private.current_app_role()) in ('admin', 'president')
  )
  with check (organization_id = (select private.current_org_id()));

------------------------------------------------------------------------------
-- Schéma payload (Payload CMS, point 4) : isolé, inaccessible via l'API Data.
-- La RLS sera activée (sans policy) sur ses tables après les migrations Payload.
------------------------------------------------------------------------------
create schema if not exists payload;
revoke all on schema payload from public, anon, authenticated;

------------------------------------------------------------------------------
-- Donnée initiale : Renaissance = 1re organisation
------------------------------------------------------------------------------
insert into public.organizations (name, slug)
values ('Renaissance', 'renaissance')
on conflict (slug) do nothing;
