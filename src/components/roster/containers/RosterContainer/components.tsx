import { useContext } from "react"
import RosterCtx from "../../context"
import { useGetPerson, useHandleForm } from "./hooks"

// Components
import HandleLoading from "@/utils/HandleLoading"
import CreateRosterPersonnelForm from "../../forms/create/CreateRosterPersonnelForm"
import UpdateRosterPersonnelForm from "../../forms/update/UpdateRosterPersonnelForm"
import DeleteBtn from "@/components/form-elements/buttons/DeleteBtn"

export const Header = ({ children }: { children: React.ReactNode }) => {

  return (
    <h2 className="text-4xl text-neutral-content font-[play] text-center mb-4">{children}</h2>
  )
}

export const CreateBtn = ({ children }: { children: React.ReactNode }) => {
  const { dispatch } = useContext(RosterCtx)

  return (
    <button
      type="button"
      className="btn btn-sm btn-accent font-[play] uppercase shadow-xl"
      onClick={() => dispatch({ type: 'SET_FORM_TYPE', payload: 'CreateRosterPersonnel' })}>
        {children}
    </button>
  )
}

export const Form = () => {
  const { formType, formRef, deleteBtnProps } = useHandleForm()

  if(!formType) return null

  if(formType === 'CreateRosterPersonnel') return ( // Create new
    <div data-testid="create-personnel-form" ref={formRef} className="w-full">
      <CreateRosterPersonnelForm />
    </div>
  )

  return ( // Update existing
    <div ref={formRef} className="flex flex-col items-center gap-4 w-full">
      <GetPersonnel />
      <DeleteBtn 
        onClick={deleteBtnProps.onClick}
        size={'btn-lg'}>
          {deleteBtnProps.label}
      </DeleteBtn>
    </div>
  )
}

const GetPersonnel = () => {
  const { data, isSuccess } = useGetPerson()

  return (
    <HandleLoading isSuccess={isSuccess}>
      <UpdateRosterPersonnelForm personnel={data?.data} />
    </HandleLoading>
  )
}