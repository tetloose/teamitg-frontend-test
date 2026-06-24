import { MemoryRouter } from 'react-router-dom'
import { render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { contentMock } from '@hooks/use-content/use-content.mock'
import { useHome } from '@hooks/use-home/use-home.hooks'
import App from './app'

vi.mock('@hooks/use-home/use-home.hooks')

const renderApp = (initialPath = '/') =>
  render(
    <MemoryRouter initialEntries={[initialPath]}>
      <App />
    </MemoryRouter>
  )

describe('App', () => {
  it('shows the Loading fallback on initial render', () => {
    vi.mocked(useHome).mockReturnValue({
      content: null,
      contentPending: false,
      contentError: null
    })

    const { container } = renderApp()

    expect(container.querySelector('span')).not.toBeNull()
  })

  it('renders the home route', async () => {
    vi.mocked(useHome).mockReturnValue({
      content: contentMock.homepage,
      contentPending: false,
      contentError: null
    })

    renderApp('/')

    await waitFor(() => {
      expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(
        contentMock.homepage.length
      )
    })
  })

  it('renders NotFound on an unknown route', async () => {
    vi.mocked(useHome).mockReturnValue({
      content: null,
      contentPending: false,
      contentError: null
    })

    renderApp('/unknown')

    await waitFor(() => {
      expect(screen.getByText('404 Page not found')).toBeInTheDocument()
    })
  })
})
