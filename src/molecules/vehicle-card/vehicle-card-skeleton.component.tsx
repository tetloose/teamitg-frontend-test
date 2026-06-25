import { Grid } from '@atoms/grid/grid.component'
import { SKELETON } from '@global/global.constants'
import type { VehicleCardSkeletonProps } from './vehicle-card.types'
import clsx from 'clsx'
import styles from './vehicle-card-skeleton.module.scss'

export const VehicleCardSkeleton = ({
  classNames = []
}: VehicleCardSkeletonProps) => {
  return (
    <Grid.Item
      tag="output"
      classNames={[styles['vehicle-card-skeleton'], ...classNames]}
      aria-label="Loading"
    >
      <div
        aria-hidden="true"
        className={clsx(
          SKELETON,
          styles['vehicle-card-skeleton__item'],
          styles['vehicle-card-skeleton__image']
        )}
      />
      <div className={styles['vehicle-card-skeleton__inside']}>
        <div
          aria-hidden="true"
          className={clsx(
            SKELETON,
            styles['vehicle-card-skeleton__item'],
            styles['vehicle-card-skeleton__item--centred'],
            styles['vehicle-card-skeleton__title']
          )}
        />
        <div
          aria-hidden="true"
          className={clsx(
            SKELETON,
            styles['vehicle-card-skeleton__item'],
            styles['vehicle-card-skeleton__item--centred'],
            styles['vehicle-card-skeleton__price']
          )}
        />
        <div
          aria-hidden="true"
          className={clsx(
            SKELETON,
            styles['vehicle-card-skeleton__item'],
            styles['vehicle-card-skeleton__item--centred'],
            styles['vehicle-card-skeleton__description']
          )}
        />
      </div>
    </Grid.Item>
  )
}
