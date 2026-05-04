import { useEffect } from "react"
import { useNavigate } from "react-router"
import { useMsal } from "@azure/msal-react"
import { useAuth, MOCK_AUTH } from "@/context/Auth"

export const useGetToken = () => {
  const { token, isLoading } = useAuth()
  return { token, isLoading, popupBlocked: false }
}

export const useEnableQuery = () => {
  const { token, isLoading, refreshToken } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoading && !token) {
      navigate('/')
    }
  }, [token, isLoading, navigate])

  return { enabled: !!token && !isLoading, token, refreshToken }
}

export const useRedirectAfterLogin = () => {
  const { isAuthenticated, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      const redirectUrl = sessionStorage.getItem('redirectUrl')
      if (redirectUrl) {
        window.location.href = redirectUrl
        sessionStorage.removeItem('redirectUrl')
      }
    }
  }, [isAuthenticated, isLoading])
}

export const useActiveAccount = () => {
  const { isAuthenticated } = useAuth()
  return isAuthenticated
}

export const useAuthRedirect = () => {
  const { isAuthenticated, isLoading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate('/support')
    }
  }, [isAuthenticated, isLoading, navigate])
}

export const useUnauthRedirect = () => {
  const { isAuthenticated, isLoading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated, isLoading, navigate])
}

export const useGetUserDepartment = () => {
  const { isLoading: authLoading } = useAuth()
  const { inProgress } = useMsal()

  // Mock implementation for development
  if (MOCK_AUTH) {
    return { department: 'IT', isLoading: false }
  }

  // Placeholder: actual implementation would fetch from Graph API
  // For now, return undefined to avoid breaking existing code
  return { department: undefined, isLoading: authLoading || inProgress !== 'none' }
}

export const withTokenRefresh = async <T>(
  fn: () => Promise<T>,
  refresh: () => Promise<void>
): Promise<T> => {
  try {
    return await fn()
  } catch (e) {
    if (e instanceof Error && e.message === '401') {
      await refresh()
    }
    throw e
  }
}
