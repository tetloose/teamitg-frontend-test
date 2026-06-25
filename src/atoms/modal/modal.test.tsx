import { fireEvent, render, screen } from '@testing-library/react'
import { beforeAll, describe, expect, it, vi } from 'vitest'
import { Modal } from './modal.component'
import { modalClosedMock, modalMock } from './modal.mock'

beforeAll(() => {
  HTMLDialogElement.prototype.showModal = vi.fn(function (
    this: HTMLDialogElement
  ) {
    this.setAttribute('open', '')
  })
  HTMLDialogElement.prototype.close = vi.fn(function (this: HTMLDialogElement) {
    this.removeAttribute('open')
    this.dispatchEvent(new Event('close'))
  })
})

describe('Modal', () => {
  it('renders children when open', () => {
    render(<Modal {...modalMock} />)

    expect(screen.getByText('Modal content')).toBeInTheDocument()
  })

  it('does not render children when closed', () => {
    render(<Modal {...modalClosedMock} />)

    expect(screen.queryByText('Modal content')).toBeNull()
  })

  it('calls onClose when clicking the backdrop', async () => {
    const onClose = vi.fn()
    const { container } = render(<Modal {...modalMock} onClose={onClose} />)

    const dialog = container.querySelector('dialog') as HTMLDialogElement
    fireEvent.click(dialog, { target: dialog })

    expect(onClose).toHaveBeenCalledOnce()
  })

  it('calls onClose on Escape keypress', async () => {
    const onClose = vi.fn()
    const { container } = render(<Modal {...modalMock} onClose={onClose} />)

    const dialog = container.querySelector('dialog') as HTMLDialogElement
    fireEvent.keyDown(dialog, { key: 'Escape' })

    expect(onClose).toHaveBeenCalledOnce()
  })
})
