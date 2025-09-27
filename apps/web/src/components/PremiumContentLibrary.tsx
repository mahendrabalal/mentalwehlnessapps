import React, { useState } from 'react'
import { LegalDisclaimer } from './LegalDisclaimer'

interface ContentItem {
  id: string
  title: string
  description: string
  category: 'meditation' | 'sleep' | 'anxiety' | 'depression' | 'stress' | 'mindfulness'
  duration?: string
  isPremium: boolean
  audioUrl?: string
  type: 'audio' | 'exercise' | 'article'
}

interface PremiumContentLibraryProps {
  isPremium?: boolean
  onUpgradeClick?: () => void
  userMoodScore?: number
  recentAssessment?: {
    type: string
    score: number
    severity: string
  }
  moodEntries?: any[]
  timeOfDay?: 'morning' | 'afternoon' | 'evening' | 'night'
}

interface ContentEffectiveness {
  contentId: string
  timesUsed: number
  moodImprovementAvg: number
  lastUsed: Date
  timeOfDayEffective: string[]
}

// BMad Method: Determine current time of day
function getCurrentTimeOfDay(): 'morning' | 'afternoon' | 'evening' | 'night' {
  const hour = new Date().getHours()
  if (hour < 6) return 'night'
  if (hour < 12) return 'morning'
  if (hour < 18) return 'afternoon'
  if (hour < 22) return 'evening'
  return 'night'
}

