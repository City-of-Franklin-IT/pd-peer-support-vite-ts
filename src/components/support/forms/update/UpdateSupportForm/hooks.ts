import { useCallback, useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQueryClient } from 'react-query'
import { authHeaders } from '@/helpers/utils'
import * as AppActions from '@/context/App/AppActions'
import SupportCtx from '@/components/support/context'
import { useEnableQuery } from '@/helpers/hooks'
import { savedPopup, errorPopup } from '@/utils/Toast/Toast'
import { handleUpdateSupport } from './utils'

// Types
import * as AppTypes from '@/context/App/types'

export const useHandleUpdateSupportForm = (support: AppTypes.SupportInterface | undefined) => {
  const methods = useUpdateSupport(support)
  const onCancelBtnClick = useOnCancelBtnClick()
  const { label, onDeleteBtnClick } = useHandleDeleteBtn()
  const handleFormSubmit = useHandleFormSubmit()

  const deleteBtnProps = {
    onClick: onDeleteBtnClick,
    label
  }

  return { methods, onCancelBtnClick, deleteBtnProps, handleFormSubmit }
}

const useUpdateSupport = (support: AppTypes.SupportInterface | undefined) => {

  return useForm<AppTypes.SupportCreateInterface>({
    mode: 'onBlur',
    defaultValues: {
      startDateTime: support?.startDateTime?.substring(0, 16),
      endDateTime: support?.endDateTime?.substring(0, 16),
      supportDesignation: support?.supportDesignation,
      supportType: support?.supportType,
      note: support?.note,
      Personnel: support?.Personnel,
      OtherSupport: support?.OtherSupport,
      uuid: support?.uuid
    }
  })
}

const useOnCancelBtnClick = () => {
  const { dispatch } = useContext(SupportCtx)

  return () => dispatch({ type: 'RESET_CTX' })
}

const useHandleDeleteBtn = () => {
  const { supportUUID, dispatch } = useContext(SupportCtx)

  const [state, setState] = useState<{ active: boolean }>({ active: false })

  const queryClient = useQueryClient()

  const { token } = useEnableQuery()

  const onDeleteBtnClick = async () => {
    if(!state.active) {
      setState({ active: true })
      return
    }

    const result = await AppActions.deleteSupport(supportUUID, authHeaders(token))

    if(result.success) {
      queryClient.invalidateQueries('getAllSupport')
      dispatch({ type: 'RESET_CTX' })
      savedPopup(result.msg)
    } else errorPopup(result.msg)
  }

  return { onDeleteBtnClick, label: !state.active ? 'Delete Support' : 'Confirm Delete' }
}

const useHandleFormSubmit = () => {
  const { dispatch } = useContext(SupportCtx)

  const queryClient = useQueryClient()

  const { enabled, token } = useEnableQuery()

  return useCallback((formData: AppTypes.SupportCreateInterface) => {
    if(!enabled || !token) return

    handleUpdateSupport(formData, token)
      .then(() => {
        queryClient.invalidateQueries('getAllSupport')
        queryClient.invalidateQueries(['getSupport', formData.uuid])
        dispatch({ type: 'RESET_CTX' })
      })
      .catch(err => console.log(err))
  }, [enabled, token, queryClient, dispatch])
}