import { screen } from '@testing-library/react'
import { renderWithProviders } from '@test/utils'
import Layout from '../index'

describe('Layout', () => {
  it('renders the header', () => {
    renderWithProviders(<Layout />)
    expect(screen.getByRole('banner')).toBeInTheDocument()
  })

  it('renders the footer', () => {
    renderWithProviders(<Layout />)
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })
})
