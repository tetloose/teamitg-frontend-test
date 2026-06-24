import { renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { useContent } from '@hooks/use-content/use-content.hooks'
import { contentMock } from '@hooks/use-content/use-content.mock'
import { useHome } from './use-home.hooks'

vi.mock('@hooks/use-content/use-content.hooks')

describe('useHome', () => {
  it('returns content from useContent with homepage filter', () => {
    vi.mocked(useContent).mockReturnValue({
      content: contentMock.homepage,
      contentPending: false,
      contentError: null
    })

    const { result } = renderHook(() => useHome())

    expect(useContent).toHaveBeenCalledWith('homepage')
    expect(result.current.content).toEqual(contentMock.homepage)
  })

  it('returns pending state', () => {
    vi.mocked(useContent).mockReturnValue({
      content: null,
      contentPending: true,
      contentError: null
    })

    const { result } = renderHook(() => useHome())

    expect(result.current.contentPending).toBe(true)
    expect(result.current.content).toBeNull()
  })

  it('returns error state', () => {
    const error = new Error('Network error')

    vi.mocked(useContent).mockReturnValue({
      content: null,
      contentPending: false,
      contentError: error
    })

    const { result } = renderHook(() => useHome())

    expect(result.current.contentError).toBe(error)
    expect(result.current.content).toBeNull()
  })
})
