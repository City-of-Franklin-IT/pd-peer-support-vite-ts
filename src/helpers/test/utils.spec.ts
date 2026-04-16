import { formatDate, authHeaders } from '../utils'

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
