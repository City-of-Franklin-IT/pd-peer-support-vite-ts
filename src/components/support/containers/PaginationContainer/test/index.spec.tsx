import { screen } from '@testing-library/react'
import { renderWithSupportCtx } from '@test/utils'
import PaginationContainer from '../index'

describe('PaginationContainer', () => {
  it('renders the previous page button', () => {
    renderWithSupportCtx(<PaginationContainer count={0} />)
    expect(screen.getByTestId('prev-page-btn')).toBeInTheDocument()
  })

  it('renders the next page button', () => {
    renderWithSupportCtx(<PaginationContainer count={0} />)
    expect(screen.getByTestId('next-page-btn')).toBeInTheDocument()
  })

  it('shows Page 1 / 1 for zero records', () => {
    renderWithSupportCtx(<PaginationContainer count={0} />)
    expect(screen.getByText('Page 1 / 1')).toBeInTheDocument()
  })

  it('disables the previous page button on page 1', () => {
    renderWithSupportCtx(<PaginationContainer count={10} />)
    expect(screen.getByTestId('prev-page-btn')).toBeDisabled()
  })

  it('disables the next page button when all records fit on one page', () => {
    renderWithSupportCtx(<PaginationContainer count={10} />)
    expect(screen.getByTestId('next-page-btn')).toBeDisabled()
  })
})
