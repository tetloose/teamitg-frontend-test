import { describe, expect, it } from 'vitest'
import { vehiclesMock } from '@hooks/use-vehicles/use-vehicles.mock'
import { getMediaProps } from './get-media-props.util'

const media = vehiclesMock[0].media

describe('getMediaProps', () => {
  it('returns the last media item url as mediaSrc', () => {
    const { mediaSrc } = getMediaProps(media)

    expect(mediaSrc).toBe(media[media.length - 1].url)
  })

  it('returns the first media item name as mediaAlt', () => {
    const { mediaAlt } = getMediaProps(media)

    expect(mediaAlt).toBe(media[0].name)
  })

  it('returns mediaSources from getMediaSources', () => {
    const { mediaSources } = getMediaProps(media)

    expect(Array.isArray(mediaSources)).toBe(true)
  })
})
