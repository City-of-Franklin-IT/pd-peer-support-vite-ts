import { useContext, useEffect } from 'react'
import { BrowserRouter } from 'react-router'
import { screen, render, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { useGetRosterPersonnel } from '@/pages/Roster/hooks'
import SupportCtx, { SupportProvider } from '../../context'

// Types
import { UseQueryResult } from 'react-query'
import * as AppTypes from '@/context/App/AppTypes'

// Components
import * as Components from './components'

vi.mock('@/pages/Roster/hooks', async () => {
  const actual = vi.importActual('@/pages/Roster/hooks')
  return {
    ...actual,
    useGetRosterPersonnel: vi.fn(() => ({ isSuccess: true }))
  }
})

vi.mock('@/components/support/forms/create/CreatePersonnelForm/components', ()=> ({
  PersonnelOptions: () => (<option value="test.o365-3@franklintn.gov"></option>)
}))

describe('FiltersContainer', () => {

  describe('DateRangeFilterInputs', () => {
    it('Updates dateRangeFilter in SupportCtx on change', async () => {
      const TestComponent = () => {
        const { dateRangeFilter } = useContext(SupportCtx)

        const label = `Start: ${ dateRangeFilter.start }`

        return (
          <>
            <span data-testid="test-span">{label}</span>
            <Components.DateRangeFilterInputs />
          </>
        )
      }

      render(
        <SupportProvider>
          <TestComponent />
        </SupportProvider>
      )

      await userEvent.type(screen.getByTestId('start-input'), '2025-08-14')

      await waitFor(() => expect(screen.getByTestId('test-span')).toHaveTextContent('Start: 2025-08-14'))
    })
  })

  describe('ClearFilterBtn', () => {
    it('Clears dateRangeFilter in SupportCtx on click', async () => {
      const TestComponent = ({ children }: { children: React.ReactNode }) => {
        const { dateRangeFilter, dispatch } = useContext(SupportCtx)

        const label = `Start: ${ dateRangeFilter.start }`
        
        useEffect(() => {
          dispatch({ type: 'SET_DATE_RANGE_FILTER_START', payload: '2025-08-14' })
        }, [])

        return (
          <>
            <span data-testid="test-span">{label}</span>
            {children}
          </>
        )
      }

      render(
        <SupportProvider>
          <TestComponent>
            <Components.DateRangeFilterInputs />
          </TestComponent>
        </SupportProvider>
      )

      expect(screen.getByTestId('test-span')).toHaveTextContent('Start: 2025-08-14')

      await userEvent.click(screen.getByRole('button'))

      await waitFor(() => expect(screen.getByTestId('test-span')).toHaveTextContent('Start: '))
    })
  })

  describe('PersonnelFilter', () => {
    it('Updates personnelFilter in SupportCtx on change', async () => {
      const TestComponent = ({ children }: { children: React.ReactNode }) => {
        const { personnelFilter } = useContext(SupportCtx)

        const label = `Personnel: ${ personnelFilter }`

        return (
          <>
            <span data-testid="test-span">{label}</span>
            {children}
          </>
        )
      }

      render(
        <BrowserRouter>
          <SupportProvider>
            <TestComponent>
              <Components.PersonnelFilter />
            </TestComponent>
          </SupportProvider>
        </BrowserRouter>
      )

      await userEvent.selectOptions(screen.getByTestId('personnel-select'), 'test.o365-3@franklintn.gov')

      await waitFor(() => expect(screen.getByTestId('test-span')).toHaveTextContent('Personnel: test.o365-3@franklintn.gov'))
    })

    it('Conditionally renders the select element', async () => {
      vi.mocked(useGetRosterPersonnel).mockReturnValue({ 
        isSuccess: false 
      } as UseQueryResult<AppTypes.ServerResponse & { data: AppTypes.PersonnelRosterInterface[] }>)

      const TestComponent = ({ children }: { children: React.ReactNode }) => {
      
        return (
          <>
            <span data-testid="test-span"></span>
            {children}
          </>
        )
      }

      render(
        <BrowserRouter>
          <SupportProvider>
            <TestComponent>
              <Components.PersonnelFilter />
            </TestComponent>
          </SupportProvider>
        </BrowserRouter>
      )

      expect(screen.getByAltText('loading icon')).toBeInTheDocument()
    })
  })

  describe('Search', () => {
    it('Updates searchValue in SupportCtx on change', async () => {
      const TestComponent = ({ children }: { children: React.ReactNode }) => {
        const { searchValue } = useContext(SupportCtx)

        const label = `Search Value: ${ searchValue }`
      
        return (
          <>
            <span data-testid="test-span">{label}</span>
            {children}
          </>
        )
      }

      render(
        <BrowserRouter>
          <SupportProvider>
            <TestComponent>
              <Components.Search />
            </TestComponent>
          </SupportProvider>
        </BrowserRouter>
      )

      await userEvent.type(screen.getByTestId('search-input'), 'ABC123')

      await waitFor(() => expect(screen.getByTestId('test-span')).toHaveTextContent('Search Value: ABC123'))
    })
  })
})