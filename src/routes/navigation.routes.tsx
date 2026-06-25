import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'

const VehiclesPage = lazy(() => import('@pages/vehicles/vehicles.page'))
const NotFound = lazy(() => import('@layouts/not-found/not-found.component'))

export const navigation: RouteObject[] = [
  {
    path: '/',
    element: <VehiclesPage />
  },
  {
    path: '*',
    element: <NotFound />
  }
]
