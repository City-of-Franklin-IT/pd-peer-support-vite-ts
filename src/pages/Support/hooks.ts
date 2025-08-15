import { useQuery } from "react-query"
import { useEnableQuery } from "@/helpers/hooks"
import { authHeaders } from "@/helpers/utils"
import * as AppActions from '@/context/App/AppActions'

export const useGetAllSupport = () => {
  const { enabled, token } = useEnableQuery()

  return useQuery('getAllSupport', () => AppActions.getAllSupport(authHeaders(token)), { enabled: enabled && !!token, staleTime: Infinity })
}