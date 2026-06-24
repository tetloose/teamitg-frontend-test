import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'

const HomePage = lazy(() => import('@pages/home/home.page'))
const NotFound = lazy(() => import('@layouts/not-found/not-found.component'))

export const navigation: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '*',
    element: <NotFound />
  }
]
