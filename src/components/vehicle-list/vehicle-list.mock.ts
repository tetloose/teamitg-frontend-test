import { vehiclesMock } from '@hooks/use-vehicles/use-vehicles.mock'
import type { VehicleListProps } from './vehicle-list.types'

export const vehicleListMock: VehicleListProps = {
  vehicles: vehiclesMock,
  vehiclesPending: false,
  vehiclesError: null
}

export const vehicleListLoadingMock: VehicleListProps = {
  vehicles: vehiclesMock,
  vehiclesPending: true,
  vehiclesError: null
}

export const vehicleListErrorMock: VehicleListProps = {
  vehicles: null,
  vehiclesPending: false,
  vehiclesError: new Error('Failed to fetch vehicles')
}
