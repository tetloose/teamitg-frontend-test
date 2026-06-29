import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { VehicleFilter } from './vehicle-filter.component'
import { vehicleFilterMock } from './vehicle-filter.mock'

const renderFilter = (props: typeof vehicleFilterMock) =>
  render(<VehicleFilter {...props} />)

describe('VehicleFilter', () => {
  it('renders the label', () => {
    renderFilter(vehicleFilterMock)

    expect(screen.getByText('Filter by emissions')).toBeInTheDocument()
  })

  it('renders the "All emissions" default option', () => {
    renderFilter(vehicleFilterMock)

    expect(
      screen.getByRole('option', { name: 'All emissions' })
    ).toBeInTheDocument()
  })

  it('renders all passed options', () => {
    renderFilter(vehicleFilterMock)

    expect(screen.getAllByRole('option')).toHaveLength(
      vehicleFilterMock.options.length + 1
    )
  })

  it('calls onChange with the selected value', () => {
    const onChange = vi.fn()
    renderFilter({ ...vehicleFilterMock, onChange })

    fireEvent.change(screen.getByRole('combobox'), { target: { value: '99' } })

    expect(onChange).toHaveBeenCalledWith('99')
  })

  it('does not render a label element when label is omitted', () => {
    renderFilter({ ...vehicleFilterMock, label: undefined })

    expect(screen.queryByText('Filter by emissions')).not.toBeInTheDocument()
  })
})
