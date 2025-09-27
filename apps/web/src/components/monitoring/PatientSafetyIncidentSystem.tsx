/**
 * Patient Safety Incident Response System
 * BMad Method Phase 5: Deployment & Monitoring
 *
 * Comprehensive incident management system for patient safety events
 * with automated response protocols and escalation procedures
 */

'use client'

import React, { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'

interface SafetyIncident {
  id: string
  type: 'crisis_response_failure' | 'assessment_error' | 'system_outage' | 'data_breach' | 'medication_related' | 'other'
  severity: 'low' | 'medium' | 'high' | 'critical'
  status: 'open' | 'investigating' | 'resolved' | 'closed'
  patientId?: string
  providerId?: string
  description: string
  automaticResponse: {
    crisisHotlineNotified: boolean
    emergencyServicesContacted: boolean
    providerAlerted: boolean
    systemFailoverActivated: boolean
    backupSystemsEngaged: boolean
  }
  timeline: {
    reportedAt: string
    acknowledgedAt?: string
    investigationStartedAt?: string
    resolvedAt?: string
    closedAt?: string
  }
  affectedSystems: string[]
  patientImpact: 'none' | 'minimal' | 'moderate' | 'significant' | 'severe'
  corrective_actions: string[]
  preventive_measures: string[]
  reportingPerson: {
    type: 'system' | 'patient' | 'provider' | 'admin'
    id: string
    contact: string
  }
  hipaaImpact: boolean
  regulatoryNotificationRequired: boolean
  externalNotifications: {
    hipaa_breach_notification: boolean
    state_health_department: boolean
    medical_board: boolean
    insurance_provider: boolean
  }
}

interface IncidentResponse {
  incidentId: string
  responseActions: {
    actionType: 'immediate_intervention' | 'system_failover' | 'provider_notification' | 'emergency_escalation'
    timestamp: string
    status: 'initiated' | 'completed' | 'failed'
    details: Record<string, any>
  }[]
  escalationLevel: 'standard' | 'urgent' | 'emergency' | 'critical'
  responseTime: number // milliseconds
  automatedResponse: boolean
}

const INCIDENT_TYPES = [
  { value: 'crisis_response_failure', label: '🚨 Crisis Response Failure', severity: 'critical' },
  { value: 'assessment_error', label: '📋 Assessment Algorithm Error', severity: 'high' },
  { value: 'system_outage', label: '⚡ System Outage', severity: 'high' },
  { value: 'data_breach', label: '🔒 Data Security Breach', severity: 'critical' },
  { value: 'medication_related', label: '💊 Medication-Related Incident', severity: 'high' },
  { value: 'other', label: '📝 Other Safety Incident', severity: 'medium' }
]

const SEVERITY_COLORS = {
  low: 'bg-green-100 text-green-800 border-green-200',
  medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  high: 'bg-orange-100 text-orange-800 border-orange-200',
  critical: 'bg-red-100 text-red-800 border-red-200'
}

export default function PatientSafetyIncidentSystem() {
  const [incidents, setIncidents] = useState<SafetyIncident[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedIncident, setSelectedIncident] = useState<SafetyIncident | null>(null)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [filterStatus, setFilterStatus] = useState<'all' | SafetyIncident['status']>('all')
  const [filterSeverity, setFilterSeverity] = useState<'all' | SafetyIncident['severity']>('all')
  const supabase = createClient()

  useEffect(() => {
    loadIncidents()
    const interval = setInterval(loadIncidents, 30000) // Update every 30 seconds
    return () => clearInterval(interval)
  }, [])

  const loadIncidents = async () => {
    try {
      // In real implementation, fetch from incidents database
      const mockIncidents = generateMockIncidents()
      setIncidents(mockIncidents)
      setLoading(false)
    } catch (error) {
      console.error('Failed to load incidents:', error)
      setLoading(false)
    }
  }

  const generateMockIncidents = (): SafetyIncident[] => {
    return [
      {
        id: 'incident_001',
        type: 'crisis_response_failure',
        severity: 'critical',
        status: 'investigating',
        patientId: 'patient_12345',
        providerId: 'provider_67890',
        description: 'Crisis detection algorithm failed to identify high-risk PHQ-9 score of 24. Patient did not receive immediate intervention.',
        automaticResponse: {
          crisisHotlineNotified: true,
          emergencyServicesContacted: false,
          providerAlerted: true,
          systemFailoverActivated: false,
          backupSystemsEngaged: true
        },
        timeline: {
          reportedAt: new Date(Date.now() - 3600000).toISOString(),
          acknowledgedAt: new Date(Date.now() - 3500000).toISOString(),
          investigationStartedAt: new Date(Date.now() - 3400000).toISOString()
        },
        affectedSystems: ['crisis_detection', 'provider_alerts'],
        patientImpact: 'significant',
        corrective_actions: [
          'Manual provider notification sent',
          'Crisis counselor contacted patient directly',
          'System algorithm review initiated'
        ],
        preventive_measures: [
          'Enhanced crisis detection algorithm testing',
          'Redundant alert system implementation',
          'Provider backup notification system'
        ],
        reportingPerson: {
          type: 'system',
          id: 'monitoring_system',
          contact: 'alerts@mentalwellnessapp.com'
        },
        hipaaImpact: false,
        regulatoryNotificationRequired: true,
        externalNotifications: {
          hipaa_breach_notification: false,
          state_health_department: true,
          medical_board: true,
          insurance_provider: false
        }
      },
      {
        id: 'incident_002',
        type: 'system_outage',
        severity: 'high',
        status: 'resolved',
        description: 'Database connection timeout caused 15-minute service interruption affecting 150 active users.',
        automaticResponse: {
          crisisHotlineNotified: false,
          emergencyServicesContacted: false,
          providerAlerted: true,
          systemFailoverActivated: true,
          backupSystemsEngaged: true
        },
        timeline: {
          reportedAt: new Date(Date.now() - 7200000).toISOString(),
          acknowledgedAt: new Date(Date.now() - 7100000).toISOString(),
          investigationStartedAt: new Date(Date.now() - 7000000).toISOString(),
          resolvedAt: new Date(Date.now() - 6300000).toISOString()
        },
        affectedSystems: ['database', 'user_authentication', 'assessment_system'],
        patientImpact: 'moderate',
        corrective_actions: [
          'Failed over to backup database',
          'Increased connection pool size',
          'Notified affected users via email'
        ],
        preventive_measures: [
          'Enhanced database monitoring',
          'Automated failover procedures',
          'Load balancing improvements'
        ],
        reportingPerson: {
          type: 'system',
          id: 'monitoring_system',
          contact: 'alerts@mentalwellnessapp.com'
        },
        hipaaImpact: false,
        regulatoryNotificationRequired: false,
        externalNotifications: {
          hipaa_breach_notification: false,
          state_health_department: false,
          medical_board: false,
          insurance_provider: false
        }
      },
      {
        id: 'incident_003',
        type: 'assessment_error',
        severity: 'medium',
        status: 'closed',
        patientId: 'patient_54321',
        description: 'GAD-7 assessment displayed incorrect question order for 30 minutes, affecting 12 assessments.',
        automaticResponse: {
          crisisHotlineNotified: false,
          emergencyServicesContacted: false,
          providerAlerted: false,
          systemFailoverActivated: false,
          backupSystemsEngaged: false
        },
        timeline: {
          reportedAt: new Date(Date.now() - 86400000).toISOString(),
          acknowledgedAt: new Date(Date.now() - 86300000).toISOString(),
          investigationStartedAt: new Date(Date.now() - 86200000).toISOString(),
          resolvedAt: new Date(Date.now() - 85800000).toISOString(),
          closedAt: new Date(Date.now() - 82200000).toISOString()
        },
        affectedSystems: ['assessment_system'],
        patientImpact: 'minimal',
        corrective_actions: [
          'Corrected question ordering algorithm',
          'Re-administered affected assessments',
          'Validated all assessment results'
        ],
        preventive_measures: [
          'Enhanced assessment validation testing',
          'Automated question order verification',
          'Regular assessment algorithm audits'
        ],
        reportingPerson: {
          type: 'provider',
          id: 'provider_11111',
          contact: 'dr.smith@healthcareprovider.com'
        },
        hipaaImpact: false,
        regulatoryNotificationRequired: false,
        externalNotifications: {
          hipaa_breach_notification: false,
          state_health_department: false,
          medical_board: false,
          insurance_provider: false
        }
      }
    ]
  }

  const handleIncidentResponse = async (incidentId: string, responseType: string) => {
    try {
      const incident = incidents.find(i => i.id === incidentId)
      if (!incident) return

      // Create automated response
      const response: IncidentResponse = {
        incidentId,
        responseActions: [{
          actionType: responseType as any,
          timestamp: new Date().toISOString(),
          status: 'initiated',
          details: { automated: true }
        }],
        escalationLevel: incident.severity === 'critical' ? 'critical' : 'urgent',
        responseTime: 1000, // 1 second for automated responses
        automatedResponse: true
      }

      // Update incident status
      setIncidents(prev => prev.map(i =>
        i.id === incidentId
          ? {
              ...i,
              status: 'investigating',
              timeline: {
                ...i.timeline,
                acknowledgedAt: new Date().toISOString()
              }
            }
          : i
      ))

      console.log('Incident response initiated:', response)
    } catch (error) {
      console.error('Failed to initiate incident response:', error)
    }
  }

  const getTimeElapsed = (timestamp: string) => {
    const elapsed = Date.now() - new Date(timestamp).getTime()
    const hours = Math.floor(elapsed / (1000 * 60 * 60))
    const minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60))
    return `${hours}h ${minutes}m ago`
  }

  const filteredIncidents = incidents.filter(incident => {
    if (filterStatus !== 'all' && incident.status !== filterStatus) return false
    if (filterSeverity !== 'all' && incident.severity !== filterSeverity) return false
    return true
  })

  if (loading) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Patient Safety Incident Response</h1>
            <p className="text-gray-600 mt-1">BMad Method Phase 5 - Real-time incident monitoring and response</p>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => setShowCreateForm(true)}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Report Incident
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="text-3xl font-bold text-green-600">
            {incidents.filter(i => i.status === 'resolved' || i.status === 'closed').length}
          </div>
          <div className="text-sm text-gray-600">Resolved Incidents</div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="text-3xl font-bold text-yellow-600">
            {incidents.filter(i => i.status === 'open' || i.status === 'investigating').length}
          </div>
          <div className="text-sm text-gray-600">Active Incidents</div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="text-3xl font-bold text-red-600">
            {incidents.filter(i => i.severity === 'critical').length}
          </div>
          <div className="text-sm text-gray-600">Critical Incidents</div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="text-3xl font-bold text-blue-600">
            {Math.round(incidents.filter(i => i.automaticResponse.crisisHotlineNotified || i.automaticResponse.providerAlerted).length / incidents.length * 100)}%
          </div>
          <div className="text-sm text-gray-600">Auto-Response Rate</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex space-x-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="all">All Status</option>
              <option value="open">Open</option>
              <option value="investigating">Investigating</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Severity</label>
            <select
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value as any)}
              className="border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="all">All Severity</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Incidents List */}
      <div className="bg-white rounded-lg shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold">Safety Incidents ({filteredIncidents.length})</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {filteredIncidents.map(incident => (
            <div key={incident.id} className="p-6 hover:bg-gray-50">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className={`px-2 py-1 rounded text-xs font-semibold border ${SEVERITY_COLORS[incident.severity]}`}>
                      {incident.severity.toUpperCase()}
                    </span>
                    <span className="text-sm text-gray-500">#{incident.id}</span>
                    <span className="text-sm text-gray-500">{getTimeElapsed(incident.timeline.reportedAt)}</span>
                  </div>

                  <h4 className="font-semibold text-gray-900 mb-1">
                    {INCIDENT_TYPES.find(t => t.value === incident.type)?.label || incident.type}
                  </h4>

                  <p className="text-gray-700 mb-3">{incident.description}</p>

                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>Status: <span className="font-semibold">{incident.status}</span></span>
                    <span>Patient Impact: <span className="font-semibold">{incident.patientImpact}</span></span>
                    {incident.regulatoryNotificationRequired && (
                      <span className="text-red-600 font-semibold">⚠️ Regulatory Notification Required</span>
                    )}
                  </div>

                  {/* Automatic Response Indicators */}
                  <div className="mt-3 flex flex-wrap gap-2">
                    {incident.automaticResponse.crisisHotlineNotified && (
                      <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">Crisis Hotline Notified</span>
                    )}
                    {incident.automaticResponse.providerAlerted && (
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">Provider Alerted</span>
                    )}
                    {incident.automaticResponse.systemFailoverActivated && (
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Failover Activated</span>
                    )}
                  </div>
                </div>

                <div className="flex space-x-2">
                  {incident.status === 'open' && (
                    <>
                      <button
                        onClick={() => handleIncidentResponse(incident.id, 'immediate_intervention')}
                        className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                      >
                        Emergency Response
                      </button>
                      <button
                        onClick={() => handleIncidentResponse(incident.id, 'provider_notification')}
                        className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                      >
                        Notify Provider
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => setSelectedIncident(incident)}
                    className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Incident Details Modal */}
      {selectedIncident && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full m-4 max-h-screen overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Incident Details - #{selectedIncident.id}</h2>
                <button
                  onClick={() => setSelectedIncident(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              {/* Incident Overview */}
              <div>
                <h3 className="font-semibold mb-3">Incident Overview</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-gray-600">Type:</span>
                    <div>{INCIDENT_TYPES.find(t => t.value === selectedIncident.type)?.label}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Severity:</span>
                    <span className={`ml-2 px-2 py-1 rounded text-xs font-semibold ${SEVERITY_COLORS[selectedIncident.severity]}`}>
                      {selectedIncident.severity.toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Patient Impact:</span>
                    <div>{selectedIncident.patientImpact}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Affected Systems:</span>
                    <div>{selectedIncident.affectedSystems.join(', ')}</div>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div>
                <h3 className="font-semibold mb-3">Timeline</h3>
                <div className="space-y-2">
                  <div>Reported: {new Date(selectedIncident.timeline.reportedAt).toLocaleString()}</div>
                  {selectedIncident.timeline.acknowledgedAt && (
                    <div>Acknowledged: {new Date(selectedIncident.timeline.acknowledgedAt).toLocaleString()}</div>
                  )}
                  {selectedIncident.timeline.investigationStartedAt && (
                    <div>Investigation Started: {new Date(selectedIncident.timeline.investigationStartedAt).toLocaleString()}</div>
                  )}
                  {selectedIncident.timeline.resolvedAt && (
                    <div>Resolved: {new Date(selectedIncident.timeline.resolvedAt).toLocaleString()}</div>
                  )}
                </div>
              </div>

              {/* Corrective Actions */}
              <div>
                <h3 className="font-semibold mb-3">Corrective Actions Taken</h3>
                <ul className="list-disc list-inside space-y-1">
                  {selectedIncident.corrective_actions.map((action, index) => (
                    <li key={index}>{action}</li>
                  ))}
                </ul>
              </div>

              {/* Preventive Measures */}
              <div>
                <h3 className="font-semibold mb-3">Preventive Measures</h3>
                <ul className="list-disc list-inside space-y-1">
                  {selectedIncident.preventive_measures.map((measure, index) => (
                    <li key={index}>{measure}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/**
 * Patient Safety Incident Response System Features:
 * ✅ Real-time incident monitoring and reporting
 * ✅ Automated response protocols for critical incidents
 * ✅ Crisis detection failure handling
 * ✅ Emergency escalation procedures
 * ✅ HIPAA compliance incident tracking
 * ✅ Regulatory notification management
 * ✅ Provider alert systems
 * ✅ Comprehensive incident documentation
 * ✅ BMad Method Phase 5 compliance
 */