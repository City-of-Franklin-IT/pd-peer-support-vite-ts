import { useContext } from "react"
import RosterCtx from "../../context"

// Types
import * as AppTypes from '@/context/App/types'
import { FormType } from "../../context"

export const useHandleTableRow = (tableData: AppTypes.PersonnelRosterInterface, index: number) => {
  const onClick = useOnTableRowClick('UpdateRosterPersonnel', tableData.uuid)
  
  const support = tableData.Support?.length ? tableData.Support.map(item => (item)).length : '-'

  const bgColor = index % 2 === 0 ? 'bg-neutral/20' : null

  const className= `border-0 border-t-1 border-neutral-content hover:cursor-pointer hover:bg-neutral ${ bgColor }`

  const rowProps = {
    onClick,
    className
  }

  return { rowProps, support, email: tableData.email }
}

const useOnTableRowClick = (formType: FormType, uuid: string) => {
  const { dispatch } = useContext(RosterCtx)

  return () => {
    dispatch({ type: 'SET_FORM_TYPE', payload: formType })
    dispatch({ type: 'SET_ROSTER_UUID', payload: uuid })
  }
}