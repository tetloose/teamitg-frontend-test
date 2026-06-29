import {
  VEHICLE_FILTER_ALL_LABEL,
  VEHICLE_FILTER_ALL_VALUE
} from './vehicle-filter.constants'
import type { VehicleFilterProps } from './vehicle-filter.types'
import clsx from 'clsx'
import styles from './vehicle-filter.module.scss'

export const VehicleFilter = ({
  label,
  options,
  value,
  onChange,
  classNames = []
}: VehicleFilterProps) => (
  <div className={clsx(styles['vehicle-filter'], ...classNames)}>
    {label ? (
      <label
        className={styles['vehicle-filter__label']}
        htmlFor="vehicle-filter-select"
      >
        {label}
      </label>
    ) : null}
    <select
      id="vehicle-filter-select"
      className={styles['vehicle-filter__select']}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value={VEHICLE_FILTER_ALL_VALUE}>
        {VEHICLE_FILTER_ALL_LABEL}
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
)
