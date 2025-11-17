import React, { ChangeEvent, useContext } from "react"
import SupportCtx from "../../context"

export const useHandleDateRangeFilterInputs = () => {
  const { dateRangeFilter, dispatch } = useContext(SupportCtx)

  const startDateOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const payload = e.currentTarget.value

    dispatch({ type: 'SET_DATE_RANGE_FILTER_START', payload })
  }

  const endDateOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const payload = e.currentTarget.value

    dispatch({ type: 'SET_DATE_RANGE_FILTER_END', payload })
  }

  const clearBtnOnClick = () => {
    dispatch({ type: 'SET_DATE_RANGE_FILTER_START', payload: '' })
    dispatch({ type: 'SET_DATE_RANGE_FILTER_END', payload: '' })
  }

  const clearBtnProps = {
    onClick: clearBtnOnClick,
    disabled: !dateRangeFilter.start || !dateRangeFilter.end
  }

  return { startDateOnChange, endDateOnChange, clearBtnProps }
}

export const useHandlePersonnelFilter = () => {
  const { personnelFilter, dispatch } = useContext(SupportCtx)

  const selectOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const payload = e.currentTarget.value

    dispatch({ type: 'SET_PERSONNEL_FILTER', payload })
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
    onchange: searchOnChange
  }

  const clearBtnProps = { 
    onClick: clearBtnOnClick,
    disabled: !searchValue
  }

  return { inputProps, clearBtnProps }
}