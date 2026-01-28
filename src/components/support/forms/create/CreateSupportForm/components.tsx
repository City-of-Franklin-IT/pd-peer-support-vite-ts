import { useFormContext } from "react-hook-form"
import { supportDesignations, supportTypes } from './utils'
import { useHandleAddPersonnelBtn } from './hooks'

// Types
import * as AppTypes from '@/context/App/AppTypes'

// Components
import FormLabel from "@/components/form-elements/FormLabel"
import FormError from "@/components/form-elements/FormError"
import CreatePersonnelForm from "../CreatePersonnelForm"

export const Header = ({ children }: { children: React.ReactNode }) => {

  return (
    <h3 className="text-neutral-content text-4xl font-[play] font-normal text-center py-6 whitespace-nowrap">{children}</h3>
  )
}

export const DateTimeInputs = () => {

  return (
    <div className="flex gap-6 flex-wrap">
      <DateInput field={'startDateTime'} />
      <DateInput field={'endDateTime'} />
    </div>
  )
}

export const SupportDesignationSelect = () => {
  const { register, formState: { errors }, setValue } = useFormContext<AppTypes.SupportCreateInterface>()

  return (
    <div className="flex-2 flex flex-col gap-2">
      <div className="flex flex-col">
        <FormLabel
          name={'supportDesignation'}
          required={true}>
            Designation:
        </FormLabel>
        <select
          className="select w-full"
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
      <div className="flex flex-col">
        <FormLabel
          name={'supportType'}
          required={true}>
            Type:            
        </FormLabel>
        <select
          className="select w-full"
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
    <div className="flex flex-col">
      <FormLabel name={'note'}>
        Note:
      </FormLabel>
      <textarea
        rows={4}
        className="textarea w-full"
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

const DateInput = ({ field }: { field: 'startDateTime' | 'endDateTime' }) => {
  const { register, formState: { errors }, setValue } = useFormContext<AppTypes.SupportCreateInterface>()

  const label = field === 'startDateTime' ?
    'Start Date/Time:' :
    'End Date/Time:'

  return (
    <div className="flex-1 flex flex-col gap-2">
      <div className="flex flex-col">
        <FormLabel
          name={field}
          required={true}>
            {label}
        </FormLabel>
        <input 
          type="datetime-local"
          className="input w-full"
          { ...register(field, {
            required: 'Required',
            onChange: () => setValue('_dirtied', true)
          }) } />
      </div>
      <FormError error={errors[field]?.message} />
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
  const onClick = useHandleAddPersonnelBtn()

  return (
    <button 
      type="button"
      className="btn btn-primary font-[play] uppercase w-fit"
      onClick={onClick}>
        Add Personnel
    </button>
  )
}