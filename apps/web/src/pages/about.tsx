import Link from 'next/link'
import Image from 'next/image'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { SEOHead } from '@/components/SEOHead'
import { buildBreadcrumbList, medicalWebPageStructuredData, organizationStructuredData } from '@/lib/seo'

export default function AboutPage() {
  const structuredData = [
    medicalWebPageStructuredData({
      name: 'About Mental Wellness App | Clinical Standards & Mission',
      description: "Discover the story behind Mental Wellness App. We combine clinical evidence, advanced technology, and compassionate design to make mental health support accessible to everyone, for free.",
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
        title="About Us | Our Mission for Free Mental Health Support"
        description="Mental Wellness App combines clinical expertise with accessible technology to provide free, evidence-based mental health support worldwide. Read our story."
        structuredData={structuredData}
        ogImage="/og-default.png"
      />
      <Navbar variant="marketing" />
      <main className="bg-white">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-28 overflow-hidden bg-gray-50">
          <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))] bg-top bg-[length:20px_20px]" />
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
            <span className="inline-flex items-center rounded-full bg-therapy-100 px-4 py-1.5 text-sm font-bold text-therapy-700 tracking-wide uppercase">
              Our Mission
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight">
              Making mental health support <span className="text-therapy-600">accessible to everyone</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              We believe that quality mental healthcare is a fundamental human right, not a luxury. We're bridging the gap between clinical expertise and daily life.
            </p>
          </div>
        </section>

        {/* Our Story - Storytelling Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl">
                {/* Placeholder for a team or abstract calm image. Using a colored div fallback if image fails, but requesting next/image */}
                <div className="absolute inset-0 bg-gradient-to-br from-therapy-100 to-blue-50" />
                <Image
                  src="/about-story.png"
                  alt="Team collaborating on mental health solutions"
                  fill
                  className="object-cover"
                  priority
                  // Fallback to a solid color if image is missing in dev
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-8">
                  <p className="text-white font-medium text-lg italic">"Technology should serve humanity, not the other way around."</p>
                </div>
              </div>

              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-900">Why We Started</h2>
                <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                  <p>
                    In a world where 1 in 4 people experience mental health challenges, the barriers to care remain staggeringly high. Long waitlists, prohibitive costs, and social stigma often prevent people from getting the help they need when they need it most.
                  </p>
                  <p>
                    We started Mental Wellness App with a simple but radical idea: <strong>What if clinical-grade mental health tools were free, private, and available 24/7?</strong>
                  </p>
                  <p>
                    Born from a collaboration between software engineers and licensed psychologists, our platform translates proven therapeutic techniques—like CBT, DBT, and mindfulness—into accessible digital experiences. We aren't replacing therapists; we're empowering you to build resilience every single day.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Clinical Standards / E-E-A-T Section */}
        <section className="py-20 bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl lg:text-4xl font-bold">Rooted in Science, Built for Safety</h2>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                Trust is earned. Our platform is continuously reviewed by clinical professionals to ensure every tool, assessment, and resource aligns with current medical standards.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 hover:border-therapy-500 transition-colors">
                <div className="w-12 h-12 bg-therapy-900 rounded-xl flex items-center justify-center text-2xl mb-6">🔬</div>
                <h3 className="text-xl font-bold mb-3">Evidence-Based Care</h3>
                <p className="text-slate-400 leading-relaxed">
                  Our tools are adapted from validated clinical protocols including PHQ-9 (depression), GAD-7 (anxiety), and standardized CBT exercises. We don't guess; we follow the research.
                </p>
              </div>

              <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 hover:border-therapy-500 transition-colors">
                <div className="w-12 h-12 bg-therapy-900 rounded-xl flex items-center justify-center text-2xl mb-6">🛡️</div>
                <h3 className="text-xl font-bold mb-3">HIPAA-Grade Privacy</h3>
                <p className="text-slate-400 leading-relaxed">
                  Your mental health journey is private. We use end-to-end encryption and adhere to strict HIPAA and SOC 2 guidelines to ensure your data stays yours. We never sell user data.
                </p>
              </div>

              <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 hover:border-therapy-500 transition-colors">
                <div className="w-12 h-12 bg-therapy-900 rounded-xl flex items-center justify-center text-2xl mb-6">🩺</div>
                <h3 className="text-xl font-bold mb-3">Clinical Oversight</h3>
                <p className="text-slate-400 leading-relaxed">
                  Content is reviewed by our Clinical Advisory Board comprising licensed therapists and psychiatrists to ensure accuracy, safety, and therapeutic value.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-20 lg:py-28">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-12">Our Core Values</h2>
            <div className="grid sm:grid-cols-2 gap-12 text-left">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Empathy First</h3>
                <p className="text-gray-600">We design not just for users, but for humans. Every interaction is crafted to be supportive, non-judgmental, and validating.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Radical Accessibility</h3>
                <p className="text-gray-600">Cost should never be a barrier to peace of mind. Our core tools will always remain free for individuals.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Continuous Innovation</h3>
                <p className="text-gray-600">We leverage the latest in behavioral science and technology to create more personalized and effective support systems.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Community & Connection</h3>
                <p className="text-gray-600">Healing doesn't happen in isolation. We foster safe spaces for connection while protecting anonymity.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-therapy-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
            <h2 className="text-3xl font-bold text-gray-900">Start Your Wellness Journey</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              You don't have to face your challenges alone. Join thousands of members using Mental Wellness App to find balance and clarity.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/auth/signup"
                className="inline-flex items-center justify-center rounded-lg bg-therapy-600 px-8 py-4 text-white font-bold shadow-lg hover:bg-therapy-700 hover:shadow-xl transition-all"
              >
                Create Free Account
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-8 py-4 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
              >
                Explore Resources
              </Link>
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="py-8 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm text-gray-500 max-w-3xl mx-auto">
              <strong>Medical Disclaimer:</strong> The content and tools provided by Mental Wellness App are for informational and self-management purposes only and do not constitute professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. If you are in crisis, please use the emergency resources listed on our Crisis Support page.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
