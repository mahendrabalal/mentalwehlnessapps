import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useSubscription } from '@/hooks/useSubscription'
import { BrandLogo } from '@/components/BrandLogo'

type NavbarVariant = 'default' | 'marketing'

interface NavbarProps {
  variant?: NavbarVariant
}

type PublicNavItem = {
  label: string
  href: string
  variant?: 'link' | 'cta'
  isActive?: (pathname: string) => boolean
}

const MARKETING_PUBLIC_NAV: PublicNavItem[] = [
  { label: 'Features', href: '#features' },
  {
    label: 'Blog',
    href: '/blog',
    isActive: (pathname) => pathname.startsWith('/blog')
  },
  { label: 'About', href: '#about' },
  { label: 'Sign In', href: '/auth/login' },
  { label: 'Get Started Free', href: '/auth/signup', variant: 'cta' }
]

// Top 6 most popular support pages (always visible)
const TOP_SUPPORT_PAGES = [
  { label: 'Emotional Burnout Recovery', href: '/support/emotional-exhaustion-burnout', icon: '🔥' },
  { label: 'Combat Loneliness', href: '/support/combat-loneliness-isolation', icon: '💙' },
  { label: 'Anxiety Relief Techniques', href: '/support/managing-anxiety-naturally', icon: '😌' },
  { label: 'Mindfulness for Beginners', href: '/support/mindfulness-for-beginners', icon: '🧘' },
  { label: 'Overcome Mental Health Stigma', href: '/support/overcome-mental-health-stigma', icon: '💪' },
  { label: 'Affordable Therapy Options', href: '/support/affordable-mental-health-care', icon: '💰' },
]

// Additional support pages (collapsed by default)
const MORE_SUPPORT_PAGES = [
  { label: 'Emotional Regulation Skills', href: '/support/emotional-regulation-skills', icon: '🎯' },
  { label: 'Build Meditation Consistency', href: '/support/meditation-consistency', icon: '✅' },
  { label: 'Manage Meditation Anxiety', href: '/support/emotional-resistance-meditation', icon: '🧠' },
  { label: 'Realistic Recovery Expectations', href: '/support/realistic-mental-health-expectations', icon: '📊' },
  { label: 'Sleep & Mental Health', href: '/support/sleep-mental-health', icon: '😴' },
  { label: 'Trauma Recovery Guide', href: '/support/trauma-recovery', icon: '🛡️' },
  { label: 'Relationships & Mental Health', href: '/support/relationships-mental-health', icon: '💑' },
  { label: 'Gain Mental Wellness Insight', href: '/support/insight-mental-wellness', icon: '🔍' },
  { label: 'Balanced Mental Wellness', href: '/support/balanced-mental-wellness', icon: '⚖️' },
  { label: 'Teen Mental Wellness Day', href: '/support/world-teen-mental-wellness-day', icon: '🌟' },
]

// Categorized tool pages for better organization
const TOOL_CATEGORIES = {
  'Mental Health Challenges': [
    { label: 'Depression Screening', href: '/tools/depression-screening', icon: '🧠' },
    { label: 'Anxiety Relief Tool', href: '/tools/anxiety-relief', icon: '😌' },
    { label: 'Burnout Assessment', href: '/tools/burnout-assessment', icon: '🔥' },
    { label: 'Loneliness Assessment', href: '/tools/loneliness-assessment', icon: '💙' },
    { label: 'Stigma Assessment', href: '/tools/stigma-assessment', icon: '💪' },
  ],
  'Self-Care Skills': [
    { label: 'Mindfulness Exercises', href: '/tools/mindfulness', icon: '🧘' },
    { label: 'Emotional Regulation', href: '/tools/emotional-regulation', icon: '🎯' },
    { label: 'Stress Management Techniques', href: '/tools/stress-management-techniques', icon: '💪' },
    { label: 'Meditation Habit Tracker', href: '/tools/meditation-tracker', icon: '✅' },
  ],
  'Planning & Resources': [
    { label: 'Therapy Cost Calculator', href: '/tools/therapy-cost-calculator', icon: '💰' },
    { label: 'Recovery Timeline', href: '/tools/recovery-timeline', icon: '📊' },
    { label: 'Substance Use Resources', href: '/tools/substance-screening', icon: '🆘' },
  ],
}

