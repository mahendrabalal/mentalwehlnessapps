-- Create mood_entries table for daily mood tracking
create table if not exists public.mood_entries (
  id uuid default gen_random_uuid() primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  mood_score integer not null check (mood_score >= 1 and mood_score <= 5),
  anxiety_level integer check (anxiety_level >= 1 and anxiety_level <= 10),
  energy_level integer check (energy_level >= 1 and energy_level <= 10),
  sleep_quality integer check (sleep_quality >= 1 and sleep_quality <= 10),
  stress_level integer check (stress_level >= 1 and stress_level <= 10),
  notes text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Create index for faster queries
create index if not exists mood_entries_user_id_idx on public.mood_entries(user_id);
create index if not exists mood_entries_created_at_idx on public.mood_entries(created_at);
create index if not exists mood_entries_user_created_idx on public.mood_entries(user_id, created_at);

-- Enable RLS (Row Level Security)
alter table public.mood_entries enable row level security;

-- Create RLS policy: Users can only see their own mood entries
create policy "Users can view their own mood entries"
  on public.mood_entries
  for select
  using (auth.uid() = user_id);

-- Create RLS policy: Users can only insert their own mood entries
create policy "Users can insert their own mood entries"
  on public.mood_entries
  for insert
  with check (auth.uid() = user_id);

-- Create RLS policy: Users can only update their own mood entries
create policy "Users can update their own mood entries"
  on public.mood_entries
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Create RLS policy: Users can only delete their own mood entries
create policy "Users can delete their own mood entries"
  on public.mood_entries
  for delete
  using (auth.uid() = user_id);
