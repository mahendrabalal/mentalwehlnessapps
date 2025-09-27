import { createClient } from '@/lib/supabase'

// Healthcare Quality Gates and Clinical Validation Framework
// Ensures HIPAA compliance, clinical standards, and mental health safety protocols

export interface QualityGateResult {
  passed: boolean
  score: number
  findings: QualityFinding[]
  recommendations: string[]
  complianceLevel: 'non_compliant' | 'basic' | 'enhanced' | 'fully_compliant'
  clinicalRisk: 'low' | 'medium' | 'high' | 'critical'
}

export interface QualityFinding {
  category: 'security' | 'privacy' | 'clinical' | 'technical' | 'regulatory'
  severity: 'info' | 'warning' | 'error' | 'critical'
  code: string
  message: string
  location?: string
  remediation?: string
  hipaaRelevant: boolean
}

export class HealthcareQualityGates {
  private supabase = createClient()

  async validateAuthenticationSecurity(userId: string): Promise<QualityGateResult> {
    const findings: QualityFinding[] = []
    let score = 100

    try {
      // Check user profile completeness for healthcare compliance
      const { data: profile } = await this.supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', userId)
        .single()

      if (!profile) {
        findings.push({
          category: 'regulatory',
          severity: 'critical',
          code: 'HIPAA-001',
          message: 'User profile not found - cannot ensure HIPAA compliance',
          remediation: 'Create complete user profile with HIPAA authorization',
          hipaaRelevant: true
        })
        score -= 50
      } else {
        // HIPAA Authorization Check
        if (!profile.hipaa_authorization) {
          findings.push({
            category: 'regulatory',
            severity: 'critical',
            code: 'HIPAA-002',
            message: 'HIPAA authorization not obtained',
            remediation: 'Obtain explicit HIPAA authorization before accessing PHI',
            hipaaRelevant: true
          })
          score -= 30
        }

        // Provider credential verification for clinical access
        if (profile.role === 'provider') {
          if (profile.credential_verification_status !== 'verified') {
            findings.push({
              category: 'clinical',
              severity: 'error',
              code: 'CRED-001',
              message: 'Healthcare provider credentials not verified',
              remediation: 'Complete provider credential verification process',
              hipaaRelevant: true
            })
            score -= 25
          }

          if (!profile.npi_number) {
            findings.push({
              category: 'regulatory',
              severity: 'warning',
              code: 'CRED-002',
              message: 'NPI number not provided for healthcare provider',
              remediation: 'Add valid NPI number for regulatory compliance',
              hipaaRelevant: false
            })
            score -= 10
          }
        }

        // Crisis level assessment
        if (profile.crisis_level === 'severe' || profile.crisis_level === 'imminent') {
          findings.push({
            category: 'clinical',
            severity: 'critical',
            code: 'CRISIS-001',
            message: `High crisis level detected: ${profile.crisis_level}`,
            remediation: 'Immediate clinical intervention required - emergency protocols should be active',
            hipaaRelevant: true
          })
          // Don't reduce score for crisis detection - this is appropriate clinical alerting
        }
      }

      // Check MFA configuration for sensitive access
      const { data: mfaMethods } = await this.supabase
        .from('user_mfa_methods')
        .select('*')
        .eq('user_id', userId)
        .eq('enabled', true)

      if (!mfaMethods || mfaMethods.length === 0) {
        findings.push({
          category: 'security',
          severity: 'error',
          code: 'MFA-001',
          message: 'No multi-factor authentication methods configured',
          remediation: 'Configure at least one MFA method for enhanced security',
          hipaaRelevant: true
        })
        score -= 20
      } else if (mfaMethods.length < 2) {
        findings.push({
          category: 'security',
          severity: 'warning',
          code: 'MFA-002',
          message: 'Only one MFA method configured - recommended to have backup methods',
          remediation: 'Add backup MFA methods (TOTP, SMS, backup codes)',
          hipaaRelevant: false
        })
        score -= 5
      }

      // Check for recent security events
      const { data: recentAudits } = await this.supabase
        .from('security_audit_log')
        .select('*')
        .eq('user_id', userId)
        .eq('severity', 'critical')
        .gte('timestamp', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())

      if (recentAudits && recentAudits.length > 0) {
        findings.push({
          category: 'security',
          severity: 'warning',
          code: 'AUDIT-001',
          message: `${recentAudits.length} critical security events in last 24 hours`,
          remediation: 'Review security events and ensure account integrity',
          hipaaRelevant: true
        })
        score -= 10
      }

    } catch (error) {
      findings.push({
        category: 'technical',
        severity: 'error',
        code: 'SYS-001',
        message: 'Error during authentication security validation',
        remediation: 'Check system connectivity and database access',
        hipaaRelevant: false
      })
      score -= 15
    }

    return {
      passed: score >= 70,
      score: Math.max(0, score),
      findings,
      recommendations: this.generateRecommendations(findings),
      complianceLevel: this.determineComplianceLevel(score, findings),
      clinicalRisk: this.assessClinicalRisk(findings)
    }
  }

