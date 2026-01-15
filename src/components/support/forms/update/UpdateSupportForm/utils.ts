import * as AppActions from '@/context/App/AppActions'
import { authHeaders } from '@/helpers/utils'
import { errorPopup, savedPopup } from '@/utils/Toast/Toast'

// Types
import * as AppTypes from '@/context/App/AppTypes'

export const handleUpdateSupport = async (formData: AppTypes.SupportCreateInterface, token: string) => {
  const result = await AppActions.updateSupport(formData, authHeaders(token))

  if(result.success) {
    const parentId = formData.uuid as string
    
    const personnel = formData.Personnel

    const personnelPromises = Promise.all(
      personnel?.map(person => {
        if(!person.uuid) { // Create
          return AppActions.createPersonnel({ ...person, parentId }, authHeaders(token))
        }
        
        if(person._dirtied) { // Update
          return AppActions.updatePersonnel(person, authHeaders(token))
        }

        if(person._deleted) { // Delete
          return AppActions.deletePersonnel(person?.uuid as string, authHeaders(token))
        }

        return Promise.resolve() // Skip unmodified personnel
      }) || []
    )

    if(formData.OtherSupport) {
      if(!formData.OtherSupport.uuid) { // Create
        await AppActions.createOtherSupport({ ...formData.OtherSupport, parentId }, authHeaders(token))
      }

      if(formData.OtherSupport._dirtied && formData.OtherSupport.uuid) { // Update
        await AppActions.updateOtherSupport(formData.OtherSupport, authHeaders(token))
      }
    }

    await personnelPromises

    savedPopup(result.msg)
  } else errorPopup(result.msg)
}