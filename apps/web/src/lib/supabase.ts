import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import type { SupabaseClient } from '@supabase/supabase-js'
import { NextRequest } from 'next/server'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Singleton pattern to prevent multiple client instances
let supabaseInstance: SupabaseClient | null = null

export const createClient = () => {
  // Return existing instance if it exists
  if (supabaseInstance) {
    return supabaseInstance
  }

  // Validate environment variables
  if (!supabaseUrl || !supabaseAnonKey) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Missing Supabase environment variables:', {
        hasUrl: !!supabaseUrl,
        hasKey: !!supabaseAnonKey
      })
    }
    throw new Error('Supabase environment variables are not configured')
  }

  // Create new instance only if none exists
  supabaseInstance = createSupabaseClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storage: typeof window !== 'undefined' ? window.localStorage : undefined
    }
  })

  return supabaseInstance
}

// Create Supabase client for middleware with proper cookie handling
export const createMiddlewareClient = (req: NextRequest) => {
  // Validate environment variables
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase environment variables are not configured')
  }

  return createSupabaseClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false, // Don't persist in middleware
      autoRefreshToken: false, // Don't auto-refresh in middleware
      detectSessionInUrl: false
    },
    global: {
      headers: {
        'Cache-Control': 'no-cache',
      },
    },
  })
}