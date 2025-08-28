// Types
import * as AppTypes from '@/context/App/types'

// Components
import SupportTable from '../../tables/SupportTable'
import FiltersContainer from '../FiltersContainer'
import * as Components from './components'

function SupportContainer({ support }: { support: AppTypes.SupportInterface[] }) {

  return (
    <div className="flex flex-col gap-20 items-center mx-auto my-20 w-9/10 xl:w-4/5 xl:mx-auto">
      <div className="flex gap-6 items-center flex-wrap">
        <FiltersContainer visible={!!support.length} />
        <SupportTable support={support} />
      </div>
      <Components.Form />
    </div>
  )
}

export default SupportContainer