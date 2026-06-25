import { Grid } from '@atoms/grid/grid.component'
import { VehicleCard } from '@molecules/vehicle-card/vehicle-card.component'
import NotFound from '@layouts/not-found/not-found.component'
import { VEHICLE_LIST_SKELETON_IDS } from './vehicle-list.constants'
import type { VehicleListProps } from './vehicle-list.types'
import styles from './vehicle-list.module.scss'

export const VehicleList = ({
  vehicles,
  vehiclesPending,
  vehiclesError,
  classNames = []
}: VehicleListProps) => {
  if (vehiclesPending) {
    return (
      <Grid
        tag="section"
        classNames={[...classNames]}
        mobileCols={1}
        tabletCols={2}
        desktopCols={4}
      >
        {VEHICLE_LIST_SKELETON_IDS.map((id) => (
          <VehicleCard
            key={id}
            classNames={[styles['vehicle-list__item']]}
            isLoading
            id=""
            media={[]}
            description=""
          />
        ))}
      </Grid>
    )
  }

  if (!vehicles) {
    return (
      <NotFound
        title="No vehicles"
        body="available"
        error={vehiclesError ?? undefined}
      />
    )
  }

  return (
    <Grid
      classNames={[...classNames]}
      tag="section"
      mobileCols={1}
      tabletCols={2}
      desktopCols={4}
    >
      {vehicles.map((vehicle) => (
        <VehicleCard
          key={vehicle.id}
          classNames={[styles['vehicle-list__item']]}
          id={vehicle.id}
          media={vehicle.media}
          description={vehicle.description}
          price={vehicle.price}
          isLoading={vehiclesPending}
        />
      ))}
    </Grid>
  )
}
