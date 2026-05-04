import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useAuth, MOCK_AUTH } from '@/context/Auth'

export const useAuthCheck = () => {
  const { isAuthenticated, isLoading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if(MOCK_AUTH) return

    if(!isLoading && !isAuthenticated) {
      navigate('/')
    }
  }, [isLoading, isAuthenticated, navigate])
}