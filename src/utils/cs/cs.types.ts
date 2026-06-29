export type ClassObject = { [key: string]: boolean | undefined | null }

export type ClassValue =
  | string
  | undefined
  | null
  | false
  | ClassValue[]
  | { [key: string]: boolean | undefined | null }
