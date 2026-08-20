# Supabase Setup

This wedding site **requires** a Supabase project. Copy `.env.example` to `.env`
and fill in your project values, then create the following in the Supabase dashboard.

## 1. Environment

```
VITE_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
VITE_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-anon-public-key
VITE_ADMIN_PASSWORD=admin123   # optional
```

## 2. Database tables + Storage + RLS (one script)

Run this entire SQL in the Supabase **SQL Editor** (it creates the tables,
the storage bucket, and the access policies all at once):

```sql
-- Site content (single row, keyed by site_id)
create table if not exists site_content (
  site_id text primary key,
  data jsonb not null,
  updated_at timestamptz default now()
);

-- Blessings / du'as submitted by guests
create table if not exists duas (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  text text not null,
  date text,
  created_at timestamptz default now()
);

-- Storage bucket for gallery images
insert into storage.buckets (id, name, public)
values ('sites', 'sites', true)
on conflict (id) do nothing;

-- Row Level Security: allow public read/write (simple wedding site)
alter table site_content enable row level security;
create policy if not exists "site_content read"  on site_content for select using (true);
create policy if not exists "site_content write" on site_content for insert with check (true);
create policy if not exists "site_content update" on site_content for update using (true);

alter table duas enable row level security;
create policy if not exists "duas read"   on duas for select using (true);
create policy if not exists "duas insert" on duas for insert with check (true);
create policy if not exists "duas delete" on duas for delete using (true);

-- Storage policies for the "sites" bucket
create policy if not exists "sites read"   on storage.objects for select using (bucket_id = 'sites');
create policy if not exists "sites insert" on storage.objects for insert with check (bucket_id = 'sites');
create policy if not exists "sites delete" on storage.objects for delete using (bucket_id = 'sites');
```

> If you prefer, you can also create the `sites` bucket manually in
> **Storage → New bucket** (name it `sites`, set it **Public**).

## 3. Run

```
npm install
npm run dev
```

The admin panel is at `/admin.html` (password from `VITE_ADMIN_PASSWORD`).
Content changes sync live to the public site via Supabase Realtime.
