import type { RequestProps } from './request.types'

export const request = async ({ url, method, body, signal }: RequestProps) => {
  const fetchOptions: RequestInit = {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=UTF-8'
    },
    signal
  }

  if (body) fetchOptions.body = JSON.stringify(body)

  const response = await fetch(url, fetchOptions)

  if (!response.ok) throw new Error('Network error')

  return await response.json()
}
