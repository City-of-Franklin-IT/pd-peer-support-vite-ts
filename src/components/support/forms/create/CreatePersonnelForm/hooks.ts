import { useFormContext } from "react-hook-form"

// Types
import * as AppTypes from '@/context/App/types'

/**
* Returns remove button props and deleted boolean
**/
export const useHandlePersonnelSelect = (index: number) => {
  const { control, setValue } = useFormContext<AppTypes.SupportCreateInterface>()
  
  const { deleted, showRemoveBtn } = useHandleVisibility(index)

  const removeBtnProps = {
    visible: showRemoveBtn,
    onClick: () => setValue(`Personnel.${ index }._deleted`, true, { shouldDirty: true, shouldValidate: true })
  }

  return { control, setValue, deleted, removeBtnProps }
}

/**
* Returns deleted and showRemoveBtn visibility booleans
**/
const useHandleVisibility = (index: number) => {
  const { getValues } = useFormContext<AppTypes.SupportCreateInterface>()

  const deleted = !!getValues(`Personnel.${ index }._deleted`)

  const showRemoveBtn = !!getValues(`Personnel.${ index }.email`)

  return { deleted, showRemoveBtn }
}