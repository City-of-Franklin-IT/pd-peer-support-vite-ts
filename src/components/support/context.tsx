import { createContext, useReducer } from "react"

type SupportCtx = {
  dispatch: React.Dispatch<SupportAction>
  dateRangeFilter: {
    start: string
    end: string
  },
  currentPage: number
  personnelFilter: string
  searchValue: string
  supportUUID: string
  totalPages: number
}

type SupportState = Omit<SupportCtx, 'dispatch'>

type SupportAction =
  | { type: 'SET_SUPPORT_UUID', payload: string }
  | { type: 'SET_DATE_RANGE_FILTER_START', payload: string }
  | { type: 'SET_DATE_RANGE_FILTER_END', payload: string }
  | { type: 'SET_PERSONNEL_FILTER', payload: string }
  | { type: 'SET_SEARCH_VALUE', payload: string }
  | { type: 'SET_TOTAL_PAGES', payload: number }
  | { type: 'SET_CURRENT_PAGE', payload: number }
  | { type: 'RESET_CTX' }

const initialState: SupportState = {
  dateRangeFilter: {
    start: '',
    end: ''
  },
  currentPage: 1,
  supportUUID: '',
  personnelFilter: '',
  searchValue: '',
  totalPages: 1
}

const SupportCtx = createContext<SupportCtx>({
  ...initialState,
  dispatch: () => null
})

const SupportReducer = (state: SupportState, action: SupportAction) => {
  
  switch(action.type) {
    case 'SET_SUPPORT_UUID':
      return {
        ...state,
        supportUUID: action.payload
      }
    case 'SET_DATE_RANGE_FILTER_START':
      return {
        ...state,
        dateRangeFilter: {
          start: action.payload,
          end: state.dateRangeFilter.end
        }
      }
    case 'SET_DATE_RANGE_FILTER_END':
      return {
        ...state,
        dateRangeFilter: {
          start: state.dateRangeFilter.start,
          end: action.payload
        }
      }
    case 'SET_PERSONNEL_FILTER':
      return {
        ...state,
        personnelFilter: action.payload
      }
    case 'SET_SEARCH_VALUE':
      return {
        ...state,
        searchValue: action.payload
      }
    case 'SET_TOTAL_PAGES':
      return {
        ...state,
        totalPages: action.payload
      }
    case 'SET_CURRENT_PAGE':
      return {
        ...state,
        currentPage: action.payload
      }
    case 'RESET_CTX':
      return initialState
    default:
      return state
  }
}

export const SupportProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(SupportReducer, initialState)

  return (
    <SupportCtx.Provider value={{ ...state, dispatch }}>
      {children}
    </SupportCtx.Provider>
  )
}

export default SupportCtx