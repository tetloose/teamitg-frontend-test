import { beforeEach, describe, expect, it, vi } from 'vitest'
import { request } from './request.crud'

const mockJson = vi.fn()

const mockFetch = (ok: boolean = true) =>
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok, json: mockJson }))

describe('request', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('calls fetch with the correct URL and method', async () => {
    mockFetch()
    mockJson.mockResolvedValue({})

    await request({ url: 'api/content.json', method: 'GET' })

    expect(fetch).toHaveBeenCalledWith(
      'api/content.json',
      expect.objectContaining({ method: 'GET' })
    )
  })

  it('sends the correct headers', async () => {
    mockFetch()
    mockJson.mockResolvedValue({})

    await request({ url: 'api/content.json', method: 'GET' })

    expect(fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json; charset=UTF-8'
        }
      })
    )
  })

  it('returns the parsed JSON response', async () => {
    mockFetch()
    mockJson.mockResolvedValue({ data: 'test' })

    const result = await request({ url: 'api/content.json', method: 'GET' })

    expect(result).toEqual({ data: 'test' })
  })

  it('throws Network error when response is not ok', async () => {
    mockFetch(false)

    await expect(
      request({ url: 'api/content.json', method: 'GET' })
    ).rejects.toThrow('Network error')
  })

  it('includes a serialised body for write requests', async () => {
    mockFetch()
    mockJson.mockResolvedValue({})
    const body = { name: 'test' }

    await request({ url: 'api/content.json', method: 'POST', body })

    expect(fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({ body: JSON.stringify(body) })
    )
  })

  it('passes the AbortSignal to fetch', async () => {
    mockFetch()
    mockJson.mockResolvedValue({})
    const signal = new AbortController().signal

    await request({ url: 'api/content.json', method: 'GET', signal })

    expect(fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({ signal })
    )
  })
})
