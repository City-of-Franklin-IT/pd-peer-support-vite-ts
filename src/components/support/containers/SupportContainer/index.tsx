import { useSetTableData } from '../../tables/SupportTable/hooks'

// Types
import * as AppTypes from '@/context/App/AppTypes'

// Components
import SupportTable from '../../tables/SupportTable'
import FiltersContainer from '../FiltersContainer'
import PaginationContainer from '../PaginationContainer'
import * as Components from './components'

function SupportContainer({ support }: { support: AppTypes.SupportInterface[] }) {
  const { tableData, filteredCount } = useSetTableData(support)

  return (
    <div className="flex flex-col gap-10 items-center my-10 p-3 lg:p-10 lg:my-20">
      <div className="flex gap-6 flex-wrap items-center lg:items-end w-full">
        <FiltersContainer visible={!!support.length} />
        <PaginationContainer count={filteredCount} />
        <div className="overflow-x-auto w-full">
          <SupportTable tableData={tableData} />
        </div>
      </div>
      <Components.Form />
    </div>
  )
}

export default SupportContainer