import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { loadStripe, type Stripe } from '@stripe/stripe-js'
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import type { StripePaymentElementOptions } from '@stripe/stripe-js'
import { LegalDisclaimer } from './LegalDisclaimer'
import { useAuth } from '@/hooks/useAuth'
import { createClient } from '@/lib/supabase'

// BMad Method: Healthcare-compliant Stripe configuration with lazy loading
let stripePromise: Promise<Stripe | null> | null = null

const getStripePromise = () => {
  if (!stripePromise) {
    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
    if (!publishableKey) {
      throw new Error('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY environment variable is not set')
    }
    stripePromise = loadStripe(publishableKey)
  }
  return stripePromise
}

interface PricingPlan {
  id: string
  name: string
  price: number
  interval: 'month' | 'year'
  originalPrice?: number
  savings?: string
  features: string[]
  recommended?: boolean
  priceId: string
}

interface PremiumUpgradeFlowProps {
  isOpen: boolean
  onClose: () => void
  defaultPlan?: 'monthly' | 'yearly'
}

export const PremiumUpgradeFlow: React.FC<PremiumUpgradeFlowProps> = ({
  isOpen,
  onClose,
  defaultPlan = 'monthly'
}) => {
  const { user } = useAuth()
  const router = useRouter()
  const [selectedPlan, setSelectedPlan] = useState<string>(defaultPlan === 'yearly' ? 'yearly' : 'monthly')
  const [currentStep, setCurrentStep] = useState<'pricing' | 'payment' | 'processing' | 'success'>('pricing')
  const [clientSecret, setClientSecret] = useState<string>('')
  const [customerId, setCustomerId] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [loadingPlanId, setLoadingPlanId] = useState<string | null>(null)

  // BMad Method: Healthcare-focused pricing plans
  const pricingPlans: PricingPlan[] = [
    {
      id: 'monthly',
      name: 'Premium Monthly',
      price: 5.99,
      interval: 'month',
      priceId: process.env.NEXT_PUBLIC_STRIPE_PREMIUM_MONTHLY_PRICE_ID || 'price_mental_wellness_monthly_placeholder',
      features: [
        'Unlimited AI Therapy Companion',
        '24/7 Crisis Prevention Support',
        'Advanced Mood Analytics & Predictions',
        'Premium Content Library (50+ resources)',
        'Personalized Wellness Plans',
        'Priority Clinical Support',
        'Data Export for Therapists',
        'HIPAA-Compliant Cloud Storage'
      ]
    },
    {
      id: 'yearly',
      name: 'Premium Yearly',
      price: 59.99,
      interval: 'year',
      originalPrice: 71.88,
      savings: 'Save $11.89/year (approx. 2 months free)',
      recommended: true,
      priceId: process.env.NEXT_PUBLIC_STRIPE_PREMIUM_YEARLY_PRICE_ID || 'price_mental_wellness_yearly_placeholder',
      features: [
        'All Premium Monthly features',
        'Annual Clinical Wellness Report',
        'Advanced Analytics Export',
        'Equivalent to 2 months free',
        'Priority Feature Updates',
        'Extended Data Retention',
        'Telehealth Integration Ready'
      ]
    }
  ]

  const handlePlanSelection = async (planId: string) => {
    if (!user) {
      // Redirect to login with return URL to come back to pricing after login
      const returnUrl = encodeURIComponent('/pricing')
      router.push(`/auth/login?redirect=${returnUrl}&plan=${planId}`)
      return
    }

    setSelectedPlan(planId)
    setLoadingPlanId(planId)
    setError('')

    try {
      const selectedPlanData = pricingPlans.find(plan => plan.id === planId)
      if (!selectedPlanData) {
        throw new Error('Invalid plan selected')
      }

      // BMad Method: Check if Stripe is properly configured
      if (selectedPlanData.priceId.includes('placeholder')) {
        throw new Error('Stripe configuration incomplete. Please create Mental Wellness products in your Stripe Dashboard and update the environment variables. Check STRIPE_SETUP_GUIDE.md for detailed instructions.')
      }

      // Get authentication token from Supabase session
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()

      if (!session?.access_token) {
        throw new Error('Authentication session expired. Please log in again.')
      }

      // BMad Method: Step 1 - Create Setup Intent for payment method collection
      // This is the industry best practice: collect payment method first, then create subscription
      const response = await fetch('/api/subscriptions/setup-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          userId: user.id,
          email: user.email,
          name: user.user_metadata?.full_name || user.email
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to initialize payment setup')
      }

      const { clientSecret: cs, customerId: cid } = await response.json()

      if (!cs || !cid) {
        throw new Error('Payment setup initialization failed. Please try again.')
      }

      setClientSecret(cs)
      setCustomerId(cid)
      setCurrentStep('payment')

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoadingPlanId(null)
    }
  }

  const handlePaymentSuccess = () => {
    setCurrentStep('success')
    setTimeout(() => {
      onClose()
      window.location.reload() // Refresh to show premium features
    }, 3000)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-y-auto">
        {currentStep === 'pricing' && (
          <PricingStep
            plans={pricingPlans}
            selectedPlan={selectedPlan}
            onPlanSelect={handlePlanSelection}
            onClose={onClose}
            loadingPlanId={loadingPlanId}
            error={error}
          />
        )}

        {currentStep === 'payment' && clientSecret && (
          <Elements
            stripe={getStripePromise()}
            options={{
              clientSecret,
              appearance: {
                theme: 'stripe',
                variables: {
                  colorPrimary: '#7C3AED' // therapy-600 color
                }
              }
            }}
          >
            <PaymentStep
              selectedPlan={pricingPlans.find(plan => plan.id === selectedPlan)!}
              customerId={customerId}
              onSuccess={handlePaymentSuccess}
              onBack={() => setCurrentStep('pricing')}
              onClose={onClose}
            />
          </Elements>
        )}

        {currentStep === 'success' && (
          <SuccessStep
            selectedPlan={pricingPlans.find(plan => plan.id === selectedPlan)!}
            onClose={onClose}
          />
        )}
      </div>
    </div>
  )
}

