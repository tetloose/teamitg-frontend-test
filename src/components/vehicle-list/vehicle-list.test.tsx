import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { VehicleList } from './vehicle-list.component'
import {
  vehicleListErrorMock,
  vehicleListLoadingMock,
  vehicleListMock
} from './vehicle-list.mock'

const renderList = (props: typeof vehicleListMock) =>
  render(<VehicleList {...props} />)

describe('VehicleList', () => {
  it('renders skeleton cards when vehiclesPending is true', () => {
    renderList(vehicleListLoadingMock)

    expect(
      screen.getAllByRole('status', { name: 'Loading' }).length
    ).toBeGreaterThan(0)
  })

  it('renders not found when vehicles is null', () => {
    renderList(vehicleListErrorMock)

    expect(screen.getByText('No vehicles')).toBeInTheDocument()
  })

  it('renders a card for each vehicle', () => {
    renderList(vehicleListMock)

    vehicleListMock.vehicles!.forEach((vehicle) => {
      expect(screen.getByText(vehicle.id)).toBeInTheDocument()
    })
  })

  it('does not render vehicle ids when loading', () => {
    renderList(vehicleListLoadingMock)

    vehicleListLoadingMock.vehicles!.forEach((vehicle) => {
      expect(screen.queryByText(vehicle.id)).toBeNull()
    })
  })
})
