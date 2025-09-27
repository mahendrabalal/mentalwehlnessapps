import React, { useState } from 'react'

interface LegalDisclaimerProps {
  variant?: 'footer' | 'modal' | 'inline' | 'assessment' | 'ai-chat'
  className?: string
}

export const LegalDisclaimer: React.FC<LegalDisclaimerProps> = ({
  variant = 'footer',
  className = ''
}) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const getDisclaimerContent = () => {
    switch (variant) {
      case 'assessment':
        return {
          title: "Assessment Disclaimer",
          content: `PHQ-9 and GAD-7 assessments are screening tools only and do not constitute a medical diagnosis. Results require professional interpretation by qualified mental health providers. This app is not a substitute for professional medical advice, diagnosis, or treatment.`
        }

      case 'ai-chat':
        return {
          title: "AI Companion Disclaimer",
          content: `This AI wellness companion provides general support and is not a replacement for licensed therapists or medical professionals. AI responses are for informational and wellness purposes only and should not be considered professional medical advice. If you're experiencing a mental health emergency, please contact emergency services (911) or the 988 Crisis Lifeline immediately.`
        }

      case 'modal':
        return {
          title: "Important Medical Disclaimer",
          content: `This Mental Wellness App is designed for general wellness support and educational purposes only. It is not intended to replace professional medical care or serve as a diagnostic tool.

          **Key Points:**
          • This app is not a substitute for professional medical advice, diagnosis, or treatment
          • Always seek advice from qualified mental health professionals for any questions about mental health conditions
          • Never disregard professional medical advice or delay seeking it because of information from this app
          • AI features provide general wellness support, not professional therapy
          • Assessment tools are for screening purposes only and require professional interpretation
          • In case of mental health emergency, contact 911 or the 988 Crisis Lifeline immediately

          By using this app, you acknowledge that you understand these limitations and will seek appropriate professional care when needed.`
        }

      case 'inline':
        return {
          title: "",
          content: `This app provides general wellness support and is not a substitute for professional medical care. Assessment results require professional interpretation.`
        }

      default: // footer
        return {
          title: "",
          content: `This app is not a substitute for professional medical advice. Always consult qualified mental health professionals for proper diagnosis and treatment. In emergencies, contact 911 or 988 Crisis Lifeline.`
        }
    }
  }

  const { title, content } = getDisclaimerContent()

  if (variant === 'footer') {
    return (
      <div className={`bg-gray-100 border-t border-gray-200 py-4 px-4 ${className}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">
              <strong>Medical Disclaimer:</strong> {content}
            </p>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs text-therapy-600 hover:text-therapy-700 underline"
            >
              {isExpanded ? 'Show Less' : 'Read Full Disclaimer'}
            </button>

            {isExpanded && (
              <div className="mt-3 text-xs text-gray-500 bg-white p-4 rounded-md border max-w-4xl mx-auto">
                <h4 className="font-semibold mb-2">Complete Medical Disclaimer</h4>
                <div className="text-left space-y-2">
                  <p>• This Mental Wellness App provides general wellness support and educational information only</p>
                  <p>• It is not intended as a substitute for professional medical advice, diagnosis, or treatment</p>
                  <p>• Always seek the advice of qualified mental health professionals with questions about mental health conditions</p>
                  <p>• Never disregard professional medical advice or delay seeking it because of information received from this app</p>
                  <p>• AI features provide wellness support only and are not professional therapeutic interventions</p>
                  <p>• Assessment tools (PHQ-9, GAD-7) are screening instruments that require professional clinical interpretation</p>
                  <p>• Crisis support features supplement but do not replace professional emergency services</p>
                  <p>• For mental health emergencies, immediately contact emergency services (911) or the 988 Suicide & Crisis Lifeline</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  if (variant === 'modal') {
    return (
      <div className={`bg-white rounded-lg p-6 max-w-2xl ${className}`}>
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-medium text-gray-900 mb-3">{title}</h3>
            <div className="text-sm text-gray-600 space-y-2 whitespace-pre-line">
              {content}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // inline, assessment, ai-chat variants
  return (
    <div className={`bg-yellow-50 border border-yellow-200 rounded-md p-3 ${className}`}>
      <div className="flex">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          {title && <h4 className="text-sm font-medium text-yellow-800 mb-1">{title}</h4>}
          <p className="text-sm text-yellow-700">{content}</p>
        </div>
      </div>
    </div>
  )
}

export default LegalDisclaimer