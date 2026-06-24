import { describe, expect, it } from 'vitest'
import { API_URLS } from './api.constants'
import { api } from './api.crud'

describe('api', () => {
  it('returns the base URL for a registered endpoint', () => {
    expect(api({ url: 'content' })).toBe(API_URLS.content)
  })

  it('appends resource as a path segment', () => {
    expect(api({ url: 'content', resource: 'item' })).toBe(
      `${API_URLS.content}/item`
    )
  })

  it('appends a single query param', () => {
    expect(api({ url: 'content', params: { page: 1 } })).toBe(
      `${API_URLS.content}?page=1`
    )
  })

  it('appends multiple query params', () => {
    const result = api({ url: 'content', params: { page: 1, limit: 10 } })

    expect(result).toContain('page=1')
    expect(result).toContain('limit=10')
  })

  it('appends resource and query params together', () => {
    const result = api({
      url: 'content',
      resource: 'item',
      params: { page: 2 }
    })

    expect(result).toBe(`${API_URLS.content}/item?page=2`)
  })

  it('ignores an empty params object', () => {
    expect(api({ url: 'content', params: {} })).toBe(API_URLS.content)
  })

  it('converts number param values to strings', () => {
    expect(api({ url: 'content', params: { limit: 20 } })).toBe(
      `${API_URLS.content}?limit=20`
    )
  })
})
