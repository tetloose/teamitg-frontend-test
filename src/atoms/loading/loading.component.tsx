import type { LoadingProps } from './loading.types'
import clsx from 'clsx'
import styles from './loading.module.scss'

export const Loading = ({ classNames = [], ...rest }: LoadingProps) => {
  return <span className={clsx(styles['loading'], ...classNames)} {...rest} />
}
