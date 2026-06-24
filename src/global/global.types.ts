import type { SIZES } from './global.constants'
import type { ReactNode } from 'react'

export type GlobalClassNames = {
  classNames?: string[]
}

export type GlobalChildren = {
  children?: ReactNode | ReactNode[]
}

export type GlobalSizes = (typeof SIZES)[number]

export type Tags =
  | 'main'
  | 'div'
  | 'span'
  | 'section'
  | 'article'
  | 'footer'
  | 'header'
  | 'aside'

export type GlobalHtmlTag = {
  tag?: Tags
}
