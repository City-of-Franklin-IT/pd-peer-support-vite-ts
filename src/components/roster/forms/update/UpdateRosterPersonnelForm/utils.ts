import { authHeaders } from "@/helpers/utils"
import * as AppActions from '@/context/App/AppActions'
import { errorPopup, savedPopup } from "@/utils/Toast/Toast"

// Types
import * as AppTypes from '@/context/App/AppTypes'

export const handleUpdateRosterPersonnel = async (formData: AppTypes.PersonnelRosterCreateInterface, token: string) => {
  if(formData._dirtied) {
    const result = await AppActions.updateRosterPersonnel(formData, authHeaders(token))

    if(result.success) {
      savedPopup(result.msg)
    } else errorPopup(result.msg)
  }
}