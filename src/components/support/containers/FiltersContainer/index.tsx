import { motion } from 'motion/react'
import { motionProps } from '@/helpers/utils'

// Components
import * as Components from './components'

function FiltersContainer({ visible }: { visible: boolean }) {
  if(!visible) return null

  return (
    <motion.div 
      className="flex flex-col gap-4 items-end mx-auto w-fit lg:flex-row lg:gap-10 lg:mr-auto lg:mx-0"
      { ...motionProps.fadeInOut }>
        <Components.PersonnelFilter />
        <Components.DateRangeFilterInputs />
        <Components.Search />
    </motion.div>
  )
}

export default FiltersContainer