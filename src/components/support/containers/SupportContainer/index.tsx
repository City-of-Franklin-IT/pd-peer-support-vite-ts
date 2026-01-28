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
    <div className="flex flex-col gap-20 items-center mx-auto my-20 w-9/10 xl:w-4/5 xl:mx-auto">
      <div className="flex gap-6 items-center flex-wrap w-full overflow-hidden">
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