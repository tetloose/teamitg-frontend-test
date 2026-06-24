import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import NotFound from './not-found.component'

describe('NotFound', () => {
  it('renders the default 404 title', () => {
    const { getByText } = render(<NotFound />)

    expect(getByText('404 Page not found')).not.toBeNull()
  })

  it('renders the default subtitle', () => {
    const { getByText } = render(<NotFound />)

    expect(getByText('Please refresh the page')).not.toBeNull()
  })

  it('renders a custom title', () => {
    const { getByText } = render(<NotFound title="No Content" />)

    expect(getByText('No Content')).not.toBeNull()
  })

  it('renders a custom body', () => {
    const { getByText } = render(<NotFound body="Nothing to show here" />)

    expect(getByText('Nothing to show here')).not.toBeNull()
  })

  it('renders the error name when no title is provided', () => {
    const { getByText } = render(
      <NotFound error={{ name: 'ReferenceError' }} />
    )

    expect(getByText('ReferenceError')).not.toBeNull()
  })

  it('renders the error message when no body is provided', () => {
    const { getByText } = render(
      <NotFound error={{ message: 'Something went wrong' }} />
    )

    expect(getByText('Something went wrong')).not.toBeNull()
  })

  it('renders the stack trace when provided', () => {
    const { getByText } = render(
      <NotFound error={{ stack: 'Error at App.tsx:10' }} />
    )

    expect(getByText('Error at App.tsx:10')).not.toBeNull()
  })

  it('does not render the stack trace when not provided', () => {
    const { queryByText } = render(<NotFound />)

    expect(queryByText(/Error at/)).toBeNull()
  })
})
