import { screen } from '@testing-library/react'
import { renderWithProviders } from '@test/utils'
import { createPersonnelRoster } from '@test/mocks/api'
import Roster from '../index'

vi.mock('../hooks', () => ({
  useGetRosterPersonnel: vi.fn(() => ({
    data: { data: [] },
    isSuccess: true,
  })),
}))

describe('Roster page', () => {
  it('renders the Manage Support Personnel heading when data loads', () => {
    renderWithProviders(<Roster />)
    expect(screen.getByText('Manage Support Personnel')).toBeInTheDocument()
  })

  it('renders personnel data when provided', async () => {
    const { useGetRosterPersonnel } = await import('../hooks')
    vi.mocked(useGetRosterPersonnel).mockReturnValue({
      data: {
        data: [createPersonnelRoster({ email: 'jane.doe@franklintn.gov' })],
      },
      isSuccess: true,
    } as any)

    renderWithProviders(<Roster />)
    expect(screen.getByText('jane.doe@franklintn.gov')).toBeInTheDocument()
  })
})
