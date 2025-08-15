import { useFormContext } from "react-hook-form"
import styles from '@/components/form-elements/Forms.module.css'

// Types
import * as AppTypes from '@/context/App/types'

// Components
import FormLabel from "@/components/form-elements/FormLabel"
import FormError from "@/components/form-elements/FormError"

export const DescriptionInput = () => {
  const { register, formState: { errors }, setValue } = useFormContext<AppTypes.SupportCreateInterface>()

  return (
    <div className="flex flex-col gap-2">
      <div className="flex">
        <FormLabel
          name={'OtherSupport.description'}
          required={true}>
            Other Support Description:
        </FormLabel>
        <input 
          type="text" 
          className={styles.input}
          { ...register('OtherSupport.description', {
            required: 'Description is required',
            maxLength: {
              value: 50,
              message: 'Description must be 50 characters or less'
            },
            onChange: () => setValue('OtherSupport._dirtied', true)
          }) } />
      </div>
      <FormError error={errors.OtherSupport?.description?.message} />
    </div>
  )
}