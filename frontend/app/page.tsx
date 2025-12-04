'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/components/AuthProvider'
import { useRouter } from 'next/navigation'

export default function Home() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const [redirectParam, setRedirectParam] = useState<string | null>(null)

  useEffect(() => {
    // Get redirect parameter from URL on client side
    const params = new URLSearchParams(window.location.search)
    const redirect = params.get('redirect')
    setRedirectParam(redirect)
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      // If authenticated, redirect to the intended URL or dashboard
      const redirectUrl = redirectParam || '/dashboard'
      router.push(redirectUrl)
    } else {
      // If not authenticated, redirect to login with the redirect parameter
      const currentPath = window.location.pathname
      const currentSearch = window.location.search
      const fullPath = currentPath + currentSearch
      
      // Only pass redirect if we're not already going to login
      if (fullPath !== '/login' && fullPath !== '/login/') {
        router.push(`/login?redirect=${encodeURIComponent(fullPath)}`)
      } else {
        router.push('/login')
      }
    }
  }, [isAuthenticated, router, redirectParam])

  // Show nothing while redirecting
  return null
}
