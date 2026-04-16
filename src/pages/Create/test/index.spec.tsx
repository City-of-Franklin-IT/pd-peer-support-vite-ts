import { screen } from '@testing-library/react'
import { renderWithProviders } from '@test/utils'
import Create from '../index'

vi.mock('@/context/App/AppActions', () => ({
  getRosterPersonnel: vi.fn(),
}))

describe('Create page', () => {
  it('renders the layout structure', () => {
    renderWithProviders(<Create />)
    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  it('renders without crashing when no formtype param is present', () => {
    renderWithProviders(<Create />, { route: '/create/support' })
    expect(screen.getByRole('banner')).toBeInTheDocument()
  })
})
