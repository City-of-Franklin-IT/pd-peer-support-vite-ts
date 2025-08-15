import { createContext, useReducer } from "react"

// Types
import { ReactNode, Dispatch } from "react"

export type PagesType =
  | 'Support'
  | 'Create Support'
  | 'Manage Roster'

type HeaderCtx = {
  dispatch: Dispatch<HeaderAction>
  activePage: PagesType | undefined
}

type HeaderState = Omit<HeaderCtx, 'dispatch'>

type HeaderAction =
  | { type: 'SET_ACTIVE_PAGE', payload: PagesType | undefined }

const initialState: HeaderState = {
  activePage: 'Support'
}

const HeaderCtx = createContext<HeaderCtx>({
  ...initialState,
  dispatch: () => null
})

const HeaderReducer = (state: HeaderState, action: HeaderAction) => {

  switch(action.type) {
    case 'SET_ACTIVE_PAGE':
      return {
        ...state,
        activePage: action.payload
      }
    default:
      return state
  }
}

export const HeaderProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(HeaderReducer, initialState)

  return (
    <HeaderCtx.Provider value={{ ...state, dispatch }}>
      {children}
    </HeaderCtx.Provider>
  )
}

export default HeaderCtx