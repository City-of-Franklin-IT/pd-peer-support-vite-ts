import { render, screen } from '@testing-library/react'
import FormError from '../index'

describe('FormError', () => {
  it('renders nothing when error is undefined', () => {
    const { container } = render(<FormError error={undefined} />)
    expect(container).toBeEmptyDOMElement()
  })

  it('renders the error message when provided', () => {
    render(<FormError error="Email is required" />)
    expect(screen.getByText('Email is required')).toBeInTheDocument()
  })
})
