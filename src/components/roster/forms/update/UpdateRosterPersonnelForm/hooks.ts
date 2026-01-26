import { useContext, useCallback } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import RosterCtx from '@/components/roster/context'
import { useEnableQuery } from '@/helpers/hooks'
import { errorPopup } from '@/utils/Toast/Toast'
import { useOnCancelBtnClick } from '../../create/CreateRosterPersonnelForm/hooks'
import { handleUpdateRosterPersonnel } from './utils'

// Types
import * as AppTypes from '@/context/App/AppTypes'

export const useHandleUpdateRosterPersonnelForm = (personnel: AppTypes.PersonnelRosterInterface | undefined) => {
  const methods = useUpdateRosterPersonnel(personnel)
  const onCancelBtnClick = useOnCancelBtnClick()
  const handleFormSubmit = useHandleFormSubmit()

  return { methods, onCancelBtnClick, handleFormSubmit }
}

const useUpdateRosterPersonnel = (personnel: AppTypes.PersonnelRosterInterface | undefined) => {

  return useForm<AppTypes.PersonnelRosterCreateInterface>({
    mode: 'onBlur',
    defaultValues: {
      email: personnel?.email,
      uuid: personnel?.uuid
    }
  })
}

const useHandleFormSubmit = () => {
  const { dispatch } = useContext(RosterCtx)

  const queryClient = useQueryClient()

  const { enabled, token } = useEnableQuery()

  return useCallback((formData: AppTypes.PersonnelRosterCreateInterface) => {
    if(!enabled || !token) return

    handleUpdateRosterPersonnel(formData, token)
      .then(() => {
        queryClient.invalidateQueries({ queryKey: ['getRosterPersonnel'] })
        queryClient.invalidateQueries({ queryKey: ['getPerson', formData.uuid] })
        dispatch({ type: 'RESET_CTX' })
      })
      .catch((err) => errorPopup(err))
  }, [enabled, token, queryClient, dispatch])
}