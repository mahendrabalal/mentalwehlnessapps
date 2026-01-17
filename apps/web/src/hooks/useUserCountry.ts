import { useState, useEffect } from 'react'
import { getSupportedCountries, isCountrySupported } from '@/lib/international-crisis-resources'

const COUNTRY_STORAGE_KEY = 'user_country_preference'
const AUTO_DETECT_STORAGE_KEY = 'country_auto_detected'

export interface UserCountryState {
  countryCode: string | null
  countryName: string | null
  isLoading: boolean
  isAutoDetected: boolean
  error: string | null
}

/**
 * Hook to detect and manage user's country for crisis support resources
 *
 * Priority:
 * 1. User's manual selection (from localStorage)
 * 2. Browser timezone detection
 * 3. IP geolocation (fallback)
 * 4. Default to universal resources
 */
export function useUserCountry() {
  const [state, setState] = useState<UserCountryState>({
    countryCode: null,
    countryName: null,
    isLoading: true,
    isAutoDetected: false,
    error: null
  })

  useEffect(() => {
    detectUserCountry()
  }, [])

  const detectUserCountry = async () => {
    try {
      // 1. Check if user has manually selected a country
      const savedCountry = localStorage.getItem(COUNTRY_STORAGE_KEY)
      if (savedCountry) {
        const parsed = JSON.parse(savedCountry)
        setState({
          countryCode: parsed.code,
          countryName: parsed.name,
          isLoading: false,
          isAutoDetected: false,
          error: null
        })
        return
      }

      // 2. Try browser timezone-based detection
      const timezoneCountry = getCountryFromTimezone()
      if (timezoneCountry && isCountrySupported(timezoneCountry.code)) {
        // Save auto-detected country
        localStorage.setItem(AUTO_DETECT_STORAGE_KEY, JSON.stringify(timezoneCountry))
        setState({
          countryCode: timezoneCountry.code,
          countryName: timezoneCountry.name,
          isLoading: false,
          isAutoDetected: true,
          error: null
        })
        return
      }

      // 3. Fallback: Try IP-based geolocation (free service)
      try {
        const ipCountry = await getCountryFromIP()
        if (ipCountry && isCountrySupported(ipCountry.code)) {
          localStorage.setItem(AUTO_DETECT_STORAGE_KEY, JSON.stringify(ipCountry))
          setState({
            countryCode: ipCountry.code,
            countryName: ipCountry.name,
            isLoading: false,
            isAutoDetected: true,
            error: null
          })
          return
        }
      } catch (error) {
        console.warn('IP geolocation failed:', error)
      }

      // 4. No country detected - will use universal resources
      setState({
        countryCode: null,
        countryName: null,
        isLoading: false,
        isAutoDetected: false,
        error: 'Could not detect country'
      })

    } catch (error) {
      console.error('Country detection error:', error)
      setState({
        countryCode: null,
        countryName: null,
        isLoading: false,
        isAutoDetected: false,
        error: 'Detection failed'
      })
    }
  }

  const setCountry = (countryCode: string, countryName: string) => {
    const countryData = {
      code: countryCode.toUpperCase(),
      name: countryName
    }
    localStorage.setItem(COUNTRY_STORAGE_KEY, JSON.stringify(countryData))
    setState({
      countryCode: countryData.code,
      countryName: countryData.name,
      isLoading: false,
      isAutoDetected: false,
      error: null
    })
  }

  const resetCountry = () => {
    localStorage.removeItem(COUNTRY_STORAGE_KEY)
    localStorage.removeItem(AUTO_DETECT_STORAGE_KEY)
    detectUserCountry()
  }

  return {
    ...state,
    setCountry,
    resetCountry,
    supportedCountries: getSupportedCountries()
  }
}

/**
 * Detect country from browser timezone
 * This is fast, works offline, and doesn't require API calls
 */
function getCountryFromTimezone(): { code: string; name: string } | null {
  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

    // Map common timezones to countries
    const timezoneToCountry: Record<string, { code: string; name: string }> = {
      // North America
      'America/New_York': { code: 'US', name: 'United States' },
      'America/Chicago': { code: 'US', name: 'United States' },
      'America/Denver': { code: 'US', name: 'United States' },
      'America/Los_Angeles': { code: 'US', name: 'United States' },
      'America/Phoenix': { code: 'US', name: 'United States' },
      'America/Anchorage': { code: 'US', name: 'United States' },
      'America/Toronto': { code: 'CA', name: 'Canada' },
      'America/Vancouver': { code: 'CA', name: 'Canada' },
      'America/Montreal': { code: 'CA', name: 'Canada' },
      'America/Mexico_City': { code: 'MX', name: 'Mexico' },

      // Europe
      'Europe/London': { code: 'GB', name: 'United Kingdom' },
      'Europe/Berlin': { code: 'DE', name: 'Germany' },
      'Europe/Paris': { code: 'FR', name: 'France' },
      'Europe/Madrid': { code: 'ES', name: 'Spain' },
      'Europe/Rome': { code: 'IT', name: 'Italy' },

      // Asia-Pacific
      'Australia/Sydney': { code: 'AU', name: 'Australia' },
      'Australia/Melbourne': { code: 'AU', name: 'Australia' },
      'Australia/Brisbane': { code: 'AU', name: 'Australia' },
      'Pacific/Auckland': { code: 'NZ', name: 'New Zealand' },
      'Asia/Tokyo': { code: 'JP', name: 'Japan' },
      'Asia/Singapore': { code: 'SG', name: 'Singapore' },
      'Asia/Kolkata': { code: 'IN', name: 'India' },
      'Asia/Manila': { code: 'PH', name: 'Philippines' },

      // South America
      'America/Sao_Paulo': { code: 'BR', name: 'Brazil' },
      'America/Buenos_Aires': { code: 'AR', name: 'Argentina' },

      // Africa
      'Africa/Johannesburg': { code: 'ZA', name: 'South Africa' },

      // Middle East
      'Asia/Jerusalem': { code: 'IL', name: 'Israel' }
    }

    return timezoneToCountry[timezone] || null
  } catch (error) {
    console.error('Timezone detection failed:', error)
    return null
  }
}

/**
 * Fallback: Detect country from IP address using free API
 * Using ipapi.co (free tier: 1,000 requests/day)
 */
async function getCountryFromIP(): Promise<{ code: string; name: string } | null> {
  try {
    const response = await fetch('/api/geolocation', {
      signal: AbortSignal.timeout(5000) // 5 second timeout
    })

    if (!response.ok) {
      throw new Error('IP geolocation request failed')
    }

    const data = await response.json()

    if (data.country_code && data.country_name) {
      return {
        code: data.country_code,
        name: data.country_name
      }
    }

    return null
  } catch (error) {
    console.error('IP geolocation error:', error)
    return null
  }
}