interface PricingStepProps {
  plans: PricingPlan[]
  selectedPlan: string
  onPlanSelect: (planId: string) => void
  onClose: () => void
  loadingPlanId: string | null
  error: string
}

const PricingStep: React.FC<PricingStepProps> = ({
  plans,
  selectedPlan,
  onPlanSelect,
  onClose,
  loadingPlanId,
  error
}) => {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Upgrade to Premium</h2>
          <p className="text-gray-600 mt-2">Unlock advanced mental wellness features</p>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex">
            <svg className="w-5 h-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <p className="ml-2 text-sm text-red-600">{error}</p>
          </div>
        </div>
      )}

      {/* Pricing Plans */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative border-2 rounded-lg p-6 cursor-pointer transition-all ${
              plan.recommended
                ? 'border-therapy-500 shadow-lg'
                : selectedPlan === plan.id
                ? 'border-therapy-300'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => !loadingPlanId && onPlanSelect(plan.id)}
          >
            {plan.recommended && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-therapy-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
            )}

            <div className="text-center mb-4">
              <h3 className="text-xl font-semibold text-gray-900">{plan.name}</h3>
              <div className="mt-2">
                {plan.originalPrice && (
                  <span className="text-lg text-gray-400 line-through">
                    ${plan.originalPrice}
                  </span>
                )}
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-gray-900">
                    ${plan.price}
                  </span>
                  <span className="text-gray-500 ml-1">
                    /{plan.interval}
                  </span>
                </div>
                {plan.savings && (
                  <p className="text-green-600 font-medium mt-1">{plan.savings}</p>
                )}
              </div>
            </div>

            <ul className="space-y-2 mb-6">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              disabled={loadingPlanId === plan.id}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                plan.recommended || selectedPlan === plan.id
                  ? 'bg-therapy-600 hover:bg-therapy-700 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
              } disabled:opacity-50`}
            >
              {loadingPlanId === plan.id ? 'Processing...' : 'Subscribe Now'}
            </button>
          </div>
        ))}
      </div>

      {/* BMad Method: Healthcare-specific legal disclaimers */}
      <LegalDisclaimer variant="modal" className="mb-6" />

      {/* Trust Signals */}
      <div className="text-center text-sm text-gray-500">
        <div className="flex justify-center items-center space-x-6 mb-4">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            <span>HIPAA Compliant</span>
          </div>
          <div className="flex items-center">
            <svg className="w-5 h-5 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Secure Payments</span>
          </div>
          <div className="flex items-center">
            <svg className="w-5 h-5 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Cancel Anytime</span>
          </div>
        </div>
        <p>
          No setup fees • Cancel anytime
          <br />
          ${plans.find(p => p.id === selectedPlan)?.price}/{plans.find(p => p.id === selectedPlan)?.interval} • Secure payment processing by Stripe
        </p>
      </div>
    </div>
  )
}

interface PaymentStepProps {
  selectedPlan: PricingPlan
  customerId: string
  onSuccess: () => void
  onBack: () => void
  onClose: () => void
}

const PaymentStep: React.FC<PaymentStepProps> = ({
  selectedPlan,
  customerId,
  onSuccess,
  onBack,
  onClose
}) => {
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState('')
  const { user } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements || !user) {
      return
    }

    setIsProcessing(true)
    setError('')

    try {
      // BMad Method: Step 2 - Confirm Setup Intent with payment method details
      // This handles 3D Secure/SCA authentication automatically
      const { error: submitError } = await elements.submit()
      if (submitError) {
        throw new Error(submitError.message)
      }

      const { error: confirmError, setupIntent } = await stripe.confirmSetup({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/dashboard?subscription=success`,
        },
        redirect: 'if_required'
      })

      if (confirmError) {
        throw new Error(confirmError.message)
      }

      if (!setupIntent || setupIntent.status !== 'succeeded') {
        throw new Error('Payment method verification failed. Please try again.')
      }

      // BMad Method: Step 3 - Create subscription with confirmed payment method
      const paymentMethodId = setupIntent.payment_method as string

      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()

      if (!session?.access_token) {
        throw new Error('Authentication session expired. Please log in again.')
      }

      const subscriptionResponse = await fetch('/api/subscriptions/create-with-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          priceId: selectedPlan.priceId,
          userId: user.id,
          customerId: customerId,
          paymentMethodId: paymentMethodId
        })
      })

      if (!subscriptionResponse.ok) {
        const errorData = await subscriptionResponse.json()
        throw new Error(errorData.message || 'Failed to create subscription')
      }

      const { subscriptionId } = await subscriptionResponse.json()

      if (!subscriptionId) {
        throw new Error('Subscription creation failed. Please contact support.')
      }

      console.log('BMad Method: Subscription created successfully', {
        subscriptionId,
        planName: selectedPlan.name
      })

      onSuccess()
    } catch (err) {
      console.error('BMad Method: Payment/Subscription error:', err)
      setError(err instanceof Error ? err.message : 'Payment failed. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Complete Your Subscription</h2>
          <p className="text-gray-600 mt-1">{selectedPlan.name} - ${selectedPlan.price}/{selectedPlan.interval}</p>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <PaymentElement
            options={{
              layout: 'tabs',
              paymentMethodOrder: ['card']
            }}
          />
        </div>

        {/* BMad Method: Healthcare Payment Info */}
        <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div className="text-sm text-blue-800">
              <p className="font-medium">Secure Payment Processing</p>
              <p className="mt-1">Your payment information is encrypted and securely processed. You will be charged ${selectedPlan.price} {selectedPlan.interval === 'month' ? 'monthly' : 'annually'}.</p>
            </div>
          </div>
        </div>

        <div className="flex space-x-4">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            disabled={isProcessing}
          >
            Back
          </button>
          <button
            type="submit"
            disabled={!stripe || isProcessing}
            className="flex-1 py-3 px-4 bg-therapy-600 hover:bg-therapy-700 text-white rounded-lg disabled:opacity-50 font-medium"
          >
            {isProcessing ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing Payment...
              </span>
            ) : (
              'Confirm & Subscribe'
            )}
          </button>
        </div>
      </form>

      <div className="mt-6 text-xs text-gray-500 text-center space-y-2">
        <div className="flex justify-center items-center space-x-4">
          <span className="flex items-center">
            <svg className="w-4 h-4 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            Secure & Encrypted
          </span>
          <span className="flex items-center">
            <svg className="w-4 h-4 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Cancel Anytime
          </span>
        </div>
        <p>By subscribing, you agree to our Terms of Service and Privacy Policy.</p>
        <p className="text-xs">Powered by Stripe • PCI DSS Level 1 Certified</p>
      </div>
    </div>
  )
}

