import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import { useAuth } from '@/hooks/useAuth'
import { AuthGuard } from '@/components/AuthGuard'
import { Navbar } from '@/components/Navbar'

interface UserProfile {
  id: string
  first_name: string
  last_name: string
  date_of_birth: string | null
  phone_number: string | null
  emergency_contact_name: string | null
  emergency_contact_phone: string | null
  emergency_contact_relationship: string | null
  preferred_name: string | null
  pronouns: string | null
  timezone: string | null
  notifications_enabled: boolean
  crisis_plan_enabled: boolean
  data_sharing_consent: boolean
  research_participation_consent: boolean
  created_at: string
  updated_at: string
}

export default function ProfilePage() {
  const { user, session } = useAuth()
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      fetchProfile(user.id)
    }
  }, [user])

  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [showDeletionOptions, setShowDeletionOptions] = useState(false)
  const [selectedDeletionType, setSelectedDeletionType] = useState<'deactivate' | 'immediate'>('deactivate')
  const [deletionReason, setDeletionReason] = useState('')

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    date_of_birth: '',
    phone_number: '',
    emergency_contact_name: '',
    emergency_contact_phone: '',
    emergency_contact_relationship: '',
    preferred_name: '',
    pronouns: '',
    timezone: 'America/New_York',
    notifications_enabled: true,
    crisis_plan_enabled: true,
    data_sharing_consent: false,
    research_participation_consent: false
  })

  const fetchProfile = async (userId: string) => {
    if (!userId) return

    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error && error.code !== 'PGRST116') {
        throw error
      }

      if (data) {
        setProfile(data)
        setFormData({
          first_name: data.first_name || '',
          last_name: data.last_name || '',
          date_of_birth: data.date_of_birth || '',
          phone_number: data.phone_number || '',
          emergency_contact_name: data.emergency_contact_name || '',
          emergency_contact_phone: data.emergency_contact_phone || '',
          emergency_contact_relationship: data.emergency_contact_relationship || '',
          preferred_name: data.preferred_name || '',
          pronouns: data.pronouns || '',
          timezone: data.timezone || 'America/New_York',
          notifications_enabled: data.notifications_enabled ?? true,
          crisis_plan_enabled: data.crisis_plan_enabled ?? true,
          data_sharing_consent: data.data_sharing_consent ?? false,
          research_participation_consent: data.research_participation_consent ?? false
        })
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData(prev => ({ ...prev, [name]: checked }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setSaving(true)
    setError('')
    setSuccess('')

    try {
      const profileData = {
        id: user.id,
        email: user.email,
        ...formData,
        updated_at: new Date().toISOString()
      }

      const { error } = await supabase
        .from('user_profiles')
        .upsert(profileData, { onConflict: 'id' })

      if (error) throw error

      setSuccess('Profile updated successfully!')
      await fetchProfile(user.id)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteAccount = () => {
    setShowDeletionOptions(true)
    setError('')
    setSuccess('')
  }

  const confirmDeletion = async () => {
    if (!user) return

    try {
      setSaving(true)
      setError('')

      const response = await fetch('/api/user/delete-account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          deletionType: selectedDeletionType,
          reason: deletionReason
        })
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to delete account')
      }

      // Show success message before redirect
      setSuccess(result.message)

      // Sign out and redirect after a short delay
      setTimeout(async () => {
        await supabase.auth.signOut()
        router.push('/')
      }, 3000)

    } catch (err: any) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const cancelDeletion = () => {
    setShowDeletionOptions(false)
    setSelectedDeletionType('deactivate')
    setDeletionReason('')
  }


  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-therapy-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading profile...</p>
        </div>
      </div>
    )
  }

  return (
    <AuthGuard
      redirectMessage="Please log in"
      redirectSubtitle="You need to be logged in to view your profile."
    >
      <Head>
        <title>Profile Settings - MentalWellnessApps</title>
        <meta name="description" content="Manage your profile and privacy settings" />
      </Head>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
              <p className="text-gray-600 mt-1">
                Manage your personal information and privacy preferences
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              {error && (
                <div className="rounded-md bg-red-50 p-4 mb-6">
                  <div className="text-sm text-red-700">{error}</div>
                </div>
              )}

              {success && (
                <div className="rounded-md bg-green-50 p-4 mb-6">
                  <div className="text-sm text-green-700">{success}</div>
                </div>
              )}

              <div className="space-y-8">
                {/* Basic Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-1">
                        First Name *
                      </label>
                      <input
                        type="text"
                        id="first_name"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleInputChange}
                        required
                        className="input-field"
                      />
                    </div>

                    <div>
                      <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        id="last_name"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleInputChange}
                        required
                        className="input-field"
                      />
                    </div>

                    <div>
                      <label htmlFor="preferred_name" className="block text-sm font-medium text-gray-700 mb-1">
                        Preferred Name
                      </label>
                      <input
                        type="text"
                        id="preferred_name"
                        name="preferred_name"
                        value={formData.preferred_name}
                        onChange={handleInputChange}
                        className="input-field"
                        placeholder="How you'd like to be addressed"
                      />
                    </div>

                    <div>
                      <label htmlFor="pronouns" className="block text-sm font-medium text-gray-700 mb-1">
                        Pronouns
                      </label>
                      <select
                        id="pronouns"
                        name="pronouns"
                        value={formData.pronouns}
                        onChange={handleInputChange}
                        className="input-field"
                      >
                        <option value="">Select pronouns</option>
                        <option value="he/him">he/him</option>
                        <option value="she/her">she/her</option>
                        <option value="they/them">they/them</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="date_of_birth" className="block text-sm font-medium text-gray-700 mb-1">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        id="date_of_birth"
                        name="date_of_birth"
                        value={formData.date_of_birth}
                        onChange={handleInputChange}
                        className="input-field"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone_number"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleInputChange}
                        className="input-field"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>
                </div>

                {/* Emergency Contact */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Emergency Contact</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="emergency_contact_name" className="block text-sm font-medium text-gray-700 mb-1">
                        Contact Name
                      </label>
                      <input
                        type="text"
                        id="emergency_contact_name"
                        name="emergency_contact_name"
                        value={formData.emergency_contact_name}
                        onChange={handleInputChange}
                        className="input-field"
                        placeholder="Full name"
                      />
                    </div>

                    <div>
                      <label htmlFor="emergency_contact_phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Contact Phone
                      </label>
                      <input
                        type="tel"
                        id="emergency_contact_phone"
                        name="emergency_contact_phone"
                        value={formData.emergency_contact_phone}
                        onChange={handleInputChange}
                        className="input-field"
                        placeholder="(555) 123-4567"
                      />
                    </div>

                    <div>
                      <label htmlFor="emergency_contact_relationship" className="block text-sm font-medium text-gray-700 mb-1">
                        Relationship
                      </label>
                      <select
                        id="emergency_contact_relationship"
                        name="emergency_contact_relationship"
                        value={formData.emergency_contact_relationship}
                        onChange={handleInputChange}
                        className="input-field"
                      >
                        <option value="">Select relationship</option>
                        <option value="spouse">Spouse</option>
                        <option value="partner">Partner</option>
                        <option value="parent">Parent</option>
                        <option value="child">Child</option>
                        <option value="sibling">Sibling</option>
                        <option value="friend">Friend</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Preferences */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Preferences</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="timezone" className="block text-sm font-medium text-gray-700 mb-1">
                        Timezone
                      </label>
                      <select
                        id="timezone"
                        name="timezone"
                        value={formData.timezone}
                        onChange={handleInputChange}
                        className="input-field"
                      >
                        <option value="America/New_York">Eastern Time</option>
                        <option value="America/Chicago">Central Time</option>
                        <option value="America/Denver">Mountain Time</option>
                        <option value="America/Los_Angeles">Pacific Time</option>
                        <option value="America/Anchorage">Alaska Time</option>
                        <option value="Pacific/Honolulu">Hawaii Time</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-6 space-y-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="notifications_enabled"
                        name="notifications_enabled"
                        checked={formData.notifications_enabled}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-therapy-600 focus:ring-therapy-500 border-gray-300 rounded"
                      />
                      <label htmlFor="notifications_enabled" className="ml-2 block text-sm text-gray-900">
                        Enable email notifications for reminders and check-ins
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="crisis_plan_enabled"
                        name="crisis_plan_enabled"
                        checked={formData.crisis_plan_enabled}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-therapy-600 focus:ring-therapy-500 border-gray-300 rounded"
                      />
                      <label htmlFor="crisis_plan_enabled" className="ml-2 block text-sm text-gray-900">
                        Enable crisis intervention features and emergency contacts
                      </label>
                    </div>
                  </div>
                </div>

                {/* Privacy & Consent */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Privacy & Consent</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        id="data_sharing_consent"
                        name="data_sharing_consent"
                        checked={formData.data_sharing_consent}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-therapy-600 focus:ring-therapy-500 border-gray-300 rounded mt-1"
                      />
                      <label htmlFor="data_sharing_consent" className="ml-2 block text-sm text-gray-900">
                        I consent to sharing anonymized data with healthcare providers for treatment coordination
                        <span className="block text-xs text-gray-500 mt-1">
                          This helps your care team provide better support when authorized
                        </span>
                      </label>
                    </div>

                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        id="research_participation_consent"
                        name="research_participation_consent"
                        checked={formData.research_participation_consent}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-therapy-600 focus:ring-therapy-500 border-gray-300 rounded mt-1"
                      />
                      <label htmlFor="research_participation_consent" className="ml-2 block text-sm text-gray-900">
                        I consent to participate in mental health research studies (optional)
                        <span className="block text-xs text-gray-500 mt-1">
                          Help improve mental health treatments through anonymized research participation
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center pt-8 border-t border-gray-200 mt-8">
                <div className="flex space-x-3">
                  <Link href="/" className="btn-secondary">
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    disabled={saving}
                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleDeleteAccount}
                  disabled={saving}
                  className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Delete Account
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Healthcare-Compliant Account Deletion Modal */}
        {showDeletionOptions && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Account Deletion Options
                </h3>

                <div className="space-y-4 mb-6">
                  {/* Account Deactivation Option (Recommended) */}
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="deletionType"
                      value="deactivate"
                      checked={selectedDeletionType === 'deactivate'}
                      onChange={(e) => setSelectedDeletionType(e.target.value as 'deactivate')}
                      className="mt-1 text-therapy-600 focus:ring-therapy-500"
                    />
                    <div>
                      <div className="font-medium text-gray-900">
                        Deactivate Account (Recommended)
                        <span className="ml-2 px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                          HIPAA Compliant
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        • Account becomes inaccessible immediately<br/>
                        • Clinical data preserved for healthcare continuity<br/>
                        • 30-day recovery period available<br/>
                        • Subscriptions paused (not cancelled)
                      </div>
                    </div>
                  </label>

                  {/* Immediate Deletion Option */}
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="deletionType"
                      value="immediate"
                      checked={selectedDeletionType === 'immediate'}
                      onChange={(e) => setSelectedDeletionType(e.target.value as 'immediate')}
                      className="mt-1 text-red-600 focus:ring-red-500"
                    />
                    <div>
                      <div className="font-medium text-gray-900">
                        Complete Deletion
                        <span className="ml-2 px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">
                          Permanent
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        • All data deleted immediately and permanently<br/>
                        • No recovery possible<br/>
                        • Subscriptions cancelled<br/>
                        • Audit logs maintained for compliance
                      </div>
                    </div>
                  </label>
                </div>

                {/* Reason for Deletion */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reason for deletion (optional)
                  </label>
                  <textarea
                    value={deletionReason}
                    onChange={(e) => setDeletionReason(e.target.value)}
                    placeholder="Help us improve by sharing why you're leaving..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-therapy-500 focus:border-therapy-500"
                    rows={3}
                  />
                </div>

                {/* Warning Box */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                  <div className="flex">
                    <div className="text-yellow-600 mr-2">⚠️</div>
                    <div className="text-sm text-yellow-800">
                      <strong>Important:</strong> This action affects your mental health data.
                      If you're in crisis or need support, please contact:
                      <div className="mt-2 font-medium">
                        • Crisis Text Line: Text HOME to 741741<br/>
                        • National Suicide Prevention Lifeline: 988
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button
                    onClick={cancelDeletion}
                    disabled={saving}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDeletion}
                    disabled={saving}
                    className={`flex-1 px-4 py-2 rounded-lg text-white font-medium disabled:opacity-50 ${
                      selectedDeletionType === 'immediate'
                        ? 'bg-red-600 hover:bg-red-700'
                        : 'bg-yellow-600 hover:bg-yellow-700'
                    }`}
                  >
                    {saving ? 'Processing...' :
                     selectedDeletionType === 'immediate' ? 'Delete Permanently' : 'Deactivate Account'
                    }
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AuthGuard>
  )
}