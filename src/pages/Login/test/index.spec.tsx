import { screen } from '@testing-library/react'
import { renderWithProviders } from '@test/utils'
import Login from '../index'

describe('Login page', () => {
  it('renders the layout structure', () => {
    renderWithProviders(<Login />)
    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })
})