const DEFAULT_PUBLIC_NAV: PublicNavItem[] = [
  {
    label: 'Home',
    href: '/',
    isActive: (pathname) => pathname === '/'
  },
  {
    label: 'Resource Library',
    href: '/blog',
    isActive: (pathname) => pathname.startsWith('/blog')
  },
  { label: 'Sign In', href: '/auth/login' },
  { label: 'Get Started Free', href: '/auth/signup', variant: 'cta' }
]

export function Navbar({ variant = 'default' }: NavbarProps) {
  const { user, signOut } = useAuth()
  const { isPremium } = useSubscription()
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isMarketing = variant === 'marketing'
  const publicNavItems = isMarketing ? MARKETING_PUBLIC_NAV : DEFAULT_PUBLIC_NAV

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (err) {
      console.error('Error signing out:', err)
    } finally {
      setMobileMenuOpen(false)
      router.push('/')
    }
  }

  const handleLandingNavigation = () => {
    setMobileMenuOpen(false)

    if (user) {
      // Set cookie to show landing page and navigate to clean URL
      document.cookie = 'show_landing_page=true; max-age=3600; path=/'
      router.push('/')
    } else {
      router.push('/')
    }
  }

  useEffect(() => {
    const handleRouteChange = () => setMobileMenuOpen(false)

    router.events.on('routeChangeComplete', handleRouteChange)
    router.events.on('hashChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
      router.events.off('hashChangeComplete', handleRouteChange)
    }
  }, [router])

  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navClasses = isMarketing
    ? `fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md border-b border-gray-200' : 'bg-transparent'
    }`
    : 'sticky top-0 z-40 bg-white border-b border-gray-200'

  return (
    <nav className={navClasses}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-2 sm:py-3">
          {/* Brand */}
          {user ? (
            <Link
              href="/dashboard"
              className="hover:opacity-80 transition-opacity"
              title="Go to Dashboard"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="h-8 sm:h-10 lg:h-12 w-auto flex items-center">
                <BrandLogo variant="default" className="h-full w-auto" />
              </div>
            </Link>
          ) : (
            <button
              onClick={handleLandingNavigation}
              className="hover:opacity-80 transition-opacity"
              title="Go to Home"
            >
              <div className="h-8 sm:h-10 lg:h-12 w-auto flex items-center">
                <BrandLogo variant="default" className="h-full w-auto" />
              </div>
            </button>
          )}

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {user ? (
              <AuthenticatedNav
                routerPathname={router.pathname}
                isPremium={isPremium}
                onSignOut={handleSignOut}
              />
            ) : (
              <PublicNav
                items={publicNavItems}
                routerPathname={router.pathname}
                onNavigate={() => setMobileMenuOpen(false)}
                user={user}
              />
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="p-2 text-gray-600 hover:text-gray-900 transition-colors rounded-lg hover:bg-gray-50 min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {user ? (
                <AuthenticatedMobileNav
                  isPremium={isPremium}
                  onSignOut={() => {
                    setMobileMenuOpen(false)
                    handleSignOut()
                  }}
                  closeMenu={() => setMobileMenuOpen(false)}
                />
              ) : (
                <PublicMobileNav
                  items={publicNavItems}
                  closeMenu={() => setMobileMenuOpen(false)}
                  user={user}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

interface AuthenticatedNavProps {
  routerPathname: string
  isPremium: boolean
  onSignOut: () => void
}

function AuthenticatedNav({
  routerPathname,
  isPremium,
  onSignOut,
}: AuthenticatedNavProps) {
  return (
    <>
      <NavLink
        href="/dashboard"
        isActive={routerPathname === '/dashboard'}
        label="Dashboard"
      />
      <NavLink
        href="/safety/plan"
        isActive={routerPathname === '/safety/plan'}
        label="Safety Plan"
      />
      <NavLink
        href="/blog"
        isActive={routerPathname.startsWith('/blog')}
        label="Resource Library"
      />
      <NavLink
        href="/profile"
        isActive={routerPathname === '/profile'}
        label="Profile"
      />
      <button
        onClick={onSignOut}
        className="text-gray-600 hover:text-gray-900 transition-colors"
      >
        Sign Out
      </button>
    </>
  )
}

interface NavLinkProps {
  href: string
  label: string
  isActive?: boolean
  onClick?: () => void
}

function NavLink({ href, label, isActive = false, onClick }: NavLinkProps) {
  const baseClasses = 'transition-colors'
  const activeClasses = isActive ? 'text-therapy-600 font-medium' : 'text-gray-600 hover:text-gray-900'

  if (href.startsWith('#')) {
    return (
      <a
        href={href}
        className={`${baseClasses} ${activeClasses}`}
        onClick={onClick}
      >
        {label}
      </a>
    )
  }

  return (
    <Link href={href} className={`${baseClasses} ${activeClasses}`} onClick={onClick}>
      {label}
    </Link>
  )
}

interface PublicNavProps {
  items: PublicNavItem[]
  routerPathname: string
  onNavigate: () => void
  user?: any // Add user prop
}

function PublicNav({
  items,
  routerPathname,
  onNavigate,
  user,
}: PublicNavProps) {
  const handleHomeNavigation = (href: string) => {
    if (href === '/' && user) {
      // Set cookie to show landing page for authenticated users
      document.cookie = 'show_landing_page=true; max-age=3600; path=/'
      onNavigate()
      window.location.href = '/'
    } else {
      onNavigate()
      window.location.href = href
    }
  }
  const [supportDropdownOpen, setSupportDropdownOpen] = useState(false)
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false)
  const supportDropdownRef = useState<HTMLDivElement | null>(null)[0]
  const toolsDropdownRef = useState<HTMLDivElement | null>(null)[0]

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (supportDropdownRef && !supportDropdownRef.contains(event.target as Node)) {
        setSupportDropdownOpen(false)
      }
      if (toolsDropdownRef && !toolsDropdownRef.contains(event.target as Node)) {
        setToolsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [supportDropdownRef, toolsDropdownRef])

  return (
    <>
      {/* Find Support Dropdown */}
      <div className="relative" ref={supportDropdownRef as any}>
        <button
          onClick={() => {
            setSupportDropdownOpen(!supportDropdownOpen)
            setToolsDropdownOpen(false)
          }}
          onMouseEnter={() => {
            setSupportDropdownOpen(true)
            setToolsDropdownOpen(false)
          }}
          className="text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-1"
        >
          Find Support
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {supportDropdownOpen && (
          <div
            onMouseLeave={() => setSupportDropdownOpen(false)}
            className="absolute left-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50 max-h-[32rem] overflow-y-auto"
          >
            {/* Popular Resources */}
            <div className="px-4 py-2">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                Popular Resources
              </p>
            </div>
            {TOP_SUPPORT_PAGES.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                onClick={() => {
                  setSupportDropdownOpen(false)
                  onNavigate()
                }}
                className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors"
              >
                <span className="text-xl">{page.icon}</span>
                <span className="text-sm text-gray-700 hover:text-gray-900">{page.label}</span>
              </Link>
            ))}

            {/* More Resources - Collapsible */}
            <details className="group px-4 py-2 mt-2">
              <summary className="cursor-pointer text-sm text-therapy-600 hover:text-therapy-700 font-medium list-none flex items-center gap-2">
                <svg
                  className="w-4 h-4 transition-transform group-open:rotate-90"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                {MORE_SUPPORT_PAGES.length} more resources
              </summary>
              <div className="mt-2 space-y-1">
                {MORE_SUPPORT_PAGES.map((page) => (
                  <Link
                    key={page.href}
                    href={page.href}
                    onClick={() => {
                      setSupportDropdownOpen(false)
                      onNavigate()
                    }}
                    className="flex items-center gap-3 px-2 py-2 hover:bg-gray-50 rounded transition-colors"
                  >
                    <span className="text-lg">{page.icon}</span>
                    <span className="text-sm text-gray-700 hover:text-gray-900">{page.label}</span>
                  </Link>
                ))}
              </div>
            </details>

            {/* View All Link */}
            <div className="border-t border-gray-200 mt-2 pt-2">
              <Link
                href="/support"
                onClick={() => {
                  setSupportDropdownOpen(false)
                  onNavigate()
                }}
                className="flex items-center justify-between px-4 py-2.5 hover:bg-gray-50 transition-colors group"
              >
                <span className="text-sm font-semibold text-gray-900 group-hover:text-therapy-600">
                  View All Resources
                </span>
                <span className="text-gray-400 group-hover:text-therapy-600">→</span>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Tools Dropdown */}
      <div className="relative" ref={toolsDropdownRef as any}>
        <button
          onClick={() => {
            setToolsDropdownOpen(!toolsDropdownOpen)
            setSupportDropdownOpen(false)
          }}
          onMouseEnter={() => {
            setToolsDropdownOpen(true)
            setSupportDropdownOpen(false)
          }}
          className="text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-1"
        >
          Tools
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {toolsDropdownOpen && (
          <div
            onMouseLeave={() => setToolsDropdownOpen(false)}
            className="absolute left-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50 max-h-[32rem] overflow-y-auto"
          >
            {Object.entries(TOOL_CATEGORIES).map(([category, tools], index) => (
              <div key={category} className={index > 0 ? 'mt-4' : ''}>
                {/* Category Header */}
                <div className="px-4 py-2">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    {category}
                  </p>
                </div>

                {/* Category Tools */}
                {tools.map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    onClick={() => {
                      setToolsDropdownOpen(false)
                      onNavigate()
                    }}
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-xl">{tool.icon}</span>
                    <span className="text-sm text-gray-700 hover:text-gray-900">{tool.label}</span>
                  </Link>
                ))}
              </div>
            ))}

            {/* View All Link */}
            <div className="border-t border-gray-200 mt-4 pt-2">
              <Link
                href="/tools/free-mental-health-tools"
                onClick={() => {
                  setToolsDropdownOpen(false)
                  onNavigate()
                }}
                className="flex items-center justify-between px-4 py-2.5 hover:bg-gray-50 transition-colors group"
              >
                <span className="text-sm font-semibold text-gray-900 group-hover:text-therapy-600">
                  View All 12 Tools
                </span>
                <span className="text-gray-400 group-hover:text-therapy-600">→</span>
              </Link>
            </div>
          </div>
        )}
      </div>

      {items.map((item) =>
        item.variant === 'cta' ? (
          <Link
            key={item.label}
            href={item.href}
            onClick={onNavigate}
            className="bg-therapy-600 hover:bg-therapy-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            {item.label}
          </Link>
        ) : (
          <NavLink
            key={item.label}
            href={item.href}
            label={item.label}
            isActive={item.isActive?.(routerPathname)}
            onClick={() => item.href === '/' && user ? handleHomeNavigation(item.href) : onNavigate()}
          />
        )
      )}
    </>
  )
}

