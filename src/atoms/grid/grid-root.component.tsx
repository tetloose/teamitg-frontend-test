import type { GridRootProps } from './grid.types'
import clsx from 'clsx'
import styles from './grid.module.scss'

export const GridRoot = ({
  classNames = [],
  tag = 'div',
  gap,
  cols,
  mobileCols,
  tabletCols,
  desktopCols,
  children,
  ...rest
}: GridRootProps) => {
  const Tag = tag

  return (
    <Tag
      className={clsx(
        styles['grid'],
        gap && styles[`grid--gap-${gap}`],
        cols && styles[`grid--cols-${cols}`],
        mobileCols && styles[`grid--mobile-cols-${mobileCols}`],
        tabletCols && styles[`grid--tablet-cols-${tabletCols}`],
        desktopCols && styles[`grid--desktop-cols-${desktopCols}`],
        ...classNames
      )}
      {...rest}
    >
      {children}
    </Tag>
  )
}
