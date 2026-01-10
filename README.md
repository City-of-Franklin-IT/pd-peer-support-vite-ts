# PD Peer Support Management System

A React-based web application for Franklin Police Department peer support program administrators to track and manage support services provided to first responders and city employees.

![React](https://img.shields.io/badge/React-18.3.1-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue) ![Vite](https://img.shields.io/badge/Vite-6.3.5-purple)

## Overview

This application enables FPD peer support coordinators to document and manage support services (debriefs, defusing, referrals, etc.) provided to department personnel and other first responders. It features Azure AD authentication, personnel roster management, and comprehensive filtering/search capabilities.

## Features

- **Support Entry Management** - Create, update, delete, and search support records with filtering by date range and personnel
- **Personnel Roster** - Maintain roster of peer support team members with associated support history
- **Support Categorization** - Track 10 different support types including internal/external debriefs, defusing, referrals, and substance use support
- **Recipient Tracking** - Classify recipients as FPD employees, COF first responders, city employees, or non-COF first responders
- **Azure AD Authentication** - Secure access via Microsoft authentication with Edge browser compatibility
- **Pagination & Filtering** - Navigate large datasets with pagination and advanced filtering

## Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- Access to Azure AD tenant for authentication

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd pd-peer-support-vite-ts

# Install dependencies
npm install
```

## Configuration

The application configuration is managed in `src/config/index.ts`. Update the following values as needed:

| Variable | Description | Default |
|----------|-------------|---------|
| `APP_BASE` | Base path for deployment | `/peer-support` |
| `APP_TITLE` | Application title | `Peer Support` |
| `API_URL` | Production API endpoint | `https://pdapps.franklintn.gov/api/v2/pd/peer-support` |
| `NODE_ENV` | Environment mode | `production` |
| `CLIENT_ID` | Azure AD client ID | `fc6e7f34-d393-4a51-affc-3c87ff617396` |

**Development Mode:**
To enable development mode with local API and bypassed authentication, change `NODE_ENV` to `'development'` in `src/config/index.ts`.

### API Endpoints

| Environment | Base URL |
|-------------|----------|
| Development | `https://cofasv38.franklin-gov.com/api/v2/pd/peer-support` |
| Production | `https://pdapps.franklintn.gov/api/v2/pd/peer-support` |

**API Repository:** [pd-api-ts](https://github.com/City-of-Franklin-IT/pd-api-ts)
**API Documentation:** [API Docs](https://dev.franklintn.gov/api/v2/pd/api-docs)

## Usage

### Development Server

```bash
npm run dev
```

Runs the app on `http://localhost:6000` (or configured host). Hot module replacement is enabled.

### Production Preview

```bash
npm run build
npm run preview
```

Builds the app and serves it locally to preview production behavior.

## Project Structure

```
src/
├── pages/              # Route pages (Login, Support, Roster, Create)
├── components/
│   ├── support/       # Support entry management (forms, tables, filters)
│   ├── roster/        # Personnel roster management
│   ├── layout/        # Header, Footer, Layout, navigation
│   └── form-elements/ # Reusable form components
├── context/
│   ├── App/          # API actions and application state
│   └── Auth/         # MSAL authentication configuration
├── config/           # Application constants and settings
├── helpers/          # Custom hooks (useGetToken, useEnableQuery)
└── test/             # Test setup and mocks
```

## Components

### Core Pages
- **Login** - Azure AD authentication entry point
- **Support** - Main support entries list with filtering and pagination
- **Create** - Form page for creating new support entries and personnel
- **Roster** - Personnel roster management view

### Key Components
- **SupportTable** - Displays support entries with update/delete actions
- **FiltersContainer** - Date range and personnel filtering
- **PaginationContainer** - Navigate through paginated support records
- **CreateSupportForm** - Multi-step form for new support entries with nested personnel
- **PersonnelTable** - Roster personnel list with support history

## Development

### Testing

```bash
# Run all tests
npm test

# Run specific test file
npx vitest src/components/support/containers/SupportContainer/test.tsx

# Run tests in watch mode
npx vitest --watch

# Run tests with UI
npx vitest --ui
```

Tests use Vitest + React Testing Library with jsdom environment. Mock API responses are in `src/test/mocks/api.ts`.

### Linting

```bash
npm run lint
```

Runs ESLint with TypeScript support. Configuration includes React Hooks plugin and React Refresh plugin.

## Deployment

### Build

```bash
npm run build
```

Compiles TypeScript and builds production bundle to `dist/` directory.

### Deploy

```bash
npm run deploy
```

Copies the `dist/` directory to production server via SCP:
```
andrew@cofasv32:/home/andrew/apps/builds/pd-peer-support-vite-ts
```

**Production URL:** [https://pdapps.franklintn.gov/peer-support](https://pdapps.franklintn.gov/peer-support)

### Database

- **Server:** COFDBV08
- **Database:** pd_peer_support

---

**Maintained by:** City of Franklin IT Department
