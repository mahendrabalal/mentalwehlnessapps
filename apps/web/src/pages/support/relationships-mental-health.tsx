import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { SEOHead } from '@/components/SEOHead'
import { GuestToolBanner } from '@/components/GuestToolBanner'
import { LegalDisclaimer } from '@/components/LegalDisclaimer'
import { medicalWebPageStructuredData, medicalEntityStructuredData, reviewedByStructuredData } from '@/lib/seo'
import { SUPPORT_PAGES_DATES } from '@/lib/seo-constants'

export default function RelationshipsMentalHealthSupport() {
  const structuredData = [
    medicalWebPageStructuredData({
      name: 'Relationships and Mental Health | Healthy Communication & Support Guide',
      description: 'Comprehensive guide to relationships and mental health. Learn healthy communication skills, conflict resolution techniques, and how to support loved ones with mental health conditions. Build stronger, supportive relationships.',
      slug: '/support/relationships-mental-health',
    }),
    medicalEntityStructuredData({
      name: 'Relationship Problems',
      description: 'Relationship problems can significantly impact mental health, causing stress, anxiety, and depression while affecting overall well-being and quality of life.',
      alternateName: ['Relationship Stress', 'Communication Issues', 'Marital Problems', 'Family Conflict'],
      cause: ['Poor communication', 'Mental health conditions', 'Stress', 'Life changes', 'Unresolved conflicts', 'Trust issues'],
      symptom: ['Increased anxiety', 'Depressive symptoms', 'Sleep disturbances', 'Social withdrawal', 'Irritability', 'Feeling isolated'],
      riskFactor: ['History of trauma', 'Mental health conditions', 'Major life stressors', 'Poor communication skills', 'Lack of social support'],
      treatment: ['Couples therapy', 'Communication skills training', 'Individual therapy', 'Support groups', 'Relationship education'],
      typicalTest: ['Relationship Assessment Questionnaire', 'Communication Skills Evaluation'],
      medicalSpecialty: 'Psychology'
    }),
    reviewedByStructuredData({
      reviewedBy: {
        name: 'Dr. Jennifer Lee',
        credentials: 'Ph.D., Clinical Psychologist & Couples Therapist',
        expertise: 'Relationship psychology, couples therapy, family systems'
      },
      dateReviewed: '2025-10-28',
      medicalOrganization: 'American Association for Marriage and Family Therapy'
    })
  ]

  return (
    <>
      <SEOHead
        title="Relationships & Mental Health - Support Guide"
        description="Guide to relationships and mental health. Learn communication skills, conflict resolution, and how to support loved ones with mental health conditions."
        publishedTime={SUPPORT_PAGES_DATES['relationships-mental-health'].published}
        modifiedTime={SUPPORT_PAGES_DATES['relationships-mental-health'].modified}
        keywords={[
          "relationships and mental health",
          "healthy communication skills",
          "supporting someone with mental illness",
          "relationship conflict resolution",
          "mental health and relationships",
          "communication in relationships",
          "supportive relationships mental health",
          "relationship stress management",
          "how to help depressed partner",
          "mental health relationship advice",
          "couples mental health support",
          "family mental health support",
          "friendship mental health",
          "relationship boundaries mental health",
          "emotional support relationships",
          "mental wellness for kids",
          "children mental health",
          "kids emotional wellness",
          "family mental wellness activities",
          "child mental health support",
          "parenting mental wellness"
        ]}
        ogImage="/og-relationships-mental-health.png"
        structuredData={structuredData}
      />

      <Navbar />

      {/* Guest Banner */}
      <GuestToolBanner toolName="Relationships & Mental Health Guide" />

      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex mb-6 text-sm" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link href="/" className="text-gray-600 hover:text-therapy-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-gray-400 mx-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  <Link href="/support" className="text-gray-600 hover:text-therapy-600 transition-colors">
                    Support
                  </Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-gray-400 mx-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-500">Relationships & Mental Health</span>
                </div>
              </li>
            </ol>
          </nav>

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Relationships and Mental Health: Building Supportive Connections
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              Learn how relationships impact mental health and discover strategies for healthy communication, supporting loved ones with mental health conditions, and building strong, supportive connections that enhance well-being.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">
                ✓ Evidence-Based Strategies
              </span>
              <span className="bg-orange-100 text-orange-800 text-xs font-medium px-3 py-1 rounded-full">
                ✓ Communication Skills
              </span>
              <span className="bg-purple-100 text-purple-800 text-xs font-medium px-3 py-1 rounded-full">
                ✓ Support Resources
              </span>
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">
                ✓ Relationship Health
              </span>
            </div>
          </div>

          {/* Medical Review */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <svg className="w-6 h-6 text-blue-600 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-grow">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-sm font-semibold text-blue-900">Expert Reviewed</span>
                  <span className="text-sm text-blue-700">•</span>
                  <span className="text-sm text-blue-700">Last updated: October 28, 2025</span>
                </div>
                <p className="text-sm text-blue-800">
                  This relationship and mental health guide is reviewed by Dr. Jennifer Lee, Ph.D., Clinical Psychologist and Couples Therapist. All recommendations are based on relationship psychology research and clinical practice.
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="bg-white text-blue-700 text-xs px-2 py-1 rounded">Ph.D. Clinical Psychology</span>
                  <span className="bg-white text-blue-700 text-xs px-2 py-1 rounded">Couples Therapy Expert</span>
                  <span className="bg-white text-blue-700 text-xs px-2 py-1 rounded">AAMFT Certified</span>
                </div>
              </div>
            </div>
          </div>

          {/* Relationship-Mental Health Connection */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">The Relationship-Mental Health Connection</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">How Relationships Impact Mental Health</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-purple-600 text-sm">+</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Positive Effects</h4>
                      <p className="text-sm text-gray-600">Supportive relationships reduce stress, increase resilience, improve self-esteem, and provide motivation for recovery</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-red-600 text-sm">-</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Negative Effects</h4>
                      <p className="text-sm text-gray-600">Toxic relationships can trigger anxiety, depression, stress, and worsen existing mental health conditions</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Relationship Types</h3>
                <div className="space-y-3">
                  <div className="bg-green-50 p-3 rounded-lg">
                    <h4 className="font-medium text-green-900 mb-1">Romantic Partnerships</h4>
                    <p className="text-sm text-green-700">Often the most significant relationship affecting daily mental health and stress levels</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-1">Family Relationships</h4>
                    <p className="text-sm text-blue-700">Can provide essential support or be a source of significant stress and conflict</p>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <h4 className="font-medium text-purple-900 mb-1">Friendships</h4>
                    <p className="text-sm text-purple-700">Crucial for social support and mental health maintenance</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Healthy Communication Skills */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Essential Communication Skills for Mental Health</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">1. Active Listening</h3>
                <p className="text-gray-600 mb-3">
                  Being fully present and engaged when others speak helps build trust and understanding.
                </p>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-medium text-green-900 mb-2">Practice These Techniques:</h4>
                  <ul className="space-y-1 text-sm text-green-700">
                    <li>• Maintain eye contact and put away distractions</li>
                    <li>• Reflect back what you hear ("So you're feeling...")</li>
                    <li>• Ask clarifying questions instead of assuming</li>
                    <li>• Validate emotions even if you disagree with the content</li>
                    <li>• Avoid interrupting or planning your response while they speak</li>
                  </ul>
                </div>
              </div>

              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">2. "I" Statements</h3>
                <p className="text-gray-600 mb-3">
                  Express your feelings and needs without blaming or criticizing others.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Formula: "I feel ___ when ___ because ___"</h4>
                  <div className="space-y-2 text-sm text-blue-700">
                    <div>
                      <strong>Instead of:</strong> "You never help around the house"
                    </div>
                    <div>
                      <strong>Try:</strong> "I feel overwhelmed when the house is messy because I have less energy for self-care"
                    </div>
                    <div>
                      <strong>Instead of:</strong> "You're being insensitive"
                    </div>
                    <div>
                      <strong>Try:</strong> "I feel hurt when my mental health struggles are dismissed because it makes me feel alone"
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">3. Setting Healthy Boundaries</h3>
                <p className="text-gray-600 mb-3">
                  Clear boundaries protect your mental health while maintaining respectful relationships.
                </p>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-medium text-purple-900 mb-2">Types of Boundaries:</h4>
                  <ul className="space-y-1 text-sm text-purple-700">
                    <li><strong>Time boundaries:</strong> "I need 30 minutes to decompress after work before discussing heavy topics"</li>
                    <li><strong>Emotional boundaries:</strong> "I can support you, but I cannot be your only source of emotional support"</li>
                    <li><strong>Physical boundaries:</strong> "I need personal space when I'm feeling overwhelmed"</li>
                    <li><strong>Communication boundaries:</strong> "Let's discuss this when we're both calm, not during an argument"</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Supporting Loved Ones */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Support Someone with Mental Health Challenges</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">What Helps</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <span className="text-green-600 text-xl">✓</span>
                    <div>
                      <h4 className="font-medium text-gray-900">Listen Without Judgment</h4>
                      <p className="text-sm text-gray-600">Create a safe space for them to share without fear of criticism</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-green-600 text-xl">✓</span>
                    <div>
                      <h4 className="font-medium text-gray-900">Educate Yourself</h4>
                      <p className="text-sm text-gray-600">Learn about their specific mental health condition</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-green-600 text-xl">✓</span>
                    <div>
                      <h4 className="font-medium text-gray-900">Offer Practical Help</h4>
                      <p className="text-sm text-gray-600">Assist with daily tasks during difficult periods</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-green-600 text-xl">✓</span>
                    <div>
                      <h4 className="font-medium text-gray-900">Encourage Professional Help</h4>
                      <p className="text-sm text-gray-600">Support them in finding and attending therapy</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-green-600 text-xl">✓</span>
                    <div>
                      <h4 className="font-medium text-gray-900">Celebrate Small Victories</h4>
                      <p className="text-sm text-gray-600">Acknowledge progress and efforts toward recovery</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">What to Avoid</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <span className="text-red-600 text-xl">✗</span>
                    <div>
                      <h4 className="font-medium text-gray-900">Don't Say "Just Be Positive"</h4>
                      <p className="text-sm text-gray-600">This invalidates their genuine struggles</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-red-600 text-xl">✗</span>
                    <div>
                      <h4 className="font-medium text-gray-900">Don't Compare Their Struggle</h4>
                      <p className="text-sm text-gray-600">Avoid saying "it could be worse" or comparing to others</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-red-600 text-xl">✗</span>
                    <div>
                      <h4 className="font-medium text-gray-900">Don't Become Their Therapist</h4>
                      <p className="text-sm text-gray-600">Support them, but maintain boundaries and encourage professional help</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-red-600 text-xl">✗</span>
                    <div>
                      <h4 className="font-medium text-gray-900">Don't Neglect Yourself</h4>
                      <p className="text-sm text-gray-600">Your mental health matters too - practice self-care</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Conflict Resolution */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Healthy Conflict Resolution</h2>
            <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">The STEP Method for Resolving Conflicts</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="bg-white p-3 rounded-lg mb-3">
                    <h4 className="font-semibold text-orange-900 mb-1">S - Schedule a Good Time</h4>
                    <p className="text-sm text-gray-600">Choose when both parties are calm and have time to talk</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg mb-3">
                    <h4 className="font-semibold text-orange-900 mb-1">T - Take Turns Speaking</h4>
                    <p className="text-sm text-gray-600">Use a timer if needed to ensure equal speaking time</p>
                  </div>
                </div>
                <div>
                  <div className="bg-white p-3 rounded-lg mb-3">
                    <h4 className="font-semibold text-orange-900 mb-1">E - Express Feelings & Needs</h4>
                    <p className="text-sm text-gray-600">Use "I" statements and be specific about what you need</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg mb-3">
                    <h4 className="font-semibold text-orange-900 mb-1">P - Problem-Solve Together</h4>
                    <p className="text-sm text-gray-600">Brainstorm solutions that work for both parties</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mental Health in Different Relationships */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Mental Health in Different Relationship Types</h2>
            <div className="space-y-4">
              <div className="border rounded-lg p-4 border-pink-200">
                <h3 className="text-lg font-semibold text-pink-900 mb-2">🩷 Romantic Relationships</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Challenges:</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• Intimacy and vulnerability issues</li>
                      <li>• Mental health stigma in dating</li>
                      <li>• Balancing individual and relationship needs</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Solutions:</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• Open communication about mental health</li>
                      <li>• Couples counseling when needed</li>
                      <li>• Supporting each other's treatment</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4 border-blue-200">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">👨‍👩‍👧‍👦 Family Relationships</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Challenges:</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• Generational differences in mental health understanding</li>
                      <li>• Family dynamics and expectations</li>
                      <li>• Caregiver stress and burnout</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Solutions:</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• Family therapy and education</li>
                      <li>• Setting healthy boundaries</li>
                      <li>• Creating family mental health routines</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4 border-purple-200">
                <h3 className="text-lg font-semibold text-purple-900 mb-2">👥 Friendships</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Challenges:</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• Social withdrawal during depressive episodes</li>
                      <li>• Friends not understanding mental health needs</li>
                      <li>• Maintaining friendships while managing symptoms</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Solutions:</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• Finding supportive friend groups</li>
                      <li>• Educating friends about your needs</li>
                      <li>• Low-pressure social activities</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mental Wellness for Kids Section */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">🧒 Mental Wellness for Kids & Families</h2>
            <p className="text-gray-600 mb-6">
              Children's mental wellness is crucial for healthy development. Learn age-appropriate strategies to support your child's emotional health and strengthen family bonds.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="bg-white rounded-lg p-4">
                <h3 className="text-lg font-semibold text-green-900 mb-3">🌱 Age-Appropriate Wellness Activities</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">🎨</span>
                    <div>
                      <h4 className="font-medium text-gray-900">Ages 3-7: Emotional Expression</h4>
                      <p className="text-sm text-gray-600">Drawing feelings, puppet play, simple breathing exercises, feeling flashcards</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">📚</span>
                    <div>
                      <h4 className="font-medium text-gray-900">Ages 8-12: Building Resilience</h4>
                      <p className="text-sm text-gray-600">Journaling, problem-solving skills, mindfulness basics, gratitude practices</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">🤝</span>
                    <div>
                      <h4 className="font-medium text-gray-900">Ages 13-18: Independent Wellness</h4>
                      <p className="text-sm text-gray-600">Stress management techniques, peer support skills, healthy digital habits</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">👨‍👩‍👧‍👦 Supporting Your Child's Mental Health</h3>
                <div className="space-y-3">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-1">Create Open Communication</h4>
                    <p className="text-sm text-blue-700">Regular check-ins, active listening, validating emotions without judgment</p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <h4 className="font-medium text-green-900 mb-1">Model Healthy Behaviors</h4>
                    <p className="text-sm text-green-700">Show your own coping strategies, apologize when wrong, practice self-care</p>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <h4 className="font-medium text-purple-900 mb-1">Establish Routines</h4>
                    <p className="text-sm text-purple-700">Consistent sleep, meals, exercise, and downtime promote security</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-yellow-900 mb-2">⚠️ When to Seek Professional Help</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-medium text-yellow-900 mb-1">Warning Signs:</h4>
                  <ul className="space-y-1 text-yellow-800">
                    <li>• Persistent sadness or irritability (2+ weeks)</li>
                    <li>• Sudden behavior changes or withdrawal</li>
                    <li>• Difficulty with daily activities</li>
                    <li>• Talk of self-harm or hopelessness</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-yellow-900 mb-1">Next Steps:</h4>
                  <ul className="space-y-1 text-yellow-800">
                    <li>• Consult pediatrician or school counselor</li>
                    <li>• Find child therapists or psychologists</li>
                    <li>• Contact crisis lines if immediate danger</li>
                    <li>• Connect with parent support groups</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Self-Care in Relationships */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Maintaining Your Mental Health in Relationships</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-900 mb-2">Individual Self-Care</h3>
                <ul className="space-y-1 text-sm text-purple-700">
                  <li>• Continue personal therapy or treatment</li>
                  <li>• Maintain hobbies and interests</li>
                  <li>• Practice independent coping skills</li>
                  <li>• Set aside alone time regularly</li>
                  <li>• Prioritize sleep and nutrition</li>
                </ul>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">Relationship Self-Care</h3>
                <ul className="space-y-1 text-sm text-blue-700">
                  <li>• Schedule regular check-ins</li>
                  <li>• Plan enjoyable activities together</li>
                  <li>• Appreciate and acknowledge each other</li>
                  <li>• Address issues early before they escalate</li>
                  <li>• Celebrate relationship milestones</li>
                </ul>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-900 mb-2">Support System Care</h3>
                <ul className="space-y-1 text-sm text-green-700">
                  <li>• Maintain friendships outside the relationship</li>
                  <li>• Join support groups if helpful</li>
                  <li>• Build a community of understanding people</li>
                  <li>• Seek mentorship from couples who've navigated similar challenges</li>
                  <li>• Consider family or couples counseling proactively</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Related Resources */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Mental Health Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link
                href="/tools/anxiety-relief"
                className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors text-center"
              >
                <span className="text-3xl mb-2">😌</span>
                <h3 className="font-semibold text-gray-900">Anxiety Relief</h3>
                <p className="text-sm text-gray-600">Calming techniques</p>
              </Link>
              <Link
                href="/tools/depression-screening"
                className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors text-center"
              >
                <span className="text-3xl mb-2">🎯</span>
                <h3 className="font-semibold text-gray-900">Depression Test</h3>
                <p className="text-sm text-gray-600">Mental health check</p>
              </Link>
              <Link
                href="/tools/stress-management-techniques"
                className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors text-center"
              >
                <span className="text-3xl mb-2">💪</span>
                <h3 className="font-semibold text-gray-900">Stress Management</h3>
                <p className="text-sm text-gray-600">Coping strategies</p>
              </Link>
              <Link
                href="/support/trauma-recovery"
                className="flex flex-col items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors text-center"
              >
                <span className="text-3xl mb-2">🛡️</span>
                <h3 className="font-semibold text-gray-900">Trauma Recovery</h3>
                <p className="text-sm text-gray-600">Healing resources</p>
              </Link>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Should I tell my partner about my mental health condition?</h3>
                <p className="text-gray-600">
                  Generally, yes. Honesty builds trust and allows your partner to provide appropriate support. However, timing matters - share when you feel safe and when the relationship is stable enough to handle the conversation.
                </p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I know if my relationship is affecting my mental health?</h3>
                <p className="text-gray-600">
                  Signs include feeling anxious or depressed specifically around your partner, walking on eggshells, losing your sense of self, or your symptoms worsening when you're together. A therapist can help you assess the relationship's impact.
                </p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Can couples therapy help with individual mental health issues?</h3>
                <p className="text-gray-600">
                  Yes, couples therapy can be very effective. It helps improve communication, teaches partners how to support each other, and addresses how mental health issues affect the relationship. However, individual therapy may also be needed.
                </p>
              </div>
              <div className="pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What if my partner won't support my mental health treatment?</h3>
                <p className="text-gray-600">
                  This is a serious concern that needs addressing. Try educating them about your condition, involve them in therapy sessions if possible, and set clear boundaries about needing their support. If they refuse, consider whether the relationship is healthy for your mental health.
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-pink-600 to-purple-600 rounded-xl shadow-lg p-6 text-white">
            <h2 className="text-2xl font-bold mb-4">Build Healthier Relationships for Better Mental Health</h2>
            <p className="mb-6">
              Strong, supportive relationships are fundamental to mental health and recovery. Start implementing these communication strategies today to build connections that nurture rather than drain your mental well-being.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/tools/free-mental-health-tools"
                className="bg-white text-purple-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors duration-200 text-center"
              >
                Try Communication Tools
              </Link>
              <Link
                href="/crisis-support"
                className="bg-purple-800 text-white font-semibold py-3 px-6 rounded-lg hover:bg-purple-900 transition-colors duration-200 text-center"
              >
                Relationship Crisis Support
              </Link>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <LegalDisclaimer variant="footer" />
      </div>
    </>
  )
}