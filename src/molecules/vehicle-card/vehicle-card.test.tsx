import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { VehicleCard } from './vehicle-card.component'
import { vehicleCardLoadingMock, vehicleCardMock } from './vehicle-card.mock'

const renderCard = (props: typeof vehicleCardMock) =>
  render(<VehicleCard {...props} />)

describe('VehicleCard', () => {
  it('renders the vehicle id', () => {
    renderCard(vehicleCardMock)

    expect(screen.getByText(vehicleCardMock.id)).toBeInTheDocument()
  })

  it('renders the price prefixed with From', () => {
    renderCard(vehicleCardMock)

    expect(
      screen.getByText(`From ${vehicleCardMock.price}`)
    ).toBeInTheDocument()
  })

  it('renders the description', () => {
    renderCard(vehicleCardMock)

    expect(screen.getByText(vehicleCardMock.description)).toBeInTheDocument()
  })

  it('renders a picture element when media is provided', () => {
    const { container } = renderCard(vehicleCardMock)

    expect(container.querySelector('picture')).not.toBeNull()
  })

  it('renders the skeleton when isLoading is true', () => {
    renderCard(vehicleCardLoadingMock)

    expect(screen.getByRole('status', { name: 'Loading' })).toBeInTheDocument()
  })

  it('does not render real content when isLoading is true', () => {
    renderCard(vehicleCardLoadingMock)

    expect(screen.queryByText(vehicleCardMock.id)).toBeNull()
    expect(screen.queryByText(`From ${vehicleCardMock.price}`)).toBeNull()
    expect(screen.queryByText(vehicleCardMock.description)).toBeNull()
  })
})
