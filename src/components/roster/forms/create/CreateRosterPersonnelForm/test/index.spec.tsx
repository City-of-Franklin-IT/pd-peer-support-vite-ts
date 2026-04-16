import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithRosterCtx } from '@test/utils'
import CreateRosterPersonnelForm from '../index'

describe('CreateRosterPersonnelForm', () => {
  it('renders the email label and input', () => {
    renderWithRosterCtx(<CreateRosterPersonnelForm />)
    expect(screen.getByText(/email:/i)).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('renders Cancel, Reset, and Save buttons', () => {
    renderWithRosterCtx(<CreateRosterPersonnelForm />)
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /reset/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument()
  })

  it('shows a required error when the email field is blurred empty', async () => {
    renderWithRosterCtx(<CreateRosterPersonnelForm />)
    const input = screen.getByRole('textbox')
    await userEvent.click(input)
    await userEvent.tab()
    expect(await screen.findByText('Email is required')).toBeInTheDocument()
  })

  it('shows a format error when an invalid email is entered', async () => {
    renderWithRosterCtx(<CreateRosterPersonnelForm />)
    const input = screen.getByRole('textbox')
    await userEvent.type(input, 'not-an-email')
    await userEvent.tab()
    expect(
      await screen.findByText('Please enter a valid email address')
    ).toBeInTheDocument()
  })

  it('does not show a validation error for a valid email', async () => {
    renderWithRosterCtx(<CreateRosterPersonnelForm />)
    const input = screen.getByRole('textbox')
    await userEvent.type(input, 'jane.doe@franklintn.gov')
    await userEvent.tab()
    expect(screen.queryByText('Email is required')).not.toBeInTheDocument()
    expect(screen.queryByText('Please enter a valid email address')).not.toBeInTheDocument()
  })
})
