import { useContext, useMemo, useEffect } from "react"
import { useLocation } from "react-router"
import HeaderCtx from "./context"

// Types
import { PagesType } from "./context"

export const useHandleTitle = () => {
  const { pathname } = useLocation()

  const width = window.innerWidth

  const href = pathname !== '/' ? '/support' : ''

  const visible = useMemo(() => {
    if(width >= 1024) {
      return true
    }
    
    return false
  }, [width])

  return { href, visible }
}

export const useHandleButtonsVisibility = () => {
  const { pathname } = useLocation()

  return pathname !== '/'
}

export const useSetActivePage = () => {
  const { dispatch } = useContext(HeaderCtx)

  const { pathname } = useLocation()

  useEffect(() => {
    let payload: PagesType | undefined

    switch(pathname) {
      case '/support':
        payload = 'Support'
        break
      case '/create/support':
        payload = 'Create Support'
        break
      case '/roster':
        payload = 'Manage Roster'
        break
      default:
        payload = undefined
    }

    return () => dispatch({ type: 'SET_ACTIVE_PAGE', payload })
  }, [pathname, dispatch])
}