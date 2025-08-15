import { useSetForm } from './hooks'

// Components
import FormContainer from "@/components/form-elements/FormContainer"

export const CreateContainer = () => {
  const Form = useSetForm()

  if(!Form) return

  return (
    <FormContainer>
      <Form />
    </FormContainer>
  )
}