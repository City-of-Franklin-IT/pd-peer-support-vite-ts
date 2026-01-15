import * as AppActions from '@/context/App/AppActions'
import { authHeaders } from '@/helpers/utils'
import { errorPopup, savedPopup } from '@/utils/Toast/Toast'

// Types
import * as AppTypes from '@/context/App/AppTypes'

export const supportDesignations: AppTypes.SupportDesignationType[] = [
  "FPD Employee",
  "Other COF First Responder",
  "Other City Employee",
  "Other Non-COF First Responder"
]

export const supportTypes: AppTypes.SupportType[] = [
  "Debrief - External",
  "Debrief - Internal",
  "Defusing",
  "Family",
  "Finances",
  "Referral",
  "Substance Use",
  "Undisclosed",
  "Work",
  "Other"
]

export const handleCreateSupport = async (formData: AppTypes.SupportCreateInterface, token: string) => {
  const result = await AppActions.createSupport(formData, authHeaders(token))

  if(result.success) {
    if(formData.Personnel) { // Personnel
      await Promise.all(
        formData.Personnel.map(person => AppActions.createPersonnel({ ...person, parentId: result.data.uuid }, authHeaders(token)))
      )
    }

    if(formData.OtherSupport) { // Other support
      await AppActions.createOtherSupport({ ...formData.OtherSupport, parentId: result.data.uuid }, authHeaders(token))
    }

    savedPopup(result.msg)
  } else errorPopup(result.msg)
}