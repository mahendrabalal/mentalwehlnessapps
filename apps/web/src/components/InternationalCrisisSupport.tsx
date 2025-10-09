import { useUserCountry } from '@/hooks/useUserCountry'
import { getCrisisResources, UNIVERSAL_CRISIS_RESOURCES } from '@/lib/international-crisis-resources'
import Link from 'next/link'

interface InternationalCrisisSupportProps {
  variant?: 'full' | 'compact' | 'emergency'
  showCountrySelector?: boolean
  className?: string
}

export function InternationalCrisisSupport({
  variant = 'full',
  showCountrySelector = true,
  className = ''
}: InternationalCrisisSupportProps) {
  const { countryCode, countryName, isLoading, isAutoDetected } = useUserCountry()

  if (isLoading) {
    return (
      <div className={`bg-blue-50 border border-blue-200 rounded-lg p-4 ${className}`}>
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
          <p className="text-blue-800">Finding crisis support resources for your location...</p>
        </div>
      </div>
    )
  }

  const resources = countryCode ? getCrisisResources(countryCode) : null

  // Emergency variant - most compact, for immediate crisis situations
  if (variant === 'emergency') {
    return (
      <div className={`bg-red-50 border-2 border-red-500 rounded-lg p-4 ${className}`}>
        <h3 className="text-lg font-bold text-red-900 mb-3 flex items-center">
          <span className="text-2xl mr-2">🚨</span>
          Immediate Crisis Support
        </h3>

        {resources ? (
          <div className="space-y-3">
            <div className="bg-white rounded-lg p-3 border border-red-300">
              <p className="text-sm font-semibold text-red-900 mb-1">Emergency Services</p>
              <a
                href={`tel:${resources.emergencyNumber}`}
                className="text-2xl font-bold text-red-600 hover:text-red-700 block"
              >
                {resources.emergencyNumber}
              </a>
              <p className="text-xs text-red-700 mt-1">{resources.countryName}</p>
            </div>

            {resources.crisisLines.slice(0, 2).map((line, index) => (
              <div key={index} className="bg-white rounded-lg p-3 border border-red-200">
                <p className="text-sm font-semibold text-gray-900">{line.name}</p>
                {line.phone && (
                  <a
                    href={`tel:${line.phone.replace(/[^\d+]/g, '')}`}
                    className="text-lg font-bold text-blue-600 hover:text-blue-700 block"
                  >
                    {line.phone}
                  </a>
                )}
                {line.text && (
                  <p className="text-sm text-gray-700 mt-1">Text: {line.text}</p>
                )}
                <p className="text-xs text-gray-600 mt-1">{line.available}</p>
              </div>
            ))}
          </div>
        ) : (
          <UniversalCrisisResources compact />
        )}
      </div>
    )
  }

  // Compact variant - for inline use in assessments
  if (variant === 'compact') {
    return (
      <div className={`bg-red-50 border border-red-200 rounded-lg p-4 ${className}`}>
        <h4 className="font-semibold text-red-900 mb-3 flex items-center">
          <span className="mr-2">⚠️</span>
          Immediate Support Recommended
        </h4>

        {resources ? (
          <div className="space-y-2">
            <p className="text-red-800 text-sm mb-3">
              Your responses indicate you may benefit from immediate professional support.
            </p>

            <div className="space-y-2">
              <p className="text-red-800 text-sm">
                <strong>Emergency:</strong>{' '}
                <a
                  href={`tel:${resources.emergencyNumber}`}
                  className="font-bold hover:underline"
                >
                  {resources.emergencyNumber}
                </a>{' '}
                ({resources.countryName})
              </p>

              {resources.crisisLines.slice(0, 2).map((line, index) => (
                <p key={index} className="text-red-800 text-sm">
                  <strong>{line.name}:</strong>{' '}
                  {line.phone && (
                    <a
                      href={`tel:${line.phone.replace(/[^\d+]/g, '')}`}
                      className="font-bold hover:underline"
                    >
                      {line.phone}
                    </a>
                  )}
                  {line.text && ` or text ${line.text}`}
                  {line.available === '24/7' && (
                    <span className="text-green-700 ml-1">(24/7)</span>
                  )}
                </p>
              ))}
            </div>

            {showCountrySelector && isAutoDetected && (
              <p className="text-xs text-red-700 mt-3">
                Resources for {countryName}.{' '}
                <Link href="/crisis-support" className="underline hover:text-red-900">
                  Change location
                </Link>
              </p>
            )}
          </div>
        ) : (
          <UniversalCrisisResources compact />
        )}
      </div>
    )
  }

  // Full variant - comprehensive crisis support information
  return (
    <div className={className}>
      {resources ? (
        <div className="space-y-4">
          {showCountrySelector && isAutoDetected && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">
              Showing crisis support resources for <strong>{countryName}</strong>.{' '}
              <Link href="/crisis-support" className="underline hover:text-blue-900 font-medium">
                Change location
              </Link>
            </div>
          )}

          {/* Emergency Services */}
          <div className="bg-red-50 border border-red-300 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-3">
              <span className="text-2xl">🚨</span>
              <h3 className="text-lg font-bold text-red-900">Emergency Services</h3>
            </div>
            <a
              href={`tel:${resources.emergencyNumber}`}
              className="text-3xl font-bold text-red-600 hover:text-red-700 block mb-2"
            >
              {resources.emergencyNumber}
            </a>
            <p className="text-red-800 text-sm">
              For immediate danger or medical emergencies in {resources.countryName}
            </p>
          </div>

          {/* Crisis Hotlines */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resources.crisisLines.map((line, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-gray-900 flex-1">{line.name}</h4>
                  {line.available === '24/7' && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                      24/7
                    </span>
                  )}
                </div>

                <p className="text-sm text-gray-600 mb-3">{line.description}</p>

                {line.phone && (
                  <a
                    href={`tel:${line.phone.replace(/[^\d+]/g, '')}`}
                    className="block text-lg font-bold text-blue-600 hover:text-blue-700 mb-1"
                  >
                    📞 {line.phone}
                  </a>
                )}

                {line.text && (
                  <p className="text-sm text-gray-700 mb-1">
                    💬 Text: <strong>{line.text}</strong>
                  </p>
                )}

                {line.url && (
                  <a
                    href={line.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
                  >
                    🌐 Visit website →
                  </a>
                )}

                <div className="mt-3 flex items-center space-x-3 text-xs text-gray-500">
                  {line.available !== '24/7' && (
                    <span>⏰ {line.available}</span>
                  )}
                  {line.free && (
                    <span className="bg-gray-100 px-2 py-0.5 rounded">Free</span>
                  )}
                  {line.languages && line.languages.length > 0 && (
                    <span>🌍 {line.languages.join(', ').toUpperCase()}</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Online Resources */}
          {resources.onlineResources && resources.onlineResources.length > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-3">Online Support</h4>
              <div className="space-y-2">
                {resources.onlineResources.map((resource, index) => (
                  <a
                    key={index}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-blue-600 hover:text-blue-700 hover:underline"
                  >
                    🌐 {resource.name} - {resource.description}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <UniversalCrisisResources />
      )}

      {/* Universal Fallback Note */}
      <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h4 className="font-semibold text-yellow-900 mb-2">Can't find your country?</h4>
        <p className="text-sm text-yellow-800 mb-3">
          Use these international resources to find crisis support in your area:
        </p>
        <div className="space-y-2">
          <a
            href={UNIVERSAL_CRISIS_RESOURCES.findAHelpline.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-sm text-blue-600 hover:text-blue-700 hover:underline"
          >
            🌍 {UNIVERSAL_CRISIS_RESOURCES.findAHelpline.name} -{' '}
            {UNIVERSAL_CRISIS_RESOURCES.findAHelpline.description}
          </a>
          <a
            href={UNIVERSAL_CRISIS_RESOURCES.iasp.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-sm text-blue-600 hover:text-blue-700 hover:underline"
          >
            🌍 {UNIVERSAL_CRISIS_RESOURCES.iasp.name} -{' '}
            {UNIVERSAL_CRISIS_RESOURCES.iasp.description}
          </a>
          <a
            href={UNIVERSAL_CRISIS_RESOURCES.befrienders.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-sm text-blue-600 hover:text-blue-700 hover:underline"
          >
            🌍 {UNIVERSAL_CRISIS_RESOURCES.befrienders.name} -{' '}
            {UNIVERSAL_CRISIS_RESOURCES.befrienders.description}
          </a>
        </div>
      </div>
    </div>
  )
}

// Component for universal resources when country is unknown
function UniversalCrisisResources({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <div className="space-y-2">
        <p className="text-red-800 text-sm mb-2">
          <strong>If you're in immediate danger:</strong>
        </p>
        <p className="text-red-800 text-sm">
          • Call your local emergency number (911, 999, 112, etc.)
        </p>
        <p className="text-red-800 text-sm">
          • Go to your nearest emergency room
        </p>
        <p className="text-red-800 text-sm">
          • Find local helplines:{' '}
          <a
            href={UNIVERSAL_CRISIS_RESOURCES.findAHelpline.url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-red-900"
          >
            findahelpline.com
          </a>
        </p>
      </div>
    )
  }

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <h3 className="text-lg font-bold text-blue-900 mb-4">International Crisis Resources</h3>
      <p className="text-blue-800 mb-4">
        We couldn't detect your location. Please use these universal resources to find crisis
        support in your area:
      </p>

      <div className="space-y-3">
        <div className="bg-white rounded-lg p-3 border border-blue-200">
          <h4 className="font-semibold text-gray-900 mb-1">Emergency Services</h4>
          <p className="text-sm text-gray-700">
            Call your local emergency number immediately if you're in danger:
          </p>
          <p className="text-sm text-gray-700 mt-2">
            🚨 <strong>911</strong> (US, Canada, Philippines, many countries)
            <br />
            🚨 <strong>999</strong> (UK, Singapore, Hong Kong, many countries)
            <br />
            🚨 <strong>112</strong> (Europe, Middle East, parts of Asia - works in 80+ countries)
            <br />
            🚨 <strong>000</strong> (Australia)
            <br />
            🚨 <strong>111</strong> (New Zealand)
          </p>
        </div>

        <div className="bg-white rounded-lg p-3 border border-blue-200">
          <h4 className="font-semibold text-gray-900 mb-2">Find Local Crisis Helplines</h4>
          <div className="space-y-2">
            <a
              href={UNIVERSAL_CRISIS_RESOURCES.findAHelpline.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-blue-600 hover:text-blue-700 hover:underline text-sm"
            >
              🌍 <strong>{UNIVERSAL_CRISIS_RESOURCES.findAHelpline.name}</strong> -{' '}
              {UNIVERSAL_CRISIS_RESOURCES.findAHelpline.description}
            </a>
            <a
              href={UNIVERSAL_CRISIS_RESOURCES.iasp.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-blue-600 hover:text-blue-700 hover:underline text-sm"
            >
              🌍 <strong>{UNIVERSAL_CRISIS_RESOURCES.iasp.name}</strong> -{' '}
              {UNIVERSAL_CRISIS_RESOURCES.iasp.description}
            </a>
            <a
              href={UNIVERSAL_CRISIS_RESOURCES.befrienders.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-blue-600 hover:text-blue-700 hover:underline text-sm"
            >
              🌍 <strong>{UNIVERSAL_CRISIS_RESOURCES.befrienders.name}</strong> -{' '}
              {UNIVERSAL_CRISIS_RESOURCES.befrienders.description}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InternationalCrisisSupport
