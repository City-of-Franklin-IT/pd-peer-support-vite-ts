import { useEffect } from "react"
import { useNavigate } from "react-router"
import { useMsal } from "@azure/msal-react"
import { useAuth } from "@/context/Auth"

export const useHandleAuth = () => {
  const { instance, accounts, inProgress } = useMsal()
  const { isAuthenticated, isLoading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isLoading) {
      return
    }

    if (isAuthenticated) {
      navigate('/support')
    } else {
      if (inProgress !== "none") {
        return
      }

      const activeAccount = instance.getActiveAccount()

      if (accounts.length === 0 || !activeAccount) {
        instance.ssoSilent({
          scopes: ["openid", "profile"]
        }).then((response) => {
          if (response.account) {
            instance.setActiveAccount(response.account)
            navigate('/support')
          }
        }).catch(() => {
          instance.loginRedirect({ scopes: ["openid", "profile"] })
        })
      }
    }
  }, [instance, accounts.length, inProgress, navigate, isAuthenticated, isLoading])
}