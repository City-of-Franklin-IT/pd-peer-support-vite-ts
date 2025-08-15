import { useContext, useRef } from "react"
import SupportCtx from "../../context"
import { useGetSupport, useScrollToRef } from './hooks'

// Components
import FormContainer from "@/components/form-elements/FormContainer"
import HandleLoading from "@/utils/HandleLoading"
import UpdateSupportForm from "../../forms/update/UpdateSupportForm"

export const Form = () => {
  const { supportUUID } = useContext(SupportCtx)

  const ref = useRef<HTMLDivElement>(null)

  useScrollToRef(ref)

  if(!supportUUID) return

  return (
    <div data-testid="get-support" ref={ref}>
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