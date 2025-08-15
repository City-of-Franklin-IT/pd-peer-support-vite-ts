import { useFormContext } from "react-hook-form"

// Types
import * as AppTypes from '@/context/App/types'

export const useHandleVisibility = (index: number) => {
  const { getValues } = useFormContext<AppTypes.SupportCreateInterface>()

  const deleted = !!getValues(`Personnel.${ index }._deleted`)

  const showRemoveBtn = !!getValues(`Personnel.${ index }.email`)

  return { deleted, showRemoveBtn }
}