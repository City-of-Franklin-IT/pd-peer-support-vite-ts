import { useCallback } from "react"
import { useNavigate } from "react-router"
import { useQueryClient } from "react-query"
import { useForm } from "react-hook-form"
import { useEnableQuery } from "@/helpers/hooks"
import { handleCreateSupport } from './utils'

// Types
import * as AppTypes from '@/context/App/types'

export const useCreateSupport = () => {

  return useForm<AppTypes.SupportCreateInterface>({
    mode: 'onBlur',
    defaultValues: {
      startDateTime: undefined,
      endDateTime: undefined,
      supportDesignation: undefined,
      supportType: undefined,
      note: '',
      OtherSupport: undefined,
      Personnel: []
    }
  })
}

export const useOnCancelBtnClick = () => {
  const navigate = useNavigate()

  return () => navigate('/support')
}

export const useHandleFormSubmit = () => {
  const navigate = useNavigate()

  const queryClient = useQueryClient()

  const { enabled, token } = useEnableQuery()

  return useCallback((formData: AppTypes.SupportCreateInterface) => {
    if(!enabled || !token) return

    handleCreateSupport(formData, token)
      .then(() => {
        queryClient.invalidateQueries('getAllSupport')
        navigate('/support')
      })
  }, [enabled, token, navigate, queryClient])
}