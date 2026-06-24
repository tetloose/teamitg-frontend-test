import { API_URLS } from './api.constants'
import type { ApiProps } from './api.types'

export const api = ({ url, resource, params }: ApiProps): string => {
  let endpoint = API_URLS[url]

  if (resource) endpoint += `/${resource}`

  if (params && Object.keys(params).length > 0) {
    const query = new URLSearchParams()

    Object.entries(params).forEach(([key, value]) =>
      query.append(key, String(value))
    )

    endpoint += `?${query.toString()}`
  }

  return endpoint
}
