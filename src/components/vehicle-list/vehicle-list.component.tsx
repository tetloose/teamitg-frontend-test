import { useState } from 'react'
import { Grid } from '@atoms/grid/grid.component'
import { VehicleCard } from '@molecules/vehicle-card/vehicle-card.component'
import { VehicleFilter } from '@molecules/vehicle-filter/vehicle-filter.component'
import { VEHICLE_FILTER_ALL_VALUE } from '@molecules/vehicle-filter/vehicle-filter.constants'
import NotFound from '@layouts/not-found/not-found.component'
import { VEHICLE_LIST_SKELETON_IDS } from './vehicle-list.constants'
import { getEmissionsOptions, getFilteredVehicles } from './vehicle-list.utils'
import type { VehicleListProps } from './vehicle-list.types'
import styles from './vehicle-list.module.scss'

export const VehicleList = ({
  vehicles,
  vehiclesPending,
  vehiclesError,
  onSelect,
  classNames = []
}: VehicleListProps) => {
  const [emissionsFilter, setEmissionsFilter] = useState(
    VEHICLE_FILTER_ALL_VALUE
  )

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

  const emissionsOptions = getEmissionsOptions(vehicles)
  const filteredVehicles = getFilteredVehicles(vehicles, emissionsFilter)

  return (
    <>
      <VehicleFilter
        label="Filter by emissions"
        options={emissionsOptions}
        value={emissionsFilter}
        onChange={setEmissionsFilter}
      />
      <Grid
        classNames={[...classNames]}
        tag="section"
        mobileCols={1}
        tabletCols={2}
        desktopCols={4}
      >
        {filteredVehicles.map((vehicle) => (
          <VehicleCard
            key={vehicle.id}
            classNames={[styles['vehicle-list__item']]}
            id={vehicle.id}
            media={vehicle.media}
            description={vehicle.description}
            price={vehicle.price}
            isLoading={vehiclesPending}
            onSelect={() => onSelect?.(vehicle)}
          />
        ))}
      </Grid>
    </>
  )
}
