import { handleDateTimes, supportTypeIconMap } from '../utils'
import { createSupport } from '@test/mocks/api'

describe('handleDateTimes', () => {
  it('returns the correct start date and time', () => {
    const support = createSupport({ startDateTime: '2024-06-15T09:30:00.000Z' })
    const result = handleDateTimes(support)
    expect(result.start.date).toBe('2024-06-15')
    expect(result.start.time).toBe('09:30')
  })

  it('returns the correct end date and time', () => {
    const support = createSupport({ endDateTime: '2024-06-15T11:45:00.000Z' })
    const result = handleDateTimes(support)
    expect(result.end.date).toBe('2024-06-15')
    expect(result.end.time).toBe('11:45')
  })

  it('handles midnight correctly', () => {
    const support = createSupport({
      startDateTime: '2024-01-01T00:00:00.000Z',
      endDateTime: '2024-01-01T00:00:00.000Z',
    })
    const result = handleDateTimes(support)
    expect(result.start.time).toBe('00:00')
    expect(result.end.time).toBe('00:00')
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
