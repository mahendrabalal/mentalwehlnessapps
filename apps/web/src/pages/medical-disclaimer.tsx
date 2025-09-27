import Head from 'next/head'
import Link from 'next/link'
import { Navbar } from '@/components/Navbar'

export default function MedicalDisclaimerPage() {
  return (
    <>
      <Head>
        <title>Medical Disclaimer - MentalWellnessApps</title>
        <meta name="description" content="Important medical disclaimer and limitations for MentalWellnessApps services" />
      </Head>

      <Navbar />

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Medical Disclaimer</h1>
            <p className="text-gray-600 mb-8">Last updated: September 26, 2024</p>

            <div className="prose prose-lg max-w-none">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
                <h3 className="text-lg font-semibold text-red-800 mb-2">
                  ⚠️ IMPORTANT MEDICAL DISCLAIMER
                </h3>
                <p className="text-red-700 font-medium">
                  MentalWellnessApps is NOT a substitute for professional medical care, mental health treatment, or emergency services. This platform provides educational and supportive content only.
                </p>
              </div>

              <h2>Not Medical Advice</h2>
              <p>
                The information provided by MentalWellnessApps, including our AI companion, content library, and analytics features, is for <strong>informational and educational purposes only</strong>. This information:
              </p>
              <ul>
                <li>Is not intended to diagnose, treat, cure, or prevent any medical condition</li>
                <li>Should not be considered professional medical advice</li>
                <li>Does not replace consultations with qualified healthcare providers</li>
                <li>Is not a substitute for psychotherapy or psychiatric treatment</li>
                <li>Should not be used to make medical decisions</li>
              </ul>

              <h2>AI Companion Limitations</h2>
              <p>
                Our AI therapy companion is designed to provide emotional support and general wellness guidance. However:
              </p>
              <ul>
                <li><strong>Not a Licensed Therapist:</strong> The AI is not a human therapist and cannot provide professional therapy</li>
                <li><strong>Limited Scope:</strong> AI responses are based on algorithms, not clinical judgment</li>
                <li><strong>Cannot Diagnose:</strong> The AI cannot diagnose mental health conditions</li>
                <li><strong>Cannot Prescribe:</strong> The AI cannot recommend or prescribe medications</li>
                <li><strong>Emergency Limitations:</strong> While trained to detect crisis indicators, it may not identify all emergency situations</li>
              </ul>

              <h2>When to Seek Professional Help</h2>
              <p>
                You should consult with qualified mental health professionals if you experience:
              </p>
              <ul>
                <li>Persistent feelings of sadness, anxiety, or depression</li>
                <li>Thoughts of self-harm or suicide</li>
                <li>Difficulty functioning in daily life</li>
                <li>Substance abuse problems</li>
                <li>Relationship or family problems</li>
                <li>Trauma or PTSD symptoms</li>
                <li>Eating disorders</li>
                <li>Any mental health concerns that interfere with your well-being</li>
              </ul>

              <h2>Emergency Situations</h2>
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 my-6">
                <h3 className="text-red-800 font-bold mb-4">🚨 Immediate Emergency Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-red-700">
                  <div className="text-center">
                    <div className="font-bold text-xl">911</div>
                    <div className="text-sm">Emergency Services</div>
                    <div className="text-xs">For immediate danger</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-xl">988</div>
                    <div className="text-sm">Crisis Lifeline</div>
                    <div className="text-xs">Call or text 24/7</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-xl">741741</div>
                    <div className="text-sm">Crisis Text Line</div>
                    <div className="text-xs">Text HOME to start</div>
                  </div>
                </div>
              </div>

              <p>
                <strong>If you are in immediate danger or having a medical emergency, call 911 immediately.</strong> Do not rely on our platform for emergency situations.
              </p>

              <h2>Scope of Services</h2>

              <h3>What We Provide</h3>
              <ul>
                <li><strong>Educational Content:</strong> Information about mental wellness and coping strategies</li>
                <li><strong>Mood Tracking:</strong> Tools to monitor your emotional well-being</li>
                <li><strong>AI Support:</strong> Conversational support using evidence-based techniques</li>
                <li><strong>Safety Planning:</strong> Tools to create personal crisis response plans</li>
                <li><strong>Resource Directory:</strong> Links to professional mental health resources</li>
              </ul>

              <h3>What We Do NOT Provide</h3>
              <ul>
                <li>Professional psychotherapy or counseling sessions</li>
                <li>Medical diagnoses or treatment recommendations</li>
                <li>Prescription medication advice</li>
                <li>Crisis intervention services</li>
                <li>24/7 human support (our AI operates 24/7, but human support has limited hours)</li>
                <li>Guarantees of therapeutic outcomes</li>
              </ul>

              <h2>Individual Responsibility</h2>
              <p>
                By using MentalWellnessApps, you acknowledge and agree that:
              </p>
              <ul>
                <li>You are responsible for your own mental health care decisions</li>
                <li>You will seek professional help when appropriate</li>
                <li>You understand the limitations of our platform</li>
                <li>You will not rely solely on our platform for mental health treatment</li>
                <li>You will use our crisis resources if you experience emergency situations</li>
              </ul>

              <h2>Accuracy and Reliability</h2>
              <p>
                While we strive to provide accurate and helpful information:
              </p>
              <ul>
                <li>We cannot guarantee the accuracy of all content</li>
                <li>Information may become outdated over time</li>
                <li>AI responses may not always be appropriate for your situation</li>
                <li>Our platform may experience technical issues or downtime</li>
                <li>We recommend verifying important information with healthcare professionals</li>
              </ul>

              <h2>Limitation of Liability</h2>
              <p>
                To the fullest extent permitted by law, MentalWellnessApps and its affiliates disclaim all liability for:
              </p>
              <ul>
                <li>Any injury, damage, or loss resulting from use of our platform</li>
                <li>Decisions made based on information provided by our services</li>
                <li>Any failure to detect or respond to crisis situations</li>
                <li>Technical malfunctions or service interruptions</li>
                <li>Third-party content or linked resources</li>
              </ul>

              <h2>International Users</h2>
              <p>
                If you are accessing our platform from outside the United States:
              </p>
              <ul>
                <li>Emergency numbers and resources may not apply to your location</li>
                <li>Mental health practices and regulations may differ in your country</li>
                <li>Consult local healthcare providers and emergency services</li>
                <li>Review local mental health resources and crisis support options</li>
              </ul>

              <h2>Updates to This Disclaimer</h2>
              <p>
                We may update this medical disclaimer from time to time. We will notify users of significant changes through:
              </p>
              <ul>
                <li>Email notifications to registered users</li>
                <li>In-app notifications</li>
                <li>Updates posted on our website</li>
              </ul>

              <h2>Professional Resources</h2>
              <p>
                We encourage you to establish relationships with qualified mental health professionals. Resources for finding help include:
              </p>
              <ul>
                <li><strong>Psychology Today:</strong> psychologytoday.com</li>
                <li><strong>SAMHSA Treatment Locator:</strong> findtreatment.samhsa.gov</li>
                <li><strong>Your Healthcare Provider:</strong> Primary care physicians can provide referrals</li>
                <li><strong>Insurance Provider:</strong> Check your insurance directory for covered providers</li>
                <li><strong>Local Mental Health Centers:</strong> Community-based mental health services</li>
              </ul>

              <h2>Contact Information</h2>
              <p>
                If you have questions about this medical disclaimer or our services, contact:
              </p>
              <ul>
                <li><strong>Support Team:</strong> <Link href="/contact" className="text-therapy-600 hover:underline">Contact Form</Link></li>
                <li><strong>Crisis Resources:</strong> <Link href="/crisis-support" className="text-red-600 hover:underline">Crisis Support Page</Link></li>
                <li><strong>Medical Questions:</strong> Consult with your healthcare provider</li>
              </ul>

              <div className="bg-therapy-50 border border-therapy-200 rounded-lg p-6 mt-8">
                <h3 className="text-lg font-semibold text-therapy-800 mb-2">
                  🤝 Our Commitment
                </h3>
                <p className="text-therapy-700">
                  While we cannot replace professional medical care, we are committed to providing supportive tools and resources that complement your mental wellness journey. Always prioritize your safety and seek professional help when needed.
                </p>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mt-6">
                <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                  📞 Remember: Help Is Always Available
                </h3>
                <p className="text-yellow-700">
                  If you're struggling with your mental health, you're not alone. Professional help is available, and reaching out for support is a sign of strength, not weakness.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}