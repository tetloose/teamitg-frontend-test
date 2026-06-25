import { MemoryRouter } from 'react-router-dom'
import { render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { useContent } from '@hooks/use-content/use-content.hooks'
import { useVehicles } from '@hooks/use-vehicles/use-vehicles.hooks'
import { vehiclesMock } from '@hooks/use-vehicles/use-vehicles.mock'
import App from './app'

vi.mock('@hooks/use-vehicles/use-vehicles.hooks')
vi.mock('@hooks/use-content/use-content.hooks')

const mockDefaults = () => {
  vi.mocked(useContent).mockReturnValue({
    content: { title: 'Our Vehicles', subtitle: 'Explore the Jaguar range' },
    contentPending: false,
    contentError: null
  })
}

const renderApp = (initialPath = '/') =>
  render(
    <MemoryRouter initialEntries={[initialPath]}>
      <App />
    </MemoryRouter>
  )

describe('App', () => {
  it('shows the Loading fallback on initial render', () => {
    mockDefaults()
    vi.mocked(useVehicles).mockReturnValue({
      vehicles: null,
      vehiclesPending: true,
      vehiclesError: null
    })

    const { container } = renderApp()

    expect(container.querySelector('span')).not.toBeNull()
  })

  it('renders the vehicles route', async () => {
    mockDefaults()
    vi.mocked(useVehicles).mockReturnValue({
      vehicles: vehiclesMock,
      vehiclesPending: false,
      vehiclesError: null
    })

    renderApp('/')

    await waitFor(() => {
      expect(screen.getAllByRole('article')).toHaveLength(vehiclesMock.length)
    })
  })

  it('renders NotFound on an unknown route', async () => {
    mockDefaults()
    vi.mocked(useVehicles).mockReturnValue({
      vehicles: null,
      vehiclesPending: false,
      vehiclesError: null
    })

    renderApp('/unknown')

    await waitFor(() => {
      expect(screen.getByText('404 Page not found')).toBeInTheDocument()
    })
  })
})
