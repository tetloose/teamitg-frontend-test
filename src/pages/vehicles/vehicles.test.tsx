import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { useContent } from '@hooks/use-content/use-content.hooks'
import { useVehicles } from '@hooks/use-vehicles/use-vehicles.hooks'
import { vehiclesMock } from '@hooks/use-vehicles/use-vehicles.mock'
import VehiclesPage from './vehicles.page'

vi.mock('@hooks/use-vehicles/use-vehicles.hooks')
vi.mock('@hooks/use-content/use-content.hooks')

const mockDefaults = () => {
  vi.mocked(useContent).mockReturnValue({
    content: { title: 'Our Vehicles', subtitle: 'Explore the Jaguar range' },
    contentPending: false,
    contentError: null
  })
}

describe('VehiclesPage', () => {
  it('passes vehicles to Vehicles layout', () => {
    mockDefaults()
    vi.mocked(useVehicles).mockReturnValue({
      vehicles: vehiclesMock,
      vehiclesPending: false,
      vehiclesError: null
    })

    render(<VehiclesPage />)

    expect(screen.getAllByRole('article')).toHaveLength(vehiclesMock.length)
  })

  it('passes loading state to Vehicles layout', () => {
    mockDefaults()
    vi.mocked(useVehicles).mockReturnValue({
      vehicles: null,
      vehiclesPending: true,
      vehiclesError: null
    })

    render(<VehiclesPage />)

    expect(screen.getAllByRole('status')).toHaveLength(8)
  })

  it('passes error state to Vehicles layout', () => {
    mockDefaults()
    vi.mocked(useVehicles).mockReturnValue({
      vehicles: null,
      vehiclesPending: false,
      vehiclesError: new Error('Failed')
    })

    render(<VehiclesPage />)

    expect(screen.getByText('No vehicles')).toBeInTheDocument()
  })
})
