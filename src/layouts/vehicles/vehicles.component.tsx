import { VehicleList } from '@components/vehicle-list/vehicle-list.component'
import { Typography } from '@atoms/typography/typography.component'
import type { VehiclesProps } from './vehicles.types'
import styles from './vehicles.module.scss'

export const Vehicles = ({
  title,
  subtitle,
  vehicles,
  vehiclesPending,
  vehiclesError,
  onSelect
}: VehiclesProps) => (
  <main className={styles['vehicles']}>
    {title ? (
      <header className={styles['vehicles__header']}>
        <Typography
          tag="h1"
          size="xlrg"
          weight="bold"
          transform="uppercase"
          text={title}
        />
        {subtitle ? (
          <Typography
            classNames={[styles['vehicles__description']]}
            tag="p"
            size="med"
            color="gray"
            text={subtitle}
          />
        ) : null}
      </header>
    ) : null}
    <VehicleList
      classNames={[styles['vehicles__items']]}
      vehicles={vehicles}
      vehiclesPending={vehiclesPending}
      vehiclesError={vehiclesError}
      onSelect={onSelect}
    />
  </main>
)
