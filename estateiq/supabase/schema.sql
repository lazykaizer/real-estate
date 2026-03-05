-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Enable PostGIS extension for Location/Map based queries
create extension if not exists postgis;

-- 1. Profiles Table (extends Supabase Auth users)
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  first_name text,
  last_name text,
  email text,
  avatar_url text,
  role text default 'user' check (role in ('user', 'agent', 'admin')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for profiles
alter table public.profiles enable row level security;
create policy "Public profiles are viewable by everyone." on public.profiles for select using (true);
create policy "Users can insert their own profile." on public.profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile." on public.profiles for update using (auth.uid() = id);

-- 2. Properties Table
create table public.properties (
  id uuid default uuid_generate_v4() primary key,
  owner_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  description text,
  property_type text not null check (property_type in ('apartment', 'house', 'villa', 'commercial', 'land')),
  listing_type text not null check (listing_type in ('sale', 'rent')),
  price numeric not null,
  currency text default 'INR',
  bedrooms integer,
  bathrooms integer,
  area_sqft numeric,
  location_address text not null,
  location_city text not null,
  location_state text,
  location_lat numeric,
  location_lng numeric,
  coordinates geometry(Point, 4326),
  images text[] default '{}',
  features text[] default '{}',
  status text default 'available' check (status in ('available', 'pending', 'sold', 'rented')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for properties
alter table public.properties enable row level security;
create policy "Properties are viewable by everyone." on public.properties for select using (true);
create policy "Authenticated users can create properties." on public.properties for insert with check (auth.role() = 'authenticated');
create policy "Users can update their own properties." on public.properties for update using (auth.uid() = owner_id);
create policy "Users can delete their own properties." on public.properties for delete using (auth.uid() = owner_id);

-- 3. Saved Properties Table (Favorites)
create table public.saved_properties (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  property_id uuid references public.properties(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, property_id)
);

-- Enable RLS for saved_properties
alter table public.saved_properties enable row level security;
create policy "Users can view their own saved properties." on public.saved_properties for select using (auth.uid() = user_id);
create policy "Users can save properties." on public.saved_properties for insert with check (auth.uid() = user_id);
create policy "Users can remove their saved properties." on public.saved_properties for delete using (auth.uid() = user_id);

-- 4. Create a function to handle new user signups & sync to profiles
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, first_name, last_name)
  values (
    new.id, 
    new.email, 
    new.raw_user_meta_data->>'firstName', 
    new.raw_user_meta_data->>'lastName'
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger the function every time an auth user is created
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
