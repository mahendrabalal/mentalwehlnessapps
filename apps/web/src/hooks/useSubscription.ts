import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import { useAuth } from './useAuth'

export interface SubscriptionStatus {
  isActive: boolean
  isPremium: boolean
  planType: 'free' | 'premium_monthly' | 'premium_yearly'
  subscriptionId?: string
  status: 'trialing' | 'active' | 'canceled' | 'past_due' | 'unpaid' | 'incomplete' | 'free'
  trialEndsAt?: string
  currentPeriodEnd?: string
}

export function useSubscription() {
  const { user } = useAuth()
  // All features are now free - always return premium access
  const [subscription, setSubscription] = useState<SubscriptionStatus>({
    isActive: true,
    isPremium: true,
    planType: 'free',
    status: 'active'
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const supabase = createClient()

  useEffect(() => {
    if (user) {
      // All users get full access - no subscription checks needed
      setSubscription({
        isActive: true,
        isPremium: true,
        planType: 'free',
        status: 'active'
      })
      setLoading(false)
    } else {
      setSubscription({
        isActive: true,
        isPremium: true,
        planType: 'free',
        status: 'active'
      })
      setLoading(false)
    }
  }, [user])

  const fetchSubscriptionStatus = async () => {
    if (!user) return

    try {
      setLoading(true)
      setError(null)

      // Check if user has an active subscription record
      const { data: subscriptions, error: dbError } = await supabase
        .from('user_subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(1)

      if (dbError) {
        console.warn('BMad Method: No subscription table found, using fallback logic:', dbError)
        // Fallback: Check user metadata for subscription info
        await checkUserMetadata()
        return
      }

      if (subscriptions && subscriptions.length > 0) {
        const sub = subscriptions[0]
        setSubscription({
          isActive: sub.status === 'active' || sub.status === 'trialing',
          isPremium: sub.status === 'active' || sub.status === 'trialing',
          planType: sub.plan_type || 'premium_monthly',
          subscriptionId: sub.stripe_subscription_id,
          status: sub.status,
          trialEndsAt: sub.trial_end,
          currentPeriodEnd: sub.current_period_end
        })
      } else {
        // No active subscription found
        setSubscription({
          isActive: false,
          isPremium: false,
          planType: 'free',
          status: 'free'
        })
      }
    } catch (err) {
      console.error('BMad Method: Subscription status fetch error:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch subscription status')

      // Fallback to user metadata check
      await checkUserMetadata()
    } finally {
      setLoading(false)
    }
  }

  // Fallback method to check user metadata for subscription info
  const checkUserMetadata = async () => {
    try {
      const userMetadata = user?.user_metadata || {}
      const appMetadata = user?.app_metadata || {}

      // Check for subscription indicators in metadata
      const hasActiveSubscription =
        userMetadata.subscription_status === 'active' ||
        userMetadata.subscription_status === 'trialing' ||
        appMetadata.subscription_status === 'active' ||
        appMetadata.subscription_status === 'trialing'

      if (hasActiveSubscription) {
        setSubscription({
          isActive: true,
          isPremium: true,
          planType: userMetadata.plan_type || 'premium_monthly',
          status: userMetadata.subscription_status || 'active'
        })
      } else {
        setSubscription({
          isActive: false,
          isPremium: false,
          planType: 'free',
          status: 'free'
        })
      }
    } catch (err) {
      console.error('BMad Method: Metadata check error:', err)
      setSubscription({
        isActive: false,
        isPremium: false,
        planType: 'free',
        status: 'free'
      })
    }
  }

  const refreshSubscriptionStatus = () => {
    // No-op - all users always have full access
  }

  return {
    subscription,
    loading: false,
    error: null,
    refreshSubscriptionStatus,
    // Convenience computed properties - all users have premium access
    isPremium: true,
    isTrialing: false,
    isActive: true,
    planType: 'free' as const
  }
}

export default useSubscription