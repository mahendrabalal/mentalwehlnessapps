import { NextApiRequest, NextApiResponse } from 'next'

interface LicenseVerificationResult {
  valid: boolean
  license_number?: string
  state?: string
  provider_name?: string
  license_type?: string
  issue_date?: string
  expiration_date?: string
  status?: string
  board_name?: string
  disciplinary_actions?: Array<{
    action_type: string
    action_date: string
    description: string
  }>
  error?: string
}

// State medical board API configurations
const STATE_BOARDS: Record<string, {
  name: string
  api_url: string
  requires_api_key: boolean
  license_format: RegExp
}> = {
  'CA': {
    name: 'Medical Board of California',
    api_url: 'https://www.mbc.ca.gov/breeze/license_lookup.php',
    requires_api_key: true,
    license_format: /^[A-Z]\d{5}$/
  },
  'NY': {
    name: 'New York State Board for Medicine',
    api_url: 'https://apps.health.ny.gov/pubdoh/professionals/doctors/doctorsearch_criteria.action',
    requires_api_key: false,
    license_format: /^\d{6}$/
  },
  'TX': {
    name: 'Texas Medical Board',
    api_url: 'https://profile.tmb.state.tx.us/PublicData/LicenseSearch.aspx',
    requires_api_key: false,
    license_format: /^[A-Z]\d{5}$/
  },
  'FL': {
    name: 'Florida Board of Medicine',
    api_url: 'https://mqa-internet.doh.state.fl.us/MQASearchServices/HealthcareProviders',
    requires_api_key: false,
    license_format: /^[A-Z]{2}\d{7}$/
  },
  'IL': {
    name: 'Illinois Department of Financial and Professional Regulation',
    api_url: 'https://www.idfpr.com/LicenseLookup/LicenseLookup.asp',
    requires_api_key: false,
    license_format: /^\d{6}$/
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LicenseVerificationResult>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ valid: false, error: 'Method not allowed' })
  }

  const { license, state } = req.query

  if (!license || !state || typeof license !== 'string' || typeof state !== 'string') {
    return res.status(400).json({
      valid: false,
      error: 'License number and state parameters are required'
    })
  }

  const stateCode = state.toUpperCase()
  const licenseNumber = license.toUpperCase().trim()

  // Validate state code
  if (!/^[A-Z]{2}$/.test(stateCode)) {
    return res.status(400).json({
      valid: false,
      error: 'State must be a valid 2-letter state code'
    })
  }

  // Check if we support this state
  const stateBoard = STATE_BOARDS[stateCode]
  if (!stateBoard) {
    // For unsupported states, perform basic validation only
    return performBasicLicenseValidation(licenseNumber, stateCode)
  }

  // Validate license format for this state
  if (!stateBoard.license_format.test(licenseNumber)) {
    return res.status(400).json({
      valid: false,
      error: `Invalid license format for ${stateCode}. Expected format: ${stateBoard.license_format.source}`
    })
  }

  try {
    // Attempt to verify with state board API
    const verificationResult = await verifyWithStateBoard(licenseNumber, stateCode, stateBoard)

    // Log successful verification
    console.log(`License verification attempt: ${licenseNumber} (${stateCode})`, {
      valid: verificationResult.valid,
      timestamp: new Date().toISOString()
    })

    res.status(200).json(verificationResult)

  } catch (error) {
    console.error('License verification error:', error)

    // Fall back to basic validation if API fails
    const basicResult = await performBasicLicenseValidation(licenseNumber, stateCode)
    res.status(200).json({
      ...basicResult,
      error: 'API verification unavailable - performed basic validation only'
    })
  }
}

async function verifyWithStateBoard(
  license: string,
  state: string,
  boardConfig: typeof STATE_BOARDS[string]
): Promise<LicenseVerificationResult> {

  // In production, implement actual API calls to state boards
  // For now, simulate verification based on known patterns

  switch (state) {
    case 'CA':
      return await verifyCalifornia(license, boardConfig)
    case 'NY':
      return await verifyNewYork(license, boardConfig)
    case 'TX':
      return await verifyTexas(license, boardConfig)
    case 'FL':
      return await verifyFlorida(license, boardConfig)
    case 'IL':
      return await verifyIllinois(license, boardConfig)
    default:
      return await performBasicLicenseValidation(license, state)
  }
}

