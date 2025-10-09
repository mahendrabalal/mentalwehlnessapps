import { useState } from 'react'
import Link from 'next/link'
import { useSubscription } from '@/hooks/useSubscription'
import { AuthGuard } from '@/components/AuthGuard'
import { AITherapyCompanion } from '@/components/AITherapyCompanion'
import { LegalDisclaimer } from '@/components/LegalDisclaimer'
import { Navbar } from '@/components/Navbar'
import { PremiumUpgradeFlow } from '@/components/PremiumUpgradeFlow'
import { SEOHead } from '@/components/SEOHead'

function PremiumFeaturesContent() {
  const { subscription, isPremium, isTrialing, loading, error } = useSubscription()
  const [activeFeature, setActiveFeature] = useState<string>('ai-companion')
  const [showUpgradeFlow, setShowUpgradeFlow] = useState(false)
  const baseTitle = 'Premium Features - Mental Wellness App'
  const baseDescription = 'Explore your premium mental wellness features and start your wellness journey with AI therapy, analytics, and crisis support.'

  const features = [
    {
      id: 'ai-companion',
      title: '🤖 24/7 AI Therapy Companion',
      description: 'Your personal wellness companion available anytime',
      benefits: [
        'Unlimited conversations and support',
        'Personalized therapy techniques',
        'Crisis intervention support',
        'Evidence-based therapeutic approaches',
        'Mood tracking integration'
      ],
      demoText: 'Try asking: "I\'m feeling anxious about work tomorrow"',
      isNew: isTrialing
    },
    {
      id: 'analytics',
      title: '📊 Advanced Mood Analytics',
      description: 'Deep insights into your mental wellness patterns',
      benefits: [
        'Trend analysis and predictions',
        'Trigger identification',
        'Progress tracking over time',
        'Personalized insights',
        'Export reports for healthcare providers'
      ],
      demoText: 'View your detailed mood patterns and trends',
      isNew: isTrialing
    },
    {
      id: 'content',
      title: '🎵 Premium Content Library',
      description: 'Unlimited access to guided wellness content',
      benefits: [
        'Guided meditation sessions',
        'Sleep stories and soundscapes',
        'Breathing exercises',
        'Progressive muscle relaxation',
        'Cognitive behavioral therapy exercises'
      ],
      demoText: 'Explore over 100+ premium wellness sessions',
      isNew: isTrialing
    }
  ]

  const quickActions = [
    {
      title: 'Start AI Chat',
      description: 'Begin your first conversation',
      icon: '💬',
      link: '/dashboard',
      highlight: true
    },
    {
      title: 'View Analytics',
      description: 'Check your wellness insights',
      icon: '📈',
      link: '/analytics',
      highlight: true
    },
    {
      title: 'Browse Content',
      description: 'Access premium sessions',
      icon: '🎧',
      link: '/content',
      highlight: true
    },
    {
      title: 'Complete Assessment',
      description: 'Track your baseline',
      icon: '📋',
      link: '/assessment/phq9',
      highlight: false
    }
  ]

  const hasPremiumAccess = isPremium || isTrialing
  const headerTitle = isTrialing
    ? 'Welcome to Your Premium Trial!'
    : hasPremiumAccess
      ? 'Premium Features Active'
      : 'Premium Access Locked'
  const headerSubtitle = isTrialing
    ? `Your ${subscription.planType === 'premium_monthly' ? '7-day' : 'premium'} trial is now active`
    : hasPremiumAccess
      ? 'You have access to all premium wellness features'
      : 'Upgrade to unlock all premium wellness features'

  if (loading) {
    return (
      <>
        <SEOHead
          title={baseTitle}
          description={baseDescription}
          noindex
          nofollow
        />
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <p className="text-gray-600">Loading premium experience...</p>
        </div>
      </>
    )
  }

  return (
    <>
      <SEOHead
        title={baseTitle}
        description={baseDescription}
        noindex
        nofollow
      />

      <Navbar />
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🎉</div>
              <h1 className="text-3xl font-bold mb-2">{headerTitle}</h1>
              <p className="text-green-100 text-lg">{headerSubtitle}</p>
              {isTrialing && subscription.trialEndsAt && (
                <p className="text-sm text-green-200 mt-2">
                  Trial ends: {new Date(subscription.trialEndsAt).toLocaleDateString()}
                </p>
              )}
              {!hasPremiumAccess && (
                <button
                  type="button"
                  onClick={() => setShowUpgradeFlow(true)}
                  className="mt-6 inline-flex items-center justify-center rounded-lg border border-white/40 bg-white/10 px-6 py-2 text-sm font-medium text-white transition hover:bg-white/20"
                >
                  Upgrade to Premium
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {error && (
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {!hasPremiumAccess && (
            <div className="mb-8 rounded-lg border border-green-200 bg-green-50 p-6 text-green-800">
              <h2 className="text-xl font-semibold mb-2">Unlock Premium Wellness Support</h2>
              <p className="mb-4">
                Upgrade now to access unlimited AI therapy support, advanced mood analytics, and the full premium content library.
              </p>
              <button
                type="button"
                onClick={() => setShowUpgradeFlow(true)}
                className="rounded-md bg-green-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-green-700"
              >
                View Premium Plans
              </button>
            </div>
          )}

          {/* Quick Actions */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">🚀 Quick Start</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action) => (
                <Link
                  key={action.title}
                  href={action.link}
                  onClick={(event) => {
                    if (!hasPremiumAccess && action.highlight) {
                      event.preventDefault()
                      setShowUpgradeFlow(true)
                    }
                  }}
                  className={`block p-6 rounded-lg border-2 transition-all hover:shadow-md ${
                    action.highlight
                      ? hasPremiumAccess
                        ? 'border-green-500 bg-green-50 hover:border-green-600'
                        : 'border-green-200 bg-white hover:border-green-300'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  } ${!hasPremiumAccess && action.highlight ? 'cursor-pointer' : ''}`}
                  aria-disabled={!hasPremiumAccess && action.highlight}
                >
                  <div className="text-2xl mb-2">{action.icon}</div>
                  <h3 className="font-semibold text-gray-900 mb-1">{action.title}</h3>
                  <p className="text-sm text-gray-600">{action.description}</p>
                  {action.highlight && (
                    <span className="inline-block mt-2 px-2 py-1 bg-green-600 text-white text-xs rounded-full">
                      {hasPremiumAccess ? 'Premium' : 'Upgrade'}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* Feature Showcase */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">✨ Your Premium Features</h2>

            {/* Feature Tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
              {features.map((feature) => (
                <button
                  key={feature.id}
                  onClick={() => setActiveFeature(feature.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeFeature === feature.id
                      ? 'bg-green-600 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  {feature.title.split(' ')[0]} {feature.title.split(' ').slice(1).join(' ')}
                  {feature.isNew && (
                    <span className="ml-2 px-2 py-1 bg-orange-500 text-white text-xs rounded-full">
                      NEW
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Active Feature Details */}
            {features.map((feature) => (
              <div
                key={feature.id}
                className={`${activeFeature === feature.id ? 'block' : 'hidden'}`}
              >
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Feature Info */}
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 mb-6">{feature.description}</p>

                      <h4 className="font-semibold text-gray-900 mb-3">Benefits:</h4>
                      <ul className="space-y-2">
                        {feature.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-green-500 mr-2 mt-0.5">✓</span>
                            <span className="text-gray-700">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Demo/Preview */}
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Try It Now:</h4>
                      <div className="bg-white rounded border border-gray-200 p-4 mb-4">
                        <p className="text-gray-600 italic">{feature.demoText}</p>
                      </div>

                      <div className="space-y-2">
                        {feature.id === 'ai-companion' && (
                          <button
                            type="button"
                            onClick={() => {
                              if (hasPremiumAccess) return
                              setShowUpgradeFlow(true)
                            }}
                            disabled={!hasPremiumAccess}
                            className={`w-full rounded-lg px-4 py-2 font-medium transition-colors ${
                              hasPremiumAccess
                                ? 'bg-green-600 text-white hover:bg-green-700'
                                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                            }`}
                          >
                            {hasPremiumAccess ? 'Start AI Conversation' : 'Upgrade to Unlock'}
                          </button>
                        )}
                        {feature.id === 'analytics' && (
                          <Link
                            href="/dashboard"
                            onClick={(event) => {
                              if (!hasPremiumAccess) {
                                event.preventDefault()
                                setShowUpgradeFlow(true)
                              }
                            }}
                            className={`block w-full rounded-lg px-4 py-2 text-center font-medium transition-colors ${
                              hasPremiumAccess
                                ? 'bg-green-600 text-white hover:bg-green-700'
                                : 'bg-gray-200 text-gray-500'
                            }`}
                            aria-disabled={!hasPremiumAccess}
                          >
                            {hasPremiumAccess ? 'View Your Analytics' : 'Upgrade to Unlock'}
                          </Link>
                        )}
                        {feature.id === 'content' && (
                          <button
                            type="button"
                            onClick={() => {
                              if (hasPremiumAccess) return
                              setShowUpgradeFlow(true)
                            }}
                            disabled={!hasPremiumAccess}
                            className={`w-full rounded-lg px-4 py-2 font-medium transition-colors ${
                              hasPremiumAccess
                                ? 'bg-green-600 text-white hover:bg-green-700'
                                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                            }`}
                          >
                            {hasPremiumAccess ? 'Browse Content Library' : 'Upgrade to Unlock'}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Getting Started Guide */}
          <div className="mb-12">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">
                🎯 Getting Started with Premium
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl mb-2">1️⃣</div>
                  <h4 className="font-medium text-blue-900">Complete Assessment</h4>
                  <p className="text-sm text-blue-700">Establish your wellness baseline</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-2">2️⃣</div>
                  <h4 className="font-medium text-blue-900">Daily Check-ins</h4>
                  <p className="text-sm text-blue-700">Track your mood and progress</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-2">3️⃣</div>
                  <h4 className="font-medium text-blue-900">Explore Features</h4>
                  <p className="text-sm text-blue-700">Use AI companion and content</p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="text-center">
            <Link
              href="/dashboard"
              className="inline-block bg-therapy-600 hover:bg-therapy-700 text-white px-8 py-3 rounded-lg font-medium transition-colors mr-4"
            >
              Go to Dashboard
            </Link>
            <Link
              href="/profile"
              className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-800 px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Manage Subscription
            </Link>
          </div>
        </div>

        {/* AI Companion */}
        <AITherapyCompanion
          isPremium={hasPremiumAccess}
          userMoodScore={8} // Positive mood for new premium users
          onUpgradeClick={() => setShowUpgradeFlow(true)}
        />

        {/* Legal Disclaimer */}
        <LegalDisclaimer variant="footer" />
      </div>

      <PremiumUpgradeFlow
        isOpen={showUpgradeFlow}
        onClose={() => setShowUpgradeFlow(false)}
        defaultPlan="monthly"
      />
    </>
  )
}

export default function PremiumFeatures() {
  return (
    <AuthGuard>
      <PremiumFeaturesContent />
    </AuthGuard>
  )
}
