import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PrevPageBtn from '../index'

describe('PrevPageBtn', () => {
  it('renders the button', () => {
    render(<PrevPageBtn onClick={vi.fn()} disabled={false} />)
    expect(screen.getByTestId('prev-page-btn')).toBeInTheDocument()
  })

  it('is enabled when disabled is false', () => {
    render(<PrevPageBtn onClick={vi.fn()} disabled={false} />)
    expect(screen.getByTestId('prev-page-btn')).not.toBeDisabled()
  })

  it('is disabled when disabled is true', () => {
    render(<PrevPageBtn onClick={vi.fn()} disabled={true} />)
    expect(screen.getByTestId('prev-page-btn')).toBeDisabled()
  })

  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn()
    render(<PrevPageBtn onClick={handleClick} disabled={false} />)
    await userEvent.click(screen.getByTestId('prev-page-btn'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
