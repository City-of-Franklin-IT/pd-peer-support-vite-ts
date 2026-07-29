import { useHandleClearAllFilters, useHandleDateRangeFilterInputs, useHandlePersonnelFilter, useHandleSearch } from "./hooks"

// Components
import * as CreatePersonnelForm from '../../forms/create/CreatePersonnelForm/components'

export const DateRangeFilterInputs = () => {
  const { inputProps } = useHandleDateRangeFilterInputs()

  return (
    <div className="flex flex-col gap-1 items-center w-full md:w-xs">
      <span className="text-neutral-content/50 font-[play] font-bold">Date Range Filter</span>
      <div className="flex items-center gap-4 font-[play] px-2 justify-center flex-wrap w-full md:flex-nowrap">
        <DateRangeInput { ...inputProps.start }>
          Start:
        </DateRangeInput>
        <DateRangeInput { ...inputProps.end }>
          End:
        </DateRangeInput>
      </div>
    </div>
  )
}

export const PersonnelFilter = () => {
  const { selectProps } = useHandlePersonnelFilter()

  return (
    <div className="flex flex-col gap-1 items-center w-full md:w-55">
      <span className="text-neutral-content/50 font-[play] font-bold mr-auto">Personnel Filter</span>
      <select
        data-testid="personnel-select"
        className="select select-sm text-neutral-content mx-auto truncate bg-neutral hover:cursor-pointer w-full"
        { ...selectProps }>
          <CreatePersonnelForm.PersonnelOptions />
      </select>
    </div>
  )
}

export const Search = () => {
  const { inputProps } = useHandleSearch()

  return (
    <div className="flex flex-col gap-1 items-center w-full md:w-55">
      <span className="text-neutral-content/50 font-[play] font-bold mr-auto">Search</span>
      <input
        data-testid="search-input"
        type="text"
        className="input input-sm text-neutral-content bg-neutral w-full"
        placeholder="by peer support note.."
        { ...inputProps } />
    </div>
  )
}

export const ClearAllFiltersBtn = () => {
  const clearBtnProps = useHandleClearAllFilters()

  return <ClearFilterBtn { ...clearBtnProps } />
}

type DateRangeInputProps = {
  onChange: React.ChangeEventHandler<HTMLInputElement>
  value: string
  children: React.ReactNode
}

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

type ClearFilterBtnProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>
  disabled: boolean
}

const ClearFilterBtn = (props: ClearFilterBtnProps) => (
  <button
    data-testid="clear-filter-btn"
    type="button"
    className="btn btn-secondary btn-sm btn-wide font-[play] uppercase"
    disabled={props.disabled}
    onClick={props.onClick}>
      Clear All
  </button>
)
