import { useState } from 'react'
import Head from 'next/head'
import { AuthGuard } from '@/components/AuthGuard'
import { QualityGateDashboard } from '@/components/QualityGateDashboard'
import { useAuth } from '@/hooks/useAuth'

export default function QualityGatesPage() {
  const { user, userRole } = useAuth()
  const [selectedUserId, setSelectedUserId] = useState<string>('')
  const [autoRefresh, setAutoRefresh] = useState(false)

  const handleUserIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedUserId(e.target.value)
  }

  const resetToCurrentUser = () => {
    setSelectedUserId('')
  }

  return (
    <AuthGuard
      requiredRole="admin"
      requiredTier="clinical"
      clinicalContext={true}
    >
      <Head>
        <title>Healthcare Quality Gates - Mental Wellness App</title>
        <meta name="description" content="Healthcare quality gates, HIPAA compliance validation, and clinical safety monitoring" />
      </Head>

      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="mb-4 lg:mb-0">
                  <h1 className="text-3xl font-bold text-gray-900">Healthcare Quality Gates</h1>
                  <p className="text-gray-600 mt-2">
                    Comprehensive HIPAA compliance, clinical safety, and security validation dashboard
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="autoRefresh"
                      checked={autoRefresh}
                      onChange={(e) => setAutoRefresh(e.target.checked)}
                      className="h-4 w-4 text-therapy-600 focus:ring-therapy-500 border-gray-300 rounded"
                    />
                    <label htmlFor="autoRefresh" className="ml-2 text-sm text-gray-700">
                      Auto-refresh every 5 minutes
                    </label>
                  </div>
                </div>
              </div>

              {/* User Selection (Admin Only) */}
              {userRole === 'admin' && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                    <div className="flex-1">
                      <label htmlFor="userId" className="block text-sm font-medium text-gray-700 mb-1">
                        User ID (leave blank for current user)
                      </label>
                      <input
                        type="text"
                        id="userId"
                        value={selectedUserId}
                        onChange={handleUserIdChange}
                        placeholder="Enter user ID to validate..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-therapy-500 focus:border-therapy-500"
                      />
                    </div>
                    <div className="flex items-end">
                      <button
                        onClick={resetToCurrentUser}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                      >
                        Reset to Current User
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quality Gate Dashboard */}
          <QualityGateDashboard
            userId={selectedUserId || user?.id}
            autoRefresh={autoRefresh}
            showDetailedFindings={true}
          />

          {/* Information Panel */}
          <div className="mt-8 bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Quality Gate Information</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Validation Categories</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>
                    <strong>Authentication Security:</strong> Multi-factor authentication, session management,
                    credential verification, and access controls
                  </li>
                  <li>
                    <strong>Crisis Intervention:</strong> Safety plan completeness, crisis assessment protocols,
                    emergency contact information, and intervention tracking
                  </li>
                  <li>
                    <strong>HIPAA Compliance:</strong> Authorization requirements, consent management,
                    audit controls, and protected health information safeguards
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Compliance Levels</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mr-3">
                      FULLY COMPLIANT
                    </span>
                    <span className="text-gray-600">90%+ score, all critical requirements met</span>
                  </li>
                  <li className="flex items-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-3">
                      ENHANCED
                    </span>
                    <span className="text-gray-600">70-89% score, minor improvements needed</span>
                  </li>
                  <li className="flex items-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 mr-3">
                      BASIC
                    </span>
                    <span className="text-gray-600">50-69% score, significant gaps exist</span>
                  </li>
                  <li className="flex items-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 mr-3">
                      NON-COMPLIANT
                    </span>
                    <span className="text-gray-600">&lt;50% score, critical issues present</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Finding Severity Levels</h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center">
                  <span className="text-lg mr-2">🚨</span>
                  <div>
                    <div className="font-medium text-red-600">Critical</div>
                    <div className="text-gray-600">Immediate action required</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-lg mr-2">❌</span>
                  <div>
                    <div className="font-medium text-orange-600">Error</div>
                    <div className="text-gray-600">Must be resolved</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-lg mr-2">⚠️</span>
                  <div>
                    <div className="font-medium text-yellow-600">Warning</div>
                    <div className="text-gray-600">Should be addressed</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-lg mr-2">ℹ️</span>
                  <div>
                    <div className="font-medium text-blue-600">Info</div>
                    <div className="text-gray-600">For awareness</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Regulatory Framework</h3>
              <p className="text-sm text-gray-600 mb-4">
                These quality gates ensure compliance with healthcare regulations and industry standards:
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• <strong>HIPAA:</strong> Health Insurance Portability and Accountability Act</li>
                <li>• <strong>NIST 800-63B:</strong> Digital Identity Guidelines for Authentication</li>
                <li>• <strong>Clinical Standards:</strong> Mental health assessment protocols (PHQ-9, GAD-7)</li>
                <li>• <strong>Crisis Intervention:</strong> Evidence-based safety planning and risk assessment</li>
                <li>• <strong>Data Security:</strong> Encryption, access controls, and audit logging</li>
              </ul>
            </div>
          </div>

          {/* Emergency Contacts */}
          <div className="mt-8 bg-red-50 border border-red-200 rounded-lg p-6">
            <h3 className="text-lg font-medium text-red-900 mb-3">Emergency Response</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <div className="font-medium text-red-800">Crisis Situations</div>
                <div className="text-red-700">988 - Suicide & Crisis Lifeline</div>
              </div>
              <div>
                <div className="font-medium text-red-800">Technical Issues</div>
                <div className="text-red-700">Contact system administrator</div>
              </div>
              <div>
                <div className="font-medium text-red-800">HIPAA Violations</div>
                <div className="text-red-700">Report to compliance officer</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}