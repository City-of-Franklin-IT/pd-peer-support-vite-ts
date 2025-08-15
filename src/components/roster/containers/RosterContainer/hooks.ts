import React, { useContext, useState, useEffect } from "react"
import { useQuery, useQueryClient } from "react-query"
import * as AppActions from '@/context/App/AppActions'
import RosterCtx from "../../context"
import { authHeaders } from "@/helpers/utils"
import { useEnableQuery } from "@/helpers/hooks"
import { errorPopup, savedPopup } from "@/utils/Toast/Toast"

// Types
import { FormType } from "../../context"

export const useOnCreateBtnClick = (formType: FormType) => {
  const { dispatch } = useContext(RosterCtx)

  return () => {
    dispatch({ type: 'SET_ROSTER_UUID', payload: '' })
    dispatch({ type: 'SET_FORM_TYPE', payload: formType })
  }
}

export const useGetPerson = () => {
  const { rosterUUID } = useContext(RosterCtx)

  const { enabled, token } = useEnableQuery()

  return useQuery(['getPerson', rosterUUID], () => AppActions.getPerson(rosterUUID, authHeaders(token)), { enabled: enabled && !!token })
}

export const useHandleDeleteBtn = () => {
  const { rosterUUID, dispatch } = useContext(RosterCtx)

  const [state, setState] = useState<{ active: boolean }>({ active: false })

  const queryClient = useQueryClient()

  const { token } = useEnableQuery()

  const onClick = async () => {
    if(!state.active) {
      setState({ active: true })
      return
    }

    const result = await AppActions.deleteRosterPersonnel(rosterUUID, authHeaders(token))

    if(result.success) {
      queryClient.invalidateQueries('getRosterPersonnel')
      queryClient.invalidateQueries(['getPerson', rosterUUID])
      dispatch({ type: 'RESET_CTX' })
      savedPopup(result.msg)
    } else errorPopup(result.msg)
  }

  return { onClick, label: !state.active ? 'Delete Personnel' : 'Confirm Delete' }
}

export const useScrollToRef = (ref: React.RefObject<HTMLDivElement|null>) => {
  const { formType } = useContext(RosterCtx)

  const active = !!formType

  useEffect(() => {
    if(active && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' })
    } else window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [ref, active])
}