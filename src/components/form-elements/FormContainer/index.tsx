import { motion } from 'motion/react'
import { motionProps } from '@/helpers/utils'
import cofIcon from '@/assets/icons/cof/cof.svg'
import styles from './FormContainer.module.css'

function FormContainer({ children }: { children: React.ReactNode }) {

  return (
    <motion.div 
      className="relative flex flex-col bg-neutral/20 overflow-hidden px-15 pb-10 m-auto shadow-xl w-full"
      { ...motionProps.fadeInOut }>
        <img src={cofIcon} className={styles.icon} />
        {children}
    </motion.div>
  )
}

export default FormContainer