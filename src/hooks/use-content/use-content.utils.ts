import { API_URLS } from '@crud/api/api.constants'
import { request } from '@crud/request/request.crud'
import type { Content } from './use-content.types'

export const fetchContent = (signal: AbortSignal): Promise<Content> =>
  request({ url: API_URLS.content, method: 'GET', signal })
