import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase'
import { useAuth, CrisisLevel } from '@/hooks/useAuth'
import { InternationalCrisisSupport } from '@/components/InternationalCrisisSupport'

interface CrisisResource {
  id: string
  name: string
  type: 'hotline' | 'text' | 'chat' | 'emergency'
  phone?: string
  url?: string
  availability: '24/7' | 'business_hours' | 'limited'
  description: string
  priority: number
}

interface CrisisAssessment {
  thoughts_of_harm: boolean
  specific_plan: boolean
  means_available: boolean
  timeline: 'immediate' | 'hours' | 'days' | 'weeks' | 'none'
  support_system: 'none' | 'limited' | 'some' | 'strong'
  previous_attempts: boolean
  substance_use: boolean
  current_stressors: string[]
}

interface CrisisInterventionSystemProps {
  onCrisisReported?: (level: CrisisLevel) => void
  emergencyMode?: boolean
  showQuickAccess?: boolean
}

export function CrisisInterventionSystem({
  onCrisisReported,
  emergencyMode = false,
  showQuickAccess = true
}: CrisisInterventionSystemProps) {
  const { user, crisisLevel, reportCrisis } = useAuth()
  const [showAssessment, setShowAssessment] = useState(false)
  const [assessment, setAssessment] = useState<CrisisAssessment>({
    thoughts_of_harm: false,
    specific_plan: false,
    means_available: false,
    timeline: 'none',
    support_system: 'some',
    previous_attempts: false,
    substance_use: false,
    current_stressors: []
  })
  const [crisisResources, setCrisisResources] = useState<CrisisResource[]>([])
  const [loading, setLoading] = useState(false)
  const [assessmentComplete, setAssessmentComplete] = useState(false)
  const [calculatedRisk, setCalculatedRisk] = useState<CrisisLevel>('none')
  const supabase = createClient()

  const logCrisisEvent = useCallback(async (event: string, data: Record<string, unknown>) => {
    try {
      await supabase
        .from('security_audit_log')
        .insert({
          event_type: event,
          severity: 'high',
          user_id: user?.id,
          event_details: data,
          hipaa_relevant: true,
          timestamp: new Date().toISOString()
        })
    } catch (err) {
      console.error('Error logging crisis event:', err)
    }
  }, [supabase, user?.id])

  const loadCrisisResources = useCallback(async () => {
    // Default crisis resources
    const defaultResources: CrisisResource[] = [
      {
        id: '988',
        name: 'Suicide & Crisis Lifeline',
        type: 'hotline',
        phone: '988',
        availability: '24/7',
        description: 'Free and confidential emotional support 24/7',
        priority: 1
      },
      {
        id: 'text-988',
        name: 'Crisis Text Line',
        type: 'text',
        phone: '741741',
        availability: '24/7',
        description: 'Text HOME to 741741 for crisis support',
        priority: 2
      },
      {
        id: 'emergency',
        name: 'Emergency Services',
        type: 'emergency',
        phone: '911',
        availability: '24/7',
        description: 'Call 911 for immediate emergency response',
        priority: 3
      },
      {
        id: 'trans-lifeline',
        name: 'Trans Lifeline',
        type: 'hotline',
        phone: '877-565-8860',
        availability: '24/7',
        description: 'Support for transgender individuals',
        priority: 4
      },
      {
        id: 'trevor',
        name: 'The Trevor Project',
        type: 'hotline',
        phone: '1-866-488-7386',
        availability: '24/7',
        description: 'Crisis support for LGBTQ+ youth',
        priority: 5
      }
    ]

    setCrisisResources(defaultResources)

    // In a real implementation, would load from database
    try {
      const { data } = await supabase
        .from('crisis_resources')
        .select('*')
        .eq('active', true)
        .order('priority')

      if (data && data.length > 0) {
        setCrisisResources(data as CrisisResource[])
      }
    } catch (err) {
      console.error('Error loading crisis resources:', err)
    }
  }, [supabase])

  useEffect(() => {
    loadCrisisResources()
  }, [loadCrisisResources])

  useEffect(() => {
    if (emergencyMode) {
      setShowAssessment(true)
      logCrisisEvent('emergency_mode_activated', {
        trigger: 'component_prop'
      })
    }
  }, [emergencyMode, logCrisisEvent])

  const handleAssessmentChange = <K extends keyof CrisisAssessment>(
    field: K,
    value: CrisisAssessment[K]
  ) => {
    setAssessment(prev => {
      const updated = { ...prev, [field]: value }
      const risk = calculateCrisisLevel(updated)
      setCalculatedRisk(risk)
      return updated
    })
  }

  const calculateCrisisLevel = (assessment: CrisisAssessment): CrisisLevel => {
    let score = 0

    // High-risk factors
    if (assessment.thoughts_of_harm) score += 3
    if (assessment.specific_plan) score += 4
    if (assessment.means_available) score += 3
    if (assessment.previous_attempts) score += 2
    if (assessment.substance_use) score += 2

    // Timeline risk
    switch (assessment.timeline) {
      case 'immediate': score += 5; break
      case 'hours': score += 4; break
      case 'days': score += 2; break
      case 'weeks': score += 1; break
    }

    // Support system (protective factor)
    switch (assessment.support_system) {
      case 'none': score += 2; break
      case 'limited': score += 1; break
      case 'some': score += 0; break
      case 'strong': score -= 1; break
    }

    // Stressors
    score += Math.min(assessment.current_stressors.length, 3)

    // Convert score to crisis level
    if (score >= 10) return 'imminent'
    if (score >= 7) return 'severe'
    if (score >= 4) return 'moderate'
    if (score >= 1) return 'mild'
    return 'none'
  }

  const completeAssessment = async () => {
    setLoading(true)

    try {
      const finalRisk = calculateCrisisLevel(assessment)

      // Report crisis level
      await reportCrisis(finalRisk)

      // Log detailed assessment
      await logCrisisEvent('assessment_completed', {
        assessment,
        calculated_risk: finalRisk,
        user_id: user?.id
      })

      // Save assessment to database
      if (user) {
        await supabase
          .from('crisis_assessments')
          .insert({
            user_id: user.id,
            assessment_data: assessment,
            calculated_risk: finalRisk,
            completed_at: new Date().toISOString()
          })
      }

      setAssessmentComplete(true)
      setCalculatedRisk(finalRisk)

      // Trigger automatic interventions for high-risk cases
      if (finalRisk === 'severe' || finalRisk === 'imminent') {
        await triggerEmergencyProtocols(finalRisk)
      }

      if (onCrisisReported) {
        onCrisisReported(finalRisk)
      }

    } catch (err) {
      console.error('Error completing assessment:', err)
    } finally {
      setLoading(false)
    }
  }

  const triggerEmergencyProtocols = async (level: CrisisLevel) => {
    try {
      await supabase
        .from('emergency_interventions')
        .insert({
          user_id: user?.id,
          crisis_level: level,
          intervention_type: 'automatic_notification',
          triggered_at: new Date().toISOString(),
          intervention_details: {
            assessment_score: calculateCrisisLevel(assessment),
            automatic_trigger: true,
            resources_provided: crisisResources.slice(0, 3).map(r => r.id)
          }
        })

      // In a real implementation:
      // 1. Send immediate notifications to designated contacts
      // 2. Alert assigned healthcare providers
      // 3. Potentially contact emergency services
      // 4. Provide immediate safety resources

      await logCrisisEvent('emergency_protocols_triggered', {
        crisis_level: level,
        interventions: ['resource_display', 'provider_notification']
      })

    } catch (err) {
      console.error('Error triggering emergency protocols:', err)
    }
  }

  const callResource = (resource: CrisisResource) => {
    if (resource.phone) {
      window.location.href = `tel:${resource.phone}`

      logCrisisEvent('crisis_resource_accessed', {
        resource_id: resource.id,
        resource_type: resource.type,
        access_method: 'phone_call'
      })
    }
  }

  const openResourceUrl = (resource: CrisisResource) => {
    if (resource.url) {
      window.open(resource.url, '_blank')

      logCrisisEvent('crisis_resource_accessed', {
        resource_id: resource.id,
        resource_type: resource.type,
        access_method: 'web_link'
      })
    }
  }

  // Emergency quick access component
  if (showQuickAccess && (calculatedRisk === 'severe' || calculatedRisk === 'imminent' || emergencyMode)) {
    return (
      <div className="fixed top-0 left-0 right-0 bg-red-600 text-white p-4 z-50 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <svg className="h-6 w-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Crisis Support Available 24/7</span>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => callResource(crisisResources[0])}
                className="bg-white text-red-600 px-4 py-2 rounded-md font-medium hover:bg-gray-100"
              >
                Call 988
              </button>
              <button
                onClick={() => setShowAssessment(true)}
                className="bg-red-700 text-white px-4 py-2 rounded-md font-medium hover:bg-red-800"
              >
                Get Help
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Crisis Level Indicator */}
      {crisisLevel !== 'none' && (
        <div className={`p-4 rounded-md border-l-4 ${
          crisisLevel === 'imminent' || crisisLevel === 'severe'
            ? 'bg-red-50 border-red-400'
            : crisisLevel === 'moderate'
            ? 'bg-orange-50 border-orange-400'
            : 'bg-yellow-50 border-yellow-400'
        }`}>
          <h3 className={`font-medium ${
            crisisLevel === 'imminent' || crisisLevel === 'severe'
              ? 'text-red-800'
              : crisisLevel === 'moderate'
              ? 'text-orange-800'
              : 'text-yellow-800'
          }`}>
            Current Crisis Level: {crisisLevel.charAt(0).toUpperCase() + crisisLevel.slice(1)}
          </h3>
          <p className={`text-sm ${
            crisisLevel === 'imminent' || crisisLevel === 'severe'
              ? 'text-red-700'
              : crisisLevel === 'moderate'
              ? 'text-orange-700'
              : 'text-yellow-700'
          }`}>
            Immediate support resources are available below.
          </p>
        </div>
      )}

      {/* Crisis Assessment */}
      {showAssessment && !assessmentComplete && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Safety Assessment</h3>
          <p className="text-sm text-gray-600 mb-6">
            This brief assessment helps us understand your current situation and provide appropriate support.
          </p>

          <div className="space-y-4">
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={assessment.thoughts_of_harm}
                  onChange={(e) => handleAssessmentChange('thoughts_of_harm', e.target.checked)}
                  className="mr-3 h-4 w-4 text-therapy-600 focus:ring-therapy-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">I am having thoughts of harming myself</span>
              </label>
            </div>

            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={assessment.specific_plan}
                  onChange={(e) => handleAssessmentChange('specific_plan', e.target.checked)}
                  className="mr-3 h-4 w-4 text-therapy-600 focus:ring-therapy-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">I have a specific plan for how I would harm myself</span>
              </label>
            </div>

            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={assessment.means_available}
                  onChange={(e) => handleAssessmentChange('means_available', e.target.checked)}
                  className="mr-3 h-4 w-4 text-therapy-600 focus:ring-therapy-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">I have access to means to carry out my plan</span>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                When are you thinking about acting on these thoughts?
              </label>
              <select
                value={assessment.timeline}
                onChange={(e) =>
                  handleAssessmentChange(
                    'timeline',
                    e.target.value as CrisisAssessment['timeline']
                  )}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-therapy-500 focus:border-therapy-500"
              >
                <option value="none">I&apos;m not planning to act on these thoughts</option>
                <option value="weeks">In the next few weeks</option>
                <option value="days">In the next few days</option>
                <option value="hours">In the next few hours</option>
                <option value="immediate">Right now or very soon</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                How would you describe your support system?
              </label>
              <select
                value={assessment.support_system}
                onChange={(e) =>
                  handleAssessmentChange(
                    'support_system',
                    e.target.value as CrisisAssessment['support_system']
                  )}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-therapy-500 focus:border-therapy-500"
              >
                <option value="strong">Strong - I have people I can rely on</option>
                <option value="some">Some - I have a few supportive people</option>
                <option value="limited">Limited - I have minimal support</option>
                <option value="none">None - I feel completely alone</option>
              </select>
            </div>

            {calculatedRisk !== 'none' && (
              <div className={`p-3 rounded-md ${
                calculatedRisk === 'imminent' || calculatedRisk === 'severe'
                  ? 'bg-red-50 border border-red-200'
                  : calculatedRisk === 'moderate'
                  ? 'bg-orange-50 border border-orange-200'
                  : 'bg-yellow-50 border border-yellow-200'
              }`}>
                <p className={`text-sm font-medium ${
                  calculatedRisk === 'imminent' || calculatedRisk === 'severe'
                    ? 'text-red-800'
                    : calculatedRisk === 'moderate'
                    ? 'text-orange-800'
                    : 'text-yellow-800'
                }`}>
                  Risk Level: {calculatedRisk.charAt(0).toUpperCase() + calculatedRisk.slice(1)}
                </p>
                {(calculatedRisk === 'severe' || calculatedRisk === 'imminent') && (
                  <p className="text-sm text-red-700 mt-1">
                    Please consider calling 988 or 911 immediately for support.
                  </p>
                )}
              </div>
            )}

            <button
              onClick={completeAssessment}
              disabled={loading}
              className="w-full px-4 py-2 bg-therapy-600 text-white rounded-md hover:bg-therapy-700 focus:outline-none focus:ring-2 focus:ring-therapy-500 disabled:opacity-50"
            >
              {loading ? 'Completing Assessment...' : 'Complete Assessment'}
            </button>
          </div>
        </div>
      )}

      {/* Crisis Resources - International */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Crisis Support Resources</h3>
        <p className="text-sm text-gray-600 mb-6">
          Professional help is available 24/7. You don&apos;t have to go through this alone.
        </p>

        <InternationalCrisisSupport variant="full" showCountrySelector={true} />
      </div>

      {/* Quick Actions */}
      {!showAssessment && (
        <div className="bg-therapy-50 border border-therapy-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-therapy-900 mb-4">Need Immediate Support?</h3>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setShowAssessment(true)}
              className="flex-1 px-4 py-2 bg-therapy-600 text-white rounded-md hover:bg-therapy-700 focus:outline-none focus:ring-2 focus:ring-therapy-500"
            >
              Take Safety Assessment
            </button>
            <a
              href="/crisis-support"
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 text-center"
            >
              View Crisis Resources
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
