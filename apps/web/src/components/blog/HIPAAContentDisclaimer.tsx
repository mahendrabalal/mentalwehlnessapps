interface HIPAAContentDisclaimerProps {
  message?: string | null
  crisisHotline?: string | null
}

export function HIPAAContentDisclaimer({
  message,
  crisisHotline,
}: HIPAAContentDisclaimerProps) {
  const fallbackMessage =
    'This educational content is not a substitute for professional medical advice, diagnosis, or treatment. Call 911 or your local emergency number if you are in crisis.'
  return (
    <section className="mt-10 rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
      <p className="font-semibold uppercase tracking-wide text-amber-800">
        Safety Notice
      </p>
      <p className="mt-2 leading-relaxed">{message?.trim() || fallbackMessage}</p>
      {crisisHotline ? (
        <p className="mt-2 font-medium">
          Crisis support:{' '}
          <a className="underline" href={`tel:${crisisHotline}`}>
            {crisisHotline}
          </a>
        </p>
      ) : null}
    </section>
  )
}
