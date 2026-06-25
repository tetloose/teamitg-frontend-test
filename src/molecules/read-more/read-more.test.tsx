import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ReadMore } from './read-more.component'
import { readMoreMock } from './read-more.mock'

const renderReadMore = (props: typeof readMoreMock) =>
  render(<ReadMore {...props} />)

describe('ReadMore', () => {
  it('renders "Read more" button by default', () => {
    renderReadMore(readMoreMock)

    expect(
      screen.getByRole('button', { name: /read more/i })
    ).toBeInTheDocument()
  })

  it('sets aria-expanded false by default', () => {
    renderReadMore(readMoreMock)

    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'false')
  })

  it('sets aria-expanded true when open', () => {
    renderReadMore(readMoreMock)

    fireEvent.click(screen.getByRole('button'))

    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true')
  })

  it('shows "Read less" when open', () => {
    renderReadMore(readMoreMock)

    fireEvent.click(screen.getByRole('button'))

    expect(
      screen.getByRole('button', { name: /read less/i })
    ).toBeInTheDocument()
  })

  it('toggles back to "Read more" on second click', () => {
    renderReadMore(readMoreMock)

    fireEvent.click(screen.getByRole('button'))
    fireEvent.click(screen.getByRole('button'))

    expect(
      screen.getByRole('button', { name: /read more/i })
    ).toBeInTheDocument()
  })
})
