import { createContext, useReducer } from "react"

type RosterCtx = {
  dispatch: React.Dispatch<RosterAction>
  formType: FormType | undefined
  rosterUUID: string
}

export type FormType =
  | "CreateRosterPersonnel"
  | "UpdateRosterPersonnel"

type RosterState = Omit<RosterCtx, 'dispatch'>

type RosterAction =
  | { type: 'SET_ROSTER_UUID', payload: string }
  | { type: 'SET_FORM_TYPE', payload: FormType | undefined }
  | { type: 'RESET_CTX' }

const initialState: RosterState = {
  formType: undefined,
  rosterUUID: ''
}

const RosterCtx = createContext<RosterCtx>({
  ...initialState,
  dispatch: () => null
})

const RosterReducer = (state: RosterState, action: RosterAction) => {
  
  switch(action.type) {
    case 'SET_ROSTER_UUID':
      return {
        ...state,
        rosterUUID: action.payload
      }
    case 'SET_FORM_TYPE':
      return {
        ...state,
        formType: action.payload
      }
    case 'RESET_CTX':
      return initialState
    default:
      return state
  }
}

export const RosterProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(RosterReducer, initialState)

  return (
    <RosterCtx.Provider value={{ ...state, dispatch }}>
      {children}
    </RosterCtx.Provider>
  )
}

export default RosterCtx