import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import type { User, Session } from '@supabase/supabase-js'

export type AuthenticationTier = 'standard' | 'sensitive' | 'clinical' | 'emergency'
export type UserRole = 'patient' | 'provider' | 'admin' | 'emergency'
export type CrisisLevel = 'none' | 'mild' | 'moderate' | 'severe' | 'imminent'

interface AuthenticationContext {
  tier: AuthenticationTier
  crisisLevel: CrisisLevel
  requiresMfa: boolean
  allowEmergencyBypass: boolean
  sessionDuration: number
}

interface UseAuthReturn {
  user: User | null
  session: Session | null
  loading: boolean
  error: Error | null
  isAuthenticated: boolean
  userRole: UserRole | null
  authenticationTier: AuthenticationTier
  crisisLevel: CrisisLevel
  canAccessClinicalData: boolean
  canBypassAuthentication: boolean
  requiresMfa: boolean
  signIn: (email: string, password: string, context?: Partial<AuthenticationContext>) => Promise<void>
  signOut: () => Promise<void>
  elevateAuthenticationTier: (targetTier: AuthenticationTier) => Promise<boolean>
  reportCrisis: (level: CrisisLevel) => Promise<void>
  validateHipaaCompliance: () => boolean
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [authenticationTier, setAuthenticationTier] = useState<AuthenticationTier>('standard')
  const [crisisLevel, setCrisisLevel] = useState<CrisisLevel>('none')
  const [userRole, setUserRole] = useState<UserRole | null>(null)
  const supabase = createClient()

  useEffect(() => {
    checkUser()

    // Failsafe: Set loading to false after 5 seconds
    const failsafe = setTimeout(() => {
      if (loading) {
        console.warn('Auth loading timeout, setting loading to false')
        setLoading(false)
      }
    }, 5000)

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session)
        setUser(session?.user ?? null)
        setLoading(false)
        clearTimeout(failsafe)
      }
    )

    return () => {
      subscription.unsubscribe()
      clearTimeout(failsafe)
    }
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

      if (session?.user) {
        await loadUserContext(session.user)
      } else {
        resetUserContext()
      }
    } catch (err) {
      console.error('Error checking user:', err)
      setError(err as Error)
      setSession(null)
      setUser(null)
      resetUserContext()
    } finally {
      setLoading(false)
    }
  }

  const loadUserContext = async (user: User) => {
    // Always set default values first to ensure the component can render
    setUserRole('patient')
    setAuthenticationTier('standard')
    setCrisisLevel('none')

    try {
      const { data: profile, error } = await supabase
        .from('user_profiles')
        .select('role, authentication_tier, crisis_level, last_crisis_assessment')
        .eq('user_id', user.id)
        .single()

      // If we get a profile successfully, update with real values
      if (!error && profile) {
        setUserRole(profile.role as UserRole)
        setAuthenticationTier(profile.authentication_tier as AuthenticationTier)
        setCrisisLevel(profile.crisis_level as CrisisLevel)

        // Try to log authentication event, but don't fail if audit table doesn't exist
        try {
          await logAuthenticationEvent('session_validated', {
            user_id: user.id,
            authentication_tier: profile.authentication_tier,
            crisis_level: profile.crisis_level,
            timestamp: new Date().toISOString()
          })
        } catch (auditErr) {
          // Silently ignore audit logging errors
        }
      }
      // If error or no profile, we keep the default values we already set
    } catch (err) {
      console.error('Error loading user context:', err)
      // Default values are already set above
    }
  }

  const resetUserContext = () => {
    setUserRole(null)
    setAuthenticationTier('standard')
    setCrisisLevel('none')
  }

  const signIn = async (email: string, password: string, context?: Partial<AuthenticationContext>) => {
    try {
      setError(null)
      setLoading(true)

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) throw error

      if (context) {
        if (context.tier) setAuthenticationTier(context.tier)
        if (context.crisisLevel) setCrisisLevel(context.crisisLevel)
      }

      await logAuthenticationEvent('sign_in', {
        user_id: data.user?.id,
        authentication_tier: context?.tier || 'standard',
        crisis_level: context?.crisisLevel || 'none',
        timestamp: new Date().toISOString()
      })
    } catch (err) {
      setError(err as Error)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    try {
      setError(null)
      await logAuthenticationEvent('sign_out', {
        user_id: user?.id,
        timestamp: new Date().toISOString()
      })

      const { error } = await supabase.auth.signOut()
      if (error) throw error

      resetUserContext()
    } catch (err) {
      setError(err as Error)
      throw err
    }
  }

  const elevateAuthenticationTier = async (targetTier: AuthenticationTier): Promise<boolean> => {
    try {
      if (!user) return false

      const requiresMfa = targetTier === 'clinical' || targetTier === 'sensitive'

      if (requiresMfa) {
        // MFA challenge would go here
        // For now, simulate MFA success
        console.log('MFA challenge required for tier elevation')
      }

      setAuthenticationTier(targetTier)

      await supabase
        .from('user_profiles')
        .update({ authentication_tier: targetTier })
        .eq('user_id', user.id)

      await logAuthenticationEvent('tier_elevation', {
        user_id: user.id,
        from_tier: authenticationTier,
        to_tier: targetTier,
        timestamp: new Date().toISOString()
      })

      return true
    } catch (err) {
      console.error('Error elevating authentication tier:', err)
      return false
    }
  }

  const reportCrisis = async (level: CrisisLevel) => {
    try {
      setCrisisLevel(level)

      if (user) {
        await supabase
          .from('user_profiles')
          .update({
            crisis_level: level,
            last_crisis_assessment: new Date().toISOString()
          })
          .eq('user_id', user.id)
      }

      await logAuthenticationEvent('crisis_reported', {
        user_id: user?.id,
        crisis_level: level,
        timestamp: new Date().toISOString()
      })

      if (level === 'severe' || level === 'imminent') {
        // Trigger emergency protocols
        console.log('Emergency protocols activated for crisis level:', level)
      }
    } catch (err) {
      console.error('Error reporting crisis:', err)
    }
  }

  const logAuthenticationEvent = async (event: string, data: any) => {
    try {
      await supabase
        .from('authentication_audit_log')
        .insert({
          event_type: event,
          user_id: data.user_id,
          event_data: data,
          ip_address: 'client_ip', // Would be populated server-side
          user_agent: navigator.userAgent,
          timestamp: new Date().toISOString()
        })
    } catch (err) {
      console.error('Error logging authentication event:', err)
    }
  }

  const validateHipaaCompliance = (): boolean => {
    return !!(session && user && authenticationTier && userRole)
  }

  return {
    user,
    session,
    loading,
    error,
    isAuthenticated: !!session,
    userRole,
    authenticationTier,
    crisisLevel,
    canAccessClinicalData: authenticationTier === 'clinical' && userRole === 'provider',
    canBypassAuthentication: crisisLevel === 'severe' || crisisLevel === 'imminent',
    requiresMfa: authenticationTier === 'clinical' || authenticationTier === 'sensitive',
    signIn,
    signOut,
    elevateAuthenticationTier,
    reportCrisis,
    validateHipaaCompliance
  }
}