import { describe, expect, it } from 'vitest'
import { formatEmissions } from './vehicle-detail.utils'

describe('formatEmissions', () => {
  it('replaces $value with the emissions value', () => {
    const result = formatEmissions({ template: '$value g/km', value: 120 })

    expect(result).toBe('120 g/km')
  })

  it('handles zero as a value', () => {
    const result = formatEmissions({ template: '$value g/km', value: 0 })

    expect(result).toBe('0 g/km')
  })
})
