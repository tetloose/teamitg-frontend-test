import type { ClassObject, ClassValue } from './cs.types'

const resolveObject = (obj: ClassObject): string[] =>
  Object.entries(obj)
    .filter(([, v]) => v)
    .map(([k]) => k)

const resolve = (arg: ClassValue): string[] => {
  if (!arg) return []
  if (typeof arg === 'string') return [arg]
  if (Array.isArray(arg)) return arg.flatMap(resolve)

  return resolveObject(arg)
}

export const cs = (...args: ClassValue[]): string =>
  args.flatMap(resolve).join(' ')
