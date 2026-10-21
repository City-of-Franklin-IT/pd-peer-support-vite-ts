import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '@/context/Auth'

export const useAuthCheck = () => {
  const { isAuthenticated, isLoading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if(import.meta.env.DEV) return

    if(!isLoading && !isAuthenticated) {
      navigate('/')
    }
  }, [isLoading, isAuthenticated, navigate])
}