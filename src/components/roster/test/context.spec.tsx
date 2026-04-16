import { renderHook, act } from '@testing-library/react'
import { useContext } from 'react'
import RosterCtx, { RosterProvider } from '../context'

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <RosterProvider>{children}</RosterProvider>
)

describe('RosterContext reducer', () => {
  it('initialises with expected default values', () => {
    const { result } = renderHook(() => useContext(RosterCtx), { wrapper })
    expect(result.current.formType).toBeUndefined()
    expect(result.current.rosterUUID).toBe('')
  })

  it('SET_FORM_TYPE updates formType', () => {
    const { result } = renderHook(() => useContext(RosterCtx), { wrapper })
    act(() => result.current.dispatch({ type: 'SET_FORM_TYPE', payload: 'CreateRosterPersonnel' }))
    expect(result.current.formType).toBe('CreateRosterPersonnel')
  })

  it('SET_FORM_TYPE can set UpdateRosterPersonnel', () => {
    const { result } = renderHook(() => useContext(RosterCtx), { wrapper })
    act(() => result.current.dispatch({ type: 'SET_FORM_TYPE', payload: 'UpdateRosterPersonnel' }))
    expect(result.current.formType).toBe('UpdateRosterPersonnel')
  })

  it('SET_FORM_TYPE can clear formType with undefined', () => {
    const { result } = renderHook(() => useContext(RosterCtx), { wrapper })
    act(() => result.current.dispatch({ type: 'SET_FORM_TYPE', payload: 'CreateRosterPersonnel' }))
    act(() => result.current.dispatch({ type: 'SET_FORM_TYPE', payload: undefined }))
    expect(result.current.formType).toBeUndefined()
  })

  it('SET_ROSTER_UUID updates rosterUUID', () => {
    const { result } = renderHook(() => useContext(RosterCtx), { wrapper })
    act(() => result.current.dispatch({ type: 'SET_ROSTER_UUID', payload: 'roster-abc' }))
    expect(result.current.rosterUUID).toBe('roster-abc')
  })

  it('RESET_CTX restores state to initial values', () => {
    const { result } = renderHook(() => useContext(RosterCtx), { wrapper })
    act(() => result.current.dispatch({ type: 'SET_FORM_TYPE', payload: 'UpdateRosterPersonnel' }))
    act(() => result.current.dispatch({ type: 'SET_ROSTER_UUID', payload: 'roster-xyz' }))
    act(() => result.current.dispatch({ type: 'RESET_CTX' }))
    expect(result.current.formType).toBeUndefined()
    expect(result.current.rosterUUID).toBe('')
  })
})
