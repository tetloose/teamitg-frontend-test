import type { VehicleCardProps } from './vehicle-card.types'

export const vehicleCardMock: VehicleCardProps = {
  id: 'xe',
  description:
    'The most advanced, efficient and refined sports saloon that Jaguar has ever produced',
  price: '£30,000',
  media: [
    { name: 'Jaguar XE', url: '/images/16x9/xe_k17.jpg' },
    { name: 'Jaguar XE', url: '/images/1x1/xe_k17.jpg' }
  ]
}

export const vehicleCardLoadingMock: VehicleCardProps = {
  ...vehicleCardMock,
  isLoading: true
}
