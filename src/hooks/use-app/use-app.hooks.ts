import { useAppContext } from '@context/app/app.context'

export const useApp = () => {
  const { app, updateApp } = useAppContext()
  const { welcome = '' } = app || {}

  return {
    app,
    updateApp,
    welcome
  }
}
