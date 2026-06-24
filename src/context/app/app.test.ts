import { act, renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { INITIAL_APP } from './app.constants'
import { AppProvider, useAppContext } from './app.context'

describe('AppContext', () => {
  it('provides the initial app state', () => {
    const { result } = renderHook(() => useAppContext(), {
      wrapper: AppProvider
    })

    expect(result.current.app).toEqual(INITIAL_APP)
  })

  it('provides the initial welcome message', () => {
    const { result } = renderHook(() => useAppContext(), {
      wrapper: AppProvider
    })

    expect(result.current.app.welcome).toBe('Happy Coding!')
  })

  it('updateApp merges partial state', () => {
    const { result } = renderHook(() => useAppContext(), {
      wrapper: AppProvider
    })

    act(() => result.current.updateApp({ welcome: 'Updated!' }))

    expect(result.current.app.welcome).toBe('Updated!')
  })

  it('throws when used outside AppProvider', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})

    expect(() => renderHook(() => useAppContext())).toThrow(
      'AppContext must be used within its corresponding Provider'
    )

    spy.mockRestore()
  })
})
