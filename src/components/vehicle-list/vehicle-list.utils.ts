import { VEHICLE_FILTER_ALL_VALUE } from '@molecules/vehicle-filter/vehicle-filter.constants'
import type { Vehicles } from '@hooks/use-vehicles/use-vehicles.types'
import type { VehicleFilterOption } from '@molecules/vehicle-filter/vehicle-filter.types'

export const getEmissionsOptions = (
  vehicles: Vehicles[]
): VehicleFilterOption[] =>
  vehicles
    .filter((v) => v.meta?.emissions)
    .map((v) => ({
      label: v.meta!.emissions.template.replace(
        '$value',
        String(v.meta!.emissions.value)
      ),
      value: String(v.meta!.emissions.value)
    }))
    .filter((opt, i, arr) => arr.findIndex((o) => o.value === opt.value) === i)

export const getFilteredVehicles = (
  vehicles: Vehicles[],
  emissionsFilter: string
): Vehicles[] => {
  if (emissionsFilter === VEHICLE_FILTER_ALL_VALUE) return vehicles

  return vehicles.filter(
    (v) => String(v.meta?.emissions.value) === emissionsFilter
  )
}
