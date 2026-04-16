import { screen } from '@testing-library/react'
import { renderWithProviders } from '@test/utils'
import { createMockCollection } from '@test/mocks/api'
import Documentation from '../index'

vi.mock('../hooks', () => ({
  useGetDocs: vi.fn(() => ({
    data: createMockCollection(),
    isSuccess: true,
  })),
  useHandleEndpointItem: vi.fn(() => ({ checked: false, onChange: vi.fn() })),
}))

describe('Documentation page', () => {
  it('renders the layout structure', () => {
    renderWithProviders(<Documentation />)
    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  it('renders the API collection name', () => {
    renderWithProviders(<Documentation />)
    expect(screen.getByText(/peer support api/i)).toBeInTheDocument()
  })

  it('renders the collection description', () => {
    renderWithProviders(<Documentation />)
    expect(
      screen.getByText(/api documentation for the peer support system/i)
    ).toBeInTheDocument()
  })

  it('renders the Close API Documentation button', () => {
    renderWithProviders(<Documentation />)
    expect(
      screen.getByRole('link', { name: /close api documentation/i })
    ).toBeInTheDocument()
  })

  it('shows the loading spinner when isSuccess is false', async () => {
    const { useGetDocs } = await import('../hooks')
    vi.mocked(useGetDocs).mockReturnValue({
      data: undefined,
      isSuccess: false,
    } as any)

    renderWithProviders(<Documentation />)
    expect(screen.getByAltText('loading icon')).toBeInTheDocument()
  })
})
