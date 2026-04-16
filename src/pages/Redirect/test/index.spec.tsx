import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import Redirect from '../index'

describe('Redirect page', () => {
  it('renders null', () => {
    const { container } = render(
      <MemoryRouter>
        <Redirect />
      </MemoryRouter>
    )
    expect(container).toBeEmptyDOMElement()
  })
})
