import Head from 'next/head'
import Link from 'next/link'

export default function CrisisSupport() {
  return (
    <>
      <Head>
        <title>Crisis Support - Mental Wellness App</title>
        <meta name="description" content="Immediate mental health crisis support and resources" />
      </Head>
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200 bg-red-50">
              <h1 className="text-2xl font-bold text-red-900">🆘 Crisis Support</h1>
              <p className="text-red-800 mt-1">
                If you're in immediate danger, please call 911 or go to your nearest emergency room.
              </p>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Immediate Help */}
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-red-900 mb-4">Immediate Help</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-red-800">988 Suicide & Crisis Lifeline</h3>
                      <p className="text-red-700 text-sm mb-2">24/7 free and confidential support</p>
                      <a
                        href="tel:988"
                        className="inline-block bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg"
                      >
                        Call 988
                      </a>
                    </div>

                    <div>
                      <h3 className="font-semibold text-red-800">Crisis Text Line</h3>
                      <p className="text-red-700 text-sm mb-2">Text with a crisis counselor</p>
                      <a
                        href="sms:741741?body=HOME"
                        className="inline-block bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg"
                      >
                        Text HOME to 741741
                      </a>
                    </div>

                    <div>
                      <h3 className="font-semibold text-red-800">Emergency Services</h3>
                      <p className="text-red-700 text-sm mb-2">For immediate physical danger</p>
                      <a
                        href="tel:911"
                        className="inline-block bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg"
                      >
                        Call 911
                      </a>
                    </div>
                  </div>
                </div>

                {/* Online Resources */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-blue-900 mb-4">Online Support</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-blue-800">Crisis Chat</h3>
                      <p className="text-blue-700 text-sm mb-2">Online chat support</p>
                      <a
                        href="https://suicidepreventionlifeline.org/chat/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg"
                      >
                        Start Chat
                      </a>
                    </div>

                    <div>
                      <h3 className="font-semibold text-blue-800">SAMHSA Helpline</h3>
                      <p className="text-blue-700 text-sm mb-2">Mental health treatment referral</p>
                      <a
                        href="tel:1-800-662-4357"
                        className="inline-block bg-blue-600 hover:blue-red-700 text-white font-medium py-2 px-4 rounded-lg"
                      >
                        Call 1-800-662-HELP
                      </a>
                    </div>

                    <div>
                      <h3 className="font-semibold text-blue-800">Veterans Crisis Line</h3>
                      <p className="text-blue-700 text-sm mb-2">24/7 support for veterans</p>
                      <a
                        href="tel:988"
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg"
                      >
                        Call 988, Press 1
                      </a>
                    </div>
                  </div>
                </div>

                {/* Coping Strategies */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-green-900 mb-4">Immediate Coping Strategies</h2>
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold text-green-800">5-4-3-2-1 Grounding</h3>
                      <p className="text-green-700 text-sm">
                        Name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-green-800">Deep Breathing</h3>
                      <p className="text-green-700 text-sm">
                        Breathe in for 4 counts, hold for 4, breathe out for 6
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-green-800">Safe Space</h3>
                      <p className="text-green-700 text-sm">
                        Go to a safe, comfortable place where you feel secure
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-green-800">Reach Out</h3>
                      <p className="text-green-700 text-sm">
                        Contact a trusted friend, family member, or counselor
                      </p>
                    </div>
                  </div>
                </div>

                {/* Safety Planning */}
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-purple-900 mb-4">Safety Planning</h2>
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold text-purple-800">Warning Signs</h3>
                      <p className="text-purple-700 text-sm">
                        Recognize your personal warning signs of crisis
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-purple-800">Support Network</h3>
                      <p className="text-purple-700 text-sm">
                        Keep a list of people you can contact for support
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-purple-800">Professional Contacts</h3>
                      <p className="text-purple-700 text-sm">
                        Have your therapist and doctor's contact information ready
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-purple-800">Safe Environment</h3>
                      <p className="text-purple-700 text-sm">
                        Remove or secure items that could be used for self-harm
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Important Disclaimers */}
              <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h2 className="text-lg font-semibold text-yellow-900 mb-3">Important Information</h2>
                <div className="space-y-2 text-yellow-800 text-sm">
                  <p>
                    • If you are in immediate physical danger, call 911 or go to your nearest emergency room
                  </p>
                  <p>
                    • This app is not a substitute for professional mental health treatment
                  </p>
                  <p>
                    • Crisis support services are free, confidential, and available 24/7
                  </p>
                  <p>
                    • You are not alone - help is available and recovery is possible
                  </p>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/safety/plan" className="block p-4 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors">
                  <h3 className="font-semibold text-purple-900 mb-1">📋 Create Safety Plan</h3>
                  <p className="text-purple-700 text-sm">Build a personalized safety plan for crisis situations</p>
                </Link>

                <Link href="/" className="block p-4 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
                  <h3 className="font-semibold text-gray-900 mb-1">🏠 Return to Dashboard</h3>
                  <p className="text-gray-700 text-sm">Go back to your main dashboard</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}