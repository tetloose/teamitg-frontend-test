import {
  vehicleListErrorMock,
  vehicleListLoadingMock,
  vehicleListMock
} from '@components/vehicle-list/vehicle-list.mock'
import type { VehiclesProps } from './vehicles.types'

export const vehiclesLayoutMock: VehiclesProps = {
  title: 'Our Vehicles',
  subtitle: 'Explore the Jaguar range',
  ...vehicleListMock
}

export const vehiclesLayoutLoadingMock: VehiclesProps = vehicleListLoadingMock
export const vehiclesLayoutErrorMock: VehiclesProps = vehicleListErrorMock
