import { cs } from '@utils/cs/cs.utils'
import type { GridSharedProps } from './grid.types'
import styles from './grid.module.scss'

export const GridItem = ({
  classNames = [],
  tag = 'div',
  children,
  ...rest
}: GridSharedProps) => {
  const Tag = tag

  return (
    <Tag className={cs(styles['grid__item'], ...classNames)} {...rest}>
      {children}
    </Tag>
  )
}
