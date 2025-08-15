import { useContext, useState, useMemo, useLayoutEffect } from "react"
import SupportCtx from "../../context"

// Types
import * as AppTypes from '@/context/App/types'

export const useOnTableRowClick = (uuid: string) => {
  const { dispatch } = useContext(SupportCtx)

  return () => dispatch({ type: 'SET_SUPPORT_UUID', payload: uuid })
}

export const useSetTableData = (support: AppTypes.SupportInterface[]) => {
  const { dateRangeFilter, personnelFilter, searchValue, currentPage } = useContext(SupportCtx)

  let supportArray = support

  return useMemo(() => {
    if(dateRangeFilter.start && dateRangeFilter.end) { // Date range filter
      const startDate = new Date(dateRangeFilter.start)
      const endDate = new Date(dateRangeFilter.end)

      supportArray = supportArray.filter(support => {
        const supportDate = new Date(support.startDateTime)

        if(supportDate >= startDate && supportDate <= endDate) {
          return support
        }
      })
    }

    if(personnelFilter) { // Personnel filter
      supportArray = supportArray.filter(support => 
        support?.Personnel?.some(person => person.email === personnelFilter)
      )
    }

    if(searchValue) { // Search value
      supportArray = supportArray.filter(support => {
        const regex = new RegExp(searchValue, 'i')

        return regex.test(support.note ?? '')
      })
    }

    const startIndex = (currentPage - 1) * 25
    const endIndex = currentPage * 25

    return supportArray.slice(startIndex, endIndex)
  }, [supportArray, dateRangeFilter, personnelFilter, searchValue, currentPage])
}

export const useSetColumnVisibility = () => { // Hide cols on smaller display sizes
  const [state, setState] = useState<{ visible: boolean }>({ visible: false })

  useLayoutEffect(() => {
    const updateVisibility = () => {
      setState({ visible: window.innerWidth >= 1024 })
    }

    updateVisibility()

    window.addEventListener('resize', updateVisibility)

    return () => window.removeEventListener('resize', updateVisibility)
  }, [])

  return state.visible
}