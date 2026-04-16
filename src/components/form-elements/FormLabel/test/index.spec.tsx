import { render, screen } from '@testing-library/react'
import FormLabel from '../index'

describe('FormLabel', () => {
  it('renders the label text', () => {
    render(<FormLabel name="email">Email Address</FormLabel>)
    expect(screen.getByText('Email Address')).toBeInTheDocument()
  })

  it('renders the required icon when required is true', () => {
    render(<FormLabel name="email" required>Email Address</FormLabel>)
    const icon = screen.getByAltText('required icon')
    expect(icon).toBeInTheDocument()
  })

  it('does not render the required icon when required is false', () => {
    render(<FormLabel name="email" required={false}>Email Address</FormLabel>)
    expect(screen.queryByAltText('required icon')).not.toBeInTheDocument()
  })

  it('does not render the required icon when required is omitted', () => {
    render(<FormLabel name="email">Email Address</FormLabel>)
    expect(screen.queryByAltText('required icon')).not.toBeInTheDocument()
  })

  it('sets the htmlFor attribute to the name prop', () => {
    render(<FormLabel name="email">Email Address</FormLabel>)
    expect(screen.getByTestId('form-label')).toHaveAttribute('for', 'email')
  })
})
