import { useState } from 'react'
import type { ImageProps } from './image.types'
import clsx from 'clsx'
import styles from './image.module.scss'

export const Image = ({
  classNames = [],
  position = 'center',
  size = 'cover',
  alt,
  width,
  height,
  src,
  blur,
  sources
}: ImageProps) => {
  const [loaded, setLoaded] = useState(false)

  if (!src) return null

  return (
    <picture className={styles['image__picture']}>
      {sources?.map(({ srcSet, media }) => (
        <source key={srcSet} srcSet={srcSet} media={media} />
      ))}
      <img
        className={clsx(
          styles['image'],
          position && styles[`image--position-${position}`],
          size && styles[`image--${size}`],
          blur && !loaded && styles['image--blur'],
          ...classNames
        )}
        src={src}
        alt={alt ?? ''}
        width={width}
        height={height}
        loading="lazy"
        onLoad={() => setLoaded(true)}
      />
    </picture>
  )
}
