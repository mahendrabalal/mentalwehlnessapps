import type { SVGProps } from 'react'

export function WellnessHeroIllustration(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 320 200"
      role="img"
      aria-labelledby="wellnessHeroTitle"
      {...props}
    >
      <title id="wellnessHeroTitle">Calm figure with balanced mood indicators</title>
      <defs>
        <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7C3AED" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
        <linearGradient id="heroGradientWarm" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F97316" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
      </defs>

      <rect width="320" height="200" rx="28" fill="#F1F5F9" />

      <circle cx="60" cy="56" r="32" fill="url(#heroGradient)" opacity="0.12" />
      <circle cx="260" cy="40" r="26" fill="url(#heroGradientWarm)" opacity="0.18" />
      <circle cx="268" cy="150" r="36" fill="url(#heroGradient)" opacity="0.16" />

      <path
        d="M110 134c0-28 18-44 50-44s50 16 50 44c0 24-18 34-50 34s-50-10-50-34z"
        fill="#E5E7EB"
      />
      <path
        d="M132 112c0-18 12-28 28-28s28 10 28 28-12 32-28 32-28-14-28-32z"
        fill="#FDE68A"
      />
      <circle cx="160" cy="92" r="30" fill="#FACC15" />
      <path
        d="M148 86a4 4 0 1 1 4-4 4 4 0 0 1-4 4zm24 0a4 4 0 1 1 4-4 4 4 0 0 1-4 4z"
        fill="#1F2937"
      />
      <path
        d="M150 100c4 4 8 6 10 6s6-2 10-6"
        fill="none"
        stroke="#1F2937"
        strokeWidth="3"
        strokeLinecap="round"
      />

      <path
        d="M132 142c8-8 18-12 28-12s20 4 28 12"
        fill="none"
        stroke="url(#heroGradient)"
        strokeWidth="6"
        strokeLinecap="round"
      />

      <rect
        x="36"
        y="144"
        width="80"
        height="32"
        rx="12"
        fill="white"
        stroke="#E2E8F0"
      />
      <circle cx="52" cy="160" r="10" fill="#22C55E" opacity="0.9" />
      <path
        d="M49 160l2 2 5-5"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="64" y="154" width="40" height="4" rx="2" fill="#94A3B8" />
      <rect x="64" y="162" width="32" height="4" rx="2" fill="#CBD5F5" />

      <rect
        x="210"
        y="70"
        width="74"
        height="28"
        rx="10"
        fill="white"
        stroke="#DBEAFE"
      />
      <circle cx="224" cy="84" r="8" fill="#F97316" opacity="0.8" />
      <rect x="236" y="78" width="34" height="4" rx="2" fill="#60A5FA" />
      <rect x="236" y="86" width="26" height="4" rx="2" fill="#BFDBFE" />
    </svg>
  )
}
