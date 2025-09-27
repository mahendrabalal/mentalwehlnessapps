import Head from 'next/head'
import { Navbar } from '@/components/Navbar'

export default function TermsOfServicePage() {
  return (
    <>
      <Head>
        <title>Terms of Service - MentalWellnessApps</title>
        <meta name="description" content="Terms of Service for MentalWellnessApps - legal terms and conditions for using our platform" />
      </Head>

      <Navbar />

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Terms of Service</h1>
            <p className="text-gray-600 mb-8">Last updated: September 26, 2024</p>

            <div className="prose prose-lg max-w-none">
              <h2>1. Agreement to Terms</h2>
              <p>
                By accessing or using MentalWellnessApps ("the Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of these terms, you may not access the Service.
              </p>

              <h2>2. Description of Service</h2>
              <p>
                MentalWellnessApps is a digital mental wellness platform that provides:
              </p>
              <ul>
                <li>AI-powered therapy companion for emotional support</li>
                <li>Mood tracking and mental health analytics</li>
                <li>Safety planning and crisis intervention resources</li>
                <li>Educational content and guided wellness exercises</li>
                <li>Progress tracking and personalized insights</li>
              </ul>

              <h2>3. Medical Disclaimer</h2>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 my-6">
                <p className="text-red-800 font-semibold">
                  <strong>IMPORTANT:</strong> This service is NOT a substitute for professional medical care, therapy, or emergency services.
                </p>
              </div>
              <ul>
                <li>Our AI companion provides support but is not a licensed therapist</li>
                <li>For mental health emergencies, call 911 or your local emergency services</li>
                <li>For crisis support, contact 988 (Suicide & Crisis Lifeline)</li>
                <li>Always consult with qualified healthcare professionals for medical advice</li>
                <li>Do not rely solely on our platform for treatment decisions</li>
              </ul>

              <h2>4. User Accounts</h2>

              <h3>4.1 Account Registration</h3>
              <ul>
                <li>You must provide accurate and complete information</li>
                <li>You are responsible for maintaining the security of your account</li>
                <li>You must notify us immediately of any unauthorized access</li>
                <li>You may not share your account with others</li>
              </ul>

              <h3>4.2 Age Requirements</h3>
              <ul>
                <li>You must be at least 13 years old to use the Service</li>
                <li>Users under 18 need parental consent</li>
                <li>We may verify age and request documentation if needed</li>
              </ul>

              <h2>5. Acceptable Use</h2>

              <h3>5.1 Permitted Uses</h3>
              <ul>
                <li>Personal, non-commercial use for mental wellness</li>
                <li>Tracking your mood and mental health data</li>
                <li>Engaging with our AI companion for support</li>
                <li>Creating and maintaining safety plans</li>
              </ul>

              <h3>5.2 Prohibited Uses</h3>
              <p>You may NOT use the Service to:</p>
              <ul>
                <li>Violate any applicable laws or regulations</li>
                <li>Harass, abuse, or harm others</li>
                <li>Share false, misleading, or harmful information</li>
                <li>Attempt to access other users' accounts or data</li>
                <li>Reverse engineer or hack the platform</li>
                <li>Use the Service for commercial purposes without permission</li>
                <li>Spam or send unsolicited communications</li>
              </ul>

              <h2>6. Subscription and Payment</h2>

              <h3>6.1 Free Trial</h3>
              <ul>
                <li>7-day free trial for premium features</li>
                <li>No credit card required to start trial</li>
                <li>Automatic conversion to paid subscription unless cancelled</li>
                <li>Cancel anytime during trial period</li>
              </ul>

              <h3>6.2 Premium Subscription</h3>
              <ul>
                <li>Monthly subscription at $19.99/month</li>
                <li>Automatic renewal unless cancelled</li>
                <li>Billing occurs at the start of each billing cycle</li>
                <li>Price changes will be communicated 30 days in advance</li>
              </ul>

              <h3>6.3 Cancellation and Refunds</h3>
              <ul>
                <li>Cancel subscription anytime from your account settings</li>
                <li>Access continues until end of current billing period</li>
                <li>No refunds for partial months unless required by law</li>
                <li>Free tier access maintained after cancellation</li>
              </ul>

              <h2>7. Privacy and Data</h2>
              <p>
                Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your information. By using the Service, you consent to our Privacy Policy.
              </p>

              <h2>8. Intellectual Property</h2>

              <h3>8.1 Our Rights</h3>
              <ul>
                <li>We own all rights to the MentalWellnessApps platform</li>
                <li>Our content, software, and trademarks are protected</li>
                <li>You may not copy, modify, or distribute our intellectual property</li>
              </ul>

              <h3>8.2 Your Rights</h3>
              <ul>
                <li>You retain ownership of your personal health data</li>
                <li>You can export or delete your data at any time</li>
                <li>We have limited rights to use your data as described in our Privacy Policy</li>
              </ul>

              <h2>9. Limitation of Liability</h2>
              <p>
                TO THE MAXIMUM EXTENT PERMITTED BY LAW:
              </p>
              <ul>
                <li>We provide the Service "as is" without warranties</li>
                <li>We are not liable for any indirect, incidental, or consequential damages</li>
                <li>Our total liability is limited to the amount you paid for the Service</li>
                <li>We are not responsible for third-party content or services</li>
              </ul>

              <h2>10. Indemnification</h2>
              <p>
                You agree to indemnify and hold harmless MentalWellnessApps from any claims, damages, or expenses arising from your use of the Service or violation of these Terms.
              </p>

              <h2>11. Termination</h2>

              <h3>11.1 Termination by You</h3>
              <ul>
                <li>Delete your account anytime from account settings</li>
                <li>Cancellation takes effect at end of billing period</li>
                <li>You can download your data before deletion</li>
              </ul>

              <h3>11.2 Termination by Us</h3>
              <ul>
                <li>We may suspend or terminate accounts that violate these Terms</li>
                <li>We will provide notice when possible</li>
                <li>You will have opportunity to export your data</li>
              </ul>

              <h2>12. Changes to Terms</h2>
              <p>
                We may modify these Terms from time to time. We will:
              </p>
              <ul>
                <li>Post updated Terms on our website</li>
                <li>Email notification for material changes</li>
                <li>Provide 30 days notice for significant changes</li>
                <li>Continued use constitutes acceptance of new Terms</li>
              </ul>

              <h2>13. Governing Law</h2>
              <p>
                These Terms are governed by the laws of [State/Country]. Any disputes will be resolved in the courts of [Jurisdiction].
              </p>

              <h2>14. Contact Information</h2>
              <p>
                Questions about these Terms? Contact us:
              </p>
              <ul>
                <li><strong>Email:</strong> legal@mentalwellnessapps.com</li>
                <li><strong>Support:</strong> Use our contact form</li>
                <li><strong>Address:</strong> [Business Address]</li>
              </ul>

              <h2>15. Severability</h2>
              <p>
                If any provision of these Terms is found to be unenforceable, the remaining provisions will remain in full force and effect.
              </p>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
                <h3 className="text-lg font-semibold text-blue-800 mb-2">
                  📋 Summary of Key Points
                </h3>
                <ul className="text-blue-700 space-y-1">
                  <li>• This is a support tool, not medical treatment</li>
                  <li>• Use responsibly and respect others</li>
                  <li>• Your data belongs to you</li>
                  <li>• Cancel subscription anytime</li>
                  <li>• Contact us with questions</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}