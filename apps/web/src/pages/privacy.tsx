import Head from 'next/head'
import { Navbar } from '@/components/Navbar'

export default function PrivacyPolicyPage() {
  return (
    <>
      <Head>
        <title>Privacy Policy - MentalWellnessApps</title>
        <meta name="description" content="Privacy policy for MentalWellnessApps - how we protect and handle your personal information" />
      </Head>

      <Navbar />

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
            <p className="text-gray-600 mb-8">Last updated: September 26, 2024</p>

            <div className="prose prose-lg max-w-none">
              <h2>1. Introduction</h2>
              <p>
                MentalWellnessApps ("we," "our," or "us") is committed to protecting your privacy and ensuring the security of your personal health information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mental wellness platform.
              </p>

              <h2>2. Information We Collect</h2>

              <h3>2.1 Personal Information</h3>
              <ul>
                <li>Account information (name, email address, password)</li>
                <li>Profile information (age, preferred name, pronouns)</li>
                <li>Emergency contact information</li>
                <li>Communication preferences</li>
              </ul>

              <h3>2.2 Health Information</h3>
              <ul>
                <li>Mood tracking data and emotional state logs</li>
                <li>Mental health assessment responses (PHQ-9, GAD-7, etc.)</li>
                <li>AI companion conversation history</li>
                <li>Safety plan details and crisis intervention data</li>
                <li>Wellness progress and analytics data</li>
              </ul>

              <h3>2.3 Technical Information</h3>
              <ul>
                <li>Device information and browser type</li>
                <li>IP address and location data (if permitted)</li>
                <li>Usage patterns and feature interactions</li>
                <li>Log files and error reports</li>
              </ul>

              <h2>3. How We Use Your Information</h2>

              <h3>3.1 Primary Uses</h3>
              <ul>
                <li><strong>Providing Services:</strong> Deliver personalized mental wellness support and AI companion interactions</li>
                <li><strong>Analytics:</strong> Generate insights about your wellness patterns and progress</li>
                <li><strong>Safety:</strong> Monitor for crisis indicators and provide emergency resources</li>
                <li><strong>Improvement:</strong> Enhance our AI algorithms and platform features</li>
              </ul>

              <h3>3.2 Communication</h3>
              <ul>
                <li>Send wellness reminders and check-ins (with your consent)</li>
                <li>Provide customer support and respond to inquiries</li>
                <li>Share important service updates and security notices</li>
              </ul>

              <h2>4. Information Sharing and Disclosure</h2>

              <h3>4.1 We Do NOT Share Your Information With:</h3>
              <ul>
                <li>Advertisers or marketing companies</li>
                <li>Social media platforms</li>
                <li>Insurance companies</li>
                <li>Employers or educational institutions</li>
                <li>Third-party data brokers</li>
              </ul>

              <h3>4.2 Limited Sharing Only When:</h3>
              <ul>
                <li><strong>With Your Consent:</strong> When you explicitly authorize sharing with healthcare providers</li>
                <li><strong>Legal Requirements:</strong> When required by law, court order, or legal process</li>
                <li><strong>Emergency Situations:</strong> To prevent imminent harm to you or others</li>
                <li><strong>Service Providers:</strong> With trusted vendors who assist in providing our services (under strict confidentiality agreements)</li>
              </ul>

              <h2>5. Data Security</h2>

              <h3>5.1 Technical Safeguards</h3>
              <ul>
                <li><strong>Encryption:</strong> All data encrypted in transit (TLS 1.3) and at rest (AES-256)</li>
                <li><strong>Access Controls:</strong> Multi-factor authentication and role-based access</li>
                <li><strong>Infrastructure:</strong> HIPAA-compliant cloud hosting with enterprise security</li>
                <li><strong>Monitoring:</strong> 24/7 security monitoring and intrusion detection</li>
              </ul>

              <h3>5.2 Organizational Safeguards</h3>
              <ul>
                <li>Regular security training for all staff</li>
                <li>Strict data access policies and audit trails</li>
                <li>Background checks for employees with data access</li>
                <li>Incident response and breach notification procedures</li>
              </ul>

              <h2>6. Your Rights and Choices</h2>

              <h3>6.1 Access and Control</h3>
              <ul>
                <li><strong>View Your Data:</strong> Access all personal information we have about you</li>
                <li><strong>Update Information:</strong> Correct or update your personal and health information</li>
                <li><strong>Export Data:</strong> Download your complete data in portable formats</li>
                <li><strong>Delete Account:</strong> Permanently delete your account and all associated data</li>
              </ul>

              <h3>6.2 Communication Preferences</h3>
              <ul>
                <li>Opt out of non-essential communications</li>
                <li>Choose frequency of wellness reminders</li>
                <li>Select preferred contact methods</li>
              </ul>

              <h2>7. Data Retention</h2>
              <p>
                We retain your information only as long as necessary to provide services and as required by law:
              </p>
              <ul>
                <li><strong>Active Accounts:</strong> Data retained while your account is active</li>
                <li><strong>Inactive Accounts:</strong> Data deleted after 3 years of inactivity (unless you specify otherwise)</li>
                <li><strong>Health Records:</strong> Maintained according to applicable healthcare regulations</li>
                <li><strong>Legal Requirements:</strong> Some data may be retained longer to comply with legal obligations</li>
              </ul>

              <h2>8. Children's Privacy</h2>
              <p>
                Our service is not intended for children under 13. We do not knowingly collect personal information from children under 13. If we discover that a child under 13 has provided us with personal information, we will immediately delete such information.
              </p>

              <h2>9. International Data Transfers</h2>
              <p>
                Your information may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place to protect your information in accordance with this Privacy Policy.
              </p>

              <h2>10. Third-Party Services</h2>
              <p>
                Our platform may contain links to third-party websites or integrate with external services. We are not responsible for the privacy practices of these third parties. We encourage you to review their privacy policies.
              </p>

              <h2>11. Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any material changes by:
              </p>
              <ul>
                <li>Posting the updated policy on our website</li>
                <li>Sending email notification to registered users</li>
                <li>Displaying a prominent notice in the application</li>
              </ul>

              <h2>12. Contact Information</h2>
              <p>
                If you have any questions about this Privacy Policy or our privacy practices, please contact us:
              </p>
              <ul>
                <li><strong>Email:</strong> privacy@mentalwellnessapps.com</li>
                <li><strong>Privacy Officer:</strong> Available through our contact form</li>
                <li><strong>Response Time:</strong> We respond to privacy inquiries within 72 hours</li>
              </ul>

              <h2>13. State-Specific Rights</h2>

              <h3>13.1 California Residents (CCPA)</h3>
              <p>California residents have additional rights under the California Consumer Privacy Act:</p>
              <ul>
                <li>Right to know what personal information is collected</li>
                <li>Right to delete personal information</li>
                <li>Right to opt-out of the sale of personal information (we do not sell personal information)</li>
                <li>Right to non-discrimination for exercising CCPA rights</li>
              </ul>

              <h3>13.2 European Residents (GDPR)</h3>
              <p>If you are in the European Economic Area, you have rights under the General Data Protection Regulation:</p>
              <ul>
                <li>Right to access, rectify, erase, and restrict processing</li>
                <li>Right to data portability</li>
                <li>Right to object to processing</li>
                <li>Right to withdraw consent</li>
                <li>Right to lodge a complaint with supervisory authorities</li>
              </ul>

              <div className="bg-therapy-50 border border-therapy-200 rounded-lg p-6 mt-8">
                <h3 className="text-lg font-semibold text-therapy-800 mb-2">
                  🛡️ Your Privacy Matters
                </h3>
                <p className="text-therapy-700">
                  We are committed to transparency and protecting your mental health information.
                  If you have any concerns about your privacy or data security, please don't hesitate to contact us.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}