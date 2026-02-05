import { NODE_ENV } from "@/config"
import { useGetUserDepartment } from "@/helpers/hooks"

export const useHandleDocsBtn = () => {
  const { department } = useGetUserDepartment()

  const visible = department === 'IT' || NODE_ENV === 'development'

  return visible
}
