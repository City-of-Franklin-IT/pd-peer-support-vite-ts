import { ReactElement, ReactNode } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter } from 'react-router'
import { SupportProvider } from '@/components/support/context'
import { RosterProvider } from '@/components/roster/context'
import { HeaderProvider } from '@/components/layout/Header/context'

const makeQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false, gcTime: 0 },
      mutations: { retry: false },
    },
  })

type WrapperOptions = RenderOptions & {
  route?: string
}

export function renderWithRouter(ui: ReactElement, options?: WrapperOptions) {
  const { route = '/', ...rest } = options ?? {}

  const Wrapper = ({ children }: { children: ReactNode }) => (
    <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
  )

  return render(ui, { wrapper: Wrapper, ...rest })
}

export function renderWithProviders(ui: ReactElement, options?: WrapperOptions) {
  const { route = '/', ...rest } = options ?? {}
  const queryClient = makeQueryClient()

  const Wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
    </QueryClientProvider>
  )

  return render(ui, { wrapper: Wrapper, ...rest })
}

export function renderWithSupportCtx(ui: ReactElement, options?: WrapperOptions) {
  const { route = '/support', ...rest } = options ?? {}
  const queryClient = makeQueryClient()

  const Wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[route]}>
        <SupportProvider>{children}</SupportProvider>
      </MemoryRouter>
    </QueryClientProvider>
  )

  return render(ui, { wrapper: Wrapper, ...rest })
}

export function renderWithRosterCtx(ui: ReactElement, options?: WrapperOptions) {
  const { route = '/roster', ...rest } = options ?? {}
  const queryClient = makeQueryClient()

  const Wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[route]}>
        <RosterProvider>{children}</RosterProvider>
      </MemoryRouter>
    </QueryClientProvider>
  )

  return render(ui, { wrapper: Wrapper, ...rest })
}

export function renderWithHeaderCtx(ui: ReactElement, options?: WrapperOptions) {
  const { route = '/', ...rest } = options ?? {}
  const queryClient = makeQueryClient()

  const Wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[route]}>
        <HeaderProvider>{children}</HeaderProvider>
      </MemoryRouter>
    </QueryClientProvider>
  )

  return render(ui, { wrapper: Wrapper, ...rest })
}
