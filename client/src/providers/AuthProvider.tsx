import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import type { User } from 'oidc-client-ts'
import { userManager } from '~/oidc/oidcClient'

type AuthContextType = {
  user: User | null
  isAuthenticated: boolean
  login: () => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    userManager.getUser().then(setUser)
    userManager.events.addUserLoaded(setUser)
    userManager.events.addUserUnloaded(() => setUser(null))

    return () => {
      userManager.events.removeUserLoaded(setUser)
      userManager.events.removeUserUnloaded(() => setUser(null))
    }
  }, [])

  const login = () => userManager.signinRedirect()
  const logout = () => userManager.signoutRedirect()

  return (
    <AuthContext.Provider
      value={{
        user,
        // if user is not null, then the user is authenticated
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
