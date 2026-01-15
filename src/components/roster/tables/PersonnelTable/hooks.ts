import { useContext } from "react"
import RosterCtx from "../../context"

// Types
import * as AppTypes from '@/context/App/AppTypes'
import { FormType } from "../../context"

/**
* Returns personnel table row className and onClick handler
**/
export const useHandleTableRow = (tableData: AppTypes.PersonnelRosterInterface, index: number) => {
  const onClick = useOnTableRowClick('UpdateRosterPersonnel', tableData.uuid)
  const supportCount = (Array.isArray(tableData.Support) && tableData.Support.length > 0) ? tableData.Support.length : '-'
  const bgColor = index % 2 === 0 ? 'bg-neutral/20' : null
  const className= `border-0 border-t-1 border-neutral-content hover:cursor-pointer hover:bg-neutral ${ bgColor }`

  const rowProps = {
    onClick,
    className
  }

  return { rowProps, supportCount, email: tableData.email }
}

/**
* Returns personnel table row onClick handler
**/
const useOnTableRowClick = (formType: FormType, uuid: string) => {
  const { dispatch } = useContext(RosterCtx)

  return () => {
    dispatch({ type: 'SET_FORM_TYPE', payload: formType })
    dispatch({ type: 'SET_ROSTER_UUID', payload: uuid })
  }
}