import { useContext, useEffect } from 'react'
import { MemoryRouter } from 'react-router'
import { screen, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import SupportCtx, { SupportProvider } from '../../context';

// Components
import PaginationContainer from '.'

describe('PaginationContainer', () => {
  it('Updates currentPage on change', async () => {

    const TestComponent = ({ children }: { children: React.ReactNode }) => {
      const { currentPage, dispatch } = useContext(SupportCtx)

      const label = `Current Page: ${ currentPage }`

      useEffect(() => {
        dispatch({ type: 'SET_TOTAL_PAGES', payload: 10 })
      }, [])

      return (
        <>
          <span data-testid="test-span">{label}</span>
          {children}
        </>
      )
    }

    render(
      <MemoryRouter>
        <SupportProvider>
          <TestComponent>
            <PaginationContainer />
          </TestComponent>
        </SupportProvider>
      </MemoryRouter>
    )

    expect(screen.getByTestId('test-span')).toHaveTextContent('Current Page: 1')

    await userEvent.click(screen.getByTestId('next-page-btn'))

    await waitFor(() => expect(screen.getByTestId('test-span')).toHaveTextContent('Current Page: 2'))

    await userEvent.click(screen.getByTestId('prev-page-btn'))

    await waitFor(() => expect(screen.getByTestId('test-span')).toHaveTextContent('Current Page: 1'))
  })
})