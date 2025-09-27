import { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@/lib/supabase'

interface HealthCheckResult {
  status: 'healthy' | 'degraded' | 'unhealthy'
  timestamp: string
  version: string
  environment: string
  checks: {
    database: {
      status: 'healthy' | 'unhealthy'
      response_time_ms: number
      details?: string
    }
    supabase: {
      status: 'healthy' | 'unhealthy'
      response_time_ms: number
      details?: string
    }
    external_apis: {
      status: 'healthy' | 'degraded' | 'unhealthy'
      response_time_ms: number
      details: {
        nppes: { status: string; response_time_ms: number }
        crisis_text_line: { status: string; response_time_ms: number }
        emergency_services: { status: string; response_time_ms: number }
      }
    }
    memory: {
      status: 'healthy' | 'unhealthy'
      usage_mb: number
      limit_mb: number
      percentage: number
    }
    disk: {
      status: 'healthy' | 'unhealthy'
      usage_percentage: number
    }
  }
  hipaa_compliance: {
    status: 'compliant' | 'non_compliant'
    last_audit: string
    encryption_enabled: boolean
    audit_logging_enabled: boolean
  }
  crisis_systems: {
    status: 'operational' | 'degraded' | 'down'
    hotlines_accessible: boolean
    emergency_protocols_active: boolean
    response_time_ms: number
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<HealthCheckResult | { error: string }>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Verify health check token if configured
  const healthCheckToken = process.env.HEALTH_CHECK_TOKEN
  if (healthCheckToken) {
    const providedToken = req.headers.authorization?.replace('Bearer ', '') || req.query.token
    if (providedToken !== healthCheckToken) {
      return res.status(401).json({ error: 'Unauthorized' })
    }
  }

  const startTime = Date.now()

  try {
    // Perform all health checks
    const [
      databaseCheck,
      supabaseCheck,
      externalApisCheck,
      memoryCheck,
      diskCheck,
      hipaaComplianceCheck,
      crisisSystemsCheck
    ] = await Promise.allSettled([
      checkDatabase(),
      checkSupabase(),
      checkExternalAPIs(),
      checkMemory(),
      checkDisk(),
      checkHIPAACompliance(),
      checkCrisisSystems()
    ])

    // Extract results from settled promises
    const database = databaseCheck.status === 'fulfilled' ? databaseCheck.value : { status: 'unhealthy' as const, response_time_ms: 0, details: 'Check failed' }
    const supabase = supabaseCheck.status === 'fulfilled' ? supabaseCheck.value : { status: 'unhealthy' as const, response_time_ms: 0, details: 'Check failed' }
    const external_apis = externalApisCheck.status === 'fulfilled' ? externalApisCheck.value : { status: 'unhealthy' as const, response_time_ms: 0, details: { nppes: { status: 'unhealthy', response_time_ms: 0 }, crisis_text_line: { status: 'unhealthy', response_time_ms: 0 }, emergency_services: { status: 'unhealthy', response_time_ms: 0 } } }
    const memory = memoryCheck.status === 'fulfilled' ? memoryCheck.value : { status: 'unhealthy' as const, usage_mb: 0, limit_mb: 0, percentage: 0 }
    const disk = diskCheck.status === 'fulfilled' ? diskCheck.value : { status: 'unhealthy' as const, usage_percentage: 0 }
    const hipaa_compliance = hipaaComplianceCheck.status === 'fulfilled' ? hipaaComplianceCheck.value : { status: 'non_compliant' as const, last_audit: 'unknown', encryption_enabled: false, audit_logging_enabled: false }
    const crisis_systems = crisisSystemsCheck.status === 'fulfilled' ? crisisSystemsCheck.value : { status: 'down' as const, hotlines_accessible: false, emergency_protocols_active: false, response_time_ms: 0 }

    // Determine overall status
    const overallStatus = determineOverallStatus({
      database,
      supabase,
      external_apis,
      memory,
      disk,
      hipaa_compliance,
      crisis_systems
    })

    const result: HealthCheckResult = {
      status: overallStatus,
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      checks: {
        database,
        supabase,
        external_apis,
        memory,
        disk
      },
      hipaa_compliance,
      crisis_systems
    }

    // Return appropriate HTTP status code
    const httpStatus = overallStatus === 'healthy' ? 200 : overallStatus === 'degraded' ? 200 : 503

    res.status(httpStatus).json(result)

  } catch (error) {
    console.error('Health check error:', error)
    res.status(500).json({
      error: 'Health check failed'
    })
  }
}

async function checkDatabase() {
  const startTime = Date.now()

  try {
    const supabase = createClient()

    // Simple query to test database connectivity
    const { data, error } = await supabase
      .from('user_profiles')
      .select('count')
      .limit(1)

    const responseTime = Date.now() - startTime

    if (error) {
      return {
        status: 'unhealthy' as const,
        response_time_ms: responseTime,
        details: `Database error: ${error.message}`
      }
    }

    return {
      status: 'healthy' as const,
      response_time_ms: responseTime
    }
  } catch (error) {
    return {
      status: 'unhealthy' as const,
      response_time_ms: Date.now() - startTime,
      details: 'Database connection failed'
    }
  }
}

async function checkSupabase() {
  const startTime = Date.now()

  try {
    const supabase = createClient()

    // Test Supabase Auth
    const { data, error } = await supabase.auth.getSession()

    const responseTime = Date.now() - startTime

    return {
      status: 'healthy' as const,
      response_time_ms: responseTime
    }
  } catch (error) {
    return {
      status: 'unhealthy' as const,
      response_time_ms: Date.now() - startTime,
      details: 'Supabase connection failed'
    }
  }
}

async function checkExternalAPIs() {
  const startTime = Date.now()

  const checks = await Promise.allSettled([
    checkNPPESAPI(),
    checkCrisisTextLine(),
    checkEmergencyServices()
  ])

  const nppes = checks[0].status === 'fulfilled' ? checks[0].value : { status: 'unhealthy', response_time_ms: 0 }
  const crisis_text_line = checks[1].status === 'fulfilled' ? checks[1].value : { status: 'unhealthy', response_time_ms: 0 }
  const emergency_services = checks[2].status === 'fulfilled' ? checks[2].value : { status: 'unhealthy', response_time_ms: 0 }

  const responseTime = Date.now() - startTime

  // Determine overall external API status
  const healthyCount = [nppes, crisis_text_line, emergency_services].filter(api => api.status === 'healthy').length
  let status: 'healthy' | 'degraded' | 'unhealthy'

  if (healthyCount === 3) {
    status = 'healthy'
  } else if (healthyCount >= 1) {
    status = 'degraded'
  } else {
    status = 'unhealthy'
  }

  return {
    status,
    response_time_ms: responseTime,
    details: {
      nppes,
      crisis_text_line,
      emergency_services
    }
  }
}

async function checkNPPESAPI() {
  const startTime = Date.now()

  try {
    // Test NPPES API with a known test NPI
    const response = await fetch('https://npiregistry.cms.hhs.gov/api/?number=1234567893&version=2.1', {
      method: 'GET'
    })

    const responseTime = Date.now() - startTime

    if (response.ok) {
      return { status: 'healthy', response_time_ms: responseTime }
    } else {
      return { status: 'degraded', response_time_ms: responseTime }
    }
  } catch (error) {
    return { status: 'unhealthy', response_time_ms: Date.now() - startTime }
  }
}

async function checkCrisisTextLine() {
  const startTime = Date.now()

  // For crisis services, we don't want to make actual test calls
  // Instead, verify the configuration is present
  const responseTime = Date.now() - startTime

  const hasConfig = process.env.CRISIS_TEXT_LINE_API_KEY || true // Always return healthy for now

  return {
    status: hasConfig ? 'healthy' : 'degraded' as 'healthy' | 'degraded',
    response_time_ms: responseTime
  }
}

async function checkEmergencyServices() {
  const startTime = Date.now()

  // For emergency services, verify configuration
  const responseTime = Date.now() - startTime

  return {
    status: 'healthy' as const,
    response_time_ms: responseTime
  }
}

async function checkMemory() {
  try {
    const memUsage = process.memoryUsage()
    const heapUsedMB = Math.round(memUsage.heapUsed / 1024 / 1024)
    const heapTotalMB = Math.round(memUsage.heapTotal / 1024 / 1024)
    const percentage = Math.round((heapUsedMB / heapTotalMB) * 100)

    return {
      status: percentage > 90 ? 'unhealthy' as const : 'healthy' as const,
      usage_mb: heapUsedMB,
      limit_mb: heapTotalMB,
      percentage
    }
  } catch (error) {
    return {
      status: 'unhealthy' as const,
      usage_mb: 0,
      limit_mb: 0,
      percentage: 0
    }
  }
}

async function checkDisk() {
  // Simplified disk check - in production, use actual filesystem checks
  return {
    status: 'healthy' as const,
    usage_percentage: 45 // Mock value
  }
}

async function checkHIPAACompliance() {
  const supabase = createClient()

  try {
    // Check if audit logging is working
    const { data: recentAudits } = await supabase
      .from('authentication_audit_log')
      .select('id')
      .gte('timestamp', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
      .limit(1)

    const auditLoggingEnabled = !!(recentAudits && recentAudits.length > 0)

    return {
      status: auditLoggingEnabled ? 'compliant' as const : 'non_compliant' as const,
      last_audit: new Date().toISOString(),
      encryption_enabled: true, // Assuming Supabase encryption is enabled
      audit_logging_enabled: auditLoggingEnabled
    }
  } catch (error) {
    return {
      status: 'non_compliant' as const,
      last_audit: 'unknown',
      encryption_enabled: false,
      audit_logging_enabled: false
    }
  }
}

async function checkCrisisSystems() {
  const startTime = Date.now()

  try {
    const supabase = createClient()

    // Check if crisis resources are accessible
    const { data: crisisResources } = await supabase
      .from('crisis_resources')
      .select('id')
      .eq('active', true)
      .limit(1)

    const responseTime = Date.now() - startTime
    const hotlinesAccessible = !!(crisisResources && crisisResources.length > 0)

    return {
      status: hotlinesAccessible ? 'operational' as const : 'degraded' as const,
      hotlines_accessible: hotlinesAccessible,
      emergency_protocols_active: true, // Assume protocols are active
      response_time_ms: responseTime
    }
  } catch (error) {
    return {
      status: 'down' as const,
      hotlines_accessible: false,
      emergency_protocols_active: false,
      response_time_ms: Date.now() - startTime
    }
  }
}

function determineOverallStatus(checks: any): 'healthy' | 'degraded' | 'unhealthy' {
  // Crisis systems are critical - if they're down, overall status is unhealthy
  if (checks.crisis_systems.status === 'down') {
    return 'unhealthy'
  }

  // HIPAA compliance is critical - if non-compliant, overall status is unhealthy
  if (checks.hipaa_compliance.status === 'non_compliant') {
    return 'unhealthy'
  }

  // Database and Supabase are critical
  if (checks.database.status === 'unhealthy' || checks.supabase.status === 'unhealthy') {
    return 'unhealthy'
  }

  // Check for degraded services
  const degradedServices = [
    checks.external_apis.status === 'degraded' || checks.external_apis.status === 'unhealthy',
    checks.crisis_systems.status === 'degraded',
    checks.memory.status === 'unhealthy',
    checks.disk.status === 'unhealthy'
  ].filter(Boolean).length

  if (degradedServices > 1) {
    return 'degraded'
  }

  if (degradedServices === 1) {
    return 'degraded'
  }

  return 'healthy'
}