async function verifyCalifornia(
  license: string,
  config: typeof STATE_BOARDS[string]
): Promise<LicenseVerificationResult> {
  // California Medical Board API implementation
  const apiKey = process.env.MEDICAL_BOARD_CA_API_KEY

  if (!apiKey) {
    throw new Error('California Medical Board API key not configured')
  }

  // Simulate API call (in production, implement actual API call)
  const mockResponse = {
    valid: true,
    license_number: license,
    state: 'CA',
    provider_name: 'Dr. Jane Smith',
    license_type: 'Physician and Surgeon',
    issue_date: '2015-06-15',
    expiration_date: '2025-06-30',
    status: 'Active',
    board_name: 'Medical Board of California',
    disciplinary_actions: []
  }

  return mockResponse
}

async function verifyNewYork(
  license: string,
  config: typeof STATE_BOARDS[string]
): Promise<LicenseVerificationResult> {
  // New York State Board implementation
  // Simulate verification
  return {
    valid: true,
    license_number: license,
    state: 'NY',
    status: 'Active',
    board_name: 'New York State Board for Medicine'
  }
}

async function verifyTexas(
  license: string,
  config: typeof STATE_BOARDS[string]
): Promise<LicenseVerificationResult> {
  // Texas Medical Board implementation
  return {
    valid: true,
    license_number: license,
    state: 'TX',
    status: 'Active',
    board_name: 'Texas Medical Board'
  }
}

async function verifyFlorida(
  license: string,
  config: typeof STATE_BOARDS[string]
): Promise<LicenseVerificationResult> {
  // Florida Board of Medicine implementation
  return {
    valid: true,
    license_number: license,
    state: 'FL',
    status: 'Active',
    board_name: 'Florida Board of Medicine'
  }
}

async function verifyIllinois(
  license: string,
  config: typeof STATE_BOARDS[string]
): Promise<LicenseVerificationResult> {
  // Illinois IDFPR implementation
  return {
    valid: true,
    license_number: license,
    state: 'IL',
    status: 'Active',
    board_name: 'Illinois Department of Financial and Professional Regulation'
  }
}

async function performBasicLicenseValidation(
  license: string,
  state: string
): Promise<LicenseVerificationResult> {
  // Basic validation for unsupported states or API fallback

  // Check basic format requirements
  if (license.length < 3 || license.length > 15) {
    return {
      valid: false,
      error: 'License number length is outside expected range (3-15 characters)'
    }
  }

  // Check for valid characters (alphanumeric only)
  if (!/^[A-Z0-9]+$/.test(license)) {
    return {
      valid: false,
      error: 'License number contains invalid characters'
    }
  }

  // Simulate basic validation success
  return {
    valid: true,
    license_number: license,
    state: state,
    status: 'Unverified - Basic validation only',
    board_name: `${state} State Medical Board`
  }
}

// Additional helper functions for specific state validations
function validateCaliforniaLicense(license: string): boolean {
  // California medical licenses typically start with a letter followed by 5 digits
  return /^[A-Z]\d{5}$/.test(license)
}

function validateNewYorkLicense(license: string): boolean {
  // New York medical licenses are typically 6 digits
  return /^\d{6}$/.test(license)
}

function validateTexasLicense(license: string): boolean {
  // Texas medical licenses typically start with a letter followed by 5 digits
  return /^[A-Z]\d{5}$/.test(license)
}

function validateFloridaLicense(license: string): boolean {
  // Florida medical licenses typically have 2 letters followed by 7 digits
  return /^[A-Z]{2}\d{7}$/.test(license)
}

function validateIllinoisLicense(license: string): boolean {
  // Illinois medical licenses are typically 6 digits
  return /^\d{6}$/.test(license)
}