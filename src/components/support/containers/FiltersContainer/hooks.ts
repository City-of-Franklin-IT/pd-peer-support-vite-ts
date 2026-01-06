import { ChangeEvent, useContext } from "react"
import SupportCtx from "../../context"

/**
* Returns props for date range filter inputs; clear date range filter button props
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

  const clearBtnOnClick = () => {
    dispatch({ type: 'SET_DATE_RANGE_FILTER_START', payload: '' })
    dispatch({ type: 'SET_DATE_RANGE_FILTER_END', payload: '' })
  }

  const clearBtnProps = {
    onClick: clearBtnOnClick,
    disabled: !dateRangeFilter.start || !dateRangeFilter.end
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

  return { inputProps, clearBtnProps }
}

/**
* Returns personnel filter select props; clear personnel filter button props
**/
export const useHandlePersonnelFilter = () => {
  const { personnelFilter, dispatch } = useContext(SupportCtx)

  const selectOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const payload = e.currentTarget.value

    if(payload !== personnelFilter) {
      dispatch({ type: 'SET_PERSONNEL_FILTER', payload })
    }
  }

  const clearBtnOnClick = () => {
    dispatch({ type: 'SET_PERSONNEL_FILTER', payload: '' })
  }

  const selectProps = {
    onChange: selectOnChange,
    value: personnelFilter
  }

  const clearBtnProps = {
    onClick: clearBtnOnClick,
    disabled: !personnelFilter
  }

  return { selectProps, clearBtnProps }
}

/**
* Returns search input props; clear search button props
**/
export const useHandleSearch = () => {
  const { searchValue, dispatch } = useContext(SupportCtx)

  const searchOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const payload = e.currentTarget.value

    dispatch({ type: 'SET_SEARCH_VALUE', payload })
  }

  const clearBtnOnClick = () => {
    dispatch({ type: 'SET_SEARCH_VALUE', payload: '' })
  }

  const inputProps = {
    value: searchValue,
    onChange: searchOnChange
  }

  const clearBtnProps = { 
    onClick: clearBtnOnClick,
    disabled: !searchValue
  }

  return { inputProps, clearBtnProps }
}