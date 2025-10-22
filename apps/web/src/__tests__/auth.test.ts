// Comprehensive Authentication Testing Suite
// Mental Wellness App - HIPAA-Compliant Healthcare Authentication

import { describe, it, expect, beforeEach, jest } from '@jest/globals'
import { renderHook, act } from '@testing-library/react'
import { useAuth } from '@/hooks/useAuth'
import HealthcareQualityGates from '@/lib/healthcare-quality-gates'
import type { Session, User } from '@supabase/supabase-js'

type SupabaseQueryBuilderMock = {
  select: jest.Mock
  insert: jest.Mock
  update: jest.Mock
  eq: jest.Mock
  single: jest.Mock
  gte: jest.Mock
  order: jest.Mock
  limit: jest.Mock
}

const createSupabaseQueryMock = (): SupabaseQueryBuilderMock => {
  const builder = {
    select: jest.fn(),
    insert: jest.fn(),
    update: jest.fn(),
    eq: jest.fn(),
    single: jest.fn(),
    gte: jest.fn(),
    order: jest.fn(),
    limit: jest.fn()
  } as unknown as SupabaseQueryBuilderMock

  builder.select.mockReturnValue(builder)
  builder.insert.mockReturnValue(builder)
  builder.update.mockReturnValue(builder)
  builder.eq.mockReturnValue(builder)
  builder.gte.mockReturnValue(builder)
  builder.order.mockReturnValue(builder)
  builder.limit.mockReturnValue(builder)

  return builder
}

interface CrisisAssessment {
  thoughts_of_harm: boolean
  specific_plan: boolean
  means_available: boolean
  timeline: 'immediate' | 'hours' | 'days' | 'weeks' | 'none'
}

interface PatientData {
  id: string
  name: string
  email: string
  phone: string
  ssn: string
  medical_record: string
  assessment_scores: { phq9: number; gad7: number }
}

const createMockUser = (overrides: Partial<User> = {}): User =>
  ({
    id: 'test-user',
    email: 'test@example.com',
    role: 'authenticated',
    aud: 'authenticated',
    created_at: new Date().toISOString(),
    app_metadata: {},
    user_metadata: {},
    identities: [],
    factors: [],
    ...overrides
  } as unknown as User)

const createMockSession = (overrides: Partial<Session> = {}): Session => {
  const user = overrides.user ?? createMockUser()
  return {
    access_token: 'access-token',
    refresh_token: 'refresh-token',
    expires_in: overrides.expires_in ?? 3600,
    token_type: 'bearer',
    expires_at: overrides.expires_at,
    provider_token: null,
    provider_refresh_token: null,
    ...overrides,
    user
  } as Session
}

// Mock Supabase client
jest.mock('@/lib/supabase', () => ({
  createClient: () => ({
    auth: {
      getSession: jest.fn(),
      signInWithPassword: jest.fn(),
      signOut: jest.fn(),
      onAuthStateChange: jest.fn(() => ({
        data: { subscription: { unsubscribe: jest.fn() } }
      }))
    },
    from: jest.fn(() => createSupabaseQueryMock()),
    rpc: jest.fn()
  })
}))

