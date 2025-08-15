// Types
import * as AppTypes from '@/context/App/types'

// Components
import SupportTable from '../../tables/SupportTable'
import PaginationContainer from '../PaginationContainer'
import FiltersContainer from '../FiltersContainer'
import * as Components from './components'

function SupportContainer({ support }: { support: AppTypes.SupportInterface[] }) {

  return (
    <div className="flex flex-col gap-20 items-center mx-auto my-20 w-9/10 xl:w-4/5 xl:mx-auto">
      <div className="flex flex-col gap-6 w-full">
        <div className="flex items-end gap-10 justify-center flex-wrap">
          <FiltersContainer />
          <PaginationContainer />
        </div>
        <SupportTable support={support} />
      </div>
      <Components.Form />
    </div>
  )
}

export default SupportContainer