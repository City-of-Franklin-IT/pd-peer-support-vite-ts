import { useContext } from "react"
import SupportCtx from "../../context"

export const useHandlePageNav = () => {
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

  return { prevPageBtnProps, nextPageBtnProps, label }
}