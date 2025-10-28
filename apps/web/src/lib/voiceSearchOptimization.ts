// Voice Search Optimization for Mental Wellness App
// Optimizing for natural language queries and conversational search

export interface VoiceSearchOptimization {
  question: string
  answer: string
  keywords: string[]
  category: 'immediate_help' | 'assessment' | 'techniques' | 'information'
  intent: 'informational' | 'navigational' | 'transactional' | 'commercial'
}

// Common voice search queries for mental health
export const VOICE_SEARCH_QUERIES: VoiceSearchOptimization[] = [
  // Immediate help queries
  {
    question: "What can I do right now to calm my anxiety?",
    answer: "Try deep breathing exercises: inhale for 4 counts, hold for 4, exhale for 6. The 5-4-3-2-1 grounding technique also helps - name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste.",
    keywords: ["anxiety relief", "calm anxiety now", "immediate anxiety help", "breathing exercises"],
    category: "immediate_help",
    intent: "informational"
  },
  {
    question: "I'm feeling overwhelmed, what should I do?",
    answer: "Take a break and try progressive muscle relaxation. Start from your toes and work up, tensing each muscle group for 5 seconds then releasing. This can quickly reduce physical tension and stress.",
    keywords: ["overwhelmed feeling", "stress relief", "muscle relaxation", "immediate stress help"],
    category: "immediate_help",
    intent: "informational"
  },
  {
    question: "How can I fall asleep when I'm stressed?",
    answer: "Create a relaxing bedtime routine: dim lights, avoid screens, try the 4-7-8 breathing technique (inhale 4, hold 7, exhale 8). A warm shower and journaling worries can also help prepare your mind for sleep.",
    keywords: ["sleep when stressed", "fall asleep anxiety", "stress insomnia", "bedtime routine"],
    category: "techniques",
    intent: "informational"
  },

  // Assessment queries
  {
    question: "How do I know if I have burnout?",
    answer: "Take our free burnout assessment test. It evaluates emotional exhaustion, cynicism, and reduced professional efficacy. The 2-minute assessment provides instant results and personalized recovery recommendations.",
    keywords: ["burnout test", "burnout symptoms", "am I burned out", "workplace burnout quiz"],
    category: "assessment",
    intent: "navigational"
  },
  {
    question: "Do I have depression symptoms?",
    answer: "Our free depression screening test uses the PHQ-9 to evaluate depressive symptoms. The clinically-validated assessment takes 2 minutes and provides severity levels along with treatment recommendations.",
    keywords: ["depression test", "depression symptoms", "PHQ-9", "free depression screening"],
    category: "assessment",
    intent: "navigational"
  },
  {
    question: "Am I suffering from anxiety?",
    answer: "Try our anxiety relief tools for immediate symptom management. For a comprehensive assessment, consult with a healthcare provider who can use tools like the GAD-7 to evaluate anxiety severity.",
    keywords: ["anxiety test", "anxiety symptoms", "GAD-7", "anxiety assessment"],
    category: "assessment",
    intent: "informational"
  },

  // Technique queries
  {
    question: "What's the best breathing exercise for anxiety?",
    answer: "The 4-7-8 breathing technique is highly effective: inhale through your nose for 4 counts, hold your breath for 7 counts, and exhale through your mouth for 8 counts. Repeat 3-4 times to activate your relaxation response.",
    keywords: ["breathing exercises anxiety", "4-7-8 breathing", "anxiety breathing techniques"],
    category: "techniques",
    intent: "informational"
  },
  {
    question: "How do you practice mindfulness for beginners?",
    answer: "Start with 5 minutes of mindful breathing: sit comfortably, focus on your breath, and when your mind wanders, gently return attention to your breath. Our guided mindfulness exercises provide step-by-step instructions.",
    keywords: ["mindfulness for beginners", "how to meditate", "mindfulness practice", "meditation guide"],
    category: "techniques",
    intent: "informational"
  },
  {
    question: "What are grounding techniques for PTSD?",
    answer: "Grounding techniques bring you to the present moment. Try the 5-4-3-2-1 method, hold ice in your hands, splash cold water on your face, or describe objects around you in detail. These help manage intrusive memories and flashbacks.",
    keywords: ["grounding techniques PTSD", "trauma coping skills", "flashback help", "PTSD relief"],
    category: "techniques",
    intent: "informational"
  },

  // Information queries
  {
    question: "What's the difference between stress and burnout?",
    answer: "Stress is characterized by over-engagement, while burnout involves disengagement. Stress feels like too much pressure, while burnout feels like you have nothing left to give. Burnout is a chronic state of emotional exhaustion.",
    keywords: ["stress vs burnout", "burnout definition", "stress symptoms", "burnout symptoms"],
    category: "information",
    intent: "informational"
  },
  {
    question: "How does lack of sleep affect mental health?",
    answer: "Poor sleep worsens anxiety, depression, and stress levels. It affects emotional regulation, decision-making, and cognitive function. Our sleep and mental health guide provides strategies for improving sleep quality.",
    keywords: ["sleep mental health", "insomnia anxiety", "sleep depression", "sleep hygiene"],
    category: "information",
    intent: "informational"
  },
  {
    question: "What are healthy ways to cope with stress?",
    answer: "Healthy stress coping includes exercise, meditation, journaling, talking with friends, setting boundaries, and practicing self-care. Avoid alcohol, drugs, and excessive caffeine which can worsen stress long-term.",
    keywords: ["healthy coping mechanisms", "stress management", "stress relief activities", "coping skills"],
    category: "techniques",
    intent: "informational"
  }
]

