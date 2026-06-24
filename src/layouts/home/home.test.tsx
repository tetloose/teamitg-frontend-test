import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { contentMock } from '@hooks/use-content/use-content.mock'
import Home from './home.component'

describe('Home', () => {
  it('renders loading when pending', () => {
    const { container } = render(<Home content={null} contentPending={true} />)

    expect(container.querySelector('span')).not.toBeNull()
  })

  it('renders an article for each content item', () => {
    render(<Home content={contentMock.homepage} contentPending={false} />)

    expect(screen.getAllByRole('article')).toHaveLength(
      contentMock.homepage.length
    )
  })

  it('renders a heading for each content item', () => {
    render(<Home content={contentMock.homepage} contentPending={false} />)

    expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(
      contentMock.homepage.length
    )
  })

  it('renders NotFound when content is null', () => {
    render(<Home content={null} contentPending={false} />)

    expect(screen.getByText('No Content')).toBeInTheDocument()
  })
})
