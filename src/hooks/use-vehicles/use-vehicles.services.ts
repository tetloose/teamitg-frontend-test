import { fetchVehicles } from './use-vehicles.utils'
import type { Vehicle, VehicleDetail, Vehicles } from './use-vehicles.types'

export const getData = async (signal: AbortSignal): Promise<Vehicles[]> => {
  // First request — fetch the list of vehicles from the known endpoint
  const vehicles = await fetchVehicles<Vehicle[]>({ url: 'vehicles', signal })

  // Promise.allSettled is used rather than Promise.all so that a single failing detail
  // request does not abort the entire list. Each result comes back with a status of
  // 'fulfilled' or 'rejected', allowing us to filter out individual failures and return
  // the vehicles that succeeded.
  const results = await Promise.allSettled(
    vehicles
      .filter((vehicle) => vehicle.apiUrl)
      .map((vehicle) =>
        fetchVehicles<VehicleDetail>({
          url: 'vehicle',
          id: vehicle.id,
          signal
        }).then((detail) => ({ ...vehicle, ...detail }))
      )
  )

  return results
    .filter(
      (result): result is PromiseFulfilledResult<Vehicles> =>
        result.status === 'fulfilled'
    )
    .filter((result) => result.value.price)
    .map((result) => result.value)
}
