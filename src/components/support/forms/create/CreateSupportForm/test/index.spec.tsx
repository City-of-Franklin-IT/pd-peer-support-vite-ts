import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '@test/utils'
import CreateSupportForm from '../index'

describe('CreateSupportForm', () => {
  it('renders the Create Support heading', () => {
    renderWithProviders(<CreateSupportForm />)
    expect(screen.getByText('Create Support')).toBeInTheDocument()
  })

  it('renders Start Date/Time and End Date/Time inputs', () => {
    renderWithProviders(<CreateSupportForm />)
    expect(screen.getByText(/start date\/time/i)).toBeInTheDocument()
    expect(screen.getByText(/end date\/time/i)).toBeInTheDocument()
  })

  it('renders the Designation select', () => {
    renderWithProviders(<CreateSupportForm />)
    expect(screen.getByText(/designation:/i)).toBeInTheDocument()
    expect(screen.getByText(/select support designation/i)).toBeInTheDocument()
  })

  it('renders the Type select', () => {
    renderWithProviders(<CreateSupportForm />)
    expect(screen.getByText(/type:/i)).toBeInTheDocument()
    expect(screen.getByText(/select support type/i)).toBeInTheDocument()
  })

  it('renders the Note textarea', () => {
    renderWithProviders(<CreateSupportForm />)
    expect(screen.getByText(/note:/i)).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('renders the Support Personnel section', () => {
    renderWithProviders(<CreateSupportForm />)
    expect(screen.getByText('Support Personnel')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /add personnel/i })).toBeInTheDocument()
  })

  it('renders form action buttons', () => {
    renderWithProviders(<CreateSupportForm />)
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument()
  })

  it('shows a validation error on the start date when the field is blurred empty', async () => {
    renderWithProviders(<CreateSupportForm />)
    const inputs = screen.getAllByDisplayValue('')
    const startInput = inputs.find(el => el.getAttribute('type') === 'datetime-local')!
    await userEvent.click(startInput)
    await userEvent.tab()
    expect(await screen.findByText('Required')).toBeInTheDocument()
  })

  it('shows all designation options', () => {
    renderWithProviders(<CreateSupportForm />)
    expect(screen.getByText('FPD Employee')).toBeInTheDocument()
    expect(screen.getByText('Other COF First Responder')).toBeInTheDocument()
    expect(screen.getByText('Other City Employee')).toBeInTheDocument()
    expect(screen.getByText('Other Non-COF First Responder')).toBeInTheDocument()
  })

  it('shows all support type options', () => {
    renderWithProviders(<CreateSupportForm />)
    expect(screen.getByText('Defusing')).toBeInTheDocument()
    expect(screen.getByText('Referral')).toBeInTheDocument()
    expect(screen.getByText('Undisclosed')).toBeInTheDocument()
  })
})
