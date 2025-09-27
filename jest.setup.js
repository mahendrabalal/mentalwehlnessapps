// Jest setup for healthcare testing
// Mental Wellness App - HIPAA-Compliant Testing Configuration

import '@testing-library/jest-dom'

// Mock environment variables for testing
process.env.NODE_ENV = 'test'
process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test-project.supabase.co'
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-anon-key'
process.env.SUPABASE_SERVICE_ROLE_KEY = 'test-service-role-key'
process.env.APP_ENCRYPTION_KEY = 'test-encryption-key-32-characters-long'
process.env.JWT_SECRET = 'test-jwt-secret'

// Healthcare-specific test environment
process.env.HIPAA_TESTING_MODE = 'true'
process.env.CRISIS_SIMULATION_MODE = 'true'
process.env.ENABLE_DEBUG_LOGGING = 'false'
process.env.BYPASS_HIPAA_CHECKS = 'false'

// Mock external healthcare APIs for testing
global.fetch = jest.fn()

// Mock NPPES API responses
const mockNPPESResponse = {
  results: [{
    number: '1234567893',
    enumeration_type: 'NPI-1',
    basic: {
      first_name: 'John',
      last_name: 'Doe',
      credential: 'MD',
      status: 'A',
      enumeration_date: '2020-01-01',
      last_updated: '2023-01-01'
    },
    taxonomies: [{
      code: '207Q00000X',
      desc: 'Family Medicine',
      primary: true,
      license: 'A12345'
    }],
    addresses: [{
      country_code: 'US',
      address_purpose: 'LOCATION',
      address_type: 'DOM',
      address_1: '123 Medical Dr',
      city: 'Healthcare City',
      state: 'CA',
      postal_code: '90210'
    }]
  }],
  result_count: 1
}

// Setup fetch mock for healthcare APIs
beforeEach(() => {
  fetch.mockClear()

  fetch.mockImplementation((url) => {
    if (url.includes('npiregistry.cms.hhs.gov')) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockNPPESResponse)
      })
    }

    if (url.includes('crisis-text-line')) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ status: 'available' })
      })
    }

    if (url.includes('health')) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          status: 'healthy',
          timestamp: new Date().toISOString()
        })
      })
    }

    return Promise.reject(new Error('Unmocked URL: ' + url))
  })
})

// Mock Supabase client for testing
jest.mock('@supabase/supabase-js', () => ({
  createClient: jest.fn(() => ({
    auth: {
      getSession: jest.fn(() => Promise.resolve({
        data: {
          session: {
            user: { id: 'test-user', email: 'test@example.com' },
            expires_at: Date.now() / 1000 + 3600
          }
        },
        error: null
      })),
      signInWithPassword: jest.fn(() => Promise.resolve({
        data: {
          user: { id: 'test-user', email: 'test@example.com' },
          session: { user: { id: 'test-user' } }
        },
        error: null
      })),
      signOut: jest.fn(() => Promise.resolve({ error: null })),
      onAuthStateChange: jest.fn(() => ({
        data: {
          subscription: {
            unsubscribe: jest.fn()
          }
        }
      }))
    },
    from: jest.fn(() => ({
      select: jest.fn().mockReturnThis(),
      insert: jest.fn().mockReturnThis(),
      update: jest.fn().mockReturnThis(),
      delete: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      neq: jest.fn().mockReturnThis(),
      gt: jest.fn().mockReturnThis(),
      gte: jest.fn().mockReturnThis(),
      lt: jest.fn().mockReturnThis(),
      lte: jest.fn().mockReturnThis(),
      like: jest.fn().mockReturnThis(),
      ilike: jest.fn().mockReturnThis(),
      is: jest.fn().mockReturnThis(),
      in: jest.fn().mockReturnThis(),
      contains: jest.fn().mockReturnThis(),
      containedBy: jest.fn().mockReturnThis(),
      rangeGt: jest.fn().mockReturnThis(),
      rangeGte: jest.fn().mockReturnThis(),
      rangeLt: jest.fn().mockReturnThis(),
      rangeLte: jest.fn().mockReturnThis(),
      rangeAdjacent: jest.fn().mockReturnThis(),
      overlaps: jest.fn().mockReturnThis(),
      textSearch: jest.fn().mockReturnThis(),
      match: jest.fn().mockReturnThis(),
      not: jest.fn().mockReturnThis(),
      or: jest.fn().mockReturnThis(),
      filter: jest.fn().mockReturnThis(),
      order: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      range: jest.fn().mockReturnThis(),
      single: jest.fn(() => Promise.resolve({
        data: {
          id: 'test-profile',
          user_id: 'test-user',
          role: 'patient',
          authentication_tier: 'standard',
          crisis_level: 'none',
          hipaa_authorization: true,
          consent_to_treatment: true
        },
        error: null
      })),
      maybeSingle: jest.fn().mockReturnThis(),
      then: jest.fn(callback => callback({
        data: [],
        error: null
      }))
    })),
    rpc: jest.fn(() => Promise.resolve({
      data: true,
      error: null
    }))
  }))
}))

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter: () => ({
    route: '/',
    pathname: '/',
    query: {},
    asPath: '/',
    push: jest.fn(),
    pop: jest.fn(),
    reload: jest.fn(),
    back: jest.fn(),
    prefetch: jest.fn(),
    beforePopState: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
    isFallback: false,
  }),
}))

