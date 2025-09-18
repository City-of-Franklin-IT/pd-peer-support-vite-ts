import { useEffect } from "react"
import { useNavigate } from "react-router"
import { useMsal } from "@azure/msal-react"

export const useRedirect = () => {
  const { instance, inProgress } = useMsal()
  const activeAccount = instance.getActiveAccount()

  const navigate = useNavigate()

  const isReady = instance && inProgress === 'none'

  useEffect(() => {
    if(isReady) {
      if(activeAccount) {
        navigate('/support')
      } else navigate('/')
    }

  }, [isReady, activeAccount])
}