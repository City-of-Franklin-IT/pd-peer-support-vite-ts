import { useMsal } from "@azure/msal-react"

export const useHandleLogoutRedirect = () => {
  const { instance } = useMsal()

  return () => {
    instance.clearCache()

    window.location.href = '/'
  }
}