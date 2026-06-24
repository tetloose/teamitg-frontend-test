import type { ImageProps } from '@atoms/image/image.types'

export type Homepage = {
  id: string
  image?: ImageProps
  title?: string
  body?: string
}

export type Content = {
  homepage: Homepage[]
}

export type ContentProps<T, K extends keyof T> = K extends keyof T
  ? T[K]
  : never

export type ContentReturn<K extends keyof Content> = {
  content: ContentProps<Content, K> | null
  contentPending: boolean
  contentError: Error | null
}
