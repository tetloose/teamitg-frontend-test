import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Loading } from './loading.component'

describe('Loading component', () => {
  it('renders a span element', () => {
    const { container } = render(<Loading />)

    expect(container.querySelector('span')).not.toBeNull()
  })

  it('applies the base loading class', () => {
    const { container } = render(<Loading />)
    const span = container.querySelector('span')

    expect(span?.className).toContain('loading')
  })

  it('applies custom classNames', () => {
    const { container } = render(<Loading classNames={['custom-class']} />)
    const span = container.querySelector('span')

    expect(span?.className).toContain('custom-class')
  })
})
