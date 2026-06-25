import { useEffect, useRef, useState } from 'react'
import { useNotification } from '@hooks/use-notification/use-notification.hooks'
import { getData } from './use-vehicles.services'
import type { Vehicles } from './use-vehicles.types'

export const useVehicles = () => {
  const [vehicles, setVehicles] = useState<Vehicles[] | null>(null)
  const [vehiclesPending, setVehiclesPending] = useState(false)
  const [vehiclesError, setVehiclesError] = useState<Error | null>(null)
  const notify = useNotification()
  // Ref keeps the controller stable across renders without triggering re-renders
  const controllerRef = useRef<AbortController | null>(null)

  useEffect(() => {
    controllerRef.current = new AbortController()
    const { signal } = controllerRef.current

    setVehiclesPending(true)
    setVehiclesError(null)

    getData(signal)
      .then(setVehicles)
      .catch((err: Error) => {
        // AbortError fires on unmount cleanup — not a real failure, safe to ignore
        if (err.name === 'AbortError') return
        setVehiclesError(err)
        notify(err, 'error')
      })
      .finally(() => setVehiclesPending(false))

    // Cancel the in-flight request if the component unmounts before it resolves
    return () => controllerRef.current?.abort()
  }, [notify])

  return { vehicles, vehiclesPending, vehiclesError }
}
