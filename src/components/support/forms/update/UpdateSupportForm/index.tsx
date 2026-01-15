import { FormProvider } from 'react-hook-form'
import { useHandleUpdateSupportForm } from './hooks'

// Types
import * as AppTypes from '@/context/App/AppTypes'

// Components
import CreateOtherSupportForm from '../../create/CreateOtherSupportForm'
import FormBtns from '@/components/form-elements/buttons/FormBtns'
import DeleteBtn from '@/components/form-elements/buttons/DeleteBtn'
import * as CreateSupport from '../../create/CreateSupportForm/components'

function UpdateSupportForm({ support }: { support: AppTypes.SupportInterface | undefined }) {
  const { methods, onCancelBtnClick, deleteBtnProps, handleFormSubmit } = useHandleUpdateSupportForm(support)

  return (
    <FormProvider { ...methods }>
      <form onSubmit={methods.handleSubmit(handleFormSubmit)}>
        <CreateSupport.Header>Update Support</CreateSupport.Header>

        <div className="flex flex-col gap-6">
          <CreateSupport.DateTimeInputs />
          <div className="flex justify-around gap-4 flex-wrap">
            <CreateSupport.SupportDesignationSelect />
            <CreateSupport.SupportTypeSelect />
            <CreateOtherSupportForm />
          </div>
          <CreateSupport.NoteInput />

          <CreateSupport.PersonnelInputs />
          <div className="flex flex-col gap-6">
            <FormBtns onCancelBtnClick={onCancelBtnClick} />
            <DeleteBtn 
              onClick={deleteBtnProps.onClick}
              size={'btn-lg'}>
                {deleteBtnProps.label}
            </DeleteBtn>
          </div>
        </div>
      </form>
    </FormProvider>
  )
}

export default UpdateSupportForm