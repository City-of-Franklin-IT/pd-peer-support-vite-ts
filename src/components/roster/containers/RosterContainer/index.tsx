import { motion } from 'motion/react'
import { motionProps } from '@/helpers/utils'

// Types
import * as AppTypes from '@/context/App/AppTypes'

// Components
import PersonnelTable from '../../tables/PersonnelTable'
import * as Components from './components'

function RosterContainer({ personnel }: { personnel: AppTypes.PersonnelRosterInterface[] }) {

  return (
    <motion.div 
      className="flex flex-col gap-4 items-center p-6 mx-auto my-10 w-1/2 rounded-xl bg-neutral/10 xl:p-10"
      { ...motionProps.slideInLeft }>
        <div className="flex flex-col gap-4 items-center">
          <Components.Header>Manage Support Personnel</Components.Header>

          <PersonnelTable personnel={personnel} />
          <Components.CreateBtn>
            Add Personnel
          </Components.CreateBtn>
        </div>
        <Components.Form />
    </motion.div>
  )
}

export default RosterContainer