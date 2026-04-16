import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NextPageBtn from '../index'

describe('NextPageBtn', () => {
  it('renders the button', () => {
    render(<NextPageBtn onClick={vi.fn()} disabled={false} />)
    expect(screen.getByTestId('next-page-btn')).toBeInTheDocument()
  })

  it('is enabled when disabled is false', () => {
    render(<NextPageBtn onClick={vi.fn()} disabled={false} />)
    expect(screen.getByTestId('next-page-btn')).not.toBeDisabled()
  })

  it('is disabled when disabled is true', () => {
    render(<NextPageBtn onClick={vi.fn()} disabled={true} />)
    expect(screen.getByTestId('next-page-btn')).toBeDisabled()
  })

  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn()
    render(<NextPageBtn onClick={handleClick} disabled={false} />)
    await userEvent.click(screen.getByTestId('next-page-btn'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
