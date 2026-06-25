import { describe, expect, it } from 'vitest'
import { BREAKPOINTS } from '@global/global.constants'
import { getMediaSources } from './get-media-sources.util'

describe('getMediaSources', () => {
  it('returns an empty array for a single media item', () => {
    const result = getMediaSources([{ name: 'mobile', url: '/mobile.jpg' }])

    expect(result).toHaveLength(0)
  })

  it('returns one source for two media items mapped to the tablet breakpoint', () => {
    const result = getMediaSources([
      { name: 'tablet', url: '/tablet.jpg' },
      { name: 'mobile', url: '/mobile.jpg' }
    ])

    expect(result).toHaveLength(1)
    expect(result[0].srcSet).toBe('/tablet.jpg')
    expect(result[0].media).toBe(`(min-width: ${BREAKPOINTS.tablet}px)`)
  })

  it('returns two sources for three media items mapped to desktop then tablet', () => {
    const result = getMediaSources([
      { name: 'desktop', url: '/desktop.jpg' },
      { name: 'tablet', url: '/tablet.jpg' },
      { name: 'mobile', url: '/mobile.jpg' }
    ])

    expect(result).toHaveLength(2)
    expect(result[0].srcSet).toBe('/desktop.jpg')
    expect(result[0].media).toBe(`(min-width: ${BREAKPOINTS.desktop}px)`)
    expect(result[1].srcSet).toBe('/tablet.jpg')
    expect(result[1].media).toBe(`(min-width: ${BREAKPOINTS.tablet}px)`)
  })

  it('caps sources at two even when more than three media items are provided', () => {
    const result = getMediaSources([
      { name: 'a', url: '/a.jpg' },
      { name: 'b', url: '/b.jpg' },
      { name: 'c', url: '/c.jpg' },
      { name: 'd', url: '/d.jpg' }
    ])

    expect(result).toHaveLength(2)
  })
})
