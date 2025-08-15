import { FormProvider } from "react-hook-form"
import { useCreateSupport, useOnCancelBtnClick, useHandleFormSubmit } from "./hooks"

// Components
import CreateOtherSupportForm from "../CreateOtherSupportForm"
import FormBtns from "@/components/form-elements/buttons/FormBtns"
import * as Components from './components'

function CreateSupportForm() {
  const methods = useCreateSupport()

  const onCancelBtnClick = useOnCancelBtnClick()

  const handleFormSubmit = useHandleFormSubmit()

  return (
    <FormProvider { ...methods }>
      <form onSubmit={methods.handleSubmit(handleFormSubmit)}>
        <Components.Header>Create Support</Components.Header>

        <div className="flex flex-col gap-6">
          <Components.DateTimeInputs />
          <div className="flex justify-around gap-4 flex-wrap">
            <Components.SupportDesignationSelect />
            <Components.SupportTypeSelect />
            <CreateOtherSupportForm />
          </div>
          <Components.NoteInput />

          <Components.PersonnelInputs />
          <FormBtns onCancelBtnClick={onCancelBtnClick} />
        </div>
      </form>
    </FormProvider>
  )
}

export default CreateSupportForm