import { ReactNode, useEffect, useState } from 'react'
import Link from 'next/link'
import { useAuth, AuthenticationTier, UserRole, CrisisLevel } from '@/hooks/useAuth'

interface AuthGuardProps {
  children: ReactNode
  redirectMessage?: string
  redirectSubtitle?: string
  requiredRole?: UserRole
  requiredTier?: AuthenticationTier
  allowCrisisBypass?: boolean
  enableCrisisDetection?: boolean
  clinicalContext?: boolean
}

export function AuthGuard({
  children,
  redirectMessage = "Please log in",
  redirectSubtitle = "You need to be logged in to access this page.",
  requiredRole,
  requiredTier = 'standard',
  allowCrisisBypass = false,
  enableCrisisDetection = false,
  clinicalContext = false
}: AuthGuardProps) {
  const {
    user,
    session,
    loading,
    error,
    userRole,
    authenticationTier,
    crisisLevel,
    canBypassAuthentication,
    elevateAuthenticationTier,
    reportCrisis,
    validateHipaaCompliance
  } = useAuth()

  const [showCrisisOptions, setShowCrisisOptions] = useState(false)
  const [tierElevationInProgress, setTierElevationInProgress] = useState(false)

  useEffect(() => {
    if (clinicalContext && !validateHipaaCompliance()) {
      console.warn('HIPAA compliance validation failed for clinical context')
    }
  }, [clinicalContext])

  const handleCrisisReporting = async (level: CrisisLevel) => {
    await reportCrisis(level)
    setShowCrisisOptions(false)
  }

  const handleTierElevation = async () => {
    setTierElevationInProgress(true)
    try {
      await elevateAuthenticationTier(requiredTier)
    } catch (err) {
      console.error('Tier elevation failed:', err)
    } finally {
      setTierElevationInProgress(false)
    }
  }

  if (loading || tierElevationInProgress) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-therapy-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">
            {tierElevationInProgress ? 'Verifying credentials...' : 'Loading...'}
          </p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
          <h2 className="text-2xl font-bold text-red-900 mb-4">Authentication Error</h2>
          <p className="text-red-600 mb-6">There was an error checking your login status.</p>
          <Link href="/auth/login" className="btn-primary inline-block">
            Try Logging In Again
          </Link>
        </div>
      </div>
    )
  }

  if (!session || !user) {
    if (allowCrisisBypass) {
      return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{redirectMessage}</h2>
            <p className="text-gray-600 mb-6">{redirectSubtitle}</p>

            <div className="space-y-4">
              <Link href="/auth/login" className="btn-primary inline-block w-full">
                Log In
              </Link>

              <div className="border-t pt-4">
                <p className="text-sm text-gray-500 mb-3">In crisis? Access emergency resources:</p>
                <button
                  onClick={() => setShowCrisisOptions(true)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Emergency Access
                </button>
              </div>
            </div>

            {showCrisisOptions && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-md">
                <h3 className="text-lg font-medium text-red-900 mb-3">Crisis Level Assessment</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => handleCrisisReporting('mild')}
                    className="block w-full text-left px-3 py-2 bg-yellow-100 hover:bg-yellow-200 rounded border"
                  >
                    Mild distress - Need support
                  </button>
                  <button
                    onClick={() => handleCrisisReporting('moderate')}
                    className="block w-full text-left px-3 py-2 bg-orange-100 hover:bg-orange-200 rounded border"
                  >
                    Moderate crisis - Urgent help needed
                  </button>
                  <button
                    onClick={() => handleCrisisReporting('severe')}
                    className="block w-full text-left px-3 py-2 bg-red-100 hover:bg-red-200 rounded border"
                  >
                    Severe crisis - Immediate intervention
                  </button>
                  <button
                    onClick={() => handleCrisisReporting('imminent')}
                    className="block w-full text-left px-3 py-2 bg-red-200 hover:bg-red-300 rounded border font-medium"
                  >
                    Imminent danger - Emergency services
                  </button>
                </div>
                <div className="mt-4 pt-3 border-t border-red-200">
                  <p className="text-sm text-red-700 mb-2">24/7 Crisis Hotlines:</p>
                  <p className="text-sm font-medium">988 - Suicide & Crisis Lifeline</p>
                  <p className="text-sm font-medium">911 - Emergency Services</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )
    }

    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{redirectMessage}</h2>
          <p className="text-gray-600 mb-6">{redirectSubtitle}</p>
          <Link href="/auth/login" className="btn-primary inline-block">
            Log In
          </Link>
        </div>
      </div>
    )
  }

  // Role-based access control
  if (requiredRole && userRole !== requiredRole) {
    if (userRole === 'patient' && requiredRole === 'provider') {
      return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Provider Access Required</h2>
            <p className="text-gray-600 mb-6">This area is restricted to healthcare providers.</p>
            <Link href="/dashboard" className="btn-primary inline-block">
              Return to Dashboard
            </Link>
          </div>
        </div>
      )
    }

    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-6">You don't have permission to access this resource.</p>
          <Link href="/dashboard" className="btn-primary inline-block">
            Return to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  // Authentication tier validation
  const tierHierarchy = { standard: 1, sensitive: 2, clinical: 3, emergency: 4 }
  const currentTierLevel = tierHierarchy[authenticationTier]
  const requiredTierLevel = tierHierarchy[requiredTier]

  if (currentTierLevel < requiredTierLevel) {
    // Allow crisis bypass for emergency situations
    if (allowCrisisBypass && canBypassAuthentication) {
      console.log('Crisis bypass activated for authentication tier requirement')
      return <>{children}</>
    }

    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Enhanced Security Required</h2>
          <p className="text-gray-600 mb-6">
            This resource requires {requiredTier} authentication.
            Current level: {authenticationTier}
          </p>
          <button
            onClick={handleTierElevation}
            className="btn-primary inline-block mb-4"
          >
            Upgrade Security Level
          </button>
          <br />
          <Link href="/dashboard" className="text-therapy-600 hover:text-therapy-500">
            Return to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  // Crisis detection and intervention
  if (enableCrisisDetection && crisisLevel !== 'none') {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-red-700">
                Crisis level detected: <strong>{crisisLevel}</strong>.
                Additional support resources are available.
              </p>
              <div className="mt-2">
                <Link href="/crisis-support" className="text-sm font-medium text-red-600 hover:text-red-500">
                  Access Crisis Resources →
                </Link>
              </div>
            </div>
          </div>
        </div>
        {children}
      </div>
    )
  }

  // HIPAA compliance validation for clinical contexts
  if (clinicalContext && !validateHipaaCompliance()) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
          <h2 className="text-2xl font-bold text-red-900 mb-4">Compliance Validation Failed</h2>
          <p className="text-red-600 mb-6">Your session does not meet HIPAA compliance requirements for clinical data access.</p>
          <button
            onClick={() => window.location.reload()}
            className="btn-primary inline-block"
          >
            Refresh Session
          </button>
        </div>
      </div>
    )
  }

  return <>{children}</>
}