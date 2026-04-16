import { screen } from '@testing-library/react'
import { renderWithProviders } from '@test/utils'
import Layout from '../index'

describe('Layout', () => {
  it('renders children content', () => {
    renderWithProviders(
      <Layout>
        <div data-testid="child-content">Page Content</div>
      </Layout>
    )
    expect(screen.getByTestId('child-content')).toBeInTheDocument()
    expect(screen.getByText('Page Content')).toBeInTheDocument()
  })

  it('renders the header', () => {
    renderWithProviders(<Layout><div /></Layout>)
    expect(screen.getByRole('banner')).toBeInTheDocument()
  })

  it('renders the footer', () => {
    renderWithProviders(<Layout><div /></Layout>)
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })
})
