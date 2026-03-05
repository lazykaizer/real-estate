-- Agents Table for EstateIQ
-- Run this in your Supabase SQL Editor

create table if not exists public.agents (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete set null,
  name text not null,
  photo text,
  brokerage text,
  license_number text,
  years_experience integer default 0,
  specialisations text[] default '{}',
  languages text[] default '{}',
  rating numeric default 0,
  review_count integer default 0,
  deals_closed integer default 0,
  bio text,
  email text,
  active_listings integer default 0,
  service_areas text[] default '{}',
  subscription_tier text default 'free' check (subscription_tier in ('free', 'basic', 'premium')),
  response_time text default '< 1 hour',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for agents
alter table public.agents enable row level security;
create policy "Agents are viewable by everyone." on public.agents for select using (true);
create policy "Authenticated users can create agents." on public.agents for insert with check (auth.role() = 'authenticated');
create policy "Users can update their own agent profile." on public.agents for update using (auth.uid() = user_id);
