import { screen } from '@testing-library/react'
import { renderWithProviders } from '@test/utils'
import { createSupport } from '@test/mocks/api'
import Support from '../index'

vi.mock('../hooks', () => ({
  useGetAllSupport: vi.fn(() => ({
    data: { data: [] },
    isSuccess: true,
  })),
}))

describe('Support page', () => {
  it('renders the NoSupport message when there are no entries', () => {
    renderWithProviders(<Support />)
    expect(screen.getByText(/no peer support entries/i)).toBeInTheDocument()
  })

  it('renders the support table when entries are provided', async () => {
    const { useGetAllSupport } = await import('../hooks')
    vi.mocked(useGetAllSupport).mockReturnValue({
      data: {
        data: [createSupport({ uuid: '1', supportType: 'Defusing' })],
      },
      isSuccess: true,
    } as any)

    renderWithProviders(<Support />)
    expect(screen.getByRole('table')).toBeInTheDocument()
    expect(screen.getByText('Defusing')).toBeInTheDocument()
  })

  it('shows the loading spinner when isSuccess is false', async () => {
    const { useGetAllSupport } = await import('../hooks')
    vi.mocked(useGetAllSupport).mockReturnValue({
      data: undefined,
      isSuccess: false,
    } as any)

    renderWithProviders(<Support />)
    expect(screen.getByAltText('loading icon')).toBeInTheDocument()
  })
})
