import { screen } from '@testing-library/react'
import { renderWithRosterCtx } from '@test/utils'
import { createPersonnelRoster } from '@test/mocks/api'
import UpdateRosterPersonnelForm from '../index'

describe('UpdateRosterPersonnelForm', () => {
  it('renders the Update Personnel heading', () => {
    renderWithRosterCtx(<UpdateRosterPersonnelForm personnel={undefined} />)
    expect(screen.getByText('Update Personnel')).toBeInTheDocument()
  })

  it('renders the email input', () => {
    renderWithRosterCtx(<UpdateRosterPersonnelForm personnel={undefined} />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('pre-populates the email field with the personnel email', () => {
    const personnel = createPersonnelRoster({ email: 'alice@franklintn.gov' })
    renderWithRosterCtx(<UpdateRosterPersonnelForm personnel={personnel} />)
    expect(screen.getByRole<HTMLInputElement>('textbox').value).toBe('alice@franklintn.gov')
  })

  it('renders Cancel, Reset, and Save buttons', () => {
    renderWithRosterCtx(<UpdateRosterPersonnelForm personnel={undefined} />)
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /reset/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument()
  })
})
