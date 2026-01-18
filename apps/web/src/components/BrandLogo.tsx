import { useId } from 'react'

type BrandLogoVariant = 'default' | 'onDark'

interface BrandLogoProps {
  className?: string
  showWordmark?: boolean
  variant?: BrandLogoVariant
}

const VARIANT_PALETTES: Record<
  BrandLogoVariant,
  {
    iconStops: [string, string, string]
    highlightStops: [string, string]
    wordmarkPrimary: string
    wordmarkAccent: string
  }
> = {
  default: {
    iconStops: ['#6366F1', '#8B5CF6', '#EC4899'],
    highlightStops: ['#A855F7', '#F472B6'],
    wordmarkPrimary: '#111827',
    wordmarkAccent: '#7C3AED'
  },
  onDark: {
    iconStops: ['#A5B4FC', '#C084FC', '#F9A8D4'],
    highlightStops: ['#DDD6FE', '#FBCFE8'],
    wordmarkPrimary: '#F9FAFB',
    wordmarkAccent: '#FDE68A'
  }
}

export function BrandLogo({
  className,
  showWordmark = true,
  variant = 'default'
}: BrandLogoProps) {
  const reactId = useId().replace(/:/g, '-')
  const gradientId = `${reactId}-gradient`
  const highlightId = `${reactId}-highlight`
  const glowId = `${reactId}-glow`
  const titleId = `${reactId}-title`

  const palette = VARIANT_PALETTES[variant]
  const viewBoxWidth = showWordmark ? 380 : 80
  const appliedClassName = ['w-full h-auto', className].filter(Boolean).join(' ')

  return (
    <svg
      viewBox={`0 0 ${viewBoxWidth} 64`}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-labelledby={titleId}
      className={appliedClassName}
    >
      <title id={titleId}>Mental Wellness Apps logo</title>
      <defs>
        <linearGradient
          id={gradientId}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor={palette.iconStops[0]} />
          <stop offset="55%" stopColor={palette.iconStops[1]} />
          <stop offset="100%" stopColor={palette.iconStops[2]} />
        </linearGradient>
        <linearGradient
          id={highlightId}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor={palette.highlightStops[0]} />
          <stop offset="100%" stopColor={palette.highlightStops[1]} />
        </linearGradient>
        <filter
          id={glowId}
          x="-30%"
          y="-30%"
          width="160%"
          height="160%"
          colorInterpolationFilters="sRGB"
        >
          <feOffset dy="0" />
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="0 0 0 0 0.58 0 0 0 0 0.34 0 0 0 0 0.95 0 0 0 0.35 0"
          />
          <feBlend in="SourceGraphic" mode="normal" />
        </filter>
      </defs>

      {/* Icon */}
      <g transform="translate(16 12)">
        <circle
          cx="28"
          cy="20"
          r="20"
          fill={`url(#${gradientId})`}
          filter={`url(#${glowId})`}
        />
        <path
          d="M12 26.5L18 14c1-2.1 3.9-2.1 4.9 0l4.3 8.6 3.1-6.2c0.9-1.8 3.4-1.9 4.4-0.2l5.7 9.1"
          stroke="#ffffff"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M19.1 13.8c3.4-3.3 8.9-3.6 12.6-0.5"
          stroke={`url(#${highlightId})`}
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
          opacity="0.85"
        />
        <circle
          cx="40.5"
          cy="10.5"
          r="2.6"
          fill={`url(#${highlightId})`}
          opacity="0.9"
        />
      </g>

      {showWordmark && (
        <g transform="translate(88 38)">
          <text
            fontFamily="'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif"
            fontSize="26"
            fontWeight="800"
            letterSpacing="0.01em"
          >
            <tspan fill={palette.wordmarkPrimary}>Mental</tspan>
            <tspan fill={`url(#${highlightId})`}>WellnessApps</tspan>
          </text>
        </g>
      )}
    </svg>
  )
}

export default BrandLogo
