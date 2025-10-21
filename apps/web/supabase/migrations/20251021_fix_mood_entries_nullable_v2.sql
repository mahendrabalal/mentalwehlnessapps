-- Fix mood_entries table: Make optional columns nullable
-- This fixes the "not-null constraint" error when saving moods with only mood_score
-- Version 2: ALTER instead of DROP (table already exists)

-- Alter columns to be nullable
alter table public.mood_entries
  alter column anxiety_level drop not null,
  alter column energy_level drop not null,
  alter column sleep_quality drop not null,
  alter column stress_level drop not null,
  alter column notes drop not null;

-- Verify the changes
-- SELECT column_name, is_nullable, data_type FROM information_schema.columns
-- WHERE table_name = 'mood_entries' ORDER BY ordinal_position;
-- COMMIT;
