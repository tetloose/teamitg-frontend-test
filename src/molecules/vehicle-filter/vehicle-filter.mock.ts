import type { VehicleFilterProps } from './vehicle-filter.types'

export const vehicleFilterMock: VehicleFilterProps = {
  label: 'Filter by emissions',
  options: [
    { label: 'CO2 Emissions 99 g/km', value: '99' },
    { label: 'CO2 Emissions 129 g/km', value: '129' },
    { label: 'CO2 Emissions 149 g/km', value: '149' },
    { label: 'CO2 Emissions 234 g/km', value: '234' }
  ],
  value: 'all',
  onChange: () => {}
}
