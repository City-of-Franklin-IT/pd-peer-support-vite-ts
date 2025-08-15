import { useContext } from "react"
import RosterCtx from "../../context"

// Types
import { FormType } from "../../context"

export const useOnTableRowClick = (formType: FormType, uuid: string) => {
  const { dispatch } = useContext(RosterCtx)

  return () => {
    dispatch({ type: 'SET_FORM_TYPE', payload: formType })
    dispatch({ type: 'SET_ROSTER_UUID', payload: uuid })
  }
}