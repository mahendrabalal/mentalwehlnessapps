import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import type { User, Session } from '@supabase/supabase-js'

interface UseAuthReturn {
  user: User | null
  session: Session | null
  loading: boolean
  error: Error | null
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const supabase = createClient()

  useEffect(() => {
    checkUser()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session)
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const checkUser = async () => {
    try {
      setError(null)
      const { data: { session }, error } = await supabase.auth.getSession()

      if (error) {
        throw error
      }

      setSession(session)
      setUser(session?.user ?? null)
    } catch (err) {
      console.error('Error checking user:', err)
      setError(err as Error)
      setSession(null)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  return {
    user,
    session,
    loading,
    error
  }
}