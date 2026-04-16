import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRef } from 'react'
import BackToTopBtn from '../index'

const Wrapper = () => {
  const topRef = useRef<HTMLDivElement>(null)
  return (
    <>
      <div ref={topRef} data-testid="top-target" />
      <BackToTopBtn topRef={topRef} />
    </>
  )
}

describe('BackToTopBtn', () => {
  it('renders a button with Back To Top text', () => {
    render(<Wrapper />)
    expect(screen.getByRole('button', { name: /back to top/i })).toBeInTheDocument()
  })

  it('calls scrollIntoView on the ref when clicked', async () => {
    render(<Wrapper />)
    const target = screen.getByTestId('top-target')
    target.scrollIntoView = vi.fn()
    await userEvent.click(screen.getByRole('button'))
    expect(target.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' })
  })
})
