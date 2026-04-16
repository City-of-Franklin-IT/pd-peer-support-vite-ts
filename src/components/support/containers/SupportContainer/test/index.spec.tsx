import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithSupportCtx } from '@test/utils'
import { createSupport } from '@test/mocks/api'
import SupportContainer from '../index'

describe('SupportContainer', () => {
  it('shows the NoSupport message when the support list is empty', () => {
    renderWithSupportCtx(<SupportContainer support={[]} />)
    expect(screen.getByText(/no peer support entries/i)).toBeInTheDocument()
  })

  it('hides the filters when the support list is empty', () => {
    renderWithSupportCtx(<SupportContainer support={[]} />)
    expect(screen.queryByTestId('search-input')).not.toBeInTheDocument()
  })

  it('renders the support table when data is provided', () => {
    const support = [createSupport({ uuid: '1', supportType: 'Defusing' })]
    renderWithSupportCtx(<SupportContainer support={support} />)
    expect(screen.getByRole('table')).toBeInTheDocument()
  })

  it('shows filters when support data is provided', () => {
    const support = [createSupport({ uuid: '1' })]
    renderWithSupportCtx(<SupportContainer support={support} />)
    expect(screen.getByTestId('search-input')).toBeInTheDocument()
  })

  it('renders pagination controls', () => {
    renderWithSupportCtx(<SupportContainer support={[]} />)
    expect(screen.getByTestId('prev-page-btn')).toBeInTheDocument()
    expect(screen.getByTestId('next-page-btn')).toBeInTheDocument()
  })

  it('does not show the update form initially', () => {
    renderWithSupportCtx(<SupportContainer support={[]} />)
    expect(screen.queryByTestId('get-support')).not.toBeInTheDocument()
  })

  it('shows the update form container after clicking a table row', async () => {
    const support = [createSupport({ uuid: 'clicked-uuid', supportType: 'Defusing' })]
    renderWithSupportCtx(<SupportContainer support={support} />)
    const rows = screen.getAllByRole('row')
    // The first row is the header; click the first data row
    await userEvent.click(rows[1])
    expect(screen.getByTestId('get-support')).toBeInTheDocument()
  })

  it('shows the loading spinner inside the form container while data loads', async () => {
    const support = [createSupport({ uuid: 'clicked-uuid' })]
    renderWithSupportCtx(<SupportContainer support={support} />)
    await userEvent.click(screen.getAllByRole('row')[1])
    expect(screen.getByAltText('loading icon')).toBeInTheDocument()
  })
})
