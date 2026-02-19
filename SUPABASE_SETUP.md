# Supabase Setup Guide

## 1. Create Supabase Project
Go to https://supabase.com → New Project → note your project URL and API keys.

## 2. Environment Variables
Create `.env.local` in the project root (already gitignored):
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_SITE_URL=https://www.aclcs.com
```
Add these same variables to Vercel → Project Settings → Environment Variables.

## 3. Run this SQL in Supabase SQL Editor

```sql
-- ─────────────────────────────────────────
-- EXTENSIONS
-- ─────────────────────────────────────────
create extension if not exists "pgcrypto";

-- ─────────────────────────────────────────
-- PROFILES
-- ─────────────────────────────────────────
create table if not exists profiles (
  id            uuid primary key references auth.users(id) on delete cascade,
  full_name     text not null default '',
  email         text not null default '',
  phone         text,
  nationality   text,
  role          text not null default 'client' check (role in ('admin','client')),
  status        text not null default 'pending' check (status in ('active','pending','suspended')),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- ─────────────────────────────────────────
-- CASES
-- ─────────────────────────────────────────
create sequence if not exists case_ref_seq start 1;

create table if not exists cases (
  id               uuid primary key default gen_random_uuid(),
  client_id        uuid not null references profiles(id) on delete cascade,
  reference_number text not null unique,
  title            text not null,
  type             text not null check (type in ('cyprus','europe','outside-europe')),
  status           text not null default 'enquiry'
                     check (status in ('enquiry','documents_required','under_review','submitted','approved','completed')),
  notes            text,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

-- ─────────────────────────────────────────
-- CASE UPDATES
-- ─────────────────────────────────────────
create table if not exists case_updates (
  id          uuid primary key default gen_random_uuid(),
  case_id     uuid not null references cases(id) on delete cascade,
  author_id   uuid not null references profiles(id),
  content     text not null,
  is_internal boolean not null default false,
  created_at  timestamptz not null default now()
);

-- ─────────────────────────────────────────
-- DOCUMENTS
-- ─────────────────────────────────────────
create table if not exists documents (
  id          uuid primary key default gen_random_uuid(),
  case_id     uuid not null references cases(id) on delete cascade,
  name        text not null,
  file_path   text not null,
  uploaded_by uuid not null references profiles(id),
  category    text not null default 'submitted' check (category in ('required','submitted','issued')),
  size        bigint not null default 0,
  mime_type   text not null default '',
  created_at  timestamptz not null default now()
);

-- ─────────────────────────────────────────
-- NOTIFICATIONS
-- ─────────────────────────────────────────
create table if not exists notifications (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references profiles(id) on delete cascade,
  title      text not null,
  message    text not null,
  type       text not null default 'info' check (type in ('info','success','warning','action')),
  read       boolean not null default false,
  link       text,
  created_at timestamptz not null default now()
);

-- ─────────────────────────────────────────
-- TRIGGERS & FUNCTIONS
-- ─────────────────────────────────────────

-- Auto-create profile on signup
create or replace function handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into profiles (id, email, full_name, phone, nationality)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    new.raw_user_meta_data->>'phone',
    new.raw_user_meta_data->>'nationality'
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();

-- Auto-update updated_at
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_profiles_updated_at on profiles;
create trigger set_profiles_updated_at
  before update on profiles
  for each row execute function set_updated_at();

drop trigger if exists set_cases_updated_at on cases;
create trigger set_cases_updated_at
  before update on cases
  for each row execute function set_updated_at();

-- Auto-generate case reference ACLCS-YYYY-NNNN
create or replace function generate_case_reference()
returns trigger language plpgsql as $$
begin
  new.reference_number = 'ACLCS-' || to_char(now(), 'YYYY') || '-' ||
    lpad(nextval('case_ref_seq')::text, 4, '0');
  return new;
end;
$$;

drop trigger if exists set_case_reference on cases;
create trigger set_case_reference
  before insert on cases
  for each row execute function generate_case_reference();

-- Helper: get caller role (used by RLS)
create or replace function get_my_role()
returns text language sql security definer stable as $$
  select role from profiles where id = auth.uid()
$$;

-- ─────────────────────────────────────────
-- ROW LEVEL SECURITY
-- ─────────────────────────────────────────
alter table profiles enable row level security;
alter table cases enable row level security;
alter table case_updates enable row level security;
alter table documents enable row level security;
alter table notifications enable row level security;

-- PROFILES
create policy "Users can view own profile" on profiles
  for select using (auth.uid() = id);
create policy "Users can update own profile" on profiles
  for update using (auth.uid() = id);
create policy "Admins can view all profiles" on profiles
  for select using (get_my_role() = 'admin');
create policy "Admins can update all profiles" on profiles
  for update using (get_my_role() = 'admin');

-- CASES
create policy "Clients view own cases" on cases
  for select using (client_id = auth.uid());
create policy "Admins full access to cases" on cases
  for all using (get_my_role() = 'admin');

-- CASE UPDATES
create policy "Clients view non-internal updates" on case_updates
  for select using (
    is_internal = false and
    exists (select 1 from cases where cases.id = case_id and cases.client_id = auth.uid())
  );
create policy "Clients insert updates" on case_updates
  for insert with check (
    author_id = auth.uid() and
    is_internal = false and
    exists (select 1 from cases where cases.id = case_id and cases.client_id = auth.uid())
  );
create policy "Admins full access to case updates" on case_updates
  for all using (get_my_role() = 'admin');

-- DOCUMENTS
create policy "Clients view own case documents" on documents
  for select using (
    exists (select 1 from cases where cases.id = case_id and cases.client_id = auth.uid())
  );
create policy "Clients insert documents to own cases" on documents
  for insert with check (
    uploaded_by = auth.uid() and
    exists (select 1 from cases where cases.id = case_id and cases.client_id = auth.uid())
  );
create policy "Clients delete own uploaded documents" on documents
  for delete using (uploaded_by = auth.uid());
create policy "Admins full access to documents" on documents
  for all using (get_my_role() = 'admin');

-- NOTIFICATIONS
create policy "Users view own notifications" on notifications
  for select using (user_id = auth.uid());
create policy "Users update own notifications" on notifications
  for update using (user_id = auth.uid());
create policy "Admins insert notifications" on notifications
  for insert with check (get_my_role() = 'admin');

-- ─────────────────────────────────────────
-- STORAGE
-- ─────────────────────────────────────────
-- Run in Supabase Dashboard → Storage → New Bucket:
-- Name: case-documents
-- Public: NO (private bucket)
--
-- Then add these storage policies in the Storage section:
-- Policy 1: Clients can upload to their own case folders
-- Policy 2: Clients can download from their own case folders
-- Policy 3: Admins have full access
-- (Use the Supabase Dashboard UI or add via SQL below)

insert into storage.buckets (id, name, public)
values ('case-documents', 'case-documents', false)
on conflict (id) do nothing;

create policy "Clients upload to own case" on storage.objects
  for insert with check (
    bucket_id = 'case-documents' and
    auth.uid() is not null
  );

create policy "Admins full storage access" on storage.objects
  for all using (
    bucket_id = 'case-documents' and
    get_my_role() = 'admin'
  );

create policy "Clients access own case files" on storage.objects
  for select using (
    bucket_id = 'case-documents' and
    auth.uid() is not null
  );
```

## 4. Create First Admin User

After running the SQL:
1. Go to Supabase → Authentication → Users → Invite user (your email)
2. After signup, go to Supabase → Table Editor → profiles
3. Find your user row, change `role` to `admin` and `status` to `active`

## 5. Auth Email Settings (Optional but recommended)
Go to Supabase → Authentication → Email Templates and customize:
- Confirm signup
- Invite user
- Reset password

Set Site URL to: `https://www.aclcs.com`
Add redirect URLs: `https://www.aclcs.com/api/auth/confirm`
