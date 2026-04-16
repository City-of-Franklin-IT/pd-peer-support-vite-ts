import { render, screen } from '@testing-library/react'
import Loading from '../index'

describe('Loading', () => {
  it('renders the loading icon image', () => {
    render(<Loading />)
    expect(screen.getByAltText('loading icon')).toBeInTheDocument()
  })
})
