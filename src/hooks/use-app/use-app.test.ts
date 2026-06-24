import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { AppProvider } from '@context/app/app.context'
import { useApp } from './use-app.hooks'

describe('useApp', () => {
  it('returns the initial welcome message', () => {
    const { result } = renderHook(() => useApp(), { wrapper: AppProvider })

    expect(result.current.welcome).toBe('Happy Coding!')
  })

  it('exposes the app state', () => {
    const { result } = renderHook(() => useApp(), { wrapper: AppProvider })

    expect(result.current.app).toEqual({ welcome: 'Happy Coding!' })
  })

  it('updateApp merges new state', () => {
    const { result } = renderHook(() => useApp(), { wrapper: AppProvider })

    act(() => result.current.updateApp({ welcome: 'Updated!' }))

    expect(result.current.welcome).toBe('Updated!')
  })
})
