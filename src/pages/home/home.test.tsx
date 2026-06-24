import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { contentMock } from '@hooks/use-content/use-content.mock'
import { useHome } from '@hooks/use-home/use-home.hooks'
import HomePage from './home.page'

vi.mock('@hooks/use-home/use-home.hooks')

describe('HomePage', () => {
  it('passes content to Home layout', () => {
    vi.mocked(useHome).mockReturnValue({
      content: contentMock.homepage,
      contentPending: false,
      contentError: null
    })

    render(<HomePage />)

    expect(screen.getAllByRole('article')).toHaveLength(
      contentMock.homepage.length
    )
  })

  it('passes loading state to Home layout', () => {
    vi.mocked(useHome).mockReturnValue({
      content: null,
      contentPending: true,
      contentError: null
    })

    const { container } = render(<HomePage />)

    expect(container.querySelector('span')).not.toBeNull()
  })
})
