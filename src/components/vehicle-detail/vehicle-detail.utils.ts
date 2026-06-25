import type { VehicleEmissions } from '@hooks/use-vehicles/use-vehicles.types'

export const formatEmissions = (emissions: VehicleEmissions): string =>
  emissions.template.replace('$value', String(emissions.value))
