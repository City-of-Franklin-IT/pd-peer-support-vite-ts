import { screen } from '@testing-library/react'
import { renderWithRouter } from '@test/utils'
import BackToHomeBtn from '../index'

describe('BackToHomeBtn', () => {
  it('renders a link with Back To Home text', () => {
    renderWithRouter(<BackToHomeBtn />)
    expect(screen.getByRole('link', { name: /back to home/i })).toBeInTheDocument()
  })

  it('links to the /support route', () => {
    renderWithRouter(<BackToHomeBtn />)
    expect(screen.getByRole('link')).toHaveAttribute('href', '/support')
  })
})
