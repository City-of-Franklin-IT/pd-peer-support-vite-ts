import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import DeleteBtn from '../index'

describe('DeleteBtn', () => {
  it('renders the button with children text', () => {
    render(<DeleteBtn onClick={vi.fn()} size="btn-lg">Delete Record</DeleteBtn>)
    expect(screen.getByRole('button', { name: /delete record/i })).toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn()
    render(<DeleteBtn onClick={handleClick} size="btn-lg">Delete</DeleteBtn>)
    await userEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('renders with a size prop without crashing', () => {
    render(<DeleteBtn onClick={vi.fn()} size="btn-sm">Delete</DeleteBtn>)
    expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument()
  })
})
