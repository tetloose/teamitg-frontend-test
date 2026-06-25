import { api } from '@crud/api/api.crud'
import { request } from '@crud/request/request.crud'
import type { FetchVehiclesProps } from './use-vehicles.types'

// The API does not follow a standard REST pattern — vehicle detail URLs are opaque paths
// stored on each list item rather than a predictable /vehicles/:id structure.
// To fake RESTful behaviour, API_URLS.vehicle is set to an empty string so passing a resource
// produces /api/vehicle_${id}.json pointing to the correct fixture.
// When the API moves to a proper REST structure, replace the resource construction with
// resource: id and update API_URLS.vehicle to 'api/vehicles' — no other changes needed.
export const fetchVehicles = <T>({
  url,
  id,
  signal
}: FetchVehiclesProps): Promise<T> => {
  return request({
    url: api({
      url,
      resource: id && `api/vehicle_${id}.json`
    }),
    method: 'GET',
    signal
  })
}
