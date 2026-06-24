import type { GridSharedProps } from './grid.types'
import clsx from 'clsx'
import styles from './grid.module.scss'

export const GridItem = ({
  classNames = [],
  tag = 'div',
  children,
  ...rest
}: GridSharedProps) => {
  const Tag = tag

  return (
    <Tag className={clsx(styles['grid__item'], ...classNames)} {...rest}>
      {children}
    </Tag>
  )
}
