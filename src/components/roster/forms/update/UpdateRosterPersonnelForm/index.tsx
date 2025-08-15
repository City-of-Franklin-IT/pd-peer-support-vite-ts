import { FormProvider } from 'react-hook-form'
import { useOnCancelBtnClick } from '../../create/CreateRosterPersonnelForm/hooks'
import { useUpdateRosterPersonnel, useHandleFormSubmit } from './hooks'

// Types
import * as AppTypes from '@/context/App/types'

// Components
import FormBtns from '@/components/form-elements/buttons/FormBtns'
import * as CreateRosterPersonnelForm from '../../create/CreateRosterPersonnelForm/components'
import * as Components from './components'

function UpdateRosterPersonnelForm({ personnel }: { personnel: AppTypes.PersonnelRosterInterface | undefined }) {
  const methods = useUpdateRosterPersonnel(personnel)

  const onCancelBtnClick = useOnCancelBtnClick()

  const handleFormSubmit = useHandleFormSubmit()

  return (
    <FormProvider { ...methods }>
      <form onSubmit={methods.handleSubmit(formData => handleFormSubmit(formData))} className="w-full">
        <Components.Header />

        <CreateRosterPersonnelForm.EmailInput />
        <FormBtns onCancelBtnClick={onCancelBtnClick} />
      </form>
    </FormProvider>
  )
}

export default UpdateRosterPersonnelForm
