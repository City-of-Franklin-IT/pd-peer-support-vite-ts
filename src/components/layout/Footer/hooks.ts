import { useGetUserDepartment } from "@/helpers/hooks"

export const useHandleDocsBtn = () => {
  const { department } = useGetUserDepartment()

  const visible = department === 'IT' || import.meta.env.MODE === 'development'

  return visible
}
