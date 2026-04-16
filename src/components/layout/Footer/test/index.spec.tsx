import { screen } from '@testing-library/react'
import { renderWithProviders } from '@test/utils'
import Footer from '../index'

describe('Footer', () => {
  it('renders the development credit text', () => {
    renderWithProviders(<Footer />)
    expect(
      screen.getByText(/developed by city of franklin information technology/i)
    ).toBeInTheDocument()
  })
})
