// Types
import { MotionProps } from "motion/react"
import { IPublicClientApplication, AccountInfo } from "@azure/msal-browser"

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

const PEER_SUPPORT_TIME_ZONE = 'America/Chicago'

// Splits a UTC ISO datetime string into its America/Chicago wall-clock date/time parts
const getLocalDateTimeParts = (utcIsoString: string) => {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: PEER_SUPPORT_TIME_ZONE,
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', hour12: false
  }).formatToParts(new Date(utcIsoString)).reduce((acc, part) => ({ ...acc, [part.type]: part.value }), {} as Record<string, string>)

  return parts
}

// Converts a UTC ISO datetime string from the API into an America/Chicago { date, time } pair for display
export const formatDisplayDateTime = (utcIsoString: string) => {
  const parts = getLocalDateTimeParts(utcIsoString)

  return {
    date: `${ parts.year }-${ parts.month }-${ parts.day }`,
    time: `${ parts.hour }:${ parts.minute }`
  }
}

// Converts a UTC ISO datetime string from the API into an America/Chicago value for <input type="datetime-local">
export const toDatetimeLocalValue = (utcIsoString: string) => {
  const parts = getLocalDateTimeParts(utcIsoString)

  return `${ parts.year }-${ parts.month }-${ parts.day }T${ parts.hour }:${ parts.minute }`
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

export type MotionPropsType =
  | 'slideInLeft'
  | 'slideInRight'
  | 'fadeInOut'

export const motionPropsMap = new Map<MotionPropsType, MotionProps>([
  ['slideInLeft', slideInLeft],
  ['slideInRight', slideInRight],
  ['fadeInOut', fadeInOut]
])

export const getUserDepartment = async (instance: IPublicClientApplication, activeAccount: AccountInfo) => {
  const graphConfig = {
    graphMeEndpoint: 'https://graph.microsoft.com/v1.0/me?$select=department',
    scopes: ['User.Read']
  }

  const accessTokenRequest = {
    scopes: graphConfig.scopes,
    account: activeAccount
  }

  const result = await instance.acquireTokenSilent(accessTokenRequest)
  const accessToken = result.accessToken

  const headers = new Headers()
  headers.append('Authorization', `Bearer ${ accessToken }`)
  const response = await fetch(graphConfig.graphMeEndpoint, { headers })
  const data = await response.json()

  return data.department
}