import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useForm, FormProvider } from 'react-hook-form'
import FormBtns from '../index'

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm()
  return <FormProvider {...methods}>{children}</FormProvider>
}

describe('FormBtns', () => {
  it('renders Cancel, Reset, and Save buttons', () => {
    render(<FormBtns onCancelBtnClick={vi.fn()} />, { wrapper: Wrapper })
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /reset/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument()
  })

  it('calls onCancelBtnClick when the Cancel button is clicked', async () => {
    const handleCancel = vi.fn()
    render(<FormBtns onCancelBtnClick={handleCancel} />, { wrapper: Wrapper })
    await userEvent.click(screen.getByRole('button', { name: /cancel/i }))
    expect(handleCancel).toHaveBeenCalledTimes(1)
  })

  it('Save button has type submit', () => {
    render(<FormBtns onCancelBtnClick={vi.fn()} />, { wrapper: Wrapper })
    expect(screen.getByRole('button', { name: /save/i })).toHaveAttribute('type', 'submit')
  })
})
