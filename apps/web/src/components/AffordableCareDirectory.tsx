import { useState } from 'react'
import Link from 'next/link'

interface AffordableCareDirectoryProps {
  className?: string
}

type ResourceCategory = 'free' | 'low-cost' | 'insurance' | 'crisis'

interface Resource {
  name: string
  type: string
  description: string
  cost: string
  availability: string
  link?: string
  phone?: string
  searchTip?: string
  features: string[]
}

export function AffordableCareDirectory({ className = '' }: AffordableCareDirectoryProps) {
  const [activeCategory, setActiveCategory] = useState<ResourceCategory>('free')
  const [searchLocation, setSearchLocation] = useState('')

  const categories = [
    { id: 'free' as ResourceCategory, label: 'Free Resources', icon: '💚', color: 'green' },
    { id: 'low-cost' as ResourceCategory, label: 'Low-Cost ($10-80)', icon: '💙', color: 'blue' },
    { id: 'insurance' as ResourceCategory, label: 'Insurance Options', icon: '🏥', color: 'purple' },
    { id: 'crisis' as ResourceCategory, label: 'Crisis Support', icon: '🆘', color: 'red' }
  ]

  const resources: Record<ResourceCategory, Resource[]> = {
    free: [
      {
        name: 'Our Mental Wellness App',
        type: 'Mobile App',
        description: 'AI therapy companion, mood tracking, assessments, crisis support',
        cost: 'Free',
        availability: 'Nationwide',
        link: '/auth/signup',
        features: ['24/7 Access', 'No Registration Fee', 'All Features Included']
      },
      {
        name: '988 Suicide & Crisis Lifeline',
        type: 'Crisis Hotline',
        description: 'Free, confidential support 24/7 for people in distress',
        cost: 'Free',
        availability: 'Nationwide',
        phone: '988',
        link: 'tel:988',
        features: ['Call or Text', '24/7 Availability', 'Trained Counselors']
      },
      {
        name: 'Crisis Text Line',
        type: 'Text Support',
        description: 'Free crisis support via text message',
        cost: 'Free',
        availability: 'Nationwide',
        phone: 'Text HOME to 741741',
        link: 'sms:741741&body=HOME',
        features: ['Text-Based', 'Anonymous', 'Crisis Counselors']
      },
      {
        name: 'SAMHSA National Helpline',
        type: 'Referral Service',
        description: 'Free treatment referral and information service',
        cost: 'Free',
        availability: 'Nationwide',
        phone: '1-800-662-4357',
        link: 'tel:18006624357',
        features: ['Treatment Referrals', 'Confidential', 'English & Spanish']
      },
      {
        name: 'NAMI Support Groups',
        type: 'Peer Support',
        description: 'Free peer-led support groups for mental health',
        cost: 'Free',
        availability: 'Local chapters nationwide',
        link: 'https://www.nami.org/Support-Education/Support-Groups',
        features: ['In-Person & Virtual', 'Peer Support', 'Family Groups Available']
      },
      {
        name: 'MentalHealth.gov',
        type: 'Resource Directory',
        description: 'Government resource for finding local mental health services',
        cost: 'Free',
        availability: 'Nationwide',
        link: 'https://www.mentalhealth.gov/get-help/immediate-help',
        features: ['Local Resources', 'Educational Materials', 'Treatment Locator']
      }
    ],
    'low-cost': [
      {
        name: 'Community Mental Health Centers',
        type: 'Clinic',
        description: 'Federally funded clinics offering sliding scale fees',
        cost: '$10-50 per session (income-based)',
        availability: 'Nationwide',
        searchTip: 'Search "community mental health center near me"',
        features: ['Sliding Scale Fees', 'No Insurance Required', 'Licensed Therapists']
      },
      {
        name: 'University Counseling Programs',
        type: 'Training Clinic',
        description: 'Graduate students provide therapy under supervision',
        cost: '$20-40 per session',
        availability: 'Near universities with psychology programs',
        searchTip: 'Search "[university name] psychology clinic"',
        features: ['Lower Cost', 'Supervised Care', 'Quality Treatment']
      },
      {
        name: 'Open Path Collective',
        type: 'Therapist Network',
        description: 'Network of therapists offering reduced fees',
        cost: '$30-80 per session + $65 lifetime membership',
        availability: 'Nationwide',
        link: 'https://openpathcollective.org',
        features: ['Licensed Therapists', 'No Insurance Needed', 'Virtual Options']
      },
      {
        name: 'Sliding Scale Private Practice',
        type: 'Private Therapy',
        description: 'Many therapists reserve slots for sliding scale clients',
        cost: '$40-100 per session (negotiable)',
        availability: 'Nationwide',
        searchTip: 'Call therapists and ask: "Do you offer sliding scale fees?"',
        features: ['Flexible Pricing', 'Quality Care', 'Private Practice Setting']
      },
      {
        name: 'Religious/Faith-Based Counseling',
        type: 'Community Support',
        description: 'Many churches/temples offer free or low-cost counseling',
        cost: 'Free to $30 per session',
        availability: 'Through local religious organizations',
        searchTip: 'Contact local places of worship',
        features: ['Often Free', 'Values-Aligned', 'Community Support']
      },
      {
        name: 'Employee Assistance Programs (EAP)',
        type: 'Workplace Benefit',
        description: 'Many employers offer free therapy sessions',
        cost: 'Free (3-8 sessions typically)',
        availability: 'Through employers',
        searchTip: 'Ask HR: "Do we have an EAP benefit?"',
        features: ['Confidential', 'Free Sessions', 'Quick Access']
      }
    ],
    insurance: [
      {
        name: 'Medicaid',
        type: 'Government Insurance',
        description: 'Covers mental health services in all states',
        cost: 'Free to low-cost (income-based)',
        availability: 'Varies by state',
        link: 'https://www.medicaid.gov',
        features: ['Therapy Covered', 'Medication Covered', 'Hospital Care Included']
      },
      {
        name: 'Medicare',
        type: 'Government Insurance',
        description: 'Mental health coverage for 65+ or disabled',
        cost: 'Copays apply',
        availability: 'Nationwide for eligible',
        link: 'https://www.medicare.gov',
        features: ['Outpatient Therapy', 'Inpatient Care', 'Medication Coverage']
      },
      {
        name: 'Marketplace Plans (ACA)',
        type: 'Private Insurance',
        description: 'Mental health parity required on all ACA plans',
        cost: 'Varies (subsidies available)',
        availability: 'Nationwide during open enrollment',
        link: 'https://www.healthcare.gov',
        features: ['Mental Health Required', 'Subsidies Available', 'No Pre-existing Exclusions']
      },
      {
        name: 'Psychology Today Insurance Check',
        type: 'Therapist Finder',
        description: 'Find therapists who accept your insurance',
        cost: 'Depends on insurance',
        availability: 'Nationwide',
        link: 'https://www.psychologytoday.com',
        features: ['Filter by Insurance', 'Verified Providers', 'Online Booking']
      }
    ],
    crisis: [
      {
        name: '988 Suicide & Crisis Lifeline',
        type: 'Emergency Support',
        description: 'Immediate crisis intervention',
        cost: 'Free',
        phone: '988 or 1-800-273-8255',
        availability: '24/7 Nationwide',
        link: 'tel:988',
        features: ['Immediate Response', 'Trained Counselors', 'Call or Text']
      },
      {
        name: 'Crisis Text Line',
        type: 'Text Support',
        description: 'Crisis counseling via text',
        cost: 'Free',
        phone: 'Text HOME to 741741',
        availability: '24/7 Nationwide',
        link: 'sms:741741&body=HOME',
        features: ['Anonymous', 'Text-Based', 'Fast Response']
      },
      {
        name: '911 / Local Emergency',
        type: 'Emergency Services',
        description: 'For immediate danger or medical emergencies',
        cost: 'Covered by insurance/Medicaid',
        phone: '911',
        availability: 'Nationwide',
        link: 'tel:911',
        features: ['Immediate Response', 'Medical Care', 'Safety Intervention']
      },
      {
        name: 'SAMHSA Treatment Locator',
        type: 'Crisis Care Finder',
        description: 'Find nearby emergency mental health services',
        cost: 'Varies',
        availability: 'Nationwide',
        link: 'https://findtreatment.samhsa.gov',
        features: ['Treatment Facilities', 'Crisis Services', 'Local Resources']
      },
      {
        name: 'Your Local Safety Plan',
        type: 'Personal Resource',
        description: 'Create a personalized crisis plan',
        cost: 'Free',
        availability: 'In your dashboard',
        link: '/safety/plan',
        features: ['Personalized', 'Warning Signs', 'Contact List']
      }
    ]
  }

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; border: string; text: string }> = {
      green: { bg: 'bg-green-50', border: 'border-green-500', text: 'text-green-700' },
      blue: { bg: 'bg-blue-50', border: 'border-blue-500', text: 'text-blue-700' },
      purple: { bg: 'bg-purple-50', border: 'border-purple-500', text: 'text-purple-700' },
      red: { bg: 'bg-red-50', border: 'border-red-500', text: 'text-red-700' },
    }
    return colors[color] || colors.green
  }

  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Affordable Care Directory</h2>
          <p className="text-gray-600 text-sm">Find mental health support that fits your budget</p>
        </div>
        <Link
          href="/support/affordable-mental-health-care"
          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
        >
          Full Guide →
        </Link>
      </div>

      {/* Category Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
        {categories.map((category) => {
          const colors = getColorClasses(category.color)
          const isActive = activeCategory === category.id
          return (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`p-3 rounded-lg border-2 transition-all ${
                isActive
                  ? `${colors.border} ${colors.bg}`
                  : 'border-gray-200 bg-white hover:bg-gray-50'
              }`}
            >
              <div className="text-2xl mb-1">{category.icon}</div>
              <div className="text-xs font-semibold text-gray-900">{category.label}</div>
            </button>
          )
        })}
      </div>

      {/* Search Location (for in-person resources) */}
      {(activeCategory === 'low-cost' || activeCategory === 'insurance') && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Location (optional - helps find local resources):
          </label>
          <input
            type="text"
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
            placeholder="Enter city or ZIP code"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      )}

      {/* Resources List */}
      <div className="space-y-4 mb-6 max-h-[600px] overflow-y-auto">
        {resources[activeCategory].map((resource, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-1">{resource.name}</h3>
                <p className="text-sm text-gray-500 font-medium">{resource.type}</p>
              </div>
              <div className="text-right">
                <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">
                  {resource.cost}
                </span>
              </div>
            </div>

            <p className="text-sm text-gray-700 mb-3">{resource.description}</p>

            {resource.phone && (
              <div className="text-sm text-gray-600 mb-2">
                <strong>Contact:</strong> {resource.phone}
              </div>
            )}

            {resource.availability && (
              <div className="text-sm text-gray-600 mb-3">
                <strong>Availability:</strong> {resource.availability}
              </div>
            )}

            {resource.searchTip && (
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 mb-3 rounded text-sm text-yellow-800">
                <strong>Search Tip:</strong> {resource.searchTip}
              </div>
            )}

            {/* Features */}
            <div className="flex flex-wrap gap-2 mb-3">
              {resource.features.map((feature, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded"
                >
                  ✓ {feature}
                </span>
              ))}
            </div>

            {/* Action Button */}
            {resource.link && (
              <a
                href={resource.link}
                target={resource.link.startsWith('http') ? '_blank' : undefined}
                rel={resource.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
              >
                {resource.link.startsWith('tel:') || resource.link.startsWith('sms:')
                  ? 'Contact Now'
                  : resource.link.startsWith('http')
                    ? 'Visit Website'
                    : 'Learn More'}
              </a>
            )}
          </div>
        ))}
      </div>

      {/* Help Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-5">
        <h4 className="font-bold text-gray-900 mb-3">💡 Tips for Affording Mental Health Care</h4>
        <ul className="text-sm text-gray-700 space-y-2">
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold flex-shrink-0">1.</span>
            <span><strong>Always ask about sliding scale.</strong> Many therapists don't advertise it but offer it when asked.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold flex-shrink-0">2.</span>
            <span><strong>Check if you're eligible for Medicaid.</strong> Income limits are higher than many think.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold flex-shrink-0">3.</span>
            <span><strong>Ask your employer about EAP.</strong> You might have free sessions you don't know about.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold flex-shrink-0">4.</span>
            <span><strong>Start with our free app.</strong> Use it while searching for in-person support.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold flex-shrink-0">5.</span>
            <span><strong>Don't give up.</strong> Finding affordable care takes persistence, but it exists.</span>
          </li>
        </ul>
      </div>

      {/* Additional Resources */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <p className="text-sm text-gray-600 mb-3">
          <strong>Need more help?</strong> Check out these additional resources:
        </p>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/support/affordable-mental-health-care"
            className="text-xs bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full hover:bg-gray-200 transition-colors"
          >
            Complete Affordability Guide →
          </Link>
          <Link
            href="/support/overcome-mental-health-stigma"
            className="text-xs bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full hover:bg-gray-200 transition-colors"
          >
            Overcoming Stigma →
          </Link>
          <Link
            href="/crisis-support"
            className="text-xs bg-red-100 text-red-700 px-3 py-1.5 rounded-full hover:bg-red-200 transition-colors"
          >
            🆘 Crisis Resources →
          </Link>
        </div>
      </div>
    </div>
  )
}
