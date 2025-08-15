import { useContext, useEffect } from "react"
import { useQuery } from "react-query"
import * as AppActions from '@/context/App/AppActions'
import { useEnableQuery } from "@/helpers/hooks"
import { authHeaders } from "@/helpers/utils"
import SupportCtx from "../../context"

export const useGetSupport = () => {
  const { supportUUID } = useContext(SupportCtx)

  const { enabled, token } = useEnableQuery()

  return useQuery(['getSupport', supportUUID], () => AppActions.getSupport(supportUUID, authHeaders(token)), { enabled: enabled && !!token && !!supportUUID })
}

export const useScrollToRef = (ref: React.RefObject<HTMLDivElement|null>) => {
  const { supportUUID } = useContext(SupportCtx)

  useEffect(() => {
    if(ref.current && supportUUID) {
      ref.current.scrollIntoView({ behavior: 'smooth' })
    } else window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [ref, supportUUID])
}