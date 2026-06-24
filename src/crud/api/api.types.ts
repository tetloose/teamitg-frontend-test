export type ApiUrls = 'content'

export type ApiProps = {
  url: ApiUrls
  resource?: string
  params?: Record<string, string | number>
}
