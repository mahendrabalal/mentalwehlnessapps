import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@/lib/supabase'

interface HealthCheckResponse {
  status: 'healthy' | 'unhealthy'
  timestamp: string
  version: string
  environment: string
  services: {
    database: 'healthy' | 'unhealthy'
    auth: 'healthy' | 'unhealthy'
  }
  uptime: number
  memory: {
    used: number
    total: number
  }
  checks: {
    [key: string]: {
      status: 'pass' | 'fail'
      duration: number
      error?: string
    }
  }
}

const startTime = Date.now()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<HealthCheckResponse>
) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    res.status(405).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      services: { database: 'unhealthy', auth: 'unhealthy' },
      uptime: 0,
      memory: { used: 0, total: 0 },
      checks: {
        method: {
          status: 'fail',
          duration: 0,
          error: 'Method not allowed'
        }
      }
    })
    return
  }

  const checks: HealthCheckResponse['checks'] = {}
  let overallStatus: 'healthy' | 'unhealthy' = 'healthy'

  // Memory usage check
  const memoryUsage = process.memoryUsage()
  const memoryUsedMB = Math.round(memoryUsage.heapUsed / 1024 / 1024)
  const memoryTotalMB = Math.round(memoryUsage.heapTotal / 1024 / 1024)

  // Database connectivity check
  const dbCheckStart = Date.now()
  try {
    const supabase = createClient()

    // Simple query to test database connectivity
    const { error } = await supabase
      .from('user_profiles')
      .select('id')
      .limit(1)

    if (error) {
      throw new Error(error.message)
    }

    checks.database = {
      status: 'pass',
      duration: Date.now() - dbCheckStart
    }
  } catch (error) {
    checks.database = {
      status: 'fail',
      duration: Date.now() - dbCheckStart,
      error: error instanceof Error ? error.message : 'Unknown database error'
    }
    overallStatus = 'unhealthy'
  }

  // Auth service check
  const authCheckStart = Date.now()
  try {
    const supabase = createClient()

    // Test auth service availability
    const { error } = await supabase.auth.getSession()

    if (error) {
      throw new Error(error.message)
    }

    checks.auth = {
      status: 'pass',
      duration: Date.now() - authCheckStart
    }
  } catch (error) {
    checks.auth = {
      status: 'fail',
      duration: Date.now() - authCheckStart,
      error: error instanceof Error ? error.message : 'Unknown auth error'
    }
    overallStatus = 'unhealthy'
  }

  // Environment variables check
  const envCheckStart = Date.now()
  try {
    const requiredVars = [
      'NEXT_PUBLIC_SUPABASE_URL',
      'NEXT_PUBLIC_SUPABASE_ANON_KEY'
    ]

    const missingVars = requiredVars.filter(varName => !process.env[varName])

    if (missingVars.length > 0) {
      throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`)
    }

    checks.environment = {
      status: 'pass',
      duration: Date.now() - envCheckStart
    }
  } catch (error) {
    checks.environment = {
      status: 'fail',
      duration: Date.now() - envCheckStart,
      error: error instanceof Error ? error.message : 'Unknown environment error'
    }
    overallStatus = 'unhealthy'
  }

  // Memory usage check
  const memoryCheckStart = Date.now()
  const memoryThresholdMB = 512 // 512MB threshold

  if (memoryUsedMB > memoryThresholdMB) {
    checks.memory = {
      status: 'fail',
      duration: Date.now() - memoryCheckStart,
      error: `Memory usage (${memoryUsedMB}MB) exceeds threshold (${memoryThresholdMB}MB)`
    }
    overallStatus = 'unhealthy'
  } else {
    checks.memory = {
      status: 'pass',
      duration: Date.now() - memoryCheckStart
    }
  }

  const response: HealthCheckResponse = {
    status: overallStatus,
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    services: {
      database: checks.database?.status === 'pass' ? 'healthy' : 'unhealthy',
      auth: checks.auth?.status === 'pass' ? 'healthy' : 'unhealthy'
    },
    uptime: Math.floor((Date.now() - startTime) / 1000),
    memory: {
      used: memoryUsedMB,
      total: memoryTotalMB
    },
    checks
  }

  // Set appropriate status code
  const statusCode = overallStatus === 'healthy' ? 200 : 503

  // Add cache headers to prevent caching of health checks
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
  res.setHeader('Pragma', 'no-cache')
  res.setHeader('Expires', '0')

  res.status(statusCode).json(response)
}