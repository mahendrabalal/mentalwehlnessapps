import { z } from 'zod'

// PHQ-9 Depression Assessment Schema
export const phq9Schema = z.object({
  user_id: z.string().uuid(),
  responses: z.array(z.number().min(0).max(3)).length(9),
  total_score: z.number().min(0).max(27),
  severity: z.enum(['minimal', 'mild', 'moderate', 'moderately_severe', 'severe']),
  taken_at: z.date(),
})

// GAD-7 Anxiety Assessment Schema
export const gad7Schema = z.object({
  user_id: z.string().uuid(),
  responses: z.array(z.number().min(0).max(3)).length(7),
  total_score: z.number().min(0).max(21),
  severity: z.enum(['minimal', 'mild', 'moderate', 'severe']),
  taken_at: z.date(),
})

// Mood Entry Schema
export const moodEntrySchema = z.object({
  user_id: z.string().uuid(),
  mood_score: z.number().min(1).max(10),
  energy_level: z.number().min(1).max(10),
  anxiety_level: z.number().min(1).max(10),
  notes: z.string().optional(),
  created_at: z.date(),
})

// Crisis Contact Schema
export const crisisContactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  phone: z.string().regex(/^\+?[1-9]\d{0,15}$/, 'Invalid phone number'),
  relationship: z.string().min(1, 'Relationship is required'),
  is_primary: z.boolean().default(false),
})

// User Profile Schema
export const userProfileSchema = z.object({
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  date_of_birth: z.date(),
  timezone: z.string().default('UTC'),
  crisis_contacts: z.array(crisisContactSchema).max(5),
  emergency_protocols_enabled: z.boolean().default(true),
})

// Validation helpers
export function calculatePHQ9Severity(score: number): string {
  if (score <= 4) return 'minimal'
  if (score <= 9) return 'mild'
  if (score <= 14) return 'moderate'
  if (score <= 19) return 'moderately_severe'
  return 'severe'
}

export function calculateGAD7Severity(score: number): string {
  if (score <= 4) return 'minimal'
  if (score <= 9) return 'mild'
  if (score <= 14) return 'moderate'
  return 'severe'
}

export function isCrisisScore(phq9Score?: number, gad7Score?: number): boolean {
  return (phq9Score !== undefined && phq9Score >= 20) ||
         (gad7Score !== undefined && gad7Score >= 15)
}
