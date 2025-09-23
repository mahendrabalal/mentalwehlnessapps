import { createClient } from './supabase'

export interface AuditLogEntry {
  id?: string
  timestamp: string
  user_id?: string
  session_id?: string
  event_type: AuditEventType
  event_category: AuditEventCategory
  resource_type?: string
  resource_id?: string
  action: string
  details: Record<string, any>
  ip_address?: string
  user_agent?: string
  outcome: 'success' | 'failure' | 'error'
  risk_level: 'low' | 'medium' | 'high' | 'critical'
  compliance_flags?: string[]
}

export enum AuditEventType {
  // Authentication events
  LOGIN = 'login',
  LOGOUT = 'logout',
  SIGNUP = 'signup',
  PASSWORD_RESET = 'password_reset',
  ACCOUNT_LOCKED = 'account_locked',

  // Data access events
  DATA_ACCESS = 'data_access',
  DATA_EXPORT = 'data_export',
  DATA_MODIFICATION = 'data_modification',
  DATA_DELETION = 'data_deletion',

  // Assessment events
  ASSESSMENT_START = 'assessment_start',
  ASSESSMENT_COMPLETE = 'assessment_complete',
  ASSESSMENT_VIEW = 'assessment_view',

  // Crisis events
  CRISIS_DETECTED = 'crisis_detected',
  CRISIS_SUPPORT_ACCESS = 'crisis_support_access',
  SAFETY_PLAN_ACCESS = 'safety_plan_access',

  // Administrative events
  SETTINGS_CHANGE = 'settings_change',
  PROFILE_UPDATE = 'profile_update',
  PERMISSION_CHANGE = 'permission_change',

  // Security events
  SUSPICIOUS_ACTIVITY = 'suspicious_activity',
  RATE_LIMIT_EXCEEDED = 'rate_limit_exceeded',
  UNAUTHORIZED_ACCESS = 'unauthorized_access',

  // System events
  SYSTEM_ERROR = 'system_error',
  BACKUP_CREATED = 'backup_created',
  MAINTENANCE_START = 'maintenance_start',
  MAINTENANCE_END = 'maintenance_end'
}

export enum AuditEventCategory {
  AUTHENTICATION = 'authentication',
  AUTHORIZATION = 'authorization',
  DATA_ACCESS = 'data_access',
  CLINICAL = 'clinical',
  SECURITY = 'security',
  SYSTEM = 'system',
  COMPLIANCE = 'compliance'
}

class AuditLogger {
  private supabase = createClient()
  private batchSize = 100
  private batchTimeout = 5000 // 5 seconds
  private pendingLogs: AuditLogEntry[] = []
  private batchTimer?: NodeJS.Timeout

  constructor() {
    // Set up periodic flushing
    this.startBatchTimer()
  }

  private startBatchTimer() {
    this.batchTimer = setInterval(() => {
      this.flush()
    }, this.batchTimeout)
  }

  async log(entry: Omit<AuditLogEntry, 'id' | 'timestamp'>): Promise<void> {
    const logEntry: AuditLogEntry = {
      ...entry,
      timestamp: new Date().toISOString(),
      compliance_flags: this.generateComplianceFlags(entry)
    }

    // Add to batch
    this.pendingLogs.push(logEntry)

    // Flush immediately for critical events
    if (entry.risk_level === 'critical') {
      await this.flush()
      return
    }

    // Flush if batch is full
    if (this.pendingLogs.length >= this.batchSize) {
      await this.flush()
    }
  }

  private generateComplianceFlags(entry: Omit<AuditLogEntry, 'id' | 'timestamp'>): string[] {
    const flags: string[] = []

    // HIPAA compliance flags
    if (entry.event_category === AuditEventCategory.DATA_ACCESS ||
        entry.event_category === AuditEventCategory.CLINICAL) {
      flags.push('HIPAA_PHI_ACCESS')
    }

    if (entry.event_type === AuditEventType.DATA_EXPORT) {
      flags.push('HIPAA_PHI_DISCLOSURE')
    }

    if (entry.event_type === AuditEventType.CRISIS_DETECTED) {
      flags.push('CLINICAL_CRISIS', 'SAFETY_ALERT')
    }

    if (entry.risk_level === 'critical' || entry.risk_level === 'high') {
      flags.push('HIGH_RISK_EVENT')
    }

    if (entry.event_category === AuditEventCategory.SECURITY) {
      flags.push('SECURITY_EVENT')
    }

    return flags
  }

