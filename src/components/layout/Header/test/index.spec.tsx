import { screen } from '@testing-library/react'
import { renderWithHeaderCtx } from '@test/utils'
import Header from '../index'

describe('Header', () => {
  it('renders the FPD icon', () => {
    renderWithHeaderCtx(<Header />)
    expect(screen.getByAltText('fpd icon')).toBeInTheDocument()
  })

  it('renders navigation buttons', () => {
    renderWithHeaderCtx(<Header />)
    expect(screen.getByRole('link', { name: /^support$/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /^create support$/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /^manage roster$/i })).toBeInTheDocument()
  })

  it('renders the Back To All PD Apps link', () => {
    renderWithHeaderCtx(<Header />)
    expect(screen.getByText(/back to all pd apps/i)).toBeInTheDocument()
  })
})
