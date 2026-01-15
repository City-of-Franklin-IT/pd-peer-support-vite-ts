# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Running the Application
```bash
npm run dev              # Start dev server on port 6000
npm run preview          # Preview production build
```

### Building & Deployment
```bash
npm run build            # TypeScript build + Vite build
npm run deploy           # SCP dist to andrew@cofasv32:/home/andrew/apps/builds/pd-peer-support-vite-ts
```

### Testing & Linting
```bash
npm test                 # Run Vitest tests
npm run lint             # Run ESLint
```

### Running Specific Tests
```bash
npx vitest <path-to-test-file>              # Run specific test file
npx vitest --watch                          # Run tests in watch mode
npx vitest --ui                             # Run tests with UI
```

## Architecture

### API & State Management

**API Integration:** All API calls are centralized in `src/context/App/AppActions.ts`. The API base URL is environment-aware:
- Development: `https://cofasv38.franklin-gov.com/api/v2/pd/peer-support`
- Production: `https://pdapps.franklintn.gov/api/v2/pd/peer-support`

**State Management Pattern:**
- **React Query (v3)** for server state, caching, and data fetching
- **Context + useReducer** for local UI state (filters, pagination, form state)
  - `src/components/support/context.tsx` - Support page state (filters, pagination, search)
  - `src/components/roster/context.tsx` - Roster page state
- Custom hooks in `src/helpers/hooks.ts` for shared auth/token logic

### Authentication Flow

**MSAL (Microsoft Authentication Library):**
- Azure AD authentication configured in `src/context/Auth/config.ts`
- `useGetToken()` hook handles token acquisition with Edge browser special handling (popup vs silent)
- Token refresh checks every 4 minutes
- Development mode bypasses auth with mock token

**Edge Browser Workaround:** The app uses `acquireTokenPopup()` for Edge users instead of `acquireTokenSilent()` due to browser-specific issues. The hook also handles popup blocker detection.

### Component Organization

**Feature-Based Structure:**
```
src/components/
├── support/          # Support entry management (main feature)
│   ├── containers/   # SupportContainer, FiltersContainer, PaginationContainer
│   ├── forms/        # CreateSupportForm, UpdateSupportForm, etc.
│   ├── tables/       # SupportTable
│   └── context.tsx   # Local state management
├── roster/           # Personnel roster management
├── layout/           # Header, Footer, Layout, navigation buttons
└── form-elements/    # Reusable form components (FormLabel, FormError, etc.)
```

**Component File Pattern:** Components use a consistent structure:
- `index.tsx` - Main component export
- `components.tsx` - Sub-components used only within this feature
- `hooks.ts` or `hooks.tsx` - Custom hooks specific to the component
- `utils.ts` - Helper functions
- `test.tsx` - Vitest tests (using Testing Library)

### Path Aliases

The project uses path aliases configured in both `vite.config.ts` and `tsconfig.json`:
```typescript
@/              → src/
@components/    → src/components/
@config/        → src/config/
@context/       → src/context/
@helpers/       → src/helpers/
@pages/         → src/pages/
@utils/         → src/utils/
@assets/        → src/assets/
@test/          → src/test/
```

### Forms & Validation

**React Hook Form** is used throughout for form handling. Common patterns:
- Form components accept `mode: 'create' | 'update'` prop to handle both create and edit flows
- Forms use `_dirtied` and `_deleted` flags for tracking changes in nested data (Personnel arrays)
- `CreateSupportForm` and `CreatePersonnelForm` manage complex nested relationships

### Data Model

**Key Entities:**
- **SupportInterface** - Main support entry (debrief, defusing, referral, etc.)
- **PersonnelInterface** - Personnel involved in a support entry (many-to-one with Support)
- **PersonnelRosterInterface** - Roster of peer support staff (separate from support personnel)
- **OtherSupportInterface** - Support for non-personnel recipients

**Support Types:**
- Debrief (Internal/External), Defusing, Family, Finances, Referral, Substance Use, Work, Undisclosed, Other

**Recipient Designations:**
- FPD Employee, Other COF First Responder, Other City Employee, Other Non-COF First Responder

### Configuration

**Environment Handling:** The app uses a `NODE_ENV` constant in `src/config/index.ts` set to `'production'` by default. In development, this should be manually changed to `'development'` to:
- Use the dev API endpoint
- Bypass Azure AD authentication
- Enable development-specific behaviors

**Base Path:** The app is deployed at `/peer-support` subdirectory (see `vite.config.ts` base setting).

### Testing

**Vitest + Testing Library** setup:
- Test files: `**/*.{test,spec}.{ts,tsx}` or `**/test.tsx`
- Setup file: `src/test/setup.ts`
- Mock API responses in `src/test/mocks/api.ts`
- Uses jsdom environment for DOM testing

## Standards

Follow the guides in `/opt/claude-standards/` for consistent code style and conventions:

- **Import Organization:** `/opt/claude-standards/IMPORT_ORGANIZATION.md`
- **React Conventions:** `/opt/claude-standards/REACT_CONVENTIONS.md`
- **TypeScript Style:** `/opt/claude-standards/TYPESCRIPT_STYLE.md`
- **Version Control:** `/opt/claude-standards/VERSION_CONTROL.md`
- **README Template:** `/opt/claude-standards/README_TEMPLATE.md`
