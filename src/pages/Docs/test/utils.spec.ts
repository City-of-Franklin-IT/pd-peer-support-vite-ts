import { docColorsMap } from '../utils'

describe('docColorsMap', () => {
  it('maps GET to badge-success', () => {
    expect(docColorsMap.get('GET')).toBe('badge-success')
  })

  it('maps POST to badge-info', () => {
    expect(docColorsMap.get('POST')).toBe('badge-info')
  })

  it('maps PUT to badge-warning', () => {
    expect(docColorsMap.get('PUT')).toBe('badge-warning')
  })

  it('maps DELETE to badge-error', () => {
    expect(docColorsMap.get('DELETE')).toBe('badge-error')
  })

  it('maps PATCH to badge-secondary', () => {
    expect(docColorsMap.get('PATCH')).toBe('badge-secondary')
  })
})
