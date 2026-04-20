import { SupportProvider } from '@/components/support/context'
import { useGetAllSupport } from './hooks'

// Components
import HandleLoading from "@/utils/HandleLoading"
import ErrorBoundary from "@/components/error/ErrorBoundary"
import SupportContainer from '@/components/support/containers/SupportContainer'

function Support() {
  const { data, isSuccess } = useGetAllSupport()

  return (
    <ErrorBoundary href={'/'}>
      <HandleLoading isSuccess={isSuccess}>
        <SupportProvider>
          <SupportContainer support={data?.data || []} />
        </SupportProvider>
      </HandleLoading>
    </ErrorBoundary>
  )
}

export default Support