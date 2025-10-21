import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'

export interface MoodCheckInProps {
  user?: User | null
  onMoodSelected?: (mood: number) => void
  className?: string
}

interface MoodOption {
  value: number
  emoji: string
  label: string
  color: string
}

const MOOD_OPTIONS: MoodOption[] = [
  { value: 1, emoji: '😭', label: 'Terrible', color: 'from-red-500 to-red-600' },
  { value: 2, emoji: '😰', label: 'Anxious', color: 'from-orange-500 to-orange-600' },
  { value: 3, emoji: '😔', label: 'Down', color: 'from-yellow-500 to-yellow-600' },
  { value: 4, emoji: '😐', label: 'Okay', color: 'from-blue-500 to-blue-600' },
  { value: 5, emoji: '😊', label: 'Good', color: 'from-green-500 to-green-600' },
]

export function MoodCheckInWidget({ user, onMoodSelected, className = '' }: MoodCheckInProps) {
  const [selectedMood, setSelectedMood] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showNote, setShowNote] = useState(false)
  const [note, setNote] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const supabase = createClient()

  const handleMoodClick = (mood: number) => {
    setSelectedMood(mood)
    onMoodSelected?.(mood)
  }

  const handleSubmit = async () => {
    if (!selectedMood || !user) {
      console.warn('Cannot submit - missing selectedMood or user', { selectedMood, user: user?.id })
      return
    }

    try {
      setIsLoading(true)

      // Debug logging
      console.log('💾 Saving mood entry:', {
        user_id: user.id,
        mood_score: selectedMood,
        email: user.email,
      })

      // Create mood entry in database
      const { data, error } = await supabase.from('mood_entries').insert({
        user_id: user.id,
        mood_score: selectedMood,
        anxiety_level: null,
        energy_level: null,
        sleep_quality: null,
        stress_level: null,
        notes: note || null,
        created_at: new Date().toISOString(),
      }).select()

      if (error) {
        console.error('❌ Supabase error:', error)
        throw error
      }

      console.log('✅ Mood saved successfully:', data)
      setSubmitted(true)

      // Reset after 2 seconds
      setTimeout(() => {
        setSelectedMood(null)
        setNote('')
        setShowNote(false)
        setSubmitted(false)
      }, 2000)
    } catch (error: any) {
      console.error('❌ Error saving mood:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
        fullError: error,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 mb-6 ${className}`}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900">How are you feeling?</h2>
          <p className="text-sm text-gray-600 mt-1">Check in with yourself right now</p>
        </div>

        {/* Mood Selection - WCAG 2.2: 44x44px minimum touch targets */}
        <div className="flex justify-between gap-2 sm:gap-3">
          {MOOD_OPTIONS.map((mood) => (
            <button
              key={mood.value}
              onClick={() => handleMoodClick(mood.value)}
              className={`flex-1 min-h-[56px] rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-therapy-600 flex flex-col items-center justify-center gap-2 ${
                selectedMood === mood.value
                  ? `bg-gradient-to-b ${mood.color} text-white shadow-lg scale-105`
                  : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border-2 border-gray-200'
              }`}
              aria-label={`Select mood: ${mood.label}`}
              aria-pressed={selectedMood === mood.value}
              disabled={isLoading}
            >
              <span className="text-3xl sm:text-4xl">{mood.emoji}</span>
              <span className="text-xs sm:text-sm font-medium hidden sm:inline">
                {mood.label}
              </span>
            </button>
          ))}
        </div>

        {/* Note Input (Optional) */}
        {selectedMood && !submitted && (
          <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2">
            {!showNote ? (
              <button
                onClick={() => setShowNote(true)}
                className="w-full text-sm text-gray-600 hover:text-gray-900 py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                + Add a note (optional)
              </button>
            ) : (
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="What's on your mind? (optional)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-therapy-500 focus:border-transparent resize-none"
                rows={3}
              />
            )}
          </div>
        )}

        {/* Submit Button */}
        {selectedMood && !submitted && (
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full bg-therapy-600 hover:bg-therapy-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors min-h-[44px] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-therapy-600"
            aria-label="Submit mood check-in"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin">⏳</span> Saving...
              </span>
            ) : (
              'Save Check-in'
            )}
          </button>
        )}

        {/* Success Message */}
        {submitted && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center animate-in fade-in">
            <div className="text-2xl mb-2">✨</div>
            <p className="text-green-800 font-medium">Check-in saved!</p>
            <p className="text-sm text-green-700">Great job checking in with yourself</p>
          </div>
        )}

        {/* Privacy Note */}
        <p className="text-xs text-gray-500 text-center">
          ✓ Your mood is private and only visible to you
        </p>
      </div>
    </div>
  )
}
