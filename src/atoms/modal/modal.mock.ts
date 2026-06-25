import type { ModalProps } from './modal.types'

export const modalMock: ModalProps = {
  isOpen: true,
  onClose: () => {},
  labelledBy: 'modal-title',
  children: 'Modal content'
}

export const modalClosedMock: ModalProps = {
  ...modalMock,
  isOpen: false
}
