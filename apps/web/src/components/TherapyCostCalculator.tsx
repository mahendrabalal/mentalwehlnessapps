import { useState } from 'react'
import Link from 'next/link'

interface TherapyCostCalculatorProps {
  className?: string
}

type InsuranceStatus = 'none' | 'in-network' | 'out-of-network'
type TherapyFrequency = 'weekly' | 'biweekly' | 'monthly'

export function TherapyCostCalculator({ className = '' }: TherapyCostCalculatorProps) {
  const [therapyType, setTherapyType] = useState<'traditional' | 'online' | 'app'>('traditional')
  const [insuranceStatus, setInsuranceStatus] = useState<InsuranceStatus>('none')
  const [frequency, setFrequency] = useState<TherapyFrequency>('weekly')
  const [showResults, setShowResults] = useState(false)

  // 2025 Pricing Data
  const PRICING = {
    traditional: {
      none: 174, // Average out-of-pocket per session
      'in-network': 23,
      'out-of-network': 53
    },
    online: 75, // Average online therapy per session ($60-90/week, ~$75/session)
    app: 5.99 // Mental Wellness App monthly subscription
  }

  const calculateMonthlyCost = (): number => {
    if (therapyType === 'app') {
      return PRICING.app
    }

    const sessionCost = therapyType === 'traditional'
      ? PRICING.traditional[insuranceStatus]
      : PRICING.online

    const sessionsPerMonth = frequency === 'weekly' ? 4 : frequency === 'biweekly' ? 2 : 1

    return sessionCost * sessionsPerMonth
  }

  const calculateYearlyCost = (): number => {
    return calculateMonthlyCost() * 12
  }

  const calculateComparison = () => {
    const currentMonthly = calculateMonthlyCost()
    const currentYearly = calculateYearlyCost()

    // Calculate savings compared to traditional out-of-pocket weekly therapy
    const traditionalWeeklyCost = PRICING.traditional.none * 4
    const monthSavings = traditionalWeeklyCost - currentMonthly
    const yearSavings = monthSavings * 12

    return {
      currentMonthly,
      currentYearly,
      monthSavings,
      yearSavings,
      percentSavings: ((monthSavings / traditionalWeeklyCost) * 100).toFixed(0)
    }
  }

  const handleCalculate = () => {
    setShowResults(true)
  }

  const handleReset = () => {
    setTherapyType('traditional')
    setInsuranceStatus('none')
    setFrequency('weekly')
    setShowResults(false)
  }

  if (showResults) {
    const comparison = calculateComparison()
    const isAffordable = comparison.currentMonthly <= 200

    return (
      <div className={`bg-white rounded-xl shadow-lg p-6 ${className}`}>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Therapy Cost Analysis</h2>
          <p className="text-gray-600 text-sm">
            Based on 2025 average pricing data from industry sources
          </p>
        </div>

        {/* Cost Breakdown */}
        <div className="bg-gradient-to-br from-therapy-50 to-blue-50 rounded-xl p-6 mb-6 border-2 border-therapy-200">
          <div className="text-center mb-4">
            <div className="text-4xl font-bold text-therapy-600 mb-1">
              ${comparison.currentMonthly.toFixed(2)}
            </div>
            <div className="text-gray-600 text-sm">per month</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-semibold text-gray-900 mb-1">
              ${comparison.currentYearly.toFixed(2)}
            </div>
            <div className="text-gray-600 text-sm">per year</div>
          </div>
        </div>

        {/* Your Selection Summary */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="font-bold text-gray-900 mb-3 text-sm">Your Selection:</h3>
          <div className="space-y-2 text-sm text-gray-700">
            <div className="flex justify-between">
              <span>Therapy Type:</span>
              <span className="font-medium">
                {therapyType === 'traditional' ? 'Traditional In-Person' : therapyType === 'online' ? 'Online Therapy' : 'Mental Wellness App'}
              </span>
            </div>
            {therapyType !== 'app' && (
              <>
                <div className="flex justify-between">
                  <span>Insurance:</span>
                  <span className="font-medium">
                    {insuranceStatus === 'none' ? 'No Insurance' : insuranceStatus === 'in-network' ? 'In-Network' : 'Out-of-Network'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Frequency:</span>
                  <span className="font-medium capitalize">{frequency}</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Savings Comparison */}
        {comparison.monthSavings > 0 && (
          <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 mb-6">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">💰</span>
              <h3 className="font-bold text-gray-900 text-lg">You Could Save</h3>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <div className="text-2xl font-bold text-green-700">${comparison.monthSavings.toFixed(2)}</div>
                <div className="text-sm text-gray-600">per month</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-700">${comparison.yearSavings.toFixed(2)}</div>
                <div className="text-sm text-gray-600">per year</div>
              </div>
            </div>
            <p className="text-sm text-gray-700">
              Compared to traditional weekly therapy at full price, you could save <strong>{comparison.percentSavings}%</strong>
            </p>
          </div>
        )}

        {/* Alternative Options */}
        <div className="bg-white border-2 border-gray-200 rounded-xl p-6 mb-6">
          <h3 className="font-bold text-gray-900 mb-4">Compare All Options</h3>

          {/* Mental Wellness App Option */}
          <div className="mb-4 p-4 bg-gradient-to-r from-therapy-50 to-blue-50 rounded-lg border-2 border-therapy-300">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-bold text-gray-900">Mental Wellness App</h4>
                <p className="text-sm text-gray-600">AI therapy companion + tools</p>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-therapy-600">$5.99</div>
                <div className="text-xs text-gray-500">/month</div>
              </div>
            </div>
            <ul className="text-xs text-gray-700 space-y-1 mb-3">
              <li>✓ 24/7 AI crisis support</li>
              <li>✓ Clinical assessments (PHQ-9, GAD-7)</li>
              <li>✓ Unlimited mood tracking</li>
              <li>✓ Evidence-based tools & exercises</li>
            </ul>
            <div className="text-xs text-green-700 font-medium">
              💰 Saves ${(PRICING.traditional.none * 4 - PRICING.app).toFixed(2)}/month vs. traditional therapy
            </div>
          </div>

          {/* Online Therapy Option */}
          <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-bold text-gray-900">Online Therapy Platforms</h4>
                <p className="text-sm text-gray-600">BetterHelp, Talkspace, etc.</p>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-gray-900">$240-360</div>
                <div className="text-xs text-gray-500">/month</div>
              </div>
            </div>
            <ul className="text-xs text-gray-700 space-y-1">
              <li>✓ Licensed therapist</li>
              <li>✓ Video/text sessions</li>
              <li>✓ Flexible scheduling</li>
              <li>• Usually billed monthly</li>
            </ul>
          </div>

          {/* Traditional Therapy Option */}
          <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-bold text-gray-900">Traditional In-Person</h4>
                <p className="text-sm text-gray-600">Weekly sessions</p>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-gray-900">$92-696</div>
                <div className="text-xs text-gray-500">/month</div>
              </div>
            </div>
            <ul className="text-xs text-gray-700 space-y-1">
              <li>✓ Licensed therapist</li>
              <li>✓ Face-to-face interaction</li>
              <li>• Range depends on insurance</li>
              <li>• $23 with in-network insurance</li>
              <li>• $174/session out-of-pocket</li>
            </ul>
          </div>
        </div>

        {/* Affordability Tips */}
        <div className="bg-blue-50 rounded-lg p-4 mb-6 border-l-4 border-blue-600">
          <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
            <span>💡</span>
            <span>Ways to Make Therapy More Affordable</span>
          </h4>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-blue-600">•</span>
              <span><strong>Sliding scale:</strong> Many therapists offer reduced rates based on income</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600">•</span>
              <span><strong>Employee Assistance Programs (EAP):</strong> Check if your employer offers free sessions</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600">•</span>
              <span><strong>Training clinics:</strong> University counseling programs offer supervised therapy at lower costs</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600">•</span>
              <span><strong>Community mental health centers:</strong> Low-cost or free services</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600">•</span>
              <span><strong>Open Path Collective:</strong> $30-80/session with verified low income</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600">•</span>
              <span><strong>Hybrid approach:</strong> Combine app-based tools with occasional therapist sessions</span>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h4 className="font-bold text-gray-900 text-sm mb-3">Helpful Resources:</h4>
          <div className="space-y-2">
            <Link
              href="/support/affordable-mental-health-care"
              className="block text-sm text-blue-600 hover:text-blue-700 hover:underline"
            >
              → Complete guide to affordable mental health care options
            </Link>
            <Link
              href="/pricing"
              className="block text-sm text-blue-600 hover:text-blue-700 hover:underline"
            >
              → See our affordable pricing ($5.99/month)
            </Link>
            <Link
              href="/auth/signup"
              className="block text-sm text-blue-600 hover:text-blue-700 hover:underline"
            >
              → Start free trial - no credit card required
            </Link>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleReset}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Recalculate
          </button>
          <Link
            href="/auth/signup"
            className="flex-1 bg-therapy-600 hover:bg-therapy-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors text-center"
          >
            Try App Free
          </Link>
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-gray-500 mt-4 text-center">
          Cost estimates based on 2025 industry averages. Actual costs may vary by location, provider, and insurance plan.
          This calculator is for informational purposes only.
        </p>
      </div>
    )
  }

  // Calculator Input View
  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 ${className}`}>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Calculate Your Therapy Costs</h2>
        <p className="text-gray-600 text-sm">
          Compare different mental health support options and find what fits your budget
        </p>
      </div>

      {/* Therapy Type Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-900 mb-3">
          What type of mental health support are you considering?
        </label>
        <div className="space-y-3">
          <button
            onClick={() => setTherapyType('traditional')}
            className={`w-full p-4 text-left border-2 rounded-lg transition-all ${
              therapyType === 'traditional'
                ? 'border-therapy-600 bg-therapy-50'
                : 'border-gray-200 hover:border-therapy-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-gray-900">Traditional In-Person Therapy</div>
                <div className="text-sm text-gray-600">Face-to-face sessions with licensed therapist</div>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                therapyType === 'traditional' ? 'border-therapy-600' : 'border-gray-300'
              }`}>
                {therapyType === 'traditional' && (
                  <div className="w-3 h-3 rounded-full bg-therapy-600"></div>
                )}
              </div>
            </div>
          </button>

          <button
            onClick={() => setTherapyType('online')}
            className={`w-full p-4 text-left border-2 rounded-lg transition-all ${
              therapyType === 'online'
                ? 'border-therapy-600 bg-therapy-50'
                : 'border-gray-200 hover:border-therapy-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-gray-900">Online Therapy Platforms</div>
                <div className="text-sm text-gray-600">BetterHelp, Talkspace, etc.</div>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                therapyType === 'online' ? 'border-therapy-600' : 'border-gray-300'
              }`}>
                {therapyType === 'online' && (
                  <div className="w-3 h-3 rounded-full bg-therapy-600"></div>
                )}
              </div>
            </div>
          </button>

          <button
            onClick={() => setTherapyType('app')}
            className={`w-full p-4 text-left border-2 rounded-lg transition-all ${
              therapyType === 'app'
                ? 'border-therapy-600 bg-therapy-50'
                : 'border-gray-200 hover:border-therapy-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-gray-900">Mental Wellness App</div>
                <div className="text-sm text-gray-600">AI therapy companion + clinical tools</div>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                therapyType === 'app' ? 'border-therapy-600' : 'border-gray-300'
              }`}>
                {therapyType === 'app' && (
                  <div className="w-3 h-3 rounded-full bg-therapy-600"></div>
                )}
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Insurance Status (only for traditional and online) */}
      {therapyType !== 'app' && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-900 mb-3">
            What's your insurance situation?
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={() => setInsuranceStatus('none')}
              className={`p-3 text-center border-2 rounded-lg transition-all ${
                insuranceStatus === 'none'
                  ? 'border-therapy-600 bg-therapy-50'
                  : 'border-gray-200 hover:border-therapy-300'
              }`}
            >
              <div className="font-semibold text-gray-900 text-sm">No Insurance</div>
            </button>
            <button
              onClick={() => setInsuranceStatus('in-network')}
              className={`p-3 text-center border-2 rounded-lg transition-all ${
                insuranceStatus === 'in-network'
                  ? 'border-therapy-600 bg-therapy-50'
                  : 'border-gray-200 hover:border-therapy-300'
              }`}
            >
              <div className="font-semibold text-gray-900 text-sm">In-Network</div>
            </button>
            <button
              onClick={() => setInsuranceStatus('out-of-network')}
              className={`p-3 text-center border-2 rounded-lg transition-all ${
                insuranceStatus === 'out-of-network'
                  ? 'border-therapy-600 bg-therapy-50'
                  : 'border-gray-200 hover:border-therapy-300'
              }`}
            >
              <div className="font-semibold text-gray-900 text-sm">Out-of-Network</div>
            </button>
          </div>
        </div>
      )}

      {/* Session Frequency (only for traditional and online) */}
      {therapyType !== 'app' && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-900 mb-3">
            How often would you attend sessions?
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={() => setFrequency('weekly')}
              className={`p-3 text-center border-2 rounded-lg transition-all ${
                frequency === 'weekly'
                  ? 'border-therapy-600 bg-therapy-50'
                  : 'border-gray-200 hover:border-therapy-300'
              }`}
            >
              <div className="font-semibold text-gray-900">Weekly</div>
              <div className="text-xs text-gray-600">4 sessions/month</div>
            </button>
            <button
              onClick={() => setFrequency('biweekly')}
              className={`p-3 text-center border-2 rounded-lg transition-all ${
                frequency === 'biweekly'
                  ? 'border-therapy-600 bg-therapy-50'
                  : 'border-gray-200 hover:border-therapy-300'
              }`}
            >
              <div className="font-semibold text-gray-900">Bi-weekly</div>
              <div className="text-xs text-gray-600">2 sessions/month</div>
            </button>
            <button
              onClick={() => setFrequency('monthly')}
              className={`p-3 text-center border-2 rounded-lg transition-all ${
                frequency === 'monthly'
                  ? 'border-therapy-600 bg-therapy-50'
                  : 'border-gray-200 hover:border-therapy-300'
              }`}
            >
              <div className="font-semibold text-gray-900">Monthly</div>
              <div className="text-xs text-gray-600">1 session/month</div>
            </button>
          </div>
        </div>
      )}

      {/* Calculate Button */}
      <button
        onClick={handleCalculate}
        className="w-full bg-therapy-600 hover:bg-therapy-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors shadow-lg"
      >
        Calculate My Costs
      </button>

      {/* Quick Fact */}
      <div className="mt-6 bg-blue-50 rounded-lg p-4 border-l-4 border-blue-600">
        <p className="text-sm text-gray-700">
          <strong className="text-blue-900">💡 Did you know?</strong> The #1 barrier to mental health care is cost.
          This calculator helps you find affordable options that fit your budget. Mental health support doesn't have to break the bank.
        </p>
      </div>
    </div>
  )
}
