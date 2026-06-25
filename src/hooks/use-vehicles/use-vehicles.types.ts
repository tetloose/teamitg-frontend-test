import type { ApiUrls } from '@crud/api/api.types'

export type VehicleMedia = {
  name: string
  url: string
}

export type Vehicle = {
  id: string
  modelYear: string
  apiUrl: string
  media: VehicleMedia[]
}

export type VehicleEmissions = {
  template: string
  value: number
}

export type VehicleMeta = {
  passengers: number
  drivetrain: string[]
  bodystyles: string[]
  emissions: VehicleEmissions
}

export type VehicleDetail = {
  id: string
  description: string
  price?: string
  meta?: VehicleMeta
}

export type Vehicles = Vehicle & VehicleDetail

export type FetchVehiclesProps = {
  url: ApiUrls
  id?: string
  signal: AbortSignal
}
