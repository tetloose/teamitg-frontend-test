import { beforeEach, describe, expect, it, vi } from 'vitest'
import { API_URLS } from '@crud/api/api.constants'
import { request } from '@crud/request/request.crud'
import { contentMock } from './use-content.mock'
import { fetchContent } from './use-content.utils'

vi.mock('@crud/request/request.crud', () => ({
  request: vi.fn()
}))

describe('fetchContent', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('calls request with the content URL and GET method', async () => {
    vi.mocked(request).mockResolvedValue(contentMock)
    const signal = new AbortController().signal

    await fetchContent(signal)

    expect(request).toHaveBeenCalledWith({
      url: API_URLS.content,
      method: 'GET',
      signal
    })
  })

  it('returns the content data', async () => {
    vi.mocked(request).mockResolvedValue(contentMock)
    const signal = new AbortController().signal

    const result = await fetchContent(signal)

    expect(result).toEqual(contentMock)
  })

  it('propagates errors from request', async () => {
    vi.mocked(request).mockRejectedValue(new Error('Network error'))
    const signal = new AbortController().signal

    await expect(fetchContent(signal)).rejects.toThrow('Network error')
  })
})
