# PD Peer Support Management System

A React-based web application for Franklin Police Department peer support program administrators to track and manage support services provided to first responders and city employees.

## 🌐 Deployment

**Production:** [https://pdapps.franklintn.gov/peer-support](https://pdapps.franklintn.gov/peer-support)

## 📋 Features

### Support Management
- Create, update, and delete support entries
- Track support provided to FPD employees and other first responders
- Categorize support by type (debrief, defusing, referral, substance use, etc.)
- Record support sessions with timestamps and notes
- Filter and paginate support records

### Personnel Roster
- Manage roster of peer support personnel
- Track support entries associated with each personnel member
- Add and remove personnel from the roster

### Support Types
- Debrief (Internal/External)
- Defusing
- Family Support
- Financial Support
- Referrals
- Substance Use Support
- Work-related Support
- Undisclosed/Other

### Recipient Designations
- FPD Employee
- Other COF First Responder
- Other City Employee
- Other Non-COF First Responder

## 🛠️ Tech Stack

### Core
- **React** 18.3.1 - UI framework
- **TypeScript** 5.8.3 - Type safety
- **Vite** 6.3.5 - Build tool and dev server

### State & Data Management
- **React Query** 3.39.3 - Server state management and caching
- **React Hook Form** 7.60.0 - Form validation and handling
- **React Router** 7.6.3 - Client-side routing

### Authentication
- **@azure/msal-react** 3.0.15 - Azure AD/Microsoft authentication

### UI & Styling
- **Tailwind CSS** 4.1.11 - Utility-first CSS
- **DaisyUI** 5.0.46 - Component library
- **Motion** 12.23.6 - Animations
- **React Toastify** 11.0.5 - Notifications

### Testing
- **Vitest** 3.2.4 - Unit testing framework
- **@testing-library/react** 16.3.0 - Component testing
- **@faker-js/faker** 9.9.0 - Test data generation

## 🔌 API

**API URL:** https://api.franklin-gov.com/api/v2/pd
**API Proxy:** https://dev.franklintn.gov/api/v2/pd
**GitHub:** [pd-api-ts](https://github.com/City-of-Franklin-IT/pd-api-ts)
**API Documentation:** [API Docs](https://dev.franklintn.gov/api/v2/pd/api-docs)

## 💾 Database

**Server:** COFDBV08
**Database:** pd_peer_support

## 📁 Project Structure

```
src/
├── pages/              # Main page components (Login, Support, Roster, Create)
├── components/         # Feature-based components
│   ├── support/       # Support management components
│   ├── roster/        # Roster management components
│   ├── layout/        # Layout and navigation components
│   └── form-elements/ # Reusable form components
├── context/           # Global state and API actions
│   ├── App/          # Application context and API calls
│   └── Auth/         # Authentication context
└── config/           # Application configuration
```

## 🔐 Authentication

This application uses Azure Active Directory (Azure AD) authentication via MSAL. Users must authenticate with their Microsoft account to access the application.

**Maintained by:** City of Franklin IT Department