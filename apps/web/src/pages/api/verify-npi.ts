import { NextApiRequest, NextApiResponse } from 'next'

interface NPPESResponse {
  results?: Array<{
    number: string
    enumeration_type: string
    basic: {
      first_name?: string
      last_name?: string
      organization_name?: string
      credential?: string
      sole_proprietor?: string
      gender?: string
      enumeration_date?: string
      last_updated?: string
      status?: string
    }
    taxonomies?: Array<{
      code: string
      desc: string
      primary: boolean
      state?: string
      license?: string
    }>
    addresses?: Array<{
      country_code: string
      country_name: string
      address_purpose: string
      address_type: string
      address_1: string
      address_2?: string
      city: string
      state: string
      postal_code: string
      telephone_number?: string
      fax_number?: string
    }>
  }>
  result_count: number
}

interface VerificationResult {
  valid: boolean
  npi?: string
  provider_name?: string
  organization_name?: string
  credential?: string
  status?: string
  enumeration_date?: string
  last_updated?: string
  primary_taxonomy?: string
  primary_license?: string
  business_address?: {
    address_1: string
    city: string
    state: string
    postal_code: string
  }
  error?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<VerificationResult>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ valid: false, error: 'Method not allowed' })
  }

  const { npi } = req.query

  if (!npi || typeof npi !== 'string') {
    return res.status(400).json({ valid: false, error: 'NPI parameter is required' })
  }

  // Validate NPI format (10 digits)
  if (!/^\d{10}$/.test(npi)) {
    return res.status(400).json({ valid: false, error: 'NPI must be exactly 10 digits' })
  }

  // Validate NPI checksum using Luhn algorithm
  if (!validateNPIChecksum(npi)) {
    return res.status(400).json({ valid: false, error: 'Invalid NPI checksum' })
  }

  try {
    // Call NPPES API
    const nppesUrl = process.env.NPPES_API_URL || 'https://npiregistry.cms.hhs.gov/api'
    const apiUrl = `${nppesUrl}/?number=${npi}&version=2.1`

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mental-Wellness-App/1.0',
        ...(process.env.NPPES_API_KEY && {
          'Authorization': `Bearer ${process.env.NPPES_API_KEY}`
        })
      }
    })

    if (!response.ok) {
      throw new Error(`NPPES API error: ${response.status} ${response.statusText}`)
    }

    const data: NPPESResponse = await response.json()

    if (data.result_count === 0 || !data.results || data.results.length === 0) {
      return res.status(404).json({
        valid: false,
        error: 'NPI not found in NPPES database'
      })
    }

    const provider = data.results[0]

    // Check if provider is active
    if (provider.basic.status !== 'A') {
      return res.status(400).json({
        valid: false,
        error: 'Provider NPI is not active'
      })
    }

    // Extract primary taxonomy and license
    const primaryTaxonomy = provider.taxonomies?.find(t => t.primary)
    const businessAddress = provider.addresses?.find(a => a.address_purpose === 'LOCATION')

    const result: VerificationResult = {
      valid: true,
      npi: provider.number,
      provider_name: provider.basic.first_name && provider.basic.last_name
        ? `${provider.basic.first_name} ${provider.basic.last_name}`
        : undefined,
      organization_name: provider.basic.organization_name,
      credential: provider.basic.credential,
      status: provider.basic.status,
      enumeration_date: provider.basic.enumeration_date,
      last_updated: provider.basic.last_updated,
      primary_taxonomy: primaryTaxonomy?.desc,
      primary_license: primaryTaxonomy?.license,
      business_address: businessAddress ? {
        address_1: businessAddress.address_1,
        city: businessAddress.city,
        state: businessAddress.state,
        postal_code: businessAddress.postal_code
      } : undefined
    }

    // Log successful verification (in production, this should go to audit log)
    console.log(`NPI verification successful: ${npi}`, {
      provider_name: result.provider_name,
      organization_name: result.organization_name,
      timestamp: new Date().toISOString()
    })

    res.status(200).json(result)

  } catch (error) {
    console.error('NPI verification error:', error)

    // Return generic error for security
    res.status(500).json({
      valid: false,
      error: 'Unable to verify NPI at this time. Please try again later.'
    })
  }
}

function validateNPIChecksum(npi: string): boolean {
  // Luhn algorithm for NPI validation
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