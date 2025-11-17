import { FormProvider } from "react-hook-form"
import { useHandleCreateRosterPersonnelForm } from './hooks'

// Components
import FormBtns from "@/components/form-elements/buttons/FormBtns"
import * as Components from './components'

function CreateRosterPersonnelForm() {
  const { methods, onCancelBtnClick, handleFormSubmit } = useHandleCreateRosterPersonnelForm()

  return (
    <FormProvider { ...methods }>
      <form onSubmit={methods.handleSubmit(handleFormSubmit)}>
        <Components.EmailInput />
        <FormBtns onCancelBtnClick={onCancelBtnClick} />
      </form>
    </FormProvider>
  )
}

export default CreateRosterPersonnelForm