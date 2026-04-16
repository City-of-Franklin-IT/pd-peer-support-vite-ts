import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import RemoveBtn from '../index'

describe('RemoveBtn', () => {
  it('renders nothing when visible is false', () => {
    const { container } = render(<RemoveBtn onClick={vi.fn()} visible={false} />)
    expect(container).toBeEmptyDOMElement()
  })

  it('renders the button when visible is true', () => {
    render(<RemoveBtn onClick={vi.fn()} visible={true} />)
    expect(screen.getByRole('button', { name: /remove/i })).toBeInTheDocument()
  })

  it('calls onClick when the button is clicked', async () => {
    const handleClick = vi.fn()
    render(<RemoveBtn onClick={handleClick} visible={true} />)
    await userEvent.click(screen.getByRole('button', { name: /remove/i }))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
