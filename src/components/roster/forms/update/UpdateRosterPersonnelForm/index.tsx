import { FormProvider } from 'react-hook-form'
import { useHandleUpdateRosterPersonnelForm } from './hooks'

// Types
import * as AppTypes from '@/context/App/types'

// Components
import FormBtns from '@/components/form-elements/buttons/FormBtns'
import * as CreateRosterPersonnelForm from '../../create/CreateRosterPersonnelForm/components'
import * as Components from './components'

function UpdateRosterPersonnelForm({ personnel }: { personnel: AppTypes.PersonnelRosterInterface | undefined }) {
  const { methods, onCancelBtnClick, handleFormSubmit } = useHandleUpdateRosterPersonnelForm(personnel)

  return (
    <FormProvider { ...methods }>
      <form onSubmit={methods.handleSubmit(handleFormSubmit)} className="w-full">
        <Components.Header />

        <CreateRosterPersonnelForm.EmailInput />
        <FormBtns onCancelBtnClick={onCancelBtnClick} />
      </form>
    </FormProvider>
  )
}

export default UpdateRosterPersonnelForm