export const PremiumContentLibrary: React.FC<PremiumContentLibraryProps> = ({
  isPremium = false,
  onUpgradeClick,
  userMoodScore,
  recentAssessment,
  moodEntries = [],
  timeOfDay = getCurrentTimeOfDay()
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('recommended')
  const [isPlaying, setIsPlaying] = useState<string | null>(null)
  const [contentEffectiveness, setContentEffectiveness] = useState<ContentEffectiveness[]>([])
  const [userContext, setUserContext] = useState(() => generateUserContext())

  // BMad Method: Generate intelligent user context for recommendations
  function generateUserContext() {
    const currentMood = userMoodScore || (moodEntries.length > 0 ? moodEntries[0]?.mood_score : 5)
    const anxietyLevel = moodEntries.length > 0 ? moodEntries[0]?.anxiety_level || 5 : 5
    const stressLevel = moodEntries.length > 0 ? moodEntries[0]?.stress_level || 5 : 5
    const energyLevel = moodEntries.length > 0 ? moodEntries[0]?.energy_level || 5 : 5

    return {
      currentMood,
      anxietyLevel,
      stressLevel,
      energyLevel,
      timeOfDay,
      primaryConcern: determinePrimaryConcern(),
      moodTrend: determineMoodTrend()
    }
  }

  function determinePrimaryConcern(): 'anxiety' | 'depression' | 'stress' | 'sleep' | 'general' {
    if (recentAssessment) {
      if (recentAssessment.type === 'gad7' && recentAssessment.score >= 8) return 'anxiety'
      if (recentAssessment.type === 'phq9' && recentAssessment.score >= 10) return 'depression'
    }

    if (moodEntries.length >= 3) {
      const recentEntries = moodEntries.slice(0, 3)
      const avgAnxiety = recentEntries.reduce((sum, e) => sum + (e.anxiety_level || 5), 0) / recentEntries.length
      const avgStress = recentEntries.reduce((sum, e) => sum + (e.stress_level || 5), 0) / recentEntries.length
      const avgSleep = recentEntries.reduce((sum, e) => sum + (e.sleep_quality || 5), 0) / recentEntries.length
      const avgMood = recentEntries.reduce((sum, e) => sum + (e.mood_score || 5), 0) / recentEntries.length

      if (avgAnxiety > 7) return 'anxiety'
      if (avgStress > 7) return 'stress'
      if (avgSleep < 4) return 'sleep'
      if (avgMood < 4) return 'depression'
    }

    return 'general'
  }

  function determineMoodTrend(): 'improving' | 'declining' | 'stable' {
    if (moodEntries.length < 3) return 'stable'

    const recent = moodEntries.slice(0, 2)
    const older = moodEntries.slice(2, 4)

    if (older.length === 0) return 'stable'

    const recentAvg = recent.reduce((sum, e) => sum + (e.mood_score || 5), 0) / recent.length
    const olderAvg = older.reduce((sum, e) => sum + (e.mood_score || 5), 0) / older.length

    const diff = recentAvg - olderAvg
    if (diff > 1.0) return 'improving'
    if (diff < -1.0) return 'declining'
    return 'stable'
  }

  // Demo content library
  const contentLibrary: ContentItem[] = [
    // Free content
    {
      id: '1',
      title: 'Basic Breathing Exercise',
      description: 'Simple 4-7-8 breathing technique for immediate calm',
      category: 'mindfulness',
      duration: '5 min',
      isPremium: false,
      type: 'exercise'
    },
    {
      id: '2',
      title: 'Introduction to Mindfulness',
      description: 'Understanding the basics of mindful awareness',
      category: 'mindfulness',
      duration: '8 min',
      isPremium: false,
      type: 'audio'
    },

    // Premium content
    {
      id: '3',
      title: 'Deep Anxiety Relief Meditation',
      description: 'Advanced guided meditation using CBT techniques for anxiety management',
      category: 'anxiety',
      duration: '20 min',
      isPremium: true,
      type: 'audio'
    },
    {
      id: '4',
      title: 'Sleep Stories: Forest Night',
      description: 'Immersive sleep story with nature sounds for deep rest',
      category: 'sleep',
      duration: '45 min',
      isPremium: true,
      type: 'audio'
    },
    {
      id: '5',
      title: 'Depression Recovery Toolkit',
      description: 'Evidence-based exercises based on Behavioral Activation Therapy',
      category: 'depression',
      duration: '15 min',
      isPremium: true,
      type: 'exercise'
    },
    {
      id: '6',
      title: 'Stress Management Masterclass',
      description: 'Comprehensive guide to stress reduction techniques',
      category: 'stress',
      duration: '30 min',
      isPremium: true,
      type: 'article'
    },
    {
      id: '7',
      title: 'Body Scan for Sleep',
      description: 'Progressive muscle relaxation for better sleep quality',
      category: 'sleep',
      duration: '25 min',
      isPremium: true,
      type: 'audio'
    },
    {
      id: '8',
      title: 'Mindful Walking Practice',
      description: 'Transform daily walks into meditation practice',
      category: 'mindfulness',
      duration: '12 min',
      isPremium: true,
      type: 'exercise'
    }
  ]

  const categories = [
    { key: 'recommended', label: 'Recommended', icon: '⭐' },
    { key: 'all', label: 'All Content', icon: '📚' },
    { key: 'meditation', label: 'Meditation', icon: '🧘‍♀️' },
    { key: 'sleep', label: 'Sleep', icon: '😴' },
    { key: 'anxiety', label: 'Anxiety', icon: '🫂' },
    { key: 'depression', label: 'Depression', icon: '💙' },
    { key: 'stress', label: 'Stress', icon: '🌊' },
    { key: 'mindfulness', label: 'Mindfulness', icon: '🌱' }
  ]

  // BMad Method: Smart content filtering with personalized recommendations
  const getFilteredContent = (): ContentItem[] => {
    if (selectedCategory === 'recommended') {
      return getPersonalizedRecommendations()
    }
    if (selectedCategory === 'all') {
      return sortContentByRelevance(contentLibrary)
    }
    return sortContentByRelevance(contentLibrary.filter(item => item.category === selectedCategory))
  }

  function getPersonalizedRecommendations(): ContentItem[] {
    const recommendations: ContentItem[] = []
    const { currentMood, anxietyLevel, stressLevel, energyLevel, primaryConcern, moodTrend } = userContext

    // Crisis/urgent recommendations first
    if (currentMood <= 3 || anxietyLevel >= 8) {
      recommendations.push(
        ...contentLibrary.filter(item =>
          item.category === 'anxiety' ||
          (item.category === 'mindfulness' && item.duration === '5 min')
        )
      )
    }

    // Time-of-day recommendations
    if (timeOfDay === 'evening' || timeOfDay === 'night') {
      recommendations.push(
        ...contentLibrary.filter(item => item.category === 'sleep')
      )
    }

    // Primary concern-based recommendations
    recommendations.push(
      ...contentLibrary.filter(item => item.category === primaryConcern)
    )

    // Mood trend-based recommendations
    if (moodTrend === 'declining') {
      recommendations.push(
        ...contentLibrary.filter(item =>
          item.category === 'depression' || item.category === 'mindfulness'
        )
      )
    }

    // Energy-based recommendations
    if (energyLevel <= 4) {
      recommendations.push(
        ...contentLibrary.filter(item =>
          item.duration === '5 min' || item.duration === '8 min'
        )
      )
    } else {
      recommendations.push(
        ...contentLibrary.filter(item =>
          item.duration === '20 min' || item.duration === '30 min'
        )
      )
    }

    // Remove duplicates and sort by effectiveness
    const uniqueRecommendations = Array.from(new Set(recommendations.map(item => item.id)))
      .map(id => recommendations.find(item => item.id === id)!)

    return sortContentByRelevance(uniqueRecommendations).slice(0, 8)
  }

  function sortContentByRelevance(content: ContentItem[]): ContentItem[] {
    return content.sort((a, b) => {
      // Premium content first
      if (a.isPremium !== b.isPremium) {
        return a.isPremium ? -1 : 1
      }

      // Content effectiveness score
      const aEffectiveness = getContentEffectivenessScore(a)
      const bEffectiveness = getContentEffectivenessScore(b)

      return bEffectiveness - aEffectiveness
    })
  }

  function getContentEffectivenessScore(item: ContentItem): number {
    const effectiveness = contentEffectiveness.find(e => e.contentId === item.id)
    if (!effectiveness) return 5 // Default score

    let score = effectiveness.moodImprovementAvg

    // Bonus for frequent use
    if (effectiveness.timesUsed > 3) score += 1

    // Bonus for time-of-day relevance
    if (effectiveness.timeOfDayEffective.includes(timeOfDay)) score += 0.5

    // Penalty for recent use (encourage variety)
    const daysSinceLastUse = (Date.now() - effectiveness.lastUsed.getTime()) / (1000 * 60 * 60 * 24)
    if (daysSinceLastUse < 1) score -= 1

    return score
  }

  const getTypeIcon = (type: string): string => {
    switch (type) {
      case 'audio': return '🎧'
      case 'exercise': return '📋'
      case 'article': return '📄'
      default: return '📖'
    }
  }

  // BMad Method: Smart content interaction with effectiveness tracking
  const handlePlay = (contentId: string, isPremiumContent: boolean) => {
    if (isPremiumContent && !isPremium) {
      onUpgradeClick?.()
      return
    }

    const wasPlaying = isPlaying === contentId
    setIsPlaying(wasPlaying ? null : contentId)

    if (!wasPlaying) {
      // Track content usage
      trackContentUsage(contentId)

      // Start mood tracking for effectiveness measurement
      const preMoodScore = userContext.currentMood

      // Simulate content completion and post-mood measurement
      // In a real app, this would be triggered when content actually finishes
      setTimeout(() => {
        if (isPlaying === contentId) {
          measureContentEffectiveness(contentId, preMoodScore)
        }
      }, 30000) // Simulate 30 second content
    }
  }

  function trackContentUsage(contentId: string) {
    // Simulate tracking - in real app this would save to database
    console.log(`BMad Analytics: Content ${contentId} started at ${timeOfDay}, mood: ${userContext.currentMood}`)

    // Update local effectiveness tracking
    setContentEffectiveness(prev => {
      const existing = prev.find(e => e.contentId === contentId)
      if (existing) {
        return prev.map(e => e.contentId === contentId ? {
          ...e,
          timesUsed: e.timesUsed + 1,
          lastUsed: new Date(),
          timeOfDayEffective: e.timeOfDayEffective.includes(timeOfDay)
            ? e.timeOfDayEffective
            : [...e.timeOfDayEffective, timeOfDay]
        } : e)
      } else {
        return [...prev, {
          contentId,
          timesUsed: 1,
          moodImprovementAvg: 0,
          lastUsed: new Date(),
          timeOfDayEffective: [timeOfDay]
        }]
      }
    })
  }

  function measureContentEffectiveness(contentId: string, preMoodScore: number) {
    // Simulate post-content mood measurement
    // In real app, this would prompt user or measure through continued interaction
    const simulatedPostMood = Math.min(10, preMoodScore + Math.random() * 2) // Simulate slight improvement
    const improvement = simulatedPostMood - preMoodScore

    console.log(`BMad Analytics: Content ${contentId} effectiveness - Pre: ${preMoodScore}, Post: ${simulatedPostMood}, Improvement: ${improvement}`)

    // Update effectiveness tracking
    setContentEffectiveness(prev => {
      return prev.map(e => e.contentId === contentId ? {
        ...e,
        moodImprovementAvg: (e.moodImprovementAvg * (e.timesUsed - 1) + improvement) / e.timesUsed
      } : e)
    })
  }

  // Get content with personalized insights
  function getContentWithInsights(item: ContentItem) {
    const effectiveness = contentEffectiveness.find(e => e.contentId === item.id)
    const insights = []

    if (effectiveness) {
      if (effectiveness.timesUsed > 0) {
        insights.push(`Used ${effectiveness.timesUsed} time${effectiveness.timesUsed > 1 ? 's' : ''}`)
      }
      if (effectiveness.moodImprovementAvg > 0.5) {
        insights.push(`Avg mood improvement: +${effectiveness.moodImprovementAvg.toFixed(1)}`)
      }
      if (effectiveness.timeOfDayEffective.includes(timeOfDay)) {
        insights.push(`Effective during ${timeOfDay}`)
      }
    }

    // Smart recommendations based on current state
    if (item.category === userContext.primaryConcern) {
      insights.push(`Recommended for your current needs`)
    }

    if (item.category === 'sleep' && (timeOfDay === 'evening' || timeOfDay === 'night')) {
      insights.push(`Perfect timing for sleep content`)
    }

    if (item.duration === '5 min' && userContext.energyLevel <= 4) {
      insights.push(`Short duration good for low energy`)
    }

    return { ...item, insights }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Wellness Content Library</h2>
        <p className="text-gray-600">
          Evidence-based resources for your mental wellness journey
        </p>
      </div>

      {/* Legal Disclaimer for Content */}
      <LegalDisclaimer
        variant="inline"
        className="mb-6"
      />

      {/* Category Filter */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category.key}
              onClick={() => setSelectedCategory(category.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2 ${
                selectedCategory === category.key
                  ? 'bg-therapy-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span>{category.icon}</span>
              <span>{category.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Premium Status Banner */}
      {!isPremium && (
        <div className="bg-gradient-to-r from-therapy-50 to-therapy-100 border border-therapy-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">⭐</div>
              <div>
                <h3 className="font-semibold text-therapy-900">
                  Unlock Premium Content
                </h3>
                <p className="text-sm text-therapy-700">
                  Access 50+ guided meditations, sleep stories, and therapeutic exercises
                </p>
              </div>
            </div>
            <button
              onClick={onUpgradeClick}
              className="bg-therapy-600 hover:bg-therapy-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Upgrade Now
            </button>
          </div>
        </div>
      )}

      {/* Smart Insights Banner */}
      {selectedCategory === 'recommended' && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-blue-900 mb-2">🎯 Personalized for You</h4>
          <p className="text-sm text-blue-700">
            Based on your {userContext.primaryConcern} focus, current mood ({userContext.currentMood}/10),
            and {timeOfDay} timing. Content ordered by effectiveness and relevance.
          </p>
        </div>
      )}

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {getFilteredContent().map(item => {
          const itemWithInsights = getContentWithInsights(item)
          return (
            <div
              key={item.id}
              className={`border rounded-lg p-4 transition-shadow hover:shadow-md ${
                item.isPremium && !isPremium
                  ? 'border-gray-200 bg-gray-50'
                  : 'border-gray-200 bg-white hover:border-therapy-200'
              } ${selectedCategory === 'recommended' && itemWithInsights.insights.length > 0 ? 'ring-1 ring-blue-200' : ''}`}
            >
              <div className="flex items-start space-x-3">
                <div className="text-2xl flex-shrink-0">
                  {getTypeIcon(item.type)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <h3 className={`font-semibold text-gray-900 ${
                      item.isPremium && !isPremium ? 'opacity-60' : ''
                    }`}>
                      {item.title}
                      {item.isPremium && (
                        <span className="ml-2 inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                          Premium
                        </span>
                      )}
                    </h3>

                    {item.isPremium && !isPremium && (
                      <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>

                  <p className={`text-sm text-gray-600 mt-1 ${
                    item.isPremium && !isPremium ? 'opacity-60' : ''
                  }`}>
                    {item.description}
                  </p>

                  {/* Smart Insights */}
                  {itemWithInsights.insights.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {itemWithInsights.insights.map((insight, index) => (
                        <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-700">
                          {insight}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      {item.duration && (
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {item.duration}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => handlePlay(item.id, item.isPremium)}
                      className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                        item.isPremium && !isPremium
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : isPlaying === item.id
                          ? 'bg-red-600 text-white hover:bg-red-700'
                          : 'bg-therapy-600 text-white hover:bg-therapy-700'
                      }`}
                      disabled={item.isPremium && !isPremium}
                    >
                      {isPlaying === item.id ? (
                        <span className="flex items-center space-x-1">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 002 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          <span>Stop</span>
                        </span>
                      ) : item.isPremium && !isPremium ? (
                        <span className="flex items-center space-x-1">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                          </svg>
                          <span>Locked</span>
                        </span>
                      ) : (
                        <span className="flex items-center space-x-1">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                          </svg>
                          <span>Play</span>
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Empty State */}
      {getFilteredContent().length === 0 && (
        <div className="text-center py-8">
          <div className="text-4xl mb-4">📚</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No content found
          </h3>
          <p className="text-gray-600">
            Try selecting a different category or check back later for new content.
          </p>
        </div>
      )}

      {/* Footer Note */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600 text-center">
          <strong>Note:</strong> All content is created by licensed mental health professionals and based on evidence-based therapeutic approaches.
          This content is for wellness support and is not a substitute for professional therapy.
        </p>
      </div>
    </div>
  )
}

export default PremiumContentLibrary