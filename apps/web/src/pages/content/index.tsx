import { useState } from 'react'
import { AuthGuard } from '@/components/AuthGuard'
import { Navbar } from '@/components/Navbar'
import { PremiumContentLibrary } from '@/components/PremiumContentLibrary'
import { PremiumUpgradeFlow } from '@/components/PremiumUpgradeFlow'
import { LegalDisclaimer } from '@/components/LegalDisclaimer'
import { useSubscription } from '@/hooks/useSubscription'
import { SEOHead } from '@/components/SEOHead'

function ContentLibrary() {
  const { isPremium } = useSubscription()
  const [showUpgradeFlow, setShowUpgradeFlow] = useState(false)
  const seoTitle = 'Premium Content Library - Mental Wellness App'
  const seoDescription =
    'Explore guided meditations, therapy exercises, and wellness sessions available with your Mental Wellness App subscription.'

  return (
    <>
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        noindex
        nofollow
      />

      <Navbar />

      <div className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold mb-2">Premium Content Library</h1>
            <p className="text-purple-100 max-w-3xl">
              Access clinician-created meditations, CBT exercises, and restorative sessions tailored to your current
              mental wellness goals.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <PremiumContentLibrary
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

export default function ContentPage() {
  return (
    <AuthGuard>
      <ContentLibrary />
    </AuthGuard>
  )
}
