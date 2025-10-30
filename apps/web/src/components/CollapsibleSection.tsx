import { useState, useEffect } from 'react'

export interface CollapsibleSectionProps {
  id: string
  title: string
  icon?: string
  summary?: string
  children: React.ReactNode
  defaultExpanded?: boolean
  onToggle?: (expanded: boolean) => void
  className?: string
  headerClassName?: string
  contentClassName?: string
}

export function CollapsibleSection({
  id,
  title,
  icon,
  summary,
  children,
  defaultExpanded = false,
  onToggle,
  className = '',
  headerClassName = '',
  contentClassName = '',
}: CollapsibleSectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleToggle = () => {
    const newState = !isExpanded
    setIsExpanded(newState)
    onToggle?.(newState)

    // Analytics tracking
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', 'section_toggle', {
        section_id: id,
        expanded: newState,
      })
    }
  }

  // Respect prefers-reduced-motion for accessibility (WCAG 2.2)
  const prefersReducedMotion = isMounted &&
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 mb-6 ${className}`}>
      {/* Header Button - WCAG 2.2: Proper keyboard navigation and ARIA */}
      <button
        onClick={handleToggle}
        className={`w-full flex items-center justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-therapy-500 rounded-lg p-2 -m-2 hover:bg-gray-50 transition-colors group ${headerClassName}`}
        aria-expanded={isExpanded}
        aria-controls={`${id}-content`}
        aria-label={`${isExpanded ? 'Hide' : 'Show'} ${title}`}
      >
        <div className="flex items-center gap-3 flex-1 text-left">
          {icon && <span className="text-2xl flex-shrink-0">{icon}</span>}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-therapy-600 transition-colors">
              {title}
            </h3>
            {summary && !isExpanded && (
              <p className="text-sm text-gray-600 mt-1">{summary}</p>
            )}
          </div>
        </div>

        {/* Chevron Icon */}
        <div className="flex-shrink-0">
          <svg
            className={`w-5 h-5 text-gray-400 transition-transform ${
              prefersReducedMotion ? '' : 'duration-200'
            } ${isExpanded ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {/* Content - Progressive Disclosure */}
      {isMounted && (
        <div
          id={`${id}-content`}
          hidden={!isExpanded}
          className={`overflow-hidden ${prefersReducedMotion ? '' : 'transition-all duration-300'}`}
          style={{
            maxHeight: isExpanded ? '1000px' : '0px',
            opacity: isExpanded ? 1 : 0,
          }}
          role="region"
          aria-label={`${title} details`}
        >
          <div className={`pt-4 border-t border-gray-200 ${contentClassName}`}>
            {children}
          </div>
        </div>
      )}
    </div>
  )
}

/**
 * Mini version of collapsible section - compact header
 */
export function CollapsibleSectionMini({
  id,
  title,
  icon,
  children,
  defaultExpanded = false,
  onToggle,
}: Omit<CollapsibleSectionProps, 'summary' | 'className' | 'headerClassName' | 'contentClassName'>) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleToggle = () => {
    const newState = !isExpanded
    setIsExpanded(newState)
    onToggle?.(newState)
  }

  const prefersReducedMotion = isMounted &&
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  return (
    <div className="mb-4">
      <button
        onClick={handleToggle}
        className="w-full flex items-center justify-between gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-therapy-500 rounded p-2 -m-2 hover:bg-gray-50 transition-colors"
        aria-expanded={isExpanded}
        aria-controls={`${id}-content-mini`}
        aria-label={`${isExpanded ? 'Hide' : 'Show'} ${title}`}
      >
        <div className="flex items-center gap-2 flex-1 text-left">
          {icon && <span className="text-lg flex-shrink-0">{icon}</span>}
          <span className="font-medium text-gray-900 text-sm">{title}</span>
        </div>
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform ${
            prefersReducedMotion ? '' : 'duration-200'
          } ${isExpanded ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isMounted && (
        <div
          id={`${id}-content-mini`}
          hidden={!isExpanded}
          className={`overflow-hidden ${prefersReducedMotion ? '' : 'transition-all duration-300'}`}
          style={{
            maxHeight: isExpanded ? '500px' : '0px',
            opacity: isExpanded ? 1 : 0,
          }}
          role="region"
          aria-label={`${title} details`}
        >
          <div className="pt-3 pl-6">{children}</div>
        </div>
      )}
    </div>
  )
}
