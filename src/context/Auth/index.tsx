import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'
import { useMsal } from '@azure/msal-react'
import { MOCK_AUTH, MOCK_TOKEN } from '@/context/Auth/constants'
import { acquireRequest, loginRequest } from '@/context/Auth/config'
import { getAccessTokenRoles } from './utils'

interface AuthContextType {
  isAuthenticated: boolean
  token: string | undefined
  isLoading: boolean
  canUpdate: boolean
  refreshToken: (forceRefresh?: boolean) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthCtxProvider = ({ children }: { children: ReactNode }) => {
  const { instance, accounts, inProgress } = useMsal()
  const [token, setToken] = useState<string | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(true)
  const [canUpdate, setCanUpdate] = useState(false)

  const getToken = useCallback(async () => {
    setIsLoading(true)

    if(MOCK_AUTH) {
      setToken(MOCK_TOKEN)
      setCanUpdate(true)
      setIsLoading(false)
      return
    }

    if(inProgress !== 'none') {
      return
    }

    const activeAccount = instance.getActiveAccount()

    if(!activeAccount && accounts.length === 0) {
      setToken(undefined)
      setIsLoading(false)
      return
    }

    if(!activeAccount && accounts.length > 0) {
      instance.setActiveAccount(accounts[0])
      setIsLoading(false)
      return
    }

    if(!activeAccount) {
      setToken(undefined)
      setIsLoading(false)
      return
    }

    try {
      const request = acquireRequest(activeAccount)
      const response = await instance.acquireTokenSilent(request)
      setToken(response.accessToken)
      setCanUpdate(getAccessTokenRoles(response.accessToken).includes("roll-call.write"))
      setIsLoading(false)
    } catch(error) {
      try {
        const request = acquireRequest(activeAccount)
        const response = await instance.acquireTokenPopup(request)
        setToken(response.accessToken)
        setCanUpdate(getAccessTokenRoles(response.accessToken).includes("roll-call.write"))
        setIsLoading(false)
      } catch {
        instance.loginRedirect(loginRequest)
      }
    }
  }, [instance, accounts, inProgress])

  const refreshToken = useCallback(async (forceRefresh = false) => {
    const activeAccount = instance.getActiveAccount()

    if(!activeAccount || MOCK_AUTH) return

    try {
      const request = { ...acquireRequest(activeAccount), forceRefresh }
      const response = await instance.acquireTokenSilent(request)
      setToken(response.accessToken)
    } catch {
      instance.loginRedirect(loginRequest)
    }
  }, [instance])

  useEffect(() => {
    getToken()
  }, [inProgress, getToken])

  useEffect(() => {
    const handleVisibilityChange = () => {
      if(!document.hidden) {
        refreshToken(true)
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [refreshToken])

  const value: AuthContextType = {
    isAuthenticated: !!token,
    token,
    isLoading,
    canUpdate,
    refreshToken
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if(!context) {
    throw new Error('useAuth must be used within AuthCtxProvider')
  }
  
  return context
}

export { MOCK_AUTH, MOCK_TOKEN } from '@/context/Auth/constants'
