import { useEffect, useState } from "react"
import { PublicClientApplication, AuthenticationResult, EventType } from "@azure/msal-browser"
import { MsalProvider } from "@azure/msal-react"
import { msalConfig } from "../config"

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [msalInstance, setMsalInstance] = useState<PublicClientApplication | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    const initializeMsal = async () => {
      const instance = new PublicClientApplication(msalConfig)
      
      await instance.initialize()
      
      const accounts = instance.getAllAccounts()
      
      if(!instance.getActiveAccount() && accounts.length > 0) {
        instance.setActiveAccount(accounts[0])
      }
      
      instance.addEventCallback((event) => {
        const authenticationResult = event.payload as AuthenticationResult
        const account = authenticationResult?.account

        if(event.eventType === EventType.LOGIN_SUCCESS && account) {
          instance.setActiveAccount(account)
        }
      })

      setMsalInstance(instance)
      setIsInitialized(true)
    }

    initializeMsal()
  }, [])

  if(!isInitialized || !msalInstance) {
    return <div>Initializing authentication...</div>
  }

  return <MsalProvider instance={msalInstance}>
    {children}
  </MsalProvider>
}

export const useAuthProvider = () => {
  return { AuthProvider }
}