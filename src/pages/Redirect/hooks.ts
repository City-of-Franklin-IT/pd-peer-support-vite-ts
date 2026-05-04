import { useEffect } from "react"
import { useNavigate } from "react-router"
import { useAuth } from "@/context/Auth"

export const useRedirect = () => {
  const { isAuthenticated, isLoading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        navigate('/support')
      } else {
        navigate('/')
      }
    }
  }, [isLoading, isAuthenticated, navigate])
}