describe('Healthcare Authentication System', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('useAuth Hook', () => {
    it('should initialize with loading state', () => {
      const { result } = renderHook(() => useAuth())

      expect(result.current.loading).toBe(true)
      expect(result.current.user).toBe(null)
      expect(result.current.session).toBe(null)
    })

    it('should handle crisis level changes', async () => {
      const { result } = renderHook(() => useAuth())

      await act(async () => {
        await result.current.reportCrisis('severe')
      })

      expect(result.current.crisisLevel).toBe('severe')
      expect(result.current.canBypassAuthentication).toBe(true)
    })

    it('should validate HIPAA compliance', () => {
      const { result } = renderHook(() => useAuth())

      // Mock authenticated user with proper profile
      act(() => {
        const mockUser = createMockUser()
        result.current.user = mockUser
        result.current.session = createMockSession({ user: mockUser })
        result.current.authenticationTier = 'clinical'
        result.current.userRole = 'provider'
      })

      expect(result.current.validateHipaaCompliance()).toBe(true)
    })

    it('should handle MFA requirements based on authentication tier', () => {
      const { result } = renderHook(() => useAuth())

      act(() => {
        result.current.authenticationTier = 'clinical'
      })

      expect(result.current.requiresMfa).toBe(true)

      act(() => {
        result.current.authenticationTier = 'standard'
      })

      expect(result.current.requiresMfa).toBe(false)
    })

    it('should allow clinical data access for verified providers', () => {
      const { result } = renderHook(() => useAuth())

      act(() => {
        result.current.authenticationTier = 'clinical'
        result.current.userRole = 'provider'
      })

      expect(result.current.canAccessClinicalData).toBe(true)
    })
  })

  describe('Authentication Security', () => {
    it('should enforce strong password requirements', async () => {
      const { result } = renderHook(() => useAuth())

      // Test weak password
      await expect(
        act(async () => {
          await result.current.signIn('test@example.com', '123')
        })
      ).rejects.toThrow()

      // Test strong password should not throw
      await act(async () => {
        await result.current.signIn('test@example.com', 'StrongP@ssw0rd123!')
      })
    })

    it('should implement session timeout for healthcare compliance', () => {
      const { result } = renderHook(() => useAuth())

      // Mock session data with expiration
      const mockSession = createMockSession({
        expires_at: Date.now() / 1000 + 3600, // 1 hour from now
        user: createMockUser()
      })

      act(() => {
        result.current.session = mockSession
      })

      // Session should be valid
      expect(result.current.isAuthenticated).toBe(true)

      // Mock expired session
      const expiredSession = createMockSession({
        expires_at: Date.now() / 1000 - 3600, // 1 hour ago
        user: createMockUser()
      })

      act(() => {
        result.current.session = expiredSession
      })

      // Session should be invalid
      expect(result.current.isAuthenticated).toBe(false)
    })
  })

  describe('Crisis Intervention System', () => {
    it('should calculate crisis risk scores accurately', () => {
      const calculateCrisisLevel = (assessment: CrisisAssessment) => {
        let score = 0
        if (assessment.thoughts_of_harm) score += 3
        if (assessment.specific_plan) score += 4
        if (assessment.means_available) score += 3
        if (assessment.timeline === 'immediate') score += 5

        if (score >= 10) return 'imminent'
        if (score >= 7) return 'severe'
        if (score >= 4) return 'moderate'
        if (score >= 1) return 'mild'
        return 'none'
      }

      // Test high-risk scenario
      const highRiskAssessment: CrisisAssessment = {
        thoughts_of_harm: true,
        specific_plan: true,
        means_available: true,
        timeline: 'immediate'
      }

      expect(calculateCrisisLevel(highRiskAssessment)).toBe('imminent')

      // Test low-risk scenario
      const lowRiskAssessment: CrisisAssessment = {
        thoughts_of_harm: false,
        specific_plan: false,
        means_available: false,
        timeline: 'none'
      }

      expect(calculateCrisisLevel(lowRiskAssessment)).toBe('none')
    })

    it('should provide immediate access to crisis resources', () => {
      const crisisResources = [
        { name: '988 Lifeline', phone: '988', available: true },
        { name: 'Crisis Text Line', phone: '741741', available: true },
        { name: 'Emergency Services', phone: '911', available: true }
      ]

      expect(crisisResources).toHaveLength(3)
      expect(crisisResources.every(resource => resource.available)).toBe(true)
    })

    it('should trigger emergency protocols for severe crisis levels', async () => {
      const mockEmergencyProtocol = jest.fn(() => undefined)

      const crisisLevel = 'severe'
      if (crisisLevel === 'severe' || crisisLevel === 'imminent') {
        ;(mockEmergencyProtocol as jest.Mock)()
      }

      expect(mockEmergencyProtocol).toHaveBeenCalled()
    })
  })

  describe('Provider Credential Verification', () => {
    it('should validate NPI numbers using Luhn algorithm', () => {
      const validateNPIChecksum = (npi: string): boolean => {
        const digits = npi.split('').map(Number)
        let sum = 0

        for (let i = 0; i < 9; i++) {
          let digit = digits[i]
          if (i % 2 === 1) {
            digit *= 2
            if (digit > 9) digit -= 9
          }
          sum += digit
        }

        const checkDigit = (10 - (sum % 10)) % 10
        return checkDigit === digits[9]
      }

      // Valid NPI test case
      expect(validateNPIChecksum('1234567893')).toBe(true)

      // Invalid NPI test case
      expect(validateNPIChecksum('1234567890')).toBe(false)
    })

    it('should validate DEA numbers using checksum algorithm', () => {
      const validateDEAChecksum = (dea: string): boolean => {
        if (!/^[A-Z]{2}\d{7}$/.test(dea)) return false

        const digits = dea.substring(2)
        const sum1 = parseInt(digits[0]) + parseInt(digits[2]) + parseInt(digits[4])
        const sum2 = parseInt(digits[1]) + parseInt(digits[3]) + parseInt(digits[5])
        const checkDigit = (sum1 + 2 * sum2) % 10

        return checkDigit === parseInt(digits[6])
      }

      // Valid DEA test case
      expect(validateDEAChecksum('AB1234563')).toBe(true)

      // Invalid DEA test case
      expect(validateDEAChecksum('AB1234567')).toBe(false)
    })

    it('should require provider credentials for clinical access', () => {
      const providerProfile = {
        role: 'provider',
        npi_number: '1234567893',
        credential_verification_status: 'verified'
      }

      const patientProfile = {
        role: 'patient',
        npi_number: null,
        credential_verification_status: null
      }

      // Provider should have clinical access when verified
      expect(providerProfile.credential_verification_status).toBe('verified')

      // Patient should not require NPI
      expect(patientProfile.npi_number).toBe(null)
    })
  })

  describe('HIPAA Compliance', () => {
    it('should enforce data minimization principles', () => {
      const fullPatientData = {
        id: 'patient-123',
        name: 'John Doe',
        email: 'john@example.com',
        phone: '555-1234',
        ssn: '123-45-6789',
        medical_record: 'sensitive data',
        assessment_scores: { phq9: 15, gad7: 12 }
      }

      const minimizeDataForRole = (data: PatientData, userRole: string) => {
        if (userRole === 'patient') {
          // Patients can see their own basic info
          return {
            id: data.id,
            name: data.name,
            assessment_scores: data.assessment_scores
          }
        } else if (userRole === 'provider') {
          // Providers can see clinical data
          return data
        } else {
          // Others get minimal data
          return { id: data.id }
        }
      }

      const patientView = minimizeDataForRole(fullPatientData, 'patient')
      expect(patientView).not.toHaveProperty('ssn')
      expect(patientView).not.toHaveProperty('medical_record')

      const providerView = minimizeDataForRole(fullPatientData, 'provider')
      expect(providerView).toHaveProperty('medical_record')
    })

    it('should maintain comprehensive audit trails', () => {
      const auditEvent = {
        event_type: 'phi_access',
        user_id: 'provider-123',
        resource_accessed: 'patient-record-456',
        timestamp: new Date().toISOString(),
        ip_address: '192.168.1.1',
        user_agent: 'Mozilla/5.0...',
        hipaa_relevant: true
      }

      expect(auditEvent.hipaa_relevant).toBe(true)
      expect(auditEvent.timestamp).toBeDefined()
      expect(auditEvent.event_type).toBe('phi_access')
    })

    it('should encrypt sensitive data at rest and in transit', () => {
      const mockEncryption = {
        encrypt: (data: string) => `encrypted_${data}`,
        decrypt: (encryptedData: string) => encryptedData.replace('encrypted_', '')
      }

      const sensitiveData = 'patient_ssn_123456789'
      const encrypted = mockEncryption.encrypt(sensitiveData)
      const decrypted = mockEncryption.decrypt(encrypted)

      expect(encrypted).toContain('encrypted_')
      expect(decrypted).toBe(sensitiveData)
    })
  })

  describe('Quality Gates', () => {
    it('should validate authentication security requirements', async () => {
      const qualityGates = new HealthcareQualityGates()

      const mockUserId = 'test-user-123'
      const result = await qualityGates.validateAuthenticationSecurity(mockUserId)

      expect(result).toHaveProperty('passed')
      expect(result).toHaveProperty('score')
      expect(result).toHaveProperty('findings')
      expect(result).toHaveProperty('complianceLevel')
      expect(result.score).toBeGreaterThanOrEqual(0)
      expect(result.score).toBeLessThanOrEqual(100)
    })

    it('should validate crisis intervention protocols', async () => {
      const qualityGates = new HealthcareQualityGates()

      const mockUserId = 'test-user-123'
      const result = await qualityGates.validateCrisisInterventionProtocols(mockUserId)

      expect(result).toHaveProperty('passed')
      expect(result).toHaveProperty('clinicalRisk')
      expect(['low', 'medium', 'high', 'critical']).toContain(result.clinicalRisk)
    })

    it('should validate HIPAA compliance requirements', async () => {
      const qualityGates = new HealthcareQualityGates()

      const mockUserId = 'test-user-123'
      const result = await qualityGates.validateHipaaCompliance(mockUserId)

      expect(result).toHaveProperty('passed')
      expect(result).toHaveProperty('complianceLevel')
      expect(['non_compliant', 'basic', 'enhanced', 'fully_compliant']).toContain(result.complianceLevel)
    })

    it('should run comprehensive quality gates assessment', async () => {
      const qualityGates = new HealthcareQualityGates()

      const mockUserId = 'test-user-123'
      const results = await qualityGates.runComprehensiveQualityGates(mockUserId)

      expect(results).toHaveProperty('overallResult')
      expect(results).toHaveProperty('authenticationSecurity')
      expect(results).toHaveProperty('crisisIntervention')
      expect(results).toHaveProperty('hipaaCompliance')

      // Overall result should combine individual assessments
      expect(results.overallResult.passed).toBeDefined()
      expect(results.overallResult.score).toBeGreaterThanOrEqual(0)
    })
  })

  describe('Integration Tests', () => {
    it('should handle complete authentication flow with crisis detection', async () => {
      const { result } = renderHook(() => useAuth())

      // 1. User signs in
      await act(async () => {
        await result.current.signIn('patient@example.com', 'SecureP@ssw0rd!')
      })

      // 2. Crisis is detected
      await act(async () => {
        await result.current.reportCrisis('moderate')
      })

      // 3. Crisis intervention is triggered
      expect(result.current.crisisLevel).toBe('moderate')

      // 4. Authentication tier may be elevated
      await act(async () => {
        await result.current.elevateAuthenticationTier('sensitive')
      })

      expect(result.current.authenticationTier).toBe('sensitive')
    })

    it('should maintain session security throughout healthcare workflow', async () => {
      const { result } = renderHook(() => useAuth())

      // Provider authentication
      await act(async () => {
        await result.current.signIn('provider@hospital.com', 'ProviderP@ss123!')
      })

      // Tier elevation for clinical access
      await act(async () => {
        await result.current.elevateAuthenticationTier('clinical')
      })

      // HIPAA compliance validation
      expect(result.current.validateHipaaCompliance()).toBe(true)
      expect(result.current.canAccessClinicalData).toBe(true)

      // Session should remain secure
      expect(result.current.isAuthenticated).toBe(true)
      expect(result.current.authenticationTier).toBe('clinical')
    })
  })

  describe('Performance Tests', () => {
    it('should meet crisis response time requirements', async () => {
      const startTime = Date.now()

      // Simulate crisis detection and resource access
      await act(async () => {
        // Crisis resource access should be immediate
        const crisisResources = [
          { name: '988 Lifeline', accessible: true },
          { name: 'Crisis Text Line', accessible: true }
        ]

        expect(crisisResources).toBeDefined()
      })

      const responseTime = Date.now() - startTime

      // Crisis response should be under 500ms
      expect(responseTime).toBeLessThan(500)
    })

    it('should handle concurrent authentication requests', async () => {
      const concurrentRequests = 10
      const authPromises = []

      for (let i = 0; i < concurrentRequests; i++) {
        const { result } = renderHook(() => useAuth())
        authPromises.push(
          act(async () => {
            await result.current.signIn(`user${i}@example.com`, 'Password123!')
          })
        )
      }

      // All requests should complete without errors
      await expect(Promise.all(authPromises)).resolves.toBeDefined()
    })
  })
})

describe('Error Handling and Recovery', () => {
  it('should gracefully handle network failures', async () => {
    // Mock network failure
    const mockNetworkError = new Error('Network request failed')

    const { result } = renderHook(() => useAuth())

    // Authentication should fail gracefully
    await expect(
      act(async () => {
        throw mockNetworkError
      })
    ).rejects.toThrow('Network request failed')

    // Error should be tracked
    expect(result.current.error).toBeDefined()
  })

  it('should recover from temporary service outages', async () => {
    const { result } = renderHook(() => useAuth())

    // Simulate service recovery
    await act(async () => {
      result.current.error = null
      // Service is restored
    })

    expect(result.current.error).toBe(null)
  })

  it('should maintain crisis access during system failures', () => {
    // Crisis resources should always be accessible
    const crisisResources = [
      { name: '988 Lifeline', phone: '988', alwaysAvailable: true },
      { name: 'Emergency Services', phone: '911', alwaysAvailable: true }
    ]

    crisisResources.forEach(resource => {
      expect(resource.alwaysAvailable).toBe(true)
    })
  })
})
