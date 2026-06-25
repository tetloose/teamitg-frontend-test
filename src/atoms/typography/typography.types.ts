import type {
  TYPOGRAPHY_COLORS,
  TYPOGRAPHY_TAGS,
  TYPOGRAPHY_TRANSFORMS,
  TYPOGRAPHY_WEIGHTS
} from './typography.constants'
import type {
  GlobalChildren,
  GlobalClassNames,
  GlobalSizes
} from '@global/global.types'

export type TypographyTag = (typeof TYPOGRAPHY_TAGS)[number]
export type TypographyColor = (typeof TYPOGRAPHY_COLORS)[number]
export type TypographyWeight = (typeof TYPOGRAPHY_WEIGHTS)[number]
export type TypographyTransform = (typeof TYPOGRAPHY_TRANSFORMS)[number]

export type TypographyProps = {
  tag?: TypographyTag
  size?: GlobalSizes
  color?: TypographyColor
  weight?: TypographyWeight
  transform?: TypographyTransform
  text?: string
} & GlobalClassNames &
  GlobalChildren
