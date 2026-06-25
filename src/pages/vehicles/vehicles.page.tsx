import { useState } from 'react'
import { useContent } from '@hooks/use-content/use-content.hooks'
import { useVehicles } from '@hooks/use-vehicles/use-vehicles.hooks'
import VehicleDetail from '@components/vehicle-detail/vehicle-detail.component'
import { Modal } from '@atoms/modal/modal.component'
import { Vehicles as VehiclesLayout } from '@layouts/vehicles/vehicles.component'
import type { Vehicles } from '@hooks/use-vehicles/use-vehicles.types'

const VehiclesPage = () => {
  const { vehicles, vehiclesPending, vehiclesError } = useVehicles()
  const { content } = useContent('vehicles')
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicles | null>(null)

  return (
    <>
      <VehiclesLayout
        title={content?.title}
        subtitle={content?.subtitle ?? undefined}
        vehicles={vehicles}
        vehiclesPending={vehiclesPending}
        vehiclesError={vehiclesError}
        onSelect={setSelectedVehicle}
      />
      <Modal
        isOpen={selectedVehicle !== null}
        onClose={() => setSelectedVehicle(null)}
        labelledBy="vehicle-detail-title"
      >
        <VehicleDetail vehicle={selectedVehicle} isLoading={!selectedVehicle} />
      </Modal>
    </>
  )
}

export default VehiclesPage
