import { useFormContext } from "react-hook-form"

// Types
import * as AppTypes from '@/context/App/AppTypes'

// Components
import FormLabel from "@/components/form-elements/FormLabel"
import FormError from "@/components/form-elements/FormError"

export const EmailInput = () => {
  const { register, formState: { errors }, setValue } = useFormContext<AppTypes.PersonnelRosterCreateInterface>()

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex flex-col">
        <FormLabel 
          name={'email'}
          required={true}>
            Email:
        </FormLabel>
        <input 
          type="text"
          className="input w-full"
          { ...register('email', {
            required: 'Email is required',
            validate: (value) => {
              const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
              return emailRegex.test(value) || 'Please enter a valid email address'
            },
            onChange: () => setValue('_dirtied', true)
          }) } />
      </div>
      <FormError error={errors.email?.message} />
    </div>
  )
}