import { useContext, useEffect } from "react"
import SupportCtx from "../../context"

export const useHandlePageNav = (count: number) => {
  const { currentPage, totalPages, dispatch } = useContext(SupportCtx)

  const prevBtnOnClick = () => {
    dispatch({ type: 'SET_CURRENT_PAGE', payload: currentPage - 1 })
  }

  const nextBtnOnClick = () => {
    dispatch({ type: 'SET_CURRENT_PAGE', payload: currentPage + 1 })
  }

  const prevPageBtnProps = {
    onClick: prevBtnOnClick,
    disabled: currentPage === 1
  }

  const nextPageBtnProps = {
    onClick: nextBtnOnClick,
    disabled: !totalPages || currentPage === totalPages
  }

  const label = `Page ${ currentPage } / ${ totalPages }`

  useEffect(() => {
    if(count > 25) {
      const payload = Math.ceil(count / 25)
      
      if(totalPages !== payload) {
        dispatch({ type: 'SET_TOTAL_PAGES', payload })
      }
    }
  }, [count])

  return { prevPageBtnProps, nextPageBtnProps, label }
}