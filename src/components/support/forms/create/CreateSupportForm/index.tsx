import { FormProvider } from "react-hook-form"
import { useHandleCreateSupport } from "./hooks"

// Components
import CreateOtherSupportForm from "../CreateOtherSupportForm"
import FormBtns from "@/components/form-elements/buttons/FormBtns"
import * as Components from './components'

function CreateSupportForm() {
  const { methods, handleFormSubmit, onCancelBtnClick } = useHandleCreateSupport()

  return (
    <FormProvider { ...methods }>
      <form onSubmit={methods.handleSubmit(handleFormSubmit)}>
        <Components.Header>Create Support</Components.Header>

        <div className="flex flex-col gap-6">
          <Components.DateTimeInputs />
          <div className="flex gap-4 flex-wrap">
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