import { useContext } from 'react'
import { MemoryRouter } from 'react-router'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import * as MockAPI from '@/test/mocks/api'
import SupportCtx, { SupportProvider } from '../../context'
import { useGetSupport } from './hooks'

// Types
import { UseQueryResult } from 'react-query'
import * as AppTypes from '@/context/App/types'

// Components
import SupportContainer from '.'

const mockSupport = Array.from({ length: 10 }).map(() => MockAPI.createMockSupport())

vi.mock('@/pages/Roster/hooks', () => ({
  useGetRosterPersonnel: vi.fn(() => ({ isSuccess: true }))
}))

vi.mock('./hooks', () => ({
  useScrollToRef: vi.fn(),
  useGetSupport: vi.fn()
}))

describe('SupportContainer', () => {
  it('Conditionally renders Form', async () => {
    vi.mocked(useGetSupport).mockReturnValue({
      data: {
        data: mockSupport[0]
      }
    } as UseQueryResult<AppTypes.ServerResponse & { data: AppTypes.SupportInterface }>)

    const TestComponent = ({ children }: { children: React.ReactNode }) => {
      const { supportUUID, dispatch } = useContext(SupportCtx)

      const onClick = () => {
        dispatch({ type: 'SET_SUPPORT_UUID', payload: 'ABC123' })
      }

      return (
        <>
          <span data-testid="test-span">{supportUUID}</span>
          <button
            data-testid="test-button" 
            type="button"
            onClick={onClick}>
              Click Me!
          </button>
          {children}
        </>
      )
    }

    render(
      <MemoryRouter>
        <SupportProvider>
          <TestComponent>
            <SupportContainer support={mockSupport} />
          </TestComponent>
        </SupportProvider>
      </MemoryRouter>
    )

    expect(screen.queryByTestId('get-support')).not.toBeInTheDocument()

    await userEvent.click(screen.getByTestId('test-button'))

    await waitFor(() => expect(screen.getByTestId('get-support')).toBeInTheDocument())
  })
})