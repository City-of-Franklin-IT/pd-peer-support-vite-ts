import { useGetSupport, useHandleForm } from './hooks'

// Components
import Loading from '@/components/layout/loading/Loading'
import FormContainer from "@/components/form-elements/FormContainer"
import UpdateSupportForm from "../../forms/update/UpdateSupportForm"

export const Form = () => {
  const { visible, formRef } = useHandleForm()

  if(!visible) return null

  return (
    <div data-testid="get-support" ref={formRef} className="max-w-3xl w-full">
      <GetSupport />
    </div>
  )
}

const GetSupport = () => {
  const { data, isLoading } = useGetSupport()

  if(isLoading) return <Loading />

  return (
    <FormContainer>
      <UpdateSupportForm support={data?.data} />
    </FormContainer>
  )
}