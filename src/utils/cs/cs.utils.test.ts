import { describe, expect, it } from 'vitest'
import { cs } from './cs.utils'

describe('cs', () => {
  it('joins strings with a space', () => {
    expect(cs('foo', 'bar')).toBe('foo bar')
  })

  it('filters out falsy values', () => {
    expect(cs('foo', undefined, null, false, 'bar')).toBe('foo bar')
  })

  it('flattens nested arrays', () => {
    expect(cs(['foo', 'bar'], 'baz')).toBe('foo bar baz')
  })

  it('includes object keys where value is truthy', () => {
    expect(cs({ foo: true, bar: false, baz: true })).toBe('foo baz')
  })

  it('returns an empty string when all values are falsy', () => {
    expect(cs(undefined, null, false)).toBe('')
  })

  it('returns an empty string when called with no arguments', () => {
    expect(cs()).toBe('')
  })
})
