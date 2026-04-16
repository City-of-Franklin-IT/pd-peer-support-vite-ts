import * as AppTypes from '@/context/App/AppTypes'

export const createPersonnelRoster = (
  overrides?: Partial<AppTypes.PersonnelRosterInterface>
): AppTypes.PersonnelRosterInterface => ({
  uuid: 'roster-uuid-1',
  email: 'john.doe@franklintn.gov',
  createdBy: 'admin',
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedBy: 'admin',
  updatedAt: '2024-01-01T00:00:00.000Z',
  ...overrides,
})

export const createSupport = (
  overrides?: Partial<AppTypes.SupportInterface>
): AppTypes.SupportInterface => ({
  uuid: 'support-uuid-1',
  startDateTime: '2024-01-15T09:00:00.000Z',
  endDateTime: '2024-01-15T10:00:00.000Z',
  supportDesignation: 'FPD Employee',
  supportType: 'Debrief - Internal',
  note: null,
  createdBy: 'admin',
  createdAt: '2024-01-15T00:00:00.000Z',
  updatedBy: 'admin',
  updatedAt: '2024-01-15T00:00:00.000Z',
  Personnel: [],
  ...overrides,
})

export const createMockCollection = () => ({
  info: {
    name: 'Peer Support API',
    description: 'API documentation for the peer support system',
  },
  item: [
    {
      name: 'Support',
      item: [
        {
          name: 'Get All Support',
          request: {
            method: 'GET',
            url: {
              raw: '{{URL}}/support',
              path: ['support'],
            },
            description: 'Returns all peer support entries',
          },
        },
      ],
    },
  ],
})
