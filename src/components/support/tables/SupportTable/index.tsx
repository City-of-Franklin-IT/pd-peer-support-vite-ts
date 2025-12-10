import { useSetTableData } from './hooks'

// Types
import * as AppTypes from '@/context/App/types'

// Components
import PaginationContainer from '../../containers/PaginationContainer'
import * as Components from './components'

function SupportTable({ support }: { support: AppTypes.SupportInterface[] }) {
  const tableData = useSetTableData(support)

  if(!tableData.length) return (
    <Components.NoSupport />
  )

  return (
    <>
      <PaginationContainer count={support.length} />
      <Components.Table tableData={tableData} />
    </>
  )
}

export default SupportTable