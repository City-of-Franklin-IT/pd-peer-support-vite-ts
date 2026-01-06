import { useHandleDateRangeFilterInputs, useHandlePersonnelFilter, useHandleSearch } from "./hooks"

// Components
import * as CreatePersonnelForm from '../../forms/create/CreatePersonnelForm/components'

export const DateRangeFilterInputs = () => {
  const { inputProps, clearBtnProps } = useHandleDateRangeFilterInputs()

  return (
    <div className="flex flex-col gap-2 items-center p-3 pb-4 border-1 border-b-3 border-r-3 border-neutral-content rounded-lg bg-neutral/50 w-full shadow-xl">
      <span className="text-neutral-content uppercase font-bold">Date Range Filter</span>
      <div className="flex items-center gap-4 font-[play] px-2 justify-center flex-wrap">
        <DateRangeInput { ...inputProps.start }>
          Start:
        </DateRangeInput>
        <DateRangeInput { ...inputProps.end }>
          End:
        </DateRangeInput>
      </div>
      <ClearFilterBtn { ...clearBtnProps } />
    </div>
  )
}

export const PersonnelFilter = () => {
  const { selectProps, clearBtnProps } = useHandlePersonnelFilter()

  return (
    <div className="flex flex-col gap-2 items-center p-3 pb-4 border-1 border-b-3 border-r-3 border-neutral-content rounded-lg bg-neutral/50 shadow-xl w-full">
      <h3 className="text-neutral-content uppercase font-bold">Personnel Filter</h3>
        <select
          data-testid="personnel-select"
          className="select mx-auto w-[90%] hover:cursor-pointer"
          { ...selectProps }>
            <CreatePersonnelForm.PersonnelOptions />
        </select>
        <ClearFilterBtn { ...clearBtnProps } />
    </div>
  )
}

export const Search = () => {
  const { inputProps, clearBtnProps } = useHandleSearch()

  return (
    <div className="flex flex-col gap-2 items-center p-6 pb-4 border-1 border-b-3 border-r-3 border-neutral-content rounded-lg bg-neutral/50 w-full shadow-xl">
      <span className="text-neutral-content uppercase font-bold">Search</span>

      <input
        data-testid="search-input" 
        type="text"
        className="input"
        placeholder="by peer support note.."
        { ...inputProps } />
      <ClearFilterBtn { ...clearBtnProps } />
    </div>
  )
}

type DateRangeInputProps = { onChange: React.ChangeEventHandler<HTMLInputElement>, value: string, children: React.ReactNode }

const DateRangeInput = (props: DateRangeInputProps) => {
  const { children, ...inputProps } = props

  return (
    <div className="flex gap-2 items-center font-[play]">
      <label className="label text-neutral-content">{children}</label>
      <input
        type="date"
        className="input hover:cursor-pointer" 
        { ...inputProps } />
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
      { ...props }>
        Clear
    </button>
  )
}