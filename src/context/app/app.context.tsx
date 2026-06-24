import { createContext } from '@utils/create-context/create-context.context'
import { INITIAL_APP } from './app.constants'
import type { AppProps } from './app.types'

export const { Provider: AppProvider, useContextProvider: useAppContext } =
  createContext<AppProps, 'app', 'updateApp'>(
    INITIAL_APP,
    'app',
    'updateApp',
    'AppContext'
  )
