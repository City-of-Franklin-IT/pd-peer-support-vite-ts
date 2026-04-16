import { renderHook, act } from '@testing-library/react'
import { useContext } from 'react'
import SupportCtx, { SupportProvider } from '../context'

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <SupportProvider>{children}</SupportProvider>
)

describe('SupportContext reducer', () => {
  it('initialises with expected default values', () => {
    const { result } = renderHook(() => useContext(SupportCtx), { wrapper })
    expect(result.current.supportUUID).toBe('')
    expect(result.current.currentPage).toBe(1)
    expect(result.current.totalPages).toBe(1)
    expect(result.current.personnelFilter).toBe('')
    expect(result.current.searchValue).toBe('')
    expect(result.current.dateRangeFilter).toEqual({ start: '', end: '' })
  })

  it('SET_SUPPORT_UUID updates supportUUID', () => {
    const { result } = renderHook(() => useContext(SupportCtx), { wrapper })
    act(() => result.current.dispatch({ type: 'SET_SUPPORT_UUID', payload: 'uuid-123' }))
    expect(result.current.supportUUID).toBe('uuid-123')
  })

  it('SET_CURRENT_PAGE updates currentPage', () => {
    const { result } = renderHook(() => useContext(SupportCtx), { wrapper })
    act(() => result.current.dispatch({ type: 'SET_CURRENT_PAGE', payload: 3 }))
    expect(result.current.currentPage).toBe(3)
  })

  it('SET_TOTAL_PAGES updates totalPages', () => {
    const { result } = renderHook(() => useContext(SupportCtx), { wrapper })
    act(() => result.current.dispatch({ type: 'SET_TOTAL_PAGES', payload: 5 }))
    expect(result.current.totalPages).toBe(5)
  })

  it('SET_PERSONNEL_FILTER updates personnelFilter', () => {
    const { result } = renderHook(() => useContext(SupportCtx), { wrapper })
    act(() => result.current.dispatch({ type: 'SET_PERSONNEL_FILTER', payload: 'alice@franklintn.gov' }))
    expect(result.current.personnelFilter).toBe('alice@franklintn.gov')
  })

  it('SET_SEARCH_VALUE updates searchValue', () => {
    const { result } = renderHook(() => useContext(SupportCtx), { wrapper })
    act(() => result.current.dispatch({ type: 'SET_SEARCH_VALUE', payload: 'wellness' }))
    expect(result.current.searchValue).toBe('wellness')
  })

  it('SET_DATE_RANGE_FILTER_START updates only the start date', () => {
    const { result } = renderHook(() => useContext(SupportCtx), { wrapper })
    act(() => result.current.dispatch({ type: 'SET_DATE_RANGE_FILTER_END', payload: '2024-12-31' }))
    act(() => result.current.dispatch({ type: 'SET_DATE_RANGE_FILTER_START', payload: '2024-01-01' }))
    expect(result.current.dateRangeFilter.start).toBe('2024-01-01')
    expect(result.current.dateRangeFilter.end).toBe('2024-12-31')
  })

  it('SET_DATE_RANGE_FILTER_END updates only the end date', () => {
    const { result } = renderHook(() => useContext(SupportCtx), { wrapper })
    act(() => result.current.dispatch({ type: 'SET_DATE_RANGE_FILTER_START', payload: '2024-01-01' }))
    act(() => result.current.dispatch({ type: 'SET_DATE_RANGE_FILTER_END', payload: '2024-06-30' }))
    expect(result.current.dateRangeFilter.start).toBe('2024-01-01')
    expect(result.current.dateRangeFilter.end).toBe('2024-06-30')
  })

  it('RESET_CTX restores all state to initial values', () => {
    const { result } = renderHook(() => useContext(SupportCtx), { wrapper })
    act(() => result.current.dispatch({ type: 'SET_SUPPORT_UUID', payload: 'uuid-abc' }))
    act(() => result.current.dispatch({ type: 'SET_CURRENT_PAGE', payload: 4 }))
    act(() => result.current.dispatch({ type: 'SET_SEARCH_VALUE', payload: 'test' }))
    act(() => result.current.dispatch({ type: 'RESET_CTX' }))
    expect(result.current.supportUUID).toBe('')
    expect(result.current.currentPage).toBe(1)
    expect(result.current.searchValue).toBe('')
  })
})
