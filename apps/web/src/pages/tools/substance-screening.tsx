import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { SEOHead } from '@/components/SEOHead'
import { GuestToolBanner } from '@/components/GuestToolBanner'
import { LegalDisclaimer } from '@/components/LegalDisclaimer'
import { medicalWebPageStructuredData } from '@/lib/seo'
import { TOOLS_PAGES_DATES } from '@/lib/seo-constants'

export default function SubstanceScreeningTool() {
  const structuredData = [
    medicalWebPageStructuredData({
      name: 'Substance Use Screening Resources - Get Help',
      description: 'Find substance use screening resources and professional support. Confidential, evidence-based information about substance use disorders and treatment options.',
      slug: '/tools/substance-screening',
    }),
  ]

  return (
    <>
      <SEOHead
        title="Substance Use Screening & Support Resources"
        description="Get confidential substance use screening info and professional support resources. Find treatment options, support groups, and crisis intervention."
        publishedTime={TOOLS_PAGES_DATES['substance-screening'].published}
        modifiedTime={TOOLS_PAGES_DATES['substance-screening'].modified}
        keywords={["substance use screening", "drug abuse test", "addiction screening", "substance use disorder", "addiction help", "DAST-10", "substance abuse resources", "treatment finder"]}
        ogImage="/og-substance-screening.png"
        structuredData={structuredData}
      />

      <Navbar />
      <GuestToolBanner toolName="Substance Screening Resources" />

      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <nav className="flex mb-6 text-sm" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link href="/" className="text-gray-600 hover:text-therapy-600 transition-colors">Home</Link>
              </li>
              <li>
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-gray-400 mx-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  <Link href="/dashboard" className="text-gray-600 hover:text-therapy-600 transition-colors">Tools</Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-gray-400 mx-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-500">Substance Screening</span>
                </div>
              </li>
            </ol>
          </nav>

          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Substance Use Screening & Support Resources
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              If you're concerned about substance use, you're not alone. Find confidential, professional screening and support resources below. Early identification can prevent escalation and connect you to life-saving treatment.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">✓ Confidential</span>
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">✓ Non-judgmental</span>
              <span className="bg-purple-100 text-purple-800 text-xs font-medium px-3 py-1 rounded-full">✓ Professional resources</span>
            </div>
          </div>

          {/* Crisis Resources */}
          <div className="bg-red-50 border-2 border-red-300 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-red-600">🚨</span>
              Immediate Help Available 24/7
            </h2>
            <div className="space-y-3 text-sm">
              <div className="bg-white rounded-lg p-4">
                <div className="font-bold text-gray-900 mb-1">SAMHSA National Helpline (USA)</div>
                <div className="text-2xl font-bold text-red-600 mb-1">1-800-662-4357</div>
                <div className="text-gray-700">Free, confidential, 24/7 treatment referral and information service (in English and Spanish)</div>
              </div>
              <div className="bg-white rounded-lg p-4">
                <div className="font-bold text-gray-900 mb-1">Crisis Text Line</div>
                <div className="text-xl font-bold text-red-600 mb-1">Text HOME to 741741</div>
                <div className="text-gray-700">Free, 24/7 crisis support via text message</div>
              </div>
              <div className="bg-white rounded-lg p-4">
                <div className="font-bold text-gray-900 mb-1">Substance Abuse Treatment Locator</div>
                <a href="https://findtreatment.samhsa.gov/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  findtreatment.samhsa.gov →
                </a>
                <div className="text-gray-700 mt-1">Find treatment facilities in your area</div>
              </div>
            </div>
          </div>

          {/* Professional Screening */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Professional Screening Recommended</h2>
            <div className="prose prose-sm max-w-none text-gray-700">
              <p className="mb-4">
                While self-assessments can provide initial insights, <strong>professional screening is essential</strong> for accurate assessment and personalized treatment planning.
              </p>
              <div className="bg-blue-50 rounded-lg p-4 mb-4">
                <h3 className="font-bold text-gray-900 mb-2">The DAST-10 (Drug Abuse Screening Test)</h3>
                <p className="text-sm">
                  The DAST-10 is a validated 10-item screening tool used by healthcare professionals to identify drug use problems.
                  It has 85% accuracy for detecting substance use disorders and provides clinical cutoffs for severity levels.
                </p>
                <p className="text-sm mt-2">
                  <strong>We recommend:</strong> Complete this screening with a healthcare provider, therapist, or addiction specialist
                  who can properly interpret results and discuss next steps.
                </p>
              </div>
              <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-600">
                <p className="text-sm">
                  <strong>Why Professional Screening Matters:</strong>
                </p>
                <ul className="text-sm mt-2 space-y-1 ml-4">
                  <li>• Accurate diagnosis requires clinical judgment</li>
                  <li>• Co-occurring mental health conditions need assessment</li>
                  <li>• Treatment planning should be personalized</li>
                  <li>• Safety concerns (withdrawal risks) must be evaluated</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Where to Get Screened */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Where to Get Professional Screening</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-50 rounded-lg p-4">
                <div className="font-bold text-gray-900 mb-2">🏥 Primary Care Doctor</div>
                <p className="text-sm text-gray-700">Most PCPs can administer DAST-10 and provide referrals. Often covered by insurance.</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="font-bold text-gray-900 mb-2">🧠 Addiction Specialists</div>
                <p className="text-sm text-gray-700">Licensed addiction counselors and therapists specialize in substance use assessment.</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <div className="font-bold text-gray-900 mb-2">🏢 Community Health Centers</div>
                <p className="text-sm text-gray-700">Low-cost or free screening and treatment services based on income.</p>
              </div>
              <div className="bg-orange-50 rounded-lg p-4">
                <div className="font-bold text-gray-900 mb-2">💻 Online Therapy Platforms</div>
                <p className="text-sm text-gray-700">Some platforms offer substance use counseling and screening remotely.</p>
              </div>
            </div>
          </div>

          {/* Support Resources */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Support Groups & Recovery Resources</h2>
            <div className="space-y-4 text-sm">
              <div className="border-l-4 border-green-600 bg-green-50 rounded-r-lg p-4">
                <div className="font-bold text-gray-900 mb-1">Alcoholics Anonymous (AA)</div>
                <a href="https://www.aa.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">aa.org</a>
                <p className="text-gray-700 mt-1">12-step program with free meetings worldwide</p>
              </div>
              <div className="border-l-4 border-blue-600 bg-blue-50 rounded-r-lg p-4">
                <div className="font-bold text-gray-900 mb-1">Narcotics Anonymous (NA)</div>
                <a href="https://www.na.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">na.org</a>
                <p className="text-gray-700 mt-1">Fellowship for people recovering from drug addiction</p>
              </div>
              <div className="border-l-4 border-purple-600 bg-purple-50 rounded-r-lg p-4">
                <div className="font-bold text-gray-900 mb-1">SMART Recovery</div>
                <a href="https://www.smartrecovery.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">smartrecovery.org</a>
                <p className="text-gray-700 mt-1">Science-based addiction recovery support (non-12-step)</p>
              </div>
              <div className="border-l-4 border-orange-600 bg-orange-50 rounded-r-lg p-4">
                <div className="font-bold text-gray-900 mb-1">In The Rooms</div>
                <a href="https://www.intherooms.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">intherooms.com</a>
                <p className="text-gray-700 mt-1">Free online recovery meetings and support</p>
              </div>
            </div>
          </div>

          {/* Understanding Substance Use */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-8 border border-blue-200">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Understanding Substance Use Disorders</h2>
            <div className="text-sm text-gray-700 space-y-2">
              <p><strong>It's not about willpower:</strong> Substance use disorders are medical conditions, not moral failures. They change brain chemistry and require professional treatment.</p>
              <p><strong>Recovery is possible:</strong> Millions of people achieve lasting recovery with the right support. Treatment works.</p>
              <p><strong>Early intervention matters:</strong> The sooner you address concerns, the better the outcomes. Don't wait for "rock bottom."</p>
              <p><strong>You deserve compassionate care:</strong> Stigma is the enemy, not you. Seek judgment-free professional support.</p>
            </div>
          </div>

          {/* Related Resources */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Mental Health Resources</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link href="/support/affordable-mental-health-care" className="flex items-center gap-3 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                <span className="text-2xl">💰</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Affordable Treatment Options</h3>
                  <p className="text-sm text-gray-600">Find low-cost care</p>
                </div>
              </Link>
              <Link href="/support/emotional-regulation-skills" className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                <span className="text-2xl">🎯</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Emotional Regulation Skills</h3>
                  <p className="text-sm text-gray-600">Manage difficult emotions</p>
                </div>
              </Link>
              <Link href="/tools/stigma-assessment" className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                <span className="text-2xl">💪</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Overcome Stigma</h3>
                  <p className="text-sm text-gray-600">Challenge shame</p>
                </div>
              </Link>
              <Link href="/tools/loneliness-assessment" className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
                <span className="text-2xl">💙</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Social Connection</h3>
                  <p className="text-sm text-gray-600">Combat isolation</p>
                </div>
              </Link>
            </div>
          </div>

          {/* Other Tools */}
          <div className="bg-gradient-to-r from-therapy-50 to-blue-50 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Try Our Other Free Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link href="/tools/burnout-assessment" className="bg-white p-4 rounded-lg hover:shadow-md transition-shadow">
                <span className="text-3xl block mb-2">🔥</span>
                <h3 className="font-semibold text-gray-900 mb-1">Burnout Assessment</h3>
                <p className="text-sm text-gray-600">Check your risk</p>
              </Link>
              <Link href="/tools/anxiety-relief" className="bg-white p-4 rounded-lg hover:shadow-md transition-shadow">
                <span className="text-3xl block mb-2">😌</span>
                <h3 className="font-semibold text-gray-900 mb-1">Anxiety Relief</h3>
                <p className="text-sm text-gray-600">Immediate techniques</p>
              </Link>
              <Link href="/tools/recovery-timeline" className="bg-white p-4 rounded-lg hover:shadow-md transition-shadow">
                <span className="text-3xl block mb-2">📊</span>
                <h3 className="font-semibold text-gray-900 mb-1">Recovery Timeline</h3>
                <p className="text-sm text-gray-600">Realistic expectations</p>
              </Link>
            </div>
          </div>
        </div>
        <LegalDisclaimer variant="footer" />
      </div>
    </>
  )
}
