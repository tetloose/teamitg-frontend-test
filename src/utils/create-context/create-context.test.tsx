import { act, renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { createContext } from './create-context.context'

type TEST_STATE = { count: number }

const { Provider, useContextProvider } = createContext<
  TEST_STATE,
  'state',
  'updateState'
>({ count: 0 }, 'state', 'updateState', 'TestContext')

describe('createContext', () => {
  it('provides the initial state to consumers', () => {
    const { result } = renderHook(() => useContextProvider(), {
      wrapper: Provider
    })

    expect(result.current.state.count).toBe(0)
  })

  it('updateState merges partial state', () => {
    const { result } = renderHook(() => useContextProvider(), {
      wrapper: Provider
    })

    act(() => result.current.updateState({ count: 5 }))

    expect(result.current.state.count).toBe(5)
  })

  it('throws when used outside its Provider', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})

    expect(() => renderHook(() => useContextProvider())).toThrow(
      'TestContext must be used within its corresponding Provider'
    )

    spy.mockRestore()
  })
})
