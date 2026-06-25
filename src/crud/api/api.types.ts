export type ApiUrls = 'content' | 'vehicles' | 'vehicle'

export type ApiProps = {
  url: ApiUrls
  resource?: string
  params?: Record<string, string | number>
}