// Generate FAQ schema for voice search optimization
export function generateVoiceSearchFAQSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: VOICE_SEARCH_QUERIES.map(query => ({
      '@type': 'Question',
      name: query.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: query.answer
      }
    }))
  }
}

// Long-tail conversational queries
export const CONVERSATIONAL_QUERIES = [
  {
    query: "Hey Google, what are some free mental health apps that don't require a subscription?",
    keywords: ["free mental health apps", "no subscription mental health", "free wellness apps"],
    response: "Our mental wellness platform offers 15+ free tools including burnout assessment, anxiety relief techniques, depression screening, stress management, and mindfulness exercises - all completely free without requiring any subscription or payment."
  },
  {
    query: "Alexa, find me immediate anxiety relief techniques I can do at my desk",
    keywords: ["desk anxiety relief", "workplace anxiety", "quick anxiety help", "office stress relief"],
    response: "Try desk-friendly anxiety relief: 1) Box breathing - 4 counts in, hold 4, out 4, hold 4. 2) Shoulder rolls - 5 forward, 5 backward. 3) 5-4-3-2-1 grounding naming things at your desk. All take 2-3 minutes and can be done discreetly."
  },
  {
    query: "Siri, I think I might be burned out from work, what should I do?",
    keywords: ["work burnout help", "job burnout symptoms", "career burnout recovery"],
    response: "Take our free workplace burnout assessment to check your risk level. Based on results, common recovery strategies include setting work boundaries, practicing stress management, getting adequate sleep, and considering professional help if symptoms are severe."
  }
]

// Location-based queries for local SEO
export const LOCATION_QUERIES = [
  {
    query: "Find mental health support near me",
    keywords: ["mental health near me", "local mental health resources", "mental health services my area"],
    category: "local_search"
  },
  {
    query: "Free mental health resources in [city]",
    keywords: ["free mental health [city]", "[city] mental health services", "community mental health [city]"],
    category: "local_search"
  },
  {
    query: "Crisis helpline for my area",
    keywords: ["crisis hotline near me", "emergency mental health [city]", "suicide prevention my area"],
    category: "crisis_local"
  }
]

// Featured snippets optimization
export const FEATURED_SNIPPET_CONTENT = [
  {
    title: "Quick Anxiety Relief Techniques",
    content: "3 immediate anxiety relief techniques: 1) Deep breathing: inhale 4 counts, hold 4, exhale 6 counts. 2) 5-4-3-2-1 grounding: name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste. 3) Progressive muscle relaxation: tense and release muscle groups from toes to head.",
    keywords: ["anxiety relief", "calming techniques", "stress reduction"]
  },
  {
    title: "Signs of Burnout at Work",
    content: "Common burnout symptoms include: emotional exhaustion, cynicism about work, reduced professional efficacy, physical fatigue, sleep disturbances, irritability, and difficulty concentrating. Take our free burnout assessment for evaluation.",
    keywords: ["burnout symptoms", "workplace burnout", "job stress signs"]
  },
  {
    title: "Sleep Hygiene Tips for Mental Health",
    content: "Essential sleep hygiene: maintain consistent sleep schedule, create dark/cool bedroom, avoid screens 1 hour before bed, limit caffeine after 2pm, establish relaxing bedtime routine, avoid large meals before bed, get morning sunlight exposure.",
    keywords: ["sleep hygiene", "better sleep tips", "sleep mental health"]
  }
]

// Voice search optimization tips for content
export const VOICE_SEARCH_GUIDELINES = {
  contentLength: "Aim for 40-50 words for direct answers to voice queries",
  language: "Use natural, conversational language - write like you speak",
  structure: "Include question-based headings and clear, direct answers",
  keywords: "Focus on long-tail keywords and natural language phrases",
  local: "Include location-specific terms where relevant",
  mobile: "Ensure content is mobile-friendly as most voice searches are on mobile"
}

// Generate structured data for voice search
export function generateVoiceSearchStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        name: 'Mental Wellness Apps',
        url: 'https://www.mentalwellnessapps.com',
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://www.mentalwellnessapps.com/search?q={search_term_string}',
          'query-input': 'required name=search_term_string'
        }
      },
      ...VOICE_SEARCH_QUERIES.map(query => ({
        '@type': 'FAQPage',
        mainEntity: [{
          '@type': 'Question',
          name: query.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: query.answer
          }
        }]
      }))
    ]
  }
}

export default {
  VOICE_SEARCH_QUERIES,
  CONVERSATIONAL_QUERIES,
  LOCATION_QUERIES,
  FEATURED_SNIPPET_CONTENT,
  generateVoiceSearchFAQSchema,
  generateVoiceSearchStructuredData,
  VOICE_SEARCH_GUIDELINES
}