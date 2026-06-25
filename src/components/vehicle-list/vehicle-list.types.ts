import type { GlobalClassNames } from '@global/global.types'
import type { Vehicles } from '@hooks/use-vehicles/use-vehicles.types'

export type VehicleListProps = {
  vehicles: Vehicles[] | null
  vehiclesPending: boolean
  vehiclesError: Error | null
} & GlobalClassNames
