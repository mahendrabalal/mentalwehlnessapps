import { useState } from 'react'
import { AuthGuard } from '@/components/AuthGuard'
import { Navbar } from '@/components/Navbar'
import { EnhancedAnalyticsDashboard } from '@/components/EnhancedAnalyticsDashboard'
import { PremiumUpgradeFlow } from '@/components/PremiumUpgradeFlow'
import { LegalDisclaimer } from '@/components/LegalDisclaimer'
import { useSubscription } from '@/hooks/useSubscription'
import { SEOHead } from '@/components/SEOHead'

function AnalyticsContent() {
  const { isPremium } = useSubscription()
  const [showUpgradeFlow, setShowUpgradeFlow] = useState(false)

  return (
    <>
      <SEOHead
        title="Wellness Analytics - Mental Wellness App"
        description="Review private wellness analytics, mood trends, and clinical insights available to your Mental Wellness App subscription."
        noindex
        nofollow
      />

      <Navbar />

      <div className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold mb-2">Advanced Mood Analytics</h1>
            <p className="text-blue-100 max-w-3xl">
              Evidence-based dashboards that surface mood trends, crisis risk indicators, and personalized recommendations
              backed by your clinical assessments and daily check-ins.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
          <EnhancedAnalyticsDashboard
            isPremium={isPremium}
            onUpgradeClick={() => setShowUpgradeFlow(true)}
          />
        </div>

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

export default function AnalyticsPage() {
  return (
    <AuthGuard>
      <AnalyticsContent />
    </AuthGuard>
  )
}
