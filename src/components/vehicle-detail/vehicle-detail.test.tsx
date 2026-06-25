import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import VehicleDetail from './vehicle-detail.component'
import {
  vehicleDetailLoadingMock,
  vehicleDetailMock
} from './vehicle-detail.mock'

describe('VehicleDetail', () => {
  it('renders vehicle id, price, and description', () => {
    render(<VehicleDetail {...vehicleDetailMock} />)

    expect(screen.getByText(vehicleDetailMock.vehicle!.id)).toBeInTheDocument()
    expect(
      screen.getByText(`From ${vehicleDetailMock.vehicle!.price}`)
    ).toBeInTheDocument()
    expect(
      screen.getByText(vehicleDetailMock.vehicle!.description)
    ).toBeInTheDocument()
  })

  it('renders meta information', () => {
    render(<VehicleDetail {...vehicleDetailMock} />)

    expect(screen.getByLabelText('Passengers')).toBeInTheDocument()
    expect(screen.getByLabelText('Drivetrain')).toBeInTheDocument()
  })

  it('renders skeleton when loading', () => {
    render(<VehicleDetail {...vehicleDetailLoadingMock} />)

    expect(screen.getByRole('status', { name: 'Loading' })).toBeInTheDocument()
  })

  it('renders nothing when vehicle is null and not loading', () => {
    const { container } = render(
      <VehicleDetail vehicle={null} isLoading={false} />
    )

    expect(container.firstChild).toBeNull()
  })
})