  async validateCrisisInterventionProtocols(userId: string): Promise<QualityGateResult> {
    const findings: QualityFinding[] = []
    let score = 100

    try {
      // Check for crisis assessment completion
      const { data: recentAssessments } = await this.supabase
        .from('crisis_assessments')
        .select('*')
        .eq('user_id', userId)
        .gte('completed_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
        .order('completed_at', { ascending: false })

      if (!recentAssessments || recentAssessments.length === 0) {
        findings.push({
          category: 'clinical',
          severity: 'warning',
          code: 'CRISIS-101',
          message: 'No recent crisis assessment found',
          remediation: 'Complete crisis safety assessment within 7 days',
          hipaaRelevant: true
        })
        score -= 15
      } else {
        const latestAssessment = recentAssessments[0]
        if (latestAssessment.calculated_risk === 'severe' || latestAssessment.calculated_risk === 'imminent') {
          // Check if emergency interventions were triggered
          const { data: interventions } = await this.supabase
            .from('emergency_interventions')
            .select('*')
            .eq('user_id', userId)
            .gte('triggered_at', latestAssessment.completed_at)

          if (!interventions || interventions.length === 0) {
            findings.push({
              category: 'clinical',
              severity: 'critical',
              code: 'CRISIS-102',
              message: 'High-risk crisis assessment without corresponding emergency intervention',
              remediation: 'Trigger immediate emergency protocols for high-risk patients',
              hipaaRelevant: true
            })
            score -= 40
          }
        }
      }

      // Validate safety plan existence and completeness
      const { data: safetyPlan } = await this.supabase
        .from('safety_plans')
        .select('*')
        .eq('user_id', userId)
        .single()

      if (!safetyPlan) {
        findings.push({
          category: 'clinical',
          severity: 'error',
          code: 'SAFETY-001',
          message: 'No safety plan found for user',
          remediation: 'Create comprehensive safety plan with crisis coping strategies',
          hipaaRelevant: true
        })
        score -= 25
      } else {
        // Check safety plan completeness
        const requiredFields = ['warning_signs', 'coping_strategies', 'support_contacts', 'professional_contacts']
        const incompleteFields = requiredFields.filter(field =>
          !safetyPlan[field] || safetyPlan[field].length === 0
        )

        if (incompleteFields.length > 0) {
          findings.push({
            category: 'clinical',
            severity: 'warning',
            code: 'SAFETY-002',
            message: `Safety plan incomplete - missing: ${incompleteFields.join(', ')}`,
            remediation: 'Complete all sections of safety plan for comprehensive crisis preparation',
            hipaaRelevant: true
          })
          score -= incompleteFields.length * 5
        }

        // Check if safety plan is recent
        const lastReviewed = new Date(safetyPlan.last_reviewed || safetyPlan.updated_at)
        const daysSinceReview = (Date.now() - lastReviewed.getTime()) / (1000 * 60 * 60 * 24)

        if (daysSinceReview > 90) {
          findings.push({
            category: 'clinical',
            severity: 'warning',
            code: 'SAFETY-003',
            message: `Safety plan not reviewed in ${Math.floor(daysSinceReview)} days`,
            remediation: 'Review and update safety plan quarterly or after significant life changes',
            hipaaRelevant: false
          })
          score -= 10
        }
      }

      // Check crisis resource accessibility
      const { data: profile } = await this.supabase
        .from('user_profiles')
        .select('emergency_contact_name, emergency_contact_phone')
        .eq('user_id', userId)
        .single()

      if (!profile?.emergency_contact_name || !profile?.emergency_contact_phone) {
        findings.push({
          category: 'clinical',
          severity: 'warning',
          code: 'CONTACT-001',
          message: 'Emergency contact information incomplete',
          remediation: 'Add emergency contact name and phone number for crisis situations',
          hipaaRelevant: true
        })
        score -= 10
      }

    } catch (error) {
      findings.push({
        category: 'technical',
        severity: 'error',
        code: 'SYS-002',
        message: 'Error during crisis intervention validation',
        remediation: 'Check system connectivity and crisis intervention database access',
        hipaaRelevant: false
      })
      score -= 15
    }

    return {
      passed: score >= 70,
      score: Math.max(0, score),
      findings,
      recommendations: this.generateRecommendations(findings),
      complianceLevel: this.determineComplianceLevel(score, findings),
      clinicalRisk: this.assessClinicalRisk(findings)
    }
  }

  async validateHipaaCompliance(userId: string): Promise<QualityGateResult> {
    const findings: QualityFinding[] = []
    let score = 100

    try {
      // Administrative Safeguards
      const { data: profile } = await this.supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', userId)
        .single()

      if (!profile?.hipaa_authorization) {
        findings.push({
          category: 'regulatory',
          severity: 'critical',
          code: 'HIPAA-ADMIN-001',
          message: 'Missing HIPAA authorization',
          remediation: 'Obtain signed HIPAA authorization before accessing PHI',
          hipaaRelevant: true
        })
        score -= 35
      }

      if (!profile?.consent_to_treatment && profile?.role === 'patient') {
        findings.push({
          category: 'regulatory',
          severity: 'error',
          code: 'HIPAA-ADMIN-002',
          message: 'Missing consent to treatment',
          remediation: 'Obtain explicit consent to treatment for healthcare services',
          hipaaRelevant: true
        })
        score -= 20
      }

      // Technical Safeguards
      const { data: sessions } = await this.supabase
        .from('user_sessions')
        .select('*')
        .eq('user_id', userId)
        .eq('revoked', false)
        .gt('expires_at', new Date().toISOString())

      if (sessions && sessions.length > 5) {
        findings.push({
          category: 'security',
          severity: 'warning',
          code: 'HIPAA-TECH-001',
          message: `Multiple active sessions (${sessions.length}) may indicate session management issues`,
          remediation: 'Review and revoke unnecessary active sessions',
          hipaaRelevant: true
        })
        score -= 10
      }

      // Audit Controls
      const { data: recentAudits } = await this.supabase
        .from('authentication_audit_log')
        .select('*')
        .eq('user_id', userId)
        .eq('hipaa_relevant', true)
        .gte('timestamp', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())

      if (!recentAudits || recentAudits.length === 0) {
        findings.push({
          category: 'regulatory',
          severity: 'warning',
          code: 'HIPAA-AUDIT-001',
          message: 'No HIPAA-relevant audit entries found in last 30 days',
          remediation: 'Ensure all PHI access is properly logged and auditable',
          hipaaRelevant: true
        })
        score -= 15
      }

      // Physical Safeguards (for provider accounts)
      if (profile?.role === 'provider') {
        // Check for mobile/unsecured access patterns
        const { data: mobileAccess } = await this.supabase
          .from('authentication_audit_log')
          .select('*')
          .eq('user_id', userId)
          .ilike('event_data->user_agent', '%Mobile%')
          .gte('timestamp', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())

        if (mobileAccess && mobileAccess.length > 10) {
          findings.push({
            category: 'security',
            severity: 'info',
            code: 'HIPAA-PHYS-001',
            message: 'Frequent mobile device access detected',
            remediation: 'Ensure mobile devices meet security requirements for PHI access',
            hipaaRelevant: true
          })
          score -= 5
        }
      }

      // Data Integrity
      const { data: profileAudit } = await this.supabase
        .from('authentication_audit_log')
        .select('*')
        .eq('user_id', userId)
        .in('event_type', ['profile_updated', 'phi_modified'])
        .gte('timestamp', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())

      if (profileAudit && profileAudit.length > 20) {
        findings.push({
          category: 'security',
          severity: 'warning',
          code: 'HIPAA-INT-001',
          message: 'High frequency of profile/PHI modifications',
          remediation: 'Review data modification patterns for potential security issues',
          hipaaRelevant: true
        })
        score -= 10
      }

    } catch (error) {
      findings.push({
        category: 'technical',
        severity: 'error',
        code: 'SYS-003',
        message: 'Error during HIPAA compliance validation',
        remediation: 'Check system connectivity and compliance database access',
        hipaaRelevant: true
      })
      score -= 20
    }

    return {
      passed: score >= 80, // Higher threshold for HIPAA compliance
      score: Math.max(0, score),
      findings,
      recommendations: this.generateRecommendations(findings),
      complianceLevel: this.determineComplianceLevel(score, findings),
      clinicalRisk: this.assessClinicalRisk(findings)
    }
  }

  async runComprehensiveQualityGates(userId: string): Promise<{
    overallResult: QualityGateResult
    authenticationSecurity: QualityGateResult
    crisisIntervention: QualityGateResult
    hipaaCompliance: QualityGateResult
  }> {
    const [authResult, crisisResult, hipaaResult] = await Promise.all([
      this.validateAuthenticationSecurity(userId),
      this.validateCrisisInterventionProtocols(userId),
      this.validateHipaaCompliance(userId)
    ])

    const allFindings = [
      ...authResult.findings,
      ...crisisResult.findings,
      ...hipaaResult.findings
    ]

    const overallScore = Math.round(
      (authResult.score * 0.3 + crisisResult.score * 0.4 + hipaaResult.score * 0.3)
    )

    const overallResult: QualityGateResult = {
      passed: authResult.passed && crisisResult.passed && hipaaResult.passed,
      score: overallScore,
      findings: allFindings,
      recommendations: this.generateRecommendations(allFindings),
      complianceLevel: this.determineComplianceLevel(overallScore, allFindings),
      clinicalRisk: this.assessClinicalRisk(allFindings)
    }

    // Log comprehensive quality gate results
    await this.logQualityGateResults(userId, overallResult, {
      authentication: authResult,
      crisis: crisisResult,
      hipaa: hipaaResult
    })

    return {
      overallResult,
      authenticationSecurity: authResult,
      crisisIntervention: crisisResult,
      hipaaCompliance: hipaaResult
    }
  }

  private generateRecommendations(findings: QualityFinding[]): string[] {
    const recommendations: string[] = []

    const criticalFindings = findings.filter(f => f.severity === 'critical')
    const errorFindings = findings.filter(f => f.severity === 'error')
    const hipaaFindings = findings.filter(f => f.hipaaRelevant)

    if (criticalFindings.length > 0) {
      recommendations.push('Address all critical issues immediately before proceeding with clinical operations')
    }

    if (errorFindings.length > 0) {
      recommendations.push('Resolve error-level findings to ensure system security and compliance')
    }

    if (hipaaFindings.length > 0) {
      recommendations.push('Complete HIPAA compliance requirements before accessing protected health information')
    }

    const securityFindings = findings.filter(f => f.category === 'security')
    if (securityFindings.length > 2) {
      recommendations.push('Implement additional security measures and review access controls')
    }

    const clinicalFindings = findings.filter(f => f.category === 'clinical')
    if (clinicalFindings.length > 0) {
      recommendations.push('Ensure clinical protocols are followed and safety measures are in place')
    }

    return recommendations
  }

  private determineComplianceLevel(score: number, findings: QualityFinding[]): 'non_compliant' | 'basic' | 'enhanced' | 'fully_compliant' {
    const criticalFindings = findings.filter(f => f.severity === 'critical')
    const hipaaFindings = findings.filter(f => f.hipaaRelevant && f.severity !== 'info')

    if (criticalFindings.length > 0 || score < 50) {
      return 'non_compliant'
    }

    if (hipaaFindings.length > 0 || score < 70) {
      return 'basic'
    }

    if (score < 90) {
      return 'enhanced'
    }

    return 'fully_compliant'
  }

  private assessClinicalRisk(findings: QualityFinding[]): 'low' | 'medium' | 'high' | 'critical' {
    const criticalFindings = findings.filter(f => f.severity === 'critical')
    const clinicalFindings = findings.filter(f => f.category === 'clinical')
    const crisisFindings = findings.filter(f => f.code.startsWith('CRISIS'))

    if (criticalFindings.length > 0 || crisisFindings.some(f => f.severity === 'critical')) {
      return 'critical'
    }

    if (clinicalFindings.length > 2 || crisisFindings.length > 0) {
      return 'high'
    }

    if (clinicalFindings.length > 0) {
      return 'medium'
    }

    return 'low'
  }

  private async logQualityGateResults(
    userId: string,
    overallResult: QualityGateResult,
    detailedResults: any
  ): Promise<void> {
    try {
      await this.supabase
        .from('quality_gate_audit_log')
        .insert({
          user_id: userId,
          overall_score: overallResult.score,
          compliance_level: overallResult.complianceLevel,
          clinical_risk: overallResult.clinicalRisk,
          total_findings: overallResult.findings.length,
          critical_findings: overallResult.findings.filter(f => f.severity === 'critical').length,
          hipaa_findings: overallResult.findings.filter(f => f.hipaaRelevant).length,
          detailed_results: detailedResults,
          findings_summary: overallResult.findings,
          recommendations: overallResult.recommendations,
          timestamp: new Date().toISOString()
        })
    } catch (error) {
      console.error('Error logging quality gate results:', error)
    }
  }
}

export default HealthcareQualityGates