import { screen } from '@testing-library/react'
import { renderWithSupportCtx } from '@test/utils'
import FiltersContainer from '../index'

describe('FiltersContainer', () => {
  it('renders nothing when visible is false', () => {
    const { container } = renderWithSupportCtx(<FiltersContainer visible={false} />)
    expect(container).toBeEmptyDOMElement()
  })

  it('renders the Personnel Filter label when visible is true', () => {
    renderWithSupportCtx(<FiltersContainer visible={true} />)
    expect(screen.getByText(/personnel filter/i)).toBeInTheDocument()
  })

  it('renders the Search label when visible is true', () => {
    renderWithSupportCtx(<FiltersContainer visible={true} />)
    expect(screen.getByText(/^search$/i)).toBeInTheDocument()
  })

  it('renders the Date Range Filter label when visible is true', () => {
    renderWithSupportCtx(<FiltersContainer visible={true} />)
    expect(screen.getByText(/date range filter/i)).toBeInTheDocument()
  })

  it('renders the search input when visible is true', () => {
    renderWithSupportCtx(<FiltersContainer visible={true} />)
    expect(screen.getByTestId('search-input')).toBeInTheDocument()
  })

  it('renders date range inputs when visible is true', () => {
    renderWithSupportCtx(<FiltersContainer visible={true} />)
    expect(screen.getAllByTestId('date-range-input')).toHaveLength(2)
  })
})
