import Head from 'next/head'
import { Navbar } from '@/components/Navbar'

export default function HIPAANoticePage() {
  return (
    <>
      <Head>
        <title>HIPAA Notice - MentalWellnessApps</title>
        <meta name="description" content="HIPAA Notice of Privacy Practices for MentalWellnessApps" />
      </Head>

      <Navbar />

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">HIPAA Notice of Privacy Practices</h1>
            <p className="text-gray-600 mb-8">Effective Date: September 26, 2024</p>

            <div className="prose prose-lg max-w-none">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                <h3 className="text-lg font-semibold text-blue-800 mb-2">
                  🛡️ Your Health Information Rights
                </h3>
                <p className="text-blue-700">
                  This notice describes how medical information about you may be used and disclosed and how you can get access to this information. Please review it carefully.
                </p>
              </div>

              <h2>Understanding Your Health Record/Information</h2>
              <p>
                Each time you visit a healthcare provider, a record of your visit is made. Typically, this record contains your symptoms, examination and test results, diagnoses, treatment, and a plan for future care or treatment. This information, often referred to as your health or medical record, serves as a:
              </p>
              <ul>
                <li>Basis for planning your care and treatment</li>
                <li>Means of communication among the many health professionals who contribute to your care</li>
                <li>Legal document describing the care you received</li>
                <li>Means by which you or a third-party payer can verify that services billed were actually provided</li>
                <li>Tool in educating health professionals</li>
                <li>Source of data for medical research</li>
                <li>Source of information for public health officials charged with improving the health of the nation</li>
                <li>Source of data for our facility's planning and marketing</li>
                <li>Tool with which we can assess and continually work to improve the care we render and the outcomes we achieve</li>
              </ul>

              <h2>Your Health Information Rights</h2>
              <p>Although your health record is the physical property of MentalWellnessApps, the information belongs to you. You have the right to:</p>

              <h3>Access Your Records</h3>
              <ul>
                <li>Obtain a copy of your health record</li>
                <li>View your health information in our platform</li>
                <li>Export your data in portable formats</li>
                <li>Request records be sent to another healthcare provider</li>
              </ul>

              <h3>Request Amendments</h3>
              <ul>
                <li>Request amendments to your health record</li>
                <li>Add statements to your record if amendment is denied</li>
                <li>Correct inaccurate or incomplete information</li>
              </ul>

              <h3>Request Restrictions</h3>
              <ul>
                <li>Request that we limit how we use or disclose your information</li>
                <li>Request restrictions on communications to family members</li>
                <li>Choose how and where we contact you</li>
              </ul>

              <h3>Request Confidential Communications</h3>
              <ul>
                <li>Request communications in a certain way or at a certain location</li>
                <li>Choose alternative contact methods</li>
                <li>Specify preferred communication times</li>
              </ul>

              <h3>Accounting of Disclosures</h3>
              <ul>
                <li>Request a list of instances where we have disclosed your information</li>
                <li>Understand who has accessed your information and why</li>
                <li>Review disclosure history for the past six years</li>
              </ul>

              <h2>Our Responsibilities</h2>

              <h3>We Are Required To</h3>
              <ul>
                <li>Maintain the privacy of your health information</li>
                <li>Provide you with this notice of our legal duties and privacy practices</li>
                <li>Follow the terms of the notice currently in effect</li>
                <li>Notify you if your information has been breached</li>
              </ul>

              <h3>We May Use and Disclose Your Information For</h3>

              <h4>Treatment</h4>
              <ul>
                <li>Providing AI-powered therapeutic support and recommendations</li>
                <li>Coordinating care with your healthcare providers (with your consent)</li>
                <li>Crisis intervention and safety planning</li>
                <li>Generating personalized wellness insights</li>
              </ul>

              <h4>Payment</h4>
              <ul>
                <li>Processing subscription payments</li>
                <li>Billing and collection activities</li>
                <li>Insurance verification and claims processing (if applicable)</li>
              </ul>

              <h4>Healthcare Operations</h4>
              <ul>
                <li>Improving our AI algorithms and platform features</li>
                <li>Quality assessment and improvement activities</li>
                <li>Training and education of our staff</li>
                <li>Compliance monitoring and auditing</li>
              </ul>

              <h2>Special Situations</h2>

              <h3>Public Health Activities</h3>
              <ul>
                <li>Preventing or controlling disease, injury, or disability</li>
                <li>Reporting births and deaths</li>
                <li>Reporting child abuse or neglect</li>
                <li>Reporting reactions to medications or problems with products</li>
              </ul>

              <h3>Health Oversight Activities</h3>
              <ul>
                <li>Audits, investigations, inspections, and licensure</li>
                <li>Government monitoring of the healthcare system</li>
                <li>Compliance with civil rights laws</li>
              </ul>

              <h3>Lawsuits and Disputes</h3>
              <ul>
                <li>Response to court orders, subpoenas, or discovery requests</li>
                <li>Legal proceedings you are involved in</li>
                <li>Administrative proceedings</li>
              </ul>

              <h3>Law Enforcement</h3>
              <ul>
                <li>Court orders, court-ordered warrants, subpoenas</li>
                <li>Identification or location of a suspect, fugitive, material witness, or missing person</li>
                <li>Crimes occurring on our premises</li>
                <li>Medical emergency (not on our premises)</li>
              </ul>

              <h3>To Avert a Serious Threat to Health or Safety</h3>
              <ul>
                <li>When necessary to prevent or lessen a serious threat to your health and safety</li>
                <li>To protect the health and safety of the public or another person</li>
                <li>Crisis intervention and suicide prevention</li>
              </ul>

              <h2>Your Written Authorization Is Required For</h2>
              <ul>
                <li>Most uses and disclosures of psychotherapy notes</li>
                <li>Uses and disclosures for marketing purposes</li>
                <li>Disclosures that constitute a sale of your health information</li>
                <li>Sharing information with family members or friends</li>
                <li>Research studies (unless exempted by law)</li>
              </ul>

              <h2>Changes to This Notice</h2>
              <p>
                We reserve the right to change this notice. We reserve the right to make the revised or changed notice effective for medical information we already have about you as well as any information we receive in the future. The current notice will be posted on our website and available in our application.
              </p>

              <h2>Complaints</h2>
              <p>
                If you believe your privacy rights have been violated, you may file a complaint with us or with the Secretary of the Department of Health and Human Services. To file a complaint with us, contact:
              </p>
              <ul>
                <li><strong>Privacy Officer:</strong> privacy@mentalwellnessapps.com</li>
                <li><strong>Phone:</strong> Available through our contact form</li>
                <li><strong>Address:</strong> [Business Address]</li>
              </ul>

              <p>
                You will not be penalized for filing a complaint.
              </p>

              <h2>Additional Information</h2>

              <h3>Minimum Necessary Standard</h3>
              <p>
                When using or disclosing your health information, we are required to make reasonable efforts not to use, disclose, or request more than the minimum amount of information necessary to accomplish the purpose.
              </p>

              <h3>Breach Notification</h3>
              <p>
                We will notify you if your unsecured health information has been breached and there is more than a low probability that your information has been compromised.
              </p>

              <h3>Business Associates</h3>
              <p>
                We may share your information with business associates who provide services to us. These associates are required to protect your information and may only use it for the purposes we specify.
              </p>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6 mt-8">
                <h3 className="text-lg font-semibold text-green-800 mb-2">
                  ✅ We Are Committed to Protecting Your Privacy
                </h3>
                <p className="text-green-700">
                  This notice is effective as of September 26, 2024. If you have questions about this notice or need assistance exercising your rights, please contact our Privacy Officer.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}