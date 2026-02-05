import { motion } from "motion/react"
import { motionPropsMap } from "@/helpers/utils"

// Types
import { MotionPropsType } from "@/helpers/utils"

function Motion({ animation, children }: { animation: MotionPropsType, children: React.ReactElement }) {

  return (
    <motion.div { ...motionPropsMap.get(animation) }>
      {children}
    </motion.div>
  )
}

export default Motion
