import { useFormContext } from "react-hook-form"

// Types
import * as AppTypes from '@/context/App/AppTypes'

/**
* Returns visibility boolean for create other support form
**/
export const useIsVisible = () => {
  const { watch } = useFormContext<AppTypes.SupportCreateInterface>()

  const visible = watch('supportType') === 'Other'

  return visible
}