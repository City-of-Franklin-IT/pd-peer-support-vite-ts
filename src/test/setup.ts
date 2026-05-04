import '@testing-library/jest-dom/vitest'
import { vi } from 'vitest'

// jsdom does not implement scroll APIs
window.scrollTo = vi.fn() as any
Element.prototype.scrollIntoView = vi.fn()

vi.mock('@azure/msal-react', async () => {
  const React = await import('react')

  return {
    useMsal: vi.fn(() => ({
      instance: {
        getActiveAccount: vi.fn(() => null),
        setActiveAccount: vi.fn(),
        loginRedirect: vi.fn(),
        clearCache: vi.fn(),
        ssoSilent: vi.fn(() => Promise.resolve({ account: null })),
        acquireTokenSilent: vi.fn(() =>
          Promise.resolve({ idToken: 'mock-token', accessToken: 'mock-access' })
        ),
        acquireTokenPopup: vi.fn(() =>
          Promise.resolve({ idToken: 'mock-token' })
        ),
      },
      accounts: [],
      inProgress: 'none',
    })),
    MsalProvider: ({ children }: { children: React.ReactNode }) =>
      React.createElement(React.Fragment, null, children),
  }
})

vi.mock('motion/react', async () => {
  const React = await import('react')

  const makeEl =
    (tag: string) =>
    ({ children, initial: _i, animate: _a, exit: _e, transition: _t, ...props }: any) =>
      React.createElement(tag, props, children)

  return {
    motion: new Proxy({} as Record<string, any>, {
      get(_target, prop: string) {
        return makeEl(prop)
      },
    }),
    AnimatePresence: ({ children }: { children: React.ReactNode }) =>
      React.createElement(React.Fragment, null, children),
  }
})

vi.mock('@/context/Auth', () => ({
  useAuth: vi.fn(() => ({
    isAuthenticated: false,
    token: undefined,
    isLoading: false,
    refreshToken: vi.fn()
  })),
  AuthCtxProvider: ({ children }: any) => children,
  MOCK_AUTH: false
}))

vi.mock('@/helpers/hooks', () => ({
  useGetToken: vi.fn(() => ({ token: undefined, isLoading: false, popupBlocked: false })),
  useEnableQuery: vi.fn(() => ({ enabled: false, token: undefined, refreshToken: vi.fn() })),
  useActiveAccount: vi.fn(() => false),
  useGetUserDepartment: vi.fn(() => ({ department: undefined, isLoading: false })),
  useRedirectAfterLogin: vi.fn(),
  useAuthRedirect: vi.fn(),
  useUnauthRedirect: vi.fn(),
  withTokenRefresh: vi.fn(),
}))

vi.mock('@/utils/Toast/Toast', () => ({
  errorPopup: vi.fn(),
  savedPopup: vi.fn(),
  infoPopup: vi.fn(),
  authPopup: vi.fn(),
}))
