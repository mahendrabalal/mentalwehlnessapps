import { useState, useEffect, useCallback, useMemo } from 'react'
import { useAuth } from '@/hooks/useAuth'
import HealthcareQualityGates, { QualityGateResult } from '@/lib/healthcare-quality-gates'

interface QualityGateDashboardProps {
  userId?: string
  autoRefresh?: boolean
  showDetailedFindings?: boolean
}

export function QualityGateDashboard({
  userId,
  autoRefresh = false,
  showDetailedFindings = true
}: QualityGateDashboardProps) {
  const { user } = useAuth()
  const [results, setResults] = useState<{
    overallResult?: QualityGateResult
    authenticationSecurity?: QualityGateResult
    crisisIntervention?: QualityGateResult
    hipaaCompliance?: QualityGateResult
  }>({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lastRunTime, setLastRunTime] = useState<Date | null>(null)
  const userRole = (user?.user_metadata?.role as 'provider' | 'admin' | 'member' | undefined) ?? 'member'

  const targetUserId = userId || user?.id
  const qualityGates = useMemo(() => new HealthcareQualityGates(), [])

  const runQualityGates = useCallback(async () => {
    if (!targetUserId) return

    setLoading(true)
    setError(null)

    try {
      const results = await qualityGates.runComprehensiveQualityGates(targetUserId)
      setResults(results)
      setLastRunTime(new Date())
    } catch (err) {
      console.error('Error running quality gates:', err)
      setError('Failed to run quality gates. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [qualityGates, targetUserId])

  useEffect(() => {
    if (targetUserId) {
      runQualityGates()
    }
  }, [runQualityGates, targetUserId])

  useEffect(() => {
    if (autoRefresh && targetUserId) {
      const interval = setInterval(() => {
        runQualityGates()
      }, 5 * 60 * 1000) // Refresh every 5 minutes

      return () => clearInterval(interval)
    }
  }, [autoRefresh, runQualityGates, targetUserId])

  const getScoreColor = (score: number): string => {
    if (score >= 90) return 'text-green-600 bg-green-50 border-green-200'
    if (score >= 70) return 'text-yellow-600 bg-yellow-50 border-yellow-200'
    if (score >= 50) return 'text-orange-600 bg-orange-50 border-orange-200'
    return 'text-red-600 bg-red-50 border-red-200'
  }

  const getComplianceBadge = (level: string): string => {
    switch (level) {
      case 'fully_compliant':
        return 'bg-green-100 text-green-800'
      case 'enhanced':
        return 'bg-blue-100 text-blue-800'
      case 'basic':
        return 'bg-yellow-100 text-yellow-800'
      case 'non_compliant':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getRiskBadge = (risk: string): string => {
    switch (risk) {
      case 'low':
        return 'bg-green-100 text-green-800'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'high':
        return 'bg-orange-100 text-orange-800'
      case 'critical':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return '🚨'
      case 'error':
        return '❌'
      case 'warning':
        return '⚠️'
      case 'info':
        return 'ℹ️'
      default:
        return '•'
    }
  }

  if (!targetUserId) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
        <p className="text-yellow-800">Please log in to view quality gate results.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Healthcare Quality Gates</h2>
            <p className="text-gray-600 mt-1">
              HIPAA compliance, clinical safety, and security validation
            </p>
            {lastRunTime && (
              <p className="text-sm text-gray-500 mt-2">
                Last updated: {lastRunTime.toLocaleString()}
              </p>
            )}
          </div>
          <button
            onClick={runQualityGates}
            disabled={loading}
            className="px-4 py-2 bg-therapy-600 text-white rounded-md hover:bg-therapy-700 focus:outline-none focus:ring-2 focus:ring-therapy-500 disabled:opacity-50"
          >
            {loading ? 'Running...' : 'Run Quality Gates'}
          </button>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}
      </div>

      {/* Overall Results */}
      {results.overallResult && (
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Overall Assessment</h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className={`p-4 border rounded-lg ${getScoreColor(results.overallResult.score)}`}>
              <div className="text-2xl font-bold">{results.overallResult.score}%</div>
              <div className="text-sm">Overall Score</div>
            </div>

            <div className="p-4 border rounded-lg bg-gray-50">
              <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getComplianceBadge(results.overallResult.complianceLevel)}`}>
                {results.overallResult.complianceLevel.replace('_', ' ').toUpperCase()}
              </div>
              <div className="text-sm text-gray-600 mt-1">Compliance Level</div>
            </div>

            <div className="p-4 border rounded-lg bg-gray-50">
              <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRiskBadge(results.overallResult.clinicalRisk)}`}>
                {results.overallResult.clinicalRisk.toUpperCase()} RISK
              </div>
              <div className="text-sm text-gray-600 mt-1">Clinical Risk</div>
            </div>

            <div className="p-4 border rounded-lg bg-gray-50">
              <div className="text-2xl font-bold text-gray-900">{results.overallResult.findings.length}</div>
              <div className="text-sm text-gray-600">Total Findings</div>
            </div>
          </div>

          {results.overallResult.recommendations.length > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
              <h4 className="font-medium text-blue-900 mb-2">Key Recommendations</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                {results.overallResult.recommendations.map((rec, index) => (
                  <li key={index}>• {rec}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Detailed Results */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Authentication Security */}
        {results.authenticationSecurity && (
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Authentication Security</h3>
              <div className={`px-2 py-1 rounded text-sm font-medium ${getScoreColor(results.authenticationSecurity.score)}`}>
                {results.authenticationSecurity.score}%
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Status:</span>
                <span className={results.authenticationSecurity.passed ? 'text-green-600' : 'text-red-600'}>
                  {results.authenticationSecurity.passed ? 'PASSED' : 'FAILED'}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span>Findings:</span>
                <span>{results.authenticationSecurity.findings.length}</span>
              </div>

              {showDetailedFindings && results.authenticationSecurity.findings.length > 0 && (
                <div className="mt-4 space-y-2">
                  <h4 className="font-medium text-gray-700 text-sm">Findings:</h4>
                  {results.authenticationSecurity.findings.slice(0, 3).map((finding, index) => (
                    <div key={index} className="text-xs bg-gray-50 p-2 rounded">
                      <div className="flex items-start">
                        <span className="mr-2">{getSeverityIcon(finding.severity)}</span>
                        <div>
                          <div className="font-medium">{finding.code}</div>
                          <div className="text-gray-600">{finding.message}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {results.authenticationSecurity.findings.length > 3 && (
                    <div className="text-xs text-gray-500">
                      +{results.authenticationSecurity.findings.length - 3} more findings
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Crisis Intervention */}
        {results.crisisIntervention && (
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Crisis Intervention</h3>
              <div className={`px-2 py-1 rounded text-sm font-medium ${getScoreColor(results.crisisIntervention.score)}`}>
                {results.crisisIntervention.score}%
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Status:</span>
                <span className={results.crisisIntervention.passed ? 'text-green-600' : 'text-red-600'}>
                  {results.crisisIntervention.passed ? 'PASSED' : 'FAILED'}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span>Clinical Risk:</span>
                <span className={`px-2 py-0.5 rounded text-xs ${getRiskBadge(results.crisisIntervention.clinicalRisk)}`}>
                  {results.crisisIntervention.clinicalRisk.toUpperCase()}
                </span>
              </div>

              {showDetailedFindings && results.crisisIntervention.findings.length > 0 && (
                <div className="mt-4 space-y-2">
                  <h4 className="font-medium text-gray-700 text-sm">Findings:</h4>
                  {results.crisisIntervention.findings.slice(0, 3).map((finding, index) => (
                    <div key={index} className="text-xs bg-gray-50 p-2 rounded">
                      <div className="flex items-start">
                        <span className="mr-2">{getSeverityIcon(finding.severity)}</span>
                        <div>
                          <div className="font-medium">{finding.code}</div>
                          <div className="text-gray-600">{finding.message}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {results.crisisIntervention.findings.length > 3 && (
                    <div className="text-xs text-gray-500">
                      +{results.crisisIntervention.findings.length - 3} more findings
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* HIPAA Compliance */}
        {results.hipaaCompliance && (
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">HIPAA Compliance</h3>
              <div className={`px-2 py-1 rounded text-sm font-medium ${getScoreColor(results.hipaaCompliance.score)}`}>
                {results.hipaaCompliance.score}%
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Status:</span>
                <span className={results.hipaaCompliance.passed ? 'text-green-600' : 'text-red-600'}>
                  {results.hipaaCompliance.passed ? 'COMPLIANT' : 'NON-COMPLIANT'}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span>Level:</span>
                <span className={`px-2 py-0.5 rounded text-xs ${getComplianceBadge(results.hipaaCompliance.complianceLevel)}`}>
                  {results.hipaaCompliance.complianceLevel.replace('_', ' ').toUpperCase()}
                </span>
              </div>

              {showDetailedFindings && results.hipaaCompliance.findings.length > 0 && (
                <div className="mt-4 space-y-2">
                  <h4 className="font-medium text-gray-700 text-sm">Findings:</h4>
                  {results.hipaaCompliance.findings.slice(0, 3).map((finding, index) => (
                    <div key={index} className="text-xs bg-gray-50 p-2 rounded">
                      <div className="flex items-start">
                        <span className="mr-2">{getSeverityIcon(finding.severity)}</span>
                        <div>
                          <div className="font-medium">{finding.code}</div>
                          <div className="text-gray-600">{finding.message}</div>
                          {finding.hipaaRelevant && (
                            <div className="text-red-600 font-medium">HIPAA Relevant</div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  {results.hipaaCompliance.findings.length > 3 && (
                    <div className="text-xs text-gray-500">
                      +{results.hipaaCompliance.findings.length - 3} more findings
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Detailed Findings (if enabled and provider/admin) */}
      {showDetailedFindings && (userRole === 'provider' || userRole === 'admin') && results.overallResult && (
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Detailed Findings</h3>

          <div className="space-y-4">
            {results.overallResult.findings.map((finding, index) => (
              <div key={index} className={`p-4 border-l-4 rounded-r-lg ${
                finding.severity === 'critical' ? 'border-red-500 bg-red-50' :
                finding.severity === 'error' ? 'border-orange-500 bg-orange-50' :
                finding.severity === 'warning' ? 'border-yellow-500 bg-yellow-50' :
                'border-blue-500 bg-blue-50'
              }`}>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{getSeverityIcon(finding.severity)}</span>
                      <span className="font-medium text-gray-900">{finding.code}</span>
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                        finding.category === 'security' ? 'bg-purple-100 text-purple-800' :
                        finding.category === 'clinical' ? 'bg-green-100 text-green-800' :
                        finding.category === 'regulatory' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {finding.category.toUpperCase()}
                      </span>
                      {finding.hipaaRelevant && (
                        <span className="px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                          HIPAA
                        </span>
                      )}
                    </div>
                    <p className="text-gray-700 mt-1">{finding.message}</p>
                    {finding.remediation && (
                      <p className="text-sm text-gray-600 mt-2">
                        <strong>Remediation:</strong> {finding.remediation}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <p className="text-sm text-gray-600">
          Quality gates ensure HIPAA compliance, clinical safety protocols, and security standards are met.
          Results are automatically logged for audit and compliance purposes.
        </p>
      </div>
    </div>
  )
}