interface AuthenticatedMobileNavProps {
  isPremium: boolean
  onSignOut: () => void
  closeMenu: () => void
}

function AuthenticatedMobileNav({
  isPremium,
  onSignOut,
  closeMenu,
}: AuthenticatedMobileNavProps) {
  return (
    <>
      <MobileNavLink href="/dashboard" label="Dashboard" onClick={closeMenu} />
      <MobileNavLink href="/safety/plan" label="Safety Plan" onClick={closeMenu} />
      <MobileNavLink href="/blog" label="Resource Library" onClick={closeMenu} />
      <MobileNavLink href="/profile" label="Profile" onClick={closeMenu} />
      <button
        onClick={onSignOut}
        className="block w-full text-left px-3 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors"
      >
        Sign Out
      </button>
    </>
  )
}

interface PublicMobileNavProps {
  items: PublicNavItem[]
  closeMenu: () => void
  user?: any // Add user prop
}

function PublicMobileNav({ items, closeMenu, user }: PublicMobileNavProps) {
  const [supportExpanded, setSupportExpanded] = useState(false)
  const [toolsExpanded, setToolsExpanded] = useState(false)

  const handleHomeNavigation = (href: string) => {
    if (href === '/' && user) {
      // Set cookie to show landing page for authenticated users
      document.cookie = 'show_landing_page=true; max-age=3600; path=/'
      closeMenu()
      window.location.href = '/'
    } else {
      closeMenu()
      window.location.href = href
    }
  }

  return (
    <>
      {/* Find Support Accordion */}
      <div className="border-b border-gray-200 pb-2 mb-2">
        <button
          onClick={() => setSupportExpanded(!supportExpanded)}
          className="flex items-center justify-between w-full px-3 py-3 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
        >
          <span>Find Support</span>
          <svg
            className={`w-5 h-5 transition-transform ${supportExpanded ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {supportExpanded && (
          <div className="mt-1 space-y-1">
            {/* Popular Resources */}
            <div className="px-6 py-2">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Popular Resources
              </p>
            </div>
            {TOP_SUPPORT_PAGES.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                onClick={closeMenu}
                className="flex items-center gap-2 px-6 py-2.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <span>{page.icon}</span>
                <span>{page.label}</span>
              </Link>
            ))}

            {/* More Resources */}
            <details className="px-6 py-2">
              <summary className="cursor-pointer text-sm text-therapy-600 font-medium list-none">
                {MORE_SUPPORT_PAGES.length} more resources →
              </summary>
              <div className="mt-2 space-y-1">
                {MORE_SUPPORT_PAGES.map((page) => (
                  <Link
                    key={page.href}
                    href={page.href}
                    onClick={closeMenu}
                    className="flex items-center gap-2 px-2 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <span>{page.icon}</span>
                    <span>{page.label}</span>
                  </Link>
                ))}
              </div>
            </details>

            {/* View All Link */}
            <Link
              href="/support"
              onClick={closeMenu}
              className="flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-therapy-600 hover:bg-gray-50 rounded-lg transition-colors border-t border-gray-200 mt-2 pt-3"
            >
              <span>→</span>
              <span>View All Resources</span>
            </Link>
          </div>
        )}
      </div>

      {/* Tools Accordion */}
      <div className="border-b border-gray-200 pb-2 mb-2">
        <button
          onClick={() => setToolsExpanded(!toolsExpanded)}
          className="flex items-center justify-between w-full px-3 py-3 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
        >
          <span>Tools</span>
          <svg
            className={`w-5 h-5 transition-transform ${toolsExpanded ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {toolsExpanded && (
          <div className="mt-1 space-y-3">
            {Object.entries(TOOL_CATEGORIES).map(([category, tools]) => (
              <div key={category}>
                {/* Category Header */}
                <div className="px-6 py-2">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    {category}
                  </p>
                </div>

                {/* Category Tools */}
                {tools.map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    onClick={closeMenu}
                    className="flex items-center gap-2 px-6 py-2.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <span>{tool.icon}</span>
                    <span>{tool.label}</span>
                  </Link>
                ))}
              </div>
            ))}

            {/* View All Link */}
            <Link
              href="/tools/free-mental-health-tools"
              onClick={closeMenu}
              className="flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-therapy-600 hover:bg-gray-50 rounded-lg transition-colors border-t border-gray-200 mt-2 pt-3"
            >
              <span>→</span>
              <span>View All 12 Tools</span>
            </Link>
          </div>
        )}
      </div>

      {items.map((item) =>
        item.href.startsWith('#') ? (
          <AnchorMobileNavLink
            key={item.label}
            href={item.href}
            label={item.label}
            onClick={closeMenu}
          />
        ) : (
          <MobileNavLink
            key={item.label}
            href={item.href}
            label={item.label}
            highlight={item.variant === 'cta'}
            onClick={() => item.href === '/' && user ? handleHomeNavigation(item.href) : closeMenu()}
          />
        )
      )}
    </>
  )
}

interface MobileNavLinkProps {
  href: string
  label: string
  onClick: () => void
  highlight?: boolean
}

function MobileNavLink({
  href,
  label,
  onClick,
  highlight = false,
}: MobileNavLinkProps) {
  const baseClasses =
    'block px-3 py-3 rounded-lg text-base font-medium transition-colors'
  const className = highlight
    ? `${baseClasses} bg-therapy-600 text-white hover:bg-therapy-700`
    : `${baseClasses} text-gray-700 hover:text-gray-900 hover:bg-gray-50`

  return (
    <Link href={href} onClick={onClick} className={className}>
      {label}
    </Link>
  )
}

interface AnchorMobileNavLinkProps {
  href: string
  label: string
  onClick: () => void
}

function AnchorMobileNavLink({
  href,
  label,
  onClick,
}: AnchorMobileNavLinkProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="block px-3 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors"
    >
      {label}
    </a>
  )
}
