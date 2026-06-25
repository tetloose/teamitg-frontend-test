import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { useVehicles } from '@hooks/use-vehicles/use-vehicles.hooks'
import { vehiclesMock } from '@hooks/use-vehicles/use-vehicles.mock'
import VehiclesPage from './vehicles.page'

vi.mock('@hooks/use-vehicles/use-vehicles.hooks')

describe('VehiclesPage', () => {
  it('passes vehicles to Vehicles layout', () => {
    vi.mocked(useVehicles).mockReturnValue({
      vehicles: vehiclesMock,
      vehiclesPending: false,
      vehiclesError: null
    })

    render(<VehiclesPage />)

    expect(screen.getAllByRole('article')).toHaveLength(vehiclesMock.length)
  })

  it('passes loading state to Vehicles layout', () => {
    vi.mocked(useVehicles).mockReturnValue({
      vehicles: null,
      vehiclesPending: true,
      vehiclesError: null
    })

    render(<VehiclesPage />)

    expect(screen.getAllByRole('status')).toHaveLength(8)
  })

  it('passes error state to Vehicles layout', () => {
    vi.mocked(useVehicles).mockReturnValue({
      vehicles: null,
      vehiclesPending: false,
      vehiclesError: new Error('Failed')
    })

    render(<VehiclesPage />)

    expect(screen.getByText('No vehicles')).toBeInTheDocument()
  })
})
