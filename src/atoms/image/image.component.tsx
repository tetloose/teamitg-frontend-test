import { LazyLoadImage } from 'react-lazy-load-image-component'
import type { ImageProps } from './image.types'
import clsx from 'clsx'
import styles from './image.module.scss'
import 'react-lazy-load-image-component/src/effects/blur.css'

export const Image = ({
  classNames = [],
  position = 'center',
  size = 'cover',
  alt,
  width,
  height,
  src,
  placeholder,
  blur
}: ImageProps) => {
  if (!src) return

  return (
    <LazyLoadImage
      className={clsx(
        styles['image'],
        position && styles[`image--position-${position}`],
        size && styles[`image--${size}`],
        ...classNames
      )}
      src={src ?? ''}
      placeholderSrc={placeholder ?? ''}
      width={width ?? ''}
      height={height ?? ''}
      alt={alt ?? ''}
      effect={blur ? 'blur' : undefined}
    />
  )
}
