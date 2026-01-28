import { Controller } from "react-hook-form"
import { useGetRosterPersonnel } from "@/pages/Roster/hooks"
import { useHandlePersonnelSelect } from './hooks'

// Components
import FormLabel from "@/components/form-elements/FormLabel"
import FormError from "@/components/form-elements/FormError"
import RemoveBtn from "@/components/form-elements/buttons/RemoveBtn"

export const PersonnelSelect = ({ index }: { index: number }) => {
  const { control, setValue, deleted, removeBtnProps } = useHandlePersonnelSelect(index)

  if(deleted) return null

  return (
    <div className="flex flex-col gap-2">
      <Controller
        control={control}
        name={`Personnel.${ index }.email`}
        rules={{
          required: 'Email is required'
        }}
        render={({ field, fieldState: { error } }) => (
          <div className="flex flex-col gap-2 mx-auto">
            <div className="flex flex-col">
              <FormLabel
                name={field.name}
                required={true}>
                  Support Personnel Email:
              </FormLabel>
              <select
                className="select"
                { ...field }
                onChange={(e) => {
                  field.onChange(e)
                  setValue(`Personnel.${ index }._dirtied`, true)
                }}>
                  <PersonnelOptions />
              </select>
            </div>
            <FormError error={error?.message} />
          </div>
        )} />
        <RemoveBtn { ...removeBtnProps } />
    </div>
  )
}

export const PersonnelOptions = () => {
  const { data } = useGetRosterPersonnel()

  if(!data?.data) return null

  return (
    <>
      <option value=""></option>
      {data.data.map(option => {
        return (
          <option key={`option-${ option.uuid }`} value={option.email}>{option.email}</option>
        )
      })}
    </>
  )
}