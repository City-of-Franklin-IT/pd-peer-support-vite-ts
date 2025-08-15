import { SupportProvider } from '@/components/support/context'
import { useGetAllSupport } from './hooks'

// Components
import Layout from "@/components/layout/Layout"
import HandleLoading from "@/utils/HandleLoading"
import ErrorBoundary from "@/components/error/ErrorBoundary"
import SupportContainer from '@/components/support/containers/SupportContainer'

function Support() {
  const { data, isSuccess } = useGetAllSupport()

  return (
    <Layout>
      <ErrorBoundary href={'/'}>
        <HandleLoading isSuccess={isSuccess}>
          <SupportProvider>
            <SupportContainer support={data?.data || []} />
          </SupportProvider>
        </HandleLoading>
      </ErrorBoundary>
    </Layout>
  )
}

export default Support