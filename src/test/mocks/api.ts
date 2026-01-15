import { faker } from '@faker-js/faker'

// Types
import * as AppTypes from '@/context/App/AppTypes'

export const createMockSupport = (overrides?: Partial<AppTypes.SupportInterface>): AppTypes.SupportInterface => ({
  startDateTime: faker.date.anytime().toISOString(),
  endDateTime: faker.date.anytime().toISOString(),
  supportDesignation: faker.helpers.arrayElement(supportDesignations),
  supportType: faker.helpers.arrayElement(supportTypes),
  note: faker.lorem.paragraph(),
  Personnel: [],
  OtherSupport: undefined,
  uuid: faker.string.uuid(),
  createdBy: 'test.o365-3@franklintn.gov',
  createdAt: faker.date.anytime().toISOString(),
  updatedBy: 'test.o365-3@franklintn.gov',
  updatedAt: faker.date.anytime().toISOString(),
  ...overrides
})

export const createMockPersonnel = (overrides?: Partial<AppTypes.PersonnelInterface>): AppTypes.PersonnelInterface => ({
  email: faker.internet.email({ provider: 'franklintn.gov' }),
  parentId: faker.string.uuid(),
  uuid: faker.string.uuid(),
  createdBy: 'test.o365-3@franklintn.gov',
  createdAt: faker.date.anytime().toISOString(),
  updatedBy: 'test.o365-3@franklintn.gov',
  updatedAt: faker.date.anytime().toISOString(),
  ...overrides
})

const supportDesignations: AppTypes.SupportDesignationType[] = [
  'FPD Employee',
  'Other COF First Responder',
  'Other City Employee',
  'Other Non-COF First Responder'
]

const supportTypes: AppTypes.SupportType[] = [
  'Debrief - External',
  'Debrief - Internal',
  'Defusing',
  'Family',
  'Finances',
  'Other',
  'Referral',
  'Substance Use',
  'Undisclosed',
  'Work'
]