import React, { useContext } from 'react'
import { MemoryRouter } from 'react-router'
import { screen, render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as MockAPI from '@/test/mocks/api'
import RosterCtx, { RosterProvider } from '../../context'

// Components
import PersonnelTable from '.'

const mockPersonnel = MockAPI.createMockPersonnel({ uuid: 'ABC123' })

describe('PersonnelTable', () => {

  describe('TableRow', () => {
    it('Updates formType and rosterUUID on click', async () => {

      const TestComponent = ({ children }: { children: React.ReactNode }) => {
        const { formType, rosterUUID } = useContext(RosterCtx)

        const label = `Form Type: ${ formType }, Roster UUID: ${ rosterUUID }`

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
              <PersonnelTable personnel={[mockPersonnel]} />
            </TestComponent>
          </RosterProvider>
        </MemoryRouter>
      )

      await userEvent.click(screen.getAllByRole('row')[1])

      await waitFor(() => expect(screen.getByTestId('test-span')).toHaveTextContent('Form Type: UpdateRosterPersonnel, Roster UUID: ABC123'))
    })
  })
})