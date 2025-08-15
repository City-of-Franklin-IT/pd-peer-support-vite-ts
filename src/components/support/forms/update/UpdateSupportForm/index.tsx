import { FormProvider } from 'react-hook-form'
import { useUpdateSupport, useOnCancelBtnClick, useHandleDeleteBtn, useHandleFormSubmit } from './hooks'

// Types
import * as AppTypes from '@/context/App/types'

// Components
import CreateOtherSupportForm from '../../create/CreateOtherSupportForm'
import FormBtns from '@/components/form-elements/buttons/FormBtns'
import DeleteBtn from '@/components/form-elements/buttons/DeleteBtn'
import * as CreateSupport from '../../create/CreateSupportForm/components'

function UpdateSupportForm({ support }: { support: AppTypes.SupportInterface | undefined }) {
  const methods = useUpdateSupport(support)

  const onCancelBtnClick = useOnCancelBtnClick()

  const { label, onDeleteBtnClick } = useHandleDeleteBtn()

  const handleFormSubmit = useHandleFormSubmit()

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
              onClick={onDeleteBtnClick}
              size={'btn-lg'}>
                {label}
            </DeleteBtn>
          </div>
        </div>
      </form>
    </FormProvider>
  )
}

export default UpdateSupportForm