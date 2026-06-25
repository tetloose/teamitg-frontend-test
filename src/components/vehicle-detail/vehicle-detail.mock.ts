import { vehiclesMock } from '@hooks/use-vehicles/use-vehicles.mock'
import type { VehicleDetailProps } from './vehicle-detail.types'

export const vehicleDetailMock: VehicleDetailProps = {
  vehicle: vehiclesMock[0],
  isLoading: false
}

export const vehicleDetailLoadingMock: VehicleDetailProps = {
  vehicle: null,
  isLoading: true
}
