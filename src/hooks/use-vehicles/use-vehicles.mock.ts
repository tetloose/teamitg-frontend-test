import type { Vehicles } from './use-vehicles.types'

export const vehiclesMock: Vehicles[] = [
  {
    id: 'xe',
    modelYear: 'k17',
    apiUrl: '/api/vehicle_xe.json',
    media: [
      { name: 'vehicle', url: '/images/16x9/xe_k17.jpg' },
      { name: 'vehicle', url: '/images/1x1/xe_k17.jpg' }
    ],
    description:
      'The most advanced, efficient and refined sports saloon that Jaguar has ever produced',
    price: '£30,000',
    meta: {
      passengers: 5,
      drivetrain: ['AWD', 'RWD'],
      bodystyles: ['saloon'],
      emissions: { template: 'CO2 Emissions $value g/km', value: 99 }
    }
  },
  {
    id: 'xf',
    modelYear: 'k17',
    apiUrl: '/api/vehicle_xf.json',
    media: [
      { name: 'vehicle', url: '/images/16x9/xf_k17.jpg' },
      { name: 'vehicle', url: '/images/1x1/xf_k17.jpg' }
    ],
    description: 'The Jaguar XF combines race-car performance with luxury.',
    price: '£40,000',
    meta: {
      passengers: 5,
      drivetrain: ['AWD', 'RWD'],
      bodystyles: ['saloon', 'sportbrake'],
      emissions: { template: 'CO2 Emissions $value g/km', value: 129 }
    }
  },
  {
    id: 'ftype',
    modelYear: 'k17',
    apiUrl: '/api/vehicle_ftype.json',
    media: [
      { name: 'vehicle', url: '/images/16x9/ftype_k17.jpg' },
      { name: 'vehicle', url: '/images/1x1/ftype_k17.jpg' }
    ],
    description: 'Pulse-quickening, pure Jaguar sports car.',
    price: '£60,000',
    meta: {
      passengers: 2,
      drivetrain: ['AWD', 'RWD'],
      bodystyles: ['COUPÉ', 'CONVERTIBLE'],
      emissions: { template: 'CO2 Emissions $value g/km', value: 234 }
    }
  }
]
