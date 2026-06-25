import { getMediaSources } from '@utils/get-media-sources/get-media-sources.util'
import type { VehicleMedia } from '@hooks/use-vehicles/use-vehicles.types'

export const getMediaProps = (media: VehicleMedia[]) => ({
  mediaSrc: media.at(-1)?.url,
  mediaAlt: media[0]?.name,
  mediaSources: getMediaSources(media)
})
