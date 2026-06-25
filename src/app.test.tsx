import { MemoryRouter } from 'react-router-dom'
import { render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { useVehicles } from '@hooks/use-vehicles/use-vehicles.hooks'
import { vehiclesMock } from '@hooks/use-vehicles/use-vehicles.mock'
import App from './app'

vi.mock('@hooks/use-vehicles/use-vehicles.hooks')

const renderApp = (initialPath = '/') =>
  render(
    <MemoryRouter initialEntries={[initialPath]}>
      <App />
    </MemoryRouter>
  )

describe('App', () => {
  it('shows the Loading fallback on initial render', () => {
    vi.mocked(useVehicles).mockReturnValue({
      vehicles: null,
      vehiclesPending: true,
      vehiclesError: null
    })

    const { container } = renderApp()

    expect(container.querySelector('span')).not.toBeNull()
  })

  it('renders the vehicles route', async () => {
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
