import { VehicleList } from '@components/vehicle-list/vehicle-list.component'
import { Typography } from '@atoms/typography/typography.component'
import type { VehiclesProps } from './vehicles.types'
import styles from './vehicles.module.scss'

export const Vehicles = ({
  vehicles,
  vehiclesPending,
  vehiclesError
}: VehiclesProps) => (
  <main className={styles['vehicles']}>
    <header className={styles['vehicles__header']}>
      <Typography
        tag="h1"
        size="xlrg"
        weight="bold"
        transform="uppercase"
        text="Our Vehicles"
      />
      <Typography
        classNames={[styles['vehicles__description']]}
        tag="p"
        size="med"
        color="gray"
        text="Explore the Jaguar range"
      />
    </header>
    <VehicleList
      classNames={[styles['vehicles__items']]}
      vehicles={vehicles}
      vehiclesPending={vehiclesPending}
      vehiclesError={vehiclesError}
    />
  </main>
)
