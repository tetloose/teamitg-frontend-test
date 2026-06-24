import { createContext as create, useContext, useMemo, useState } from 'react'
import type { ContextProviderProps, ContextType } from './create-context.types'

export function createContext<T, S extends string, U extends string>(
  initialState: T,
  stateName: S,
  updateStateName: U,
  contextName: string
) {
  const Context = create<ContextType<T, S, U> | undefined>(undefined)
  Context.displayName = contextName

  const Provider = ({ children }: ContextProviderProps) => {
    const [state, setState] = useState<T>(initialState)

    const updateState = (newState: Partial<T>) => {
      setState((prev) => ({ ...prev, ...newState }))
    }

    const value = useMemo(
      () =>
        ({ [stateName]: state, [updateStateName]: updateState }) as ContextType<
          T,
          S,
          U
        >,
      [state]
    )

    return <Context.Provider value={value}>{children}</Context.Provider>
  }

  const useContextProvider = (): ContextType<T, S, U> => {
    const context = useContext(Context)

    if (!context) {
      throw new Error(
        `${contextName} must be used within its corresponding Provider`
      )
    }

    return context
  }

  return { Provider, useContextProvider }
}
