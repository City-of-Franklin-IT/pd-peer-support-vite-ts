import * as AppActions from '@/context/App/AppActions'
import { authHeaders } from "@/helpers/utils"
import { errorPopup, savedPopup } from '@/utils/Toast/Toast'

// Types
import * as AppTypes from '@/context/App/AppTypes'

export const handleCreateRosterPersonnel = async (formData: AppTypes.PersonnelRosterCreateInterface, token: string) => {
  const result = await AppActions.createRosterPersonnel(formData, authHeaders(token))

  if(result.success) {
    savedPopup(result.msg)
  } else errorPopup(result.msg)
}