import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { vehiclesMock } from '@hooks/use-vehicles/use-vehicles.mock'
import { VehicleList } from './vehicle-list.component'
import {
  vehicleListErrorMock,
  vehicleListLoadingMock,
  vehicleListMock
} from './vehicle-list.mock'
import { getEmissionsOptions, getFilteredVehicles } from './vehicle-list.utils'

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

  it('renders the emissions filter when vehicles are present', () => {
    renderList(vehicleListMock)

    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })

  it('renders an option for each unique emissions value', () => {
    renderList(vehicleListMock)

    const uniqueEmissions = [
      ...new Set(
        vehicleListMock.vehicles!.map((v) => String(v.meta?.emissions.value))
      )
    ]

    expect(screen.getAllByRole('option')).toHaveLength(
      uniqueEmissions.length + 1
    )
  })

  it('filters vehicles when an emissions value is selected', () => {
    renderList(vehicleListMock)

    const target = vehicleListMock.vehicles![0]
    const targetValue = String(target.meta!.emissions.value)

    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: targetValue }
    })

    expect(screen.getByText(target.id)).toBeInTheDocument()

    vehicleListMock
      .vehicles!.filter((v) => String(v.meta?.emissions.value) !== targetValue)
      .forEach((v) => {
        expect(screen.queryByText(v.id)).toBeNull()
      })
  })

  it('shows all vehicles when filter is reset to all', () => {
    renderList(vehicleListMock)

    fireEvent.change(screen.getByRole('combobox'), {
      target: {
        value: String(vehicleListMock.vehicles![0].meta!.emissions.value)
      }
    })
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'all' } })

    vehicleListMock.vehicles!.forEach((vehicle) => {
      expect(screen.getByText(vehicle.id)).toBeInTheDocument()
    })
  })
})

describe('getEmissionsOptions', () => {
  it('returns an option for each unique emissions value', () => {
    const options = getEmissionsOptions(vehiclesMock)
    const uniqueValues = [
      ...new Set(vehiclesMock.map((v) => String(v.meta?.emissions.value)))
    ]

    expect(options).toHaveLength(uniqueValues.length)
  })

  it('replaces $value in the template with the emissions value', () => {
    const options = getEmissionsOptions(vehiclesMock)
    const first = vehiclesMock[0]
    const expected = first.meta!.emissions.template.replace(
      '$value',
      String(first.meta!.emissions.value)
    )

    expect(options[0].label).toBe(expected)
  })

  it('sets value as the stringified emissions number', () => {
    const options = getEmissionsOptions(vehiclesMock)

    expect(options[0].value).toBe(String(vehiclesMock[0].meta!.emissions.value))
  })

  it('deduplicates options with the same emissions value', () => {
    const duplicated = [vehiclesMock[0], vehiclesMock[0]]
    const options = getEmissionsOptions(duplicated)

    expect(options).toHaveLength(1)
  })
})

describe('getFilteredVehicles', () => {
  it('returns all vehicles when filter is "all"', () => {
    expect(getFilteredVehicles(vehiclesMock, 'all')).toEqual(vehiclesMock)
  })

  it('returns only vehicles matching the emissions value', () => {
    const target = vehiclesMock[0]
    const result = getFilteredVehicles(
      vehiclesMock,
      String(target.meta!.emissions.value)
    )

    expect(result).toHaveLength(1)
    expect(result[0].id).toBe(target.id)
  })

  it('returns an empty array when no vehicles match', () => {
    expect(getFilteredVehicles(vehiclesMock, '0')).toEqual([])
  })
})