interface SuccessStepProps {
  selectedPlan: PricingPlan
  onClose: () => void
}

const SuccessStep: React.FC<SuccessStepProps> = ({
  selectedPlan,
  onClose
}) => {
  const router = useRouter()

  const handleExplorePremium = () => {
    onClose() // Close the modal first
    // Navigate to premium features showcase page
    router.push('/premium/features')
  }
  return (
    <div className="p-8 text-center">
      <div className="text-6xl mb-4">🎉</div>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to Premium!</h2>
      <p className="text-gray-600 mb-6">
        Your {selectedPlan.name} trial has started successfully. You now have access to all premium features.
      </p>

      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-green-900 mb-2">What&apos;s Next?</h3>
        <ul className="text-sm text-green-800 text-left space-y-1">
          <li>• Start chatting with your AI therapy companion</li>
          <li>• Explore advanced mood analytics</li>
          <li>• Access premium content library</li>
          <li>• Set up personalized wellness plans</li>
        </ul>
      </div>

      <div className="space-y-3">
        <button
          onClick={handleExplorePremium}
          className="bg-therapy-600 hover:bg-therapy-700 text-white px-8 py-3 rounded-lg font-medium w-full"
        >
          Explore Premium Features
        </button>

        <button
          onClick={onClose}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-8 py-2 rounded-lg font-medium w-full"
        >
          Back to Dashboard
        </button>
      </div>

      <p className="text-xs text-gray-500 mt-4">
        Your premium trial is now active!
      </p>
    </div>
  )
}

export default PremiumUpgradeFlow
