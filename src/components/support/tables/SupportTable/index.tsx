// Types
import * as AppTypes from '@/context/App/AppTypes'

// Components
import * as Components from './components'

function SupportTable({ tableData }: { tableData: AppTypes.SupportInterface[] }) {
  if(!tableData.length) return (
    <Components.NoSupport />
  )

  return (
    <Components.Table tableData={tableData} />
  )
}

export default SupportTable