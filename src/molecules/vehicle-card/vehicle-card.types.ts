import type { GlobalClassNames, GlobalIsLoading } from '@global/global.types'
import type { Vehicles } from '@hooks/use-vehicles/use-vehicles.types'

export type VehicleCardProps = Pick<
  Vehicles,
  'id' | 'media' | 'description' | 'price'
> &
  GlobalIsLoading &
  GlobalClassNames
