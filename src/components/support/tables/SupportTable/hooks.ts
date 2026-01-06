import { useContext, useState, useMemo, useLayoutEffect } from "react"
import SupportCtx from "../../context"

// Types
import * as AppTypes from '@/context/App/types'

/**
* Returns paginated peer support table data; applies filtering when applicable
**/
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

/**
* Returns column visibility boolean; hides columns on smaller devices
**/
export const useSetColumnVisibility = () => {
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

/**
* Returns table row props className and onClick handler
**/
export const useHandleTableRow = (uuid: string, index: number) => {
  const onTableRowClick = useOnTableRowClick(uuid)
  const visible = useSetColumnVisibility()
  const bgColor = index % 2 === 0 ? 'bg-neutral/20' : null

  const rowClassName = `border-0 border-t-1 border-neutral-content whitespace-nowrap hover:cursor-pointer hover:bg-neutral ${ bgColor }`
  const noteClassName = `${ !visible ? 'hidden' : 'p-6 text-center block' }`

  const tableRowProps = {
    onClick: onTableRowClick,
    className: rowClassName
  }

  return { tableRowProps, noteClassName }
}

/**
* Returns table row onClick handler
**/
const useOnTableRowClick = (uuid: string) => {
  const { dispatch } = useContext(SupportCtx)

  return () => dispatch({ type: 'SET_SUPPORT_UUID', payload: uuid })
}