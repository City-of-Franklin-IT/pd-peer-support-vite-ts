import { useContext } from 'react'
import { MemoryRouter } from 'react-router'
import { screen, render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import * as MockAPI from '@/test/mocks/api'
import RosterCtx, { RosterProvider } from '../../context'

// Components
import RosterContainer from '.'

vi.mock('./hooks', async () => {
  const actual = await vi.importActual('./hooks')
  return {
    ...actual,
    useHandleDeleteBtn: vi.fn(() => ({ onClick: vi.fn(), label: '' })),
    useScrollToRef: vi.fn()
  }
})

vi.mock('@/components/roster/forms/create/CreateRosterPersonnelForm/hooks', async () => {
  const actual = await vi.importActual('@/components/roster/forms/create/CreateRosterPersonnelForm/hooks')
  return {
    ...actual,
    useHandleFormSubmit: vi.fn()
  }
})

const mockPersonnel = Array.from({ length: 10 }).map(() => MockAPI.createMockPersonnel())

describe('RosterContainer', () => {

  describe('CreateBtn', () => {
    it('Sets formType to "CreateRosterPersonnel" on click', async () => {
      const TestComponent = ({ children }: { children: React.ReactNode }) => {
        const { formType } = useContext(RosterCtx)

        const label = `Form Type: ${ formType }`

        return (
          <>
            <span data-testid="test-span">{label}</span>
            {children}
          </>
        )
      }

      render(
        <MemoryRouter>
          <RosterProvider>
            <TestComponent>
              <RosterContainer personnel={mockPersonnel} />
            </TestComponent>
          </RosterProvider>
        </MemoryRouter>
      )

      await userEvent.click(screen.getByRole('button'))

      await waitFor(() => expect(screen.getByTestId('test-span')).toHaveTextContent('Form Type: CreateRosterPersonnel'))
    })
  })

  describe('Form', () => {
    it('Conditionally renders', async () => {
      const TestComponent = ({ children }: { children: React.ReactNode }) => {
        const { formType } = useContext(RosterCtx)

        const label = `Form Type: ${ formType }`

        return (
          <>
            <span data-testid="test-span">{label}</span>
            {children}
          </>
        )
      }

      render(
        <MemoryRouter>
          <RosterProvider>
            <TestComponent>
              <RosterContainer personnel={mockPersonnel} />
            </TestComponent>
          </RosterProvider>
        </MemoryRouter>
      )

      expect(screen.queryByTestId('create-personnel-form')).not.toBeInTheDocument()

      await userEvent.click(screen.getByText('Add Personnel'))

      await waitFor(() => expect(screen.getByTestId('create-personnel-form')).toBeInTheDocument())
    })
  })
})