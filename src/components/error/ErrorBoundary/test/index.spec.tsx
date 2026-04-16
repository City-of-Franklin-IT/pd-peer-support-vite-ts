import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import ErrorBoundary from '../index'

// Suppress the expected console.error from react-error-boundary during tests
const originalError = console.error
beforeAll(() => { console.error = vi.fn() })
afterAll(() => { console.error = originalError })

const Bomb = () => { throw new Error('test error') }
const Safe = () => <div data-testid="safe-child">safe content</div>

describe('ErrorBoundary', () => {
  it('renders children when there is no error', () => {
    render(
      <MemoryRouter>
        <ErrorBoundary href="/support">
          <Safe />
        </ErrorBoundary>
      </MemoryRouter>
    )
    expect(screen.getByTestId('safe-child')).toBeInTheDocument()
  })

  it('renders nothing (not crashing) when a child throws', () => {
    const { container } = render(
      <MemoryRouter>
        <ErrorBoundary href="/support">
          <Bomb />
        </ErrorBoundary>
      </MemoryRouter>
    )
    // FallbackComponent returns null, so no visible output
    expect(container).toBeEmptyDOMElement()
  })
})
