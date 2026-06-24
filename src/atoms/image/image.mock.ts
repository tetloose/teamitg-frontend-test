import Placeholder from '@images/test/placeholder.jpg'
import type { ImageProps } from './image.types'

export const imageMock: ImageProps = {
  src: Placeholder,
  alt: 'A descriptive alt text',
  placeholder: Placeholder,
  position: 'center',
  size: 'cover',
  blur: true
}
