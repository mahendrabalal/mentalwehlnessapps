import { ReactNode } from 'react'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'

interface AuthGuardProps {
  children: ReactNode
  redirectMessage?: string
  redirectSubtitle?: string
}

export function AuthGuard({
  children,
  redirectMessage = "Please log in",
  redirectSubtitle = "You need to be logged in to access this page."
}: AuthGuardProps) {
  const { user, session, loading, error } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-therapy-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
          <h2 className="text-2xl font-bold text-red-900 mb-4">Authentication Error</h2>
          <p className="text-red-600 mb-6">There was an error checking your login status.</p>
          <Link href="/auth/login" className="btn-primary inline-block">
            Try Logging In Again
          </Link>
        </div>
      </div>
    )
  }

  if (!session || !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{redirectMessage}</h2>
          <p className="text-gray-600 mb-6">{redirectSubtitle}</p>
          <Link href="/auth/login" className="btn-primary inline-block">
            Log In
          </Link>
        </div>
      </div>
    )
  }

  return <>{children}</>
}