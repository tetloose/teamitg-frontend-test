import { BREAKPOINTS } from '@global/global.constants'
import type { ImageSource } from '@atoms/image/image.types'
import type { VehicleMedia } from '@hooks/use-vehicles/use-vehicles.types'

// Ordered largest-first so <picture> min-width matching works correctly —
// the browser takes the first matching source
const MEDIA_BREAKPOINTS = [BREAKPOINTS.desktop, BREAKPOINTS.tablet] as const

// Builds responsive <source> entries from the media array.
// The last item is always the mobile fallback (used as <img src>), so it is
// excluded here. Sources are sliced from the end of MEDIA_BREAKPOINTS so that
// a single image maps to tablet (covering desktop too), and two images map to
// desktop + tablet respectively.
export const getMediaSources = (media: VehicleMedia[]): ImageSource[] => {
  const sourceItems = media.slice(0, -1).slice(0, 2)
  const breakpoints = MEDIA_BREAKPOINTS.slice(
    MEDIA_BREAKPOINTS.length - sourceItems.length
  )

  return sourceItems.map((item, i) => ({
    srcSet: item.url,
    media: `(min-width: ${breakpoints[i]}px)`
  }))
}
