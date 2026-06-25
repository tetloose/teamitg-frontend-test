import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Image } from './image.component'
import { imageMock, imageSourcesMock } from './image.mock'

describe('Image component', () => {
  it('renders nothing when src is missing', () => {
    const { container } = render(<Image />)

    expect(container.querySelector('img')).toBeNull()
  })

  it('renders a picture element when src is provided', () => {
    const { container } = render(<Image {...imageMock} />)

    expect(container.querySelector('picture')).not.toBeNull()
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

  it('applies blur class before image loads', () => {
    const { container } = render(<Image {...imageMock} blur />)
    const img = container.querySelector('img')

    expect(img?.className).toContain('image--blur')
  })

  it('renders a source element per entry in sources', () => {
    const { container } = render(<Image {...imageSourcesMock} />)
    const sources = container.querySelectorAll('source')

    expect(sources).toHaveLength(imageSourcesMock.sources!.length)
  })

  it('sets the correct srcset and media on each source', () => {
    const { container } = render(<Image {...imageSourcesMock} />)
    const sources = container.querySelectorAll('source')

    imageSourcesMock.sources!.forEach(({ srcSet, media }, i) => {
      expect(sources[i].getAttribute('srcset')).toBe(srcSet)
      expect(sources[i].getAttribute('media')).toBe(media)
    })
  })
})
