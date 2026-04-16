import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithSupportCtx } from '@test/utils'
import { createSupport } from '@test/mocks/api'
import UpdateSupportForm from '../index'

describe('UpdateSupportForm', () => {
  it('renders the Update Support heading', () => {
    renderWithSupportCtx(<UpdateSupportForm support={undefined} />)
    expect(screen.getByText('Update Support')).toBeInTheDocument()
  })

  it('renders all form fields', () => {
    renderWithSupportCtx(<UpdateSupportForm support={undefined} />)
    expect(screen.getByText(/start date\/time/i)).toBeInTheDocument()
    expect(screen.getByText(/end date\/time/i)).toBeInTheDocument()
    expect(screen.getByText(/designation:/i)).toBeInTheDocument()
    expect(screen.getByText(/type:/i)).toBeInTheDocument()
    expect(screen.getByText(/note:/i)).toBeInTheDocument()
  })

  it('pre-populates fields from the support prop', () => {
    const support = createSupport({
      startDateTime: '2024-06-15T09:00',
      endDateTime: '2024-06-15T10:00',
      supportDesignation: 'FPD Employee',
      supportType: 'Defusing',
      note: 'Test note content',
    })
    renderWithSupportCtx(<UpdateSupportForm support={support} />)
    expect(screen.getByDisplayValue('Test note content')).toBeInTheDocument()
    expect(screen.getByDisplayValue('FPD Employee')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Defusing')).toBeInTheDocument()
  })

  it('renders the Delete Support button', () => {
    renderWithSupportCtx(<UpdateSupportForm support={undefined} />)
    expect(screen.getByRole('button', { name: /delete support/i })).toBeInTheDocument()
  })

  it('changes Delete button label to Confirm Delete on first click', async () => {
    renderWithSupportCtx(<UpdateSupportForm support={undefined} />)
    const deleteBtn = screen.getByRole('button', { name: /delete support/i })
    await userEvent.click(deleteBtn)
    expect(screen.getByRole('button', { name: /confirm delete/i })).toBeInTheDocument()
  })

  it('renders form action buttons', () => {
    renderWithSupportCtx(<UpdateSupportForm support={undefined} />)
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument()
  })
})