  async flush(): Promise<void> {
    if (this.pendingLogs.length === 0) return

    const logsToProcess = [...this.pendingLogs]
    this.pendingLogs = []

    try {
      // In production, this should go to a secure audit logging service
      // For now, we'll store in Supabase with encryption
      await this.supabase
        .from('audit_logs')
        .insert(logsToProcess)

      // Also log to console in development
      if (process.env.NODE_ENV === 'development') {
        console.log(`[AUDIT] Logged ${logsToProcess.length} events:`,
          logsToProcess.map(log => ({
            timestamp: log.timestamp,
            event_type: log.event_type,
            user_id: log.user_id,
            outcome: log.outcome,
            risk_level: log.risk_level
          }))
        )
      }

    } catch (error) {
      console.error('[AUDIT] Failed to flush audit logs:', error)

      // In production, this should trigger an alert
      // For now, we'll attempt to re-add failed logs
      this.pendingLogs.unshift(...logsToProcess)
    }
  }

  // Helper methods for common audit events
  async logAuthentication(
    eventType: AuditEventType.LOGIN | AuditEventType.LOGOUT | AuditEventType.SIGNUP,
    outcome: 'success' | 'failure',
    userId?: string,
    details: Record<string, any> = {},
    request?: { ip?: string, userAgent?: string }
  ) {
    await this.log({
      event_type: eventType,
      event_category: AuditEventCategory.AUTHENTICATION,
      action: eventType,
      user_id: userId,
      outcome,
      details,
      risk_level: outcome === 'failure' ? 'medium' : 'low',
      ip_address: request?.ip,
      user_agent: request?.userAgent
    })
  }

  async logDataAccess(
    resourceType: string,
    resourceId: string,
    action: string,
    userId: string,
    outcome: 'success' | 'failure' | 'error',
    details: Record<string, any> = {},
    request?: { ip?: string, userAgent?: string }
  ) {
    await this.log({
      event_type: AuditEventType.DATA_ACCESS,
      event_category: AuditEventCategory.DATA_ACCESS,
      resource_type: resourceType,
      resource_id: resourceId,
      action,
      user_id: userId,
      outcome,
      details,
      risk_level: 'medium',
      ip_address: request?.ip,
      user_agent: request?.userAgent
    })
  }

  async logCrisisEvent(
    eventType: AuditEventType.CRISIS_DETECTED | AuditEventType.CRISIS_SUPPORT_ACCESS,
    userId: string,
    details: Record<string, any> = {},
    request?: { ip?: string, userAgent?: string }
  ) {
    await this.log({
      event_type: eventType,
      event_category: AuditEventCategory.CLINICAL,
      action: eventType,
      user_id: userId,
      outcome: 'success',
      details,
      risk_level: 'critical',
      compliance_flags: ['CLINICAL_CRISIS', 'SAFETY_ALERT'],
      ip_address: request?.ip,
      user_agent: request?.userAgent
    })
  }

  async logSecurityEvent(
    eventType: AuditEventType,
    action: string,
    outcome: 'success' | 'failure' | 'error',
    details: Record<string, any> = {},
    request?: { ip?: string, userAgent?: string }
  ) {
    await this.log({
      event_type: eventType,
      event_category: AuditEventCategory.SECURITY,
      action,
      outcome,
      details,
      risk_level: 'high',
      ip_address: request?.ip,
      user_agent: request?.userAgent
    })
  }

  async destroy() {
    if (this.batchTimer) {
      clearInterval(this.batchTimer)
    }
    await this.flush()
  }
}

// Singleton instance
export const auditLogger = new AuditLogger()

// Graceful shutdown
if (typeof process !== 'undefined') {
  process.on('SIGTERM', async () => {
    await auditLogger.destroy()
  })

  process.on('SIGINT', async () => {
    await auditLogger.destroy()
  })
}