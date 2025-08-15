import { RosterProvider } from '@/components/roster/context'
import { useGetRosterPersonnel } from './hooks'

// Components
import Layout from '@/components/layout/Layout'
import HandleLoading from '@/utils/HandleLoading'
import ErrorBoundary from '@/components/error/ErrorBoundary'
import RosterContainer from '@/components/roster/containers/RosterContainer'

function Roster() {
  const { data, isSuccess } = useGetRosterPersonnel()

  return (
    <Layout>
      <ErrorBoundary href={'/support'}>
        <HandleLoading isSuccess={isSuccess}>
          <RosterProvider>
            <RosterContainer personnel={data?.data || []} />
          </RosterProvider>
        </HandleLoading>
      </ErrorBoundary>
    </Layout>
  )
}

export default Roster