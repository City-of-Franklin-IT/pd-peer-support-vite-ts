import { useFormContext, useFieldArray } from "react-hook-form"
import styles from '@/components/form-elements/Forms.module.css'
import { supportDesignations, supportTypes } from './utils'

// Types
import * as AppTypes from '@/context/App/types'

// Components
import FormLabel from "@/components/form-elements/FormLabel"
import FormError from "@/components/form-elements/FormError"
import CreatePersonnelForm from "../CreatePersonnelForm"

export const Header = ({ children }: { children: React.ReactNode }) => {

  return (
    <h3 className="text-5xl font-[play] text-neutral-content text-center py-6">{children}</h3>
  )
}

export const DateTimeInputs = () => {

  return (
    <div className="flex gap-6">
      <StartInput />
      <EndInput />
    </div>
  )
}

export const SupportDesignationSelect = () => {
  const { register, formState: { errors }, setValue } = useFormContext<AppTypes.SupportCreateInterface>()

  return (
    <div className="flex-2 flex flex-col gap-2">
      <div className="flex">
        <FormLabel
          name={'supportDesignation'}
          required={true}>
            Designation:
        </FormLabel>
        <select
          className={styles.input}
          { ...register('supportDesignation', {
            required: 'Support designation is required',
            onChange: () => setValue('_dirtied', true)
          }) }>
            <SupportDesignationOptions />
        </select>
      </div>
      <FormError error={errors.supportDesignation?.message} />
    </div>
  )
}

export const SupportTypeSelect = () => {
  const { register, formState: { errors }, setValue } = useFormContext<AppTypes.SupportCreateInterface>()

  return (
    <div className="flex-2 flex flex-col gap-2">
      <div className="flex">
        <FormLabel
          name={'supportType'}
          required={true}>
            Type:            
        </FormLabel>
        <select
          className={styles.input}
          { ...register('supportType', {
            required: 'Support type is required',
            onChange: () => setValue('_dirtied', true)
          }) }>
            <SupportTypeOptions />
        </select>
      </div>
      <FormError error={errors.supportType?.message} />
    </div>
  )
}

export const NoteInput = () => {
  const { register, setValue } = useFormContext<AppTypes.SupportCreateInterface>()

  return (
    <div className="flex">
      <FormLabel name={'note'}>
        Note:
      </FormLabel>
      <textarea
        rows={4}
        className={styles.input}
        { ...register('note', {
          onChange: () => setValue('_dirtied', true)
        }) }></textarea>
    </div>
  )
}

export const PersonnelInputs = () => {
  const { getValues } = useFormContext<AppTypes.SupportCreateInterface>()

  const personnel = getValues('Personnel') || []

  return (
    <div className="flex flex-col gap-4 items-center mx-auto my-10 py-6 w-4/5 bg-neutral/50">
      <h3 className="font-[play] text-2xl text-neutral-content text-center">Support Personnel</h3>

      {personnel.map((_, index) => (
        <CreatePersonnelForm
          key={`personnel-form-${ index }`}
          index={index} />
      ))}
      <AddPersonnelBtn />
    </div>
  )
}

const StartInput = () => {
  const { register, formState: { errors }, setValue } = useFormContext<AppTypes.SupportCreateInterface>()

  return (
    <div className="flex-1 flex flex-col gap-2">
      <div className="flex">
        <FormLabel
          name={'startDateTime'}
          required={true}>
            Start Date/Time:
        </FormLabel>
        <input 
          type="datetime-local"
          className={styles.input}
          { ...register('startDateTime', {
            required: 'Start date/time is required',
            onChange: () => setValue('_dirtied', true)
          }) } />
      </div>
      <FormError error={errors.startDateTime?.message} />
    </div>
  )
}

const EndInput = () => {
  const { register, formState: { errors }, setValue } = useFormContext<AppTypes.SupportCreateInterface>()

  return (
    <div className="flex-1 flex flex-col gap-2">
      <div className="flex">
        <FormLabel
          name={'endDateTime'}
          required={true}>
            End Date/Time:
        </FormLabel>
        <input 
          type="datetime-local"
          className={styles.input}
          { ...register('endDateTime', {
            required: 'End date/time is required',
            onChange: () => setValue('_dirtied', true)
          }) } />
      </div>
      <FormError error={errors.endDateTime?.message} />
    </div>
  )
}

const SupportDesignationOptions = () => {

  return (
    <>
      <option value="">Select support designation..</option>
      {supportDesignations.map(designation => {
        return (
          <option key={`option-${ designation }`} value={designation}>{designation}</option>
        )
      })}
    </>
  )
}

const SupportTypeOptions = () => {

  return (
    <>
      <option value="">Select support type..</option>
      {supportTypes.map(type => {
        return (
          <option key={`option-${ type }`} value={type}>{type}</option>
        )
      })}
    </>
  )
}

const AddPersonnelBtn = () => {
  const { control } = useFormContext<AppTypes.SupportCreateInterface>()

  const { append } = useFieldArray({
    control,
    name: 'Personnel'
  })

  const onClick = () => {
    append({ email: '', parentId: '' })
  }

  return (
    <button 
      type="button"
      className="btn btn-primary font-[play] uppercase w-fit"
      onClick={onClick}>
        Add Personnel
    </button>
  )
}