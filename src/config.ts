const IS_DEV = import.meta.env.DEV

// App
export const APP_BASE = '/peer-support'
export const APP_TITLE = 'Peer Support'

// API
export const API_URL = IS_DEV
  ? 'https://cofasv38.franklin-gov.com/api/v3/pd/peer-support'
  : 'https://pdapps.franklintn.gov/api/v3/pd/peer-support'

// Azure AD (Entra) Authentication
export const CLIENT_ID = 'fc6e7f34-d393-4a51-affc-3c87ff617396'
export const ENTRA_CLIENT_ID = '6339af9a-1326-4fa3-ad2c-c32af177b4ad'
export const AUTH_AUTHORITY = 'https://login.microsoftonline.com/f6644f52-f834-4a2f-a433-e6bc40d7c17f/'
export const AUTH_REDIRECT_URI = 'https://pdapps.franklintn.gov/peer-support'
export const AUTH_POST_LOGOUT_REDIRECT_URI = 'https://pdapps.franklintn.gov/'

// Development
export const MOCK_TOKEN = 'dev-token-12345'
