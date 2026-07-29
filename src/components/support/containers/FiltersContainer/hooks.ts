import { ChangeEvent, useContext } from "react"
import SupportCtx from "../../context"

/**
* Returns props for date range filter inputs
**/
export const useHandleDateRangeFilterInputs = () => {
  const { dateRangeFilter, dispatch } = useContext(SupportCtx)

  const dateOnChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'start' | 'end') => {
    const payload = e.currentTarget.value

    const type = field === 'start' ?
      'SET_DATE_RANGE_FILTER_START' :
      'SET_DATE_RANGE_FILTER_END'

    if(dateRangeFilter[field] !== payload) {
      dispatch({ type, payload })
    }
  }

  const inputProps = {
    start: {
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => dateOnChange(e, 'start'),
      value: dateRangeFilter.start
    },
    end: {
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => dateOnChange(e, 'end'),
      value: dateRangeFilter.end
    }
  }

  return { inputProps }
}

/**
* Returns personnel filter select props
**/
export const useHandlePersonnelFilter = () => {
  const { personnelFilter, dispatch } = useContext(SupportCtx)

  const selectOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const payload = e.currentTarget.value

    if(payload !== personnelFilter) {
      dispatch({ type: 'SET_PERSONNEL_FILTER', payload })
    }
  }

  const selectProps = {
    onChange: selectOnChange,
    value: personnelFilter
  }

  return { selectProps }
}

/**
* Returns search input props
**/
export const useHandleSearch = () => {
  const { searchValue, dispatch } = useContext(SupportCtx)

  const searchOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const payload = e.currentTarget.value

    dispatch({ type: 'SET_SEARCH_VALUE', payload })
  }

  const inputProps = {
    value: searchValue,
    onChange: searchOnChange
  }

  return { inputProps }
}

/**
* Returns clear-all-filters button props, disabled unless at least one filter is active
**/
export const useHandleClearAllFilters = () => {
  const { dateRangeFilter, personnelFilter, searchValue, dispatch } = useContext(SupportCtx)

  const hasActiveFilter = !!dateRangeFilter.start || !!dateRangeFilter.end || !!personnelFilter || !!searchValue

  return {
    onClick: () => dispatch({ type: 'CLEAR_ALL_FILTERS' }),
    disabled: !hasActiveFilter
  }
}
