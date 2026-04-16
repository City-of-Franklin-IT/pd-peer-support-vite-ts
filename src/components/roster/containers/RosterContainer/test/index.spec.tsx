import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithRosterCtx } from '@test/utils'
import { createPersonnelRoster } from '@test/mocks/api'
import RosterContainer from '../index'

describe('RosterContainer', () => {
  it('renders the Manage Support Personnel heading', () => {
    renderWithRosterCtx(<RosterContainer personnel={[]} />)
    expect(screen.getByText('Manage Support Personnel')).toBeInTheDocument()
  })

  it('renders the Add Personnel button', () => {
    renderWithRosterCtx(<RosterContainer personnel={[]} />)
    expect(screen.getByRole('button', { name: /add personnel/i })).toBeInTheDocument()
  })

  it('renders the personnel table with provided data', () => {
    const personnel = [
      createPersonnelRoster({ uuid: '1', email: 'alice@franklintn.gov' }),
    ]
    renderWithRosterCtx(<RosterContainer personnel={personnel} />)
    expect(screen.getByText('alice@franklintn.gov')).toBeInTheDocument()
  })

  it('does not show a form initially', () => {
    renderWithRosterCtx(<RosterContainer personnel={[]} />)
    expect(screen.queryByTestId('create-personnel-form')).not.toBeInTheDocument()
  })

  it('shows the create form after clicking Add Personnel', async () => {
    renderWithRosterCtx(<RosterContainer personnel={[]} />)
    await userEvent.click(screen.getByRole('button', { name: /add personnel/i }))
    expect(screen.getByTestId('create-personnel-form')).toBeInTheDocument()
  })

  it('shows the create form with an email input after clicking Add Personnel', async () => {
    renderWithRosterCtx(<RosterContainer personnel={[]} />)
    await userEvent.click(screen.getByRole('button', { name: /add personnel/i }))
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('shows the update form area after clicking a personnel row', async () => {
    const personnel = [createPersonnelRoster({ uuid: 'row-uuid', email: 'alice@franklintn.gov' })]
    renderWithRosterCtx(<RosterContainer personnel={personnel} />)
    const rows = screen.getAllByRole('row')
    await userEvent.click(rows[1])
    // Update path shows HandleLoading → Loading spinner (query disabled in tests)
    expect(screen.getByAltText('loading icon')).toBeInTheDocument()
  })
})
