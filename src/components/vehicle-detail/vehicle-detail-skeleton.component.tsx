import { Grid } from '@atoms/grid/grid.component'
import { SKELETON } from '@global/global.constants'
import clsx from 'clsx'
import styles from './vehicle-detail-skeleton.module.scss'

export const VehicleDetailSkeleton = () => (
  <Grid.Item
    tag="output"
    classNames={[styles['vehicle-detail-skeleton']]}
    aria-label="Loading"
  >
    <div
      aria-hidden="true"
      className={clsx(SKELETON, styles['vehicle-detail-skeleton__image'])}
    />
    <div className={styles['vehicle-detail-skeleton__content']}>
      <div
        aria-hidden="true"
        className={clsx(SKELETON, styles['vehicle-detail-skeleton__title'])}
      />
      <div
        aria-hidden="true"
        className={clsx(SKELETON, styles['vehicle-detail-skeleton__body'])}
      />
    </div>
  </Grid.Item>
)
