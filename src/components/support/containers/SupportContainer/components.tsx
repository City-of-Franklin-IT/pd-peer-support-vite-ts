import { useGetSupport, useHandleForm } from './hooks'

// Components
import FormContainer from "@/components/form-elements/FormContainer"
import HandleLoading from "@/utils/HandleLoading"
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
  const { data, isSuccess } = useGetSupport()

  return (
    <HandleLoading isSuccess={isSuccess}>
      <FormContainer>
        <UpdateSupportForm support={data?.data} />
      </FormContainer>
    </HandleLoading>
  )
}