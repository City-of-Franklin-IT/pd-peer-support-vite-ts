import { useFormContext } from "react-hook-form"

// Types
import * as AppTypes from '@/context/App/types'

export const useIsVisible = () => {
  const { watch } = useFormContext<AppTypes.SupportCreateInterface>()

  return watch('supportType') === 'Other'
}