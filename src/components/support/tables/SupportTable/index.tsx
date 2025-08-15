import { useSetTableData } from './hooks'

// Types
import * as AppTypes from '@/context/App/types'

// Components
import * as Components from './components'

function SupportTable({ support }: { support: AppTypes.SupportInterface[] }) {
  const tableData = useSetTableData(support)

  return (
    <Components.Table tableData={tableData} />
  )
}

export default SupportTable