import { useVehicles } from '@hooks/use-vehicles/use-vehicles.hooks'
import { Vehicles } from '@layouts/vehicles/vehicles.component'

const VehiclesPage = () => {
  const { vehicles, vehiclesPending, vehiclesError } = useVehicles()

  return (
    <Vehicles
      vehicles={vehicles}
      vehiclesPending={vehiclesPending}
      vehiclesError={vehiclesError}
    />
  )
}

export default VehiclesPage
