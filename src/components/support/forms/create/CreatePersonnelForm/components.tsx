import { Controller, useFormContext } from "react-hook-form"
import { useGetRosterPersonnel } from "@/pages/Roster/hooks"
import { useHandleVisibility } from './hooks'
import styles from '@/components/form-elements/Forms.module.css'

// Types
import * as AppTypes from '@/context/App/types'

// Components
import FormLabel from "@/components/form-elements/FormLabel"
import FormError from "@/components/form-elements/FormError"
import RemoveBtn from "@/components/form-elements/buttons/RemoveBtn"

export const PersonnelSelect = ({ index }: { index: number }) => {
  const { control, setValue } = useFormContext<AppTypes.SupportCreateInterface>()

  const { deleted, showRemoveBtn } = useHandleVisibility(index)

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
          <div className="flex flex-col gap-2 mx-auto w-fit">
            <div className="flex">
              <FormLabel
                name={field.name}
                required={true}>
                  Support Personnel Email:
              </FormLabel>
              <select
                className={styles.input}
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
        <RemoveBtn 
          onClick={() => setValue(`Personnel.${ index }._deleted`, true, { shouldDirty: true, shouldValidate: true })}
          visible={showRemoveBtn} />
    </div>
  )
}

export const PersonnelOptions = () => {
  const { data } = useGetRosterPersonnel()

  if(!data?.data) return

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