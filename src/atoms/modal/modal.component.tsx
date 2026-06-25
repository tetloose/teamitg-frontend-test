import { useEffect, useRef, useState } from 'react'
import type { ModalProps } from './modal.types'
import clsx from 'clsx'
import styles from './modal.module.scss'

export const Modal = ({
  classNames = [],
  isOpen,
  onClose,
  labelledBy,
  children
}: ModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (isOpen) {
      setIsVisible(true)
      dialog.showModal()
      requestAnimationFrame(() => {
        dialog.dataset.open = ''
      })
    } else if (dialog.open) {
      const prefersReducedMotion =
        globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches ??
        false
      delete dialog.dataset.open
      if (prefersReducedMotion) {
        dialog.close()
        setIsVisible(false)
      } else {
        dialog.addEventListener(
          'transitionend',
          () => {
            dialog.close()
            setIsVisible(false)
          },
          { once: true }
        )
      }
    }
  }, [isOpen])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    const handleBackdropClick = (e: MouseEvent) => {
      if (e.target === dialog) onClose()
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()

        return
      }

      if (e.key !== 'Tab') return

      const focusable = dialog.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      if (!focusable.length) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last.focus()
        }
      } else if (document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    dialog.addEventListener('click', handleBackdropClick)
    dialog.addEventListener('keydown', handleKeyDown)

    return () => {
      dialog.removeEventListener('click', handleBackdropClick)
      dialog.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={labelledBy}
      className={clsx(styles['modal'], ...classNames)}
    >
      {isVisible && (
        <>
          <button
            className={styles['modal__close']}
            onClick={onClose}
            aria-label="Close modal"
            type="button"
          >
            ✕
          </button>
          {children}
        </>
      )}
    </dialog>
  )
}
