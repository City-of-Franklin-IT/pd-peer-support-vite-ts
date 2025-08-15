import { useContext, useCallback } from "react"
import { useQueryClient } from "react-query"
import { useForm } from "react-hook-form"
import RosterCtx from "@/components/roster/context"
import { handleCreateRosterPersonnel } from './utils'

// Types
import * as AppTypes from '@/context/App/types'
import { useEnableQuery } from "@/helpers/hooks"

export const useCreateRosterPersonnel = () => {

  return useForm<AppTypes.PersonnelRosterCreateInterface>({
    mode: 'onBlur',
    defaultValues: {
      email: ''
    }
  })
}

export const useOnCancelBtnClick = () => {
  const { dispatch } = useContext(RosterCtx)

  return () => dispatch({ type: 'RESET_CTX' })
}

export const useHandleFormSubmit = () => {
  const { dispatch } = useContext(RosterCtx)

  const { enabled, token } = useEnableQuery()

  const queryClient = useQueryClient()

  return useCallback((formData: AppTypes.PersonnelRosterCreateInterface) => {
    if(!enabled || !token) return

    handleCreateRosterPersonnel(formData, token)
      .then(() => {
        queryClient.invalidateQueries('getRosterPersonnel')
        dispatch({ type: 'RESET_CTX' })
      })
  }, [enabled, token, queryClient, dispatch])
}