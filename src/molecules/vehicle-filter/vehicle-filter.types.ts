import type { GlobalClassNames } from '@global/global.types'

export type VehicleFilterOption = {
  label: string
  value: string
}

export type VehicleFilterProps = {
  label?: string
  options: VehicleFilterOption[]
  value: string
  onChange: (value: string) => void
} & GlobalClassNames
