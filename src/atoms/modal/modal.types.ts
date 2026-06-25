import type { GlobalChildren, GlobalClassNames } from '@global/global.types'

export type ModalProps = {
  isOpen: boolean
  onClose: () => void
  labelledBy?: string
} & GlobalClassNames &
  GlobalChildren
