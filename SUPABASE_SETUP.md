# Supabase Setup

This wedding site **requires** a Supabase project. Copy `.env.example` to `.env`
and fill in your project values, then create the following in the Supabase dashboard.

## 1. Environment

```
VITE_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
VITE_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-anon-public-key
VITE_ADMIN_PASSWORD=admin123   # optional
```

## 2. Database tables

Run this SQL in the Supabase SQL editor:

```sql
-- Site content (single row, keyed by site_id)
create table site_content (
  site_id text primary key,
  data jsonb not null,
  updated_at timestamptz default now()
);

-- Blessings / du'as submitted by guests
create table duas (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  text text not null,
  date text,
  created_at timestamptz default now()
);
```

## 3. Storage bucket

Create a public bucket named `sites` (used for gallery image uploads).

## 4. Row Level Security (RLS)

For a simple public wedding site, allow anonymous read/write on both tables and
the bucket. (Tighten these for production as needed.)

```sql
alter table site_content enable row level security;
create policy "public read" on site_content for select using (true);
create policy "public write" on site_content for insert with check (true);
create policy "public update" on site_content for update using (true);

alter table duas enable row level security;
create policy "public read" on duas for select using (true);
create policy "public insert" on duas for insert with check (true);
create policy "public delete" on duas for delete using (true);
```

Storage: in Storage → Policies, allow public read on `sites`, and insert for
the anon role.

## 5. Run

```
npm install
npm run dev
```

The admin panel is at `/admin.html` (password from `VITE_ADMIN_PASSWORD`).
Content changes sync live to the public site via Supabase Realtime.
