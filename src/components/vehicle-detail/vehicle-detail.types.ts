import type { GlobalIsLoading } from '@global/global.types'
import type { Vehicles } from '@hooks/use-vehicles/use-vehicles.types'

export type VehicleDetailProps = {
  vehicle: Vehicles | null
} & GlobalIsLoading
