import { Suspense } from 'react'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Boundary } from './boundary.util'

const renderBoundary = (error: Error) =>
  render(
    <Suspense fallback={null}>
      <Boundary error={error} />
    </Suspense>
  )

describe('Boundary', () => {
  it('renders the error name from the error object', async () => {
    const error = new Error('Something went wrong')
    error.name = 'NetworkError'

    renderBoundary(error)

    expect(await screen.findByText('NetworkError')).toBeInTheDocument()
  })

  it('renders the error message from the error object', async () => {
    const error = new Error('Something went wrong')

    renderBoundary(error)

    expect(await screen.findByText('Something went wrong')).toBeInTheDocument()
  })

  it('renders the fallback title when error name is empty', async () => {
    const error = { name: '', message: '', stack: '' } as Error

    renderBoundary(error)

    expect(await screen.findByText('404 Page not found')).toBeInTheDocument()
  })
})
