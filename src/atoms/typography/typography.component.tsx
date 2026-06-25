import type { TypographyProps } from './typography.types'
import clsx from 'clsx'
import styles from './typography.module.scss'

export const Typography = ({
  classNames = [],
  tag = 'span',
  size = 'med',
  color = 'black',
  weight,
  transform,
  text,
  children,
  ...rest
}: TypographyProps) => {
  const Tag = tag

  return (
    <Tag
      className={clsx(
        styles['typography'],
        tag === 'em' && styles['typography--italic'],
        size && styles[`typography--${size}`],
        color && styles[`typography--${color}`],
        weight && styles[`typography--${weight}`],
        transform && styles[`typography--${transform}`],
        ...classNames
      )}
      {...rest}
    >
      {text}
      {children}
    </Tag>
  )
}
