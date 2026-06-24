import type { TYPOGRAPHY_COLORS, TYPOGRAPHY_TAGS } from './typography.constants'
import type {
  GlobalChildren,
  GlobalClassNames,
  GlobalSizes
} from '@global/global.types'

export type TypographyTag = (typeof TYPOGRAPHY_TAGS)[number]
export type TypographyColor = (typeof TYPOGRAPHY_COLORS)[number]

export type TypographyProps = {
  tag?: TypographyTag
  size?: GlobalSizes
  color?: TypographyColor
  text?: string
} & GlobalClassNames &
  GlobalChildren
