import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react'
import { useMsal } from '@azure/msal-react'
import { BrowserAuthError } from '@azure/msal-browser'
import { acquireRequest } from '@/context/Auth/config'
import { MOCK_AUTH, MOCK_TOKEN } from '@/context/Auth/constants'

interface AuthContextType {
  isAuthenticated: boolean
  token: string | undefined
  isLoading: boolean
  refreshToken: (forceRefresh?: boolean) => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthCtxProvider({ children }: { children: ReactNode }) {
  const { instance, accounts, inProgress } = useMsal()
  const [token, setToken] = useState<string | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(true)

  const getToken = useCallback(async () => {
    if (MOCK_AUTH) {
      setToken(MOCK_TOKEN)
      setIsLoading(false)
      return
    }

    if (inProgress !== 'none') {
      return
    }

    const activeAccount = instance.getActiveAccount()
    const isEdge = /Edg/.test(navigator.userAgent)

    // 1. No accounts exist
    if (!activeAccount && accounts.length === 0) {
      setToken(undefined)
      setIsLoading(false)
      return
    }

    // 2. Promote first account if needed
    if (!activeAccount && accounts.length > 0) {
      instance.setActiveAccount(accounts[0])
      const newActiveAccount = instance.getActiveAccount()

      if (newActiveAccount) {
        try {
          const response = await instance.acquireTokenSilent({
            ...acquireRequest(newActiveAccount),
            account: newActiveAccount
          })
          setToken(response.idToken)
          setIsLoading(false)
        } catch {
          // Silent fail on initial account — iOS fallback to redirect
          instance.loginRedirect(acquireRequest(newActiveAccount))
        }
      }
      return
    }

    // 3. Use existing active account — MUST acquire token even for cached accounts
    if (activeAccount) {
      try {
        const response = await instance.acquireTokenSilent({
          ...acquireRequest(activeAccount),
          account: activeAccount
        })
        setToken(response.idToken)
        setIsLoading(false)
      } catch (error) {
        if (isEdge && error instanceof BrowserAuthError &&
          (error.errorCode === 'popup_window_error' || error.errorCode === 'empty_window_error')) {
          // Edge popup blocker: already handled, just mark not loading
          setToken(undefined)
          setIsLoading(false)
        } else {
          // Fallback to interactive redirect (iOS, or silent failed)
          instance.loginRedirect(acquireRequest(activeAccount))
        }
      }
    } else {
      setToken(undefined)
      setIsLoading(false)
    }
  }, [instance, accounts.length, inProgress])

  const refreshToken = useCallback(async (forceRefresh?: boolean) => {
    if (MOCK_AUTH) return
    const activeAccount = instance.getActiveAccount()
    if (!activeAccount) return

    try {
      const result = await instance.acquireTokenSilent({
        ...acquireRequest(activeAccount),
        account: activeAccount,
        forceRefresh: forceRefresh ?? true
      })
      setToken(result.idToken)
    } catch {
      setToken(undefined)
    }
  }, [instance])

  useEffect(() => {
    getToken()
  }, [getToken])

  const value: AuthContextType = {
    isAuthenticated: !!token,
    token,
    isLoading,
    refreshToken
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthCtxProvider')
  }
  return context
}

export { MOCK_AUTH } from '@/context/Auth/constants'
