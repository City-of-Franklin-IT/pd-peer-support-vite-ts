import { SupportProvider } from '@/components/support/context'
import { useGetAllSupport } from './hooks'

// Components
import Loading from '@/components/layout/loading/Loading'
import ErrorBoundary from "@/components/error/ErrorBoundary"
import SupportContainer from '@/components/support/containers/SupportContainer'

function Support() {
  const { data, isLoading } = useGetAllSupport()

  if(isLoading) return <Loading />

  return (
    <ErrorBoundary href={'/'}>
      <SupportProvider>
        <SupportContainer support={data?.data || []} />
      </SupportProvider>
    </ErrorBoundary>
  )
}

export default Support