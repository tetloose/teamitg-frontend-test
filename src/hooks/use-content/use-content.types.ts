import type { VehiclesContent } from '@hooks/use-vehicles/use-vehicles.types'

export type Content = {
  vehicles: VehiclesContent
}

export type ContentProps<T, K extends keyof T> = K extends keyof T
  ? T[K]
  : never

export type ContentReturn<K extends keyof Content> = {
  content: ContentProps<Content, K> | null
  contentPending: boolean
  contentError: Error | null
}