// Mock crypto for encryption testing
Object.defineProperty(global, 'crypto', {
  value: {
    getRandomValues: jest.fn(() => new Uint32Array(10)),
    randomUUID: jest.fn(() => 'test-uuid-1234'),
    subtle: {
      encrypt: jest.fn(() => Promise.resolve(new ArrayBuffer(8))),
      decrypt: jest.fn(() => Promise.resolve(new ArrayBuffer(8))),
      generateKey: jest.fn(() => Promise.resolve({})),
      importKey: jest.fn(() => Promise.resolve({})),
      exportKey: jest.fn(() => Promise.resolve(new ArrayBuffer(8))),
    }
  }
})

// Mock console methods for cleaner test output
global.console = {
  ...console,
  // Suppress logs unless in debug mode
  log: process.env.DEBUG_TESTS ? console.log : jest.fn(),
  debug: process.env.DEBUG_TESTS ? console.debug : jest.fn(),
  info: process.env.DEBUG_TESTS ? console.info : jest.fn(),
  warn: console.warn, // Keep warnings
  error: console.error, // Keep errors
}

// Healthcare-specific test utilities
global.healthcareTestUtils = {
  // Mock user profiles
  createMockPatient: (overrides = {}) => ({
    id: 'patient-123',
    user_id: 'user-123',
    role: 'patient',
    authentication_tier: 'standard',
    crisis_level: 'none',
    hipaa_authorization: true,
    consent_to_treatment: true,
    emergency_contact_name: 'Jane Doe',
    emergency_contact_phone: '555-0123',
    ...overrides
  }),

  createMockProvider: (overrides = {}) => ({
    id: 'provider-456',
    user_id: 'user-456',
    role: 'provider',
    authentication_tier: 'clinical',
    crisis_level: 'none',
    npi_number: '1234567893',
    license_number: 'MD12345',
    license_state: 'CA',
    credential_verification_status: 'verified',
    hipaa_authorization: true,
    ...overrides
  }),

  // Mock crisis scenarios
  createCrisisScenario: (level = 'moderate') => ({
    user_id: 'user-123',
    crisis_level: level,
    assessment_data: {
      thoughts_of_harm: level !== 'none',
      specific_plan: level === 'severe' || level === 'imminent',
      means_available: level === 'imminent',
      timeline: level === 'imminent' ? 'immediate' : 'days',
      support_system: 'some',
      previous_attempts: false,
      substance_use: false
    },
    calculated_risk: level,
    completed_at: new Date().toISOString()
  }),

  // Mock quality gate results
  createQualityGateResult: (passed = true, score = 85) => ({
    passed,
    score,
    findings: [],
    recommendations: [],
    complianceLevel: score >= 90 ? 'fully_compliant' : score >= 70 ? 'enhanced' : 'basic',
    clinicalRisk: score >= 80 ? 'low' : score >= 60 ? 'medium' : 'high'
  }),

  // HIPAA compliance helpers
  createAuditEvent: (eventType = 'phi_access') => ({
    id: 'audit-123',
    event_type: eventType,
    user_id: 'user-123',
    timestamp: new Date().toISOString(),
    ip_address: '192.168.1.1',
    user_agent: 'Mozilla/5.0 Test',
    hipaa_relevant: true,
    event_data: {}
  }),

  // Crisis intervention helpers
  createEmergencyIntervention: (level = 'severe') => ({
    id: 'intervention-123',
    user_id: 'user-123',
    crisis_level: level,
    intervention_type: 'automatic_notification',
    triggered_at: new Date().toISOString(),
    intervention_status: 'initiated',
    provider_notified: true,
    emergency_contact_notified: true
  })
}

// Performance testing utilities
global.performanceTestUtils = {
  measureResponseTime: async (fn) => {
    const start = performance.now()
    await fn()
    const end = performance.now()
    return end - start
  },

  expectFastResponse: (time, maxMs = 500) => {
    expect(time).toBeLessThan(maxMs)
  },

  expectCrisisResponse: (time) => {
    // Crisis responses must be under 2 seconds
    expect(time).toBeLessThan(2000)
  }
}

// Compliance testing utilities
global.complianceTestUtils = {
  validateHIPAACompliance: (data) => {
    // Check for required HIPAA fields
    expect(data).toHaveProperty('hipaa_authorization')
    expect(data).toHaveProperty('consent_to_treatment')
    expect(data.hipaa_authorization).toBe(true)
  },

  validateAuditTrail: (auditEvent) => {
    expect(auditEvent).toHaveProperty('timestamp')
    expect(auditEvent).toHaveProperty('user_id')
    expect(auditEvent).toHaveProperty('event_type')
    expect(auditEvent).toHaveProperty('hipaa_relevant')
  },

  validateDataMinimization: (data, userRole) => {
    if (userRole === 'patient') {
      // Patients shouldn't see other patients' data
      expect(data).not.toHaveProperty('other_patient_data')
    }
    if (userRole !== 'provider') {
      // Non-providers shouldn't see clinical notes
      expect(data).not.toHaveProperty('clinical_notes')
    }
  }
}

// Setup global test environment
beforeAll(() => {
  // Set up healthcare testing environment
  console.log('🏥 Healthcare Testing Environment Initialized')
  console.log('✅ HIPAA Compliance Mode: Enabled')
  console.log('🚨 Crisis Simulation Mode: Enabled')
  console.log('🔐 Security Testing: Enabled')
})

afterAll(() => {
  // Cleanup after all tests
  console.log('🧹 Healthcare Test Environment Cleanup Complete')
})

// Global error handler for unhandled rejections in tests
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason)
  // Don't exit process in tests, but log the error
})

// Increase timeout for healthcare integration tests
jest.setTimeout(10000)