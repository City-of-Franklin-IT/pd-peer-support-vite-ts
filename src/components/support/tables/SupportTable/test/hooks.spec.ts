import { createElement } from 'react'
import { renderHook } from '@testing-library/react'
import { ReactNode } from 'react'
import SupportCtx from '@/components/support/context'
import { useSetTableData } from '../hooks'
import { createSupport } from '@test/mocks/api'

// Build a wrapper that injects specific context values directly
const makeWrapper = (overrides: Record<string, unknown> = {}) => {
  const value = {
    dateRangeFilter: { start: '', end: '' },
    currentPage: 1,
    personnelFilter: '',
    searchValue: '',
    supportUUID: '',
    totalPages: 1,
    dispatch: vi.fn(),
    ...overrides,
  }
  return ({ children }: { children: ReactNode }) =>
    createElement(SupportCtx.Provider, { value } as any, children)
}

const support = [
  createSupport({
    uuid: '1',
    startDateTime: '2024-03-01T09:00:00.000Z',
    note: 'critical incident debrief',
    Personnel: [{ uuid: 'p1', email: 'alice@franklintn.gov', parentId: '1', createdBy: '', createdAt: '', updatedBy: '', updatedAt: '' }],
  }),
  createSupport({
    uuid: '2',
    startDateTime: '2024-06-15T09:00:00.000Z',
    note: 'routine wellness check',
    Personnel: [{ uuid: 'p2', email: 'bob@franklintn.gov', parentId: '2', createdBy: '', createdAt: '', updatedBy: '', updatedAt: '' }],
  }),
  createSupport({
    uuid: '3',
    startDateTime: '2024-09-20T09:00:00.000Z',
    note: null,
  }),
]

describe('useSetTableData — no filters', () => {
  it('returns all support entries when no filters are active', () => {
    const { result } = renderHook(() => useSetTableData(support), {
      wrapper: makeWrapper(),
    })
    expect(result.current.filteredCount).toBe(3)
    expect(result.current.tableData).toHaveLength(3)
  })
})

describe('useSetTableData — date range filter', () => {
  it('includes entries within the date range', () => {
    const { result } = renderHook(() => useSetTableData(support), {
      wrapper: makeWrapper({
        dateRangeFilter: { start: '2024-01-01', end: '2024-04-01' },
      }),
    })
    expect(result.current.filteredCount).toBe(1)
    expect(result.current.tableData[0].uuid).toBe('1')
  })

  it('excludes entries outside the date range', () => {
    const { result } = renderHook(() => useSetTableData(support), {
      wrapper: makeWrapper({
        dateRangeFilter: { start: '2024-07-01', end: '2024-12-31' },
      }),
    })
    expect(result.current.filteredCount).toBe(1)
    expect(result.current.tableData[0].uuid).toBe('3')
  })

  it('does not filter when only one date boundary is provided', () => {
    const { result } = renderHook(() => useSetTableData(support), {
      wrapper: makeWrapper({
        dateRangeFilter: { start: '2024-01-01', end: '' },
      }),
    })
    expect(result.current.filteredCount).toBe(3)
  })
})

describe('useSetTableData — personnel filter', () => {
  it('returns only entries that include the filtered personnel', () => {
    const { result } = renderHook(() => useSetTableData(support), {
      wrapper: makeWrapper({ personnelFilter: 'alice@franklintn.gov' }),
    })
    expect(result.current.filteredCount).toBe(1)
    expect(result.current.tableData[0].uuid).toBe('1')
  })

  it('returns no entries when the personnel email matches nobody', () => {
    const { result } = renderHook(() => useSetTableData(support), {
      wrapper: makeWrapper({ personnelFilter: 'unknown@franklintn.gov' }),
    })
    expect(result.current.filteredCount).toBe(0)
  })
})

describe('useSetTableData — search filter', () => {
  it('returns entries whose note matches the search value (case-insensitive)', () => {
    const { result } = renderHook(() => useSetTableData(support), {
      wrapper: makeWrapper({ searchValue: 'critical' }),
    })
    expect(result.current.filteredCount).toBe(1)
    expect(result.current.tableData[0].uuid).toBe('1')
  })

  it('returns no entries when the search value matches nothing', () => {
    const { result } = renderHook(() => useSetTableData(support), {
      wrapper: makeWrapper({ searchValue: 'zzznomatch' }),
    })
    expect(result.current.filteredCount).toBe(0)
  })

  it('search is case-insensitive', () => {
    const { result } = renderHook(() => useSetTableData(support), {
      wrapper: makeWrapper({ searchValue: 'ROUTINE' }),
    })
    expect(result.current.filteredCount).toBe(1)
    expect(result.current.tableData[0].uuid).toBe('2')
  })

  it('treats entries with a null note as non-matching', () => {
    const { result } = renderHook(() => useSetTableData(support), {
      wrapper: makeWrapper({ searchValue: 'incident' }),
    })
    // uuid '3' has note: null, so it should not appear
    expect(result.current.tableData.every(s => s.uuid !== '3')).toBe(true)
  })
})

describe('useSetTableData — pagination', () => {
  const manySupport = Array.from({ length: 30 }, (_, i) =>
    createSupport({ uuid: `s-${i}` })
  )

  it('returns at most 25 entries per page', () => {
    const { result } = renderHook(() => useSetTableData(manySupport), {
      wrapper: makeWrapper({ currentPage: 1 }),
    })
    expect(result.current.tableData).toHaveLength(25)
    expect(result.current.filteredCount).toBe(30)
  })

  it('returns the remaining entries on page 2', () => {
    const { result } = renderHook(() => useSetTableData(manySupport), {
      wrapper: makeWrapper({ currentPage: 2 }),
    })
    expect(result.current.tableData).toHaveLength(5)
  })

  it('returns an empty array when the page is beyond the data', () => {
    const { result } = renderHook(() => useSetTableData(manySupport), {
      wrapper: makeWrapper({ currentPage: 10 }),
    })
    expect(result.current.tableData).toHaveLength(0)
  })
})
