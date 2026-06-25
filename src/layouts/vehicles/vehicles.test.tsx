import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Vehicles } from './vehicles.component'
import {
  vehiclesLayoutErrorMock,
  vehiclesLayoutLoadingMock,
  vehiclesLayoutMock
} from './vehicles.mock'

describe('Vehicles', () => {
  it('renders vehicle cards', () => {
    render(<Vehicles {...vehiclesLayoutMock} />)

    expect(screen.getAllByRole('article')).toHaveLength(
      vehiclesLayoutMock.vehicles!.length
    )
  })

  it('renders skeleton cards when pending', () => {
    render(<Vehicles {...vehiclesLayoutLoadingMock} />)

    expect(screen.getAllByRole('status')).toHaveLength(8)
  })

  it('renders not found when vehicles null', () => {
    render(<Vehicles {...vehiclesLayoutErrorMock} />)

    expect(screen.getByText('No vehicles')).toBeInTheDocument()
  })
})
