import { useContext } from "react"
import SupportCtx from "../../context"
import Loading from "@/components/layout/loading/Loading"
import { useGetRosterPersonnel } from "@/pages/Roster/hooks"

// Components
import * as CreatePersonnelForm from '../../forms/create/CreatePersonnelForm/components'

export const DateRangeFilterInputs = () => {
  const { dateRangeFilter, dispatch } = useContext(SupportCtx)

  return (
    <div className="flex flex-col gap-2 items-center p-3 pb-4 border-1 border-b-3 border-r-3 border-neutral-content rounded-lg bg-neutral/50 w-full shadow-xl">
      <span className="text-neutral-content uppercase font-bold">Date Range Filter</span>
      <div className="flex items-center gap-4 font-[play] px-2 justify-center flex-wrap">
        <DateRangeStartInput />
        <DateRangeEndInput />
      </div>
      <ClearFilterBtn
        onClick={() => {
          dispatch({ type: 'SET_DATE_RANGE_FILTER_START', payload: '' })
          dispatch({ type: 'SET_DATE_RANGE_FILTER_END', payload: '' })
        }}
        disabled={!dateRangeFilter.start || !dateRangeFilter.end} />
    </div>
  )
}

export const PersonnelFilter = () => {
  const { personnelFilter, dispatch } = useContext(SupportCtx)

  const { isSuccess } = useGetRosterPersonnel()

  return (
    <div className="flex flex-col gap-2 items-center p-3 pb-4 border-1 border-b-3 border-r-3 border-neutral-content rounded-lg bg-neutral/50 shadow-xl w-full">
      <h3 className="text-neutral-content uppercase font-bold">Personnel Filter</h3>

      {!isSuccess ? <Loading /> : (
        <>
          <select
            data-testid="personnel-select"
            className="select mx-auto w-[90%] hover:cursor-pointer"
            value={personnelFilter}
            onChange={(e) => dispatch({ type: 'SET_PERSONNEL_FILTER', payload: e.currentTarget.value })}>
              <CreatePersonnelForm.PersonnelOptions />
          </select>
          <ClearFilterBtn
            onClick={() => dispatch({ type: 'SET_PERSONNEL_FILTER', payload: '' })}
            disabled={!personnelFilter} />
        </>
      )}
      
    </div>
  )
}

export const Search = () => {
  const { searchValue, dispatch } = useContext(SupportCtx)

  return (
    <div className="flex flex-col gap-2 items-center p-6 pb-4 border-1 border-b-3 border-r-3 border-neutral-content rounded-lg bg-neutral/50 w-full shadow-xl">
      <span className="text-neutral-content uppercase font-bold">Search</span>

      <input
        data-testid="search-input" 
        type="text"
        className="input"
        placeholder="by peer support note.."
        value={searchValue}
        onChange={(e) => dispatch({ type: 'SET_SEARCH_VALUE', payload: e.currentTarget.value })} />
      <ClearFilterBtn
        onClick={() => dispatch({ type: 'SET_SEARCH_VALUE', payload: '' })}
        disabled={!searchValue} />
    </div>
  )
}

const DateRangeStartInput = () => {
  const { dispatch } = useContext(SupportCtx)

  return (
    <div className="flex gap-2 items-center font-[play]">
      <label className="label text-neutral-content">Start:</label>
      <input
        data-testid="start-input" 
        type="date"
        className="input hover:cursor-pointer" 
        onChange={(e) => dispatch({ type: 'SET_DATE_RANGE_FILTER_START', payload: e.currentTarget.value })}/>
    </div>
  )
}

const DateRangeEndInput = () => {
  const { dispatch } = useContext(SupportCtx)

  return (
    <div className="flex gap-2 items-center font-[play]">
      <label className="label text-neutral-content">End:</label>
      <input 
        type="date"
        className="input hover:cursor-pointer" 
        onChange={(e) => dispatch({ type: 'SET_DATE_RANGE_FILTER_END', payload: e.currentTarget.value })}/>
    </div>
  )
}

type ClearFilterBtnProps = { onClick: React.MouseEventHandler<HTMLButtonElement>, disabled: boolean }

const ClearFilterBtn = (props: ClearFilterBtnProps) => {

  return (
    <button
      data-testid="clear-filter-btn" 
      type="button"
      className="btn btn-secondary btn-sm font-[play] uppercase w-full"
      disabled={props.disabled}
      onClick={props.onClick}>
        Clear
    </button>
  )
}