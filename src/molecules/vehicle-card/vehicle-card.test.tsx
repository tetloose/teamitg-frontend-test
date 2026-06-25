import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { BREAKPOINTS } from '@global/global.constants'
import { VehicleCard } from './vehicle-card.component'
import { vehicleCardLoadingMock, vehicleCardMock } from './vehicle-card.mock'
import { getMediaSources } from './vehicle-card.utils'

describe('VehicleCard', () => {
  it('renders the vehicle id', () => {
    render(<VehicleCard {...vehicleCardMock} />)

    expect(screen.getByText(vehicleCardMock.id)).toBeInTheDocument()
  })

  it('renders the price prefixed with From', () => {
    render(<VehicleCard {...vehicleCardMock} />)

    expect(
      screen.getByText(`From ${vehicleCardMock.price}`)
    ).toBeInTheDocument()
  })

  it('renders the description', () => {
    render(<VehicleCard {...vehicleCardMock} />)

    expect(screen.getByText(vehicleCardMock.description!)).toBeInTheDocument()
  })

  it('renders a picture element when media is provided', () => {
    const { container } = render(<VehicleCard {...vehicleCardMock} />)

    expect(container.querySelector('picture')).not.toBeNull()
  })

  it('does not render price when it is missing', () => {
    render(<VehicleCard {...vehicleCardMock} price={undefined} />)

    expect(screen.queryByText(`From ${vehicleCardMock.price}`)).toBeNull()
  })

  it('does not render description when it is missing', () => {
    render(<VehicleCard {...vehicleCardMock} description={undefined} />)

    expect(screen.queryByText(vehicleCardMock.description!)).toBeNull()
  })

  it('renders nothing when id is missing', () => {
    const { container } = render(
      <VehicleCard {...vehicleCardMock} id={undefined as unknown as string} />
    )

    expect(container.firstChild).toBeNull()
  })

  it('renders the skeleton when isLoading is true', () => {
    render(<VehicleCard {...vehicleCardLoadingMock} />)

    expect(screen.getByRole('status', { name: 'Loading' })).toBeInTheDocument()
  })

  it('does not render real content when isLoading is true', () => {
    render(<VehicleCard {...vehicleCardLoadingMock} />)

    expect(screen.queryByText(vehicleCardMock.id)).toBeNull()
    expect(screen.queryByText(`From ${vehicleCardMock.price}`)).toBeNull()
    expect(screen.queryByText(vehicleCardMock.description!)).toBeNull()
  })
})

describe('getMediaSources', () => {
  it('returns an empty array for a single media item', () => {
    const result = getMediaSources([{ name: 'mobile', url: '/mobile.jpg' }])

    expect(result).toHaveLength(0)
  })

  it('returns one source for two media items mapped to the tablet breakpoint', () => {
    const result = getMediaSources([
      { name: 'tablet', url: '/tablet.jpg' },
      { name: 'mobile', url: '/mobile.jpg' }
    ])

    expect(result).toHaveLength(1)
    expect(result[0].srcSet).toBe('/tablet.jpg')
    expect(result[0].media).toBe(`(min-width: ${BREAKPOINTS.tablet}px)`)
  })

  it('returns two sources for three media items mapped to desktop then tablet', () => {
    const result = getMediaSources([
      { name: 'desktop', url: '/desktop.jpg' },
      { name: 'tablet', url: '/tablet.jpg' },
      { name: 'mobile', url: '/mobile.jpg' }
    ])

    expect(result).toHaveLength(2)
    expect(result[0].srcSet).toBe('/desktop.jpg')
    expect(result[0].media).toBe(`(min-width: ${BREAKPOINTS.desktop}px)`)
    expect(result[1].srcSet).toBe('/tablet.jpg')
    expect(result[1].media).toBe(`(min-width: ${BREAKPOINTS.tablet}px)`)
  })

  it('caps sources at two even when more than three media items are provided', () => {
    const result = getMediaSources([
      { name: 'a', url: '/a.jpg' },
      { name: 'b', url: '/b.jpg' },
      { name: 'c', url: '/c.jpg' },
      { name: 'd', url: '/d.jpg' }
    ])

    expect(result).toHaveLength(2)
  })
})
