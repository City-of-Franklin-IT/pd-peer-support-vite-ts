import { useContext, useCallback } from 'react'
import { useQueryClient } from 'react-query'
import { useForm } from 'react-hook-form'
import RosterCtx from '@/components/roster/context'
import { useEnableQuery } from '@/helpers/hooks'
import { errorPopup } from '@/utils/Toast/Toast'
import { handleUpdateRosterPersonnel } from './utils'

// Types
import * as AppTypes from '@/context/App/types'

export const useUpdateRosterPersonnel = (personnel: AppTypes.PersonnelRosterInterface | undefined) => {

  return useForm<AppTypes.PersonnelRosterCreateInterface>({
    mode: 'onBlur',
    defaultValues: {
      email: personnel?.email,
      uuid: personnel?.uuid
    }
  })
}

export const useHandleFormSubmit = () => {
  const { dispatch } = useContext(RosterCtx)

  const queryClient = useQueryClient()

  const { enabled, token } = useEnableQuery()

  return useCallback((formData: AppTypes.PersonnelRosterCreateInterface) => {
    if(!enabled || !token) return

    handleUpdateRosterPersonnel(formData, token)
      .then(() => {
        queryClient.invalidateQueries('getRosterPersonnel')
        queryClient.invalidateQueries(['getPerson', formData.uuid])
        dispatch({ type: 'RESET_CTX' })
      })
      .catch((err) => errorPopup(err))
  }, [enabled, token, queryClient, dispatch])
}