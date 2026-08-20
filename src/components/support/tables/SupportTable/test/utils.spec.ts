import { handleDateTimes, supportTypeIconMap } from '../utils'
import { createSupport } from '@test/mocks/api'

describe('handleDateTimes', () => {
  it('converts the start date/time from UTC to America/Chicago', () => {
    const support = createSupport({ startDateTime: '2024-06-15T09:30:00.000Z' }) // CDT (UTC-5)
    const result = handleDateTimes(support)
    expect(result.start.date).toBe('2024-06-15')
    expect(result.start.time).toBe('04:30')
  })

  it('converts the end date/time from UTC to America/Chicago', () => {
    const support = createSupport({ endDateTime: '2024-06-15T11:45:00.000Z' }) // CDT (UTC-5)
    const result = handleDateTimes(support)
    expect(result.end.date).toBe('2024-06-15')
    expect(result.end.time).toBe('06:45')
  })

  it('rolls back to the previous day when the UTC offset crosses midnight', () => {
    const support = createSupport({
      startDateTime: '2024-01-01T00:00:00.000Z', // CST (UTC-6)
      endDateTime: '2024-01-01T00:00:00.000Z',
    })
    const result = handleDateTimes(support)
    expect(result.start.date).toBe('2023-12-31')
    expect(result.start.time).toBe('18:00')
    expect(result.end.date).toBe('2023-12-31')
    expect(result.end.time).toBe('18:00')
  })
})

describe('supportTypeIconMap', () => {
  it('has an entry for every support type', () => {
    const expectedTypes = [
      'Debrief - External',
      'Debrief - Internal',
      'Defusing',
      'Family',
      'Finances',
      'Referral',
      'Substance Use',
      'Undisclosed',
      'Work',
      'Other',
    ]
    expectedTypes.forEach(type => {
      expect(supportTypeIconMap.has(type as any)).toBe(true)
    })
  })

  it('returns undefined for the Other type (no icon)', () => {
    expect(supportTypeIconMap.get('Other')).toBeUndefined()
  })
})
