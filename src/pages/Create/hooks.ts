import { useParams } from "react-router"
import { createFormMap } from './utils'

/**
* Returns create support form
**/
export const useSetForm = () => {
  const { formtype } = useParams<{ formtype: string }>()

  if(!formtype) return (
    () => null
  )

  const Form = createFormMap.get(formtype)!

  return Form
}