import { lazy } from 'react'

const NotFound = lazy(() => import('@layouts/not-found/not-found.component'))

export const Boundary = ({ error }: { error: Error }) => (
  <NotFound error={error} />
)
