import { useContext, useEffect, useState } from "react"
import { useLocation } from "react-router"
import { useDismissOnOutside } from "@/helpers/hooks"
import HeaderCtx from "./context"

// Types
import { PagesType } from "./context"

/**
* Returns title link href
**/
export const useHandleTitle = () => {
  const { pathname } = useLocation()

  const href = pathname !== '/' ? '/support' : ''

  return href
}

/**
* Returns header buttons visibility boolean
**/
export const useHandleButtonsVisibility = () => {
  const { pathname } = useLocation()

  const visibile = pathname !== '/'

  return visibile
}

/**
* Handles updating activePage in context on page change
**/
export const useSetActivePage = () => {
  const { activePage, dispatch } = useContext(HeaderCtx)

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

    if(payload !== activePage) {
      dispatch({ type: 'SET_ACTIVE_PAGE', payload })
    }
  }, [pathname, activePage, dispatch])
}

export const useHandleMobileMenu = () => {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const ref = useDismissOnOutside(open, () => setOpen(false))

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  const onBtnClick = () => setOpen(o => !o)
  const close = () => setOpen(false)

  return { ref, open, onBtnClick, close }
}