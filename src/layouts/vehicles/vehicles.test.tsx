import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Vehicles } from './vehicles.component'
import {
  vehiclesLayoutErrorMock,
  vehiclesLayoutLoadingMock,
  vehiclesLayoutMock
} from './vehicles.mock'

const renderVehicles = (props: typeof vehiclesLayoutMock) =>
  render(<Vehicles {...props} />)

describe('Vehicles', () => {
  it('renders vehicle cards', () => {
    renderVehicles(vehiclesLayoutMock)

    expect(screen.getAllByRole('article')).toHaveLength(
      vehiclesLayoutMock.vehicles!.length
    )
  })

  it('renders skeleton cards when pending', () => {
    renderVehicles(vehiclesLayoutLoadingMock)

    expect(screen.getAllByRole('status')).toHaveLength(8)
  })

  it('renders not found when vehicles null', () => {
    renderVehicles(vehiclesLayoutErrorMock)

    expect(screen.getByText('No vehicles')).toBeInTheDocument()
  })
})
