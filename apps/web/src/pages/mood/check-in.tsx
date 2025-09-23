import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'

export default function MoodCheckIn() {
  const [user, setUser] = useState<User | null>(null)
  const [userLoading, setUserLoading] = useState(true)
  const supabase = createClient()
  const router = useRouter()

  const [moodScore, setMoodScore] = useState(5)
  const [energyLevel, setEnergyLevel] = useState(5)
  const [anxietyLevel, setAnxietyLevel] = useState(5)
  const [stressLevel, setStressLevel] = useState(5)
  const [sleepQuality, setSleepQuality] = useState(5)
  const [notes, setNotes] = useState('')
  const [activities, setActivities] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
    } catch (error) {
      console.error('Error checking user:', error)
    } finally {
      setUserLoading(false)
    }
  }

  const activityOptions = [
    'Exercise', 'Work', 'Social Time', 'Relaxation', 'Hobbies',
    'Therapy', 'Meditation', 'Outdoor Time', 'Reading', 'Music'
  ]

  const handleActivityToggle = (activity: string) => {
    setActivities(prev =>
      prev.includes(activity)
        ? prev.filter(a => a !== activity)
        : [...prev, activity]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) {
      setError('You must be logged in to track your mood')
      return
    }

    setLoading(true)
    setError('')

    try {
      const { error } = await supabase
        .from('mood_entries')
        .insert({
          user_id: user.id,
          mood_score: moodScore,
          energy_level: energyLevel,
          anxiety_level: anxietyLevel,
          stress_level: stressLevel,
          sleep_quality: sleepQuality,
          notes: notes || null,
          activities: activities.length > 0 ? activities : null,
          entry_date: new Date().toISOString().split('T')[0],
          entry_method: 'manual'
        })

      if (error) {
        setError(error.message)
      } else {
        setSuccess(true)
        setTimeout(() => {
          router.push('/dashboard')
        }, 2000)
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  if (userLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-therapy-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please log in</h2>
          <p className="text-gray-600 mb-6">You need to be logged in to track your mood.</p>
          <Link href="/auth/login" className="btn-primary inline-block">
            Log In
          </Link>
        </div>
      </div>
    )
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-green-900 mb-4">Check-in Complete!</h2>
            <p className="text-green-700">Your mood entry has been saved. Redirecting to dashboard...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Daily Mood Check-in - Mental Wellness App</title>
        <meta name="description" content="Track your daily mood and wellness" />
      </Head>
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h1 className="text-2xl font-bold text-gray-900">Daily Mood Check-in</h1>
              <p className="text-gray-600 mt-1">How are you feeling today?</p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-8">
              {/* Mood Score */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Overall Mood (1 = Very Low, 10 = Excellent)
                </label>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">1</span>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={moodScore}
                    onChange={(e) => setMoodScore(parseInt(e.target.value))}
                    className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-sm text-gray-500">10</span>
                  <span className="ml-3 font-semibold text-lg w-8">{moodScore}</span>
                </div>
              </div>

              {/* Energy Level */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Energy Level (1 = Exhausted, 10 = Very Energetic)
                </label>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">1</span>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={energyLevel}
                    onChange={(e) => setEnergyLevel(parseInt(e.target.value))}
                    className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-sm text-gray-500">10</span>
                  <span className="ml-3 font-semibold text-lg w-8">{energyLevel}</span>
                </div>
              </div>

              {/* Anxiety Level */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Anxiety Level (1 = Very Calm, 10 = Very Anxious)
                </label>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">1</span>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={anxietyLevel}
                    onChange={(e) => setAnxietyLevel(parseInt(e.target.value))}
                    className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-sm text-gray-500">10</span>
                  <span className="ml-3 font-semibold text-lg w-8">{anxietyLevel}</span>
                </div>
              </div>

              {/* Stress Level */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Stress Level (1 = Very Relaxed, 10 = Very Stressed)
                </label>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">1</span>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={stressLevel}
                    onChange={(e) => setStressLevel(parseInt(e.target.value))}
                    className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-sm text-gray-500">10</span>
                  <span className="ml-3 font-semibold text-lg w-8">{stressLevel}</span>
                </div>
              </div>

              {/* Sleep Quality */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Sleep Quality Last Night (1 = Very Poor, 10 = Excellent)
                </label>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">1</span>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={sleepQuality}
                    onChange={(e) => setSleepQuality(parseInt(e.target.value))}
                    className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-sm text-gray-500">10</span>
                  <span className="ml-3 font-semibold text-lg w-8">{sleepQuality}</span>
                </div>
              </div>

              {/* Activities */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Activities Today (Select all that apply)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {activityOptions.map((activity) => (
                    <label
                      key={activity}
                      className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                        activities.includes(activity)
                          ? 'border-wellness-500 bg-wellness-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={activities.includes(activity)}
                        onChange={() => handleActivityToggle(activity)}
                        className="sr-only"
                      />
                      <span className="text-sm font-medium">{activity}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-3">
                  Notes (Optional)
                </label>
                <textarea
                  id="notes"
                  rows={4}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-wellness-500 focus:border-wellness-500"
                  placeholder="How are you feeling? Any thoughts about your day?"
                />
              </div>

              {error && (
                <div className="rounded-md bg-red-50 p-4">
                  <div className="text-sm text-red-700">{error}</div>
                </div>
              )}

              <div className="flex justify-between">
                <Link href="/" className="btn-secondary">
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Saving...' : 'Save Check-in'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}