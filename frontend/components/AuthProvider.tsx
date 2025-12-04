'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'

interface User {
  id: number
  email: string
  name: string
}

interface AuthContextType {
  user: User | null
  token: string | null
  login: (token: string, userData: User) => void
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check for token in cookies on initial load
    const storedToken = Cookies.get('auth_token')
      if (storedToken) {
        try {
          const decoded: any = jwtDecode(storedToken)
          const userData: User = {
            id: decoded.sub || decoded.id,
            email: decoded.email,
            name: decoded.name || 'User',
          }
          setToken(storedToken)
          setUser(userData)
          setIsAuthenticated(true)
        } catch (error) {
          console.error('Invalid token:', error)
          logout()
        }
      }
  }, [])

  const login = (newToken: string, userData: User) => {
    Cookies.set('auth_token', newToken, { expires: 1 }) // Expires in 1 day
    setToken(newToken)
    setUser(userData)
    setIsAuthenticated(true)
  }

  const logout = () => {
    Cookies.remove('auth_token')
    setToken(null)
    setUser(null)
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
