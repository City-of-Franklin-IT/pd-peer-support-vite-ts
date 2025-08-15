// Types
import { MotionProps } from "motion/react"

export const authHeaders = (token: string | undefined) => {
  const headers = new Headers()

  if(token) {
    headers.append('Authorization', `Bearer ${ token }`)
  }

  return headers
}

export const formatDate = (date: string) => { // Format dates for react hook form
  
  return new Date(date).toISOString().split('T')[0]
}

const slideInLeft: MotionProps = {
  initial: { x: -100, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  transition: { 
    type: "spring",
    stiffness: 100,
    damping: 15,
    mass: 1
  }
}

const slideInRight: MotionProps = {
  initial: { x: 100, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  transition: { 
    type: "spring",
    stiffness: 100,
    damping: 15,
    mass: 1
  }
}

const fadeInOut: MotionProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { 
    opacity: 0,
    transition: {
    duration: 0.25,
    ease: 'easeOut'
    } 
  },
  transition: {
    duration: 0.25,
    ease: 'easeIn'
  }
}

export const motionProps = {
  slideInLeft,
  slideInRight,
  fadeInOut
}