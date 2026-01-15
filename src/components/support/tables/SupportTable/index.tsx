import { useSetTableData } from './hooks'

// Types
import * as AppTypes from '@/context/App/AppTypes'

// Components
import PaginationContainer from '../../containers/PaginationContainer'
import * as Components from './components'

function SupportTable({ support }: { support: AppTypes.SupportInterface[] }) {
  const { tableData, filteredCount } = useSetTableData(support)

  if(!tableData.length) return (
    <Components.NoSupport />
  )

  return (
    <>
      <PaginationContainer count={filteredCount} />
      <Components.Table tableData={tableData} />
    </>
  )
}

export default SupportTable