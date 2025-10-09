import { useState, useEffect, useMemo, useCallback } from 'react'
import { createClient } from '@/lib/supabase'

interface MfaChallengeProps {
  onSuccess: () => void
  onCancel: () => void
  userId: string
  requiredTier: 'standard' | 'sensitive' | 'clinical' | 'emergency'
  crisisLevel?: 'none' | 'mild' | 'moderate' | 'severe' | 'imminent'
}

type MfaMethod = 'totp' | 'sms' | 'email' | 'backup_codes'

interface MfaSetup {
  method: MfaMethod
  enabled: boolean
  lastUsed?: string
  setupComplete: boolean
}

interface MfaEventPayload extends Record<string, unknown> {
  method?: MfaMethod
  requiredTier?: MfaChallengeProps['requiredTier']
  crisisLevel?: MfaChallengeProps['crisisLevel']
}

export function MfaChallenge({
  onSuccess,
  onCancel,
  userId,
  requiredTier,
  crisisLevel = 'none'
}: MfaChallengeProps) {
  const [selectedMethod, setSelectedMethod] = useState<MfaMethod>('totp')
  const [verificationCode, setVerificationCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [availableMethods, setAvailableMethods] = useState<MfaSetup[]>([])
  const [showBackupCodes, setShowBackupCodes] = useState(false)
  const [resendCooldown, setResendCooldown] = useState(0)
  const supabase = useMemo(() => createClient(), [])

  const loadAvailableMethods = useCallback(async () => {
    try {
      const { data } = await supabase
        .from('user_mfa_methods')
        .select('method, enabled, last_used, setup_complete')
        .eq('user_id', userId)
        .eq('enabled', true)

      if (data) {
        // Transform database fields to match interface
        const transformedMethods: MfaSetup[] = data.map(item => ({
          method: item.method as MfaMethod,
          enabled: item.enabled,
          lastUsed: item.last_used,
          setupComplete: item.setup_complete
        }))

        setAvailableMethods(transformedMethods)
        // Default to first available method
        if (transformedMethods.length > 0) {
          setSelectedMethod(transformedMethods[0].method)
        }
      }
    } catch (err) {
      console.error('Error loading MFA methods:', err)
    }
  }, [supabase, userId])

  useEffect(() => {
    loadAvailableMethods()
  }, [loadAvailableMethods])

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [resendCooldown])

  const handleVerification = async () => {
    if (!verificationCode.trim()) {
      setError('Please enter a verification code')
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Log MFA attempt
      await logMfaEvent('verification_attempt', {
        method: selectedMethod,
        requiredTier,
        crisisLevel
      })

      // Verify the code based on selected method
      const isValid = await verifyMfaCode(selectedMethod, verificationCode)

      if (isValid) {
        // Log successful verification
        await logMfaEvent('verification_success', {
          method: selectedMethod,
          requiredTier,
          crisisLevel
        })

        // Update last used timestamp
        await supabase
          .from('user_mfa_methods')
          .update({ last_used: new Date().toISOString() })
          .eq('user_id', userId)
          .eq('method', selectedMethod)

        onSuccess()
      } else {
        setError('Invalid verification code. Please try again.')

        // Log failed verification
        await logMfaEvent('verification_failed', {
          method: selectedMethod,
          requiredTier,
          crisisLevel,
          code_length: verificationCode.length
        })
      }
    } catch (err) {
      console.error('MFA verification error:', err)
      setError('Verification failed. Please try again.')

      await logMfaEvent('verification_error', {
        method: selectedMethod,
        error: err instanceof Error ? err.message : 'Unknown error'
      })
    } finally {
      setLoading(false)
    }
  }

  const verifyMfaCode = async (method: MfaMethod, code: string): Promise<boolean> => {
    switch (method) {
      case 'totp':
        return verifyTotpCode(code)
      case 'sms':
        return verifySmsCode(code)
      case 'email':
        return verifyEmailCode(code)
      case 'backup_codes':
        return verifyBackupCode(code)
      default:
        return false
    }
  }

  const verifyTotpCode = async (code: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.rpc('verify_totp', {
        user_id: userId,
        token: code
      })

      return !error && data === true
    } catch {
      return false
    }
  }

  const verifySmsCode = async (code: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.rpc('verify_sms_code', {
        user_id: userId,
        code: code
      })

      return !error && data === true
    } catch {
      return false
    }
  }

  const verifyEmailCode = async (code: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.rpc('verify_email_code', {
        user_id: userId,
        code: code
      })

      return !error && data === true
    } catch {
      return false
    }
  }

  const verifyBackupCode = async (code: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.rpc('verify_backup_code', {
        user_id: userId,
        code: code
      })

      if (!error && data === true) {
        // Backup codes can only be used once
        await supabase
          .from('user_backup_codes')
          .update({ used: true, used_at: new Date().toISOString() })
          .eq('user_id', userId)
          .eq('code', code)

        return true
      }

      return false
    } catch {
      return false
    }
  }

  const resendCode = async () => {
    if (resendCooldown > 0) return

    setLoading(true)
    setError(null)

    try {
      await logMfaEvent('code_resend_request', {
        method: selectedMethod,
        requiredTier
      })

      if (selectedMethod === 'sms') {
        await supabase.rpc('send_sms_verification', { user_id: userId })
      } else if (selectedMethod === 'email') {
        await supabase.rpc('send_email_verification', { user_id: userId })
      }

      setResendCooldown(30) // 30 second cooldown
    } catch (err) {
      setError('Failed to resend code. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const logMfaEvent = async (event: string, data: MfaEventPayload) => {
    try {
      await supabase
        .from('mfa_audit_log')
        .insert({
          user_id: userId,
          event_type: event,
          method: data.method,
          required_tier: data.requiredTier,
          crisis_level: data.crisisLevel,
          event_data: data,
          timestamp: new Date().toISOString(),
          ip_address: 'client_ip', // Would be populated server-side
          user_agent: navigator.userAgent
        })
    } catch (err) {
      console.error('Error logging MFA event:', err)
    }
  }

  // Crisis bypass for severe situations
  if (crisisLevel === 'severe' || crisisLevel === 'imminent') {
    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
        <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
          <div className="mt-3 text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
              <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.96-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-lg leading-6 font-medium text-gray-900 mt-4">Crisis Detected</h3>
            <div className="mt-2 px-7 py-3">
              <p className="text-sm text-gray-500">
                Due to the crisis level detected, additional authentication has been bypassed.
                Emergency access has been granted.
              </p>
            </div>
            <div className="items-center px-4 py-3">
              <button
                onClick={onSuccess}
                className="px-4 py-2 bg-red-600 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300"
              >
                Continue with Emergency Access
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            Additional Verification Required
          </h3>

          <p className="text-sm text-gray-600 mb-4">
            Access to {requiredTier} resources requires multi-factor authentication.
          </p>

          {availableMethods.length > 1 && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Verification Method
              </label>
              <select
                value={selectedMethod}
                onChange={(e) => setSelectedMethod(e.target.value as MfaMethod)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-therapy-500 focus:border-therapy-500"
              >
                {availableMethods.map((method) => (
                  <option key={method.method} value={method.method}>
                    {getMethodDisplayName(method.method)}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {getCodeLabel(selectedMethod)}
            </label>
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder={getCodePlaceholder(selectedMethod)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-therapy-500 focus:border-therapy-500"
              maxLength={selectedMethod === 'backup_codes' ? 8 : 6}
              autoComplete="one-time-code"
            />
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <div className="flex flex-col space-y-3">
            <button
              onClick={handleVerification}
              disabled={loading || !verificationCode.trim()}
              className="w-full px-4 py-2 bg-therapy-600 text-white rounded-md hover:bg-therapy-700 focus:outline-none focus:ring-2 focus:ring-therapy-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Verifying...' : 'Verify'}
            </button>

            {(selectedMethod === 'sms' || selectedMethod === 'email') && (
              <button
                onClick={resendCode}
                disabled={loading || resendCooldown > 0}
                className="w-full px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend Code'}
              </button>
            )}

            {!showBackupCodes && availableMethods.some(m => m.method === 'backup_codes') && (
              <button
                onClick={() => {
                  setShowBackupCodes(true)
                  setSelectedMethod('backup_codes')
                }}
                className="text-sm text-therapy-600 hover:text-therapy-500"
              >
                Use backup code instead
              </button>
            )}

            <button
              onClick={onCancel}
              className="w-full px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function getMethodDisplayName(method: MfaMethod): string {
  switch (method) {
    case 'totp':
      return 'Authenticator App'
    case 'sms':
      return 'SMS Text Message'
    case 'email':
      return 'Email Code'
    case 'backup_codes':
      return 'Backup Code'
    default:
      return method
  }
}

function getCodeLabel(method: MfaMethod): string {
  switch (method) {
    case 'totp':
      return 'Authenticator Code'
    case 'sms':
      return 'SMS Code'
    case 'email':
      return 'Email Code'
    case 'backup_codes':
      return 'Backup Code'
    default:
      return 'Verification Code'
  }
}

function getCodePlaceholder(method: MfaMethod): string {
  switch (method) {
    case 'totp':
      return 'Enter 6-digit code'
    case 'sms':
      return 'Enter SMS code'
    case 'email':
      return 'Enter email code'
    case 'backup_codes':
      return 'Enter 8-character code'
    default:
      return 'Enter code'
  }
}
