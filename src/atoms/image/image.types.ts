import type { IMAGE_POSITIONS, IMAGE_SIZES } from './image.constants'
import type { GlobalClassNames } from '@global/global.types'

export type ImageSize = (typeof IMAGE_SIZES)[number]
export type ImagePosition = (typeof IMAGE_POSITIONS)[number]

export type ImageSource = {
  srcSet: string
  media?: string
}

export type ImageProps = {
  src?: string
  width?: number
  height?: number
  alt?: string
  blur?: boolean
  size?: ImageSize
  position?: ImagePosition
  sources?: ImageSource[]
} & GlobalClassNames
