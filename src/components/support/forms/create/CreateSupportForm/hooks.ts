import { useCallback } from "react"
import { useNavigate } from "react-router"
import { useQueryClient } from "react-query"
import { useForm, useFormContext, useFieldArray } from "react-hook-form"
import { useEnableQuery } from "@/helpers/hooks"
import { handleCreateSupport } from './utils'

// Types
import * as AppTypes from '@/context/App/types'

/**
* Returns create support form methods, cancel button onClick handler, and create support form submit function
**/
export const useHandleCreateSupport = () => {
  const methods = useCreateSupport()
  const onCancelBtnClick = useOnCancelBtnClick()
  const handleFormSubmit = useHandleFormSubmit()

  return { methods, onCancelBtnClick, handleFormSubmit }
}

/**
* Returns add personnel button onClick handler
**/
export const useHandleAddPersonnelBtn = () => {
  const { control } = useFormContext<AppTypes.SupportCreateInterface>()
  
  const { append } = useFieldArray({
    control,
    name: 'Personnel'
  })

  const onClick = () => {
    append({ email: '', parentId: '' })
  }

  return onClick
}

/**
* Returns create support form methods
**/
const useCreateSupport = () => {

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

/**
* Returns cancel button onClick handler
**/
const useOnCancelBtnClick = () => {
  const navigate = useNavigate()

  const onClick = () => navigate('/support')

  return onClick
}

/**
* Returns create support form submit function
**/
const useHandleFormSubmit = () => {
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