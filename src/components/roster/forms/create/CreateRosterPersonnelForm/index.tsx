import { FormProvider } from "react-hook-form"
import { useCreateRosterPersonnel, useOnCancelBtnClick, useHandleFormSubmit } from './hooks'

// Components
import FormBtns from "@/components/form-elements/buttons/FormBtns"
import * as Components from './components'

function CreateRosterPersonnelForm() {
  const methods = useCreateRosterPersonnel()

  const onCancelBtnClick = useOnCancelBtnClick()

  const handleFormSubmit = useHandleFormSubmit()

  return (
    <FormProvider { ...methods }>
      <form onSubmit={methods.handleSubmit(formData => handleFormSubmit(formData))}>
        <Components.EmailInput />
        <FormBtns onCancelBtnClick={onCancelBtnClick} />
      </form>
    </FormProvider>
  )
}

export default CreateRosterPersonnelForm