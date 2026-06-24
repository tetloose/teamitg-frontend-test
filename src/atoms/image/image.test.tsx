import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Image } from './image.component'
import { imageMock } from './image.mock'

describe('Image component', () => {
  it('renders nothing when src is missing', () => {
    const { container } = render(<Image />)

    expect(container.querySelector('img')).toBeNull()
  })

  it('renders an img element when src is provided', () => {
    const { container } = render(<Image {...imageMock} />)

    expect(container.querySelector('img')).not.toBeNull()
  })

  it('sets the alt attribute', () => {
    const { container } = render(<Image {...imageMock} />)
    const img = container.querySelector('img')

    expect(img?.getAttribute('alt')).toBe(imageMock.alt)
  })

  it('applies size BEM class', () => {
    const { container } = render(<Image {...imageMock} size="cover" />)
    const img = container.querySelector('img')

    expect(img?.className).toContain('image--cover')
  })

  it('applies position BEM class', () => {
    const { container } = render(<Image {...imageMock} position="center" />)
    const img = container.querySelector('img')

    expect(img?.className).toContain('image--position-center')
  })

  it('applies custom classNames', () => {
    const { container } = render(
      <Image {...imageMock} classNames={['custom-class']} />
    )
    const img = container.querySelector('img')

    expect(img?.className).toContain('custom-class')
  })
})
