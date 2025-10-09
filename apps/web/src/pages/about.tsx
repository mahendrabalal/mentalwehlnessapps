import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { SEOHead } from '@/components/SEOHead'
import { buildBreadcrumbList, medicalWebPageStructuredData, organizationStructuredData } from '@/lib/seo'

export default function AboutPage() {
  const structuredData = [
    medicalWebPageStructuredData({
      name: 'About Mental Wellness App',
      description: "Learn about Mental Wellness App's mission, clinical leadership, and commitment to HIPAA-compliant digital mental health.",
      slug: '/about',
    }),
    organizationStructuredData(),
    buildBreadcrumbList([
      { name: 'Mental Wellness App', url: '/' },
      { name: 'About', url: '/about' },
    ]),
  ]

  return (
    <>
      <SEOHead
        title="About Mental Wellness App"
        description="Mental Wellness App pairs AI-enabled insights with clinically guided care to deliver safe, compassionate support for every member."
        structuredData={structuredData}
        ogImage="/og-default.png"
      />
      <Navbar />
      <main className="bg-gray-50">
        <section className="bg-white py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <span className="inline-flex items-center rounded-full bg-therapy-100 px-3 py-1 text-sm font-semibold text-therapy-700">Our Mission</span>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">Human-centered technology for whole-person mental health</h1>
            <p className="text-lg sm:text-xl text-gray-600">
              Mental Wellness App blends evidence-based care, always-on crisis safeguards, and compassionate design to help members, providers, and families navigate behavioral health with confidence.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-8 md:grid-cols-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Clinically Guided from Day One</h2>
              <p className="text-gray-600 leading-relaxed">
                Our clinical advisory board includes licensed therapists, psychiatrists, and crisis response specialists. Every workflow—from onboarding to crisis escalation—follows HIPAA safeguards, SOC 2 controls, and APA guidance for digital mental health solutions.
              </p>
              <ul className="mt-6 space-y-3 text-gray-600">
                <li>• HIPAA, SOC 2, and OWASP-aligned development lifecycle</li>
                <li>• Clinically reviewed assessments (PHQ-9, GAD-7, Columbia Suicide Severity Rating)</li>
                <li>• Built-in crisis escalation pathways with 988, chat, and geolocated resources</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">AI with Guardrails</h2>
              <p className="text-gray-600 leading-relaxed">
                Our AI therapy companion runs on privacy-aware architecture. Every conversation is encrypted, session timeouts prevent drift, and automated detectors escalate risky language to human review when necessary.
              </p>
              <ul className="mt-6 space-y-3 text-gray-600">
                <li>• Anonymous mode for sensitive conversations</li>
                <li>• Safety classifiers tuned on clinical datasets</li>
                <li>• Human-in-the-loop audit workflows for ongoing quality</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  title: 'Whole-Person Support',
                  description:
                    'Daily mood tracking, guided meditations, content libraries, and personalized dashboards help members build consistent wellness routines.',
                  icon: '🧠',
                },
                {
                  title: 'Provider Collaboration',
                  description:
                    'Care teams can access structured insights, progress summaries, and configurable safety plans to coordinate follow-up care.',
                  icon: '🤝',
                },
                {
                  title: 'Security & Compliance',
                  description:
                    'Role-based access, encryption at rest and in transit, audit trails, and SOC 2-aligned controls safeguard protected health information.',
                  icon: '🛡️',
                },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-gray-100 p-6 shadow-sm bg-gray-50">
                  <div className="text-3xl mb-4" aria-hidden="true">{item.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Ready to partner with Mental Wellness App?</h2>
            <p className="text-lg text-gray-600">
              Whether you're supporting employees, coordinating clinical services, or expanding crisis programs, our team can tailor Mental Wellness App to your population.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg bg-therapy-600 px-6 py-3 text-white font-semibold shadow-sm hover:bg-therapy-700 transition-colors"
              >
                Contact Our Team
              </Link>
              <Link
                href="/features"
                className="inline-flex items-center justify-center rounded-lg border border-therapy-200 px-6 py-3 text-therapy-700 font-semibold hover:bg-therapy-100 transition-colors"
              >
                Explore Platform Features
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
