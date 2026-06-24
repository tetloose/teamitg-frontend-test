import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Typography } from './typography.component'

describe('Typography component', () => {
  it('renders a span by default', () => {
    const { container } = render(<Typography />)

    expect(container.querySelector('span')).not.toBeNull()
  })

  it('renders the correct tag', () => {
    const { container } = render(<Typography tag="h1" />)

    expect(container.querySelector('h1')).not.toBeNull()
  })

  it('applies the base typography class', () => {
    const { container } = render(<Typography />)

    expect(container.querySelector('span')?.className).toContain('typography')
  })

  it('applies size BEM class', () => {
    const { container } = render(<Typography size="med" />)

    expect(container.querySelector('span')?.className).toContain(
      'typography--med'
    )
  })

  it('applies color BEM class', () => {
    const { container } = render(<Typography color="gray" />)

    expect(container.querySelector('span')?.className).toContain(
      'typography--gray'
    )
  })

  it('renders text prop', () => {
    const { getByText } = render(<Typography text="Hello" />)

    expect(getByText('Hello')).not.toBeNull()
  })

  it('renders children', () => {
    const { getByText } = render(<Typography>World</Typography>)

    expect(getByText('World')).not.toBeNull()
  })

  it('applies custom classNames', () => {
    const { container } = render(<Typography classNames={['custom-class']} />)

    expect(container.querySelector('span')?.className).toContain('custom-class')
  })
})
