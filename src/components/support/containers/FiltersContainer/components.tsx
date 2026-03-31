import { useHandleDateRangeFilterInputs, useHandlePersonnelFilter, useHandleSearch } from "./hooks"

// Components
import * as CreatePersonnelForm from '../../forms/create/CreatePersonnelForm/components'

export const DateRangeFilterInputs = () => {
  const { inputProps, clearBtnProps } = useHandleDateRangeFilterInputs()

  return (
    <div className="flex flex-col gap-1 items-center w-full md:w-xs">
      <span className="text-secondary font-[play] uppercase underline">Date Range Filter</span>
      <div className="flex items-center gap-4 font-[play] px-2 justify-center flex-wrap w-full md:flex-nowrap">
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
    <div className="flex flex-col gap-1 items-center w-full md:w-55">
      <span className="text-secondary font-[play] uppercase underline">Personnel Filter</span>
      <select
        data-testid="personnel-select"
        className="select select-sm text-neutral-content mx-auto truncate bg-neutral hover:cursor-pointer w-full"
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
    <div className="flex flex-col gap-1 items-center w-full md:w-55">
      <span className="text-secondary font-[play] uppercase underline">Search</span>
      <input
        data-testid="search-input"
        type="text"
        className="input input-sm text-neutral-content bg-neutral w-full"
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
    <div className="flex flex-row gap-2 items-center flex-1 font-[play]">
      <label className="label text-sm text-neutral-content">{children}</label>
      <input
        data-testid="date-range-input"
        type="date"
        className="input input-sm text-neutral-content bg-neutral hover:cursor-pointer w-full"
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