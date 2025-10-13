import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useAuth } from '@/hooks/useAuth'
import { useSubscription } from '@/hooks/useSubscription'

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
  { label: 'Pricing', href: '#pricing' },
  {
    label: 'Blog',
    href: '/blog',
    isActive: (pathname) => pathname.startsWith('/blog')
  },
  { label: 'About', href: '#about' },
  { label: 'Sign In', href: '/auth/login' },
  { label: 'Start Free Trial', href: '/auth/signup', variant: 'cta' }
]

const DEFAULT_PUBLIC_NAV: PublicNavItem[] = [
  {
    label: 'Home',
    href: '/?landing=true',
    isActive: (pathname) => pathname === '/'
  },
  {
    label: 'Resource Library',
    href: '/blog',
    isActive: (pathname) => pathname.startsWith('/blog')
  },
  { label: 'Sign In', href: '/auth/login' },
  { label: 'Start Free Trial', href: '/auth/signup', variant: 'cta' }
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

  useEffect(() => {
    const handleRouteChange = () => setMobileMenuOpen(false)

    router.events.on('routeChangeComplete', handleRouteChange)
    router.events.on('hashChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
      router.events.off('hashChangeComplete', handleRouteChange)
    }
  }, [router])

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-2 sm:py-3">
          {/* Brand */}
          <Link
            href={user ? '/dashboard' : '/?landing=true'}
            className="hover:opacity-80 transition-opacity"
            title={user ? 'Go to Dashboard' : 'Go to Home'}
            onClick={() => setMobileMenuOpen(false)}
          >
            <img
              src="https://mentalwellnessapps.com/logo.png"
              alt="MentalWellnessApps"
              className="h-8 sm:h-10 lg:h-12 w-auto object-contain"
              onError={(e) => {
                console.error('Logo failed to load:', e);
                // Fallback to a text logo if image fails
                (e.target as HTMLImageElement).style.display = 'none';
                const parent = (e.target as HTMLImageElement).parentElement;
                if (parent) {
                  parent.innerHTML = '<span class="text-xl font-bold">MentalWellnessApps</span>';
                }
              }}
              onLoad={() => {
                console.log('Logo loaded successfully');
              }}
            />
          </Link>

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
      {!isPremium && (
        <Link
          href="/premium/features"
          className="bg-therapy-600 hover:bg-therapy-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
        >
          Upgrade to Premium
        </Link>
      )}
      {isPremium && (
        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
          Premium
        </span>
      )}
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
}

function PublicNav({
  items,
  routerPathname,
  onNavigate,
}: PublicNavProps) {
  return (
    <>
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
            onClick={onNavigate}
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
      {!isPremium && (
        <MobileNavLink
          href="/premium/features"
          label="Upgrade to Premium"
          highlight
          onClick={closeMenu}
        />
      )}
      {isPremium && (
        <span className="block px-3 py-3 rounded-lg text-sm font-medium text-green-800 bg-green-100">
          Premium Member
        </span>
      )}
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
}

function PublicMobileNav({ items, closeMenu }: PublicMobileNavProps) {
  return (
    <>
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
            onClick={closeMenu}
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
