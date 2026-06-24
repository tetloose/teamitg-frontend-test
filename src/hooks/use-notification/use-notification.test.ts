import toast from 'react-hot-toast'
import { renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useNotification } from './use-notification.hooks'

vi.mock('react-hot-toast', () => ({
  default: Object.assign(vi.fn(), {
    success: vi.fn(),
    error: vi.fn(),
    loading: vi.fn()
  })
}))

describe('useNotification', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('calls toast.success for success type', () => {
    const { result } = renderHook(() => useNotification())

    result.current('Saved', 'success')

    expect(toast.success).toHaveBeenCalledWith('Saved')
  })

  it('calls toast.error for error type', () => {
    const { result } = renderHook(() => useNotification())

    result.current('Something went wrong', 'error')

    expect(toast.error).toHaveBeenCalledWith('Something went wrong')
  })

  it('calls toast.loading for loading type', () => {
    const { result } = renderHook(() => useNotification())

    result.current('Loading...', 'loading')

    expect(toast.loading).toHaveBeenCalledWith('Loading...')
  })

  it('calls toast for default type', () => {
    const { result } = renderHook(() => useNotification())

    result.current('Hello', 'default')

    expect(toast).toHaveBeenCalledWith('Hello')
  })

  it('extracts message from an Error instance', () => {
    const { result } = renderHook(() => useNotification())

    result.current(new Error('Network error'), 'error')

    expect(toast.error).toHaveBeenCalledWith('Network error')
  })

  it('returns a stable function reference across renders', () => {
    const { result, rerender } = renderHook(() => useNotification())
    const first = result.current

    rerender()

    expect(result.current).toBe(first)
  })
})
