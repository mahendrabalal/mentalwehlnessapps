import React, { useState, useRef, useEffect } from 'react'
import { LegalDisclaimer } from './LegalDisclaimer'

interface Message {
  id: string
  type: 'user' | 'ai'
  content: string
  timestamp: Date
  isTyping?: boolean
  severity?: 'low' | 'medium' | 'high' | 'crisis'
}

interface UserContext {
  moodTrend: 'improving' | 'declining' | 'stable'
  crisisRiskLevel: 'low' | 'medium' | 'high'
  historicalPatterns: string[]
  conversationMemory: string[]
}

interface AITherapyCompanionProps {
  userMoodScore?: number
  recentAssessment?: {
    type: string
    score: number
    severity: string
  }
  moodEntries?: any[]
  isPremium?: boolean
  onUpgradeClick?: () => void
}

export const AITherapyCompanion: React.FC<AITherapyCompanionProps> = ({
  userMoodScore,
  recentAssessment,
  moodEntries = [],
  isPremium = false,
  onUpgradeClick
}) => {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [userContext, setUserContext] = useState<UserContext>(
    () => generateUserContext()
  )
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Initialize with welcome message
    const welcomeMessage: Message = {
      id: '1',
      type: 'ai',
      content: getPersonalizedWelcome(),
      timestamp: new Date()
    }
    setMessages([welcomeMessage])
  }, [userMoodScore, recentAssessment])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  // BMad Method: Generate intelligent user context
  function generateUserContext(): UserContext {
    const moodTrend = getMoodTrend()
    const crisisRiskLevel = getCrisisRiskLevel()
    const historicalPatterns = getHistoricalPatterns()

    return {
      moodTrend,
      crisisRiskLevel,
      historicalPatterns,
      conversationMemory: []
    }
  }

  function getMoodTrend(): 'improving' | 'declining' | 'stable' {
    if (moodEntries.length < 3) return 'stable'

    const recent = moodEntries.slice(0, 3)
    const older = moodEntries.slice(3, 6)

    if (older.length === 0) return 'stable'

    const recentAvg = recent.reduce((sum, entry) => sum + (entry.mood_score || 5), 0) / recent.length
    const olderAvg = older.reduce((sum, entry) => sum + (entry.mood_score || 5), 0) / older.length

    const diff = recentAvg - olderAvg
    if (diff > 1.0) return 'improving'
    if (diff < -1.0) return 'declining'
    return 'stable'
  }

  function getCrisisRiskLevel(): 'low' | 'medium' | 'high' {
    if (!recentAssessment) return 'low'

    // BMad Method: Clinical risk assessment based on validated scores
    if (recentAssessment.type === 'phq9') {
      if (recentAssessment.score >= 20) return 'high'    // Severe depression
      if (recentAssessment.score >= 15) return 'medium'  // Moderately severe
      return 'low'
    }

    if (recentAssessment.type === 'gad7') {
      if (recentAssessment.score >= 15) return 'high'    // Severe anxiety
      if (recentAssessment.score >= 10) return 'medium'  // Moderate anxiety
      return 'low'
    }

    return 'low'
  }

  function getHistoricalPatterns(): string[] {
    const patterns = []

    if (userMoodScore && userMoodScore < 4) {
      patterns.push('recent_low_mood')
    }

    if (moodEntries.length >= 7) {
      const recentWeek = moodEntries.slice(0, 7)
      const avgMood = recentWeek.reduce((sum, entry) => sum + (entry.mood_score || 5), 0) / recentWeek.length

      if (avgMood < 5) patterns.push('sustained_low_mood')
      if (avgMood > 7) patterns.push('good_mood_trend')
    }

    if (recentAssessment) {
      patterns.push(`recent_${recentAssessment.type}_${recentAssessment.severity}`)
    }

    return patterns
  }

  const getPersonalizedWelcome = (): string => {
    const { crisisRiskLevel, moodTrend, historicalPatterns } = userContext

    // BMad Method: Crisis-aware welcome messages
    if (crisisRiskLevel === 'high') {
      return "Hi there. I notice you might be going through a particularly difficult time right now. I want you to know that you're not alone, and there are people who care about your wellbeing. How are you feeling in this moment? If you're having thoughts of self-harm, please know that help is available immediately."
    }

    if (crisisRiskLevel === 'medium') {
      return "Hello! I can see you've been dealing with some challenges lately. I'm here to provide support and evidence-based techniques that might help. Your wellbeing matters, and taking time to focus on your mental health shows real strength. What's on your mind today?"
    }

    // Mood trend aware responses
    if (moodTrend === 'declining') {
      return "Hi there! I've noticed your mood has been trending downward recently. That can feel really discouraging, but I want you to know that reaching out shows incredible self-awareness. I'm here to help you work through this difficult period. How are you feeling right now?"
    }

    if (moodTrend === 'improving') {
      return "Hello! It's wonderful to see your mood has been improving lately. That's a testament to your resilience and the work you've been putting into your mental health. I'm here to help you maintain this positive momentum. What's been helping you feel better recently?"
    }

    // Pattern-based responses
    if (historicalPatterns.includes('sustained_low_mood')) {
      return "Hi there! I can see you've been experiencing some persistent low mood. That takes a lot of strength to endure, and I'm glad you're here seeking support. Sometimes when we're in a difficult period, small steps can make a meaningful difference. How are you taking care of yourself today?"
    }

    // Default personalized welcome
    return `Hello! I'm your AI wellness companion, and I'm here to provide personalized support based on your unique journey. ${recentAssessment ? `I see you recently completed a ${recentAssessment.type.toUpperCase()} assessment. ` : ''}How can I support your mental wellness today?`
  }

  // BMad Method: Intelligent AI response system with crisis detection
  const generateAIResponse = async (userInput: string): Promise<string> => {
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Update conversation memory
    const updatedContext = {
      ...userContext,
      conversationMemory: [...userContext.conversationMemory, userInput].slice(-5) // Keep last 5 exchanges
    }
    setUserContext(updatedContext)

    // Crisis detection first
    const crisisResponse = detectCrisisAndRespond(userInput)
    if (crisisResponse) {
      return crisisResponse
    }

    // Assessment-aware responses based on user context
    return generateContextualResponse(userInput, updatedContext)
  }

  function detectCrisisAndRespond(userInput: string): string | null {
    const crisisKeywords = [
      'suicide', 'kill myself', 'end it all', 'don\'t want to live', 'hurt myself',
      'self harm', 'cutting', 'overdose', 'die', 'death', 'worthless',
      'hopeless', 'no point', 'better off dead', 'can\'t take it'
    ]

    const hasCrisisIndicators = crisisKeywords.some(keyword =>
      userInput.toLowerCase().includes(keyword)
    )

    // High risk assessment score also triggers crisis response
    const isHighRisk = userContext.crisisRiskLevel === 'high'

    if (hasCrisisIndicators || isHighRisk) {
      return `I'm really concerned about what you've shared with me. Your life has value, and there are people who want to help you through this difficult time. Please reach out for immediate support:

🆘 **Crisis Text Line**: Text HOME to 741741
📞 **988 Suicide & Crisis Lifeline**: Call or text 988
🚨 **Emergency Services**: Call 911

You don't have to go through this alone. These services are free, confidential, and available 24/7. Would you like me to help you connect with a crisis counselor right now?`
    }

    return null
  }

  function generateContextualResponse(userInput: string, context: UserContext): string {
    // Assessment-aware therapeutic responses
    const assessmentResponses = [
      {
        triggers: ['sad', 'depressed', 'down', 'low', 'empty'],
        getResponse: () => {
          if (context.crisisRiskLevel === 'medium') {
            return "I hear that you're feeling really low right now, and I can see from your recent assessment that you've been struggling with depression. That takes tremendous courage to share. One technique that many people with depression find helpful is called 'behavioral activation' - can you think of one small activity that used to bring you even a tiny bit of joy?"
          }
          if (context.moodTrend === 'declining') {
            return "I've noticed your mood has been trending downward lately, and what you're sharing confirms that pattern. During these difficult periods, it's important to be extra gentle with yourself. Let's try a CBT technique: can you identify one thought that's been particularly heavy on your mind today?"
          }
          return "I hear that you're feeling low right now. Given your unique situation, let's focus on what's worked for you before. What's one small thing that has helped lift your mood in the past, even just a little?"
        }
      },
      {
        triggers: ['anxious', 'worried', 'nervous', 'stress', 'panic', 'overwhelmed'],
        getResponse: () => {
          if (recentAssessment?.type === 'gad7') {
            return `I can see you're experiencing anxiety, and I know from your recent GAD-7 assessment that this has been a significant challenge for you. Let's use a technique specifically designed for anxiety: the 5-4-3-2-1 grounding exercise. Right now, can you name 5 things you can see around you? This helps interrupt the anxiety cycle.`
          }
          if (context.historicalPatterns.includes('sustained_low_mood')) {
            return "Anxiety on top of depression can feel incredibly overwhelming. You're managing a lot right now. Let's try a gentle breathing technique: breathe in for 4 counts, hold for 4, breathe out for 6. The longer exhale activates your body's calm response."
          }
          return "Anxiety can feel so overwhelming in the moment. Based on what I know about your wellness journey, let's try a grounding technique that might help bring you back to the present. Can you feel your feet on the ground and take one slow, deep breath with me?"
        }
      },
      {
        triggers: ['help', 'support', 'advice', 'what do i do'],
        getResponse: () => {
          if (context.moodTrend === 'improving') {
            return "I'm so glad you're asking for support, and it's encouraging to see your mood has been improving lately. Let's build on that momentum. What's been working well for you recently that we could expand on?"
          }
          if (context.crisisRiskLevel === 'medium') {
            return "I'm here to support you through this challenging time. Given what you're going through, I'd recommend focusing on immediate comfort and safety strategies. What feels most urgent for you right now - emotional support, practical coping skills, or connecting with professional help?"
          }
          return `I'm here to support you. Based on your wellness patterns, some strategies that might be particularly helpful include mindfulness practices, gentle movement, and structured self-care. ${context.conversationMemory.length > 2 ? 'We\'ve been talking for a bit now - what feels most important to focus on?' : 'What feels most accessible to you right now?'}`
        }
      },
      {
        triggers: ['sleep', 'tired', 'insomnia', 'can\'t sleep', 'exhausted'],
        getResponse: () => {
          if (context.moodTrend === 'declining') {
            return "Sleep problems often go hand-in-hand with mood challenges, and I can see you've been having a tough time lately. Poor sleep can make everything feel harder. Let's focus on one simple sleep hygiene step: what's your current bedtime routine like?"
          }
          return "Sleep is crucial for mental wellness, especially when you're working on your mental health like you are. Let's create a personalized wind-down routine: what time do you usually try to go to bed, and what's the hour before like for you?"
        }
      }
    ]

    // Find matching contextual response
    const matchingResponse = assessmentResponses.find(r =>
      r.triggers.some(trigger => userInput.toLowerCase().includes(trigger))
    )

    if (matchingResponse) {
      return matchingResponse.getResponse()
    }

    // Contextual default responses
    if (context.crisisRiskLevel === 'medium') {
      return "Thank you for sharing that with me. I can see you're going through a particularly challenging time right now. It's important that you're here and that you're talking about your experiences. What feels most important for you to focus on in this moment?"
    }

    if (context.moodTrend === 'improving') {
      return "I appreciate you sharing that with me. It's wonderful to see your mood has been improving - that shows real resilience on your part. What's one thing that's been helping you feel better that we could talk more about?"
    }

    if (context.conversationMemory.length >= 3) {
      return "I've been listening to what you've shared, and I can hear that you're really working on your mental health. That takes courage. What feels most important for you to focus on as we continue our conversation?"
    }

    // Enhanced default response
    return "Thank you for sharing that with me. Your willingness to open up about your experiences shows real strength. What's one small step you could take today to support your wellness? Remember, even tiny steps count."
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    // Check premium limits
    if (!isPremium && messages.length >= 6) { // Allow 3 exchanges for free users
      onUpgradeClick?.()
      return
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    try {
      const aiResponse = await generateAIResponse(inputValue)

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: "I apologize, but I'm having trouble responding right now. If you're in crisis, please contact emergency services (911) or the 988 Crisis Lifeline immediately.",
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    }

    setIsLoading(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (!isExpanded) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsExpanded(true)}
          className="bg-therapy-600 hover:bg-therapy-700 text-white rounded-full p-4 shadow-lg transition-transform hover:scale-105"
        >
          <div className="relative">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          </div>
        </button>
        <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-lg p-3 w-64 border">
          <p className="text-sm text-gray-700 font-medium">AI Wellness Companion</p>
          <p className="text-xs text-gray-500 mt-1">
            {isPremium ? "Unlimited chat available" : "3 free messages • Upgrade for unlimited"}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 w-80 h-96 bg-white rounded-lg shadow-xl border z-50 flex flex-col">
      {/* Header */}
      <div className="bg-therapy-600 text-white p-4 rounded-t-lg flex justify-between items-center">
        <div>
          <h3 className="font-semibold">AI Wellness Companion</h3>
          <p className="text-xs text-therapy-100">
            {isPremium ? "Premium • Unlimited" : `Free • ${Math.max(0, 3 - Math.floor(messages.length / 2))} messages left`}
          </p>
        </div>
        <button
          onClick={() => setIsExpanded(false)}
          className="text-therapy-100 hover:text-white"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Disclaimer */}
      <LegalDisclaimer variant="ai-chat" className="mx-2 mt-2" />

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs p-3 rounded-lg text-sm ${
                message.type === 'user'
                  ? 'bg-therapy-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 p-3 rounded-lg">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={isPremium || messages.length < 6 ? "Type your message..." : "Upgrade for unlimited chat..."}
            disabled={!isPremium && messages.length >= 6}
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-therapy-500 focus:border-transparent disabled:bg-gray-100"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading || (!isPremium && messages.length >= 6)}
            className="bg-therapy-600 hover:bg-therapy-700 disabled:bg-gray-300 text-white p-2 rounded-lg transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>

        {!isPremium && messages.length >= 4 && (
          <div className="mt-2 text-center">
            <button
              onClick={onUpgradeClick}
              className="text-xs text-therapy-600 hover:text-therapy-700 underline"
            >
              Upgrade to Premium for unlimited AI chat
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default AITherapyCompanion