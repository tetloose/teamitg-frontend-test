import { BREAKPOINTS } from '@global/global.constants'
import type { ImageProps } from './image.types'

export const imageMock: ImageProps = {
  src: 'https://picsum.photos/seed/default/1280/720',
  alt: 'A descriptive alt text',
  position: 'center',
  size: 'cover',
  blur: true
}

export const imageSourcesMock: ImageProps = {
  src: 'https://picsum.photos/seed/mobile/400/400',
  alt: 'Responsive image example',
  position: 'center',
  size: 'cover',
  blur: true,
  sources: [
    {
      srcSet: 'https://picsum.photos/seed/desktop/1280/720',
      media: `(min-width: ${BREAKPOINTS.desktop}px)`
    },
    {
      srcSet: 'https://picsum.photos/seed/tablet/768/432',
      media: `(min-width: ${BREAKPOINTS.tablet}px)`
    }
  ]
}
