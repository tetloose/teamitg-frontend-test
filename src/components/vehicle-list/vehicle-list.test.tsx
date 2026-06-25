import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { VehicleList } from './vehicle-list.component'
import {
  vehicleListErrorMock,
  vehicleListLoadingMock,
  vehicleListMock
} from './vehicle-list.mock'

describe('VehicleList', () => {
  it('renders skeleton cards when vehiclesPending is true', () => {
    render(<VehicleList {...vehicleListLoadingMock} />)

    expect(
      screen.getAllByRole('status', { name: 'Loading' }).length
    ).toBeGreaterThan(0)
  })

  it('renders not found when vehicles is null', () => {
    render(<VehicleList {...vehicleListErrorMock} />)

    expect(screen.getByText('No vehicles')).toBeInTheDocument()
  })

  it('renders a card for each vehicle', () => {
    render(<VehicleList {...vehicleListMock} />)

    vehicleListMock.vehicles!.forEach((vehicle) => {
      expect(screen.getByText(vehicle.id)).toBeInTheDocument()
    })
  })

  it('does not render vehicle ids when loading', () => {
    render(<VehicleList {...vehicleListLoadingMock} />)

    vehicleListLoadingMock.vehicles!.forEach((vehicle) => {
      expect(screen.queryByText(vehicle.id)).toBeNull()
    })
  })
})
