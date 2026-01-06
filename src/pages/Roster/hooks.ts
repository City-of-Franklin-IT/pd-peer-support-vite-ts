import { useQuery } from "react-query"
import { useEnableQuery } from "@/helpers/hooks"
import { authHeaders } from "@/helpers/utils"
import * as AppActions from '@/context/App/AppActions'

/**
* Returns roster personnel from server
**/
export const useGetRosterPersonnel = () => {
  const { enabled, token } = useEnableQuery()

  return useQuery('getRosterPersonnel', () => AppActions.getRosterPersonnel(authHeaders(token)), { enabled: enabled && !!token })
}