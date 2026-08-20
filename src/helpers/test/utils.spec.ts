import { formatDate, authHeaders, formatDisplayDateTime, toDatetimeLocalValue } from '../utils'

describe('formatDate', () => {
  it('formats an ISO datetime string to a YYYY-MM-DD date string', () => {
    expect(formatDate('2024-06-15T14:30:00.000Z')).toBe('2024-06-15')
  })

  it('handles the start of a year', () => {
    expect(formatDate('2024-01-01T00:00:00.000Z')).toBe('2024-01-01')
  })

  it('handles the end of a year', () => {
    expect(formatDate('2024-12-31T23:59:59.000Z')).toBe('2024-12-31')
  })
})

describe('formatDisplayDateTime', () => {
  it('converts a UTC ISO string to America/Chicago date/time (CDT, UTC-5)', () => {
    expect(formatDisplayDateTime('2026-07-30T02:00:00.000Z')).toEqual({ date: '2026-07-29', time: '21:00' })
  })

  it('converts a UTC ISO string to America/Chicago date/time (CST, UTC-6)', () => {
    expect(formatDisplayDateTime('2024-01-01T00:00:00.000Z')).toEqual({ date: '2023-12-31', time: '18:00' })
  })
})

describe('toDatetimeLocalValue', () => {
  it('converts a UTC ISO string to a datetime-local value in America/Chicago (CDT, UTC-5)', () => {
    expect(toDatetimeLocalValue('2026-07-30T02:00:00.000Z')).toBe('2026-07-29T21:00')
  })

  it('converts a UTC ISO string to a datetime-local value in America/Chicago (CST, UTC-6)', () => {
    expect(toDatetimeLocalValue('2024-01-01T00:00:00.000Z')).toBe('2023-12-31T18:00')
  })
})

describe('authHeaders', () => {
  it('returns empty Headers when token is undefined', () => {
    const headers = authHeaders(undefined)
    expect(headers.get('Authorization')).toBeNull()
  })

  it('sets Authorization header as Bearer token when token is provided', () => {
    const headers = authHeaders('my-test-token')
    expect(headers.get('Authorization')).toBe('Bearer my-test-token')
  })
})
