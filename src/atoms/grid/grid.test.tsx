import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Grid } from './grid.component'

describe('Grid component', () => {
  it('renders a div by default', () => {
    const { container } = render(<Grid />)

    expect(container.querySelector('div')).not.toBeNull()
  })

  it('renders the correct tag', () => {
    const { container } = render(<Grid tag="section" />)

    expect(container.querySelector('section')).not.toBeNull()
  })

  it('applies the base grid class', () => {
    const { container } = render(<Grid />)

    expect(container.querySelector('div')?.className).toContain('grid')
  })

  it('applies gap BEM modifier', () => {
    const { container } = render(<Grid gap="med" />)

    expect(container.querySelector('div')?.className).toContain('grid--gap-med')
  })

  it('applies cols BEM modifier', () => {
    const { container } = render(<Grid cols={3} />)

    expect(container.querySelector('div')?.className).toContain('grid--cols-3')
  })

  it('applies mobileCols BEM modifier', () => {
    const { container } = render(<Grid mobileCols={2} />)

    expect(container.querySelector('div')?.className).toContain(
      'grid--mobile-cols-2'
    )
  })

  it('applies tabletCols BEM modifier', () => {
    const { container } = render(<Grid tabletCols={3} />)

    expect(container.querySelector('div')?.className).toContain(
      'grid--tablet-cols-3'
    )
  })

  it('applies desktopCols BEM modifier', () => {
    const { container } = render(<Grid desktopCols={4} />)

    expect(container.querySelector('div')?.className).toContain(
      'grid--desktop-cols-4'
    )
  })

  it('applies custom classNames', () => {
    const { container } = render(<Grid classNames={['custom-class']} />)

    expect(container.querySelector('div')?.className).toContain('custom-class')
  })

  it('renders children', () => {
    const { getByText } = render(
      <Grid>
        <span>child</span>
      </Grid>
    )

    expect(getByText('child')).not.toBeNull()
  })
})

describe('Grid.Item component', () => {
  it('renders a div by default', () => {
    const { container } = render(<Grid.Item />)

    expect(container.querySelector('div')).not.toBeNull()
  })

  it('renders the correct tag', () => {
    const { container } = render(<Grid.Item tag="article" />)

    expect(container.querySelector('article')).not.toBeNull()
  })

  it('applies the BEM element class', () => {
    const { container } = render(<Grid.Item />)

    expect(container.querySelector('div')?.className).toContain('grid__item')
  })

  it('applies custom classNames', () => {
    const { container } = render(<Grid.Item classNames={['custom-class']} />)

    expect(container.querySelector('div')?.className).toContain('custom-class')
  })

  it('renders children', () => {
    const { getByText } = render(
      <Grid.Item>
        <span>item child</span>
      </Grid.Item>
    )

    expect(getByText('item child')).not.toBeNull()
  })
})
